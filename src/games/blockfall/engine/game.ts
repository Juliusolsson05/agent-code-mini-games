// Blockfall rules: a functional match with modern guideline falling-block games.
//
// Pure state. No DOM, no timers and no Math.random of its own: the view feeds key
// presses and releases and advances time with update(). Everything the player can
// feel (auto-repeat timing, gravity, lock delay, scoring) is therefore deterministic
// and testable exactly.
//
// WHY a fixed 2 ms simulation step instead of per-frame logic: handling is measured in
// milliseconds (a 167 ms auto-repeat delay, a 33 ms repeat rate, a 500 ms lock delay).
// Frame-sized steps would make those depend on the display's refresh rate, so the same
// tap would behave differently on a 60 Hz and a 120 Hz screen. Stepping in small fixed
// increments makes them identical everywhere, and 2 ms steps are cheap.

import { PIECE_IDS, kickTests, pieceCells, spawnPosition, type PieceId, type Rotation } from './pieces'

export type { PieceId, Rotation } from './pieces'

export const COLS = 10
/** Total rows, including the two hidden spawn rows above the visible 20. */
export const ROWS = 22
export const HIDDEN_ROWS = 2
export const PREVIEW_COUNT = 5
export const LOCK_DELAY_MS = 500
export const MAX_LOCK_RESETS = 15
export const COUNTDOWN_MS = 3000
export const SPRINT_LINES = 40
export const MARATHON_LINES = 150
export const ULTRA_MS = 180_000

const STEP_MS = 2
// A stalled frame (a hidden tab, a debugger pause) must not replay seconds of gravity
// and auto-repeat in one burst; anything beyond this per update is dropped.
const MAX_FRAME_MS = 250

export type Mode = 'marathon' | 'sprint' | 'ultra'
export const MODES: readonly Mode[] = ['marathon', 'sprint', 'ultra']
export type Action = 'left' | 'right' | 'softDrop' | 'hardDrop' | 'rotateCW' | 'rotateCCW' | 'hold'
export type Status = 'ready' | 'countdown' | 'playing' | 'paused' | 'over' | 'complete'
export type TSpin = 'none' | 'mini' | 'full'
/** A locked block remembers which piece it came from so it keeps that piece's colour. */
export type Cell = PieceId | 'G' | null
export type Point = [x: number, y: number]

export type Handling = {
  /** Delayed auto shift: how long a direction is held before it repeats (ms). */
  das: number
  /** Auto repeat rate: ms between repeated moves; 0 slides straight to the wall. */
  arr: number
  /** Soft drop factor: multiple of the current gravity; 0 drops instantly. */
  sdf: number
  /** Entry delay before the next piece appears (ms). */
  are: number
  /** Extra entry delay after a line clear (ms). */
  lineClearDelay: number
}

export const DEFAULT_HANDLING: Handling = { das: 167, arr: 33, sdf: 20, are: 0, lineClearDelay: 0 }

export type ClearInfo = {
  rows: number[]
  lines: number
  tspin: TSpin
  /** True when this clear scored the back-to-back bonus. */
  b2b: boolean
  /** Combo count after this clear: 0 for the first clear in a chain. */
  combo: number
  perfectClear: boolean
  points: number
}

export type BlockfallEvent =
  | { type: 'countdown'; n: number }
  | { type: 'go' }
  | { type: 'spawn'; piece: PieceId }
  | { type: 'move'; dx: number }
  | { type: 'rotate'; kick: number; direction: 1 | -1 }
  | { type: 'rotateBlocked' }
  | { type: 'hold'; piece: PieceId }
  | { type: 'softDropRow' }
  | { type: 'hardDrop'; rows: number; cells: Point[] }
  | { type: 'land' }
  | { type: 'lock'; cells: Point[]; piece: PieceId }
  | ({ type: 'clear' } & ClearInfo)
  | { type: 'levelUp'; level: number }
  | { type: 'over'; reason: 'blockOut' | 'lockOut' }
  | { type: 'complete'; mode: Mode }
  | { type: 'record'; mode: Mode }

export type MarathonRecord = { score: number; lines: number; level: number }
export type Records = {
  marathon: MarathonRecord | null
  sprint: { ms: number } | null
  ultra: { score: number } | null
}

export type ActivePiece = { id: PieceId; rotation: Rotation; x: number; y: number }

