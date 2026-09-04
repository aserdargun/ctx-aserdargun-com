import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const repository = 'aserdargun/ctx-aserdargun-com'
const gitSha = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const branch = process.env.GITHUB_REF_NAME || execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim()
const snapshotFile = readdirSync(resolve('content/snapshots'))
  .filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/.test(name))
  .sort()
  .at(-1)
if (!snapshotFile) throw new Error('No dated research snapshot was found')
const snapshot = JSON.parse(readFileSync(resolve('content/snapshots', snapshotFile), 'utf8'))

if (!/^[0-9a-f]{40}$/i.test(gitSha)) throw new Error(`Release SHA must be exactly 40 hexadecimal characters; received ${JSON.stringify(gitSha)}`)
if (!branch) throw new Error('Release branch could not be determined')

const dist = resolve('dist')
mkdirSync(dist, { recursive: true })
writeFileSync(resolve(dist, 'release.json'), `${JSON.stringify({
  gitSha,
  branch,
  repository,
  snapshotCutoff: snapshot.cutoff,
  builtAt: new Date().toISOString(),
}, null, 2)}\n`)

console.log(`Stamped ${repository} ${branch}@${gitSha}.`)
