/**
 * FretboardDiagram — SVG fretboard visualiser
 *
 * Renders a horizontal guitar fretboard showing:
 *  • 6 string lines (high-e at top, low-E at bottom — tab convention)
 *  • Fret columns with fret-number labels
 *  • Note dots with note names; root = gold accent, key note = pink
 *  • Technique indicators: bend arrows, vibrato ~, tap T
 *  • Connection arcs: hammer-on (h), pull-off (p), slide lines
 *  • Open string hollow circles (when fret === 0 and showNut=true)
 *
 * Pure SVG — no hooks, no browser APIs. Works as a Server Component.
 */

import type { FretboardDiagram as FretboardDiagramData } from '../data/fretboards'

// ─── Design constants ─────────────────────────────────────────────────────────

const FRET_W   = 56   // px per fret column
const STR_H    = 34   // px between string lines
const PAD_L    = 28   // left padding (string labels)
const PAD_T    = 48   // top padding  (fret numbers + technique arrow space)
const PAD_R    = 20   // right padding
const PAD_B    = 20   // bottom padding
const DOT_R    = 12   // radius of note dot
const OPEN_R   = 9    // radius of open-string hollow circle
const NUT_W    = 5    // width of nut bar
const OPEN_PAD = 26   // extra left space when there are open strings

// ─── Colours ─────────────────────────────────────────────────────────────────

const C_BG          = '#0e0c09'
const C_STRING      = 'rgba(255,255,255,.18)'
const C_FRET        = 'rgba(255,255,255,.10)'
const C_NUT         = '#c9a84c'
const C_FRETNUM     = 'rgba(255,255,255,.32)'
const C_STRLABEL    = 'rgba(255,255,255,.28)'
const C_DOT_FILL    = 'rgba(255,255,255,.07)'
const C_DOT_STROKE  = 'rgba(255,255,255,.20)'
const C_NOTE_TEXT   = '#ddd0aa'
const C_ROOT_BG     = '#f0c93a'   // gold
const C_ROOT_TEXT   = '#0a0806'   // dark text on gold
const C_KEY_BG      = '#ff4d6d'   // pink / solos accent
const C_KEY_TEXT    = '#fff'
const C_BEND        = '#f0c93a'   // gold arrows for full bends
const C_BEND_HALF   = '#ff8c42'   // orange for half-step bends
const C_BEND_1_5    = '#ff4d6d'   // pink for 1.5-step bends
const C_VIBRATO     = '#5fd3c8'   // teal ~
const C_TAP         = '#6eb4ff'   // blue T
const C_CONNECT     = 'rgba(255,255,255,.38)'

// ─── String labels (tab convention: high-e at top = string 1) ────────────────

const STR_LABELS = ['e', 'B', 'G', 'D', 'A', 'E']

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  diagram: FretboardDiagramData
  /** Category accent colour — overrides default gold for root dots */
  accentColor?: string
}

