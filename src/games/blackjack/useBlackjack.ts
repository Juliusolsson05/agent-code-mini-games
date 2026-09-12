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
    let current = true
    // Storage resolves over the host bridge and can outlive a route change. The
    // engine owns its timers; this guard owns the React subscription. An old table
    // or Strict Mode's discarded mount must never update the current screen.
    const game = new BlackjackGame(api, next => { if (current) setState(next) }, {
      // IMPACT sounds are owned by the SCENE, not the engine (see Blackjack.tsx).
      // The engine knows when a card is dealt; only the scene knows when it lands. Firing
      // here played the swish while the card was still mid-air AND double-triggered it
      // once the scene gained its own impact hooks. Outcome sounds stay here — they're
      // about the result, which the engine alone decides.
      deal: () => {},
      chip: () => {},
      win: () => audio.win(),
      lose: () => audio.lose(),
      push: () => audio.push(),
      blackjack: () => audio.blackjack(),
    })
    gameRef.current = game
    setState(game.getState())
    return () => {
      current = false
      game.dispose()
      if (gameRef.current === game) gameRef.current = null
    }
  }, [api, audio])

  return { state, game: gameRef.current }
}
