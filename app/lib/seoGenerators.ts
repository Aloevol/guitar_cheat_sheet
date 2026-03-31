/**
 * SEO GENERATORS — pure functions that auto-generate SEO content from data.
 *
 * All functions are synchronous and side-effect free. They run at build time
 * from server components (layout.ts, sitemap.ts) with zero client bundle impact.
 */

import type { GuitarEntry, CategoryConfigMap } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// Keywords
// ─────────────────────────────────────────────────────────────────────────────

export function generateKeywords(data: GuitarEntry[], categoryConfig: CategoryConfigMap): string[] {
  const kw = new Set<string>()

  Object.values(categoryConfig).forEach(({ label }) => {
    const l = label.toLowerCase()
    kw.add(`guitar ${l}`)
    kw.add(`${l} guitar`)
    kw.add(`guitar ${l} all keys`)
  })

  data.forEach(item => {
    const t = item.title.toLowerCase()
    kw.add(`${t} guitar`)
    kw.add(`guitar ${t}`)
    if (item.allKeys?.length > 0) {
      kw.add(`${t} all keys`)
      kw.add(`${t} every key`)
    }
    item.tags.slice(0, 5).forEach(tag => kw.add(tag.toLowerCase()))
  })

  const evergreen = [
    'guitar cheat sheet', 'guitar reference', 'guitar for beginners',
    'guitar scale chart', 'guitar chord chart', 'circle of fifths guitar',
    'CAGED system', 'pentatonic scale guitar', 'guitar modes explained',
    'chords in key of C', 'chords in key of G', 'chords in key of D',
    'chords in key of A', 'chords in key of E', 'chords in key of F',
    'chords in key of B', 'chords in key of Bb', 'chords in key of Eb',
    'C major chord family', 'G major chord family', 'D major chord family',
    'A major chord family', 'E major chord family', 'F major chord family',
    'A minor chords', 'E minor chords', 'D minor chords', 'G minor chords',
    'what chords are in the key of G', 'what chords are in C major',
    'guitar chord families all keys', 'diatonic chords all keys',
    'minor pentatonic scale all keys', 'blues scale all keys',
    'major scale all 12 keys', 'dorian mode all keys',
    'guitar scales in every key', 'pentatonic scale positions',
    'minor pentatonic A', 'minor pentatonic E', 'minor pentatonic G',
    'guitar power chords', 'barre chords guitar', 'open chords guitar',
    'guitar 7th chords', 'guitar major 7th', 'guitar minor 7th',
    'sus2 guitar', 'sus4 guitar', 'add9 guitar chord',
    'diminished chord guitar', 'augmented chord guitar',
    'guitar arpeggios', 'major arpeggio guitar', 'minor arpeggio guitar',
    'sweep picking arpeggios', 'guitar dominant 7th',
    'guitar bending technique', 'vibrato guitar', 'hammer on pull off',
    'fingerpicking guitar', 'fingerstyle guitar', 'travis picking',
    'guitar harmonics', 'artificial harmonics guitar', 'sweep picking guitar',
    'hybrid picking guitar', 'alternate picking guitar', 'legato guitar',
    'palm muting guitar', 'two hand tapping guitar',
    'I IV V progression guitar', 'ii V I jazz progression',
    'axis progression guitar', 'andalusian cadence', 'flamenco guitar chords',
    'blues turnaround guitar', '12 bar blues all keys',
    'diatonic harmony guitar', 'secondary dominants guitar',
    'voice leading guitar', 'chord inversions guitar', 'slash chords',
    'relative major minor guitar', 'modes explained for guitarists',
    'pentatonic box positions', 'nashville number system guitar',
  ]
  evergreen.forEach(k => kw.add(k))

  return [...kw]
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

interface FaqAnswer {
  '@type': 'Answer'
  text: string
}

interface FaqQuestion {
  '@type': 'Question'
  name: string
  acceptedAnswer: FaqAnswer
}

const EVERGREEN_FAQ: FaqQuestion[] = [
  {
    '@type': 'Question',
    name: 'What chords are in the key of C major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in C major are: I — C major, ii — D minor, iii — E minor, IV — F major, V — G major, vi — A minor, vii° — B diminished. The most common chord progressions in C are C–F–G (I–IV–V), C–G–Am–F (I–V–vi–IV), and Am–F–C–G (vi–IV–I–V).' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in the key of G major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in G major are: I — G major, ii — A minor, iii — B minor, IV — C major, V — D major, vi — E minor, vii° — F# diminished. Common progressions: G–C–D (I–IV–V), G–D–Em–C (I–V–vi–IV). The relative minor is E minor.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in the key of D major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in D major are: I — D major, ii — E minor, iii — F# minor, IV — G major, V — A major, vi — B minor, vii° — C# diminished. Common progressions: D–G–A (I–IV–V), D–A–Bm–G (I–V–vi–IV). The relative minor is B minor.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in the key of A major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in A major are: I — A major, ii — B minor, iii — C# minor, IV — D major, V — E major, vi — F# minor, vii° — G# diminished. Common progressions: A–D–E (I–IV–V), A–E–F#m–D (I–V–vi–IV). The relative minor is F# minor.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in the key of E major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in E major are: I — E major, ii — F# minor, iii — G# minor, IV — A major, V — B major, vi — C# minor, vii° — D# diminished. The 12-bar blues in E uses E7, A7, and B7. The relative minor is C# minor.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in the key of F major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in F major are: I — F major, ii — G minor, iii — A minor, IV — Bb major, V — C major, vi — D minor, vii° — E diminished. F major is notable for requiring a barre chord shape. The relative minor is D minor.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in the key of B major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in B major are: I — B major, ii — C# minor, iii — D# minor, IV — E major, V — F# major, vi — G# minor, vii° — A# diminished. The relative minor is G# minor.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in the key of Bb (B flat) major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in Bb major are: I — Bb major, ii — C minor, iii — D minor, IV — Eb major, V — F major, vi — G minor, vii° — A diminished. Common in jazz and horn-based music. The relative minor is G minor.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in the key of Eb (E flat) major?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in Eb major are: I — Eb major, ii — F minor, iii — G minor, IV — Ab major, V — Bb major, vi — C minor, vii° — D diminished. Common in jazz. The relative minor is C minor.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in A minor?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in A natural minor are: i — A minor, ii° — B diminished, III — C major, iv — D minor, v — E minor, VI — F major, VII — G major. The harmonic minor version raises the 7th: the v chord becomes E major (dominant), creating stronger resolution to Am.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in E minor?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in E natural minor are: i — E minor, ii° — F# diminished, III — G major, iv — A minor, v — B minor, VI — C major, VII — D major. Em–D–C–G and Em–C–G–D are the most common E minor progressions in rock.' },
  },
  {
    '@type': 'Question',
    name: 'What chords are in D minor?',
    acceptedAnswer: { '@type': 'Answer', text: 'The chords in D natural minor are: i — D minor, ii° — E diminished, III — F major, iv — G minor, v — A minor, VI — Bb major, VII — C major. Dm–Bb–F–C and Dm–C–Bb–A (Andalusian) are classic D minor progressions.' },
  },
  {
    '@type': 'Question',
    name: 'What are the notes of the A minor pentatonic scale?',
    acceptedAnswer: { '@type': 'Answer', text: 'The A minor pentatonic scale has 5 notes: A, C, D, E, G. It uses intervals 1, ♭3, 4, 5, ♭7. Box 1 starts at the 5th fret on the low E string. It works over Am, C, Dm, Em, and G chords. Guitar Cheat Sheet shows all 12 minor pentatonic keys.' },
  },
  {
    '@type': 'Question',
    name: 'What are the notes of the E minor pentatonic scale?',
    acceptedAnswer: { '@type': 'Answer', text: 'The E minor pentatonic scale has 5 notes: E, G, A, B, D. Box 1 starts at the open position (frets 0-3) or at the 12th fret. Works over Em, G, Am, Bm, D chords. Standard open position makes it ideal for beginners.' },
  },
  {
    '@type': 'Question',
    name: 'What are the notes of the G major scale?',
    acceptedAnswer: { '@type': 'Answer', text: 'The G major scale has 7 notes: G, A, B, C, D, E, F#. It has one sharp (F#). The diatonic chords are: I–G, ii–Am, iii–Bm, IV–C, V–D, vi–Em, vii°–F#dim. Its relative minor is E minor.' },
  },
  {
    '@type': 'Question',
    name: 'What notes are in the A blues scale?',
    acceptedAnswer: { '@type': 'Answer', text: 'The A blues scale has 6 notes: A, C, D, Eb, E, G. It is the A minor pentatonic with an added blue note (Eb/D#, the diminished 5th). Works over A7, D7, E7 in a 12-bar blues in A. The Eb creates the characteristic blues "cry".' },
  },
  {
    '@type': 'Question',
    name: 'What scales should a beginner guitarist learn first?',
    acceptedAnswer: { '@type': 'Answer', text: 'Beginners should start with: (1) Minor Pentatonic — 5 notes, extremely forgiving, used in rock and blues. (2) Blues Scale — add one "blue note" to the pentatonic. (3) Major Scale — foundation of all music theory. Start in the key of A or E where open strings help.' },
  },
  {
    '@type': 'Question',
    name: 'What are the 7 guitar modes?',
    acceptedAnswer: { '@type': 'Answer', text: 'The 7 modes are: 1. Ionian (= major scale, bright), 2. Dorian (minor with raised 6th, jazzy — Santana, Miles Davis), 3. Phrygian (dark Spanish sound with ♭2 — flamenco, metal), 4. Lydian (major with ♯4, dreamy — film scores), 5. Mixolydian (major with ♭7, bluesy — Hendrix, classic rock), 6. Aeolian (= natural minor, emotional), 7. Locrian (diminished, darkest — jazz). All shown in every key on Guitar Cheat Sheet.' },
  },
  {
    '@type': 'Question',
    name: 'What is the CAGED system for guitar?',
    acceptedAnswer: { '@type': 'Answer', text: 'The CAGED system maps the entire guitar neck using 5 open chord shapes: C, A, G, E, D. Each shape moves up the neck as a barre chord and they interlock continuously. The order always cycles C–A–G–E–D–C. Each shape contains the chord, its scale, and arpeggios — giving you 5 positions anywhere on the neck for any key.' },
  },
  {
    '@type': 'Question',
    name: 'What is the difference between major and minor pentatonic scales?',
    acceptedAnswer: { '@type': 'Answer', text: 'The major pentatonic uses intervals 1, 2, 3, 5, 6 (bright, happy — country, pop). The minor pentatonic uses intervals 1, ♭3, 4, 5, ♭7 (darker, bluesy — rock, blues). They are relative to each other: A minor pentatonic (A C D E G) uses the same notes as C major pentatonic (C D E G A).' },
  },
  {
    '@type': 'Question',
    name: 'How do I tune my guitar to Drop D?',
    acceptedAnswer: { '@type': 'Answer', text: 'Tune only the lowest string (6th string) from E down to D, one whole step lower. All other strings stay standard (E A D G B E). The result is D A D G B E. Benefits: one-finger power chords by barring across the bottom 3 strings at any fret, and a deeper bass range for heavy riffing.' },
  },
  {
    '@type': 'Question',
    name: 'What guitar chords are in the key of E minor for blues?',
    acceptedAnswer: { '@type': 'Answer', text: 'For blues in E minor, the primary chords are E7 (I), A7 (IV), and B7 (V) — all dominant 7th chords. The 12-bar blues in E follows: E7 E7 E7 E7 | A7 A7 E7 E7 | B7 A7 E7 B7. The turnaround in bar 12 (B7) drives back to the top.' },
  },
  {
    '@type': 'Question',
    name: 'What is a chord family in music?',
    acceptedAnswer: { '@type': 'Answer', text: 'A chord family (diatonic chords) is the set of 7 chords built from the notes of a major or minor key. In any major key: I is major, ii is minor, iii is minor, IV is major, V is major, vi is minor, vii° is diminished. For example, the G major chord family is: G, Am, Bm, C, D, Em, F#dim. Guitar Cheat Sheet shows the full chord family for all 12 major and minor keys.' },
  },
]

export function generateFAQ(data: GuitarEntry[]): FaqQuestion[] {
  const autoFaq: FaqQuestion[] = data
    .filter(item =>
      item.allKeys?.length > 0 &&
      item.category !== 'techniques' &&
      item.category !== 'tunings'
    )
    .slice(0, 8)
    .map(item => ({
      '@type': 'Question' as const,
      name: `What are the notes and chords for the ${item.title} in all keys?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${item.summary} Formula: ${item.formula}. Degrees: ${item.degrees}. Example in ${item.example.root}: ${item.example.notes.join(', ')}. Used in: ${item.usedBy}. ${item.tip}`,
      },
    }))

  return [...EVERGREEN_FAQ, ...autoFaq]
}

