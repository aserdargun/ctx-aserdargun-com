import { describe, expect, it } from 'vitest'
import { loadResearchCatalog, validateResearchCatalog } from './catalog'
import readme from '../../README.md?raw'

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

// The README is where a reader learns which snapshot the catalog is at, how
// much it contains and where the review log lives. It is a hand-written copy
// of facts the catalog already knows, so it drifts the moment a review
// advances the snapshot — and nothing compared the two: the shipped page could
// name a three-week-old snapshot as "the current" one while the app stamped a
// newer research cutoff into its release manifest. Read the copy back out of
// the README and require the catalog to agree with it.
describe('the published README describes the catalog that ships', () => {
  const catalog = loadResearchCatalog()

  it('names the active snapshot as the current one', () => {
    const stated = /The current `(\d{4}-\d{2}-\d{2})` snapshot/.exec(readme)?.[1]
    expect(stated).toBe(catalog.snapshot.cutoff)
  })

  it('states the counts the catalog actually contains', () => {
    const stated: Record<string, number> = {}
    const counts = /(\d+) (stages|techniques|architecture patterns|primary sources|claims|evidence-required quality gates)/g
    let match = counts.exec(readme)
    while (match) {
      stated[match[2]] = Number(match[1])
      match = counts.exec(readme)
    }
    expect(stated).toEqual({
      stages: catalog.stages.length,
      techniques: catalog.methods.length,
      'architecture patterns': catalog.patterns.length,
      'primary sources': catalog.sources.length,
      claims: catalog.claims.length,
      'evidence-required quality gates': catalog.qualityGates.length,
    })
  })

  it('links a review log that exists', () => {
    const link = /\]\((docs\/research-review-[^)]+)\)/.exec(readme)?.[1]
    expect(link).toBeTruthy()
    const logs = import.meta.glob('../../docs/research-review-*.md', {
      query: '?raw',
      import: 'default',
      eager: true,
    }) as Record<string, string>
    const published = Object.keys(logs).map((path) => path.replace(/^.*\.\.\/\.\.\//, ''))
    expect(published).toContain(link as string)
  })
})
