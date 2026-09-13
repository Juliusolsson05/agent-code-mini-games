// Cabinet marquees — the preview art for each game on the launcher.
//
// ── THE ONE RULE THESE FOLLOW ──
// The launcher chrome inherits the host's theme; THIS ART DOES NOT. Each preview is a
// miniature of its own game rendered in that game's committed palette — casino green,
// garden green, Win95 grey. A tile that recoloured itself with the user's accent would
// look tidy and say nothing; the whole job of a preview is to promise what the game
// looks like. So the case is the host's and the light inside is the game's.
//
// Each is drawn in a 200×130 viewBox and scales to the tile.

const VB = '0 0 200 130'

/** Blackjack: felt, the betting arc, a fanned pair, a short stack of chips. */
export function BlackjackArt() {
  return (
    <svg viewBox={VB} className="mg-art" aria-hidden="true">
      <defs>
        <radialGradient id="bjFelt" cx="50%" cy="34%" r="78%">
          <stop offset="0%" stopColor="#1f8a54" />
          <stop offset="62%" stopColor="#136a41" />
          <stop offset="100%" stopColor="#0a3f26" />
        </radialGradient>
        <linearGradient id="bjCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eceae1" />
        </linearGradient>
      </defs>

      <rect width="200" height="130" fill="url(#bjFelt)" />

      {/* The betting arc — the table's one piece of signage, in house gold. */}
      <ellipse
        cx="100"
        cy="96"
        rx="46"
        ry="17"
        fill="none"
        stroke="#f0e2b6"
        strokeOpacity="0.34"
        strokeWidth="1.6"
        strokeDasharray="3 7"
      />

      {/* Chip stack, offset left so it doesn't fight the cards. */}
      <g transform="translate(34 88)">
        {[0, 1, 2].map(i => (
          <g key={i} transform={`translate(0 ${-i * 5})`}>
            <ellipse cx="0" cy="0" rx="15" ry="6" fill={i === 2 ? '#2f9e57' : '#28794a'} />
            <ellipse cx="0" cy="-1.4" rx="15" ry="6" fill="#2f9e57" />
            {i === 2 ? (
              <ellipse cx="0" cy="-1.4" rx="9" ry="3.4" fill="none" stroke="#bce7cd" strokeWidth="1.2" strokeDasharray="2 3" />
            ) : null}
          </g>
        ))}
      </g>

      {/* Two cards, fanned. Drawn rather than reused from CardFace: at this size the
          full card art turns to mush, so the indices are enlarged and the pip count
          dropped — a preview reads as "cards", not as a legible hand. */}
      <g transform="translate(108 52) rotate(-13)">
        <rect x="-24" y="-33" width="48" height="66" rx="5" fill="#000" opacity="0.28" transform="translate(2 4)" />
        <rect x="-24" y="-33" width="48" height="66" rx="5" fill="url(#bjCard)" />
        <text x="-16" y="-14" fontSize="19" fontWeight="800" fontFamily="Georgia, serif" fill="#20232b">A</text>
        <path d="M-3 6 C-3 6 -14 -3 -14 -9 C-14 -13 -11 -15 -8 -15 C-5.5 -15 -4 -13.5 -3 -11 C-2 -13.5 -0.5 -15 2 -15 C5 -15 8 -13 8 -9 C8 -3 -3 6 -3 6 Z" fill="#20232b" transform="translate(3 18) scale(1.5)" opacity="0" />
        <g transform="translate(0 8) scale(0.34)" fill="#20232b">
          <path d="M50 8 C50 8 13 41 13 61 C13 73 21 79 30 79 C35 79 39 77 42 73 C41 83 37 89 29 93 L71 93 C63 89 59 83 58 73 C61 77 65 79 70 79 C79 79 87 73 87 61 C87 41 50 8 50 8 Z" transform="translate(-50 -50)" />
        </g>
      </g>

      <g transform="translate(140 56) rotate(11)">
        <rect x="-24" y="-33" width="48" height="66" rx="5" fill="#000" opacity="0.28" transform="translate(2 4)" />
        <rect x="-24" y="-33" width="48" height="66" rx="5" fill="url(#bjCard)" />
        <text x="-16" y="-14" fontSize="19" fontWeight="800" fontFamily="Georgia, serif" fill="#c62a3f">K</text>
        <g transform="translate(0 8) scale(0.34)" fill="#c62a3f">
          <path d="M50 87 C50 87 11 59 11 33 C11 19 21 11 32 11 C41 11 47 16 50 24 C53 16 59 11 68 11 C79 11 89 19 89 33 C89 59 50 87 50 87 Z" transform="translate(-50 -50)" />
        </g>
      </g>
    </svg>
  )
}

