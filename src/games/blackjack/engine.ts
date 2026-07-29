import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import type { Rank, Suit } from '../../assets/svg/suits'

export type Card = { rank: Rank; suit: Suit; id: string }

export type Phase =
  | 'betting' // choosing a wager
  | 'insurance' // dealer shows an ace; offer insurance
  | 'playing' // player acting on their hand(s)
  | 'dealer' // dealer drawing
  | 'settle' // round resolved; results shown until the next deal

export type HandOutcome = 'blackjack' | 'win' | 'push' | 'lose' | 'bust' | null

export type PlayerHand = {
  cards: Card[]
  bet: number
  outcome: HandOutcome
  done: boolean
  doubled: boolean
  splitAce: boolean
}

export type Stats = {
  hands: number
  wins: number
  losses: number
  pushes: number
  blackjacks: number
}

export type Settings = { decks: number; hitSoft17: boolean; startingBankroll: number }

export type BJState = {
  phase: Phase
  bankroll: number
  bet: number
  playerHands: PlayerHand[]
  activeHand: number
  dealer: Card[]
  holeHidden: boolean
  insuranceBet: number
  message: string
  lastNet: number
  stats: Stats
  settings: Settings
  shoeRemaining: number
}

export const CHIP_STORE_KEYS = {
  bankroll: 'bj.bankroll',
  stats: 'bj.stats',
  settings: 'bj.settings',
} as const

const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const SUITS: Suit[] = ['S', 'H', 'D', 'C']

let idCounter = 0

function buildShoe(decks: number): Card[] {
  const shoe: Card[] = []
  for (let d = 0; d < decks; d++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) shoe.push({ rank, suit, id: `c${idCounter++}` })
    }
  }
  // Fisher–Yates.
  for (let i = shoe.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = shoe[i]
    shoe[i] = shoe[j]
    shoe[j] = tmp
  }
  return shoe
}

/** Blackjack value of a hand, with soft-ace handling. `soft` = an ace is still
 *  counting as 11 (so the hand can't bust on the next hit). */
export function handValue(cards: Card[]): { total: number; soft: boolean } {
  let total = 0
  let aces = 0
  for (const c of cards) {
    if (c.rank === 'A') {
      aces += 1
      total += 11
    } else if (c.rank === 'K' || c.rank === 'Q' || c.rank === 'J' || c.rank === '10') {
      total += 10
    } else {
      total += Number(c.rank)
    }
  }
  while (total > 21 && aces > 0) {
    total -= 10
    aces -= 1
  }
  return { total, soft: aces > 0 && total <= 21 }
}

export function isBlackjack(cards: Card[]): boolean {
  return cards.length === 2 && handValue(cards).total === 21
}

function cardRankValue(rank: Rank): number {
  if (rank === 'A') return 11
  if (rank === 'K' || rank === 'Q' || rank === 'J' || rank === '10') return 10
  return Number(rank)
}

const DEFAULT_SETTINGS: Settings = { decks: 6, hitSoft17: false, startingBankroll: 500 }
const DEFAULT_STATS: Stats = { hands: 0, wins: 0, losses: 0, pushes: 0, blackjacks: 0 }
const DEAL_MS = 260 // pace of the opening deal
const DEALER_MS = 520 // pace of dealer draws

/**
 * The whole game of blackjack — state, rules, and the timed dealer turn — behind a
 * small imperative surface the React hook subscribes to. Kept UI-free so the rules
 * are testable in isolation and the component is a pure projection of `snapshot()`.
 */
export class BlackjackGame {
  private shoe: Card[] = []
  private phase: Phase = 'betting'
  private bankroll = DEFAULT_SETTINGS.startingBankroll
  private bet = 0
  private hands: PlayerHand[] = []
  private active = 0
  private dealer: Card[] = []
  private holeHidden = true
  private insuranceBet = 0
  private message = ''
  private lastNet = 0
  private stats: Stats = { ...DEFAULT_STATS }
  private settings: Settings = { ...DEFAULT_SETTINGS }
  private timers: ReturnType<typeof setTimeout>[] = []
  private disposed = false

  constructor(
    private api: AgentCodeApiV1,
    private onChange: (state: BJState) => void,
    private sfx: {
      deal: () => void
      chip: () => void
      win: () => void
      lose: () => void
      push: () => void
      blackjack: () => void
    },
  ) {
    this.shoe = buildShoe(this.settings.decks)
    void this.loadPrefs()
  }

