// Minesweeper rules, replicating the Windows 95 game.
//
// Pure grid logic — no pixels, no DOM. Same discipline as the Snake engine: the renderer
// can be rewritten without touching a rule.

export type Level = 'beginner' | 'intermediate' | 'expert'

/** The three official board sizes. Expert is 30×16, NOT 16×30 — a common transposition. */
export const LEVELS: Record<Level, { cols: number; rows: number; mines: number }> = {
  beginner: { cols: 9, rows: 9, mines: 10 },
  intermediate: { cols: 16, rows: 16, mines: 40 },
  expert: { cols: 30, rows: 16, mines: 99 },
}

export type Mark = 'none' | 'flag' | 'question'
export type Status = 'ready' | 'playing' | 'won' | 'lost'

export type Cell = {
  mine: boolean
  /** Mines in the 8 neighbours. Meaningless until mines are placed. */
  adjacent: number
  revealed: boolean
  mark: Mark
  /** Set on loss: the mine you actually detonated, drawn on a red field. */
  detonated: boolean
  /** Set on loss: a flag that was NOT a mine, drawn with a strike-through. */
  wrongFlag: boolean
}

export type MinesweeperSnapshot = {
  level: Level
  cols: number
  rows: number
  cells: Cell[]
  status: Status
  /** Mines minus flags placed. Goes NEGATIVE if you over-flag — the original does too. */
  minesLeft: number
  /** Whole seconds, capped at 999 like the original's three-digit display. */
  time: number
  /** True while a mouse button is held on the field — drives the 😮 face. */
  peeking: boolean
  best: Record<Level, number | null>
}

const NEIGHBOURS = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
] as const

export type MinesweeperOptions = {
  /** Injected sources keep the actual game rules testable without replacing globals. */
  now?: () => number
  random?: () => number
}

export class MinesweeperGame {
  private level: Level = 'beginner'
  private cols = 9
  private rows = 9
  private mineCount = 10
  private cells: Cell[] = []
  private status: Status = 'ready'
  private placed = false
  private startedAt: number | null = null
  private elapsed = 0
  private lastPublishedTime = 0
  private peeking = false
  private readonly now: () => number
  private readonly random: () => number
  private best: Record<Level, number | null> = {
    beginner: null,
    intermediate: null,
    expert: null,
  }

  constructor(private onChange: (s: MinesweeperSnapshot) => void, options: MinesweeperOptions = {}) {
    this.now = options.now ?? Date.now
    this.random = options.random ?? Math.random
    this.reset('beginner')
  }

  private idx(x: number, y: number): number {
    return y * this.cols + x
  }
  private inBounds(x: number, y: number): boolean {
    return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0 && x < this.cols && y < this.rows
  }

  reset(level: Level = this.level): void {
    const spec = LEVELS[level]
    this.level = level
    this.cols = spec.cols
    this.rows = spec.rows
    this.mineCount = spec.mines
    this.cells = Array.from({ length: spec.cols * spec.rows }, () => ({
      mine: false,
      adjacent: 0,
      revealed: false,
      mark: 'none' as Mark,
      detonated: false,
      wrongFlag: false,
    }))
    this.status = 'ready'
    this.placed = false
    this.startedAt = null
    this.elapsed = 0
    this.peeking = false
    this.emit()
  }

