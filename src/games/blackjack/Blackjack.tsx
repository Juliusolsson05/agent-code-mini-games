import { useEffect, useState } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import { CardBack } from '../../cards/Back'
import { Card as CardView } from '../../cards/Card'
import { Chip, CHIP_VALUES, type ChipValue } from '../../chips/Chip'
import { Table } from '../../table/Table'
import type { GameAudio } from '../../audio'
import { handValue, type BJState, type Card, type HandOutcome } from './engine'
import { useBlackjack } from './useBlackjack'

function dealerBadge(dealer: Card[], holeHidden: boolean): string {
  if (dealer.length === 0) return ''
  if (holeHidden) return String(handValue([dealer[0]]).total)
  const { total, soft } = handValue(dealer)
  return soft && total !== 21 ? `${total - 10}/${total}` : String(total)
}

function playerBadge(cards: Card[]): string {
  const { total, soft } = handValue(cards)
  if (total > 21) return `${total}`
  return soft && total !== 21 ? `${total - 10}/${total}` : String(total)
}

function outcomeLabel(o: HandOutcome): { text: string; kind: string } | null {
  switch (o) {
    case 'blackjack':
      return { text: 'Blackjack!', kind: 'good' }
    case 'win':
      return { text: 'Win', kind: 'good' }
    case 'push':
      return { text: 'Push', kind: 'neutral' }
    case 'bust':
      return { text: 'Bust', kind: 'bad' }
    case 'lose':
      return { text: 'Lose', kind: 'bad' }
    default:
      return null
  }
}

/** A genuine 3D flip: the container rotates 180° on Y, swapping a back face for the
 *  card face. Used for the dealer's hole card so the reveal is a real card turn. */
function FlipCard({ card, revealed }: { card: Card; revealed: boolean }) {
  return (
    <span className="mg-card-wrap">
      <span className={`mg-flip${revealed ? ' revealed' : ''}`}>
        <span className="mg-flip-face mg-flip-back">
          <CardBack className="mg-card" />
        </span>
        <span className="mg-flip-face mg-flip-front">
          <CardView rank={card.rank} suit={card.suit} className="mg-card" />
        </span>
      </span>
    </span>
  )
}

/** One hand, fanned with overlap. The dealer's hole card (index 1) flips on reveal;
 *  all other cards slide in on deal. */
function HandView({
  cards,
  flipHole = false,
  holeHidden = false,
}: {
  cards: Card[]
  flipHole?: boolean
  holeHidden?: boolean
}) {
  return (
    <div className="mg-cards">
      {cards.map((c, i) =>
        flipHole && i === 1 ? (
          <FlipCard key={c.id} card={c} revealed={!holeHidden} />
        ) : (
          <span key={c.id} className="mg-card-wrap" style={{ ['--i' as string]: i }}>
            <CardView rank={c.rank} suit={c.suit} className="mg-card" />
          </span>
        ),
      )}
    </div>
  )
}

/** Break a wager into a stack of chips, biggest at the bottom. */
function chipsFor(amount: number): ChipValue[] {
  const denoms: ChipValue[] = [500, 100, 25, 5, 1]
  const out: ChipValue[] = []
  let rem = amount
  for (const d of denoms) {
    while (rem >= d && out.length < 9) {
      out.push(d)
      rem -= d
    }
  }
  return out.reverse()
}

function BetStack({ amount }: { amount: number }) {
  const chips = chipsFor(amount)
  return (
    <div className="mg-betstack" title={`$${amount}`}>
      {chips.map((v, i) => (
        <span key={i} className="mg-betchip" style={{ ['--n' as string]: i }}>
          <Chip value={v} size={46} />
        </span>
      ))}
      <span className="mg-betstack-amt">${amount}</span>
    </div>
  )
}

/** A shower of coins/confetti on a win — gold for a blackjack. */
function Celebration({ blackjack }: { blackjack: boolean }) {
  const n = blackjack ? 26 : 16
  return (
    <div className="mg-celebrate" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className={`mg-coin${blackjack ? ' bj' : ''}`}
          style={{ ['--i' as string]: i, left: `${(i * 61) % 100}%` }}
        />
      ))}
    </div>
  )
}