  /** Current snapshot — used to seed the React state without emitting during the
   *  host component's render (loadPrefs emits the corrected state a tick later). */
  getState(): BJState {
    return this.snapshot()
  }

  // --- betting ---------------------------------------------------------------

  addChip(value: number): void {
    if (this.phase !== 'betting') return
    if (this.bet + value > this.bankroll) return
    this.bet += value
    this.sfx.chip()
    this.emit()
  }

  clearBet(): void {
    if (this.phase !== 'betting') return
    this.bet = 0
    this.emit()
  }

  deal(): void {
    if (this.phase !== 'betting' || this.bet <= 0 || this.bet > this.bankroll) return
    this.reshuffleIfLow()
    this.bankroll -= this.bet
    this.hands = [this.freshHand(this.bet)]
    this.dealer = []
    this.active = 0
    this.insuranceBet = 0
    this.holeHidden = true
    this.message = ''
    this.lastNet = 0
    this.phase = 'playing'

    // Opening deal — player, dealer(up), player, dealer(hole). Timed for feel; the
    // cards animate in as they arrive.
    this.sfx.deal()
    this.draw(this.hands[0])
    this.schedule(DEAL_MS, () => {
      this.dealer.push(this.pop())
      this.sfx.deal()
      this.emit()
    })
    this.schedule(DEAL_MS * 2, () => {
      this.draw(this.hands[0])
      this.sfx.deal()
      this.emit()
    })
    this.schedule(DEAL_MS * 3, () => {
      this.dealer.push(this.pop())
      this.sfx.deal()
      this.emit()
      this.afterDeal()
    })
    this.emit()
  }

  private afterDeal(): void {
    const dealerUp = this.dealer[0]
    if (dealerUp.rank === 'A' && this.bankroll >= Math.floor(this.hands[0].bet / 2)) {
      this.phase = 'insurance'
      this.message = 'Insurance?'
      this.emit()
      return
    }
    this.resolveNaturals()
  }

  takeInsurance(): void {
    if (this.phase !== 'insurance') return
    const cost = Math.floor(this.hands[0].bet / 2)
    if (this.bankroll >= cost) {
      this.bankroll -= cost
      this.insuranceBet = cost
      this.sfx.chip()
    }
    this.resolveNaturals()
  }

  declineInsurance(): void {
    if (this.phase !== 'insurance') return
    this.resolveNaturals()
  }

  /** After the deal (and any insurance decision): pay insurance, and if either side
   *  has a natural blackjack, reveal and settle immediately; otherwise start play. */
  private resolveNaturals(): void {
    const dealerBJ = isBlackjack(this.dealer)
    const playerBJ = isBlackjack(this.hands[0].cards)

    if (this.insuranceBet > 0) {
      if (dealerBJ) this.bankroll += this.insuranceBet * 3 // stake back + 2:1
    }

    if (dealerBJ || playerBJ) {
      this.holeHidden = false
      if (playerBJ && !dealerBJ) this.hands[0].outcome = 'blackjack'
      else if (!playerBJ && dealerBJ) this.hands[0].outcome = 'lose'
      else this.hands[0].outcome = 'push' // both blackjack
      this.settle()
      return
    }

    this.phase = 'playing'
    this.message = ''
    this.emit()
  }

  // --- player actions --------------------------------------------------------

  private cur(): PlayerHand | undefined {
    return this.hands[this.active]
  }

  hit(): void {
    if (this.phase !== 'playing') return
    const hand = this.cur()
    if (!hand || hand.done) return
    this.draw(hand)
    this.sfx.deal()
    if (handValue(hand.cards).total > 21) {
      hand.outcome = 'bust'
      hand.done = true
      this.sfx.lose()
      this.advance()
    } else {
      this.emit()
    }
  }

  stand(): void {
    if (this.phase !== 'playing') return
    const hand = this.cur()
    if (!hand || hand.done) return
    hand.done = true
    this.advance()
  }

  canDouble(): boolean {
    const hand = this.cur()
    return (
      this.phase === 'playing' &&
      !!hand &&
      !hand.done &&
      hand.cards.length === 2 &&
      this.bankroll >= hand.bet
    )
  }

