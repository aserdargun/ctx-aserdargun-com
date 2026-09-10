import { localize } from '../../research/catalog'
import type { Locale, Method, Stage } from '../../research/schema'
import { ReviewDate } from '../../components/ReviewDate'
import { MethodSelector } from './MethodSelector'
import { Link } from 'react-router-dom'
import { SourceReferences } from '../../components/SourceReferences'

export function StageDetail({ stage, methods, selectedMethodId, locale, onMethodSelect }: {
  stage: Stage
  methods: Method[]
  selectedMethodId: string
  locale: Locale
  onMethodSelect: (id: string) => void
}) {
  const method = methods.find((item) => item.id === selectedMethodId)!
  return (
    <aside className="stage-detail" aria-live="polite">
      <div className="stage-detail-heading">
        <span className="stage-number mono-label">{String(stage.order).padStart(2, '0')} / 11</span>
        <h2>{localize(stage.name, locale)}</h2>
        <p>{localize(stage.purpose, locale)}</p>
      </div>
      <dl className="stage-io">
        <div><dt>{locale === 'en' ? 'Input' : 'Girdi'}</dt><dd>{localize(stage.input, locale)}</dd></div>
        <div><dt>{locale === 'en' ? 'Artifact' : 'Çıktı'}</dt><dd>{localize(stage.artifact, locale)}</dd></div>
      </dl>
      <MethodSelector methods={methods} selectedId={selectedMethodId} locale={locale} onSelect={onMethodSelect} />
      <details className="stage-evidence">
        <summary>{locale === 'en' ? 'Failure modes and sources' : 'Hata biçimleri ve kaynaklar'}</summary>
        <ul>{stage.failures.map((failure) => <li key={failure.en}>{localize(failure, locale)}</li>)}</ul>
        <SourceReferences sourceIds={[...new Set([...stage.sourceIds, ...method.sourceIds])]} locale={locale} />
        <p>{localize(method.name, locale)} · <ReviewDate date={method.reviewedAt} locale={locale} /></p>
        <Link className="text-link" to={`/${locale}/evidence?stage=${stage.id}`}>{locale === 'en' ? 'Inspect related claims →' : 'İlgili iddiaları incele →'}</Link>
      </details>
      <div className="detail-review">
        <span className="provenance-mark" aria-hidden="true" />
        <span><ReviewDate date={stage.reviewedAt} locale={locale} /> · {locale === 'en' ? 'Primary sources only' : 'Yalnız birincil kaynaklar'}</span>
      </div>
    </aside>
  )
}