export type BlockfallSnapshot = {
  /** Changes with every new run, so views can reset their own effects. */
  runId: number
  mode: Mode
  status: Status
  field: Cell[][]
  active: (ActivePiece & { cells: Point[] }) | null
  ghost: Point[] | null
  hold: PieceId | null
  holdUsed: boolean
  next: PieceId[]
  score: number
  lines: number
  level: number
  /** -1 when no combo chain is running. */
  combo: number
  b2b: boolean
  pieces: number
  elapsedMs: number
  remainingMs: number | null
  linesGoal: number | null
  /** 3, 2 or 1 during the countdown; 0 otherwise. */
  countdown: number
  lastClear: ClearInfo | null
  handling: Handling
  records: Records
  newRecord: boolean
  /** The stack has reached the top rows of the visible field. */
  danger: boolean
  /** 0 while the piece is airborne, rising to 1 as the lock delay runs out. */
  lockProgress: number
}

export type BlockfallOptions = {
  random?: () => number
  /** Ultra duration; overridable so tests do not need to simulate three minutes. */
  ultraMs?: number
}

/** Test and replay seeding, applied before the first piece spawns. */
export type SetupState = {
  /** Bottom-aligned rows, top to bottom: '.' is empty, a piece letter or any other character is a block. */
  field?: string[]
  queue?: PieceId[]
  hold?: PieceId | null
  level?: number
  lines?: number
  score?: number
  b2b?: boolean
  combo?: number
}

/** The guideline gravity curve: milliseconds for a piece to fall one row; 0 is instant (20G). */
export function gravityMsPerRow(level: number): number {
  if (level >= 20) return 0
  return Math.pow(0.8 - (level - 1) * 0.007, level - 1) * 1000
}

/** One 7-bag: every piece exactly once, in a Fisher–Yates shuffle. */
export function shuffledBag(random: () => number): PieceId[] {
  const bag = [...PIECE_IDS]
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    const swap = bag[i]!
    bag[i] = bag[j]!
    bag[j] = swap
  }
  return bag
}

const cellsOf = (piece: ActivePiece): Point[] =>
  pieceCells(piece.id, piece.rotation).map(([dx, dy]) => [piece.x + dx, piece.y + dy])

const emptyRow = (): Cell[] => Array<Cell>(COLS).fill(null)
const emptyField = (): Cell[][] => Array.from({ length: ROWS }, emptyRow)

/**
 * T-spin detection using the guideline's three-corner rule.
 *
 * - The piece must be a T whose last successful movement was a rotation.
 * - At least three of the four diagonal corners around its centre must be occupied;
 *   walls and floor count as occupied.
 * - It is a full T-spin when both corners on the side the T points to are occupied, or
 *   when the rotation needed the fifth kick test. Otherwise it is a mini.
 */
export function detectTSpin(field: readonly (readonly Cell[])[], piece: ActivePiece, lastWasRotation: boolean, lastKick: number): TSpin {
  if (piece.id !== 'T' || !lastWasRotation) return 'none'
  const cx = piece.x + 1
  const cy = piece.y + 1
  const filled = (x: number, y: number) => x < 0 || x >= COLS || y >= ROWS || (y >= 0 && field[y]![x] !== null)
  // Clockwise from top-left, so the two front corners of rotation r are r and r + 1.
  const corners = [filled(cx - 1, cy - 1), filled(cx + 1, cy - 1), filled(cx + 1, cy + 1), filled(cx - 1, cy + 1)]
  if (corners.filter(Boolean).length < 3) return 'none'
  const frontA = corners[piece.rotation]!
  const frontB = corners[(piece.rotation + 1) % 4]!
  return (frontA && frontB) || lastKick === 4 ? 'full' : 'mini'
}

const clampNumber = (value: unknown, min: number, max: number, fallback: number) =>
  typeof value === 'number' && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback

