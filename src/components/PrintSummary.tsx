import type { SurveyResults } from '../lib/scoring'
import { dimensions, intro, footerLine } from '../data/surveyContent'

interface Props {
  results: SurveyResults
}

/* Print mirrors the screen scale, scaled down one step for A4. */
const CARD_PAD = 20
const R_CARD = 28
const R_TILE = 8
const R_BADGE = 4
const TILE = 60
const GAP = 16

const fills: Record<string, { fill: string; onFill: string }> = {
  human: { fill: '#763af8', onFill: '#ffffff' },
  ai: { fill: '#ffa229', onFill: '#000000' },
}

export default function PrintSummary({ results }: Props) {
  const base = import.meta.env.BASE_URL
  const items = [
    { result: results.human, dim: dimensions[0] },
    { result: results.ai, dim: dimensions[1] },
  ]

  return (
    <div className="print-only hidden">
      <div style={{ fontFamily: 'Assistant, "Segoe UI", Arial, sans-serif', direction: 'rtl', padding: '20px', color: '#000' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            borderBottom: '2px solid #2221ba',
            paddingBottom: '16px',
          }}
        >
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>{intro.title}</h1>
            <h2 style={{ fontSize: '16px', fontWeight: 400, color: '#2221ba', margin: '6px 0 0 0' }}>{intro.subtitle}</h2>
            <p style={{ fontSize: '12px', color: '#41464d', margin: '8px 0 0 0' }}>תאריך מילוי: {results.completedAt}</p>
          </div>
          <div style={{ display: 'flex', direction: 'ltr', alignItems: 'flex-end', gap: '8px' }}>
            <img src={`${base}isracard-logo.png`} alt="Isracard" style={{ height: '20px', width: 'auto' }} />
            <img src={`${base}ngg-logo.png`} alt="NGG" style={{ height: '44px', width: 'auto' }} />
          </div>
        </div>

        {items.map(({ result, dim }) => {
          const { fill, onFill } = fills[dim.id]
          const descParagraphs = result.range.description.split('\n').map((p) => p.trim()).filter(Boolean)

          return (
            <div
              key={dim.id}
              style={{
                marginBottom: `${GAP}px`,
                padding: `${CARD_PAD}px`,
                borderRadius: `${R_CARD}px`,
                background: '#fff',
                border: '1px solid #bfbfbf',
                breakInside: 'avoid',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: `${GAP}px` }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#41464d', margin: 0 }}>ממד</p>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '4px 0 0 0' }}>{dim.name}</h3>
                </div>
                <div
                  style={{
                    width: `${TILE}px`,
                    height: `${TILE}px`,
                    borderRadius: `${R_TILE}px`,
                    background: fill,
                    color: onFill,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    direction: 'ltr',
                    lineHeight: 1,
                  }}
                >
                  <span style={{ fontSize: '24px', fontWeight: 700 }}>{result.score}</span>
                  <span style={{ fontSize: '10px', marginTop: '3px' }}>/25</span>
                </div>
              </div>

              <div style={{ marginBottom: `${GAP}px` }}>
                <div style={{ height: '8px', background: '#e8e8e8', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${result.percentage}%`, borderRadius: '999px', background: fill }} />
                </div>
              </div>

              <div style={{ marginBottom: `${GAP}px` }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: fill,
                    color: onFill,
                    borderRadius: `${R_BADGE}px`,
                    padding: '6px 12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {result.range.level}
                </span>
              </div>

              <div style={{ borderTop: '1px solid #bfbfbf', paddingTop: `${GAP}px` }}>
                {descParagraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{ fontSize: '12px', lineHeight: 1.5, margin: i < descParagraphs.length - 1 ? '0 0 8px 0' : 0 }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )
        })}

        <p style={{ fontSize: '10px', color: '#41464d', textAlign: 'center', marginTop: '16px' }}>{footerLine}</p>
      </div>
    </div>
  )
}
