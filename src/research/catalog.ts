import sources from '../../content/sources.json'
import claims from '../../content/claims.json'
import stages from '../../content/stages.json'
import methods from '../../content/methods.json'
import patterns from '../../content/patterns.json'
import qualityGates from '../../content/quality-gates.json'
import snapshot from '../../content/snapshots/2026-09-02.json'
import {
  researchCatalogSchema,
  type LocalizedText,
  type Locale,
  type Method,
  type Pattern,
  type ResearchCatalog,
  type Stage,
  type StageId,
} from './schema'

const rawCatalog = { sources, claims, stages, methods, patterns, qualityGates, snapshot }

function uniqueIds(records: Array<{ id: string }>, label: string) {
  const ids = records.map((record) => record.id)
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate ${label} id`)
  return new Set(ids)
}

function requireReferences(ids: string[], known: Set<string>, label: string) {
  for (const id of ids) if (!known.has(id)) throw new Error(`Unknown ${label}: ${id}`)
}

export function validateResearchCatalog(input: unknown): ResearchCatalog {
  const catalog = researchCatalogSchema.parse(input)
  const sourceIds = uniqueIds(catalog.sources, 'source')
  const claimIds = uniqueIds(catalog.claims, 'claim')
  const stageIds = uniqueIds(catalog.stages, 'stage')
  const methodIds = uniqueIds(catalog.methods, 'method')
  const patternIds = uniqueIds(catalog.patterns, 'pattern')
  const gateIds = uniqueIds(catalog.qualityGates, 'quality gate')
  const expectedStages: StageId[] = ['source', 'ingest', 'parse', 'chunk', 'index', 'retrieve', 'rerank', 'assemble', 'cite', 'cache', 'memory']
  const ordered = [...catalog.stages].sort((a, b) => a.order - b.order)
  if (ordered.some((stage, index) => stage.id !== expectedStages[index] || stage.order !== index + 1)) {
    throw new Error('Pipeline stages must use the canonical order')
  }
  for (const stage of catalog.stages) {
    requireReferences(stage.methodIds, methodIds, 'method')
    requireReferences(stage.sourceIds, sourceIds, 'source')
    if (stage.reviewedAt > catalog.snapshot.cutoff) throw new Error(`Stage reviewed after snapshot: ${stage.id}`)
  }
  for (const method of catalog.methods) {
    requireReferences([method.stageId], stageIds, 'stage')
    requireReferences(method.sourceIds, sourceIds, 'source')
    if (method.reviewedAt > catalog.snapshot.cutoff) throw new Error(`Method reviewed after snapshot: ${method.id}`)
  }
  for (const claim of catalog.claims) {
    requireReferences(claim.sourceIds, sourceIds, 'source')
    requireReferences(claim.stageIds, stageIds, 'stage')
    requireReferences(claim.patternIds, patternIds, 'pattern')
    if (claim.reviewedAt > catalog.snapshot.cutoff) throw new Error(`Claim reviewed after snapshot: ${claim.id}`)
  }
  for (const pattern of catalog.patterns) {
    requireReferences(pattern.stageIds, stageIds, 'stage')
    requireReferences(pattern.methodIds, methodIds, 'method')
    requireReferences(pattern.gateIds, gateIds, 'quality gate')
    requireReferences(pattern.sourceIds, sourceIds, 'source')
  }
  for (const gate of catalog.qualityGates) {
    requireReferences(gate.stageIds, stageIds, 'stage')
    requireReferences(gate.sourceIds, sourceIds, 'source')
  }
  requireReferences(catalog.snapshot.reviewedSourceIds, sourceIds, 'source')
  requireReferences(catalog.snapshot.claimIds, claimIds, 'claim')
  requireReferences(catalog.snapshot.watchSignalIds, claimIds, 'claim')
  for (const source of catalog.sources) {
    if (source.checkedAt > catalog.snapshot.cutoff) throw new Error(`Source checked after snapshot: ${source.id}`)
    if (source.publishedAt && source.publishedAt > source.checkedAt) throw new Error(`Source published after check: ${source.id}`)
  }
  return catalog
}

let cachedCatalog: ResearchCatalog | undefined

export function loadResearchCatalog(): ResearchCatalog {
  cachedCatalog ??= validateResearchCatalog(rawCatalog)
  return cachedCatalog
}

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale]
}

export function getStage(catalog: ResearchCatalog, id: StageId): Stage {
  const stage = catalog.stages.find((candidate) => candidate.id === id)
  if (!stage) throw new Error(`Unknown stage: ${id}`)
  return stage
}

export function getMethodsForStage(catalog: ResearchCatalog, stageId: StageId): Method[] {
  return catalog.methods.filter((method) => method.stageId === stageId)
}

export function getPattern(catalog: ResearchCatalog, id: string): Pattern | undefined {
  return catalog.patterns.find((pattern) => pattern.id === id)
}