/** Snake: the garden checkerboard, the blue snake mid-turn, the apple. */
export function SnakeArt() {
  const CELL = 20
  const cells: JSX.Element[] = []
  for (let y = 0; y < 130 / CELL + 1; y++) {
    for (let x = 0; x < 200 / CELL; x++) {
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x * CELL}
          y={y * CELL}
          width={CELL}
          height={CELL}
          fill={(x + y) % 2 === 0 ? '#b5d991' : '#aed28a'}
        />,
      )
    }
  }
  return (
    <svg viewBox={VB} className="mg-art" aria-hidden="true">
      <defs>
        <clipPath id="snClip">
          <rect width="200" height="130" />
        </clipPath>
      </defs>
      <g clipPath="url(#snClip)">{cells}</g>

      {/* The snake as one round-capped polyline — the same construction the real
          renderer uses, which is why the corner reads correctly at this size. */}
      <polyline
        points="34,96 34,64 74,64 74,34 114,34"
        fill="none"
        stroke="#345ebc"
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="74,64 74,34 114,34"
        fill="none"
        stroke="#5688f4"
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Eyes, looking the way it travels. */}
      <circle cx="112" cy="28" r="3.4" fill="#fff" />
      <circle cx="112" cy="40" r="3.4" fill="#fff" />
      <circle cx="113" cy="28" r="1.7" fill="#193657" />
      <circle cx="113" cy="40" r="1.7" fill="#193657" />

      {/* Apple. */}
      <g transform="translate(158 88)">
        <circle cx="0" cy="1" r="11" fill="#de4949" />
        <circle cx="-3.5" cy="-3" r="3.4" fill="#ff8463" opacity="0.65" />
        <rect x="-0.7" y="-14" width="1.6" height="5" fill="#7a4a1e" />
        <ellipse cx="5" cy="-12" rx="5" ry="2.6" fill="#377a4b" transform="rotate(-28 5 -12)" />
      </g>
    </svg>
  )
}

