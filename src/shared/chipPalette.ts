// Chip colours — THE single source of truth (spec §7.2.4).
//
// This used to exist twice: once in the HUD's SVG chip component and once in the 3D
// texture generator. Two copies of the same five colours, free to drift, and nothing to
// catch it. Both consumers now import from here, so a chip is the same colour in the bet
// rail and on the felt by construction rather than by coincidence.

export type ChipValue = 1 | 5 | 25 | 100 | 500

/** Denominations low → high. Iteration order matters for the bet rail (§11). */
export const CHIP_VALUES: ChipValue[] = [1, 5, 25, 100, 500]

/** Largest-first — used when breaking a bet into the fewest physical chips. */
export const CHIP_DENOMS: ChipValue[] = [500, 100, 25, 5, 1]

export type ChipColors = { base: string; edge: string; text: string }

export const CHIP_PALETTE: Record<ChipValue, ChipColors> = {
  1: { base: '#eef1f5', edge: '#c3cbd6', text: '#2a2f3a' },
  5: { base: '#d6363b', edge: '#f4b8ba', text: '#ffffff' },
  25: { base: '#2f9e57', edge: '#bce7cd', text: '#ffffff' },
  100: { base: '#2b2f38', edge: '#8791a0', text: '#ffffff' },
  500: { base: '#7b3fb2', edge: '#d6bcee', text: '#ffffff' },
}

/**
 * Break an amount into physical chips, largest denomination first.
 * `maxChips` caps the stack so a huge bet doesn't build a skyscraper of $1 chips.
 */
export function chipBreakdown(amount: number, maxChips = 14): ChipValue[] {
  const out: ChipValue[] = []
  let rem = amount
  for (const denom of CHIP_DENOMS) {
    while (rem >= denom && out.length < maxChips) {
      out.push(denom)
      rem -= denom
    }
  }
  return out
}
