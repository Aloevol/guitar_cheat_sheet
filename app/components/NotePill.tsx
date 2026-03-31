import type { CategoryConfig } from '../types'

interface NotePillProps {
  n: string
  root?: boolean
  pal?: CategoryConfig
}

export default function NotePill({ n, root, pal }: NotePillProps) {
  const rootColor = pal?.a || '#f0c93a'
  const rootBg    = pal?.b || 'rgba(240,201,58,.14)'
  const rootBr    = pal?.br || 'rgba(240,201,58,.4)'

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Space Mono', monospace",
      fontSize: '.82rem',
      fontWeight: root ? 800 : 600,
      padding: '5px 11px',
      borderRadius: 6,
      background: root ? rootBg : 'rgba(255,255,255,.06)',
      border: `1.5px solid ${root ? rootBr : 'rgba(255,255,255,.09)'}`,
      color: root ? rootColor : '#cbbfa0',
      boxShadow: root ? `0 0 10px ${rootBr}` : 'none',
      letterSpacing: '0.02em',
      minWidth: 32,
      textAlign: 'center',
    }}>{n}</span>
  )
}
