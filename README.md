# Mini Games for Agent Code

A four-game arcade inside [Agent Code](https://github.com/Juliusolsson05/agent-code). Everything runs locally in the extension sandbox: procedural artwork, synthesized audio, bundled word lists, and saved progress, with no network requests or external assets during play.

- **Snake:** an illustrated garden, smooth movement, two buffered turns, three paces, separate records, and full-board victory. Arrow keys / WASD, swipe, or direction buttons steer; Space / Escape pause; Enter starts or replays; M toggles sound. Leaving the game’s focus or tabbing to its controls pauses it until you explicitly resume.
- **Blackjack:** a procedural 3D table with timed dealing, hit, stand, double, up to four split hands, insurance, and repeat wager. Natural blackjack pays 3:2; split 21 pays a regular win. Payouts use cent precision. Choose 1–8 decks and S17/H17 before dealing. H / S / D / P play; Enter deals or rebets; Y / N answer insurance. Bankroll, stats, settings, and sound preference persist. All chips are free practice currency.
- **Minesweeper:** classic beveled tiles at Beginner, Intermediate, and Expert sizes, a safe first opening, records, and visible win/loss boards. Click to reveal, right-click to mark, or use touch flag mode. Click a revealed number, middle-click, or hold both buttons to chord. Arrow keys navigate; Enter / Space reveal or chord; F marks; N resets. Incorrect flags can still detonate a mine.
- **Typing Test:** a minimal Monkeytype-style test.
  - **Setup:** time (15 / 30 / 60 / 120 s) or words (10 / 25 / 50 / 100) mode, and a word list of the top 200, 1k or 10k English words. Punctuation and numbers are optional, and settings persist.
  - **Typing:** the test starts on your first keystroke. Backspace corrects; ⌥/Ctrl + Backspace deletes a word; a word you got wrong can be revisited. Tab restarts.
  - **Results:** wpm, accuracy, raw wpm, consistency, the character breakdown and a per-second chart. A personal best is kept for every test shape.

The launcher and game controls follow the host theme. The garden, felt, cards, chips, classic minefield and typing page preview keep their artwork palettes. Keyboard input stays within the focused game.

## Install

In Agent Code → **Settings → Apps**, install from GitHub using `Juliusolsson05/agent-code-mini-games`, or choose **Load folder…** for a local checkout. Open **Play Mini Games**, **Play Snake**, **Play Blackjack**, **Play Minesweeper**, or **Play Typing Test** from the command palette.

The API v2 build has one managed runtime and one shared modal view module. Each
launch command maps to a modal view id, so a cold “Play Snake” or “Play Typing Test”
command opens that game directly without running DOM code in the background.
`dist/runtime.js`, `dist/view.js`, and their chunks are committed because GitHub
installations use the source tarball directly. Rebuild before loading a modified
checkout. Existing saved bankroll and Minesweeper records remain compatible; the
old Snake best migrates to the Classic pace record.

## Develop and verify

Use Node 22 or newer.

```bash
npm install --include=dev
npm run dev:web
```

Open the printed local URL. `/dev/?game=snake`, `blackjack`, `minesweeper`, or `typing` opens a specific game. `/dev/gallery.html` shows all screens with theme switches. `/dev/?build=production` exercises the built extension’s activation, commands, and view mount using the browser storage adapter.

```bash
npm test                           # deterministic rules and state regressions
npm run typecheck
NODE_ENV=production npm run build  # required production JSX transform
npm run test:extension             # build + manifest/artifact contract
npm run verify                     # rules plus extension contract
npx playwright install chromium   # once, for browser checks
npm run test:browser               # isolated server/context; screenshots in test-results/
```

Set `CHROME_PATH` to an existing Chrome executable to use it for browser checks. Those checks exercise real controls, pointer order, touch, pause, replay, records, split hands, typing and correction, and the production bundle; they do not replace verification inside the Electron extension host. The browser harness uses its own localStorage namespace and never reads Agent Code’s saved games.

## Typing Test word list

`src/games/typing/engine/english-10k.json` holds the 10,000 most frequent plain English words, most frequent first. It is generated from [wordfreq](https://github.com/rspeer/wordfreq) by Robyn Speer and distributed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The license applies to that data file only; the rest of the extension keeps this repository's license.

wordfreq's data includes:
- Google Books Ngrams
- the Leeds Internet Corpus
- Wikipedia
- ParaCrawl
- OPUS OpenSubtitles 2018, from the OpenSubtitles project
- the SUBTLEX word lists by Marc Brysbaert et al. (freely available data)

The file carries the same credits in its `attribution` field.

For the game, the list keeps only plain lowercase words. It drops single letters other than "a" and "i", and a small profanity blocklist. To regenerate it:

```bash
python3 -m venv .venv-words
.venv-words/bin/pip install wordfreq
.venv-words/bin/python dev/generate-typing-words.py
```
