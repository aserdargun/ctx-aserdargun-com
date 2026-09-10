import type { Locale } from '../research/schema'

export function EmptyResults({ locale, onReset }: { locale: Locale; onReset: () => void }) {
  return (
    <div className="empty-results">
      <h2>{locale === 'en' ? 'No matching records' : 'Eşleşen kayıt yok'}</h2>
      <p>{locale === 'en' ? 'Try a broader search or clear the filters to explore all records.' : 'Daha geniş bir arama yap veya tüm kayıtları görmek için filtreleri temizle.'}</p>
      <button type="button" className="filter-button" onClick={onReset}>{locale === 'en' ? 'Clear filters' : 'Filtreleri temizle'}</button>
    </div>
  )
}
