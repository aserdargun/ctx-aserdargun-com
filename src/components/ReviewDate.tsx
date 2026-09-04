import type { Locale } from '../research/schema'
import { formatResearchDate } from '../i18n/date'

export function ReviewDate({ date, locale }: { date: string; locale: Locale }) {
  const value = formatResearchDate(date, locale)
  return <span className="review-date">{locale === 'en' ? `Reviewed ${value}` : `${value} tarihinde incelendi`}</span>
}
