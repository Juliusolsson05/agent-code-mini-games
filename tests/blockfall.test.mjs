import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  BlockfallGame,
  COLS,
  ROWS,
  detectTSpin,
  gravityMsPerRow,
  shuffledBag,
} from '../src/games/blockfall/engine/game.ts'
import { PIECE_IDS } from '../src/games/blockfall/engine/pieces.ts'

const seeded = (seed = 11) => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 4294967296
}

// update() caps each call at 250 ms, so longer spans are advanced in chunks.
function advance(game, ms) {
  const events = []
  while (ms > 0) {
    const chunk = Math.min(250, ms)
    events.push(...game.update(chunk))
    ms -= chunk
  }
  return events
}

/** A game in the given mode, seeded, with an optional setup, already past the countdown. */
function playing({ mode = 'marathon', setup, options } = {}) {
  const game = new BlockfallGame({ random: seeded(), ...options })
  game.start(mode)
  if (setup) game.setup(setup)
  advance(game, 3000)
  return game
}

const tap = (game, action) => { game.press(action); game.release(action) }
const snap = game => game.getSnapshot()
const events = (game, type) => game.update(0).filter(event => event.type === type)

test('every 7-bag holds each piece exactly once, and the preview shows the first bag', () => {
  const random = seeded(5)
  for (let i = 0; i < 1000; i++) assert.deepEqual([...shuffledBag(random)].sort(), [...PIECE_IDS].sort())
  const expected = shuffledBag(seeded(9))
  const game = new BlockfallGame({ random: seeded(9) })
  assert.deepEqual(snap(game).next, expected.slice(0, 5))
})

test('pieces spawn centred in the hidden rows and drop one row to be visible at once', () => {
  const game = playing({ setup: { queue: ['T'] } })
  const { active } = snap(game)
  assert.equal(active.id, 'T')
  assert.deepEqual(active.cells, [[4, 1], [3, 2], [4, 2], [5, 2]])
  const i = playing({ setup: { queue: ['I'] } })
  assert.deepEqual(snap(i).active.cells, [[3, 2], [4, 2], [5, 2], [6, 2]])
})

test('the countdown announces 3, 2, 1 and go, then the first piece spawns', () => {
  const game = new BlockfallGame({ random: seeded() })
  game.start('marathon')
  const counted = advance(game, 3000)
  assert.deepEqual(counted.filter(e => e.type === 'countdown').map(e => e.n), [3, 2, 1])
  assert.ok(counted.some(e => e.type === 'go'))
  assert.equal(snap(game).status, 'playing')
  assert.ok(snap(game).active)
})

test('auto-repeat waits for the delay, then repeats at the rate; ARR 0 slides to the wall', () => {
  const game = playing({ setup: { queue: ['T'] } })
  game.setHandling({ das: 100, arr: 20 })
  game.press('right')
  assert.equal(snap(game).active.x, 4)
  advance(game, 98)
  assert.equal(snap(game).active.x, 4)
  advance(game, 2)
  assert.equal(snap(game).active.x, 5)
  advance(game, 20)
  assert.equal(snap(game).active.x, 6)
  advance(game, 20)
  assert.equal(snap(game).active.x, 7)
  advance(game, 20)
  assert.equal(snap(game).active.x, 7, 'the wall stops auto-repeat')

  const instant = playing({ setup: { queue: ['T'] } })
  instant.setHandling({ das: 100, arr: 0 })
  instant.press('left')
  assert.equal(snap(instant).active.x, 2)
  advance(instant, 100)
  assert.equal(snap(instant).active.x, 0)
})

test('the newest direction wins, and releasing it resumes the older one after a fresh delay', () => {
  const game = playing({ setup: { queue: ['T'] } })
  game.setHandling({ das: 100, arr: 20 })
  game.press('right')
  game.press('left')
  assert.equal(snap(game).active.x, 3)
  game.release('left')
  assert.equal(snap(game).active.x, 3)
  advance(game, 100)
  assert.equal(snap(game).active.x, 4)
})

