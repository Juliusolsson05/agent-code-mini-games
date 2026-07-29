import * as THREE from 'three'

import { cardBackTexture } from '../textures/cardTextures'
import { CH, CT, CW, DISCARD_PROP_POS, SHOE_PROP_POS } from '../world'

// Static table props (spec §8.5): the dealing shoe and the discard tray.
//
// ── THEY MUST NOT BE EMPTY ──
// The first version modelled two empty acrylic boxes, which read as abandoned furniture:
// a shoe with no cards in it is just a wedge. Both now hold a visible BLOCK OF CARDS
// whose height tracks the real shoe state — cards drain out of the shoe and pile up in
// the discard tray over a session. That coupling is free (the engine already reports
// `shoeRemaining`) and it is the single cheapest thing on this table that makes it feel
// like a game in progress rather than a render.

// How tall a completely full block of cards is.
//
// ── WHY THIS IS EXAGGERATED, AND WHY THE TRAYS ARE TILTED ──
// From a camera 17° off vertical, a stack's HEIGHT is the one dimension that nearly
// vanishes: you see the top face almost square-on and the side edge-on. A physically
// scaled 312-card block (~1cm at this table's scale) was invisible, which is why the
// discard pile "never grew" — it was growing correctly, just not in a direction the
// camera could see. Two fixes: make the block tall enough to read, and TILT the whole
// tray toward the viewer so the stack's side is presented rather than hidden.
const MAX_STACK_H = 2.5
/** Tips the tray's open face toward the player, the way a real dealing shoe sits. */
// Kept SMALL. A larger tilt shows more of the stack's side, but seatAboveFelt() then has
// to lift the tray so far that it visibly hovers instead of resting on the cloth. 0.18 is
// the most tilt that still needs only a ~0.17 lift, which reads as the tray sitting on
// its own base. The stack height (MAX_STACK_H) does the rest of the work.
const TRAY_TILT = 0.18

/**
 * Lift a tilted group until nothing pokes through the felt.
 *
 * Rotation happens about the group's ORIGIN, which sits at y = 0 (the felt plane) — so
 * the moment you tilt a tray, its back half swings BELOW the table and clips through the
 * cloth. Rather than hand-tuning an offset per prop (which silently breaks the next time
 * the tilt, scale, or geometry changes), measure the actual rotated bounds and raise the
 * group by whatever it takes. Self-correcting by construction.
 *
 * Measured at FULL fill: the card block only ever scales upward from the tray floor, so
 * the lowest point never drops below what we compute here.
 */
function seatAboveFelt(group: THREE.Object3D, clearance = 0.015): void {
  group.updateMatrixWorld(true)
  const box = new THREE.Box3().setFromObject(group)
  if (box.min.y < clearance) group.position.y += clearance - box.min.y
}
/** How fast a fill level eases toward its target — see setFill/step. */
const FILL_EASE = 3.2

function acrylicMaterial(color: number, opacity: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.25,
    metalness: 0.05,
    transparent: opacity < 1,
    opacity,
    envMapIntensity: 0.8,
  })
}

/**
 * A block of stacked cards. The top face shows a real card back; the sides are the white
 * edge of the paper — which is what you actually see of a stack from above.
 */
function makeCardBlock(): THREE.Mesh {
  const edge = new THREE.MeshStandardMaterial({ color: 0xf1efe6, roughness: 0.75, envMapIntensity: 0.3 })
  const top = new THREE.MeshStandardMaterial({ map: cardBackTexture(), roughness: 0.6, envMapIntensity: 0.35 })
  // Box faces: [+x, −x, +y(top), −y, +z, −z]
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(CW, MAX_STACK_H, CH), [edge, edge, top, edge, edge, edge])
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

/** Handles so the scene can drive the fill levels from engine state. */
export type TableProps = {
  /** 0 = empty, 1 = a full shoe. Eased, not snapped. */
  setShoeFill(fraction: number): void
  /** 0 = empty tray, 1 = every card discarded. Eased, not snapped. */
  setDiscardFill(fraction: number): void
  /** Advance the fill animations. */
  step(dt: number): void
}

