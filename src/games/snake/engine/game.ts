// Snake rules, replicating Google Snake's behaviour exactly.
//
// The engine is PURE GRID: it knows cells, not pixels. The only concession to rendering
// is `t`, the 0→1 progress toward the next cell, which the renderer needs to interpolate
// smooth motion. Keeping pixels out of here is what let the previous version's renderer
// be thrown away and rewritten without touching a single rule.

/** Google's board is 17 wide × 15 tall. Not square — a common mistake when copying it. */
export const COLS = 17
export const ROWS = 15

/**
 * Milliseconds per cell. CONSTANT — Google Snake does not accelerate as you score, and
 * that's deliberate: a constant tempo is what makes it a planning game rather than a
 * reflex game. An earlier version ramped the speed and it just felt punishing.
 */
export const STEP_MS = 125

export type Dir = 'up' | 'down' | 'left' | 'right'
export type Cell = { x: number; y: number }
export type Status = 'ready' | 'playing' | 'paused' | 'dead'

export const DIR_VEC: Record<Dir, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' }

export type SnakeSnapshot = {
  status: Status
  /** Head first. */
  snake: Cell[]
  apple: Cell
  dir: Dir
  score: number
  best: number
  /** 0→1 progress toward the next cell, for smooth rendering. */
  t: number
  /** True on the step where the tail must NOT retract (we just ate). */
  growing: boolean
}

export class SnakeGame {
  private snake: Cell[] = []
  private apple: Cell = { x: 0, y: 0 }
  private dir: Dir = 'right'
  /**
   * Turns are QUEUED, up to two deep.
   *
   * Without a queue, two fast keypresses inside one 125ms step overwrite each other and
   * the first is silently dropped — which feels exactly like the game ignoring you, and
   * is the single most common complaint about amateur Snake clones. Google buffers, so
   * "right then down" always executes as a two-step turn even if typed in 40ms.
   */
  private queue: Dir[] = []
  private status: Status = 'ready'
  private acc = 0
  private growing = false
  private score = 0
  private best = 0

  constructor(private onChange: (s: SnakeSnapshot) => void) {
    this.reset()
  }

  reset(): void {
    // Google starts with a length-4 snake near the left edge, heading right.
    const y = Math.floor(ROWS / 2)
    this.snake = [
      { x: 4, y },
      { x: 3, y },
      { x: 2, y },
      { x: 1, y },
    ]
    this.dir = 'right'
    this.queue = []
    this.acc = 0
    this.growing = false
    this.score = 0
    this.status = 'ready'
    this.spawnApple()
    this.emit()
  }

  setBest(best: number): void {
    this.best = best
    this.emit()
  }

  /** Begins play on the first directional input, exactly as Google does. */
  turn(dir: Dir): void {
    if (this.status === 'dead') return
    if (this.status === 'ready') this.status = 'playing'
    if (this.status === 'paused') return

    // Compare against the last QUEUED direction, not the current one — otherwise a
    // buffered turn can be reversed into the snake's own neck.
    const last = this.queue.length ? this.queue[this.queue.length - 1] : this.dir
    if (dir === last || dir === OPPOSITE[last]) return
    if (this.queue.length < 2) this.queue.push(dir)
  }

  togglePause(): void {
    if (this.status === 'playing') this.status = 'paused'
    else if (this.status === 'paused') this.status = 'playing'
    this.emit()
  }

  /** Advance by `dtMs`. Returns events the caller turns into sound. */
  update(dtMs: number): { ate: boolean; died: boolean; turned: boolean } {
    const events = { ate: false, died: false, turned: false }
    if (this.status !== 'playing') return events

    this.acc += dtMs
    while (this.acc >= STEP_MS) {
      this.acc -= STEP_MS
      const r = this.step()
      events.ate ||= r.ate
      events.died ||= r.died
      events.turned ||= r.turned
      if (r.died) break
    }
    this.emit()
    return events
  }

  private step(): { ate: boolean; died: boolean; turned: boolean } {
    let turned = false
    const next = this.queue.shift()
    if (next) {
      this.dir = next
      turned = true
    }

    const v = DIR_VEC[this.dir]
    const head = this.snake[0]
    const nx = head.x + v.x
    const ny = head.y + v.y

    // Walls kill. Google Snake has no wrap-around.
    if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) {
      this.status = 'dead'
      return { ate: false, died: true, turned }
    }

    // Self-collision. The TAIL TIP is excluded because it vacates this very step — a
    // snake chasing its own tail at distance 0 is legal, and forbidding it is a bug
    // players notice immediately.
    const limit = this.growing ? this.snake.length : this.snake.length - 1
    for (let i = 0; i < limit; i++) {
      if (this.snake[i].x === nx && this.snake[i].y === ny) {
        this.status = 'dead'
        return { ate: false, died: true, turned }
      }
    }

    this.snake.unshift({ x: nx, y: ny })
    const ate = nx === this.apple.x && ny === this.apple.y
    if (ate) {
      this.score++
      if (this.score > this.best) this.best = this.score
      this.spawnApple()
    } else {
      this.snake.pop()
    }
    this.growing = ate
    return { ate, died: false, turned }
  }

  /**
   * Place an apple on a free cell.
   *
   * Builds the list of free cells and picks uniformly, rather than rejection-sampling a
   * random cell until it misses the snake. Rejection sampling is fine early and degrades
   * to an unbounded loop as the snake fills the board — precisely at the moment the
   * player has earned a smooth endgame.
   */
  private spawnApple(): void {
    const occupied = new Set(this.snake.map(c => `${c.x},${c.y}`))
    const free: Cell[] = []
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (!occupied.has(`${x},${y}`)) free.push({ x, y })
      }
    }
    if (!free.length) return // board full — a perfect game
    this.apple = free[Math.floor(Math.random() * free.length)]
  }

  getSnapshot(): SnakeSnapshot {
    return {
      status: this.status,
      snake: this.snake.map(c => ({ ...c })),
      apple: { ...this.apple },
      dir: this.dir,
      score: this.score,
      best: this.best,
      // While waiting to start or dead, freeze mid-cell so nothing drifts.
      t: this.status === 'playing' ? this.acc / STEP_MS : 0,
      growing: this.growing,
    }
  }

  private emit(): void {
    this.onChange(this.getSnapshot())
  }
}
