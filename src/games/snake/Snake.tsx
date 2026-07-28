import { useEffect, useRef, useState } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import { MAX_FRUIT, MIN_FRUIT, SKINS, SnakeGame, type SnakeState } from './SnakeGame'

function Overlay({ state }: { state: SnakeState }) {
  if (state.status === 'ready') {
    return (
      <>
        <div className="mg-ov-title">Snake</div>
        <div className="mg-ov-sub">
          Press an <kbd>arrow</kbd> or <kbd>WASD</kbd> to start
        </div>
      </>
    )
  }
  if (state.status === 'paused') {
    return (
      <>
        <div className="mg-ov-title">Paused</div>
        <div className="mg-ov-sub">
          Press <kbd>Space</kbd> to resume
        </div>
      </>
    )
  }
  const best = state.score >= state.high && state.score > 0 ? ' · new best!' : ''
  return (
    <>
      <div className="mg-ov-title">Game Over</div>
      <div className="mg-ov-big">{state.score}</div>
      <div className="mg-ov-sub">
        Best {state.high}
        {best}
      </div>
      <div className="mg-ov-sub">
        Press <kbd>Enter</kbd> to play again
      </div>
    </>
  )
}

export function Snake({ api, onExit }: { api: AgentCodeApiV1; onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<SnakeGame | null>(null)
  const [state, setState] = useState<SnakeState | null>(null)

  useEffect(() => {
    const game = new SnakeGame(canvasRef.current!, api, setState)
    gameRef.current = game
    const onKey = (e: KeyboardEvent) => {
      if (game.handleKey(e.key)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      game.dispose()
      gameRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const game = gameRef.current
  const fruitCount = state?.fruitCount ?? 1
  const skin = state?.skin ?? 0

  return (
    <div className="mg-snake">
      <div className="mg-topbar">
        <button className="mg-icon-btn" onClick={onExit} title="Back to games">
          ‹ Games
        </button>
        <div className="mg-snake-stats">
          <span className="mg-stat-pill">
            Score <b>{state?.score ?? 0}</b>
          </span>
          <span className="mg-stat-pill">
            Best <b>{state?.high ?? 0}</b>
          </span>
        </div>
        <div className="mg-topbar-right">
          <button className="mg-icon-btn" onClick={() => game?.toggleMute()} title="Mute (M)">
            {state?.muted ? '🔇' : '♪'}
          </button>
        </div>
      </div>

      <div className="mg-snake-board">
        <canvas ref={canvasRef} className="mg-snake-canvas" />
        {state && state.status !== 'playing' ? (
          <div className="mg-snake-overlay">
            <Overlay state={state} />
          </div>
        ) : null}
      </div>

      <div className="mg-snake-settings">
        <div className="mg-control">
          <span className="mg-set-label">Apples</span>
          <div className="mg-seg">
            {Array.from({ length: MAX_FRUIT - MIN_FRUIT + 1 }, (_, k) => MIN_FRUIT + k).map(n => (
              <button
                key={n}
                className={`mg-seg-btn${fruitCount === n ? ' active' : ''}`}
                onClick={() => game?.setFruitCount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="mg-control">
          <span className="mg-set-label">Style</span>
          <div className="mg-swatches">
            {SKINS.map((sk, i) => (
              <button
                key={sk.name}
                className={`mg-swatch${skin === i ? ' active' : ''}`}
                title={sk.name}
                style={{ background: sk.bg }}
                onClick={() => game?.setSkin(i)}
              >
                <span className="mg-sw-snake" style={{ background: sk.snake }} />
                <span className="mg-sw-food" style={{ background: sk.food }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mg-snake-hint">Arrows / WASD move · Space pause · Enter restart · M mute</div>
    </div>
  )
}
