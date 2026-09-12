import type { AgentCodeApiV1, JsonValue } from 'agent-code-extension-api'
import { createRoot } from 'react-dom/client'

import { GameAudio } from '../src/audio'
import { Blackjack } from '../src/games/blackjack/Blackjack'
import { Minesweeper } from '../src/games/minesweeper/Minesweeper'
import { Snake } from '../src/games/snake/Snake'
import { Launcher } from '../src/launcher/Launcher'
import styles from '../src/styles.css?inline'

// ---------------------------------------------------------------------------------
// UI gallery — every screen at once, under a live theme switcher. NOT shipped.
//
// The point is to test THEME INHERITANCE, which the normal harness cannot: /dev/ mounts
// one screen and no host pushes `--theme-*`, so the extension silently renders its
// fallbacks and looks fine no matter how badly the tokens are wired. Here each screen is
// mounted in its own subtree with a real token set applied, so a token that ISN'T bound
// to the theme shows up immediately as the one element that refuses to change.
//
// The gallery renders each screen COMPONENT DIRECTLY rather than going through <App>.
// App reads the router, which is a module singleton — and createRoot().render() is
// async, so four Apps mounted in a row all read the router AFTER the last show() call
// and every stage rendered the same game. Bypassing the router is also simply more
// honest for a test rig: a gallery wants to pin a screen, not navigate.
// ---------------------------------------------------------------------------------

/**
 * Real Agent Code themes, transcribed as the token sets the host would push.
 *
 * Deliberately spans the hard cases: a light theme (where a dark-only extension falls
 * apart), a high-contrast theme, and a strongly-hued accent that is nothing like the
 * extension's default gold — if the hub still looks deliberate under "Vapor", the
 * inheritance is real rather than coincidental.
 */
const THEMES: Record<string, Record<string, string>> = {
  'Agent Dark': {
    '--theme-canvas': '#0f1216',
    '--theme-surface': '#171b21',
    '--theme-surface-hi': '#1f242c',
    '--theme-border': 'rgba(255,255,255,0.09)',
    '--theme-border-hi': 'rgba(255,255,255,0.2)',
    '--theme-ink': '#e9edf2',
    '--theme-muted': '#9aa4b2',
    '--theme-ink-dim': '#6b7480',
    '--theme-accent': '#e3c56f',
    '--theme-accent-fg': '#1a1206',
    '--theme-accent-soft': 'rgba(227,197,111,0.18)',
  },
  Light: {
    '--theme-canvas': '#f6f7f9',
    '--theme-surface': '#ffffff',
    '--theme-surface-hi': '#eef1f5',
    '--theme-border': 'rgba(15,20,30,0.12)',
    '--theme-border-hi': 'rgba(15,20,30,0.28)',
    '--theme-ink': '#141922',
    '--theme-muted': '#5b6675',
    '--theme-ink-dim': '#8792a1',
    '--theme-accent': '#1f6feb',
    '--theme-accent-fg': '#ffffff',
    '--theme-accent-soft': 'rgba(31,111,235,0.14)',
  },
  Vapor: {
    '--theme-canvas': '#150e22',
    '--theme-surface': '#1e1533',
    '--theme-surface-hi': '#2a1d47',
    '--theme-border': 'rgba(255,120,220,0.18)',
    '--theme-border-hi': 'rgba(255,120,220,0.45)',
    '--theme-ink': '#f4e9ff',
    '--theme-muted': '#b39ad0',
    '--theme-ink-dim': '#8570a3',
    '--theme-accent': '#ff5fd2',
    '--theme-accent-fg': '#1a0417',
    '--theme-accent-soft': 'rgba(255,95,210,0.18)',
  },
  'High contrast': {
    '--theme-canvas': '#000000',
    '--theme-surface': '#0b0b0b',
    '--theme-surface-hi': '#161616',
    '--theme-border': '#5a5a5a',
    '--theme-border-hi': '#ffffff',
    '--theme-ink': '#ffffff',
    '--theme-muted': '#d0d0d0',
    '--theme-ink-dim': '#a0a0a0',
    '--theme-accent': '#ffe100',
    '--theme-accent-fg': '#000000',
    '--theme-accent-soft': 'rgba(255,225,0,0.2)',
  },
}

