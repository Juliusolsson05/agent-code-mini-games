import { renderToStaticMarkup } from 'react-dom/server'
import * as THREE from 'three'

import { CardBack } from '../../../../assets/svg/CardBack'
import { CardFace } from '../../../../assets/svg/CardFace'
import type { Rank, Suit } from '../../../../assets/svg/suits'
import { svgToTexture } from './svgTexture'

// Card face/back textures, cached (spec §7.2.1).
//
// A 6-deck shoe is 312 cards but only 53 DISTINCT textures (52 faces + 1 back), so the
// cache is what keeps this affordable — without it a reshuffle would rasterise 312 SVGs.

// 512×717 keeps the 1:1.4 ratio. Cards are the hero asset and are read at a steep
// bird's-eye angle, so this plus anisotropy 16 is the difference between a legible rank
// and a smear.
const TEX_W = 512
const TEX_H = Math.round(TEX_W * 1.4)

const cache = new Map<string, THREE.Texture>()

/** Card-stock white, so a not-yet-decoded card is a blank card — never black or magenta. */
function paintStock(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  ctx.fillStyle = '#fdfdfb'
  ctx.fillRect(0, 0, w, h)
}

export function cardFaceTexture(rank: Rank, suit: Suit): THREE.Texture {
  const key = `${rank}${suit}`
  let t = cache.get(key)
  if (!t) {
    t = svgToTexture(renderToStaticMarkup(CardFace({ rank, suit })), TEX_W, TEX_H, {
      basePaint: paintStock,
    })
    cache.set(key, t)
  }
  return t
}

export function cardBackTexture(): THREE.Texture {
  let t = cache.get('__back')
  if (!t) {
    t = svgToTexture(renderToStaticMarkup(CardBack({})), TEX_W, TEX_H, { basePaint: paintStock })
    cache.set('__back', t)
  }
  return t
}

export function disposeCardTextures(): void {
  for (const t of cache.values()) t.dispose()
  cache.clear()
}
