import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadResearchCatalog } from '../src/research/catalog'
import { validateSnapshotArchiveSet, type SnapshotArchiveEntry } from '../src/research/snapshot-archive'

const catalog = loadResearchCatalog()
const archiveDir = resolve('content/snapshots')
const entries: SnapshotArchiveEntry[] = readdirSync(archiveDir)
  .filter((fileName) => fileName.endsWith('.json'))
  .map((fileName) => ({ fileName, data: JSON.parse(readFileSync(resolve(archiveDir, fileName), 'utf8')) }))

const archived = validateSnapshotArchiveSet(entries, catalog.snapshot, {
  sourceIds: new Set(catalog.sources.map((source) => source.id)),
  claimIds: new Set(catalog.claims.map((claim) => claim.id)),
})

console.log(`CTX content valid: ${catalog.stages.length} stages, ${catalog.methods.length} methods, ${catalog.sources.length} sources, ${catalog.claims.length} claims, ${catalog.patterns.length} patterns.`)
console.log(`CTX snapshot archive valid: ${archived.length} slices, ${archived[0].cutoff} → ${archived[archived.length - 1].cutoff}.`)
