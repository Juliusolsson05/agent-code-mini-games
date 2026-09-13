import { memo, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { MiniGamesApi } from '../../api'

import {
  configKey,
  parseConfig,
  TIME_OPTIONS,
  TypingGame,
  VOCABULARY_OPTIONS,
  WORD_OPTIONS,
  type Sample,
  type TypingConfig,
  type TypingResult,
  type TypingSnapshot,
  type Vocabulary,
} from './engine/game'
import styles from './typing.css?inline'

const BEST_KEY = 'typing.best'
const CONFIG_KEY = 'typing.config'
// A two-minute test generates hundreds of words, and every keystroke re-renders the
// visible text. Only a window after the first visible line is rendered; lines that have
// scrolled away are dropped from the DOM entirely.
const RENDER_WINDOW = 90

type Caret = { x: number; y: number; height: number }

const vocabularyLabel = (vocabulary: Vocabulary) =>
  vocabulary === 10000 ? 'top 10k' : vocabulary === 1000 ? 'top 1k' : 'top 200'

const testLabel = (config: TypingConfig) =>
  `${config.mode} ${config.mode === 'time' ? config.time : config.words} · ${vocabularyLabel(config.vocabulary)}` +
  `${config.punctuation ? ' · punctuation' : ''}${config.numbers ? ' · numbers' : ''}`

// Memoised per word: a keystroke changes one word, so the rest of the line must not
// re-render its letters.
const Word = memo(function Word({ index, expected, typed, state }: { index: number; expected: string; typed: string; state: string }) {
  const letters: JSX.Element[] = []
  for (let i = 0; i < expected.length; i++) {
    const tone = i >= typed.length ? '' : typed[i] === expected[i] ? ' is-correct' : ' is-incorrect'
    letters.push(<span key={i} className={`tt-letter${tone}`}>{expected[i]}</span>)
  }
  for (let i = expected.length; i < typed.length; i++) {
    letters.push(<span key={i} className="tt-letter is-extra">{typed[i]}</span>)
  }
  return <div className={`tt-word${state}`} data-word={index}>{letters}</div>
})

function ResultChart({ samples }: { samples: Sample[] }) {
  // One point is not a line: a test shorter than two seconds would draw a lone marker on
  // an axis that runs backwards ("1s … 0s"). Say so plainly instead.
  if (samples.length < 2) {
    return <div className="tt-chart-empty">Type for a few seconds to see your speed over time.</div>
  }
  const width = 560
  const height = 150
  const left = 32
  const right = 10
  const top = 10
  const bottom = 22
  const peak = Math.max(10, ...samples.map(sample => Math.max(sample.wpm, sample.raw)))
  const ceiling = Math.ceil(peak / 20) * 20
  const last = samples[samples.length - 1]!.second
  const x = (second: number) => left + (last <= 1 ? 0 : ((second - 1) / (last - 1)) * (width - left - right))
  const y = (value: number) => top + (1 - value / ceiling) * (height - top - bottom)
  const line = (key: 'wpm' | 'raw') =>
    samples.map((sample, index) => `${index ? 'L' : 'M'}${x(sample.second).toFixed(1)} ${y(sample[key]).toFixed(1)}`).join(' ')
  return (
    <svg className="tt-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Words per minute and raw speed over the test, with errors marked">
      {[0, ceiling / 2, ceiling].map(value => (
        <g key={value}>
          <line x1={left} x2={width - right} y1={y(value)} y2={y(value)} className="tt-chart-grid" />
          <text x={left - 7} y={y(value) + 3} className="tt-chart-label" textAnchor="end">{value}</text>
        </g>
      ))}
      <path d={line('raw')} className="tt-chart-raw" />
      <path d={line('wpm')} className="tt-chart-wpm" />
      {samples.filter(sample => sample.errors > 0).map(sample => (
        <text key={sample.second} x={x(sample.second)} y={y(sample.raw) - 5} className="tt-chart-error" textAnchor="middle">×</text>
      ))}
      <text x={left} y={height - 5} className="tt-chart-label">1s</text>
      <text x={width - right} y={height - 5} className="tt-chart-label" textAnchor="end">{Math.round(last)}s</text>
    </svg>
  )
}

function Results({ result, config, onNext, onRepeat }: { result: TypingResult; config: TypingConfig; onNext: () => void; onRepeat: () => void }) {
  const { chars } = result
  return (
    <section className="tt-results" aria-label="Test results">
      <div className="tt-results-main">
        <div className="tt-big" data-stat="wpm"><span>wpm</span><strong data-value={result.wpm}>{Math.round(result.wpm)}</strong></div>
        <div className="tt-big" data-stat="accuracy"><span>acc</span><strong data-value={result.accuracy}>{Math.round(result.accuracy)}%</strong></div>
        {result.personalBest ? (
          <div className="tt-pb" role="status">
            New personal best{result.previousBest !== null ? ` · +${Math.round(result.wpm - result.previousBest)}` : ''}
          </div>
        ) : null}
      </div>
      <ResultChart samples={result.samples} />
      <dl className="tt-results-stats">
        <div className="tt-stat-wide"><dt>test type</dt><dd>{testLabel(config)}</dd></div>
        <div><dt>raw</dt><dd>{Math.round(result.raw)}</dd></div>
        <div title="correct / incorrect / extra / missed">
          <dt>characters</dt><dd>{chars.correct}/{chars.incorrect}/{chars.extra}/{chars.missed}</dd>
        </div>
        {/* Consistency compares seconds with each other, so it needs at least two of them. */}
        <div><dt>consistency</dt><dd>{result.samples.length < 2 ? '—' : `${result.consistency}%`}</dd></div>
        <div><dt>time</dt><dd>{result.seconds < 10 ? result.seconds.toFixed(1) : Math.round(result.seconds)}s</dd></div>
      </dl>
      <div className="tt-results-actions">
        {/* Focus lands here so Enter continues and Tab (handled on the root) restarts. */}
        <button type="button" className="tt-primary" onClick={onNext} autoFocus>Next test <kbd>tab</kbd></button>
        <button type="button" className="tt-secondary" onClick={onRepeat}>Repeat test</button>
      </div>
    </section>
  )
}

export function TypingTest({ api, onExit }: { api: MiniGamesApi; onExit: () => void }) {
  const gameRef = useRef<TypingGame | null>(null)
  const [snap, setSnap] = useState<TypingSnapshot | null>(null)
  const [bestLoaded, setBestLoaded] = useState(false)
  const [focused, setFocused] = useState(false)
  const [firstWord, setFirstWord] = useState(0)
  const [caret, setCaret] = useState<Caret | null>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const interactedRef = useRef(false)
  const writes = useRef<Promise<unknown>>(Promise.resolve())

  useEffect(() => {
    let disposed = false
    const game = new TypingGame(setSnap)
    gameRef.current = game
    interactedRef.current = false
    setBestLoaded(false)
    // Records merge into the engine whenever they arrive. Saved settings may only replace
    // untouched text: a player who already started must not have their test swapped out.
    void api.storage.get(BEST_KEY).then(value => {
      if (!disposed && value && typeof value === 'object') game.setBests(value)
      if (!disposed) setBestLoaded(true)
    }).catch(() => { /* Keep playing, but never overwrite records that could not be read. */ })
    void api.storage.get(CONFIG_KEY).then(value => {
      const config = parseConfig(value)
      if (!disposed && !interactedRef.current && config) game.reset(config)
    }).catch(() => { /* The default test is a safe fallback. */ })
    return () => {
      disposed = true
      gameRef.current = null
    }
  }, [api])

  const status = snap?.status
  const testId = snap?.testId
  const finished = status === 'finished'
  const personalBest = snap?.result?.personalBest

  useEffect(() => {
    if (status !== 'running') return
    // The engine only publishes a changed second, so a fast interval costs no renders.
    const timer = window.setInterval(() => gameRef.current?.tick(), 100)
    return () => window.clearInterval(timer)
  }, [status])

  useEffect(() => {
    if (!finished || !personalBest || !bestLoaded || !gameRef.current) return
    const bests = gameRef.current.getBests()
    // Serialise writes: the host bridge can complete them out of order.
    writes.current = writes.current.then(() => api.storage.set(BEST_KEY, bests)).catch(() => {})
  }, [api, bestLoaded, finished, personalBest, testId])

  // New or repeated text starts at the top with the keyboard ready.
  useLayoutEffect(() => {
    setFirstWord(0)
    setCaret(null)
  }, [testId])
  useEffect(() => {
    if (testId !== undefined && !finished) surfaceRef.current?.focus({ preventScroll: true })
  }, [testId, finished])

  useEffect(() => {
    const onWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      const surface = surfaceRef.current
      if (!surface || event.defaultPrevented || event.isComposing || event.metaKey || event.ctrlKey || event.altKey) return
      // Only claim keys nobody else owns. A focused host input, button or link keeps its
      // keystrokes; this just saves a click when focus is nowhere in particular.
      const active = document.activeElement
      if (active && active !== document.body && active !== document.documentElement) return
      if (event.key.length !== 1 || event.key === ' ') return
      event.preventDefault()
      surface.focus({ preventScroll: true })
      interactedRef.current = true
      gameRef.current?.type(event.key)
    }
    window.addEventListener('keydown', onWindowKeyDown)
    return () => window.removeEventListener('keydown', onWindowKeyDown)
  }, [])

  // Caret position and line scrolling both come from real layout: word widths depend on
  // the font the host theme supplies, so they cannot be computed from character counts.
  useLayoutEffect(() => {
    const container = wordsRef.current
    if (!container || !snap || snap.status === 'finished') return
    if (snap.wordIndex < firstWord) {
      setFirstWord(snap.wordIndex)
      return
    }
    const active = container.querySelector<HTMLElement>(`[data-word="${snap.wordIndex}"]`)
    if (!active) return
    const rendered = Array.from(container.querySelectorAll<HTMLElement>('[data-word]'))
    const lineTops: number[] = []
    for (const word of rendered) {
      if (Number(word.dataset.word) > snap.wordIndex) break
      if (!lineTops.includes(word.offsetTop)) lineTops.push(word.offsetTop)
    }
    // Three lines are visible. When the caret reaches the third, drop the first line so
    // the text scrolls by whole lines and the caret stays on the second.
    if (lineTops.length >= 3) {
      const secondLineStart = rendered.find(word => word.offsetTop === lineTops[1])
      if (secondLineStart) {
        setFirstWord(Number(secondLineStart.dataset.word))
        return
      }
    }
    const letters = active.querySelectorAll<HTMLElement>('.tt-letter')
    const typedLength = snap.words[snap.wordIndex]?.typed.length ?? 0
    const next = letters[typedLength]
    const last = letters[letters.length - 1]
    const x = next ? next.offsetLeft : last ? last.offsetLeft + last.offsetWidth : active.offsetLeft
    const y = active.offsetTop
    const height = active.offsetHeight
    setCaret(previous =>
      previous && previous.x === x && previous.y === y && previous.height === height ? previous : { x, y, height },
    )
  })

  if (!snap) return <div className="mg-loading">Warming up the keyboard…</div>

  const { config } = snap
  const running = snap.status === 'running'
  const best = snap.bests[configKey(config)]
  const visible = snap.words.slice(firstWord, firstWord + RENDER_WINDOW)

  const restart = () => {
    interactedRef.current = true
    gameRef.current?.reset()
  }
  const repeat = () => {
    interactedRef.current = true
    gameRef.current?.repeat()
  }
  const changeConfig = (patch: Partial<TypingConfig>) => {
    const game = gameRef.current
    if (!game) return
    interactedRef.current = true
    game.reset(patch)
    const saved = game.getSnapshot().config
    writes.current = writes.current.then(() => api.storage.set(CONFIG_KEY, saved)).catch(() => {})
  }

  const onRootKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Tab restarts from anywhere in the game, the convention typing tests share.
    // Shift+Tab is left alone so keyboard users can still reach the settings.
    if (event.key !== 'Tab' || event.shiftKey || event.altKey || event.metaKey || event.ctrlKey || event.nativeEvent.isComposing) return
    event.preventDefault()
    restart()
  }

  const onSurfaceKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const game = gameRef.current
    if (!game || event.nativeEvent.isComposing || event.key === 'Tab') return
    if (event.key === 'Backspace') {
      event.preventDefault()
      interactedRef.current = true
      game.backspace(event.altKey || event.ctrlKey || event.metaKey)
      return
    }
    // Every other modified key belongs to Agent Code: the palette, close, copy.
    if (event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) return
    event.preventDefault()
    interactedRef.current = true
    game.type(event.key)
  }

  const option = (pressed: boolean, label: string, onClick: () => void, children: React.ReactNode = label) => (
    <button type="button" aria-pressed={pressed} aria-label={label} onClick={onClick}>{children}</button>
  )

  return (
    <div className="tt-root" data-status={snap.status} data-mode={config.mode} onKeyDown={onRootKeyDown}>
      <style>{styles}</style>
      <nav className="tt-nav" aria-label="Game navigation">
        <button type="button" className="tt-back" onClick={onExit}><span aria-hidden="true">←</span> Arcade</button>
        <span className="tt-edition">THE FOCUS COLLECTION <span aria-hidden="true">/</span> 04</span>
      </nav>

      <header className="tt-heading">
        <div>
          <h1>Typing Test<span aria-hidden="true">.</span></h1>
          <p>Fast fingers. Clean words.</p>
        </div>
        <div className="tt-record">
          <span>PERSONAL BEST</span>
          <strong>{best ? Math.round(best.wpm) : '—'}{best ? <small>wpm</small> : null}</strong>
          <em>{testLabel(config)}</em>
        </div>
      </header>

      <div className="tt-config" role="toolbar" aria-label="Test settings" data-dimmed={running}>
        <div className="tt-config-group">
          {option(config.punctuation, 'punctuation', () => changeConfig({ punctuation: !config.punctuation }), <><span aria-hidden="true">@</span> punctuation</>)}
          {option(config.numbers, 'numbers', () => changeConfig({ numbers: !config.numbers }), <><span aria-hidden="true">#</span> numbers</>)}
        </div>
        <span className="tt-config-divider" aria-hidden="true" />
        <div className="tt-config-group">
          {option(config.mode === 'time', 'time', () => changeConfig({ mode: 'time' }))}
          {option(config.mode === 'words', 'words', () => changeConfig({ mode: 'words' }))}
        </div>
        <span className="tt-config-divider" aria-hidden="true" />
        <div className="tt-config-group">
          {config.mode === 'time'
            ? TIME_OPTIONS.map(time => <span key={time}>{option(config.time === time, `${time} seconds`, () => changeConfig({ time }), time)}</span>)
            : WORD_OPTIONS.map(words => <span key={words}>{option(config.words === words, `${words} words`, () => changeConfig({ words }), words)}</span>)}
        </div>
        <span className="tt-config-divider" aria-hidden="true" />
        <div className="tt-config-group">
          {VOCABULARY_OPTIONS.map(vocabulary => (
            <span key={vocabulary}>{option(config.vocabulary === vocabulary, vocabularyLabel(vocabulary), () => changeConfig({ vocabulary }))}</span>
          ))}
        </div>
      </div>

      {finished && snap.result ? (
        <Results result={snap.result} config={config} onNext={restart} onRepeat={repeat} />
      ) : (
        <section className="tt-stage" aria-label="Typing test">
          <div className="tt-live">
            <strong>{config.mode === 'time' ? snap.timeLeft : `${snap.wordIndex}/${snap.words.length}`}</strong>
            <span>{running ? `${Math.round(snap.liveWpm)} wpm · ${Math.round(snap.liveAccuracy)}%` : 'start typing to begin'}</span>
          </div>
          <div
            ref={surfaceRef}
            className="tt-surface"
            tabIndex={0}
            aria-label="Typing test text. Type the words shown; Tab restarts."
            onKeyDown={onSurfaceKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <div ref={wordsRef} className="tt-words">
              {visible.map((word, offset) => {
                const index = firstWord + offset
                const state = index === snap.wordIndex ? ' is-active' : index < snap.wordIndex && word.typed !== word.expected ? ' is-error' : ''
                return <Word key={index} index={index} expected={word.expected} typed={word.typed} state={state} />
              })}
              {caret ? (
                <span
                  className="tt-caret"
                  data-running={running}
                  aria-hidden="true"
                  style={{ height: caret.height * 0.64, transform: `translate(${caret.x}px, ${caret.y + caret.height * 0.18}px)` }}
                />
              ) : null}
            </div>
            {!focused ? <div className="tt-blur" aria-hidden="true"><span>Click here or start typing to focus</span></div> : null}
          </div>
        </section>
      )}

      <footer className="tt-footer">
        <span><kbd>tab</kbd> restart</span>
        <span><kbd>⌥</kbd> <kbd>⌫</kbd> delete word</span>
        <span>Records saved on this device</span>
      </footer>
    </div>
  )
}
