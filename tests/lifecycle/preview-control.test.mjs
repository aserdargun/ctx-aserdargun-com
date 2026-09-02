import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { afterEach, test } from 'node:test'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const controller = path.join(projectRoot, 'scripts/preview-control.mjs')
const children = new Set()
const temporaryDirectories = new Set()

async function freePort() {
  const server = http.createServer()
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  assert.ok(address && typeof address === 'object')
  const port = address.port
  await new Promise((resolve) => server.close(resolve))
  return port
}

async function waitForPort(port) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const ready = await new Promise((resolve) => {
      const request = http.get({ host: '127.0.0.1', port, path: '/' }, (response) => { response.resume(); resolve(true) })
      request.on('error', () => resolve(false))
    })
    if (ready) return
    await new Promise((resolve) => setTimeout(resolve, 25))
  }
  throw new Error(`listener ${port} did not become ready`)
}

async function spawnListener(cwd, port) {
  const child = spawn(process.execPath, ['-e', `require('node:http').createServer((_, response) => response.end('ok')).listen(${port}, '127.0.0.1')`], { cwd, stdio: 'ignore' })
  children.add(child)
  await waitForPort(port)
  return child
}

async function createState(cwd, port, pid) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'ctx-preview-state-'))
  temporaryDirectories.add(directory)
  const stateFile = path.join(directory, 'preview.json')
  await writeFile(stateFile, JSON.stringify({ cwd, port, pid, startedAt: '2026-09-02T00:00:00.000Z' }))
  return stateFile
}

function runControl(command, port, stateFile) {
  return spawnSync(process.execPath, [controller, command], {
    cwd: projectRoot,
    encoding: 'utf8',
    env: { ...process.env, CTX_PREVIEW_PORT: String(port), CTX_PREVIEW_STATE_FILE: stateFile },
  })
}

afterEach(async () => {
  for (const child of children) if (child.exitCode === null) child.kill('SIGKILL')
  children.clear()
  for (const directory of temporaryDirectories) await rm(directory, { recursive: true, force: true })
  temporaryDirectories.clear()
})

test('stop terminates a listener whose live cwd is this checkout', async () => {
  const port = await freePort()
  const child = await spawnListener(projectRoot, port)
  const stateFile = await createState(projectRoot, port, child.pid)
  const result = runControl('stop', port, stateFile)
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /Stopped CTX preview/)
  await new Promise((resolve) => child.once('exit', resolve))
})

test('stop refuses a listener whose live cwd belongs to another checkout', async () => {
  const foreignDirectory = await mkdtemp(path.join(os.tmpdir(), 'ctx-preview-foreign-'))
  temporaryDirectories.add(foreignDirectory)
  const port = await freePort()
  const child = await spawnListener(foreignDirectory, port)
  const stateFile = await createState(foreignDirectory, port, child.pid)
  const result = runControl('stop', port, stateFile)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /Refusing to stop/)
  assert.equal(child.exitCode, null)
})

test('stop succeeds when the configured port is already free', async () => {
  const port = await freePort()
  const directory = await mkdtemp(path.join(os.tmpdir(), 'ctx-preview-empty-'))
  temporaryDirectories.add(directory)
  const stateFile = path.join(directory, 'preview.json')
  const result = runControl('stop', port, stateFile)
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /already free/)
})
