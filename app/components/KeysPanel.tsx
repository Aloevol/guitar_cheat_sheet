'use client'
import { useState } from 'react'
import { PAL } from '../data/guitarData'
import type { GuitarEntry } from '../types'

interface KeysPanelProps {
  item: GuitarEntry
}

export default function KeysPanel({ item }: KeysPanelProps) {
  const [activeKey, setActiveKey] = useState(item.example?.root || 'C')
  const p = PAL[item.category]

  if (!item.allKeys || item.allKeys.length === 0) return null

  const keyData = item.allKeys.find(k => k.root === activeKey) || item.allKeys[0]

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '.58rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: p.a,
          opacity: 0.8,
        }}>All 12 Keys</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.06)' }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
        {item.allKeys.map(k => {
          const isActive = k.root === activeKey
          const isSharpFlat = k.root.includes('♭') || k.root.includes('♯')
          return (
            <button
              key={k.root}
              onClick={() => setActiveKey(k.root)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '.65rem',
                fontWeight: 700,
                padding: '5px 8px',
                borderRadius: 5,
                border: isActive ? `1.5px solid ${p.a}` : '1.5px solid rgba(255,255,255,.08)',
                background: isActive
                  ? p.b
                  : isSharpFlat
                    ? 'rgba(255,255,255,.04)'
                    : 'rgba(255,255,255,.02)',
                color: isActive ? p.a : isSharpFlat ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.25)',
                cursor: 'pointer',
                transition: 'all .12s',
                minWidth: 36,
                boxShadow: isActive ? `0 0 10px ${p.br}` : 'none',
              }}
            >{k.root}</button>
          )
        })}
      </div>

      {keyData.notes && keyData.notes.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '.55rem',
            color: 'rgba(255,255,255,.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 7,
          }}>Notes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {keyData.notes.map((n, i) => {
              const isRoot = i === 0
              const isLast = i === keyData.notes.length - 1 && n === keyData.notes[0]
              return (
                <span key={i} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '.8rem',
                  fontWeight: isRoot ? 800 : 600,
                  padding: '4px 10px',
                  borderRadius: 5,
                  background: isRoot ? p.b : isLast ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.05)',
                  border: isRoot
                    ? `1.5px solid ${p.br}`
                    : isLast
                      ? `1px dashed rgba(255,255,255,.08)`
                      : '1px solid rgba(255,255,255,.08)',
                  color: isRoot ? p.a : isLast ? 'rgba(255,255,255,.25)' : '#c8baa0',
                  boxShadow: isRoot ? `0 0 12px ${p.br}` : 'none',
                  position: 'relative',
                }}>
                  {n}
                  {isRoot && (
                    <span style={{
                      position: 'absolute',
                      bottom: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '.42rem',
                      color: p.a,
                      opacity: 0.7,
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>root</span>
                  )}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {keyData.chords && keyData.chords.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '.55rem',
            color: 'rgba(255,255,255,.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}>Chord Family</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {keyData.chords.map((c, i) => {
              const isFirst = i === 0
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 10px',
                  borderRadius: 5,
                  background: isFirst ? p.b : 'rgba(255,255,255,.03)',
                  border: isFirst ? `1px solid ${p.br}` : '1px solid rgba(255,255,255,.06)',
                }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '.7rem',
                    color: isFirst ? p.a : '#9a8c74',
                    fontWeight: isFirst ? 700 : 400,
                  }}>{c}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
