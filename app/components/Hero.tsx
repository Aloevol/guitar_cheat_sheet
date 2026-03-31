'use client'
import { PAL, CATEGORIES, DATA } from '../data/guitarData'
import type { CategorySlug } from '../types'

interface HeroProps {
  cat: string
  onCatClick: (c: string) => void
}

export default function Hero({ cat, onCatClick }: HeroProps) {
  const bycat: Record<string, number> = {}
  CATEGORIES.filter(c => c !== 'all').forEach(c => {
    bycat[c] = DATA.filter(d => d.category === c).length
  })
  const total = DATA.length

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #0a0806 0%, #0d0b08 60%, #111009 100%)',
      padding: '72px 24px 52px',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,.06) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {[12, 24, 36, 50, 64, 78].map((top, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${top}%`,
          left: 0,
          right: 0,
          height: i === 2 ? 1.5 : 1,
          background: `linear-gradient(90deg, transparent 0%, rgba(201,168,76,${.03 + i * .008}) 20%, rgba(201,168,76,${.06 + i * .01}) 50%, rgba(201,168,76,${.03 + i * .008}) 80%, transparent 100%)`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '.58rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        color: 'rgba(201,168,76,.45)',
        marginBottom: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}>
        <div style={{ width: 24, height: 1, background: 'rgba(201,168,76,.3)' }} />
        Complete Guitar Reference
        <div style={{ width: 24, height: 1, background: 'rgba(201,168,76,.3)' }} />
      </div>

      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 900,
        fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)',
        lineHeight: 1.0,
        letterSpacing: '-.02em',
        background: 'linear-gradient(135deg, #c9a84c 0%, #f0d478 35%, #e8c060 55%, #d4842a 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 14,
      }}>Guitar Cheat Sheet</h1>

      <p style={{
        fontFamily: "'Lora', Georgia, serif",
        fontSize: '.88rem',
        color: 'rgba(255,255,255,.28)',
        letterSpacing: '0.06em',
        marginBottom: 32,
        fontStyle: 'italic',
      }}>Scales · Modes · Chords · Progressions · Techniques · Theory · Tunings</p>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(201,168,76,.08)',
        border: '1px solid rgba(201,168,76,.2)',
        borderRadius: 20,
        padding: '5px 14px',
        marginBottom: 28,
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '.65rem', fontWeight: 700, color: '#c9a84c' }}>{total}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '.6rem', color: 'rgba(201,168,76,.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>topics · 12 keys each · all genres</span>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        justifyContent: 'center',
        marginBottom: 36,
      }}>
        {CATEGORIES.filter(c => c !== 'all').map(c => {
          const p = PAL[c as CategorySlug]
          const count = bycat[c] || 0
          const isActive = cat === c
          return (
            <button
              key={c}
              onClick={() => onCatClick(c)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '.62rem',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: 20,
                border: isActive ? `1px solid ${p.br}` : '1px solid rgba(255,255,255,.07)',
                background: isActive ? p.b : 'rgba(255,255,255,.03)',
                color: isActive ? p.a : 'rgba(255,255,255,.25)',
                cursor: 'pointer',
                transition: 'all .15s',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = p.br
                  e.currentTarget.style.color = p.a
                  e.currentTarget.style.background = p.b
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'
                  e.currentTarget.style.color = 'rgba(255,255,255,.25)'
                  e.currentTarget.style.background = 'rgba(255,255,255,.03)'
                }
              }}
            >
              <span style={{ opacity: .6, marginRight: 4 }}>{count}</span>{p.label}
            </button>
          )
        })}
      </div>

      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,.15), rgba(201,168,76,.28), rgba(201,168,76,.15), transparent)',
        maxWidth: 640,
        margin: '0 auto',
      }} />
    </section>
  )
}
