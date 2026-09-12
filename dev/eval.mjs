// Headless-Chrome JS evaluator over the DevTools Protocol — the companion to shot.mjs.
//
// A screenshot proves what something LOOKS like; this proves what it MEASURES. Layout
// bugs in this project have repeatedly come down to a box being a different size than it
// appears (a stage blending into the page, content overflowing an invisible container),
// and guessing at those from an image wastes rounds. Ask the DOM instead.
//
// Usage: node dev/eval.mjs <url> "<js expression>" [delayMs=2500]
import { spawn } from 'node:child_process'

const [, , url, expr, delayMs = '2500'] = process.argv
if (!url || !expr) {
  console.error('usage: node dev/eval.mjs <url> "<expression>" [delayMs]')
  process.exit(2)
}

const PORT = 9800 + Math.floor(Number(process.hrtime.bigint() % 150n))
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new',
  '--mute-audio',
  '--force-device-scale-factor=1',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=/tmp/eval-prof-${PORT}`,
  '--window-size=1400,900',
  'about:blank',
])

const sleep = ms => new Promise(r => setTimeout(r, ms))

try {
  let wsUrl
  for (let i = 0; i < 60; i++) {
    try {
      const j = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()
      if (j.webSocketDebuggerUrl) {
        wsUrl = j.webSocketDebuggerUrl
        break
      }
    } catch {
      /* not up yet */
    }
    await sleep(100)
  }

  const ws = new WebSocket(wsUrl)
  await new Promise((res, rej) => {
    ws.addEventListener('open', res)
    ws.addEventListener('error', rej)
  })

  let id = 0
  const pending = new Map()
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data)
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m)
      pending.delete(m.id)
    }
  })
  const send = (method, params = {}, sessionId) =>
    new Promise(res => {
      const mid = ++id
      pending.set(mid, res)
      ws.send(JSON.stringify({ id: mid, method, params, sessionId }))
    })

  const { result: targets } = await send('Target.getTargets')
  const page = targets.targetInfos.find(t => t.type === 'page')
  const { result: att } = await send('Target.attachToTarget', {
    targetId: page.targetId,
    flatten: true,
  })
  const session = att.sessionId

  await send('Page.enable', {}, session)
  await send('Page.navigate', { url }, session)
  await sleep(Number(delayMs))

  const { result } = await send(
    'Runtime.evaluate',
    { expression: expr, returnByValue: true, awaitPromise: true },
    session,
  )
  if (result.exceptionDetails) {
    console.error('EXCEPTION', JSON.stringify(result.exceptionDetails.exception?.description ?? result.exceptionDetails))
    process.exitCode = 1
  } else {
    console.log(JSON.stringify(result.result.value, null, 2))
  }
} catch (e) {
  console.error('ERR', e.message)
  process.exitCode = 1
} finally {
  chrome.kill('SIGKILL')
}
