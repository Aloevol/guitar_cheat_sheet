import type { Metadata } from 'next'
import GuitarFxStudio from './GuitarFxStudio'

export const metadata: Metadata = {
  title: 'GuitarFX Studio',
  description: 'A browser-based live guitar effects processor with gate, drive, EQ, cabinet, reverb, presets, routing, and level meters.',
  alternates: {
    canonical: '/guitarfx',
  },
}

export default function GuitarFxPage() {
  return <GuitarFxStudio />
}