test('a charged direction carries over to the next piece, which slides at once', () => {
  const game = playing({ setup: { queue: ['T', 'T'] } })
  game.setHandling({ das: 100, arr: 0 })
  game.press('right')
  advance(game, 100)
  assert.equal(snap(game).active.x, 7)
  game.press('hardDrop')
  assert.equal(snap(game).pieces, 1)
  assert.equal(snap(game).active.x, 7)
})

test('SRS wall kicks: T kicks off the left wall, I kicks off the right wall, O never moves', () => {
  const t = playing({ setup: { queue: ['T'] } })
  tap(t, 'rotateCW')
  for (let i = 0; i < 5; i++) tap(t, 'left')
  assert.equal(snap(t).active.x, -1, 'a vertical T reaches the wall with its box off-field')
  t.update(0)
  tap(t, 'rotateCW')
  assert.deepEqual(events(t, 'rotate').map(e => e.kick), [1])
  assert.equal(snap(t).active.rotation, 2)
  assert.equal(snap(t).active.x, 0)

  const i = playing({ setup: { queue: ['I'] } })
  tap(i, 'rotateCW')
  for (let n = 0; n < 5; n++) tap(i, 'right')
  assert.equal(snap(i).active.x, 7)
  i.update(0)
  tap(i, 'rotateCW')
  assert.deepEqual(events(i, 'rotate').map(e => e.kick), [1])
  assert.equal(snap(i).active.rotation, 2)
  assert.equal(snap(i).active.x, 6)

  const sorted = cells => cells.map(String).sort()
  const o = playing({ setup: { queue: ['O'] } })
  const before = sorted(snap(o).active.cells)
  tap(o, 'rotateCW')
  assert.deepEqual(sorted(snap(o).active.cells), before)
})

test('gravity follows the guideline curve; soft drop is 20x and scores per row; hard drop scores double and locks', () => {
  assert.equal(gravityMsPerRow(1), 1000)
  assert.ok(Math.abs(gravityMsPerRow(2) - 793) < 1e-6)
  assert.equal(gravityMsPerRow(20), 0)
  for (let level = 2; level < 20; level++) assert.ok(gravityMsPerRow(level) < gravityMsPerRow(level - 1))

  const game = playing({ setup: { queue: ['T', 'O'] } })
  advance(game, 1000)
  assert.equal(snap(game).active.y, 2)
  game.press('softDrop')
  advance(game, 500)
  assert.equal(snap(game).active.y, 12)
  assert.equal(snap(game).score, 10)
  game.release('softDrop')
  game.press('hardDrop')
  const state = snap(game)
  assert.equal(state.score, 10 + 8 * 2)
  assert.equal(state.pieces, 1)
  assert.equal(state.active.id, 'O')
  assert.equal(state.field.flat().filter(cell => cell !== null).length, 4)
})

test('lock delay is 500 ms once grounded', () => {
  const game = playing({ setup: { queue: ['T'] } })
  game.setHandling({ sdf: 0 })
  game.press('softDrop')
  advance(game, 2)
  game.release('softDrop')
  advance(game, 498)
  assert.equal(snap(game).pieces, 0)
  advance(game, 2)
  assert.equal(snap(game).pieces, 1)
})

test('moves reset the lock delay 15 times, and a new lowest row restores the allowance', () => {
  const game = playing({ setup: { queue: ['T'], field: ['....X.....'] } })
  game.setHandling({ sdf: 0 })
  game.press('softDrop')
  advance(game, 2)
  game.release('softDrop')
  assert.equal(snap(game).active.y, 19, 'resting on the single raised block')
  for (let i = 0; i < 5; i++) {
    tap(game, 'right')
    tap(game, 'left')
  }
  tap(game, 'left')
  tap(game, 'left')
  assert.equal(snap(game).active.x, 1, 'moved off the ledge after 12 resets')
  advance(game, 1000)
  assert.equal(snap(game).active.y, 20, 'fell to a new lowest row')
  assert.equal(snap(game).pieces, 0)
  for (let i = 0; i < 14; i++) tap(game, i % 2 === 0 ? 'left' : 'right')
  advance(game, 2)
  assert.equal(snap(game).pieces, 0, '14 resets on the new row still hold the piece')
  tap(game, 'left')
  advance(game, 2)
  assert.equal(snap(game).pieces, 1, 'the 15th reset locks the grounded piece')
})

