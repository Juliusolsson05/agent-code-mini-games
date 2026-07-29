import * as THREE from 'three'

import { chipBreakdown, type ChipValue } from '../../../shared/chipPalette'
import type { BJState, Card as CardData } from '../engine'
import {
  arcPosition,
  CHIP_DURATION,
  CHIP_STAGGER,
  clamp01,
  DEAL_ARC_LIFT,
  DEAL_DURATION,
  DEAL_STAGGER,
  dealEase,
  DEAL_SPIN,
  DISCARD_ARC_LIFT,
  DISCARD_DURATION,
  DISCARD_STAGGER,
  easeInOutCubic,
  easeOutCubic,
  PAYOUT_DURATION,
  PAYOUT_STAGGER,
  FLIP_DURATION,
  FLIP_LIFT,
  prefersReducedMotion,
} from './animation'
import { driftCamera, fitCamera, makeCamera } from './camera'
import { installLighting, type LightRig } from './lighting'
import { disposeCard, disposeCardGeometry, makeCard } from './objects/card'
import { chipJitter, disposeChipResources, makeChip } from './objects/chip'
import { buildProps, type TableProps } from './objects/props'
import { buildTable } from './objects/table'
import { installRoom } from './room'
import { disposeCardTextures } from './textures/cardTextures'
import { disposeChipTextures } from './textures/chipTextures'
import {
  BET_Z,
  CARD_STAGGER_Z,
  CHIP_H,
  CT,
  DEALER_Z,
  FAN,
  HAND_GAP,
  PAYOUT_X,
  PLAYER_Z,
  SHOE_POS,
  DISCARD_PROP_POS,
} from './world'

type CardEntry = {
  group: THREE.Group
  /** Where it flies from and to — the arc is evaluated from these each frame (§9.1). */
  from: THREE.Vector3
  to: THREE.Vector3
  /** Seconds since this card started moving; negative = still staggered/waiting. */
  t: number
  duration: number
  yaw: number
  /** Target rotation.x: 0 face-up, π face-down. Animated separately (the flip). */
  faceDown: boolean
  flipT: number
  flipFrom: number
  /** Guards the one-shot landing sound. */
  landed: boolean
}

type ChipEntry = {
  mesh: THREE.Mesh
  from: THREE.Vector3
  to: THREE.Vector3
  t: number
  duration: number
  landed: boolean
}

/** A card on its way OUT — swept into the discard tray at the end of a round (§9.4). */
type RetiringCard = {
  group: THREE.Group
  from: THREE.Vector3
  to: THREE.Vector3
  t: number
  yawFrom: number
  yawTo: number
}

/** Sounds the scene triggers on IMPACT, so audio lands with the visual (§10). */
export type SceneSfx = {
  cardLand(): void
  chipLand(): void
}

/**
 * The blackjack table in real 3D.
 *
 * This class is the ORCHESTRATOR ONLY: renderer, render loop, and the reconcile from
 * engine state → meshes. Everything about how the world LOOKS is delegated (spec §12,
 * convention 1) — camera.ts, lighting.ts, room.ts, materials.ts, objects/*, textures/*.
 * No colour literal, light, or dimension may appear in this file.
 *
 * ── NO POST-PROCESSING, ON PURPOSE (§3.2) ──
 * There is deliberately no EffectComposer. `EffectComposer` renders into a HalfFloat
 * target, and three.js forces NoToneMapping when rendering off-screen (OutputPass tone-
 * maps at the end instead). That meant UnrealBloomPass saw RAW LINEAR HDR, where a
 * threshold of 1.0 is not "very bright" but "brighter than mid-grey-ish" — so ordinary
 * diffuse-lit white cards and the $1 chip crossed it and self-glowed. Rendering straight
 * to the canvas makes that bug unrepresentable, keeps MSAA from `antialias: true`, and
 * costs one less full-screen pass. Glow is authored as additive sprites (room.ts) and the
 * vignette is a CSS overlay.
 */
