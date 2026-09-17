import type { SurveyResults } from '../lib/scoring'
import { dimensions, intro, footerLine } from '../data/surveyContent'

interface Props {
  results: SurveyResults
}

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
            alignItems: 'flex-end',
            marginBottom: '24px',
            borderBottom: '2px solid #2221ba',
            paddingBottom: '16px',
          }}
        >
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>{intro.title}</h1>
            <h2 style={{ fontSize: '16px', fontWeight: 400, color: '#2221ba' }}>{intro.subtitle}</h2>
            <p style={{ fontSize: '12px', color: '#41464d', marginTop: '8px' }}>תאריך מילוי: {results.completedAt}</p>
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
                marginBottom: '20px',
                padding: '16px 20px',
                borderRadius: '23px',
                background: '#fff',
                border: '1px solid #bfbfbf',
                breakInside: 'avoid',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#41464d', marginBottom: '2px' }}>ממד</p>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{dim.name}</h3>
                </div>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
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
                  <span style={{ fontSize: '22px', fontWeight: 700 }}>{result.score}</span>
                  <span style={{ fontSize: '9px' }}>/25</span>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-block',
                  background: fill,
                  color: onFill,
                  borderRadius: '8px',
                  padding: '3px 12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                {result.range.level}
              </div>

              <div style={{ borderTop: '1px solid #bfbfbf', paddingTop: '10px' }}>
                {descParagraphs.map((para, i) => (
                  <p key={i} style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '6px' }}>
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
