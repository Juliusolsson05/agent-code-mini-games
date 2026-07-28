import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import { SnakeAudio } from './snakeAudio'

type Cell = { x: number; y: number }
export type SnakeStatus = 'ready' | 'playing' | 'paused' | 'gameover'

const GRID = 20 // cells per side
const CELL = 24 // px per cell
export const BOARD = GRID * CELL // 480 — sized to fit the Mini Games hub modal

// Constant tick. The old version accelerated with score and got unplayable; a fixed,
// "decently fast" step is the request. One number, easy to retune.
const STEP_MS = 92

export const MIN_FRUIT = 1
export const MAX_FRUIT = 5

/** A self-contained visual theme for the game — deliberately NOT derived from the
 *  host's --theme-* tokens, so the five options are genuinely, wildly different from
 *  each other rather than five tints of the current app theme. */
export type Skin = {
  name: string
  bg: string
  grid: string
  snake: string
  food: string
  glow: boolean
  shape: 'rounded' | 'square'
}

export const SKINS: readonly Skin[] = [
  { name: 'Neon', bg: '#0a0b12', grid: 'rgba(90,220,255,0.07)', snake: '#38f0ff', food: '#ff2d78', glow: true, shape: 'rounded' },
  { name: 'Classic', bg: '#9bbc0f', grid: 'rgba(15,56,15,0.14)', snake: '#0f380f', food: '#215021', glow: false, shape: 'square' },
  { name: 'Midnight', bg: '#0b1026', grid: 'rgba(160,180,255,0.06)', snake: '#8aa2ff', food: '#ffd166', glow: true, shape: 'rounded' },
  { name: 'Candy', bg: '#fff0f6', grid: 'rgba(255,120,170,0.16)', snake: '#ff5fa2', food: '#7c5cff', glow: false, shape: 'rounded' },
  { name: 'Ember', bg: '#160f0c', grid: 'rgba(255,140,60,0.08)', snake: '#ff8a3d', food: '#ffe14d', glow: true, shape: 'rounded' },
]

export type SnakeState = {
  score: number
  high: number
  status: SnakeStatus
  muted: boolean
  fruitCount: number
  skin: number
}

/**
 * The whole game — state, input, a single requestAnimationFrame loop, canvas
 * rendering, and sound. The view (mount.ts) owns only the surrounding DOM chrome.
 *
 * Stepping is decoupled from rendering: rAF runs every frame for smooth food-pulse
 * and overlays, but the snake advances on a fixed STEP_MS cadence.
 */
export class SnakeGame {
  private g: CanvasRenderingContext2D
  private snake: Cell[] = []
  private dir: Cell = { x: 1, y: 0 }
  private nextDir: Cell = { x: 1, y: 0 }
  private fruits: Cell[] = []
  private status: SnakeStatus = 'ready'
  private score = 0
  private high = 0
  private fruitCount = 1
  private skin = 0
  private lastStep = 0
  private rafId: number | null = null
  private audio = new SnakeAudio()
  private disposed = false

