import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SnakeGame, PACES, COLS, ROWS } from '../src/games/snake/engine/game.ts'

const game = () => new SnakeGame(() => {}, { random: () => 0 })

test('first direction responds immediately, reversals are ignored, and two fast turns are preserved', () => {
  const g = game()
  assert.equal(g.turn('left'), false)
  assert.equal(g.getSnapshot().status, 'ready')
  g.turn('right')
  assert.deepEqual(g.getSnapshot().previousSnake[0], { x: 4, y: 7 })
  assert.deepEqual(g.getSnapshot().snake[0], { x: 5, y: 7 })
  assert.equal(g.turn('up'), true)
  assert.equal(g.turn('left'), true)
  assert.equal(g.turn('down'), false)
  g.update(125)
  assert.deepEqual(g.getSnapshot().snake[0], { x: 5, y: 6 })
  g.update(125)
  assert.deepEqual(g.getSnapshot().snake[0], { x: 4, y: 6 })
})

test('pause freezes the fractional visual pose and discards buffered turns', () => {
  const g = game(); g.turn('right'); g.update(45); g.turn('up')
  const before = g.getSnapshot(); g.pause(); g.update(5000)
  assert.equal(g.getSnapshot().t, before.t)
  assert.deepEqual(g.getSnapshot().snake, before.snake)
  assert.equal(g.turn('down'), false)
  g.togglePause(); g.update(80)
  assert.equal(g.getSnapshot().dir, 'right')
  assert.deepEqual(g.getSnapshot().snake[0], { x: 6, y: 7 })
})

test('collision uses growth on the current move, so a vacating tail is safe after eating', () => {
  const g = game(); g.turn('right')
  // A compact loop is a legitimate board state; fix the fixture, then assert only the
  // public simulation result. Random play would almost never cover this regression.
  g.snake = [{x:2,y:2},{x:2,y:3},{x:2,y:4},{x:1,y:4},{x:1,y:3},{x:1,y:2}]
  g.previous = g.snake.map(c => ({...c})); g.dir = 'up'; g.growing = true
  g.apple = {x:10,y:10}; g.turn('left'); g.update(125)
  assert.equal(g.getSnapshot().status, 'playing')
  assert.deepEqual(g.getSnapshot().snake[0], {x:1,y:2})
  assert.equal(g.getSnapshot().snake.length, 6)
})

test('a real body collision ends the run, and terminal updates cannot move the snake', () => {
  const g = game(); g.turn('right')
  g.snake = [{x:2,y:2},{x:2,y:3},{x:1,y:3},{x:1,y:2},{x:1,y:1}]
  g.previous = g.snake.map(c => ({...c})); g.dir = 'up'; g.apple = {x:10,y:10}
  g.turn('left'); assert.equal(g.update(125).died, true)
  const ended = g.getSnapshot(); g.update(5000)
  assert.equal(ended.status, 'dead'); assert.deepEqual(g.getSnapshot().snake, ended.snake)
})

test('eating the final free cell wins instead of leaving an apple under the snake', () => {
  const g = game(); g.turn('right')
  const free = {x:1,y:0}
  const body = [{x:0,y:0}]
  for(let y=0;y<ROWS;y++) for(let x=0;x<COLS;x++)
    if (!(x===0&&y===0) && !(x===free.x&&y===free.y)) body.push({x,y})
  g.snake = body; g.previous = body.map(c => ({...c})); g.apple=free; g.dir='right'
  const ev = g.update(125)
  assert.equal(ev.won, true); assert.equal(g.getSnapshot().status, 'won')
  assert.equal(g.getSnapshot().apple, null); assert.equal(g.getSnapshot().snake.length, COLS*ROWS)
})

test('records are separated by pace and late storage cannot lower a live record', () => {
  const g = game(); g.setRecords({classic:10,swift:4,relaxed:NaN}); g.setRecords({classic:3})
  assert.equal(g.getSnapshot().best,10)
  g.reset('swift'); assert.equal(g.getSnapshot().best,4)
  assert.equal(g.getSnapshot().stepMs,PACES.swift.stepMs)
  g.reset('relaxed'); assert.equal(g.getSnapshot().best,0)
  const s=g.getSnapshot(); s.snake[0].x=900
  assert.notEqual(g.getSnapshot().snake[0].x,900)
})
