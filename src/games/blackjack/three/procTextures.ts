import * as THREE from 'three'

import type { ChipValue } from '../../../chips/Chip'

// All materials are self-contained: the felt, wood rail, and chip faces are drawn on
// offscreen canvases (no network, no bundled images) and used as textures. The house
// text is baked STRAIGHT into the felt (no more clipped arc).

const TAU = Math.PI * 2

export function feltTexture(): THREE.CanvasTexture {
  const s = 1024
  const c = document.createElement('canvas')
  c.width = s
  c.height = s
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(s / 2, s * 0.42, s * 0.08, s / 2, s * 0.5, s * 0.78)
  g.addColorStop(0, '#1f8a54')
  g.addColorStop(0.6, '#136a41')
  g.addColorStop(1, '#0c4a2c')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)

  // Fabric speckle.
  const img = ctx.getImageData(0, 0, s, s)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 12
    d[i] += n
    d[i + 1] += n
    d[i + 2] += n
  }
  ctx.putImageData(img, 0, 0)

  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(240,226,182,0.85)'
  ctx.font = "700 40px Georgia, 'Times New Roman', serif"
  ctx.fillText('BLACKJACK PAYS 3 TO 2', s / 2, s * 0.34)
  ctx.fillStyle = 'rgba(233,217,168,0.55)'
  ctx.font = "600 22px Georgia, serif"
  ctx.fillText('DEALER MUST STAND ON 17', s / 2, s * 0.4)
  ctx.fillText('INSURANCE PAYS 2 TO 1', s / 2, s * 0.44)

  ctx.strokeStyle = 'rgba(240,226,182,0.4)'
  ctx.setLineDash([3, 9])
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.ellipse(s / 2, s * 0.78, s * 0.15, s * 0.075, 0, 0, TAU)
  ctx.stroke()

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

/** A subtle fabric normal map so the spotlight catches the felt's weave. */
export function feltNormal(): THREE.CanvasTexture {
  const s = 256
  const c = document.createElement('canvas')
  c.width = s
  c.height = s
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(s, s)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = Math.random() * 36 - 18
    d[i] = 128 + n
    d[i + 1] = 128 + n
    d[i + 2] = 255
    d[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(10, 10)
  return tex
}

export function woodTexture(): THREE.CanvasTexture {
  const w = 1024
  const h = 128
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
  for (let i = 0; i < 70; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.16})`
    ctx.lineWidth = Math.random() * 2
    const y = Math.random() * h
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.bezierCurveTo(w * 0.3, y + Math.random() * 8 - 4, w * 0.6, y + Math.random() * 8 - 4, w, y + Math.random() * 6 - 3)
    ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.repeat.set(8, 1)
  return tex
}

const CHIP_PAL: Record<ChipValue, { base: string; edge: string; text: string }> = {
  1: { base: '#eef1f5', edge: '#c3cbd6', text: '#2a2f3a' },
  5: { base: '#d6363b', edge: '#f4b8ba', text: '#ffffff' },
  25: { base: '#2f9e57', edge: '#bce7cd', text: '#ffffff' },
  100: { base: '#2b2f38', edge: '#8791a0', text: '#ffffff' },
  500: { base: '#7b3fb2', edge: '#d6bcee', text: '#ffffff' },
}

export function chipTopTexture(value: ChipValue): THREE.CanvasTexture {
  const s = 256
  const c = document.createElement('canvas')
  c.width = s
  c.height = s
  const ctx = c.getContext('2d')!
  const p = CHIP_PAL[value]
  ctx.fillStyle = p.base
  ctx.beginPath()
  ctx.arc(s / 2, s / 2, s / 2, 0, TAU)
  ctx.fill()
  ctx.strokeStyle = p.edge
  ctx.lineWidth = 9
  ctx.setLineDash([14, 20])
  ctx.beginPath()
  ctx.arc(s / 2, s / 2, s * 0.34, 0, TAU)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.fillStyle = p.text
  ctx.textAlign = 'center'
  ctx.font = `800 ${value >= 100 ? 78 : 96}px system-ui, -apple-system, sans-serif`
  ctx.fillText(String(value), s / 2, s / 2 + (value >= 100 ? 28 : 34))
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

/** The chip rim: base color with light edge stripes, wrapped around the cylinder. */
export function chipSideTexture(value: ChipValue): THREE.CanvasTexture {
  const w = 256
  const h = 32
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!
  const p = CHIP_PAL[value]
  ctx.fillStyle = p.base
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = p.edge
  for (let i = 0; i < 6; i++) ctx.fillRect((i * w) / 6, 0, w / 12, h)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function chipBaseColor(value: ChipValue): string {
  return CHIP_PAL[value].base
}