// ─────────────────────────────────────────────────────────────────────────────
// Hidden SEO sections
// ─────────────────────────────────────────────────────────────────────────────

export interface SeoItem {
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
  items: SeoItem[]
}

export function generateSeoSections(data: GuitarEntry[], categoryConfig: CategoryConfigMap): SeoSection[] {
  return Object.entries(categoryConfig).map(([cat, config]) => ({
    key: cat,
    heading: config.label,
    desc: config.desc,
    items: data
      .filter(d => d.category === cat)
      .map(item => ({
        title: item.title,
        summary: item.summary,
        details: item.details,
        usedBy: item.usedBy,
        formula: item.formula,
        tags: item.tags,
        keysText: item.allKeys?.length > 0
          ? `Available in all 12 keys: ${item.allKeys.slice(0, 3).map(k => `${k.root}: ${k.notes.join(' ')}`).join(' | ')} ...and more.`
          : null,
      })),
  }))
}

// ─────────────────────────────────────────────────────────────────────────────
// Sitemap
// ─────────────────────────────────────────────────────────────────────────────

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export interface SitemapEntry {
  url: string
  lastModified: string
  changeFrequency: ChangeFrequency
  priority: number
}

export function generateSitemapEntries(categoryConfig: CategoryConfigMap, siteUrl: string): SitemapEntry[] {
  const now = new Date().toISOString()
  return Object.entries(categoryConfig).map(([slug, config]) => ({
    url: `${siteUrl}/?cat=${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: config.sitemapPriority,
  }))
}
