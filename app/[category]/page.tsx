import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DATA } from '../data'
import { CATEGORY_CONFIG, CATEGORIES, isCategorySlug } from '../data/categories'
import type { CategorySlug } from '../types'

const SITE_URL = 'https://guitarcheatsheet.com'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_CONFIG).map(category => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  if (!isCategorySlug(category)) return {}
  const cat = CATEGORY_CONFIG[category]
  const title = `Guitar ${cat.label} — All ${cat.label} in Every Key`
  const description = `Complete guitar ${cat.label.toLowerCase()} reference. ${cat.desc}. Every item shown in all 12 keys with formulas, notes, and chord families. Free for all levels.`
  return {
    title,
    description,
    openGraph: { title, description, url: `${SITE_URL}/${category}` },
    alternates: { canonical: `${SITE_URL}/${category}` },
  }
}

const ALL_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  if (!isCategorySlug(category)) notFound()

  const slug = category as CategorySlug
  const cat = CATEGORY_CONFIG[slug]
  const entries = DATA.filter(d => d.category === slug)
  const cats = CATEGORIES.filter(c => c !== 'all')

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

      <style>{`
        .cat-sidebar { display: none; }
        @media (min-width: 768px) { .cat-sidebar { display: flex; } }

        .cat-entry-card { transition: border-color .2s, transform .15s; }
        .cat-entry-card:hover {
          border-color: ${cat.a}88 !important;
          transform: translateY(-2px);
        }
        .cat-entry-card:hover .cat-card-footer {
          border-top-color: ${cat.a}33 !important;
        }
        .cat-entry-card:hover .cat-explore-btn {
          color: ${cat.a} !important;
          gap: 8px !important;
        }

        .cat-key-btn:hover {
          border-color: ${cat.a}88 !important;
          color: ${cat.a} !important;
        }
        .cat-nav-link:hover {
          background: rgba(169,138,125,.06) !important;
          color: #e5e2e1 !important;
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#131313', paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <nav style={{
          background: '#0e0e0e',
          borderBottom: '1px solid #353534',
          padding: '14px 24px',
          display: 'flex', gap: 8, alignItems: 'center',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '.68rem',
        }}>
          <Link href="/" style={{ color: '#ff6b00', textDecoration: 'none', letterSpacing: '0.06em', fontWeight: 600 }}>
            Guitar Cheat Sheet
          </Link>
          <span style={{ color: 'rgba(169,138,125,.3)' }}>›</span>
          <span style={{
            color: cat.a, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '.6rem',
          }}>{cat.label}</span>
        </nav>

        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex' }}>

          {/* ── Left Sidebar (desktop only) ── */}
          <aside className="cat-sidebar" style={{
            width: 256,
            flexDirection: 'column',
            borderRight: '1px solid #353534',
            background: '#0e0e0e',
            flexShrink: 0,
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 112px)',
            position: 'sticky',
            top: 64,
          }}>
            <div style={{ padding: '24px 0' }}>

              {/* Brand mark */}
              <div style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: '.9rem', fontWeight: 700,
                color: cat.a,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '0 24px',
                marginBottom: 28,
              }}>MASTERY</div>

              {/* Category navigation */}
              <div style={{ marginBottom: 28 }}>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.58rem', fontWeight: 700,
                  color: 'rgba(169,138,125,.45)',
                  textTransform: 'uppercase', letterSpacing: '.14em',
                  padding: '0 24px', marginBottom: 8,
                }}>Categories</p>

                <nav>
                  {cats.map(c => {
                    const p = CATEGORY_CONFIG[c as CategorySlug]
                    const isActive = c === slug
                    return (
                      <Link
                        key={c}
                        href={`/${c}`}
                        className={isActive ? undefined : 'cat-nav-link'}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '11px 24px',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '.76rem',
                          fontWeight: isActive ? 700 : 400,
                          textDecoration: 'none',
                          color: isActive ? p.a : '#a98a7d',
                          background: isActive ? `${p.b}` : 'transparent',
                          borderLeft: `3px solid ${isActive ? p.a : 'transparent'}`,
                          transition: 'background .15s, color .15s',
                        }}
                      >
                        {p.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* Filter by Key */}
              <div style={{ padding: '0 24px', marginBottom: 28 }}>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.58rem', fontWeight: 700,
                  color: 'rgba(169,138,125,.45)',
                  textTransform: 'uppercase', letterSpacing: '.14em',
                  marginBottom: 10,
                }}>Filter by Key</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {ALL_KEYS.map(k => (
                    <div
                      key={k}
                      className="cat-key-btn"
                      style={{
                        border: '1px solid rgba(169,138,125,.18)',
                        borderRadius: 2,
                        padding: '6px 4px',
                        textAlign: 'center',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '.62rem', fontWeight: 700,
                        color: 'rgba(169,138,125,.45)',
                        cursor: 'default',
                        transition: 'border-color .15s, color .15s',
                      }}
                    >{k}</div>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* ── Main content ── */}
          <div style={{ flex: 1, padding: '36px 32px 80px', background: '#131313', minWidth: 0 }}>

            {/* Page header */}
            <header style={{ marginBottom: 40 }}>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.62rem', fontWeight: 700,
                color: cat.a,
                textTransform: 'uppercase', letterSpacing: '0.14em',
                marginBottom: 10,
              }}>Theoretical Foundations</p>
              <h1 style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                fontWeight: 700, lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#e5e2e1',
                marginBottom: 14,
              }}>{cat.label} Library</h1>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1rem', color: '#e2bfb0',
                maxWidth: 640, lineHeight: 1.6,
              }}>
                {cat.desc}. Every item shown in all 12 keys — complete notes, formulas, and chord families.
              </p>
            </header>

            {/* Entry card grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20,
              marginBottom: 80,
            }}>
              {entries.map(entry => (
                <Link
                  key={entry.id}
                  href={`/${entry.category}/${entry.id}`}
                  className="cat-entry-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    background: '#1c1b1b',
                    border: '1px solid #353534',
                    overflow: 'hidden',
                    borderRadius: 0,
                  }}
                >
                  {/* Top accent strip */}
                  <div style={{ height: 2, background: `linear-gradient(90deg, ${cat.a}, ${cat.a}44, transparent)` }} />

                  <div style={{ padding: '20px 24px', flex: 1 }}>
                    {/* Type badge */}
                    <span style={{
                      display: 'inline-block',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.58rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.12em',
                      color: cat.a,
                      marginBottom: 10,
                    }}>{cat.label}</span>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: "'Noto Serif', Georgia, serif",
                      fontSize: '1.3rem', fontWeight: 600,
                      lineHeight: 1.25, color: '#e5e2e1',
                      marginBottom: 8,
                    }}>{entry.title}</h2>

                    {/* Summary */}
                    <p style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.82rem', color: '#a98a7d',
                      lineHeight: 1.55,
                      marginBottom: entry.formula ? 14 : 0,
                    }}>{entry.summary}</p>

                    {/* Formula */}
                    {entry.formula && (
                      <p style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '.7rem',
                        color: 'rgba(169,138,125,.55)',
                        fontStyle: 'italic',
                        letterSpacing: '0.02em',
                      }}>Intervals: {entry.formula}</p>
                    )}
                  </div>

                  {/* Card footer */}
                  <div
                    className="cat-card-footer"
                    style={{
                      borderTop: '1px solid #353534',
                      background: '#0e0e0e',
                      padding: '11px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'border-color .2s',
                    }}
                  >
                    <span style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.68rem',
                      color: 'rgba(169,138,125,.35)',
                      fontStyle: 'italic',
                    }}>
                      {entry.tags?.slice(0, 2).join(' · ')}
                    </span>
                    <div
                      className="cat-explore-btn"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '.68rem', fontWeight: 700,
                        color: 'rgba(169,138,125,.6)',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                        transition: 'color .15s, gap .15s',
                      }}
                    >
                      Explore
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* SEO prose */}
            <section style={{
              paddingTop: 48,
              borderTop: '1px solid #353534',
            }}>
              <h2 style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: '1.4rem', fontWeight: 600,
                color: '#e5e2e1', marginBottom: 20,
              }}>About Guitar {cat.label}</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 24,
              }}>
                {entries.slice(0, 6).map(entry => (
                  <article key={entry.id}>
                    <h3 style={{
                      fontFamily: "'Noto Serif', Georgia, serif",
                      fontSize: '.95rem', fontWeight: 600,
                      color: '#e5e2e1', marginBottom: 6,
                    }}>{entry.title}</h3>
                    <p style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.8rem', color: '#a98a7d',
                      lineHeight: 1.7, margin: 0,
                    }}>
                      {entry.details?.slice(0, 200)}{(entry.details?.length ?? 0) > 200 ? '…' : ''}
                    </p>
                  </article>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}
