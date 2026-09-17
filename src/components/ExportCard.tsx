import { forwardRef } from 'react'
import type { SurveyResults } from '../lib/scoring'
import { dimensions, intro, footerLine } from '../data/surveyContent'

interface Props {
  results: SurveyResults
}

/*
 * Raw hex values are used here on purpose: html2canvas rasterises the node and
 * resolves styles more reliably without CSS custom properties.
 */
const BLUE = '#2221ba'
const INK = '#000000'
const WHITE = '#ffffff'
const LINE = '#bfbfbf'
const E8 = '#e8e8e8'
const SHADOW = '#41464d'

const fills: Record<string, { fill: string; onFill: string }> = {
  human: { fill: '#763af8', onFill: WHITE },
  ai: { fill: '#ffa229', onFill: INK },
}

const ExportCard = forwardRef<HTMLDivElement, Props>(({ results }, ref) => {
  const base = import.meta.env.BASE_URL
  const items = [
    { result: results.human, dim: dimensions[0] },
    { result: results.ai, dim: dimensions[1] },
  ]

  return (
    <div
      ref={ref}
      style={{
        width: '800px',
        background: WHITE,
        fontFamily: 'Assistant, "Segoe UI", Arial, sans-serif',
        color: INK,
        direction: 'rtl',
        position: 'fixed',
        top: 0,
        left: '-9999px',
        zIndex: -1,
      }}
    >
      {/* Blue band header */}
      <div style={{ background: BLUE, color: WHITE, padding: '32px 48px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', direction: 'ltr', alignItems: 'flex-end', gap: '8px' }}>
            <img src={`${base}isracard-logo-white.png`} alt="Isracard" style={{ height: '24px', width: 'auto', display: 'block' }} />
            <img src={`${base}ngg-logo.png`} alt="NGG" style={{ height: '56px', width: 'auto', display: 'block' }} />
          </div>
          <div style={{ fontSize: '13px', opacity: 0.9, paddingTop: '4px' }}>{results.completedAt}</div>
        </div>
        <div style={{ fontSize: '34px', fontWeight: 700, lineHeight: 0.95, marginBottom: '8px' }}>פענוח התוצאות</div>
        <div style={{ fontSize: '16px', opacity: 0.9 }}>
          {intro.title} · {intro.subtitle}
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px 48px 24px' }}>
        {items.map(({ result, dim }) => {
          const { fill, onFill } = fills[dim.id]
          const descParagraphs = result.range.description.split('\n').map((p) => p.trim()).filter(Boolean)
          const barWidth = `${result.percentage}%`

          return (
            <div key={dim.id} style={{ position: 'relative', paddingTop: '34px' }}>
              {/* Score tile */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: '32px',
                  width: '68px',
                  height: '68px',
                  borderRadius: '23px',
                  background: fill,
                  color: onFill,
                  direction: 'ltr',
                }}
              >
                {/* Absolute positions: html2canvas mis-stacks flex/inline line boxes here */}
                <div style={{ position: 'absolute', top: '10px', left: 0, right: 0, textAlign: 'center', fontSize: '28px', fontWeight: 700, lineHeight: '30px' }}>{result.score}</div>
                <div style={{ position: 'absolute', top: '44px', left: 0, right: 0, textAlign: 'center', fontSize: '10px', opacity: 0.8, lineHeight: '12px' }}>/25</div>
              </div>

              <div
                style={{
                  background: WHITE,
                  border: `1px solid ${LINE}`,
                  borderRadius: '37px',
                  padding: '44px 32px 28px',
                }}
              >
                <div style={{ fontSize: '11px', color: SHADOW, marginBottom: '4px' }}>ממד</div>
                <div style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1, marginBottom: '16px' }}>{dim.name}</div>

                {/* Score bar */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ height: '10px', background: E8, borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: barWidth, borderRadius: '999px', background: fill }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    {['5', '15', '25'].map((n) => (
                      <span key={n} style={{ fontSize: '10px', color: SHADOW }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Level badge */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: '10px',
                    marginBottom: '14px',
                    background: fill,
                    color: onFill,
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {result.range.level}
                </div>

                <div style={{ height: '1px', background: LINE, marginBottom: '14px' }} />

                {descParagraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.5,
                      margin: i < descParagraphs.length - 1 ? '0 0 8px 0' : 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer lockup */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 48px 32px' }}>
        <div style={{ fontSize: '12px', color: SHADOW }}>{footerLine}</div>
        <div style={{ display: 'flex', direction: 'ltr', alignItems: 'flex-end', gap: '8px' }}>
          <img src={`${base}isracard-logo.png`} alt="Isracard" style={{ height: '18px', width: 'auto', display: 'block' }} />
          <img src={`${base}ngg-logo.png`} alt="NGG" style={{ height: '40px', width: 'auto', display: 'block' }} />
        </div>
      </div>
    </div>
  )
})

ExportCard.displayName = 'ExportCard'
export default ExportCard
