import { useEffect, useRef, useState } from 'react'
import type { AgentCodeApiV1 } from 'agent-code-extension-api'

import { Face, Flag, LedCounter, Mine, type FaceState } from '../../assets/svg/MinesweeperGlyphs'
import {
  LEVELS,
  MinesweeperGame,
  type Level,
  type MinesweeperSnapshot,
} from './engine/game'

const BEST_KEY = 'minesweeper.best'

/**
 * Cell size per level, chosen so every board fills a comparable footprint.
 *
 * A fixed cell size makes Beginner a postage stamp floating in a huge modal while Expert
 * sprawls — 9 columns and 30 columns cannot share one number. Scaling inversely with the
 * board keeps the WINDOW roughly constant instead: Beginner 9x48=432, Intermediate
 * 16x32=512, Expert 30x24=720. Bigger cells on the easy board is also just better — it's
 * the one people play casually, and there is no reason to render it small when the room
 * is there.
 */
const CELL_PX: Record<Level, number> = {
  beginner: 48,
  intermediate: 32,
  expert: 24,
}

/** Win95 number colours. Non-negotiable — these ARE Minesweeper. */
const NUM_COLOR = [
  '', // 0 renders empty
  '#0000ff', // 1 blue
  '#008000', // 2 green
  '#ff0000', // 3 red
  '#000080', // 4 navy
  '#800000', // 5 maroon
  '#008080', // 6 teal
  '#000000', // 7 black
  '#808080', // 8 grey
]

/**
 * Minesweeper — the Windows 95 game.
 *
 * Unlike Snake and Blackjack this needs no animation loop: the board is static and only
 * repaints on input. The one timer is a 1Hz tick for the clock, and it only runs while a
 * game is in progress.
 */
export function Minesweeper({ api, onExit }: { api: AgentCodeApiV1; onExit: () => void }) {
  const gameRef = useRef<MinesweeperGame | null>(null)
  const [snap, setSnap] = useState<MinesweeperSnapshot | null>(null)
  /** Both buttons held → chord on release. Tracked here because the engine is pure. */
  const chordRef = useRef(false)

  useEffect(() => {
    const game = new MinesweeperGame(setSnap)
    gameRef.current = game
    setSnap(game.getSnapshot())

    void api.storage
      .get<Record<string, number | null>>(BEST_KEY)
      .then(v => {
        if (v && typeof v === 'object') game.setBest(v as Partial<Record<Level, number | null>>)
      })

    // 1Hz clock. Cheap enough to leave running; the engine only emits while playing.
    const timer = setInterval(() => game.tick(), 250)
    return () => {
      clearInterval(timer)
      gameRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist best times whenever a game ends.
  const status = snap?.status
  useEffect(() => {
    if (status !== 'won') return
    const g = gameRef.current
    if (g) void api.storage.set(BEST_KEY, g.getBest() as never)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  if (!snap) return <div className="mg-loading">Loading…</div>
  const game = gameRef.current!

  const face: FaceState =
    snap.status === 'won' ? 'cool' : snap.status === 'lost' ? 'dead' : snap.peeking ? 'oh' : 'smile'

  const onCellDown = (e: React.MouseEvent, x: number, y: number) => {
    if (e.button === 2) {
      game.cycleMark(x, y)
      return
    }
    // Left+right together (or middle) arms a chord, resolved on mouse-up.
    if (e.buttons === 3 || e.button === 1) chordRef.current = true
    game.setPeeking(true)
  }

  const onCellUp = (e: React.MouseEvent, x: number, y: number) => {
    game.setPeeking(false)
    if (e.button === 2) return
    if (chordRef.current) {
      chordRef.current = false
      game.chord(x, y)
      return
    }
    if (e.button === 0) game.reveal(x, y)
  }

  const best = snap.best[snap.level]

  return (
    <div
      className="ms-root"
      style={{ ['--ms-cell' as string]: `${CELL_PX[snap.level]}px` }}
      onContextMenu={e => e.preventDefault()}
    >
      <div className="mg-topbar">
        <button className="mg-icon-btn" onClick={onExit} title="Back to games">
          ‹ Games
        </button>
        <div className="ms-levels">
          {(Object.keys(LEVELS) as Level[]).map(l => (
            <button
              key={l}
              className={`mg-seg-btn${snap.level === l ? ' active' : ''}`}
              style={{ width: 'auto', padding: '0 10px' }}
              onClick={() => game.reset(l)}
            >
              {l[0].toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
        <div className="mg-topbar-right">
          <span className="mg-stat-sm">Best {best === null ? '—' : `${best}s`}</span>
        </div>
      </div>

      {/* The window: raised outer bevel, exactly like the Win95 client area. */}
      <div className="ms-window">
        <div className="ms-header">
          <LedCounter value={snap.minesLeft} />
          <button
            className="ms-face"
            onClick={() => game.reset()}
            onMouseDown={e => e.preventDefault()}
            title="New game"
          >
            <Face state={face} />
          </button>
          <LedCounter value={snap.time} />
        </div>

        <div
          className="ms-field"
          style={{ gridTemplateColumns: `repeat(${snap.cols}, var(--ms-cell))` }}
          onMouseLeave={() => {
            chordRef.current = false
            game.setPeeking(false)
          }}
        >
          {snap.cells.map((cell, i) => {
            const x = i % snap.cols
            const y = Math.floor(i / snap.cols)

            if (!cell.revealed) {
              return (
                <button
                  key={i}
                  className="ms-cell ms-hidden"
                  onMouseDown={e => onCellDown(e, x, y)}
                  onMouseUp={e => onCellUp(e, x, y)}
                >
                  {cell.mark === 'flag' ? (
                    <Flag size={Math.round(CELL_PX[snap.level] * 0.62)} />
                  ) : cell.mark === 'question' ? (
                    <span className="ms-question">?</span>
                  ) : null}
                </button>
              )
            }

            return (
              <div
                key={i}
                className={`ms-cell ms-open${cell.detonated ? ' ms-boom' : ''}`}
                onMouseDown={e => onCellDown(e, x, y)}
                onMouseUp={e => onCellUp(e, x, y)}
              >
                {cell.mine ? (
                  <Mine size={Math.round(CELL_PX[snap.level] * 0.62)} />
                ) : cell.adjacent > 0 ? (
                  <span className="ms-num" style={{ color: NUM_COLOR[cell.adjacent] }}>
                    {cell.adjacent}
                  </span>
                ) : null}
              </div>
            )
          })}

          {/* Wrong flags are drawn as a struck-through mine on loss — the original's
              post-mortem, shown over the hidden cell that carried the bad flag. */}
          {snap.cells.map((cell, i) =>
            cell.wrongFlag ? (
              <div key={`w${i}`} className="ms-wrong" style={{ gridArea: `${Math.floor(i / snap.cols) + 1} / ${(i % snap.cols) + 1}` }}>
                <Mine size={Math.round(CELL_PX[snap.level] * 0.62)} />
                <span className="ms-x" />
              </div>
            ) : null,
          )}
        </div>
      </div>

      <div className="ms-foot">
        Left-click reveal · Right-click flag · Both buttons chord
      </div>
    </div>
  )
}
