export function MenuButton({ open, onClick, label }: { open: boolean; onClick: () => void; label: string }) {
  return (
    <button className="menu-button" type="button" onClick={onClick} aria-expanded={open} aria-controls="primary-navigation">
      <span className="sr-only">{label}</span>
      <span className="menu-lines" aria-hidden="true"><i /><i /><i /></span>
    </button>
  )
}
