import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import { Face, Flag, LedCounter, Mine, type FaceState } from '../../assets/svg/MinesweeperGlyphs'
import { LEVELS, MinesweeperGame, type Cell, type Level, type MinesweeperSnapshot } from './engine/game'
import styles from './minesweeper.css?inline'

const BEST_KEY = 'minesweeper.best'
const LEVEL_KEY = 'minesweeper.level'
const LEVEL_NAMES: Record<Level, string> = { beginner: 'Beginner', intermediate: 'Intermediate', expert: 'Expert' }

// The host measures the content to size its iframe. Fixed, level-specific cells give
// the easy board generous targets while keeping Expert under 800px including chrome;
// viewport-dependent sizing here would create a feedback loop with that measurement.
const CELL_PX: Record<Level, number> = { beginner: 40, intermediate: 24, expert: 24 }
const NUM_COLOR = ['', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#666666']
const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
const isLevel = (value: unknown): value is Level => value === 'beginner' || value === 'intermediate' || value === 'expert'

type Gesture = {
  index: number
  button: number
  chord: boolean
  resolved: boolean
  pointerId?: number
}

function cellLabel(cell: Cell, index: number, cols: number): string {
  const position = `Row ${Math.floor(index / cols) + 1}, column ${(index % cols) + 1}`
  // Hidden engine cells contain the answer, but assistive technology must receive the
  // same information the artwork provides. Even after a loss, only exposed mines and
  // explicitly marked wrong flags can be described as such.
  if (cell.wrongFlag) return `${position}, incorrect flag`
  if (!cell.revealed) return `${position}, ${cell.mark === 'flag' ? 'flagged' : cell.mark === 'question' ? 'question mark' : 'covered'}`
  if (cell.mine) return `${position}, ${cell.detonated ? 'detonated mine' : 'mine'}`
  return `${position}, ${cell.adjacent ? `${cell.adjacent} adjacent ${cell.adjacent === 1 ? 'mine' : 'mines'}` : 'clear'}`
}

export function Minesweeper({ api, onExit }: { api: AgentCodeApiV1; onExit: () => void }) {
  const gameRef = useRef<MinesweeperGame | null>(null)
  const [snap, setSnap] = useState<MinesweeperSnapshot | null>(null)
  const [bestLoaded, setBestLoaded] = useState(false)
  const [flagMode, setFlagMode] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const [pressed, setPressed] = useState<{ index: number; chord: boolean } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const gestureRef = useRef<Gesture | null>(null)
  const pointerTypeRef = useRef('mouse')
  const interactedRef = useRef(false)
  const writes = useRef<Promise<unknown>>(Promise.resolve())
  const helpId = useId()

  useEffect(() => {
    let disposed = false
    const game = new MinesweeperGame(setSnap)
    gameRef.current = game
    interactedRef.current = false
    setBestLoaded(false)

    // Reads may finish after the player has started. Records merge into the engine,
    // whereas a preferred difficulty may only replace an untouched board. Waiting to
    // write records until hydration finishes prevents a quick win erasing older bests.
    void api.storage.get(BEST_KEY).then(value => {
      if (!disposed && value && typeof value === 'object') game.setBest(value as Partial<Record<Level, number | null>>)
      if (!disposed) setBestLoaded(true)
    }).catch(() => { /* Keep playing, but do not overwrite records we could not read. */ })
    void api.storage.get(LEVEL_KEY).then(value => {
      if (!disposed && !interactedRef.current && isLevel(value)) game.reset(value)
    }).catch(() => { /* Beginner is the safe default when preferences are unavailable. */ })

    // A release outside the field or a lost window focus must end the gesture without
    // applying it to whichever cell happens to receive the next mouse-up. Cell handlers
    // resolve first; this bubbling listener only clears leftover bookkeeping.
    const clearGesture = () => {
      gestureRef.current = null
      setPressed(null)
      game.setPeeking(false)
    }
    const releaseOutside = (event: globalThis.MouseEvent) => {
      if (event.buttons === 0) clearGesture()
    }
    window.addEventListener('mouseup', releaseOutside)
    window.addEventListener('blur', clearGesture)
    return () => {
      disposed = true
      window.removeEventListener('mouseup', releaseOutside)
      window.removeEventListener('blur', clearGesture)
      gestureRef.current = null
      gameRef.current = null
    }
  }, [api])

  const status = snap?.status
  useEffect(() => {
    if (status !== 'playing') return
    // The interval exists only during a round. The engine publishes only a changed
    // second, so neither pointer feedback nor record loading can restart board animation.
    const timer = window.setInterval(() => gameRef.current?.tick(), 250)
    return () => window.clearInterval(timer)
  }, [status])

  const beginnerBest = snap?.best.beginner
  const intermediateBest = snap?.best.intermediate
  const expertBest = snap?.best.expert
  useEffect(() => {
    if (!bestLoaded || !gameRef.current || [beginnerBest, intermediateBest, expertBest].every(value => value == null)) return
    const best = gameRef.current.getBest()
    // The host bridge can complete writes out of order. Capture the record now and
    // serialize updates so a slower earlier win cannot replace a faster later one.
    writes.current = writes.current.then(() => api.storage.set(BEST_KEY, best as never)).catch(() => {
      // The live record stays valid even if the host cannot persist it this time.
    })
  }, [api, bestLoaded, beginnerBest, intermediateBest, expertBest])

  if (!snap) return <div className="mg-loading">Preparing the minefield…</div>
  const game = gameRef.current!
  const ended = snap.status === 'won' || snap.status === 'lost'
  const best = snap.best[snap.level]
  const safeTotal = snap.cells.length - LEVELS[snap.level].mines
  const safeRevealed = snap.cells.filter(cell => cell.revealed && !cell.mine).length
  const completion = Math.round((safeRevealed / safeTotal) * 100)
  const face: FaceState = snap.status === 'won' ? 'cool' : snap.status === 'lost' ? 'dead' : snap.peeking ? 'oh' : 'smile'
  const glyphSize = Math.round(CELL_PX[snap.level] * 0.61)

  const clearGesture = () => {
    gestureRef.current = null
    setPressed(null)
    game.setPeeking(false)
  }
  const focusCell = (index: number) => {
    const bounded = Math.max(0, Math.min(snap.cells.length - 1, index))
    setFocusIndex(bounded)
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-cell="${bounded}"]`)?.focus({ preventScroll: true })
  }
  const reset = (level = snap.level, retainGridFocus = false) => {
    interactedRef.current = true
    clearGesture()
    game.reset(level)
    setFocusIndex(level === snap.level ? focusIndex : 0)
    if (retainGridFocus) focusCell(focusIndex)
    writes.current = writes.current.then(() => api.storage.set(LEVEL_KEY, level)).catch(() => { /* Preference writes must not delay a fresh board. */ })
  }
  const revealOrChord = (index: number) => {
    const x = index % snap.cols
    const y = Math.floor(index / snap.cols)
    if (snap.cells[index].revealed) game.chord(x, y)
    else game.reveal(x, y)
  }
  const showPress = (gesture: Gesture) => {
    setPressed({ index: gesture.index, chord: gesture.chord })
    game.setPeeking(gesture.button !== 2 || gesture.chord)
  }
  const resolveGesture = (gesture: Gesture, index: number) => {
    if (gesture.resolved) return
    gesture.resolved = true
    setPressed(null)
    game.setPeeking(false)
    if (gesture.index !== index) return
    const x = index % snap.cols
    const y = Math.floor(index / snap.cols)
    if (gesture.chord) game.chord(x, y)
    else if (gesture.button === 2 || flagMode) game.cycleMark(x, y)
    else revealOrChord(index)
  }

  const onMouseDown = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    // Touch produces compatibility mouse events after pointer-up. Pointer type, rather
    // than a timeout, rejects those events without blocking a real mouse used afterward.
    if (pointerTypeRef.current !== 'mouse' || ended || event.button > 2) return
    event.preventDefault()
    interactedRef.current = true
    focusCell(index)
    const current = gestureRef.current
    if (current) {
      if (current.resolved || current.index !== index) return
      current.chord ||= event.button === 1 || (event.buttons & 3) === 3
      showPress(current)
      return
    }
    const gesture = { index, button: event.button, chord: event.button === 1 || (event.buttons & 3) === 3, resolved: false }
    gestureRef.current = gesture
    showPress(gesture)
  }
  const onMouseUp = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    if (pointerTypeRef.current !== 'mouse') return
    const gesture = gestureRef.current
    if (!gesture) return
    // Marking on release is essential: right-then-left must be the same chord as
    // left-then-right. Resolve once on the first release, then swallow the remainder of
    // the gesture so a chord cannot also become an ordinary reveal or an extra flag.
    resolveGesture(gesture, index)
    if (event.buttons === 0) clearGesture()
  }
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    pointerTypeRef.current = event.pointerType
    if (event.pointerType === 'mouse' || ended || !event.isPrimary) return
    event.preventDefault()
    interactedRef.current = true
    focusCell(index)
    const gesture = { index, button: 0, chord: false, resolved: false, pointerId: event.pointerId }
    gestureRef.current = gesture
    event.currentTarget.setPointerCapture(event.pointerId)
    showPress(gesture)
  }
  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const gesture = gestureRef.current
    if (!gesture || gesture.pointerId !== event.pointerId) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX >= bounds.right || event.clientY < bounds.top || event.clientY >= bounds.bottom) clearGesture()
  }
  const onPointerUp = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    const gesture = gestureRef.current
    if (!gesture || gesture.pointerId !== event.pointerId) return
    event.preventDefault()
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX >= bounds.left && event.clientX < bounds.right && event.clientY >= bounds.top && event.clientY < bounds.bottom) resolveGesture(gesture, index)
    clearGesture()
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const onGridKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    // Ctrl+Home/End belong to grid navigation. Other modified keys still belong to
    // the host: Ctrl+F must never plant a flag while the player is opening Find.
    if (event.altKey || event.metaKey || event.nativeEvent.isComposing ||
      (event.ctrlKey && event.key !== 'Home' && event.key !== 'End')) return
    const rowStart = Math.floor(index / snap.cols) * snap.cols
    let next = index
    switch (event.key) {
      case 'ArrowLeft': next = Math.max(rowStart, index - 1); break
      case 'ArrowRight': next = Math.min(rowStart + snap.cols - 1, index + 1); break
      case 'ArrowUp': next = Math.max(index % snap.cols, index - snap.cols); break
      case 'ArrowDown': next = Math.min((snap.rows - 1) * snap.cols + index % snap.cols, index + snap.cols); break
      case 'Home': next = event.ctrlKey ? 0 : rowStart; break
      case 'End': next = event.ctrlKey ? snap.cells.length - 1 : rowStart + snap.cols - 1; break
      case 'Enter': case ' ':
        event.preventDefault()
        if (!event.repeat) {
          interactedRef.current = true
          revealOrChord(index)
        }
        return
      case 'f': case 'F':
        event.preventDefault()
        if (!event.repeat) {
          interactedRef.current = true
          game.cycleMark(index % snap.cols, Math.floor(index / snap.cols))
        }
        return
      case 'n': case 'N':
        event.preventDefault()
        if (!event.repeat) reset(snap.level, true)
        return
      case 'Escape': clearGesture(); return
      default: return
    }
    event.preventDefault()
    interactedRef.current = true
    focusCell(next)
  }

  const title = snap.status === 'won' ? 'Beautifully cleared.' : snap.status === 'lost' ? 'A mine. A little more wisdom.' : snap.status === 'ready' ? 'Your first move is safe.' : flagMode ? 'Mark your suspicions.' : 'Follow the numbers.'
  const description = snap.status === 'won' ? `All ${safeTotal} safe squares found in ${formatTime(snap.time)}.` : snap.status === 'lost' ? 'The field stays open. See what the numbers were telling you.' : snap.status === 'ready' ? 'Choose any square to open a little breathing room.' : flagMode ? 'Tap covered squares to flag, question, then clear.' : 'Each number counts the mines touching that square.'

  return (
    <div className="mine-root" data-level={snap.level} data-status={snap.status} style={{ '--ms-cell': `${CELL_PX[snap.level]}px`, '--mine-shell-width': `${CELL_PX[snap.level] * snap.cols + 28}px` } as CSSProperties}>
      <style>{styles}</style>
      <nav className="mine-nav" aria-label="Game navigation">
        <button className="mine-back" onClick={onExit}><span aria-hidden="true">←</span> Arcade</button>
        <span className="mine-edition">THE LOGIC COLLECTION <span aria-hidden="true">/</span> 03</span>
      </nav>

      <header className="mine-heading">
        <div><h1>Minesweeper<span aria-hidden="true">.</span></h1><p>A little patience. A lot of possibility.</p></div>
        <div className="mine-record"><span>PERSONAL BEST</span><strong>{best === null ? '—:—' : formatTime(best)}</strong></div>
      </header>

      <div className="mine-levels" role="group" aria-label="Difficulty">
        {(Object.keys(LEVELS) as Level[]).map(level => (
          <button key={level} className={snap.level === level ? 'is-selected' : ''} aria-pressed={snap.level === level} onClick={() => reset(level)}>
            <strong>{LEVEL_NAMES[level]}</strong><span>{LEVELS[level].cols} × {LEVELS[level].rows} <span aria-hidden="true">·</span> {LEVELS[level].mines} mines</span>
          </button>
        ))}
      </div>

      <section className="mine-cabinet" aria-label={`${LEVEL_NAMES[snap.level]} minefield`}>
        <div className="mine-instruments">
          <div className="mine-counter" aria-label={`${snap.minesLeft} mines remaining`}><span>MINES LEFT</span><div aria-hidden="true"><LedCounter value={snap.minesLeft} /></div></div>
          <button className="mine-reset" onClick={() => reset()} aria-label="New game" title="New game · N while on the board"><Face state={face} /></button>
          <div className="mine-counter mine-counter-time" aria-label={`Time ${snap.time} seconds`}><span>TIME</span><div aria-hidden="true"><LedCounter value={snap.time} /></div></div>
        </div>

        <div ref={gridRef} className="ms-field mine-field" role="grid" aria-label="Minesweeper board" aria-rowcount={snap.rows} aria-colcount={snap.cols} aria-describedby={helpId} onContextMenu={event => event.preventDefault()} onMouseLeave={clearGesture}>
          {Array.from({ length: snap.rows }, (_, y) => (
            <div className="mine-row" role="row" aria-rowindex={y + 1} key={y}>
              {Array.from({ length: snap.cols }, (_, x) => {
                const index = y * snap.cols + x
                const cell = snap.cells[index]
                const pressedX = pressed ? pressed.index % snap.cols : -9
                const pressedY = pressed ? Math.floor(pressed.index / snap.cols) : -9
                const isPressed = !!pressed && !cell.revealed && cell.mark !== 'flag' && (pressed.chord ? Math.abs(x - pressedX) <= 1 && Math.abs(y - pressedY) <= 1 : index === pressed.index)
                return (
                  <button key={index} type="button" role="gridcell" aria-colindex={x + 1} aria-label={cellLabel(cell, index, snap.cols)} aria-disabled={ended} data-cell={index} tabIndex={focusIndex === index ? 0 : -1}
                    className={`ms-cell ${cell.revealed ? 'ms-open' : 'ms-hidden'}${cell.detonated ? ' ms-boom' : ''}${cell.wrongFlag ? ' mine-wrong' : ''}${isPressed ? ' mine-pressed' : ''}`}
                    onFocus={() => setFocusIndex(index)} onKeyDown={event => onGridKeyDown(event, index)}
                    onMouseDown={event => onMouseDown(event, index)} onMouseUp={event => onMouseUp(event, index)}
                    onPointerDown={event => onPointerDown(event, index)} onPointerMove={onPointerMove} onPointerUp={event => onPointerUp(event, index)} onPointerCancel={clearGesture} onLostPointerCapture={clearGesture}
                    onClick={event => {
                      // Screen readers can invoke a button without generating pointer
                      // events. Keyboard events above cancel the native click, so this
                      // semantic activation is a separate, single reveal.
                      if (event.detail === 0) {
                        interactedRef.current = true
                        if (flagMode && !cell.revealed) game.cycleMark(x, y)
                        else revealOrChord(index)
                      }
                    }}
                  >
                    <span className="mine-cell-art" aria-hidden="true">
                      {cell.wrongFlag ? <><Mine size={glyphSize} /><span className="ms-x" /></> : cell.revealed ? cell.mine ? <Mine size={glyphSize} /> : cell.adjacent > 0 ? <span className="ms-num" style={{ color: NUM_COLOR[cell.adjacent] }}>{cell.adjacent}</span> : null : cell.mark === 'flag' ? <Flag size={glyphSize} /> : cell.mark === 'question' ? <span className="ms-question">?</span> : null}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="mine-progress-label"><span>{ended ? snap.status === 'won' ? 'FIELD CLEARED' : 'ROUND COMPLETE' : 'SAFE SQUARES'}<b>{safeRevealed} <span>/ {safeTotal}</span></b></span><strong>{completion}%</strong></div>
        <div className="mine-progress" role="progressbar" aria-label="Safe squares revealed" aria-valuemin={0} aria-valuemax={safeTotal} aria-valuenow={safeRevealed}><span style={{ width: `${completion}%` }} /></div>
      </section>

      <section className="mine-status" aria-label="Round status">
        <div className="mine-status-copy" role="status" aria-live="polite"><strong><span className="mine-status-dot" aria-hidden="true" />{title}</strong><p>{description}</p></div>
        {ended && <button className="mine-replay" onClick={() => reset()}>Play again <span aria-hidden="true">↗</span></button>}
      </section>

      <footer className="mine-footer">
        <button className={`mine-flag-mode${flagMode ? ' is-active' : ''}`} aria-pressed={flagMode} onClick={() => { interactedRef.current = true; setFlagMode(value => !value) }}><span aria-hidden="true">⚑</span> Flag mode <span className="mine-toggle" aria-hidden="true" /></button>
        <span className="mine-input-hint">{flagMode ? 'Tap to mark a square' : 'Click to reveal · Right-click to flag'}</span>
      </footer>
      <details className="mine-help">
        <summary>How to play <span aria-hidden="true">+</span></summary>
        <div id={helpId}>
          <p>Reveal every safe square. A number tells you how many of its eight neighbors contain mines. Your first reveal always opens a safe area.</p>
          <p><strong>Mouse / touch</strong> Click or tap to reveal. Right-click or turn on Flag mode to cycle flag → question → clear. Click a revealed number, press the middle button, or hold both mouse buttons to open its neighbors when enough flags are placed. Incorrect flags can still set off a mine.</p>
          <p><strong>Keyboard</strong> Arrow keys move. Home / End move across a row; Ctrl + Home / End jump to the board’s corners. Enter or Space reveal or chord. F marks a square. N starts a new board.</p>
        </div>
      </details>
    </div>
  )
}
