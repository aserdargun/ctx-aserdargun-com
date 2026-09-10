import { loadResearchCatalog } from '../research/catalog'
import type { Locale } from '../research/schema'
import { ExternalLink } from './ExternalLink'

export function SourceReferences({ sourceIds, locale }: { sourceIds: string[]; locale: Locale }) {
  const catalog = loadResearchCatalog()
  return (
    <div className="source-references">
      <strong>{locale === 'en' ? 'Primary references' : 'Birincil kaynaklar'}</strong>
      <ul>{sourceIds.map((id) => {
        const source = catalog.sources.find((item) => item.id === id)!
        return <li key={id}><ExternalLink href={source.url}>{source.publisher} · {source.title}</ExternalLink></li>
      })}</ul>
    </div>
  )
}
