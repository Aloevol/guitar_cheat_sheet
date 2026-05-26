'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORY_CONFIG } from '../data/categories'
import { Library, Bolt, BookOpen, Clock } from 'lucide-react'

const MOBILE_NAV = [
  { href: '/scales',       label: 'Library',   Icon: Library },
  { href: '/techniques',   label: 'Technique',  Icon: Bolt },
  { href: '/theory',       label: 'Theory',     Icon: BookOpen },
  { href: '/progressions', label: 'Practice',   Icon: Clock },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()
  const pathname = usePathname()

  return (
    <>
      <footer style={{
        background: '#0e0e0e',
        borderTop: '1px solid #353534',
        padding: '48px 24px 32px',
        marginTop: 80,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 32,
            marginBottom: 40,
          }}>
            {/* Brand */}
            <div>
              <div style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: '0.9rem', fontWeight: 700,
                color: '#ff6b00',
                marginBottom: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}>Guitar Cheat Sheet</div>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.78rem', color: '#a98a7d', lineHeight: 1.65,
                margin: 0,
              }}>
                Free guitar reference for every player. Scales, chords, modes and more — all 12 keys.
              </p>
            </div>

            {/* Categories */}
            <div>
              <div style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.6rem', fontWeight: 700,
                color: 'rgba(169,138,125,.5)',
                textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 12,
              }}>Categories</div>
              <nav aria-label="Category pages">
                {Object.entries(CATEGORY_CONFIG).map(([slug, cat]) => (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    style={{
                      display: 'block',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.78rem',
                      color: '#a98a7d',
                      textDecoration: 'none',
                      marginBottom: 6,
                      transition: 'color .15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ffb693' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#a98a7d' }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Site links */}
            <div>
              <div style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.6rem', fontWeight: 700,
                color: 'rgba(169,138,125,.5)',
                textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 12,
              }}>Site</div>
              <nav aria-label="Site pages">
                {[
                  { href: '/',        label: 'Home' },
                  { href: '/about',   label: 'About' },
                  { href: '/contact', label: 'Contact' },
                  { href: '/privacy', label: 'Privacy Policy' },
                ].map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: 'block',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.78rem',
                      color: '#a98a7d',
                      textDecoration: 'none',
                      marginBottom: 6,
                      transition: 'color .15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ffb693' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#a98a7d' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(169,138,125,.08)',
            paddingTop: 20,
            display: 'flex', gap: 16, flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '.6rem',
              color: 'rgba(169,138,125,.35)',
              textTransform: 'uppercase',
              letterSpacing: '.08em',
              margin: 0,
            }}>
              © {year} Guitar Cheat Sheet. Free for personal and educational use.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <Link href="/privacy" style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.6rem', color: 'rgba(169,138,125,.35)',
                textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.08em',
              }}>Privacy</Link>
              <Link href="/contact" style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.6rem', color: 'rgba(169,138,125,.35)',
                textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.08em',
              }}>Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        aria-label="Mobile bottom navigation"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 50,
          background: 'rgba(14,14,14,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid #353534',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'stretch',
          height: 64,
          paddingBottom: 'env(safe-area-inset-bottom)',
          boxShadow: '0 -4px 32px rgba(0,0,0,0.6)',
        }}
        className="mobile-bottom-nav"
      >
        {MOBILE_NAV.map(({ href, label, Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                flex: 1,
                textDecoration: 'none',
                color: isActive ? '#ff6b00' : '#5a4136',
                transition: 'color .15s',
                paddingTop: isActive ? 0 : 2,
                borderTop: isActive ? '2px solid #ff6b00' : '2px solid transparent',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.58rem',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                fontWeight: isActive ? 700 : 500,
              }}>{label}</span>
            </Link>
          )
        })}

      </nav>
    </>
  )
}
