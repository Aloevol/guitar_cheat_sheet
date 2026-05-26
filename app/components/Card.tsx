'use client'
import { PAL } from '../data/guitarData'
import { FRETBOARDS } from '../data/fretboards'
import { FONT, FS, COLOR, PAD, RADIUS } from '../theme'
import type { GuitarEntry } from '../types'
import NotePill from './NotePill'
import FormulaSteps from './FormulaSteps'
import KeysPanel from './KeysPanel'
import SectionLabel from './SectionLabel'
import FretboardDiagram from './FretboardDiagram'
import { ChevronDown } from 'lucide-react'

interface CardProps {
  item: GuitarEntry
  open: boolean
  onToggle: () => void
}

export default function Card({ item, open, onToggle }: CardProps) {
  const p = PAL[item.category]
  const shortNotes = item.example?.notes?.every(n => n.length <= 6)
  const hasKeys = item.allKeys && item.allKeys.length > 0
  const diagrams = FRETBOARDS[item.id] ?? []

  return (
    <div
      onClick={onToggle}
      style={{
        background: open
          ? 'rgba(38, 35, 33, 0.85)'
          : 'rgba(30, 29, 28, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${open ? `${p.br}55` : 'rgba(169,138,125,.1)'}`,
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color .2s, box-shadow .2s, background .2s, transform .12s',
        boxShadow: open
          ? `0 0 0 1px ${p.br}44, 0 8px 32px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,182,147,.06)`
          : '0 2px 12px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,182,147,.05)',
        transform: open ? 'translateY(-1px)' : 'translateY(0)',
      }}
      onMouseEnter={e => {
        if (!open) {
          e.currentTarget.style.borderColor = 'rgba(169,138,125,.2)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,182,147,.06)'
        }
      }}
      onMouseLeave={e => {
        if (!open) {
          e.currentTarget.style.borderColor = 'rgba(169,138,125,.1)'
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,182,147,.05)'
        }
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${p.a}, ${p.a}66, transparent)` }} />

      {/* Card header */}
      <div style={{ padding: PAD.cardHeader }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{
              fontFamily: FONT.mono,
              fontSize: FS.sm,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: p.a,
              background: p.b,
              border: `1px solid ${p.br}55`,
              borderRadius: RADIUS.sm,
              padding: '3px 9px',
            }}>{p.label}</span>
            {item.example?.root && (
              <span style={{
                fontFamily: FONT.mono,
                fontSize: FS.xxs,
                color: '#a98a7d',
                background: 'rgba(169,138,125,.07)',
                border: '1px solid rgba(169,138,125,.12)',
                borderRadius: RADIUS.xs,
                padding: '3px 7px',
              }}>ex. {item.example.root}</span>
            )}
          </div>
          <div
            onClick={e => { e.stopPropagation(); onToggle() }}
            style={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: open ? p.b : 'rgba(169,138,125,.06)',
              border: open ? `1px solid ${p.br}44` : '1px solid rgba(169,138,125,.1)',
              color: open ? p.a : '#a98a7d',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform .2s, background .2s, border-color .2s, color .2s',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <ChevronDown size={14} />
          </div>
        </div>

        <div style={{
          fontFamily: FONT.display,
          fontSize: FS.title,
          fontWeight: 700,
          color: '#e5e2e1',
          marginBottom: 6,
          lineHeight: 1.25,
          letterSpacing: '-.01em',
        }}>{item.title}</div>

        <div style={{
          fontFamily: FONT.body,
          fontSize: FS.body,
          color: '#e2bfb0',
          lineHeight: 1.6,
          marginBottom: shortNotes && item.example?.notes?.length ? 10 : 0,
        }}>{item.summary}</div>

        {shortNotes && item.example?.notes && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 9 }}>
            {item.example.notes.map((n, i) => (
              <NotePill key={i} n={n} root={i === 0} pal={p} />
            ))}
          </div>
        )}
      </div>

      {/* Expanded body */}
      {open && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            borderTop: '1px solid rgba(169,138,125,.08)',
            background: 'rgba(20,19,18,.6)',
            padding: PAD.cardBody,
          }}
        >
          {diagrams.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <SectionLabel accent={p.a}>Fretboard</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {diagrams.map(diagram => (
                  <div
                    key={diagram.id}
                    style={{
                      background: 'rgba(0,0,0,.4)',
                      border: `1px solid ${p.br}33`,
                      borderRadius: RADIUS.xl,
                      padding: '14px 16px',
                    }}
                  >
                    <FretboardDiagram diagram={diagram} accentColor={p.a} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 18 }}>
            <SectionLabel accent={p.a}>Formula</SectionLabel>
            <FormulaSteps formula={item.formula} pal={p} />
          </div>

          {item.degrees && (
            <div style={{ marginBottom: 18 }}>
              <SectionLabel accent={p.a}>Degrees / Intervals</SectionLabel>
              <div style={{
                fontFamily: FONT.mono,
                fontSize: FS.monoLg,
                color: '#e2bfb0',
                letterSpacing: '0.08em',
                background: 'rgba(169,138,125,.05)',
                border: '1px solid rgba(169,138,125,.1)',
                borderRadius: RADIUS.lg,
                padding: '11px 15px',
              }}>{item.degrees}</div>
            </div>
          )}

          {hasKeys && (
            <div style={{ marginBottom: 18 }}>
              <KeysPanel item={item} />
            </div>
          )}

          <div style={{ marginBottom: 18 }}>
            <SectionLabel accent={p.a}>Details</SectionLabel>
            <p style={{
              fontFamily: FONT.body,
              fontSize: FS.detail,
              color: COLOR.detail,
              lineHeight: 1.8,
              margin: 0,
            }}>{item.details}</p>
          </div>

          {item.chords?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <SectionLabel accent={p.a}>Chords &amp; Context</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {item.chords.map((c, i) => (
                  <span key={i} style={{
                    fontFamily: FONT.mono,
                    fontSize: FS.base,
                    padding: '5px 11px',
                    borderRadius: RADIUS.md,
                    background: 'rgba(169,138,125,.08)',
                    border: '1px solid rgba(169,138,125,.16)',
                    color: '#e2bfb0',
                  }}>{c}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 18 }}>
            <SectionLabel accent={p.a}>Used In</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {item.usedBy.split(', ').map((g, i) => (
                <span key={i} style={{
                  fontFamily: FONT.mono,
                  fontSize: FS.base,
                  padding: '4px 10px',
                  borderRadius: RADIUS.sm,
                  background: p.b,
                  border: `1px solid ${p.br}44`,
                  color: p.a,
                }}>{g}</span>
              ))}
            </div>
          </div>

          {/* Pro tip */}
          <div style={{
            position: 'relative',
            background: `linear-gradient(135deg, ${p.b}, rgba(0,0,0,.15))`,
            border: `1px solid ${p.br}44`,
            borderRadius: RADIUS.xl,
            padding: PAD.proTip,
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 0 rgba(255,182,147,.05)',
          }}>
            <div style={{
              position: 'absolute',
              top: -4, right: 12,
              fontFamily: 'Georgia, serif',
              fontSize: '4rem',
              color: p.a,
              opacity: 0.06,
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}>&ldquo;</div>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: FS.sm,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: p.a,
              marginBottom: 9,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{ fontSize: FS.base }}>◆</span> Pro Tip
            </div>
            <p style={{
              fontFamily: FONT.body,
              fontStyle: 'italic',
              fontSize: FS.detail,
              color: COLOR.proTip,
              lineHeight: 1.7,
              margin: 0,
            }}>{item.tip}</p>
          </div>
        </div>
      )}
    </div>
  )
}
