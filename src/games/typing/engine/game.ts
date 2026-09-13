// Typing test rules.
//
// Pure state — no DOM, no timers of its own. The view feeds keystrokes and calls tick();
// time and randomness are injected so every statistic below is testable exactly.
//
// The measurements follow the conventions typists compare across tools:
// - wpm counts only characters of correctly typed words (plus the spaces after them),
//   five characters to a word, over the test's duration;
// - raw counts every character typed, right or wrong;
// - accuracy is correct keystrokes over all keystrokes, so a corrected mistake still costs;
// - consistency reflects how steady the per-second raw speed stayed.

import { VOCABULARY_OPTIONS, WordStream, type Vocabulary } from './words'

export { VOCABULARY_OPTIONS }
export type { Vocabulary }

export type TestMode = 'time' | 'words'
export const TIME_OPTIONS = [15, 30, 60, 120] as const
export const WORD_OPTIONS = [10, 25, 50, 100] as const
export type TimeOption = (typeof TIME_OPTIONS)[number]
export type WordOption = (typeof WORD_OPTIONS)[number]

export type TypingConfig = {
  mode: TestMode
  time: TimeOption
  words: WordOption
  punctuation: boolean
  numbers: boolean
  /** How many of the most frequent English words the test draws from. */
  vocabulary: Vocabulary
}

export const DEFAULT_CONFIG: TypingConfig = {
  mode: 'time',
  time: 30,
  words: 25,
  punctuation: false,
  numbers: false,
  vocabulary: 10000,
}

export type Status = 'ready' | 'running' | 'finished'
export type WordView = { expected: string; typed: string }
export type Sample = { second: number; wpm: number; raw: number; errors: number }
export type CharCounts = { correct: number; incorrect: number; extra: number; missed: number }
export type PersonalBest = { wpm: number; accuracy: number }

export type TypingResult = {
  wpm: number
  raw: number
  accuracy: number
  consistency: number
  chars: CharCounts
  seconds: number
  samples: Sample[]
  personalBest: boolean
  previousBest: number | null
}

export type TypingSnapshot = {
  /** Changes on every reset or repeat, so the view can return to the top of new text. */
  testId: number
  config: TypingConfig
  status: Status
  words: WordView[]
  wordIndex: number
  /** Whole seconds remaining in time mode; null in words mode. */
  timeLeft: number | null
  liveWpm: number
  liveAccuracy: number
  result: TypingResult | null
  bests: Record<string, PersonalBest>
}

export type TypingOptions = {
  now?: () => number
  random?: () => number
}

/** One personal best per distinct test shape: a 15-second test is not a 60-second one. */
export function configKey(config: TypingConfig): string {
  const amount = config.mode === 'time' ? config.time : config.words
  return `${config.mode}-${amount}-top${config.vocabulary}${config.punctuation ? '-punctuation' : ''}${config.numbers ? '-numbers' : ''}`
}

/** Saved settings come from storage; anything outside the offered options is ignored. */
export function parseConfig(value: unknown): TypingConfig | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Record<string, unknown>
  if (v.mode !== 'time' && v.mode !== 'words') return null
  if (!TIME_OPTIONS.includes(v.time as TimeOption) || !WORD_OPTIONS.includes(v.words as WordOption)) return null
  if (typeof v.punctuation !== 'boolean' || typeof v.numbers !== 'boolean') return null
  // Settings saved before the word-list choice existed fall back to the default list.
  const vocabulary = v.vocabulary === undefined ? DEFAULT_CONFIG.vocabulary : v.vocabulary
  if (!VOCABULARY_OPTIONS.includes(vocabulary as Vocabulary)) return null
  return {
    mode: v.mode,
    time: v.time as TimeOption,
    words: v.words as WordOption,
    punctuation: v.punctuation,
    numbers: v.numbers,
    vocabulary: vocabulary as Vocabulary,
  }
}

// A runaway key held down must not grow one word forever.
const MAX_EXTRA = 20
// Time mode generates words on demand; this many always wait ahead of the caret.
const LOOKAHEAD = 60

const round2 = (value: number) => Math.round(value * 100) / 100

function consistencyOf(samples: Sample[]): number {
  if (samples.length === 0) return 0
  const values = samples.map(sample => sample.raw)
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length
  if (mean === 0) return 0
  const deviation = Math.sqrt(values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length)
  return Math.round(Math.max(0, Math.min(100, 100 * (1 - deviation / mean))))
}

