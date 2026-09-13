// Blockfall's canvas: the well, hold box and next queue, plus every piece of feedback
// that makes a placement feel good.
//
// WHY one canvas for the whole stage rather than a canvas per panel: the satisfying
// effects cross panel borders. Line-clear sparks fly out of the well, callouts sit in
// the left column beside the stack, and a perfect clear lights up everything. One
// surface keeps those effects in one coordinate space. React still owns all text that
// assistive technology must read (score, lines, time, overlays).
//
// WHY effects are driven by engine events instead of by diffing snapshots: the engine
// collapses cleared rows and spawns the next piece in the same instant a piece locks,
// so by the next frame there is nothing left to diff. Events carry exactly what
// happened (which rows, which T-spin, how far the hard drop fell).
//
// Movement is never interpolated. Guideline games snap pieces from cell to cell, and
// tweening a move would show the piece somewhere the engine has not put it yet, which
// reads as input lag to a fast player. All of the juice is in effects layered on top.

import { COLS, HIDDEN_ROWS, ROWS, type BlockfallEvent, type BlockfallSnapshot, type Cell, type PieceId, type Point } from '../engine/game'
import { pieceCells } from '../engine/pieces'

type SwatchKey = PieceId | 'G'
type Swatch = { light: string; base: string; dark: string; glow: string }

// Hue families follow the guideline assignments (I cyan, O yellow, T purple, S green,
// Z red, J blue, L orange) because experienced players read pieces by colour before
// shape. The exact tones are Blockfall's own, tuned to glow on the night-blue well.
export const SWATCHES: Record<SwatchKey, Swatch> = {
  I: { light: '#a8f4ff', base: '#35c6e6', dark: '#16809e', glow: '#46dcff' },
  O: { light: '#fff1a6', base: '#f5c842', dark: '#b88a12', glow: '#ffd54f' },
  T: { light: '#e0c2ff', base: '#a86ef2', dark: '#6536a8', glow: '#b982ff' },
  S: { light: '#bff7c9', base: '#5fd07a', dark: '#2a8c45', glow: '#6cf08c' },
  Z: { light: '#ffb7be', base: '#f05f6e', dark: '#a52c3a', glow: '#ff6b7b' },
  J: { light: '#b3c8ff', base: '#517ff2', dark: '#2747ad', glow: '#6a93ff' },
  L: { light: '#ffcb9c', base: '#f28e3d', dark: '#ad5714', glow: '#ff9d4f' },
  G: { light: '#9aa0b3', base: '#5d6377', dark: '#353a4a', glow: '#7d8397' },
}

// Stage layout in cell units. The CSS positions the HTML stats and overlays with the
// same numbers (as percentages of a 22 × 22 square), so change both together.
export const STAGE_UNITS = 22
const WELL_X = 6
const WELL_Y = 1.5
const VISIBLE_ROWS = ROWS - HIDDEN_ROWS
const HOLD_BOX = { x: 0, y: WELL_Y, w: 5, h: 3.8 }
const NEXT_BOX = { x: 17, y: WELL_Y, w: 5, h: 14.4 }
// Callouts stack in the left column between the hold box and the HTML stats.
const CALLOUT_CENTER_Y = 7.6
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const LINE_NAMES = ['', 'SINGLE', 'DOUBLE', 'TRIPLE', 'QUAD']
const TAU = Math.PI * 2

type Particle = { x: number; y: number; vx: number; vy: number; life: number; decay: number; size: number; color: string; gravity: number }
type CellFlash = { x: number; y: number; life: number; decay: number }
type Streak = { x: number; top: number; bottom: number; life: number }
type RowFlash = { y: number; life: number; color: string }
type Callout = { kicker: string; title: string; sub: string; color: string; age: number; duration: number }
type Popup = { text: string; y: number; age: number; color: string }
type BigText = { text: string; color: string; age: number; duration: number; size: number }

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3)

