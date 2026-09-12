import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import { ChipFace } from '../../assets/svg/ChipFace'
import { CHIP_VALUES } from '../../shared/chipPalette'
import type { GameAudio } from '../../audio'
import { handValue, insuranceCost, isBlackjack, type BJState, type Card, type PlayerHand } from './engine'
import { BlackjackScene } from './scene'
import { useBlackjack } from './useBlackjack'
import styles from './blackjack.css?inline'

const MUTE_KEY = 'bj.muted'
const money = (value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 })}`
const signedMoney = (value: number) => `${value > 0 ? '+' : value < 0 ? '−' : ''}${money(Math.abs(value))}`
const SUITS = { S: '♠', H: '♥', D: '♦', C: '♣' } as const
const SUIT_NAMES = { S: 'spades', H: 'hearts', D: 'diamonds', C: 'clubs' } as const
const OUTCOMES = { blackjack: 'Blackjack', win: 'Won', push: 'Push', lose: 'Lost', bust: 'Bust' } as const

function totalReadout(cards: Card[]): string {
  if (!cards.length) return '—'
  const { total, soft } = handValue(cards)
  return total > 21 ? `${total} · bust` : soft && total < 21 ? `${total - 10} / ${total}` : String(total)
}

function dealerReadout(state: BJState): string {
  if (!state.dealer.length) return '—'
  return state.holeHidden
    ? `${handValue([state.dealer[0]]).total}${state.dealer.length > 1 ? ' + ?' : ''}`
    : totalReadout(state.dealer)
}

function CardsReadout({ cards, hideHole = false }: { cards: Card[]; hideHole?: boolean }) {
  return <span className="bj-card-readout">
    {cards.map((card, i) => hideHole && i === 1
      ? <span key={card.id} className="bj-hidden-card" aria-label="Hidden card">?</span>
      : <span key={card.id} className={card.suit === 'H' || card.suit === 'D' ? 'bj-red-suit' : ''}
          aria-label={`${card.rank} of ${SUIT_NAMES[card.suit]}`}>
          {card.rank}{SUITS[card.suit]}
        </span>)}
  </span>
}

function roundStatus(state: BJState | null): { title: string; detail: string; tone?: string } {
  if (!state || state.phase === 'loading') return { title: 'Taking your seat…', detail: 'Loading your chips and table settings.' }
  if (state.phase === 'betting') return state.bankroll <= 0
    ? { title: 'A fresh start', detail: 'Buy in with free practice chips to keep playing.' }
    : { title: state.bet > 0 ? 'Ready when you are' : 'Place your bet', detail: state.bet > 0 ? `${money(state.bet)} on the next hand.` : 'Add chips below, then deal.' }
  if (state.phase === 'dealing') return { title: 'Dealing the opening hand…', detail: 'Your turn begins when all four cards arrive.' }
  if (state.phase === 'insurance') return { title: 'Dealer shows an ace', detail: `Insurance costs ${money(insuranceCost(state.playerHands[0].bet))} and pays 2:1 if the dealer has blackjack.` }
  if (state.phase === 'dealer') return { title: 'Dealer’s turn', detail: state.settings.hitSoft17 ? 'Dealer hits soft 17 and stands on hard 17.' : 'Dealer stands on all 17s.' }
  if (state.phase === 'playing') {
    const hand = state.playerHands[state.activeHand]
    return {
      title: state.playerHands.length > 1 ? `Your turn · hand ${state.activeHand + 1} of ${state.playerHands.length}` : 'Your turn',
      detail: state.insuranceBet > 0 ? `Insurance lost ${money(state.insuranceBet)}. Play your hand.` : hand && handValue(hand.cards).soft ? 'A soft total includes an ace worth 11.' : 'Hit to draw a card. Stand to keep your total.',
    }
  }

  // A push describes one hand; it does not necessarily describe a round. Split-hand
  // payouts and insurance can cancel each other, so only the engine's final net is
  // allowed to choose the result colour or the amount we celebrate here.
  const natural = !state.holeHidden && isBlackjack(state.dealer)
  const blackjack = state.playerHands.some(hand => hand.outcome === 'blackjack')
  const detail = [
    natural ? 'Dealer blackjack.' : '',
    state.insuranceBet > 0 ? natural ? `Insurance won ${money(state.insuranceBet * 2)}.` : `Includes ${money(state.insuranceBet)} lost on insurance.` : '',
  ].filter(Boolean).join(' ') || 'Choose a new wager or play the same stake again.'
  return {
    title: `${state.lastNet > 0 ? blackjack ? 'Blackjack' : 'Round won' : state.lastNet < 0 ? 'Round lost' : 'Round even'} · ${signedMoney(state.lastNet)}`,
    detail,
    tone: state.lastNet > 0 ? 'win' : state.lastNet < 0 ? 'loss' : 'even',
  }
}

export function Blackjack({ api, audio, onExit }: { api: AgentCodeApiV1; audio: GameAudio; onExit: () => void }) {
  const { state, game } = useBlackjack(api, audio)
  const [muted, setMuted] = useState(() => audio.isMuted)
  const [showSettings, setShowSettings] = useState(false)
  const [sceneFailed, setSceneFailed] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)
  const settingsButtonRef = useRef<HTMLButtonElement>(null)
  const sceneRef = useRef<BlackjackScene | null>(null)
  const lastFocusedElement = useRef<HTMLElement | null>(null)
  const muteChanged = useRef(false)
  const muteSave = useRef<Promise<unknown>>(Promise.resolve())
  const settingsId = useId()
  const status = roundStatus(state)

  useEffect(() => {
    let current = true
    // A stored preference may return after the player has already clicked Sound.
    // That late read must never undo their newer choice; writes are also serialized
    // so a slow bridge cannot persist two rapid toggles in the opposite order.
    void api.storage.get<boolean>(MUTE_KEY).then(value => {
      if (!current || muteChanged.current || typeof value !== 'boolean') return
      audio.setMuted(value)
      setMuted(value)
    }).catch(() => {})
    return () => { current = false }
  }, [api, audio])

  useEffect(() => {
    const container = stageRef.current
    if (!container) return
    let scene: BlackjackScene | null = null
    const release = () => {
      const current = scene
      scene = null
      sceneRef.current = null
      current?.dispose()
      container.replaceChildren()
    }
    const onContextLost = (event: Event) => {
      event.preventDefault()
      release()
      setSceneFailed(true)
    }
    try {
      // The stage has intrinsic CSS dimensions before this effect runs. Measuring a
      // zero-height absolute child first makes the camera frame the table for a 1px
      // viewport and causes a visible jump as the host measures the new screen.
      scene = new BlackjackScene(container, {
        // Only the scene knows when a moving object reaches the felt. Keeping impact
        // sounds here avoids a second swish before the card actually lands.
        cardLand: () => audio.deal(), chipLand: () => audio.chip(),
        cardSweep: () => audio.sweep(), shuffle: () => audio.shuffle(),
      })
      sceneRef.current = scene
      container.addEventListener('webglcontextlost', onContextLost, true)
    } catch {
      // Some extension hosts disable WebGL entirely. Keep navigation and the bankroll
      // visible, and lock wagers while the table is unavailable. Losing the renderer
      // must never turn into an invisible hand that can still spend the player's chips.
      release()
      setSceneFailed(true)
    }
    return () => {
      container.removeEventListener('webglcontextlost', onContextLost, true)
      release()
    }
  }, [audio])

  useEffect(() => { if (state) sceneRef.current?.update(state) }, [state])

  useEffect(() => {
    const root = rootRef.current
    const previous = lastFocusedElement.current
    // Chromium drops focus to body when a clicked control disables itself. This
    // also happens WITHOUT changing phase/hand: an all-in chip or a split drawing
    // a non-pair used to silently disconnect the table's keyboard shortcuts.
    // Check every snapshot, but only recover an invalidated control's focus. A
    // deliberate blur of a still-enabled control must not pull the player back
    // from the gallery or host, and shortcuts must stay local to this table.
    const controlInvalidated = previous && (!previous.isConnected || previous.matches(':disabled'))
    // The browser can defer the disabled-control blur until after React's effect.
    // Recover both sides of that boundary: still on the invalid control, or body.
    const active = document.activeElement
    if (root && ((controlInvalidated && (active === previous || active === document.body)) ||
      (!state && active === document.body))) root.focus({ preventScroll: true })
  }, [state])

  useEffect(() => {
    if (showSettings) settingsRef.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus()
  }, [showSettings])

  const act = (fn: () => void) => { if (!sceneFailed) { audio.unlock(); fn() } }
  const rebetAndDeal = () => {
    if (!game || !state || Math.min(state.lastBet, state.bankroll) <= 0) return
    // These are synchronous engine transitions, not React state transitions. Reading
    // another render between them would add a needless click and invite a stale bet;
    // repeatBet is the source of truth for capping a stake to the current bankroll.
    game.newRound()
    game.repeatBet()
    game.deal()
  }
  const closeSettings = () => { setShowSettings(false); settingsButtonRef.current?.focus() }
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    const key = event.key.toLowerCase()
    if (event.ctrlKey || event.metaKey || event.altKey || event.nativeEvent.isComposing
      || target.isContentEditable || target.closest('input, textarea, select, [role="textbox"]')) return
    if (key === 'escape' && showSettings) { event.preventDefault(); event.stopPropagation(); closeSettings(); return }
    if (!['h', 's', 'd', 'p', 'enter', ' ', 'y', 'n'].includes(key)) return
    if (event.repeat) { event.preventDefault(); return }
    // Native button activation must be the only action for Enter/Space on a button.
    // Running the round shortcut too can hit twice or immediately deal a second hand.
    if ((key === 'enter' || key === ' ') && target.closest('button, a, [role="button"]')) return
    if (showSettings || !game || !state || sceneFailed) return
    let action: (() => void) | undefined
    if (state.phase === 'betting' && (key === 'enter' || key === ' ') && state.bet > 0) action = () => game.deal()
    else if (state.phase === 'settle' && (key === 'enter' || key === ' ')) action = state.lastBet > 0 && state.bankroll > 0 ? rebetAndDeal : () => game.newRound()
    else if (state.phase === 'playing') {
      if (key === 'h') action = () => game.hit()
      if (key === 's') action = () => game.stand()
      if (key === 'd' && game.canDouble()) action = () => game.double()
      if (key === 'p' && game.canSplit()) action = () => game.split()
    } else if (state.phase === 'insurance') {
      if (key === 'y') action = () => game.takeInsurance()
      if (key === 'n') action = () => game.declineInsurance()
    }
    // Space must not scroll the extension during a deal. Consuming it never permits
    // an action while loading, dealing, or waiting for the dealer.
    if (action || key === ' ') { event.preventDefault(); event.stopPropagation() }
    if (action) act(action)
  }
  const toggleMute = () => {
    muteChanged.current = true
    const next = !audio.isMuted
    audio.setMuted(next)
    setMuted(next)
    if (!next) audio.unlock()
    muteSave.current = muteSave.current.catch(() => {}).then(() => api.storage.set(MUTE_KEY, next)).catch(() => {})
  }

  return <div className="bj-root" ref={rootRef} tabIndex={0} role="region" aria-label="Blackjack game"
    onKeyDown={onKeyDown}
    onFocusCapture={event => { lastFocusedElement.current = event.target as HTMLElement }}
    onBlurCapture={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) lastFocusedElement.current = null }}
    onPointerDown={event => {
      const target = event.target as HTMLElement
      if (!target.closest('button, a, input, select, textarea')) event.currentTarget.focus({ preventScroll: true })
      if (showSettings && !settingsRef.current?.contains(target) && !settingsButtonRef.current?.contains(target)) setShowSettings(false)
    }}>
    <style>{styles}</style>
    <header className="bj-header">
      <button type="button" className="bj-button bj-back" onClick={onExit} aria-label="Back to games">‹ <span>Games</span></button>
      <div className="bj-heading"><h1>Blackjack</h1><span>THE CLASSIC TABLE</span></div>
      <div className="bj-bankroll"><span>Bankroll</span><strong>{state && state.phase !== 'loading' ? money(state.bankroll) : '—'}</strong></div>
      <button type="button" className="bj-button bj-tool" onClick={toggleMute} aria-label={muted ? 'Turn sound on' : 'Mute sound'} aria-pressed={!muted} title={muted ? 'Turn sound on' : 'Mute sound'}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 8h3l4-4v12l-4-4H3z" />{muted ? <path d="m13 7 5 6m0-6-5 6" /> : <><path d="M13 7a5 5 0 0 1 0 6" /><path d="M15 4a9 9 0 0 1 0 12" /></>}</svg>
      </button>
      <button type="button" ref={settingsButtonRef} className={`bj-button bj-tool${showSettings ? ' bj-selected' : ''}`} onClick={() => setShowSettings(value => !value)} aria-label="Table settings" aria-expanded={showSettings} aria-controls={settingsId} title="Table settings">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" /><path d="M7 3v4m6 1v4m-5 1v4" /></svg>
      </button>
    </header>

    <div className="bj-table">
      <div className="bj-scene" ref={stageRef} aria-hidden="true" />
      <div className="bj-table-rules"><span>BLACKJACK PAYS 3:2</span><span>{state?.settings.decks ?? 6} {state?.settings.decks === 1 ? 'deck' : 'decks'} · {state?.settings.hitSoft17 ? 'Dealer hits soft 17' : 'Dealer stands on 17'}</span></div>
      {state && !sceneFailed && <div className="bj-dealer" aria-label={`Dealer total ${dealerReadout(state)}${state.holeHidden && state.dealer.length > 1 ? ', one card hidden' : ''}`}>
        <span className="bj-dealer-label">DEALER</span><strong>{dealerReadout(state)}</strong>
        {state.dealer.length > 0 && <CardsReadout cards={state.dealer} hideHole={state.holeHidden} />}
      </div>}
      {sceneFailed && <div className="bj-scene-error" role="alert"><span className="bj-error-suit" aria-hidden="true">♠</span><h2>The 3D table couldn’t open</h2><p>Return to Games and reopen Blackjack to try again.</p><button type="button" className="bj-button bj-primary" onClick={onExit}>Back to games</button></div>}
    </div>

    <div className="bj-hand-rail">
      {state && state.playerHands.length > 0 ? <div className="bj-hands" role="list" aria-label="Your hands" style={{ gridTemplateColumns: `repeat(${state.playerHands.length}, minmax(0, 1fr))` }}>
        {state.playerHands.map((hand, index) => <HandReadout key={index} hand={hand} index={index} count={state.playerHands.length} active={state.phase === 'playing' && index === state.activeHand} />)}
      </div> : <div className="bj-wager-summary"><div><span>Your wager</span><strong>{money(state?.bet ?? 0)}</strong></div><span>Free practice chips.<br />The wager is placed when you deal.</span></div>}
    </div>

    <div className="bj-action-rail">
      <div className={`bj-status${status.tone ? ` bj-result-${status.tone}` : ''}`} role="status" aria-live="polite" aria-atomic="true"><strong>{sceneFailed ? 'Table unavailable' : status.title}</strong><span>{sceneFailed ? 'Reopen the game to continue.' : status.detail}</span></div>
      <div className="bj-controls">{state && game ? renderActions(state, game, act, rebetAndDeal, sceneFailed) : <span className="bj-waiting">Preparing the table…</span>}</div>
    </div>
    <footer className="bj-footer"><span>{state ? `${state.stats.wins} wins · ${state.stats.losses} losses · ${state.stats.pushes} pushes · ${state.stats.blackjacks} blackjacks` : 'Your stats will appear here'}</span><span>{state?.phase === 'playing' ? 'H hit · S stand · D double · P split' : state?.phase === 'insurance' ? 'Y insure · N decline' : state?.phase === 'settle' ? 'Enter replay' : 'Enter deal'}</span></footer>

    {showSettings && <div id={settingsId} ref={settingsRef} className="bj-settings" role="region" aria-label="Table settings">
      <div className="bj-settings-title"><h2>Table settings</h2><button type="button" className="bj-button" onClick={closeSettings} aria-label="Close table settings">×</button></div>
      <p>{state?.phase === 'betting' ? 'Choose the rules for your next hand.' : 'Rules can be changed before placing the next hand.'}</p>
      <fieldset disabled={!state || state.phase !== 'betting'}><legend>Shoe size</legend><div className="bj-segments">{[1, 2, 3, 4, 5, 6, 7, 8].map(decks => <button type="button" key={decks} className="bj-button" aria-label={`${decks} ${decks === 1 ? 'deck' : 'decks'}`} aria-pressed={state?.settings.decks === decks} onClick={() => game?.setDecks(decks)}>{decks}</button>)}</div></fieldset>
      <fieldset disabled={!state || state.phase !== 'betting'}><legend>Dealer on soft 17</legend><div className="bj-segments bj-rule-options"><button type="button" className="bj-button" aria-pressed={!state?.settings.hitSoft17} onClick={() => game?.setHitSoft17(false)}><strong>Stand · S17</strong><span>Stands on all 17s</span></button><button type="button" className="bj-button" aria-pressed={state?.settings.hitSoft17 ?? false} onClick={() => game?.setHitSoft17(true)}><strong>Hit · H17</strong><span>Hits ace + six</span></button></div></fieldset>
      <div className="bj-rule-note">Blackjack pays 3:2. Insurance pays 2:1.<br />Double on any first two cards. Split up to four hands.<br />Split aces receive one card each.</div>
    </div>}
  </div>
}

function HandReadout({ hand, index, count, active }: { hand: PlayerHand; index: number; count: number; active: boolean }) {
  return <div className={`bj-hand${active ? ' bj-hand-active' : ''}${hand.outcome ? ` bj-hand-${hand.outcome}` : ''}`} role="listitem" aria-current={active ? 'true' : undefined}>
    <div className="bj-hand-top"><span>{count > 1 ? `Hand ${index + 1}` : 'Your hand'}{active && <i>Your turn</i>}</span><strong>{totalReadout(hand.cards)}</strong></div>
    <div className="bj-hand-bottom"><CardsReadout cards={hand.cards} /><span className="bj-hand-stake">{money(hand.bet)}{hand.doubled ? ' · doubled' : ''}</span><span className="bj-hand-outcome">{hand.outcome ? OUTCOMES[hand.outcome] : hand.done ? 'Standing' : active ? '' : 'Waiting'}</span></div>
  </div>
}

function renderActions(state: BJState, game: NonNullable<ReturnType<typeof useBlackjack>['game']>, act: (fn: () => void) => void, rebetAndDeal: () => void, locked: boolean) {
  const repeat = Math.min(state.lastBet, state.bankroll)
  if (state.phase === 'betting') {
    if (state.bankroll <= 0 && state.bet <= 0) return <div className="bj-actions-centered"><button type="button" className="bj-button bj-primary" disabled={locked} onClick={() => act(() => game.rebuy())}>Buy in {money(state.settings.startingBankroll)}</button></div>
    return <><div className="bj-chip-rack" role="group" aria-label="Add chips to your wager">{CHIP_VALUES.map(value => <button type="button" key={value} className="bj-chip" aria-label={`Add ${money(value)} to wager`} disabled={locked || state.bet + value > state.bankroll} onClick={() => act(() => game.addChip(value))} title={`Add ${money(value)}`}><ChipFace value={value} size={44} /></button>)}</div><div className="bj-bet-actions"><button type="button" className="bj-button bj-quiet" disabled={locked || state.bet <= 0} onClick={() => act(() => game.clearBet())}>Clear</button><button type="button" className="bj-button" disabled={locked || repeat <= 0} onClick={() => act(() => game.repeatBet())} title={repeat > 0 ? `Set wager to ${money(repeat)}` : 'Play a hand to save a wager'}>Repeat{repeat > 0 ? ` ${money(repeat)}` : ''}</button><button type="button" className="bj-button bj-primary" disabled={locked || state.bet <= 0} onClick={() => act(() => game.deal())} aria-keyshortcuts="Enter Space">Deal{state.bet > 0 ? ` ${money(state.bet)}` : ''} <kbd>↵</kbd></button></div></>
  }
  if (state.phase === 'insurance') {
    const cost = insuranceCost(state.playerHands[0].bet)
    return <div className="bj-actions-centered"><button type="button" className="bj-button" disabled={locked || cost <= 0 || state.bankroll < cost} onClick={() => act(() => game.takeInsurance())} aria-keyshortcuts="Y">Insure for {money(cost)} <kbd>Y</kbd></button><button type="button" className="bj-button bj-primary" disabled={locked} onClick={() => act(() => game.declineInsurance())} aria-keyshortcuts="N">No insurance <kbd>N</kbd></button></div>
  }
  if (state.phase === 'playing') return <div className="bj-play-actions"><button type="button" className="bj-button bj-primary" disabled={locked} onClick={() => act(() => game.hit())} aria-keyshortcuts="H">Hit <kbd>H</kbd></button><button type="button" className="bj-button" disabled={locked} onClick={() => act(() => game.stand())} aria-keyshortcuts="S">Stand <kbd>S</kbd></button><button type="button" className="bj-button" disabled={locked || !game.canDouble()} onClick={() => act(() => game.double())} aria-keyshortcuts="D" title="Double your wager, receive one card, then stand">Double <kbd>D</kbd></button><button type="button" className="bj-button" disabled={locked || !game.canSplit()} onClick={() => act(() => game.split())} aria-keyshortcuts="P" title="Split a matching pair into two separate wagers">Split <kbd>P</kbd></button></div>
  if (state.phase === 'settle') return <div className="bj-actions-centered"><button type="button" className="bj-button" disabled={locked} onClick={() => act(() => game.newRound())}>New wager</button>{state.bankroll <= 0 ? <button type="button" className="bj-button bj-primary" disabled={locked} onClick={() => act(() => game.rebuy())}>Buy in {money(state.settings.startingBankroll)}</button> : <button type="button" className="bj-button bj-primary" disabled={locked || repeat <= 0} onClick={() => act(rebetAndDeal)} aria-keyshortcuts="Enter Space">Rebet {money(repeat)} & deal <kbd>↵</kbd></button>}</div>
  return <div className="bj-waiting"><span className="bj-wait-dot" />{state.phase === 'loading' ? 'Loading your table' : state.phase === 'dealing' ? 'Cards on their way' : 'Dealer is playing'}</div>
}