export default function FretboardDiagram({ diagram, accentColor = C_ROOT_BG }: Props) {
  const { startFret, fretCount, dots, connections = [], showNut } = diagram

  const hasOpen   = dots.some(d => d.fret === 0)
  const openShift = (showNut || hasOpen) ? OPEN_PAD : 0

  const W = PAD_L + openShift + fretCount * FRET_W + PAD_R
  const H = PAD_T + 5 * STR_H + PAD_B

  // ── Position helpers ────────────────────────────────────────────────────────

  /** Centre-x of a fret column.  fret=0 → open-string circle left of nut. */
  function fx(fret: number): number {
    if (fret === 0) return PAD_L + OPEN_R + 1
    return PAD_L + openShift + (fret - startFret + 0.5) * FRET_W
  }

  /** Centre-y of a string (1 = top = high e). */
  function sy(string: number): number {
    return PAD_T + (string - 1) * STR_H
  }

  /** X of the i-th fret wire (0 = left edge of first fret column). */
  function wireX(i: number): number {
    return PAD_L + openShift + i * FRET_W
  }

  // ─── Build SVG elements ────────────────────────────────────────────────────

  return (
    <figure style={{ margin: 0 }}>
      {/* Title bar */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '.72rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        color: accentColor,
        marginBottom: 6,
      }}>
        {diagram.title}
      </div>

      {/* SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8, overflow: 'visible' }}
        role="img"
        aria-label={diagram.title}
      >
        {/* ── Background ──────────────────────────────────────────────────── */}
        <rect x={0} y={0} width={W} height={H} fill={C_BG} rx={6} />

        {/* ── String lines ────────────────────────────────────────────────── */}
        {STR_LABELS.map((_, idx) => {
          const s   = idx + 1                          // string number 1–6
          const y   = sy(s)
          const sw  = s === 1 ? 0.6 : s === 2 ? 0.8 : s === 3 ? 1.0 : s === 4 ? 1.2 : s === 5 ? 1.5 : 1.8
          const x1  = hasOpen ? PAD_L + OPEN_R + 12 : PAD_L + openShift
          return (
            <line
              key={`str-${s}`}
              x1={x1}  y1={y}
              x2={PAD_L + openShift + fretCount * FRET_W}  y2={y}
              stroke={C_STRING}
              strokeWidth={sw}
            />
          )
        })}

        {/* ── Fret wires ──────────────────────────────────────────────────── */}
        {Array.from({ length: fretCount + 1 }, (_, i) => (
          <line
            key={`fw-${i}`}
            x1={wireX(i)}  y1={sy(1)}
            x2={wireX(i)}  y2={sy(6)}
            stroke={C_FRET}
            strokeWidth={1}
          />
        ))}

        {/* ── Nut (thick bar) ─────────────────────────────────────────────── */}
        {(showNut || hasOpen) && (
          <rect
            x={PAD_L + openShift - NUT_W / 2}
            y={sy(1)}
            width={NUT_W}
            height={sy(6) - sy(1)}
            fill={C_NUT}
            rx={1}
          />
        )}

        {/* ── String labels ───────────────────────────────────────────────── */}
        {STR_LABELS.map((label, idx) => (
          <text
            key={`sl-${idx}`}
            x={PAD_L - 7}
            y={sy(idx + 1) + 4}
            textAnchor="end"
            fontSize="9"
            fill={C_STRLABEL}
            fontFamily="'Space Mono', monospace"
          >
            {label}
          </text>
        ))}

        {/* ── Fret numbers ────────────────────────────────────────────────── */}
        {Array.from({ length: fretCount }, (_, i) => (
          <text
            key={`fn-${i}`}
            x={PAD_L + openShift + (i + 0.5) * FRET_W}
            y={PAD_T - 30}
            textAnchor="middle"
            fontSize="9"
            fill={C_FRETNUM}
            fontFamily="'Space Mono', monospace"
          >
            {startFret + i}
          </text>
        ))}

        {/* ── Position marker (e.g. "5fr") ───────────────────────────────── */}
        {startFret > 1 && !showNut && !hasOpen && (
          <text
            x={PAD_L + openShift + 2}
            y={sy(6) + 14}
            fontSize="8"
            fill={C_FRETNUM}
            fontFamily="'Space Mono', monospace"
          >
            {startFret}fr
          </text>
        )}

        {/* ── Connections (hammer-on, pull-off, slide) ─────────────────────
             Rendered BEFORE dots so dots sit on top.                       */}
        {connections.map((conn, i) => {
          const x1 = fx(conn.fromFret)
          const y1 = sy(conn.fromString)
          const x2 = fx(conn.toFret)
          const y2 = sy(conn.toString)

          if (conn.type === 'hammer' || conn.type === 'pull') {
            const midX  = (x1 + x2) / 2
            const lift  = Math.abs(x2 - x1) * 0.55          // arc height
            const arcY  = Math.min(y1, y2) - lift
            const label = conn.type === 'hammer' ? 'h' : 'p'
            return (
              <g key={`conn-${i}`}>
                <path
                  d={`M ${x1} ${y1 - DOT_R - 1} Q ${midX} ${arcY} ${x2} ${y2 - DOT_R - 1}`}
                  fill="none"
                  stroke={C_CONNECT}
                  strokeWidth={1.4}
                  strokeDasharray={conn.type === 'pull' ? '3,2' : undefined}
                />
                <text
                  x={midX}  y={arcY - 4}
                  textAnchor="middle"
                  fontSize="8"
                  fill={C_CONNECT}
                  fontFamily="'Space Mono', monospace"
                >
                  {label}
                </text>
              </g>
            )
          }

          if (conn.type === 'slide-up' || conn.type === 'slide-down') {
            const angle = conn.type === 'slide-up' ? -1 : 1
            return (
              <g key={`conn-${i}`}>
                <line
                  x1={x1 + DOT_R + 2}  y1={y1 + angle * 4}
                  x2={x2 - DOT_R - 2}  y2={y2 - angle * 4}
                  stroke={C_CONNECT}
                  strokeWidth={1.4}
                />
              </g>
            )
          }

          return null
        })}

        {/* ── Note dots ────────────────────────────────────────────────────── */}
        {dots.map((dot, i) => {
          const x      = fx(dot.fret)
          const y      = sy(dot.string)
          const isOpen = dot.fret === 0

          const bgFill = dot.isRoot
            ? accentColor
            : dot.isKey
              ? C_KEY_BG
              : C_DOT_FILL

          const textFill = dot.isRoot
            ? C_ROOT_TEXT
            : dot.isKey
              ? C_KEY_TEXT
              : C_NOTE_TEXT

          const strokeFill = dot.isRoot
            ? accentColor
            : dot.isKey
              ? C_KEY_BG
              : C_DOT_STROKE

          const fontSize = dot.note.length > 2 ? '7.5' : '8.5'

          return (
            <g key={`dot-${i}`}>
              {isOpen ? (
                /* ── Open string: hollow circle left of nut ── */
                <>
                  <circle cx={x} cy={y} r={OPEN_R} fill="none" stroke={strokeFill} strokeWidth={1.5} />
                  <text x={x} y={y + 3.5} textAnchor="middle" fontSize={fontSize} fill={strokeFill}
                    fontFamily="'Space Mono', monospace" fontWeight={dot.isRoot ? '700' : '400'}>
                    {dot.note}
                  </text>
                </>
              ) : (
                /* ── Fretted dot ── */
                <>
                  <circle cx={x} cy={y} r={DOT_R} fill={bgFill} stroke={strokeFill} strokeWidth={dot.isRoot || dot.isKey ? 0 : 1} />
                  <text x={x} y={y + 3.5} textAnchor="middle" fontSize={fontSize} fill={textFill}
                    fontFamily="'Space Mono', monospace" fontWeight={dot.isRoot ? '700' : '400'}>
                    {dot.note}
                  </text>
                </>
              )}

              {/* ── Technique indicators ── */}

              {dot.technique === 'bend-full' && (
                <BendArrow x={x} y={y} label="1" color={C_BEND} />
              )}

              {dot.technique === 'bend-half' && (
                <BendArrow x={x} y={y} label="½" color={C_BEND_HALF} />
              )}

              {dot.technique === 'bend-1.5' && (
                <BendArrow x={x} y={y} label="1½" color={C_BEND_1_5} />
              )}

              {dot.technique === 'vibrato' && (
                <text
                  x={x}
                  y={y - DOT_R - 5}
                  textAnchor="middle"
                  fontSize="13"
                  fill={C_VIBRATO}
                  fontFamily="'Space Mono', monospace"
                >
                  ~
                </text>
              )}

              {dot.technique === 'tap' && (
                <>
                  <circle cx={x} cy={y - DOT_R - 10} r={7} fill="none" stroke={C_TAP} strokeWidth={1.2} />
                  <text
                    x={x}
                    y={y - DOT_R - 10 + 3.5}
                    textAnchor="middle"
                    fontSize="8"
                    fill={C_TAP}
                    fontFamily="'Space Mono', monospace"
                    fontWeight="700"
                  >
                    T
                  </text>
                </>
              )}

              {dot.technique === 'muted' && (
                <text
                  x={x}
                  y={y - DOT_R - 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="rgba(255,255,255,.4)"
                  fontFamily="'Space Mono', monospace"
                >
                  ×
                </text>
              )}
            </g>
          )
        })}

        {/* ── Legend strip ────────────────────────────────────────────────── */}
        <g transform={`translate(${PAD_L + openShift}, ${H - 10})`}>
          <circle cx={6}  cy={0} r={5} fill={accentColor} />
          <text x={14} y={3.5} fontSize="7.5" fill={C_FRETNUM} fontFamily="'Space Mono', monospace">Root</text>
          <circle cx={54} cy={0} r={5} fill={C_KEY_BG} />
          <text x={62} y={3.5} fontSize="7.5" fill={C_FRETNUM} fontFamily="'Space Mono', monospace">Key note</text>
        </g>
      </svg>

      {/* Subtitle */}
      {diagram.subtitle && (
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '.8rem',
          color: 'rgba(255,255,255,.45)',
          marginTop: 8,
          marginBottom: 0,
          lineHeight: 1.5,
        }}>
          {diagram.subtitle}
        </p>
      )}
    </figure>
  )
}

// ─── Bend arrow sub-component ─────────────────────────────────────────────────

function BendArrow({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  // Curve from right side of dot, upward, ending with arrowhead
  const cx1 = x + DOT_R + 8
  const cy1 = y - 8
  const cx2 = x + DOT_R + 12
  const cy2 = y - 22
  const ex  = x + DOT_R + 10
  const ey  = y - 28

  // Arrowhead triangle (pointing up)
  const ar = 4
  const ap1 = `${ex - ar},${ey + ar * 1.4}`
  const ap2 = `${ex + ar},${ey + ar * 1.4}`
  const ap3 = `${ex},${ey}`

  return (
    <g>
      <path
        d={`M ${x + DOT_R} ${y} C ${cx1} ${cy1} ${cx2} ${cy2} ${ex} ${ey + ar * 1.4}`}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
      />
      <polygon points={`${ap1} ${ap2} ${ap3}`} fill={color} />
      <text x={ex + 6} y={ey + 4} fontSize="8" fill={color} fontFamily="'Space Mono', monospace" fontWeight="700">
        {label}
      </text>
    </g>
  )
}
