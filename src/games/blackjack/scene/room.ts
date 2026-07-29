import * as THREE from 'three'

import { floorMaterial } from './materials'
import { glowTexture } from './textures/surfaces'
import { TABLE_D, TABLE_H, TABLE_W } from './world'

// The room the table sits in (spec §6, REVISED).
//
// ── WHAT THE FIRST VERSION GOT WRONG ──
// It hung a lamp fixture above the table and scattered bokeh lights 30–40 units behind
// it. Both are invisible-or-worse under THIS camera, and the reason is geometric, not
// artistic: at 17° off vertical the camera sits at y ≈ 24, well ABOVE a lamp at y ≈ 12.5,
// so it looks straight down THROUGH the fixture. The shade rendered as a huge black arc
// occluding the felt and hiding the house legend entirely. The distant bokeh fared no
// better — they sat ~50° off the view axis, outside a 30° frustum, so they cost draw
// calls and contributed nothing.
//
// ── THE RULE THAT FOLLOWS ──
// From a near-top-down camera you see the table and the floor around it. That is the
// whole set. So the room IS the floor: nothing may be placed between y=0 and the camera,
// and anything meant to be seen must lie flat enough to read from above.
//
// The overhead light is still *implied* — the warm key and the spot's pool on the felt
// (lighting.ts) do that work. We simply never show the fixture, exactly as a top-down
// product shot never shows the softbox.

/** Vertical gradient backdrop — only glimpsed past the floor's edge, but it keeps the
 *  far corners from clipping to flat black. */
function backdropTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 4
  c.height = 512
  const ctx = c.getContext('2d')!
  const g = ctx.createLinearGradient(0, 0, 0, 512)
  g.addColorStop(0, '#04050a')
  g.addColorStop(0.55, '#0a0910')
  g.addColorStop(1, '#181013')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 4, 512)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Carpet: deep oxblood with a faint damask-ish mottle so the floor isn't a dead fill. */
function carpetTexture(): THREE.CanvasTexture {
  const s = 512
  const c = document.createElement('canvas')
  c.width = s
  c.height = s
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#150b0e'
  ctx.fillRect(0, 0, s, s)

  // Soft blotches at very low alpha — reads as pile/wear once tiled and dimly lit.
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * s
    const y = Math.random() * s
    const r = 6 + Math.random() * 26
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(90,30,40,0.055)' : 'rgba(0,0,0,0.07)'
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  // Fine grain on top so it doesn't look like blurred blobs.
  const img = ctx.getImageData(0, 0, s, s)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 9
    d[i] += n
    d[i + 1] += n
    d[i + 2] += n
  }
  ctx.putImageData(img, 0, 0)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(8, 8)
  return tex
}

/**
 * A warm pool of light lying FLAT on the floor (§6.3 revised).
 *
 * This is the bloom replacement AND the room-depth trick in one. Laid horizontally it
 * reads from a top-down camera as spill from an off-screen fixture — which is exactly
 * the cue that says "this table is in a lit room" without putting geometry in front of
 * the lens. Additive + depthWrite:false so it can never occlude anything.
 */
function floorPool(tex: THREE.Texture, color: number, size: number, opacity: number): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      map: tex,
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  )
  mesh.rotation.x = -Math.PI / 2
  return mesh
}

export function installRoom(scene: THREE.Scene): void {
  scene.background = backdropTexture()

  const floorY = -TABLE_H - 0.35

  // --- floor --------------------------------------------------------------------
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), floorMaterial())
  floor.material.map = carpetTexture()
  floor.rotation.x = -Math.PI / 2
  floor.position.y = floorY
  floor.receiveShadow = true
  scene.add(floor)

  // --- light spill on the carpet -------------------------------------------------
  // Placed just outside the table's footprint so they frame it without touching the
  // play area. Sizes/positions are relative to the table so they track any resize.
  const glow = glowTexture()
  const halfW = TABLE_W / 2
  const halfD = TABLE_D / 2

  const pools: Array<[number, number, number, number, number]> = [
    // x, z, colour, size, opacity
    [-halfW - 3.6, -halfD + 1.0, 0xffb367, 13, 0.16],
    [halfW + 3.6, -halfD + 1.6, 0xffd27a, 11, 0.13],
    [-halfW - 2.8, halfD + 2.2, 0xff8f6a, 10, 0.1],
    [halfW + 3.0, halfD + 1.8, 0xffb367, 12, 0.12],
    [0, -halfD - 4.5, 0x6ea0ff, 14, 0.07], // one cool pool far behind, for separation
  ]
  for (const [x, z, color, size, opacity] of pools) {
    const pool = floorPool(glow, color, size, opacity)
    // A hair above the floor so it never z-fights the carpet.
    pool.position.set(x, floorY + 0.01, z)
    scene.add(pool)
  }
}
