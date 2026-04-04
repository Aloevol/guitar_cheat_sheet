'use client'
import { CATEGORIES, PAL } from '../data/guitarData'
import { FONT, FS, BG, COLOR, PAD, RADIUS } from '../theme'
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
          fontFamily: FONT.mono,
          fontSize: FS.sm,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: COLOR.faint,
          whiteSpace: 'nowrap',
        }}>Browse by Category</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.05)' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
                background: BG.catCard,
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: RADIUS.xxl,
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

              <div style={{ padding: PAD.catCard }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{
                    fontFamily: FONT.mono,
                    fontSize: FS.base,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: p.a,
                    background: p.b,
                    border: `1px solid ${p.br}`,
                    borderRadius: RADIUS.sm,
                    padding: '4px 11px',
                  }}>{p.label}</span>
                  <span style={{
                    fontFamily: FONT.mono,
                    fontSize: FS.xs,
                    color: 'rgba(255,255,255,.28)',
                    background: 'rgba(255,255,255,.05)',
                    borderRadius: RADIUS.xs,
                    padding: '3px 8px',
                  }}>{items.length} topics</span>
                </div>

                <p style={{
                  fontFamily: FONT.body,
                  fontSize: FS.monoLg,
                  color: COLOR.detail,
                  lineHeight: 1.5,
                  marginBottom: 14,
                  fontStyle: 'italic',
                }}>{p.desc}</p>

                <div style={{ marginBottom: 12 }}>
                  {preview.map(item => (
                    <div key={item.id} style={{
                      fontFamily: FONT.body,
                      fontSize: FS.monoLg,
                      color: COLOR.detail,
                      padding: '2px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                    }}>
                      <span style={{ color: p.a, fontSize: FS.xxs, opacity: .9 }}>◆</span>
                      {item.title}
                    </div>
                  ))}
                  {more > 0 && (
                    <div style={{
                      fontFamily: FONT.mono,
                      fontSize: FS.sm,
                      color: 'rgba(255,255,255,.2)',
                      paddingTop: 4,
                      paddingLeft: 17,
                    }}>+{more} more</div>
                  )}
                </div>

                <div style={{
                  fontFamily: FONT.mono,
                  fontSize: FS.base,
                  fontWeight: 700,
                  color: p.a,
                  letterSpacing: '0.08em',
                  opacity: 0.9,
                }}>Explore {p.label} →</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{
          fontFamily: FONT.mono,
          fontSize: FS.sm,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: COLOR.faint,
          whiteSpace: 'nowrap',
        }}>Essential Starting Points</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.05)' }} />
      </div>
      <p style={{
        fontFamily: FONT.body,
        fontSize: FS.monoLg,
        color: 'rgba(255,255,255,.28)',
        marginBottom: 22,
        fontStyle: 'italic',
      }}>The six topics every guitarist should know first</p>

      <div style={{ columns: '340px', columnGap: 14 }}>
        {featured.map(item => (
          <div key={item.id} style={{ breakInside: 'avoid', marginBottom: 14 }}>
            <Card
              item={item}
              open={openIds.has(item.id)}
              onToggle={() => onToggle(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
