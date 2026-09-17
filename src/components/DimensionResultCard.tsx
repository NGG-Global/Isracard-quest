import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { DimensionScore } from '../lib/scoring'
import { dimensions } from '../data/surveyContent'

interface Props {
  result: DimensionScore
  index: number
}

export default function DimensionResultCard({ result, index }: Props) {
  const dim = dimensions.find((d) => d.id === result.dimension) ?? dimensions[0]
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.setProperty('--score-width', `${result.percentage}%`)
    }
  }, [result.percentage])

  const descParagraphs = result.range.description
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="ds-card flex flex-col"
      style={{ gap: 'var(--s-5)' }}
    >
      {/* Dimension name and score share one row, so the card keeps even padding all round */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col" style={{ gap: 'var(--s-1)' }}>
          <p className="text-xs text-neutral-shadow">ממד</p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight">{dim.name}</h3>
        </div>
        <span
          className="ds-tile r-lg flex-col leading-tight"
          style={{ width: 72, height: 72, background: dim.fill, color: dim.onFill }}
          aria-label={`ציון ${result.score} מתוך 25`}
        >
          <span className="text-3xl font-bold">{result.score}</span>
          <span className="text-xs font-normal opacity-80">/25</span>
        </span>
      </div>

      {/* Score bar */}
      <div className="flex flex-col" style={{ gap: 'var(--s-2)' }}>
        <div
          className="track"
          role="progressbar"
          aria-valuenow={result.score}
          aria-valuemin={5}
          aria-valuemax={25}
          aria-label={`ציון ${result.score} מתוך 25`}
        >
          <div
            ref={barRef}
            className="track-fill score-bar-animated"
            style={{ background: dim.fill, width: `${result.percentage}%` }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-neutral-shadow">5</span>
          <span className="text-xs text-neutral-shadow">15</span>
          <span className="text-xs text-neutral-shadow">25</span>
        </div>
      </div>

      {/* Level badge */}
      <div>
        <span className="ds-badge text-sm" style={{ background: dim.fill, color: dim.onFill }}>
          {result.range.level}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: 'var(--neutral-line)' }} />

      {/* Description */}
      <div className="flex flex-col" style={{ gap: 'var(--s-2)' }}>
        {descParagraphs.map((para, i) => (
          <p key={i} className="text-sm sm:text-base leading-body">
            {para}
          </p>
        ))}
      </div>
    </motion.section>
  )
}
