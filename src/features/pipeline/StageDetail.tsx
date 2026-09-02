import { localize } from '../../research/catalog'
import type { Locale, Method, Stage } from '../../research/schema'
import { MethodSelector } from './MethodSelector'

export function StageDetail({ stage, methods, selectedMethodId, locale, onMethodSelect }: {
  stage: Stage
  methods: Method[]
  selectedMethodId: string
  locale: Locale
  onMethodSelect: (id: string) => void
}) {
  return (
    <aside className="stage-detail" aria-live="polite">
      <div className="stage-detail-heading">
        <span className="stage-number mono-label">{String(stage.order).padStart(2, '0')} / 11</span>
        <h2>{localize(stage.name, locale)}</h2>
        <p>{localize(stage.purpose, locale)}</p>
      </div>
      <dl className="stage-io">
        <div><dt>{locale === 'en' ? 'Input' : 'Girdi'}</dt><dd>{localize(stage.input, locale)}</dd></div>
        <div><dt>{locale === 'en' ? 'Artifact' : 'Artifact'}</dt><dd>{localize(stage.artifact, locale)}</dd></div>
      </dl>
      <MethodSelector methods={methods} selectedId={selectedMethodId} locale={locale} onSelect={onMethodSelect} />
      <div className="detail-review">
        <span className="provenance-mark" aria-hidden="true" />
        <span>{locale === 'en' ? 'Reviewed 02 Sep 2026 · Primary sources only' : '02 Eyl 2026 incelendi · Yalnız birincil kaynaklar'}</span>
      </div>
    </aside>
  )
}
