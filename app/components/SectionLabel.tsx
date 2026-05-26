import { FONT, FS, COLOR } from '../theme'

interface SectionLabelProps {
  children: React.ReactNode
  accent?: string
}

export default function SectionLabel({ children, accent }: SectionLabelProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <span style={{
        fontFamily: FONT.mono,
        fontSize: FS.sm,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.13em',
        color: accent || COLOR.faint,
      }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(169,138,125,.08)' }} />
    </div>
  )
}
