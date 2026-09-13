import { test } from 'node:test'
import assert from 'node:assert/strict'
import english from '../src/games/typing/engine/english-10k.json'
import { TypingGame, configKey, parseConfig } from '../src/games/typing/engine/game.ts'
import { ENGLISH_WORDS, WordStream } from '../src/games/typing/engine/words.ts'

const seeded = (seed = 7) => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 4294967296
}
function boot() {
  let now = 0
  let last
  const game = new TypingGame(snapshot => { last = snapshot }, { now: () => now, random: seeded() })
  return { game, advance(ms) { now += ms }, snap: () => last }
}
const typeText = (game, text) => { for (const char of text) game.type(char) }
const round2 = value => Math.round(value * 100) / 100

test('the word list is the attributed top 10,000 plain English words, most frequent first', () => {
  assert.equal(ENGLISH_WORDS.length, 10000)
  assert.equal(new Set(ENGLISH_WORDS).size, 10000)
  assert.ok(ENGLISH_WORDS.every(word => /^[a-z]+$/.test(word)))
  assert.deepEqual(ENGLISH_WORDS.slice(0, 5), ['the', 'to', 'and', 'of', 'a'])
  assert.match(english.license, /CC BY-SA 4\.0/)
  assert.ok(english.attribution.some(line => line.includes('wordfreq')))
})

test('the clock starts on the first keystroke and words mode ends on the exact final word', () => {
  const { game, advance, snap } = boot()
  game.reset({ mode: 'words', words: 10 })
  advance(5000)
  assert.equal(snap().status, 'ready')
  const words = snap().words.map(word => word.expected)
  assert.equal(words.length, 10)
  typeText(game, words[0][0])
  assert.equal(snap().status, 'running')
  advance(60000)
  typeText(game, `${words[0].slice(1)} ${words.slice(1).join(' ')}`)
  const { status, result } = snap()
  assert.equal(status, 'finished')
  const typedChars = words.join(' ').length
  assert.equal(result.wpm, round2(typedChars / 5))
  assert.equal(result.raw, result.wpm)
  assert.equal(result.accuracy, 100)
  assert.deepEqual(result.chars, { correct: words.join('').length, incorrect: 0, extra: 0, missed: 0 })
  assert.equal(result.seconds, 60)
  game.type('x')
  assert.equal(snap().status, 'finished', 'a finished test ignores further typing')
})

test('mistakes, extra and skipped letters are counted, and only a wrong word can be revisited', () => {
  const { game, advance, snap } = boot()
  game.reset({ mode: 'time', time: 15 })
  const [first, second] = snap().words.map(word => word.expected)
  // Uppercase Z can never match a lowercase word; x and y overflow the word as extras.
  typeText(game, `Z${first.slice(1)}xy `)
  assert.equal(snap().wordIndex, 1)
  typeText(game, ' ')
  assert.equal(snap().wordIndex, 1, 'space on an empty word must not skip it')
  game.backspace()
  assert.equal(snap().wordIndex, 0, 'a wrong word can be revisited')
  game.backspace(true)
  typeText(game, `${first} `)
  assert.equal(snap().wordIndex, 1)
  game.backspace()
  assert.equal(snap().wordIndex, 1, 'a correct word is locked in')
  typeText(game, `${second[0]} `)
  advance(15000)
  game.tick()
  const { status, result } = snap()
  assert.equal(status, 'finished')
  assert.equal(result.samples.length, 15)
  assert.deepEqual(result.chars, { correct: first.length + 1, incorrect: 0, extra: 0, missed: second.length - 1 })
  const secondComplete = second.length === 1
  const correctKeys = (first.length - 1) + first.length + 1 + 1 + (secondComplete ? 1 : 0)
  const incorrectKeys = 1 + 2 + 1 + (secondComplete ? 0 : 1)
  assert.equal(result.accuracy, round2((correctKeys / (correctKeys + incorrectKeys)) * 100))
})

