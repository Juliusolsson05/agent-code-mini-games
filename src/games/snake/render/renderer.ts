import { COLS, ROWS, type Cell, type SnakeSnapshot } from '../engine/game'
import {
  APPLE_DARK, APPLE_LEAF, APPLE_LIGHT, APPLE_STEM, BOARD_DARK, BOARD_LIGHT,
  EYE_WHITE, mixHex, SNAKE_HEAD, SNAKE_INK, SNAKE_TAIL,
} from './palette'

type Point = { x: number; y: number }
type Crumb = { x: number; y: number; vx: number; vy: number; life: number; size: number; colour: string }
const TAU = Math.PI * 2
const lerp = (a: Point, b: Point, t: number): Point => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })

export class SnakeRenderer {
  private ctx: CanvasRenderingContext2D
  private board: HTMLCanvasElement
  private width = 0
  private height = 0
  private cell = 0
  private originX = 0
  private originY = 0
  private dpr = 1
  private reducedMotion = false
  private runId = -1
  private lastScore = 0
  private lastApple: Cell | null = null
  private crumbs: Crumb[] = []
  private lastTime = 0
  private clock = 0

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
    this.board = document.createElement('canvas')
    this.resize()
  }

  setReducedMotion(value: boolean): void {
    this.reducedMotion = value
    if (value) this.crumbs = []
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect()
    this.width = rect.width
    this.height = rect.height
    this.dpr = Math.min(2, window.devicePixelRatio || 1)
    this.canvas.width = Math.max(1, Math.round(this.width * this.dpr))
    this.canvas.height = Math.max(1, Math.round(this.height * this.dpr))
    this.cell = Math.min(this.width / COLS, this.height / ROWS)
    this.originX = (this.width - this.cell * COLS) / 2
    this.originY = (this.height - this.cell * ROWS) / 2
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.paintBoard()
  }

  private point(c: Cell): Point {
    return { x: this.originX + (c.x + 0.5) * this.cell, y: this.originY + (c.y + 0.5) * this.cell }
  }

  private paintBoard(): void {
    // This lawn never changes during a run. Painting it once per resize avoids a
    // layout read and 255 grass tiles on every animation frame, including while idle.
    this.board.width = this.canvas.width
    this.board.height = this.canvas.height
    const ctx = this.board.getContext('2d')!
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.fillStyle = BOARD_DARK
    ctx.fillRect(0, 0, this.width, this.height)
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const left = Math.round((this.originX + x * this.cell) * this.dpr) / this.dpr
      const top = Math.round((this.originY + y * this.cell) * this.dpr) / this.dpr
      const right = Math.round((this.originX + (x + 1) * this.cell) * this.dpr) / this.dpr
      const bottom = Math.round((this.originY + (y + 1) * this.cell) * this.dpr) / this.dpr
      // Shared rounded pixel boundaries prevent hairline seams without changing the
      // playable cell size or squeezing the 17 × 15 board into a square canvas.
      ctx.fillStyle = (x + y) % 2 ? BOARD_DARK : BOARD_LIGHT
      ctx.fillRect(left, top, right - left, bottom - top)
      if ((x * 13 + y * 7) % 23 === 4) {
        const p = this.point({ x, y })
        ctx.strokeStyle = 'rgba(66, 111, 53, 0.14)'
        ctx.lineWidth = Math.max(1, this.cell * 0.03)
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(p.x - this.cell * 0.11, p.y + this.cell * 0.16)
        ctx.lineTo(p.x - this.cell * 0.15, p.y + this.cell * 0.05)
        ctx.moveTo(p.x - this.cell * 0.11, p.y + this.cell * 0.16)
        ctx.lineTo(p.x - this.cell * 0.05, p.y + this.cell * 0.07)
        ctx.stroke()
      }
    }
    const light = ctx.createLinearGradient(0, 0, this.width, this.height)
    light.addColorStop(0, 'rgba(255, 251, 196, 0.14)')
    light.addColorStop(1, 'rgba(58, 98, 48, 0.04)')
    ctx.fillStyle = light
    ctx.fillRect(0, 0, this.width, this.height)
  }

  draw(snapshot: SnakeSnapshot, now = performance.now()): void {
    if (this.cell <= 0) return
    const dt = this.lastTime ? Math.min(40, Math.max(0, now - this.lastTime)) : 0
    this.lastTime = now
    if (snapshot.runId !== this.runId) {
      this.runId = snapshot.runId
      this.crumbs = []
      this.lastScore = snapshot.score
      this.lastApple = snapshot.apple
      this.clock = 0
    }
    const animate = snapshot.status === 'playing' || snapshot.status === 'ready'
    if (animate) this.clock += dt
    if (snapshot.score > this.lastScore && !this.reducedMotion)
      this.scatter(this.lastApple ?? snapshot.snake[0])
    this.lastScore = snapshot.score
    this.lastApple = snapshot.apple

    const ctx = this.ctx
    ctx.clearRect(0, 0, this.width, this.height)
    ctx.drawImage(this.board, 0, 0, this.width, this.height)
    this.drawApple(snapshot.apple)
    this.drawSnake(snapshot)
    this.drawCrumbs(animate ? dt : 0)
  }

  private path(snapshot: SnakeSnapshot): Point[] {
    const previous = snapshot.previousSnake
    const current = snapshot.snake
    if (!previous.length || !current.length) return []
    const head = lerp(this.point(previous[0]), this.point(current[0]), snapshot.t)
    // Both ends follow a completed logical move. Predicting head + direction * t
    // displays a cell the engine has never approved, overshoots walls, and turns the
    // face early when the player buffers a corner. Interior vertices stay on their
    // actual route; lerping every body cell cuts diagonally across tight corners.
    const path = [head, ...previous.slice(0, -1).map(cell => this.point(cell))]
    const tail = this.point(previous[previous.length - 1])
    path.push(snapshot.growing ? tail : lerp(tail, this.point(current[current.length - 1]), snapshot.t))
    return path.filter((point, index) => !index || Math.hypot(point.x - path[index - 1].x, point.y - path[index - 1].y) > 0.01)
  }

  private trace(points: Point[]): void {
    this.ctx.beginPath()
    points.forEach((point, index) => index ? this.ctx.lineTo(point.x, point.y) : this.ctx.moveTo(point.x, point.y))
  }

  private drawSnake(snapshot: SnakeSnapshot): void {
    const points = this.path(snapshot)
    if (points.length < 2) return
    const { ctx, cell } = this
    const width = cell * 0.76
    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.shadowColor = 'rgba(33, 70, 59, 0.23)'
    ctx.shadowBlur = cell * 0.2
    ctx.shadowOffsetY = cell * 0.13
    ctx.strokeStyle = SNAKE_TAIL
    ctx.lineWidth = width
    this.trace(points)
    ctx.stroke()
    ctx.shadowColor = 'transparent'

    // A continuous silhouette carries the shadow. Colour strokes then overlap from
    // tail to head so joints stay rounded and the creature never reads as blue tiles.
    for (let i = points.length - 2; i >= 0; i--) {
      ctx.lineWidth = width
      ctx.strokeStyle = mixHex(SNAKE_HEAD, SNAKE_TAIL, i / Math.max(1, points.length - 2))
      this.trace([points[i], points[i + 1]])
      ctx.stroke()
    }
    ctx.save()
    ctx.translate(0, -cell * 0.14)
    ctx.strokeStyle = 'rgba(213, 235, 255, 0.20)'
    ctx.lineWidth = cell * 0.13
    this.trace(points)
    ctx.stroke()
    ctx.restore()

    const oldHead = snapshot.previousSnake[0]
    const oldNeck = snapshot.previousSnake[1] ?? oldHead
    const current = snapshot.snake[0]
    const hasMoved = current.x !== oldHead.x || current.y !== oldHead.y
    const before = Math.atan2(oldHead.y - oldNeck.y, oldHead.x - oldNeck.x)
    const after = hasMoved ? Math.atan2(current.y - oldHead.y, current.x - oldHead.x) : before
    const delta = Math.atan2(Math.sin(after - before), Math.cos(after - before))
    const fraction = Math.min(1, snapshot.t * 1.8)
    const angle = before + delta * fraction * fraction * (3 - 2 * fraction)
    this.drawHead(points[0], angle, snapshot.status)
    ctx.restore()
  }

  private drawHead(point: Point, angle: number, status: SnakeSnapshot['status']): void {
    const { ctx, cell } = this
    ctx.save()
    ctx.translate(point.x, point.y)
    ctx.rotate(angle)
    const gradient = ctx.createLinearGradient(-cell * 0.2, -cell * 0.4, cell * 0.35, cell * 0.4)
    gradient.addColorStop(0, '#71a0ff')
    gradient.addColorStop(1, SNAKE_HEAD)
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.ellipse(cell * 0.055, 0, cell * 0.45, cell * 0.405, 0, 0, TAU)
    ctx.fill()
    const blink = !this.reducedMotion && status === 'ready' && this.clock % 5200 > 5020
    for (const side of [-1, 1]) {
      const x = cell * 0.115
      const y = cell * 0.235 * side
      ctx.fillStyle = 'rgba(23, 49, 100, 0.14)'
      ctx.beginPath()
      ctx.ellipse(x - cell * 0.01, y + cell * 0.02, cell * 0.18, cell * 0.157, 0, 0, TAU)
      ctx.fill()
      ctx.fillStyle = EYE_WHITE
      ctx.beginPath()
      ctx.ellipse(x, y, cell * 0.169, cell * 0.15, 0, 0, TAU)
      ctx.fill()
      ctx.fillStyle = SNAKE_INK
      ctx.strokeStyle = SNAKE_INK
      ctx.lineWidth = cell * 0.05
      if (status === 'dead' || blink) {
        ctx.beginPath()
        ctx.moveTo(x - cell * 0.06, y)
        ctx.lineTo(x + cell * 0.065, y)
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.arc(x + cell * 0.05, y, cell * 0.076, 0, TAU)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(x + cell * 0.073, y - cell * 0.025, cell * 0.023, 0, TAU)
        ctx.fill()
      }
    }
    // Two small nostrils carry direction even when the eyes rotate through a turn.
    ctx.fillStyle = 'rgba(30, 65, 133, 0.55)'
    for (const side of [-1, 1]) {
      ctx.beginPath()
      ctx.ellipse(cell * 0.36, cell * 0.076 * side, cell * 0.025, cell * 0.018, 0, 0, TAU)
      ctx.fill()
    }
    ctx.restore()
  }

  private drawApple(apple: Cell | null): void {
    if (!apple) return
    const { ctx, cell } = this
    const point = this.point(apple)
    ctx.save()
    ctx.translate(point.x, point.y)
    ctx.fillStyle = 'rgba(57, 91, 36, 0.17)'
    ctx.beginPath()
    ctx.ellipse(0, cell * 0.31, cell * 0.3, cell * 0.10, 0, 0, TAU)
    ctx.fill()
    const gradient = ctx.createRadialGradient(-cell * 0.14, -cell * 0.13, 0, cell * 0.04, cell * 0.1, cell * 0.43)
    gradient.addColorStop(0, APPLE_LIGHT)
    gradient.addColorStop(1, APPLE_DARK)
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(0, -cell * 0.23)
    ctx.bezierCurveTo(-cell * 0.37, -cell * 0.47, -cell * 0.46, cell * 0.18, -cell * 0.2, cell * 0.32)
    ctx.bezierCurveTo(-cell * 0.1, cell * 0.38, -cell * 0.055, cell * 0.29, 0, cell * 0.32)
    ctx.bezierCurveTo(cell * 0.23, cell * 0.45, cell * 0.46, cell * 0.07, cell * 0.31, -cell * 0.19)
    ctx.bezierCurveTo(cell * 0.21, -cell * 0.35, cell * 0.1, -cell * 0.31, 0, -cell * 0.23)
    ctx.fill()
    ctx.lineCap = 'round'
    ctx.strokeStyle = APPLE_STEM
    ctx.lineWidth = cell * 0.05
    ctx.beginPath()
    ctx.moveTo(0, -cell * 0.22)
    ctx.quadraticCurveTo(-cell * 0.02, -cell * 0.36, cell * 0.045, -cell * 0.43)
    ctx.stroke()
    ctx.fillStyle = APPLE_LEAF
    ctx.beginPath()
    ctx.ellipse(cell * 0.14, -cell * 0.365, cell * 0.135, cell * 0.065, -0.45, 0, TAU)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 239, 212, 0.75)'
    ctx.lineWidth = cell * 0.05
    ctx.beginPath()
    ctx.moveTo(-cell * 0.2, -cell * 0.115)
    ctx.quadraticCurveTo(-cell * 0.24, -cell * 0.045, -cell * 0.23, cell * 0.01)
    ctx.stroke()
    ctx.restore()
  }

  private scatter(at: Cell): void {
    // A handful of crumbs marks a pickup without obscuring the next cell or shaking
    // the player's map. Deterministic spokes also keep this effect easy to inspect.
    const point = this.point(at)
    for (let index = 0; index < 7; index++) {
      const angle = index / 7 * TAU + 0.25
      this.crumbs.push({ x: point.x, y: point.y,
        vx: Math.cos(angle) * this.cell * 1.45, vy: Math.sin(angle) * this.cell * 1.45,
        life: 1, size: this.cell * (index % 2 ? 0.065 : 0.045),
        colour: index % 3 ? '#fff4c3' : '#ed7656' })
    }
    this.crumbs = this.crumbs.slice(-28)
  }

  private drawCrumbs(dt: number): void {
    const ctx = this.ctx
    for (const crumb of this.crumbs) {
      crumb.life -= dt / 430
      crumb.x += crumb.vx * dt / 1000
      crumb.y += crumb.vy * dt / 1000
      crumb.vy += this.cell * dt / 1000
      if (crumb.life <= 0) continue
      ctx.globalAlpha = crumb.life
      ctx.fillStyle = crumb.colour
      ctx.beginPath()
      ctx.arc(crumb.x, crumb.y, crumb.size * (0.5 + crumb.life * 0.5), 0, TAU)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    this.crumbs = this.crumbs.filter(crumb => crumb.life > 0)
  }
}