export class BlackjackScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private lights: LightRig
  private ro: ResizeObserver
  private raf = 0
  private disposed = false
  private clock = new THREE.Clock()
  private reducedMotion = prefersReducedMotion()

  private cards = new Map<string, CardEntry>()
  private chips: ChipEntry[] = []
  private retiring: RetiringCard[] = []
  private payouts: ChipEntry[] = []
  private payoutShown = false
  private lastBet = -1
  private props: TableProps

  /** Scratch vectors — the render loop must not allocate (§13.4). */
  private scratch = new THREE.Vector3()

  constructor(
    private container: HTMLElement,
    private sfx: SceneSfx = { cardLand: () => {}, chipLand: () => {} },
  ) {
    const w = Math.max(1, container.clientWidth)
    const h = Math.max(1, container.clientHeight)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    this.renderer.setSize(w, h)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    // The §5 light intensities are calibrated at exactly this exposure. Changing it
    // invalidates the calibration table in lighting.ts.
    this.renderer.toneMappingExposure = 1.0
    container.appendChild(this.renderer.domElement)

    this.camera = makeCamera(w / h)

    installRoom(this.scene)
    this.lights = installLighting(this.scene, this.renderer)
    buildTable(this.scene)
    this.props = buildProps(this.scene)

    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(container)

    this.loop = this.loop.bind(this)
    this.raf = requestAnimationFrame(this.loop)
  }

  // --- reconcile: engine state → meshes ---------------------------------------

  update(state: BJState): void {
    if (this.disposed) return
    const desired = new Set<string>()
    let dealtSoFar = 0

    const layout = (cards: CardData[], z: number, xCenter: number, holeHidden: boolean): void => {
      const n = cards.length
      cards.forEach((card, i) => {
        desired.add(card.id)
        const faceDown = holeHidden && i === 1
        const to = new THREE.Vector3(
          xCenter + (i - (n - 1) / 2) * FAN,
          CT / 2 + 0.012 + i * 0.006,
          z + i * CARD_STAGGER_Z,
        )

        let entry = this.cards.get(card.id)
        if (!entry) {
          const group = makeCard(card.rank, card.suit)
          group.position.copy(SHOE_POS)
          group.rotation.set(faceDown ? Math.PI : 0, -0.5, 0)
          this.scene.add(group)
          entry = {
            group,
            from: SHOE_POS.clone(),
            to,
            // Stagger each newly dealt card so a two-card deal reads as two actions.
            t: this.reducedMotion ? DEAL_DURATION : -dealtSoFar * DEAL_STAGGER,
            duration: DEAL_DURATION,
            yaw: (i - (n - 1) / 2) * 0.04,
            faceDown,
            flipT: FLIP_DURATION, // starts settled; only a CHANGE animates
            flipFrom: faceDown ? Math.PI : 0,
            landed: false,
          }
          this.cards.set(card.id, entry)
          dealtSoFar++
        } else {
          // An existing card can be re-seated (a split re-centres a hand). Re-arm the
          // travel from wherever it currently is rather than teleporting it.
          if (!entry.to.equals(to)) {
            entry.from.copy(entry.group.position)
            entry.to.copy(to)
            entry.t = this.reducedMotion ? entry.duration : 0
          }
          // The hole-card flip: only start one when the face state actually changes.
          if (entry.faceDown !== faceDown) {
            entry.flipFrom = entry.group.rotation.x
            entry.flipT = this.reducedMotion ? FLIP_DURATION : 0
            entry.faceDown = faceDown
          }
        }
        entry.yaw = (i - (n - 1) / 2) * 0.04
      })
    }

    layout(state.dealer, DEALER_Z, 0, state.holeHidden)
    const hands = state.playerHands
    hands.forEach((h, hi) => {
      layout(h.cards, PLAYER_Z, (hi - (hands.length - 1) / 2) * HAND_GAP, false)
    })

    // Cards that are gone: SWEEP them to the discard tray rather than deleting the mesh.
    // Deleting made a finished round blink out of existence with no punctuation — the
    // single most "unfinished" thing about the old table.
    let retireIndex = 0
    for (const [id, entry] of this.cards) {
      if (!desired.has(id)) {
        this.retiring.push({
          group: entry.group,
          from: entry.group.position.clone(),
          to: new THREE.Vector3(DISCARD_PROP_POS.x, 0.75, DISCARD_PROP_POS.z),
          t: this.reducedMotion ? DISCARD_DURATION : -retireIndex * DISCARD_STAGGER,
          yawFrom: entry.group.rotation.y,
          // A little tumble on the way out, so a swept hand looks collected, not shot.
          yawTo: entry.group.rotation.y + 0.7 + Math.random() * 0.6,
        })
        retireIndex++
        this.cards.delete(id)
      }
    }

    this.updateChips(state)

    // Drain the shoe and grow the discard tray as the session runs. `shoeRemaining` is
    // already tracked by the engine for its reshuffle policy, so this costs nothing and
    // makes the props read as part of a game in progress rather than scenery.
    const total = state.settings.decks * 52
    const remaining = Math.max(0, Math.min(total, state.shoeRemaining))
    this.props.setShoeFill(total > 0 ? remaining / total : 0)
    this.props.setDiscardFill(total > 0 ? 1 - remaining / total : 0)

    this.updatePayout(state)
  }

  /**
   * The payout (§9.4). A win used to be a text banner and nothing else — anticlimactic,
   * because the thing you actually won (chips) never appeared. Now the dealer pushes a
   * real stack across the felt to sit beside your bet, chip by chip, each with a clink.
   * Physical money arriving is the reward; the banner is just the caption.
   */
  private updatePayout(state: BJState): void {
    const won = state.phase === 'settle' && state.lastNet > 0

    if (!won) {
      // Any non-settle phase clears the stack, so the next round starts clean.
      if (this.payouts.length) {
        for (const c of this.payouts) this.scene.remove(c.mesh)
        this.payouts = []
      }
      this.payoutShown = false
      return
    }
    if (this.payoutShown) return
    this.payoutShown = true

    chipBreakdown(state.lastNet).forEach((denom: ChipValue, level: number) => {
      const mesh = makeChip(denom)
      const j = chipJitter()
      const to = new THREE.Vector3(PAYOUT_X + j.x, 0.02 + CHIP_H / 2 + level * CHIP_H, BET_Z + j.z)
      // Pushed across from the dealer's side — the direction sells who is paying whom.
      const from = new THREE.Vector3(PAYOUT_X * 0.4, 0.5, DEALER_Z + 0.5)
      mesh.position.copy(this.reducedMotion ? to : from)
      this.scene.add(mesh)
      this.payouts.push({
        mesh,
        from,
        to,
        t: this.reducedMotion ? PAYOUT_DURATION : -level * PAYOUT_STAGGER,
        duration: PAYOUT_DURATION,
        landed: false,
      })
    })
  }

  /** Shared easing for any chip in flight; fires its clink on impact. */
  private stepChips(list: ChipEntry[], dt: number): void {
    for (const c of list) {
      c.t += dt
      const t = clamp01(c.t / c.duration)
      if (t > 0) {
        arcPosition(c.from, c.to, easeOutCubic(t), 0.3, this.scratch)
        c.mesh.position.copy(this.scratch)
      }
      if (!c.landed && t >= 1) {
        c.landed = true
        this.sfx.chipLand()
      }
    }
  }

  private updateChips(state: BJState): void {
    const amount =
      state.phase === 'betting' ? state.bet : state.playerHands.reduce((s, h) => s + h.bet, 0)
    if (amount === this.lastBet) return
    this.lastBet = amount

    for (const c of this.chips) {
      this.scene.remove(c.mesh)
    }
    this.chips = []

    chipBreakdown(amount).forEach((denom: ChipValue, level: number) => {
      const mesh = makeChip(denom)
      const j = chipJitter()
      const to = new THREE.Vector3(j.x, 0.02 + CHIP_H / 2 + level * CHIP_H, BET_Z + j.z)
      const from = new THREE.Vector3(to.x + 0.35, 3.2 + level * 0.25, to.z - 0.5)
      mesh.position.copy(this.reducedMotion ? to : from)
      this.scene.add(mesh)
      this.chips.push({
        mesh,
        from,
        to,
        t: this.reducedMotion ? CHIP_DURATION : -level * CHIP_STAGGER,
        duration: CHIP_DURATION,
        landed: false,
      })
    })
  }

  // --- render loop --------------------------------------------------------------

  private loop(): void {
    if (this.disposed) return
    const dt = Math.min(0.05, this.clock.getDelta()) // clamp: a background tab can hand
    // back a multi-second delta and teleport everything
    const elapsed = this.clock.elapsedTime

    for (const e of this.cards.values()) {
      e.t += dt
      const t = clamp01(e.t / e.duration)
      if (t > 0) {
        // dealEase overshoots slightly and settles back, so the card skids to a stop on
        // the felt instead of snapping to its seat.
        arcPosition(e.from, e.to, dealEase(t), DEAL_ARC_LIFT * (1 - t * 0.15), this.scratch)
        e.group.position.copy(this.scratch)
      }

      // Yaw: spin through the flight, then settle to the fanned angle. A card that
      // glides at a fixed angle looks slid; one that turns as it travels looks thrown.
      const spin = t > 0 && t < 1 ? Math.sin(Math.PI * t) * DEAL_SPIN : 0
      e.group.rotation.y += (e.yaw + spin - e.group.rotation.y) * Math.min(1, dt * 11)

      if (!e.landed && t >= 1) {
        e.landed = true
        this.sfx.cardLand()
      }

      if (e.flipT < FLIP_DURATION) {
        e.flipT += dt
        const ft = clamp01(e.flipT / FLIP_DURATION)
        const target = e.faceDown ? Math.PI : 0
        e.group.rotation.x = e.flipFrom + (target - e.flipFrom) * easeInOutCubic(ft)
        // Lift through the turn — without it a flip reads as a spin (§9.2).
        e.group.position.y += Math.sin(ft * Math.PI) * FLIP_LIFT
      }
    }

    // Cards being swept off to the discard tray. Iterated backwards so finished ones can
    // be spliced out without skipping the next element.
    for (let i = this.retiring.length - 1; i >= 0; i--) {
      const r = this.retiring[i]
      r.t += dt
      const t = clamp01(r.t / DISCARD_DURATION)
      if (t > 0) {
        arcPosition(r.from, r.to, easeInOutCubic(t), DISCARD_ARC_LIFT, this.scratch)
        r.group.position.copy(this.scratch)
        r.group.rotation.y = r.yawFrom + (r.yawTo - r.yawFrom) * t
        // Shrink away over the last 25% so the card visually joins the tray's stack
        // rather than popping out of existence on top of it.
        const fade = t > 0.75 ? 1 - (t - 0.75) / 0.25 : 1
        r.group.scale.setScalar(Math.max(0.02, fade))
      }
      if (t >= 1) {
        this.scene.remove(r.group)
        disposeCard(r.group)
        this.retiring.splice(i, 1)
      }
    }

    this.stepChips(this.chips, dt)
    this.stepChips(this.payouts, dt)

    driftCamera(this.camera, elapsed, !this.reducedMotion)
    this.renderer.render(this.scene, this.camera)
    this.raf = requestAnimationFrame(this.loop)
  }

  private resize(): void {
    const w = Math.max(1, this.container.clientWidth)
    const h = Math.max(1, this.container.clientHeight)
    this.renderer.setSize(w, h)
    // Re-solve the framing — a hard-coded camera position breaks the moment the stage
    // aspect changes (modal vs pane vs resized window). See camera.ts.
    fitCamera(this.camera, w / h)
  }

  dispose(): void {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.ro.disconnect()
    for (const entry of this.cards.values()) disposeCard(entry.group)
    this.cards.clear()
    this.chips = []
    this.lights.dispose()
    disposeCardGeometry()
    disposeChipResources()
    disposeCardTextures()
    disposeChipTextures()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
