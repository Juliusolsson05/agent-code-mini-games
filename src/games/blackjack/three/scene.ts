import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import type { ChipValue } from '../../../chips/Chip'
import type { BJState, Card as CardData } from '../engine'
import { cardBackTexture, cardFaceTexture, disposeCardTextures } from './cardTexture'
import {
  chipSideTexture,
  chipTopTexture,
  feltNormal,
  feltTexture,
  woodTexture,
} from './procTextures'

// Units: 1 ≈ a card width. The whole table lives in the XZ plane with the felt top at
// y = 0; the camera looks down at it from the player's side (+Z), so the table
// genuinely recedes in perspective instead of a CSS skew.
const CW = 1.15
const CH = 1.61
const CT = 0.024
const CHIP_R = 0.5
const CHIP_H = 0.15
const FAN = 0.42 // horizontal overlap between cards in a hand
const DEALER_Z = -2.7
const PLAYER_Z = 2.5
const HAND_GAP = 3.6 // x-spread between split hands
const BET_Z = 1.2
const SHOE = new THREE.Vector3(6.4, 2.6, -3.6) // where dealt cards fly from

const CHIP_DENOMS: ChipValue[] = [500, 100, 25, 5, 1]

type CardEntry = {
  mesh: THREE.Mesh
  pos: THREE.Vector3
  rotX: number
  yaw: number
}

type ChipEntry = {
  mesh: THREE.Mesh
  pos: THREE.Vector3
}

/** Rounded-rectangle Shape for the felt / table so corners are real geometry. */
function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

