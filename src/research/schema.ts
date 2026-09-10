import { z } from 'zod'

export const localeSchema = z.enum(['en', 'tr'])
export type Locale = z.infer<typeof localeSchema>

export const localizedTextSchema = z.object({
  en: z.string().trim().min(1),
  tr: z.string().trim().min(1),
})
export type LocalizedText = z.infer<typeof localizedTextSchema>

export const stageIdSchema = z.enum([
  'source', 'ingest', 'parse', 'chunk', 'index', 'retrieve',
  'rerank', 'assemble', 'cite', 'cache', 'memory',
])
export type StageId = z.infer<typeof stageIdSchema>

const dateSchema = z.iso.date()
const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
const httpsUrlSchema = z.string().url().refine((value) => value.startsWith('https://'), 'URL must use HTTPS')

export const sourceSchema = z.object({
  id: idSchema,
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: httpsUrlSchema,
  kind: z.enum(['paper', 'documentation', 'research', 'announcement']),
  publishedAt: dateSchema.optional(),
  checkedAt: dateSchema,
  primary: z.boolean(),
  context: localizedTextSchema,
})

export const claimSchema = z.object({
  id: idSchema,
  kind: z.enum(['evidence', 'synthesis', 'watch-signal']),
  text: localizedTextSchema,
  sourceIds: z.array(idSchema).min(1),
  stageIds: z.array(stageIdSchema).min(1),
  patternIds: z.array(idSchema).default([]),
  reviewedAt: dateSchema,
  confidence: localizedTextSchema,
  limitation: localizedTextSchema,
})

export const stageSchema = z.object({
  id: stageIdSchema,
  order: z.number().int().min(1).max(11),
  name: localizedTextSchema,
  purpose: localizedTextSchema,
  input: localizedTextSchema,
  artifact: localizedTextSchema,
  failures: z.array(localizedTextSchema).min(1),
  methodIds: z.array(idSchema).min(1),
  sourceIds: z.array(idSchema).min(1),
  reviewedAt: dateSchema,
})

export const methodSchema = z.object({
  id: idSchema,
  stageId: stageIdSchema,
  name: localizedTextSchema,
  description: localizedTextSchema,
  strength: localizedTextSchema,
  limitation: localizedTextSchema,
  bestFor: localizedTextSchema,
  failureRisk: localizedTextSchema,
  sourceIds: z.array(idSchema).min(1),
  reviewedAt: dateSchema,
})

export const patternSchema = z.object({
  id: idSchema,
  name: localizedTextSchema,
  problem: localizedTextSchema,
  stageIds: z.array(stageIdSchema).min(1),
  methodIds: z.array(idSchema).min(1),
  bestFor: localizedTextSchema,
  tradeoff: localizedTextSchema,
  failureModes: z.array(localizedTextSchema).min(1),
  gateIds: z.array(idSchema).min(1),
  sourceIds: z.array(idSchema).min(1),
  reviewedAt: dateSchema,
})

export const qualityGateSchema = z.object({
  id: idSchema,
  name: localizedTextSchema,
  question: localizedTextSchema,
  evidence: localizedTextSchema,
  failure: localizedTextSchema,
  stageIds: z.array(stageIdSchema).min(1),
  sourceIds: z.array(idSchema).min(1),
  reviewedAt: dateSchema,
})

export const snapshotSchema = z.object({
  id: idSchema,
  cutoff: dateSchema,
  publishedAt: dateSchema,
  summary: localizedTextSchema,
  reviewedSourceIds: z.array(idSchema).min(1),
  claimIds: z.array(idSchema).min(1),
  watchSignalIds: z.array(idSchema),
})

export const researchCatalogSchema = z.object({
  sources: z.array(sourceSchema).min(1),
  claims: z.array(claimSchema).min(1),
  stages: z.array(stageSchema).length(11),
  methods: z.array(methodSchema).min(11),
  patterns: z.array(patternSchema).min(1),
  qualityGates: z.array(qualityGateSchema).length(5),
  snapshot: snapshotSchema,
})

export type Source = z.infer<typeof sourceSchema>
export type Claim = z.infer<typeof claimSchema>
export type Stage = z.infer<typeof stageSchema>
export type Method = z.infer<typeof methodSchema>
export type Pattern = z.infer<typeof patternSchema>
export type QualityGate = z.infer<typeof qualityGateSchema>
export type Snapshot = z.infer<typeof snapshotSchema>
export type ResearchCatalog = z.infer<typeof researchCatalogSchema>