export function Blackjack({
  api,
  audio,
  onExit,
}: {
  api: AgentCodeApiV1
  audio: GameAudio
  onExit: () => void
}) {
  const { state, game } = useBlackjack(api, audio)
  const [muted, setMuted] = useState(audio.isMuted)
  const [showSettings, setShowSettings] = useState(false)

  const act = (fn: (() => void) | undefined) => {
    if (!fn) return
    audio.unlock()
    fn()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!game || !state) return
      const k = e.key.toLowerCase()
      if (state.phase === 'betting' && (k === 'enter' || k === ' ')) act(() => game.deal())
      else if (state.phase === 'playing') {
        if (k === 'h') act(() => game.hit())
        else if (k === 's') act(() => game.stand())
        else if (k === 'd' && game.canDouble()) act(() => game.double())
        else if (k === 'p' && game.canSplit()) act(() => game.split())
      } else if (state.phase === 'settle' && (k === 'enter' || k === ' ')) act(() => game.newRound())
      else if (state.phase === 'insurance') {
        if (k === 'y') act(() => game.takeInsurance())
        else if (k === 'n') act(() => game.declineInsurance())
      }
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!state || !game) return <div className="mg-loading">Shuffling the shoe…</div>

  const toggleMute = () => {
    const m = !muted
    setMuted(m)
    audio.setMuted(m)
  }

  const win = state.lastNet
  const bannerKind = state.phase === 'settle' ? (win > 0 ? 'good' : win < 0 ? 'bad' : 'neutral') : ''
  const celebrate = state.phase === 'settle' && win > 0
  const isBlackjackWin = state.playerHands.some(h => h.outcome === 'blackjack')

  return (
    <div className="mg-bj">
      <div className="mg-topbar">
        <button className="mg-icon-btn" onClick={onExit} title="Back to games">
          ‹ Games
        </button>
        <div className="mg-bankroll">
          <span className="mg-bankroll-chip" /> ${state.bankroll}
        </div>
        <div className="mg-topbar-right">
          <span className="mg-stat-sm" title="Wins / Blackjacks / Hands">
            {state.stats.wins}W · {state.stats.blackjacks}BJ · {state.stats.hands}
          </span>
          <button className="mg-icon-btn" onClick={toggleMute} title="Sound">
            {muted ? '🔇' : '♪'}
          </button>
          <button
            className={`mg-icon-btn${showSettings ? ' on' : ''}`}
            onClick={() => setShowSettings(s => !s)}
            title="Settings"
          >
            ⚙
          </button>
        </div>
      </div>

      {showSettings ? (
        <div className="mg-settings">
          <div className="mg-set-row">
            <span className="mg-set-label">Decks</span>
            <div className="mg-seg">
              {[1, 2, 4, 6, 8].map(d => (
                <button
                  key={d}
                  className={`mg-seg-btn${state.settings.decks === d ? ' active' : ''}`}
                  disabled={state.phase !== 'betting'}
                  onClick={() => game.setDecks(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="mg-set-row">
            <span className="mg-set-label">Dealer hits soft 17</span>
            <button
              className={`mg-toggle${state.settings.hitSoft17 ? ' on' : ''}`}
              disabled={state.phase !== 'betting'}
              onClick={() => game.setHitSoft17(!state.settings.hitSoft17)}
            >
              <span className="mg-toggle-dot" />
            </button>
          </div>
          <div className="mg-set-hint">Shoe: {state.shoeRemaining} cards left</div>
        </div>
      ) : null}

      <div className="mg-table-3d">
        <div className="mg-table">
          <Table />
          {celebrate ? <Celebration blackjack={isBlackjackWin} /> : null}

          <div className="mg-dealer">
            <HandView cards={state.dealer} flipHole holeHidden={state.holeHidden} />
            {state.dealer.length > 0 ? (
              <div className="mg-badge">{dealerBadge(state.dealer, state.holeHidden)}</div>
            ) : null}
          </div>

          {state.phase === 'settle' ? (
            <div className={`mg-banner ${bannerKind}`}>
              <div className="mg-banner-text">{state.message}</div>
            </div>
          ) : null}
          {state.phase === 'insurance' ? (
            <div className="mg-banner neutral">
              <div className="mg-banner-text">Insurance?</div>
            </div>
          ) : null}

          <div className="mg-players">
            {state.playerHands.map((h, i) => {
              const label = outcomeLabel(h.outcome)
              const isActive = state.phase === 'playing' && i === state.activeHand
              return (
                <div className={`mg-player-hand${isActive ? ' active' : ''}`} key={i}>
                  <HandView cards={h.cards} />
                  <div className="mg-hand-foot">
                    {h.cards.length > 0 ? <span className="mg-badge sm">{playerBadge(h.cards)}</span> : null}
                    {label ? <span className={`mg-outcome ${label.kind}`}>{label.text}</span> : null}
                  </div>
                </div>
              )
            })}
            {state.playerHands.length === 0 && state.bet > 0 ? <BetStack amount={state.bet} /> : null}
            {state.playerHands.length === 0 && state.bet <= 0 ? (
              <div className="mg-betspot">Place your bet</div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mg-actions">{renderActions(state, game, act)}</div>
    </div>
  )
}

function renderActions(
  state: BJState,
  game: NonNullable<ReturnType<typeof useBlackjack>['game']>,
  act: (fn: (() => void) | undefined) => void,
) {
  if (state.phase === 'betting') {
    const broke = state.bankroll <= 0 && state.bet <= 0
    if (broke) {
      return (
        <div className="mg-broke">
          <span>Out of chips.</span>
          <button className="mg-btn primary" onClick={() => act(() => game.rebuy())}>
            Buy in ${state.settings.startingBankroll}
          </button>
        </div>
      )
    }
    return (
      <div className="mg-bet">
        <div className="mg-chiprack">
          {CHIP_VALUES.map((v: ChipValue) => (
            <button
              key={v}
              className="mg-chip-btn"
              disabled={state.bet + v > state.bankroll}
              onClick={() => act(() => game.addChip(v))}
              title={`Bet $${v}`}
            >
              <Chip value={v} size={56} />
            </button>
          ))}
        </div>
        <div className="mg-bet-right">
          <button className="mg-btn ghost" disabled={state.bet <= 0} onClick={() => act(() => game.clearBet())}>
            Clear
          </button>
          <button className="mg-btn primary" disabled={state.bet <= 0} onClick={() => act(() => game.deal())}>
            Deal ${state.bet || ''}
          </button>
        </div>
      </div>
    )
  }

  if (state.phase === 'insurance') {
    return (
      <div className="mg-row">
        <button className="mg-btn" onClick={() => act(() => game.takeInsurance())}>
          Insurance (Y)
        </button>
        <button className="mg-btn ghost" onClick={() => act(() => game.declineInsurance())}>
          No (N)
        </button>
      </div>
    )
  }

  if (state.phase === 'playing') {
    return (
      <div className="mg-row">
        <button className="mg-btn primary" onClick={() => act(() => game.hit())}>
          Hit
        </button>
        <button className="mg-btn" onClick={() => act(() => game.stand())}>
          Stand
        </button>
        <button className="mg-btn" disabled={!game.canDouble()} onClick={() => act(() => game.double())}>
          Double
        </button>
        <button className="mg-btn" disabled={!game.canSplit()} onClick={() => act(() => game.split())}>
          Split
        </button>
      </div>
    )
  }

  if (state.phase === 'dealer') {
    return <div className="mg-row muted">Dealer plays…</div>
  }

  return (
    <div className="mg-row">
      <button className="mg-btn primary" onClick={() => act(() => game.newRound())}>
        Deal again
      </button>
    </div>
  )
}
