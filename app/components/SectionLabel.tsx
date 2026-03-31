interface SectionLabelProps {
  children: React.ReactNode
  accent?: string
}

export default function SectionLabel({ children, accent }: SectionLabelProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '.55rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.13em',
        color: accent || 'rgba(255,255,255,.3)',
      }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.05)' }} />
    </div>
  )
}
