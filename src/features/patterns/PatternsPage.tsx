import { useSearchParams } from 'react-router-dom'
import { ExternalLink } from '../../components/ExternalLink'
import { ReviewDate } from '../../components/ReviewDate'
import { loadResearchCatalog, localize } from '../../research/catalog'
import type { Locale } from '../../research/schema'
import './patterns.css'

export function PatternsPage({ locale }: { locale: Locale }) {
  const catalog = loadResearchCatalog()
  const [search, setSearch] = useSearchParams()
  const pattern = catalog.patterns.find((item) => item.id === search.get('pattern')) ?? catalog.patterns[0]
  const sources = pattern.sourceIds.map((id) => catalog.sources.find((source) => source.id === id)!).filter(Boolean)
  return (
    <article className="page research-page patterns-page">
      <header className="research-hero patterns-hero">
        <p className="eyebrow">{locale === 'en' ? 'Architecture patterns · 06' : 'Mimari pattern’ler · 06'}</p>
        <h1>{locale === 'en' ? 'Compose a system, then test its seams.' : 'Sistemi birleştir, sonra ek yerlerini test et.'}</h1>
        <p>{locale === 'en' ? 'Connected reference flows for recurring context engineering problems.' : 'Tekrarlanan bağlam mühendisliği problemleri için bağlantılı referans akışları.'}</p>
      </header>
      <div className="patterns-workbench">
        <nav className="pattern-index" aria-label={locale === 'en' ? 'Pattern index' : 'Pattern indeksi'}>
          {catalog.patterns.map((item, index) => <button key={item.id} className={item.id === pattern.id ? 'is-active' : ''} aria-current={item.id === pattern.id ? 'true' : undefined} onClick={() => setSearch({ pattern: item.id }, { replace: true })}><span>{String(index + 1).padStart(2, '0')}</span>{localize(item.name, locale)}</button>)}
        </nav>
        <section className="pattern-detail" aria-live="polite">
          <p className="mono-label pattern-kicker">{locale === 'en' ? 'Selected pattern' : 'Seçili pattern'}</p>
          <h2>{localize(pattern.name, locale)}</h2>
          <p className="pattern-problem">{localize(pattern.problem, locale)}</p>
          <div className="pattern-flow" aria-label={locale === 'en' ? 'Connected stages' : 'Bağlı aşamalar'}>
            {pattern.stageIds.map((id, index) => {
              const stage = catalog.stages.find((item) => item.id === id)!
              return <div key={id} className="pattern-stage" data-testid="pattern-stage"><span>{String(index + 1).padStart(2, '0')}</span><strong>{localize(stage.name, locale)}</strong></div>
            })}
          </div>
          <div className="pattern-notes">
            <dl><dt>{locale === 'en' ? 'Best for' : 'En uygun'}</dt><dd>{localize(pattern.bestFor, locale)}</dd></dl>
            <dl><dt>{locale === 'en' ? 'Trade-off' : 'Ödünleşim'}</dt><dd>{localize(pattern.tradeoff, locale)}</dd></dl>
            <dl><dt>{locale === 'en' ? 'Failure modes' : 'Hata modları'}</dt><dd><ul>{pattern.failureModes.map((mode) => <li key={mode.en}>{localize(mode, locale)}</li>)}</ul></dd></dl>
          </div>
          <div className="pattern-sources"><strong>{locale === 'en' ? 'Primary references' : 'Birincil referanslar'}</strong>{sources.map((source) => <ExternalLink key={source.id} href={source.url}>{source.publisher}</ExternalLink>)}<ReviewDate date={pattern.reviewedAt} locale={locale} /></div>
        </section>
      </div>
    </article>
  )
}
