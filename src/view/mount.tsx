import type { ViewContext } from 'agent-code-extension-api'
import { createRoot } from 'react-dom/client'

import { App } from '../App'
import { GameAudio } from '../audio'
import type { Screen } from '../router'
import { router } from '../router'
import styles from '../styles.css?inline'

const STYLE_ID = 'agent-code-mini-games-styles'

function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = styles
  document.head.append(el)
}

const INITIAL_SCREEN: Record<string, Screen> = {
  'mini-games.open': 'launcher',
  'mini-games.blackjack': 'blackjack',
  'mini-games.snake': 'snake',
  'mini-games.minesweeper': 'minesweeper',
}

/** The API v2 view mount: one built module backs four declarative modal targets.
 *  The host-selected view id is the launch intent, so a cold “Play Snake” command
 *  opens Snake directly without a runtime-to-DOM side channel. */
export function mountMiniGames(element: HTMLElement, context: ViewContext): () => void {
  injectStyles()
  router.show(INITIAL_SCREEN[context.view.id] ?? 'launcher')

  const audio = new GameAudio()
  const unlock = () => audio.unlock()
  window.addEventListener('keydown', unlock)
  window.addEventListener('pointerdown', unlock)

  const root = createRoot(element)
  root.render(<App api={context.api} audio={audio} />)

  return () => {
    window.removeEventListener('keydown', unlock)
    window.removeEventListener('pointerdown', unlock)
    audio.dispose()
    // Deferred: unmounting a React root synchronously from inside the host's own
    // effect cleanup warns and can drop effects.
    queueMicrotask(() => root.unmount())
  }
}
