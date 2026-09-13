// Blockfall's whole sound palette is synthesized here with the Web Audio API. There are
// no files to load, and that is not only a style choice: the extension frame's CSP forbids
// media fetches, so a sample-based palette could never ship. Like the sibling games
// (src/audio.ts, snake/snakeAudio.ts), the AudioContext is created lazily in unlock(),
// which the component calls from a user gesture, because browsers refuse to start audio
// any other way.
//
// Mixing goal, in one sentence: frequent actions are quiet, dry ticks and rewards carry the
// energy. A fast player can move, soft-drop and rotate twenty or more times a second; if
// those sounds were as present as a line clear, the mix would turn into a wall of clicks and
// the clears (the part that should feel great) would drown. So the ticks sit about 20 dB
// under the rewards, skip the reverb, are rate-limited and capped. The chords, bells and
// shimmers get stereo spread, reverb and the headroom.
//
// Signal chain:
//
//   voice source ─ [filter] ─ envelope ─ [panner] ─┬─> master ─> compressor ─> destination
//                                                  └─> send ─> highpass ─> convolver ─> return ─> master
//
// The reverb return feeds master, not the compressor directly. Mute ramps master, which
// silences the reverb tail too. Otherwise a muted player would still hear half a second of
// room ringing after pressing M.

export type ClearSound = { lines: number; tspin: 'none' | 'mini' | 'full'; b2b: boolean; combo: number; perfectClear: boolean }

// Voice groups exist for one reason: stealing inside a group can never cut into a
// different kind of sound. A burst of move ticks at ARR 0 must never steal the tail of a
// quad chord, and a big reward stack must never cut the lock click the player needs for
// timing. Each group gets its own cap, sized to what that category needs at the fastest
// plausible play.
type Group = 'tick' | 'contact' | 'action' | 'music'

type Voice = {
  group: Group
  // Absolute AudioContext times. `start` can be in the future for arpeggio notes, which
  // is why stealing and hushing compare scheduled times, not insertion order.
  start: number
  end: number
  env: GainNode
  // Every node this voice created besides its sources, so onended can disconnect the whole
  // chain. Orphaned GainNodes and filters are cheap one by one, but a long Marathon at
  // several sounds per second would otherwise leak thousands of them.
  nodes: AudioNode[]
  sources: AudioScheduledSourceNode[]
}

// One nullable object instead of four nullable fields. After a single `live()` check,
// every primitive holds non-null references with no `!` assertions. It also cannot end up
// half-built, for example a context without a master gain after a failed construction.
type Graph = {
  ctx: AudioContext
  master: GainNode
  reverbInput: AudioNode
  noise: AudioBuffer
}

type Shape = {
  group: Group
  /** Seconds after "now" to start. */
  at?: number
  /** Total length including the attack. The envelope reaches silence exactly here. */
  dur: number
  gain: number
  attack?: number
  /** Reverb send level. Leave it undefined for ticks; see the header for why. */
  send?: number
  pan?: number
}

type ToneShape = Shape & {
  freq: number
  /** Glide target, reached `glide` seconds after the start (default: the whole note). */
  to?: number
  glide?: number
  type?: OscillatorType
  /** Lowpass cutoff at the start; `lowpassTo` is reached at the end of the note. */
  lowpass?: number
  lowpassTo?: number
}

type NoiseShape = Shape & {
  filter: BiquadFilterType
  freq: number
  to?: number
  q?: number
}

type BellShape = Shape & {
  freq: number
}

// Master level is set well below 1 on purpose. Chromium's DynamicsCompressorNode applies
// automatic makeup gain derived from threshold and ratio (about +7 dB with the settings
// below), so everything under the threshold comes out louder than the voice gains suggest.
// 0.55 into the compressor sits roughly where snake's uncompressed 0.65 does, so switching
// between games does not jump in loudness.
const MASTER_LEVEL = 0.55
// Same 18 ms time constant as snake: fast enough that M feels immediate, slow enough that
// cutting a waveform mid-cycle does not click.
const MUTE_TIME_CONSTANT = 0.018
// A stolen voice fades over a few milliseconds rather than stopping dead. A hard stop mid-
// cycle is a click, and a click on every stolen tick at ARR 0 would be the harshest sound
// in the game.
const STEAL_TIME_CONSTANT = 0.005
const SILENT = 0.0001
// The reverb is a sense of space, not an effect you notice. Per-voice sends stay at 0.6 or
// below, and the return is kept low so rapid clears stay articulate instead of smearing
// into each other.
const REVERB_RETURN = 0.28
const REVERB_SECONDS = 0.5

// Caps count sources, not sound events: a hard drop is four sources and a move is one.
// The caps are backstops. The per-sound rate limits in `admit()` do most of the work, and
// these catch whatever gets through (for example a move storm while the context's clock
// jumps in large buffer-sized steps). Music is generous because a back-to-back quad
// perfect clear on a high combo that also levels up stacks around 70 sources, and stealing
// inside the celebration would audibly chop it.
const VOICE_CAPS: Record<Group, number> = { tick: 4, contact: 6, action: 14, music: 80 }

// A3. Every tonal sound is in A major, so any combination that lands in the same frame
// (a clear followed by a level up, the last clear followed by `complete`) is consonant
// by construction, never two keys clashing. A3 as the chord root leaves room for the combo
// climb: the highest chord voice at the combo cap is C#7 at low gain, so it never gets shrill.
const ROOT_MIDI = 57
const PENTATONIC = [0, 2, 4, 7, 9] as const
// Combo escalation climbs this scale one step per consecutive clear, then holds. The major
// pentatonic has no semitone steps, so every step is an audible, unambiguous "up". Moving a
// major chord along it (A, B, C#, E, F#, A, B, C#) gives the parallel-major lift that reads
// as triumphant rather than tense. Eight steps (just over an octave) is where it stops:
// guideline combos often reach 5 to 10, and going further would push the voicing into a
// thin, piercing register. Past the cap the escalation continues through the shimmer layer,
// not pitch.
const COMBO_STEPS = [0, 2, 4, 7, 9, 12, 14, 16] as const
// From this combo count on, an extra sparkle layer rides on the clear. This is the "you
// are on fire" signal once pitch has nearly run out of room.
const SHIMMER_COMBO = 5
// Ceilings for sounds built from high partials (bells, sparkles). FM bells and sine sparkles
// above about E7 read as a whistle instead of glass.
const BELL_CEILING_MIDI = 100
const SPARKLE_CEILING_MIDI = 100

