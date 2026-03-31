import Link from 'next/link'
import { CATEGORY_CONFIG } from '../data/categories'

export default function SiteHeader() {
  return (
    <header style={{
      background: '#0a0806',
      borderBottom: '1px solid rgba(255,255,255,.06)',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 52,
      }}>
        {/* Brand */}
        <Link href="/" style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1rem', fontWeight: 900, color: '#c9a84c',
          textDecoration: 'none', letterSpacing: '-.01em',
        }}>
          Guitar Cheat Sheet
        </Link>

        {/* Category nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {Object.entries(CATEGORY_CONFIG).map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '.6rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '.06em',
                color: 'rgba(255,255,255,.4)',
                textDecoration: 'none',
                padding: '6px 9px',
                borderRadius: 4,
                transition: 'color .15s, background .15s',
              }}
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/about"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '.6rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.06em',
              color: 'rgba(255,255,255,.25)',
              textDecoration: 'none',
              padding: '6px 9px',
              borderRadius: 4,
            }}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
