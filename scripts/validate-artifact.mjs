import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
for (const file of ['index.html', 'release.json', 'staticwebapp.config.json']) assert.ok(existsSync(resolve(dist, file)), `Missing dist/${file}`)

const config = JSON.parse(readFileSync(resolve(dist, 'staticwebapp.config.json'), 'utf8'))
assert.deepEqual(config.navigationFallback, { rewrite: '/index.html', exclude: ['/assets/*', '/*.json'] })
assert.deepEqual(config.routes.find((route) => route.route === '/'), { route: '/', redirect: '/en/pipeline', statusCode: 301 })
for (const header of ['Content-Security-Policy', 'Permissions-Policy', 'Referrer-Policy', 'X-Content-Type-Options', 'X-Frame-Options']) assert.ok(config.globalHeaders[header], `Missing ${header}`)
assert.doesNotMatch(config.globalHeaders['Content-Security-Policy'], /unsafe-inline|unsafe-eval/)

const release = JSON.parse(readFileSync(resolve(dist, 'release.json'), 'utf8'))
const expectedSha = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
assert.equal(release.gitSha, expectedSha)
assert.equal(release.repository, 'aserdargun/ctx-aserdargun-com')
assert.equal(release.snapshotCutoff, '2026-09-02')
assert.ok(!Number.isNaN(Date.parse(release.builtAt)), 'release builtAt is not a valid timestamp')

const assets = readdirSync(resolve(dist, 'assets'))
assert.ok(assets.some((file) => /^index-[A-Za-z0-9_-]+\.js$/.test(file)), 'Missing hashed JavaScript entry')
assert.ok(assets.some((file) => /^index-[A-Za-z0-9_-]+\.css$/.test(file)), 'Missing hashed CSS entry')
assert.ok(assets.some((file) => file.endsWith('.woff2')), 'Missing bundled WOFF2 fonts')

const html = readFileSync(resolve(dist, 'index.html'), 'utf8')
assert.match(html, /<div id="root"><\/div>/)
assert.match(html, /\/assets\/index-[A-Za-z0-9_-]+\.js/)

console.log(`CTX artifact valid: ${assets.length} assets, release ${release.gitSha}.`)
