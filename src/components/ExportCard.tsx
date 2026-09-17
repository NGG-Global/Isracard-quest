import { forwardRef } from 'react'
import type { SurveyResults } from '../lib/scoring'
import { dimensions, intro, footerLine } from '../data/surveyContent'

interface Props {
  results: SurveyResults
}

/*
 * Rendered off-screen by html2canvas, which resolves neither CSS custom
 * properties nor nested flex reliably. The scale below mirrors the on-screen
 * one at the 800px export width, written out as literals.
 */
const C = {
  blue: '#2221ba',
  ink: '#000000',
  white: '#ffffff',
  line: '#bfbfbf',
  e8: '#e8e8e8',
  shadow: '#41464d',
}

const S = { s1: 4, s2: 8, s3: 12, s4: 16, s5: 24, s6: 32, s7: 40, s8: 56 }
const GUTTER = 48
const CARD_PAD = 32
const R_CARD = 37
const R_TILE = 10
const R_BADGE = 4
const TILE = 72
const TRACK = 8

const fills: Record<string, { fill: string; onFill: string }> = {
  human: { fill: '#763af8', onFill: C.white },
  ai: { fill: '#ffa229', onFill: C.ink },
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
        background: C.white,
        fontFamily: 'Assistant, "Segoe UI", Arial, sans-serif',
        color: C.ink,
        direction: 'rtl',
        position: 'fixed',
        top: 0,
        left: '-9999px',
        zIndex: -1,
      }}
    >
      {/* Blue band header */}
      <div style={{ background: C.blue, color: C.white, padding: `${S.s6}px ${GUTTER}px ${S.s7}px` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: `${S.s6}px` }}>
          <div style={{ display: 'flex', direction: 'ltr', alignItems: 'flex-end', gap: `${S.s2}px` }}>
            <img src={`${base}isracard-logo-white.png`} alt="Isracard" style={{ height: '24px', width: 'auto', display: 'block' }} />
            <img src={`${base}ngg-logo.png`} alt="NGG" style={{ height: '56px', width: 'auto', display: 'block' }} />
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>{results.completedAt}</div>
        </div>
        <div style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>פענוח התוצאות</div>
        <div style={{ fontSize: '16px', opacity: 0.9, marginTop: `${S.s3}px` }}>
          {intro.title} · {intro.subtitle}
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding: `${S.s6}px ${GUTTER}px 0` }}>
        {items.map(({ result, dim }, idx) => {
          const { fill, onFill } = fills[dim.id]
          const descParagraphs = result.range.description.split('\n').map((p) => p.trim()).filter(Boolean)

          return (
            <div
              key={dim.id}
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: `${R_CARD}px`,
                padding: `${CARD_PAD}px`,
                marginBottom: idx === items.length - 1 ? 0 : `${S.s5}px`,
              }}
            >
              {/* Name and score on one row: even padding all round */}
              <div style={{ position: 'relative', minHeight: `${TILE}px`, marginBottom: `${S.s5}px` }}>
                <div style={{ fontSize: '12px', color: C.shadow, lineHeight: '14px' }}>ממד</div>
                <div style={{ fontSize: '26px', fontWeight: 700, lineHeight: '30px', marginTop: `${S.s1}px` }}>
                  {dim.name}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${TILE}px`,
                    height: `${TILE}px`,
                    borderRadius: `${R_TILE}px`,
                    background: fill,
                    color: onFill,
                    direction: 'ltr',
                  }}
                >
                  <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, textAlign: 'center', fontSize: '30px', fontWeight: 700, lineHeight: '32px' }}>
                    {result.score}
                  </div>
                  <div style={{ position: 'absolute', top: '46px', left: 0, right: 0, textAlign: 'center', fontSize: '12px', opacity: 0.8, lineHeight: '14px' }}>
                    /25
                  </div>
                </div>
              </div>

              {/* Score bar */}
              <div style={{ marginBottom: `${S.s5}px` }}>
                <div style={{ height: `${TRACK}px`, background: C.e8, borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${result.percentage}%`, borderRadius: '999px', background: fill }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: `${S.s2}px` }}>
                  {['5', '15', '25'].map((n) => (
                    <span key={n} style={{ fontSize: '12px', color: C.shadow }}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Level badge */}
              <div style={{ marginBottom: `${S.s5}px` }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: `${R_BADGE}px`,
                    background: fill,
                    color: onFill,
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {result.range.level}
                </span>
              </div>

              <div style={{ height: '1px', background: C.line, marginBottom: `${S.s5}px` }} />

              {descParagraphs.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.45,
                    margin: i < descParagraphs.length - 1 ? `0 0 ${S.s2}px 0` : 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          )
        })}
      </div>

      {/* Footer lockup */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: `${S.s6}px ${GUTTER}px ${S.s6}px`,
        }}
      >
        <div style={{ fontSize: '12px', color: C.shadow }}>{footerLine}</div>
        <div style={{ display: 'flex', direction: 'ltr', alignItems: 'flex-end', gap: `${S.s2}px` }}>
          <img src={`${base}isracard-logo.png`} alt="Isracard" style={{ height: '18px', width: 'auto', display: 'block' }} />
          <img src={`${base}ngg-logo.png`} alt="NGG" style={{ height: '40px', width: 'auto', display: 'block' }} />
        </div>
      </div>
    </div>
  )
})

ExportCard.displayName = 'ExportCard'
export default ExportCard
