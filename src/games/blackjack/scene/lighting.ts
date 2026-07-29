import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// The light rig (spec §5). Every intensity below is DERIVED, not chosen by eye.
//
// ── THE CALIBRATION RULE (§5.1) ──
// The brightest diffuse surface in the scene — a white card face, albedo ≈ 0.95, normal
// +Y — must land at linear luminance 0.80–0.90 BEFORE tone mapping. At exposure 1.0 ACES
// maps 0.86 to roughly 0.87 sRGB: a clean paper white with headroom left, so speculars
// have somewhere to go instead of clipping.
//
// Nothing enforced this before, which is how a white chip ended up at 0.84–1.36 on
// diffuse alone and self-glowed. three.js physical units:
//     directional/spot diffuse = dotNL · intensity · albedo / π
//     image-based diffuse      = envColor · environmentIntensity · albedo
//
//   Key         dotNL 0.82 · 1.50 · 0.95 / π  = 0.37
//   Ambient IBL RoomEnvironment @ 0.28        ≈ 0.26
//   Fill        hemisphere @ 0.22             = 0.11
//   Rim                                       ≈ 0.06 (edges only)
//   Lamp pool   spot @ 0.9, decay 0.6, d≈11   = 0.06
//                                       TOTAL ≈ 0.86  ✅
//
// Changing any intensity here means re-doing this arithmetic. Screenshot-verify after.

export type LightRig = { dispose(): void }

export function installLighting(scene: THREE.Scene, renderer: THREE.WebGLRenderer): LightRig {
  // Image-based ambient. RoomEnvironment is a small procedural room of emissive panels;
  // PMREM prefilters it into an environment map so every MeshStandardMaterial gets
  // believable soft reflection. This is what stops chips and cards reading as flat
  // cutouts — a hemisphere light alone cannot do it. Kept low: it is FILL, not key.
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.03)
  scene.environment = envRT.texture
  scene.environmentIntensity = 0.28
  pmrem.dispose()

  // A touch of hemisphere so the deepest shadows don't go fully black.
  const hemi = new THREE.HemisphereLight(0xbfd0e6, 0x140b08, 0.22)
  scene.add(hemi)

  // Warm key — the main modelling light and the ONLY shadow caster. One caster keeps the
  // shadow direction unambiguous; multiple casters read as "video game".
  const key = new THREE.DirectionalLight(0xffe9c8, 1.5)
  key.position.set(4, 12, 6.5)
  key.target.position.set(0, 0, -0.5)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  key.shadow.camera.near = 1
  key.shadow.camera.far = 46
  // Tight frustum around the table — a loose one wastes texel density and softens
  // exactly the contact shadows that sell the cards as 3D.
  const s = 12.5
  key.shadow.camera.left = -s
  key.shadow.camera.right = s
  key.shadow.camera.top = s
  key.shadow.camera.bottom = -s
  key.shadow.bias = -0.0004
  key.shadow.normalBias = 0.02
  key.shadow.radius = 4
  scene.add(key)
  scene.add(key.target)

  // The overhead lamp's pool of warm light. Restrained on purpose — at 1.6 this was a
  // blown-out hot-spot in the middle of the felt. Wide penumbra so the edge is a
  // gradient, not a rim.
  const spot = new THREE.SpotLight(0xffdca6, 0.9, 40, Math.PI / 5.2, 0.95, 0.6)
  spot.position.set(0, 11, 1.0)
  spot.target.position.set(0, 0, 0.5)
  scene.add(spot)
  scene.add(spot.target)

  // Cool back rim: separates the far rail from the dark room. Contributes almost nothing
  // to the table-top exposure (it grazes), which is why it can be a cool hue without
  // fighting the warm key.
  const rim = new THREE.DirectionalLight(0x8fb6ff, 0.45)
  rim.position.set(-6, 5, -9)
  scene.add(rim)

  return {
    dispose() {
      envRT.dispose()
      scene.environment = null
    },
  }
}
