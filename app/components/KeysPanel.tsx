'use client'
import { useState } from 'react'
import { PAL } from '../data/guitarData'
import { FONT, FS, COLOR, RADIUS } from '../theme'
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
          fontFamily: FONT.mono,
          fontSize: FS.sm,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: p.a,
          opacity: 0.9,
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
                fontFamily: FONT.mono,
                fontSize: FS.keys,
                fontWeight: 700,
                padding: '7px 11px',
                borderRadius: RADIUS.md,
                border: isActive ? `1.5px solid ${p.a}` : '1.5px solid rgba(255,255,255,.1)',
                background: isActive
                  ? p.b
                  : isSharpFlat ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.03)',
                color: isActive ? p.a : isSharpFlat ? 'rgba(255,255,255,.42)' : 'rgba(255,255,255,.32)',
                cursor: 'pointer',
                transition: 'all .12s',
                minWidth: 44,
                boxShadow: isActive ? `0 0 12px ${p.br}` : 'none',
              }}
            >{k.root}</button>
          )
        })}
      </div>

      {keyData.notes && keyData.notes.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontFamily: FONT.mono,
            fontSize: FS.xs,
            color: COLOR.dimmed,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 9,
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
                  fontFamily: FONT.mono,
                  fontSize: FS.note,
                  fontWeight: isRoot ? 800 : 600,
                  padding: '6px 13px',
                  borderRadius: RADIUS.md,
                  background: isRoot ? p.b : isLast ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.05)',
                  border: isRoot
                    ? `1.5px solid ${p.br}`
                    : isLast
                      ? `1px dashed rgba(255,255,255,.08)`
                      : '1px solid rgba(255,255,255,.08)',
                  color: isRoot ? p.a : isLast ? 'rgba(255,255,255,.25)' : COLOR.noteBody,
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
                      fontFamily: FONT.mono,
                      fontSize: FS.nano,
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
            fontFamily: FONT.mono,
            fontSize: FS.xs,
            color: COLOR.dimmed,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 9,
          }}>Chord Family</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {keyData.chords.map((c, i) => {
              const isFirst = i === 0
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: RADIUS.md,
                  background: isFirst ? p.b : 'rgba(255,255,255,.03)',
                  border: isFirst ? `1px solid ${p.br}` : '1px solid rgba(255,255,255,.06)',
                }}>
                  <span style={{
                    fontFamily: FONT.mono,
                    fontSize: FS.mono,
                    color: isFirst ? p.a : COLOR.chordBody,
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
