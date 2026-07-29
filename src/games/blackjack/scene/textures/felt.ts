import { renderToStaticMarkup } from 'react-dom/server'
import * as THREE from 'three'

import { TableLogo } from '../../../../assets/svg/TableLogo'
import { BET_Z, FELT_D, FELT_W } from '../world'
import { svgToTexture } from './svgTexture'

// The felt (spec §7.3.1) — procedural cloth with the vector legend composited on top.

// NON-SQUARE, matching FELT_W : FELT_D. The old texture was a square canvas stretched
// across a 1.62:1 plane, which is why the house type looked horizontally smeared in
// every screenshot. Texture aspect must track geometry aspect or nothing painted on it
// is the shape you drew.
const TEX_W = 2048
const TEX_H = Math.round(TEX_W * (FELT_D / FELT_W))

/**
 * UV ↔ world mapping (§7.3.1, NORMATIVE).
 *
 * The felt is a PlaneGeometry rotated −π/2 about X, and CanvasTexture has flipY = true.
 * Working through both flips, a point at world (x, 0, z) lands at:
 *
 *   canvasX = (x / FELT_W + 0.5) · W
 *   canvasY = (z / FELT_D + 0.5) · H
 *
 * Sanity: z = 0 → mid-canvas; z = +FELT_D/2 (the player's edge) → bottom of the canvas,
 * which is the bottom of the screen. Correct.
 *
 * EVERY painted element must be positioned through these — never by eye.
 */
export function feltCanvasX(worldX: number): number {
  return (worldX / FELT_W + 0.5) * TEX_W
}
export function feltCanvasY(worldZ: number): number {
  return (worldZ / FELT_D + 0.5) * TEX_H
}

/** Procedural cloth: graded green, edge falloff, fabric grain. */
function paintCloth(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  const g = ctx.createRadialGradient(w / 2, h * 0.42, w * 0.05, w / 2, h * 0.5, w * 0.72)
  g.addColorStop(0, '#1f8a54')
  g.addColorStop(0.6, '#136a41')
  g.addColorStop(1, '#0c4a2c')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // Darken toward the border. Without this the felt reads as a flat swatch under an even
  // key light — the falloff is most of what makes cloth look like cloth.
  const edge = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.22, w / 2, h / 2, w * 0.62)
  edge.addColorStop(0, 'rgba(0,0,0,0)')
  edge.addColorStop(1, 'rgba(0,0,0,0.45)')
  ctx.fillStyle = edge
  ctx.fillRect(0, 0, w, h)

  // Fabric grain. One pass over ~2.6M pixels at startup (~30ms) buys a surface that
  // doesn't look like a solid fill under the key.
  const img = ctx.getImageData(0, 0, w, h)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 13
    d[i] += n
    d[i + 1] += n
    d[i + 2] += n
  }
  ctx.putImageData(img, 0, 0)
}

export function feltTexture(): THREE.CanvasTexture {
  // Legend sits just dealer-side of centre; the circle sits exactly on the bet position.
  const legendY = feltCanvasY(-0.9)
  const circle = {
    cx: feltCanvasX(0),
    cy: feltCanvasY(BET_Z),
    rx: (1.65 / FELT_W) * TEX_W,
    ry: (0.95 / FELT_D) * TEX_H,
  }

  const svg = renderToStaticMarkup(TableLogo({ w: TEX_W, h: TEX_H, legendY, circle }))
  // preserveBase: the cloth is painted first and the vector type composites over it.
  return svgToTexture(svg, TEX_W, TEX_H, { basePaint: paintCloth, preserveBase: true })
}

/** Fine cloth weave so the grazing key catches a texture rather than a flat plane. */
export function feltNormalMap(): THREE.CanvasTexture {
  const s = 256
  const c = document.createElement('canvas')
  c.width = s
  c.height = s
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(s, s)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = Math.random() * 34 - 17
    d[i] = 128 + n
    d[i + 1] = 128 + n
    d[i + 2] = 255
    d[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  // Tight repeat — at a larger scale this reads as sandpaper rather than baize.
  tex.repeat.set(12, 12)
  return tex
}
