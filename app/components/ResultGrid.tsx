'use client'
import { FONT, FS, COLOR, RADIUS } from '../theme'
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
            fontFamily: FONT.mono,
            fontSize: FS.monoLg,
            fontWeight: 700,
            color: catColor,
            background: cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.b : 'rgba(240,201,58,.1)',
            border: `1px solid ${cat !== 'all' ? pal[cat as keyof CategoryConfigMap]?.br : 'rgba(240,201,58,.25)'}`,
            borderRadius: RADIUS.md,
            padding: '3px 10px',
          }}>{items.length} result{items.length !== 1 ? 's' : ''}</span>

          <span style={{
            fontFamily: FONT.mono,
            fontSize: FS.keys,
            color: COLOR.muted,
          }}>
            in <span style={{ color: 'rgba(255,255,255,.7)' }}>{label}</span>
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
            background: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(255,255,255,.12)',
            color: 'rgba(255,255,255,.5)',
            borderRadius: RADIUS.lg,
            padding: '7px 15px',
            cursor: 'pointer',
            transition: 'all .15s',
            letterSpacing: '0.04em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,.08)'
            e.currentTarget.style.color = 'rgba(255,255,255,.7)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,.05)'
            e.currentTarget.style.color = 'rgba(255,255,255,.5)'
          }}
        >✕ Clear</button>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '72px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 18, opacity: 0.2 }}>𝄞</div>
          <div style={{
            fontFamily: FONT.display,
            fontSize: FS.hero,
            color: 'rgba(255,255,255,.25)',
            marginBottom: 10,
          }}>No results</div>
          <div style={{
            fontFamily: FONT.body,
            fontSize: FS.detail,
            color: 'rgba(255,255,255,.22)',
            fontStyle: 'italic',
          }}>Try searching for a scale name, technique, or chord type</div>
        </div>
      ) : (
        <div style={{ columns: '340px', columnGap: 14 }}>
          {items.map(item => (
            <div key={item.id} style={{ breakInside: 'avoid', marginBottom: 14 }}>
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