test('a quad scores 800 x level and starts back-to-back', () => {
  const game = playing({
    setup: {
      queue: ['I'],
      field: ['.........X', '.XXXXXXXXX', '.XXXXXXXXX', '.XXXXXXXXX', '.XXXXXXXXX'],
    },
  })
  tap(game, 'rotateCW')
  for (let i = 0; i < 5; i++) tap(game, 'left')
  game.update(0)
  game.press('hardDrop')
  const [clear] = events(game, 'clear')
  assert.equal(clear.lines, 4)
  assert.equal(clear.points, 800)
  assert.equal(clear.perfectClear, false)
  const state = snap(game)
  assert.equal(state.score, 800 + 17 * 2)
  assert.equal(state.b2b, true)
  assert.equal(state.lines, 4)
  assert.equal(state.field[ROWS - 1][9], 'G', 'the block above the clear moved down four rows')
})

const tSpinDoubleField = ['...X......', 'XXX...XXXX', 'XXXX.XXXXX']
function tSpinDouble(setup = {}) {
  const game = playing({ setup: { queue: ['T'], field: tSpinDoubleField, ...setup } })
  tap(game, 'rotateCW')
  game.setHandling({ sdf: 0 })
  game.press('softDrop')
  advance(game, 2)
  game.release('softDrop')
  assert.equal(snap(game).active.y, 19)
  game.update(0)
  tap(game, 'rotateCW')
  game.press('hardDrop')
  return game
}

test('a T-spin double scores 1200 x level; back-to-back adds 50% and combos add 50 x combo x level', () => {
  const game = tSpinDouble()
  const [clear] = events(game, 'clear')
  assert.equal(clear.tspin, 'full')
  assert.equal(clear.lines, 2)
  assert.equal(clear.points, 1200)
  assert.equal(snap(game).score, 18 + 1200)
  assert.equal(snap(game).b2b, true)

  const chained = tSpinDouble({ b2b: true, combo: 0 })
  const [bonus] = events(chained, 'clear')
  assert.equal(bonus.b2b, true)
  assert.equal(bonus.combo, 1)
  assert.equal(bonus.points, 1800 + 50)
})

test('the three-corner rule tells full T-spins from minis, and the fifth kick upgrades a mini', () => {
  const field = Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  field[19][3] = 'G'
  field[19][5] = 'G'
  field[21][3] = 'G'
  const piece = { id: 'T', rotation: 2, x: 3, y: 19 }
  assert.equal(detectTSpin(field, piece, true, 0), 'mini', 'three corners, but a front corner is open')
  assert.equal(detectTSpin(field, piece, true, 4), 'full')
  assert.equal(detectTSpin(field, piece, false, 0), 'none', 'the last movement must be a rotation')
  assert.equal(detectTSpin(field, { ...piece, id: 'L' }, true, 0), 'none')
  field[19][5] = null
  assert.equal(detectTSpin(field, piece, true, 0), 'none', 'two corners are not enough')
})

test('combos add 50 x combo x level and reset on a lock without a clear', () => {
  const game = playing({ setup: { queue: ['I'], field: ['X.........', 'XXX....XXX'], combo: 2 } })
  game.press('hardDrop')
  const [clear] = events(game, 'clear')
  assert.equal(clear.lines, 1)
  assert.equal(clear.combo, 3)
  assert.equal(clear.points, 100 + 50 * 3)
  assert.equal(snap(game).score, 250 + 19 * 2)
  assert.equal(snap(game).b2b, false)
  game.press('hardDrop')
  assert.equal(snap(game).combo, -1)
})

test('a perfect clear adds its bonus', () => {
  const game = playing({ setup: { queue: ['I'], field: ['XXX....XXX'] } })
  game.press('hardDrop')
  const [clear] = events(game, 'clear')
  assert.equal(clear.perfectClear, true)
  assert.equal(clear.points, 100 + 800)
  assert.equal(snap(game).score, 900 + 19 * 2)
})

