import { getMethodsForStage } from '../research/catalog'
import { stageIdSchema, type ResearchCatalog, type StageId } from '../research/schema'

export type PipelineSelection = { stageId: StageId; methodId: string }

export function getDefaultMethodId(catalog: ResearchCatalog, stageId: StageId): string {
  const methods = getMethodsForStage(catalog, stageId)
  if (stageId === 'retrieve') return methods.find((method) => method.id === 'dense-retrieval-method')?.id ?? methods[0].id
  return methods[0].id
}

export function parsePipelineQuery(search: URLSearchParams, catalog: ResearchCatalog): PipelineSelection {
  const parsedStage = stageIdSchema.safeParse(search.get('stage'))
  const stageId: StageId = parsedStage.success ? parsedStage.data : 'retrieve'
  const methods = getMethodsForStage(catalog, stageId)
  const requestedMethod = search.get('method')
  const methodId = methods.some((method) => method.id === requestedMethod) ? requestedMethod! : getDefaultMethodId(catalog, stageId)
  return { stageId, methodId }
}
