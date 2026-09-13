import type { ReactNode } from 'react'
import { BlackjackArt, MinesweeperArt, SnakeArt, TypingArt } from '../assets/svg/GameArt'
import type { Screen } from '../router'

type Game = {
  screen: Screen
  name: string
  genre: string
  line: string
  art: ReactNode
  marquee: string
  number: string
}
const GAMES: Game[] = [
  { screen: 'snake', name: 'Snake', genre: 'ARCADE', line: 'One more apple. One more turn.', art: <SnakeArt />, marquee: '#83b549', number: '01' },
  { screen: 'blackjack', name: 'Blackjack', genre: 'CARD TABLE', line: 'Take a seat. Play your hand.', art: <BlackjackArt />, marquee: '#dab268', number: '02' },
  { screen: 'minesweeper', name: 'Minesweeper', genre: 'PUZZLE', line: 'A clear head. A careful click.', art: <MinesweeperArt />, marquee: '#e18554', number: '03' },
  { screen: 'typing', name: 'Typing Test', genre: 'SPEED', line: 'Fast fingers. Clean words.', art: <TypingArt />, marquee: '#f2c94c', number: '04' },
]

/** The shared frame belongs to the host theme; each preview promises the actual game
 * inside. Keeping that distinction lets the arcade feel coherent without turning a
 * garden, a card table and a minefield into three copies of the same settings panel. */
export function Launcher({ onPlay }: { onPlay: (screen: Screen) => void }) {
  return (
    <div className="mg-launcher">
      <header className="mg-head">
        <div>
          <div className="mg-eyebrow"><span className="mg-lamp" aria-hidden="true" /> A MOMENT TO PLAY</div>
          <h1 className="mg-mark">Mini Games<span aria-hidden="true">.</span></h1>
          <p className="mg-intro">Pick a favorite. Make it a good break.</p>
        </div>
        <span className="mg-head-note">FOUR GAMES<br />ALL YOURS</span>
      </header>
      <div className="mg-grid">
        {GAMES.map(game => (
          <button key={game.screen} className="mg-cab" style={{ ['--marquee' as string]: game.marquee }} onClick={() => onPlay(game.screen)} aria-label={`Play ${game.name}`}>
            <span className="mg-cab-light" aria-hidden="true" />
            <span className="mg-cab-art">{game.art}</span>
            <span className="mg-cab-body">
              <span className="mg-cab-meta"><span>{game.genre}</span><span>{game.number}</span></span>
              <span className="mg-cab-name">{game.name}</span>
              <span className="mg-cab-line">{game.line}</span>
              <span className="mg-cab-play">Let’s play <span aria-hidden="true">↗</span></span>
            </span>
          </button>
        ))}
      </div>
      <footer className="mg-launcher-foot"><span>Made for the moments between.</span><span>Records saved on this device</span></footer>
    </div>
  )
}
