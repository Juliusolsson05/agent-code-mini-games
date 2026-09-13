# Blockfall implementation plan

Refs #12. Adds a fifth Mini Games game, **Blockfall**, on `feat/blockfall`: a falling-block puzzle that plays and sounds great. It ships through a PR that closes #12, and nothing merges or is released without explicit approval.

## Scope: a functional match with guideline Tetris

The maintainer asked for a 1:1 functional match with Tetris. Blockfall reproduces the rules and handling of modern guideline Tetris:
- rotation with SRS wall kicks, a 7-bag randomizer, hold, five previews and a ghost piece
- extended lock down (0.5 s, 15 move resets), the guideline gravity curve and 20× soft drop
- the guideline scoring table, T-spin and mini detection, back-to-back, combos and perfect clears
- Marathon (150 lines), Sprint (40 lines) and Ultra (3 minutes)
- the standard PC key layout

Guideline games have no 180° rotation, so neither does Blockfall.

What differs is only the expression. The Mini Games repository is public, so the game has its own name, visual identity and synthesized sound, with no Tetris logo, music, piece artwork or trademark. Rules are functional; the name and the look are what trademark and trade dress protect. Renaming later is a manifest and launcher change.

## Experience goals

1. **Controls feel instant and precise.** Input is sampled per key press and release, never the operating system's key repeat. Horizontal repeat uses a configurable delay and rate (DAS/ARR) that carries over between pieces.
2. **Every action has feedback.** Move, rotate, hold, land, lock, clear, level up and finish each have a distinct sound and a small visual response.
3. **Rewards escalate.** Combos raise pitch and intensity, and back-to-back, T-spins and perfect clears get bigger, rarer rewards, so a good streak is felt.
4. **It stays readable.** Effects never hide pieces or delay input. Reduced motion removes shake and particles, keeps essential flashes subtle, and leaves gameplay unchanged.

## Mechanics specification

### Field and pieces

- The field is 10 columns by 22 rows. The top 2 rows are a hidden spawn buffer and rows 2–21 are visible. Coordinates are `(x, y)` with `y` growing downward.
- There are seven pieces: I, O, T, S, Z, J, L. Each is defined by four rotation states (0, R, 2, L) in standard rotation-system (SRS) orientation.
- Pieces spawn in orientation 0, horizontally centered (columns 3–6 for the 4-wide bounding boxes, 4–5 for O), in the hidden buffer. After spawning the piece immediately drops one row if it can, so it becomes visible at once.
- **Block out** (game over): a newly spawned piece overlaps existing blocks.
- **Lock out** (game over): a piece locks entirely inside the hidden buffer.

### Randomizer, preview and hold

- **7-bag:** each bag is a Fisher–Yates shuffle of all seven pieces, with injected randomness. Bags concatenate, so the longest possible gap between two I pieces is 12.
- **Preview:** the next 5 pieces are shown.
- **Hold:** swaps the active piece with the held one, or takes the next piece if hold is empty. Hold is allowed once per piece until that piece locks. The held piece returns in orientation 0 at spawn.

### Rotation

- Standard SRS wall kicks: J, L, S, T and Z share one kick table, I uses its own, and O never kicks. The first kick offset that fits is used.
- Clockwise and counter-clockwise rotation only; there is no 180° rotation, matching the guideline.
- Kick index 4 (the fifth test) is recorded, because it upgrades a T-spin mini to a full T-spin.

### Gravity, drops and lock

- Gravity follows the standard curve: a piece falls one row every `(0.8 − (level − 1) × 0.007)^(level − 1)` seconds. Levels 20 and above are instant (20G).
- **Soft drop:** gravity multiplied by the soft-drop factor (default 20, with an "instant" setting), scoring 1 point per row.
- **Hard drop:** drops to the ghost position and locks immediately, scoring 2 points per row.
- **Lock delay:** 500 ms once the piece is grounded.
  - A successful move or rotation while grounded resets the delay, up to 15 times per piece.
  - Reaching a new lowest row restores that allowance.
  - When the resets run out, the piece locks as soon as it is grounded.
- Entry delay (ARE) and line-clear delay are engine settings. Both default to 0 ms, as in modern guideline clients: the next piece is controllable immediately, and clear animations play over live play.

### Handling (DAS / ARR)

- Left and right are held inputs. The most recently pressed direction wins, and releasing it resumes the other if that is still held.
- **Press:** the piece moves one cell at once. After DAS (default 167 ms) it repeats every ARR (default 33 ms). ARR 0 means instant travel to the wall.
- **Carry:** a direction held while a piece locks keeps its charge for the next piece.
- **Settings:** DAS 50–300 ms, ARR 0–100 ms and the soft-drop factor, all persisted.

### Scoring

Base values are multiplied by level:

| Clear | Base | Back-to-back eligible |
| --- | --- | --- |
| Single / Double / Triple | 100 / 300 / 500 | No |
| Quad (4 lines) | 800 | Yes |
| T-spin mini (no lines / single / double) | 100 / 200 / 400 | With lines |
| T-spin (no lines / single / double / triple) | 400 / 800 / 1200 / 1600 | With lines |

- **Back-to-back:** a back-to-back-eligible clear right after another one scores ×1.5. A non-eligible line clear breaks the chain; a T-spin with no lines does not break it.
- **Combo:** every consecutive clearing lock adds `50 × combo × level`, with combo counting from 1 on the second consecutive clear. A lock without a clear resets it.
- **Perfect clear:** an empty field after a clear adds 800 / 1200 / 1800 / 2000 × level for single / double / triple / quad, or 3200 × level for a back-to-back quad perfect clear.
- **T-spin detection:** the last successful action on a T piece was a rotation, and at least 3 of the 4 diagonal corners of its 3×3 box are occupied (walls and floor count). It is a **mini** unless both front corners (the side the T points to) are occupied, or the rotation used kick index 4.

### Modes and records

| Mode | Rules | Record |
| --- | --- | --- |
| **Marathon** | Start at level 1; level +1 every 10 lines; complete at 150 lines (level 15), or ends on top-out | Best score, with its lines and level |
| **Sprint** | Clear 40 lines at level-1 gravity | Fastest time |
| **Ultra** | Score as much as possible in 3 minutes, levels as in Marathon | Best score |

- Every run starts with a 3-2-1 countdown during which only handling settings can change.
- Records merge upward, like the other games, and are never overwritten before stored records have loaded.

## Architecture

All files live in `src/games/blockfall/` unless noted.

### `engine/pieces.ts`

Piece ids, the four rotation states as cell offsets, the SRS kick tables, the 180° kicks and the spawn columns. The data is pure and immutable.

### `engine/game.ts` — `BlockfallGame`

A pure state machine with no DOM, no timers and injected `random`. Time only advances through `update(dtMs)`.

- **Statuses:** `ready` | `countdown` | `playing` | `paused` | `over` | `complete`.
- **API:**
  - run control: `start(mode)`, `reset(mode?)`, `pause()`, `resume()`
  - input: `press(action)`, `release(action)`, `releaseAll()`
  - time: `update(dtMs) → BlockfallEvent[]`
  - settings and records: `setHandling(handling)`, `setRecords(partial)`, `getRecords()`
  - state: `getSnapshot()`, which returns copies
- **Actions:** `left`, `right`, `softDrop`, `hardDrop`, `rotateCW`, `rotateCCW`, `hold`.
- **Simulation:** fixed steps of 2 ms, run from an accumulator. This makes timing deterministic for tests and frame-rate independent; up to 250 ms is caught up per call, and anything beyond that is dropped after a stall.
- **Events,** the only channel to audio and the renderer:
  - piece actions: `spawn`, `move`, `rotate {kick, spin}`, `rotateBlocked`, `hold`
  - dropping and locking: `softDropRow`, `hardDrop {rows, cells}`, `land`, `lock {cells}`
  - clears: `clear {rows, lines, tspin: 'none'|'mini'|'full', b2b, combo, perfectClear, points}`
  - progression: `levelUp {level}`, `countdown {n}`, `go`
  - endings: `over {reason: 'blockOut'|'lockOut'}`, `complete {mode, result}`, `record`
- **Snapshot:**
  - field cells, the active piece and its ghost
  - hold state, the next five pieces
  - score, lines, level, combo and back-to-back
  - elapsed and remaining time, status, mode, handling and records

### `render/renderer.ts` — `BlockfallRenderer`

A canvas renderer that scales for high-DPI screens and draws each frame from the snapshot plus the events for that frame. Its own palette gives each piece a saturated, beveled glass-like block with an inner highlight, over a deep playfield with a subtle grid.

- **Board:** the field, the ghost (outline plus a faint fill) and the active piece.
- **Side panels:** hold and next pieces, scaled.
- **Feedback:**
  - on lock, the locked cells flash briefly
  - on hard drop, a vertical light streak along the drop path, spark particles at impact and a 2–4 px screen nudge
  - on clear, the cleared rows flash white-to-color and burst into particles colored by the blocks they held, while the stack collapses immediately beneath them
  - callouts pop and fade for single through quad, T-spins, back-to-back, combos and perfect clears
  - a perfect clear gets a full-field shimmer, a level up a border pulse
  - danger: when the stack reaches the top rows, the spawn area glows red
- **Reduced motion:** no shake, particles or streaks, and short opacity flashes only.

### `blockfallAudio.ts` — `BlockfallAudio`

WebAudio synthesis with no assets: a master gain into a dynamics compressor, a short generated reverb send for space, and a mute ramp that also silences voices already scheduled.