  setBest(best: Partial<Record<Level, number | null>>): void {
    // Storage is an asynchronous, untrusted boundary. A late response must never erase
    // a record earned since the read began, and malformed values must not poison the
    // comparison forever (NaN in particular would make every future win lose).
    if (!best || typeof best !== 'object') return
    for (const level of Object.keys(LEVELS) as Level[]) {
      const value = best[level]
      if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 999) continue
      const current = this.best[level]
      if (current === null || value < current) this.best[level] = value
    }
    this.emit()
  }

  /**
   * Place mines, avoiding the first-clicked cell AND its eight neighbours.
   *
   * Windows 95 only guaranteed the clicked cell itself wasn't a mine, which very often
   * opened a single number and left you guessing on move one. Excluding the whole 3×3
   * guarantees the first click opens a zero-region — the big satisfying cascade everyone
   * actually remembers, and the behaviour later official versions adopted. A deliberate
   * deviation from Win95, and the only one in this engine.
   *
   * Mines are placed by shuffling the eligible cells rather than rejection-sampling
   * random positions: at Expert (99 mines in 480 cells) rejection sampling is still fine,
   * but it degenerates badly if anyone ever adds a denser custom level.
   */
  private placeMines(safeX: number, safeY: number): void {
    const excluded = new Set<number>([this.idx(safeX, safeY)])
    for (const [dx, dy] of NEIGHBOURS) {
      const nx = safeX + dx
      const ny = safeY + dy
      if (this.inBounds(nx, ny)) excluded.add(this.idx(nx, ny))
    }

    const pool: number[] = []
    for (let i = 0; i < this.cells.length; i++) if (!excluded.has(i)) pool.push(i)

    // Fisher–Yates, partial: we only need the first `mineCount` entries.
    const n = Math.min(this.mineCount, pool.length)
    for (let i = 0; i < n; i++) {
      const j = i + Math.floor(this.random() * (pool.length - i))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
      this.cells[pool[i]].mine = true
    }

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let count = 0
        for (const [dx, dy] of NEIGHBOURS) {
          const nx = x + dx
          const ny = y + dy
          if (this.inBounds(nx, ny) && this.cells[this.idx(nx, ny)].mine) count++
        }
        this.cells[this.idx(x, y)].adjacent = count
      }
    }
    this.placed = true
  }

  /**
   * Flood-open from a zero cell.
   *
   * Iterative with an explicit stack, not recursion: Expert's largest open region can run
   * to hundreds of cells and a recursive fill is a stack-depth gamble for no benefit.
   *
   * The boundary rule is where clones go subtly wrong: a NUMBERED cell reached by the
   * flood is revealed but NOT expanded from. Expanding through numbers would clear the
   * whole board from one click.
   */
  private flood(startX: number, startY: number): void {
    const stack: Array<[number, number]> = [[startX, startY]]
    while (stack.length) {
      const [x, y] = stack.pop()!
      const cell = this.cells[this.idx(x, y)]
      if (cell.revealed || cell.mark === 'flag') continue
      cell.revealed = true
      if (cell.adjacent !== 0) continue // numbered edge: reveal, do not expand
      for (const [dx, dy] of NEIGHBOURS) {
        const nx = x + dx
        const ny = y + dy
        if (this.inBounds(nx, ny) && !this.cells[this.idx(nx, ny)].revealed) {
          stack.push([nx, ny])
        }
      }
    }
  }

  reveal(x: number, y: number): void {
    if (this.status === 'won' || this.status === 'lost') return
    if (!this.inBounds(x, y)) return
    const cell = this.cells[this.idx(x, y)]
    // A flagged cell is protected — that is the entire point of flagging.
    if (cell.revealed || cell.mark === 'flag') return

    if (!this.placed) {
      this.placeMines(x, y)
      this.status = 'playing'
      this.startedAt = this.now()
    }

    if (cell.mine) {
      cell.detonated = true
      this.lose()
      return
    }

    this.flood(x, y)
    this.checkWin()
    this.emit()
  }

  /** Cycle none → flag → question → none, exactly as the original does. */
  cycleMark(x: number, y: number): void {
    if (this.status === 'won' || this.status === 'lost') return
    if (!this.inBounds(x, y)) return
    const cell = this.cells[this.idx(x, y)]
    if (cell.revealed) return
    cell.mark = cell.mark === 'none' ? 'flag' : cell.mark === 'flag' ? 'question' : 'none'
    // Flagging before the first reveal must not start the clock.
    this.emit()
  }

  /**
   * Chord: on a revealed number whose adjacent flag count matches its value, open every
   * un-flagged neighbour at once.
   *
   * The classic power-move, and the feature most clones omit. Note it happily detonates
   * a mine if your flags are wrong — that risk is exactly what makes it a skill.
   */
  chord(x: number, y: number): void {
    if (this.status !== 'playing') return
    if (!this.inBounds(x, y)) return
    const cell = this.cells[this.idx(x, y)]
    if (!cell.revealed || cell.adjacent === 0) return

    let flags = 0
    for (const [dx, dy] of NEIGHBOURS) {
      const nx = x + dx
      const ny = y + dy
      if (this.inBounds(nx, ny) && this.cells[this.idx(nx, ny)].mark === 'flag') flags++
    }
    if (flags !== cell.adjacent) return

    for (const [dx, dy] of NEIGHBOURS) {
      const nx = x + dx
      const ny = y + dy
      if (!this.inBounds(nx, ny)) continue
      const n = this.cells[this.idx(nx, ny)]
      if (n.revealed || n.mark === 'flag') continue
      if (n.mine) {
        n.detonated = true
        this.lose()
        return
      }
      this.flood(nx, ny)
    }
    this.checkWin()
    this.emit()
  }

  private lose(): void {
    // Freeze the clock BEFORE changing status. Zero is a perfectly valid finishing
    // time, not a sentinel: using `elapsed || runningTime` made instant losses keep
    // ticking forever when a later render asked for a snapshot.
    this.elapsed = this.currentTime()
    this.status = 'lost'
    this.peeking = false
    for (const c of this.cells) {
      // Reveal every mine, and mark flags that were wrong — the post-mortem the original
      // shows you so you can see where your reasoning went bad.
      if (c.mine && c.mark !== 'flag') c.revealed = true
      if (!c.mine && c.mark === 'flag') c.wrongFlag = true
    }
    this.emit()
  }

  private checkWin(): void {
    const done = this.cells.every(c => c.mine || c.revealed)
    if (!done) return
    this.elapsed = this.currentTime()
    this.status = 'won'
    this.peeking = false
    // The original auto-flags every remaining mine on a win.
    for (const c of this.cells) if (c.mine) c.mark = 'flag'
    const prev = this.best[this.level]
    if (prev === null || this.elapsed < prev) this.best[this.level] = this.elapsed
  }

  setPeeking(peeking: boolean): void {
    if (this.status === 'won' || this.status === 'lost') peeking = false
    if (this.peeking === peeking) return
    this.peeking = peeking
    this.emit()
  }

  private currentTime(): number {
    if (this.status === 'won' || this.status === 'lost') return this.elapsed
    if (this.startedAt === null) return 0
    return Math.max(0, Math.min(999, Math.floor((this.now() - this.startedAt) / 1000)))
  }

  /** Called on a timer by the view; only emits while the clock is actually running. */
  tick(): void {
    if (this.status === 'playing' && this.currentTime() !== this.lastPublishedTime) this.emit()
  }

  getSnapshot(): MinesweeperSnapshot {
    const flags = this.cells.reduce((n, c) => n + (c.mark === 'flag' ? 1 : 0), 0)
    return {
      level: this.level,
      cols: this.cols,
      rows: this.rows,
      // A published snapshot is a historical value, never an editor for the engine.
      // React keeps previous snapshots during concurrent renders; sharing cell objects
      // would silently rewrite those renders as well as let consumers mutate the rules.
      cells: this.cells.map(cell => ({ ...cell })),
      status: this.status,
      minesLeft: this.mineCount - flags,
      time: this.currentTime(),
      peeking: this.peeking,
      best: { ...this.best },
    }
  }

  getBest(): Record<Level, number | null> {
    return { ...this.best }
  }

  private emit(): void {
    const snapshot = this.getSnapshot()
    this.lastPublishedTime = snapshot.time
    this.onChange(snapshot)
  }
}
