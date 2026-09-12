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
5. Commit the final dist/index.js, review diff and checks, open a complete PR linked to Issues. Merge only after explicit user authorization and a clear review.

## Progress

- [x] Read all authored source, docs, configuration and development tools; inspect packaged entry point.
- [x] Fetch/pull main; latest base is bfd831a (v0.6.1); baseline typecheck passes.
- [x] Create feature Issue #1 and dedicated worktree.
- [x] Define contracts and implement game improvements.
- [x] Behavioral tests, production build and browser QA.
- [x] Final review and PR: https://github.com/Juliusolsson05/agent-code-mini-games/pull/8

## Verified implementation

- Snake is rebuilt around fixed-step completed-move interpolation, a two-turn queue, three paces, safe tail chasing and complete-board victory. Its garden renderer, sound, records and focus/touch controls are new.
- Blackjack now locks opening deals, includes insurance in net results, preserves zero bankroll, supports buy-in/rebet and shows every split hand. Odd-dollar naturals and insurance use cent precision; table artwork follows S17/H17. Issues #2, #3 and #7 cover the independently discovered rule failures.
- Minesweeper supports both mouse chord orders, touch flag mode and scoped grid keyboard navigation. Its clock freezes even at zero seconds, and difficulty-specific cell sizes keep all boards near 800px total height. Issues #4 and #6 cover the original regressions; #5 covers Snake's collision rule.
- Removed obsolete game CSS after moving the remaining classic tile rules beside Minesweeper. Theme ink and backgrounds now switch together, avoiding transient unreadable controls during a host theme change.
- All 22 deterministic tests pass. Browser checks cover pickup, pause, focus isolation, replay, record persistence, swipe, atomic dealing, bankruptcy, settings, four split hands, both chord orders, touch flags, victory/loss and production entry-point navigation. Production build and typecheck pass. Axe audits found no violations across the four gallery themes after final contrast fixes.
- Added CI and an isolated browser-check server that leaves the user's live preview/storage alone. Version 0.7.0 includes the rebuilt committed bundle. Browser QA covers Chromium, not the Electron extension bridge; actual host installation remains a review step.

## Claude review follow-up

- The user authorized one orchestrated Claude review and merge after a clear result. That reviewer found a Blackjack focus blocker: a chip or Split button could disable itself without changing phase, dropping keyboard input. Track the last focused control and recover only when it is disabled or removed; external focus remains untouched. Browser checks now use Enter after an all-in click and H after Split without manually focusing the root.
- Addressed the optional Snake keyboard finding too: Tab pauses a live run while preserving native focus navigation and pointer controls. Its new browser regression failed on the old implementation before the fix.
- Deferred the optional automatic committed-bundle parity gate: the existing repository intentionally ignores the dependency lockfile, so fresh installations can produce different dependency bytes. Adding reproducible dependency pinning is a separate build-policy change. The reviewer verified the current production artifact byte for byte; source changes in this follow-up are rebuilt before delivery.
- Follow-up verification: all 22 rules tests and the complete browser suite pass, including both focus regressions and external-input focus isolation. The production bundle has been rebuilt and TypeScript passes.
