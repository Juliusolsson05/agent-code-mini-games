import { useSyncExternalStore } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import type { GameAudio } from './audio'
import { Blackjack } from './games/blackjack/Blackjack'
import { Minesweeper } from './games/minesweeper/Minesweeper'
import { Snake } from './games/snake/Snake'
import { Launcher } from './launcher/Launcher'
import { router } from './router'

/** Routes between the launcher and a game. The screen lives in an external store so a
 *  contributed command (games.blackjack) can switch it from outside React. */
export function App({ api, audio }: { api: AgentCodeApiV1; audio: GameAudio }) {
  const screen = useSyncExternalStore(router.subscribe, router.get)

  return (
    <div className="mg-root">
      {screen === 'blackjack' ? (
        <Blackjack api={api} audio={audio} onExit={() => router.show('launcher')} />
      ) : screen === 'snake' ? (
        <Snake api={api} onExit={() => router.show('launcher')} />
      ) : screen === 'minesweeper' ? (
        <Minesweeper api={api} onExit={() => router.show('launcher')} />
      ) : (
        <Launcher onPlay={s => router.show(s)} />
      )}
    </div>
  )
}
