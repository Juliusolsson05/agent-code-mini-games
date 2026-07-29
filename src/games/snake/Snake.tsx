import { useEffect, useRef, useState } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import { SnakeGame, type Dir, type SnakeSnapshot } from './engine/game'
import { SnakeRenderer } from './render/renderer'
import { SnakeAudio } from './snakeAudio'

const BEST_KEY = 'snake.best'

const KEY_DIR: Record<string, Dir> = {
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
}

/**
 * Snake — a replica of Google Snake.
 *
 * The game loop is a ref-driven rAF, NOT React state. At 125ms/step and 60fps rendering,
 * routing every frame through React would re-render the tree ~60×/s just to move a
 * snapshot object around. React owns the CHROME (score, overlays); the canvas owns the
 * frame. State crosses into React only when something the chrome actually displays
 * changes — see the `lastHud` guard.
 */
export function Snake({ api, onExit }: { api: AgentCodeApiV1; onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<SnakeGame | null>(null)
  const audioRef = useRef<SnakeAudio | null>(null)
  const [hud, setHud] = useState({ score: 0, best: 0, status: 'ready' as SnakeSnapshot['status'] })
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const audio = new SnakeAudio()
    audioRef.current = audio
    const renderer = new SnakeRenderer(canvas)

    let snapshot: SnakeSnapshot
    const game = new SnakeGame(s => {
      snapshot = s
    })
    gameRef.current = game
    snapshot = game.getSnapshot()

    // The best score is the only persisted state.
    void api.storage.get<number>(BEST_KEY).then(v => {
      if (typeof v === 'number') game.setBest(v)
    })

    let raf = 0
    let last = performance.now()
    let lastHud = ''

    const frame = (now: number) => {
      // Clamp: a backgrounded tab hands back a multi-second delta, which would run
      // dozens of steps in one frame and kill the snake against a wall it never saw.
      const dt = Math.min(100, now - last)
      last = now

      const ev = game.update(dt)
      if (ev.turned) audio.turn()
      if (ev.ate) audio.eat(snapshot.score)
      if (ev.died) void api.storage.set(BEST_KEY, snapshot.best)

      renderer.draw(snapshot)

      const key = `${snapshot.score}|${snapshot.best}|${snapshot.status}`
      if (key !== lastHud) {
        lastHud = key
        setHud({ score: snapshot.score, best: snapshot.best, status: snapshot.status })
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      const dir = KEY_DIR[k]
      if (dir) {
        audio.unlock()
        game.turn(dir)
        e.preventDefault()
        return
      }
      if (k === ' ') {
        game.togglePause()
        e.preventDefault()
      } else if (k === 'enter') {
        audio.unlock()
        game.reset()
      } else if (k === 'm') {
        setMuted(m => {
          audio.setMuted(!m)
          return !m
        })
      }
    }
    window.addEventListener('keydown', onKey)

    const ro = new ResizeObserver(() => renderer.resize())
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      ro.disconnect()
      audio.dispose()
      gameRef.current = null
      audioRef.current = null
    }
    // api is stable for the component's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const restart = () => {
    audioRef.current?.unlock()
    gameRef.current?.reset()
  }

  return (
    <div className="sn-root">
      <div className="sn-header">
        <button className="sn-back" onClick={onExit}>
          ‹ Games
        </button>
        <div className="sn-stat">
          <AppleIcon />
          <span>{hud.score}</span>
        </div>
        <div className="sn-stat">
          <TrophyIcon />
          <span>{hud.best}</span>
        </div>
        <button
          className="sn-icon"
          onClick={() => {
            const next = !muted
            setMuted(next)
            audioRef.current?.setMuted(next)
          }}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      <div className="sn-stage">
        <canvas ref={canvasRef} className="sn-canvas" />

        {hud.status === 'ready' ? (
          <div className="sn-overlay">
            <div className="sn-card">
              <div className="sn-card-title">Snake</div>
              <div className="sn-card-sub">Press an arrow key to start</div>
            </div>
          </div>
        ) : null}

        {hud.status === 'paused' ? (
          <div className="sn-overlay dim">
            <div className="sn-card">
              <div className="sn-card-title">Paused</div>
              <div className="sn-card-sub">Space to resume</div>
            </div>
          </div>
        ) : null}

        {hud.status === 'dead' ? (
          <div className="sn-overlay dim">
            <div className="sn-card">
              <div className="sn-card-title">Game Over</div>
              <div className="sn-card-score">{hud.score}</div>
              <div className="sn-card-sub">Best {hud.best}</div>
              <button className="sn-play" onClick={restart}>
                Play Again
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="sn-foot">Arrows / WASD move · Space pause · Enter restart · M mute</div>
    </div>
  )
}

// Inline SVG so the header icons match Google's without fetching anything — the
// sandboxed frame's CSP forbids loading image files.
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M12 7.2c-1.2-1.7-3-2.4-4.7-1.5C5.2 6.8 4.6 9.5 5.5 12.2c.8 2.6 2.6 4.9 4.2 5.6.9.4 1.6.2 2.3-.1.7.3 1.4.5 2.3.1 1.6-.7 3.4-3 4.2-5.6.9-2.7.3-5.4-1.8-6.5-1.7-.9-3.3-.2-4.7 1.5z"
        fill="#e8412e"
      />
      <path d="M12.2 6.2c.2-1.3 1.2-2.3 2.5-2.5-.1 1.3-1 2.3-2.5 2.5z" fill="#6cbb3c" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M7 4h10v3.5a5 5 0 0 1-10 0V4zM4.5 5H6v2.6A2.6 2.6 0 0 1 4.5 5zM18 5h1.5A2.6 2.6 0 0 1 18 7.6V5zm-7 8.6h2V16h3v2H8v-2h3v-2.4z"
        fill="#f5c518"
      />
    </svg>
  )
}
