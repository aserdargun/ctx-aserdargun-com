import type { Locale } from '../research/schema'

export function parseLocale(value: string | undefined): Locale | null {
  return value === 'en' || value === 'tr' ? value : null
}

export function buildLocalizedPath(locale: Locale, pathname: string, search = '', hash = ''): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'en' || segments[0] === 'tr') segments[0] = locale
  else segments.unshift(locale)
  return `/${segments.join('/')}${search}${hash}`
}