export class BlockfallRenderer {
  private readonly ctx: CanvasRenderingContext2D
  private readonly backdrop = document.createElement('canvas')
  private readonly wellLayer = document.createElement('canvas')
  private sprites = new Map<SwatchKey, HTMLCanvasElement>()
  private ghosts = new Map<SwatchKey, HTMLCanvasElement>()
  private width = 0
  private height = 0
  private dpr = 1
  private cell = 0
  private ox = 0
  private oy = 0
  private reducedMotion = false
  private showGhost = true
  private runId = -1
  private lastTime = 0
  private clock = 0
  // The field as the renderer last understood it. Lock and clear events update it in
  // place, so a clear knows the colours of the rows it removed even though the engine
  // has already collapsed them by the time the event arrives.
  private field: Cell[][] = []
  private particles: Particle[] = []
  private flashes: CellFlash[] = []
  private streaks: Streak[] = []
  private rowFlashes: RowFlash[] = []
  private popups: Popup[] = []
  private callout: Callout | null = null
  private combo: Callout | null = null
  private centerText: BigText | null = null
  private countdown: BigText | null = null
  private shakePos = 0
  private shakeVel = 0
  private levelPulse = 0
  private holdPulse = 0
  private clearPulse = 0
  private clearPulseColor = '#ffffff'
  private overAge: number | null = null
  private completeAge: number | null = null

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
    this.resize()
  }

  setReducedMotion(value: boolean): void {
    this.reducedMotion = value
    if (value) {
      this.particles = []
      this.streaks = []
      this.shakePos = 0
      this.shakeVel = 0
    }
  }

  setGhost(value: boolean): void {
    this.showGhost = value
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect()
    this.width = rect.width
    this.height = rect.height
    this.dpr = Math.min(2, window.devicePixelRatio || 1)
    this.canvas.width = Math.max(1, Math.round(this.width * this.dpr))
    this.canvas.height = Math.max(1, Math.round(this.height * this.dpr))
    this.cell = Math.min(this.width, this.height) / STAGE_UNITS
    this.ox = (this.width - this.cell * STAGE_UNITS) / 2
    this.oy = (this.height - this.cell * STAGE_UNITS) / 2
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.buildSprites()
    this.paintBackdrop()
  }

  /** Feed everything the engine reported since the last call. Call before draw(). */
  handle(events: readonly BlockfallEvent[]): void {
    for (const event of events) {
      switch (event.type) {
        case 'countdown':
          this.countdown = { text: String(event.n), color: '#eef0ff', age: 0, duration: 900, size: 3.4 }
          break
        case 'go':
          this.countdown = { text: 'GO', color: '#c9a8ff', age: 0, duration: 650, size: 3 }
          break
        case 'hardDrop':
          this.onHardDrop(event.rows, event.cells)
          break
        case 'lock':
          for (const [x, y] of event.cells) {
            if (this.field[y]) this.field[y]![x] = event.piece
            this.flashes.push({ x, y, life: 1, decay: this.reducedMotion ? 1 / 120 : 1 / 220 })
          }
          break
        case 'clear':
          this.onClear(event)
          break
        case 'levelUp':
          this.levelPulse = 1
          this.combo = null
          this.callout = { kicker: 'SPEED UP', title: `LEVEL ${event.level}`, sub: '', color: '#9fd8ff', age: 0, duration: 1500 }
          break
        case 'hold':
          this.holdPulse = 1
          break
        case 'over':
          this.overAge = 0
          this.kick(5)
          break
        case 'complete':
          this.completeAge = 0
          this.celebrate()
          break
        default:
          break
      }
    }
  }

  draw(snapshot: BlockfallSnapshot, now = performance.now()): void {
    if (this.cell <= 0) return
    const elapsed = this.lastTime ? Math.min(50, Math.max(0, now - this.lastTime)) : 0
    this.lastTime = now
    if (snapshot.runId !== this.runId) this.resetRun(snapshot.runId)
    // Paused effects freeze in place rather than finishing behind the pause card.
    const dt = snapshot.status === 'paused' ? 0 : elapsed
    this.clock += dt
    this.field = snapshot.field

    const ctx = this.ctx
    ctx.clearRect(0, 0, this.width, this.height)
    ctx.drawImage(this.backdrop, 0, 0, this.width, this.height)

    const shake = this.stepShake(dt)
    ctx.save()
    ctx.translate(0, shake)
    ctx.drawImage(this.wellLayer, 0, 0, this.width, this.height)
    this.drawWellFrame(snapshot, dt)
    // The guideline hides the stack while paused so a pause cannot be used to plan.
    if (snapshot.status !== 'paused') {
      this.drawField(snapshot, dt)
      if (snapshot.status === 'playing' || snapshot.status === 'over') {
        if (this.showGhost && snapshot.ghost && snapshot.active && snapshot.status === 'playing') this.drawGhost(snapshot.ghost, snapshot.active.id)
        if (snapshot.active) this.drawActive(snapshot)
      }
      this.drawStreaks(dt)
      this.drawRowFlashes(dt)
      this.drawCellFlashes(dt)
      this.drawCompleteSweep(dt)
    }
    ctx.restore()

    if (snapshot.status !== 'paused') {
      this.drawHold(snapshot, dt)
      this.drawNext(snapshot)
    }
    this.drawParticles(dt)
    this.drawCallouts(dt)
    this.drawPopups(dt, shake)
    this.drawCenterText(dt)
    this.drawCountdown(dt)
  }

  // ── geometry ──────────────────────────────────────────────────────────────────

  private px(x: number): number {
    return this.ox + (WELL_X + x) * this.cell
  }

  private py(y: number): number {
    return this.oy + (WELL_Y + y - HIDDEN_ROWS) * this.cell
  }

  private unitX(x: number): number {
    return this.ox + x * this.cell
  }

  private unitY(y: number): number {
    return this.oy + y * this.cell
  }

  // ── cached layers ─────────────────────────────────────────────────────────────

  private buildSprites(): void {
    // Blocks are painted once per size into tiny canvases. Drawing 200 gradient-bevelled
    // tiles from scratch every frame would cost far more than blitting bitmaps.
    const size = Math.max(2, Math.round(this.cell * this.dpr))
    this.sprites.clear()
    this.ghosts.clear()
    for (const key of Object.keys(SWATCHES) as SwatchKey[]) {
      const swatch = SWATCHES[key]
      const sprite = document.createElement('canvas')
      sprite.width = size
      sprite.height = size
      const g = sprite.getContext('2d')!
      const inset = Math.max(1, size * 0.045)
      const radius = size * 0.17
      const body = g.createLinearGradient(0, 0, size, size)
      body.addColorStop(0, swatch.light)
      body.addColorStop(0.42, swatch.base)
      body.addColorStop(1, swatch.dark)
      g.fillStyle = body
      g.beginPath()
      g.roundRect(inset, inset, size - inset * 2, size - inset * 2, radius)
      g.fill()
      // A recessed face gives the glassy depth; the outer bevel stays as a bright rim.
      const face = size * 0.2
      const faceFill = g.createLinearGradient(0, face, 0, size - face)
      faceFill.addColorStop(0, swatch.base)
      faceFill.addColorStop(1, swatch.dark)
      g.globalAlpha = 0.55
      g.fillStyle = faceFill
      g.beginPath()
      g.roundRect(face, face, size - face * 2, size - face * 2, radius * 0.55)
      g.fill()
      g.globalAlpha = 1
      const gloss = g.createLinearGradient(0, inset, 0, size * 0.5)
      gloss.addColorStop(0, 'rgba(255,255,255,0.55)')
      gloss.addColorStop(1, 'rgba(255,255,255,0)')
      g.fillStyle = gloss
      g.beginPath()
      g.roundRect(inset * 2, inset * 1.6, size - inset * 4, size * 0.32, [radius * 0.8, radius * 0.8, radius * 0.3, radius * 0.3])
      g.fill()
      g.strokeStyle = 'rgba(255,255,255,0.28)'
      g.lineWidth = Math.max(1, size * 0.03)
      g.beginPath()
      g.roundRect(inset + 0.5, inset + 0.5, size - inset * 2 - 1, size - inset * 2 - 1, radius)
      g.stroke()
      this.sprites.set(key, sprite)

      const ghost = document.createElement('canvas')
      ghost.width = size
      ghost.height = size
      const h = ghost.getContext('2d')!
      h.fillStyle = swatch.base
      h.globalAlpha = 0.13
      h.beginPath()
      h.roundRect(inset * 1.5, inset * 1.5, size - inset * 3, size - inset * 3, radius)
      h.fill()
      h.globalAlpha = 0.7
      h.strokeStyle = swatch.glow
      h.lineWidth = Math.max(1, size * 0.055)
      h.beginPath()
      h.roundRect(inset * 2, inset * 2, size - inset * 4, size - inset * 4, radius * 0.8)
      h.stroke()
      this.ghosts.set(key, ghost)
    }
  }

  private layerContext(layer: HTMLCanvasElement): CanvasRenderingContext2D {
    layer.width = this.canvas.width
    layer.height = this.canvas.height
    const g = layer.getContext('2d')!
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    return g
  }

  private paintBackdrop(): void {
    // Static art is painted once per resize. The well's own background lives on a
    // separate layer because it shakes with the stack while the side panels stay put.
    const cell = this.cell
    const g = this.layerContext(this.backdrop)
    const panel = (box: { x: number; y: number; w: number; h: number }, label: string) => {
      const x = this.unitX(box.x)
      const y = this.unitY(box.y)
      const fill = g.createLinearGradient(0, y, 0, y + box.h * cell)
      fill.addColorStop(0, 'rgba(34, 38, 64, 0.72)')
      fill.addColorStop(1, 'rgba(22, 25, 43, 0.72)')
      g.fillStyle = fill
      g.beginPath()
      g.roundRect(x, y, box.w * cell, box.h * cell, cell * 0.45)
      g.fill()
      g.strokeStyle = 'rgba(160, 170, 230, 0.13)'
      g.lineWidth = 1
      g.stroke()
      g.fillStyle = '#8a90b4'
      g.font = `700 ${cell * 0.4}px ${FONT}`
      g.textBaseline = 'middle'
      g.textAlign = 'left'
      g.fillText(label, x + cell * 0.45, y + cell * 0.62)
    }
    panel(HOLD_BOX, 'HOLD')
    panel(NEXT_BOX, 'NEXT')

    const w = this.layerContext(this.wellLayer)
    const left = this.px(0)
    const top = this.py(HIDDEN_ROWS)
    const width = COLS * cell
    const height = VISIBLE_ROWS * cell
    const bg = w.createLinearGradient(0, top, 0, top + height)
    bg.addColorStop(0, '#0b0d19')
    bg.addColorStop(1, '#121528')
    w.fillStyle = bg
    w.beginPath()
    w.roundRect(left - cell * 0.12, top - cell * 0.12, width + cell * 0.24, height + cell * 0.24, cell * 0.3)
    w.fill()
    // Faint column guides help line up drops; row lines would add noise without help.
    w.strokeStyle = 'rgba(150, 160, 230, 0.055)'
    w.lineWidth = 1
    for (let x = 1; x < COLS; x++) {
      const lineX = Math.round((left + x * cell) * this.dpr) / this.dpr + 0.5 / this.dpr
      w.beginPath()
      w.moveTo(lineX, top)
      w.lineTo(lineX, top + height)
      w.stroke()
    }
    w.fillStyle = 'rgba(150, 160, 230, 0.07)'
    for (let y = 1; y < VISIBLE_ROWS; y++) for (let x = 1; x < COLS; x++) {
      w.beginPath()
      w.arc(left + x * cell, top + y * cell, Math.max(0.6, cell * 0.035), 0, TAU)
      w.fill()
    }
  }

  // ── drawing ───────────────────────────────────────────────────────────────────

  private block(key: SwatchKey, x: number, y: number, size = this.cell): void {
    const sprite = this.sprites.get(key)
    if (sprite) this.ctx.drawImage(sprite, x, y, size, size)
  }

  private drawWellFrame(snapshot: BlockfallSnapshot, dt: number): void {
    const { ctx, cell } = this
    this.levelPulse = Math.max(0, this.levelPulse - dt / 900)
    this.clearPulse = Math.max(0, this.clearPulse - dt / 700)
    const left = this.px(0) - cell * 0.12
    const top = this.py(HIDDEN_ROWS) - cell * 0.12
    const width = COLS * cell + cell * 0.24
    const height = VISIBLE_ROWS * cell + cell * 0.24
    const danger = snapshot.danger && (snapshot.status === 'playing' || snapshot.status === 'countdown')
    const beat = danger ? 0.5 + 0.5 * Math.sin(this.clock / 170) : 0
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(left, top, width, height, cell * 0.3)
    ctx.lineWidth = Math.max(1.5, cell * 0.08)
    let color = 'rgba(150, 160, 240, 0.32)'
    let glow = 0
    if (this.clearPulse > 0) { color = this.clearPulseColor; glow = this.clearPulse }
    if (this.levelPulse > this.clearPulse) { color = '#9fd8ff'; glow = this.levelPulse }
    if (danger) { color = `rgba(255, 90, 110, ${0.45 + beat * 0.45})`; glow = Math.max(glow, 0.35 + beat * 0.4) }
    ctx.strokeStyle = color
    if (glow > 0 && !this.reducedMotion) {
      ctx.shadowColor = color
      ctx.shadowBlur = cell * 0.9 * glow
    }
    ctx.globalAlpha = glow > 0 ? 0.55 + glow * 0.45 : 1
    ctx.stroke()
    ctx.restore()

    if (danger) {
      // A red haze over the spawn rows says "you are close to the top" without text.
      const haze = ctx.createLinearGradient(0, top, 0, top + cell * 4)
      haze.addColorStop(0, `rgba(255, 70, 95, ${0.16 + beat * 0.12})`)
      haze.addColorStop(1, 'rgba(255, 70, 95, 0)')
      ctx.fillStyle = haze
      ctx.fillRect(left, top, width, cell * 4)
    }
  }

  private drawField(snapshot: BlockfallSnapshot, dt: number): void {
    if (this.overAge !== null) this.overAge += dt
    // Topping out greys the stack from the bottom up, one row every 28 ms: a clear,
    // unhurried "that run is over" before the results card fades in.
    const greyRows = this.overAge === null ? -1 : this.reducedMotion ? ROWS : this.overAge / 28
    for (let y = 0; y < ROWS; y++) {
      const fromBottom = ROWS - 1 - y
      for (let x = 0; x < COLS; x++) {
        const value = snapshot.field[y]![x]
        if (!value) continue
        this.block(fromBottom < greyRows ? 'G' : value, this.px(x), this.py(y))
      }
    }
  }

  private drawGhost(cells: Point[], id: PieceId): void {
    const ghost = this.ghosts.get(id)
    if (!ghost) return
    for (const [x, y] of cells) this.ctx.drawImage(ghost, this.px(x), this.py(y), this.cell, this.cell)
  }

  private drawActive(snapshot: BlockfallSnapshot): void {
    const piece = snapshot.active!
    const { ctx, cell } = this
    const greyed = snapshot.status === 'over'
    // A soft glow under the live piece separates it from the stack at a glance.
    if (!greyed && !this.reducedMotion) {
      ctx.save()
      ctx.shadowColor = SWATCHES[piece.id].glow
      ctx.shadowBlur = cell * 0.55
      ctx.globalAlpha = 0.5
      ctx.fillStyle = SWATCHES[piece.id].base
      for (const [x, y] of piece.cells) ctx.fillRect(this.px(x) + cell * 0.2, this.py(y) + cell * 0.2, cell * 0.6, cell * 0.6)
      ctx.restore()
    }
    for (const [x, y] of piece.cells) this.block(greyed ? 'G' : piece.id, this.px(x), this.py(y))
    // Dimming as the lock delay runs out lets the player feel how much time is left
    // for a slide or a spin, which the guideline communicates the same way.
    if (snapshot.lockProgress > 0 && !greyed) {
      ctx.save()
      ctx.fillStyle = `rgba(8, 10, 22, ${snapshot.lockProgress * 0.38})`
      for (const [x, y] of piece.cells) {
        ctx.beginPath()
        ctx.roundRect(this.px(x) + cell * 0.045, this.py(y) + cell * 0.045, cell * 0.91, cell * 0.91, cell * 0.17)
        ctx.fill()
      }
      ctx.restore()
    }
  }

  private drawMiniPiece(id: PieceId, centerX: number, centerY: number, size: number, key: SwatchKey): void {
    const cells = pieceCells(id, 0)
    const xs = cells.map(([x]) => x)
    const ys = cells.map(([, y]) => y)
    const minX = Math.min(...xs)
    const minY = Math.min(...ys)
    const w = Math.max(...xs) - minX + 1
    const h = Math.max(...ys) - minY + 1
    const startX = centerX - (w * size) / 2
    const startY = centerY - (h * size) / 2
    for (const [x, y] of cells) this.block(key, startX + (x - minX) * size, startY + (y - minY) * size, size)
  }

  private drawHold(snapshot: BlockfallSnapshot, dt: number): void {
    const { ctx, cell } = this
    this.holdPulse = Math.max(0, this.holdPulse - dt / 320)
    const cx = this.unitX(HOLD_BOX.x + HOLD_BOX.w / 2)
    const cy = this.unitY(HOLD_BOX.y + 2.25)
    if (this.holdPulse > 0 && !this.reducedMotion) {
      ctx.save()
      ctx.globalAlpha = this.holdPulse * 0.35
      ctx.fillStyle = '#b8a4ff'
      ctx.beginPath()
      ctx.roundRect(this.unitX(HOLD_BOX.x), this.unitY(HOLD_BOX.y), HOLD_BOX.w * cell, HOLD_BOX.h * cell, cell * 0.45)
      ctx.fill()
      ctx.restore()
    }
    if (!snapshot.hold) return
    const size = cell * 0.82 * (1 + (this.reducedMotion ? 0 : this.holdPulse * 0.08))
    this.drawMiniPiece(snapshot.hold, cx, cy, size, snapshot.holdUsed ? 'G' : snapshot.hold)
  }

  private drawNext(snapshot: BlockfallSnapshot): void {
    const cell = this.cell
    const cx = this.unitX(NEXT_BOX.x + NEXT_BOX.w / 2)
    snapshot.next.forEach((id, index) => {
      // The first preview is the piece that comes next, so it is drawn larger.
      const cy = this.unitY(NEXT_BOX.y + (index === 0 ? 2.25 : 2.25 + 1.2 + index * 2.35))
      this.drawMiniPiece(id, cx, cy, cell * (index === 0 ? 0.82 : 0.64), id)
    })
  }

  // ── effects ───────────────────────────────────────────────────────────────────

  private resetRun(runId: number): void {
    this.runId = runId
    this.particles = []
    this.flashes = []
    this.streaks = []
    this.rowFlashes = []
    this.popups = []
    this.callout = null
    this.combo = null
    this.centerText = null
    this.countdown = null
    this.shakePos = 0
    this.shakeVel = 0
    this.levelPulse = 0
    this.holdPulse = 0
    this.clearPulse = 0
    this.overAge = null
    this.completeAge = null
  }

  /** Nudge the well downward; peak displacement is roughly `pixels`. */
  private kick(pixels: number): void {
    if (this.reducedMotion) return
    this.shakeVel += pixels * 34
  }

  private stepShake(dt: number): number {
    // A damped spring, integrated in small fixed steps so the motion is identical at
    // any frame rate. A random jitter shake felt noisy; one firm downward thump that
    // settles reads as weight, like the stack absorbing the impact.
    let remaining = dt
    while (remaining > 0) {
      const step = Math.min(8, remaining) / 1000
      const acceleration = -1100 * this.shakePos - 30 * this.shakeVel
      this.shakeVel += acceleration * step
      this.shakePos += this.shakeVel * step
      remaining -= 8
    }
    if (Math.abs(this.shakePos) < 0.02 && Math.abs(this.shakeVel) < 0.5) {
      this.shakePos = 0
      this.shakeVel = 0
    }
    return this.shakePos
  }

  private onHardDrop(rows: number, cells: Point[]): void {
    const cell = this.cell
    this.kick(Math.min(4.5, 1.6 + rows * 0.16))
    if (this.reducedMotion || rows === 0) return
    // One light trail per column the piece occupies, from where it started to where it
    // landed: the eye reads the distance travelled even though the move was instant.
    const columns = new Map<number, { top: number; bottom: number }>()
    for (const [x, y] of cells) {
      const entry = columns.get(x)
      if (!entry) columns.set(x, { top: y - rows, bottom: y })
      else {
        entry.top = Math.min(entry.top, y - rows)
        entry.bottom = Math.max(entry.bottom, y)
      }
    }
    for (const [x, span] of columns) this.streaks.push({ x, top: span.top, bottom: span.bottom, life: 1 })
    // Sparks where the piece hits: only from cells with nothing of the piece below them.
    for (const [x, y] of cells) {
      if (cells.some(([ox, oy]) => ox === x && oy === y + 1)) continue
      for (let i = 0; i < 4; i++) {
        const side = i % 2 === 0 ? -1 : 1
        this.particles.push({
          x: this.px(x) + cell * (0.5 + side * 0.35),
          y: this.py(y + 1),
          vx: side * cell * (1.5 + Math.random() * 3),
          vy: -cell * (1 + Math.random() * 2.5),
          life: 1,
          decay: 1 / (260 + Math.random() * 160),
          size: cell * (0.05 + Math.random() * 0.05),
          color: '#e9ecff',
          gravity: cell * 16,
        })
      }
    }
    this.trimParticles()
  }

  private onClear(event: Extract<BlockfallEvent, { type: 'clear' }>): void {
    const cell = this.cell
    const spin = event.tspin !== 'none'
    const quad = event.lines === 4
    const accent = spin ? SWATCHES.T.glow : quad ? SWATCHES.I.glow : '#f4f5ff'

    if (event.lines > 0) {
      for (const y of event.rows) {
        this.rowFlashes.push({ y, life: 1, color: spin ? '#e2ccff' : quad ? '#c9f6ff' : '#ffffff' })
        if (!this.reducedMotion) {
          const row = this.field[y] ?? []
          const perCell = quad || spin ? 3 : 2
          for (let x = 0; x < COLS; x++) {
            const swatch = SWATCHES[(row[x] ?? 'G') as SwatchKey] ?? SWATCHES.G
            for (let i = 0; i < perCell; i++) {
              this.particles.push({
                x: this.px(x) + cell * Math.random(),
                y: this.py(y) + cell * Math.random(),
                vx: (x - 4.5) * cell * (0.35 + Math.random() * 0.5) + (Math.random() - 0.5) * cell * 3,
                vy: -cell * (2 + Math.random() * (quad ? 9 : 6)),
                life: 1,
                decay: 1 / (550 + Math.random() * 500),
                size: cell * (0.07 + Math.random() * 0.09),
                color: i === 0 ? swatch.light : swatch.glow,
                gravity: cell * 22,
              })
            }
          }
        }
      }
      // Collapse the renderer's copy the same way the engine did, so any later event in
      // this batch reads the right colours.
      const kept = this.field.filter((_, y) => !event.rows.includes(y))
      this.field = [...event.rows.map(() => Array<Cell>(COLS).fill(null)), ...kept]
      this.trimParticles()
    }

    // Weight scales with how hard the clear was, so a quad or T-spin thumps harder.
    this.kick(event.perfectClear ? 8 : quad ? 7 : spin && event.lines > 0 ? 6 : event.lines >= 2 ? 3 : event.lines === 1 ? 1.5 : 0)
    if (event.lines >= 2 || spin || event.perfectClear) {
      this.clearPulse = 1
      this.clearPulseColor = event.perfectClear ? '#ffe28a' : accent
    }

    const title = spin ? (event.tspin === 'mini' ? 'T-SPIN MINI' : 'T-SPIN') : LINE_NAMES[event.lines] ?? ''
    const sub = spin && event.lines > 0 ? LINE_NAMES[event.lines] ?? '' : ''
    // Singles, doubles and triples still get named, but quieter than the big clears.
    this.callout = {
      kicker: event.b2b ? 'BACK-TO-BACK' : '',
      title,
      sub,
      color: spin ? SWATCHES.T.light : quad ? SWATCHES.I.light : event.lines === 3 ? '#ffe7a3' : '#e8eaff',
      age: 0,
      duration: quad || spin ? 1900 : 1300,
    }
    this.combo = event.combo > 0 ? { kicker: '', title: `${event.combo}`, sub: 'COMBO', color: '#ffd27a', age: 0, duration: 1500 } : this.combo
    if (event.lines === 0) this.combo = null
    if (event.points > 0) {
      const y = event.rows.length ? event.rows.reduce((sum, row) => sum + row, 0) / event.rows.length : ROWS - 3
      this.popups.push({ text: `+${event.points.toLocaleString('en-US')}`, y, age: 0, color: spin || quad ? accent : '#f4f5ff' })
      this.popups = this.popups.slice(-4)
    }
    if (event.perfectClear) {
      this.centerText = { text: 'PERFECT CLEAR', color: '#ffe28a', age: 0, duration: 2200, size: 1.25 }
      this.celebrate()
    }
  }

  private celebrate(): void {
    if (this.reducedMotion) return
    const cell = this.cell
    const colors = Object.values(SWATCHES).slice(0, 7).map(swatch => swatch.glow)
    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: this.px(Math.random() * COLS),
        y: this.py(HIDDEN_ROWS + VISIBLE_ROWS * (0.35 + Math.random() * 0.65)),
        vx: (Math.random() - 0.5) * cell * 8,
        vy: -cell * (6 + Math.random() * 12),
        life: 1,
        decay: 1 / (900 + Math.random() * 700),
        size: cell * (0.07 + Math.random() * 0.1),
        color: colors[i % colors.length]!,
        gravity: cell * 20,
      })
    }
    this.trimParticles()
  }

  private trimParticles(): void {
    if (this.particles.length > 700) this.particles = this.particles.slice(-700)
  }

  private drawStreaks(dt: number): void {
    const { ctx, cell } = this
    for (const streak of this.streaks) {
      streak.life -= dt / 230
      if (streak.life <= 0) continue
      const top = this.py(streak.top)
      const bottom = this.py(streak.bottom + 1)
      const gradient = ctx.createLinearGradient(0, top, 0, bottom)
      gradient.addColorStop(0, 'rgba(255,255,255,0)')
      gradient.addColorStop(1, `rgba(220,228,255,${0.34 * streak.life})`)
      ctx.fillStyle = gradient
      const inset = cell * (0.1 + (1 - streak.life) * 0.3)
      ctx.fillRect(this.px(streak.x) + inset, top, cell - inset * 2, bottom - top)
    }
    this.streaks = this.streaks.filter(streak => streak.life > 0)
  }

  private drawRowFlashes(dt: number): void {
    const { ctx, cell } = this
    for (const flash of this.rowFlashes) {
      flash.life -= dt / (this.reducedMotion ? 160 : 320)
      if (flash.life <= 0) continue
      const grow = this.reducedMotion ? 0 : (1 - flash.life) * cell * 0.35
      ctx.save()
      ctx.globalAlpha = Math.pow(flash.life, 1.4) * 0.9
      ctx.fillStyle = flash.color
      if (!this.reducedMotion) {
        ctx.shadowColor = flash.color
        ctx.shadowBlur = cell * 0.8
      }
      ctx.fillRect(this.px(0) - grow, this.py(flash.y) - grow / 2, COLS * cell + grow * 2, cell + grow)
      ctx.restore()
    }
    this.rowFlashes = this.rowFlashes.filter(flash => flash.life > 0)
  }

  private drawCellFlashes(dt: number): void {
    const { ctx, cell } = this
    ctx.save()
    for (const flash of this.flashes) {
      flash.life -= dt * flash.decay
      if (flash.life <= 0) continue
      ctx.globalAlpha = flash.life * 0.7
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.roundRect(this.px(flash.x) + cell * 0.045, this.py(flash.y) + cell * 0.045, cell * 0.91, cell * 0.91, cell * 0.17)
      ctx.fill()
    }
    ctx.restore()
    this.flashes = this.flashes.filter(flash => flash.life > 0)
  }

  private drawCompleteSweep(dt: number): void {
    if (this.completeAge === null) return
    this.completeAge += dt
    const progress = this.completeAge / 1100
    if (progress >= 1) return
    const { ctx, cell } = this
    const left = this.px(0)
    const top = this.py(HIDDEN_ROWS)
    const height = VISIBLE_ROWS * cell
    const bandY = top + height * (1 - easeOut(progress) * 1.3)
    const band = ctx.createLinearGradient(0, bandY - cell * 3, 0, bandY + cell * 3)
    band.addColorStop(0, 'rgba(255,255,255,0)')
    band.addColorStop(0.5, `rgba(255,236,170,${0.45 * (1 - progress)})`)
    band.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = band
    ctx.fillRect(left, top, COLS * cell, height)
  }

  private drawParticles(dt: number): void {
    const ctx = this.ctx
    ctx.save()
    for (const p of this.particles) {
      p.life -= dt * p.decay
      if (p.life <= 0) continue
      p.vy += p.gravity * dt / 1000
      p.x += p.vx * dt / 1000
      p.y += p.vy * dt / 1000
      ctx.globalAlpha = Math.min(1, p.life * 1.4)
      ctx.fillStyle = p.color
      const size = p.size * (0.4 + p.life * 0.6)
      ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size)
    }
    ctx.restore()
    this.particles = this.particles.filter(p => p.life > 0)
  }

  private drawCallouts(dt: number): void {
    const x = this.unitX(HOLD_BOX.x + HOLD_BOX.w / 2)
    if (this.callout) {
      const c = this.callout
      c.age += dt
      if (c.age >= c.duration) this.callout = null
      else this.drawCallout(c, x, this.unitY(CALLOUT_CENTER_Y), 1)
    }
    if (this.combo) {
      const c = this.combo
      c.age += dt
      if (c.age >= c.duration) this.combo = null
      else this.drawCallout(c, x, this.unitY(CALLOUT_CENTER_Y + 2.5), 1.15)
    }
  }

  private drawCallout(c: Callout, x: number, y: number, scale: number): void {
    const { ctx, cell } = this
    const pop = this.reducedMotion ? 1 : 1 + 0.35 * (1 - easeOut(c.age / 160))
    const fade = Math.min(1, (c.duration - c.age) / 380)
    ctx.save()
    ctx.globalAlpha = fade
    ctx.translate(x, y)
    ctx.scale(pop, pop)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (c.kicker) {
      ctx.fillStyle = '#ffd98a'
      ctx.font = `800 ${cell * 0.34}px ${FONT}`
      ctx.fillText(c.kicker, 0, -cell * 0.95 * scale)
    }
    // A title that is longer than the column shrinks rather than spilling into the well.
    const titleSize = cell * 0.78 * scale
    ctx.font = `900 ${titleSize}px ${FONT}`
    const maxWidth = HOLD_BOX.w * cell * 0.94
    const measured = ctx.measureText(c.title).width
    if (measured > maxWidth) ctx.font = `900 ${titleSize * maxWidth / measured}px ${FONT}`
    if (!this.reducedMotion) {
      ctx.shadowColor = c.color
      ctx.shadowBlur = cell * 0.6
    }
    ctx.fillStyle = c.color
    ctx.fillText(c.title, 0, 0)
    ctx.shadowBlur = 0
    if (c.sub) {
      ctx.fillStyle = '#eef0ff'
      ctx.font = `800 ${cell * 0.44 * scale}px ${FONT}`
      ctx.fillText(c.sub, 0, cell * 0.78 * scale)
    }
    ctx.restore()
  }

  private drawPopups(dt: number, shake: number): void {
    const { ctx, cell } = this
    for (const popup of this.popups) {
      popup.age += dt
      const t = popup.age / 950
      if (t >= 1) continue
      ctx.save()
      ctx.globalAlpha = Math.min(1, (1 - t) * 2)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `800 ${cell * 0.62}px ${FONT}`
      ctx.fillStyle = popup.color
      if (!this.reducedMotion) {
        ctx.shadowColor = 'rgba(0,0,0,0.6)'
        ctx.shadowBlur = cell * 0.3
      }
      const rise = this.reducedMotion ? 0 : easeOut(t) * cell * 1.4
      ctx.fillText(popup.text, this.px(COLS / 2), this.py(popup.y) + cell / 2 - rise + shake)
      ctx.restore()
    }
    this.popups = this.popups.filter(popup => popup.age < 950)
  }

  private drawBigText(text: BigText, maxWidthCells: number): void {
    const { ctx, cell } = this
    const pop = this.reducedMotion ? 1 : 1 + 0.45 * (1 - easeOut(text.age / 200))
    ctx.save()
    ctx.globalAlpha = Math.min(1, (text.duration - text.age) / 260)
    ctx.translate(this.px(COLS / 2), this.py(HIDDEN_ROWS + VISIBLE_ROWS / 2))
    ctx.scale(pop, pop)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    let size = cell * text.size
    ctx.font = `900 ${size}px ${FONT}`
    const measured = ctx.measureText(text.text).width
    if (measured > maxWidthCells * cell) {
      size *= maxWidthCells * cell / measured
      ctx.font = `900 ${size}px ${FONT}`
    }
    if (!this.reducedMotion) {
      ctx.shadowColor = text.color
      ctx.shadowBlur = cell * 1.1
    }
    ctx.fillStyle = text.color
    ctx.fillText(text.text, 0, 0)
    ctx.restore()
  }

  private drawCenterText(dt: number): void {
    if (!this.centerText) return
    this.centerText.age += dt
    if (this.centerText.age >= this.centerText.duration) this.centerText = null
    else this.drawBigText(this.centerText, 9)
  }

  private drawCountdown(dt: number): void {
    if (!this.countdown) return
    this.countdown.age += dt
    if (this.countdown.age >= this.countdown.duration) this.countdown = null
    else this.drawBigText(this.countdown, 8)
  }
}
