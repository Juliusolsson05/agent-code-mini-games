import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MinesweeperGame, LEVELS } from '../src/games/minesweeper/engine/game.ts'
function boot() {
  let now=0
  let seed=123
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
  const g=new MinesweeperGame(()=>{}, {now:()=>now, random})
  return {g,advance(ms){now+=ms}}
}
test('first reveal guarantees a zero region and exact mine counts on every level',()=>{
  for(const [level,spec] of Object.entries(LEVELS)) {
    const {g}=boot();g.reset(level);g.reveal(4,4)
    const s=g.getSnapshot();assert.equal(s.cells.filter(c=>c.mine).length,spec.mines)
    for(let y=3;y<=5;y++)for(let x=3;x<=5;x++)assert.equal(s.cells[y*spec.cols+x].mine,false)
    assert.equal(s.cells[4*spec.cols+4].adjacent,0)
    assert.ok(s.cells.filter(c=>c.revealed).length>1)
  }
})
test('flagging does not start time and snapshots cannot modify engine state',()=>{
  const {g,advance}=boot();g.cycleMark(0,0);advance(3000);g.tick()
  assert.equal(g.getSnapshot().time,0);assert.equal(g.getSnapshot().status,'ready')
  assert.equal(g.getSnapshot().minesLeft,9)
  const snapshot=g.getSnapshot();snapshot.cells[0].mark='none';snapshot.cells[1].mine=true
  assert.equal(g.getSnapshot().cells[0].mark,'flag');assert.equal(g.getSnapshot().cells[1].mine,false)
})
test('zero-second loss stays frozen and flags are protected until unmarked',()=>{
  const {g,advance}=boot();g.cycleMark(0,0);g.reveal(0,0)
  assert.equal(g.getSnapshot().status,'ready')
  g.reveal(4,4);const s=g.getSnapshot();const mine=s.cells.findIndex(c=>c.mine&&c.mark!=='flag')
  g.reveal(mine%s.cols,Math.floor(mine/s.cols));assert.equal(g.getSnapshot().status,'lost')
  advance(12000);g.tick();assert.equal(g.getSnapshot().time,0)
})
test('winning freezes the clock, flags remaining mines and keeps the better live record',()=>{
  const {g,advance}=boot();g.setBest({beginner:50,expert:NaN});g.reveal(4,4);advance(2100)
  let s=g.getSnapshot()
  for(let i=0;i<s.cells.length;i++)if(!s.cells[i].mine)g.reveal(i%s.cols,Math.floor(i/s.cols))
  s=g.getSnapshot();assert.equal(s.status,'won');assert.equal(s.time,2);assert.equal(s.minesLeft,0)
  g.setBest({beginner:40});assert.equal(g.getBest().beginner,2);assert.equal(g.getBest().expert,null)
  advance(9000);assert.equal(g.getSnapshot().time,2)
})
test('chording opens safe neighbors with matching flags and detonates wrong matching flags',()=>{
  const setup=()=>{const {g}=boot();g.reveal(4,4);return g}
  const neighbors=(s,i)=>{
    const x=i%s.cols,y=Math.floor(i/s.cols),out=[]
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if((dx||dy)&&x+dx>=0&&x+dx<s.cols&&y+dy>=0&&y+dy<s.rows)out.push((y+dy)*s.cols+x+dx)
    return out
  }
  const g=setup();let s=g.getSnapshot()
  const i=s.cells.findIndex((c,i)=>c.revealed&&c.adjacent>0&&neighbors(s,i).some(j=>!s.cells[j].revealed&&!s.cells[j].mine))
  assert.ok(i>=0)
  for(const j of neighbors(s,i))if(s.cells[j].mine)g.cycleMark(j%s.cols,Math.floor(j/s.cols))
  g.chord(i%s.cols,Math.floor(i/s.cols));s=g.getSnapshot()
  assert.notEqual(s.status,'lost')
  for(const j of neighbors(s,i))if(!s.cells[j].mine)assert.equal(s.cells[j].revealed,true)
  const wrong=setup();s=wrong.getSnapshot();const adj=neighbors(s,i)
  const safe=adj.find(j=>!s.cells[j].revealed&&!s.cells[j].mine)
  let flags=0
  wrong.cycleMark(safe%s.cols,Math.floor(safe/s.cols));flags++
  for(const j of adj)if(s.cells[j].mine&&flags<s.cells[i].adjacent){wrong.cycleMark(j%s.cols,Math.floor(j/s.cols));flags++}
  wrong.chord(i%s.cols,Math.floor(i/s.cols));assert.equal(wrong.getSnapshot().status,'lost')
})
