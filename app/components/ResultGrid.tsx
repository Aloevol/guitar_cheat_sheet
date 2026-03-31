'use client'
import type { GuitarEntry, CategoryConfigMap } from '../types'
import Card from './Card'

interface ResultGridProps {
  items: GuitarEntry[]
  query: string
  cat: string
  openIds: Set<string>
  onToggle: (id: string) => void
  onClear: () => void
  pal: CategoryConfigMap
}

export default function ResultGrid({ items, query, cat, openIds, onToggle, onClear, pal }: ResultGridProps) {
  const label = cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.label : 'All Topics'
  const catColor = cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.a : '#f0c93a'
  const queryLabel = query.trim()

  return (
    <div style={{ padding: '0 24px 64px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
        paddingBottom: 14,
        borderBottom: '1px solid rgba(255,255,255,.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '.72rem',
            fontWeight: 700,
            color: catColor,
            background: cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.b : 'rgba(240,201,58,.1)',
            border: `1px solid ${cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.br : 'rgba(240,201,58,.25)'}`,
            borderRadius: 5,
            padding: '3px 10px',
          }}>{items.length} result{items.length !== 1 ? 's' : ''}</span>

          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '.65rem',
            color: 'rgba(255,255,255,.3)',
          }}>
            in <span style={{ color: 'rgba(255,255,255,.55)' }}>{label}</span>
            {queryLabel && (
              <> for <span style={{ color: catColor }}>&ldquo;{queryLabel}&rdquo;</span></>
            )}
          </span>
        </div>

        <button
          onClick={onClear}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '.62rem',
            background: 'rgba(255,255,255,.04)',
            border: '1px solid rgba(255,255,255,.1)',
            color: 'rgba(255,255,255,.4)',
            borderRadius: 6,
            padding: '5px 12px',
            cursor: 'pointer',
            transition: 'all .15s',
            letterSpacing: '0.04em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,.08)'
            e.currentTarget.style.color = 'rgba(255,255,255,.7)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,.04)'
            e.currentTarget.style.color = 'rgba(255,255,255,.4)'
          }}
        >✕ Clear</button>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '72px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 18, opacity: 0.2 }}>𝄞</div>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.3rem',
            color: 'rgba(255,255,255,.25)',
            marginBottom: 10,
          }}>No results</div>
          <div style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '.78rem',
            color: 'rgba(255,255,255,.15)',
            fontStyle: 'italic',
          }}>Try searching for a scale name, technique, or chord type</div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 14,
        }}>
          {items.map(item => (
            <Card
              key={item.id}
              item={item}
              open={openIds.has(item.id)}
              onToggle={() => onToggle(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
