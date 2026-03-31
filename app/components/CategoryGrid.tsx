'use client'
import { CATEGORIES, PAL } from '../data/guitarData'
import type { GuitarEntry, CategorySlug } from '../types'
import Card from './Card'

interface CategoryGridProps {
  bycat: Record<string, GuitarEntry[]>
  featured: GuitarEntry[]
  openIds: Set<string>
  onToggle: (id: string) => void
  onCatSelect: (cat: string) => void
}

export default function CategoryGrid({ bycat, featured, openIds, onToggle, onCatSelect }: CategoryGridProps) {
  const cats = CATEGORIES.filter(c => c !== 'all')

  return (
    <div style={{ padding: '0 24px 64px', maxWidth: 1400, margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '.58rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: 'rgba(255,255,255,.2)',
          whiteSpace: 'nowrap',
        }}>Browse by Category</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.05)' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: 12,
        marginBottom: 64,
      }}>
        {cats.map(c => {
          const p = PAL[c as CategorySlug]
          const items = bycat[c] || []
          const preview = items.slice(0, 3)
          const more = items.length - 3

          return (
            <div
              key={c}
              onClick={() => onCatSelect(c)}
              style={{
                background: '#131110',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 10,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform .15s, border-color .15s, box-shadow .15s',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = p.br
                e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,.5), 0 0 0 1px ${p.br}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: 3,
                background: `linear-gradient(180deg, ${p.a}, ${p.a}44)`,
              }} />

              <div style={{ padding: '16px 16px 16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '.62rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: p.a,
                    background: p.b,
                    border: `1px solid ${p.br}`,
                    borderRadius: 4,
                    padding: '2px 8px',
                  }}>{p.label}</span>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '.58rem',
                    color: 'rgba(255,255,255,.2)',
                    background: 'rgba(255,255,255,.04)',
                    borderRadius: 3,
                    padding: '1px 6px',
                  }}>{items.length} topics</span>
                </div>

                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: '.73rem',
                  color: 'rgba(255,255,255,.35)',
                  lineHeight: 1.5,
                  marginBottom: 12,
                  fontStyle: 'italic',
                }}>{p.desc}</p>

                <div style={{ marginBottom: 12 }}>
                  {preview.map(item => (
                    <div key={item.id} style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: '.71rem',
                      color: 'rgba(255,255,255,.3)',
                      padding: '2px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                    }}>
                      <span style={{ color: p.a, fontSize: '.5rem', opacity: .7 }}>◆</span>
                      {item.title}
                    </div>
                  ))}
                  {more > 0 && (
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '.58rem',
                      color: 'rgba(255,255,255,.15)',
                      paddingTop: 3,
                      paddingLeft: 17,
                    }}>+{more} more</div>
                  )}
                </div>

                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '.6rem',
                  fontWeight: 700,
                  color: p.a,
                  letterSpacing: '0.08em',
                  opacity: 0.8,
                }}>Explore {p.label} →</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '.58rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: 'rgba(255,255,255,.2)',
          whiteSpace: 'nowrap',
        }}>Essential Starting Points</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.05)' }} />
      </div>
      <p style={{
        fontFamily: "'Lora', Georgia, serif",
        fontSize: '.73rem',
        color: 'rgba(255,255,255,.2)',
        marginBottom: 20,
        fontStyle: 'italic',
      }}>The six topics every guitarist should know first</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 14,
      }}>
        {featured.map(item => (
          <Card
            key={item.id}
            item={item}
            open={openIds.has(item.id)}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  )
}
