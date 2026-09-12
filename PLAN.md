# Arcade experience implementation plan

Refs #1. Deliver a cohesive three-game arcade pass, including a ground-up Snake rebuild, on `feat/arcade-experience`. Preserve the original checkout and incorporate its existing launcher/theme/gallery changes here.

## Intended behavior

- Snake: a bright garden arcade with expressive blue snake and apples; rebuilt deterministic grid simulation, two buffered turns, fixed-step interpolation of the previous move (no prediction into walls), three paces, first-direction start, pause on blur/hidden, explicit resume, record persistence and complete-board victory. Keyboard and touch/swipe controls; lively but restrained motion and audio, reduced motion support.
- Blackjack: retain the procedural 3D table, make opening deal an explicit locked phase, fix insurance net accounting, show split hand status, keep money/in-flight actions coherent, add repeat-last-bet and a clear next-round flow. Improve HUD legibility, accessible settings and shortcuts.
- Minesweeper: retain Win95 field character, correct chord handling for either button order, keyboard navigation and flag/reveal/chord, visible terminal state, first-click guidance, elapsed/best time correctness, and readable layout at every difficulty.
- Launcher: incorporate existing custom previews and theme work; clear game summaries and launch affordances. Remove conflicting legacy CSS where it affects new screens.

## Implementation slices

The parent owns shared integration, Snake engine/types, Blackjack engine/types, regression tests, launcher, global styles, build/release artifacts and final verification. The generation work is split only after those interfaces are defined:

1. Snake presentation: Snake.tsx, render/renderer.ts, render/palette.ts, snakeAudio.ts and snake.css; consume the finalized Snake engine contract.
2. Minesweeper: engine/game.ts, Minesweeper.tsx and minesweeper.css; preserve existing exports while implementing specified keyboard/pointer/timer behavior.
3. Blackjack presentation: Blackjack.tsx, useBlackjack.ts and blackjack.css; consume the finalized Blackjack engine contract. Existing 3D scene stays intact except parent-owned lifecycle fixes if needed.

## Verification and delivery

1. Record independently discovered meaningful bugs as linked Issues before their fixes.
2. Add behavioral regression tests for game rules/input/state transitions, using Node’s test runner plus existing build tooling instead of a heavyweight test framework.
3. Run tests and typecheck. Build production output, then exercise all games in the browser and inspect screenshots at default and alternate sizes/states.
4. Check local theme changes, keyboard operation, focus-loss pause, replay, split/insurance/dealing, and Minesweeper victory/loss.
5. Commit the final dist/index.js, review diff and checks, open a complete PR linked to Issues. Do not merge.

## Progress

- [x] Read all authored source, docs, configuration and development tools; inspect packaged entry point.
- [x] Fetch/pull main; latest base is bfd831a (v0.6.1); baseline typecheck passes.
- [x] Create feature Issue #1 and dedicated worktree.
- [ ] Define contracts and implement game improvements.
- [ ] Behavioral tests, production build and browser QA.
- [ ] Final review and PR.
