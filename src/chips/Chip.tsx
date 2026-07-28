export type ChipValue = 1 | 5 | 25 | 100 | 500

export const CHIP_VALUES: ChipValue[] = [1, 5, 25, 100, 500]

const PALETTE: Record<ChipValue, { base: string; edge: string; text: string }> = {
  1: { base: '#eef1f5', edge: '#c3cbd6', text: '#2a2f3a' },
  5: { base: '#d6363b', edge: '#f4b8ba', text: '#ffffff' },
  25: { base: '#2f9e57', edge: '#bce7cd', text: '#ffffff' },
  100: { base: '#2b2f38', edge: '#8791a0', text: '#ffffff' },
  500: { base: '#7b3fb2', edge: '#d6bcee', text: '#ffffff' },
}

/** A classic poker chip drawn as SVG — base fill, six edge stripes, an inner dashed
 *  ring, and the denomination. Purely visual; wrap it in a button to make it a bet. */
export function Chip({ value, size = 58 }: { value: ChipValue; size?: number }) {
  const c = PALETTE[value]
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-label={`$${value} chip`}>
      <circle cx="50" cy="50" r="48" fill={c.edge} />
      {/* Six edge stripes: a thick dashed ring on the rim. */}
      <circle cx="50" cy="50" r="43" fill="none" stroke={c.base} strokeWidth="11" strokeDasharray="25 20" />
      <circle cx="50" cy="50" r="37" fill={c.base} />
      <circle cx="50" cy="50" r="31" fill="none" stroke={c.edge} strokeWidth="2" strokeDasharray="3 5" />
      <text
        x="50"
        y="50"
        dy="0.35em"
        textAnchor="middle"
        fontSize={value >= 100 ? 20 : 24}
        fontWeight={800}
        fill={c.text}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {value}
      </text>
    </svg>
  )
}
