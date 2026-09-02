import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function FilterBar({ label, children }: { label: string; children: ReactNode }) {
  return <div className="filter-bar" role="group" aria-label={label}>{children}</div>
}

export function FilterButton({ active, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return <button type="button" className={active ? 'filter-button is-active' : 'filter-button'} aria-pressed={active} {...props}>{children}</button>
}
