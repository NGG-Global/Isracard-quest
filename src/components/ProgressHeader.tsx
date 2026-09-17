import { motion } from 'framer-motion'
import { questions, intro } from '../data/surveyContent'
import BrandLockup from './BrandLockup'

interface Props {
  currentIndex: number
}

export default function ProgressHeader({ currentIndex }: Props) {
  const total = questions.length
  const progressPct = ((currentIndex + 1) / total) * 100

  return (
    <div className="wrap no-print flex flex-col" style={{ paddingTop: 'var(--s-6)', gap: 'var(--s-3)' }}>
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col" style={{ gap: 'var(--s-1)' }}>
          <p className="text-sm font-bold leading-tight">{intro.title}</p>
          <p className="text-xs text-neutral-shadow">{intro.subtitle}</p>
        </div>
        <BrandLockup tone="dark" size="sm" />
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--s-2)' }}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-shadow">התקדמות</span>
          <span className="text-sm font-bold ltr-num">
            {currentIndex + 1}
            <span className="text-neutral-line mx-1">/</span>
            {total}
          </span>
        </div>
        <div
          className="track"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          <motion.div
            className="track-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  )
}
