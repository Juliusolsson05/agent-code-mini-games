import type { ReactNode } from 'react'

import { CardFace } from '../assets/svg/CardFace'
import type { Screen } from '../router'

function BlackjackArt() {
  return (
    <div className="mg-tile-art bj">
      <span className="mg-tile-card c1">
        <CardFace rank="A" suit="S" />
      </span>
      <span className="mg-tile-card c2">
        <CardFace rank="K" suit="H" />
      </span>
    </div>
  )
}

function SnakeArt() {
  // A little snake curling toward an apple, drawn in the Neon skin's palette.
  return (
    <div className="mg-tile-art snake">
      <svg viewBox="0 0 140 96" width="140" height="96" aria-hidden="true">
        <g fill="#38f0ff">
          <rect x="22" y="58" width="18" height="18" rx="5" />
          <rect x="40" y="58" width="18" height="18" rx="5" />
          <rect x="58" y="58" width="18" height="18" rx="5" />
          <rect x="58" y="40" width="18" height="18" rx="5" />
          <rect x="58" y="22" width="18" height="18" rx="5" opacity="0.95" />
          <rect x="76" y="22" width="18" height="18" rx="5" opacity="0.95" />
          <circle cx="87" cy="27" r="1.8" fill="#0a0b12" />
          <circle cx="87" cy="35" r="1.8" fill="#0a0b12" />
        </g>
        <circle cx="112" cy="66" r="7" fill="#ff2d78" />
      </svg>
    </div>
  )
}

function Tile({
  onClick,
  art,
  name,
  desc,
}: {
  onClick: () => void
  art: ReactNode
  name: string
  desc: string
}) {
  return (
    <button className="mg-tile" onClick={onClick}>
      {art}
      <div className="mg-tile-body">
        <div className="mg-tile-name">{name}</div>
        <div className="mg-tile-desc">{desc}</div>
      </div>
    </button>
  )
}

/** The home screen — a grid of game tiles. */
export function Launcher({ onPlay }: { onPlay: (screen: Screen) => void }) {
  return (
    <div className="mg-launcher">
      <header className="mg-launcher-head">
        <div className="mg-launcher-title">Mini Games</div>
        <div className="mg-launcher-sub">A little arcade inside Agent Code</div>
      </header>

      <div className="mg-grid">
        <Tile onClick={() => onPlay('blackjack')} art={<BlackjackArt />} name="Blackjack" desc="Beat the dealer to 21" />
        <Tile onClick={() => onPlay('snake')} art={<SnakeArt />} name="Snake" desc="Eat, grow, don't crash" />
      </div>
    </div>
  )
}