// Chord voicings by line count, in semitones above the (combo-shifted) root. A bigger clear
// means a wider, fuller chord growing mostly downward, plus length and a shimmer for the
// quad, not a higher top note. Growing upward would collide with the combo climb and push
// a quad on a high combo into a shrill register.
const CHORD_VOICINGS: readonly (readonly number[])[] = [
  [12, 16, 19],
  [0, 12, 16, 19],
  [0, 7, 12, 16, 19, 24],
  [-12, 0, 7, 12, 16, 19, 24],
]
const CHORD_SECONDS = [0.34, 0.46, 0.62, 0.95] as const
const QUAD_SPARKLE = [28, 31, 36, 40] as const

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

// The component passes engine numbers straight through. NaN or Infinity arriving here must
// degrade to a harmless default. NaN would silently poison every AudioParam it touches,
// and an unbounded value could index past a table.
function wholeNumber(value: number, min: number, max: number): number {
  return Number.isFinite(value) ? clamp(Math.floor(value), min, max) : min
}

function hz(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12)
}

// Jitter is in cents rather than a linear ratio, so the same spread sounds equally subtle on
// a 150 Hz thump and a 5 kHz click. Players hear every move and rotate thousands of times
// per session. An identical waveform every time quickly reads as a machine-gun sample,
// while a few cents of wobble reads as a physical object.
function jitter(cents: number): number {
  return 2 ** (((Math.random() * 2 - 1) * cents) / 1200)
}

// Shift a whole phrase down by octaves when its top note crosses a ceiling. The phrase
// moves as one unit so the arpeggio keeps its shape. Folding notes one by one would make an
// ascending arpeggio suddenly dip in the middle, which sounds like a wrong note, not a
// register change.
function registerShift(notes: readonly number[], ceiling: number): number {
  const top = Math.max(...notes)
  return top > ceiling ? -12 * Math.ceil((top - ceiling) / 12) : 0
}

// White noise as the raw material for every non-tonal sound: clicks, thumps, whooshes,
// sparkle. One second is long enough that random start offsets (see `launch`) never
// repeat noticeably, and short enough to allocate instantly in unlock().
function buildNoise(ctx: BaseAudioContext): AudioBuffer {
  const length = Math.floor(ctx.sampleRate)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1
  return buffer
}

// A procedural impulse response: half a second of decaying stereo noise. This is not
// modelled on any real room; it only has to add a little air around the rewards.
// - The two channels are independent noise, so the tail is decorrelated and sounds wide
//   instead of sitting in the center.
// - A short silent pre-delay separates the dry attack from the wet onset, which keeps
//   transients crisp even with reverb on them.
// - The one-pole smoothing gets heavier over the tail, so later reflections are darker
//   than early ones, the way air absorbs highs in a real space. An undamped noise tail
//   sounds like hiss rather than room.
function buildImpulse(ctx: BaseAudioContext): AudioBuffer {
  const rate = ctx.sampleRate
  const length = Math.floor(rate * REVERB_SECONDS)
  const preDelay = Math.floor(rate * 0.012)
  const impulse = ctx.createBuffer(2, length, rate)
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel)
    let smoothed = 0
    for (let i = preDelay; i < length; i++) {
      const progress = (i - preDelay) / (length - preDelay)
      const damping = 0.1 + 0.75 * progress
      smoothed = smoothed * damping + (Math.random() * 2 - 1) * (1 - damping)
      data[i] = smoothed * (1 - progress) ** 2.6
    }
  }
  return impulse
}

export class BlockfallAudio {
  private graph: Graph | null = null
  private muted = false
  private voices: Voice[] = []
  // Last admitted time per rate-limited sound, in AudioContext seconds (see `admit`).
  private lastPlayed = new Map<string, number>()
  private lastHardDrop = -Infinity

  unlock(): void {
    // Mirrors snake: a muted player never gets a context. That costs nothing. The component
    // calls unlock() right after unmuting, and unmuting is itself a key press or click, so
    // the context is created from a valid gesture the moment sound is wanted.
    if (this.muted) return
    if (!this.graph) this.graph = this.build()
    const ctx = this.graph?.ctx
    if (ctx?.state === 'suspended') void ctx.resume().catch(() => {})
  }

