// A tiny external store for which screen is showing. Lives outside React so a
// contributed command (games.blackjack) invoked in the frame can flip the screen
// without a React handle — the App subscribes via useSyncExternalStore.
export type Screen = 'launcher' | 'blackjack' | 'snake'

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
