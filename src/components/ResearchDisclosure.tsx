import type { ReactNode } from 'react'

export function ResearchDisclosure({ label, children, open = false }: { label: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="research-disclosure" open={open}>
      <summary>{label}<span aria-hidden="true">＋</span></summary>
      <div className="research-disclosure-body">{children}</div>
    </details>
  )
}
