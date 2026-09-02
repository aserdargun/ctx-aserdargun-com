import type { Locale } from '../research/schema'

const labels = {
  en: { evidence: 'Evidence', synthesis: 'Synthesis', 'watch-signal': 'Watch signal' },
  tr: { evidence: 'Kanıt', synthesis: 'Sentez', 'watch-signal': 'Takip sinyali' },
} as const

export function EvidenceKind({ kind, locale }: { kind: keyof typeof labels.en; locale: Locale }) {
  return <span className={`evidence-kind evidence-kind-${kind}`}><i aria-hidden="true" />{labels[locale][kind]}</span>
}
