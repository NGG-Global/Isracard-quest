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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="relative pt-9"
    >
      {/* Score tile overlapping the top of the card */}
      <div className="absolute top-0 right-8 z-10">
        <div
          className="ds-tile w-[72px] h-[72px] flex-col leading-tight"
          style={{ background: dim.fill, color: dim.onFill }}
          aria-label={`ציון ${result.score} מתוך 25`}
        >
          <span className="text-3xl font-bold">{result.score}</span>
          <span className="text-[11px] font-normal opacity-80">/25</span>
        </div>
      </div>

      <div className="ds-card pt-12 pb-6 px-6 sm:px-8">
        {/* Dimension name */}
        <div className="mb-4">
          <p className="text-xs text-neutral-shadow mb-1">ממד</p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight">{dim.name}</h3>
        </div>

        {/* Score bar */}
        <div className="mb-5">
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: 'var(--neutral-e8)' }}
            role="progressbar"
            aria-valuenow={result.score}
            aria-valuemin={5}
            aria-valuemax={25}
            aria-label={`ציון ${result.score} מתוך 25`}
          >
            <div
              ref={barRef}
              className="h-full rounded-full score-bar-animated"
              style={{ background: dim.fill, width: `${result.percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[11px] text-neutral-shadow">5</span>
            <span className="text-[11px] text-neutral-shadow">15</span>
            <span className="text-[11px] text-neutral-shadow">25</span>
          </div>
        </div>

        {/* Level badge */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-[10px] mb-4 text-sm font-bold"
          style={{ background: dim.fill, color: dim.onFill }}
        >
          {result.range.level}
        </div>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'var(--neutral-line)' }} />

        {/* Description */}
        <div className="space-y-2">
          {descParagraphs.map((para, i) => (
            <p key={i} className="text-sm sm:text-base leading-body">
              {para}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
