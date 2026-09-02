import { useSearchParams } from 'react-router-dom'
import { EvidenceKind } from '../../components/EvidenceKind'
import { ExternalLink } from '../../components/ExternalLink'
import { ReviewDate } from '../../components/ReviewDate'
import { loadResearchCatalog, localize } from '../../research/catalog'
import type { Locale } from '../../research/schema'
import './evidence.css'

const kinds = ['all', 'evidence', 'synthesis', 'watch-signal'] as const

export function EvidencePage({ locale }: { locale: Locale }) {
  const catalog = loadResearchCatalog()
  const [search, setSearch] = useSearchParams()
  const requestedKind = search.get('kind')
  const kind = kinds.includes(requestedKind as typeof kinds[number]) ? requestedKind! : 'all'
  const requestedStage = search.get('stage') ?? 'all'
  const claims = catalog.claims.filter((claim) => (kind === 'all' || claim.kind === kind) && (requestedStage === 'all' || claim.stageIds.includes(requestedStage as never)))
  const setParam = (name: string, value: string) => {
    const next = new URLSearchParams(search)
    value === 'all' ? next.delete(name) : next.set(name, value)
    setSearch(next, { replace: true })
  }
  return (
    <article className="page research-page evidence-page">
      <header className="research-hero evidence-hero">
        <p className="eyebrow">{locale === 'en' ? `Evidence ledger · cutoff ${catalog.snapshot.cutoff}` : `Kanıt defteri · kesim ${catalog.snapshot.cutoff}`}</p>
        <h1>{locale === 'en' ? 'Every claim keeps its receipt.' : 'Her iddia makbuzunu korur.'}</h1>
        <p>{localize(catalog.snapshot.summary, locale)}</p>
      </header>
      <section className="evidence-filters" aria-label={locale === 'en' ? 'Evidence filters' : 'Kanıt filtreleri'}>
        <label>{locale === 'en' ? 'Claim kind' : 'İddia türü'}<select value={kind} onChange={(event) => setParam('kind', event.target.value)}>{kinds.map((value) => <option key={value} value={value}>{value === 'all' ? (locale === 'en' ? 'All kinds' : 'Tüm türler') : (locale === 'en' ? value : value === 'evidence' ? 'kanıt' : value === 'synthesis' ? 'sentez' : 'takip sinyali')}</option>)}</select></label>
        <label>{locale === 'en' ? 'Pipeline stage' : 'Pipeline aşaması'}<select value={requestedStage} onChange={(event) => setParam('stage', event.target.value)}><option value="all">{locale === 'en' ? 'All stages' : 'Tüm aşamalar'}</option>{catalog.stages.map((stage) => <option key={stage.id} value={stage.id}>{localize(stage.name, locale)}</option>)}</select></label>
        <p><strong>{claims.length}</strong> {locale === 'en' ? 'claims in view' : 'iddia görünümde'}</p>
      </section>
      <section className="claim-ledger" aria-label={locale === 'en' ? 'Claims' : 'İddialar'}>
        {claims.map((claim, index) => {
          const source = catalog.sources.find((item) => item.id === claim.sourceIds[0])!
          return <article className="claim-record" data-testid="claim-record" key={claim.id}>
            <div className="claim-number mono-label">C{String(index + 1).padStart(2, '0')}</div>
            <div className="claim-main"><EvidenceKind kind={claim.kind} locale={locale} /><p>{localize(claim.text, locale)}</p><small>{localize(claim.limitation, locale)}</small></div>
            <div className="claim-meta"><ExternalLink href={source.url}>{source.publisher} · {source.title}</ExternalLink><ReviewDate date={claim.reviewedAt} locale={locale} /><span>{localize(claim.confidence, locale)}</span></div>
          </article>
        })}
      </section>
      <section className="source-register">
        <header><p className="mono-label">{locale === 'en' ? 'Source register' : 'Kaynak sicili'}</p><h2>{locale === 'en' ? 'Primary material inspected' : 'İncelenen birincil materyal'}</h2></header>
        <ol>{catalog.sources.map((source) => <li key={source.id}><span className="source-publisher">{source.publisher}</span><ExternalLink href={source.url}>{source.title}</ExternalLink><span>{source.kind}</span><ReviewDate date={source.checkedAt} locale={locale} /></li>)}</ol>
      </section>
    </article>
  )
}
