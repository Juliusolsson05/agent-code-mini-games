// Bundle the TS engines into a temporary directory and use Node's behavioral test runner.
// Vite already uses esbuild; no browser, fake DOM or application build is needed to
// exercise grid rules and money/timer invariants, and the shipped dist stays untouched.
import { build } from 'esbuild'
import { readdir, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
const files = (await readdir(new URL('../tests/', import.meta.url))).filter(f => f.endsWith('.test.mjs'))
const out = await mkdtemp(join(tmpdir(), 'mini-games-tests-'))
try {
  await build({ entryPoints: files.map(f => `tests/${f}`), outdir: out, outExtension: { '.js': '.mjs' }, bundle: true, platform: 'node', format: 'esm', target: 'node22', logLevel: 'warning' })
  const result = spawnSync(process.execPath, ['--test', ...files.map(f => join(out, f))], { stdio: 'inherit' })
  process.exitCode = result.status ?? 1
} finally { await rm(out, { recursive: true, force: true }) }
