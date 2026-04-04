import { FONT, FS, RADIUS } from '../theme'
import type { CategoryConfig } from '../types'

interface BadgeStyle {
  bg: string
  border: string
  color: string
  label: string
}

const BADGE: Record<string, BadgeStyle> = {
  W:     { bg: 'rgba(240,180,50,.14)',  border: 'rgba(240,180,50,.4)',  color: '#f0b432', label: 'W'   },
  H:     { bg: 'rgba(220,70,70,.14)',   border: 'rgba(220,70,70,.4)',   color: '#e05555', label: 'H'   },
  'W+':  { bg: 'rgba(160,80,240,.14)',  border: 'rgba(160,80,240,.4)',  color: '#b060e8', label: 'W+'  },
  'W+H': { bg: 'rgba(240,140,40,.14)', border: 'rgba(240,140,40,.4)',  color: '#e09030', label: 'W+H' },
}

interface FormulaStepsProps {
  formula: string
  pal?: CategoryConfig
}

export default function FormulaSteps({ formula, pal }: FormulaStepsProps) {
  if (!formula) return null
  const tokens = formula.split(/\s*[–-]\s*/)
  const isStep = tokens.some(t => ['W', 'H', 'W+', 'W+H'].includes(t.trim()))

  if (!isStep) {
    const accent = pal?.a || '#f0c93a'
    return (
      <div style={{
        fontFamily: FONT.mono,
        fontSize: FS.monoLg,
        color: accent,
        opacity: 0.85,
        letterSpacing: '0.06em',
        background: 'rgba(255,255,255,.04)',
        border: '1px solid rgba(255,255,255,.09)',
        borderRadius: RADIUS.lg,
        padding: '11px 15px',
      }}>{formula}</div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 5 }}>
        {tokens.map((t, i) => {
          const key = t.trim()
          const b = BADGE[key]
          return (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {i > 0 && (
                <span style={{ color: 'rgba(255,255,255,.18)', fontSize: FS.base }}>—</span>
              )}
              {b ? (
                <span style={{
                  fontFamily: FONT.mono,
                  fontSize: FS.mono,
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: RADIUS.md,
                  background: b.bg,
                  border: `1px solid ${b.border}`,
                  color: b.color,
                  letterSpacing: '0.04em',
                }}>{b.label}</span>
              ) : (
                <span style={{
                  fontFamily: FONT.mono,
                  fontSize: FS.mono,
                  color: 'rgba(255,255,255,.5)',
                }}>{key}</span>
              )}
            </span>
          )
        })}
      </div>
      <div style={{
        marginTop: 7,
        fontFamily: FONT.mono,
        fontSize: FS.xxs,
        color: 'rgba(255,255,255,.3)',
        letterSpacing: '0.04em',
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <span style={{ color: BADGE.W.color, opacity: .6 }}>W = whole step</span>
        <span style={{ color: BADGE.H.color, opacity: .6 }}>H = half step</span>
        <span style={{ color: BADGE['W+'].color, opacity: .6 }}>W+ = aug 2nd</span>
        <span style={{ color: BADGE['W+H'].color, opacity: .6 }}>W+H = 1½ steps</span>
      </div>
    </div>
  )
}