  private build(): Graph | null {
    let ctx: AudioContext | null = null
    try {
      const Constructor = window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Constructor) return null
      ctx = new Constructor()

      const master = ctx.createGain()
      master.gain.value = MASTER_LEVEL

      // The compressor is the peak controller, so the voice gains can be tuned for feel
      // rather than for worst-case summing. A back-to-back quad perfect clear stacks dozens of
      // voices, and without this it would clip or force every reward to be timid.
      // - The fast 3 ms attack catches a hard drop's thump.
      // - A 3.5:1 ratio with a soft knee is gentle enough that one clear does not audibly pump.
      // - The 160 ms release recovers between clears at speed, so a thump does not duck the
      //   chord that lands a frame later.
      // Chromium's compressor adds about 6 ms of lookahead latency. That is below anything a
      // player can feel next to the output device's own latency, and worth it for the headroom.
      const compressor = ctx.createDynamicsCompressor()
      compressor.threshold.value = -16
      compressor.knee.value = 10
      compressor.ratio.value = 3.5
      compressor.attack.value = 0.003
      compressor.release.value = 0.16
      master.connect(compressor)
      compressor.connect(ctx.destination)

      // The highpass before the convolver keeps low end out of the reverb. A reverberated
      // hard-drop thump turns into a muddy boom that hides the next lock click. Keeping the
      // room to mids and highs is most of what makes fast play sound crisp with reverb on.
      const reverbInput = ctx.createBiquadFilter()
      reverbInput.type = 'highpass'
      reverbInput.frequency.value = 320
      const convolver = ctx.createConvolver()
      convolver.buffer = buildImpulse(ctx)
      const reverbReturn = ctx.createGain()
      reverbReturn.gain.value = REVERB_RETURN
      reverbInput.connect(convolver)
      convolver.connect(reverbReturn)
      reverbReturn.connect(master)

      // Times recorded against a previous (disposed) context are meaningless on this new
      // clock, which starts again at 0. A stale lastPlayed would block sounds until the
      // new clock caught up.
      this.voices = []
      this.lastPlayed.clear()
      this.lastHardDrop = -Infinity
      return { ctx, master, reverbInput, noise: buildNoise(ctx) }
    } catch {
      // A context that was created but whose graph failed to build would keep an audio
      // device open for nothing.
      if (ctx) void ctx.close().catch(() => {})
      return null
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    const graph = this.graph
    if (!graph || graph.ctx.state === 'closed') return
    const now = graph.ctx.currentTime
    // Every voice, including arpeggio notes scheduled for later, shares this gain, so
    // ramping it is the only way to silence notes that are already queued. Skipping new
    // voices alone would let a perfect-clear fanfare finish after mute.
    const level = graph.master.gain
    level.cancelScheduledValues(now)
    level.setTargetAtTime(muted ? 0 : MASTER_LEVEL, now, MUTE_TIME_CONSTANT)
    if (!muted) return
    // After the ramp has reached silence, also retire every voice. Otherwise a quick
    // mute-unmute would bring back the rest of a fanfare mid-phrase, which sounds like a
    // glitch. Retiring also frees the nodes right away instead of when their tails end.
    // Iterate a copy, because kill() removes voices from the list.
    const settled = now + MUTE_TIME_CONSTANT * 5
    for (const voice of [...this.voices]) this.kill(voice, settled)
  }

  get isMuted(): boolean {
    return this.muted
  }

  // The single gate for all sound: no context yet (before unlock), no context any more
  // (after dispose), muted, or closed underneath us. A 'suspended' context still accepts
  // scheduling, deliberately. Right after unlock() the state is still 'suspended' until the
  // resume promise settles, and refusing then would drop the first countdown beep. Bunching
  // from a frozen clock is prevented by the rate limits, which cannot pass twice at the same
  // frozen time.
  private live(): Graph | null {
    const graph = this.graph
    if (!graph || this.muted || graph.ctx.state === 'closed') return null
    return graph
  }

  // Rate limit keyed by sound, measured on the audio clock. Web Audio time is what the
  // listener hears; two ticks 5 ms apart on the audio timeline are one blurred click no matter
  // how far apart the calls were in wall time. The critical case is ARR 0: the engine emits
  // one `move` per column in a single update, so without this limit up to nine ticks would
  // stack at the same instant and sum into one loud crack.
  // The `now >= last` check covers a clock that restarted (a new context after dispose)
  // before build() cleared the map.
  private admit(key: string, gap: number): Graph | null {
    const graph = this.live()
    if (!graph) return null
    const now = graph.ctx.currentTime
    const last = this.lastPlayed.get(key)
    if (last !== undefined && now >= last && now - last < gap) return null
    this.lastPlayed.set(key, now)
    return graph
  }

  // Builds a voice's envelope and output routing. The caller adds the sources and then calls
  // launch().
  // Envelope: linear attack, then an exponential fall to silence. Exponential decay is what
  // struck objects actually do, so clicks sound physical and chords ring naturally. The linear
  // attack avoids starting an exponential ramp from zero, which the API does not allow.
  private open(graph: Graph, shape: Shape): Voice {
    const { ctx } = graph
    const now = ctx.currentTime
    this.makeRoom(shape.group, now)
    const start = now + Math.max(0, shape.at ?? 0)
    const attack = Math.max(0.0005, shape.attack ?? 0.003)
    const end = start + Math.max(attack + 0.004, shape.dur)
    const env = ctx.createGain()
    // A GainNode defaults to 1, and the first automation event may be in the future (an
    // arpeggio note). Zero it first so a voice stolen before it starts can never hold a gain
    // of 1 while it fades out.
    env.gain.value = 0
    env.gain.setValueAtTime(0, start)
    env.gain.linearRampToValueAtTime(Math.max(SILENT * 2, shape.gain), start + attack)
    env.gain.exponentialRampToValueAtTime(SILENT, end)
    const voice: Voice = { group: shape.group, start, end, env, nodes: [env], sources: [] }

    let output: AudioNode = env
    // Stereo placement is for rewards only: chords strummed across the field, sparkles
    // scattered around it. The ticks stay centered and panner-free because they are the
    // most frequent sounds and gain nothing from width.
    if (shape.pan && typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner()
      panner.pan.value = clamp(shape.pan, -1, 1)
      env.connect(panner)
      output = panner
      voice.nodes.push(panner)
    }
    output.connect(graph.master)
    if (shape.send) {
      const send = ctx.createGain()
      send.gain.value = shape.send
      output.connect(send)
      send.connect(graph.reverbInput)
      voice.nodes.push(send)
    }
    return voice
  }

  // Makes room in a group by stealing its oldest still-sounding voice once the group is at
  // its cap. The oldest voice is the one that has decayed furthest, so losing it is the
  // least audible choice.
  // The loop allocates nothing because it runs on every tick. Voices whose scheduled end has
  // passed are not counted even if their onended has not fired yet; they are already silent.
  private makeRoom(group: Group, now: number): void {
    let count = 0
    let oldest: Voice | undefined
    for (const voice of this.voices) {
      if (voice.group !== group || voice.end <= now) continue
      count += 1
      if (!oldest || voice.start < oldest.start) oldest = voice
    }
    if (oldest && count >= VOICE_CAPS[group]) this.kill(oldest, now)
  }

