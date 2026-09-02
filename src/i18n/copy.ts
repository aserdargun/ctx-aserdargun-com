import type { Locale } from '../research/schema'

export type UiCopy = {
  skip: string
  primaryNavigation: string
  menu: string
  closeMenu: string
  nav: { atlas: string; pipeline: string; patterns: string; evidence: string; about: string }
  headline: string
  supporting: string
  explore: string
  compare: string
  reviewed: string
  primaryOnly: string
  methodComparison: string
  qualityGates: string
  previousStage: string
  nextStage: string
  source: string
  strengths: string
  limitations: string
  bestFor: string
  failureRisk: string
  evidencePolicy: string
  notFound: string
  backToPipeline: string
}

export const uiCopy: Record<Locale, UiCopy> = {
  en: {
    skip: 'Skip to content',
    primaryNavigation: 'Primary',
    menu: 'Open menu',
    closeMenu: 'Close menu',
    nav: { atlas: 'Atlas', pipeline: 'Pipeline', patterns: 'Patterns', evidence: 'Evidence', about: 'About' },
    headline: 'Build the context, not just the prompt.',
    supporting: 'Trace how sources become grounded, efficient model context.',
    explore: 'Explore the pipeline',
    compare: 'Compare methods',
    reviewed: 'Reviewed 02 Sep 2026',
    primaryOnly: 'Primary sources only',
    methodComparison: 'Method comparison',
    qualityGates: 'Quality gates',
    previousStage: 'Previous stage',
    nextStage: 'Next stage',
    source: 'Source',
    strengths: 'Strengths',
    limitations: 'Limitations',
    bestFor: 'Best for',
    failureRisk: 'Failure risk',
    evidencePolicy: 'Evidence, synthesis, and watch signals remain distinct.',
    notFound: 'This route was not found.',
    backToPipeline: 'Back to pipeline',
  },
  tr: {
    skip: 'İçeriğe geç',
    primaryNavigation: 'Ana',
    menu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    nav: { atlas: 'Atlas', pipeline: 'Pipeline', patterns: 'Pattern’ler', evidence: 'Kanıt', about: 'Hakkında' },
    headline: 'Yalnız prompt’u değil, bağlamı kur.',
    supporting: 'Kaynakların grounded ve verimli model bağlamına dönüşümünü izle.',
    explore: 'Pipeline’ı keşfet',
    compare: 'Yöntemleri karşılaştır',
    reviewed: '02 Eyl 2026 tarihinde incelendi',
    primaryOnly: 'Yalnız birincil kaynaklar',
    methodComparison: 'Yöntem karşılaştırması',
    qualityGates: 'Kalite kapıları',
    previousStage: 'Önceki aşama',
    nextStage: 'Sonraki aşama',
    source: 'Kaynak',
    strengths: 'Güçlü yönler',
    limitations: 'Sınırlamalar',
    bestFor: 'En uygun',
    failureRisk: 'Hata riski',
    evidencePolicy: 'Kanıt, sentez ve takip sinyalleri ayrı tutulur.',
    notFound: 'Bu yol bulunamadı.',
    backToPipeline: 'Pipeline’a dön',
  },
}
