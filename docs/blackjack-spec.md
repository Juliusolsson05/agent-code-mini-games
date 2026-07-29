# Blackjack — Steam-worthy rebuild specification

Status: **authoritative**. This is the contract the rebuild is built against. Where the
code and this document disagree, this document is the bug report.

---

## 0. Why this document exists

The first three attempts at a 3D blackjack table shipped visuals that were rejected as
"absolutely shit", "vibecoded", and "a shitty browser game". Each round I changed values
by feel, could not see the result, and asked the user to be my renderer. That loop cost
five rounds and produced three regressions.

This spec fixes the *process* as well as the artifact:

1. **Numbers, not vibes.** Every light intensity, camera angle, and material roughness
   below is derived from the actual shading math (§4, §5) or from a framing calculation
   (§4.2), not chosen by eye.
2. **I can see now.** A headless-Chrome screenshot harness (§13) renders the scene to a
   PNG I can read. No more tuning blind. Any change to §4–§8 must be screenshot-verified
   before it is shown to the user.
3. **Root causes, not symptoms.** §2 is a post-mortem. Three of the four defects had a
   specific technical cause that value-tweaking could never have fixed.

---

## 1. Goals

### 1.1 What "Steam-worthy" means, concretely

Not "more effects". The target is a game that looks *deliberately art-directed*. Five
testable properties:

| Property | Test |
| --- | --- |
| **Readable** | Every card rank/suit is legible at rest, at 860×620, without zooming. No blown highlights anywhere on the felt. |
| **Grounded** | Every object casts a contact shadow. Nothing floats. The table is an object in a room, not a plane in a void. |
| **Calm** | A still frame has one focal point (the felt). No competing glows, no rainbow lighting, no bloom on diffuse surfaces. |
| **Tactile** | Chips stack with imperfect alignment; cards have thickness and a white edge; the rail has a soft highlight roll. |
| **Consistent** | One warm key direction. One accent hue (casino gold). Felt green is a single family, not three. |

### 1.2 Non-goals

- **No orbit controls / free camera.** One fixed, framed shot. A user-controllable camera
  invites bad angles and doubles the framing work.
- **No physics engine.** Chip and card motion is scripted easing (§9). Rigid-body
  simulation is a large dependency for motion nobody will inspect frame-by-frame.
- **No photoreal PBR chase.** We have no HDRI, no scanned textures, and a CSP that forbids
  loading binary assets (§7.1). Procedural + SVG, art-directed, is the ceiling — and it is
  a high ceiling.
- **No multiplayer, no side bets, no card counting trainer.** Out of scope.

---

## 2. Post-mortem: what was actually broken

### 2.1 Blank white cards — a missing XML namespace

`cardTexture.tsx` rendered the React card SVG to a string, wrapped it in a
`data:image/svg+xml` URI, and loaded it through `new Image()`.

**`renderToStaticMarkup` does not emit `xmlns` on the root `<svg>`** — in the DOM the
namespace is implied, so React omits it. But an image decoder parses the data URI as a
standalone XML document, where the namespace is mandatory. The decode failed silently:
`onload` never fired, `tex.needsUpdate` was never set, and every card stayed the blank
white canvas base the texture was initialised with.

> **This bug has a second form, found during implementation.** The first fix spliced the
> attributes in with `replace('<svg ', '<svg xmlns=… width=… height=… ')`. Any component
> that *already* declares `width`/`height` — `ChipFace`, `TableLogo` — then emitted
> **duplicate attributes**, which is likewise an XML parse error and likewise fails
> silently. Symptom: card faces (no width/height in the component) rendered perfectly
> while chip faces and the felt legend came out as bare base paint — a solid red disc and
> an empty green felt. The pipeline must therefore **strip existing `width`/`height`/
> `xmlns` from the root tag and then inject**, never splice. Both forms are one test
> (§13.3).

No amount of lighting work would ever have fixed this. **Fixed** by injecting
`xmlns="http://www.w3.org/2000/svg"` before encoding. This is now a permanent requirement
in §7.2 and must be covered by a test (§13.3).

### 2.2 Glare everywhere — bloom operating on pre-tone-mapped HDR

The critical insight, and the reason two rounds of threshold-tweaking failed:

When `EffectComposer` is used, `RenderPass` renders into a **HalfFloat render target**.
three.js applies tone mapping only when rendering to the default framebuffer —
`WebGLRenderer` forces `NoToneMapping` when `_currentRenderTarget !== null`, and
`OutputPass` performs the tone map at the very end of the chain instead.