const NS = 'mg-gallery:'
const api: AgentCodeApiV1 = {
  extension: { id: 'mini-games', apiVersion: 1 },
  storage: {
    async get<T extends JsonValue>(k: string) {
      const raw = localStorage.getItem(NS + k)
      return raw == null ? undefined : (JSON.parse(raw) as T)
    },
    async set(k: string, v: JsonValue) {
      localStorage.setItem(NS + k, JSON.stringify(v))
    },
    async delete(k: string) {
      localStorage.removeItem(NS + k)
    },
    async keys() {
      return Object.keys(localStorage).filter(k => k.startsWith(NS)).map(k => k.slice(NS.length))
    },
  },
  ui: { async close() {}, async showToast(m) { console.log('[gallery] toast:', m) } },
  theme: { async tokens() { return {} } },
  workspace: { async observe() { return { activeTabId: null, tabIds: [], sessionCount: 0 } }, subscribe: () => () => {} },
  sessions: { async observe() { return [] }, subscribe: () => () => {} },
  panes: { async observe() { return [] }, subscribe: () => () => {} },
}

// One shared stylesheet, exactly as the real mount injects it.
const style = document.createElement('style')
style.textContent = styles
document.head.append(style)

const audio = new GameAudio()

/** Mount one screen into a stage, wrapped in .mg-root exactly as App does. */
function mountAt(id: string, node: React.ReactNode): void {
  const host = document.getElementById(id)
  if (!host) return
  createRoot(host).render(<div className="mg-root">{node}</div>)
}

const noop = () => {}
mountAt('s-launcher', <Launcher onPlay={noop} />)
mountAt('s-blackjack', <Blackjack api={api} audio={audio} onExit={noop} />)
mountAt('s-snake', <Snake api={api} onExit={noop} />)
mountAt('s-minesweeper', <Minesweeper api={api} onExit={noop} />)

// --- theme switcher --------------------------------------------------------------

function applyTheme(name: string): void {
  const tokens = THEMES[name]
  const root = document.documentElement
  // Clear every theme token first, so switching to a sparser theme cannot leave a stale
  // value behind — the same trap the real host push has.
  for (const t of Object.values(THEMES)) {
    for (const k of Object.keys(t)) root.style.removeProperty(k)
  }
  for (const [k, v] of Object.entries(tokens)) root.style.setProperty(k, v)
  // The page background stays the rig's OWN neutral, deliberately not the theme canvas.
  // Matching them made each screen blend into the page so its real bounds were invisible
  // — which is the one thing a sizing test rig must show.
  for (const b of document.querySelectorAll<HTMLButtonElement>('#themes button')) {
    b.setAttribute('aria-pressed', String(b.dataset.theme === name))
  }
}

const themesEl = document.getElementById('themes')!
for (const name of Object.keys(THEMES)) {
  const b = document.createElement('button')
  b.textContent = name
  b.dataset.theme = name
  b.onclick = () => applyTheme(name)
  themesEl.append(b)
}
// ?theme=Light pins a theme at load, so inheritance is screenshot-testable rather than
// only clickable — a theme bug that needs a human to click is a theme bug nobody catches.
const wanted = new URLSearchParams(location.search).get('theme')
applyTheme(wanted && THEMES[wanted] ? wanted : 'Agent Dark')

// Preview CSS motion only. Canvas/WebGL read the real media preference; verify those
// with the OS setting or browser media emulation, which also fires change listeners.
const reduceBtn = document.getElementById('reduce') as HTMLButtonElement
let reduced = false
const reduceStyle = document.createElement('style')
document.head.append(reduceStyle)
reduceBtn.onclick = () => {
  reduced = !reduced
  reduceBtn.setAttribute('aria-pressed', String(reduced))
  reduceStyle.textContent = reduced ? '*,*::before,*::after{transition:none!important;animation:none!important}' : ''
}
