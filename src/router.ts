// A tiny external store for which screen is showing. The host-selected v2 view id
// seeds it before React mounts, then launcher/back controls use the same path. This
// keeps direct palette launches and in-modal navigation on one source of truth.
export type Screen = 'launcher' | 'blackjack' | 'snake' | 'minesweeper' | 'typing' | 'blockfall'

type Listener = () => void

let screen: Screen = 'launcher'
const listeners = new Set<Listener>()

export const router = {
  get(): Screen {
    return screen
  },
  show(next: Screen): void {
    if (next === screen) return
    screen = next
    for (const l of listeners) l()
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}
