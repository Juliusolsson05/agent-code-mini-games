import { renderToStaticMarkup } from 'react-dom/server'
import * as THREE from 'three'

import { ChipFace } from '../../../../assets/svg/ChipFace'
import { CHIP_PALETTE, type ChipValue } from '../../../../shared/chipPalette'
import { svgToTexture } from './svgTexture'

// Chip textures, cached per denomination (spec §7.2.4). Five denominations → ten
// textures total (face + edge), shared across every chip on the table.

const FACE_SIZE = 256

const faceCache = new Map<ChipValue, THREE.Texture>()
const edgeCache = new Map<ChipValue, THREE.Texture>()

/** The chip face — the same SVG the bet rail renders as DOM. */
export function chipFaceTexture(value: ChipValue): THREE.Texture {
  let t = faceCache.get(value)
  if (!t) {
    const base = CHIP_PALETTE[value].base
    t = svgToTexture(renderToStaticMarkup(ChipFace({ value, size: FACE_SIZE })), FACE_SIZE, FACE_SIZE, {
      basePaint: (ctx, w, h) => {
        ctx.fillStyle = base
        ctx.fillRect(0, 0, w, h)
      },
    })
    faceCache.set(value, t)
  }
  return t
}

/**
 * The chip rim, wrapped around the cylinder's side. Drawn on canvas rather than as SVG:
 * it's six stripes on a strip, and the wrap makes it a texture-space problem, not an art
 * problem. Deliberately wide and short so the stripes stay crisp when wrapped.
 */
export function chipEdgeTexture(value: ChipValue): THREE.Texture {
  let t = edgeCache.get(value)
  if (!t) {
    const p = CHIP_PALETTE[value]
    const w = 512
    const h = 64
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    const ctx = c.getContext('2d')!
    ctx.fillStyle = p.base
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = p.edge
    // Six stripes, matching the six on the face so the chip is self-consistent.
    for (let i = 0; i < 6; i++) ctx.fillRect((i * w) / 6, 0, w / 14, h)
    // Slight top/bottom darkening so the rim reads as curved rather than flat.
    const shade = ctx.createLinearGradient(0, 0, 0, h)
    shade.addColorStop(0, 'rgba(0,0,0,0.35)')
    shade.addColorStop(0.5, 'rgba(0,0,0,0)')
    shade.addColorStop(1, 'rgba(0,0,0,0.35)')
    ctx.fillStyle = shade
    ctx.fillRect(0, 0, w, h)

    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    t = tex
    edgeCache.set(value, t)
  }
  return t
}

export function disposeChipTextures(): void {
  for (const t of faceCache.values()) t.dispose()
  for (const t of edgeCache.values()) t.dispose()
  faceCache.clear()
  edgeCache.clear()
}
