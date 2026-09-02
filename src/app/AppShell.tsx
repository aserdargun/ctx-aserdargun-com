import { useState, type ReactNode } from 'react'
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
  return (
    <div className="app-shell">
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
        <strong>Provenance</strong>
        <span>{copy.evidencePolicy}</span>
        <a href="https://github.com/aserdargun/ctx-aserdargun-com">GitHub</a>
      </footer>
    </div>
  )
}
