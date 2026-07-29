import * as THREE from 'three'

// Procedural surface textures (spec §7.3.3–§7.3.5): wood, leather, and the additive glow
// sprite. All canvas-drawn — the sandboxed frame's CSP forbids fetching image files, so
// every pixel here is generated at runtime.

/** Table body: dark stained hardwood with bezier grain streaks. */
export function woodTexture(): THREE.CanvasTexture {
  const w = 1024
  const h = 256
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!

  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, '#4a2e1c')
  g.addColorStop(0.5, '#35200f')
  g.addColorStop(1, '#22140a')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  for (let i = 0; i < 90; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.18})`
    ctx.lineWidth = Math.random() * 2.4
    const y = Math.random() * h
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.bezierCurveTo(
      w * 0.3, y + Math.random() * 10 - 5,
      w * 0.6, y + Math.random() * 10 - 5,
      w, y + Math.random() * 8 - 4,
    )
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 2)
  tex.anisotropy = 8
  return tex
}

/** Rail bumper: oxblood leather with a fine pebble grain. */
export function leatherTexture(): THREE.CanvasTexture {
  const s = 512
  const c = document.createElement('canvas')
  c.width = s
  c.height = s
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#2a1416'
  ctx.fillRect(0, 0, s, s)

  // Pebbling: overlapping soft blobs at low alpha read as grain once minified.
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * s
    const y = Math.random() * s
    const r = 1.5 + Math.random() * 4
    const light = Math.random() > 0.5
    ctx.fillStyle = light ? `rgba(255,210,200,${Math.random() * 0.05})` : `rgba(0,0,0,${Math.random() * 0.09})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(4, 4)
  return tex
}

/**
 * The additive glow sprite (§7.3.5) — THIS IS WHAT REPLACES BLOOM.
 *
 * A post-process bloom pass reads the linear HDR buffer and cannot distinguish "a lamp"
 * from "a white card lit brightly", which is exactly how every white object ended up
 * with a halo (§2.2). A sprite glows only where we place one: authored, predictable, one
 * quad, and correct at any exposure.
 *
 * The falloff is deliberately non-linear (pow 2.2) — a plain linear gradient reads as a
 * soft ball rather than a light.
 */
export function glowTexture(): THREE.CanvasTexture {
  const s = 256
  const c = document.createElement('canvas')
  c.width = s
  c.height = s
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(s, s)
  const d = img.data
  const half = s / 2
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const dx = (x - half) / half
      const dy = (y - half) / half
      const r = Math.min(1, Math.sqrt(dx * dx + dy * dy))
      const a = Math.pow(1 - r, 2.2)
      const i = (y * s + x) * 4
      d[i] = 255
      d[i + 1] = 255
      d[i + 2] = 255
      d[i + 3] = Math.round(a * 255)
    }
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
