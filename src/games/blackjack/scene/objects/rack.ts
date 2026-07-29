import * as THREE from 'three'

import { rackBreakdown, type ChipValue } from '../../../../shared/chipPalette'
import { arcPosition, clamp01, easeOutCubic } from '../animation'
import { CHIP_H, CHIP_R, FELT_D, FELT_W } from '../world'
import { chipJitter, disposeChip, makeChip } from './chip'

// The player's bankroll as PHYSICAL CHIPS in the bottom-left (§9.4 extension).
//
// ── WHY THIS EXISTS ──
// The bankroll was a number in the top-right. Numbers are information, not feedback:
// winning $50 changed a glyph and nothing else, which is why a win stayed anticlimactic
// even once the payout chips landed. A rack that visibly grows and shrinks every hand
// gives the result a physical consequence you feel in peripheral vision.
//
// ── WHY IT'S A MIXED BREAKDOWN ──
// See rackBreakdown(). A single-denomination rack put 40 green chips on the felt at
// $1000 — a wall of identical discs that ate a third of the table. A real tray is
// colour-ordered high-to-low with a little change at the end, which is both prettier and
// far more compact: $1000 is 17 chips across 4 short columns instead of 40 across 5 tall
// ones.

const COLUMN_HEIGHT = 8 // chips per column before spilling into the next
const MAX_COLUMNS = 5
const COLUMN_GAP = CHIP_R * 2.35
const ROW_GAP = CHIP_R * 2.6

/** Bottom-left of the felt, clear of the player's hand and the discard tray. */
const RACK_X = -FELT_W / 2 + 1.45
const RACK_Z = FELT_D / 2 - 1.35

const DROP_DURATION = 0.3
const DROP_STAGGER = 0.04
const LEAVE_DURATION = 0.34

type RackChip = {
  mesh: THREE.Mesh
  denom: ChipValue
  from: THREE.Vector3
  to: THREE.Vector3
  t: number
  duration: number
  landed: boolean
  /** Set when the chip is on its way OUT; disposed when its travel completes. */
  leaving: boolean
}

/** One chip's slot in the tray, in (column, level) space. */
type Seat = { denom: ChipValue; col: number; level: number }

export class ChipRack {
  private chips: RackChip[] = []
  private lastBankroll = -1

  constructor(private scene: THREE.Scene) {}

  /**
   * Lay the breakdown out into seats. A NEW DENOMINATION ALWAYS STARTS A NEW COLUMN —
   * that column-per-colour ordering is what makes a chip well legible at a glance; mixing
   * denominations within a column reads as a jumble and hides the composition.
   */
  private seats(bankroll: number): Seat[] {
    const out: Seat[] = []
    let col = 0
    let level = 0
    let prev: ChipValue | null = null

    for (const { denom, count } of rackBreakdown(bankroll)) {
      for (let i = 0; i < count; i++) {
        if (prev !== null && (denom !== prev || level >= COLUMN_HEIGHT)) {
          col++
          level = 0
        }
        out.push({ denom, col, level })
        level++
        prev = denom
      }
    }
    return out
  }

  private place(seat: Seat, out: THREE.Vector3): THREE.Vector3 {
    // Wrap to a second row rather than marching across the betting circle.
    const col = seat.col % MAX_COLUMNS
    const row = Math.floor(seat.col / MAX_COLUMNS)
    const j = chipJitter()
    return out.set(
      RACK_X + col * COLUMN_GAP + j.x,
      0.02 + CHIP_H / 2 + seat.level * CHIP_H,
      RACK_Z - row * ROW_GAP + j.z,
    )
  }

