import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import snapshot from '../content/active-snapshot.ts'

const repository = 'aserdargun/ctx-aserdargun-com'
const gitSha = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const branch = process.env.GITHUB_REF_NAME || execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim()
const workingTreeDirty = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim().length > 0

if (!/^[0-9a-f]{40}$/i.test(gitSha)) throw new Error(`Release SHA must be exactly 40 hexadecimal characters; received ${JSON.stringify(gitSha)}`)
if (!branch) throw new Error('Release branch could not be determined')

const dist = resolve('dist')
mkdirSync(dist, { recursive: true })
writeFileSync(resolve(dist, 'release.json'), `${JSON.stringify({
  gitSha,
  branch,
  repository,
  workingTreeDirty,
  snapshotCutoff: snapshot.cutoff,
  builtAt: new Date().toISOString(),
}, null, 2)}\n`)

console.log(`Stamped ${repository} ${branch}@${gitSha}.`)
