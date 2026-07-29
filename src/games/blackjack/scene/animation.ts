import * as THREE from 'three'

// Motion helpers (spec §9).
//
// ── WHY NOT `position.lerp(target, 0.16)` PER FRAME ──
// The old scene eased with a fixed per-frame lerp factor. That is FRAME-RATE DEPENDENT:
// the same deal is visibly faster on a 120Hz display than on 60Hz, and it never actually
// arrives (an exponential approach only converges). It also cannot express an arc, so
// cards slid across the felt instead of being dealt.
//
// Everything here is instead driven by an explicit normalised t = elapsed / duration, so
// motion is identical at any refresh rate and genuinely completes.

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export const clamp01 = (t: number): number => (t < 0 ? 0 : t > 1 ? 1 : t)

/** Durations in seconds (§9). */
export const DEAL_DURATION = 0.42
export const DEAL_STAGGER = 0.15
export const FLIP_DURATION = 0.38
export const CHIP_DURATION = 0.28
export const CHIP_STAGGER = 0.09

// Clearing the table (§9.4). Cards must LEAVE, not vanish.
//
// A round used to end by deleting every card mesh in one frame — the board blinked empty
// and the round had no punctuation. Sweeping the hands into the discard tray gives the
// round an ending, and it's the moment a real dealer's table is most legible: you can see
// the cards being collected.
export const DISCARD_DURATION = 0.5
export const DISCARD_STAGGER = 0.07
export const DISCARD_ARC_LIFT = 0.55

/** The payout chips that fly to the player on a win (§9.4). */
export const PAYOUT_DURATION = 0.4
export const PAYOUT_STAGGER = 0.075

/**
 * A card doesn't stop dead — it skids a little on the felt. We overshoot the seat along
 * the travel direction and slide back over the last third of the animation. Tiny, but
 * it's the difference between "teleported into place" and "dealt".
 */
export const SLIDE_OVERSHOOT = 0.13

/** Spin applied about Y during flight, so a dealt card tumbles rather than gliding flat. */
export const DEAL_SPIN = 0.55

/** How high a dealt card arcs at the midpoint — this is what makes it a deal, not a slide. */
export const DEAL_ARC_LIFT = 0.9
/** The hole-card flip lifts as it turns; without it a flip reads as a spin. */
export const FLIP_LIFT = 0.35

/**
 * Position along a parabolic arc from `from` to `to`.
 * `out` is written in place — the render loop must not allocate (§13.4).
 */
export function arcPosition(
  from: THREE.Vector3,
  to: THREE.Vector3,
  t: number,
  lift: number,
  out: THREE.Vector3,
): THREE.Vector3 {
  out.lerpVectors(from, to, t)
  // 4t(1−t) peaks at 1.0 when t = 0.5 and is 0 at both ends.
  out.y += lift * 4 * t * (1 - t)
  return out
}

/**
 * The deal's travel curve: fast out of the shoe, decelerating hard, then a short skid.
 *
 * easeOutCubic alone lands the card dead-still, which reads as a snap-to-grid. Adding a
 * slight overshoot that settles back gives the card weight — it arrives, slides, stops.
 */
export function dealEase(t: number): number {
  const e = easeOutCubic(t)
  // A half-sine bump peaking at t≈0.72 pushes past the target then returns to exactly 1.
  return e + SLIDE_OVERSHOOT * Math.sin(Math.PI * clamp01(t)) * (1 - t)
}

/** Respect the OS setting; §9.5 requires all motion collapse to instant. */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
}
