import { useEffect, useRef, useState } from 'react'
import type { MiniGamesApi } from '../../api'
import { BlockfallAudio } from './blockfallAudio'
import {
  BlockfallGame, DEFAULT_HANDLING, MARATHON_LINES, MODES, SPRINT_LINES,
  type Action, type BlockfallEvent, type BlockfallSnapshot, type Handling, type Mode, type Records,
} from './engine/game'
import { BlockfallRenderer } from './render/renderer'
import styles from './blockfall.css?inline'

const RECORDS_KEY = 'blockfall.records'
const HANDLING_KEY = 'blockfall.handling'
const MUTE_KEY = 'blockfall.muted'
const MODE_KEY = 'blockfall.mode'
const GHOST_KEY = 'blockfall.ghost'

// Physical key positions (event.code), not characters: the guideline layout is about
// where Z, X and C sit under the left hand, so a QWERTZ or AZERTY player gets the same
// shape of controls. Ctrl is the guideline's second counter-clockwise key, but it belongs
// to the host's shortcuts here, so Z alone rotates counter-clockwise.
const CODE_ACTION: Record<string, Action> = {
  ArrowLeft: 'left', ArrowRight: 'right', ArrowDown: 'softDrop', Space: 'hardDrop',
  ArrowUp: 'rotateCW', KeyX: 'rotateCW', KeyZ: 'rotateCCW',
  KeyC: 'hold', ShiftLeft: 'hold', ShiftRight: 'hold',
}

const MODE_INFO: Record<Mode, { label: string; goal: string; blurb: string }> = {
  marathon: { label: 'Marathon', goal: '150 lines', blurb: 'Speed climbs every ten lines.' },
  sprint: { label: 'Sprint', goal: '40 lines', blurb: 'Clear forty lines, fast.' },
  ultra: { label: 'Ultra', goal: '3 minutes', blurb: 'Score big before time runs out.' },
}

// A results card that appears the instant the last piece locks would cover the
// top-out animation and swallow an Enter meant as one more hard drop.
const RESULTS_DELAY_MS = 700

type Hud = Pick<BlockfallSnapshot, 'status' | 'mode' | 'score' | 'lines' | 'level' | 'pieces' | 'elapsedMs' | 'records' | 'newRecord'>
type Actions = {
  start: (mode?: Mode) => void
  select: (mode: Mode) => void
  togglePause: () => void
  modes: () => void
  mute: () => void
  ghost: (value: boolean) => void
  handling: (value: Partial<Handling> | null) => void
  suspend: () => void
  focus: () => void
}

const EMPTY_RECORDS: Records = { marathon: null, sprint: null, ultra: null }
const consumesKeys = (target: EventTarget | null) => target instanceof Element &&
  !!target.closest('button, input, select, textarea, a, [contenteditable]:not([contenteditable="false"]), [role="slider"], [role="textbox"], .bf-settings')

const formatScore = (value: number) => value.toLocaleString('en-US')

function formatTime(ms: number, precise: boolean): string {
  const total = Math.max(0, ms)
  if (!precise) {
    // Ultra counts down, so a clock showing 0:00 must mean time is really up.
    const seconds = Math.ceil(total / 1000)
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
  }
  const hundredths = Math.floor(total / 10)
  return `${Math.floor(hundredths / 6000)}:${String(Math.floor(hundredths / 100) % 60).padStart(2, '0')}.${String(hundredths % 100).padStart(2, '0')}`
}

function bestText(mode: Mode, records: Records): string {
  if (mode === 'sprint') return records.sprint ? formatTime(records.sprint.ms, true) : '—'
  const record = mode === 'marathon' ? records.marathon : records.ultra
  return record ? formatScore(record.score) : '—'
}

/** React owns text, controls and overlays; the canvas owns the well and its effects.
 * The engine runs inside refs so 60 frames a second never become 60 React renders, and
 * the running clock is written straight to its DOM node for the same reason. */
