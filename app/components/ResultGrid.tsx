'use client'
import { FONT, FS, RADIUS } from '../theme'
import type { GuitarEntry, CategoryConfigMap } from '../types'
import Card from './Card'
import { X } from 'lucide-react'

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
  const catColor = cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.a : '#ff6b00'
  const catBg    = cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.b : 'rgba(255,107,0,.1)'
  const catBr    = cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.br : 'rgba(255,107,0,.3)'
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
        borderBottom: '1px solid rgba(169,138,125,.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: FONT.mono,
            fontSize: FS.monoLg,
            fontWeight: 700,
            color: catColor,
            background: catBg,
            border: `1px solid ${catBr}55`,
            borderRadius: RADIUS.sm,
            padding: '3px 10px',
          }}>{items.length} result{items.length !== 1 ? 's' : ''}</span>

          <span style={{
            fontFamily: FONT.mono,
            fontSize: FS.keys,
            color: '#a98a7d',
          }}>
            in <span style={{ color: '#e2bfb0' }}>{label}</span>
            {queryLabel && (
              <> for <span style={{ color: catColor }}>&ldquo;{queryLabel}&rdquo;</span></>
            )}
          </span>
        </div>

        <button
          onClick={onClear}
          style={{
            fontFamily: FONT.mono,
            fontSize: FS.base,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'rgba(169,138,125,.07)',
            border: '1px solid rgba(169,138,125,.14)',
            color: '#a98a7d',
            borderRadius: RADIUS.sm,
            padding: '6px 14px',
            cursor: 'pointer',
            transition: 'all .12s',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,107,0,.08)'
            e.currentTarget.style.borderColor = 'rgba(255,107,0,.25)'
            e.currentTarget.style.color = '#ff6b00'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(169,138,125,.07)'
            e.currentTarget.style.borderColor = 'rgba(169,138,125,.14)'
            e.currentTarget.style.color = '#a98a7d'
          }}
        >
          <X size={12} />
          Clear
        </button>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '72px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 18, opacity: 0.15 }}>𝄞</div>
          <div style={{
            fontFamily: FONT.display,
            fontSize: FS.hero,
            color: 'rgba(169,138,125,.25)',
            marginBottom: 10,
          }}>No results</div>
          <div style={{
            fontFamily: FONT.body,
            fontSize: FS.detail,
            color: 'rgba(169,138,125,.2)',
            fontStyle: 'italic',
          }}>Try searching for a scale name, technique, or chord type</div>
        </div>
      ) : (
        <div style={{ columns: '340px', columnGap: 12 }}>
          {items.map(item => (
            <div key={item.id} style={{ breakInside: 'avoid', marginBottom: 12 }}>
              <Card
                item={item}
                open={openIds.has(item.id)}
                onToggle={() => onToggle(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
