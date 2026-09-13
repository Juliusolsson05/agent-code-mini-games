# Typing Test implementation plan

Refs #10. Adds a fourth Mini Games game, a Monkeytype-style typing test, on `feat/typing-test`. It is delivered through a PR that closes #10. Nothing merges or is released without explicit approval.

## Intended behavior

- **Entry points:** Typing Test opens from a fourth launcher cabinet or directly from the palette command **Play Typing Test**. It uses the existing Mini Games modal and view module.
- **Test shapes:**
  - Time mode: 15 / 30 / 60 / 120 seconds.
  - Words mode: 10 / 25 / 50 / 100 words.
  - Punctuation and numbers are optional toggles.
  - Word list: top 200, top 1k or top 10k English words. All three are slices of one frequency-ranked list, and top 10k is the default.
  - Settings persist in extension storage.
- **Typing:**
  - The test starts on the first keystroke.
  - Each letter shows as pending, correct or incorrect; letters typed beyond a word's length show as extra.
  - A smooth caret moves through the text, and three lines stay visible, dropping the first line when the caret reaches the third.
  - Space commits a word; space on an empty word does nothing.
  - Backspace corrects. Option/Ctrl/Cmd+Backspace clears the word. A word committed with errors can be revisited; a correct word is locked.
  - Tab restarts with new text; Shift+Tab stays normal focus navigation.
- **Results:**
  - wpm and accuracy, plus raw wpm, consistency, time and test shape.
  - The character breakdown: correct / incorrect / extra / missed.
  - A per-second chart of wpm and raw with error markers.
  - A personal best is kept for each test shape, with "new personal best" feedback.
  - **Next test** (Tab) and **Repeat test** (same words).
- **Integration:**
  - The game only claims keys while its text surface is focused, or while nothing else on the page has focus.
  - Modified keys other than Backspace belong to Agent Code (palette, close, copy).
  - Host inputs keep their keystrokes.
  - Chrome follows the host theme; errors use the host danger color.

## Word list

Source: the English list from `wordfreq` (Robyn Speer), https://github.com/rspeer/wordfreq.

**Why this source.** `google-10000-english` is limited to educational and personal/research use, derived from the LDC-licensed Google Web corpus. Monkeytype's word lists are GPL-3.0. wordfreq's data files are redistributable under CC BY-SA 4.0, and it blends Wikipedia, subtitles, news, books and web text. A hand-written list does not meet the goal of the real top 10,000.

**Filtering.** `dev/generate-typing-words.py` builds the list:
- Walk `top_n_list('en', 40000)` in frequency order.
- Keep only plain lowercase words (`^[a-z]+$`).
- Drop single letters except `a` and `i`.
- Drop a small blocklist of profanity, slurs and explicit terms.
- Stop at exactly 10,000 unique words.

The filter only removes words; it never adds or reorders them.

**Attribution.** wordfreq's author warns that bare exports tend to lose attribution. So the generated data file `src/games/typing/engine/english-10k.json` carries its own attribution and license fields (wordfreq, its credited sources, and the CC BY-SA 4.0 license). The README credits the list too, and states that the list file is distributed under CC BY-SA 4.0. The game code keeps the repository's license, and the share-alike terms apply only to the word list file.

**Regenerating.**

```bash
python3 -m venv .venv-words
.venv-words/bin/pip install wordfreq
.venv-words/bin/python dev/generate-typing-words.py
```

## Engine (`src/games/typing/engine/`)

The engine is pure state with no DOM and no timers of its own, and time and randomness are injected. It follows the same discipline as the other game engines.

- **`words.ts`:** `WordStream` draws seeded words from the chosen top-N slice.
  - It never repeats the same word twice in a row.
  - Numbers mode mixes in 1–4 digit numbers.
  - Punctuation mode capitalizes sentence starts and adds commas, periods, question marks, exclamation marks, semicolons, colons, quotes and parentheses.
- **`game.ts`:** `TypingGame` exposes:
  - `reset(config)` for new text, and `repeat()` for the same text.
  - `type(char)`, `backspace(wholeWord)` and `tick()`.
  - `setBests` / `getBests`, which merge stored records without lowering them.
  - `getSnapshot()`, which returns copies.
  - Time mode generates words ahead of the caret on demand.
- **Statistics:**
  - wpm counts characters of correctly typed words plus their spaces, divided by five per minute; a correct prefix of the current word counts.
  - raw counts every typed character and committed space.
  - accuracy is correct keystrokes over all keystrokes, so corrected mistakes still count.
  - consistency is `100 × (1 − σ/μ)` of the per-second raw speed, clamped to 0–100.
  - Missed letters count only for words the typist moved past.
  - Samples are recorded once per whole second; a final partial second is sealed at finish.
- **Personal bests** are keyed by mode, amount, word list, punctuation and numbers. Only a test with correct characters can set one.

## View (`src/games/typing/`)

- `TypingTest.tsx` follows Minesweeper's shape: an Arcade back button, a heading with the personal-best record, a settings bar, the live stage or results, a footer hint, and storage hydration that never overwrites records before they load.
- Only a window of words is rendered after the first visible line, because a two-minute test generates hundreds.
- A layout effect measures the active letter for the caret, and word positions for line scrolling.
- `typing.css` scopes everything under `.tt-root` with a fixed width, so the host's content measurement cannot loop. Stage and results share a minimum height so the modal does not jump at the end of a test. Motion is disabled for reduced-motion users.
- The launcher art uses its own dark "typing page" palette, like the other games' preview art.

## Integration

- `router.ts`, `App.tsx`, `view/mount.tsx` and the manifest:
  - add the `mini-games.typing` view and command, and the `onView:mini-games.typing` activation event
  - bump the version to 0.9.0
- Launcher: a fourth cabinet; the grid becomes four columns at a wider launcher width, and the header note reads "four games".
- Dev harness routes, the UI gallery, and the README (game description and word-list credit).

## Verification

1. Engine tests in `tests/typing.test.mjs`:
   - clock start, and words-mode finish on the exact last word
   - exact wpm, raw and accuracy
   - extra and missed characters, and the correction and revisit rules
   - time-mode lookahead, samples and limit
   - personal best merging and keys
   - snapshot isolation and stored-config validation
   - word stream rules
   - word list integrity: 10,000 unique plain words, ordered by frequency
2. `npm test`, `npm run typecheck`, `NODE_ENV=production npm run build` and `npm run test:extension`.
3. `npm run test:browser` covers:
   - four launcher cabinets
   - words mode typing with a correction, the results screen and Tab restart
   - host input focus isolation and persisted settings
   - the production bundle mounting all four games
4. Review the diff, commit the built `dist/`, push `feat/typing-test`, and open a PR that closes #10. Merge and release only after approval.

## Progress

- [x] Issue #10 created; worktree `feat/typing-test` from `origin/main`.
- [x] Word list source chosen and licensing checked.
- [x] Word list generated with attribution: 10,000 unique plain words from wordfreq 3.1.1, with no blocklisted words and only "a" and "i" as single letters.
- [x] Engine and tests: `npm test` passes 29 tests (7 new).
- [x] View, styles, launcher art, integration: typecheck, production build, and the manifest/artifact contract all pass.
- [x] Browser checks: `npm run test:browser` passes with local Chrome. That covers typing, correction, results, Tab restart, host focus isolation, saved settings, and all four games in the production bundle.
- [x] PR #11 opened (Fixes #10). Merge and the v0.9.0 release await approval.