  /**
   * Reconcile to a bankroll. Chips are matched BY DENOMINATION so a win that adds three
   * $25s doesn't rebuild the whole tray — only the genuinely new chips animate in, and
   * survivors slide to close any gap.
   */
  update(bankroll: number, reducedMotion: boolean): void {
    if (bankroll === this.lastBankroll) return
    this.lastBankroll = bankroll

    const seats = this.seats(bankroll)
    const scratch = new THREE.Vector3()

    // Bucket the live chips by denomination so we can diff per colour.
    const live = this.chips.filter(c => !c.leaving)
    const byDenom = new Map<ChipValue, RackChip[]>()
    for (const c of live) {
      const list = byDenom.get(c.denom) ?? []
      list.push(c)
      byDenom.set(c.denom, list)
    }

    const wanted = new Map<ChipValue, number>()
    for (const s of seats) wanted.set(s.denom, (wanted.get(s.denom) ?? 0) + 1)

    // Retire surplus chips of each colour (including colours that vanished entirely).
    for (const [denom, list] of byDenom) {
      const keep = wanted.get(denom) ?? 0
      for (let i = list.length - 1; i >= keep; i--) {
        this.retire(list[i], reducedMotion)
        list.splice(i, 1)
      }
    }

    // Add the missing ones.
    for (const [denom, count] of wanted) {
      const list = byDenom.get(denom) ?? []
      for (let i = list.length; i < count; i++) {
        const mesh = makeChip(denom)
        this.scene.add(mesh)
        const chip: RackChip = {
          mesh,
          denom,
          from: new THREE.Vector3(),
          to: new THREE.Vector3(),
          t: 0,
          duration: DROP_DURATION,
          landed: reducedMotion,
          leaving: false,
        }
        list.push(chip)
        this.chips.push(chip)
      }
      byDenom.set(denom, list)
    }

    // Seat everything. Chips already at rest that haven't moved keep their position, so
    // an unchanged column stays perfectly still.
    const cursor = new Map<ChipValue, number>()
    seats.forEach((seat, index) => {
      const n = cursor.get(seat.denom) ?? 0
      cursor.set(seat.denom, n + 1)
      const chip = byDenom.get(seat.denom)?.[n]
      if (!chip) return

      const target = this.place(seat, scratch)
      if (chip.to.lengthSq() === 0) {
        // Brand new: drop it in from above, staggered by its position in the tray.
        chip.to.copy(target)
        chip.from.set(target.x, 3.4, target.z - 0.4)
        chip.mesh.position.copy(reducedMotion ? target : chip.from)
        chip.t = reducedMotion ? DROP_DURATION : -index * DROP_STAGGER
      } else if (chip.to.distanceToSquared(target) > 0.0004) {
        chip.from.copy(chip.mesh.position)
        chip.to.copy(target)
        chip.t = reducedMotion ? chip.duration : 0
        chip.landed = reducedMotion
      }
    })
  }

  private retire(chip: RackChip, reducedMotion: boolean): void {
    chip.leaving = true
    chip.from.copy(chip.mesh.position)
    // Back toward the dealer — losses leave the way the house takes them.
    chip.to.set(chip.mesh.position.x + 0.6, 2.4, chip.mesh.position.z - 2.4)
    chip.t = reducedMotion ? LEAVE_DURATION : 0
    chip.duration = LEAVE_DURATION
    chip.landed = true // a departing chip must not click
  }

  /** Advance the rack; `onLand` fires once per chip that settles, for the clink. */
  step(dt: number, scratch: THREE.Vector3, onLand: () => void): void {
    for (let i = this.chips.length - 1; i >= 0; i--) {
      const c = this.chips[i]
      c.t += dt
      const t = clamp01(c.t / c.duration)
      if (t > 0) {
        arcPosition(c.from, c.to, easeOutCubic(t), c.leaving ? 0.5 : 0.2, scratch)
        c.mesh.position.copy(scratch)
        if (c.leaving) c.mesh.scale.setScalar(Math.max(0.02, 1 - t))
      }
      if (t >= 1) {
        if (c.leaving) {
          this.scene.remove(c.mesh)
          disposeChip(c.mesh)
          this.chips.splice(i, 1)
        } else if (!c.landed) {
          c.landed = true
          onLand()
        }
      }
    }
  }

  dispose(): void {
    for (const c of this.chips) {
      this.scene.remove(c.mesh)
      disposeChip(c.mesh)
    }
    this.chips = []
  }
}