export class BlockfallGame {
  private readonly random: () => number
  private readonly ultraMs: number
  private mode: Mode = 'marathon'
  private status: Status = 'ready'
  private pausedFrom: 'countdown' | 'playing' = 'playing'
  private runId = 0
  private field: Cell[][] = emptyField()
  private queue: PieceId[] = []
  private active: ActivePiece | null = null
  private holdPiece: PieceId | null = null
  private holdUsed = false
  private score = 0
  private lines = 0
  private level = 1
  private combo = -1
  private b2b = false
  private pieces = 0
  private elapsedMs = 0
  private countdownMs = 0
  private accumulator = 0
  private gravityMs = 0
  private lockTimer: number | null = null
  private lockResets = 0
  private lowestY = 0
  private lastWasRotation = false
  private lastKick = -1
  private entryTimer = 0
  private held = { left: false, right: false, softDrop: false }
  private direction: 'left' | 'right' | null = null
  private dasMs = 0
  private dasCharged = false
  private arrMs = 0
  private handling: Handling = { ...DEFAULT_HANDLING }
  private records: Records = { marathon: null, sprint: null, ultra: null }
  private newRecord = false
  private lastClear: ClearInfo | null = null
  private events: BlockfallEvent[] = []

  constructor(options: BlockfallOptions = {}) {
    this.random = options.random ?? Math.random
    this.ultraMs = options.ultraMs ?? ULTRA_MS
    this.reset()
  }

  /** A fresh, not-yet-started run in the given mode. Records and handling persist. */
  reset(mode: Mode = this.mode): void {
    this.mode = mode
    this.status = 'ready'
    this.runId += 1
    this.field = emptyField()
    this.queue = []
    this.refill()
    this.active = null
    this.holdPiece = null
    this.holdUsed = false
    this.score = 0
    this.lines = 0
    this.level = 1
    this.combo = -1
    this.b2b = false
    this.pieces = 0
    this.elapsedMs = 0
    this.countdownMs = 0
    this.accumulator = 0
    this.gravityMs = 0
    this.lockTimer = null
    this.lockResets = 0
    this.lowestY = 0
    this.lastWasRotation = false
    this.lastKick = -1
    this.entryTimer = 0
    this.newRecord = false
    this.lastClear = null
    this.events = []
    this.releaseAll()
  }

  /** Start (or restart) a run: a fresh field, then the 3-2-1 countdown. */
  start(mode: Mode = this.mode): void {
    this.reset(mode)
    this.status = 'countdown'
    this.emit({ type: 'countdown', n: 3 })
  }

  setup(state: SetupState): void {
    if (this.status !== 'ready' && this.status !== 'countdown') throw new Error('setup is only available before the first piece spawns')
    if (state.field) {
      this.field = emptyField()
      const rows = state.field.slice(-ROWS)
      rows.forEach((row, index) => {
        const y = ROWS - rows.length + index
        for (let x = 0; x < COLS; x++) {
          const char = row[x] ?? '.'
          this.field[y]![x] = char === '.' ? null : (PIECE_IDS as readonly string[]).includes(char) ? (char as PieceId) : 'G'
        }
      })
    }
    if (state.queue) {
      this.queue = [...state.queue]
      this.refill()
    }
    if (state.hold !== undefined) this.holdPiece = state.hold
    if (state.level !== undefined) this.level = state.level
    if (state.lines !== undefined) this.lines = state.lines
    if (state.score !== undefined) this.score = state.score
    if (state.b2b !== undefined) this.b2b = state.b2b
    if (state.combo !== undefined) this.combo = state.combo
  }

  pause(): void {
    if (this.status !== 'playing' && this.status !== 'countdown') return
    this.pausedFrom = this.status
    this.status = 'paused'
    // Keys released while paused never produce a release event, so held state must not
    // survive the pause and slide a piece on resume.
    this.releaseAll()
  }

  resume(): void {
    if (this.status !== 'paused') return
    this.status = this.pausedFrom
    this.accumulator = 0
  }

  setHandling(handling: Partial<Handling>): void {
    const current = this.handling
    this.handling = {
      das: clampNumber(handling.das, 0, 500, current.das),
      arr: clampNumber(handling.arr, 0, 200, current.arr),
      sdf: clampNumber(handling.sdf, 0, 100, current.sdf),
      are: clampNumber(handling.are, 0, 1000, current.are),
      lineClearDelay: clampNumber(handling.lineClearDelay, 0, 1000, current.lineClearDelay),
    }
  }

