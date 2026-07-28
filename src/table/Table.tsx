// The blackjack table, drawn as a single SVG that fills its container behind the
// game content. Radial-green felt, a gold rail, the classic curved "BLACKJACK PAYS
// 3 TO 2" arc, the rules line, and a bet spot. Independent of the app theme — a
// casino table should look like a casino table.
export function Table() {
  return (
    <svg className="mg-felt" viewBox="0 0 520 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="mg-felt-grad" cx="50%" cy="34%" r="80%">
          <stop offset="0%" stopColor="#1f8551" />
          <stop offset="62%" stopColor="#136a41" />
          <stop offset="100%" stopColor="#0c4b2d" />
        </radialGradient>
        <linearGradient id="mg-rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2418" />
          <stop offset="100%" stopColor="#241209" />
        </linearGradient>
        <path id="mg-arc" d="M70 300 A 190 190 0 0 1 450 300" fill="none" />
      </defs>

      {/* Wooden rail. */}
      <rect x="0" y="0" width="520" height="620" rx="34" fill="url(#mg-rail)" />
      {/* Felt. */}
      <rect x="14" y="14" width="492" height="592" rx="24" fill="url(#mg-felt-grad)" />
      {/* Gold trim inside the rail. */}
      <rect
        x="14"
        y="14"
        width="492"
        height="592"
        rx="24"
        fill="none"
        stroke="#e6c979"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      {/* Soft vignette. */}
      <rect x="14" y="14" width="492" height="592" rx="24" fill="#000000" fillOpacity="0.10" style={{ mixBlendMode: 'multiply' }} />

      {/* Curved house payout, upper-middle. */}
      <text
        fill="#f0e2b6"
        fillOpacity="0.92"
        fontSize="23"
        fontWeight={700}
        letterSpacing="4"
        fontFamily="Georgia, serif"
      >
        <textPath href="#mg-arc" startOffset="50%" textAnchor="middle">
          BLACKJACK PAYS 3 TO 2
        </textPath>
      </text>
      <text
        x="260"
        y="330"
        textAnchor="middle"
        fill="#e9d9a8"
        fillOpacity="0.72"
        fontSize="12.5"
        letterSpacing="3"
        fontFamily="Georgia, serif"
      >
        DEALER MUST STAND ON 17
      </text>
      <text
        x="260"
        y="352"
        textAnchor="middle"
        fill="#e9d9a8"
        fillOpacity="0.5"
        fontSize="11"
        letterSpacing="3"
        fontFamily="Georgia, serif"
      >
        INSURANCE PAYS 2 TO 1
      </text>

      {/* Bet spot. */}
      <ellipse cx="260" cy="474" rx="58" ry="30" fill="none" stroke="#f0e2b6" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="2 6" />
    </svg>
  )
}
