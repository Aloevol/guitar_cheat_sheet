'use client'
import { DATA } from '../data/guitarData'
import { CATEGORY_CONFIG } from '../data/categories'

export default function Hero() {
  const total = DATA.length
  const catCount = Object.keys(CATEGORY_CONFIG).length

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #0a0908 0%, #131313 70%)',
      padding: '80px 24px 64px',
      overflow: 'hidden',
    }}>
      {/* Radial ember glow — top center */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -5%, rgba(255,107,0,.07) 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      {/* Guitar string lines */}
      {[8, 20, 34, 50, 66, 82].map((top, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${top}%`,
          left: 0, right: 0,
          height: i === 2 ? 1.5 : 1,
          background: `linear-gradient(90deg, transparent 0%, rgba(169,138,125,${.02 + i * .004}) 15%, rgba(169,138,125,${.045 + i * .006}) 50%, rgba(169,138,125,${.02 + i * .004}) 85%, transparent 100%)`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Content — centered column */}
      <div style={{
        position: 'relative',
        maxWidth: 760,
        margin: '0 auto',
        textAlign: 'center',
      }}>

        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 24,
        }}>
          <div style={{ width: 24, height: 1, background: 'rgba(255,107,0,.3)' }} />
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '.58rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'rgba(255,107,0,.55)',
          }}>Complete Guitar Reference</span>
          <div style={{ width: 24, height: 1, background: 'rgba(255,107,0,.3)' }} />
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          fontWeight: 700,
          fontSize: 'clamp(2.6rem, 7vw, 5.2rem)',
          lineHeight: 1.06,
          letterSpacing: '-.025em',
          background: 'linear-gradient(150deg, #ff6b00 0%, #ffb693 38%, #ffe0c8 60%, #ff8533 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 20,
        }}>Guitar Cheat Sheet</h1>

        {/* Descriptor */}
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 'clamp(.82rem, 2vw, .96rem)',
          color: '#a98a7d',
          lineHeight: 1.7,
          marginBottom: 36,
          maxWidth: 540,
          margin: '0 auto 36px',
        }}>
          Every scale, mode, chord, and progression in all 12 keys. Built for quick reference — from first-week beginners to touring musicians.
        </p>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          marginBottom: 40,
          flexWrap: 'wrap',
        }}>
          {[
            { value: String(total), label: 'Topics' },
            { value: String(catCount), label: 'Categories' },
            { value: '12', label: 'Keys each' },
          ].map(({ value, label }, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '14px 28px',
              }}>
                <span style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#ff6b00',
                  lineHeight: 1,
                  marginBottom: 4,
                }}>{value}</span>
                <span style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.58rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(169,138,125,.5)',
                }}>{label}</span>
              </div>
              {i < 2 && (
                <div style={{ width: 1, height: 32, background: 'rgba(169,138,125,.15)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Category pill strip */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 6,
          marginBottom: 40,
        }}>
          {Object.entries(CATEGORY_CONFIG).map(([slug, cat]) => (
            <a
              key={slug}
              href={`/${slug}`}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.6rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: cat.a,
                textDecoration: 'none',
                padding: '4px 12px',
                borderRadius: 9999,
                border: `1px solid ${cat.br}`,
                background: cat.b,
                transition: 'opacity .15s',
                opacity: 0.75,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Bottom divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(169,138,125,.14), rgba(169,138,125,.24), rgba(169,138,125,.14), transparent)',
          maxWidth: 480,
          margin: '0 auto',
        }} />
      </div>
    </section>
  )
}
