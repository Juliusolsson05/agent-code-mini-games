// Word supply for the typing test.
//
// The words are the 10,000 most frequent plain English words, most frequent first,
// generated from wordfreq by dev/generate-typing-words.py. The JSON carries its own
// attribution and CC BY-SA 4.0 license so the list never travels without its credits.
// The easier vocabularies are slices of the same ranked list rather than separate data:
// "top 200" is exactly the first 200 of "top 10k".
import english from './english-10k.json'

export const ENGLISH_WORDS: readonly string[] = english.words

export const VOCABULARY_OPTIONS = [200, 1000, 10000] as const
export type Vocabulary = (typeof VOCABULARY_OPTIONS)[number]

export type WordOptions = { punctuation: boolean; numbers: boolean; vocabulary: Vocabulary }

/**
 * An endless, seedable word source.
 *
 * WHY a stream with memory instead of independent picks: two rules need the previous
 * word. A repeated word ("the the") reads like a rendering glitch mid-test, and with
 * punctuation on, the word after a sentence end must be capitalised or the text stops
 * looking like prose.
 */
export class WordStream {
  private previous = ''
  private sentenceStart = true
  private readonly size: number

  constructor(private readonly options: WordOptions, private readonly random: () => number) {
    this.size = Math.min(options.vocabulary, ENGLISH_WORDS.length)
  }

  next(): string {
    if (this.options.numbers && this.random() < 0.12) {
      const digits = 1 + Math.floor(this.random() * 4)
      const value = String(Math.floor(this.random() * 10 ** digits))
      this.previous = value
      return this.options.punctuation ? this.punctuate(value, false) : value
    }
    let base = this.pick()
    for (let tries = 0; base === this.previous && tries < 8; tries++) base = this.pick()
    this.previous = base
    return this.options.punctuation ? this.punctuate(base, true) : base
  }

  private pick(): string {
    return ENGLISH_WORDS[Math.floor(this.random() * this.size)] ?? ENGLISH_WORDS[0]!
  }

  private punctuate(word: string, letters: boolean): string {
    let out = word
    if (this.sentenceStart && letters) out = out[0]!.toUpperCase() + out.slice(1)
    this.sentenceStart = false
    const roll = this.random()
    if (roll < 0.08) out += ','
    else if (roll < 0.14) { out += '.'; this.sentenceStart = true }
    else if (roll < 0.16) { out += '?'; this.sentenceStart = true }
    else if (roll < 0.18) { out += '!'; this.sentenceStart = true }
    else if (roll < 0.2) out += ';'
    else if (roll < 0.22 && letters) out = `"${out}"`
    else if (roll < 0.24 && letters) out = `(${out})`
    else if (roll < 0.255 && letters) out += ':'
    return out
  }
}
