import { Card } from '../cards/Card'
import type { Screen } from '../router'

/** The home screen — a grid of game tiles. Blackjack is live; the rest are teasers
 *  so the "hub" intent is visible from day one. */
export function Launcher({ onPlay }: { onPlay: (screen: Screen) => void }) {
  return (
    <div className="mg-launcher">
      <div className="mg-launcher-head">
        <div className="mg-launcher-title">Mini Games</div>
        <div className="mg-launcher-sub">A little arcade inside Agent Code</div>
      </div>

      <div className="mg-grid">
        <button className="mg-tile" onClick={() => onPlay('blackjack')}>
          <div className="mg-tile-art bj">
            <span className="mg-tile-card c1">
              <Card rank="A" suit="S" />
            </span>
            <span className="mg-tile-card c2">
              <Card rank="K" suit="H" />
            </span>
          </div>
          <div className="mg-tile-body">
            <div className="mg-tile-name">Blackjack</div>
            <div className="mg-tile-desc">Beat the dealer to 21 · chips, splits &amp; 3:2</div>
          </div>
        </button>

        <div className="mg-tile soon" aria-disabled="true">
          <div className="mg-tile-art soon">
            <span>♠ ♥ ♦ ♣</span>
          </div>
          <div className="mg-tile-body">
            <div className="mg-tile-name">More games</div>
            <div className="mg-tile-desc">Coming soon</div>
          </div>
        </div>
      </div>
    </div>
  )
}
