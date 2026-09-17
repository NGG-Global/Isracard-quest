import { motion } from 'framer-motion'
import { ratingLabels, type DimensionContent } from '../data/surveyContent'

interface Props {
  value: number | undefined
  onChange: (value: number) => void
  questionId: number
  dim: DimensionContent
}

export default function RatingScale({ value, onChange, questionId, dim }: Props) {
  const tileStyle = (selected: boolean) =>
    selected
      ? { background: dim.fill, color: dim.onFill }
      : { background: 'var(--neutral-e8)', color: 'var(--isracard-ink)' }

  return (
    <div className="w-full" role="group" aria-label="סולם דירוג 1 עד 5">
      {/* Mobile: vertical stacked */}
      <div className="flex flex-col gap-2 sm:hidden">
        {[1, 2, 3, 4, 5].map((rating) => {
          const selected = value === rating
          return (
            <motion.button
              key={rating}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(rating)}
              className="rating-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-tile text-sm text-right transition-opacity duration-200"
              style={{
                background: 'var(--surface-card)',
                border: selected ? `2px solid ${dim.fill}` : 'var(--border-card)',
                fontWeight: selected ? 700 : 400,
              }}
              aria-pressed={selected}
              aria-label={`${rating} — ${ratingLabels[rating]}`}
            >
              <span className="ds-tile w-9 h-9 text-base rounded-[12px]" style={tileStyle(selected)}>
                {rating}
              </span>
              <span>{ratingLabels[rating]}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Desktop: horizontal row of colour tiles */}
      <div className="hidden sm:block">
        <div className="flex gap-3 justify-between">
          {[1, 2, 3, 4, 5].map((rating) => {
            const selected = value === rating
            return (
              <motion.button
                key={rating}
                whileTap={{ scale: 0.96 }}
                onClick={() => onChange(rating)}
                className="rating-btn flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-tile text-xs transition-opacity duration-200 hover:opacity-80"
                style={{
                  background: 'var(--surface-card)',
                  border: selected ? `2px solid ${dim.fill}` : 'var(--border-card)',
                  fontWeight: selected ? 700 : 400,
                }}
                aria-pressed={selected}
                aria-label={`${rating} — ${ratingLabels[rating]}`}
              >
                <span className="ds-tile w-12 h-12 text-xl rounded-[14px]" style={tileStyle(selected)}>
                  {rating}
                </span>
                <span className="text-center leading-body text-[12px]">{ratingLabels[rating]}</span>
              </motion.button>
            )
          })}
        </div>
        <div className="flex justify-between mt-2 px-1">
          <span className="text-[11px] text-neutral-shadow">כלל לא</span>
          <span className="text-[11px] text-neutral-shadow">במידה רבה מאוד</span>
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {value ? `נבחר: ${value} — ${ratingLabels[value]} לשאלה ${questionId}` : ''}
      </div>
    </div>
  )
}