/** Minesweeper: Win95 bevels, a couple of numbers, a flag, the face. */
export function MinesweeperArt() {
  const FACE = '#c0c0c0'
  const LIGHT = '#ffffff'
  const SHADOW = '#808080'
  const S = 32
  const OX = 36
  const OY = 20

  /** One tile — raised, or opened with a number. */
  const tile = (cx: number, cy: number, open: boolean, num?: number, color?: string) => {
    const x = OX + cx * S
    const y = OY + cy * S
    return (
      <g key={`${cx}-${cy}`}>
        <rect x={x} y={y} width={S} height={S} fill={FACE} />
        {open ? (
          <>
            <rect x={x} y={y} width={S} height="1.5" fill={SHADOW} />
            <rect x={x} y={y} width="1.5" height={S} fill={SHADOW} />
            {num ? (
              <text
                x={x + S / 2}
                y={y + S / 2 + 8}
                textAnchor="middle"
                fontSize="22"
                fontWeight="800"
                fontFamily="'Courier New', monospace"
                fill={color}
              >
                {num}
              </text>
            ) : null}
          </>
        ) : (
          <>
            <rect x={x} y={y} width={S} height="3.5" fill={LIGHT} />
            <rect x={x} y={y} width="3.5" height={S} fill={LIGHT} />
            <rect x={x} y={y + S - 3.5} width={S} height="3.5" fill={SHADOW} />
            <rect x={x + S - 3.5} y={y} width="3.5" height={S} fill={SHADOW} />
          </>
        )}
      </g>
    )
  }

  return (
    <svg viewBox={VB} className="mg-art" aria-hidden="true">
      <rect width="200" height="130" fill="#bdbdbd" />

      {tile(0, 0, false)}
      {tile(1, 0, true, 1, '#0000ff')}
      {tile(2, 0, true, 2, '#008000')}
      {tile(0, 1, true, 3, '#ff0000')}
      {tile(1, 1, true)}
      {tile(2, 1, false)}
      {tile(0, 2, false)}
      {tile(1, 2, false)}
      {tile(2, 2, true, 1, '#0000ff')}

      {/* A flag planted on the raised tile at (2,1). */}
      <g transform={`translate(${OX + 2 * S + 9} ${OY + S + 8}) scale(0.95)`}>
        <path d="M7.5 2.5 L7.5 7.5 L3 5 Z" fill="#ff0000" />
        <rect x="7" y="2.5" width="1.3" height="9" fill="#000" />
        <rect x="3" y="11.5" width="10" height="1.8" fill="#000" />
      </g>

      {/* The face, tucked into the corner like the real reset button. */}
      <g transform="translate(14 14)">
        <rect x="-6" y="-6" width="24" height="24" fill={FACE} />
        <rect x="-6" y="-6" width="24" height="2.5" fill={LIGHT} />
        <rect x="-6" y="-6" width="2.5" height="24" fill={LIGHT} />
        <rect x="-6" y="15.5" width="24" height="2.5" fill={SHADOW} />
        <rect x="15.5" y="-6" width="2.5" height="24" fill={SHADOW} />
        <circle cx="6" cy="6" r="8" fill="#ffff00" stroke="#000" strokeWidth="1" />
        <circle cx="3.4" cy="4" r="1.2" fill="#000" />
        <circle cx="8.6" cy="4" r="1.2" fill="#000" />
        <path d="M2.6 8.6 Q6 11.4 9.4 8.6" fill="none" stroke="#000" strokeWidth="1.1" />
      </g>
    </svg>
  )
}

/** Typing Test: a quiet page of words, the first line typed, one slip, the caret. */
export function TypingArt() {
  const PAGE = '#1e1f23'
  const TYPED = '#e8e4d6'
  const WAITING = '#5c5f67'
  const SLIP = '#e2555b'
  const CARET = '#f2c94c'
  const MONO = "ui-monospace, 'SF Mono', Menlo, monospace"
  // Monospace glyphs advance about 0.6em, so at 13px a character is ~7.8 units wide.
  // The caret and the underline are placed by character count on that grid.
  const CHAR = 7.8
  const X = 18
  return (
    <svg viewBox={VB} className="mg-art" aria-hidden="true">
      <rect width="200" height="130" fill={PAGE} />
      <text x={X} y="28" fontSize="12" fontFamily={MONO} fill={CARET}>84</text>
      <text x={X + 20} y="28" fontSize="8" fontFamily={MONO} fill={WAITING}>wpm</text>
      <text x="182" y="28" fontSize="8" fontFamily={MONO} fill={WAITING} textAnchor="end">0:21</text>

      <g fontSize="13" fontFamily={MONO}>
        <text x={X} y="60">
          <tspan fill={TYPED}>the wo</tspan><tspan fill={SLIP}>t</tspan><tspan fill={TYPED}>ds just</tspan>
        </text>
        <text x={X} y="82">
          <tspan fill={TYPED}>flow when </tspan><tspan fill={WAITING}>you let</tspan>
        </text>
        <text x={X} y="104" fill={WAITING}>them go easy</text>
      </g>
      {/* The word with the slip keeps its underline, the way the real test marks it. */}
      <rect x={X + 4 * CHAR} y="64" width={5 * CHAR} height="1.6" fill={SLIP} opacity="0.75" />
      <rect x={X + 10 * CHAR - 1} y="70" width="2" height="15" rx="1" fill={CARET} />
    </svg>
  )
}