  /** Merge stored records, keeping whichever is better. Invalid entries are ignored. */
  setRecords(value: unknown): void {
    if (!value || typeof value !== 'object') return
    const input = value as Record<string, unknown>
    const marathon = input.marathon as Record<string, unknown> | null | undefined
    if (marathon && typeof marathon.score === 'number' && Number.isFinite(marathon.score) && marathon.score > 0) {
      if (!this.records.marathon || marathon.score > this.records.marathon.score) {
        this.records.marathon = {
          score: marathon.score,
          lines: clampNumber(marathon.lines, 0, 100000, 0),
          level: clampNumber(marathon.level, 1, 20, 1),
        }
      }
    }
    const sprint = input.sprint as Record<string, unknown> | null | undefined
    if (sprint && typeof sprint.ms === 'number' && Number.isFinite(sprint.ms) && sprint.ms > 0) {
      if (!this.records.sprint || sprint.ms < this.records.sprint.ms) this.records.sprint = { ms: sprint.ms }
    }
    const ultra = input.ultra as Record<string, unknown> | null | undefined
    if (ultra && typeof ultra.score === 'number' && Number.isFinite(ultra.score) && ultra.score > 0) {
      if (!this.records.ultra || ultra.score > this.records.ultra.score) this.records.ultra = { score: ultra.score }
    }
  }

  getRecords(): Records {
    return {
      marathon: this.records.marathon ? { ...this.records.marathon } : null,
      sprint: this.records.sprint ? { ...this.records.sprint } : null,
      ultra: this.records.ultra ? { ...this.records.ultra } : null,
    }
  }

  press(action: Action): void {
    if (action === 'left' || action === 'right') {
      this.held[action] = true
      // The most recent direction wins, and every new press restarts the delay: that is
      // what makes a quick tap in the other direction move exactly one cell.
      this.direction = action
      this.dasMs = 0
      this.dasCharged = false
      this.arrMs = 0
      if (this.status === 'playing') this.tryMove(action === 'left' ? -1 : 1)
      return
    }
    if (action === 'softDrop') {
      this.held.softDrop = true
      return
    }
    if (this.status !== 'playing') return
    if (action === 'hardDrop') this.hardDrop()
    else if (action === 'rotateCW') this.tryRotate(1)
    else if (action === 'rotateCCW') this.tryRotate(-1)
    else this.hold()
  }

  release(action: Action): void {
    if (action === 'left' || action === 'right') {
      this.held[action] = false
      if (this.direction === action) {
        const other = action === 'left' ? 'right' : 'left'
        // Letting go of the newer direction hands control back to the older one if it is
        // still held, with a fresh delay rather than an immediate slide.
        this.direction = this.held[other] ? other : null
        this.dasMs = 0
        this.dasCharged = false
        this.arrMs = 0
      }
    } else if (action === 'softDrop') {
      this.held.softDrop = false
    }
  }

  releaseAll(): void {
    this.held = { left: false, right: false, softDrop: false }
    this.direction = null
    this.dasMs = 0
    this.dasCharged = false
    this.arrMs = 0
  }

  /** Advance time and return everything that happened since the previous call. */
  update(dtMs: number): BlockfallEvent[] {
    const dt = Math.max(0, Math.min(MAX_FRAME_MS, dtMs))
    if (this.status === 'countdown') this.runCountdown(dt)
    else if (this.status === 'playing') {
      this.accumulator += dt
      while (this.accumulator >= STEP_MS && this.status === 'playing') {
        this.accumulator -= STEP_MS
        this.step(STEP_MS)
      }
    }
    const events = this.events
    this.events = []
    return events
  }

  getSnapshot(): BlockfallSnapshot {
    const piece = this.active
    let ghost: Point[] | null = null
    if (piece && (this.status === 'playing' || this.status === 'paused')) {
      let drop = 0
      while (this.fits(piece, 0, drop + 1)) drop += 1
      ghost = cellsOf(piece).map(([x, y]) => [x, y + drop])
    }
    const countingDown = this.status === 'countdown' || (this.status === 'paused' && this.pausedFrom === 'countdown')
    return {
      runId: this.runId,
      mode: this.mode,
      status: this.status,
      field: this.field.map(row => [...row]),
      active: piece ? { ...piece, cells: cellsOf(piece) } : null,
      ghost,
      hold: this.holdPiece,
      holdUsed: this.holdUsed,
      next: this.queue.slice(0, PREVIEW_COUNT),
      score: this.score,
      lines: this.lines,
      level: this.level,
      combo: this.combo,
      b2b: this.b2b,
      pieces: this.pieces,
      elapsedMs: this.elapsedMs,
      remainingMs: this.mode === 'ultra' ? Math.max(0, this.ultraMs - this.elapsedMs) : null,
      linesGoal: this.mode === 'sprint' ? SPRINT_LINES : this.mode === 'marathon' ? MARATHON_LINES : null,
      countdown: countingDown ? Math.max(1, 3 - Math.floor(this.countdownMs / 1000)) : 0,
      lastClear: this.lastClear ? { ...this.lastClear, rows: [...this.lastClear.rows] } : null,
      handling: { ...this.handling },
      records: this.getRecords(),
      newRecord: this.newRecord,
      danger: this.field.slice(0, HIDDEN_ROWS + 4).some(row => row.some(cell => cell !== null)),
      lockProgress: piece && this.lockTimer !== null ? Math.min(1, Math.max(0, 1 - this.lockTimer / LOCK_DELAY_MS)) : 0,
    }
  }

