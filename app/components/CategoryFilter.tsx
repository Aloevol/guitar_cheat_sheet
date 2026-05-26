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
        const activeColor = p?.a || '#ff6b00'
        const activeBg    = p?.b || 'rgba(255,107,0,.1)'
        const activeBr    = p?.br || 'rgba(255,107,0,.35)'

        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '.62rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '5px 13px',
              borderRadius: 9999,
              border: isActive ? `1px solid ${activeBr}55` : '1px solid rgba(169,138,125,.1)',
              background: isActive ? activeBg : 'rgba(30,29,28,.7)',
              color: isActive ? activeColor : '#a98a7d',
              cursor: 'pointer',
              transition: 'all .12s',
              boxShadow: isActive
                ? `0 0 10px ${activeBr}44, inset 0 1px 0 rgba(255,182,147,.05)`
                : 'inset 0 1px 0 rgba(255,255,255,.02)',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = `${activeBr}44`
                e.currentTarget.style.color = activeColor
                e.currentTarget.style.background = `${activeBg}55`
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'rgba(169,138,125,.1)'
                e.currentTarget.style.color = '#a98a7d'
                e.currentTarget.style.background = 'rgba(30,29,28,.7)'
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