export function Blockfall({ api, onExit }: { api: MiniGamesApi; onExit: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<Actions | null>(null)
  const [hud, setHud] = useState<Hud>({ status: 'ready', mode: 'marathon', score: 0, lines: 0, level: 1, pieces: 0, elapsedMs: 0, records: EMPTY_RECORDS, newRecord: false })
  const [muted, setMuted] = useState(false)
  const [ghost, setGhost] = useState(true)
  const [handling, setHandling] = useState<Handling>(DEFAULT_HANDLING)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const root = rootRef.current!
    const canvas = canvasRef.current!
    const audio = new BlockfallAudio()
    const renderer = new BlockfallRenderer(canvas)
    const game = new BlockfallGame()
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => renderer.setReducedMotion(motion.matches)
    updateMotion()
    motion.addEventListener('change', updateMotion)
    let snapshot = game.getSnapshot()
    let alive = true
    let mutedValue = false
    const touched = { mute: false, mode: false, handling: false, ghost: false }
    let recordsReady = false
    let lastSavedRecords = ''
    let lastHud = ''
    let lastClock = ''
    let endedAt = 0
    let lastTime = performance.now()
    let raf = 0
    let writes = Promise.resolve()

    const save = (key: string, value: boolean | string | Records | Handling) => {
      // Host storage is asynchronous. Serialize writes so a slow older write can never
      // land after a newer one and restore an obsolete record or preference.
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
      if (!alive) return
      const s = snapshot
      const ended = s.status === 'over' || s.status === 'complete'
      // Pieces and elapsed time change constantly but only matter on the results card.
      const key = [s.status, s.mode, s.score, s.lines, s.level, s.newRecord, JSON.stringify(s.records), ended ? `${s.pieces}|${s.elapsedMs}` : ''].join('|')
      if (key === lastHud) return
      lastHud = key
      setHud({ status: s.status, mode: s.mode, score: s.score, lines: s.lines, level: s.level, pieces: s.pieces, elapsedMs: s.elapsedMs, records: s.records, newRecord: s.newRecord })
    }
    const syncClock = () => {
      const node = timeRef.current
      if (!node) return
      const text = snapshot.mode === 'ultra' ? formatTime(snapshot.remainingMs ?? 0, false) : formatTime(snapshot.elapsedMs, true)
      if (text === lastClock) return
      lastClock = text
      node.textContent = text
    }

    const play = (events: BlockfallEvent[]) => {
      // ARR 0 can report nine moves in one update and fast soft drop a row every frame;
      // one tick per batch is what the ear can separate anyway.
      let moved = false
      let softRows = false
      for (const event of events) {
        switch (event.type) {
          case 'move': moved = true; break
          case 'softDropRow': softRows = true; break
          case 'rotate': audio.rotate(event.kick > 0); break
          case 'rotateBlocked': audio.rotateBlocked(); break
          case 'hold': audio.hold(); break
          case 'hardDrop': audio.hardDrop(event.rows); break
          case 'land': audio.land(); break
          case 'lock': audio.lock(); break
          case 'clear': audio.clear(event); break
          case 'levelUp': audio.levelUp(event.level); break
          case 'countdown': audio.countdown(event.n); break
          case 'go': audio.go(); break
          case 'over': audio.gameOver(); endedAt = performance.now(); break
          case 'complete': audio.complete(); endedAt = performance.now(); break
          default: break
        }
      }
      if (moved) audio.move()
      if (softRows) audio.softDropRow()
      renderer.handle(events)
      if (events.some(event => event.type === 'over' || event.type === 'complete' || event.type === 'record')) saveRecords()
    }
    // Key presses are applied and heard immediately rather than on the next animation
    // frame. update(0) advances no time; it only hands back what the press caused.
    const flush = () => {
      const events = game.update(0)
      snapshot = game.getSnapshot()
      if (events.length) play(events)
      syncHud()
    }
    const focusBoard = () => root.focus({ preventScroll: true })

    const start = (mode: Mode = snapshot.mode) => {
      audio.unlock()
      touched.mode = true
      save(MODE_KEY, mode)
      game.start(mode)
      lastTime = performance.now()
      flush()
      focusBoard()
    }
    const togglePause = () => {
      if (snapshot.status === 'paused') {
        audio.unlock()
        game.resume()
        // The first resumed frame starts now, not at the pre-pause timestamp.
        lastTime = performance.now()
      } else {
        game.pause()
      }
      flush()
    }
    const select = (mode: Mode) => {
      if (snapshot.status !== 'ready' || mode === snapshot.mode) return
      touched.mode = true
      game.reset(mode)
      save(MODE_KEY, mode)
      flush()
    }
    const suspend = () => {
      game.pause()
      flush()
    }
    const mute = () => {
      touched.mute = true
      mutedValue = !mutedValue
      audio.setMuted(mutedValue)
      if (!mutedValue) audio.unlock()
      setMuted(mutedValue)
      save(MUTE_KEY, mutedValue)
    }
    actionsRef.current = {
      start,
      select,
      togglePause: () => { togglePause(); focusBoard() },
      modes: () => { game.reset(snapshot.mode); flush(); focusBoard() },
      mute: () => { mute(); focusBoard() },
      ghost: value => {
        touched.ghost = true
        renderer.setGhost(value)
        setGhost(value)
        save(GHOST_KEY, value)
      },
      handling: value => {
        touched.handling = true
        game.setHandling(value ?? DEFAULT_HANDLING)
        const next = game.getSnapshot().handling
        setHandling(next)
        save(HANDLING_KEY, next)
      },
      suspend,
      focus: focusBoard,
    }

    // Storage merges into a live game: a quick player may already be stacking while the
    // host answers. Records merge upward in the engine; preferences only hydrate if the
    // player has not changed them in this session.
    void Promise.allSettled([
      api.storage.get<Records>(RECORDS_KEY), api.storage.get<Handling>(HANDLING_KEY),
      api.storage.get<boolean>(MUTE_KEY), api.storage.get<string>(MODE_KEY), api.storage.get<boolean>(GHOST_KEY),
    ]).then(([recordResult, handlingResult, muteResult, modeResult, ghostResult]) => {
      if (!alive) return
      if (recordResult.status === 'fulfilled') game.setRecords(recordResult.value)
      if (!touched.handling && handlingResult.status === 'fulfilled' && handlingResult.value && typeof handlingResult.value === 'object') {
        game.setHandling(handlingResult.value)
        setHandling(game.getSnapshot().handling)
      }
      if (!touched.mute && muteResult.status === 'fulfilled' && typeof muteResult.value === 'boolean') {
        mutedValue = muteResult.value
        audio.setMuted(mutedValue)
        setMuted(mutedValue)
      }
      if (!touched.ghost && ghostResult.status === 'fulfilled' && typeof ghostResult.value === 'boolean') {
        renderer.setGhost(ghostResult.value)
        setGhost(ghostResult.value)
      }
      if (!touched.mode && snapshot.status === 'ready' && modeResult.status === 'fulfilled' && MODES.includes(modeResult.value as Mode))
        game.reset(modeResult.value as Mode)
      // A failed read is not an empty record: never overwrite unknown saved bests.
      recordsReady = recordResult.status === 'fulfilled'
      saveRecords()
      flush()
    })

    const frame = (now: number) => {
      const events = game.update(Math.max(0, now - lastTime))
      lastTime = now
      snapshot = game.getSnapshot()
      if (events.length) play(events)
      renderer.draw(snapshot, now)
      syncClock()
      syncHud()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    syncClock()

    const onKeyDown = (event: KeyboardEvent) => {
      // Listening on the focused game root, not window, keeps host shortcuts and other
      // views' text entry intact. Shift is a game key (hold), so only Alt, Ctrl and Meta
      // mark a chord that belongs to someone else.
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return
      // Tab hands the keyboard to the controls; pause first so a live run is never lost.
      if (event.key === 'Tab') { suspend(); return }
      if (consumesKeys(event.target)) return
      const status = snapshot.status
      const action = CODE_ACTION[event.code]
      if (action && (status === 'playing' || status === 'countdown')) {
        event.preventDefault()
        // The engine owns auto-repeat (DAS/ARR). The OS key repeat has its own delay and
        // rate and would fight it, so repeated keydowns are ignored.
        if (event.repeat) return
        audio.unlock()
        game.press(action)
        flush()
        return
      }
      if (status === 'ready') {
        const index = MODES.indexOf(snapshot.mode)
        if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
          event.preventDefault()
          select(MODES[(index + (event.code === 'ArrowLeft' ? MODES.length - 1 : 1)) % MODES.length]!)
          return
        }
        if (/^Digit[1-3]$/.test(event.code)) {
          event.preventDefault()
          start(MODES[Number(event.code.slice(5)) - 1])
          return
        }
        if (event.key === 'Enter' || event.code === 'Space') {
          event.preventDefault()
          if (!event.repeat) start()
          return
        }
      }
      if (event.repeat) return
      const key = event.key.toLowerCase()
      if (key === 'escape' || key === 'p') {
        if (status === 'playing' || status === 'countdown' || status === 'paused') {
          event.preventDefault()
          togglePause()
        }
      } else if (key === 'enter') {
        if (status === 'paused') {
          event.preventDefault()
          togglePause()
        } else if ((status === 'over' || status === 'complete') && performance.now() - endedAt > RESULTS_DELAY_MS) {
          event.preventDefault()
          start()
        }
      } else if (key === 'r' && status !== 'ready') {
        // Instant restart matters most in Sprint, where a bad opening is not worth finishing.
        event.preventDefault()
        start()
      } else if (key === 'm') {
        event.preventDefault()
        mute()
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      // Releases are always honoured, whatever else is focused or held, so a key can
      // never stay stuck down inside the engine.
      const action = CODE_ACTION[event.code]
      if (action) game.release(action)
    }
    const onVisibility = () => { if (document.hidden) suspend() }
    const onFocusOut = (event: FocusEvent) => {
      if (!event.relatedTarget || !root.contains(event.relatedTarget as Node)) suspend()
    }
    root.addEventListener('keydown', onKeyDown)
    root.addEventListener('keyup', onKeyUp)
    root.addEventListener('focusout', onFocusOut)
    window.addEventListener('blur', suspend)
    document.addEventListener('visibilitychange', onVisibility)
    const resize = new ResizeObserver(() => renderer.resize())
    resize.observe(canvas)
    // Immediately playable, without stealing focus from a control someone is using.
    if (!document.activeElement || document.activeElement === document.body) focusBoard()

    return () => {
      alive = false
      saveRecords()
      actionsRef.current = null
      cancelAnimationFrame(raf)
      root.removeEventListener('keydown', onKeyDown)
      root.removeEventListener('keyup', onKeyUp)
      root.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('blur', suspend)
      document.removeEventListener('visibilitychange', onVisibility)
      motion.removeEventListener('change', updateMotion)
      resize.disconnect()
      audio.dispose()
    }
  }, [api])

  const actions = () => actionsRef.current
  const active = hud.status === 'playing' || hud.status === 'paused' || hud.status === 'countdown'
  const ended = hud.status === 'over' || hud.status === 'complete'
  const goal = hud.mode === 'sprint' ? SPRINT_LINES : hud.mode === 'marathon' ? MARATHON_LINES : null
  const info = MODE_INFO[hud.mode]
  const pps = hud.elapsedMs > 0 ? (hud.pieces / (hud.elapsedMs / 1000)).toFixed(2) : '0.00'
  const result = hud.status === 'complete'
    ? hud.mode === 'sprint'
      ? { title: 'Forty lines down.', value: formatTime(hud.elapsedMs, true), unit: 'final time' }
      : { title: hud.mode === 'ultra' ? 'Time’s up.' : 'Marathon complete.', value: formatScore(hud.score), unit: 'points' }
    : hud.mode === 'sprint'
      ? { title: 'Out of room.', value: `${hud.lines}/${SPRINT_LINES}`, unit: 'lines cleared' }
      : { title: 'Out of room.', value: formatScore(hud.score), unit: 'points' }
  const closeSettings = () => {
    setSettingsOpen(false)
    actions()?.focus()
  }

  return (
    <div className="bf-root" ref={rootRef} tabIndex={0} aria-label="Blockfall game" aria-describedby="bf-controls-help"
      data-status={hud.status} data-mode={hud.mode}>
      <style>{styles}</style>
      <header className="bf-header">
        <button className="bf-back" onClick={onExit}><Icon name="back" />Arcade</button>
        <div className="bf-brand"><BlockfallMark /><div><span className="bf-eyebrow">STACK · SPIN · CLEAR</span><h1>Blockfall</h1></div></div>
        <div className="bf-tools">
          <button className="bf-icon-button" aria-label="Handling settings" aria-expanded={settingsOpen} title="Handling settings"
            onClick={() => {
              if (settingsOpen) closeSettings()
              else { actions()?.suspend(); setSettingsOpen(true) }
            }}>
            <Icon name="tune" />
          </button>
          <button className="bf-icon-button" onClick={() => actions()?.mute()}
            aria-label={muted ? 'Unmute sound' : 'Mute sound'} aria-pressed={muted} title={muted ? 'Unmute sound (M)' : 'Mute sound (M)'}>
            <Icon name={muted ? 'muted' : 'sound'} />
          </button>
          <button className="bf-icon-button" onClick={() => actions()?.togglePause()} disabled={!active}
            aria-label={hud.status === 'paused' ? 'Resume game' : 'Pause game'} title={hud.status === 'paused' ? 'Resume (Esc)' : 'Pause (Esc)'}>
            <Icon name={hud.status === 'paused' ? 'play' : 'pause'} />
          </button>
        </div>
      </header>

      <div className="bf-stage">
        <canvas ref={canvasRef} className="bf-canvas" role="img"
          aria-label={`Blockfall well. ${info.label}. Score ${formatScore(hud.score)}, ${hud.lines} lines, level ${hud.level}.`} />
        <div className="bf-stats">
          <div className="bf-stat bf-score"><span>Score</span><strong>{formatScore(hud.score)}</strong></div>
          <div className="bf-stat-pair">
            <div className="bf-stat"><span>Level</span><strong>{hud.level}</strong></div>
            <div className="bf-stat"><span>Lines</span><strong>{hud.lines}{goal !== null && <small>/{goal}</small>}</strong></div>
          </div>
          <div className="bf-stat"><span>{hud.mode === 'ultra' ? 'Time left' : 'Time'}</span><strong className="bf-time" ref={timeRef} /></div>
        </div>
        <div className="bf-best"><span>{info.label} best</span><strong>{bestText(hud.mode, hud.records)}</strong></div>

        {hud.status === 'ready' && <div className="bf-overlay">
          <div className="bf-card bf-card-wide">
            <span className="bf-kicker"><span />PICK YOUR RUN</span>
            <h2>Find the flow.</h2>
            <div className="bf-modes">
              {MODES.map((mode, index) => <button key={mode} className={`bf-mode bf-mode-${mode} ${hud.mode === mode ? 'is-selected' : ''}`}
                aria-label={`Play ${MODE_INFO[mode].label}`} onClick={() => actions()?.start(mode)}
                onMouseEnter={() => actions()?.select(mode)}>
                <span className="bf-mode-top"><span className="bf-mode-name">{MODE_INFO[mode].label}</span><kbd>{index + 1}</kbd></span>
                <span className="bf-mode-goal">{MODE_INFO[mode].goal}</span>
                <span className="bf-mode-blurb">{MODE_INFO[mode].blurb}</span>
                <span className="bf-mode-best"><Icon name="record" />{bestText(mode, hud.records)}</span>
              </button>)}
            </div>
            <span className="bf-hint">Enter to play {info.label} · ← → to choose</span>
          </div>
        </div>}

        {hud.status === 'paused' && !settingsOpen && <div className="bf-overlay bf-dim">
          <div className="bf-card">
            <span className="bf-kicker">{info.label.toUpperCase()} · PAUSED</span>
            <h2>Take a breath.</h2>
            <p>The well is hidden while you rest, so no peeking at your next move.</p>
            <button className="bf-primary" onClick={() => actions()?.togglePause()}><Icon name="play" />Keep playing</button>
            <div className="bf-card-row">
              <button className="bf-text-button" onClick={() => actions()?.start()}><Icon name="restart" />Restart</button>
              <button className="bf-text-button" onClick={() => actions()?.modes()}><Icon name="grid" />Change mode</button>
            </div>
            <span className="bf-hint">Esc or Enter to resume · R to restart</span>
          </div>
        </div>}

        {ended && <div className={`bf-overlay bf-dim bf-results ${hud.status === 'complete' ? 'is-complete' : ''}`}>
          <div className="bf-card">
            <span className={`bf-kicker ${hud.newRecord ? 'is-record' : ''}`}>{hud.newRecord ? 'NEW PERSONAL BEST' : info.label.toUpperCase()}</span>
            <h2>{result.title}</h2>
            <div className="bf-result-value"><strong>{result.value}</strong><span>{result.unit}</span></div>
            <dl className="bf-result-stats">
              <div><dt>Lines</dt><dd>{hud.lines}</dd></div>
              <div><dt>Level</dt><dd>{hud.level}</dd></div>
              <div><dt>Pieces</dt><dd>{hud.pieces}</dd></div>
              <div><dt>PPS</dt><dd>{pps}</dd></div>
              <div><dt>Time</dt><dd>{formatTime(hud.elapsedMs, true)}</dd></div>
            </dl>
            <button className="bf-primary" onClick={() => actions()?.start()}><Icon name="restart" />Play again</button>
            <button className="bf-text-button" onClick={() => actions()?.modes()}><Icon name="grid" />Change mode</button>
            <span className="bf-hint">Enter for another {info.label} run</span>
          </div>
        </div>}

        {settingsOpen && <Settings handling={handling} ghost={ghost} onClose={closeSettings}
          onHandling={value => actions()?.handling(value)} onGhost={value => actions()?.ghost(value)} />}
      </div>

      <footer className="bf-footer" id="bf-controls-help">
        <span><kbd>←</kbd><kbd>→</kbd> move</span>
        <span><kbd>↓</kbd> soft drop</span>
        <span><kbd className="bf-wide">Space</kbd> hard drop</span>
        <span><kbd>↑</kbd><kbd>X</kbd> rotate</span>
        <span><kbd>Z</kbd> counter</span>
        <span><kbd>C</kbd> hold</span>
        <span><kbd className="bf-wide">Esc</kbd> pause</span>
      </footer>
      <div className="bf-announcement" role="status" aria-live="polite" aria-atomic="true">
        {hud.status === 'over' ? `Topped out. ${formatScore(hud.score)} points, ${hud.lines} lines.`
          : hud.status === 'complete' ? `${info.label} complete. ${result.value} ${result.unit}.`
            : hud.status === 'paused' ? 'Game paused.'
              : hud.status === 'ready' ? `${info.label} selected. Press Enter to play.`
                : hud.status === 'countdown' ? 'Get ready.' : 'Game started.'}
      </div>
    </div>
  )
}