| Event | Sound |
| --- | --- |
| Move | Soft, short, slightly jittered tick |
| Rotate | Pitched blip; a kicked rotation adds a faint lower tick |
| Blocked rotation | Muted thud |
| Hold | Airy whoosh |
| Soft drop | Very quiet tick per row |
| Hard drop | Punchy thump plus noise impact, heavier the longer the drop |
| Land / lock | Crisp click; the lock is a touch deeper |
| Clear | Bright chord, bigger for more lines; pitch climbs one step of a major pentatonic scale per combo, capped |
| Quad | Chord with a sparkling top shimmer |
| T-spin | Distinct glassy arpeggio |
| Back-to-back | Adds a harmonic layer |
| Perfect clear | Fanfare arpeggio with a shimmer tail |
| Level up | Rising sweep |
| Countdown / go | Beeps, then an ascending "go" |
| Game over / complete | Game over descends; complete is a triumphant resolve |

Every sound is pitch-jittered so repeated actions never sound identical, and the mix leaves room for the fastest play.

### `Blockfall.tsx`

- **Roles:** React owns the scoreboard, overlays and settings; the renderer draws at 60 fps from a live snapshot ref, without React re-renders.
- **Screens:**
  - **Ready:** mode picker, controls card and a Play button
  - **Countdown**
  - **Paused**, with Resume or Restart
  - **Results:** score or time, lines, level and PPS (pieces per second) for this run, a "new record" badge and Play again
- **Settings popover:** DAS, ARR, soft-drop factor, and a "ghost piece" toggle (on by default).
- **Keys** (on the game root, never `window`):

  | Key | Action |
  | --- | --- |
  | ← / → | Move |
  | ↓ | Soft drop |
  | Space | Hard drop |
  | ↑ or X | Rotate clockwise |
  | Z | Rotate counter-clockwise |
  | C or Shift | Hold |
  | Esc or P | Pause |
  | R | Restart the run |
  | M | Mute |
  | Enter | Start or play again |

  This is the guideline PC layout. The guideline also allows Ctrl for counter-clockwise rotation, but Ctrl shortcuts belong to Agent Code, so Z is the only counter-clockwise key. Key repeat events are ignored because the engine owns repeat, and anything with Cmd, Ctrl or Alt belongs to Agent Code.
- **Pausing:** the game pauses and releases all held keys on focus loss, window blur or a hidden tab, and resumes only when the player asks.
- **Storage:** records, handling settings, mute and the last mode, hydrated into the live game without overwriting what the player has already touched.

### Integration

- Router screen `blockfall`, the `App` route and view mount `mini-games.blockfall`.
- Manifest: the command **Play Blockfall**, a view and `onView:mini-games.blockfall`. Version 0.10.0.
- Launcher: a fifth cabinet with `BlockfallArt`, a stacked-block preview in the game's palette. The grid wraps to a balanced layout.
- Dev harness route, gallery stage and README section.

## Verification

1. **Engine tests** (`tests/blockfall.test.mjs`), deterministic with injected randomness and explicit `update` steps:
   - bag fairness and preview length
   - spawn position, block out and lock out
   - DAS/ARR timing, ARR 0, last-direction priority and DAS carry
   - SRS kicks for T against a wall and I near walls; O never moves when rotated
   - gravity curve per level, soft drop and hard drop scoring, and hard drop locking immediately
   - lock delay of 500 ms, the 15-reset cap, and allowance restored on a new lowest row
   - line clear scoring for single through quad times level
   - T-spin double and mini detection on constructed fields, the kick-4 upgrade, the back-to-back multiplier and combo points
   - perfect clear bonus
   - hold rules
   - Marathon level-up and completion at 150 lines, Sprint completing at 40 lines with its time, and Ultra ending at 180 s
   - pause freezing time, countdown events, record merging and snapshot isolation
2. `npm test`, `npm run typecheck`, `NODE_ENV=production npm run build` and `npm run test:extension`.
3. `npm run test:browser` with local Chrome:
   - Blockfall starts, the countdown completes, and hard drops and moves change the field and score
   - pause on blur and on Escape, mute, restart, and host input focus isolation
   - screenshots of ready, playing and results
   - the production bundle mounts all five games
4. Review the screenshots, commit the built `dist/`, push, and open a PR that closes #12. Merge and release only after approval.

## Progress

- [x] Issue #12 created; worktree `feat/blockfall` from `origin/main` (v0.9.0).
- [x] Engine (pieces, rules, scoring, modes) with tests.
- [x] Audio palette.
- [x] Renderer and effects.
- [x] Component, styles, launcher art and integration.
- [x] Docs, verification and PR (tests, typecheck, extension contract and the Chrome browser check pass; screenshots reviewed).
