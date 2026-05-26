'use client'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  query: string
  onChange: (value: string) => void
  quickSearches: string[]
  onQuick: (q: string) => void
  isSearching: boolean
}

export default function SearchBar({ query, onChange, quickSearches, onQuick, isSearching }: SearchBarProps) {
  const hasQuery = query.trim() !== ''

  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: '0 16px' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <span style={{
          position: 'absolute',
          left: 13,
          color: hasQuery ? '#ff6b00' : 'rgba(169,138,125,.4)',
          pointerEvents: 'none',
          lineHeight: 1,
          transition: 'color .2s',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Search size={15} />
        </span>

        <input
          type="text"
          value={query}
          onChange={e => onChange(e.target.value)}
          placeholder="Search scales, modes, chords, techniques…"
          style={{
            width: '100%',
            background: hasQuery
              ? 'rgba(255,107,0,.05)'
              : 'rgba(30,29,28,.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: hasQuery
              ? '1px solid rgba(255,107,0,.3)'
              : '1px solid rgba(169,138,125,.12)',
            borderRadius: 6,
            padding: '13px 42px 13px 42px',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '.8rem',
            color: '#e5e2e1',
            outline: 'none',
            boxShadow: hasQuery
              ? '0 0 0 3px rgba(255,107,0,.07), inset 0 1px 0 rgba(255,182,147,.05)'
              : 'inset 0 1px 0 rgba(255,255,255,.03)',
            transition: 'border-color .2s, box-shadow .2s, background .2s',
          }}
          onFocus={e => {
            if (!hasQuery) {
              e.currentTarget.style.borderColor = 'rgba(169,138,125,.25)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(169,138,125,.06), inset 0 1px 0 rgba(255,255,255,.03)'
            }
          }}
          onBlur={e => {
            if (!hasQuery) {
              e.currentTarget.style.borderColor = 'rgba(169,138,125,.12)'
              e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,.03)'
            }
          }}
        />

        {hasQuery && (
          <button
            onClick={() => onChange('')}
            style={{
              position: 'absolute',
              right: 10,
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(169,138,125,.1)',
              border: '1px solid rgba(169,138,125,.15)',
              borderRadius: '50%',
              color: '#a98a7d',
              cursor: 'pointer',
              transition: 'background .12s, color .12s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,107,0,.12)'
              e.currentTarget.style.color = '#ff6b00'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(169,138,125,.1)'
              e.currentTarget.style.color = '#a98a7d'
            }}
          >
            <X size={11} />
          </button>
        )}
      </div>

      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '.57rem',
        color: 'rgba(169,138,125,.3)',
        marginTop: 8,
        textAlign: 'center',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>Try: pentatonic · vibrato · jazz · Phrygian · suspend · Keith Richards</p>

      {!isSearching && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 5,
          justifyContent: 'center',
          marginTop: 12,
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '.57rem',
            color: 'rgba(169,138,125,.3)',
            marginRight: 2,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>Quick:</span>
          {quickSearches.map(q => (
            <button
              key={q}
              onClick={() => onQuick(q)}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.6rem',
                background: 'rgba(169,138,125,.05)',
                border: '1px solid rgba(169,138,125,.1)',
                borderRadius: 4,
                padding: '4px 10px',
                color: 'rgba(169,138,125,.45)',
                cursor: 'pointer',
                transition: 'all .12s',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,107,0,.3)'
                e.currentTarget.style.color = '#ff6b00'
                e.currentTarget.style.background = 'rgba(255,107,0,.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(169,138,125,.1)'
                e.currentTarget.style.color = 'rgba(169,138,125,.45)'
                e.currentTarget.style.background = 'rgba(169,138,125,.05)'
              }}
            >{q}</button>
          ))}
        </div>
      )}
    </div>
  )
}
