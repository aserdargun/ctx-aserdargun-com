import { useSearchParams } from 'react-router-dom'
import { FilterBar, FilterButton } from '../../components/FilterBar'
import { ResearchDisclosure } from '../../components/ResearchDisclosure'
import { ReviewDate } from '../../components/ReviewDate'
import { loadResearchCatalog, localize } from '../../research/catalog'
import type { Locale, StageId } from '../../research/schema'
import './atlas.css'

export function AtlasPage({ locale }: { locale: Locale }) {
  const catalog = loadResearchCatalog()
  const [search, setSearch] = useSearchParams()
  const requested = search.get('stage')
  const stageId = catalog.stages.some((stage) => stage.id === requested) ? requested as StageId : null
  const query = search.get('q')?.trim().toLocaleLowerCase(locale) ?? ''
  const methods = catalog.methods.filter((method) => {
    if (stageId && method.stageId !== stageId) return false
    const haystack = [method.name, method.description, method.bestFor].flatMap((value) => [value.en, value.tr]).join(' ').toLocaleLowerCase(locale)
    return !query || haystack.includes(query)
  })
  const setFilter = (nextStage: StageId | null) => {
    const next = new URLSearchParams(search)
    nextStage ? next.set('stage', nextStage) : next.delete('stage')
    setSearch(next, { replace: true })
  }

  return (
    <article className="page research-page atlas-page">
      <header className="research-hero">
        <p className="eyebrow">{locale === 'en' ? 'Technique atlas · 26 records' : 'Teknik atlası · 26 kayıt'}</p>
        <h1>{locale === 'en' ? 'Choose by constraint, not fashion.' : 'Modaya göre değil, kısıta göre seç.'}</h1>
        <p>{locale === 'en' ? 'A stage-indexed field guide to the methods that shape reliable model context.' : 'Güvenilir model bağlamını şekillendiren yöntemler için aşama indeksli bir saha rehberi.'}</p>
      </header>
      <section className="research-controls" aria-label={locale === 'en' ? 'Atlas filters' : 'Atlas filtreleri'}>
        <FilterBar label={locale === 'en' ? 'Filter by stage' : 'Aşamaya göre filtrele'}>
          <FilterButton active={!stageId} onClick={() => setFilter(null)}>{locale === 'en' ? 'All' : 'Tümü'}</FilterButton>
          {catalog.stages.map((stage) => <FilterButton key={stage.id} active={stageId === stage.id} onClick={() => setFilter(stage.id)}>{localize(stage.name, locale)}</FilterButton>)}
        </FilterBar>
        <label className="search-filter"><span>{locale === 'en' ? 'Problem or use case' : 'Problem veya kullanım'}</span><input value={search.get('q') ?? ''} onChange={(event) => {
          const next = new URLSearchParams(search)
          event.currentTarget.value ? next.set('q', event.currentTarget.value) : next.delete('q')
          setSearch(next, { replace: true })
        }} placeholder={locale === 'en' ? 'Search the atlas' : 'Atlas içinde ara'} /></label>
      </section>
      <div className="result-line"><strong>{methods.length}</strong> {locale === 'en' ? 'techniques in view' : 'teknik görünümde'}<span>{catalog.snapshot.cutoff}</span></div>
      <section className="method-ledger" aria-label={locale === 'en' ? 'Technique records' : 'Teknik kayıtları'}>
        {methods.map((method) => {
          const stage = catalog.stages.find((candidate) => candidate.id === method.stageId)!
          return (
            <article className="method-record" data-testid="method-record" data-stage={method.stageId} key={method.id}>
              <div className="method-index mono-label">{String(stage.order).padStart(2, '0')} · {localize(stage.name, locale)}</div>
              <div className="method-summary"><h2>{localize(method.name, locale)}</h2><p>{localize(method.description, locale)}</p></div>
              <dl className="method-best"><dt>{locale === 'en' ? 'Best for' : 'En uygun'}</dt><dd>{localize(method.bestFor, locale)}</dd></dl>
              <ResearchDisclosure label={locale === 'en' ? 'Trade-offs and failure risk' : 'Ödünleşimler ve hata riski'}>
                <dl className="tradeoff-grid">
                  <div><dt>{locale === 'en' ? 'Strength' : 'Güçlü yön'}</dt><dd>{localize(method.strength, locale)}</dd></div>
                  <div><dt>{locale === 'en' ? 'Limitation' : 'Sınırlama'}</dt><dd>{localize(method.limitation, locale)}</dd></div>
                  <div><dt>{locale === 'en' ? 'Failure risk' : 'Hata riski'}</dt><dd>{localize(method.failureRisk, locale)}</dd></div>
                </dl>
                <ReviewDate date={method.reviewedAt} locale={locale} />
              </ResearchDisclosure>
            </article>
          )
        })}
      </section>
    </article>
  )
}
