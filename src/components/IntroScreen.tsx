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
    <div className="screen">
      {/* Brand band — one solid Isracard-blue plate */}
      <header className="band">
        <div className="wrap flex flex-col" style={{ gap: 'var(--s-6)' }}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center justify-between gap-4"
          >
            <BrandLockup tone="light" size="md" />
            <MarkStrip horizontal length={168} thickness={28} className="hidden sm:block" />
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{intro.title}</h1>
            <h2 className="text-xl sm:text-2xl font-normal leading-body opacity-90" style={{ marginTop: 'var(--s-3)' }}>
              {intro.subtitle}
            </h2>
          </motion.div>
        </div>
      </header>

      <main className="body-col">
        <div className="wrap stack">
          {/* Opening text */}
          <motion.section custom={2} variants={fadeUp} initial="hidden" animate="show" className="ds-card">
            <div className="flex flex-col" style={{ gap: 'var(--s-4)' }}>
              {openingParagraphs.map((para, i) => (
                <p key={i} className="text-base sm:text-lg leading-body">
                  {para}
                </p>
              ))}
            </div>
          </motion.section>

          {/* Dimension cards — the system's InfoCard: a colour tile directly above a card */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: 'var(--s-5)' }}
          >
            {dimensions.map((dim, i) => (
              <div key={dim.id} className="flex flex-col items-center" style={{ gap: 'var(--s-2)' }}>
                <span
                  className="ds-tile r-md text-2xl"
                  style={{ width: 56, height: 56, background: dim.fill, color: dim.onFill }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="ds-card-flat w-full flex-1 text-center flex flex-col" style={{ gap: 'var(--s-2)' }}>
                  <h3 className="text-lg font-bold">{dim.name}</h3>
                  <p className="text-sm leading-body">{dim.subtitle}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Disclaimer */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="ds-inset">
            <p className="text-sm leading-body">
              <span className="font-bold">חשוב לדעת — </span>
              {intro.disclaimer}
            </p>
          </motion.div>

          {/* Instructions */}
          <motion.section custom={5} variants={fadeUp} initial="hidden" animate="show" className="ds-card-flat">
            <div className="flex flex-col" style={{ gap: 'var(--s-3)' }}>
              <h4 className="text-base font-bold">הנחיות למענה</h4>
              <p className="text-sm leading-body">{intro.instructions}</p>
              <div className="flex flex-col" style={{ gap: 'var(--s-2)', marginTop: 'var(--s-1)' }}>
                {Object.entries(ratingLabels).map(([num, label]) => (
                  <div key={num} className="flex items-center" style={{ gap: 'var(--s-3)' }}>
                    <span
                      className="ds-tile r-xs text-sm"
                      style={{ width: 32, height: 32, background: 'var(--isracard-blue)', color: 'var(--on-blue)' }}
                    >
                      {num}
                    </span>
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
            style={{ gap: 'var(--s-3)' }}
          >
            <button
              onClick={onStart}
              className="btn btn-primary w-full sm:w-auto"
              style={{ paddingInline: 'var(--s-8)' }}
              aria-label="התחלת מילוי השאלון"
            >
              מתחילים
            </button>
            <p className="text-sm text-neutral-shadow">10 שאלות · כ־3 דקות</p>
          </motion.div>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
