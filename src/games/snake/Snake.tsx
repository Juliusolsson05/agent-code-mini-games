import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'
import { PACES, SnakeGame, type Dir, type Pace, type Records, type SnakeSnapshot } from './engine/game'
import { SnakeRenderer } from './render/renderer'
import { SnakeAudio } from './snakeAudio'
import styles from './snake.css?inline'

const RECORDS_KEY = 'snake.records.v2'
const PACE_KEY = 'snake.pace'
const MUTE_KEY = 'snake.muted'
const KEY_DIR: Record<string, Dir> = {
  arrowup: 'up', arrowdown: 'down', arrowleft: 'left', arrowright: 'right',
  w: 'up', s: 'down', a: 'left', d: 'right',
}
const PACE_LIST = Object.keys(PACES) as Pace[]
type Hud = Pick<SnakeSnapshot, 'score' | 'best' | 'status' | 'pace'>
type Actions = {
  turn: (direction: Dir) => void
  start: () => void
  pause: () => void
  fresh: () => void
  pace: (pace: Pace) => void
  mute: () => void
}
const consumesKeys = (target: EventTarget | null) => target instanceof Element &&
  !!target.closest('button, input, select, textarea, a, [contenteditable]:not([contenteditable="false"]), [role="slider"], [role="textbox"]')

/** React owns the scoreboard and controls; the renderer owns the moving creature.
 * Keeping completed simulation moves in refs prevents 60 React renders a second and
 * makes focus, persistence, and pause behaviour independent of animation timing. */