test('hold is allowed once per piece and brings the held piece back at spawn', () => {
  const game = playing({ setup: { queue: ['T', 'I', 'O'] } })
  tap(game, 'hold')
  assert.equal(snap(game).hold, 'T')
  assert.equal(snap(game).active.id, 'I')
  tap(game, 'hold')
  assert.equal(snap(game).active.id, 'I', 'a second hold on the same piece is ignored')
  game.press('hardDrop')
  assert.equal(snap(game).active.id, 'O')
  tap(game, 'hold')
  const state = snap(game)
  assert.equal(state.hold, 'O')
  assert.equal(state.active.id, 'T')
  assert.equal(state.active.rotation, 0)
  assert.deepEqual(state.active.cells, [[4, 1], [3, 2], [4, 2], [5, 2]])
})

test('topping out: block out on a blocked spawn, lock out when a piece locks above the field', () => {
  const blocked = new BlockfallGame({ random: seeded() })
  blocked.start('marathon')
  blocked.setup({ queue: ['T'], field: ['...XXX....', ...Array(21).fill('..........')] })
  const overEvents = advance(blocked, 3000)
  assert.equal(snap(blocked).status, 'over')
  assert.deepEqual(overEvents.filter(e => e.type === 'over').map(e => e.reason), ['blockOut'])

  const locked = playing({ setup: { queue: ['T'], field: Array(20).fill('XXXXXXXXX.') } })
  locked.press('hardDrop')
  assert.equal(snap(locked).status, 'over')
  assert.deepEqual(events(locked, 'over').map(e => e.reason), ['lockOut'])
})

test('Marathon levels up every 10 lines and completes at 150; Sprint completes at 40 lines; Ultra ends on time', () => {
  const levelling = playing({ setup: { queue: ['I'], field: ['X.........', 'XXX....XXX'], lines: 9 } })
  levelling.press('hardDrop')
  assert.equal(snap(levelling).level, 2)
  assert.deepEqual(events(levelling, 'levelUp').map(e => e.level), [2])

  const marathon = playing({ setup: { queue: ['I'], field: ['X.........', 'XXX....XXX'], lines: 149, level: 15 } })
  marathon.press('hardDrop')
  assert.equal(snap(marathon).status, 'complete')
  assert.equal(snap(marathon).records.marathon.lines, 150)

  const sprint = playing({ mode: 'sprint', setup: { queue: ['I'], field: ['X.........', 'XXX....XXX'], lines: 39 } })
  advance(sprint, 1500)
  sprint.press('hardDrop')
  const done = snap(sprint)
  assert.equal(done.status, 'complete')
  assert.equal(done.records.sprint.ms, 1500)
  assert.equal(done.newRecord, true)
  assert.ok(sprint.update(0).some(e => e.type === 'record'))

  const ultra = playing({ mode: 'ultra', options: { ultraMs: 2000 } })
  advance(ultra, 2000)
  assert.equal(snap(ultra).status, 'complete')
  assert.equal(snap(ultra).remainingMs, 0)
})

test('pausing freezes time and releases held keys', () => {
  const game = playing({ setup: { queue: ['T'] } })
  advance(game, 1000)
  game.press('right')
  game.pause()
  assert.equal(snap(game).status, 'paused')
  advance(game, 5000)
  assert.equal(snap(game).elapsedMs, 1000)
  game.resume()
  const x = snap(game).active.x
  advance(game, 400)
  assert.equal(snap(game).active.x, x, 'the pre-pause key does not keep sliding the piece')
  assert.equal(snap(game).elapsedMs, 1400)
})

test('records merge upward and snapshots are copies', () => {
  const game = new BlockfallGame({ random: seeded() })
  game.setRecords({ marathon: { score: 500, lines: 5, level: 1 }, sprint: { ms: 90000 }, ultra: { score: 'x' } })
  game.setRecords({ marathon: { score: 100, lines: 1, level: 1 }, sprint: { ms: 80000 } })
  assert.deepEqual(game.getRecords(), { marathon: { score: 500, lines: 5, level: 1 }, sprint: { ms: 80000 }, ultra: null })
  const copy = snap(game)
  copy.field[21][0] = 'G'
  copy.next.push('I')
  copy.records.sprint.ms = 1
  assert.equal(snap(game).field[21][0], null)
  assert.equal(snap(game).next.length, 5)
  assert.equal(game.getRecords().sprint.ms, 80000)
})
