// ─── Category ────────────────────────────────────────────────────────────────

export type CategorySlug =
  | 'scales'
  | 'modes'
  | 'chords'
  | 'progressions'
  | 'techniques'
  | 'theory'
  | 'tunings'

export interface CategoryConfig {
  /** Accent colour (hex) */
  a: string
  /** Background tint (rgba, low opacity) */
  b: string
  /** Border colour (rgba, medium opacity) */
  br: string
  /** Display label */
  label: string
  /** Short description shown in CategoryGrid */
  desc: string
  /** 0–1 priority for sitemap.xml */
  sitemapPriority: number
}

export type CategoryConfigMap = Record<CategorySlug, CategoryConfig>

// ─── Guitar Entry ─────────────────────────────────────────────────────────────

export interface KeyData {
  root: string
  notes: string[]
  chords: string[]
}

export interface ExampleData {
  root: string
  notes: string[]
}

export interface GuitarEntry {
  id: string
  category: CategorySlug
  title: string
  tags: string[]
  summary: string
  formula: string
  degrees: string
  example: ExampleData
  allKeys: KeyData[]
  chords: string[]
  details: string
  usedBy: string
  tip: string
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export interface FaqQuestion {
  '@type': 'Question'
  name: string
  acceptedAnswer: {
    '@type': 'Answer'
    text: string
  }
}

export interface SeoSectionItem {
  title: string
  summary: string
  details: string
  usedBy: string
  formula: string
  tags: string[]
  keysText: string | null
}

export interface SeoSection {
  key: string
  heading: string
  desc: string
  items: SeoSectionItem[]
}

export interface SitemapEntry {
  url: string
  lastModified: string
  changeFrequency: 'monthly' | 'weekly' | 'daily' | 'always' | 'hourly' | 'yearly' | 'never'
  priority: number
}

// ─── Component props ──────────────────────────────────────────────────────────

export interface PalProps {
  pal: CategoryConfig
}
