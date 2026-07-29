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
 * How to render a BANKROLL as a physical rack of chips.
 *
 * Deliberately NOT `chipBreakdown`. Largest-first is right for a bet (a $500 wager is one
 * purple chip) but wrong for a rack: a $500 bankroll would be a single lonely chip, and
 * winning $25 wouldn't change it at all. A rack has to move on every win and loss, which
 * means a MANY-chip representation in ONE denomination.
 *
 * So: pick the smallest denomination that keeps the pile under `maxChips`. $500 becomes
 * 20 green $25s; $2000 becomes 20 black $100s. The rack always reads as a real rack, and
 * every swing visibly changes its height.
 */
export function rackBreakdown(bankroll: number): Array<{ denom: ChipValue; count: number }> {
  if (bankroll <= 0) return []

  // Pick the PRIMARY denomination: the largest one you'd hold a real stack of. Requiring
  // at least 4 keeps it from being two lonely purple chips; taking the largest that
  // qualifies keeps it from being forty green ones. At $1000 that lands on $100.
  const MIN_PRIMARY = 4
  let pi = CHIP_DENOMS.findIndex(d => Math.floor(bankroll / d) >= MIN_PRIMARY)
  if (pi === -1) pi = CHIP_DENOMS.findIndex(d => d <= bankroll)
  if (pi === -1) return []

  const out = new Map<ChipValue, number>()
  let rem = bankroll

  // Reserve CHANGE in the two denominations below the primary, before the primary eats
  // everything. A real tray always holds small chips for the next bet, and this is the
  // whole reason the rack looks handled rather than machine-generated. Budget is a
  // fraction of the roll, so change scales with how rich you are.
  const CHANGE_CAP = 4
  const CHANGE_BUDGET = 0.06
  for (let i = pi + 1; i < CHIP_DENOMS.length && i <= pi + 2; i++) {
    const d = CHIP_DENOMS[i]
    const n = Math.min(CHANGE_CAP, Math.floor((bankroll * CHANGE_BUDGET) / d))
    if (n > 0) {
      out.set(d, n)
      rem -= n * d
    }
  }

  // The primary takes the bulk of what's left.
  const primary = CHIP_DENOMS[pi]
  const nPrimary = Math.floor(rem / primary)
  if (nPrimary > 0) {
    out.set(primary, nPrimary)
    rem -= nPrimary * primary
  }

  // Dust settles downward so the rack sums to the bankroll EXACTLY. Without this the
  // rack would be an approximation, and a player who can count chips would notice.
  for (let i = pi + 1; i < CHIP_DENOMS.length; i++) {
    const d = CHIP_DENOMS[i]
    const n = Math.floor(rem / d)
    if (n > 0) {
      out.set(d, (out.get(d) ?? 0) + n)
      rem -= n * d
    }
  }

  // Descending, so the tray reads high-to-low left-to-right like a real chip well.
  // $1000 → 9×$100, 3×$25, 5×$5 (17 chips). $500 → 4×$100, 3×$25, 5×$5 (12 chips).
  return CHIP_DENOMS.filter(d => out.has(d)).map(d => ({ denom: d, count: out.get(d)! }))
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
