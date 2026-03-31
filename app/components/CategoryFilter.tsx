'use client'
import type { CategoryConfigMap } from '../types'

interface CategoryFilterProps {
  categories: readonly string[]
  active: string
  onChange: (cat: string) => void
  pal: CategoryConfigMap
}

export default function CategoryFilter({ categories, active, onChange, pal }: CategoryFilterProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5,
      justifyContent: 'center',
      marginTop: 18,
      padding: '0 16px',
    }}>
      {categories.map(c => {
        const isActive = active === c
        const p = c !== 'all' ? pal[c as keyof CategoryConfigMap] : null
        const activeColor = p?.a || '#f0c93a'
        const activeBg    = p?.b || 'rgba(240,201,58,.12)'
        const activeBr    = p?.br || 'rgba(240,201,58,.35)'

        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '.62rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '6px 14px',
              borderRadius: 20,
              border: isActive ? `1px solid ${activeBr}` : '1px solid rgba(255,255,255,.07)',
              background: isActive ? activeBg : 'transparent',
              color: isActive ? activeColor : 'rgba(255,255,255,.28)',
              cursor: 'pointer',
              transition: 'all .15s',
              boxShadow: isActive ? `0 0 12px ${activeBr}` : 'none',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = activeBr
                e.currentTarget.style.color = activeColor
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'
                e.currentTarget.style.color = 'rgba(255,255,255,.28)'
              }
            }}
          >
            {c === 'all' ? 'All' : p?.label || c}
          </button>
        )
      })}
    </div>
  )
}
