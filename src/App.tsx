import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import QuestionCard from './components/QuestionCard'
import ResultsScreen from './components/ResultsScreen'
import { calculateResults, isComplete, type SurveyResults } from './lib/scoring'
import { STORAGE_KEY } from './data/surveyContent'

type Screen = 'intro' | 'survey' | 'results'

interface SavedState {
  screen: string
  currentIndex: number
  answers: Record<number, number>
}

function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SavedState
  } catch {
    return null
  }
}

function saveState(state: { screen: Screen; currentIndex: number; answers: Record<number, number> }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<SurveyResults | null>(null)
  const [direction, setDirection] = useState(1)
  const isRestoringRef = useRef(false)

  useEffect(() => {
    const saved = loadState()
    if (!saved) return
    isRestoringRef.current = true
    // Gracefully handle any legacy screen values (e.g. 'dimension-transition')
    const restoredScreen: Screen =
      saved.screen === 'survey' ? 'survey'
      : saved.screen === 'results' ? 'results'
      : 'intro'
    setScreen(restoredScreen)
    setCurrentIndex(saved.currentIndex)
    setAnswers(saved.answers)
    if (restoredScreen === 'results' && isComplete(saved.answers)) {
      setResults(calculateResults(saved.answers))
    }
  }, [])

  useEffect(() => {
    if (screen === 'intro' && Object.keys(answers).length === 0) return
    saveState({ screen, currentIndex, answers })
  }, [screen, currentIndex, answers])

  const handleStart = () => {
    setDirection(1)
    setScreen('survey')
    setCurrentIndex(0)
  }

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    setDirection(1)
    if (currentIndex < 9) {
      setCurrentIndex((i) => i + 1)
    } else {
      const computed = calculateResults(answers)
      setResults(computed)
      setScreen('results')
    }
  }

  const handleBack = () => {
    setDirection(-1)
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
    }
  }

  const handleReset = () => {
    clearState()
    setDirection(1)
    setScreen('intro')
    setCurrentIndex(0)
    setAnswers({})
    setResults(null)
  }

  if (screen === 'survey') {
    return (
      <motion.div key="survey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <QuestionCard
          currentIndex={currentIndex}
          direction={direction}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
        />
      </motion.div>
    )
  }

  if (screen === 'results' && results) {
    return (
      <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <ResultsScreen results={results} onReset={handleReset} />
      </motion.div>
    )
  }

  return (
    <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <IntroScreen onStart={handleStart} />
    </motion.div>
  )
}