export function Snake({ api, onExit }: { api: AgentCodeApiV1; onExit: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const actionsRef = useRef<Actions | null>(null)
  const swipeRef = useRef<{ id: number; x: number; y: number } | null>(null)
  const [hud, setHud] = useState<Hud>({ score: 0, best: 0, status: 'ready', pace: 'classic' })
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const root = rootRef.current!
    const canvas = canvasRef.current!
    const audio = new SnakeAudio()
    const renderer = new SnakeRenderer(canvas)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => renderer.setReducedMotion(motion.matches)
    updateMotion()
    motion.addEventListener('change', updateMotion)
    let snapshot: SnakeSnapshot
    const game = new SnakeGame(value => { snapshot = value })
    snapshot = game.getSnapshot()
    let alive = true
    let mutedValue = false
    let muteTouched = false
    let paceTouched = false
    let hasStarted = false
    let recordsReady = false
    let lastSavedRecords = ''
    let lastHud = ''
    let lastTime = performance.now()
    let raf = 0
    let writes = Promise.resolve()

    const save = (key: string, value: boolean | string | Records) => {
      // Host storage is asynchronous. Serialize writes so a slow older response can
      // never finish after a newer score or mute choice and restore an obsolete value.
      writes = writes.then(() => api.storage.set(key, value)).catch(() => {})
    }
    const saveRecords = () => {
      if (!recordsReady) return
      const records = game.getRecords()
      const serialized = JSON.stringify(records)
      if (serialized === lastSavedRecords) return
      lastSavedRecords = serialized
      save(RECORDS_KEY, records)
    }
    const syncHud = () => {
      const key = `${snapshot.score}|${snapshot.best}|${snapshot.status}|${snapshot.pace}`
      if (!alive || key === lastHud) return
      lastHud = key
      setHud({ score: snapshot.score, best: snapshot.best, status: snapshot.status, pace: snapshot.pace })
    }
    const focusBoard = () => root.focus({ preventScroll: true })
    const turn = (direction: Dir) => {
      audio.unlock()
      const wasReady = snapshot.status === 'ready'
      if (game.turn(direction) && wasReady) {
        hasStarted = true
        lastTime = performance.now()
        audio.start()
      }
      syncHud()
    }
    const pause = () => {
      game.togglePause()
      // The first resumed frame starts now, not at the last pre-blur timestamp.
      // A clamped stale delta still changes the route immediately on resume, which
      // is especially unfair when the player paused just before a tight corner.
      lastTime = performance.now()
      syncHud()
    }
    const start = () => {
      if (snapshot.status === 'paused') pause()
      else {
        if (snapshot.status === 'playing') return
        if (snapshot.status !== 'ready') game.reset()
        turn('right')
      }
      focusBoard()
    }
    actionsRef.current = {
      turn: direction => { turn(direction); focusBoard() },
      start,
      pause: () => { pause(); focusBoard() },
      fresh: () => {
        game.reset()
        lastTime = performance.now()
        syncHud()
        focusBoard()
      },
      pace: pace => {
        if (snapshot.status === 'playing' || snapshot.status === 'paused') return
        paceTouched = true
        game.reset(pace)
        save(PACE_KEY, pace)
        syncHud()
        focusBoard()
      },
      mute: () => {
        muteTouched = true
        mutedValue = !mutedValue
        audio.setMuted(mutedValue)
        if (!mutedValue) audio.unlock()
        setMuted(mutedValue)
        save(MUTE_KEY, mutedValue)
        focusBoard()
      },
    }

    // Storage must merge into a live game: a quick player can already be eating while
    // the host answers these requests. Records merge upward in the engine; preferences
    // only hydrate if the player has not touched them or begun their first run.
    void Promise.allSettled([
      api.storage.get<Records>(RECORDS_KEY), api.storage.get<number>('snake.best'),
      api.storage.get<string>(PACE_KEY), api.storage.get<boolean>(MUTE_KEY),
    ]).then(([recordResult, legacyResult, paceResult, muteResult]) => {
      if (!alive) return
      const loaded: Partial<Records> = {}
      if (recordResult.status === 'fulfilled' && recordResult.value && typeof recordResult.value === 'object')
        for (const pace of PACE_LIST) {
          const value = recordResult.value[pace]
          if (typeof value === 'number' && Number.isFinite(value) && value >= 0) loaded[pace] = Math.floor(value)
        }
      if (legacyResult.status === 'fulfilled' && typeof legacyResult.value === 'number' &&
        Number.isFinite(legacyResult.value) && legacyResult.value >= 0)
        loaded.classic = Math.max(loaded.classic ?? 0, Math.floor(legacyResult.value))
      game.setRecords(loaded)
      if (!paceTouched && !hasStarted && snapshot.status === 'ready' && paceResult.status === 'fulfilled' &&
        PACE_LIST.includes(paceResult.value as Pace)) game.reset(paceResult.value as Pace)
      if (!muteTouched && muteResult.status === 'fulfilled' && typeof muteResult.value === 'boolean') {
        mutedValue = muteResult.value
        audio.setMuted(mutedValue)
        setMuted(mutedValue)
      }
      // A failed read is different from an empty record. In the former case, don't
      // overwrite an unknown saved high score with this session's smaller number.
      recordsReady = recordResult.status === 'fulfilled'
      saveRecords()
      syncHud()
    })

    const frame = (now: number) => {
      const dt = Math.min(80, Math.max(0, now - lastTime))
      lastTime = now
      const events = game.update(dt)
      if (events.turned) audio.turn()
      if (events.ate) { audio.eat(snapshot.score); saveRecords() }
      if (events.died) audio.gameOver()
      if (events.won) audio.win()
      renderer.draw(snapshot, now)
      syncHud()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    syncHud()

    const onKey = (event: KeyboardEvent) => {
      // Listening on the focused game root, rather than window, lets several games
      // coexist in the gallery. Native buttons keep Enter/Space, and text inputs or
      // host shortcuts never steer a hidden snake behind the player's active view.
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return
      // Tab hands the keyboard to navigation controls, whose native keys must stay
      // intact. Pause BEFORE that transfer so the player cannot lose a live run
      // while steering is unavailable. Do not cancel Tab or pause pointer actions:
      // clicking Pause or the direction pad must still perform exactly one action.
      if (event.key === 'Tab') { game.pause(); syncHud(); return }
      if (consumesKeys(event.target)) return
      const key = event.key.toLowerCase()
      const direction = KEY_DIR[key]
      if (direction) { event.preventDefault(); turn(direction); return }
      if (event.repeat) return
      if (key === ' ' || key === 'escape') {
        if (snapshot.status === 'playing' || snapshot.status === 'paused') {
          event.preventDefault()
          pause()
        }
      } else if (key === 'enter' && snapshot.status !== 'playing') {
        event.preventDefault()
        start()
      } else if (key === 'm') {
        event.preventDefault()
        actionsRef.current?.mute()
      }
    }
    const suspend = () => { game.pause(); lastTime = performance.now(); syncHud() }
    const onVisibility = () => { if (document.hidden) suspend() }
    const onFocusOut = (event: FocusEvent) => {
      if (!event.relatedTarget || !root.contains(event.relatedTarget as Node)) suspend()
    }
    root.addEventListener('keydown', onKey)
    root.addEventListener('focusout', onFocusOut)
    window.addEventListener('blur', suspend)
    document.addEventListener('visibilitychange', onVisibility)
    const resize = new ResizeObserver(() => renderer.resize())
    resize.observe(canvas)
    // A newly opened game is immediately playable, but mounting a second preview
    // must never steal focus from another game or a control the user is editing.
    if (!document.activeElement || document.activeElement === document.body) focusBoard()

    return () => {
      alive = false
      saveRecords()
      actionsRef.current = null
      cancelAnimationFrame(raf)
      root.removeEventListener('keydown', onKey)
      root.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('blur', suspend)
      document.removeEventListener('visibilitychange', onVisibility)
      motion.removeEventListener('change', updateMotion)
      resize.disconnect()
      audio.dispose()
    }
  }, [api])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (consumesKeys(event.target) || !event.isPrimary) return
    rootRef.current?.focus({ preventScroll: true })
    swipeRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const swipe = swipeRef.current
    if (!swipe || swipe.id !== event.pointerId) return
    const dx = event.clientX - swipe.x
    const dy = event.clientY - swipe.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 15) return
    actionsRef.current?.turn(Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'down' : 'up')
    swipeRef.current = { id: swipe.id, x: event.clientX, y: event.clientY }
  }
  const active = hud.status === 'playing' || hud.status === 'paused'
  const ended = hud.status === 'dead' || hud.status === 'won'

  return (
    <div className="sk-root" ref={rootRef} tabIndex={0} aria-label="Snake game" aria-describedby="sk-controls-help">
      <style>{styles}</style>
      <header className="sk-header">
        <button className="sk-back" onClick={onExit}><Icon name="back" />Arcade</button>
        <div className="sk-brand"><SnakeMark /><div><span className="sk-eyebrow">A little room to grow</span><h1>Snake</h1></div></div>
        <div className="sk-tools">
          <button className="sk-icon-button" onClick={() => actionsRef.current?.mute()}
            aria-label={muted ? 'Unmute sound' : 'Mute sound'} aria-pressed={muted} title={muted ? 'Unmute sound (M)' : 'Mute sound (M)'}>
            <Icon name={muted ? 'muted' : 'sound'} />
          </button>
          <button className="sk-icon-button" onClick={() => actionsRef.current?.pause()} disabled={!active}
            aria-label={hud.status === 'paused' ? 'Resume game' : 'Pause game'} title={hud.status === 'paused' ? 'Resume (Space)' : 'Pause (Space)'}>
            <Icon name={hud.status === 'paused' ? 'play' : 'pause'} />
          </button>
        </div>
      </header>

      <div className="sk-dashboard">
        <div className="sk-stat sk-score"><div className="sk-stat-label"><Icon name="apple" />Apples</div><strong>{String(hud.score).padStart(2, '0')}</strong></div>
        <div className="sk-stat"><div className="sk-stat-label"><Icon name="record" />Your best</div><strong>{String(hud.best).padStart(2, '0')}</strong></div>
        <fieldset className="sk-paces" disabled={active}>
          <legend>Find your pace</legend>
          <div className="sk-pace-options">
            {PACE_LIST.map(pace => <button key={pace} className={hud.pace === pace ? 'is-selected' : ''}
              aria-pressed={hud.pace === pace} onClick={() => actionsRef.current?.pace(pace)}
              title={active ? 'Finish this run to change pace' : `${PACES[pace].label} · ${Math.round(1000 / PACES[pace].stepMs * 10) / 10} cells per second`}>
              {PACES[pace].label}
            </button>)}
          </div>
        </fieldset>
      </div>

      <div className="sk-garden-frame">
        <div className="sk-stage" onPointerDown={onPointerDown} onPointerMove={onPointerMove}
          onPointerUp={() => { swipeRef.current = null }} onPointerCancel={() => { swipeRef.current = null }}>
          <canvas ref={canvasRef} className="sk-canvas" role="img"
            aria-label={`Garden playfield. ${hud.score} apples collected. Use arrow keys, WASD, swipe, or the direction buttons to move.`} />
          {hud.status === 'ready' && <div className="sk-overlay sk-ready">
            <div className="sk-card">
              <span className="sk-card-kicker"><span />YOUR NEXT LITTLE ESCAPE</span>
              <h2>One more apple.</h2>
              <p>Find your rhythm. Grow a little longer.<br />Watch the edges and your own tail.</p>
              <button className="sk-primary" onClick={() => actionsRef.current?.start()}>Let’s play<Icon name="arrow" /></button>
              <span className="sk-card-hint">Press Enter to begin</span>
            </div>
          </div>}
          {hud.status === 'paused' && <div className="sk-overlay sk-dim">
            <div className="sk-card">
              <span className="sk-card-kicker">TAKE YOUR TIME</span><h2>A little breather.</h2>
              <p>Your garden is right where you left it.</p>
              <button className="sk-primary" onClick={() => actionsRef.current?.pause()}><Icon name="play" />Keep growing</button>
              <button className="sk-text-button" onClick={() => actionsRef.current?.fresh()}><Icon name="restart" />Start fresh</button>
              <span className="sk-card-hint">Space or Escape to resume</span>
            </div>
          </div>}
          {ended && <div className={`sk-overlay sk-dim ${hud.status === 'won' ? 'sk-victory' : ''}`}>
            <div className="sk-card">
              <span className="sk-card-kicker">{hud.status === 'won' ? 'EVERY SQUARE. EVERY APPLE.' : 'A GOOD LITTLE RUN'}</span>
              <h2>{hud.status === 'won' ? 'Garden complete.' : 'Room for one more?'}</h2>
              <div className="sk-result-score"><Icon name="apple" /><strong>{hud.score}</strong><span>apples collected</span></div>
              <p>{hud.score > 0 && hud.score === hud.best ? 'That’s your personal best. Beautifully grown.' : `${PACES[hud.pace].label} pace · Your best is ${hud.best} apples.`}</p>
              <button className="sk-primary" onClick={() => actionsRef.current?.start()}><Icon name="restart" />Play again</button>
              <span className="sk-card-hint">Press Enter for another round</span>
            </div>
          </div>}
        </div>
      </div>

      <footer className="sk-footer">
        <div className="sk-controls-help" id="sk-controls-help"><div><span className="sk-key-group"><kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd></span><span>or <b>WASD</b> to steer</span></div><p>Space to pause <span>·</span> Swipe on the garden</p></div>
        <div className="sk-direction-pad" aria-label="Direction controls">
          {(['up', 'left', 'down', 'right'] as Dir[]).map(direction => <button key={direction}
            className={`sk-direction sk-direction-${direction}`} aria-label={`Move ${direction}`}
            disabled={hud.status === 'paused' || ended} onClick={() => actionsRef.current?.turn(direction)}>
            <Icon name="arrow" />
          </button>)}
        </div>
      </footer>
      <div className="sk-announcement" role="status" aria-live="polite" aria-atomic="true">
        {hud.status === 'dead' ? `Run finished. ${hud.score} apples. Best ${hud.best}.` : hud.status === 'won' ? `Garden complete! ${hud.score} apples.` : hud.status === 'paused' ? 'Game paused. Resume when you are ready.' : hud.status === 'ready' ? `${PACES[hud.pace].label} pace. Ready to play.` : 'Game started.'}
      </div>
    </div>
  )
}

