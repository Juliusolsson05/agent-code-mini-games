import * as THREE from 'three'

import { CAM_ELEVATION_DEG, CAM_FOV, CAM_MARGIN, FRAME_D, FRAME_W } from './world'

// The table camera (spec §4). Fixed shot — no orbit controls, because a user-controllable
// camera invites bad angles and doubles the framing work.
//
// TWO decisions, both reversals of what was rejected:
//
// 1. LONG LENS, FAR BACK. The old camera was a 46° FOV at ~13 units. A wide lens close to
//    a large flat subject diverges hard: near cards balloon, the far rail shears away, and
//    reading two hands at opposite ends of the frame is genuinely uncomfortable. A 30° FOV
//    at ~25 units is near-orthographic — the table reads flat and legible while staying
//    real 3D with real shadows.
//
// 2. BIRD'S-EYE WITH A SLIGHT TILT. 73° above the horizon = 17° off vertical. Enough tilt
//    to see the rail, the card thickness, and the chip stacks as solid objects; not enough
//    to distort the play area.

const ELEV = (CAM_ELEVATION_DEG * Math.PI) / 180
const TARGET = new THREE.Vector3(0, 0, 0)

export function makeCamera(aspect: number): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(CAM_FOV, aspect, 1, 200)
  fitCamera(camera, aspect)
  return camera
}

/**
 * Solve the camera distance so the table always fills the frame with a consistent margin.
 *
 * Hard-coding a position breaks the instant the stage aspect changes — modal vs pane vs a
 * resized window — which is why this is computed at construction AND on every resize.
 *
 * The table's depth is foreshortened by the tilt (multiply by sin(elevation)); its width
 * is not. Whichever axis needs more room wins.
 */
export function fitCamera(camera: THREE.PerspectiveCamera, aspect: number): void {
  const halfW = (FRAME_W / 2) * CAM_MARGIN
  const halfD = (FRAME_D / 2) * Math.sin(ELEV) * CAM_MARGIN

  // Half-height the frustum must cover at the table, in world units.
  const needH = Math.max(halfD, halfW / aspect)
  const distance = needH / Math.tan((CAM_FOV * Math.PI) / 360)

  camera.aspect = aspect
  camera.position.set(
    TARGET.x,
    TARGET.y + distance * Math.sin(ELEV),
    TARGET.z + distance * Math.cos(ELEV),
  )
  camera.lookAt(TARGET)
  camera.updateProjectionMatrix()
}

// NO IDLE CAMERA MOTION — removed deliberately (was §4.3).
//
// The original spec called for a slow parallax drift "so a still table isn't a dead
// image". In practice the constant re-aim read as the whole table slowly rotating under
// you, which is disorienting on a game you stare at for minutes at a time and actively
// hurts the thing the long lens was chosen to provide: a stable, legible, near-orthographic
// read of the felt. A card game wants a locked-off camera; the motion on screen should
// come from the cards and chips, not the lens.
//
// The camera is now set once by fitCamera() and only moves on resize.
