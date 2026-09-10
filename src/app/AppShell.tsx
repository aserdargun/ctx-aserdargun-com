import { useEffect, useRef, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BrandMark } from '../components/BrandMark'
import { LocaleSwitch } from '../components/LocaleSwitch'
import { MenuButton } from '../components/MenuButton'
import { uiCopy } from '../i18n/copy'
import type { Locale } from '../research/schema'
import { isRouteSlug } from '../routing/routes'
import '../styles/tokens.css'
import '../styles/base.css'
import '../styles/shell.css'

const navOrder = ['atlas', 'pipeline', 'patterns', 'evidence', 'about'] as const

export function AppShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { pathname, hash } = useLocation()
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === pathname
  const headerRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)
  const copy = uiCopy[locale]
  const section = pathname.split('/')[2]
  const pageName = isRouteSlug(section) ? copy.nav[section] : copy.notFound

  useEffect(() => {
    const changed = previousPath.current !== pathname
    previousPath.current = pathname
    if (hash) {
      let id = hash.slice(1)
      try { id = decodeURIComponent(id) } catch { /* Keep malformed fragments harmless. */ }
      document.getElementById(id)?.scrollIntoView?.()
    } else if (changed) {
      window.scrollTo?.({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash])

  useEffect(() => {
    if (!menuOpen) return
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuPath(null)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = `${pageName} · CTX — ${locale === 'tr' ? 'Bağlam ve Bilgi Mühendisliği' : 'Context & Knowledge Engineering'}`
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      locale === 'tr'
        ? 'Bağlam ve bilgi mühendisliği için kaynaklara dayalı atlas.'
        : 'A source-backed atlas for context and knowledge engineering.',
    )
  }, [locale, pageName])

  return (
    <div className="app-shell" lang={locale}>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <header className="site-header" ref={headerRef} onClick={(event) => {
        if (event.target instanceof Element && event.target.closest('a')) setMenuPath(null)
      }} onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuPath(null)
          headerRef.current?.querySelector<HTMLButtonElement>('.menu-button')?.focus()
        }
      }}>
        <BrandMark locale={locale} />
        <nav id="primary-navigation" className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label={copy.primaryNavigation}>
          {navOrder.map((slug) => (
            <NavLink key={slug} to={`/${locale}/${slug}`} onClick={() => setMenuPath(null)}>
              {copy.nav[slug]}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <LocaleSwitch locale={locale} />
          <MenuButton open={menuOpen} onClick={() => setMenuPath(menuOpen ? null : pathname)} label={menuOpen ? copy.closeMenu : copy.menu} />
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
