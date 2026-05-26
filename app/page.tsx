'use client'
import { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { DATA, PAL, CATEGORIES, QUICK_SEARCHES } from './data/guitarData'
import { CATEGORY_CONFIG } from './data/categories'
import type { GuitarEntry, CategorySlug } from './types'
import SeoContent, { SeoArticleSection } from './components/SeoContent'

function normalize(str: string): string {
  return String(str).replace(/♭/g, 'b').replace(/♯/g, '#').toLowerCase()
}

function highlight(text: string, q: string): React.ReactNode {
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'rgba(255,107,0,.22)', color: '#ffb693', borderRadius: 2, padding: '0 2px' }}>
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  )
}

interface EntryRowProps {
  entry: GuitarEntry
  showCat?: boolean
  query?: string
}

function EntryRow({ entry, showCat = false, query = '' }: EntryRowProps) {
  const cat = CATEGORY_CONFIG[entry.category as CategorySlug]
  const p = PAL[entry.category as CategorySlug]
  return (
    <Link
      href={`/${entry.category}/${entry.id}`}
      className="ref-row"
      data-cat={entry.category}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '11px 20px',
        textDecoration: 'none',
        borderBottom: '1px solid rgba(169,138,125,.055)',
        borderLeft: '3px solid transparent',
        gap: 12,
        transition: 'background .12s, border-color .12s',
      }}
    >
      {showCat && (
        <span style={{
          flexShrink: 0,
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '.56rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: p.a,
          background: p.b,
          border: `1px solid ${p.br}`,
          borderRadius: 3,
          padding: '2px 7px',
          minWidth: 72,
          textAlign: 'center',
        }}>{cat.label}</span>
      )}
      <span className="ref-row-title" style={{
        flexShrink: 0,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '.86rem',
        fontWeight: 600,
        color: '#e5e2e1',
        minWidth: 180,
      }}>
        {highlight(entry.title, query)}
      </span>
      <span className="ref-row-summary" style={{
        flex: 1,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '.76rem',
        color: '#a98a7d',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {entry.summary}
      </span>
      <span className="ref-row-arrow" style={{
        flexShrink: 0,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '.78rem',
        color: '#353534',
        transition: 'color .12s, transform .12s',
        marginLeft: 8,
      }}>→</span>
    </Link>
  )
}