const VIGNETTE_SHADER = {
  uniforms: { tDiffuse: { value: null as THREE.Texture | null }, strength: { value: 1.05 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float strength; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5;
      float v = smoothstep(0.9, 0.3, dot(d, d) * strength * 2.0);
      gl_FragColor = vec4(c.rgb * mix(0.8, 1.0, v), c.a);
    }`,
}

/**
 * The blackjack table rendered in real 3D. Owns the WebGL renderer, a lit + shadowed
 * scene, post-processing (bloom + vignette), and the card/chip meshes. `update(state)`
 * is a pure projection of the engine's BJState onto the scene; the render loop lerps
 * every mesh toward its target transform, which turns state changes into motion (deal
 * from the shoe, hole-card flip, chip toss) for free.
 */
export class BlackjackScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private composer: EffectComposer
  private bloom: UnrealBloomPass
  private raf = 0
  private disposed = false
  private ro: ResizeObserver

  private cards = new Map<string, CardEntry>()
  private chips: ChipEntry[] = []
  private chipMat = new Map<ChipValue, THREE.Material[]>()
  private lastBet = -1
  private celebrateUntil = 0

  constructor(private container: HTMLElement) {
    const w = Math.max(1, container.clientWidth)
    const h = Math.max(1, container.clientHeight)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    this.renderer.setSize(w, h)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.25
    container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 100)
    this.camera.position.set(0, 9, 9.4)
    this.camera.lookAt(0, 0, -0.3)

    this.buildLights()
    this.buildTable()

    // Post: bloom for glints on gold + chips, a vignette to frame the table.
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.45, 0.7, 0.9)
    this.composer.addPass(this.bloom)
    this.composer.addPass(new ShaderPass(VIGNETTE_SHADER))
    this.composer.addPass(new OutputPass())
    this.composer.setSize(w, h)

    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(container)

    this.loop = this.loop.bind(this)
    this.raf = requestAnimationFrame(this.loop)
  }

  private buildLights(): void {
    // Three r155+ uses PHYSICAL light units, so distant point/spot lights need huge
    // intensities. Use a hemisphere fill + a DIRECTIONAL key (no distance falloff, so
    // it lights the whole table evenly and casts the shadows) and a decay-free spot
    // only for the warm casino hot-spot + a bloom source.
    this.scene.add(new THREE.HemisphereLight(0xa4bcd2, 0x21302a, 1.25))

    const key = new THREE.DirectionalLight(0xfff1d8, 2.6)
    key.position.set(3, 13, 7)
    key.target.position.set(0, 0, 0)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    key.shadow.camera.near = 1
    key.shadow.camera.far = 42
    key.shadow.camera.left = -12
    key.shadow.camera.right = 12
    key.shadow.camera.top = 12
    key.shadow.camera.bottom = -12
    key.shadow.bias = -0.0005
    this.scene.add(key)
    this.scene.add(key.target)

    const spot = new THREE.SpotLight(0xffe3ad, 3.4, 0, Math.PI / 4.2, 0.65, 0)
    spot.position.set(0, 10, 3)
    spot.target.position.set(0, 0, 1)
    this.scene.add(spot)
    this.scene.add(spot.target)

    const rim = new THREE.DirectionalLight(0x8fb0ff, 0.6)
    rim.position.set(-7, 4, -7)
    this.scene.add(rim)
  }

  private buildTable(): void {
    // Wooden base — an extruded rounded rectangle with a beveled top edge = the rail.
    const baseShape = roundedRect(16.4, 11, 1.6)
    const base = new THREE.Mesh(
      new THREE.ExtrudeGeometry(baseShape, { depth: 0.7, bevelEnabled: true, bevelSize: 0.22, bevelThickness: 0.18, bevelSegments: 3 }),
      new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.5, metalness: 0.05 }),
    )
    base.rotation.x = -Math.PI / 2
    base.position.y = -0.7
    base.receiveShadow = true
    this.scene.add(base)

    // Felt — a rounded plane inset on top of the base.
    const felt = new THREE.Mesh(
      new THREE.ShapeGeometry(roundedRect(14.6, 9.4, 1.2)),
      new THREE.MeshStandardMaterial({
        map: feltTexture(),
        normalMap: feltNormal(),
        normalScale: new THREE.Vector2(0.35, 0.35),
        roughness: 0.98,
        metalness: 0,
      }),
    )
    felt.rotation.x = -Math.PI / 2
    felt.position.y = 0.001
    felt.receiveShadow = true
    this.scene.add(felt)
  }

  // --- meshes ---------------------------------------------------------------

  private makeCard(data: CardData): THREE.Mesh {
    const white = new THREE.MeshStandardMaterial({ color: 0xf3f1e9, roughness: 0.75 })
    const face = new THREE.MeshStandardMaterial({ map: cardFaceTexture(data.rank, data.suit), roughness: 0.5 })
    const back = new THREE.MeshStandardMaterial({ map: cardBackTexture(), roughness: 0.5 })
    // Box faces: [+x, -x, +y(top=face), -y(bottom=back), +z, -z]
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(CW, CT, CH), [white, white, face, back, white, white])
    mesh.castShadow = true
    return mesh
  }

  private chipMaterials(value: ChipValue): THREE.Material[] {
    let m = this.chipMat.get(value)
    if (!m) {
      const side = new THREE.MeshStandardMaterial({ map: chipSideTexture(value), roughness: 0.6 })
      const top = new THREE.MeshStandardMaterial({ map: chipTopTexture(value), roughness: 0.55 })
      m = [side, top, top] // cylinder: [side, +y cap, -y cap]
      this.chipMat.set(value, m)
    }
    return m
  }

  private makeChip(value: ChipValue): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(CHIP_R, CHIP_R, CHIP_H, 40), this.chipMaterials(value))
    mesh.castShadow = true
    return mesh
  }

  // --- reconcile ------------------------------------------------------------

  update(state: BJState): void {
    if (this.disposed) return
    const desired = new Set<string>()

    const layout = (cards: CardData[], z: number, xCenter: number, holeHidden: boolean): void => {
      const n = cards.length
      cards.forEach((card, i) => {
        desired.add(card.id)
        const x = xCenter + (i - (n - 1) / 2) * FAN
        const pos = new THREE.Vector3(x, CT / 2 + i * 0.004, z + i * 0.16)
        const faceDown = holeHidden && i === 1
        let entry = this.cards.get(card.id)
        if (!entry) {
          const mesh = this.makeCard(card)
          mesh.position.copy(SHOE) // fly in from the shoe
          mesh.rotation.set(faceDown ? Math.PI : 0, -0.5, 0)
          this.scene.add(mesh)
          entry = { mesh, pos, rotX: faceDown ? Math.PI : 0, yaw: 0 }
          this.cards.set(card.id, entry)
        }
        entry.pos = pos
        entry.rotX = faceDown ? Math.PI : 0
        entry.yaw = (i - (n - 1) / 2) * 0.04
      })
    }

    layout(state.dealer, DEALER_Z, 0, state.holeHidden)
    const hands = state.playerHands
    hands.forEach((h, hi) => {
      const xc = (hi - (hands.length - 1) / 2) * HAND_GAP
      layout(h.cards, PLAYER_Z, xc, false)
    })

    // Remove cards that are gone (a new round clears the table).
    for (const [id, entry] of this.cards) {
      if (!desired.has(id)) {
        this.scene.remove(entry.mesh)
        entry.mesh.geometry.dispose()
        this.cards.delete(id)
      }
    }

    this.updateChips(state)

    if (state.phase === 'settle' && state.lastNet > 0) {
      this.celebrateUntil = performance.now() + 1500
      this.bloom.strength = 1.3
    }
  }

  private updateChips(state: BJState): void {
    const amount = state.phase === 'betting' ? state.bet : state.playerHands.reduce((s, h) => s + h.bet, 0)
    if (amount === this.lastBet && state.phase !== 'betting') return
    if (amount === this.lastBet) return
    this.lastBet = amount

    // Rebuild the bet stack.
    for (const c of this.chips) {
      this.scene.remove(c.mesh)
      c.mesh.geometry.dispose()
    }
    this.chips = []

    let rem = amount
    let level = 0
    for (const denom of CHIP_DENOMS) {
      while (rem >= denom && level < 14) {
        const mesh = this.makeChip(denom)
        mesh.position.set(0.2, 4 + level, BET_Z) // drops in from above
        this.scene.add(mesh)
        this.chips.push({ mesh, pos: new THREE.Vector3(0, CHIP_H / 2 + level * CHIP_H, BET_Z) })
        rem -= denom
        level += 1
      }
    }
  }

  // --- loop -----------------------------------------------------------------

  private loop(): void {
    if (this.disposed) return
    for (const e of this.cards.values()) {
      e.mesh.position.lerp(e.pos, 0.16)
      e.mesh.rotation.x += (e.rotX - e.mesh.rotation.x) * 0.14
      e.mesh.rotation.y += (e.yaw - e.mesh.rotation.y) * 0.16
    }
    for (const c of this.chips) c.mesh.position.lerp(c.pos, 0.2)

    if (this.celebrateUntil && performance.now() > this.celebrateUntil) {
      this.celebrateUntil = 0
      this.bloom.strength = 0.45
    }

    this.composer.render()
    this.raf = requestAnimationFrame(this.loop)
  }

  private resize(): void {
    const w = Math.max(1, this.container.clientWidth)
    const h = Math.max(1, this.container.clientHeight)
    this.renderer.setSize(w, h)
    this.composer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  dispose(): void {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.ro.disconnect()
    disposeCardTextures()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
