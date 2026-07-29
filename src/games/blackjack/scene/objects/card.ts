import * as THREE from 'three'

import type { Rank, Suit } from '../../../../assets/svg/suits'
import { cardBackMaterial, cardFaceMaterial, cardStockMaterial } from '../materials'
import { CARD_RADIUS, CH, CT, CW } from '../world'

// A playing card (spec §8.2). Cards are the hero asset and get the most geometry budget.
//
// ── WHY "ROUNDED STOCK + TWO DECAL PLANES" AND NOT THE OBVIOUS ALTERNATIVES ──
//
//   BoxGeometry            → square corners. Real cards are rounded, and at this camera
//                            angle the corners are visible enough to look wrong.
//   one ExtrudeGeometry    → rounded, but its two cap faces share ONE material group, so
//                            the front and back cannot carry different textures. Fatal:
//                            a card needs a face AND a back. Its cap UVs are also raw
//                            shape coordinates, not 0→1, so the art would need remapping.
//
// So: an extruded rounded body in card-stock white, plus two thin PlaneGeometry decals
// (clean 0→1 UVs by construction) floated 0.8mm above each face. The white stock shows
// as a hairline margin around the print — which is exactly how a real card looks — and
// z-fighting is handled by polygonOffset on the decal materials (see materials.ts).
//
// Face on +Y, back on −Y. That makes "face down" a single-axis rotation.x = π, and the
// hole-card flip one clean animation (§9.2).

/** Cached — every card in the shoe shares one body shape. */
let stockGeometry: THREE.ExtrudeGeometry | null = null
let decalGeometry: THREE.PlaneGeometry | null = null

function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const hw = w / 2
  const hh = h / 2
  const s = new THREE.Shape()
  s.moveTo(-hw + r, -hh)
  s.lineTo(hw - r, -hh)
  s.quadraticCurveTo(hw, -hh, hw, -hh + r)
  s.lineTo(hw, hh - r)
  s.quadraticCurveTo(hw, hh, hw - r, hh)
  s.lineTo(-hw + r, hh)
  s.quadraticCurveTo(-hw, hh, -hw, hh - r)
  s.lineTo(-hw, -hh + r)
  s.quadraticCurveTo(-hw, -hh, -hw + r, -hh)
  return s
}

function getStockGeometry(): THREE.ExtrudeGeometry {
  if (!stockGeometry) {
    // NO BEVEL — and this is load-bearing, not a style choice.
    //
    // ExtrudeGeometry's bevel extends BEYOND `depth` at both ends, so a bevelled card
    // spans −bevelThickness … CT+bevelThickness. After centring, its real half-thickness
    // is CT/2 + bevelThickness, which put the top surface ABOVE the decal planes floated
    // at CT/2 + 0.0008 — burying the printed face inside the white stock. That was the
    // "card texture is flickering / blank" bug: the decals were intersecting the body.
    // Without a bevel the extrusion is exactly 0…CT, so CT/2 is genuinely the surface.
    // The corner rounding comes from the SHAPE, not the bevel, so nothing is lost.
    const g = new THREE.ExtrudeGeometry(roundedRectShape(CW, CH, CARD_RADIUS), {
      depth: CT,
      bevelEnabled: false,
      curveSegments: 6,
    })
    // Extrude builds along +Z from z=0. Lay it flat (so thickness is +Y) and centre it.
    g.rotateX(-Math.PI / 2)
    g.translate(0, -CT / 2, 0)
    stockGeometry = g
  }
  return stockGeometry
}

function getDecalGeometry(): THREE.PlaneGeometry {
  if (!decalGeometry) decalGeometry = new THREE.PlaneGeometry(CW, CH)
  return decalGeometry
}

/**
 * Build one card as a Group: stock body + face decal + back decal.
 *
 * Returns a Group rather than a Mesh so callers animate one transform and the three
 * parts stay welded. Geometry is shared/cached; only the two decal materials are
 * per-card (they carry this rank+suit's texture).
 */
export function makeCard(rank: Rank, suit: Suit): THREE.Group {
  const group = new THREE.Group()

  const stock = new THREE.Mesh(getStockGeometry(), cardStockMaterial())
  stock.castShadow = true
  stock.receiveShadow = true
  group.add(stock)

  const lift = CT / 2 + 0.0008

  const face = new THREE.Mesh(getDecalGeometry(), cardFaceMaterial(rank, suit))
  face.rotation.x = -Math.PI / 2 // lie flat, facing +Y
  face.position.y = lift
  face.receiveShadow = true
  group.add(face)

  const back = new THREE.Mesh(getDecalGeometry(), cardBackMaterial())
  back.rotation.x = Math.PI / 2 // lie flat, facing −Y
  back.position.y = -lift
  back.receiveShadow = true
  group.add(back)

  return group
}

/** Frees only the per-card materials; geometry is shared and lives until teardown. */
export function disposeCard(group: THREE.Group): void {
  group.traverse(obj => {
    if (obj instanceof THREE.Mesh) {
      const m = obj.material
      if (Array.isArray(m)) m.forEach(x => x.dispose())
      else m.dispose()
    }
  })
}

export function disposeCardGeometry(): void {
  stockGeometry?.dispose()
  decalGeometry?.dispose()
  stockGeometry = null
  decalGeometry = null
}
