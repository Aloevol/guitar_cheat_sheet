import Link from 'next/link'
import { CATEGORY_CONFIG } from '../data/categories'

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#0a0806',
      borderTop: '1px solid rgba(255,255,255,.06)',
      padding: '48px 24px 32px',
      marginTop: 64,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 32, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.1rem', fontWeight: 900, color: '#c9a84c', marginBottom: 8,
            }}>Guitar Cheat Sheet</div>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '.78rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.6,
            }}>
              Free guitar reference for every player. Scales, chords, modes and more — all 12 keys.
            </p>
          </div>

          {/* Categories */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '.58rem', fontWeight: 700, color: 'rgba(255,255,255,.3)',
              textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12,
            }}>Categories</div>
            <nav aria-label="Category pages">
              {Object.entries(CATEGORY_CONFIG).map(([slug, cat]) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  style={{
                    display: 'block',
                    fontFamily: "'Lora', serif", fontSize: '.8rem',
                    color: 'rgba(255,255,255,.45)', textDecoration: 'none',
                    marginBottom: 6, transition: 'color .15s',
                  }}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Site links */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '.58rem', fontWeight: 700, color: 'rgba(255,255,255,.3)',
              textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12,
            }}>Site</div>
            <nav aria-label="Site pages">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: 'block',
                    fontFamily: "'Lora', serif", fontSize: '.8rem',
                    color: 'rgba(255,255,255,.45)', textDecoration: 'none',
                    marginBottom: 6, transition: 'color .15s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,.05)',
          paddingTop: 20,
          display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '.58rem', color: 'rgba(255,255,255,.2)', margin: 0,
          }}>
            © {year} Guitar Cheat Sheet. Free for personal and educational use.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/privacy" style={{ fontFamily: "'Space Mono', monospace", fontSize: '.58rem', color: 'rgba(255,255,255,.25)', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/contact" style={{ fontFamily: "'Space Mono', monospace", fontSize: '.58rem', color: 'rgba(255,255,255,.25)', textDecoration: 'none' }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
