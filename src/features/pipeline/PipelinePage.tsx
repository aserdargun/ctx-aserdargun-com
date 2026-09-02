import { useSearchParams } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { uiCopy } from '../../i18n/copy'
import { getMethodsForStage, getStage, loadResearchCatalog } from '../../research/catalog'
import type { Locale, StageId } from '../../research/schema'
import { getDefaultMethodId, parsePipelineQuery } from '../../routing/queryState'
import { MethodComparison } from './MethodComparison'
import { PipelineRail } from './PipelineRail'
import { QualityGates } from './QualityGates'
import { StageDetail } from './StageDetail'
import './pipeline.css'

export function PipelinePage({ locale }: { locale: Locale }) {
  const catalog = loadResearchCatalog()
  const [searchParams, setSearchParams] = useSearchParams()
  const selection = parsePipelineQuery(searchParams, catalog)
  const stage = getStage(catalog, selection.stageId)
  const methods = getMethodsForStage(catalog, selection.stageId)
  const copy = uiCopy[locale]

  const selectStage = (stageId: StageId) => {
    setSearchParams({ stage: stageId, method: getDefaultMethodId(catalog, stageId) })
  }
  const selectMethod = (methodId: string) => setSearchParams({ stage: selection.stageId, method: methodId })

  return (
    <article className="page pipeline-page">
      <section className="pipeline-top">
        <div className="pipeline-primary">
          <div className="pipeline-intro">
            <h1>{copy.headline}</h1>
            <p>{copy.supporting}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#pipeline-map">{copy.explore}<Icon name="arrow" size={19} /></a>
              <a className="button button-secondary" href="#method-comparison">{copy.compare}<Icon name="arrow" size={19} /></a>
            </div>
          </div>
          <PipelineRail stages={catalog.stages} selectedId={selection.stageId} locale={locale} onSelect={selectStage} />
        </div>
        <StageDetail stage={stage} methods={methods} selectedMethodId={selection.methodId} locale={locale} onMethodSelect={selectMethod} />
      </section>
      <div className="research-grid">
        <MethodComparison methods={methods} selectedId={selection.methodId} locale={locale} onSelect={selectMethod} />
        <QualityGates gates={catalog.qualityGates} locale={locale} />
      </div>
      <div className="pipeline-status">
        <span className="provenance-mark" aria-hidden="true" />
        <strong>Provenance</strong>
        <span>{copy.reviewed} · {copy.primaryOnly}</span>
        <span>{catalog.stages.length} {locale === 'en' ? 'stages' : 'aşama'} · {catalog.methods.length} {locale === 'en' ? 'methods' : 'yöntem'} · {catalog.sources.length} {locale === 'en' ? 'sources' : 'kaynak'}</span>
      </div>
    </article>
  )
}
