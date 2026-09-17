/**
 * Isracard wordmark with the NGG mark beside it — the footer lockup the
 * Isracard/NGG template carries on every layout. The pair runs left-to-right
 * regardless of page direction. Use tone="light" on a blue plate.
 */
interface Props {
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { isracard: 18, ngg: 40 },
  md: { isracard: 24, ngg: 56 },
  lg: { isracard: 32, ngg: 72 },
}

export default function BrandLockup({ tone = 'dark', size = 'md', className = '' }: Props) {
  const base = import.meta.env.BASE_URL
  const logo = tone === 'light' ? 'isracard-logo-white.png' : 'isracard-logo.png'
  const s = sizes[size]
  return (
    <div
      className={`flex items-end gap-2 ${className}`}
      style={{ direction: 'ltr' }}
      aria-label="Isracard and NGG"
    >
      <img src={`${base}${logo}`} alt="Isracard" style={{ height: s.isracard, width: 'auto', display: 'block' }} />
      <img src={`${base}ngg-logo.png`} alt="NGG" style={{ height: s.ngg, width: 'auto', display: 'block' }} />
    </div>
  )
}
