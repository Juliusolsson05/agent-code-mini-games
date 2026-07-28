import type { AgentCodeApiV1 } from 'agent-code-extension-api'
import { createRoot } from 'react-dom/client'

import { App } from '../App'
import { GameAudio } from '../audio'
import styles from '../styles.css?inline'

const STYLE_ID = 'agent-code-mini-games-styles'

function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = styles
  document.head.append(el)
}

/** The ViewMount the host calls: mounts the React app, wires an AudioContext that
 *  unlocks on the first interaction, and tears it all down on close. */
export function mountMiniGames(api: AgentCodeApiV1): (element: HTMLElement) => () => void {
  return (element: HTMLElement) => {
    injectStyles()

    const audio = new GameAudio()
    const unlock = () => audio.unlock()
    window.addEventListener('keydown', unlock)
    window.addEventListener('pointerdown', unlock)

    const root = createRoot(element)
    root.render(<App api={api} audio={audio} />)

    return () => {
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('pointerdown', unlock)
      audio.dispose()
      // Deferred: unmounting a React root synchronously from inside the host's own
      // effect cleanup warns and can drop effects.
      queueMicrotask(() => root.unmount())
    }
  }
}
