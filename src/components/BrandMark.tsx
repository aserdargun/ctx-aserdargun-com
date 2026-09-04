import { Link } from 'react-router-dom'
import type { Locale } from '../research/schema'

export function BrandMark({ locale }: { locale: Locale }) {
  return (
    <Link className="brand" to={`/${locale}/pipeline`} aria-label={locale === 'tr' ? 'CTX ana sayfası' : 'CTX home'}>
      <span className="brand-code">CTX</span>
      <span className="brand-rule" aria-hidden="true" />
      <span className="brand-name">Context &amp; Knowledge Engineering</span>
    </Link>
  )
}
