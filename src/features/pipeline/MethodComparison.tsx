import { localize } from '../../research/catalog'
import type { Locale, Method } from '../../research/schema'
import { uiCopy } from '../../i18n/copy'

export function MethodComparison({ methods, selectedId, locale, onSelect }: {
  methods: Method[]
  selectedId: string
  locale: Locale
  onSelect: (id: string) => void
}) {
  const copy = uiCopy[locale]
  return (
    <section id="method-comparison" className="comparison-section" aria-labelledby="comparison-title">
      <div className="section-heading">
        <h2 id="comparison-title">{copy.methodComparison}</h2>
        <span>{locale === 'en' ? `${methods.length} methods in this stage` : `Bu aşamada ${methods.length} yöntem`}</span>
      </div>
      <div className="comparison-desktop">
        <table>
          <thead><tr><th>{locale === 'en' ? 'Method' : 'Yöntem'}</th><th>{copy.strengths}</th><th>{copy.limitations}</th><th>{copy.bestFor}</th><th>{copy.failureRisk}</th></tr></thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method.id} className={method.id === selectedId ? 'is-selected' : ''}>
                <th scope="row"><button type="button" onClick={() => onSelect(method.id)}><span className="radio-mark" aria-hidden="true" />{localize(method.name, locale)}</button></th>
                <td>{localize(method.strength, locale)}</td>
                <td>{localize(method.limitation, locale)}</td>
                <td>{localize(method.bestFor, locale)}</td>
                <td>{localize(method.failureRisk, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="comparison-mobile">
        {methods.map((method) => (
          <details key={method.id} open={method.id === selectedId}>
            <summary onClick={(event) => { event.preventDefault(); onSelect(method.id) }}><span className="radio-mark" aria-hidden="true" />{localize(method.name, locale)}<span aria-hidden="true">⌄</span></summary>
            <dl>
              <div><dt>{copy.strengths}</dt><dd>{localize(method.strength, locale)}</dd></div>
              <div><dt>{copy.limitations}</dt><dd>{localize(method.limitation, locale)}</dd></div>
              <div><dt>{copy.bestFor}</dt><dd>{localize(method.bestFor, locale)}</dd></div>
              <div><dt>{copy.failureRisk}</dt><dd>{localize(method.failureRisk, locale)}</dd></div>
            </dl>
          </details>
        ))}
      </div>
    </section>
  )
}