  private kill(voice: Voice, at: number): void {
    this.forget(voice)
    const gain = voice.env.gain
    // cancelAndHoldAtTime freezes the envelope exactly where it is. The older
    // cancelScheduledValues plus setValueAtTime(value) fallback can jump by up to a render
    // quantum's worth of decay, which is still far better than an unfaded stop. The cast
    // exists because the method is missing in some engines (Firefox) even though the DOM
    // types always declare it.
    const holdAt = (gain as { cancelAndHoldAtTime?: (time: number) => AudioParam }).cancelAndHoldAtTime
    if (typeof holdAt === 'function') holdAt.call(gain, at)
    else {
      gain.cancelScheduledValues(at)
      gain.setValueAtTime(gain.value, at)
    }
    gain.setTargetAtTime(0, at, STEAL_TIME_CONSTANT)
    for (const source of voice.sources) {
      // Stopping again overrides the original stop time. A voice whose start is still in
      // the future and gets a stop before its start never sounds at all. The try only
      // guards engines that throw on a second stop().
      try {
        source.stop(at + STEAL_TIME_CONSTANT * 8)
      } catch {
        // Already stopped: nothing left to silence.
      }
    }
  }

  private forget(voice: Voice): void {
    const index = this.voices.indexOf(voice)
    if (index >= 0) this.voices.splice(index, 1)
  }

  private launch(voice: Voice): void {
    const last = voice.sources[voice.sources.length - 1]
    if (!last) return
    // Every source in a voice stops at the same time, so one onended is enough to tear down
    // the whole chain. release() is idempotent, so it is harmless when a stolen voice also
    // ends through this path.
    last.onended = () => this.release(voice)
    const stopAt = voice.end + 0.03
    for (const source of voice.sources) {
      if (source instanceof AudioBufferSourceNode) {
        // Start the noise at a random point in the looping buffer, so no two clicks share
        // the same grain. Together with pitch jitter this keeps rapid repeats from sounding
        // sampled.
        source.start(voice.start, Math.random() * (source.buffer?.duration ?? 0))
      } else {
        source.start(voice.start)
      }
      source.stop(stopAt)
    }
    this.voices.push(voice)
  }

  private release(voice: Voice): void {
    this.forget(voice)
    for (const source of voice.sources) source.disconnect()
    for (const node of voice.nodes) node.disconnect()
  }

  private tone(shape: ToneShape): void {
    const graph = this.live()
    if (!graph) return
    const { ctx } = graph
    const voice = this.open(graph, shape)
    const oscillator = ctx.createOscillator()
    oscillator.type = shape.type ?? 'triangle'
    oscillator.frequency.setValueAtTime(shape.freq, voice.start)
    if (shape.to) oscillator.frequency.exponentialRampToValueAtTime(shape.to, voice.start + (shape.glide ?? shape.dur))
    let head: AudioNode = oscillator
    if (shape.lowpass) {
      // A moving lowpass is what makes a sawtooth usable. It starts bright for the pluck's
      // bite and closes as the note decays, the way a real string loses its highs. An
      // unfiltered saw at these levels is exactly the buzzy harshness this mix avoids.
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(shape.lowpass, voice.start)
      if (shape.lowpassTo) filter.frequency.exponentialRampToValueAtTime(shape.lowpassTo, voice.end)
      oscillator.connect(filter)
      head = filter
      voice.nodes.push(filter)
    }
    head.connect(voice.env)
    voice.sources.push(oscillator)
    this.launch(voice)
  }

  private noise(shape: NoiseShape): void {
    const graph = this.live()
    if (!graph) return
    const { ctx } = graph
    const voice = this.open(graph, shape)
    const source = ctx.createBufferSource()
    source.buffer = graph.noise
    // Looping makes the random start offset safe for sounds of any length.
    source.loop = true
    // Playback-rate jitter shifts the noise's spectral balance slightly on every hit. It
    // is the noise equivalent of pitch jitter.
    source.playbackRate.value = jitter(150)
    const filter = ctx.createBiquadFilter()
    filter.type = shape.filter
    // For lowpass and highpass the Web Audio Q is a resonance in dB, not a bandwidth, so the
    // default stays unless a sound asks for something specific.
    if (shape.q !== undefined) filter.Q.value = shape.q
    filter.frequency.setValueAtTime(shape.freq, voice.start)
    if (shape.to) filter.frequency.exponentialRampToValueAtTime(shape.to, voice.end)
    source.connect(filter)
    filter.connect(voice.env)
    voice.nodes.push(filter)
    voice.sources.push(source)
    this.launch(voice)
  }

  // A two-operator FM bell: a sine carrier modulated by a sine at 3.5 times its frequency.
  // The non-integer ratio produces inharmonic sidebands, which is the glassy, struck-metal
  // quality. A decaying modulation index makes it bright on impact and pure as it rings.
  // This timbre is reserved for T-spins and a few arrival accents, so a T-spin is
  // recognizable by ear even when it clears the same number of lines as an ordinary clear.
  private bell(shape: BellShape): void {
    const graph = this.live()
    if (!graph) return
    const { ctx } = graph
    const voice = this.open(graph, { ...shape, attack: shape.attack ?? 0.002 })
    const ratio = 3.5
    const carrier = ctx.createOscillator()
    carrier.type = 'sine'
    carrier.frequency.value = shape.freq
    const modulator = ctx.createOscillator()
    modulator.type = 'sine'
    modulator.frequency.value = shape.freq * ratio
    const depth = ctx.createGain()
    // Modulation depth in Hz is the index times the modulator frequency. An index of about 1.1
    // is glassy without turning into a clangy gong; a decay to about 0.05 leaves an almost
    // pure sine ring.
    const modulatorHz = shape.freq * ratio
    depth.gain.setValueAtTime(modulatorHz * 1.1, voice.start)
    depth.gain.exponentialRampToValueAtTime(modulatorHz * 0.05, voice.start + Math.min(0.25, voice.end - voice.start))
    modulator.connect(depth)
    depth.connect(carrier.frequency)
    carrier.connect(voice.env)
    voice.nodes.push(depth)
    voice.sources.push(modulator, carrier)
    this.launch(voice)
  }

