import { describe, expect, it } from 'vitest'
import { buildLocalizedPath, parseLocale } from './locale'

describe('locale routing', () => {
  it('accepts only English and Turkish', () => {
    expect(parseLocale('en')).toBe('en')
    expect(parseLocale('tr')).toBe('tr')
    expect(parseLocale('de')).toBeNull()
  })

  it('preserves route and query when switching to Turkish', () => {
    expect(buildLocalizedPath('tr', '/en/pipeline', '?stage=memory')).toBe('/tr/pipeline?stage=memory')
  })

  it('preserves the selected section anchor when switching language', () => {
    expect(buildLocalizedPath('tr', '/en/pipeline', '?stage=memory', '#method-comparison')).toBe('/tr/pipeline?stage=memory#method-comparison')
  })
})
