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
    <div className="min-h-dvh flex flex-col">
      <ProgressHeader currentIndex={currentIndex} />

      {/* Dimension badge */}
      <div className="px-4 pt-3 pb-1 no-print">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-[10px] transition-colors duration-500"
              style={{ background: dim.fill, color: dim.onFill }}
            >
              {dim.name}
            </span>
            <span className="text-xs text-neutral-shadow">
              שאלה {questionNumberInDim} מתוך 5
            </span>
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className="flex-1 flex items-start px-4 py-3">
        <div className="w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="ds-card p-6 sm:p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <span
                  className="ds-tile w-11 h-11 text-lg rounded-[14px]"
                  style={{ background: dim.fill, color: dim.onFill }}
                  aria-hidden="true"
                >
                  {question.id}
                </span>
                <p className="text-lg sm:text-xl font-bold leading-body pt-2">{question.text}</p>
              </div>
              <RatingScale
                value={currentAnswer}
                onChange={(val) => onAnswer(question.id, val)}
                questionId={question.id}
                dim={dim}
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-5 no-print">
            {!isFirst && (
              <button onClick={onBack} className="btn-secondary">
                חזרה
              </button>
            )}
            <button onClick={onNext} disabled={currentAnswer === undefined} className="btn-primary flex-1">
              {isLast ? 'לתוצאות' : 'הבא'}
            </button>
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  )
}
