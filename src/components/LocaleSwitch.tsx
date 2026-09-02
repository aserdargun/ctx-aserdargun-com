import { Link, useLocation } from 'react-router-dom'
import { buildLocalizedPath } from '../i18n/locale'
import type { Locale } from '../research/schema'

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const location = useLocation()
  const target: Locale = locale === 'en' ? 'tr' : 'en'
  return (
    <div className="locale-switch" aria-label={locale === 'en' ? 'Language' : 'Dil'}>
      <span aria-current="true">{locale.toUpperCase()}</span>
      <span aria-hidden="true">/</span>
      <Link
        to={buildLocalizedPath(target, location.pathname, location.search)}
        lang={target}
        aria-label={target === 'tr' ? 'Türkçe' : 'English'}
      >
        {target.toUpperCase()}
      </Link>
    </div>
  )
}
