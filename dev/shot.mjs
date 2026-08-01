// Headless-Chrome screenshot driver over the DevTools Protocol (spec §13.2).
//
// Why not `chrome --screenshot`? That fires at the load event, but our scenes finish
// asynchronously — WebGL card textures decode from SVG data URIs, the 3D scene eases
// meshes into place over ~0.5s. The flag either captures a blank frame or, under
// --virtual-time-budget, deadlocks against requestAnimationFrame. This attaches via CDP,
// navigates, waits a REAL wall-clock delay, then captures. WebGL works headless through
// SwiftShader.
//
// Lives in the repo rather than a scratch dir because it is the only way to verify a
// visual change without asking a human to be the renderer — losing it means going blind.
//
// Usage: node dev/shot.mjs <url> <out.png> [delayMs=2500] [width=1200] [height=900]
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const [, , url, out, delayMs = '2500', width = '1200', height = '900'] = process.argv
if (!url || !out) {
  console.error('usage: node dev/shot.mjs <url> <out.png> [delayMs] [w] [h]')
  process.exit(2)
}

const PORT = 9333 + Math.floor(Number(process.hrtime.bigint() % 400n))
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const chrome = spawn(CHROME, [
  '--headless=new',
  '--hide-scrollbars',
  '--mute-audio',
  '--force-device-scale-factor=1',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=/tmp/shot-prof-${PORT}`,
  `--window-size=${width},${height}`,
  'about:blank',
])

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function wsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const j = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()
      if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl
    } catch {
      /* not up yet */
    }
    await sleep(100)
  }
  throw new Error('devtools never came up')
}

try {
  const ws = new WebSocket(await wsUrl())
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
  await send(
    'Emulation.setDeviceMetricsOverride',
    { width: +width, height: +height, deviceScaleFactor: 1, mobile: false },
    session,
  )
  await send('Page.navigate', { url }, session)
  await sleep(Number(delayMs))
  const { result: shot } = await send('Page.captureScreenshot', { format: 'png' }, session)
  writeFileSync(out, Buffer.from(shot.data, 'base64'))
  console.log('OK', out)
} catch (e) {
  console.error('ERR', e.message)
  process.exitCode = 1
} finally {
  chrome.kill('SIGKILL')
}
