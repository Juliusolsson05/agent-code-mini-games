// Piece geometry and rotation data for Blockfall.
//
// This follows the Super Rotation System (SRS) that modern guideline games use, so
// every placement, spin and wall kick a practised player expects works exactly the
// same way. Two conventions matter when reading this file:
//
// - Coordinates are (x, y) with y growing DOWNWARD, matching the field array and the
//   canvas. The published SRS kick tables use y-up, so every table below is written
//   in the familiar published form and converted once at module load.
// - Each piece rotates inside a fixed square bounding box (4 for I, 2 for O, 3 for the
//   rest). A true quarter-turn of that box yields the four SRS states. That is why O
//   never appears to move when rotated and why the I piece shifts column between states.

export type PieceId = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'
export const PIECE_IDS: readonly PieceId[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

/** 0 = spawn, 1 = R (clockwise), 2 = 180, 3 = L (counter-clockwise). */
export type Rotation = 0 | 1 | 2 | 3
export type Offset = readonly [x: number, y: number]

const BOX: Record<PieceId, number> = { I: 4, O: 2, T: 3, S: 3, Z: 3, J: 3, L: 3 }

// Spawn orientation cells inside each piece's box (y down).
const SPAWN_CELLS: Record<PieceId, readonly Offset[]> = {
  I: [[0, 1], [1, 1], [2, 1], [3, 1]],
  O: [[0, 0], [1, 0], [0, 1], [1, 1]],
  T: [[1, 0], [0, 1], [1, 1], [2, 1]],
  S: [[1, 0], [2, 0], [0, 1], [1, 1]],
  Z: [[0, 0], [1, 0], [1, 1], [2, 1]],
  J: [[0, 0], [0, 1], [1, 1], [2, 1]],
  L: [[2, 0], [0, 1], [1, 1], [2, 1]],
}

// A clockwise quarter turn of a size×size box with y pointing down.
const turnClockwise = (cells: readonly Offset[], size: number): Offset[] =>
  cells.map(([x, y]) => [size - 1 - y, x] as const)

const ROTATIONS = {} as Record<PieceId, readonly (readonly Offset[])[]>
for (const id of PIECE_IDS) {
  const states: Offset[][] = [[...SPAWN_CELLS[id]]]
  for (let i = 1; i < 4; i++) states.push(turnClockwise(states[i - 1]!, BOX[id]))
  ROTATIONS[id] = states
}

export function pieceCells(id: PieceId, rotation: Rotation): readonly Offset[] {
  return ROTATIONS[id][rotation]!
}

export function boxSize(id: PieceId): number {
  return BOX[id]
}

/**
 * Where a piece's box is placed when it spawns: horizontally centred (left-leaning for
 * the 3-wide pieces), with its cells in the two hidden rows above the visible field.
 * Every spawn box starts at the top row. The I piece's cells sit in the second row of
 * its box, which puts it in the lower spawn row, as the guideline specifies. The
 * engine then lets the piece fall one row at once, so a new piece is visible
 * immediately.
 */
export function spawnPosition(id: PieceId): { x: number; y: number } {
  return { x: id === 'O' ? 4 : 3, y: 0 }
}

// Published SRS kick tests, in (x, y-up) form, keyed "from>to".
type KickTable = Record<string, readonly Offset[]>
const JLSTZ_KICKS_Y_UP: KickTable = {
  '0>1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  '1>0': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  '1>2': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  '2>1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  '2>3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  '3>2': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  '3>0': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  '0>3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
}
const I_KICKS_Y_UP: KickTable = {
  '0>1': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  '1>0': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  '1>2': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
  '2>1': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  '2>3': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  '3>2': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  '3>0': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  '0>3': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
}

// Convert once to the field's y-down convention.
const toYDown = (table: KickTable): KickTable =>
  Object.fromEntries(Object.entries(table).map(([key, tests]) => [key, tests.map(([x, y]) => [x, -y] as const)]))
const JLSTZ_KICKS = toYDown(JLSTZ_KICKS_Y_UP)
const I_KICKS = toYDown(I_KICKS_Y_UP)
const O_KICKS: readonly Offset[] = [[0, 0]]

/**
 * The ordered offsets to try when rotating from one state to an adjacent one. The
 * first offset that fits wins; its index is reported so the engine can apply the
 * guideline rule that a T-spin using the fifth test (index 4) is never a mini.
 */
export function kickTests(id: PieceId, from: Rotation, to: Rotation): readonly Offset[] {
  if (id === 'O') return O_KICKS
  const table = id === 'I' ? I_KICKS : JLSTZ_KICKS
  return table[`${from}>${to}`] ?? O_KICKS
}
