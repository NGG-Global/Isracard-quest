import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { SurveyResults } from '../lib/scoring'
import { intro } from '../data/surveyContent'
import DimensionResultCard from './DimensionResultCard'
import PrintSummary from './PrintSummary'
import ExportCard from './ExportCard'
import BrandLockup from './BrandLockup'
import PageFooter from './PageFooter'

interface Props {
  results: SurveyResults
  onReset: () => void
}

export default function ResultsScreen({ results, onReset }: Props) {
  const exportRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadJpg = async () => {
    if (!exportRef.current || downloading) return
    setDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = 'תוצאות-שאלון-AI.jpg'
      link.href = canvas.toDataURL('image/jpeg', 0.93)
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="screen">
      {/* Header band — same metrics as the intro band */}
      <header className="band no-print">
        <div className="wrap flex flex-col" style={{ gap: 'var(--s-6)' }}>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between gap-4"
          >
            <BrandLockup tone="light" size="md" />
            <p className="text-sm opacity-90">{results.completedAt}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">פענוח התוצאות</h1>
            <p className="text-base opacity-90" style={{ marginTop: 'var(--s-3)' }}>
              {intro.title} · {intro.subtitle}
            </p>
          </motion.div>
        </div>
      </header>

      <main className="body-col">
        <div className="wrap stack">
          <div className="stack" aria-live="polite" aria-label="תוצאות השאלון">
            <DimensionResultCard result={results.human} index={0} />
            <DimensionResultCard result={results.ai} index={1} />
          </div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row no-print"
            style={{ gap: 'var(--s-3)' }}
          >
            <button
              onClick={handleDownloadJpg}
              disabled={downloading}
              className="btn btn-primary sm:flex-1"
              aria-label="הורדת תוצאות כתמונה JPG"
            >
              {downloading ? 'מייצר תמונה...' : 'הורדה כ־JPG'}
            </button>
            <button onClick={handlePrint} className="btn btn-secondary" aria-label="שמירה כ-PDF או הדפסה">
              PDF / הדפסה
            </button>
            <button onClick={onReset} className="btn btn-secondary" aria-label="מילוי מחדש של השאלון">
              מילוי מחדש
            </button>
          </motion.div>
        </div>
      </main>

      <PageFooter />

      {/* Print-only version */}
      <PrintSummary results={results} />

      {/* Off-screen export card for html2canvas */}
      <ExportCard ref={exportRef} results={results} />
    </div>
  )
}
