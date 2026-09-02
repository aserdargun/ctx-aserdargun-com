import type { Locale } from '../research/schema'

export function ReviewDate({ date, locale }: { date: string; locale: Locale }) {
  const value = new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
  return <span className="review-date">{locale === 'en' ? 'Reviewed' : 'İncelendi'} {value}</span>
}
