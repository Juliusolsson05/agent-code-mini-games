// The simulation speaks cells and milliseconds. Rendering is deliberately one completed
// move behind the grid: interpolating a known move cannot predict through a wall or
// briefly point the head the wrong way when a buffered corner is consumed.
export const COLS = 17
export const ROWS = 15
export const PACES = {
  relaxed: { label: 'Chill', stepMs: 170 },
  classic: { label: 'Classic', stepMs: 125 },
  swift: { label: 'Quick', stepMs: 90 },
} as const
export const STEP_MS = PACES.classic.stepMs
export type Pace = keyof typeof PACES
export type Dir = 'up' | 'down' | 'left' | 'right'
export type Cell = { x: number; y: number }
export type Status = 'ready' | 'playing' | 'paused' | 'dead' | 'won'
export type Records = Record<Pace, number>
export const DIR_VEC: Record<Dir, Cell> = {
  up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
}
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' }
export type SnakeSnapshot = {
  status: Status
  /** Head first; previousSnake is the starting pose of this completed logical move. */
  snake: Cell[]
  previousSnake: Cell[]
  apple: Cell | null
  dir: Dir
  score: number
  best: number
  pace: Pace
  stepMs: number
  /** Interpolation preserves its exact fraction across pause/resume. */
  t: number
  growing: boolean
  /** A renderer can reset particles and celebrations without guessing from score. */
  runId: number
}
export type SnakeEvents = { ate: boolean; died: boolean; turned: boolean; won: boolean }
const events = (): SnakeEvents => ({ ate: false, died: false, turned: false, won: false })
const copy = (cells: Cell[]): Cell[] => cells.map(c => ({ ...c }))

export class SnakeGame {
  private snake: Cell[] = []
  private previous: Cell[] = []
  private apple: Cell | null = null
  private dir: Dir = 'right'
  private queue: Dir[] = []
  private status: Status = 'ready'
  private acc = 0
  private growing = false
  private score = 0
  private records: Records = { relaxed: 0, classic: 0, swift: 0 }
  private pace: Pace
  private runId = 0
  private pending = events()
  private random: () => number

  constructor(private onChange: (s: SnakeSnapshot) => void,
    options: { pace?: Pace; random?: () => number } = {}) {
    this.pace = options.pace ?? 'classic'
    this.random = options.random ?? Math.random
    this.reset()
  }

  reset(pace: Pace = this.pace): void {
    this.pace = pace
    const y = Math.floor(ROWS / 2)
    this.snake = [4, 3, 2, 1].map(x => ({ x, y }))
    this.previous = copy(this.snake)
    // A predictable first apple teaches the controls before random routing begins.
    this.apple = { x: 12, y }
    this.dir = 'right'
    this.queue = []
    this.acc = 0
    this.growing = false
    this.score = 0
    this.status = 'ready'
    this.pending = events()
    this.runId++
    this.emit()
  }

  setRecords(values: Partial<Records>): void {
    // Async storage may arrive after the player has earned a record. Merge upward;
    // loading an old value must never erase an achievement from this live session.
    for (const pace of Object.keys(PACES) as Pace[]) {
      const value = values[pace]
      if (typeof value === 'number' && Number.isFinite(value) && value >= 0)
        this.records[pace] = Math.max(this.records[pace], Math.floor(value))
    }
    this.emit()
  }
  setBest(best: number): void { this.setRecords({ [this.pace]: best }) }
  getRecords(): Records { return { ...this.records } }

  turn(dir: Dir): boolean {
    if (this.status === 'dead' || this.status === 'won' || this.status === 'paused') return false
    if (this.status === 'ready') {
      if (dir === OPPOSITE[this.dir]) return false
      this.dir = dir
      this.status = 'playing'
      // Begin the first visual move on this input, rather than waiting a whole cell
      // interval before anything responds. Subsequent moves share the same clock.
      this.pending = this.step()
      this.emit()
      return true
    }
    const last = this.queue[this.queue.length - 1] ?? this.dir
    if (dir === last || dir === OPPOSITE[last] || this.queue.length >= 2) return false
    this.queue.push(dir)
    return true
  }

  pause(): void {
    if (this.status !== 'playing') return
    this.status = 'paused'
    this.queue = []
    this.emit()
  }
  togglePause(): void {
    if (this.status === 'playing') this.pause()
    else if (this.status === 'paused') { this.status = 'playing'; this.emit() }
  }

  update(dtMs: number): SnakeEvents {
    const out = this.pending
    this.pending = events()
    if (this.status !== 'playing') return out
    this.acc += Math.max(0, Number.isFinite(dtMs) ? dtMs : 0)
    const stepMs = PACES[this.pace].stepMs
    while (this.acc >= stepMs && this.status === 'playing') {
      this.acc -= stepMs
      const next = this.step()
      out.ate ||= next.ate
      out.died ||= next.died
      out.turned ||= next.turned
      out.won ||= next.won
    }
    this.emit()
    return out
  }

  private step(): SnakeEvents {
    const out = events()
    const next = this.queue.shift()
    if (next) { this.dir = next; out.turned = true }
    const v = DIR_VEC[this.dir]
    const head = { x: this.snake[0].x + v.x, y: this.snake[0].y + v.y }
    const eats = !!this.apple && head.x === this.apple.x && head.y === this.apple.y
    // The tail vacates on THIS move unless THIS move eats. The old growing flag
    // described the previous move and incorrectly turned a legal tail chase into death.
    const occupied = eats ? this.snake : this.snake.slice(0, -1)
    if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS ||
      occupied.some(c => c.x === head.x && c.y === head.y)) {
      this.status = 'dead'
      out.died = true
      return out
    }
    this.previous = copy(this.snake)
    this.snake.unshift(head)
    if (eats) {
      this.score++
      this.records[this.pace] = Math.max(this.records[this.pace], this.score)
      this.spawnApple()
      out.ate = true
      if (!this.apple) { this.status = 'won'; out.won = true }
    } else this.snake.pop()
    this.growing = eats
    return out
  }

  private spawnApple(): void {
    const occupied = new Set(this.snake.map(c => c.y * COLS + c.x))
    const free: Cell[] = []
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
      if (!occupied.has(y * COLS + x)) free.push({ x, y })
    // A full board is a win, not an impossible apple left underneath the snake.
    this.apple = free.length ? free[Math.min(free.length - 1, Math.floor(this.random() * free.length))] : null
  }

  getSnapshot(): SnakeSnapshot {
    return { status: this.status, snake: copy(this.snake), previousSnake: copy(this.previous),
      apple: this.apple ? { ...this.apple } : null, dir: this.dir, score: this.score,
      best: this.records[this.pace], pace: this.pace, stepMs: PACES[this.pace].stepMs,
      t: this.status === 'ready' || this.status === 'dead' || this.status === 'won'
        ? 1 : Math.min(1, this.acc / PACES[this.pace].stepMs),
      growing: this.growing, runId: this.runId }
  }
  private emit(): void { this.onChange(this.getSnapshot()) }
}
