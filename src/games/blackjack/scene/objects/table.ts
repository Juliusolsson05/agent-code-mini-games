import * as THREE from 'three'

import { feltMaterial, railMaterial, trimMaterial, woodMaterial } from '../materials'
import {
  FELT_D,
  FELT_W,
  RAIL_H,
  TABLE_CORNER_R,
  TABLE_D,
  TABLE_H,
  TABLE_W,
} from '../world'

// The physical table (spec §8.1) — a solid body with real thickness, an inset felt, a
// brass trim ring, and a raised leather rail. The previous version was two flat planes,
// which is why nothing read as 3D: with no side faces there was nothing to shade.

/** Trace a centred rounded rectangle. Shape and Path share the curve API, so one helper
 *  serves both the rail's outer outline and its inner (felt window) hole. */
function traceRoundedRect(ctx: THREE.Shape | THREE.Path, hw: number, hd: number, r: number): void {
  ctx.moveTo(-hw + r, -hd)
  ctx.lineTo(hw - r, -hd)
  ctx.quadraticCurveTo(hw, -hd, hw, -hd + r)
  ctx.lineTo(hw, hd - r)
  ctx.quadraticCurveTo(hw, hd, hw - r, hd)
  ctx.lineTo(-hw + r, hd)
  ctx.quadraticCurveTo(-hw, hd, -hw, hd - r)
  ctx.lineTo(-hw, -hd + r)
  ctx.quadraticCurveTo(-hw, -hd, -hw + r, -hd)
}

export function buildTable(scene: THREE.Scene): void {
  // --- wood body ---------------------------------------------------------------
  // Its TOP face sits just under the felt (y = 0 is the datum, §world.ts).
  const body = new THREE.Mesh(new THREE.BoxGeometry(TABLE_W, TABLE_H, TABLE_D), woodMaterial())
  body.position.y = -0.02 - TABLE_H / 2
  body.castShadow = true
  body.receiveShadow = true
  scene.add(body)

  // --- felt playfield ----------------------------------------------------------
  const felt = new THREE.Mesh(new THREE.PlaneGeometry(FELT_W, FELT_D), feltMaterial())
  felt.rotation.x = -Math.PI / 2
  felt.position.y = 0
  felt.receiveShadow = true
  scene.add(felt)

  // --- brass trim --------------------------------------------------------------
  // A thin inlay ringing the felt window. Small, but it's the detail that separates
  // "a green rectangle" from "a table" — the eye reads the crisp metal line as craft.
  const trimShape = new THREE.Shape()
  traceRoundedRect(trimShape, FELT_W / 2 + 0.13, FELT_D / 2 + 0.13, 0.86)
  const trimHole = new THREE.Path()
  traceRoundedRect(trimHole, FELT_W / 2 + 0.02, FELT_D / 2 + 0.02, 0.78)
  trimShape.holes.push(trimHole)

  const trim = new THREE.Mesh(
    new THREE.ExtrudeGeometry(trimShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
      curveSegments: 20,
    }).rotateX(-Math.PI / 2),
    trimMaterial(),
  )
  trim.position.y = 0.005
  trim.castShadow = true
  trim.receiveShadow = true
  scene.add(trim)

  // --- padded leather rail ------------------------------------------------------
  // A rounded-rect ring extruded upward with a generous bevel. The BEVEL is the point:
  // it's what catches the key light as a soft highlight roll along the top edge, which
  // is the visual signature of a padded bumper.
  const railShape = new THREE.Shape()
  traceRoundedRect(railShape, TABLE_W / 2 - 0.12, TABLE_D / 2 - 0.12, TABLE_CORNER_R)
  const railHole = new THREE.Path()
  traceRoundedRect(railHole, FELT_W / 2 + 0.16, FELT_D / 2 + 0.16, 0.82)
  railShape.holes.push(railHole)

  const rail = new THREE.Mesh(
    new THREE.ExtrudeGeometry(railShape, {
      depth: RAIL_H,
      bevelEnabled: true,
      bevelThickness: 0.16,
      bevelSize: 0.16,
      bevelSegments: 4,
      curveSegments: 20,
    }).rotateX(-Math.PI / 2), // extrusion (+Z) becomes world +Y
    railMaterial(),
  )
  rail.position.y = -0.04 // starts just under the felt lip and rises above it
  rail.castShadow = true
  rail.receiveShadow = true
  scene.add(rail)
}
