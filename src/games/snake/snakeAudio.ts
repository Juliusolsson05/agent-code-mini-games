// A small wooden-instrument sound palette keeps repeated turns and pickups pleasant
// over a long run. Everything is synthesized locally because the extension's CSP
// deliberately excludes external media, and the first context is a user gesture.
export class SnakeAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private muted = false

  unlock(): void {
    if (this.muted) return
    if (!this.ctx) {
      try {
        const Constructor = window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (!Constructor) return
        this.ctx = new Constructor()
        this.master = this.ctx.createGain()
        this.master.gain.value = 0.65
        this.master.connect(this.ctx.destination)
      } catch {
        this.ctx = null
        this.master = null
      }
    }
    if (this.ctx?.state === 'suspended') void this.ctx.resume().catch(() => {})
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    if (!this.ctx || !this.master) return
    // Every voice, including notes already scheduled in a fanfare, shares this gain.
    // Merely skipping new oscillators leaves those queued notes audible after mute.
    // The short ramp also avoids the click from severing a waveform mid-cycle.
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setTargetAtTime(muted ? 0 : 0.65, now, 0.018)
  }

  get isMuted(): boolean { return this.muted }

  private tone(frequency: number, duration: number, gain = 0.15, offset = 0, to?: number): void {
    const ctx = this.ctx
    if (!ctx || !this.master || this.muted || ctx.state === 'closed') return
    const start = ctx.currentTime + offset
    const oscillator = ctx.createOscillator()
    const envelope = ctx.createGain()
    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(frequency, start)
    if (to) oscillator.frequency.exponentialRampToValueAtTime(to, start + duration)
    envelope.gain.setValueAtTime(0.0001, start)
    envelope.gain.exponentialRampToValueAtTime(gain, start + 0.008)
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    oscillator.connect(envelope)
    envelope.connect(this.master)
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect() }
    oscillator.start(start)
    oscillator.stop(start + duration + 0.02)
  }

  start(): void {
    this.tone(392, 0.11, 0.12)
    this.tone(523.25, 0.16, 0.13, 0.075)
  }

  turn(): void { this.tone(280, 0.035, 0.032, 0, 210) }

  eat(score: number): void {
    // Repeat a friendly pentatonic phrase rather than climbing into an increasingly
    // shrill pitch as the score grows. The second note is the satisfying little pop.
    const notes = [523.25, 587.33, 659.25, 783.99, 880]
    const frequency = notes[(Math.max(1, score) - 1) % notes.length]
    this.tone(frequency, 0.105, 0.16)
    this.tone(frequency * 1.5, 0.13, 0.075, 0.045)
  }

  gameOver(): void {
    this.tone(330, 0.24, 0.12, 0, 165)
    this.tone(130.81, 0.24, 0.085, 0.15)
  }

  win(): void {
    for (const [index, frequency] of [523.25, 659.25, 783.99, 1046.5].entries())
      this.tone(frequency, index === 3 ? 0.42 : 0.19, 0.12, index * 0.11)
  }

  dispose(): void {
    if (this.ctx) void this.ctx.close().catch(() => {})
    this.ctx = null
    this.master = null
  }
}
