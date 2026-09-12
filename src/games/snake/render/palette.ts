// The garden is a quiet, warm green so a blue body and a red apple remain legible at
// every score. These are artwork colours: inheriting an editor theme here would make
// both collision boundaries and food contrast change underneath the player.
export const BOARD_LIGHT = '#b5d991'
export const BOARD_DARK = '#aed28a'
export const FRAME = '#6b9450'
export const HEADER = '#244f3b'
export const SNAKE_HEAD = '#5688f4'
export const SNAKE_TAIL = '#345ebc'
export const SNAKE_INK = '#193657'
export const EYE_WHITE = '#fffef6'
export const APPLE_LIGHT = '#ff8463'
export const APPLE_DARK = '#de4949'
export const APPLE_LEAF = '#377a4b'
export const APPLE_STEM = '#6c5039'

export function mixHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16)
  const pb = parseInt(b.slice(1), 16)
  const fraction = Math.max(0, Math.min(1, t))
  const channel = (shift: number) => Math.round(((pa >> shift) & 255) +
    (((pb >> shift) & 255) - ((pa >> shift) & 255)) * fraction)
  return `rgb(${channel(16)},${channel(8)},${channel(0)})`
}
