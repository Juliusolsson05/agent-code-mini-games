import type { Rank } from './suits'

// Classic center-pip layouts for the number cards (2–10), in the card's 100×140
// coordinate space. A pip below the vertical centre (y > 70) is drawn upside-down,
// exactly as a real deck does, so the card reads correctly from either end.

export type Pos = { x: number; y: number }

const L = 32
const M = 50
const R = 68
const T = 40
const B = 100
const C = 70
const UM = 58 // upper-mid (9, 10)
const LM = 82 // lower-mid (9, 10)
const T2 = (T + C) / 2 // extra centre pip on 7/8 (upper)
const C2 = (C + B) / 2 // extra centre pip on 8 (lower)
const TU = (T + UM) / 2 // extra centre pip on 10 (upper)
const LB = (LM + B) / 2 // extra centre pip on 10 (lower)

export const PIP_LAYOUT: Partial<Record<Rank, Pos[]>> = {
  '2': [{ x: M, y: T }, { x: M, y: B }],
  '3': [{ x: M, y: T }, { x: M, y: C }, { x: M, y: B }],
  '4': [{ x: L, y: T }, { x: R, y: T }, { x: L, y: B }, { x: R, y: B }],
  '5': [{ x: L, y: T }, { x: R, y: T }, { x: M, y: C }, { x: L, y: B }, { x: R, y: B }],
  '6': [{ x: L, y: T }, { x: R, y: T }, { x: L, y: C }, { x: R, y: C }, { x: L, y: B }, { x: R, y: B }],
  '7': [
    { x: L, y: T }, { x: R, y: T }, { x: M, y: T2 },
    { x: L, y: C }, { x: R, y: C }, { x: L, y: B }, { x: R, y: B },
  ],
  '8': [
    { x: L, y: T }, { x: R, y: T }, { x: M, y: T2 },
    { x: L, y: C }, { x: R, y: C }, { x: M, y: C2 },
    { x: L, y: B }, { x: R, y: B },
  ],
  '9': [
    { x: L, y: T }, { x: R, y: T }, { x: L, y: UM }, { x: R, y: UM },
    { x: M, y: C }, { x: L, y: LM }, { x: R, y: LM }, { x: L, y: B }, { x: R, y: B },
  ],
  '10': [
    { x: L, y: T }, { x: R, y: T }, { x: M, y: TU }, { x: L, y: UM }, { x: R, y: UM },
    { x: L, y: LM }, { x: R, y: LM }, { x: M, y: LB }, { x: L, y: B }, { x: R, y: B },
  ],
}

/** Pips below the vertical centre are rendered upside-down. */
export const PIP_CENTER_Y = C
