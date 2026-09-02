import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { uiCopy } from '../i18n/copy'
import { parseLocale } from '../i18n/locale'
import { isRouteSlug } from '../routing/routes'
import { AppShell } from './AppShell'
import { PipelinePage } from '../features/pipeline/PipelinePage'
import { AtlasPage } from '../features/atlas/AtlasPage'
import { PatternsPage } from '../features/patterns/PatternsPage'
import { EvidencePage } from '../features/evidence/EvidencePage'
import { AboutPage } from '../features/about/AboutPage'

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
  const pages = {
    pipeline: <PipelinePage locale={locale} />,
    atlas: <AtlasPage locale={locale} />,
    patterns: <PatternsPage locale={locale} />,
    evidence: <EvidencePage locale={locale} />,
    about: <AboutPage locale={locale} />,
  }
  return (
    <AppShell locale={locale}>
      <div key={location.pathname}>{pages[rawSection]}</div>
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