test('time mode keeps words ahead of the caret, samples each second and stops at its limit', () => {
  const { game, advance, snap } = boot()
  game.reset({ mode: 'time', time: 30 })
  const initial = snap().words.length
  for (let i = 0; i < initial; i++) typeText(game, `${snap().words[snap().wordIndex].expected} `)
  assert.ok(snap().words.length > initial)
  advance(1500)
  game.tick()
  assert.equal(snap().timeLeft, 29)
  assert.ok(snap().liveWpm > 0)
  advance(28400)
  game.tick()
  assert.equal(snap().status, 'running')
  advance(200)
  game.tick()
  assert.equal(snap().status, 'finished')
  assert.equal(snap().result.seconds, 30)
  assert.equal(snap().timeLeft, 0)
})

test('personal bests are kept per test shape and only ever improve', () => {
  const { game, advance, snap } = boot()
  const play = ms => {
    const words = snap().words.map(word => word.expected)
    typeText(game, words[0][0])
    advance(ms)
    typeText(game, `${words[0].slice(1)} ${words.slice(1).join(' ')}`)
  }
  game.setBests({ 'words-10-top10000': { wpm: 1, accuracy: 50 }, broken: { wpm: 'fast' } })
  game.reset({ mode: 'words', words: 10 })
  play(60000)
  assert.equal(snap().result.personalBest, true)
  assert.equal(snap().result.previousBest, 1)
  const best = game.getBests()['words-10-top10000'].wpm
  assert.equal(best, snap().result.wpm)
  assert.equal(game.getBests().broken, undefined)
  game.setBests({ 'words-10-top10000': { wpm: 0.5, accuracy: 10 } })
  assert.equal(game.getBests()['words-10-top10000'].wpm, best, 'a stored lower record never replaces a better one')
  game.repeat()
  play(120000)
  assert.equal(snap().result.personalBest, false)
  assert.equal(
    configKey({ mode: 'time', time: 60, words: 25, punctuation: true, numbers: false, vocabulary: 200 }),
    'time-60-top200-punctuation',
  )
})

test('snapshots are copies and saved settings are validated', () => {
  const { game, snap } = boot()
  const copy = snap()
  copy.words[0].typed = 'changed'
  copy.config.mode = 'words'
  assert.equal(game.getSnapshot().words[0].typed, '')
  assert.equal(game.getSnapshot().config.mode, 'time')
  const saved = { mode: 'words', time: 60, words: 50, punctuation: true, numbers: false, vocabulary: 1000 }
  assert.deepEqual(parseConfig(saved), saved)
  assert.equal(parseConfig({ ...saved, vocabulary: undefined }).vocabulary, 10000)
  assert.equal(parseConfig({ ...saved, time: 61 }), null)
  assert.equal(parseConfig({ ...saved, vocabulary: 5 }), null)
  assert.equal(parseConfig('time'), null)
})

test('word streams draw from the chosen vocabulary, avoid repeats and punctuate like prose', () => {
  const random = seeded(3)
  const top200 = new Set(ENGLISH_WORDS.slice(0, 200))
  const plain = new WordStream({ punctuation: false, numbers: false, vocabulary: 200 }, random)
  const plainWords = Array.from({ length: 500 }, () => plain.next())
  assert.ok(plainWords.every(word => top200.has(word)))
  assert.ok(plainWords.every((word, i) => i === 0 || word !== plainWords[i - 1]))
  const mixed = new WordStream({ punctuation: true, numbers: true, vocabulary: 10000 }, random)
  const words = Array.from({ length: 600 }, () => mixed.next())
  assert.match(words[0], /^["(]?[A-Z0-9]/)
  assert.ok(words.some(word => /\d/.test(word)))
  assert.ok(words.some(word => /[.,?!;:]$/.test(word)))
  words.forEach((word, i) => {
    if (i > 0 && /[.?!]$/.test(words[i - 1]) && /[a-z]/i.test(word)) assert.match(word, /^["(]?[A-Z]/)
  })
})
