import * as THREE from 'three'

// All world dimensions live here and ONLY here (spec §12, convention 2).
//
// Units: 1 world unit ≈ one card width. The table lies in the XZ plane. The felt's TOP
// surface is y = 0 — that is the datum every other height is expressed against, so
// "does this sit on the table?" is always the question "is y > 0?". A previous version
// had the wood slab's beveled top at y ≈ 0.18 while the felt sat at y = 0, which buried
// the felt and every chip underneath it. Keeping one datum makes that class of bug
// impossible to express.
//
// The camera looks down the +Z axis from the player's side, so +Z is "toward the player"
// and −Z is "toward the dealer".

// --- cards ---
// Cards are sized for READABILITY, not for scale fidelity. A real card is ~3.5% of a
// real table's width; here it is ~8%, because the player has to read a rank glyph at
// 860px from a bird's-eye camera. Fidelity that you cannot read is worthless.
export const CW = 1.42 // card width
export const CH = 1.99 // card height (1:1.4 poker ratio, matches the 100×140 SVG viewBox)
export const CT = 0.026 // card thickness
export const CARD_RADIUS = 0.092 // corner radius of the rounded stock (§8.2)

// --- chips ---
export const CHIP_R = 0.56
export const CHIP_H = 0.15

// --- table (§8.1) ---
export const FELT_W = 15.2
export const FELT_D = 9.4
export const TABLE_W = 17.6
export const TABLE_D = 11.6
export const TABLE_H = 0.9 // body thickness — real bulk, so the camera sees its sides
export const RAIL_H = 0.42 // padded rail height above the felt
export const TABLE_CORNER_R = 1.15

// --- layout (§8) ---
// Spacing between cards in a hand. This is the card's VISIBLE width once fanned, so
// CW - FAN is how much each card hides of the one beneath it. At 0.46 against a 1.15
// card the overlap was 60% and a hand read as one white blob with a corner sticking out;
// a real dealer's fan shows the full index plus most of the art.
export const FAN = 0.9
export const CARD_STAGGER_Z = 0.11 // each subsequent card sits slightly toward the player
export const DEALER_Z = -2.75
export const PLAYER_Z = 2.6
export const BET_Z = 1.05
/** Where won chips land — beside the bet, on the player's right. */
export const PAYOUT_X = 1.75
export const HAND_GAP = 4.3 // x-spread between split hands

/** Where dealt cards fly in from — the shoe, at the dealer's right (§9.1). */
export const SHOE_POS = new THREE.Vector3(7.0, 2.4, -3.8)

/** Static props (§8.5). */
export const SHOE_PROP_POS = new THREE.Vector3(6.05, 0, -3.15)
export const DISCARD_PROP_POS = new THREE.Vector3(-6.05, 0, -3.15)

/**
 * What the camera frames (§4.2). Deliberately the felt plus a little rail — NOT the whole
 * table. Framing the furniture wastes ~15% of the viewport on wood the player never looks
 * at, and shrinks the cards correspondingly. We show enough rail to read the table as an
 * object and spend the rest of the frame on the play area.
 */
export const FRAME_W = FELT_W + 0.9
export const FRAME_D = FELT_D + 0.9

// --- camera (§4) ---
/** Elevation above the horizon. 73° = 17° off vertical: bird's-eye with a slight tilt. */
export const CAM_ELEVATION_DEG = 73
/** A LONG lens. Combined with the fitted distance this is near-orthographic, which is
 *  what makes the table readable; a wide lens up close was the "annoying" perspective. */
export const CAM_FOV = 30
/** Framing slack around the table. */
export const CAM_MARGIN = 1.06

// --- lighting calibration (§5.1) ---
/** The brightest diffuse surface must land here (linear, pre-tone-map). Exceeding ~1.0
 *  is what produced the blown-out white cards and chips. */
export const TARGET_WHITE_LUMA = 0.86
