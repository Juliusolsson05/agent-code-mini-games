import assert from 'node:assert/strict'
import { access, readFile, readdir, stat } from 'node:fs/promises'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

const manifest = JSON.parse(await readFile(new URL('../agent-code.extension.json', import.meta.url), 'utf8'))

test('publishes one host-routed modal target for every launch command', () => {
  assert.equal(manifest.apiVersion, 2)
  assert.equal(manifest.entry, 'dist/runtime.js')
  const commands = manifest.contributes.commands.map(command => command.id).sort()
  const views = manifest.contributes.views.map(view => view.id).sort()
  assert.deepEqual(views, commands)
  assert.ok(manifest.contributes.views.every(view => view.mount === 'modal' && view.entry === 'dist/view.js'))
  assert.deepEqual(
    [...manifest.activationEvents].sort(),
    views.map(id => `onView:${id}`).sort(),
  )
})

test('ships importable runtime and bounded view artifacts for source installation', async () => {
  const runtime = new URL(`../${manifest.entry}`, import.meta.url)
  const viewEntries = [...new Set(manifest.contributes.views.map(view => view.entry))]
  const views = viewEntries.map(entry => new URL(`../${entry}`, import.meta.url))
  await Promise.all([access(runtime), ...views.map(view => access(view))])
  assert.equal(typeof (await import(pathToFileURL(fileURLToPath(runtime)).href)).default.activate, 'function')
  for (const view of views) {
    assert.equal(typeof (await import(pathToFileURL(fileURLToPath(view)).href)).default.mount, 'function')
  }
  // The complete UI is intentionally substantial, but the install host applies
  // its cap to every file, including shared chunks that no manifest entry names.
  // Walk dist for the same reason the installer does instead of checking only the
  // current view filename and silently missing a future code-split asset.
  const dist = new URL('../dist/', import.meta.url)
  for (const entry of await readdir(dist, { withFileTypes: true })) {
    if (!entry.isFile()) continue
    assert.ok((await stat(new URL(entry.name, dist))).size < 16 * 1024 * 1024, `${entry.name} exceeds the host file limit`)
  }
  await assert.rejects(access(new URL('../dist/index.js', import.meta.url)))
})
