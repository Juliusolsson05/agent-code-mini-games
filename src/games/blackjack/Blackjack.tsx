import { useEffect, useState } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

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

/** One hand of cards, fanned with overlap. The hole card key includes its face-down
 *  flag so revealing it remounts and re-plays the deal animation as a flip. */
function HandView({
  cards,
  holeHidden = false,
  active = false,
}: {
  cards: Card[]
  holeHidden?: boolean
  active?: boolean
}) {
  return (
    <div className={`mg-cards${active ? ' active' : ''}`}>
      {cards.map((c, i) => {
        const faceDown = holeHidden && i === 1
        return (
          <span key={`${c.id}-${faceDown}`} className="mg-card-wrap" style={{ ['--i' as string]: i }}>
            <CardView rank={c.rank} suit={c.suit} faceDown={faceDown} className="mg-card" />
          </span>
        )
      })}
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
          <button className="mg-icon-btn" onClick={toggleMute} title="Mute (sound)">
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

      <div className="mg-table">
        <Table />

        <div className="mg-dealer">
          <HandView cards={state.dealer} holeHidden={state.holeHidden} />
          {state.dealer.length > 0 ? <div className="mg-badge">{dealerBadge(state.dealer, state.holeHidden)}</div> : null}
        </div>

        {state.phase === 'settle' ? (
          <div className={`mg-banner ${bannerKind}`}>
            <div className="mg-banner-text">{state.message}</div>
          </div>
        ) : null}
        {state.phase === 'insurance' ? <div className="mg-banner neutral"><div className="mg-banner-text">Insurance?</div></div> : null}

        <div className="mg-players">
          {state.playerHands.map((h, i) => {
            const label = outcomeLabel(h.outcome)
            const isActive = state.phase === 'playing' && i === state.activeHand
            return (
              <div className={`mg-player-hand${isActive ? ' active' : ''}`} key={i}>
                <HandView cards={h.cards} active={isActive} />
                <div className="mg-hand-foot">
                  {h.cards.length > 0 ? <span className="mg-badge sm">{playerBadge(h.cards)}</span> : null}
                  {label ? <span className={`mg-outcome ${label.kind}`}>{label.text}</span> : null}
                  {h.bet > 0 ? <span className="mg-hand-bet">${h.bet}</span> : null}
                </div>
              </div>
            )
          })}
          {state.playerHands.length === 0 ? (
            <div className="mg-betspot">{state.bet > 0 ? `$${state.bet}` : 'Place your bet'}</div>
          ) : null}
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
              <Chip value={v} size={52} />
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

  // settle
  return (
    <div className="mg-row">
      <button className="mg-btn primary" onClick={() => act(() => game.newRound())}>
        Deal again
      </button>
    </div>
  )
}
