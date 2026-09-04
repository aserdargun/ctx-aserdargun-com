import { useEffect, useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { BrandMark } from '../components/BrandMark'
import { LocaleSwitch } from '../components/LocaleSwitch'
import { MenuButton } from '../components/MenuButton'
import { uiCopy } from '../i18n/copy'
import type { Locale } from '../research/schema'
import '../styles/tokens.css'
import '../styles/base.css'
import '../styles/shell.css'

const navOrder = ['atlas', 'pipeline', 'patterns', 'evidence', 'about'] as const

export function AppShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const copy = uiCopy[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = locale === 'tr' ? 'CTX - Bağlam Mühendisliği' : 'CTX - Context Engineering'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      locale === 'tr'
        ? 'Bağlam ve bilgi mühendisliği için kaynaklara dayalı atlas.'
        : 'A source-backed atlas for context and knowledge engineering.',
    )
  }, [locale])

  return (
    <div className="app-shell" lang={locale}>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <header className="site-header">
        <BrandMark locale={locale} />
        <nav id="primary-navigation" className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label={copy.primaryNavigation}>
          {navOrder.map((slug) => (
            <NavLink key={slug} to={`/${locale}/${slug}`} onClick={() => setMenuOpen(false)}>
              {copy.nav[slug]}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <LocaleSwitch locale={locale} />
          <MenuButton open={menuOpen} onClick={() => setMenuOpen((value) => !value)} label={menuOpen ? copy.closeMenu : copy.menu} />
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <span className="provenance-mark" aria-hidden="true" />
        <strong>{copy.provenance}</strong>
        <span>{copy.evidencePolicy}</span>
        <a href="https://github.com/aserdargun/ctx-aserdargun-com">GitHub</a>
      </footer>
    </div>
  )
}
