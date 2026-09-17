import { motion } from 'framer-motion'
import { ratingLabels, type DimensionContent } from '../data/surveyContent'

interface Props {
  value: number | undefined
  onChange: (value: number) => void
  questionId: number
  dim: DimensionContent
}

const RATINGS = [1, 2, 3, 4, 5]

export default function RatingScale({ value, onChange, questionId, dim }: Props) {
  const tileStyle = (selected: boolean) =>
    selected
      ? { background: dim.fill, color: dim.onFill }
      : { background: 'var(--neutral-e8)', color: 'var(--isracard-ink)' }

  /* Same border, padding and radius rule in both layouts; only the axis changes. */
  const buttonStyle = (selected: boolean) => ({
    background: 'var(--surface-card)',
    border: selected ? `2px solid ${dim.fill}` : 'var(--border-card)',
    borderRadius: 'var(--r-md)',
    padding: 'var(--s-3)',
    fontWeight: selected ? 700 : 400,
  })

  return (
    <div className="w-full" role="group" aria-label="סולם דירוג 1 עד 5">
      {/* Mobile: one row per rating */}
      <div className="flex flex-col sm:hidden" style={{ gap: 'var(--s-2)' }}>
        {RATINGS.map((rating) => {
          const selected = value === rating
          return (
            <motion.button
              key={rating}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(rating)}
              className="rating-btn w-full flex items-center text-sm text-right transition-opacity duration-200"
              style={{ ...buttonStyle(selected), gap: 'var(--s-3)' }}
              aria-pressed={selected}
              aria-label={`${rating} — ${ratingLabels[rating]}`}
            >
              <span className="ds-tile r-sm text-base" style={{ width: 40, height: 40, ...tileStyle(selected) }}>
                {rating}
              </span>
              <span>{ratingLabels[rating]}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Desktop: five equal columns */}
      <div className="hidden sm:block">
        <div className="flex" style={{ gap: 'var(--s-3)' }}>
          {RATINGS.map((rating) => {
            const selected = value === rating
            return (
              <motion.button
                key={rating}
                whileTap={{ scale: 0.96 }}
                onClick={() => onChange(rating)}
                className="rating-btn flex flex-col items-center justify-start text-xs transition-opacity duration-200 hover:opacity-80"
                style={{ ...buttonStyle(selected), flex: '1 1 0', gap: 'var(--s-2)' }}
                aria-pressed={selected}
                aria-label={`${rating} — ${ratingLabels[rating]}`}
              >
                <span className="ds-tile r-sm text-xl" style={{ width: 48, height: 48, ...tileStyle(selected) }}>
                  {rating}
                </span>
                <span className="text-center leading-body">{ratingLabels[rating]}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {value ? `נבחר: ${value} — ${ratingLabels[value]} לשאלה ${questionId}` : ''}
      </div>
    </div>
  )
}
