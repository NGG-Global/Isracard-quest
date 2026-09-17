import BrandLockup from './BrandLockup'
import { footerLine } from '../data/surveyContent'

/** Bottom row of every screen: the brand lockup in the bottom-left, the event line beside it. */
export default function PageFooter() {
  return (
    <footer className="no-print max-w-2xl mx-auto px-4 pt-6 pb-8 flex items-end justify-between gap-4">
      <p className="text-xs text-neutral-shadow">{footerLine}</p>
      <BrandLockup tone="dark" size="sm" />
    </footer>
  )
}
