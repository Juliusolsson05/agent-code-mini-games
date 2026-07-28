// All sound is synthesized — the sandboxed frame's CSP forbids loading audio files.
// Web Audio is allowed; the context must be created/resumed from a user gesture
// (unlock()). Sounds are built from oscillators plus short bursts of filtered noise,
// which is what gives the chip a metallic "clink" and the card a paper "swish"
// rather than a pure beep.
export class GameAudio {
  private ctx: AudioContext | null = null
  private noiseBuf: AudioBuffer | null = null
  private muted = false

  unlock(): void {
    if (this.muted) return
    if (!this.ctx) {
      try {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        this.ctx = Ctor ? new Ctor() : null
        if (this.ctx) this.buildNoise()
      } catch {
        this.ctx = null
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume().catch(() => {})
  }

  setMuted(m: boolean): void {
    this.muted = m
  }
  get isMuted(): boolean {
    return this.muted
  }

  private buildNoise(): void {
    const ctx = this.ctx!
    const len = Math.floor(ctx.sampleRate * 0.4)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    this.noiseBuf = buf
  }

  private tone(
    freq: number,
    dur: number,
    type: OscillatorType,
    gain: number,
    offset = 0,
    glideTo?: number,
  ): void {
    const ctx = this.ctx
    if (!ctx || this.muted) return
    const t = ctx.currentTime + offset
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (glideTo !== undefined) osc.frequency.exponentialRampToValueAtTime(Math.max(1, glideTo), t + dur)
    env.gain.setValueAtTime(0.0001, t)
    env.gain.linearRampToValueAtTime(gain, t + 0.006)
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(env)
    env.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + dur + 0.02)
  }

  private noise(
    dur: number,
    gain: number,
    filter: BiquadFilterType,
    freq: number,
    q: number,
    offset = 0,
  ): void {
    const ctx = this.ctx
    if (!ctx || this.muted || !this.noiseBuf) return
    const t = ctx.currentTime + offset
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuf
    const flt = ctx.createBiquadFilter()
    flt.type = filter
    flt.frequency.value = freq
    if (q) flt.Q.value = q
    const env = ctx.createGain()
    env.gain.setValueAtTime(0.0001, t)
    env.gain.linearRampToValueAtTime(gain, t + 0.003)
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(flt)
    flt.connect(env)
    env.connect(ctx.destination)
    src.start(t)
    src.stop(t + dur + 0.02)
  }

  /** Card dealt/hit — a short paper swish. */
  deal(): void {
    this.noise(0.085, 0.11, 'bandpass', 1500, 0.7, 0)
    this.tone(210, 0.05, 'triangle', 0.03)
  }

  /** Chip placed — a bright metallic clink (two pings over a tick of noise). */
  chip(): void {
    this.noise(0.03, 0.05, 'highpass', 3200, 0, 0)
    this.tone(1180, 0.07, 'triangle', 0.11)
    this.tone(1580, 0.06, 'sine', 0.06, 0.012)
  }

  /** Win — a bright rising major arpeggio. */
  win(): void {
    this.tone(523, 0.1, 'triangle', 0.15, 0)
    this.tone(659, 0.1, 'triangle', 0.15, 0.09)
    this.tone(784, 0.16, 'triangle', 0.16, 0.18)
  }

  /** Blackjack — the win fanfare, taller and with a shimmer on top. */
  blackjack(): void {
    this.tone(523, 0.1, 'triangle', 0.15, 0)
    this.tone(659, 0.1, 'triangle', 0.15, 0.08)
    this.tone(784, 0.1, 'triangle', 0.16, 0.16)
    this.tone(1046, 0.24, 'triangle', 0.17, 0.24)
    this.tone(1568, 0.3, 'sine', 0.08, 0.28)
  }

  /** Loss — a soft, resigned descending pair. */
  lose(): void {
    this.tone(300, 0.16, 'sawtooth', 0.1, 0, 190)
    this.tone(150, 0.22, 'sine', 0.09, 0.1)
  }

  /** Push — a single neutral tick. */
  push(): void {
    this.tone(440, 0.09, 'sine', 0.09)
  }

  dispose(): void {
    if (this.ctx) {
      void this.ctx.close().catch(() => {})
      this.ctx = null
    }
  }
}
