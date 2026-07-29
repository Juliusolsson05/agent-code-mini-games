import * as THREE from 'three'

import { rackBreakdown, type ChipValue } from '../../../../shared/chipPalette'
import { arcPosition, clamp01, easeOutCubic } from '../animation'
import { CHIP_H, CHIP_R, FELT_D, FELT_W } from '../world'
import { chipJitter, disposeChip, makeChip } from './chip'

// The player's bankroll, as PHYSICAL CHIPS in the bottom-left corner (§9.4 extension).
//
// ── WHY THIS EXISTS ──
// The bankroll was a number in the top-right corner. Numbers are information, not
// feedback: winning $50 changed a glyph and nothing else, which is why a win felt
// anticlimactic even after the payout chips landed. A rack that visibly GROWS when you
// win and SHRINKS when you lose gives every hand a physical consequence you feel in
// peripheral vision, without reading anything.
//
// The rack is an indicator, not an accounting record — see rackBreakdown() for why it
// renders one denomination rather than a true largest-first breakdown.

const COLUMN_HEIGHT = 8 // chips per column before starting a new one
const COLUMN_GAP = CHIP_R * 2.35
const ROW_GAP = CHIP_R * 2.35

/** Bottom-left of the felt, clear of the player's hand and the discard tray. */
const RACK_X = -FELT_W / 2 + 1.45
const RACK_Z = FELT_D / 2 - 1.35

const DROP_DURATION = 0.3
const DROP_STAGGER = 0.045
const LEAVE_DURATION = 0.34

type RackChip = {
  mesh: THREE.Mesh
  from: THREE.Vector3
  to: THREE.Vector3
  t: number
  duration: number
  landed: boolean
  /** Set when the chip is on its way OUT; it is disposed when its travel completes. */
  leaving: boolean
}

export class ChipRack {
  private chips: RackChip[] = []
  private denom: ChipValue = 25
  private count = -1

  constructor(private scene: THREE.Scene) {}

  /** Seat `index` in the rack, counting up each column then across. */
  private seat(index: number, out: THREE.Vector3): THREE.Vector3 {
    const column = Math.floor(index / COLUMN_HEIGHT)
    const level = index % COLUMN_HEIGHT
    // Columns march right, and wrap to a second row toward the dealer once we run out
    // of width — a rack that grew indefinitely sideways would cross the betting circle.
    const col = column % 4
    const row = Math.floor(column / 4)
    const j = chipJitter()
    return out.set(
      RACK_X + col * COLUMN_GAP + j.x,
      0.02 + CHIP_H / 2 + level * CHIP_H,
      RACK_Z - row * ROW_GAP + j.z,
    )
  }

  /**
   * Reconcile the rack to a bankroll. Adds drop in from above with a stagger; removals
   * fly off toward the dealer. A denomination change (crossing a rackBreakdown boundary)
   * rebuilds the whole rack, which reads as the dealer colouring you up — correct
   * behaviour, and rare enough not to be noisy.
   */
  update(bankroll: number, reducedMotion: boolean): void {
    const { denom, count } = rackBreakdown(bankroll)
    if (denom === this.denom && count === this.count) return

    const rebuild = denom !== this.denom
    this.denom = denom
    this.count = count

    const live = this.chips.filter(c => !c.leaving)

    if (rebuild) {
      for (const c of live) this.retire(c, reducedMotion)
      live.length = 0
    }

    const scratch = new THREE.Vector3()

    // Too many chips on the table — send the surplus back to the house.
    for (let i = live.length - 1; i >= count; i--) {
      this.retire(live[i], reducedMotion)
      live.splice(i, 1)
    }

    // Too few — drop the difference in.
    for (let i = live.length; i < count; i++) {
      const mesh = makeChip(denom)
      const to = this.seat(i, scratch).clone()
      const from = new THREE.Vector3(to.x, 3.4, to.z - 0.4)
      mesh.position.copy(reducedMotion ? to : from)
      this.scene.add(mesh)
      const chip: RackChip = {
        mesh,
        from,
        to,
        t: reducedMotion ? DROP_DURATION : -(i - live.length) * DROP_STAGGER,
        duration: DROP_DURATION,
        landed: reducedMotion,
        leaving: false,
      }
      this.chips.push(chip)
      live.push(chip)
    }

    // Re-seat survivors — after a removal the remaining chips must close the gap.
    live.forEach((c, i) => {
      const target = this.seat(i, scratch)
      if (!c.leaving && c.to.distanceToSquared(target) > 0.0004) {
        c.from.copy(c.mesh.position)
        c.to.copy(target)
        c.t = reducedMotion ? c.duration : 0
        c.landed = reducedMotion
      }
    })
  }

  private retire(chip: RackChip, reducedMotion: boolean): void {
    chip.leaving = true
    chip.from.copy(chip.mesh.position)
    chip.to.set(chip.mesh.position.x, 2.6, chip.mesh.position.z - 2.2)
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
