import type { CSSProperties } from 'react'

import { CardBack } from './Back'
import { PIP_CENTER_Y, PIP_LAYOUT } from './pips'
import { Pip, suitColor, type Rank, type Suit } from './suits'

const SERIF = "Georgia, 'Times New Roman', 'Playfair Display', serif"

/** Rank + suit stacked in a corner. Placed top-left; the card rotates a copy 180°
 *  into the bottom-right. */
function CornerIndex({ rank, suit, color }: { rank: Rank; suit: Suit; color: string }) {
  const isTen = rank === '10'
  return (
    <g fill={color}>
      <text
        x={isTen ? 11 : 10}
        y="20"
        fontSize={isTen ? 13 : 16}
        fontWeight={800}
        fontFamily={SERIF}
        textAnchor="middle"
      >
        {rank}
      </text>
      <Pip suit={suit} cx={10} cy={32} size={12} color={color} />
    </g>
  )
}

/** J / Q / K — a clean typographic court: a framed, lightly-tinted panel with a big
 *  serif letter and the suit above and below it. Cohesive, modern, and self-contained
 *  (no embedded court-card art). */
function CourtCenter({ rank, suit, color }: { rank: Rank; suit: Suit; color: string }) {
  return (
    <g>
      <rect x="16" y="24" width="68" height="92" rx="6" fill={color} fillOpacity="0.045" />
      <rect
        x="16"
        y="24"
        width="68"
        height="92"
        rx="6"
        fill="none"
        stroke={color}
        strokeOpacity="0.3"
        strokeWidth="1.3"
      />
      <Pip suit={suit} cx={50} cy={41} size={20} color={color} />
      <text
        x="50"
        y="86"
        fontSize="42"
        fontWeight={800}
        fontFamily={SERIF}
        textAnchor="middle"
        fill={color}
      >
        {rank}
      </text>
      <Pip suit={suit} cx={50} cy={104} size={17} flip color={color} />
    </g>
  )
}

export type CardProps = {
  rank: Rank
  suit: Suit
  faceDown?: boolean
  className?: string
  style?: CSSProperties
}

/** A single playing card, drawn entirely as SVG. */
export function Card({ rank, suit, faceDown, className, style }: CardProps) {
  if (faceDown) return <CardBack className={className} style={style} />

  const color = suitColor(suit)
  const isCourt = rank === 'J' || rank === 'Q' || rank === 'K'
  const layout = PIP_LAYOUT[rank]

  return (
    <svg viewBox="0 0 100 140" className={className} style={style}>
      <rect x="0.5" y="0.5" width="99" height="139" rx="9" fill="#fdfdfb" stroke="rgba(20,20,30,0.14)" />

      <CornerIndex rank={rank} suit={suit} color={color} />
      <g transform="rotate(180 50 70)">
        <CornerIndex rank={rank} suit={suit} color={color} />
      </g>

      {rank === 'A' ? (
        <Pip suit={suit} cx={50} cy={70} size={46} color={color} />
      ) : isCourt ? (
        <CourtCenter rank={rank} suit={suit} color={color} />
      ) : (
        layout?.map((p, i) => (
          <Pip key={i} suit={suit} cx={p.x} cy={p.y} size={20} flip={p.y > PIP_CENTER_Y} color={color} />
        ))
      )}
    </svg>
  )
}
