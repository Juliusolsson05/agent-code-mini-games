import { useSyncExternalStore } from 'react'
import type { MiniGamesApi } from './api'
import type { GameAudio } from './audio'
import { Blackjack } from './games/blackjack/Blackjack'
import { Minesweeper } from './games/minesweeper/Minesweeper'
import { Snake } from './games/snake/Snake'
import { TypingTest } from './games/typing/TypingTest'
import { Launcher } from './launcher/Launcher'
import { router } from './router'

/** Routes between the host-selected initial game and navigation inside the modal. */
export function App({ api, audio }: { api: MiniGamesApi; audio: GameAudio }) {
  const screen = useSyncExternalStore(router.subscribe, router.get)

  return (
    <div className="mg-root">
      {screen === 'blackjack' ? (
        <Blackjack api={api} audio={audio} onExit={() => router.show('launcher')} />
      ) : screen === 'snake' ? (
        <Snake api={api} onExit={() => router.show('launcher')} />
      ) : screen === 'minesweeper' ? (
        <Minesweeper api={api} onExit={() => router.show('launcher')} />
      ) : screen === 'typing' ? (
        <TypingTest api={api} onExit={() => router.show('launcher')} />
      ) : (
        <Launcher onPlay={s => router.show(s)} />
      )}
    </div>
  )
}
