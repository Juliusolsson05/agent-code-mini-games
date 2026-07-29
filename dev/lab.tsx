import type { BJState } from '../src/games/blackjack/engine'
import { BlackjackScene } from '../src/games/blackjack/scene'

// Scene lab — pure 3D iteration. No React, no audio, no engine timers. We hand the
// scene a fixed dealt hand and let it render, so a headless screenshot is deterministic
// and I can actually SEE lighting/material/camera changes instead of tuning blind.
//
// Console helpers on window: __scene (the instance) and __set(partial) to mutate the
// canned state live (e.g. __set({ holeHidden: false })).

const DEALT: BJState = {
  phase: 'playing',
  bankroll: 475,
  bet: 25,
  playerHands: [
    {
      cards: [
        { rank: 'K', suit: 'S', id: 'p1' },
        { rank: 'Q', suit: 'H', id: 'p2' },
      ],
      bet: 25,
      outcome: null,
      done: false,
      doubled: false,
      splitAce: false,
    },
  ],
  activeHand: 0,
  dealer: [
    { rank: '3', suit: 'D', id: 'd1' },
    { rank: '10', suit: 'C', id: 'd2' },
  ],
  holeHidden: true,
  insuranceBet: 0,
  message: '',
  lastNet: 0,
  stats: { hands: 0, wins: 0, losses: 0, pushes: 0, blackjacks: 0 },
  settings: { decks: 6, hitSoft17: false, startingBankroll: 500 },
  shoeRemaining: 300,
}

const stage = document.getElementById('stage')
if (!stage) throw new Error('lab: #stage missing')

const scene = new BlackjackScene(stage)
scene.update(DEALT)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = window as any
w.__scene = scene
w.__set = (partial: Partial<BJState>) => scene.update({ ...DEALT, ...partial })

// ?state=win drives the scene to a settled winning hand so the payout stack (§9.4) can
// be screenshot-verified without playing a round.
if (new URLSearchParams(location.search).get('state') === 'win') {
  setTimeout(() => {
    scene.update({
      ...DEALT,
      holeHidden: false,
      phase: 'settle',
      lastNet: 75,
      message: 'You win $75',
    })
  }, 900)
}
