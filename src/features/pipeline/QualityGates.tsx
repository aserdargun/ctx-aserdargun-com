import { localize } from '../../research/catalog'
import type { Locale, QualityGate } from '../../research/schema'
import { uiCopy } from '../../i18n/copy'

export function QualityGates({ gates, locale }: { gates: QualityGate[]; locale: Locale }) {
  return (
    <section className="quality-section" aria-labelledby="quality-title">
      <div className="section-heading"><h2 id="quality-title">{uiCopy[locale].qualityGates}</h2></div>
      <div className="gate-list">
        {gates.map((gate, index) => (
          <details key={gate.id} data-testid="quality-gate">
            <summary>
              <span className="gate-index mono-label">0{index + 1}</span>
              <span><strong>{localize(gate.name, locale)}</strong><small>{localize(gate.question, locale)}</small></span>
              <span className="gate-state">{locale === 'en' ? 'Evidence required' : 'Kanıt gerekli'}</span>
              <span aria-hidden="true">⌄</span>
            </summary>
            <div className="gate-detail">
              <p><strong>{locale === 'en' ? 'Required evidence' : 'Gerekli kanıt'}</strong>{localize(gate.evidence, locale)}</p>
              <p><strong>{locale === 'en' ? 'Failure means' : 'Hata anlamı'}</strong>{localize(gate.failure, locale)}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
