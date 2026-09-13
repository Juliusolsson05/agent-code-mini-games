import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { createServer } from 'vite'
import { chromium } from 'playwright'

// Exercise actual controls, focus, and pointer ordering. Engine tests cannot catch a
// correct rule wired to the wrong button, or a keyboard listener swallowing host input.
// This server is separate from the developer's live preview, so checks never navigate
// their browser or reset their saved games. No test hooks ship in the extension.
const server = await createServer({configFile:'vite.dev.config.ts',cacheDir:'node_modules/.vite-browser-check',server:{host:'127.0.0.1',port:0,open:false}})
await server.listen()
const base = server.resolvedUrls.local[0]
const browser = await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || undefined,args:['--mute-audio']})
const context = await browser.newContext({viewport:{width:1400,height:1000},hasTouch:true})
const page = await context.newPage()
page.setDefaultTimeout(15000)
page.setDefaultNavigationTimeout(60000) // Cold Vite dependency preparation is separate from game responsiveness.
const errors = []
page.on('pageerror', error => errors.push(error.message))
await mkdir('test-results',{recursive:true})
const button = name => page.getByRole('button',{name})
let controlledClock = false
const shot = async name => {
  if (controlledClock) await page.clock.fastForward(650)
  await page.locator('.mg-root').screenshot({path:`test-results/${name}.png`,animations:'disabled',timeout:60000})
}
const open = async game => {
  await page.goto(`${base}dev/?game=${game}`)
  await page.locator('.mg-root').waitFor()
}
const text = selector => page.locator(selector).innerText()
await page.addInitScript(() => {
  let seed = 123
  window.resetTestRandom = () => { seed = 123 }
  Math.random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 2 ** 32 }
})

