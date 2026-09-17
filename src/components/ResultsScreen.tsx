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
    <div className="min-h-dvh flex flex-col">
      {/* Header band */}
      <header className="ds-band no-print">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <BrandLockup tone="light" size="md" />
              <p className="text-sm opacity-90 pt-1">{results.completedAt}</p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2">פענוח התוצאות</h1>
            <p className="text-base opacity-90">
              {intro.title} · {intro.subtitle}
            </p>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 -mt-4">
        {/* Result cards */}
        <div className="space-y-6 mb-8" aria-live="polite" aria-label="תוצאות השאלון">
          <DimensionResultCard result={results.human} index={0} />
          <DimensionResultCard result={results.ai} index={1} />
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 no-print"
        >
          <button
            onClick={handleDownloadJpg}
            disabled={downloading}
            className="btn-primary flex-1"
            aria-label="הורדת תוצאות כתמונה JPG"
          >
            {downloading ? 'מייצר תמונה...' : 'הורדה כ־JPG'}
          </button>
          <button onClick={handlePrint} className="btn-secondary" aria-label="שמירה כ-PDF או הדפסה">
            PDF / הדפסה
          </button>
          <button onClick={onReset} className="btn-secondary" aria-label="מילוי מחדש של השאלון">
            מילוי מחדש
          </button>
        </motion.div>
      </main>

      <PageFooter />

      {/* Print-only version */}
      <PrintSummary results={results} />

      {/* Off-screen export card for html2canvas */}
      <ExportCard ref={exportRef} results={results} />
    </div>
  )
}
