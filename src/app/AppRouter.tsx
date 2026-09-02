import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { uiCopy } from '../i18n/copy'
import { parseLocale } from '../i18n/locale'
import { isRouteSlug, type RouteSlug } from '../routing/routes'
import type { Locale } from '../research/schema'
import { AppShell } from './AppShell'

function PlaceholderPage({ locale, section }: { locale: Locale; section: RouteSlug }) {
  const copy = uiCopy[locale]
  const heading = section === 'pipeline' ? copy.headline : copy.nav[section]
  return (
    <section className="page-header">
      <h1>{heading}</h1>
      {section === 'pipeline' && <p>{copy.supporting}</p>}
    </section>
  )
}

function LocalizedRoute() {
  const { locale: rawLocale, section: rawSection } = useParams()
  const locale = parseLocale(rawLocale)
  const location = useLocation()
  if (!locale) return <Navigate to="/en/pipeline" replace />
  if (!isRouteSlug(rawSection)) {
    return (
      <AppShell locale={locale}>
        <section className="page-header">
          <h1>{uiCopy[locale].notFound}</h1>
          <a href={`/${locale}/pipeline`}>{uiCopy[locale].backToPipeline}</a>
        </section>
      </AppShell>
    )
  }
  return (
    <AppShell locale={locale}>
      <PlaceholderPage locale={locale} section={rawSection} key={location.pathname} />
    </AppShell>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en/pipeline" replace />} />
      <Route path="/:locale/:section" element={<LocalizedRoute />} />
      <Route path="*" element={<Navigate to="/en/pipeline" replace />} />
    </Routes>
  )
}

export function AppRouter() {
  return <AppRoutes />
}
