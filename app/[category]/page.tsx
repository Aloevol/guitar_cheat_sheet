import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DATA } from '../data'
import { CATEGORY_CONFIG, isCategorySlug } from '../data/categories'
import type { CategorySlug } from '../types'

const SITE_URL = 'https://guitarcheatsheet.com'

interface Props {
  params: { category: string }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_CONFIG).map(category => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isCategorySlug(params.category)) return {}
  const cat = CATEGORY_CONFIG[params.category]
  const title = `Guitar ${cat.label} — All ${cat.label} in Every Key`
  const description = `Complete guitar ${cat.label.toLowerCase()} reference. ${cat.desc}. Every item shown in all 12 keys with formulas, notes, and chord families. Free for all levels.`
  return {
    title,
    description,
    openGraph: { title, description, url: `${SITE_URL}/${params.category}` },
    alternates: { canonical: `${SITE_URL}/${params.category}` },
  }
}

export default function CategoryPage({ params }: Props) {
  if (!isCategorySlug(params.category)) notFound()

  const slug = params.category as CategorySlug
  const cat = CATEGORY_CONFIG[slug]
  const entries = DATA.filter(d => d.category === slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Guitar ${cat.label}`,
    description: cat.desc,
    url: `${SITE_URL}/${slug}`,
    hasPart: entries.map(e => ({
      '@type': 'Article',
      name: e.title,
      description: e.summary,
      url: `${SITE_URL}/${e.category}/${e.id}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
        {/* Nav */}
        <nav style={{
          borderBottom: '1px solid rgba(255,255,255,.06)',
          padding: '14px 24px', display: 'flex', gap: 8, alignItems: 'center',
          fontFamily: "'Space Mono', monospace", fontSize: '.7rem',
        }}>
          <Link href="/" style={{ color: '#c9a84c', textDecoration: 'none' }}>Guitar Cheat Sheet</Link>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
          <span style={{ color: cat.a }}>{cat.label}</span>
        </nav>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
          {/* Top accent */}
          <div style={{ height: 3, width: 48, background: cat.a, borderRadius: 2, marginBottom: 24 }} />

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900,
            color: '#f5edda', marginBottom: 12, lineHeight: 1.1,
          }}>
            Guitar {cat.label}
          </h1>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: '1.1rem',
            color: 'rgba(255,255,255,.55)', lineHeight: 1.65, marginBottom: 48,
            maxWidth: 680,
          }}>
            {cat.desc}. Every item shown in all 12 keys — complete notes, formulas, and
            chord families. Free reference for beginner to advanced guitarists.
          </p>

          {/* Entry grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {entries.map(entry => (
              <Link
                key={entry.id}
                href={`/${entry.category}/${entry.id}`}
                style={{
                  display: 'block', textDecoration: 'none',
                  background: '#141210',
                  border: `1px solid rgba(255,255,255,.06)`,
                  borderRadius: 10, overflow: 'hidden',
                  transition: 'border-color .15s, background .15s',
                }}
              >
                {/* Top accent line */}
                <div style={{ height: 2, background: `linear-gradient(90deg, ${cat.a}, ${cat.a}88, transparent)` }} />
                <div style={{ padding: '18px 20px' }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.05rem', fontWeight: 800,
                    color: '#f5edda', marginBottom: 6,
                  }}>{entry.title}</div>
                  <div style={{
                    fontFamily: "'Lora', serif", fontSize: '.78rem',
                    color: 'rgba(255,255,255,.42)', lineHeight: 1.55, marginBottom: 12,
                  }}>{entry.summary}</div>
                  {entry.formula && (
                    <div style={{
                      fontFamily: "'Space Mono', monospace", fontSize: '.62rem',
                      color: cat.a, opacity: .8,
                    }}>{entry.formula}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* SEO prose below the grid */}
          <section style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700,
              color: '#f5edda', marginBottom: 20,
            }}>About Guitar {cat.label}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {entries.slice(0, 6).map(entry => (
                <article key={entry.id}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: '#f5edda', marginBottom: 6 }}>
                    {entry.title}
                  </h3>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: '.82rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.7, margin: 0 }}>
                    {entry.details?.slice(0, 200)}{entry.details?.length > 200 ? '…' : ''}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Back link */}
          <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <Link href="/" style={{
              fontFamily: "'Space Mono', monospace", fontSize: '.72rem',
              color: '#c9a84c', textDecoration: 'none',
            }}>
              ← All Categories
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
