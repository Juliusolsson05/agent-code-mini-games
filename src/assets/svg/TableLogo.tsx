// The house legend and betting circle painted onto the felt (spec §7.2.5).
//
// Authored as SVG rather than ctx.fillText so the type is properly kerned and scales
// crisply at 2048px. Every position is passed in by the caller, computed through the
// felt's UV↔world mapping (§7.3.1) — nothing here is eyeballed, because a hand-tuned
// offset silently breaks the moment the felt's dimensions change.

const GOLD = '#f0e2b6'

export type TableLogoProps = {
  /** Canvas size in px. Must match the felt texture's aspect (FELT_W : FELT_D). */
  w: number
  h: number
  /** Baseline of the headline, in px, derived from a world Z. */
  legendY: number
  /** The betting circle, in px, derived from BET_Z. */
  circle: { cx: number; cy: number; rx: number; ry: number }
}

export function TableLogo({ w, h, legendY, circle }: TableLogoProps) {
  // Type scales with the texture so the legend is a constant physical size on the felt.
  const headline = Math.round(w * 0.042)
  const sub = Math.round(w * 0.021)

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <g textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif">
        <text x={w / 2} y={legendY} fontSize={headline} fontWeight={700} fill={GOLD} fillOpacity="0.86">
          BLACKJACK PAYS 3 TO 2
        </text>
        <text x={w / 2} y={legendY + sub * 1.9} fontSize={sub} fontWeight={600} fill={GOLD} fillOpacity="0.55">
          DEALER MUST STAND ON 17
        </text>
        <text x={w / 2} y={legendY + sub * 3.5} fontSize={sub} fontWeight={600} fill={GOLD} fillOpacity="0.55">
          INSURANCE PAYS 2 TO 1
        </text>
      </g>

      {/* The betting circle — must land exactly under the chip stack at BET_Z. */}
      <ellipse
        cx={circle.cx}
        cy={circle.cy}
        rx={circle.rx}
        ry={circle.ry}
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.42"
        strokeWidth={Math.max(2, w * 0.0022)}
        strokeDasharray={`${w * 0.004} ${w * 0.011}`}
      />
    </svg>
  )
}
