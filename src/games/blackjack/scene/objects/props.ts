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

const MAX_STACK_H = 1.5 // how tall a completely full block of cards is

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
  /** 0 = empty, 1 = a full shoe. */
  setShoeFill(fraction: number): void
  /** 0 = empty tray, 1 = every card discarded. */
  setDiscardFill(fraction: number): void
}

export function buildProps(scene: THREE.Scene): TableProps {
  // --- dealing shoe --------------------------------------------------------------
  const shoe = new THREE.Group()
  shoe.position.copy(SHOE_PROP_POS)
  shoe.rotation.y = -0.18
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
  scene.add(shoe)

  // --- discard tray ---------------------------------------------------------------
  const tray = new THREE.Group()
  tray.position.copy(DISCARD_PROP_POS)
  tray.rotation.y = 0.18
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
  scene.add(tray)

  /**
   * Scale the block's height and re-seat it so it grows UP from the tray floor rather
   * than from its own centre. A hidden block (fraction ~0) is scaled to a sliver and
   * made invisible — scaling to exactly 0 produces a degenerate matrix and a warning.
   */
  const setFill = (block: THREE.Mesh, fraction: number): void => {
    const f = Math.max(0, Math.min(1, fraction))
    block.visible = f > 0.01
    const s = Math.max(0.01, f)
    block.scale.y = s
    block.position.y = 0.035 + (MAX_STACK_H * s) / 2
  }

  setFill(shoeCards, 1)
  setFill(discardCards, 0)

  return {
    setShoeFill: f => setFill(shoeCards, f),
    setDiscardFill: f => setFill(discardCards, f),
  }
}

/** Card thickness is exported for callers reasoning about stack heights. */
export const CARD_THICKNESS = CT
