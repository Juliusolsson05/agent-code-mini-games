import * as THREE from 'three'

import type { ChipValue } from '../../../../shared/chipPalette'
import { chipMaterialSet } from '../materials'
import { CHIP_H, CHIP_R } from '../world'

// A casino chip (spec §8.3).
//
// Materials are CACHED PER DENOMINATION and shared across every chip on the table: a bet
// stack is a dozen meshes and rasterising the face SVG per chip would thrash. Geometry is
// likewise shared — a chip is a chip.

let geometry: THREE.CylinderGeometry | null = null
const materialCache = new Map<ChipValue, THREE.Material[]>()

function getGeometry(): THREE.CylinderGeometry {
  if (!geometry) geometry = new THREE.CylinderGeometry(CHIP_R, CHIP_R, CHIP_H, 40)
  return geometry
}

function getMaterials(value: ChipValue): THREE.Material[] {
  let m = materialCache.get(value)
  if (!m) {
    m = chipMaterialSet(value)
    materialCache.set(value, m)
  }
  return m
}

/**
 * `index` is the chip's height in the stack; it seeds a deterministic-looking jitter.
 *
 * REALISM DETAIL: real chips never stack perfectly. A column of identically-oriented
 * cylinders is the single clearest "this is a computer" tell on a card table, so each
 * chip gets a random yaw and a sub-millimetre lateral offset. Cheap, and it's most of
 * what makes a stack look handled.
 */
export function makeChip(value: ChipValue): THREE.Mesh {
  const mesh = new THREE.Mesh(getGeometry(), getMaterials(value))
  mesh.rotation.y = (Math.random() - 0.5) * 0.5
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

/** The lateral jitter for a chip at a given stack level. */
export function chipJitter(): { x: number; z: number } {
  return { x: (Math.random() - 0.5) * 0.02, z: (Math.random() - 0.5) * 0.02 }
}

/**
 * Release one chip. Intentionally a NO-OP on geometry and materials — both are shared
 * across every chip on the table (see the caches above), so freeing them here would pull
 * the rug out from under every other chip. The caller removes the mesh from the scene;
 * the shared resources live until `disposeChipResources()` at teardown.
 */
export function disposeChip(_mesh: THREE.Mesh): void {
  // Nothing per-chip to free. Kept as a named call so ownership is explicit at call
  // sites rather than an unexplained absence.
}

export function disposeChipResources(): void {
  geometry?.dispose()
  geometry = null
  for (const mats of materialCache.values()) mats.forEach(m => m.dispose())
  materialCache.clear()
}
