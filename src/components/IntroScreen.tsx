import { motion } from 'framer-motion'
import { intro, dimensions, ratingLabels } from '../data/surveyContent'
import BrandLockup from './BrandLockup'
import MarkStrip from './MarkStrip'
import PageFooter from './PageFooter'

interface Props {
  onStart: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function IntroScreen({ onStart }: Props) {
  const openingParagraphs = intro.opening.split('\n\n').map((p) => p.trim()).filter(Boolean)

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Brand band — one solid Isracard-blue plate */}
      <header className="ds-band">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-10 sm:pt-8 sm:pb-12">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-start justify-between gap-4 mb-8"
          >
            <BrandLockup tone="light" size="md" />
            <MarkStrip horizontal length={180} thickness={36} className="hidden sm:block mt-2" />
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3">{intro.title}</h1>
            <h2 className="text-xl sm:text-2xl font-normal leading-body opacity-90">{intro.subtitle}</h2>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 -mt-5">
        {/* Opening text */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="ds-card p-6 sm:p-8 mb-6"
        >
          {openingParagraphs.map((para, i) => (
            <p
              key={i}
              className={`text-base sm:text-lg leading-body ${i < openingParagraphs.length - 1 ? 'mb-4' : 'mb-0'}`}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* Dimension cards — colour tile above a white card */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6"
        >
          {dimensions.map((dim, i) => (
            <div key={dim.id} className="flex flex-col">
              <div className="flex justify-center mb-[-28px] relative z-10">
                <span
                  className="ds-tile w-14 h-14 text-2xl rounded-[16px]"
                  style={{ background: dim.fill, color: dim.onFill }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>
              <div className="ds-card-flat pt-10 pb-6 px-5 flex-1 text-center">
                <h3 className="text-lg font-bold mb-2">{dim.name}</h3>
                <p className="text-sm leading-body">{dim.subtitle}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="mb-6">
          <div className="rounded-tile px-5 py-4" style={{ background: 'var(--neutral-e8)' }}>
            <p className="text-sm leading-body">
              <span className="font-bold">חשוב לדעת — </span>
              {intro.disclaimer}
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="ds-card-flat p-6 mb-8"
        >
          <h4 className="text-base font-bold mb-2">הנחיות למענה</h4>
          <p className="text-sm leading-body mb-4">{intro.instructions}</p>
          <div className="space-y-2">
            {Object.entries(ratingLabels).map(([num, label]) => (
              <div key={num} className="flex items-center gap-3">
                <span
                  className="ds-tile w-8 h-8 text-sm rounded-[10px]"
                  style={{ background: 'var(--isracard-blue)', color: 'var(--on-blue)' }}
                >
                  {num}
                </span>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="text-center">
          <button
            onClick={onStart}
            className="btn-primary w-full sm:w-auto sm:px-20"
            aria-label="התחלת מילוי השאלון"
          >
            מתחילים
          </button>
          <p className="text-sm mt-3 text-neutral-shadow">10 שאלות · כ־3 דקות</p>
        </motion.div>
      </main>

      <PageFooter />
    </div>
  )
}
