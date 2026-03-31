import type { Metadata } from 'next'
import Link from 'next/link'
import { DATA } from '../data'
import { CATEGORY_CONFIG } from '../data/categories'
import type { CategorySlug } from '../types'

export const metadata: Metadata = {
  title: 'About Guitar Cheat Sheet',
  description: 'Guitar Cheat Sheet is a free, open guitar reference covering scales, modes, chords, progressions, techniques, theory, and tunings in all 12 keys — for beginners to advanced players.',
}

export default function AboutPage() {
  const categoryCount = Object.keys(CATEGORY_CONFIG).length
  const entryCount = DATA.length

  return (
    <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
      <nav style={{
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '14px 24px', display: 'flex', gap: 8, alignItems: 'center',
        fontFamily: "'Space Mono', monospace", fontSize: '.7rem',
      }}>
        <Link href="/" style={{ color: '#c9a84c', textDecoration: 'none' }}>Guitar Cheat Sheet</Link>
        <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
        <span style={{ color: 'rgba(255,255,255,.5)' }}>About</span>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900,
          color: '#f5edda', marginBottom: 16,
        }}>About Guitar Cheat Sheet</h1>

        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.05rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.75, marginBottom: 28 }}>
          Guitar Cheat Sheet is a free, open guitar reference designed for every player — from
          first-week beginners to experienced musicians who just need a quick lookup. No ads
          on the core content, no paywalls, no account required.
        </p>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#f5edda', marginBottom: 12 }}>What's included</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '.95rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: 12 }}>
          The site covers <strong style={{ color: '#f5edda' }}>{entryCount} topics</strong> across{' '}
          <strong style={{ color: '#f5edda' }}>{categoryCount} categories</strong>:
        </p>
        <ul style={{ fontFamily: "'Lora', serif", fontSize: '.95rem', color: 'rgba(255,255,255,.6)', lineHeight: 2, paddingLeft: 20, marginBottom: 28 }}>
          {Object.values(CATEGORY_CONFIG).map(cat => (
            <li key={cat.label} style={{ marginBottom: 2 }}>
              <strong style={{ color: '#f5edda' }}>{cat.label}</strong> — {cat.desc}
            </li>
          ))}
        </ul>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '.95rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: 28 }}>
          Every scale, mode, chord, and progression is shown in <strong style={{ color: '#f5edda' }}>all 12 musical keys</strong> —
          C, C♯/D♭, D, D♯/E♭, E, F, F♯/G♭, G, G♯/A♭, A, A♯/B♭, and B —
          with full note names, diatonic chords, and interval formulas.
        </p>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#f5edda', marginBottom: 12 }}>Who it&apos;s for</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '.95rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: 28 }}>
          Guitar Cheat Sheet is built for guitarists who want instant answers without wading
          through lengthy lessons. Whether you&apos;re writing a song in D minor, soloing over a
          12-bar blues, exploring Phrygian for a flamenco piece, or just need to remember
          what notes are in an E♭ major chord — this is the reference you keep open in a tab.
        </p>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#f5edda', marginBottom: 12 }}>How to use it</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '.95rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: 28 }}>
          Use the <strong style={{ color: '#f5edda' }}>search bar</strong> to find any scale, chord, or technique by name.
          Use the <strong style={{ color: '#f5edda' }}>category filters</strong> to browse a specific topic area.
          Click any card to expand it and see full notes, keys, chord families, and pro tips.
          Every individual scale and chord also has its own dedicated page with an all-12-keys table.
        </p>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#f5edda', marginBottom: 12 }}>Contact</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '.95rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: 40 }}>
          Have a suggestion, found an error, or want to see a topic added?{' '}
          <Link href="/contact" style={{ color: '#c9a84c', textDecoration: 'none' }}>Get in touch</Link>.
          All feedback is welcome.
        </p>

        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <Link href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: '.72rem', color: '#c9a84c', textDecoration: 'none' }}>
            ← Back to Guitar Cheat Sheet
          </Link>
        </div>
      </div>
    </main>
  )
}
