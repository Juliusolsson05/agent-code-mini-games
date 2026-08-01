// The Windows 95 Minesweeper art, redrawn as SVG.
//
// The original ships these as 16×16 bitmaps. Redrawing them as vectors keeps them crisp
// at any cell size while preserving the exact shapes and the exact palette — which is the
// whole game, visually. Every colour below is the Win95 value; none of them are "close
// enough" approximations, because this reads as Minesweeper only if they're right.

// --- seven-segment LED counters ------------------------------------------------

/** Which segments light for each character. Order: a b c d e f g. */
const SEGMENTS: Record<string, string> = {
  '0': 'abcdef',
  '1': 'bc',
  '2': 'abged',
  '3': 'abgcd',
  '4': 'fgbc',
  '5': 'afgcd',
  '6': 'afgedc',
  '7': 'abc',
  '8': 'abcdefg',
  '9': 'abcfgd',
  '-': 'g',
  ' ': '',
}

const LIT = '#ff0000'
/**
 * Unlit segments. The original bitmap leaves them pure black, but a hair of dark red
 * reads unmistakably as a powered LED panel rather than a black box with red shapes on
 * it — the same trick real seven-segment displays get for free from their diffuser.
 */
const UNLIT = '#3d0000'

/** Chamfered horizontal segment — the angled ends are what make it read as LED. */
function hSeg(x: number, y: number, w: number, t: number): string {
  const h = t / 2
  return `${x + h},${y} ${x + w - h},${y} ${x + w},${y + h} ${x + w - h},${y + t} ${x + h},${y + t} ${x},${y + h}`
}
function vSeg(x: number, y: number, h: number, t: number): string {
  const q = t / 2
  return `${x},${y + q} ${x + q},${y} ${x + t},${y + q} ${x + t},${y + h - q} ${x + q},${y + h} ${x},${y + h - q}`
}

function Digit({ char }: { char: string }) {
  const on = SEGMENTS[char] ?? ''
  const c = (s: string) => (on.includes(s) ? LIT : UNLIT)
  const T = 3 // segment thickness
  return (
    <svg viewBox="0 0 13 23" width="13" height="23" shapeRendering="crispEdges">
      <polygon points={hSeg(2, 0, 9, T)} fill={c('a')} />
      <polygon points={vSeg(10, 1, 10, T)} fill={c('b')} />
      <polygon points={vSeg(10, 12, 10, T)} fill={c('c')} />
      <polygon points={hSeg(2, 20, 9, T)} fill={c('d')} />
      <polygon points={vSeg(0, 12, 10, T)} fill={c('e')} />
      <polygon points={vSeg(0, 1, 10, T)} fill={c('f')} />
      <polygon points={hSeg(2, 10, 9, T)} fill={c('g')} />
    </svg>
  )
}

/**
 * A three-digit LED readout. Negative values show a leading `-` (the mine counter really
 * does go negative when you over-flag), and everything is clamped to what three digits
 * can express.
 */
export function LedCounter({ value }: { value: number }) {
  const clamped = Math.max(-99, Math.min(999, Math.trunc(value)))
  const text =
    clamped < 0
      ? `-${String(Math.abs(clamped)).padStart(2, '0')}`
      : String(clamped).padStart(3, '0')
  return (
    <div className="ms-led">
      {text.split('').map((ch, i) => (
        <Digit key={i} char={ch} />
      ))}
    </div>
  )
}

// --- the face ------------------------------------------------------------------

export type FaceState = 'smile' | 'oh' | 'cool' | 'dead'

/** The reset button's face. Four states, exactly as the original. */
export function Face({ state }: { state: FaceState }) {
  const YELLOW = '#ffff00'
  const INK = '#000000'
  return (
    <svg viewBox="0 0 18 18" width="18" height="18" shapeRendering="geometricPrecision">
      <circle cx="9" cy="9" r="8" fill={YELLOW} stroke={INK} strokeWidth="1" />

      {state === 'cool' ? (
        // Sunglasses: one bar across both eyes, the way the win face reads.
        <>
          <path d="M2.5 7.5 H15.5 V9 H12.5 L11 11 H7 L5.5 9 H2.5 Z" fill={INK} />
          <path d="M5.5 12.5 Q9 15 12.5 12.5" fill="none" stroke={INK} strokeWidth="1.2" />
        </>
      ) : state === 'dead' ? (
        <>
          {/* X eyes */}
          <path
            d="M4.5 5.5 L7.5 8.5 M7.5 5.5 L4.5 8.5 M10.5 5.5 L13.5 8.5 M13.5 5.5 L10.5 8.5"
            stroke={INK}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Frown */}
          <path d="M5.5 13.5 Q9 10.5 12.5 13.5" fill="none" stroke={INK} strokeWidth="1.2" />
        </>
      ) : (
        <>
          <circle cx="6" cy="7" r="1.3" fill={INK} />
          <circle cx="12" cy="7" r="1.3" fill={INK} />
          {state === 'oh' ? (
            // The suspense face while a click is held.
            <ellipse cx="9" cy="12.5" rx="2" ry="2.4" fill={INK} />
          ) : (
            <path d="M5.5 11.5 Q9 14.5 12.5 11.5" fill="none" stroke={INK} strokeWidth="1.2" />
          )}
        </>
      )}
    </svg>
  )
}

// --- board glyphs ---------------------------------------------------------------

/** A mine: black ball, four spikes, and the signature white specular square. */
export function Mine({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}>
      <g stroke="#000000" strokeWidth="1.4">
        <line x1="8" y1="1.5" x2="8" y2="14.5" />
        <line x1="1.5" y1="8" x2="14.5" y2="8" />
        <line x1="3.2" y1="3.2" x2="12.8" y2="12.8" />
        <line x1="12.8" y1="3.2" x2="3.2" y2="12.8" />
      </g>
      <circle cx="8" cy="8" r="4.4" fill="#000000" />
      {/* The highlight is a SQUARE, not a circle — a quirk of the original bitmap and
          one of those details that reads as "wrong" the moment you smooth it out. */}
      <rect x="5.6" y="5.6" width="2" height="2" fill="#ffffff" />
    </svg>
  )
}

/** A flag: red pennant on a black staff with a wide base. */
export function Flag({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}>
      <path d="M7.5 2.5 L7.5 7.5 L3 5 Z" fill="#ff0000" />
      <rect x="7" y="2.5" width="1.2" height="8.5" fill="#000000" />
      <rect x="4.5" y="11" width="7" height="1.4" fill="#000000" />
      <rect x="3" y="12.4" width="10" height="1.6" fill="#000000" />
    </svg>
  )
}
