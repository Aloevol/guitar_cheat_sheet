import type { CategoryConfigMap, CategorySlug } from '../types'

/**
 * CATEGORY CONFIG — single source of truth for all categories.
 *
 * To add a new category:
 *   1. Add the slug to CategorySlug in app/types/index.ts
 *   2. Add an entry here with a, b, br, label, desc, sitemapPriority
 *   3. Create app/data/entries/<category>.ts
 *   4. Import and spread it in app/data/index.ts
 *
 * SEO keywords, FAQ, sitemap, and UI all update automatically.
 */
export const CATEGORY_CONFIG: CategoryConfigMap = {
  scales: {
    a: '#f0c93a', b: 'rgba(240,201,58,.12)', br: 'rgba(240,201,58,.35)',
    label: 'Scales',
    desc: 'Major, minor, pentatonic, blues & exotic scales',
    sitemapPriority: 0.9,
  },
  modes: {
    a: '#5fd3c8', b: 'rgba(95,211,200,.12)', br: 'rgba(95,211,200,.35)',
    label: 'Modes',
    desc: 'All 7 diatonic modes with sounds and uses',
    sitemapPriority: 0.9,
  },
  chords: {
    a: '#6eb4ff', b: 'rgba(110,180,255,.12)', br: 'rgba(110,180,255,.35)',
    label: 'Chords',
    desc: 'Triads, 7ths, sus, dim, aug and beyond',
    sitemapPriority: 0.9,
  },
  progressions: {
    a: '#b987f5', b: 'rgba(185,135,245,.12)', br: 'rgba(185,135,245,.35)',
    label: 'Progressions',
    desc: 'Classic chord movements across all genres',
    sitemapPriority: 0.8,
  },
  techniques: {
    a: '#ff8c42', b: 'rgba(255,140,66,.12)', br: 'rgba(255,140,66,.35)',
    label: 'Techniques',
    desc: 'Bending, vibrato, tapping, legato and more',
    sitemapPriority: 0.8,
  },
  theory: {
    a: '#4dd98a', b: 'rgba(77,217,138,.12)', br: 'rgba(77,217,138,.35)',
    label: 'Theory',
    desc: 'Circle of fifths, CAGED, intervals, keys',
    sitemapPriority: 0.8,
  },
  tunings: {
    a: '#ff6b8a', b: 'rgba(255,107,138,.12)', br: 'rgba(255,107,138,.35)',
    label: 'Tunings',
    desc: 'Standard, drop, open and alternate tunings',
    sitemapPriority: 0.7,
  },
} as const

/** Ordered array used by filter UI ('all' first) */
export const CATEGORIES: readonly string[] = ['all', ...Object.keys(CATEGORY_CONFIG)] as const

/** Alias — existing components using PAL[cat] keep working */
export const PAL = CATEGORY_CONFIG

/** Type guard for category slugs */
export function isCategorySlug(s: string): s is CategorySlug {
  return s in CATEGORY_CONFIG
}