Consequence: **`UnrealBloomPass` sees raw linear HDR values, not the 0–1 display image.**
A threshold of `1.0` is not "only very bright things"; it is "anything whose linear
radiance exceeds 1.0", which on this table included ordinary diffuse-lit white objects.

Working the numbers for a white chip face (albedo ≈ 0.95, normal +Y), with three.js
physical units where diffuse `= dotNL · lightColor · intensity · albedo / π`:

| Contribution | Value |
| --- | --- |
| Key directional (1.35, dotNL 0.82) | 0.34 |
| Image-based ambient (RoomEnvironment, `environmentIntensity` 0.55) | 0.26 – 0.78 |
| Hemisphere fill (0.25) | 0.13 |
| Overhead spot (1.6, decay 0.6, d≈11.2) | 0.11 |
| **Diffuse subtotal** | **0.84 – 1.36** |
| **GGX specular** at roughness 0.42, camera *and* key both above the table → the specular lobe points straight at the viewer | **spikes well past 1.0** |

So white objects crossed the threshold on diffuse alone, and the near-mirror specular
guaranteed it. Every white card and the $1 chip self-glowed with a halo.

**Resolution — remove the composer entirely** (§3.2). Direct-to-canvas rendering means
tone mapping is applied by the renderer as designed, and there is no HDR buffer for a
bloom pass to misread. Glow returns as additive sprites on actual light sources (§6.3),
which is art-directed rather than emergent. Glare becomes *structurally impossible*
rather than tuned-away.

### 2.3 "Perspective is annoying / fucked" — a wide lens too close

The camera was a 46° FOV at ~13 units. A wide lens close to a large flat subject produces
strong perspective divergence: near cards balloon, the far rail shears away, and the felt
plane converges hard. Reading two hands at opposite ends of that frame is genuinely
uncomfortable.

**Resolution:** a long lens far away (§4). A 30° FOV at ~25 units compresses depth toward
orthographic. The table reads flat and legible while remaining real 3D. Requested framing
is explicitly **bird's-eye with a slight angle** — ~17° off vertical (§4.1).

### 2.4 "Nothing looks 3D" — no room, no bulk, no contact

The table was two flat planes floating in `#000`. There was no floor, no wall, no light
source visible in frame, and the table had no side faces, so nothing communicated depth.
**Resolution:** §6 (room) and §8.1 (a table with real thickness, rail, and trim).

---

## 3. Rendering architecture

### 3.1 Stack

- **three.js r0.169** (already a dependency). WebGL2.
- No post-processing framework. No physics. No loaders (nothing to load — §7.1).

### 3.2 Pipeline (deliberately minimal)

```
scene ──► WebGLRenderer (antialias: true, MSAA)
             │  toneMapping = ACESFilmic, exposure 1.0
             │  outputColorSpace = SRGB   (three.js default)
             │  shadowMap = PCFSoft
             ▼
          canvas  ──►  CSS vignette overlay (.bj-stage::after)
```

**Rationale for no `EffectComposer`:**

1. It caused §2.2. Direct rendering makes the bug unrepresentable.
2. `antialias: true` MSAA works on the default framebuffer. An `EffectComposer` render
   target loses it unless `samples` is set explicitly — a second footgun.
3. A vignette is a radial gradient. Doing it in CSS costs zero GPU passes, zero shader
   code, and cannot interact with color space or tone mapping.
4. The only effect we actually wanted from bloom — glowing lamps — is better done as
   art-directed additive sprites (§6.3), which look correct at any exposure.

**Renderer settings (normative):**

| Setting | Value | Why |
| --- | --- | --- |
| `antialias` | `true` | MSAA; card edges are the most aliasing-prone thing on screen |
| `alpha` | `true` | the stage's CSS gradient shows through beyond the room |
| `toneMapping` | `ACESFilmicToneMapping` | filmic highlight roll-off; keeps speculars from clipping to flat white |
| `toneMappingExposure` | `1.0` | §5 intensities are calibrated at exactly this exposure |
| `shadowMap.type` | `PCFSoftShadowMap` | soft contact shadows; hard shadows read as cheap |
| `setPixelRatio` | `min(devicePixelRatio, 2)` | retina crispness, capped for fill-rate |

---

## 4. Camera

### 4.1 Angle — bird's-eye with a slight tilt

Fixed. Looks at table centre `(0, 0, 0)`.

