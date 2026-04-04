'use client'
import { PAL } from '../data/guitarData'
import { FONT, FS, BG, COLOR, PAD, RADIUS } from '../theme'
import type { GuitarEntry } from '../types'
import NotePill from './NotePill'
import FormulaSteps from './FormulaSteps'
import KeysPanel from './KeysPanel'
import SectionLabel from './SectionLabel'

interface CardProps {
  item: GuitarEntry
  open: boolean
  onToggle: () => void
}

export default function Card({ item, open, onToggle }: CardProps) {
  const p = PAL[item.category]
  const shortNotes = item.example?.notes?.every(n => n.length <= 6)
  const hasKeys = item.allKeys && item.allKeys.length > 0

  return (
    <div
      onClick={onToggle}
      style={{
        background: open ? BG.cardOpen : BG.card,
        border: `1px solid ${open ? p.br : 'rgba(255,255,255,.06)'}`,
        borderRadius: RADIUS.xxl,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color .2s, box-shadow .2s, background .2s, transform .15s',
        boxShadow: open
          ? `0 0 0 1px ${p.br}, 0 8px 32px rgba(0,0,0,.5)`
          : '0 2px 12px rgba(0,0,0,.35)',
        transform: open ? 'translateY(-1px)' : 'translateY(0)',
      }}
      onMouseEnter={e => {
        if (!open) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.4)'
        }
      }}
      onMouseLeave={e => {
        if (!open) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)'
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.35)'
        }
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${p.a}, ${p.a}88, transparent)` }} />

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
              border: `1px solid ${p.br}`,
              borderRadius: RADIUS.sm,
              padding: '4px 10px',
            }}>{p.label}</span>
            {item.example?.root && (
              <span style={{
                fontFamily: FONT.mono,
                fontSize: FS.xxs,
                color: 'rgba(255,255,255,.35)',
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.09)',
                borderRadius: RADIUS.xs,
                padding: '3px 7px',
              }}>ex. {item.example.root}</span>
            )}
          </div>
          <div
            onClick={e => { e.stopPropagation(); onToggle() }}
            style={{
              width: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: open ? p.b : 'rgba(255,255,255,.04)',
              border: open ? `1px solid ${p.br}` : '1px solid rgba(255,255,255,.07)',
              color: open ? p.a : 'rgba(255,255,255,.35)',
              fontSize: FS.base,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform .2s, background .2s, border-color .2s, color .2s',
              cursor: 'pointer',
            }}
          >▾</div>
        </div>

        <div style={{
          fontFamily: FONT.display,
          fontSize: FS.title,
          fontWeight: 800,
          color: COLOR.heading,
          marginBottom: 6,
          lineHeight: 1.25,
          letterSpacing: '-.01em',
        }}>{item.title}</div>

        <div style={{
          fontFamily: FONT.body,
          fontSize: FS.body,
          color: COLOR.body,
          lineHeight: 1.55,
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
            borderTop: '1px solid rgba(255,255,255,.05)',
            background: BG.cardBody,
            padding: PAD.cardBody,
          }}
        >
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
                color: 'rgba(255,255,255,.62)',
                letterSpacing: '0.1em',
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.08)',
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
                    padding: '6px 12px',
                    borderRadius: RADIUS.md,
                    background: 'rgba(255,255,255,.07)',
                    border: '1px solid rgba(255,255,255,.18)',
                    color: 'rgba(255,255,255,.78)',
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
                  padding: '5px 11px',
                  borderRadius: RADIUS.xxl,
                  background: p.b,
                  border: `1px solid ${p.br}`,
                  color: p.a,
                }}>{g}</span>
              ))}
            </div>
          </div>

          <div style={{
            position: 'relative',
            background: `linear-gradient(135deg, ${p.b}, rgba(0,0,0,.2))`,
            border: `1px solid ${p.br}`,
            borderRadius: RADIUS.xl,
            padding: PAD.proTip,
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: -4, right: 12,
              fontFamily: 'Georgia, serif',
              fontSize: '4rem',
              color: p.a,
              opacity: 0.07,
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
