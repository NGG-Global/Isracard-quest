import { dimensions, type Dimension, type ScoreRange } from '../data/surveyContent'

export interface DimensionScore {
  dimension: Dimension
  score: number
  range: ScoreRange
  percentage: number
}

export interface SurveyResults {
  human: DimensionScore
  ai: DimensionScore
  completedAt: string
}

export function getScoreRange(score: number, dimension: Dimension): ScoreRange {
  const dim = dimensions.find((d) => d.id === dimension) ?? dimensions[0]
  return dim.scoreRanges.find((r) => score >= r.min && score <= r.max) ?? dim.scoreRanges[dim.scoreRanges.length - 1]
}

export function scoreToPercentage(score: number): number {
  return Math.round(((score - 5) / 20) * 100)
}

export function calculateResults(answers: Record<number, number>): SurveyResults {
  const humanScore = [1, 2, 3, 4, 5].reduce((sum, id) => sum + (answers[id] ?? 0), 0)
  const aiScore = [6, 7, 8, 9, 10].reduce((sum, id) => sum + (answers[id] ?? 0), 0)

  return {
    human: {
      dimension: 'human',
      score: humanScore,
      range: getScoreRange(humanScore, 'human'),
      percentage: scoreToPercentage(humanScore),
    },
    ai: {
      dimension: 'ai',
      score: aiScore,
      range: getScoreRange(aiScore, 'ai'),
      percentage: scoreToPercentage(aiScore),
    },
    completedAt: new Date().toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}

export function isComplete(answers: Record<number, number>): boolean {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every((id) => answers[id] !== undefined)
}
