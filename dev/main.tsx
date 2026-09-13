import type { AgentCodeApiV1, JsonValue, ViewContext, ViewModule } from 'agent-code-extension-api'

import { router } from '../src/router'
import { mountMiniGames } from '../src/view/mount'

// ---------------------------------------------------------------------------------
// Dev harness — browser-only, NOT shipped.
//
// The extension that actually ships is `dist/runtime.js` plus `dist/view.js`
// (built with `npm run build`).
// This file exists solely so `npm run dev:web` gives us live-reload iteration in
// Chrome without rebuilding + reinstalling into Agent Code on every tweak — which is
// the slow loop that made the WebGL Blackjack painful to tune.
//
// In the real app the host answers the API over postMessage from the Electron main
// process. Here we hand-roll a stub: storage is backed by localStorage (so bankroll /
// stats survive a reload, matching real behavior), and the Tier-1 observe groups —
// which mini-games never calls, being Tier-0 — return empty. If we ever add a Tier-1
// feature, these stubs are where you'd fake sessions/panes.
// ---------------------------------------------------------------------------------

const NS = 'mg-dev:'

const devApi: AgentCodeApiV1 = {
  extension: { id: 'mini-games', apiVersion: 1 },
  storage: {
    async get<T extends JsonValue>(key: string): Promise<T | undefined> {
      const raw = localStorage.getItem(NS + key)
      return raw == null ? undefined : (JSON.parse(raw) as T)
    },
    async set(key: string, value: JsonValue): Promise<void> {
      localStorage.setItem(NS + key, JSON.stringify(value))
    },
    async delete(key: string): Promise<void> {
      localStorage.removeItem(NS + key)
    },
    async keys(): Promise<string[]> {
      return Object.keys(localStorage)
        .filter(k => k.startsWith(NS))
        .map(k => k.slice(NS.length))
    },
  },
  ui: {
    async close(): Promise<void> {
      console.log('[dev] ui.close()')
    },
    async showToast(message: string): Promise<void> {
      console.log('[dev] toast:', message)
    },
  },
  theme: {
    async tokens(): Promise<Record<string, string>> {
      return {}
    },
  },
  workspace: {
    async observe() {
      return { activeTabId: null, tabIds: [], sessionCount: 0 }
    },
    subscribe() {
      return () => {}
    },
  },
  sessions: {
    async observe() {
      return []
    },
    subscribe() {
      return () => {}
    },
  },
  panes: {
    async observe() {
      return []
    },
    subscribe() {
      return () => {}
    },
  },
}

const viewIdFor = (game: string | null): string =>
  game === 'snake' || game === 'blackjack' || game === 'minesweeper' || game === 'typing'
    ? `mini-games.${game}`
    : 'mini-games.open'

const devViewContext = (game: string | null): ViewContext => ({
  api: {
    ...devApi,
    extension: { id: 'mini-games', apiVersion: 2 },
    // Mini Games is Tier 0 and never calls these methods. Keeping explicit
    // rejecting stubs makes the browser harness structurally faithful without
    // pretending it can reproduce Agent Code's session-scoped filesystem gate.
    files: {
      readText: async () => { throw new Error('Project files are unavailable in the browser harness') },
      writeText: async () => { throw new Error('Project files are unavailable in the browser harness') },
    },
  },
  view: { id: viewIdFor(game), instanceId: 'browser-development-view' },
  runtime: {
    state: () => undefined,
    request: async () => undefined,
    subscribe: () => () => {},
  },
})

// Open the arcade by default, with direct routes for focused iteration.
const requested = new URLSearchParams(location.search).get('game')
if (
  requested === 'launcher' ||
  requested === 'snake' ||
  requested === 'blackjack' ||
  requested === 'minesweeper' ||
  requested === 'typing'
) {
  router.show(requested)
} else {
  router.show('launcher')
}

const host = document.getElementById('app')
if (!host) throw new Error('dev harness: #app root missing')
if (new URLSearchParams(location.search).get('build') === 'production') {
  // Exercise the exact committed v2 view artifact as well as the source/HMR path.
  // Agent Code owns command-to-modal routing; the selected view id is the same
  // launch intent the real host passes after a palette command.
  const module = await import(/* @vite-ignore */ '/dist/view.js') as { default: ViewModule }
  const dispose = module.default.mount(host, devViewContext(requested))
  window.addEventListener('beforeunload', () => dispose?.(), { once: true })
} else {
  const dispose = mountMiniGames(host, devViewContext(requested))
  window.addEventListener('beforeunload', () => dispose?.(), { once: true })
}

// ?autodeal — drive a hand automatically so a headless screenshot lands on the
// dealt state (cards + chips on the felt), which is where the lighting/material work
// actually shows. Purely a screenshot convenience; it just clicks the real UI.
// ?autoplay — nudge Snake into motion so a headless screenshot captures live play
// rather than the pre-start screen.
if (new URLSearchParams(location.search).has('autoplay')) {
  // A box pattern so the snake stays alive long enough to screenshot mid-play, instead
  // of running straight into the right wall in ~1.5s.
  const moves: Array<[number, string]> = [
    [300, 'ArrowRight'],
    [1000, 'ArrowDown'],
    [1600, 'ArrowLeft'],
    [2400, 'ArrowUp'],
    [3000, 'ArrowRight'],
  ]
  for (const [at, key] of moves) {
    setTimeout(() => document.querySelector('.sk-root')?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true })), at)
  }
}

// ?autosweep — click a middle cell so a screenshot lands on an OPENED region, which is
// where the number colours and the opened-cell bevel treatment actually show.
if (new URLSearchParams(location.search).has('autosweep')) {
  setTimeout(() => {
    const cells = document.querySelectorAll<HTMLElement>('.ms-cell')
    const target = cells[Math.floor(cells.length / 2) + 2]
    if (target) {
      target.click()
    }
  }, 500)
}

if (new URLSearchParams(location.search).has('autodeal')) {
  const clickSel = (sel: string): boolean => {
    const el = document.querySelector<HTMLButtonElement>(sel)
    if (el && !el.disabled) {
      el.click()
      return true
    }
    return false
  }
  // Place a bet then deal, retrying until the buttons exist (React mounts async).
  let tries = 0
  const drive = () => {
    tries++
    // Add a chip, then hit Deal. Once we're past betting, stop.
    clickSel('.bj-chip')
    const dealt = clickSel('.bj-bet-actions .bj-primary')
    if (!dealt && tries < 40) setTimeout(drive, 60)
  }
  setTimeout(drive, 120)
}
