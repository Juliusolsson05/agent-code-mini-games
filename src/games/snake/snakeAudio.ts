// Every sound is synthesized from oscillators — the sandboxed extension frame's CSP
// forbids network and blob: sources, so there are no audio files to load. Web Audio
// is allowed in the frame; the only rule is that the AudioContext must be created
// (or resumed) from a real user gesture, or the browser keeps it suspended. We do
// that on the first keypress via unlock().
export class SnakeAudio {
  private ctx: AudioContext | null = null
  private muted = false

  /** Lazily create + resume the context. Call from a keydown handler. */
  unlock(): void {
    if (this.muted) return
    if (!this.ctx) {
      try {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        this.ctx = Ctor ? new Ctor() : null
      } catch {
        this.ctx = null
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume().catch(() => {})
  }

  setMuted(muted: boolean): void {
    this.muted = muted
  }
  get isMuted(): boolean {
    return this.muted
  }

  /** One enveloped tone. gain is peak; the fast attack + exponential decay is what
   *  makes it read as a "blip" rather than a click or a drone. */
  private tone(
    freq: number,
    dur: number,
    type: OscillatorType,
    gain: number,
    offset = 0,
  ): void {
    const ctx = this.ctx
    if (!ctx || this.muted) return
    const t = ctx.currentTime + offset
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    env.gain.setValueAtTime(0.0001, t)
    env.gain.linearRampToValueAtTime(gain, t + 0.006)
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(env)
    env.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + dur + 0.02)
  }

  /** A pitch glide — used for the game-over "fall". */
  private glide(from: number, to: number, dur: number, type: OscillatorType, gain: number): void {
    const ctx = this.ctx
    if (!ctx || this.muted) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(from, t)
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), t + dur)
    env.gain.setValueAtTime(gain, t)
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(env)
    env.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + dur + 0.02)
  }

  /** Eat — a bright two-note pop, pitched up a touch with the score so a long run
   *  feels like it's climbing. This is the sound the whole game is tuned around. */
  eat(score: number): void {
    const base = 540 + Math.min(score, 45) * 7
    this.tone(base, 0.07, 'triangle', 0.2)
    this.tone(base * 1.5, 0.09, 'triangle', 0.16, 0.055)
  }

  /** Turn — a soft, low tick so steering has tactile feedback without nagging. */
  turn(): void {
    this.tone(240, 0.028, 'square', 0.04)
  }

  /** Start / new game — a quick rising arpeggio. */
  start(): void {
    this.tone(440, 0.08, 'triangle', 0.16, 0)
    this.tone(587, 0.08, 'triangle', 0.16, 0.075)
    this.tone(880, 0.12, 'triangle', 0.17, 0.15)
  }

  /** Game over — a descending fall plus a low thud. */
  gameOver(): void {
    this.glide(440, 90, 0.5, 'sawtooth', 0.18)
    this.tone(120, 0.28, 'sine', 0.14, 0.14)
  }

  dispose(): void {
    if (this.ctx) {
      void this.ctx.close().catch(() => {})
      this.ctx = null
    }
  }
}
