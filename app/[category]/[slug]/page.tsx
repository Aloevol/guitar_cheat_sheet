import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DATA } from '../../data'
import { CATEGORY_CONFIG } from '../../data/categories'
import type { CategorySlug, GuitarEntry } from '../../types'

const SITE_URL = 'https://guitarcheatsheet.com'

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return DATA.map(entry => ({
    category: entry.category,
    slug: entry.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug: paramSlug } = await params
  const entry = DATA.find(d => d.category === category && d.id === paramSlug)
  if (!entry) return {}

  const cat = CATEGORY_CONFIG[entry.category as CategorySlug]
  const title = `${entry.title} — Guitar ${cat.label} in All 12 Keys`
  const description = `${entry.summary} Formula: ${entry.formula}. Learn the ${entry.title} in every key: C, D, E, F, G, A, B and all sharps/flats. ${entry.usedBy}.`

  return {
    title,
    description,
    keywords: [
      entry.title.toLowerCase(),
      `${entry.title.toLowerCase()} guitar`,
      `${entry.title.toLowerCase()} all keys`,
      `${entry.title.toLowerCase()} formula`,
      `guitar ${cat.label.toLowerCase()}`,
      ...entry.tags,
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${entry.category}/${entry.id}`,
      type: 'article',
      images: [{
        url: `/og?title=${encodeURIComponent(entry.title)}&sub=${encodeURIComponent(`Guitar ${cat.label}`)}&accent=${encodeURIComponent(cat.a)}`,
        width: 1200, height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og?title=${encodeURIComponent(entry.title)}&sub=${encodeURIComponent(`Guitar ${cat.label}`)}&accent=${encodeURIComponent(cat.a)}`],
    },
    alternates: {
      canonical: `${SITE_URL}/${entry.category}/${entry.id}`,
    },
  }
}

