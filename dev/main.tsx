import type { AgentCodeApiV1, JsonValue } from 'agent-code-extension-api'

import { router } from '../src/router'
import { mountMiniGames } from '../src/view/mount'

// ---------------------------------------------------------------------------------
// Dev harness — browser-only, NOT shipped.
//
// The extension that actually ships is `dist/index.js` (built with `npm run build`).
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

// Land straight on whatever we're iterating on. Default = blackjack (the WebGL work);
// override with ?game=launcher or ?game=snake. The in-app "‹ Games" button still works.
const requested = new URLSearchParams(location.search).get('game')
if (requested === 'launcher' || requested === 'snake' || requested === 'blackjack') {
  router.show(requested)
} else {
  router.show('blackjack')
}

const host = document.getElementById('app')
if (!host) throw new Error('dev harness: #app root missing')
mountMiniGames(devApi)(host)

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
    setTimeout(() => window.dispatchEvent(new KeyboardEvent('keydown', { key })), at)
  }
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
    clickSel('.mg-chip-btn')
    const dealt = clickSel('.mg-bet .mg-btn.primary')
    if (!dealt && tries < 40) setTimeout(drive, 60)
  }
  setTimeout(drive, 120)
}