export function buildProps(scene: THREE.Scene): TableProps {
  // --- dealing shoe --------------------------------------------------------------
  const shoe = new THREE.Group()
  shoe.position.copy(SHOE_PROP_POS)
  shoe.rotation.y = -0.18
  shoe.rotation.x = TRAY_TILT
  // Scenery scale — at 1.0 these chunky boxes crowded the felt corners and pulled the
  // eye away from the cards, which are the actual subject.
  shoe.scale.setScalar(0.76)

  // Three walls and a floor — deliberately NOT a closed box, so the card block inside is
  // actually visible from the bird's-eye camera. A lid would hide the whole point.
  const shoeFloor = new THREE.Mesh(new THREE.BoxGeometry(CW + 0.34, 0.07, CH + 0.3), acrylicMaterial(0x1c2028, 0.95))
  shoeFloor.receiveShadow = true
  shoe.add(shoeFloor)

  for (const [x, z, w, d] of [
    [-(CW / 2 + 0.13), 0, 0.07, CH + 0.3],
    [CW / 2 + 0.13, 0, 0.07, CH + 0.3],
    [0, -(CH / 2 + 0.11), CW + 0.34, 0.07],
  ] as const) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, MAX_STACK_H + 0.25, d), acrylicMaterial(0x3a4450, 0.34))
    wall.position.set(x, (MAX_STACK_H + 0.25) / 2, z)
    wall.castShadow = true
    shoe.add(wall)
  }

  const shoeCards = makeCardBlock()
  shoe.add(shoeCards)
  seatAboveFelt(shoe)
  scene.add(shoe)

  // --- discard tray ---------------------------------------------------------------
  const tray = new THREE.Group()
  tray.position.copy(DISCARD_PROP_POS)
  tray.rotation.y = 0.18
  tray.rotation.x = TRAY_TILT
  tray.scale.setScalar(0.76)

  const trayFloor = new THREE.Mesh(new THREE.BoxGeometry(CW + 0.34, 0.07, CH + 0.3), acrylicMaterial(0x1c2028, 0.95))
  trayFloor.receiveShadow = true
  tray.add(trayFloor)

  for (const x of [-(CW / 2 + 0.13), CW / 2 + 0.13]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.07, MAX_STACK_H + 0.25, CH + 0.3), acrylicMaterial(0x3a4450, 0.34))
    wall.position.set(x, (MAX_STACK_H + 0.25) / 2, 0)
    wall.castShadow = true
    tray.add(wall)
  }

  const discardCards = makeCardBlock()
  tray.add(discardCards)
  seatAboveFelt(tray)
  scene.add(tray)

  /**
   * Scale the block's height and re-seat it so it grows UP from the tray floor rather
   * than from its own centre. A hidden block (fraction ~0) is scaled to a sliver and
   * made invisible — scaling to exactly 0 produces a degenerate matrix and a warning.
   */
  const applyFill = (block: THREE.Mesh, fraction: number): void => {
    const f = Math.max(0, Math.min(1, fraction))
    block.visible = f > 0.004
    const s = Math.max(0.004, f)
    block.scale.y = s
    block.position.y = 0.035 + (MAX_STACK_H * s) / 2
  }

  // Fills are EASED rather than snapped, which buys two things for one mechanism:
  // during normal play each hand nudges the level smoothly instead of stepping, and a
  // reshuffle — where both levels swap ends at once — becomes a visible, satisfying
  // refill animation for free, with no special-case code.
  const level = { shoe: 1, discard: 0 }
  const target = { shoe: 1, discard: 0 }
  applyFill(shoeCards, 1)
  applyFill(discardCards, 0)

  return {
    setShoeFill: f => {
      target.shoe = Math.max(0, Math.min(1, f))
    },
    setDiscardFill: f => {
      target.discard = Math.max(0, Math.min(1, f))
    },
    step: dt => {
      const k = Math.min(1, dt * FILL_EASE)
      level.shoe += (target.shoe - level.shoe) * k
      level.discard += (target.discard - level.discard) * k
      applyFill(shoeCards, level.shoe)
      applyFill(discardCards, level.discard)
    },
  }
}

/** Card thickness is exported for callers reasoning about stack heights. */
export const CARD_THICKNESS = CT
