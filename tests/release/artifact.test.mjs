import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { test } from 'node:test'

const dist = resolve('dist')

test('release metadata matches the current Git revision', () => {
  const releasePath = resolve(dist, 'release.json')
  assert.ok(existsSync(releasePath), 'Missing dist/release.json')
  const release = JSON.parse(readFileSync(releasePath, 'utf8'))
  assert.equal(release.gitSha, execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim())
  assert.equal(release.repository, 'aserdargun/ctx-aserdargun-com')
  assert.equal(release.branch, 'main')
  assert.equal(release.snapshotCutoff, '2026-09-04')
  assert.ok(!Number.isNaN(Date.parse(release.builtAt)), 'release builtAt must be an ISO timestamp')
})

test('artifact contains secure SPA routing and hashed local assets', () => {
  const config = JSON.parse(readFileSync(resolve(dist, 'staticwebapp.config.json'), 'utf8'))
  assert.deepEqual(config.navigationFallback, { rewrite: '/index.html', exclude: ['/assets/*', '/*.json'] })
  assert.deepEqual(config.routes.find((route) => route.route === '/'), { route: '/', redirect: '/en/pipeline', statusCode: 301 })
  assert.doesNotMatch(config.globalHeaders['Content-Security-Policy'], /unsafe-inline|unsafe-eval/)
  for (const header of ['Content-Security-Policy', 'Permissions-Policy', 'Referrer-Policy', 'X-Content-Type-Options', 'X-Frame-Options']) {
    assert.ok(config.globalHeaders[header], `Missing ${header}`)
  }
  const assets = readdirSync(resolve(dist, 'assets'))
  assert.ok(assets.some((file) => /^index-[A-Za-z0-9_-]+\.js$/.test(file)))
  assert.ok(assets.some((file) => /^index-[A-Za-z0-9_-]+\.css$/.test(file)))
  assert.ok(assets.some((file) => file.endsWith('.woff2')))
})
