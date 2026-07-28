import { renderToStaticMarkup } from 'react-dom/server'
import * as THREE from 'three'

import { CardBack } from '../../../cards/Back'
import { Card } from '../../../cards/Card'
import type { Rank, Suit } from '../../../cards/suits'

// Reuse the vector card art (cards/*) as WebGL textures: render the React SVG to a
// string, load it as an image via a data URI (the child CSP allows data: images),
// and draw it into a canvas → CanvasTexture. Cached per face. The texture returns
// immediately (blank) and fills in when the image decodes; the mesh shows it a frame
// or two later, which is fine for a card that is animating in anyway.

const TEX_W = 512
const TEX_H = Math.round(TEX_W * 1.4)
const cache = new Map<string, THREE.Texture>()

function svgToTexture(svg: string): THREE.Texture {
  const sized = svg.replace('<svg ', `<svg width="${TEX_W}" height="${TEX_H}" `)
  const canvas = document.createElement('canvas')
  canvas.width = TEX_W
  canvas.height = TEX_H
  const ctx = canvas.getContext('2d')!
  // A rounded white base so the card corners read even before the SVG paints.
  ctx.fillStyle = '#fdfdfb'
  ctx.fillRect(0, 0, TEX_W, TEX_H)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8

  const img = new Image()
  img.onload = () => {
    ctx.clearRect(0, 0, TEX_W, TEX_H)
    ctx.drawImage(img, 0, 0, TEX_W, TEX_H)
    tex.needsUpdate = true
  }
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sized)}`
  return tex
}

export function cardFaceTexture(rank: Rank, suit: Suit): THREE.Texture {
  const key = `${rank}${suit}`
  let t = cache.get(key)
  if (!t) {
    t = svgToTexture(renderToStaticMarkup(<Card rank={rank} suit={suit} />))
    cache.set(key, t)
  }
  return t
}

export function cardBackTexture(): THREE.Texture {
  let t = cache.get('__back')
  if (!t) {
    t = svgToTexture(renderToStaticMarkup(<CardBack />))
    cache.set('__back', t)
  }
  return t
}

export function disposeCardTextures(): void {
  for (const t of cache.values()) t.dispose()
  cache.clear()
}
