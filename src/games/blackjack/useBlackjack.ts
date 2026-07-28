import { useEffect, useRef, useState } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import type { GameAudio } from '../../audio'
import { BlackjackGame, type BJState } from './engine'

/** Owns one BlackjackGame for the life of the component and mirrors its state. The
 *  game is created in an effect (not during render) so its emits never fire mid-render. */
export function useBlackjack(
  api: AgentCodeApiV1,
  audio: GameAudio,
): { state: BJState | null; game: BlackjackGame | null } {
  const [state, setState] = useState<BJState | null>(null)
  const gameRef = useRef<BlackjackGame | null>(null)

  useEffect(() => {
    const game = new BlackjackGame(api, setState, {
      deal: () => audio.deal(),
      chip: () => audio.chip(),
      win: () => audio.win(),
      lose: () => audio.lose(),
      push: () => audio.push(),
      blackjack: () => audio.blackjack(),
    })
    gameRef.current = game
    setState(game.getState())
    return () => {
      game.dispose()
      gameRef.current = null
    }
    // api + audio are stable for the component's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { state, game: gameRef.current }
}
