import { COLS, DIR_VEC, ROWS, type Cell, type SnakeSnapshot } from '../engine/game'
import {
  APPLE_DARK,
  APPLE_LEAF,
  APPLE_LIGHT,
  APPLE_STEM,
  BOARD_DARK,
  BOARD_LIGHT,
  EYE_WHITE,
  mixHex,
  SNAKE_HEAD,
  SNAKE_INK,
  SNAKE_TAIL,
} from './palette'

// Canvas renderer replicating Google Snake's look.
//
// ── THE ONE IDEA THAT MAKES IT LOOK RIGHT ──
// The snake is NOT a row of squares. It is a single polyline stroked with
// `lineCap/lineJoin = 'round'` at ~0.8 of a cell. That one choice gives, for free: the
// capsule body, perfectly rounded corners when it turns, the smooth tail, and the joins
// between segments. The old implementation drew per-cell rounded rects, which is why it
// looked like a chain of tiles and why corners had notches.
//
// Smooth motion comes from interpolating only the two ENDS of that polyline: the head
// advances toward its next cell by `t`, and the tail retracts by the same `t`. Every
// interior point stays on its exact grid centre, so the body never wobbles.

type Pt = { x: number; y: number }

export class SnakeRenderer {
  private ctx: CanvasRenderingContext2D
  private cell = 0
  private originX = 0
  private originY = 0
  private dpr = 1

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
    this.resize()
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect()
    this.dpr = Math.min(2, window.devicePixelRatio || 1)
    this.canvas.width = Math.max(1, Math.round(rect.width * this.dpr))
    this.canvas.height = Math.max(1, Math.round(rect.height * this.dpr))
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    // Integer cell size, board centred. A fractional cell makes the checkerboard seams
    // shimmer as the snake moves across them.
    this.cell = Math.floor(Math.min(rect.width / COLS, rect.height / ROWS))
    this.originX = Math.round((rect.width - this.cell * COLS) / 2)
    this.originY = Math.round((rect.height - this.cell * ROWS) / 2)
  }

  /** Grid cell → pixel centre. */
  private px(c: Cell): Pt {
    return {
      x: this.originX + (c.x + 0.5) * this.cell,
      y: this.originY + (c.y + 0.5) * this.cell,
    }
  }

  draw(s: SnakeSnapshot): void {
    const { ctx } = this
    const rect = this.canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, rect.width, rect.height)

    this.drawBoard()
    this.drawApple(s.apple)
    this.drawSnake(s)
  }

  private drawBoard(): void {
    const { ctx, cell } = this
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        // Checker parity on (x + y) — the classic mown-lawn pattern.
        ctx.fillStyle = (x + y) % 2 === 0 ? BOARD_LIGHT : BOARD_DARK
        ctx.fillRect(this.originX + x * cell, this.originY + y * cell, cell, cell)
      }
    }
  }

  /**
   * Build the polyline the snake is stroked along, with interpolated ends.
   *
   * Only the ends move between steps. If the whole body were interpolated the snake
   * would appear to stretch and compress as it turned.
   */
  private path(s: SnakeSnapshot): Pt[] {
    const pts: Pt[] = []
    const body = s.snake
    if (!body.length) return pts

    // Head: advance toward the cell it is moving into.
    const v = DIR_VEC[s.dir]
    const h = this.px(body[0])
    pts.push({ x: h.x + v.x * this.cell * s.t, y: h.y + v.y * this.cell * s.t })

    for (let i = 0; i < body.length - 1; i++) pts.push(this.px(body[i]))

    // Tail: retract toward the segment ahead of it — unless we just ate, in which case
    // the tail holds station for one step and the snake visibly grows by a cell.
    const n = body.length
    if (n >= 2) {
      const tail = this.px(body[n - 1])
      if (s.growing) {
        pts.push(tail)
      } else {
        const prev = this.px(body[n - 2])
        pts.push({
          x: tail.x + (prev.x - tail.x) * s.t,
          y: tail.y + (prev.y - tail.y) * s.t,
        })
      }
    }
    return pts
  }

  private drawSnake(s: SnakeSnapshot): void {
    const { ctx, cell } = this
    const pts = this.path(s)
    if (pts.length < 2) return

    const width = cell * 0.8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Stroke SEGMENT BY SEGMENT so each can carry its own colour, producing the
    // head→tail gradient. Round caps make consecutive strokes overlap seamlessly, so
    // this looks identical to one continuous stroke.
    for (let i = 0; i < pts.length - 1; i++) {
      const f = i / Math.max(1, pts.length - 2)
      ctx.strokeStyle = mixHex(SNAKE_HEAD, SNAKE_TAIL, f)
      // Taper the last cell and a half so the tail comes to a point rather than a stump.
      const remaining = pts.length - 1 - i
      const taper = remaining <= 2 ? 0.55 + 0.225 * remaining : 1
      ctx.lineWidth = width * taper
      ctx.beginPath()
      ctx.moveTo(pts[i].x, pts[i].y)
      ctx.lineTo(pts[i + 1].x, pts[i + 1].y)
      ctx.stroke()
    }

    this.drawHead(pts[0], s.dir, s.status === 'dead')
  }

  private drawHead(p: Pt, dir: SnakeSnapshot['dir'], dead: boolean): void {
    const { ctx, cell } = this
    const v = DIR_VEC[dir]
    // Perpendicular to travel — where the two eyes sit.
    const perp = { x: -v.y, y: v.x }

    // The little nose bump ahead of the head. Small, but it's what gives the snake a
    // face direction at a glance even when the eyes are hard to read.
    ctx.fillStyle = SNAKE_HEAD
    ctx.beginPath()
    ctx.arc(p.x + v.x * cell * 0.3, p.y + v.y * cell * 0.3, cell * 0.11, 0, Math.PI * 2)
    ctx.fill()

    const eyeR = cell * 0.155
    const pupilR = cell * 0.082
    for (const side of [-1, 1]) {
      const ex = p.x + perp.x * cell * 0.2 + v.x * cell * 0.06
      const ey = p.y + perp.y * cell * 0.2 + v.y * cell * 0.06
      const cx = ex * 0 + p.x + perp.x * side * cell * 0.2 + v.x * cell * 0.06
      const cy = ey * 0 + p.y + perp.y * side * cell * 0.2 + v.y * cell * 0.06

      ctx.fillStyle = EYE_WHITE
      ctx.beginPath()
      ctx.arc(cx, cy, eyeR, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = SNAKE_INK
      if (dead) {
        // X eyes on death — a tiny bit of character at the one moment the player is
        // staring straight at the head.
        ctx.lineWidth = cell * 0.055
        ctx.strokeStyle = SNAKE_INK
        ctx.beginPath()
        ctx.moveTo(cx - pupilR, cy - pupilR)
        ctx.lineTo(cx + pupilR, cy + pupilR)
        ctx.moveTo(cx + pupilR, cy - pupilR)
        ctx.lineTo(cx - pupilR, cy + pupilR)
        ctx.stroke()
      } else {
        ctx.beginPath()
        // Pupils sit slightly forward, so the snake looks where it's going.
        ctx.arc(cx + v.x * cell * 0.045, cy + v.y * cell * 0.045, pupilR, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  private drawApple(a: Cell): void {
    const { ctx, cell } = this
    const p = this.px(a)
    const r = cell * 0.34

    // Body: a radial gradient lit from the upper left, which is what stops it reading as
    // a flat red dot.
    const g = ctx.createRadialGradient(p.x - r * 0.35, p.y - r * 0.4, r * 0.15, p.x, p.y, r * 1.15)
    g.addColorStop(0, APPLE_LIGHT)
    g.addColorStop(1, APPLE_DARK)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(p.x, p.y + r * 0.08, r, 0, Math.PI * 2)
    ctx.fill()

    // Stem.
    ctx.strokeStyle = APPLE_STEM
    ctx.lineWidth = cell * 0.05
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(p.x, p.y - r * 0.7)
    ctx.lineTo(p.x + r * 0.1, p.y - r * 1.05)
    ctx.stroke()

    // Leaf: a rotated ellipse off the stem's right.
    ctx.fillStyle = APPLE_LEAF
    ctx.save()
    ctx.translate(p.x + r * 0.34, p.y - r * 1.0)
    ctx.rotate(-0.5)
    ctx.beginPath()
    ctx.ellipse(0, 0, r * 0.42, r * 0.22, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}
