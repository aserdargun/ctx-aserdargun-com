import { describe, expect, it } from 'vitest'
import { loadResearchCatalog } from '../research/catalog'
import { parsePipelineQuery } from './queryState'

const catalog = loadResearchCatalog()

describe('pipeline query state', () => {
  it('accepts a valid stage and method pair', () => {
    const value = parsePipelineQuery(new URLSearchParams('stage=retrieve&method=hybrid-retrieval-method'), catalog)
    expect(value).toEqual({ stageId: 'retrieve', methodId: 'hybrid-retrieval-method' })
  })

  it('falls back when a method does not belong to the selected stage', () => {
    const value = parsePipelineQuery(new URLSearchParams('stage=retrieve&method=contextual-chunking'), catalog)
    expect(value).toEqual({ stageId: 'retrieve', methodId: 'dense-retrieval-method' })
  })

  it('falls back to retrieve when the stage is invalid', () => {
    const value = parsePipelineQuery(new URLSearchParams('stage=unknown'), catalog)
    expect(value.stageId).toBe('retrieve')
  })
})