  private emit(event: BlockfallEvent): void {
    this.events.push(event)
  }

  private refill(): void {
    while (this.queue.length <= PREVIEW_COUNT) this.queue.push(...shuffledBag(this.random))
  }

  private runCountdown(dt: number): void {
    const before = this.countdownMs
    this.countdownMs += dt
    for (const [at, n] of [[1000, 2], [2000, 1]] as const) {
      if (before < at && this.countdownMs >= at) this.emit({ type: 'countdown', n })
    }
    if (this.countdownMs >= COUNTDOWN_MS) {
      this.status = 'playing'
      this.emit({ type: 'go' })
      this.spawnNext()
    }
  }

  private step(ms: number): void {
    this.elapsedMs += ms
    if (this.mode === 'ultra' && this.elapsedMs >= this.ultraMs) {
      this.elapsedMs = this.ultraMs
      this.finish()
      return
    }
    if (!this.active) {
      this.entryTimer -= ms
      this.chargeAutoShift(ms, false)
      if (this.entryTimer <= 0) this.spawnNext()
      return
    }
    this.chargeAutoShift(ms, true)
    this.applyGravity(ms)
    this.applyLock(ms)
  }

  private chargeAutoShift(ms: number, canMove: boolean): void {
    if (!this.direction) return
    const dx = this.direction === 'left' ? -1 : 1
    if (!this.dasCharged) {
      this.dasMs += ms
      if (this.dasMs < this.handling.das) return
      this.dasCharged = true
      this.arrMs = 0
      if (canMove) this.autoShift(dx)
      return
    }
    // A charged direction stays charged across pieces (auto-shift carry): a player holding
    // right keeps sliding the next piece without waiting for the delay again.
    if (!canMove) return
    if (this.handling.arr === 0) {
      this.autoShift(dx)
      return
    }
    this.arrMs += ms
    while (this.arrMs >= this.handling.arr) {
      this.arrMs -= this.handling.arr
      if (!this.tryMove(dx)) {
        this.arrMs = 0
        break
      }
    }
  }

  private autoShift(dx: number): void {
    if (this.handling.arr === 0) {
      while (this.tryMove(dx)) { /* slide to the wall */ }
    } else {
      this.tryMove(dx)
    }
  }

  private fits(piece: ActivePiece, dx: number, dy: number, rotation: Rotation = piece.rotation): boolean {
    for (const [cx, cy] of pieceCells(piece.id, rotation)) {
      const x = piece.x + cx + dx
      const y = piece.y + cy + dy
      if (x < 0 || x >= COLS || y >= ROWS) return false
      if (y >= 0 && this.field[y]![x] !== null) return false
    }
    return true
  }

  private tryMove(dx: number): boolean {
    const piece = this.active
    if (!piece || !this.fits(piece, dx, 0)) return false
    piece.x += dx
    this.lastWasRotation = false
    this.emit({ type: 'move', dx })
    this.afterManipulation()
    return true
  }

  private tryRotate(direction: 1 | -1): void {
    const piece = this.active
    if (!piece) return
    const from = piece.rotation
    const to = ((from + direction + 4) % 4) as Rotation
    const tests = kickTests(piece.id, from, to)
    for (let index = 0; index < tests.length; index++) {
      const [dx, dy] = tests[index]!
      if (!this.fits(piece, dx, dy, to)) continue
      piece.x += dx
      piece.y += dy
      piece.rotation = to
      this.lastWasRotation = true
      this.lastKick = index
      this.emit({ type: 'rotate', kick: index, direction })
      if (piece.y > this.lowestY) {
        this.lowestY = piece.y
        this.lockResets = 0
      }
      this.afterManipulation()
      return
    }
    this.emit({ type: 'rotateBlocked' })
  }