try {
  await open('launcher')
  assert.equal(await page.locator('.mg-cab').count(),5)
  await shot('launcher')
  await button('Play Snake').click()
  await page.locator('.sk-root').waitFor()
  await shot('snake-ready')
  await page.locator('.sk-root').focus()
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.querySelector('.sk-score strong')?.textContent === '01')
  await page.keyboard.press('Space')
  await button('Resume game').waitFor()
  const score = await text('.sk-score strong')
  await page.waitForTimeout(1700)
  assert.equal(await text('.sk-score strong'),score)
  await shot('snake-paused')
  await button('Resume game').click()
  // Tab must remain normal keyboard navigation, but a live snake cannot keep
  // moving while its focused control stops accepting steering keys.
  await page.keyboard.press('Tab')
  await button('Resume game').waitFor()
  assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()),'Arcade')
  await button('Resume game').click()
  // Moving focus into another control pauses play, so host text entry stays safe.
  await page.evaluate(() => {
    const input=document.createElement('input'); input.id='host-input';document.body.append(input);input.focus()
  })
  await button('Resume game').waitFor()
  await page.locator('#host-input').fill('wasd')
  assert.equal(await page.locator('#host-input').inputValue(),'wasd')
  await button('Resume game').click()
  await page.getByRole('heading',{name:'Room for one more?'}).waitFor()
  await shot('snake-result')
  await button(/Play again/).click()
  await page.keyboard.press('Space')
  await button('Resume game').waitFor()
  await open('snake')
  assert.equal(await text('.sk-stat:not(.sk-score) strong'),'01')
  await button('Quick').click()
  assert.equal(await text('.sk-stat:not(.sk-score) strong'),'00')
  await button('Chill').click()
  const garden=await page.locator('.sk-stage').boundingBox()
  const touch=await context.newCDPSession(page)
  await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:garden.x+200,y:garden.y+300,id:1}]})
  await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:garden.x+200,y:garden.y+200,id:1}]})
  await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
  await touch.detach()
  await button('Pause game').click()
  await button('Resume game').waitFor()
  console.log('PASS Snake: pickup, pause, focus isolation, replay, records, pace, swipe')

  await open('typing')
  await page.locator('.tt-root').waitFor()
  await shot('typing-ready')
  const exact = name => page.getByRole('button',{name,exact:true})
  await exact('words').click()
  await exact('10 words').click()
  const typingWords = await page.locator('[data-word]').evaluateAll(nodes => nodes.map(node => node.textContent))
  assert.equal(typingWords.length,10)
  await page.locator('.tt-surface').focus()
  // A deliberate slip, corrected with Backspace: accuracy must still record the mistake.
  await page.keyboard.press('#')
  assert.equal(await page.locator('.tt-root').getAttribute('data-status'),'running')
  await page.keyboard.press('Backspace')
  await page.keyboard.type(typingWords.join(' '))
  await page.locator('.tt-results').waitFor()
  assert.ok(Number(await page.locator('[data-stat="wpm"] strong').getAttribute('data-value'))>0)
  assert.ok(Number(await page.locator('[data-stat="accuracy"] strong').getAttribute('data-value'))<100)
  await shot('typing-result')
  // Tab restarts from the results screen, where focus sits on Next test.
  await page.keyboard.press('Tab')
  await page.locator('.tt-surface').waitFor()
  assert.equal(await page.locator('.tt-root').getAttribute('data-status'),'ready')
  // A host input keeps its keystrokes; the test only claims keys nothing else owns.
  await page.evaluate(() => {
    const input=document.createElement('input');input.id='typing-host-input';document.body.append(input);input.focus()
  })
  await page.keyboard.type('host')
  assert.equal(await page.locator('#typing-host-input').inputValue(),'host')
  assert.equal(await page.locator('.tt-root').getAttribute('data-status'),'ready')
  await open('typing')
  assert.equal(await exact('10 words').getAttribute('aria-pressed'),'true')
  console.log('PASS Typing Test: words mode, correction, results, tab restart, host focus isolation, saved settings')

  await open('blockfall')
  await page.locator('.bf-root').waitFor()
  const blockfallStatus = status => page.locator(`.bf-root[data-status="${status}"]`).waitFor()
  await shot('blockfall-ready')
  await button('Play Marathon').click()
  await blockfallStatus('countdown')
  await blockfallStatus('playing')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('KeyX')
  await page.keyboard.press('Space')
  await page.waitForFunction(() => document.querySelector('.bf-score strong')?.textContent !== '0')
  await shot('blockfall-playing')
  await page.keyboard.press('Escape')
  await blockfallStatus('paused')
  await shot('blockfall-paused')
  await page.keyboard.press('Enter')
  await blockfallStatus('playing')
  // Focus leaving the well pauses play, and host text entry keeps its keystrokes.
  await page.evaluate(() => {
    const input=document.createElement('input');input.id='blockfall-host-input';document.body.append(input);input.focus()
  })
  await blockfallStatus('paused')
  await page.keyboard.type('zxc ')
  assert.equal(await page.locator('#blockfall-host-input').inputValue(),'zxc ')
  await button('Keep playing').click()
  await blockfallStatus('playing')
  // Hard-dropping every piece where it spawns tops out long before any row can fill.
  for(let i=0;i<80 && await page.locator('.bf-root').getAttribute('data-status')==='playing';i++) await page.keyboard.press('Space')
  await blockfallStatus('over')
  await page.getByRole('heading',{name:'Out of room.'}).waitFor()
  await shot('blockfall-over')
  await button('Play again').click()
  await blockfallStatus('countdown')
  await open('blockfall')
  await page.waitForFunction(() => document.querySelector('.bf-best strong')?.textContent !== '—')
  console.log('PASS Blockfall: countdown, hard drop scoring, pause, focus isolation, top out, replay, saved record')

  // Real-time input remains covered by Snake above. For the 3D table, advance the
  // real game's timers/RAF explicitly. Continuous shadow rendering on a software
  // GPU otherwise consumes the CI runner between protocol calls and makes both
  // input assertions and screenshot stability depend on rendering throughput.
  // The supported reduced-motion path places cards at their final pose; a single
  // RAF jump cannot finish normal animations because the renderer clamps long deltas.
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.clock.install({time:0})
  page.setDefaultTimeout(30000)
  await open('blackjack')
  await button('Add $25 to wager').waitFor()
  await page.clock.pauseAt(3600000)
  controlledClock = true
  const finishOpening = async () => {
    await page.clock.fastForward(780)
    await page.clock.fastForward(420)
  }
  // Control the shuffled cards, leaving the actual rules, state, renderer, controls,
  // and scheduled callbacks intact. Losses and splits must be reproducible.
  const cards = async ranks => page.evaluate(async ranks => {
    const {BlackjackGame}=await import('/src/games/blackjack/engine.ts')
    const original=BlackjackGame.prototype.pop
    let id=0
    BlackjackGame.prototype.pop=function(){return ranks.length ? {rank:ranks.shift(),suit:'S',id:`browser-${id++}`} : original.call(this)}
  },ranks)
  await cards(['10','10','6','9'])
  await button('Add $500 to wager').click()
  // Chromium drops focus when a clicked button disables itself. The real UI
  // must restore keyboard ownership; manually focusing the root hid this bug.
  await page.keyboard.press('Enter')
  await page.keyboard.press('h')
  assert.match(await text('.bj-status'),/Dealing/)
  await finishOpening()
  await button(/^Stand /).waitFor()
  assert.equal(await page.locator('.bj-hand .bj-card-readout > span').count(),2)
  await shot('blackjack-dealt')
  await page.keyboard.press('s')
  await page.clock.fastForward(520)
  await button('Buy in $500').waitFor()
  await button('Buy in $500').click()
  assert.equal(await text('.bj-bankroll strong'),'$500')
  await button('Table settings').click()
  await button('Hit · H17 Hits ace + six').click()
  await button('1 deck').click()
  await page.keyboard.press('Escape')
  assert.match(await text('.bj-table-rules'),/1 deck · Dealer hits soft 17/)
  await cards(['8','6','8','10','8','8','2','3','4','5','10','10'])
  await button('Add $25 to wager').click()
  await button(/^Deal /).click()
  await finishOpening()
  await button(/^Split /).waitFor()
  for(let i=0;i<3;i++) await button(/^Split /).click()
  assert.equal(await page.locator('.bj-hand').count(),4)
  assert.equal(await button(/^Split /).isDisabled(),true)
  await shot('blackjack-four-hands')
  await page.keyboard.press('h')
  assert.equal(await page.locator('.bj-hand').first().locator('.bj-card-readout > span').count(),3)
  // Drawing 3 keeps hand 1 playable (8 + 2 + 3). Stand advances to the three
  // remaining split hands, each receiving its own second card as before.
  for(let i=0;i<4;i++) await button(/^Stand /).click()
  await page.evaluate(() => {
    const input=document.createElement('input');input.id='blackjack-host-input';document.body.append(input);input.focus()
  })
  await page.clock.fastForward(520)
  await page.clock.fastForward(520)
  await button(/^Rebet /).waitFor()
  assert.equal(await page.evaluate(() => document.activeElement?.id),'blackjack-host-input')
  await shot('blackjack-result')
  await button(/^Rebet /).click()
  assert.match(await text('.bj-status'),/Dealing/)
  console.log('PASS Blackjack: atomic deal, click-to-keyboard focus, host focus isolation, bankruptcy buy-in, settings, four split hands, rebet')

  await open('minesweeper')
  await page.clock.resume()
  controlledClock = false
  await page.locator('.mine-root').waitFor()
  for(const [name,count] of [['Beginner',81],['Intermediate',256],['Expert',480]]) {
    await button(new RegExp(`^${name}`)).click()
    assert.equal(await page.getByRole('gridcell').count(),count)
    const box=await page.locator('.mg-root').boundingBox()
    assert.ok(box.width<=800 && box.height<=810,`${name}: ${JSON.stringify(box)}`)
    await shot(`minesweeper-${name.toLowerCase()}`)
  }
  await button(/^Beginner/).click()
  const cell = index => page.locator(`[data-cell="${index}"]`)
  assert.equal(await cell(0).evaluate(el=>el.dispatchEvent(new KeyboardEvent('keydown',{key:'f',ctrlKey:true,bubbles:true,cancelable:true}))),true)
  assert.match(await cell(0).getAttribute('aria-label'),/covered/)
  await cell(0).focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('f')
  assert.match(await cell(1).getAttribute('aria-label'),/flagged/)
  assert.equal(await page.locator('.mine-root').getAttribute('data-status'),'ready')
  await page.keyboard.press('n')
  await button('Flag mode').click()
  await cell(2).tap()
  assert.match(await cell(2).getAttribute('aria-label'),/flagged/)
  await button('Flag mode').click()

  const fixture = await page.evaluate(async () => {
    const {MinesweeperGame}=await import('/src/games/minesweeper/engine/game.ts')
    let seed=123
    const model=new MinesweeperGame(()=>{}, {random:()=>{seed=(1664525*seed+1013904223)>>>0;return seed/2**32}})
    model.reveal(4,4)
    return model.getSnapshot().cells
  })
  const neighbors = i => fixture.map((_,j)=>j).filter(j=>j!==i && Math.abs(j%9-i%9)<=1 && Math.abs(Math.floor(j/9)-Math.floor(i/9))<=1)
  const target = fixture.findIndex((c,i)=>c.revealed && c.adjacent>0 && neighbors(i).some(j=>!fixture[j].revealed && !fixture[j].mine))
  assert.ok(target>=0,'seed must include an actionable chord')
  for(const order of [['left','right'],['right','left']]) {
    await button('New game').click()
    await page.evaluate(()=>window.resetTestRandom())
    await cell(40).click()
    assert.match(await cell(40).getAttribute('aria-label'),/clear/)
    for(const i of neighbors(target).filter(i=>fixture[i].mine)) await cell(i).click({button:'right'})
    const before=await page.locator('.ms-open').count()
    const box=await cell(target).boundingBox()
    await page.mouse.move(box.x+box.width/2,box.y+box.height/2)
    for(const b of order) await page.mouse.down({button:b})
    for(const b of order) await page.mouse.up({button:b})
    assert.ok(await page.locator('.ms-open').count()>before,`${order.join('+')} must chord`)
    assert.equal(await page.locator('.mine-root').getAttribute('data-status'),'playing')
  }
  // Flood opening may expose later cells and win before the loop reaches them.
  // Clicking only covered safe cells respects the same terminal lock as a player.
  for(let i=0;i<fixture.length;i++) if(!fixture[i].mine && (await cell(i).getAttribute('class')).includes('ms-hidden')) await cell(i).click()
  assert.equal(await page.locator('.mine-root').getAttribute('data-status'),'won')
  await shot('minesweeper-won')
  await button('Play again').click()
  await page.evaluate(()=>window.resetTestRandom());await cell(40).click()
  await cell(fixture.findIndex(c=>c.mine)).click()
  assert.equal(await page.locator('.mine-root').getAttribute('data-status'),'lost')
  const time=await page.locator('.mine-counter-time').getAttribute('aria-label')
  await page.waitForTimeout(1200)
  assert.equal(await page.locator('.mine-counter-time').getAttribute('aria-label'),time)
  await shot('minesweeper-lost')
  console.log('PASS Minesweeper: sizes, keyboard, touch flags, both chord orders, win/loss, frozen clock')

  // Smoke the exact production artifact, independently of all card/RNG fixtures.
  await page.clock.pauseAt(await page.evaluate(()=>Date.now()+60000))
  controlledClock = true
  await page.goto(`${base}dev/?build=production&game=launcher`)
  for(const [name,selector] of [['Snake','.sk-root'],['Blackjack','.bj-root'],['Minesweeper','.mine-root'],['Typing Test','.tt-root'],['Blockfall','.bf-root']]) {
    await button(`Play ${name}`).click()
    await page.locator(selector).waitFor()
    await shot(`packaged-${name.toLowerCase()}`)
    await button(name==='Blackjack'?'Back to games':'Arcade').click()
  }
  assert.deepEqual(errors,[])
  console.log('PASS production bundle: all five games mount and navigate; no page errors')
} finally {
  await context.close()
  await browser.close()
  await server.close()
}
