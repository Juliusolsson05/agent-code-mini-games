import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BlackjackGame, handValue } from '../src/games/blackjack/engine.ts'

const sounds = () => ({deal(){},chip(){},win(){},lose(){},push(){},blackjack(){}})
async function boot(t, saved = {}) {
  t.mock.timers.enable({apis:['setTimeout']})
  const store = new Map(Object.entries(saved))
  const api = {storage:{async get(k){return store.get(k)},async set(k,v){store.set(k,v)}}}
  const g=new BlackjackGame(api,()=>{},sounds())
  assert.equal(g.getState().phase,'loading')
  g.addChip(25);g.deal();assert.equal(g.getState().bet,0)
  await Promise.resolve(); await Promise.resolve()
  assert.equal(g.getState().phase,'betting')
  t.after(()=>g.dispose())
  return {g,store}
}
function shoe(g, ranks) {
  // Keep the shoe above its cut-card threshold so the deterministic opening fixture
  // remains intact. Assertions below observe state, never internal implementation.
  const cards=[...Array(90).fill('10'),...ranks.toReversed()]
  g.shoe=cards.map((rank,i)=>({rank,suit:'S',id:`fixture-${i}`}))
}
function opening(t,g) {
  for(let i=0;i<3;i++) t.mock.timers.tick(260)
  assert.equal(g.getState().phase,'dealing')
  t.mock.timers.tick(420)
}

test('opening deal rejects actions and round resets until every scheduled card has landed', async t => {
  const {g}=await boot(t);shoe(g,['10','9','8','8']);g.addChip(20);g.deal()
  assert.equal(g.getState().phase,'dealing')
  const before=g.getState();g.hit();g.stand();g.double();g.split();g.newRound()
  assert.deepEqual(g.getState(),before)
  opening(t,g)
  assert.equal(g.getState().phase,'playing')
  assert.equal(g.getState().playerHands[0].cards.length,2)
  assert.equal(g.getState().dealer.length,2)
})

test('a losing main hand hedged by winning insurance reports the actual net zero', async t => {
  const {g}=await boot(t);shoe(g,['10','A','9','K']);g.addChip(20);g.deal();opening(t,g)
  assert.equal(g.getState().phase,'insurance');g.takeInsurance()
  const s=g.getState();assert.equal(s.phase,'settle');assert.equal(s.bankroll,500)
  assert.equal(s.lastNet,0);assert.equal(s.message,'Push')
  assert.equal(s.playerHands[0].outcome,'lose')
})

test('losing insurance is included in a winning hand net', async t => {
  const {g}=await boot(t);shoe(g,['10','A','K','7']);g.addChip(20);g.deal();opening(t,g)
  g.takeInsurance();g.stand();t.mock.timers.tick(520)
  assert.equal(g.getState().phase,'settle')
  assert.equal(g.getState().bankroll,510);assert.equal(g.getState().lastNet,10)
})

test('split aces receive one card each and split 21 pays a regular win', async t => {
  const {g}=await boot(t);shoe(g,['A','9','A','7','10','9','10'])
  g.addChip(20);g.deal();opening(t,g);g.split()
  assert.equal(g.getState().phase,'dealer')
  assert.deepEqual(g.getState().playerHands.map(h=>h.cards.length),[2,2])
  g.hit();g.double();g.split();assert.equal(g.getState().playerHands.length,2)
  t.mock.timers.tick(520);t.mock.timers.tick(520)
  const s=g.getState();assert.equal(s.phase,'settle');assert.equal(s.lastNet,40)
  assert.equal(s.bankroll,540);assert.equal(s.stats.blackjacks,0)
})

test('hit to 21 advances automatically and soft 17 follows the table rule', async t => {
  const {g}=await boot(t);g.setHitSoft17(true);shoe(g,['10','A','5','6','6','2'])
  g.addChip(20);g.deal();opening(t,g);g.declineInsurance();g.hit()
  assert.equal(g.getState().phase,'dealer')
  t.mock.timers.tick(520);assert.equal(g.getState().dealer.length,3)
  t.mock.timers.tick(520);assert.equal(g.getState().lastNet,20)
})

test('stored zero bankroll remains zero and rebuy is an explicit action', async t => {
  const {g}=await boot(t,{'bj.bankroll':0,'bj.lastBet':100})
  assert.equal(g.getState().bankroll,0);g.repeatBet();assert.equal(g.getState().bet,0)
  g.rebuy();assert.equal(g.getState().bankroll,500)
  g.repeatBet();assert.equal(g.getState().bet,100)
})

test('repeat bet remembers the completed stake and is capped by remaining bankroll', async t => {
  const {g}=await boot(t,{'bj.bankroll':35,'bj.lastBet':100})
  g.repeatBet();assert.equal(g.getState().bet,35)
  g.clearBet();g.addChip(-50);g.addChip(NaN);g.addChip(0.5);assert.equal(g.getState().bet,0)
  shoe(g,['10','10','9','7']);g.addChip(20);g.deal();opening(t,g);g.stand();t.mock.timers.tick(520)
  g.newRound();g.repeatBet();assert.equal(g.getState().bet,20)
})

test('buy-in works after losing the last chips but cannot refill an in-flight hand', async t => {
  const {g}=await boot(t,{'bj.bankroll':20});shoe(g,['10','10','6','9'])
  g.addChip(20);g.deal();g.rebuy();assert.equal(g.getState().bankroll,0)
  opening(t,g);g.rebuy();assert.equal(g.getState().bankroll,0)
  g.stand();t.mock.timers.tick(520);assert.equal(g.getState().phase,'settle')
  g.rebuy();assert.equal(g.getState().phase,'betting');assert.equal(g.getState().bankroll,500)
  assert.equal(g.getState().playerHands.length,0)
})

test('odd-dollar naturals pay exact 3:2 and fractional bankroll survives reload', async t => {
  const {g}=await boot(t,{'bj.bankroll':500.5,'bj.lastBet':0.5})
  g.repeatBet();assert.equal(g.getState().bet,0.5);g.clearBet()
  shoe(g,['A','9','K','8']);g.addChip(25);g.deal();opening(t,g)
  assert.equal(g.getState().lastNet,37.5)
  assert.equal(g.getState().bankroll,538)
})

test('one-dollar insurance costs fifty cents and correctly hedges a dealer natural', async t => {
  const {g}=await boot(t);shoe(g,['10','A','9','K'])
  g.addChip(1);g.deal();opening(t,g);g.takeInsurance()
  assert.equal(g.getState().insuranceBet,0.5)
  assert.equal(g.getState().lastNet,0);assert.equal(g.getState().bankroll,500)
})

test('soft aces downgrade without losing a remaining playable ace',()=>{
  const cards=ranks=>ranks.map(rank=>({rank,suit:'H',id:rank}))
  assert.deepEqual(handValue(cards(['A','A','9'])),{total:21,soft:true})
  assert.deepEqual(handValue(cards(['A','A','9','K'])),{total:21,soft:false})
})
