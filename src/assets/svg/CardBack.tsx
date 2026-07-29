import type { CSSProperties } from 'react'

import { Pip } from './suits'

// The card back — a deep-red panel with a double border and a centred emblem.
// Deliberately plain-but-rich rather than a busy lattice, so a fan of face-down
// cards reads as a clean stack.
export function CardBack({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 140" className={className} style={style}>
      <rect x="0.5" y="0.5" width="99" height="139" rx="9" fill="#a11228" stroke="rgba(0,0,0,0.2)" />
      <rect x="9" y="9" width="82" height="122" rx="5" fill="#8d0f22" />
      <rect
        x="5.5"
        y="5.5"
        width="89"
        height="129"
        rx="6.5"
        fill="none"
        stroke="#f6dade"
        strokeOpacity="0.55"
        strokeWidth="1.3"
      />
      <rect
        x="12"
        y="12"
        width="76"
        height="116"
        rx="3.5"
        fill="none"
        stroke="#f6dade"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <circle cx="50" cy="70" r="17" fill="#a11228" stroke="#f6dade" strokeOpacity="0.5" strokeWidth="1.2" />
      <Pip suit="S" cx={50} cy={70} size={20} color="#f6dade" />
    </svg>
  )
}
