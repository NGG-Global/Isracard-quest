import { AnimatePresence, motion } from 'framer-motion'
import { questions, dimensions } from '../data/surveyContent'
import RatingScale from './RatingScale'
import ProgressHeader from './ProgressHeader'
import PageFooter from './PageFooter'

interface Props {
  currentIndex: number
  direction: number
  answers: Record<number, number>
  onAnswer: (questionId: number, value: number) => void
  onNext: () => void
  onBack: () => void
}

const cardVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
}

export default function QuestionCard({ currentIndex, direction, answers, onAnswer, onNext, onBack }: Props) {
  const question = questions[currentIndex]
  const dim = dimensions.find((d) => d.id === question.dimension) ?? dimensions[0]
  const currentAnswer = answers[question.id]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === questions.length - 1
  const isHuman = question.dimension === 'human'
  const questionNumberInDim = isHuman ? question.id : question.id - 5

  return (
    <div className="screen">
      <ProgressHeader currentIndex={currentIndex} />

      <main className="flex-1 flex flex-col">
        <div className="wrap stack" style={{ marginBlock: 'auto', paddingBlock: 'var(--s-5)' }}>
          {/* Dimension badge */}
          <div className="flex items-center no-print" style={{ gap: 'var(--s-3)' }}>
            <span
              className="ds-badge text-xs transition-colors duration-500"
              style={{ background: dim.fill, color: dim.onFill }}
            >
              {dim.name}
            </span>
            <span className="text-xs text-neutral-shadow">שאלה {questionNumberInDim} מתוך 5</span>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.section
              key={question.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="ds-card flex flex-col"
              style={{ gap: 'var(--s-5)' }}
            >
              <div className="flex items-center" style={{ gap: 'var(--s-4)' }}>
                <span
                  className="ds-tile r-sm text-lg"
                  style={{ width: 44, height: 44, background: dim.fill, color: dim.onFill }}
                  aria-hidden="true"
                >
                  {question.id}
                </span>
                <p className="text-lg sm:text-xl font-bold leading-body">{question.text}</p>
              </div>
              <RatingScale
                value={currentAnswer}
                onChange={(val) => onAnswer(question.id, val)}
                questionId={question.id}
                dim={dim}
              />
            </motion.section>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex no-print" style={{ gap: 'var(--s-3)' }}>
            {!isFirst && (
              <button onClick={onBack} className="btn btn-secondary">
                חזרה
              </button>
            )}
            <button onClick={onNext} disabled={currentAnswer === undefined} className="btn btn-primary flex-1">
              {isLast ? 'לתוצאות' : 'הבא'}
            </button>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