  // The chord note used for clears, the fanfare and completion: a triangle body for warmth
  // plus a quieter, slightly detuned, lowpass-swept saw for the bright attack. Triangle alone
  // is too soft to feel like a reward; saw alone is too brassy. Together they give a modern
  // "pluck". The independent few-cent detune per note gives chords a gentle chorus, so they
  // sound played rather than generated.
  private pluck(midi: number, at: number, dur: number, gain: number, pan: number, send: number): void {
    const freq = hz(midi) * jitter(4)
    this.tone({ group: 'music', at, dur, gain, pan, send, freq, type: 'triangle', attack: 0.004 })
    this.tone({
      group: 'music', at, dur: dur * 0.7, gain: gain * 0.42, pan, send,
      freq: freq * jitter(6), type: 'sawtooth', attack: 0.003,
      lowpass: Math.min(7000, freq * 6), lowpassTo: Math.max(500, freq * 1.1),
    })
  }

  // Random sine grains scattered across `spread` seconds. The notes come from the major
  // pentatonic, so any random pick is consonant with whatever chord is under it: a shimmer
  // can never land a wrong note. The randomness is also what makes long tails differ on
  // every play. Each grain is folded under the ceiling on its own, which is fine here
  // because a shimmer has no melodic contour to protect.
  private sparkle(baseMidi: number, at: number, spread: number, count: number, gain: number): void {
    for (let i = 0; i < count; i++) {
      const degree = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)] + 12 * Math.floor(Math.random() * 2)
      let midi = baseMidi + degree
      while (midi > SPARKLE_CEILING_MIDI) midi -= 12
      const progress = count > 1 ? i / (count - 1) : 0
      this.tone({
        group: 'music', at: at + progress * spread + Math.random() * 0.03,
        freq: hz(midi) * jitter(6), type: 'sine', attack: 0.004,
        dur: 0.14 + Math.random() * 0.14, gain: gain * (1 - progress * 0.55),
        pan: Math.random() * 1.2 - 0.6, send: 0.55,
      })
    }
  }

  move(): void {
    // A short, woody triangle "tk" whose pitch falls quickly. The fall is what makes it a
    // tick rather than a beep. The 18 ms rate limit is just under the fastest sensible ARR,
    // so normal repeat still ticks per column while ARR 0 wall-slams collapse to a single tick.
    if (!this.admit('move', 0.018)) return
    const j = jitter(60)
    this.tone({ group: 'tick', freq: 1150 * j, to: 760 * j, type: 'triangle', attack: 0.0015, dur: 0.026, gain: 0.03 })
  }

  rotate(kicked: boolean): void {
    // A rising chirp: rotation is motion, and an upward glide reads as "turned" where a flat
    // blip reads as "selected".
    if (!this.admit('rotate', 0.02)) return
    const j = jitter(35)
    this.tone({ group: 'action', freq: 560 * j, to: 840 * j, glide: 0.03, type: 'triangle', attack: 0.002, dur: 0.055, gain: 0.05 })
    // A kick gets a faint lower tick slightly after the chirp: the piece "bumped" off
    // something. It carries real information, since a kick can move the piece somewhere
    // unexpected, but it must stay under the chirp, because kicks are routine in guideline
    // stacking.
    if (kicked) this.tone({ group: 'action', at: 0.016, freq: 300 * j, to: 230 * j, type: 'triangle', attack: 0.002, dur: 0.04, gain: 0.03 })
  }

  rotateBlocked(): void {
    // A dull, low, pitch-falling thud with a lowpassed knock. It is "no" without being an
    // error buzzer: players mash rotate against walls constantly, and anything harsh here
    // would feel like punishment.
    if (!this.admit('rotateBlocked', 0.05)) return
    const j = jitter(40)
    this.tone({ group: 'action', freq: 170 * j, to: 95 * j, type: 'sine', attack: 0.002, dur: 0.075, gain: 0.09 })
    this.noise({ group: 'action', filter: 'lowpass', freq: 900 * j, attack: 0.001, dur: 0.04, gain: 0.035 })
  }

  hold(): void {
    // A swap is two motions, the piece going out and the other coming in, so it is two
    // airy bandpass sweeps, up and then down, with slow attacks (a whoosh has no impact) and a
    // faint rising sine to give it a touch of pitch.
    if (!this.admit('hold', 0.06)) return
    const j = jitter(50)
    this.noise({ group: 'action', filter: 'bandpass', freq: 520 * j, to: 2600 * j, q: 1.1, attack: 0.05, dur: 0.16, gain: 0.08, send: 0.25 })
    this.noise({ group: 'action', at: 0.09, filter: 'bandpass', freq: 2200 * j, to: 700 * j, q: 1.3, attack: 0.03, dur: 0.14, gain: 0.045, send: 0.2 })
    this.tone({ group: 'action', at: 0.02, freq: 660 * j, to: 990 * j, type: 'sine', attack: 0.02, dur: 0.12, gain: 0.018 })
  }

  softDropRow(): void {
    // The quietest sound in the game: a narrow resonant noise tick. Soft drop at 20× gravity
    // fires every row, and at high levels that is every frame. It should feel like texture
    // under your finger, not a sound you listen to.
    if (!this.admit('softDrop', 0.024)) return
    const j = jitter(90)
    this.noise({ group: 'tick', filter: 'bandpass', freq: 2300 * j, q: 4, attack: 0.001, dur: 0.016, gain: 0.02 })
  }

  hardDrop(rows: number): void {
    if (!this.admit('hardDrop', 0.03)) return
    const graph = this.live()
    if (!graph) return
    const now = graph.ctx.currentTime
    this.lastHardDrop = now
    // The engine emits `lock` in the same update right after `hardDrop`. The thump IS the
    // lock, and a second click layered on top blurs the punch. Any contact voice that
    // slipped in during this instant is hushed here, and land()/lock() skip themselves just
    // after a hard drop.
    for (const voice of [...this.voices]) if (voice.group === 'contact' && voice.start >= now - 0.05) this.kill(voice, now)

    // Weight grows with the square root of the distance, so short drops already feel solid
    // (the most common hard drop is only a few rows), while a full-height slam still adds
    // noticeably more body without becoming a boom.
    const weight = Math.sqrt(wholeNumber(rows, 0, 21) / 21)
    const j = jitter(30)
    // The sub thump is felt on headphones.
    this.tone({
      group: 'action', type: 'sine', freq: (140 + 70 * weight) * j, to: 44, glide: 0.1 + 0.08 * weight,
      attack: 0.002, dur: 0.14 + 0.16 * weight, gain: 0.16 + 0.2 * weight,
    })
    // The mid knock is what laptop speakers can actually reproduce. They roll off below
    // about 200 Hz, so a sine thump alone would vanish on the hardware most players use.
    this.tone({ group: 'action', type: 'triangle', freq: 320 * j, to: 130 * j, attack: 0.001, dur: 0.07 + 0.03 * weight, gain: 0.07 + 0.05 * weight })
    // The impact body: lowpassed noise closing down, like debris settling. Long drops open
    // brighter and send a little room, so a slam lands in a space.
    this.noise({
      group: 'action', filter: 'lowpass', freq: (1800 + 2200 * weight) * j, to: 260,
      attack: 0.001, dur: 0.07 + 0.13 * weight, gain: 0.08 + 0.09 * weight, send: 0.06 + 0.16 * weight,
    })
    // A millisecond-scale crack on top: the transient that makes it punchy instead of soft.
    this.noise({ group: 'action', filter: 'highpass', freq: 3800 * j, attack: 0.0008, dur: 0.012, gain: 0.025 + 0.025 * weight })
  }

  land(): void {
    // A crisp, light, high click: "grounded, the lock timer is running". It has to be clear
    // enough to time slides and spins against, and small enough to hear on every piece at 20G.
    const graph = this.admit('land', 0.035)
    if (!graph || graph.ctx.currentTime - this.lastHardDrop < 0.05) return
    const j = jitter(50)
    this.noise({ group: 'contact', filter: 'bandpass', freq: 4800 * j, q: 1.2, attack: 0.0008, dur: 0.012, gain: 0.03 })
    this.tone({ group: 'contact', type: 'sine', freq: 1700 * j, to: 1250 * j, attack: 0.001, dur: 0.02, gain: 0.02 })
  }

  lock(): void {
    // The same family as land, a touch lower and fuller, with a small body tone. It reads
    // as the same object settling for good. It is skipped right after a hard drop (see
    // hardDrop), so only gravity and soft-drop locks use it.
    const graph = this.admit('lock', 0.03)
    if (!graph || graph.ctx.currentTime - this.lastHardDrop < 0.05) return
    const j = jitter(40)
    this.tone({ group: 'contact', type: 'triangle', freq: 720 * j, to: 420 * j, attack: 0.0015, dur: 0.045, gain: 0.055 })
    this.noise({ group: 'contact', filter: 'bandpass', freq: 1900 * j, q: 1.1, attack: 0.001, dur: 0.028, gain: 0.04 })
    this.tone({ group: 'contact', type: 'sine', freq: 190 * j, to: 120 * j, attack: 0.002, dur: 0.06, gain: 0.05 })
  }

  clear(info: ClearSound): void {
    if (!this.live()) return
    const lines = wholeNumber(info.lines, 0, 4)
    const spin = info.tspin
    if (lines === 0 && spin === 'none') return
    // The engine reports combo as max(0, chain): 0 on the first clear of a chain, 1 on the
    // second. So the first clear plays the home chord and each consecutive clear moves up
    // one pentatonic step, until the cap.
    const combo = wholeNumber(info.combo, 0, 1000)
    const step = Math.min(combo, COMBO_STEPS.length - 1)
    const root = ROOT_MIDI + COMBO_STEPS[step]

    // A T-spin clear keeps a softer chord under its bells, so line count is still audible
    // ("that was a double") while the bells say "and it was a spin".
    if (lines > 0) this.lineChord(root, lines, step, spin === 'none' ? 1 : 0.7)
    if (spin !== 'none') this.spinArpeggio(root, spin, lines)
    if (info.b2b && lines > 0) this.backToBack(root)
    // Past the pitch cap, escalation continues as density: more grains the longer the chain.
    if (combo >= SHIMMER_COMBO) {
      const grains = Math.min(9, 3 + combo - SHIMMER_COMBO)
      this.sparkle(root + 24, 0.05, 0.3 + grains * 0.03, grains, 0.026)
    }
    if (info.perfectClear) this.perfectClear(root)
  }

  private lineChord(root: number, lines: number, step: number, level: number): void {
    const voicing = CHORD_VOICINGS[lines - 1]
    const dur = CHORD_SECONDS[lines - 1]
    // A strum rather than a block chord: a few milliseconds between voices turns a synthetic
    // "stab" into something that sounds played, and bigger clears strum slightly wider.
    const strum = 0.008 + lines * 0.003
    // Combos also add a little level, so a chain feels like it swells as well as climbs. The
    // compressor keeps the top of the climb from running away.
    const lift = 1 + step * 0.035
    // Per-note gain falls as the voice count rises, so a quad is fuller rather than simply
    // several times louder than a single.
    const perNote = (0.075 - lines * 0.006) * level * lift
    const send = 0.18 + lines * 0.05
    for (const [index, interval] of voicing.entries()) {
      const pan = voicing.length > 1 ? (index / (voicing.length - 1) - 0.5) * 0.6 : 0
      // The two-octave top voice only exists on triples and quads and is kept low. It adds air;
      // at full level it would be the first thing to turn piercing on a high combo.
      const voiceLevel = interval >= 24 ? 0.55 : 1
      this.pluck(root + interval, index * strum, dur, perNote * voiceLevel, pan, send)
    }
    // A short highpassed noise "sparkle" at the onset. It is the bright transient that makes
    // the clear feel like breaking glass, and it scales with lines.
    this.noise({ group: 'music', filter: 'highpass', freq: 5200, attack: 0.001, dur: 0.05 + lines * 0.02, gain: (0.02 + lines * 0.006) * level, send: 0.2 })

    if (lines !== 4) return
    // A quad earns a shimmer: a fast rising arpeggio of high sines over an airy noise swell.
    // The arpeggio is shifted as a unit so its rising shape survives the combo climb.
    const shift = registerShift(QUAD_SPARKLE.map(interval => root + interval), SPARKLE_CEILING_MIDI)
    for (const [index, interval] of QUAD_SPARKLE.entries()) {
      this.tone({
        group: 'music', at: 0.06 + index * 0.035, freq: hz(root + interval + shift) * jitter(5),
        type: 'sine', attack: 0.003, dur: 0.34, gain: 0.03 * level, pan: (index / 3 - 0.5) * 0.9, send: 0.45,
      })
    }
    this.noise({ group: 'music', at: 0.04, filter: 'highpass', freq: 7000, attack: 0.03, dur: 0.45, gain: 0.018, send: 0.5 })
  }

  private spinArpeggio(root: number, spin: 'mini' | 'full', lines: number): void {
    // A mini is a shorter three-bell phrase and a full spin adds the third. Each cleared
    // line extends the run one note higher, so a T-spin triple audibly climbs past a double.
    // The phrase starts an octave above the root so it rings over the chord instead of
    // doubling it.
    const base = spin === 'full' ? [12, 16, 19, 24] : [12, 19, 24]
    const notes = [...base, ...[28, 31, 36].slice(0, lines)]
    const shift = registerShift(notes.map(interval => root + interval), BELL_CEILING_MIDI)
    const gap = spin === 'full' ? 0.055 : 0.045
    // A zero-line T-spin still deserves a reward, since it is real points and setup skill,
    // but a quieter one than a spin that actually clears.
    const level = (lines === 0 ? 0.75 : 1) * (spin === 'mini' ? 0.8 : 1)
    for (const [index, interval] of notes.entries()) {
      const last = index === notes.length - 1
      this.bell({
        group: 'music', at: index * gap, freq: hz(root + interval + shift) * jitter(4),
        dur: last ? 0.75 : 0.32, gain: 0.07 * level, pan: (index / (notes.length - 1) - 0.5) * 0.8, send: 0.4,
      })
    }
    this.noise({ group: 'music', filter: 'bandpass', freq: 6500, q: 2.5, attack: 0.001, dur: 0.03, gain: 0.02 * level, send: 0.3 })
  }

  private backToBack(root: number): void {
    // Back-to-back is the "you kept it going" layer. It is a harmonic halo rather than more
    // notes: soft detuned sine pairs a fifth-plus-octave and two octaves above the root, with
    // slow attacks so they bloom behind the chord's attack instead of competing with it.
    // The sub-octave triangle adds weight underneath, so a back-to-back clear feels bigger at
    // both ends of the spectrum.
    for (const interval of [19, 24]) {
      for (const detune of [-7, 7]) {
        this.tone({
          group: 'music', at: 0.02, freq: hz(root + interval) * 2 ** (detune / 1200) * jitter(3),
          type: 'sine', attack: 0.035, dur: 0.8, gain: 0.022, pan: detune < 0 ? -0.35 : 0.35, send: 0.45,
        })
      }
    }
    this.tone({ group: 'music', freq: hz(root - 12) * jitter(3), type: 'triangle', attack: 0.006, dur: 0.5, gain: 0.07 })
  }

  private perfectClear(root: number): void {
    // The fanfare waits for the clear chord to speak first, then answers it: a quick rising
    // pickup, a held landing chord, a bell on top and a long shimmer tail. The rhythm (short
    // short short, long) is what reads as "fanfare", more than any timbre could.
    const start = 0.16
    const run = [7, 12, 16, 19]
    const landingChord = [12, 16, 19, 24]
    const shift = registerShift([...run, ...landingChord].map(interval => root + interval), 96)
    for (const [index, interval] of run.entries()) {
      this.pluck(root + interval + shift, start + index * 0.065, 0.2, 0.06, (index - 1.5) * 0.2, 0.3)
    }
    const landing = start + run.length * 0.065 + 0.03
    for (const [index, interval] of landingChord.entries()) {
      this.pluck(root + interval + shift, landing + index * 0.012, 1.1, 0.05, (index - 1.5) * 0.25, 0.45)
    }
    // A soft timpani-like low hit gives the landing a downbeat.
    this.tone({ group: 'music', at: landing, freq: hz(root - 12 + shift) * 1.5, to: hz(root - 12 + shift), glide: 0.08, type: 'sine', attack: 0.003, dur: 0.45, gain: 0.08 })
    this.bell({ group: 'music', at: landing, freq: hz(root + 24 + shift), dur: 1.1, gain: 0.045, send: 0.5 })
    this.sparkle(root + 24 + shift, landing + 0.05, 1.0, 12, 0.032)
    this.noise({ group: 'music', at: landing, filter: 'highpass', freq: 6000, to: 9000, attack: 0.12, dur: 1.1, gain: 0.02, send: 0.6 })
  }

  levelUp(level: number): void {
    if (!this.admit('levelUp', 0.25)) return
    // The engine emits levelUp in the same update as the clear that caused it. A short
    // delay lets that clear's chord land cleanly before the sweep swells underneath it.
    const at = 0.1
    // The arrival note walks the pentatonic with the level (wrapping every five), so
    // successive level ups feel like progress without ever climbing out of range in a long
    // Marathon.
    const root = ROOT_MIDI + PENTATONIC[wholeNumber(level - 1, 0, 1_000_000) % PENTATONIC.length]
    this.noise({ group: 'music', at, filter: 'bandpass', freq: 380, to: 4200, q: 1.6, attack: 0.3, dur: 0.42, gain: 0.05, send: 0.3 })
    this.tone({ group: 'music', at, type: 'triangle', freq: hz(root + 12), to: hz(root + 24), glide: 0.34, attack: 0.08, dur: 0.4, gain: 0.05, send: 0.25 })
    this.tone({
      group: 'music', at, type: 'sawtooth', freq: hz(root + 12) * 1.004, to: hz(root + 24) * 1.004, glide: 0.34,
      attack: 0.08, dur: 0.4, gain: 0.025, lowpass: 900, lowpassTo: 4000, send: 0.25,
    })
    this.bell({ group: 'music', at: at + 0.36, freq: hz(root + 24), dur: 0.6, gain: 0.06, pan: -0.2, send: 0.45 })
    this.bell({ group: 'music', at: at + 0.42, freq: hz(root + 31), dur: 0.7, gain: 0.05, pan: 0.2, send: 0.45 })
  }

  countdown(n: number): void {
    // Only 3, 2 and 1 have a beep. Anything else (0 or garbage) is ignored, because `go`
    // owns the final beat.
    // These are the one sound with no pitch jitter, deliberately. A countdown is a clock,
    // and players sync their first input to it; identical beeps are exactly what "three,
    // two, one" should sound like.
    if (!Number.isFinite(n) || n < 1) return
    this.tone({ group: 'music', type: 'sine', freq: hz(81), attack: 0.004, dur: 0.16, gain: 0.09, send: 0.15 })
    this.tone({ group: 'music', type: 'triangle', freq: hz(69), attack: 0.004, dur: 0.12, gain: 0.035 })
  }

  go(): void {
    // The countdown beep's pitch, bent up an octave with a fifth underneath and a bell on
    // arrival. It continues the countdown rather than being a new sound, but it is
    // unmistakably "now".
    this.tone({ group: 'music', type: 'sine', freq: hz(81), to: hz(93), glide: 0.05, attack: 0.004, dur: 0.34, gain: 0.08, send: 0.25 })
    this.tone({ group: 'music', type: 'triangle', freq: hz(76), to: hz(88), glide: 0.05, attack: 0.004, dur: 0.26, gain: 0.035, send: 0.2 })
    this.bell({ group: 'music', at: 0.05, freq: hz(93), dur: 0.5, gain: 0.03, send: 0.4 })
  }

  gameOver(): void {
    // Gentle, not punishing: a slow falling line (E5, C#5, A4, F#4) through a lowpass that
    // darkens as it goes, landing a major sixth over a soft A3. That is wistful, not a
    // sad-trombone minor. The player is about to press Enter again, and the last thing they
    // hear should not sour that.
    const notes = [76, 73, 69, 66]
    for (const [index, midi] of notes.entries()) {
      const last = index === notes.length - 1
      this.tone({
        group: 'music', at: index * 0.17, type: 'triangle', freq: hz(midi) * jitter(3), attack: 0.01,
        dur: last ? 0.95 : 0.32, gain: 0.075 - index * 0.008, lowpass: 2600 - index * 400, lowpassTo: 600,
        pan: 0.15 - index * 0.1, send: 0.35,
      })
    }
    this.tone({ group: 'music', at: 0.51, type: 'triangle', freq: hz(57), attack: 0.04, dur: 1.1, gain: 0.05, send: 0.2 })
  }

  complete(): void {
    // The engine emits `complete` right after the final clear, so this waits for that chord
    // to be heard first.
    // Then a real cadence: a short E major (V) pickup, a rising A major arpeggio, and a held,
    // wide A major landing with a bell and a long shimmer. The V to I resolution is the
    // oldest "we're done, and it's good" signal in music; it is what separates finishing a
    // run from merely stopping.
    const offset = 0.18
    for (const [index, midi] of [64, 68, 71].entries()) this.pluck(midi, offset + index * 0.012, 0.26, 0.05, (index - 1) * 0.3, 0.25)
    const run = [69, 73, 76, 81, 85]
    for (const [index, midi] of run.entries()) this.pluck(midi, offset + 0.2 + index * 0.07, 0.28, 0.06, (index - 2) * 0.15, 0.3)
    const landing = offset + 0.2 + run.length * 0.07 + 0.04
    const chord = [45, 57, 64, 69, 73, 76, 81]
    for (const [index, midi] of chord.entries()) {
      this.pluck(midi, landing + index * 0.014, 1.5, 0.045, (index / (chord.length - 1) - 0.5) * 0.7, 0.45)
    }
    this.bell({ group: 'music', at: landing, freq: hz(93), dur: 1.2, gain: 0.04, send: 0.5 })
    this.sparkle(81, landing + 0.08, 1.2, 12, 0.03)
  }

  dispose(): void {
    const graph = this.graph
    this.graph = null
    // Closing the context stops everything at once; onended may never fire afterwards, so
    // the bookkeeping is dropped here instead of waiting for it. unlock() after dispose()
    // builds a fresh graph, the same as snake, so a remounted component can reuse the instance.
    this.voices = []
    this.lastPlayed.clear()
    this.lastHardDrop = -Infinity
    if (graph) void graph.ctx.close().catch(() => {})
  }
}