  double(): void {
    if (!this.canDouble()) return
    const hand = this.cur()!
    this.bankroll -= hand.bet
    hand.bet *= 2
    hand.doubled = true
    this.draw(hand)
    this.sfx.deal()
    if (handValue(hand.cards).total > 21) {
      hand.outcome = 'bust'
      this.sfx.lose()
    }
    hand.done = true
    this.advance()
  }

  canSplit(): boolean {
    const hand = this.cur()
    return (
      this.phase === 'playing' &&
      !!hand &&
      !hand.done &&
      hand.cards.length === 2 &&
      cardRankValue(hand.cards[0].rank) === cardRankValue(hand.cards[1].rank) &&
      this.hands.length < 4 &&
      this.bankroll >= hand.bet
    )
  }

  split(): void {
    if (!this.canSplit()) return
    const hand = this.cur()!
    const isAces = hand.cards[0].rank === 'A'
    this.bankroll -= hand.bet

    const second = this.freshHand(hand.bet)
    second.cards.push(hand.cards.pop()!)
    second.splitAce = isAces
    hand.splitAce = isAces

    // Deal one fresh card to the first hand now; the second is topped up when it
    // becomes active. Split aces get exactly one card each and stand.
    this.draw(hand)
    this.sfx.deal()
    if (isAces) hand.done = true

    this.hands.splice(this.active + 1, 0, second)

    if (hand.done) this.advance()
    else this.emit()
  }

  private advance(): void {
    // Move to the next hand needing a decision; top it up to two cards first.
    for (let i = this.active + 1; i < this.hands.length; i++) {
      const h = this.hands[i]
      if (!h.done) {
        this.active = i
        if (h.cards.length < 2) {
          this.draw(h)
          this.sfx.deal()
          if (h.splitAce) h.done = true
        }
        if (!h.done) {
          this.emit()
          return
        }
      }
    }
    this.startDealer()
  }

  // --- dealer + settlement ---------------------------------------------------

  private startDealer(): void {
    this.phase = 'dealer'
    this.holeHidden = false
    this.emit()

    const anyLive = this.hands.some(h => h.outcome !== 'bust')
    if (!anyLive) {
      // Everyone busted — dealer just reveals and we settle.
      this.schedule(DEALER_MS, () => this.settle())
      return
    }

    const drawStep = (delay: number): void => {
      this.schedule(delay, () => {
        const { total, soft } = handValue(this.dealer)
        const hitSoft17 = soft && total === 17 && this.settings.hitSoft17
        if (total < 17 || hitSoft17) {
          this.dealer.push(this.pop())
          this.sfx.deal()
          this.emit()
          drawStep(DEALER_MS)
        } else {
          this.settle()
        }
      })
    }
    drawStep(DEALER_MS)
  }

  private settle(): void {
    const dealer = handValue(this.dealer)
    const dealerBust = dealer.total > 21
    let net = 0
    let wonAny = false

    for (const hand of this.hands) {
      const hv = handValue(hand.cards)
      // Outcomes set during play (bust, or a natural on hand 0) are kept.
      if (hand.outcome === null) {
        if (hv.total > 21) hand.outcome = 'bust'
        else if (dealerBust || hv.total > dealer.total) hand.outcome = 'win'
        else if (hv.total < dealer.total) hand.outcome = 'lose'
        else hand.outcome = 'push'
      }

      // Payout (the stake was already removed at deal / double / split).
      if (hand.outcome === 'blackjack') {
        this.bankroll += Math.round(hand.bet * 2.5)
        net += Math.round(hand.bet * 1.5)
        this.stats.blackjacks += 1
        this.stats.wins += 1
        wonAny = true
      } else if (hand.outcome === 'win') {
        this.bankroll += hand.bet * 2
        net += hand.bet
        this.stats.wins += 1
        wonAny = true
      } else if (hand.outcome === 'push') {
        this.bankroll += hand.bet
        this.stats.pushes += 1
      } else {
        // lose / bust
        net -= hand.bet
        this.stats.losses += 1
      }
      this.stats.hands += 1
    }

    // Insurance stake (if any) was already resolved in resolveNaturals; fold its net.
    if (this.insuranceBet > 0 && !isBlackjack(this.dealer)) net -= this.insuranceBet

    this.lastNet = net
    this.phase = 'settle'
    this.message = this.settleMessage(net, wonAny)
    if (net > 0) (this.hands.some(h => h.outcome === 'blackjack') ? this.sfx.blackjack : this.sfx.win)()
    else if (net < 0) this.sfx.lose()
    else this.sfx.push()

    void this.savePrefs()
    this.emit()
  }

