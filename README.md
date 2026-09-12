# Mini Games for Agent Code

A three-game arcade inside [Agent Code](https://github.com/Juliusolsson05/agent-code). Everything runs locally in the extension sandbox: procedural artwork, synthesized audio, and saved progress, with no network requests or external assets during play.

- **Snake:** an illustrated garden, smooth movement, two buffered turns, three paces, separate records, and full-board victory. Arrow keys / WASD, swipe, or direction buttons steer; Space / Escape pause; Enter starts or replays; M toggles sound. Leaving the game’s focus or tabbing to its controls pauses it until you explicitly resume.
- **Blackjack:** a procedural 3D table with timed dealing, hit, stand, double, up to four split hands, insurance, and repeat wager. Natural blackjack pays 3:2; split 21 pays a regular win. Payouts use cent precision. Choose 1–8 decks and S17/H17 before dealing. H / S / D / P play; Enter deals or rebets; Y / N answer insurance. Bankroll, stats, settings, and sound preference persist. All chips are free practice currency.
- **Minesweeper:** classic beveled tiles at Beginner, Intermediate, and Expert sizes, a safe first opening, records, and visible win/loss boards. Click to reveal, right-click to mark, or use touch flag mode. Click a revealed number, middle-click, or hold both buttons to chord. Arrow keys navigate; Enter / Space reveal or chord; F marks; N resets. Incorrect flags can still detonate a mine.

The launcher and game controls follow the host theme. The garden, felt, cards, chips, and classic minefield keep their artwork palettes. Keyboard input stays within the focused game.

## Install

In Agent Code → **Settings → Apps**, install from GitHub using `Juliusolsson05/agent-code-mini-games`, or choose **Load folder…** for a local checkout. Open **Play Mini Games**, **Play Snake**, **Play Blackjack**, or **Play Minesweeper** from the command palette.

`dist/index.js` is committed because GitHub installations use the source tarball directly. Rebuild before loading a modified checkout. Existing saved bankroll and Minesweeper records remain compatible; the old Snake best migrates to the Classic pace record.

## Develop and verify

Use Node 22 or newer.

```bash
npm install --include=dev
npm run dev:web
```

Open the printed local URL. `/dev/?game=snake`, `blackjack`, or `minesweeper` opens a specific game. `/dev/gallery.html` shows all screens with theme switches. `/dev/?build=production` exercises the built extension’s activation, commands, and view mount using the browser storage adapter.

```bash
npm test                           # deterministic rules and state regressions
npm run typecheck
NODE_ENV=production npm run build  # required production JSX transform
npx playwright install chromium   # once, for browser checks
npm run test:browser               # isolated server/context; screenshots in test-results/
```

Set `CHROME_PATH` to an existing Chrome executable to use it for browser checks. Those checks exercise real controls, pointer order, touch, pause, replay, records, split hands, and the production bundle; they do not replace verification inside the Electron extension host. The browser harness uses its own localStorage namespace and never reads Agent Code’s saved games.