  constructor(
    canvas: HTMLCanvasElement,
    private api: AgentCodeApiV1,
    private onChange: (state: SnakeState) => void,
  ) {
    const g = canvas.getContext('2d')
    if (!g) throw new Error('Snake: no 2D canvas context')
    this.g = g

    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1))
    canvas.width = BOARD * dpr
    canvas.height = BOARD * dpr
    canvas.style.width = `${BOARD}px`
    canvas.style.height = `${BOARD}px`
    this.g.scale(dpr, dpr)

    void this.loadPrefs()
    this.reset()
    this.loop = this.loop.bind(this)
    this.rafId = requestAnimationFrame(this.loop)
  }

  get muted(): boolean {
    return this.audio.isMuted
  }

  // --- lifecycle / commands ---------------------------------------------------

  newGame(): void {
    this.audio.unlock()
    this.reset()
    this.status = 'playing'
    this.lastStep = performance.now()
    this.audio.start()
    this.emit()
  }

  togglePause(): void {
    if (this.status === 'playing') this.status = 'paused'
    else if (this.status === 'paused') {
      this.status = 'playing'
      this.lastStep = performance.now()
    }
    this.emit()
  }

  toggleMute(): void {
    this.audio.setMuted(!this.audio.isMuted)
    this.emit()
  }

  /** Number of fruits on the board at once (Google-Snake-style "apples" setting). */
  setFruitCount(n: number): void {
    const next = Math.max(MIN_FRUIT, Math.min(MAX_FRUIT, Math.round(n)))
    if (next === this.fruitCount) return
    this.fruitCount = next
    void this.api.storage.set('snake.fruitCount', next).catch(() => {})
    this.syncFruits()
    this.emit()
  }

  setSkin(i: number): void {
    const next = ((i % SKINS.length) + SKINS.length) % SKINS.length
    if (next === this.skin) return
    this.skin = next
    void this.api.storage.set('snake.skin', next).catch(() => {})
    this.emit()
  }

  dispose(): void {
    this.disposed = true
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.rafId = null
    this.audio.dispose()
  }

  /** Returns true if the key was handled (so the view can preventDefault). */
  handleKey(key: string): boolean {
    this.audio.unlock()
    const k = key.toLowerCase()

    const dir =
      k === 'arrowup' || k === 'w'
        ? { x: 0, y: -1 }
        : k === 'arrowdown' || k === 's'
          ? { x: 0, y: 1 }
          : k === 'arrowleft' || k === 'a'
            ? { x: -1, y: 0 }
            : k === 'arrowright' || k === 'd'
              ? { x: 1, y: 0 }
              : null

    if (dir) {
      if (this.status === 'ready') {
        this.status = 'playing'
        this.lastStep = performance.now()
        this.audio.start()
      }
      if (this.status !== 'playing') return true
      if (dir.x === -this.dir.x && dir.y === -this.dir.y) return true
      if (dir.x !== this.nextDir.x || dir.y !== this.nextDir.y) this.audio.turn()
      this.nextDir = dir
      return true
    }

    if (k === ' ' || k === 'spacebar') {
      this.togglePause()
      return true
    }
    if (k === 'enter') {
      if (this.status === 'gameover' || this.status === 'ready') this.newGame()
      return true
    }
    if (k === 'm') {
      this.toggleMute()
      return true
    }
    return false
  }

  // --- internals --------------------------------------------------------------

  private async loadPrefs(): Promise<void> {
    try {
      const [high, fc, sk] = await Promise.all([
        this.api.storage.get<number>('snake.highScore'),
        this.api.storage.get<number>('snake.fruitCount'),
        this.api.storage.get<number>('snake.skin'),
      ])
      if (typeof high === 'number' && high > this.high) this.high = high
      if (typeof fc === 'number') this.fruitCount = Math.max(MIN_FRUIT, Math.min(MAX_FRUIT, fc))
      if (typeof sk === 'number' && sk >= 0 && sk < SKINS.length) this.skin = sk
      this.syncFruits()
      this.emit()
    } catch {
      // storage unavailable — defaults are fine, not an error.
    }
  }

  private reset(): void {
    const mid = Math.floor(GRID / 2)
    this.snake = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
    ]
    this.dir = { x: 1, y: 0 }
    this.nextDir = { x: 1, y: 0 }
    this.score = 0
    this.fruits = []
    this.syncFruits()
    this.status = 'ready'
    this.emit()
  }

  /** Keep exactly `fruitCount` fruits on the board — top up after eating or after
   *  the count is raised; trim if it was lowered. */
  private syncFruits(): void {
    while (this.fruits.length > this.fruitCount) this.fruits.pop()
    while (this.fruits.length < this.fruitCount) {
      const f = this.freeCell()
      if (!f) break // board full (tiny board, huge snake) — nothing to place
      this.fruits.push(f)
    }
  }

  private freeCell(): Cell | null {
    const occupied = new Set<string>()
    for (const s of this.snake) occupied.add(`${s.x},${s.y}`)
    for (const f of this.fruits) occupied.add(`${f.x},${f.y}`)
    if (occupied.size >= GRID * GRID) return null
    for (;;) {
      const c = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
      if (!occupied.has(`${c.x},${c.y}`)) return c
    }
  }

  private step(): void {
    this.dir = this.nextDir
    const head = this.snake[0]
    const nx = head.x + this.dir.x
    const ny = head.y + this.dir.y

    const hitWall = nx < 0 || ny < 0 || nx >= GRID || ny >= GRID
    const hitSelf = this.snake.some(
      (s, i) => i < this.snake.length - 1 && s.x === nx && s.y === ny,
    )
    if (hitWall || hitSelf) {
      this.gameOver()
      return
    }

    this.snake.unshift({ x: nx, y: ny })
    const eaten = this.fruits.findIndex(f => f.x === nx && f.y === ny)
    if (eaten >= 0) {
      this.fruits.splice(eaten, 1)
      this.score += 1
      this.audio.eat(this.score)
      this.syncFruits()
    } else {
      this.snake.pop()
    }
    this.emit()
  }

  private gameOver(): void {
    this.status = 'gameover'
    this.audio.gameOver()
    if (this.score > this.high) {
      this.high = this.score
      void this.api.storage.set('snake.highScore', this.high).catch(() => {})
    }
    this.emit()
  }

  private emit(): void {
    this.onChange({
      score: this.score,
      high: this.high,
      status: this.status,
      muted: this.muted,
      fruitCount: this.fruitCount,
      skin: this.skin,
    })
  }

  private loop(now: number): void {
    if (this.disposed) return
    if (this.status === 'playing' && now - this.lastStep >= STEP_MS) {
      this.lastStep = now
      this.step()
    }
    this.render(now)
    this.rafId = requestAnimationFrame(this.loop)
  }

  // --- rendering --------------------------------------------------------------

  private roundRect(x: number, y: number, w: number, h: number, r: number): void {
    const g = this.g
    g.beginPath()
    g.moveTo(x + r, y)
    g.arcTo(x + w, y, x + w, y + h, r)
    g.arcTo(x + w, y + h, x, y + h, r)
    g.arcTo(x, y + h, x, y, r)
    g.arcTo(x, y, x + w, y, r)
    g.closePath()
  }

  private render(now: number): void {
    const g = this.g
    const skin = SKINS[this.skin]

    g.clearRect(0, 0, BOARD, BOARD)
    g.fillStyle = skin.bg
    g.fillRect(0, 0, BOARD, BOARD)

    // Faint grid.
    g.strokeStyle = skin.grid
    g.lineWidth = 1
    g.beginPath()
    for (let i = 1; i < GRID; i++) {
      g.moveTo(i * CELL + 0.5, 0)
      g.lineTo(i * CELL + 0.5, BOARD)
      g.moveTo(0, i * CELL + 0.5)
      g.lineTo(BOARD, i * CELL + 0.5)
    }
    g.stroke()

    // Fruits — each a glowing (skin-dependent), gently pulsing dot.
    const pulse = 0.5 + 0.5 * Math.sin(now / 280)
    for (const f of this.fruits) {
      const fx = f.x * CELL + CELL / 2
      const fy = f.y * CELL + CELL / 2
      g.save()
      if (skin.glow) {
        g.shadowColor = skin.food
        g.shadowBlur = 8 + pulse * 9
      }
      g.fillStyle = skin.food
      if (skin.shape === 'square') {
        const s = CELL * 0.6
        g.fillRect(fx - s / 2, fy - s / 2, s, s)
      } else {
        g.beginPath()
        g.arc(fx, fy, CELL * 0.3 + pulse * 1.8, 0, Math.PI * 2)
        g.fill()
      }
      g.restore()
    }

    // Snake — brightest at the head, fading toward the tail. Rounded or pixel-square
    // depending on the skin.
    const n = this.snake.length
    g.fillStyle = skin.snake
    if (skin.glow) {
      g.save()
      g.shadowColor = skin.snake
      g.shadowBlur = 6
    }
    for (let i = n - 1; i >= 0; i--) {
      const seg = this.snake[i]
      const headness = 1 - i / Math.max(1, n)
      g.globalAlpha = 0.5 + 0.5 * headness
      const pad = skin.shape === 'square' ? 1 : i === 0 ? 1.5 : 2.4
      const r = skin.shape === 'square' ? 0 : 6
      this.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - 2 * pad, CELL - 2 * pad, r)
      g.fill()
    }
    g.globalAlpha = 1
    if (skin.glow) g.restore()

    // Eyes on the head (skip for the blocky Classic skin, which reads better plain).
    if (skin.shape === 'rounded') {
      const head = this.snake[0]
      const hx = head.x * CELL
      const hy = head.y * CELL
      const fwd = this.dir
      const perp = { x: fwd.y, y: fwd.x }
      const cx = hx + CELL / 2 + fwd.x * 4
      const cy = hy + CELL / 2 + fwd.y * 4
      g.fillStyle = skin.bg
      for (const s of [1, -1]) {
        g.beginPath()
        g.arc(cx + perp.x * 4 * s, cy + perp.y * 4 * s, 2.4, 0, Math.PI * 2)
        g.fill()
      }
    }
  }
}
