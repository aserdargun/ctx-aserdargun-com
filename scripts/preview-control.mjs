import { spawn, spawnSync } from 'node:child_process'
import { mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = await realpath(process.cwd())
const port = Number.parseInt(process.env.CTX_PREVIEW_PORT ?? '4175', 10)
const stateFile = process.env.CTX_PREVIEW_STATE_FILE ?? path.join(root, '.codex/runtime/preview.json')

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`Invalid CTX preview port: ${process.env.CTX_PREVIEW_PORT ?? ''}`)
  process.exit(1)
}

function listenerPids() {
  const result = spawnSync('lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'], { encoding: 'utf8' })
  if (result.status !== 0 && result.status !== 1) throw new Error(result.stderr.trim() || 'Unable to inspect preview port')
  return [...new Set(result.stdout.split(/\s+/).filter(Boolean).map(Number).filter(Number.isInteger))]
}

async function liveCwd(pid) {
  const result = spawnSync('lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], { encoding: 'utf8' })
  if (result.status !== 0) return null
  const cwdLine = result.stdout.split('\n').find((line) => line.startsWith('n'))
  if (!cwdLine) return null
  try { return await realpath(cwdLine.slice(1)) } catch { return null }
}

async function readState() {
  try { return JSON.parse(await readFile(stateFile, 'utf8')) } catch { return null }
}

async function clearState() {
  await rm(stateFile, { force: true })
}

async function waitForExit(pid, timeoutMs) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (!listenerPids().includes(pid)) return true
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  return !listenerPids().includes(pid)
}

async function stop() {
  const pids = listenerPids()
  if (pids.length === 0) {
    await clearState()
    console.log(`CTX preview port ${port} is already free.`)
    return
  }
  for (const pid of pids) {
    const cwd = await liveCwd(pid)
    if (cwd !== root) {
      console.error(`Refusing to stop PID ${pid}: live cwd ${cwd ?? 'unknown'} does not match ${root}.`)
      process.exitCode = 1
      return
    }
  }
  for (const pid of pids) process.kill(pid, 'SIGTERM')
  for (const pid of pids) {
    if (!(await waitForExit(pid, 3000)) && (await liveCwd(pid)) === root) process.kill(pid, 'SIGKILL')
  }
  await clearState()
  console.log(`Stopped CTX preview on port ${port}.`)
}

async function status() {
  const pids = listenerPids()
  if (pids.length === 0) {
    console.log(`CTX preview is stopped; port ${port} is free.`)
    return
  }
  const ownership = await Promise.all(pids.map(async (pid) => ({ pid, cwd: await liveCwd(pid) })))
  console.log(JSON.stringify({ port, root, state: await readState(), listeners: ownership }, null, 2))
}

async function start() {
  const existing = listenerPids()
  if (existing.length > 0) await stop()
  if (process.exitCode) return
  try { await realpath(path.join(root, 'dist')) } catch {
    const build = spawnSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' })
    if (build.status !== 0) process.exit(build.status ?? 1)
  }
  await mkdir(path.dirname(stateFile), { recursive: true })
  const child = spawn('npm', ['run', 'preview:serve', '--', '--port', String(port)], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, CTX_PREVIEW_PORT: String(port) },
  })
  await writeFile(stateFile, JSON.stringify({ pid: child.pid, cwd: root, port, startedAt: new Date().toISOString() }, null, 2))
  const forward = (signal) => { if (child.exitCode === null) child.kill(signal) }
  process.on('SIGINT', forward)
  process.on('SIGTERM', forward)
  const code = await new Promise((resolve) => child.once('exit', (exitCode) => resolve(exitCode ?? 0)))
  await clearState()
  process.exitCode = code
}

const command = process.argv[2]
if (command === 'start') await start()
else if (command === 'status') await status()
else if (command === 'stop') await stop()
else {
  console.error('Usage: node scripts/preview-control.mjs <start|status|stop>')
  process.exitCode = 1
}