export class TypingGame {
  private config: TypingConfig = { ...DEFAULT_CONFIG }
  private stream!: WordStream
  private words: string[] = []
  private typed: string[] = []
  private wordIndex = 0
  private status: Status = 'ready'
  private startedAt = 0
  private testId = 0
  private correctKeys = 0
  private incorrectKeys = 0
  private samples: Sample[] = []
  private secondChars = 0
  private secondErrors = 0
  private liveWpm = 0
  private liveAccuracy = 100
  private result: TypingResult | null = null
  private bests: Record<string, PersonalBest> = {}
  private readonly now: () => number
  private readonly random: () => number

  constructor(private readonly onChange: (snapshot: TypingSnapshot) => void, options: TypingOptions = {}) {
    this.now = options.now ?? (() => performance.now())
    this.random = options.random ?? Math.random
    this.reset()
  }

  /** New text, optionally with changed settings. */
  reset(config: Partial<TypingConfig> = {}): void {
    this.config = { ...this.config, ...config }
    this.stream = new WordStream(this.config, this.random)
    this.words = []
    this.typed = []
    this.extend(this.config.mode === 'words' ? this.config.words : LOOKAHEAD * 2)
    this.clearProgress()
    this.emit()
  }

  /** The same text again, so a result can be retried like for like. */
  repeat(): void {
    this.typed = this.words.map(() => '')
    this.clearProgress()
    this.emit()
  }

  type(char: string): void {
    if (this.status === 'finished' || char.length !== 1) return
    if (char === ' ') {
      this.space()
      return
    }
    if (this.status === 'ready') {
      this.status = 'running'
      this.startedAt = this.now()
    }
    const expected = this.words[this.wordIndex]!
    const current = this.typed[this.wordIndex]!
    if (current.length >= expected.length + MAX_EXTRA) return
    this.count(expected[current.length] === char)
    this.typed[this.wordIndex] = current + char
    // Words mode ends the moment the final word is exact. Nobody presses space after the
    // last word, and waiting for one would add a dead keystroke to the measured time.
    if (this.config.mode === 'words' && this.wordIndex === this.words.length - 1 && this.typed[this.wordIndex] === expected) {
      this.finish(this.now())
      return
    }
    this.emit()
  }

  backspace(wholeWord = false): void {
    if (this.status !== 'running') return
    const current = this.typed[this.wordIndex]!
    if (current.length > 0) {
      this.typed[this.wordIndex] = wholeWord ? '' : current.slice(0, -1)
    } else if (this.wordIndex > 0 && this.typed[this.wordIndex - 1] !== this.words[this.wordIndex - 1]) {
      // A correct word is locked in, but a word typed wrong may be revisited and fixed.
      this.wordIndex -= 1
      if (wholeWord) this.typed[this.wordIndex] = ''
    } else {
      return
    }
    this.emit()
  }

  /** Advance the clock: records per-second samples and ends time mode at its limit. */
  tick(): void {
    if (this.status !== 'running') return
    const elapsed = (this.now() - this.startedAt) / 1000
    const limit = this.config.mode === 'time' ? this.config.time : Infinity
    const whole = Math.floor(Math.min(elapsed, limit))
    let sampled = false
    while (this.samples.length < whole) {
      this.sample(this.samples.length + 1)
      sampled = true
    }
    if (elapsed >= limit) {
      this.finish(this.startedAt + limit * 1000)
      return
    }
    if (sampled) this.emit()
  }

