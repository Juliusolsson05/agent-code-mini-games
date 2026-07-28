// The four suits as SVG glyph paths, plus a <Pip> that places one at any point,
// size and rotation. Everything is drawn in a 0..100 box and transformed, so a suit
// is crisp from a 12px corner pip to a 46px ace center.

export type Suit = 'H' | 'D' | 'C' | 'S'
export type Rank =
  | 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

export const RED = '#c62a3f'
export const INK = '#20232b'

export function suitColor(suit: Suit): string {
  return suit === 'H' || suit === 'D' ? RED : INK
}

const PATHS: Record<Suit, string> = {
  H: 'M50 87 C50 87 11 59 11 33 C11 19 21 11 32 11 C41 11 47 16 50 24 C53 16 59 11 68 11 C79 11 89 19 89 33 C89 59 50 87 50 87 Z',
  D: 'M50 7 L87 50 L50 93 L13 50 Z',
  S: 'M50 8 C50 8 13 41 13 61 C13 73 21 79 30 79 C35 79 39 77 42 73 C41 83 37 89 29 93 L71 93 C63 89 59 83 58 73 C61 77 65 79 70 79 C79 79 87 73 87 61 C87 41 50 8 50 8 Z',
  C: 'M50 8 C41 8 34 15 34 24 C34 29 36 33 40 36 C33 32 23 33 17 39 C10 46 10 57 17 64 C23 70 33 71 40 67 C37 75 32 81 25 85 L75 85 C68 81 63 75 60 67 C67 71 77 70 83 64 C90 57 90 46 83 39 C77 33 67 32 60 36 C64 33 66 29 66 24 C66 15 59 8 50 8 Z',
}

export function Pip({
  suit,
  cx,
  cy,
  size,
  flip = false,
  color,
}: {
  suit: Suit
  cx: number
  cy: number
  size: number
  flip?: boolean
  color?: string
}) {
  const s = size / 100
  return (
    <g
      transform={`translate(${cx} ${cy}) rotate(${flip ? 180 : 0}) scale(${s}) translate(-50 -50)`}
      fill={color ?? suitColor(suit)}
    >
      <path d={PATHS[suit]} />
    </g>
  )
}
