import { Link, useSearchParams } from 'react-router-dom'
import { ExternalLink } from '../../components/ExternalLink'
import { ReviewDate } from '../../components/ReviewDate'
import { loadResearchCatalog, localize } from '../../research/catalog'
import type { Locale } from '../../research/schema'
import { QualityGates } from '../pipeline/QualityGates'
import '../pipeline/pipeline.css'
import './patterns.css'

export function PatternsPage({ locale }: { locale: Locale }) {
  const catalog = loadResearchCatalog()
  const [search, setSearch] = useSearchParams()
  const pattern = catalog.patterns.find((item) => item.id === search.get('pattern')) ?? catalog.patterns[0]
  const sources = pattern.sourceIds.map((id) => catalog.sources.find((source) => source.id === id)!).filter(Boolean)
  return (
    <article className="page research-page patterns-page">
      <header className="research-hero patterns-hero">
        <p className="eyebrow">{locale === 'en' ? `Architecture patterns · ${catalog.patterns.length}` : `Mimari desenler · ${catalog.patterns.length}`}</p>
        <h1>{locale === 'en' ? 'Compose a system, then test its seams.' : 'Sistemi kur, ardından birleşim noktalarını sına.'}</h1>
        <p>{locale === 'en' ? 'Connected reference flows for recurring context engineering problems.' : 'Tekrarlanan bağlam mühendisliği problemleri için bağlantılı referans akışları.'}</p>
      </header>
      <div className="patterns-workbench">
        <nav className="pattern-index" aria-label={locale === 'en' ? 'Pattern index' : 'Desen dizini'}>
          {catalog.patterns.map((item, index) => <button key={item.id} className={item.id === pattern.id ? 'is-active' : ''} aria-current={item.id === pattern.id ? 'true' : undefined} onClick={() => setSearch({ pattern: item.id }, { replace: true })}><span>{String(index + 1).padStart(2, '0')}</span>{localize(item.name, locale)}</button>)}
        </nav>
        <section className="pattern-detail" aria-live="polite">
          <p className="mono-label pattern-kicker">{locale === 'en' ? 'Selected pattern' : 'Seçili desen'}</p>
          <h2>{localize(pattern.name, locale)}</h2>
          <p className="pattern-problem">{localize(pattern.problem, locale)}</p>
          <div className="pattern-flow" aria-label={locale === 'en' ? 'Connected stages' : 'Bağlı aşamalar'}>
            {pattern.stageIds.map((id, index) => {
              const stage = catalog.stages.find((item) => item.id === id)!
              return <Link to={`/${locale}/pipeline?stage=${id}`} key={id} className="pattern-stage" data-testid="pattern-stage"><span>{String(index + 1).padStart(2, '0')}</span><strong>{localize(stage.name, locale)}</strong></Link>
            })}
          </div>
          <div className="pattern-notes">
            <dl><dt>{locale === 'en' ? 'Best for' : 'En uygun'}</dt><dd>{localize(pattern.bestFor, locale)}</dd></dl>
            <dl><dt>{locale === 'en' ? 'Trade-off' : 'Ödünleşim'}</dt><dd>{localize(pattern.tradeoff, locale)}</dd></dl>
            <dl><dt>{locale === 'en' ? 'Failure modes' : 'Hata modları'}</dt><dd><ul>{pattern.failureModes.map((mode) => <li key={mode.en}>{localize(mode, locale)}</li>)}</ul></dd></dl>
          </div>
          <section className="pattern-methods"><h3>{locale === 'en' ? 'Methods in this pattern' : 'Bu desendeki yöntemler'}</h3><ul>{pattern.methodIds.map((id) => {
            const method = catalog.methods.find((item) => item.id === id)!
            return <li key={id}><Link className="text-link" to={`/${locale}/pipeline?stage=${method.stageId}&method=${id}`}>{localize(method.name, locale)}</Link></li>
          })}</ul></section>
          <QualityGates gates={catalog.qualityGates.filter((gate) => pattern.gateIds.includes(gate.id))} locale={locale} />
          <div className="pattern-sources"><strong>{locale === 'en' ? 'Primary references' : 'Birincil kaynaklar'}</strong>{sources.map((source) => <ExternalLink key={source.id} href={source.url}>{source.publisher} · {source.title}</ExternalLink>)}<ReviewDate date={pattern.reviewedAt} locale={locale} /></div>
        </section>
      </div>
    </article>
  )
}