  // Extended lock down: while a piece rests on something, each successful move or
  // rotation restarts the lock delay, but only 15 times. After that the piece locks the
  // moment it is grounded, so a player cannot stall forever.
  private afterManipulation(): void {
    if (this.lockTimer === null) return
    this.lockResets += 1
    this.lockTimer = this.lockResets >= MAX_LOCK_RESETS ? 0 : LOCK_DELAY_MS
  }

  private applyGravity(ms: number): void {
    const piece = this.active
    if (!piece) return
    if (!this.fits(piece, 0, 1)) {
      this.gravityMs = 0
      return
    }
    const soft = this.held.softDrop
    const base = gravityMsPerRow(this.level)
    const interval = soft ? (this.handling.sdf === 0 ? 0 : base / this.handling.sdf) : base
    if (interval === 0) {
      while (this.fits(piece, 0, 1)) this.fall(soft)
      this.gravityMs = 0
      return
    }
    this.gravityMs += ms
    while (this.gravityMs >= interval) {
      this.gravityMs -= interval
      if (!this.fits(piece, 0, 1)) {
        this.gravityMs = 0
        break
      }
      this.fall(soft)
    }
  }

  private fall(soft: boolean): void {
    const piece = this.active!
    piece.y += 1
    // A T that falls after rotating is no longer a spin: the last movement was a drop.
    this.lastWasRotation = false
    if (soft) {
      this.score += 1
      this.emit({ type: 'softDropRow' })
    }
    if (piece.y > this.lowestY) {
      this.lowestY = piece.y
      // Reaching a new lowest row restores the full move allowance.
      this.lockResets = 0
    }
  }

  private applyLock(ms: number): void {
    const piece = this.active
    if (!piece) return
    if (this.fits(piece, 0, 1)) {
      this.lockTimer = null
      return
    }
    if (this.lockTimer === null) {
      this.emit({ type: 'land' })
      this.lockTimer = this.lockResets >= MAX_LOCK_RESETS ? 0 : LOCK_DELAY_MS
    } else {
      this.lockTimer -= ms
    }
    if (this.lockTimer <= 0) this.lockPiece()
  }

  private hardDrop(): void {
    const piece = this.active
    if (!piece) return
    let rows = 0
    while (this.fits(piece, 0, 1)) {
      piece.y += 1
      rows += 1
    }
    // A zero-distance hard drop keeps a spin: the last movement is still the rotation.
    if (rows > 0) this.lastWasRotation = false
    this.score += rows * 2
    this.emit({ type: 'hardDrop', rows, cells: cellsOf(piece) })
    this.lockPiece()
  }

  private hold(): void {
    const piece = this.active
    if (!piece || this.holdUsed) return
    const current = piece.id
    this.holdUsed = true
    if (this.holdPiece) {
      const next = this.holdPiece
      this.holdPiece = current
      this.spawn(next)
    } else {
      this.holdPiece = current
      this.spawnNext()
    }
    this.emit({ type: 'hold', piece: current })
  }

  private spawnNext(): void {
    const id = this.queue.shift()!
    this.refill()
    this.spawn(id)
  }

  private spawn(id: PieceId): void {
    const { x, y } = spawnPosition(id)
    const piece: ActivePiece = { id, rotation: 0, x, y }
    this.active = piece
    this.lockTimer = null
    this.lockResets = 0
    this.gravityMs = 0
    this.lastWasRotation = false
    this.lastKick = -1
    if (!this.fits(piece, 0, 0)) {
      this.gameOver('blockOut')
      return
    }
    // The guideline drops a new piece one row immediately so it is visible at once.
    if (this.fits(piece, 0, 1)) piece.y += 1
    this.lowestY = piece.y
    this.emit({ type: 'spawn', piece: id })
    // Auto-shift carry: a direction that is already charged moves the new piece straight
    // away instead of waiting a repeat interval, which is what lets a player holding a
    // direction stack a column of pieces against the wall without a stutter.
    if (this.direction && this.dasCharged) this.autoShift(this.direction === 'left' ? -1 : 1)
  }

