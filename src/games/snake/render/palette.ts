// Google Snake's exact palette, replicated.
//
// These are not "a green that looks about right" — the whole ask was a 1:1 replica, and
// the checkerboard in particular only reads correctly if the two greens are barely
// distinguishable (ΔL ≈ 2). Pick a wider contrast and it stops looking like mown grass
// and starts looking like a chessboard.

export const BOARD_LIGHT = '#aad751'
export const BOARD_DARK = '#a2d149'
/** The apron of grass around the play area. */
export const FRAME = '#578a34'
/** The header bar above the board. */
export const HEADER = '#4a752c'

/**
 * The snake is drawn with a head→tail gradient, which is most of what makes Google's
 * snake read as a creature rather than a chain of squares.
 */
export const SNAKE_HEAD = '#4f66dd'
export const SNAKE_TAIL = '#2f45b5'
/** Pupils and the nostril dot. */
export const SNAKE_INK = '#1b2a6b'
export const EYE_WHITE = '#ffffff'

export const APPLE_LIGHT = '#f2634a'
export const APPLE_DARK = '#d4301c'
export const APPLE_LEAF = '#6cbb3c'
export const APPLE_STEM = '#7a4a1e'

/** Linear-interpolate two hex colours. Used for the body gradient. */
export function mixHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16)
  const pb = parseInt(b.slice(1), 16)
  const r = Math.round((pa >> 16) + ((pb >> 16) - (pa >> 16)) * t)
  const g = Math.round(((pa >> 8) & 255) + (((pb >> 8) & 255) - ((pa >> 8) & 255)) * t)
  const bl = Math.round((pa & 255) + ((pb & 255) - (pa & 255)) * t)
  return `rgb(${r},${g},${bl})`
}