  setBests(value: unknown): void {
    if (!value || typeof value !== 'object') return
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (!entry || typeof entry !== 'object') continue
      const { wpm, accuracy } = entry as Record<string, unknown>
      if (typeof wpm !== 'number' || !Number.isFinite(wpm) || wpm <= 0) continue
      if (typeof accuracy !== 'number' || !Number.isFinite(accuracy)) continue
      // Merge rather than replace: a record set while storage was still loading must survive.
      if (!this.bests[key] || wpm > this.bests[key]!.wpm) this.bests[key] = { wpm, accuracy }
    }
    this.emit()
  }

  getBests(): Record<string, PersonalBest> {
    return Object.fromEntries(Object.entries(this.bests).map(([key, best]) => [key, { ...best }]))
  }

  getSnapshot(): TypingSnapshot {
    return {
      testId: this.testId,
      config: { ...this.config },
      status: this.status,
      words: this.words.map((expected, index) => ({ expected, typed: this.typed[index]! })),
      wordIndex: this.wordIndex,
      timeLeft: this.config.mode === 'time'
        ? this.status === 'finished' ? 0 : this.config.time - this.samples.length
        : null,
      liveWpm: this.liveWpm,
      liveAccuracy: this.liveAccuracy,
      result: this.result
        ? { ...this.result, chars: { ...this.result.chars }, samples: this.result.samples.map(sample => ({ ...sample })) }
        : null,
      bests: this.getBests(),
    }
  }

  private space(): void {
    if (this.status !== 'running') return
    const current = this.typed[this.wordIndex]!
    // Space on an empty word does nothing, so a double space cannot skip a word.
    if (current.length === 0) return
    this.count(current === this.words[this.wordIndex])
    if (this.config.mode === 'words' && this.wordIndex === this.words.length - 1) {
      this.finish(this.now())
      return
    }
    this.wordIndex += 1
    if (this.config.mode === 'time' && this.words.length - this.wordIndex < LOOKAHEAD) this.extend(LOOKAHEAD)
    this.emit()
  }

  private extend(count: number): void {
    for (let i = 0; i < count; i++) {
      this.words.push(this.stream.next())
      this.typed.push('')
    }
  }

  private clearProgress(): void {
    this.testId += 1
    this.wordIndex = 0
    this.status = 'ready'
    this.startedAt = 0
    this.correctKeys = 0
    this.incorrectKeys = 0
    this.samples = []
    this.secondChars = 0
    this.secondErrors = 0
    this.liveWpm = 0
    this.liveAccuracy = 100
    this.result = null
  }

  private count(correct: boolean): void {
    if (correct) this.correctKeys += 1
    else {
      this.incorrectKeys += 1
      this.secondErrors += 1
    }
    this.secondChars += 1
  }

  private sample(second: number): void {
    const stats = this.stats(second)
    this.samples.push({ second, wpm: stats.wpm, raw: this.secondChars * 12, errors: this.secondErrors })
    this.secondChars = 0
    this.secondErrors = 0
    this.liveWpm = stats.wpm
    this.liveAccuracy = stats.accuracy
  }

  private finish(at: number): void {
    const seconds = Math.max((at - this.startedAt) / 1000, 0.001)
    // Seal a final partial second so a closing burst still reaches the chart.
    if (this.samples.length < Math.ceil(seconds) && (this.secondChars > 0 || this.samples.length === 0)) {
      this.sample(round2(seconds))
    }
    this.status = 'finished'
    const stats = this.stats(seconds)
    const key = configKey(this.config)
    const previous = this.bests[key]?.wpm ?? null
    const personalBest = stats.chars.correct > 0 && (previous === null || stats.wpm > previous)
    if (personalBest) this.bests[key] = { wpm: stats.wpm, accuracy: stats.accuracy }
    this.result = {
      ...stats,
      consistency: consistencyOf(this.samples),
      seconds: round2(seconds),
      samples: this.samples.map(sample => ({ ...sample })),
      personalBest,
      previousBest: previous,
    }
    this.emit()
  }

  private stats(seconds: number): { wpm: number; raw: number; accuracy: number; chars: CharCounts } {
    const chars: CharCounts = { correct: 0, incorrect: 0, extra: 0, missed: 0 }
    let wordChars = 0
    let rawChars = 0
    for (let i = 0; i <= this.wordIndex && i < this.words.length; i++) {
      const expected = this.words[i]!
      const typed = this.typed[i]!
      // Only words the typist moved past can have missed letters; the current word is
      // simply unfinished.
      const committed = i < this.wordIndex
      for (let j = 0; j < Math.max(expected.length, typed.length); j++) {
        if (j >= expected.length) chars.extra += 1
        else if (j >= typed.length) { if (committed) chars.missed += 1 }
        else if (typed[j] === expected[j]) chars.correct += 1
        else chars.incorrect += 1
      }
      rawChars += typed.length + (committed ? 1 : 0)
      if (committed ? typed === expected : expected.startsWith(typed)) wordChars += typed.length + (committed ? 1 : 0)
    }
    const minutes = seconds / 60
    const keys = this.correctKeys + this.incorrectKeys
    return {
      wpm: round2(wordChars / 5 / minutes),
      raw: round2(rawChars / 5 / minutes),
      accuracy: keys === 0 ? 100 : round2((this.correctKeys / keys) * 100),
      chars,
    }
  }

  private emit(): void {
    this.onChange(this.getSnapshot())
  }
}
