/**
 * ─────────────────────────────────────────────────
 *  GUITAR CHEAT SHEET — Design Tokens
 *  "Titanium & Ember" design system
 * ─────────────────────────────────────────────────
 */

// ── Fonts ─────────────────────────────────────────
export const FONT = {
  display: "'Noto Serif', Georgia, serif",
  mono:    "'Inter', system-ui, sans-serif",
  body:    "'Inter', system-ui, sans-serif",
} as const

// ── Backgrounds ───────────────────────────────────
export const BG = {
  page:       '#131313',
  header:     '#0d0b08',
  mobileMenu: '#0d0b08',
  catCard:    '#1c1b1b',
  card:       '#201f1f',
  cardOpen:   '#2a2727',
  cardBody:   '#1a1919',
} as const

// ── Text Colours ──────────────────────────────────
export const COLOR = {
  heading:   '#e5e2e1',
  brand:     '#ff6b00',              // ember orange — primary CTA
  brandSoft: '#ffb693',              // primary peach — subtle accents
  body:      '#e2bfb0',              // on-surface-variant
  detail:    'rgba(226,191,176,.85)',
  muted:     '#a98a7d',              // outline
  faint:     'rgba(169,138,125,.45)',
  dimmed:    'rgba(226,191,176,.35)',
  proTip:    '#ffb693',
  noteBody:  '#e2bfb0',
  chordBody: '#a98a7d',
} as const

// ── Font Sizes ────────────────────────────────────
export const FS = {
  nano:   '.6rem',
  xxs:    '.68rem',
  xs:     '.72rem',
  sm:     '.74rem',
  base:   '.78rem',
  keys:   '.8rem',
  mono:   '.86rem',
  monoLg: '.88rem',
  body:   '.92rem',
  detail: '.94rem',
  note:   '1.0rem',
  title:  '1.2rem',
  hero:   '1.55rem',
} as const

// ── Padding ───────────────────────────────────────
export const PAD = {
  cardHeader: '16px 18px 14px',
  cardBody:   '22px 20px',
  proTip:     '16px 18px',
  catCard:    '18px 18px 18px 22px',
  navItem:    '8px 12px',
} as const

// ── Border Radius ─────────────────────────────────
export const RADIUS = {
  xs:  2,
  sm:  4,
  md:  4,
  lg:  6,
  xl:  8,
  xxl: 8,
} as const
