'use client'
import { CATEGORIES, PAL } from '../data/guitarData'
import { FONT, FS, COLOR, PAD, RADIUS } from '../theme'
import type { GuitarEntry, CategorySlug } from '../types'
import Card from './Card'
import { ArrowRight } from 'lucide-react'

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

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <span style={{
          fontFamily: FONT.mono,
          fontSize: FS.sm,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'rgba(169,138,125,.45)',
          whiteSpace: 'nowrap',
        }}>Browse by Category</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(169,138,125,.08)' }} />
      </div>

      {/* Category cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 10,
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
                background: 'rgba(28,27,27,.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(169,138,125,.09)',
                borderRadius: RADIUS.xl,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform .14s, border-color .14s, box-shadow .14s',
                position: 'relative',
                boxShadow: 'inset 0 1px 0 rgba(255,182,147,.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = `${p.br}55`
                e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,.5), 0 0 0 1px ${p.br}33, inset 0 1px 0 rgba(255,182,147,.05)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(169,138,125,.09)'
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,182,147,.04)'
              }}
            >
              {/* Left accent strip */}
              <div style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: 2,
                background: `linear-gradient(180deg, ${p.a}, ${p.a}33)`,
              }} />

              <div style={{ padding: PAD.catCard }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: 8,
                }}>
                  <span style={{
                    fontFamily: FONT.mono,
                    fontSize: FS.base,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: p.a,
                    background: p.b,
                    border: `1px solid ${p.br}44`,
                    borderRadius: RADIUS.sm,
                    padding: '3px 10px',
                  }}>{p.label}</span>
                  <span style={{
                    fontFamily: FONT.mono,
                    fontSize: FS.xs,
                    color: 'rgba(169,138,125,.45)',
                    background: 'rgba(169,138,125,.06)',
                    borderRadius: RADIUS.xs,
                    padding: '3px 8px',
                  }}>{items.length} topics</span>
                </div>

                <p style={{
                  fontFamily: FONT.body,
                  fontSize: FS.monoLg,
                  color: '#a98a7d',
                  lineHeight: 1.5,
                  marginBottom: 14,
                  fontStyle: 'italic',
                }}>{p.desc}</p>

                <div style={{ marginBottom: 14 }}>
                  {preview.map(item => (
                    <div key={item.id} style={{
                      fontFamily: FONT.body,
                      fontSize: FS.monoLg,
                      color: '#e2bfb0',
                      padding: '2px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                      <span style={{ color: p.a, fontSize: FS.xxs, opacity: .8 }}>◆</span>
                      {item.title}
                    </div>
                  ))}
                  {more > 0 && (
                    <div style={{
                      fontFamily: FONT.mono,
                      fontSize: FS.sm,
                      color: 'rgba(169,138,125,.35)',
                      paddingTop: 4,
                      paddingLeft: 18,
                    }}>+{more} more</div>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontFamily: FONT.mono,
                  fontSize: FS.base,
                  fontWeight: 700,
                  color: p.a,
                  letterSpacing: '0.08em',
                }}>
                  Explore {p.label}
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Featured section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span style={{
          fontFamily: FONT.mono,
          fontSize: FS.sm,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'rgba(169,138,125,.45)',
          whiteSpace: 'nowrap',
        }}>Essential Starting Points</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(169,138,125,.08)' }} />
      </div>
      <p style={{
        fontFamily: FONT.body,
        fontSize: FS.monoLg,
        color: 'rgba(169,138,125,.4)',
        marginBottom: 22,
        fontStyle: 'italic',
      }}>The six topics every guitarist should know first</p>

      <div style={{ columns: '340px', columnGap: 12 }}>
        {featured.map(item => (
          <div key={item.id} style={{ breakInside: 'avoid', marginBottom: 12 }}>
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
