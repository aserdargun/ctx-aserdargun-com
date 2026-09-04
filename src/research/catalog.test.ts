import { describe, expect, it } from 'vitest'
import { loadResearchCatalog, validateResearchCatalog } from './catalog'

function collectTurkishCopy(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectTurkishCopy)
  if (!value || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([key, entry]) => {
    if (key === 'tr' && typeof entry === 'string') return [entry]
    return collectTurkishCopy(entry)
  })
}

describe('CTX research catalog', () => {
  it('loads eleven ordered stages with bilingual public text', () => {
    const catalog = loadResearchCatalog()
    expect(catalog.stages.map((stage) => stage.id)).toEqual([
      'source', 'ingest', 'parse', 'chunk', 'index', 'retrieve',
      'rerank', 'assemble', 'cite', 'cache', 'memory',
    ])
    expect(catalog.stages.every((stage) => stage.name.en && stage.name.tr)).toBe(true)
  })

  it('keeps every cross-reference resolvable', () => {
    const catalog = loadResearchCatalog()
    const sourceIds = new Set(catalog.sources.map((source) => source.id))
    const stageIds = new Set(catalog.stages.map((stage) => stage.id))
    for (const claim of catalog.claims) {
      expect(claim.sourceIds.every((id) => sourceIds.has(id))).toBe(true)
      expect(claim.stageIds.every((id) => stageIds.has(id))).toBe(true)
    }
  })

  it('rejects unresolved source references', () => {
    const catalog = structuredClone(loadResearchCatalog())
    catalog.claims[0].sourceIds = ['missing-source']
    expect(() => validateResearchCatalog(catalog)).toThrow(/Unknown source/)
  })

  it('rejects incomplete translations', () => {
    const catalog = structuredClone(loadResearchCatalog())
    catalog.stages[0].name.tr = ''
    expect(() => validateResearchCatalog(catalog)).toThrow()
  })

  it('keeps review dates within the active snapshot', () => {
    const catalog = loadResearchCatalog()
    expect(catalog.claims.every((claim) => claim.reviewedAt <= catalog.snapshot.cutoff)).toBe(true)
    expect(catalog.sources.every((source) => source.checkedAt <= catalog.snapshot.cutoff)).toBe(true)
  })

  it('keeps editorial Turkish free of untranslated workflow residue', () => {
    const copy = collectTurkishCopy(loadResearchCatalog()).join('\n')
    expect(copy).not.toMatch(/\b(prompt|pipeline|pattern|grounded|retrieval|sparse|dense|embedding|corpus|cache|caching|compaction|artifact|provenance|snapshot|supersession|recall|layout|parsing|chunk|chunking|metadata|invalidation|benchmark|batch|fusion|rerank|token)\b/i)
  })
})