| Parameter | Value |
| --- | --- |
| Elevation from horizontal | **73°** (i.e. **17° off vertical**) |
| Azimuth | 0 (straight down +Z, the player's side) |
| FOV (vertical) | **30°** |
| Up vector | world +Y |

Camera position is derived, never hard-coded:

```
position = target + distance · (0, sin 73°, cos 73°)
         = target + distance · (0, 0.956, 0.292)
```

### 4.2 Distance — computed to fit, never guessed

Hard-coding a position breaks the moment the stage aspect changes (panel vs modal vs a
resized window). Distance is solved at construction *and on every resize* so the table
always fills the frame with a consistent margin.

Given half-extents to frame `halfW = TABLE_W/2`, `halfD = TABLE_D/2 · sin(73°)` (depth is
foreshortened by the tilt), a `MARGIN` of 1.06, and viewport `aspect`:

```
needH = max( halfD · MARGIN , (halfW · MARGIN) / aspect )
distance = needH / tan(FOV/2)
```

Worked example at the default 860×620 stage (aspect 1.387, TABLE_W 17.6, TABLE_D 11.6):

```
halfW = 8.80 → 9.33 with margin → /1.387 = 6.73
halfD = 5.80 · 0.956 = 5.54 → 5.88 with margin
needH = 6.73                       (width-constrained)
distance = 6.73 / tan(15°) = 6.73 / 0.2679 = 25.1
position ≈ (0, 24.0, 7.3)
```

A 30° lens at 25 units is a long lens: the table subtends a small angle, so perspective
divergence across it is minimal — near-orthographic, which is precisely the readable
bird's-eye look requested, while still being genuine 3D with real shadows and thickness.

`near = 1`, `far = 200`.

### 4.3 Idle motion — REMOVED

> **Superseded.** The spec originally called for a slow parallax drift so a still table
> wouldn't be a dead image. In practice the constant re-aim read as **the whole table
> slowly rotating under the player** — disorienting on a game you stare at for minutes,
> and directly opposed to the stable, near-orthographic read the long lens was chosen to
> deliver.

**The camera is locked off.** It is set once by `fitCamera()` and moves only on resize.
All motion on screen comes from the cards and chips, never the lens.

---

## 5. Lighting

### 5.1 Calibration rule (normative)

> **The brightest diffuse surface in the scene (a white card face, albedo ≈ 0.95, normal
> +Y) must land at linear luminance ≈ 0.80–0.90 before tone mapping.**

At exposure 1.0, ACES maps 0.85 linear to roughly 0.87 sRGB — a clean paper white with
headroom left, so specular highlights have somewhere to go instead of clipping. This rule
is what makes glare impossible; §2.2 happened because nothing enforced it.

Using `diffuse = dotNL · intensity · albedo / π` for directional/spot, and
`envColor · environmentIntensity · albedo` for image-based:

| Light | Type | Colour | Intensity | Contribution to the white card |
| --- | --- | --- | --- | --- |
| Key | Directional, from `(4, 12, 6.5)`, casts shadows | `0xffe9c8` | **1.5** | 0.37 |
| Ambient IBL | `RoomEnvironment` via PMREM, `environmentIntensity` | — | **0.28** | ~0.26 |
| Fill | Hemisphere sky `0xbfd0e6` / ground `0x140b08` | — | **0.22** | 0.11 |
| Rim | Directional, from `(-6, 5, -9)`, no shadow | `0x8fb6ff` | **0.45** | ~0.06 (edges only) |
| Lamp pool | Spot, `(0, 11, 1.0)`, angle π/5.2, penumbra 0.95, decay 0.6 | `0xffdca6` | **0.9** | 0.06 |
| | | | **Total** | **≈ 0.86** ✅ |

### 5.2 Specular discipline

Diffuse calibration alone is insufficient — §2.2's blowout was specular. Because the
camera and the key light are *both* above a horizontal table, the mirror direction points
at the viewer and a low-roughness surface produces a large GGX spike.

Therefore **no horizontal surface may have `roughness < 0.55`** (§8.4). Cards sit at 0.62,
chip faces at 0.58, felt at 0.98. The rail is the one glossier surface (0.45) and it is
*vertical-ish*, so its lobe points away from camera and reads as a tasteful edge roll.

`envMapIntensity` is likewise capped at 0.45 on table-top objects.

### 5.3 Shadows

Only the key casts. One shadow-casting light keeps the shadow direction unambiguous
(multiple casters read as "video game") and costs one shadow map.

| Setting | Value |
| --- | --- |
| `mapSize` | 2048² |
| Ortho frustum | ±12.5 (tight around the table; a loose frustum wastes texel density) |
| `bias` | −0.0004 |
| `normalBias` | 0.02 |
| `radius` | 4 (PCF softness) |
| `near` / `far` | 1 / 46 |

Cards and chips `castShadow` **and** `receiveShadow` (a card must shadow the card beneath
it — that overlap shadow is most of what sells a fanned hand as 3D).

---

## 6. The room

The table must sit in a place. Everything here is dim by design; it frames the table
without competing for attention.

### 6.1 Backdrop

Vertical gradient painted into a 4×512 canvas, used as `scene.background`:
`#04050a` (top) → `#0a0910` (55%) → `#181013` (bottom, faint warm floor bounce). Cheaper
and softer than geometry, and it eliminates the flat black that read as "unfinished".

### 6.2 Floor

120×120 plane at `y = −(TABLE_H + 0.35)`, dark oxblood carpet `#120a0d`, roughness 0.85,
`envMapIntensity` 0.3, `receiveShadow`. Catches the table's shadow and grounds it.

### 6.3 NO overhead fixture — corrected during implementation

> **Superseded.** The original §6.3 hung a lamp above the table and §6.4 scattered bokeh
> 30–40 units behind it. Both were wrong, for a geometric reason the spec missed:
>
> At 17° off vertical the camera sits at **y ≈ 24**, well above a lamp at y ≈ 12.5 — so it
> looks straight down *through* the fixture. The shade rendered as a **huge black arc
> occluding the felt** and hiding the house legend entirely. The distant bokeh sat ~50°
> off the view axis, outside a 30° frustum: invisible, pure cost.

**The rule that replaces them:** from a near-top-down camera you see the table and the
floor around it — that is the whole set. **Nothing may be placed between y = 0 and the
camera**, and anything meant to be seen must lie flat enough to read from above.

The overhead light is still *implied* by the warm key and the spot's pool on the felt
(§5.1). We never show the fixture, exactly as a top-down product shot never shows the
softbox.

### 6.4 Floor light pools

Five additive quads lying **flat on the carpet**, just outside the table's footprint, in
muted casino hues (amber, gold, rose, one cool blue far behind for separation). Read from
a top-down camera as spill from off-screen fixtures — the cue that says "this table is in
a lit room" without putting geometry in front of the lens.

Additive + `depthWrite: false`, so they can never occlude. **This is the bloom
replacement:** authored glow that appears only where placed, and cannot discover a white
card and halo it.

---

## 7. Assets

### 7.1 Constraint: everything is generated at runtime

The extension runs in a sandboxed iframe under a strict CSP. **No binary asset may be
fetched** — no PNG, no KTX2, no HDRI, no font file, no audio file. Permitted: inline SVG,
`data:` URIs for images, `<canvas>` drawing, and Web Audio synthesis.

This is a hard constraint, and it is also the art direction. Two asset pipelines:

| Pipeline | Used for | Why |
| --- | --- | --- |
| **SVG → texture** (§7.2) | card faces, card backs, chip faces, table logo | Vector art; crisp at any resolution; authored as React components; reusable as DOM for the 2D HUD |
| **Canvas 2D → texture** (§7.3) | felt, wood, leather, noise/normal maps | Procedural, stochastic, tileable; SVG is the wrong tool for grain |

### 7.2 SVG assets

Authored as React components under `src/assets/svg/`, rendered with
`renderToStaticMarkup`, then rasterised. **Each is used in both worlds**: as a real
`<svg>` in the HUD, and as a texture in the 3D scene. One source of truth for the art.

#### 7.2.1 The SVG → texture pipeline (normative)

```
React component
  → renderToStaticMarkup(...)                  → SVG string
  → inject xmlns + explicit width/height        → §2.1; MANDATORY
  → data:image/svg+xml;charset=utf-8,<encoded>  → encodeURIComponent, not base64
  → new Image(); await decode()                 → prefer decode() over onload
  → drawImage into an offscreen canvas
  → THREE.CanvasTexture
       colorSpace = SRGBColorSpace              → art is authored in sRGB
       anisotropy = min(16, caps.max)           → cards are viewed at a steep angle
       generateMipmaps = true                   → they are minified on screen
```

Rules:
- **`xmlns` is mandatory.** Its absence is a silent total failure (§2.1).
- **Explicit `width`/`height`** on the root. A `viewBox` alone rasterises at an
  implementation-defined size.
- **No external references.** No `<image href>`, no webfonts, no CSS `url()`. Only
  generic families (`Georgia, serif`) that are guaranteed present.
- **Cache per key.** `${rank}${suit}` for faces; a single key for the back. A 6-deck shoe
  is 312 cards but only **53** distinct textures.
- **Textures are async.** The card mesh must render acceptably before its texture decodes
  — the base canvas is pre-filled with card-stock white so an undecoded card is a blank
  white card, never a black or magenta one.

#### 7.2.2 Card face — `assets/svg/CardFace.tsx`

- Canvas `viewBox="0 0 100 140"` (the 1:1.4 poker ratio; matches `CW`/`CH`).
- Rounded rect `rx=9`, fill `#fdfdfb`, hairline border `rgba(20,20,30,0.14)`.
- **Corner index**: rank in Georgia 800 + suit pip beneath, top-left; a 180°-rotated copy
  bottom-right. `10` is rendered a size smaller so it does not crowd.
- **Centre art**:
  - `A` — single 46 px suit pip.
  - `2`–`10` — classic pip layouts from `pips.ts`; any pip below y=70 is drawn rotated
    180°, exactly as a real deck does.
  - `J`/`Q`/`K` — a typographic court: tinted rounded panel, suit pip above, 42 px serif
    letter, inverted suit pip below. Deliberately *not* faux courtly illustration, which
    at 50 px on screen reads as mud.
- **Colour**: hearts/diamonds `#c62a3f`, clubs/spades `#20232b`. Never pure `#000` — pure
  black on white is the harshest possible contrast and reads as clip-art.
- Rasterised at **512×717**, anisotropy 16.

#### 7.2.3 Card back — `assets/svg/CardBack.tsx`

Deep red `#a11228` panel, inner panel `#8d0f22`, double hairline border in `#f6dade`,
centred medallion with a spade pip. Plain-but-rich: a busy lattice moirés badly when
minified and makes a fan of face-down cards read as noise.

#### 7.2.4 Chip face — `assets/svg/ChipFace.tsx`

Parameterised by denomination. Edge ring, six edge stripes (dashed stroke), inner disc,
dashed inner ring, denomination in 800-weight system sans.

**Single source of truth for colour: `src/shared/chipPalette.ts`.** The palette is
currently duplicated between `chips/Chip.tsx` (HUD) and `three/procTextures.ts` (3D) — two
copies that can drift, and an opportunistic fix in this rebuild.

| Denom | Base | Edge | Text |
| --- | --- | --- | --- |
| 1 | `#eef1f5` | `#c3cbd6` | `#2a2f3a` |
| 5 | `#d6363b` | `#f4b8ba` | `#ffffff` |
| 25 | `#2f9e57` | `#bce7cd` | `#ffffff` |
| 100 | `#2b2f38` | `#8791a0` | `#ffffff` |
| 500 | `#7b3fb2` | `#d6bcee` | `#ffffff` |

> Note the $1 chip is near-white and was the worst glare offender (§2.2). Under §5.1 it is
> now correctly exposed; its material roughness is additionally floored at 0.58 (§5.2).

#### 7.2.5 Table logo — `assets/svg/TableLogo.tsx`

The house legend baked into the felt (§7.3.1): "BLACKJACK PAYS 3 TO 2" / "DEALER MUST
STAND ON 17" / "INSURANCE PAYS 2 TO 1", plus the betting circle. Authored as SVG rather
than `ctx.fillText` so the type is properly kerned and can be positioned precisely against
the felt's UV space (§7.3.1) instead of hand-tuned canvas offsets.

### 7.3 Procedural canvas assets

#### 7.3.1 Felt — `scene/textures/felt.ts`

- **Non-square canvas, 2048×1264**, matching `FELT_W:FELT_D` = 15.2:9.4 ≈ 1.62. The old
  square canvas on a non-square plane is why the house text looked horizontally stretched
  in every screenshot.
- Base: radial gradient `#1f8a54` → `#136a41` → `#0c4a2c`, centre biased upward.
- Edge darkening: multiply vignette toward the border, so the felt does not read as a flat
  swatch under an even key.
- Grain: per-pixel ±12 luma noise.
- Legend + betting circle composited from `TableLogo.tsx` (§7.2.5).

**UV ↔ world mapping (normative).** The felt is a `PlaneGeometry` rotated −90° about X, so
for a point at world `(x, 0, z)`:

```
u = (x + FELT_W/2) / FELT_W
v = 0.5 − z / FELT_D
canvasY = (1 − v) · canvasHeight        // CanvasTexture flipY = true
```

Every painted element must be positioned through this mapping, not eyeballed. The betting
circle at `BET_Z` must sit exactly under the chip stack; a hand-tuned offset silently
breaks the moment `FELT_D` changes.

#### 7.3.2 Felt normal map

256² tileable value noise, `repeat(12, 12)`, `normalScale` 0.35. Fine cloth weave that
catches the grazing key. Larger scale reads as sandpaper.

#### 7.3.3 Wood — `scene/textures/wood.ts`

1024×128 vertical gradient `#4a2e1c` → `#35200f` → `#22140a` with ~70 bezier grain
streaks at randomised alpha. `RepeatWrapping`, `repeat(2, 2)`.

#### 7.3.4 Leather — `scene/textures/leather.ts`

Dark oxblood `#2a1416` base with fine pebble noise and a subtle normal map. Used on the
rail (§8.1).

#### 7.3.5 Glow sprite — `scene/textures/glow.ts`

256² radial gradient, white centre → transparent edge, with a slightly non-linear falloff
(`pow(1-r, 2.2)`) so it reads as a real light rather than a soft ball. Additive,
`depthWrite: false`. Shared by the lamp and all bokeh (§6.3, §6.4).

---

## 8. Geometry

### 8.1 Table — `scene/objects/table.ts`

Three parts, real thickness:

| Part | Geometry | Notes |
| --- | --- | --- |
| **Body** | `BoxGeometry(17.6, 0.9, 11.6)` | top face just under the felt; casts + receives |
| **Felt** | `PlaneGeometry(15.2, 9.4)` at `y = 0` | the play surface; **`y = 0` is the datum for everything** |
| **Rail** | rounded-rect ring, `ExtrudeGeometry`, depth 0.42, bevel 0.16 | padded leather bumper; the bevel is what produces the highlight roll |
| **Trim** | thin torus-ish ring between felt and rail, brass `#c9a227`, roughness 0.35 | the premium detail that reads as "real table" |

The rail is traced as a rounded rectangle with a rounded-rect hole (the felt window), then
`rotateX(−π/2)` so the extrusion becomes height.

### 8.2 Card — `scene/objects/card.ts`

Cards are the hero asset and get the most geometry budget.

**Construction — rounded stock + two decal planes.** A plain `BoxGeometry` has square
corners; a single `ExtrudeGeometry` cannot carry different front/back textures (its cap
faces share one material group). So:

1. **Stock** — rounded-rect `ExtrudeGeometry`, `CW × CH`, depth `CT = 0.022`, small bevel.
   Card-stock white `#f4f2ea`, roughness 0.62.
2. **Face decal** — `PlaneGeometry` at `+CT/2 + 0.0008`, clean 0→1 UVs, face texture.
3. **Back decal** — `PlaneGeometry` at `−CT/2 − 0.0008`, back texture.

The rounded white stock shows as a hairline margin around the print — which is exactly how
a real card looks — and both decals get trivially correct UVs. `polygonOffset` on the
decals guards against z-fighting.

Face on **+Y**, back on **−Y**: a face-down card is `rotation.x = π`, and the hole-card
flip is a single-axis animation (§9.2).

### 8.3 Chip — `scene/objects/chip.ts`

`CylinderGeometry(0.46, 0.46, 0.13, 40)`. Materials `[side, top, bottom]`.

**Realism detail:** each chip in a stack gets a random yaw (±0.25 rad) and a ≤0.01
positional jitter. Perfectly aligned stacks are the single clearest "this is a computer"
tell.

Materials are **cached per denomination** and shared across every chip — a stack is a dozen
meshes and regenerating textures per chip would thrash. Geometry is per-chip so removal can
free it without touching shared materials.

### 8.4 Material table (normative)

| Surface | Roughness | Metalness | `envMapIntensity` |
| --- | --- | --- | --- |
| Felt | 0.98 | 0 | 0.25 |
| Card stock / face / back | 0.62 | 0 | 0.40 |
| Chip face / edge | 0.58 | 0 | 0.45 |
| Rail leather | 0.45 | 0 | 0.70 |
| Wood body | 0.42 | 0.05 | 0.55 |
| Brass trim | 0.35 | 0.9 | 0.9 |
| Floor carpet | 0.85 | 0 | 0.30 |

Roughness floors are enforced by §5.2, not taste.

### 8.5 Props — `scene/objects/props.ts`

Small, static, and load-bearing for believability:

- **Dealing shoe** — wedge box at `(6.3, ·, −3.2)`, dark acrylic. Cards animate *from* it
  (§9.1), which is what makes the deal read as real.
- **Discard tray** — shallow open box at `(−6.3, ·, −3.2)`.

---

## 9. Animation

All motion is scripted easing in the render loop. State changes are declarative: `update
(state)` sets *targets*, the loop moves meshes toward them. Never animate by mutating game
state on a timer.

### 9.1 Deal

Card spawns at the shoe (`SHOE = (7.0, 2.4, −3.8)`) with a yaw offset, then travels to its
seat on a **parabolic arc** (lift ~0.9 at the midpoint) over ~340 ms, `easeOutCubic`,
landing with a ~40 ms settle overshoot. Sequential cards stagger by ~120 ms.

Current implementation uses a per-frame `position.lerp(target, 0.16)`, which is
frame-rate-dependent and has no arc. Replace with an explicit normalised `t` per card and
a fixed duration.

### 9.2 Hole-card flip

`rotation.x: π → 0` over ~380 ms with a simultaneous ~0.35 lift, `easeInOutCubic`. The lift
is what makes it read as a flip rather than a spin.

### 9.3 Chip toss

Chips drop from `y = 4 + level` with a slight arc and a ~90 ms per-chip stagger, easing to
rest. Landing triggers the chip clink (§10).

### 9.4 Outcome

- **Win** — chips brighten via a brief emissive pulse on the payout stack (not a bloom
  spike, §2.2); win chips slide in from the dealer's tray.
- **Blackjack** — a slow gold sparkle sprite burst above the hand, ≤1.2 s.
- **Bust** — the hand desaturates and slides ~0.3 toward the discard tray.

### 9.5 Reduced motion

`prefers-reduced-motion: reduce` → all durations collapse to 0 (instant snap), idle camera
drift disabled. The game must remain fully playable.

---

## 10. Audio

Already synthesized via Web Audio (`src/audio.ts`) because the CSP forbids audio files.
Retained as-is; it is good. Two additions:

- **Chip clink triggered per chip on landing** (§9.3) rather than once per bet change, with
  ±6% random pitch so a stack of five is not five identical clicks.
- **Card swish** likewise pitch-jittered per card.

A master gain node so mute is a single ramp rather than a per-voice check.

---

## 11. UI / HUD

2D DOM overlaid on the canvas — text must be real text, never rendered in WebGL, for
crispness and accessibility.

| Element | Position | Notes |
| --- | --- | --- |
| Back / bankroll | top-left | bankroll uses tabular numerals so it does not jitter when it changes |
| Stats / mute / settings | top-right | icon buttons, 44 px min hit target |
| Hand readout | above the action bar | "Dealer 3 + ?" / "You 20"; soft = "7/17" |
| Action bar | bottom-centre | Hit / Stand / Double / Split; disabled states must be visibly distinct, not just dimmed |
| Bet rail | bottom, betting phase | SVG chips (§7.2.4) + Clear + Deal |
| Banner | centre | outcome message; auto-dismiss on next action |

**Contrast (from the earlier "vibecoded" fix — retained as a rule):** off-white text
`#ececf1` not pure white; muted `#a0a0ab`; never near-black backgrounds; exactly one gold
accent `#e8c23f`; 8 px spacing rhythm; all body text ≥ WCAG AA on its background.

The CSS vignette (§3.2) lives here as `.bj-stage::after`, `pointer-events: none`.

---

## 12. Directory conventions

Current layout has a 330-line `scene.ts` doing camera + lights + materials + geometry +
reconcile, a `three/` folder mixing textures with objects, a duplicated chip palette, and
dead code (`src/table/Table.tsx` is unreferenced). Target:

```
src/
  shared/
    chipPalette.ts              single source of truth for chip colours (§7.2.4)
  assets/
    svg/
      CardFace.tsx              §7.2.2  ─┐
      CardBack.tsx              §7.2.3   │ authored once,
      ChipFace.tsx              §7.2.4   │ used as DOM *and* texture
      TableLogo.tsx             §7.2.5  ─┘
      suits.tsx                 suit glyph paths + <Pip>
      pips.ts                   pip layouts for 2–10
  games/blackjack/
    index.ts                    barrel
    Blackjack.tsx               React shell: mounts scene, renders HUD
    useBlackjack.ts             owns one BlackjackGame, mirrors state
    engine/
      index.ts
      types.ts                  Card, Phase, PlayerHand, Stats, Settings, BJState
      rules.ts                  handValue, cardRankValue, canDouble/canSplit predicates
      shoe.ts                   buildShoe, shuffle, reshuffle policy
      game.ts                   BlackjackGame — the state machine
    scene/
      index.ts                  BlackjackScene — orchestrator ONLY (renderer, loop, reconcile)
      world.ts                  all world constants; single source of truth
      camera.ts                 §4, including fitCamera()
      lighting.ts               §5
      room.ts                   §6
      materials.ts              §8.4
      animation.ts              §9 easing + arc helpers
      objects/
        table.ts                §8.1
        card.ts                 §8.2
        chip.ts                 §8.3
        props.ts                §8.5
      textures/
        index.ts
        svgTexture.ts           §7.2.1 pipeline — the xmlns fix lives here, once
        cardTextures.ts         face/back cache
        chipTextures.ts
        felt.ts                 §7.3.1
        wood.ts                 §7.3.3
        leather.ts              §7.3.4
        glow.ts                 §7.3.5
    ui/
      Hud.tsx                   top bar
      ActionBar.tsx
      BetRail.tsx
      Readout.tsx
      Banner.tsx
      SettingsPanel.tsx
```

Conventions:
1. **One concern per file.** `scene/index.ts` may not contain a light, a material, or a
   colour literal.
2. **`world.ts` is the only place dimensions live.** No magic numbers in object files.
3. **Assets are shared.** If art appears in both the HUD and the 3D scene it is authored
   once in `assets/svg/` — this is what kills the duplicated chip palette.
4. **Textures never import from `objects/`,** objects never import from `scene/index.ts`.
   Dependencies point inward.
5. **Thick WHY comments** per the repo policy: why this approach over the obvious one, what
   constraint forced it, what breaks if an invariant is violated. §2's four defects each
   become a comment at the site that would otherwise regress.

**Deletions:** `src/table/Table.tsx` (dead), `src/games/blackjack/three/` (superseded),
duplicated palette in `procTextures.ts`.

---

## 13. Verification

### 13.1 Dev harness

`npm run dev:web` → Vite dev server, `/dev/` mounts the real extension against a stubbed
host API (storage → `localStorage`). Live reload: React components hot-patch; the
imperative scene fast-reloads.

### 13.2 Scene lab + screenshots

`/dev/lab.html` mounts `BlackjackScene` alone with a canned dealt state — no React, no
audio, no engine timers — so a render is deterministic.

`node dev/shot.mjs <url> <out.png> [delayMs]` drives headless Chrome over the DevTools
Protocol and captures after a real wall-clock delay (async SVG textures must decode; the
`--screenshot` flag fires at load and captures a blank frame, and `--virtual-time-budget`
deadlocks against `requestAnimationFrame`). WebGL works headless via SwiftShader.

**Rule: no visual change is reported to the user until it has been screenshot-verified.**

### 13.3 Tests

Minimal but non-zero, targeted at the things that failed silently:

- `svgTexture` injects `xmlns` and produces a non-blank canvas (§2.1).
- Felt UV↔world mapping round-trips (§7.3.1).
- `fitCamera` frames the table at 4:3, 16:9, and 1:1 without clipping (§4.2).
- `handValue` soft/hard totals, blackjack vs 21, split-ace rules (existing engine).

### 13.4 Performance budget

860×620 @ dpr 2, target 60 fps: ≤ 120 draw calls, ≤ 60 k triangles, one shadow map,
≤ 55 textures resident (53 card faces + felt + wood). No allocation in the render loop —
easing must reuse `Vector3` scratch objects.

---

## 14. Build order

1. **Foundation** — `world.ts`, `shared/chipPalette.ts`, `textures/svgTexture.ts` (with the
   §2.1 fix and its test).
2. **Kill the glare** — delete `postfx.ts`/composer, direct render, §5 light rig, §8.4
   materials, CSS vignette. *Screenshot-verify: no blown highlights.*
3. **Fix the camera** — §4 with `fitCamera`. *Screenshot-verify at three aspects.*
4. **Room** — §6. *Screenshot-verify depth.*
5. **Table** — §8.1 with rail + trim.
6. **Assets** — move SVG to `assets/svg/`, felt rebuild at correct aspect with UV-mapped
   legend.
7. **Cards & chips** — §8.2, §8.3 with rounded stock and stack jitter.
8. **Props** — §8.5.
9. **Animation** — §9, replacing frame-rate-dependent lerps.
10. **Engine split** — `engine/` per §12 (pure refactor, no rule changes; the rules work
    and changing them has zero visual upside).
11. **UI split** — `ui/` per §12.
12. **Tests + budget check** — §13.3, §13.4.

Steps 2–4 are the ones the user has rejected three times; they ship and get verified
first, before any polish work.
