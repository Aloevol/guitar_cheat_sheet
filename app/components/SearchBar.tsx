'use client'

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
          left: 14,
          color: hasQuery ? 'rgba(240,201,58,.6)' : 'rgba(255,255,255,.2)',
          pointerEvents: 'none',
          lineHeight: 1,
          transition: 'color .2s',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>

        <input
          type="text"
          value={query}
          onChange={e => onChange(e.target.value)}
          placeholder="Search scales, modes, chords, techniques…"
          style={{
            width: '100%',
            background: hasQuery ? 'rgba(240,201,58,.04)' : 'rgba(255,255,255,.03)',
            border: hasQuery ? '1px solid rgba(240,201,58,.35)' : '1px solid rgba(255,255,255,.08)',
            borderRadius: 10,
            padding: '13px 42px 13px 44px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '.8rem',
            color: '#f0e6c8',
            outline: 'none',
            boxShadow: hasQuery ? '0 0 0 3px rgba(240,201,58,.08)' : 'none',
            transition: 'border-color .2s, box-shadow .2s, background .2s',
          }}
          onFocus={e => {
            if (!hasQuery) {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,.18)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,.04)'
            }
          }}
          onBlur={e => {
            if (!hasQuery) {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        />

        {hasQuery && (
          <button
            onClick={() => onChange('')}
            style={{
              position: 'absolute',
              right: 10,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,.08)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: '50%',
              color: 'rgba(255,255,255,.5)',
              fontSize: '.7rem',
              cursor: 'pointer',
              transition: 'background .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.15)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)' }}
          >✕</button>
        )}
      </div>

      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '.57rem',
        color: 'rgba(255,255,255,.16)',
        marginTop: 8,
        textAlign: 'center',
        letterSpacing: '0.03em',
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
            fontFamily: "'Space Mono', monospace",
            fontSize: '.57rem',
            color: 'rgba(255,255,255,.18)',
            marginRight: 2,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>Quick:</span>
          {quickSearches.map(q => (
            <button
              key={q}
              onClick={() => onQuick(q)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '.6rem',
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 14,
                padding: '4px 10px',
                color: 'rgba(255,255,255,.3)',
                cursor: 'pointer',
                transition: 'all .15s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(240,201,58,.35)'
                e.currentTarget.style.color = '#f0c93a'
                e.currentTarget.style.background = 'rgba(240,201,58,.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'
                e.currentTarget.style.color = 'rgba(255,255,255,.3)'
                e.currentTarget.style.background = 'rgba(255,255,255,.03)'
              }}
            >{q}</button>
          ))}
        </div>
      )}
    </div>
  )
}
