import { CHIP_PALETTE, type ChipValue } from '../../shared/chipPalette'

// A casino chip drawn as SVG (spec §7.2.4). Authored once, used twice: as real DOM in
// the bet rail, and rasterised onto the 3D chip's faces. Colours come from the shared
// palette — this component used to carry its own copy, which meant the HUD chip and the
// felt chip were free to drift apart.

export { CHIP_VALUES, type ChipValue } from '../../shared/chipPalette'

/** The chip's face: base fill, six edge stripes, an inner dashed ring, the denomination. */
export function ChipFace({ value, size = 58 }: { value: ChipValue; size?: number }) {
  const c = CHIP_PALETTE[value]
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