function KeyTable({ entry }: { entry: GuitarEntry }) {
  if (!entry.allKeys?.length) return null
  return (
    <div style={{ overflowX: 'auto', marginTop: 24 }}>
      <table style={{
        width: '100%', borderCollapse: 'collapse',
        fontFamily: "'Space Mono', monospace", fontSize: '.72rem',
      }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,.1)' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', color: 'rgba(255,255,255,.4)', fontWeight: 700, whiteSpace: 'nowrap' }}>Key</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', color: 'rgba(255,255,255,.4)', fontWeight: 700 }}>Notes</th>
            {entry.allKeys[0]?.chords?.length > 0 && (
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'rgba(255,255,255,.4)', fontWeight: 700 }}>Chords</th>
            )}
          </tr>
        </thead>
        <tbody>
          {entry.allKeys.map((k, i) => (
            <tr key={k.root} style={{
              borderBottom: '1px solid rgba(255,255,255,.04)',
              background: i === 0 ? 'rgba(255,255,255,.03)' : 'transparent',
            }}>
              <td style={{ padding: '7px 12px', color: '#f0c93a', fontWeight: 700, whiteSpace: 'nowrap' }}>{k.root}</td>
              <td style={{ padding: '7px 12px', color: '#f5edda' }}>{k.notes.join('  ')}</td>
              {k.chords?.length > 0 && (
                <td style={{ padding: '7px 12px', color: 'rgba(255,255,255,.5)', fontSize: '.65rem' }}>
                  {k.chords.join(' · ')}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function EntryPage({ params }: Props) {
  const { category, slug: paramSlug } = await params
  const entry = DATA.find(d => d.category === category && d.id === paramSlug)
  if (!entry) notFound()

  const cat = CATEGORY_CONFIG[entry.category as CategorySlug]
  const related = DATA
    .filter(d => d.category === entry.category && d.id !== entry.id)
    .slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${entry.title} Guitar ${cat.label}`,
    description: entry.summary,
    url: `${SITE_URL}/${entry.category}/${entry.id}`,
    author: { '@type': 'Organization', name: 'Guitar Cheat Sheet' },
    publisher: { '@type': 'Organization', name: 'Guitar Cheat Sheet', url: SITE_URL },
    keywords: entry.tags.join(', '),
    about: { '@type': 'Thing', name: entry.title },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
        {/* Nav */}
        <nav style={{
          borderBottom: '1px solid rgba(255,255,255,.06)',
          padding: '14px 24px',
          display: 'flex', gap: 8, alignItems: 'center',
          fontFamily: "'Space Mono', monospace", fontSize: '.7rem',
        }}>
          <Link href="/" style={{ color: '#c9a84c', textDecoration: 'none' }}>Guitar Cheat Sheet</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
          <Link href={`/${entry.category}`} style={{ color: cat.a, textDecoration: 'none' }}>{cat.label}</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,.5)' }}>{entry.title}</span>
        </nav>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
          {/* Category badge */}
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '.6rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: cat.a, background: cat.b, border: `1px solid ${cat.br}`,
            borderRadius: 4, padding: '3px 8px',
          }}>{cat.label}</span>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900,
            color: '#f5edda', marginTop: 16, marginBottom: 8, lineHeight: 1.15,
          }}>
            {entry.title}
          </h1>

          {/* Summary */}
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: '1.1rem',
            color: 'rgba(255,255,255,.6)', lineHeight: 1.6, marginBottom: 32,
          }}>
            {entry.summary}
          </p>

          {/* Formula + Degrees */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
            {entry.formula && (
              <div style={{
                background: '#141210', border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 8, padding: '14px 20px', flex: '1 1 200px',
              }}>
                <div style={{ fontFamily: "'Space Mono'", fontSize: '.58rem', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>Formula</div>
                <div style={{ fontFamily: "'Space Mono'", fontSize: '.95rem', color: '#f0c93a', letterSpacing: '.08em' }}>{entry.formula}</div>
              </div>
            )}
            {entry.degrees && (
              <div style={{
                background: '#141210', border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 8, padding: '14px 20px', flex: '1 1 200px',
              }}>
                <div style={{ fontFamily: "'Space Mono'", fontSize: '.58rem', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>Degrees</div>
                <div style={{ fontFamily: "'Space Mono'", fontSize: '.95rem', color: '#f5edda', letterSpacing: '.1em' }}>{entry.degrees}</div>
              </div>
            )}
            {entry.example?.notes?.length > 0 && (
              <div style={{
                background: '#141210', border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 8, padding: '14px 20px', flex: '1 1 200px',
              }}>
                <div style={{ fontFamily: "'Space Mono'", fontSize: '.58rem', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>Example in {entry.example.root}</div>
                <div style={{ fontFamily: "'Space Mono'", fontSize: '.9rem', color: '#f5edda', letterSpacing: '.08em' }}>{entry.example.notes.join('  ')}</div>
              </div>
            )}
          </div>

          {/* Details */}
          <section aria-labelledby="details-heading" style={{ marginBottom: 40 }}>
            <h2 id="details-heading" style={{
              fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700,
              color: '#f5edda', marginBottom: 12,
            }}>About the {entry.title}</h2>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '.95rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.75 }}>
              {entry.details}
            </p>
          </section>

          {/* Used by */}
          {entry.usedBy && (
            <section aria-labelledby="genres-heading" style={{ marginBottom: 40 }}>
              <h2 id="genres-heading" style={{
                fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700,
                color: '#f5edda', marginBottom: 12,
              }}>Genres &amp; Contexts</h2>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '.95rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.75 }}>
                {entry.usedBy}
              </p>
            </section>
          )}

          {/* Diatonic chords */}
          {entry.chords?.length > 0 && (
            <section aria-labelledby="chords-heading" style={{ marginBottom: 40 }}>
              <h2 id="chords-heading" style={{
                fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700,
                color: '#f5edda', marginBottom: 16,
              }}>Diatonic Chords</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {entry.chords.map((ch, i) => (
                  <span key={i} style={{
                    fontFamily: "'Space Mono', monospace", fontSize: '.7rem',
                    color: cat.a, background: cat.b, border: `1px solid ${cat.br}`,
                    borderRadius: 4, padding: '4px 10px',
                  }}>{ch}</span>
                ))}
              </div>
            </section>
          )}

          {/* All 12 keys table */}
          {entry.allKeys?.length > 0 && (
            <section aria-labelledby="keys-heading" style={{ marginBottom: 48 }}>
              <h2 id="keys-heading" style={{
                fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700,
                color: '#f5edda', marginBottom: 4,
              }}>{entry.title} in All 12 Keys</h2>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '.85rem', color: 'rgba(255,255,255,.4)', marginBottom: 16 }}>
                Every key laid out — root note, all scale/chord tones, diatonic chords.
              </p>
              <div style={{ background: '#111009', border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, overflow: 'hidden' }}>
                <KeyTable entry={entry} />
              </div>
            </section>
          )}

          {/* Pro Tip */}
          {entry.tip && (
            <section style={{
              background: cat.b, border: `1px solid ${cat.br}`,
              borderRadius: 10, padding: '20px 24px', marginBottom: 48,
            }}>
              <div style={{ fontFamily: "'Space Mono'", fontSize: '.6rem', color: cat.a, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>Pro Tip</div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '.95rem', color: 'rgba(255,255,255,.75)', lineHeight: 1.7, margin: 0 }}>
                {entry.tip}
              </p>
            </section>
          )}

          {/* Tags */}
          {entry.tags?.length > 0 && (
            <div style={{ marginBottom: 48, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {entry.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '.6rem',
                  color: 'rgba(255,255,255,.35)', background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(255,255,255,.07)', borderRadius: 4, padding: '3px 8px',
                }}>{tag}</span>
              ))}
            </div>
          )}

          {/* Related entries */}
          {related.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading" style={{
                fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700,
                color: '#f5edda', marginBottom: 16,
              }}>More {cat.label}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {related.map(r => (
                  <Link
                    key={r.id}
                    href={`/${r.category}/${r.id}`}
                    style={{
                      display: 'block', textDecoration: 'none',
                      background: '#141210', border: '1px solid rgba(255,255,255,.06)',
                      borderRadius: 8, padding: '14px 16px',
                      transition: 'border-color .15s',
                    }}
                  >
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '.9rem', fontWeight: 700, color: '#f5edda', marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontFamily: "'Lora', serif", fontSize: '.72rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.4 }}>{r.summary}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back link */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <Link href="/" style={{
              fontFamily: "'Space Mono', monospace", fontSize: '.72rem',
              color: '#c9a84c', textDecoration: 'none',
            }}>
              ← Back to Guitar Cheat Sheet
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
