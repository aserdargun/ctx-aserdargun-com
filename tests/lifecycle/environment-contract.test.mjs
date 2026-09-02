import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const environmentUrl = new URL('../../.codex/environments/environment.toml', import.meta.url)
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

test('Codex environment delegates Setup and ordered Run Validate Stop actions', async () => {
  const source = await readFile(environmentUrl, 'utf8')
  const setup = source.match(/\[setup\]\s+script = "([^"]+)"/m)?.[1]
  const actions = [...source.matchAll(/\[\[actions\]\]\s+name = "([^"]+)"\s+icon = "([^"]+)"\s+command = "([^"]+)"/gm)]
    .map((match) => ({ name: match[1], icon: match[2], command: match[3] }))
  assert.equal(setup, 'sh scripts/npm22.sh ci && sh scripts/npm22.sh exec playwright install chromium')
  assert.deepEqual(actions, [
    { name: 'Run', icon: 'run', command: 'sh scripts/npm22.sh run preview:start' },
    { name: 'Validate', icon: 'tool', command: 'sh scripts/npm22.sh run validate:codex' },
    { name: 'Stop', icon: 'tool', command: 'sh scripts/npm22.sh run preview:stop' },
  ])
})

test('npm22 runner exposes Node 22 to package scripts', () => {
  const result = spawnSync('sh', ['scripts/npm22.sh', 'run', 'runtime:check'], { cwd: projectRoot, encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout.trim().split('\n').at(-1) ?? '', /^22\./)
})
