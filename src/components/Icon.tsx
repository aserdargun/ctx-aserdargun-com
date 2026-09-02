type IconName = 'arrow' | 'source' | 'layers' | 'search' | 'sort' | 'assemble' | 'quote' | 'cache' | 'memory' | 'check' | 'warning'

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const, 'aria-hidden': true }
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m15 8 4 4-4 4" /></>,
    source: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></>,
    sort: <><path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3" /></>,
    assemble: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9z" /><path d="M7 10v2h5m5-2v2h-5v2" /></>,
    quote: <><path d="M5 8h5v5H6v3H4v-5c0-2 1-3 1-3ZM14 8h5v5h-4v3h-2v-5c0-2 1-3 1-3Z" /></>,
    cache: <><path d="M4 7h16v12H4z" /><path d="M8 4h8M8 11h8M8 15h5" /></>,
    memory: <><rect x="5" y="5" width="14" height="14" /><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m14 0h4M1 15h4m14 0h4" /><rect x="9" y="9" width="6" height="6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    warning: <><path d="M12 3 2.5 20h19z" /><path d="M12 9v5m0 3h.01" /></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}
