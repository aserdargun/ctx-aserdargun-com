import { describe, expect, it } from 'vitest'
import { loadResearchCatalog, validateResearchCatalog } from './catalog'
import type { ResearchCatalog } from './schema'

const corruptions: [string, (catalog: ResearchCatalog) => void][] = [
  ['invalid calendar date', (c) => { c.patterns[0].reviewedAt = '2026-02-30' }],
  ['future pattern review', (c) => { c.patterns[0].reviewedAt = '2099-01-01' }],
  ['future gate review', (c) => { c.qualityGates[0].reviewedAt = '2099-01-01' }],
  ['missing stage method', (c) => { c.stages[0].methodIds.pop() }],
  ['method owned by wrong stage', (c) => { c.methods[0].stageId = 'memory' }],
  ['unordered stages', (c) => { [c.stages[0], c.stages[1]] = [c.stages[1], c.stages[0]] }],
  ['pattern method outside flow', (c) => { c.patterns[0].methodIds.push('working-memory') }],
  ['duplicate reference', (c) => { c.claims[0].sourceIds.push(c.claims[0].sourceIds[0]) }],
  ['unreviewed snapshot source', (c) => { c.snapshot.reviewedSourceIds.pop() }],
  ['missing snapshot claim', (c) => { c.snapshot.claimIds.pop() }],
  ['misclassified watch signal', (c) => { c.snapshot.watchSignalIds.push(c.claims[0].id) }],
  ['missing watch signal', (c) => { c.snapshot.watchSignalIds.pop() }],
  ['premature publication', (c) => { c.snapshot.publishedAt = '2020-01-01' }],
  ['secondary source in primary-only catalog', (c) => { c.sources[0].primary = false }],
]

describe('research integrity boundaries', () => {
  it.each(corruptions)('rejects %s', (_name, corrupt) => {
    const catalog = structuredClone(loadResearchCatalog())
    corrupt(catalog)
    expect(() => validateResearchCatalog(catalog)).toThrow()
  })
})
