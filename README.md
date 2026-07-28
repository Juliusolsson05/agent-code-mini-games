# agent-code-mini-games

A little arcade inside [Agent Code](https://github.com/Juliusolsson05/agent-code) — a modal hub of mini-games. First up: a fully-featured, casino-grade **Blackjack**.

## Blackjack

- **Everything is SVG** — a custom playing-card deck (pip layouts, court cards, patterned back), poker chips, and a felt table with a wooden rail and the classic "BLACKJACK PAYS 3 TO 2" arc.
- **Full rules** — hit · stand · **double** · **split** (incl. split aces) · **insurance**; dealer stands on 17 (H17 optional); blackjack pays 3:2.
- **Chips + bankroll** persisted; win/loss/blackjack **stats** tracked; **1–8 deck** shoe.
- **Feel** — timed dealing + hole-card reveal, active-hand glow, result banners, and layered **synthesized sound** (chip clinks, card swishes, win/blackjack fanfares).
- Keyboard: **H** hit · **S** stand · **D** double · **P** split · **Enter** deal / next.

Runs entirely inside the extension sandbox — no network, no external assets.

## Install

Agent Code → **Settings → Apps**:
- **From GitHub:** `Juliusolsson05/agent-code-mini-games`
- **Local dev:** **Load folder…** → this repo

Then run **Play Blackjack** (or **Play Mini Games**) from the command palette.

## Develop

```bash
NODE_ENV=development npm install --include=dev   # keep devDeps (vite)
NODE_ENV=production  npm run build               # production build (dist/index.js)
```

Built with React (no framer-motion — CSS animations keep the bundle lean) against
[`agent-code-extension-api`](https://github.com/Juliusolsson05/agent-code-extension-api). `dist/` is committed so the GitHub source tarball is directly installable.
