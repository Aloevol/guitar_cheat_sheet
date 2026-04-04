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
    a: '#f0c93a', b: 'rgba(240,201,58,.24)', br: 'rgba(240,201,58,.70)',
    label: 'Scales',
    desc: 'Major, minor, pentatonic, blues & exotic scales',
    sitemapPriority: 0.9,
  },
  modes: {
    a: '#5fd3c8', b: 'rgba(95,211,200,.24)', br: 'rgba(95,211,200,.70)',
    label: 'Modes',
    desc: 'All 7 diatonic modes with sounds and uses',
    sitemapPriority: 0.9,
  },
  chords: {
    a: '#6eb4ff', b: 'rgba(110,180,255,.24)', br: 'rgba(110,180,255,.70)',
    label: 'Chords',
    desc: 'Triads, 7ths, sus, dim, aug and beyond',
    sitemapPriority: 0.9,
  },
  progressions: {
    a: '#b987f5', b: 'rgba(185,135,245,.24)', br: 'rgba(185,135,245,.70)',
    label: 'Progressions',
    desc: 'Classic chord movements across all genres',
    sitemapPriority: 0.8,
  },
  techniques: {
    a: '#ff8c42', b: 'rgba(255,140,66,.24)', br: 'rgba(255,140,66,.70)',
    label: 'Techniques',
    desc: 'Bending, vibrato, tapping, legato and more',
    sitemapPriority: 0.8,
  },
  theory: {
    a: '#4dd98a', b: 'rgba(77,217,138,.24)', br: 'rgba(77,217,138,.70)',
    label: 'Theory',
    desc: 'Circle of fifths, CAGED, intervals, keys',
    sitemapPriority: 0.8,
  },
  tunings: {
    a: '#ff6b8a', b: 'rgba(255,107,138,.24)', br: 'rgba(255,107,138,.70)',
    label: 'Tunings',
    desc: 'Standard, drop, open and alternate tunings',
    sitemapPriority: 0.7,
  },
  solos: {
    a: '#ff4d6d', b: 'rgba(255,77,109,.24)', br: 'rgba(255,77,109,.70)',
    label: 'Solos',
    desc: 'Pre-built solo styles for every scale — techniques, timing & pioneers',
    sitemapPriority: 0.9,
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
