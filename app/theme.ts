/**
 * ─────────────────────────────────────────────────
 *  GUITAR CHEAT SHEET — Design Tokens
 *  Edit values here to change the whole app at once.
 * ─────────────────────────────────────────────────
 */

// ── Fonts ─────────────────────────────────────────
/** Change any string here to swap a font site-wide */
export const FONT = {
  display: "'Playfair Display', Georgia, serif",
  mono:    "'Space Mono', monospace",
  body:    "'Lora', Georgia, serif",
} as const

// ── Backgrounds ───────────────────────────────────
/** Adjust to make the UI lighter / darker / warmer */
export const BG = {
  page:       '#0d0b08',  // main page / body background
  header:     '#0a0806',  // sticky nav bar
  mobileMenu: '#0d0b08',  // mobile nav dropdown panel
  catCard:    '#131110',  // category browse cards
  card:       '#141210',  // closed content card
  cardOpen:   '#1e1a13',  // open / highlighted content card
  cardBody:   '#141109',  // expanded-card inner section
} as const

// ── Text Colours ──────────────────────────────────
/** Edit opacities or hex values to adjust contrast */
export const COLOR = {
  heading:   '#f5edda',               // card titles (warm off-white)
  brand:     '#c9a84c',               // primary gold — nav logo, CTAs
  body:      'rgba(255,255,255,.72)',  // summary / body copy
  detail:    'rgba(255,255,255,.78)',  // details-section paragraphs
  muted:     'rgba(255,255,255,.45)', // nav links, secondary labels
  faint:     'rgba(255,255,255,.25)', // section-divider labels, hints
  dimmed:    'rgba(255,255,255,.32)', // key-panel sub-labels
  proTip:    '#ddd0aa',               // pro-tip italic text (warm cream)
  noteBody:  '#c8baa0',               // non-root note pills in key panel
  chordBody: '#aca090',               // chord-family non-root rows
} as const

// ── Font Sizes ────────────────────────────────────
/**
 * Edit any size here to scale that text across the whole app.
 * Rule of thumb: increase all values equally to scale up the UI,
 * or change individual ones to tune hierarchy.
 */
export const FS = {
  nano:   '.6rem',    // root-note label under note pill  (~9.6 px)
  xxs:    '.7rem',    // tiny labels: "ex. C" badge, formula legend
  xs:     '.73rem',   // key-panel sub-headers (Notes, Chord Family)
  sm:     '.75rem',   // section labels, card category badge
  base:   '.8rem',    // nav links, mobile menu, buttons
  keys:   '.82rem',   // key-selector buttons, result count badge
  mono:   '.88rem',   // formula step badges, chord-context tags
  monoLg: '.9rem',    // formula plain text, degrees block, preview items
  body:   '.93rem',   // card summary paragraph
  detail: '.95rem',   // card details & pro-tip text
  note:   '1.0rem',   // NotePill note names
  title:  '1.25rem',  // card titles + nav brand
  hero:   '1.6rem',   // "No results" headline
} as const

// ── Padding ───────────────────────────────────────
/** Common padding shorthands used across components */
export const PAD = {
  cardHeader: '16px 18px 14px',
  cardBody:   '22px 20px',
  proTip:     '16px 18px',
  catCard:    '20px 20px 20px 24px',
  navItem:    '8px 12px',
} as const

// ── Border Radius ─────────────────────────────────
/** Pixel values for consistent rounding */
export const RADIUS = {
  xs:  3,
  sm:  4,
  md:  5,
  lg:  6,
  xl:  8,
  xxl: 10,
} as const
