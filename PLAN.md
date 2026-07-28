# Plan — agent-code-mini-games

A hub extension for small games inside Agent Code. One modal view (`games.main`) with
an internal router; each game is a screen. Adding a game = a router entry + a command.

## Architecture
- **Router** (`src/router.ts`) — external store for the current screen; a contributed
  command flips it from outside React.
- **Cards / chips / table** (`src/cards`, `src/chips`, `src/table`) — reusable SVG.
- **Per game** (`src/games/<game>/`) — a pure `engine.ts` (rules, testable, UI-free) and
  a component that projects its state.
- **Audio** (`src/audio.ts`) — synthesized (CSP forbids audio assets).

## Status
- ✅ **Blackjack** — full rules (hit/stand/double/split/insurance), 1–8-deck shoe,
  chips + bankroll + stats (persisted), timed dealing, sound, settings.

## Roadmap (candidates)
- Video Poker / Solitaire / Minesweeper / 2048 / Memory — each reuses the card + chip
  SVG and the launcher; drop in an `engine.ts` + screen and a router entry.

## Conventions
- Build **production** (`NODE_ENV=production npm run build`) or React emits `jsxDEV`,
  undefined in the frame. Install with `NODE_ENV=development --include=dev`.
- `dist/` is committed (the installer downloads the source tarball).
- Everything self-contained: no network, no external assets.
