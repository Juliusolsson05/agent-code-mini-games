import * as THREE from 'three'

// The SVG → WebGL texture pipeline (spec §7.2.1). Every piece of vector art in the 3D
// scene goes through here, so the rules below are enforced in exactly one place.
//
// Why rasterise SVG at all? The sandboxed iframe's CSP forbids fetching binary assets —
// no PNG, no KTX2. Inline SVG and canvas drawing are all we get, and they're enough:
// the same React components render as real DOM in the HUD and as textures on the felt.

/**
 * Prepare a `renderToStaticMarkup` string for rasterisation.
 *
 * THE xmlns IS LOAD-BEARING. React omits `xmlns` on <svg> because in the DOM the
 * namespace is implied. But a `data:image/svg+xml` URI is parsed as a STANDALONE XML
 * document, where the namespace is mandatory — without it the decode fails silently:
 * no error, no `onload`, `needsUpdate` never set, and every card renders as the blank
 * white canvas base. That was the "blank white cards" bug (§2.1), and it cost several
 * rounds because it looks exactly like a lighting problem.
 *
 * Explicit width/height matter too: a `viewBox` alone rasterises at an
 * implementation-defined size, which is how you get a crisp card on one machine and a
 * blurry one on another.
 */
function prepareSvg(svg: string, w: number, h: number): string {
  // Rewrite the ROOT tag's attributes rather than string-splicing.
  //
  // A naive `replace('<svg ', '<svg xmlns=... width=... ')` produces DUPLICATE width /
  // height attributes on any component that already declares them — and duplicate
  // attributes are an XML parse error, so the image silently fails to decode exactly
  // like a missing xmlns does. That was the second incarnation of this bug: card faces
  // (no width/height in the component) rendered fine while chip faces and the felt
  // legend (both self-sizing) came out as bare base paint. Strip, then inject.
  return svg.replace(/^<svg\b([^>]*)>/, (_match, attrs: string) => {
    const cleaned = attrs
      .replace(/\s(?:width|height)\s*=\s*"[^"]*"/g, '')
      .replace(/\sxmlns\s*=\s*"[^"]*"/g, '')
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"${cleaned}>`
  })
}

/**
 * Rasterise an SVG string into a CanvasTexture.
 *
 * Returns SYNCHRONOUSLY with a texture whose canvas is pre-filled with `basePaint` (card
 * stock white, chip base colour, …) and repaints when the image decodes. Callers get a
 * usable mesh immediately; a card that hasn't decoded yet is a blank card of the right
 * colour, never a black or magenta one. Decoding takes a frame or two and cards animate
 * in anyway, so the swap is invisible in practice.
 */
export type SvgTextureOptions = {
  /** Painted immediately, before the SVG decodes. */
  basePaint?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
  /**
   * Keep `basePaint`'s output and draw the SVG OVER it instead of replacing it.
   * The felt needs this: procedural cloth grain underneath, crisp vector type on top
   * (§7.3.1). Default false — a card face fully replaces its white placeholder.
   */
  preserveBase?: boolean
}

export function svgToTexture(
  svg: string,
  width: number,
  height: number,
  options: SvgTextureOptions = {},
): THREE.CanvasTexture {
  const { basePaint, preserveBase = false } = options
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  if (basePaint) basePaint(ctx, width, height)

  const tex = new THREE.CanvasTexture(canvas)
  // The art is authored in sRGB; without this three.js treats it as linear and every
  // colour comes out washed out.
  tex.colorSpace = THREE.SRGBColorSpace
  // Cards are viewed at a steep angle from a bird's-eye camera — anisotropy is the
  // difference between legible rank glyphs and smeared mush.
  tex.anisotropy = 16
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter

  const img = new Image()
  // `decode()` gives us a real promise and surfaces failures, unlike the onload/onerror
  // pair — which is precisely how the missing-xmlns failure stayed silent for so long.
  img.onload = () => {
    if (!preserveBase) ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)
    tex.needsUpdate = true
  }
  img.onerror = () => {
    // Leave the base paint in place, but make the failure visible to a developer.
    console.error('[blackjack] SVG texture failed to decode — check the xmlns injection')
  }
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(prepareSvg(svg, width, height))}`

  return tex
}

/** Exported for the test that guards §2.1 from ever regressing. */
export const __testing = { prepareSvg }
