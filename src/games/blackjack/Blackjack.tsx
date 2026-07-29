import { useEffect, useRef, useState } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import { ChipFace } from '../../assets/svg/ChipFace'
import { CHIP_VALUES, type ChipValue } from '../../shared/chipPalette'
import type { GameAudio } from '../../audio'
import { handValue, type BJState } from './engine'
import { BlackjackScene } from './scene'
import { useBlackjack } from './useBlackjack'

function dealerReadout(state: BJState): string {
  if (state.dealer.length === 0) return '—'
  if (state.holeHidden) return `${handValue([state.dealer[0]]).total} + ?`
  const { total } = handValue(state.dealer)
  return String(total)
}

function playerReadout(state: BJState): string {
  const hand = state.playerHands[state.activeHand] ?? state.playerHands[0]
  if (!hand || hand.cards.length === 0) return '—'
  const { total, soft } = handValue(hand.cards)
  if (total > 21) return `${total} — bust`
  return soft && total !== 21 ? `${total - 10}/${total}` : String(total)
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
  const stageRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<BlackjackScene | null>(null)

  const act = (fn: (() => void) | undefined) => {
    if (!fn) return
    audio.unlock()
    fn()
  }

  // Create the 3D scene once; feed it every state change.
  useEffect(() => {
    if (!stageRef.current) return
    // Impact sounds are triggered by the SCENE, not the engine: the engine knows when a
    // card is dealt, but only the scene knows when it actually lands. Firing on the
    // engine event played the clink while the card was still in the air.
    const scene = new BlackjackScene(stageRef.current, {
      cardLand: () => audio.deal(),
      chipLand: () => audio.chip(),
      cardSweep: () => audio.sweep(),
    })
    sceneRef.current = scene
    return () => {
      scene.dispose()
      sceneRef.current = null
    }
  }, [])
  useEffect(() => {
    if (state) sceneRef.current?.update(state)
  }, [state])

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

  const toggleMute = () => {
    const m = !muted
    setMuted(m)
    audio.setMuted(m)
  }

  return (
    <div className="mg-bj">
      <div className="mg-scene" ref={stageRef} />

      <div className="mg-hud-top">
        <button className="mg-icon-btn" onClick={onExit} title="Back to games">
          ‹ Games
        </button>
        {state ? (
          <div className="mg-bankroll">
            <span className="mg-bankroll-chip" /> ${state.bankroll}
          </div>
        ) : null}
        <div className="mg-topbar-right">
          {state ? (
            <span className="mg-stat-sm">
              {state.stats.wins}W · {state.stats.blackjacks}BJ · {state.stats.hands}
            </span>
          ) : null}
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

      {state && (state.dealer.length > 0 || state.playerHands.length > 0) ? (
        <div className="mg-readout">
          <span>Dealer {dealerReadout(state)}</span>
          <span className="mg-readout-you">You {playerReadout(state)}</span>
        </div>
      ) : null}

      {state && showSettings ? (
        <div className="mg-settings mg-hud-settings">
          <div className="mg-set-row">
            <span className="mg-set-label">Decks</span>
            <div className="mg-seg">
              {[1, 2, 4, 6, 8].map(d => (
                <button
                  key={d}
                  className={`mg-seg-btn${state.settings.decks === d ? ' active' : ''}`}
                  disabled={state.phase !== 'betting'}
                  onClick={() => game?.setDecks(d)}
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
              onClick={() => game?.setHitSoft17(!state.settings.hitSoft17)}
            >
              <span className="mg-toggle-dot" />
            </button>
          </div>
        </div>
      ) : null}

      {state && state.phase === 'settle' ? (
        <div className={`mg-banner ${state.lastNet > 0 ? 'good' : state.lastNet < 0 ? 'bad' : 'neutral'}`}>
          <div className="mg-banner-text">{state.message}</div>
        </div>
      ) : null}
      {state && state.phase === 'insurance' ? (
        <div className="mg-banner neutral">
          <div className="mg-banner-text">Insurance?</div>
        </div>
      ) : null}

      <div className="mg-hud-bottom">{state && game ? renderActions(state, game, act) : null}</div>
    </div>
  )
}

function renderActions(
  state: BJState,
  game: NonNullable<ReturnType<typeof useBlackjack>['game']>,
  act: (fn: (() => void) | undefined) => void,
) {
  if (state.phase === 'betting') {
    if (state.bankroll <= 0 && state.bet <= 0) {
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
              <ChipFace value={v} size={54} />
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
