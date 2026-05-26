import type { Metadata } from 'next'
import Link from 'next/link'
import { DATA } from '../data'
import { CATEGORY_CONFIG } from '../data/categories'

export const metadata: Metadata = {
  title: 'About Guitar Cheat Sheet',
  description: 'Guitar Cheat Sheet is a free, open guitar reference covering scales, modes, chords, progressions, techniques, theory, and tunings in all 12 keys — for beginners to advanced players.',
}

const LABEL_STYLE = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '.58rem', fontWeight: 700,
  textTransform: 'uppercase' as const, letterSpacing: '0.14em',
  color: 'rgba(169,138,125,.45)',
} as const

const HEADING_STYLE = {
  fontFamily: "'Noto Serif', Georgia, serif",
  fontSize: '1.3rem', fontWeight: 600,
  color: '#e5e2e1', marginBottom: 12,
} as const

const BODY_STYLE = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '.92rem', color: '#e2bfb0',
  lineHeight: 1.75, marginBottom: 0,
} as const

export default function AboutPage() {
  const categoryCount = Object.keys(CATEGORY_CONFIG).length
  const entryCount = DATA.length

  return (
    <main style={{ minHeight: '100vh', background: '#131313', paddingBottom: 100 }}>

      {/* Breadcrumb */}
      <nav style={{
        background: '#0e0e0e', borderBottom: '1px solid #353534',
        padding: '14px 24px', display: 'flex', gap: 8, alignItems: 'center',
        fontFamily: "'Inter', system-ui, sans-serif", fontSize: '.68rem',
      }}>
        <Link href="/" style={{ color: '#ff6b00', textDecoration: 'none', fontWeight: 600 }}>Guitar Cheat Sheet</Link>
        <span style={{ color: 'rgba(169,138,125,.3)' }}>›</span>
        <span style={{ color: '#a98a7d' }}>About</span>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Eyebrow */}
        <p style={{ ...LABEL_STYLE, marginBottom: 12 }}>About the Project</p>

        <h1 style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700,
          color: '#e5e2e1', marginBottom: 20,
          lineHeight: 1.15, letterSpacing: '-0.02em',
        }}>About Guitar Cheat Sheet</h1>

        <p style={{ ...BODY_STYLE, marginBottom: 32 }}>
          Guitar Cheat Sheet is a free, open guitar reference designed for every player — from
          first-week beginners to experienced musicians who just need a quick lookup. No ads
          on the core content, no paywalls, no account required.
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(169,138,125,.08)', marginBottom: 36 }} />

        <section style={{ marginBottom: 36 }}>
          <h2 style={HEADING_STYLE}>What&apos;s included</h2>
          <p style={{ ...BODY_STYLE, marginBottom: 14 }}>
            The site covers{' '}
            <strong style={{ color: '#ff6b00', fontWeight: 700 }}>{entryCount} topics</strong>
            {' '}across{' '}
            <strong style={{ color: '#ff6b00', fontWeight: 700 }}>{categoryCount} categories</strong>:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.values(CATEGORY_CONFIG).map(cat => (
              <div key={cat.label} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '12px 16px',
                background: '#1c1b1b',
                borderLeft: `3px solid ${cat.a}`,
              }}>
                <span style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.76rem', fontWeight: 700,
                  color: cat.a, minWidth: 96,
                }}>{cat.label}</span>
                <span style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.82rem', color: '#a98a7d', lineHeight: 1.5,
                }}>{cat.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: 'rgba(169,138,125,.08)', marginBottom: 36 }} />

        <section style={{ marginBottom: 36 }}>
          <h2 style={HEADING_STYLE}>All 12 keys</h2>
          <p style={BODY_STYLE}>
            Every scale, mode, chord, and progression is shown in{' '}
            <strong style={{ color: '#e5e2e1', fontWeight: 600 }}>all 12 musical keys</strong> —
            C, C♯/D♭, D, D♯/E♭, E, F, F♯/G♭, G, G♯/A♭, A, A♯/B♭, and B —
            with full note names, diatonic chords, and interval formulas.
          </p>
        </section>

        <div style={{ height: 1, background: 'rgba(169,138,125,.08)', marginBottom: 36 }} />

        <section style={{ marginBottom: 36 }}>
          <h2 style={HEADING_STYLE}>Who it&apos;s for</h2>
          <p style={BODY_STYLE}>
            Guitar Cheat Sheet is built for guitarists who want instant answers without wading
            through lengthy lessons. Whether you&apos;re writing a song in D minor, soloing over a
            12-bar blues, exploring Phrygian for a flamenco piece, or just need to remember
            what notes are in an E♭ major chord — this is the reference you keep open in a tab.
          </p>
        </section>

        <div style={{ height: 1, background: 'rgba(169,138,125,.08)', marginBottom: 36 }} />

        <section style={{ marginBottom: 36 }}>
          <h2 style={HEADING_STYLE}>How to use it</h2>
          <p style={BODY_STYLE}>
            Use the <strong style={{ color: '#e5e2e1', fontWeight: 600 }}>search bar</strong> to find any scale, chord, or technique by name.
            Use the <strong style={{ color: '#e5e2e1', fontWeight: 600 }}>category filters</strong> to browse a specific topic area.
            Click any card to expand it and see full notes, keys, chord families, and pro tips.
            Every individual scale and chord also has its own dedicated page with an all-12-keys table.
          </p>
        </section>

        <div style={{ height: 1, background: 'rgba(169,138,125,.08)', marginBottom: 36 }} />

        <section style={{ marginBottom: 48 }}>
          <h2 style={HEADING_STYLE}>Contact</h2>
          <p style={{ ...BODY_STYLE, marginBottom: 0 }}>
            Have a suggestion, found an error, or want to see a topic added?{' '}
            <Link href="/contact" style={{ color: '#ff6b00', textDecoration: 'none', fontWeight: 600 }}>Get in touch</Link>.
            All feedback is welcome.
          </p>
        </section>

        <Link href="/" style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '.72rem', fontWeight: 600,
          color: 'rgba(169,138,125,.5)',
          textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Guitar Cheat Sheet
        </Link>
      </div>
    </main>
  )
}
