import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title  = searchParams.get('title')  ?? 'Guitar Cheat Sheet'
  const sub    = searchParams.get('sub')    ?? 'Scales · Chords · Modes · Techniques'
  const accent = searchParams.get('accent') ?? '#c9a84c'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'flex-end',
          background: '#0d0b08',
          padding: '64px 72px',
          fontFamily: 'serif',
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${accent}, ${accent}66, transparent)`,
          display: 'flex',
        }} />

        {/* Brand */}
        <div style={{
          position: 'absolute', top: 44, left: 72,
          fontSize: 18, color: accent, letterSpacing: 2,
          fontFamily: 'serif',
          display: 'flex',
        }}>
          GUITAR CHEAT SHEET
        </div>

        {/* Decorative quote */}
        <div style={{
          fontSize: 200, color: 'rgba(255,255,255,.03)',
          lineHeight: 1, marginBottom: -40,
          fontFamily: 'serif',
          display: 'flex',
        }}>
          &ldquo;
        </div>

        {/* Title */}
        <div style={{
          fontSize: title.length > 24 ? 52 : 68,
          fontWeight: 900,
          color: '#f5edda',
          lineHeight: 1.1,
          marginBottom: 16,
          fontFamily: 'serif',
          display: 'flex',
        }}>
          {title}
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 22, color: 'rgba(255,255,255,.45)',
          letterSpacing: 1,
          fontFamily: 'serif',
          display: 'flex',
        }}>
          {sub}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
