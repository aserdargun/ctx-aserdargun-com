import { localize } from '../../research/catalog'
import type { Locale, Method } from '../../research/schema'

export function MethodSelector({ methods, selectedId, locale, onSelect }: {
  methods: Method[]
  selectedId: string
  locale: Locale
  onSelect: (id: string) => void
}) {
  return (
    <fieldset className="method-selector">
      <legend className="sr-only">{locale === 'en' ? 'Methods' : 'Yöntemler'}</legend>
      {methods.map((method) => (
        <label key={method.id} className={method.id === selectedId ? 'method-option is-selected' : 'method-option'}>
          <input
            type="radio"
            name="method"
            value={method.id}
            checked={method.id === selectedId}
            aria-label={localize(method.name, locale)}
            onChange={() => onSelect(method.id)}
          />
          <span className="radio-mark" aria-hidden="true" />
          <span className="method-option-copy">
            <strong>{localize(method.name, locale)}</strong>
            <small>{localize(method.description, locale)}</small>
          </span>
        </label>
      ))}
    </fieldset>
  )
}