function Settings({ handling, ghost, onHandling, onGhost, onClose }: {
  handling: Handling
  ghost: boolean
  onHandling: (value: Partial<Handling> | null) => void
  onGhost: (value: boolean) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { ref.current?.querySelector<HTMLElement>('input')?.focus({ preventScroll: true }) }, [])
  const sdfOptions: [number, string][] = [[5, '5×'], [10, '10×'], [20, '20×'], [40, '40×'], [0, 'Instant']]
  return (
    <div className="bf-settings" role="dialog" aria-label="Handling settings" ref={ref}
      onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); onClose() } }}>
      <div className="bf-settings-head"><h3>Handling</h3><span>How pieces answer your keys.</span></div>
      <label className="bf-range">
        <span>Auto-shift delay <em>DAS</em></span><output>{handling.das} ms</output>
        <input type="range" min={40} max={300} step={1} value={handling.das} onChange={event => onHandling({ das: Number(event.currentTarget.value) })} />
      </label>
      <label className="bf-range">
        <span>Auto-repeat rate <em>ARR</em></span><output>{handling.arr === 0 ? 'Instant' : `${handling.arr} ms`}</output>
        <input type="range" min={0} max={80} step={1} value={handling.arr} onChange={event => onHandling({ arr: Number(event.currentTarget.value) })} />
      </label>
      <fieldset className="bf-sdf">
        <legend>Soft drop speed <em>SDF</em></legend>
        <div>{sdfOptions.map(([value, label]) => <button key={value} type="button" aria-pressed={handling.sdf === value}
          className={handling.sdf === value ? 'is-selected' : ''} onClick={() => onHandling({ sdf: value })}>{label}</button>)}</div>
      </fieldset>
      <label className="bf-toggle">
        <input type="checkbox" checked={ghost} onChange={event => onGhost(event.currentTarget.checked)} />
        <span>Show ghost piece</span>
      </label>
      <div className="bf-settings-actions">
        <button type="button" className="bf-text-button" onClick={() => onHandling(null)}>Reset to defaults</button>
        <button type="button" className="bf-small-primary" onClick={onClose}>Done</button>
      </div>
    </div>
  )
}

