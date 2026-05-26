import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DATA } from '../../data'
import { CATEGORY_CONFIG } from '../../data/categories'
import { FRETBOARDS } from '../../data/fretboards'
import FretboardDiagram from '../../components/FretboardDiagram'
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

function KeyTable({ entry, cat }: { entry: GuitarEntry; cat: { a: string; b: string; br: string } }) {
  if (!entry.allKeys?.length) return null
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%', borderCollapse: 'collapse',
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '.76rem',
      }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #353534', background: '#1c1b1b' }}>
            <th style={{ padding: '10px 16px', textAlign: 'left', color: 'rgba(169,138,125,.6)', fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.1em', fontSize: '.62rem', textTransform: 'uppercase' }}>Key</th>
            <th style={{ padding: '10px 16px', textAlign: 'left', color: 'rgba(169,138,125,.6)', fontWeight: 700, letterSpacing: '0.1em', fontSize: '.62rem', textTransform: 'uppercase' }}>Notes</th>
            {entry.allKeys[0]?.chords?.length > 0 && (
              <th style={{ padding: '10px 16px', textAlign: 'left', color: 'rgba(169,138,125,.6)', fontWeight: 700, letterSpacing: '0.1em', fontSize: '.62rem', textTransform: 'uppercase' }}>Chords</th>
            )}
          </tr>
        </thead>
        <tbody>
          {entry.allKeys.map((k, i) => (
            <tr key={k.root} style={{
              borderBottom: '1px solid rgba(53,53,52,.6)',
              background: i === 0 ? `${cat.b}` : 'transparent',
            }}>
              <td style={{ padding: '9px 16px', color: cat.a, fontWeight: 700, whiteSpace: 'nowrap' }}>{k.root}</td>
              <td style={{ padding: '9px 16px', color: '#e5e2e1', letterSpacing: '0.04em' }}>{k.notes.join('  ')}</td>
              {k.chords?.length > 0 && (
                <td style={{ padding: '9px 16px', color: '#a98a7d', fontSize: '.7rem' }}>
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
  const diagrams = FRETBOARDS[entry.id] ?? []
  const related = DATA
    .filter(d => d.category === entry.category && d.id !== entry.id)
    .slice(0, 6)

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

      <style>{`
        .entry-related-item:hover {
          background: #2a2a2a !important;
          border-left-color: ${cat.a} !important;
        }
        .entry-related-item:hover .entry-related-title {
          color: ${cat.a} !important;
        }
        .entry-tag:hover {
          border-color: ${cat.a}55 !important;
          color: ${cat.a} !important;
        }
        .entry-back:hover { color: ${cat.a} !important; }

        @media (max-width: 767px) {
          .entry-layout { flex-direction: column !important; }
          .entry-sidebar { display: none !important; }
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#131313', paddingBottom: 100 }}>

        {/* Breadcrumb */}
        <nav style={{
          background: '#0e0e0e',
          borderBottom: '1px solid #353534',
          padding: '14px 24px',
          display: 'flex', gap: 8, alignItems: 'center',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '.68rem',
        }}>
          <Link href="/" style={{ color: '#ff6b00', textDecoration: 'none', fontWeight: 600 }}>Guitar Cheat Sheet</Link>
          <span style={{ color: 'rgba(169,138,125,.3)' }}>›</span>
          <Link href={`/${entry.category}`} style={{ color: cat.a, textDecoration: 'none', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '.6rem' }}>{cat.label}</Link>
          <span style={{ color: 'rgba(169,138,125,.3)' }}>›</span>
          <span style={{ color: '#a98a7d' }}>{entry.title}</span>
        </nav>

        <div
          className="entry-layout"
          style={{
            maxWidth: 1280, margin: '0 auto',
            display: 'flex', gap: 0,
            alignItems: 'flex-start',
          }}
        >

          {/* ── Main content (8 cols) ── */}
          <div style={{ flex: 1, padding: '36px 32px', minWidth: 0 }}>

            {/* Category badge */}
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-block',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.6rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: cat.a,
                background: cat.b,
                borderLeft: `2px solid ${cat.a}`,
                padding: '4px 10px',
              }}>{cat.label}</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
              fontWeight: 600, lineHeight: 1.2,
              color: '#e5e2e1',
              marginBottom: 14,
              letterSpacing: '-0.01em',
            }}>{entry.title}</h1>

            {/* Summary */}
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1rem', color: '#e2bfb0',
              lineHeight: 1.65, marginBottom: 28,
              maxWidth: 700,
            }}>{entry.summary}</p>

            {/* Formula + Degrees stat cards */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
              {entry.formula && (
                <div style={{
                  background: '#1c1b1b',
                  border: '1px solid #353534',
                  padding: '14px 20px',
                  flex: '1 1 180px',
                  minWidth: 0,
                }}>
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.58rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '.12em',
                    color: 'rgba(169,138,125,.5)', marginBottom: 6,
                  }}>Formula</div>
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.92rem',
                    color: cat.a,
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                  }}>{entry.formula}</div>
                </div>
              )}
              {entry.degrees && (
                <div style={{
                  background: '#1c1b1b',
                  border: '1px solid #353534',
                  padding: '14px 20px',
                  flex: '1 1 180px',
                  minWidth: 0,
                }}>
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.58rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '.12em',
                    color: 'rgba(169,138,125,.5)', marginBottom: 6,
                  }}>Degrees</div>
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.92rem',
                    color: '#e5e2e1',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}>{entry.degrees}</div>
                </div>
              )}
              {entry.example?.notes?.length > 0 && (
                <div style={{
                  background: '#1c1b1b',
                  border: '1px solid #353534',
                  padding: '14px 20px',
                  flex: '1 1 180px',
                  minWidth: 0,
                }}>
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.58rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '.12em',
                    color: 'rgba(169,138,125,.5)', marginBottom: 6,
                  }}>Example in {entry.example.root}</div>
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.88rem',
                    color: '#e5e2e1',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                  }}>{entry.example.notes.join('  ')}</div>
                </div>
              )}
            </div>

            {/* Fretboard diagrams */}
            {diagrams.length > 0 && (
              <section aria-labelledby="fretboard-heading" style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <p style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.6rem', fontWeight: 700,
                    color: cat.a, textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
                  }} id="fretboard-heading">Interactive Visualizer</p>
                  <div style={{ flex: 1, height: 1, background: 'rgba(169,138,125,.08)' }} />
                </div>
                <div style={{
                  background: '#1c1b1b',
                  border: `1px solid #353534`,
                  padding: '24px',
                  display: 'flex', flexDirection: 'column', gap: 20,
                }}>
                  {diagrams.map(diagram => (
                    <div key={diagram.id} style={{
                      background: 'rgba(0,0,0,.3)',
                      border: `1px solid ${cat.br}33`,
                      borderRadius: 4,
                      padding: '14px 16px',
                    }}>
                      <FretboardDiagram diagram={diagram} accentColor={cat.a} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Details */}
            <section aria-labelledby="details-heading" style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <h2 id="details-heading" style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.6rem', fontWeight: 700,
                  color: cat.a, textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
                }}>About the {entry.title}</h2>
                <div style={{ flex: 1, height: 1, background: 'rgba(169,138,125,.08)' }} />
              </div>
              {entry.details.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.92rem', color: '#e2bfb0',
                  lineHeight: 1.75,
                  marginTop: i > 0 ? 14 : 0, marginBottom: 0,
                }}>{para}</p>
              ))}
            </section>

            {/* Used by genres */}
            {entry.usedBy && (
              <section aria-labelledby="genres-heading" style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <h2 id="genres-heading" style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.6rem', fontWeight: 700,
                    color: cat.a, textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
                  }}>Genres &amp; Contexts</h2>
                  <div style={{ flex: 1, height: 1, background: 'rgba(169,138,125,.08)' }} />
                </div>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.9rem', color: '#e2bfb0', lineHeight: 1.7,
                }}>{entry.usedBy}</p>
              </section>
            )}

            {/* Diatonic chords */}
            {entry.chords?.length > 0 && (
              <section aria-labelledby="chords-heading" style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <h2 id="chords-heading" style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.6rem', fontWeight: 700,
                    color: cat.a, textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
                  }}>Diatonic Chords</h2>
                  <div style={{ flex: 1, height: 1, background: 'rgba(169,138,125,.08)' }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {entry.chords.map((ch, i) => (
                    <span key={i} style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.78rem', fontWeight: 600,
                      color: cat.a, background: cat.b,
                      border: `1px solid ${cat.br}55`,
                      borderRadius: 2, padding: '5px 12px',
                    }}>{ch}</span>
                  ))}
                </div>
              </section>
            )}

            {/* All 12 keys */}
            {entry.allKeys?.length > 0 && (
              <section aria-labelledby="keys-heading" style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <h2 id="keys-heading" style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.6rem', fontWeight: 700,
                    color: cat.a, textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
                    whiteSpace: 'nowrap',
                  }}>{entry.title} in All 12 Keys</h2>
                  <div style={{ flex: 1, height: 1, background: 'rgba(169,138,125,.08)' }} />
                </div>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.76rem', color: 'rgba(169,138,125,.4)',
                  marginBottom: 14, fontStyle: 'italic',
                }}>Every key — root note, all tones, diatonic chords.</p>
                <div style={{
                  background: '#0e0e0e',
                  border: '1px solid #353534',
                  overflow: 'hidden',
                }}>
                  <KeyTable entry={entry} cat={cat} />
                </div>
              </section>
            )}

            {/* Pro tip */}
            {entry.tip && (
              <section style={{
                position: 'relative',
                background: cat.b,
                border: `1px solid ${cat.br}55`,
                padding: '20px 24px',
                marginBottom: 48,
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: -8, right: 16,
                  fontFamily: 'Georgia, serif',
                  fontSize: '5rem',
                  color: cat.a, opacity: 0.06,
                  lineHeight: 1,
                  pointerEvents: 'none', userSelect: 'none',
                }}>&ldquo;</div>
                <div style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.6rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  color: cat.a, marginBottom: 10,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span>◆</span> Pro Tip
                </div>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontStyle: 'italic',
                  fontSize: '.9rem', color: '#ffb693',
                  lineHeight: 1.7, margin: 0,
                }}>{entry.tip}</p>
              </section>
            )}

            {/* Tags */}
            {entry.tags?.length > 0 && (
              <div style={{ marginBottom: 48, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {entry.tags.map(tag => (
                  <span
                    key={tag}
                    className="entry-tag"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.62rem', fontWeight: 600,
                      color: 'rgba(169,138,125,.45)',
                      background: 'rgba(169,138,125,.06)',
                      border: '1px solid rgba(169,138,125,.12)',
                      borderRadius: 2, padding: '4px 10px',
                      transition: 'border-color .15s, color .15s',
                    }}
                  >{tag}</span>
                ))}
              </div>
            )}

            {/* Practice drill bento */}
            <section style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16, marginBottom: 48,
            }}>
              <div style={{
                background: '#1c1b1b',
                border: '1px solid #353534',
                padding: '20px 24px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: 3, height: '100%',
                  background: cat.a,
                }} />
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.6rem', fontWeight: 700,
                  color: cat.a, textTransform: 'uppercase',
                  letterSpacing: '0.14em', marginBottom: 10,
                }}>Practice Drill</p>
                <h4 style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: '1rem', fontWeight: 600,
                  color: '#e5e2e1', marginBottom: 8,
                }}>The All-Keys Sequence</h4>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.8rem', color: '#a98a7d',
                  lineHeight: 1.55, marginBottom: 14,
                }}>Play the {entry.title} across all 12 keys. Start at 60 BPM, increase by 5 each run.</p>
              </div>

              {entry.tip && (
                <div style={{
                  background: '#1c1b1b',
                  border: '1px solid #353534',
                  padding: '20px 24px',
                }}>
                  <p style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.6rem', fontWeight: 700,
                    color: cat.a, textTransform: 'uppercase',
                    letterSpacing: '0.14em', marginBottom: 10,
                  }}>Lesson Notes</p>
                  <p style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontStyle: 'italic',
                    fontSize: '.84rem', color: 'rgba(226,191,176,.7)',
                    lineHeight: 1.65, marginBottom: 0,
                  }}>&ldquo;{entry.tip.length > 160 ? entry.tip.slice(0, 160) + '…' : entry.tip}&rdquo;</p>
                </div>
              )}
            </section>

            {/* Back link */}
            <Link
              href={`/${entry.category}`}
              className="entry-back"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.72rem', fontWeight: 600,
                color: 'rgba(169,138,125,.5)',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                transition: 'color .15s',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              All {cat.label}
            </Link>
          </div>

          {/* ── Sidebar (4 cols, desktop only) ── */}
          <aside
            className="entry-sidebar"
            style={{
              width: 320,
              flexShrink: 0,
              position: 'sticky',
              top: 64,
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
              background: '#1c1b1b',
              borderLeft: '1px solid #353534',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Curriculum header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #353534',
              background: '#201f1f',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.62rem', fontWeight: 700,
                color: cat.a,
                textTransform: 'uppercase', letterSpacing: '0.12em',
              }}>More {cat.label}</span>
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.6rem', fontWeight: 600,
                color: 'rgba(169,138,125,.45)',
              }}>{related.length} lessons</span>
            </div>

            {/* Current entry indicator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 20px',
              background: `${cat.b}`,
              borderLeft: `4px solid ${cat.a}`,
              borderBottom: '1px solid #353534',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.68rem', fontWeight: 700,
                  color: cat.a,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  marginBottom: 2, whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}>Current</p>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.78rem', color: '#e5e2e1',
                  fontWeight: 600,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  margin: 0,
                }}>{entry.title}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={cat.a} style={{ flexShrink: 0 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>

            {/* Related entries list */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {related.map((r, i) => (
                <Link
                  key={r.id}
                  href={`/${r.category}/${r.id}`}
                  className="entry-related-item"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 20px',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(53,53,52,.5)',
                    borderLeft: '3px solid transparent',
                    transition: 'background .15s, border-left-color .15s',
                    background: 'transparent',
                  }}
                >
                  <span style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.68rem', fontWeight: 700,
                    color: 'rgba(169,138,125,.3)',
                    minWidth: 24, flexShrink: 0,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      className="entry-related-title"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '.76rem', fontWeight: 600,
                        color: '#e5e2e1',
                        textTransform: 'uppercase', letterSpacing: '0.04em',
                        marginBottom: 2,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        transition: 'color .15s',
                      }}
                    >{r.title}</p>
                    <p style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '.68rem', color: 'rgba(169,138,125,.5)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      margin: 0,
                    }}>{r.summary.slice(0, 55)}{r.summary.length > 55 ? '…' : ''}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid #353534', background: '#201f1f' }}>
              <Link
                href={`/${entry.category}`}
                style={{
                  display: 'block',
                  background: cat.a,
                  color: '#000',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.68rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  textAlign: 'center',
                  transition: 'opacity .15s',
                  boxShadow: `0 0 16px ${cat.a}33`,
                }}
              >
                Browse All {cat.label} →
              </Link>
            </div>
          </aside>

        </div>
      </main>
    </>
  )
}