  private settleMessage(net: number, wonAny: boolean): string {
    if (net > 0) return wonAny ? `You win $${net}` : `+$${net}`
    if (net < 0) return `You lose $${-net}`
    return 'Push'
  }

  newRound(): void {
    this.clearTimers()
    this.hands = []
    this.dealer = []
    this.active = 0
    this.bet = 0
    this.insuranceBet = 0
    this.holeHidden = true
    this.message = ''
    this.phase = 'betting'
    this.reshuffleIfLow()
    this.emit()
  }

  rebuy(): void {
    if (this.bankroll > 0) return
    this.bankroll = this.settings.startingBankroll
    void this.savePrefs()
    this.newRound()
  }

  setDecks(decks: number): void {
    if (this.phase !== 'betting') return
    this.settings.decks = Math.max(1, Math.min(8, decks))
    this.shoe = buildShoe(this.settings.decks)
    void this.savePrefs()
    this.emit()
  }

  setHitSoft17(hit: boolean): void {
    if (this.phase !== 'betting') return
    this.settings.hitSoft17 = hit
    void this.savePrefs()
    this.emit()
  }

  dispose(): void {
    this.disposed = true
    this.clearTimers()
  }

  // --- helpers ---------------------------------------------------------------

  private freshHand(bet: number): PlayerHand {
    return { cards: [], bet, outcome: null, done: false, doubled: false, splitAce: false }
  }

  private draw(hand: PlayerHand): void {
    hand.cards.push(this.pop())
  }

  private pop(): Card {
    if (this.shoe.length === 0) this.shoe = buildShoe(this.settings.decks)
    return this.shoe.pop()!
  }

  private reshuffleIfLow(): void {
    if (this.shoe.length < this.settings.decks * 52 * 0.25) {
      this.shoe = buildShoe(this.settings.decks)
    }
  }

  private schedule(delay: number, fn: () => void): void {
    if (this.disposed) return
    this.timers.push(setTimeout(() => !this.disposed && fn(), delay))
  }

  private clearTimers(): void {
    for (const t of this.timers) clearTimeout(t)
    this.timers = []
  }

  private snapshot(): BJState {
    return {
      phase: this.phase,
      bankroll: this.bankroll,
      bet: this.bet,
      playerHands: this.hands.map(h => ({ ...h, cards: [...h.cards] })),
      activeHand: this.active,
      dealer: [...this.dealer],
      holeHidden: this.holeHidden,
      insuranceBet: this.insuranceBet,
      message: this.message,
      lastNet: this.lastNet,
      stats: { ...this.stats },
      settings: { ...this.settings },
      shoeRemaining: this.shoe.length,
    }
  }

  private emit(): void {
    this.onChange(this.snapshot())
  }

  private async loadPrefs(): Promise<void> {
    try {
      const [bankroll, stats, settings] = await Promise.all([
        this.api.storage.get<number>(CHIP_STORE_KEYS.bankroll),
        this.api.storage.get<Stats>(CHIP_STORE_KEYS.stats),
        this.api.storage.get<Settings>(CHIP_STORE_KEYS.settings),
      ])
      if (settings && typeof settings.decks === 'number') {
        this.settings = { ...DEFAULT_SETTINGS, ...settings }
        this.shoe = buildShoe(this.settings.decks)
      }
      if (typeof bankroll === 'number' && bankroll > 0) this.bankroll = bankroll
      else this.bankroll = this.settings.startingBankroll
      if (stats && typeof stats.hands === 'number') this.stats = { ...DEFAULT_STATS, ...stats }
      this.emit()
    } catch {
      // storage unavailable — defaults are fine.
    }
  }

  private async savePrefs(): Promise<void> {
    try {
      await Promise.all([
        this.api.storage.set(CHIP_STORE_KEYS.bankroll, this.bankroll),
        this.api.storage.set(CHIP_STORE_KEYS.stats, this.stats as unknown as never),
        this.api.storage.set(CHIP_STORE_KEYS.settings, this.settings as unknown as never),
      ])
    } catch {
      // best-effort persistence.
    }
  }
}