type IconName = 'back' | 'sound' | 'muted' | 'play' | 'pause' | 'restart' | 'tune' | 'grid' | 'record'
function Icon({ name }: { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'back' && <path d="m13 5-7 7 7 7M6 12h14" />}
    {(name === 'sound' || name === 'muted') && <><path d="m12 4-6 5H3v6h3l6 5V4Z" />{name === 'sound' ? <path d="M16 8a6 6 0 0 1 0 8M19 5a10 10 0 0 1 0 14" /> : <path d="m17 9 5 6m0-6-5 6" />}</>}
    {name === 'play' && <path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none" />}
    {name === 'pause' && <path d="M8 5v14M16 5v14" strokeWidth="3.5" />}
    {name === 'restart' && <path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" />}
    {name === 'tune' && <path d="M4 7h10m4 0h2M4 17h4m4 0h8M14 4v6M8 14v6" />}
    {name === 'grid' && <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />}
    {name === 'record' && <path d="M8 4h8v6a4 4 0 0 1-8 0V4ZM12 14v5m-4 1h8M8 6H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4" />}
  </svg>
}

function BlockfallMark() {
  // A T piece mid-spin: the one shape every stacker recognises as "the good one".
  const block = (x: number, y: number, fill: string) => <rect x={x} y={y} width="11" height="11" rx="2.6" fill={fill} />
  return <svg className="bf-brand-mark" width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
    <rect width="42" height="42" rx="12" fill="#1c2036" />
    {block(15.5, 7.5, '#b982ff')}
    {block(4, 19, '#a86ef2')}{block(15.5, 19, '#a86ef2')}{block(27, 19, '#a86ef2')}
    <rect x="4" y="31.5" width="34" height="3" rx="1.5" fill="#46dcff" opacity="0.8" />
  </svg>
}