type IconName = 'back' | 'arrow' | 'apple' | 'record' | 'sound' | 'muted' | 'play' | 'pause' | 'restart'
function Icon({ name }: { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'back' && <path d="m13 5-7 7 7 7M6 12h14" />}
    {name === 'arrow' && <path d="M4 12h15m-6-6 6 6-6 6" />}
    {name === 'apple' && <><path d="M12 7C5 2 1 12 7 19c2 2 3 0 5 0s3 2 5 0c6-7 2-17-5-12Z" fill="currentColor" stroke="none" /><path d="M12 6c0-3 2-4 4-4" /><path d="M12 5c2-3 5-2 5-2-1 3-3 4-5 3" fill="currentColor" stroke="none" /></>}
    {name === 'record' && <><path d="M8 4h8v6a4 4 0 0 1-8 0V4ZM12 14v5m-4 1h8M8 6H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4" /></>}
    {(name === 'sound' || name === 'muted') && <><path d="m12 4-6 5H3v6h3l6 5V4Z" />{name === 'sound' ? <><path d="M16 8a6 6 0 0 1 0 8M19 5a10 10 0 0 1 0 14" /></> : <path d="m17 9 5 6m0-6-5 6" />}</>}
    {name === 'play' && <path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none" />}
    {name === 'pause' && <><path d="M8 5v14M16 5v14" strokeWidth="3.5" /></>}
    {name === 'restart' && <><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" /></>}
  </svg>
}

function SnakeMark() {
  return <svg className="sk-brand-mark" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
    <rect width="44" height="44" rx="14" fill="#e7ecd7" />
    <path d="M11 29h12a6 6 0 0 0 0-12h-1" fill="none" stroke="#5d86dd" strokeWidth="9" strokeLinecap="round" />
    <ellipse cx="21" cy="17" rx="7" ry="5.8" fill="#6d94ef" />
    <circle cx="19" cy="13.7" r="2.3" fill="#fffef6" /><circle cx="19" cy="20.3" r="2.3" fill="#fffef6" />
    <circle cx="18.2" cy="13.7" r="1" fill="#193657" /><circle cx="18.2" cy="20.3" r="1" fill="#193657" />
  </svg>
}
