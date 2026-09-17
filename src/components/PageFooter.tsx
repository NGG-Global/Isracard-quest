import BrandLockup from './BrandLockup'
import { footerLine } from '../data/surveyContent'

/** Bottom row of every screen. Same column and gutter as the band and the body. */
export default function PageFooter() {
  return (
    <footer className="no-print wrap flex items-end justify-between gap-4" style={{ paddingBlock: 'var(--s-6)' }}>
      <p className="text-xs text-neutral-shadow">{footerLine}</p>
      <BrandLockup tone="dark" size="sm" />
    </footer>
  )
}
