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

function MinesweeperArt() {
  // A fragment of the field: two opened cells with numbers, a flag, and a raised tile —
  // the Win95 bevel language in miniature.
  return (
    <div className="mg-tile-art ms">
      <svg viewBox="0 0 140 96" width="140" height="96" aria-hidden="true">
        <g shapeRendering="crispEdges">
          {[0, 1, 2, 3].map(i => {
            const x = 22 + (i % 2) * 34
            const y = 20 + Math.floor(i / 2) * 34
            const open = i === 1 || i === 2
            return (
              <g key={i}>
                <rect x={x} y={y} width="32" height="32" fill="#c0c0c0" />
                {open ? (
                  <>
                    <rect x={x} y={y} width="32" height="1.5" fill="#808080" />
                    <rect x={x} y={y} width="1.5" height="32" fill="#808080" />
                  </>
                ) : (
                  <>
                    <rect x={x} y={y} width="32" height="3" fill="#ffffff" />
                    <rect x={x} y={y} width="3" height="32" fill="#ffffff" />
                    <rect x={x} y={y + 29} width="32" height="3" fill="#808080" />
                    <rect x={x + 29} y={y} width="3" height="32" fill="#808080" />
                  </>
                )}
              </g>
            )
          })}
        </g>
        {/* Glyphs are centred on each 32px cell via text-anchor, not eyeballed offsets —
            at this size a few px off reads as broken rather than merely imprecise. */}
        <g textAnchor="middle" fontFamily="Courier New, monospace" fontSize="21" fontWeight="800">
          <text x="72" y="44" fill="#0000ff">1</text>
          <text x="38" y="78" fill="#008000">2</text>
        </g>
        <g transform="translate(64 61) scale(1.05)">
          <path d="M7.5 2.5 L7.5 7.5 L3 5 Z" fill="#ff0000" />
          <rect x="7" y="2.5" width="1.2" height="8.5" fill="#000000" />
          <rect x="4.5" y="11" width="7" height="1.4" fill="#000000" />
          <rect x="3" y="12.4" width="10" height="1.6" fill="#000000" />
        </g>
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
        <Tile
          onClick={() => onPlay('minesweeper')}
          art={<MinesweeperArt />}
          name="Minesweeper"
          desc="Clear the field, don't dig"
        />
      </div>
    </div>
  )
}