export default function Home() {
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const isSearching = query.trim() !== ''

  const filtered = useMemo(() => {
    const q = normalize(query)
    if (!q) return []
    return DATA.filter(item => {
      const searchable = [
        item.title, item.summary,
        ...(item.tags || []),
        item.details, item.usedBy,
      ].map(normalize).join(' ')
      return searchable.includes(q)
    })
  }, [query])

  const bycat = useMemo(() => {
    const map: Record<string, GuitarEntry[]> = {}
    CATEGORIES.filter(c => c !== 'all').forEach(c => {
      map[c] = DATA.filter(d => d.category === c)
    })
    return map
  }, [])

  const cats = CATEGORIES.filter(c => c !== 'all') as CategorySlug[]

  return (
    <main style={{ minHeight: '100vh', background: '#131313' }}>
      <SeoContent />

      {/* ── Page header ── */}
      <div style={{ background: '#0e0e0e', borderBottom: '1px solid #353534' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '36px 20px 28px' }}>

          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '.58rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: 'rgba(255,107,0,.5)', marginBottom: 10,
          }}>Complete Guitar Reference</p>

          <h1 style={{
            fontFamily: "'Noto Serif', Georgia, serif",
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-.02em',
            color: '#e5e2e1', marginBottom: 10,
          }}>Guitar Cheat Sheet</h1>

          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '.86rem', color: '#a98a7d',
            lineHeight: 1.65, marginBottom: 24,
          }}>
            Instantly look up any scale, chord, mode, or technique in all 12 keys.
            {' '}<span style={{ color: 'rgba(169,138,125,.5)' }}>{DATA.length} topics · 7 categories · free forever.</span>
          </p>

          {/* Search input */}
          <div style={{ position: 'relative', maxWidth: 560 }}>
            <span style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: isSearching ? '#ff6b00' : 'rgba(169,138,125,.35)',
              pointerEvents: 'none', display: 'flex', alignItems: 'center',
              transition: 'color .2s',
            }}>
              <Search size={15} />
            </span>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search scales, chords, techniques…"
              style={{
                width: '100%',
                background: isSearching ? 'rgba(255,107,0,.05)' : '#1c1b1b',
                border: isSearching ? '1px solid rgba(255,107,0,.3)' : '1px solid #353534',
                borderRadius: 4,
                padding: '12px 40px 12px 40px',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.86rem', color: '#e5e2e1',
                outline: 'none',
                transition: 'border-color .2s, background .2s',
                boxShadow: isSearching ? '0 0 0 3px rgba(255,107,0,.07)' : 'none',
              }}
              onFocus={e => { if (!isSearching) e.currentTarget.style.borderColor = 'rgba(169,138,125,.3)' }}
              onBlur={e => { if (!isSearching) e.currentTarget.style.borderColor = '#353534' }}
            />
            {isSearching && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  width: 22, height: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(169,138,125,.1)',
                  border: '1px solid rgba(169,138,125,.15)',
                  borderRadius: '50%',
                  color: '#a98a7d', cursor: 'pointer',
                  transition: 'background .12s, color .12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,0,.12)'; e.currentTarget.style.color = '#ff6b00' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(169,138,125,.1)'; e.currentTarget.style.color = '#a98a7d' }}
              >
                <X size={11} />
              </button>
            )}
          </div>

          {/* Quick searches */}
          {!isSearching && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 12 }}>
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.57rem', color: 'rgba(169,138,125,.3)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                alignSelf: 'center', marginRight: 2,
              }}>Quick:</span>
              {QUICK_SEARCHES.map(q => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.6rem',
                    background: 'rgba(169,138,125,.05)',
                    border: '1px solid rgba(169,138,125,.1)',
                    borderRadius: 9999,
                    padding: '4px 10px',
                    color: 'rgba(169,138,125,.45)',
                    cursor: 'pointer',
                    transition: 'all .12s',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,.3)'; e.currentTarget.style.color = '#ff6b00'; e.currentTarget.style.background = 'rgba(255,107,0,.07)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(169,138,125,.1)'; e.currentTarget.style.color = 'rgba(169,138,125,.45)'; e.currentTarget.style.background = 'rgba(169,138,125,.05)' }}
                >{q}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Category jump strip ── */}
      {!isSearching && (
        <div style={{
          background: '#0e0e0e',
          borderBottom: '1px solid #353534',
          overflowX: 'auto',
          position: 'sticky', top: 0, zIndex: 40,
        }} className="gcs-header">
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', padding: '0 16px' }}>
            {cats.map(c => {
              const p = PAL[c]
              return (
                <a
                  key={c}
                  href={`#section-${c}`}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '.6rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: 'rgba(169,138,125,.45)',
                    textDecoration: 'none',
                    padding: '12px 10px',
                    whiteSpace: 'nowrap',
                    borderBottom: '2px solid transparent',
                    transition: 'color .15s, border-color .15s',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = p.a; el.style.borderBottomColor = p.a }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(169,138,125,.45)'; el.style.borderBottomColor = 'transparent' }}
                >
                  {CATEGORY_CONFIG[c].label}
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {isSearching ? (
          /* ── Search results ── */
          <div>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #353534',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.76rem', color: '#a98a7d',
              }}>
                <span style={{ color: '#ff6b00', fontWeight: 700 }}>{filtered.length}</span>
                {' '}result{filtered.length !== 1 ? 's' : ''} for{' '}
                <span style={{ color: '#e5e2e1', fontStyle: 'italic' }}>"{query}"</span>
              </span>
              <button
                onClick={() => setQuery('')}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.62rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: 'rgba(169,138,125,.4)', background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color .12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ff6b00' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(169,138,125,.4)' }}
              >Clear ×</button>
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '48px 20px', textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.86rem', color: 'rgba(169,138,125,.4)',
                }}>No results. Try a different term.</p>
              </div>
            ) : (
              <div>
                {filtered.map(entry => (
                  <EntryRow key={entry.id} entry={entry} showCat query={query} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Category sections ── */
          <div>
            {cats.map(slug => {
              const entries = bycat[slug] ?? []
              const cat = CATEGORY_CONFIG[slug]
              const p = PAL[slug]
              return (
                <section
                  key={slug}
                  id={`section-${slug}`}
                  style={{ borderBottom: '1px solid #353534' }}
                >
                  {/* Section header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 20px 14px',
                    borderBottom: `1px solid ${p.br}55`,
                    background: `${p.b}55`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 3, height: 14, background: p.a, borderRadius: 1 }} />
                      <span style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '.62rem', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '.16em',
                        color: p.a,
                      }}>{cat.label}</span>
                      <span style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '.62rem', color: 'rgba(169,138,125,.35)',
                        letterSpacing: '.06em',
                      }}>{entries.length} topics</span>
                    </div>
                    <Link
                      href={`/${slug}`}
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '.6rem', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        color: 'rgba(169,138,125,.35)',
                        textDecoration: 'none',
                        transition: 'color .12s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = p.a }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(169,138,125,.35)' }}
                    >
                      View all →
                    </Link>
                  </div>

                  {/* Entry rows */}
                  {entries.map(entry => (
                    <EntryRow key={entry.id} entry={entry} />
                  ))}
                </section>
              )
            })}
          </div>
        )}
      </div>

      <SeoArticleSection />
      <div style={{ height: 80 }} />

      <style>{`
        .ref-row:hover {
          background: rgba(255,255,255,.025) !important;
        }
        .ref-row:hover .ref-row-arrow {
          color: var(--row-accent, #ff6b00) !important;
          transform: translateX(3px) !important;
        }
        ${cats.map(c => `
          .ref-row[data-cat="${c}"]:hover {
            border-left-color: ${PAL[c].a} !important;
          }
          .ref-row[data-cat="${c}"]:hover .ref-row-arrow {
            color: ${PAL[c].a} !important;
          }
        `).join('')}

        @media (max-width: 600px) {
          .ref-row-summary { display: none !important; }
          .ref-row-title { min-width: unset !important; flex: 1 !important; }
        }
      `}</style>
    </main>
  )
}
