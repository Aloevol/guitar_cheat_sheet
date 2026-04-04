import { FONT, FS, RADIUS } from '../theme'
import type { CategoryConfig } from '../types'

interface NotePillProps {
  n: string
  root?: boolean
  pal?: CategoryConfig
}

export default function NotePill({ n, root, pal }: NotePillProps) {
  const rootColor = pal?.a || '#f0c93a'
  const rootBg    = pal?.b || 'rgba(240,201,58,.24)'
  const rootBr    = pal?.br || 'rgba(240,201,58,.70)'

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT.mono,
      fontSize: FS.note,
      fontWeight: root ? 800 : 600,
      padding: '7px 14px',
      borderRadius: RADIUS.lg,
      background: root ? rootBg : 'rgba(255,255,255,.07)',
      border: `1.5px solid ${root ? rootBr : 'rgba(255,255,255,.12)'}`,
      color: root ? rootColor : '#d4c8ac',
      boxShadow: root ? `0 0 12px ${rootBr}` : 'none',
      letterSpacing: '0.02em',
      minWidth: 38,
      textAlign: 'center',
    }}>{n}</span>
  )
}
