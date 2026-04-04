import type { GuitarEntry } from '../types'
import { scales }       from './entries/scales'
import { modes }        from './entries/modes'
import { chords }       from './entries/chords'
import { progressions } from './entries/progressions'
import { techniques }   from './entries/techniques'
import { theory }       from './entries/theory'
import { tunings }      from './entries/tunings'
import { solos }        from './entries/solos'

export const DATA: GuitarEntry[] = [
  ...scales,
  ...modes,
  ...chords,
  ...progressions,
  ...techniques,
  ...theory,
  ...tunings,
  ...solos,
]

export const QUICK_SEARCHES: string[] = [
  'Minor Pentatonic', 'Blues Scale', 'Bending', 'Dorian',
  '12-Bar Blues', 'CAGED System', 'Drop D', 'ii-V-I',
  'Arpeggio', 'Fingerpicking', 'Modes', 'Flamenco',
  'Solo Guide', 'Call Response', 'Sweep Picking', 'Pinch Harmonics',
]

export const FEATURED_IDS: string[] = [
  'minor-pentatonic', 'blues-scale', '12-bar-blues',
  'bending', 'dorian-mode', 'caged-system',
  'pentatonic-minor-solo', 'blues-scale-solo', 'solo-construction',
]

export { CATEGORY_CONFIG, CATEGORIES, PAL } from './categories'
export { KEYS_DATA, ALL_ROOTS }              from './musicHelpers'