  private lockPiece(): void {
    const piece = this.active
    if (!piece) return
    const cells = cellsOf(piece)
    const tspin = detectTSpin(this.field, piece, this.lastWasRotation, this.lastKick)
    for (const [x, y] of cells) if (y >= 0) this.field[y]![x] = piece.id
    this.active = null
    this.pieces += 1
    this.lockTimer = null
    this.holdUsed = false
    this.emit({ type: 'lock', cells, piece: piece.id })
    if (cells.every(([, y]) => y < HIDDEN_ROWS)) {
      this.gameOver('lockOut')
      return
    }

    const rows: number[] = []
    for (let y = 0; y < ROWS; y++) if (this.field[y]!.every(cell => cell !== null)) rows.push(y)
    if (rows.length > 0) {
      const kept = this.field.filter((_, y) => !rows.includes(y))
      this.field = [...Array.from({ length: rows.length }, emptyRow), ...kept]
    }
    this.score += this.scoreLock(rows, tspin)

    const previousLevel = this.level
    if (this.mode !== 'sprint') {
      const cap = this.mode === 'marathon' ? 15 : 19
      this.level = Math.max(this.level, Math.min(cap, Math.floor(this.lines / 10) + 1))
    }
    if (this.level > previousLevel) this.emit({ type: 'levelUp', level: this.level })

    if ((this.mode === 'sprint' && this.lines >= SPRINT_LINES) || (this.mode === 'marathon' && this.lines >= MARATHON_LINES)) {
      this.finish()
      return
    }
    const delay = this.handling.are + (rows.length > 0 ? this.handling.lineClearDelay : 0)
    if (delay > 0) this.entryTimer = delay
    else this.spawnNext()
  }

  private scoreLock(rows: number[], tspin: TSpin): number {
    const lines = rows.length
    const level = this.level
    let base: number
    let difficult: boolean
    if (tspin === 'full') {
      base = [400, 800, 1200, 1600][lines] ?? 1600
      difficult = lines > 0
    } else if (tspin === 'mini') {
      base = [100, 200, 400][lines] ?? 400
      difficult = lines > 0
    } else {
      base = [0, 100, 300, 500, 800][lines] ?? 800
      difficult = lines === 4
    }
    let points = base * level
    const backToBack = difficult && this.b2b
    if (backToBack) points = Math.floor(points * 1.5)
    if (lines > 0) {
      this.combo += 1
      if (this.combo > 0) points += 50 * this.combo * level
      // A difficult clear starts or continues the chain; an ordinary clear breaks it.
      // A T-spin with no lines leaves it untouched.
      this.b2b = difficult
    } else {
      this.combo = -1
    }
    const perfectClear = lines > 0 && this.field.every(row => row.every(cell => cell === null))
    if (perfectClear) points += (lines === 4 && backToBack ? 3200 : [0, 800, 1200, 1800, 2000][lines]!) * level
    this.lines += lines
    if (lines > 0 || tspin !== 'none') {
      const info: ClearInfo = { rows, lines, tspin, b2b: backToBack, combo: Math.max(0, this.combo), perfectClear, points }
      this.lastClear = info
      this.emit({ type: 'clear', ...info, rows: [...rows] })
    }
    return points
  }

  private gameOver(reason: 'blockOut' | 'lockOut'): void {
    this.status = 'over'
    this.releaseAll()
    this.emit({ type: 'over', reason })
    this.commitRecord(false)
  }

  private finish(): void {
    this.status = 'complete'
    this.active = null
    this.releaseAll()
    this.emit({ type: 'complete', mode: this.mode })
    this.commitRecord(true)
  }

  private commitRecord(completed: boolean): void {
    let improved = false
    if (this.mode === 'marathon' && this.score > 0 && (!this.records.marathon || this.score > this.records.marathon.score)) {
      this.records.marathon = { score: this.score, lines: this.lines, level: this.level }
      improved = true
    } else if (this.mode === 'ultra' && this.score > 0 && (!this.records.ultra || this.score > this.records.ultra.score)) {
      this.records.ultra = { score: this.score }
      improved = true
    } else if (this.mode === 'sprint' && completed && (!this.records.sprint || this.elapsedMs < this.records.sprint.ms)) {
      // Sprint is only a record when all 40 lines were cleared; topping out is not a time.
      this.records.sprint = { ms: this.elapsedMs }
      improved = true
    }
    if (improved) {
      this.newRecord = true
      this.emit({ type: 'record', mode: this.mode })
    }
  }
}
