/**
 * Fretboard diagram data.
 *
 * String numbering follows TAB convention (high-e at top):
 *   1 = high e   (thinnest)
 *   2 = B
 *   3 = G
 *   4 = D
 *   5 = A
 *   6 = low E    (thickest)
 *
 * fret 0 = open string (rendered as hollow circle left of nut)
 */

export interface FretDot {
  /** 1 = high e … 6 = low E */
  string: number
  /** Actual fret number; 0 = open string */
  fret: number
  /** Display note name: 'A', 'C#', 'Eb', etc. */
  note: string
  /** Root note — rendered in accent gold */
  isRoot?: boolean
  /** Characteristic / key note — rendered in highlight pink */
  isKey?: boolean
  /**
   * Technique to apply ON this note before moving to the next:
   *   bend-full  = bend up a whole step (label "1")
   *   bend-half  = bend up a half step  (label "½")
   *   bend-1.5   = bend up 1½ steps     (label "1½")
   *   vibrato    = oscillate pitch (~)
   *   tap        = right-hand tap (T)
   *   muted      = palm-muted (×)
   */
  technique?: 'bend-full' | 'bend-half' | 'bend-1.5' | 'vibrato' | 'tap' | 'muted'
}

export interface Connection {
  fromString: number
  fromFret: number
  toString: number
  toFret: number
  /** hammer = hammer-on arc | pull = pull-off arc | slide-up/down = glide line */
  type: 'hammer' | 'pull' | 'slide-up' | 'slide-down'
}

export interface FretboardDiagram {
  id: string
  /** Short label shown above the diagram */
  title: string
  /** One-liner shown below the diagram */
  subtitle?: string
  startFret: number
  /** Number of fret columns to display */
  fretCount: number
  dots: FretDot[]
  connections?: Connection[]
  /** Draw a thick nut bar at the left edge (use when startFret === 0) */
  showNut?: boolean
}

// ─── HELPER — open string dot ────────────────────────────────────────────────

function open(string: number, note: string, isRoot?: boolean): FretDot {
  return { string, fret: 0, note, isRoot }
}

// ─── FRETBOARD DATA ──────────────────────────────────────────────────────────

export const FRETBOARDS: Record<string, FretboardDiagram[]> = {

  // ── SCALE SOLO GUIDES ────────────────────────────────────────────────────

  'pentatonic-minor-solo': [
    {
      id: 'pmin-box1',
      title: 'Box 1 — 5th Position  (A minor pentatonic)',
      subtitle: 'Gold = root A | Bend ↑ on C (♭3→ implied D) | Vibrato ~ on root notes',
      startFret: 5, fretCount: 4,
      dots: [
        // ── String 6 (low E) ──────────────────────────────────────────────
        { string: 6, fret: 5, note: 'A',  isRoot: true },
        { string: 6, fret: 8, note: 'C' },
        // ── String 5 (A) ──────────────────────────────────────────────────
        { string: 5, fret: 5, note: 'D' },
        { string: 5, fret: 7, note: 'E' },
        // ── String 4 (D) ──────────────────────────────────────────────────
        { string: 4, fret: 5, note: 'G' },
        { string: 4, fret: 7, note: 'A',  isRoot: true },
        // ── String 3 (G) ──────────────────────────────────────────────────
        { string: 3, fret: 5, note: 'C' },
        { string: 3, fret: 7, note: 'D' },
        // ── String 2 (B) ──────────────────────────────────────────────────
        { string: 2, fret: 5, note: 'E' },
        { string: 2, fret: 8, note: 'G' },
        // ── String 1 (high e) ─────────────────────────────────────────────
        { string: 1, fret: 5, note: 'A',  isRoot: true, technique: 'vibrato'   },
        { string: 1, fret: 8, note: 'C',               technique: 'bend-full'  },
      ],
      connections: [
        // classic G string hammer-on: C → D
        { fromString: 3, fromFret: 5, toString: 3, toFret: 7, type: 'hammer' },
        // D string pull-off: A → G
        { fromString: 4, fromFret: 7, toString: 4, toFret: 5, type: 'pull' },
      ],
    },
    {
      id: 'pmin-E-open',
      title: 'Open Position  (E minor pentatonic) — E G A B D',
      subtitle: 'E = best guitar root: 5 of 6 open strings are in the scale. Gold = root E. Bend str1 fret3 (G) whole-step for the blues shout.',
      startFret: 0, fretCount: 4, showNut: true,
      dots: [
        // ── String 6 (low E) ──────────────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 3, note: 'G' },
        // ── String 5 (A) ──────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2, note: 'B' },
        // ── String 4 (D) ──────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2, note: 'E', isRoot: true },
        // ── String 3 (G) ──────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2, note: 'A' },
        // ── String 2 (B) ──────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 3, note: 'D' },
        // ── String 1 (high e) ─────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 3, note: 'G', technique: 'bend-full' },
      ],
      connections: [
        { fromString: 5, fromFret: 0, toString: 5, toFret: 2, type: 'hammer' },
        { fromString: 4, fromFret: 0, toString: 4, toFret: 2, type: 'hammer' },
        { fromString: 3, fromFret: 0, toString: 3, toFret: 2, type: 'hammer' },
      ],
    },
    {
      id: 'pmin-E-fullneck',
      title: 'Full Neck — E minor pentatonic (frets 0–12)',
      subtitle: 'Box 1 = frets 5–8 | Box 2 = frets 8–11 | Fret 12 = octave (same as open). All 5 notes across the entire neck.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E G A B D ─────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 3,  note: 'G' },
        { string: 6, fret: 5,  note: 'A' },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 10, note: 'D' },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) — A B D E G ─────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 5,  note: 'D' },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 10, note: 'G' },
        { string: 5, fret: 12, note: 'A' },
        // ── String 4 (D) — D E G A B ─────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 5,  note: 'G' },
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 12, note: 'D' },
        // ── String 3 (G) — G A B D E ─────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2,  note: 'A' },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 7,  note: 'D' },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 12, note: 'G' },
        // ── String 2 (B) — B D E G A ─────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 3,  note: 'D' },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 8,  note: 'G' },
        { string: 2, fret: 10, note: 'A' },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) — E G A B D ────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 3,  note: 'G' },
        { string: 1, fret: 5,  note: 'A' },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 10, note: 'D' },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'blues-scale-solo': [
    {
      id: 'blues-box1',
      title: 'Box 1 — 5th Position  (A blues scale)',
      subtitle: 'Pink = ♭5 blue note (Eb) | Slide through it: D → Eb → E',
      startFret: 5, fretCount: 4,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        { string: 6, fret: 5, note: 'A',  isRoot: true },
        { string: 6, fret: 8, note: 'C' },
        // ── String 5 ──────────────────────────────────────────────────────
        { string: 5, fret: 5, note: 'D' },
        { string: 5, fret: 6, note: 'Eb', isKey: true,  technique: 'bend-half' },
        { string: 5, fret: 7, note: 'E' },
        // ── String 4 ──────────────────────────────────────────────────────
        { string: 4, fret: 5, note: 'G' },
        { string: 4, fret: 7, note: 'A',  isRoot: true },
        // ── String 3 ──────────────────────────────────────────────────────
        { string: 3, fret: 5, note: 'C' },
        { string: 3, fret: 7, note: 'D' },
        { string: 3, fret: 8, note: 'Eb', isKey: true },
        // ── String 2 ──────────────────────────────────────────────────────
        { string: 2, fret: 5, note: 'E' },
        { string: 2, fret: 8, note: 'G' },
        // ── String 1 ──────────────────────────────────────────────────────
        { string: 1, fret: 5, note: 'A',  isRoot: true, technique: 'vibrato'  },
        { string: 1, fret: 8, note: 'C',               technique: 'bend-full' },
      ],
      connections: [
        // blue note slide: D → Eb (slide up) on A string
        { fromString: 5, fromFret: 5, toString: 5, toFret: 6, type: 'slide-up' },
        // blue note slide: Eb → E on A string
        { fromString: 5, fromFret: 6, toString: 5, toFret: 7, type: 'slide-up' },
      ],
    },
    {
      id: 'blues-E-open',
      title: 'Open Position  (E blues scale) — E G A Bb B D',
      subtitle: 'Pink = Bb (blue note ♭5) on fret 1, str5. Slide A→Bb→B for the cry. Open low E = root. Best position for beginners.',
      startFret: 0, fretCount: 4, showNut: true,
      dots: [
        // ── String 6 (low E) — root ───────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 3, note: 'G' },
        // ── String 5 (A) — the blue note lives here ───────────────────────
        open(5, 'A'),
        { string: 5, fret: 1, note: 'Bb', isKey: true, technique: 'bend-half' },
        { string: 5, fret: 2, note: 'B' },
        // ── String 4 (D) ──────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2, note: 'E', isRoot: true },
        // ── String 3 (G) ──────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2, note: 'A' },
        { string: 3, fret: 3, note: 'Bb', isKey: true },
        // ── String 2 (B) ──────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 3, note: 'D' },
        // ── String 1 (high e) ─────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 3, note: 'G', technique: 'bend-full' },
      ],
      connections: [
        // A string: open A → Bb (blue note appears) → B (blue note resolves)
        { fromString: 5, fromFret: 0, toString: 5, toFret: 1, type: 'slide-up' },
        { fromString: 5, fromFret: 1, toString: 5, toFret: 2, type: 'slide-up' },
        // D string: root pull-back
        { fromString: 4, fromFret: 2, toString: 4, toFret: 0, type: 'pull' },
      ],
    },
    {
      id: 'blues-E-fullneck',
      title: 'Full Neck — E blues scale (frets 0–12)',
      subtitle: 'Pink = Bb (♭5 blue note) — appears on every string! frets 1,3,6,8,11. Box 1 = frets 5–8 | Box 2 = frets 8–11.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E G A Bb B D ──────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 3,  note: 'G' },
        { string: 6, fret: 5,  note: 'A' },
        { string: 6, fret: 6,  note: 'Bb', isKey: true },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 10, note: 'D' },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) ──────────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 1,  note: 'Bb', isKey: true },
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 5,  note: 'D' },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 10, note: 'G' },
        { string: 5, fret: 12, note: 'A' },
        // ── String 4 (D) ──────────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 5,  note: 'G' },
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 8,  note: 'Bb', isKey: true },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 12, note: 'D' },
        // ── String 3 (G) ──────────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2,  note: 'A' },
        { string: 3, fret: 3,  note: 'Bb', isKey: true },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 7,  note: 'D' },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 12, note: 'G' },
        // ── String 2 (B) ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 3,  note: 'D' },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 8,  note: 'G' },
        { string: 2, fret: 10, note: 'A' },
        { string: 2, fret: 11, note: 'Bb', isKey: true },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 3,  note: 'G' },
        { string: 1, fret: 5,  note: 'A' },
        { string: 1, fret: 6,  note: 'Bb', isKey: true },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 10, note: 'D' },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'major-pentatonic-solo': [
    {
      id: 'majp-box1',
      title: 'Box 1 — 2nd Position  (G major pentatonic)',
      subtitle: 'Gold = root G | Double-stop: play two strings simultaneously for country 6ths',
      startFret: 2, fretCount: 4,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        { string: 6, fret: 3, note: 'G',  isRoot: true },
        { string: 6, fret: 5, note: 'A' },
        // ── String 5 ──────────────────────────────────────────────────────
        { string: 5, fret: 2, note: 'B' },
        { string: 5, fret: 5, note: 'D' },
        // ── String 4 ──────────────────────────────────────────────────────
        { string: 4, fret: 2, note: 'E' },
        { string: 4, fret: 5, note: 'G',  isRoot: true },
        // ── String 3 ──────────────────────────────────────────────────────
        { string: 3, fret: 2, note: 'A' },
        { string: 3, fret: 4, note: 'B' },
        // ── String 2 ──────────────────────────────────────────────────────
        { string: 2, fret: 3, note: 'D' },
        { string: 2, fret: 5, note: 'E' },
        // ── String 1 ──────────────────────────────────────────────────────
        { string: 1, fret: 3, note: 'G',  isRoot: true, technique: 'vibrato' },
        { string: 1, fret: 5, note: 'A' },
      ],
      connections: [
        // G string hammer-on: A → B
        { fromString: 3, fromFret: 2, toString: 3, toFret: 4, type: 'hammer' },
      ],
    },
    {
      id: 'majp-E-open',
      title: 'Open Position  (E major pentatonic) — E F# G# B C#',
      subtitle: 'Gold = root E | Bright, uplifting sound. Country double-stops: play str2+str4 together (B + E = 5th interval).',
      startFret: 0, fretCount: 5, showNut: true,
      dots: [
        // ── String 6 (low E) ──────────────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2, note: 'F#' },
        { string: 6, fret: 4, note: 'G#' },
        // ── String 5 (A) — A not in E major pent; B=fret2, C#=fret4 ───────
        { string: 5, fret: 2, note: 'B' },
        { string: 5, fret: 4, note: 'C#' },
        // ── String 4 (D) — D not in E major pent; E root=fret2 ────────────
        { string: 4, fret: 2, note: 'E', isRoot: true },
        // ── String 3 (G) — G not in E major pent; G#=fret1, B=fret4 ───────
        { string: 3, fret: 1, note: 'G#' },
        { string: 3, fret: 4, note: 'B' },
        // ── String 2 (B) ──────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2, note: 'C#' },
        // ── String 1 (high e) ─────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2, note: 'F#' },
        { string: 1, fret: 4, note: 'G#', technique: 'vibrato' },
      ],
      connections: [
        { fromString: 6, fromFret: 2, toString: 6, toFret: 4, type: 'hammer' },
        { fromString: 5, fromFret: 2, toString: 5, toFret: 4, type: 'hammer' },
      ],
    },
    {
      id: 'majp-E-fullneck',
      title: 'Full Neck — E major pentatonic (frets 0–12)',
      subtitle: 'Bright, country/pop sound. No open A, D, or G in this scale (A, D, G natural not included). Box 1 = frets 4–7 | Box 2 = frets 9–12.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E F# G# B C# ──────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2,  note: 'F#' },
        { string: 6, fret: 4,  note: 'G#' },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 9,  note: 'C#' },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) — open A not in scale ───────────────────────────────
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 4,  note: 'C#' },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 9,  note: 'F#' },
        { string: 5, fret: 11, note: 'G#' },
        // ── String 4 (D) — open D not in scale ───────────────────────────────
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 4,  note: 'F#' },
        { string: 4, fret: 6,  note: 'G#' },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 11, note: 'C#' },
        // ── String 3 (G) — open G not in scale; G# on fret 1 ─────────────────
        { string: 3, fret: 1,  note: 'G#' },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 6,  note: 'C#' },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 11, note: 'F#' },
        // ── String 2 (B) ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2,  note: 'C#' },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 7,  note: 'F#' },
        { string: 2, fret: 9,  note: 'G#' },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2,  note: 'F#' },
        { string: 1, fret: 4,  note: 'G#' },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 9,  note: 'C#' },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'natural-minor-solo': [
    {
      id: 'natmin-box1',
      title: 'Box 1 — 5th Position  (A natural minor / Aeolian)',
      subtitle: 'Gold = root A | ♭6 (F) is the "epic" note unique to this scale vs pentatonic',
      startFret: 5, fretCount: 4,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        { string: 6, fret: 5, note: 'A',  isRoot: true },
        { string: 6, fret: 7, note: 'B' },
        { string: 6, fret: 8, note: 'C' },
        // ── String 5 ──────────────────────────────────────────────────────
        { string: 5, fret: 5, note: 'D' },
        { string: 5, fret: 7, note: 'E' },
        { string: 5, fret: 8, note: 'F',  isKey: true },
        // ── String 4 ──────────────────────────────────────────────────────
        { string: 4, fret: 5, note: 'G' },
        { string: 4, fret: 7, note: 'A',  isRoot: true },
        // ── String 3 ──────────────────────────────────────────────────────
        { string: 3, fret: 5, note: 'C' },
        { string: 3, fret: 7, note: 'D' },
        // ── String 2 ──────────────────────────────────────────────────────
        { string: 2, fret: 5, note: 'E' },
        { string: 2, fret: 6, note: 'F',  isKey: true },
        { string: 2, fret: 8, note: 'G' },
        // ── String 1 ──────────────────────────────────────────────────────
        { string: 1, fret: 5, note: 'A',  isRoot: true, technique: 'vibrato' },
        { string: 1, fret: 7, note: 'B' },
        { string: 1, fret: 8, note: 'C' },
      ],
      connections: [
        // E string 3-note ascending: A → B → C
        { fromString: 6, fromFret: 5, toString: 6, toFret: 7, type: 'hammer' },
        { fromString: 6, fromFret: 7, toString: 6, toFret: 8, type: 'hammer' },
      ],
    },
    {
      id: 'natmin-E-open',
      title: 'Open Position  (E natural minor) — E F# G A B C D',
      subtitle: 'Pink = C (♭6) — the "epic" note that makes this scale bigger than pentatonic. Open str6 = root E.',
      startFret: 0, fretCount: 4, showNut: true,
      dots: [
        // ── String 6 (low E) ──────────────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2, note: 'F#' },
        { string: 6, fret: 3, note: 'G' },
        // ── String 5 (A) ──────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2, note: 'B' },
        { string: 5, fret: 3, note: 'C', isKey: true },
        // ── String 4 (D) ──────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2, note: 'E', isRoot: true },
        // ── String 3 (G) ──────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2, note: 'A' },
        // ── String 2 (B) ──────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 1, note: 'C', isKey: true },
        { string: 2, fret: 3, note: 'D' },
        // ── String 1 (high e) ─────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2, note: 'F#' },
        { string: 1, fret: 3, note: 'G', technique: 'vibrato' },
      ],
      connections: [
        { fromString: 6, fromFret: 0, toString: 6, toFret: 2, type: 'hammer' },
        { fromString: 5, fromFret: 2, toString: 5, toFret: 3, type: 'hammer' },
        { fromString: 2, fromFret: 0, toString: 2, toFret: 1, type: 'hammer' },
      ],
    },
    {
      id: 'natmin-E-fullneck',
      title: 'Full Neck — E natural minor (frets 0–12)',
      subtitle: 'Pink = C (♭6) — the note beyond pentatonic that gives depth. Box 1 = frets 5–8 | Box 2 = frets 8–12. 7 notes per octave.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E F# G A B C D ────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2,  note: 'F#' },
        { string: 6, fret: 3,  note: 'G' },
        { string: 6, fret: 5,  note: 'A' },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 8,  note: 'C', isKey: true },
        { string: 6, fret: 10, note: 'D' },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) ──────────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 3,  note: 'C', isKey: true },
        { string: 5, fret: 5,  note: 'D' },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 9,  note: 'F#' },
        { string: 5, fret: 10, note: 'G' },
        { string: 5, fret: 12, note: 'A' },
        // ── String 4 (D) ──────────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 4,  note: 'F#' },
        { string: 4, fret: 5,  note: 'G' },
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 10, note: 'C', isKey: true },
        { string: 4, fret: 12, note: 'D' },
        // ── String 3 (G) ──────────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2,  note: 'A' },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 5,  note: 'C', isKey: true },
        { string: 3, fret: 7,  note: 'D' },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 11, note: 'F#' },
        { string: 3, fret: 12, note: 'G' },
        // ── String 2 (B) ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 1,  note: 'C', isKey: true },
        { string: 2, fret: 3,  note: 'D' },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 7,  note: 'F#' },
        { string: 2, fret: 8,  note: 'G' },
        { string: 2, fret: 10, note: 'A' },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2,  note: 'F#' },
        { string: 1, fret: 3,  note: 'G' },
        { string: 1, fret: 5,  note: 'A' },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 8,  note: 'C', isKey: true },
        { string: 1, fret: 10, note: 'D' },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'dorian-solo': [
    {
      id: 'dorian-E-open',
      title: 'Open Position  (E Dorian) — E F# G A B C# D',
      subtitle: 'Pink = C# (raised 6th vs natural minor). B string open → C# fret2 = the Dorian colour note. Am7→D vamp in E Dorian = Santana signature.',
      startFret: 0, fretCount: 5, showNut: true,
      dots: [
        // ── String 6 (low E) ──────────────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2, note: 'F#' },
        { string: 6, fret: 3, note: 'G' },
        // ── String 5 (A) ──────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2, note: 'B' },
        { string: 5, fret: 4, note: 'C#', isKey: true },
        // ── String 4 (D) ──────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2, note: 'E', isRoot: true },
        // ── String 3 (G) ──────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2, note: 'A' },
        // ── String 2 (B) ──────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2, note: 'C#', isKey: true },
        { string: 2, fret: 3, note: 'D' },
        // ── String 1 (high e) ─────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2, note: 'F#' },
        { string: 1, fret: 3, note: 'G', technique: 'vibrato' },
      ],
      connections: [
        // B string: B → C# hammer (shows the raised 6th — the Dorian signature)
        { fromString: 2, fromFret: 0, toString: 2, toFret: 2, type: 'hammer' },
        { fromString: 2, fromFret: 2, toString: 2, toFret: 3, type: 'hammer' },
        { fromString: 5, fromFret: 2, toString: 5, toFret: 4, type: 'hammer' },
      ],
    },
    {
      id: 'dorian-box1',
      title: 'Box 1 — 5th Position  (A Dorian)',
      subtitle: 'Pink = F# (raised 6th) — the one note that makes Dorian "brighter" than natural minor',
      startFret: 5, fretCount: 4,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        { string: 6, fret: 5, note: 'A',  isRoot: true },
        { string: 6, fret: 7, note: 'B' },
        { string: 6, fret: 8, note: 'C' },
        // ── String 5 (A) — no F in Dorian (F# would be fret 9, outside box) ─
        { string: 5, fret: 5, note: 'D' },
        { string: 5, fret: 7, note: 'E' },
        // ── String 4 ──────────────────────────────────────────────────────
        { string: 4, fret: 5, note: 'G' },
        { string: 4, fret: 7, note: 'A',  isRoot: true },
        // ── String 3 ──────────────────────────────────────────────────────
        { string: 3, fret: 5, note: 'C' },
        { string: 3, fret: 7, note: 'D' },
        // ── String 2 — F# replaces F here (characteristic Dorian note) ─────
        { string: 2, fret: 5, note: 'E' },
        { string: 2, fret: 7, note: 'F#', isKey: true },
        { string: 2, fret: 8, note: 'G' },
        // ── String 1 ──────────────────────────────────────────────────────
        { string: 1, fret: 5, note: 'A',  isRoot: true, technique: 'vibrato' },
        { string: 1, fret: 7, note: 'B' },
        { string: 1, fret: 8, note: 'C' },
      ],
      connections: [
        // B string: E → F# → G (shows the raised 6th in context)
        { fromString: 2, fromFret: 5, toString: 2, toFret: 7, type: 'hammer' },
        { fromString: 2, fromFret: 7, toString: 2, toFret: 8, type: 'hammer' },
      ],
    },
    {
      id: 'dorian-E-fullneck',
      title: 'Full Neck — E Dorian (frets 0–12)',
      subtitle: 'Pink = C# (raised ♭6→♮6 — the Dorian signature). Vs natural minor: every C becomes C#. Santana/Metallica sound.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E F# G A B C# D ──────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2,  note: 'F#' },
        { string: 6, fret: 3,  note: 'G' },
        { string: 6, fret: 5,  note: 'A' },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 9,  note: 'C#', isKey: true },
        { string: 6, fret: 10, note: 'D' },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) ──────────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 4,  note: 'C#', isKey: true },
        { string: 5, fret: 5,  note: 'D' },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 9,  note: 'F#' },
        { string: 5, fret: 10, note: 'G' },
        { string: 5, fret: 12, note: 'A' },
        // ── String 4 (D) ──────────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 4,  note: 'F#' },
        { string: 4, fret: 5,  note: 'G' },
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 11, note: 'C#', isKey: true },
        { string: 4, fret: 12, note: 'D' },
        // ── String 3 (G) ──────────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2,  note: 'A' },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 6,  note: 'C#', isKey: true },
        { string: 3, fret: 7,  note: 'D' },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 11, note: 'F#' },
        { string: 3, fret: 12, note: 'G' },
        // ── String 2 (B) ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2,  note: 'C#', isKey: true },
        { string: 2, fret: 3,  note: 'D' },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 7,  note: 'F#' },
        { string: 2, fret: 8,  note: 'G' },
        { string: 2, fret: 10, note: 'A' },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2,  note: 'F#' },
        { string: 1, fret: 3,  note: 'G' },
        { string: 1, fret: 5,  note: 'A' },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 9,  note: 'C#', isKey: true },
        { string: 1, fret: 10, note: 'D' },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'mixolydian-solo': [
    {
      id: 'mixo-E-open',
      title: 'Open Position  (E Mixolydian) — E F# G# A B C# D',
      subtitle: 'Pink = D (♭7) — open D string is the defining Mixolydian note. Root→♭7 move: open E string → open D string = instant classic rock.',
      startFret: 0, fretCount: 5, showNut: true,
      dots: [
        // ── String 6 (low E) ──────────────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2, note: 'F#' },
        { string: 6, fret: 4, note: 'G#' },
        // ── String 5 (A) ──────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2, note: 'B' },
        { string: 5, fret: 4, note: 'C#' },
        // ── String 4 (D) — open D string = the ♭7! ───────────────────────
        open(4, 'D', false),
        { string: 4, fret: 2, note: 'E', isRoot: true },
        // ── String 3 (G) — G not in E Mixolydian; G#=fret1 ───────────────
        { string: 3, fret: 1, note: 'G#' },
        { string: 3, fret: 2, note: 'A' },
        // ── String 2 (B) ──────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2, note: 'C#' },
        { string: 2, fret: 3, note: 'D', isKey: true },
        // ── String 1 (high e) ─────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2, note: 'F#' },
        { string: 1, fret: 4, note: 'G#', technique: 'vibrato' },
      ],
      connections: [
        // D string: open D (♭7) → E (root) — the key Mixolydian resolution
        { fromString: 4, fromFret: 0, toString: 4, toFret: 2, type: 'slide-up' },
        // B string: B → C# → D (resolves to ♭7)
        { fromString: 2, fromFret: 0, toString: 2, toFret: 2, type: 'hammer' },
      ],
    },
    {
      id: 'mixo-box1',
      title: 'Box 1 — 3rd Position  (G Mixolydian)',
      subtitle: 'Pink = F (♭7) — the note that makes Mixolydian "bluesy major". Root→♭7→5 = the classic rock move.',
      startFret: 3, fretCount: 4,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        { string: 6, fret: 3, note: 'G',  isRoot: true },
        { string: 6, fret: 5, note: 'A' },
        // ── String 5 ──────────────────────────────────────────────────────
        { string: 5, fret: 3, note: 'C' },
        { string: 5, fret: 5, note: 'D' },
        // ── String 4 ──────────────────────────────────────────────────────
        { string: 4, fret: 3, note: 'F',  isKey: true },
        { string: 4, fret: 5, note: 'G',  isRoot: true },
        // ── String 3 ──────────────────────────────────────────────────────
        { string: 3, fret: 4, note: 'B' },
        { string: 3, fret: 5, note: 'C' },
        // ── String 2 ──────────────────────────────────────────────────────
        { string: 2, fret: 3, note: 'D' },
        { string: 2, fret: 5, note: 'E' },
        // ── String 1 ──────────────────────────────────────────────────────
        { string: 1, fret: 3, note: 'G',  isRoot: true, technique: 'vibrato' },
        { string: 1, fret: 5, note: 'A' },
      ],
      connections: [
        // G string: B → C (3rd → 4th stepwise)
        { fromString: 3, fromFret: 4, toString: 3, toFret: 5, type: 'hammer' },
        // D string: F (♭7) → G (root) — the key Mixolydian resolution move
        { fromString: 4, fromFret: 3, toString: 4, toFret: 5, type: 'slide-up' },
      ],
    },
    {
      id: 'mixo-E-fullneck',
      title: 'Full Neck — E Mixolydian (frets 0–12)',
      subtitle: 'Pink = D (♭7) — "bluesy major" note. Open D string = the key note! No open G (G# instead). Box 1 = frets 4–8 | Box 2 = frets 9–12.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E F# G# A B C# D ──────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2,  note: 'F#' },
        { string: 6, fret: 4,  note: 'G#' },
        { string: 6, fret: 5,  note: 'A' },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 9,  note: 'C#' },
        { string: 6, fret: 10, note: 'D', isKey: true },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) ──────────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 4,  note: 'C#' },
        { string: 5, fret: 5,  note: 'D', isKey: true },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 9,  note: 'F#' },
        { string: 5, fret: 11, note: 'G#' },
        { string: 5, fret: 12, note: 'A' },
        // ── String 4 (D) — open D = ♭7 key note! ─────────────────────────────
        { string: 4, fret: 0,  note: 'D', isKey: true },
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 4,  note: 'F#' },
        { string: 4, fret: 6,  note: 'G#' },
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 11, note: 'C#' },
        { string: 4, fret: 12, note: 'D', isKey: true },
        // ── String 3 (G) — open G not in scale; G# on fret 1 ─────────────────
        { string: 3, fret: 1,  note: 'G#' },
        { string: 3, fret: 2,  note: 'A' },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 6,  note: 'C#' },
        { string: 3, fret: 7,  note: 'D', isKey: true },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 11, note: 'F#' },
        // ── String 2 (B) ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2,  note: 'C#' },
        { string: 2, fret: 3,  note: 'D', isKey: true },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 7,  note: 'F#' },
        { string: 2, fret: 9,  note: 'G#' },
        { string: 2, fret: 10, note: 'A' },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2,  note: 'F#' },
        { string: 1, fret: 4,  note: 'G#' },
        { string: 1, fret: 5,  note: 'A' },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 9,  note: 'C#' },
        { string: 1, fret: 10, note: 'D', isKey: true },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'harmonic-minor-solo': [
    {
      id: 'harmin-E-open',
      title: 'Open Position  (E harmonic minor) — E F# G A B C D#',
      subtitle: 'Pink = D# (♯7, fret1 str4) — the leading tone 1 semitone below root E. D#→E hammer = the exotic resolution. str4 fret1 is the key.',
      startFret: 0, fretCount: 5, showNut: true,
      dots: [
        // ── String 6 (low E) ──────────────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2, note: 'F#' },
        { string: 6, fret: 3, note: 'G' },
        // ── String 5 (A) ──────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2, note: 'B' },
        { string: 5, fret: 3, note: 'C' },
        // ── String 4 (D) — D# (♯7) is just fret 1! ──────────────────────
        { string: 4, fret: 1, note: 'D#', isKey: true },
        { string: 4, fret: 2, note: 'E', isRoot: true },
        // ── String 3 (G) ──────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2, note: 'A' },
        // ── String 2 (B) ──────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 1, note: 'C' },
        { string: 2, fret: 4, note: 'D#', isKey: true },
        // ── String 1 (high e) ─────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2, note: 'F#' },
        { string: 1, fret: 3, note: 'G', technique: 'vibrato' },
      ],
      connections: [
        // D string: D# → E hammer — the leading tone resolution (the exotic sound)
        { fromString: 4, fromFret: 1, toString: 4, toFret: 2, type: 'hammer' },
        // B string: B → C hammer
        { fromString: 2, fromFret: 0, toString: 2, toFret: 1, type: 'hammer' },
      ],
    },
    {
      id: 'harmin-box1',
      title: 'Box 1 — 5th Position  (A harmonic minor)',
      subtitle: 'Pink = G# (♯7) — the raised 7th that creates the exotic augmented 2nd interval',
      startFret: 5, fretCount: 5,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        { string: 6, fret: 5, note: 'A',  isRoot: true },
        { string: 6, fret: 7, note: 'B' },
        { string: 6, fret: 8, note: 'C' },
        // ── String 5 ──────────────────────────────────────────────────────
        { string: 5, fret: 5, note: 'D' },
        { string: 5, fret: 7, note: 'E' },
        { string: 5, fret: 8, note: 'F' },
        // ── String 4 — G# replaces G (raised 7th!) ────────────────────────
        { string: 4, fret: 6, note: 'G#', isKey: true },
        { string: 4, fret: 7, note: 'A',  isRoot: true },
        // ── String 3 ──────────────────────────────────────────────────────
        { string: 3, fret: 5, note: 'C' },
        { string: 3, fret: 7, note: 'D' },
        // ── String 2 — G# at fret 9 (extended box) ────────────────────────
        { string: 2, fret: 5, note: 'E' },
        { string: 2, fret: 6, note: 'F' },
        { string: 2, fret: 9, note: 'G#', isKey: true },
        // ── String 1 ──────────────────────────────────────────────────────
        { string: 1, fret: 5, note: 'A',  isRoot: true, technique: 'vibrato' },
        { string: 1, fret: 7, note: 'B' },
        { string: 1, fret: 8, note: 'C' },
      ],
      connections: [
        // D string: F → G# — the augmented 2nd leap (the exotic sound)
        { fromString: 5, fromFret: 8, toString: 4, toFret: 6, type: 'slide-up' },
        // D string: G# → A (leading tone resolving to root)
        { fromString: 4, fromFret: 6, toString: 4, toFret: 7, type: 'hammer' },
      ],
    },
    {
      id: 'harmin-E-fullneck',
      title: 'Full Neck — E harmonic minor (frets 0–12)',
      subtitle: 'Pink = D# (♯7 leading tone, 1 semitone below root). Augmented 2nd: C→D# is the exotic "Arabic" interval. No open D string.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E F# G A B C D# ───────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2,  note: 'F#' },
        { string: 6, fret: 3,  note: 'G' },
        { string: 6, fret: 5,  note: 'A' },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 8,  note: 'C' },
        { string: 6, fret: 11, note: 'D#', isKey: true },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) ──────────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 3,  note: 'C' },
        { string: 5, fret: 6,  note: 'D#', isKey: true },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 9,  note: 'F#' },
        { string: 5, fret: 10, note: 'G' },
        { string: 5, fret: 12, note: 'A' },
        // ── String 4 (D) — open D not in scale; D# on fret 1 ─────────────────
        { string: 4, fret: 1,  note: 'D#', isKey: true },
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 4,  note: 'F#' },
        { string: 4, fret: 5,  note: 'G' },
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 10, note: 'C' },
        // ── String 3 (G) ──────────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2,  note: 'A' },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 5,  note: 'C' },
        { string: 3, fret: 8,  note: 'D#', isKey: true },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 11, note: 'F#' },
        { string: 3, fret: 12, note: 'G' },
        // ── String 2 (B) ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 1,  note: 'C' },
        { string: 2, fret: 4,  note: 'D#', isKey: true },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 7,  note: 'F#' },
        { string: 2, fret: 8,  note: 'G' },
        { string: 2, fret: 10, note: 'A' },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2,  note: 'F#' },
        { string: 1, fret: 3,  note: 'G' },
        { string: 1, fret: 5,  note: 'A' },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 8,  note: 'C' },
        { string: 1, fret: 11, note: 'D#', isKey: true },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'diminished-solo': [
    {
      id: 'dim-box',
      title: 'Symmetrical Position — 7th fret  (C diminished W–H)',
      subtitle: 'The same pattern moves up 3 frets (to 10fr) and sounds identical — use this to transpose licks instantly',
      startFret: 7, fretCount: 5,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 8,  note: 'C',  isRoot: true },
        { string: 6, fret: 10, note: 'D' },
        // ── String 5 ──────────────────────────────────────────────────────
        { string: 5, fret: 8,  note: 'F' },
        { string: 5, fret: 9,  note: 'Gb', isKey: true },
        { string: 5, fret: 11, note: 'Ab', isKey: true },
        // ── String 4 ──────────────────────────────────────────────────────
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 10, note: 'C',  isRoot: true },
        // ── String 3 ──────────────────────────────────────────────────────
        { string: 3, fret: 7,  note: 'D' },
        { string: 3, fret: 8,  note: 'Eb', isKey: true },
        { string: 3, fret: 10, note: 'F' },
        // ── String 2 ──────────────────────────────────────────────────────
        { string: 2, fret: 7,  note: 'Gb', isKey: true },
        { string: 2, fret: 9,  note: 'Ab', isKey: true },
        { string: 2, fret: 10, note: 'A' },
        // ── String 1 ──────────────────────────────────────────────────────
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 8,  note: 'C',  isRoot: true },
        { string: 1, fret: 10, note: 'D' },
      ],
    },
    {
      id: 'dim-E-fullneck',
      title: 'Full Neck — E diminished W–H (frets 0–12)',
      subtitle: 'Same pattern every 3 frets (symmetric). Pink = Bb (♭5) & C# (♯6). 8 notes per octave — dense but symmetrical.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E F# G A Bb B C# D ────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2,  note: 'F#' },
        { string: 6, fret: 3,  note: 'G' },
        { string: 6, fret: 5,  note: 'A' },
        { string: 6, fret: 6,  note: 'Bb', isKey: true },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 9,  note: 'C#', isKey: true },
        { string: 6, fret: 10, note: 'D' },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) ──────────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 1,  note: 'Bb', isKey: true },
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 4,  note: 'C#', isKey: true },
        { string: 5, fret: 5,  note: 'D' },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 9,  note: 'F#' },
        { string: 5, fret: 10, note: 'G' },
        { string: 5, fret: 12, note: 'A' },
        // ── String 4 (D) ──────────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 4,  note: 'F#' },
        { string: 4, fret: 5,  note: 'G' },
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 8,  note: 'Bb', isKey: true },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 11, note: 'C#', isKey: true },
        { string: 4, fret: 12, note: 'D' },
        // ── String 3 (G) ──────────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2,  note: 'A' },
        { string: 3, fret: 3,  note: 'Bb', isKey: true },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 6,  note: 'C#', isKey: true },
        { string: 3, fret: 7,  note: 'D' },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 11, note: 'F#' },
        { string: 3, fret: 12, note: 'G' },
        // ── String 2 (B) ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2,  note: 'C#', isKey: true },
        { string: 2, fret: 3,  note: 'D' },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 7,  note: 'F#' },
        { string: 2, fret: 8,  note: 'G' },
        { string: 2, fret: 10, note: 'A' },
        { string: 2, fret: 11, note: 'Bb', isKey: true },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2,  note: 'F#' },
        { string: 1, fret: 3,  note: 'G' },
        { string: 1, fret: 5,  note: 'A' },
        { string: 1, fret: 6,  note: 'Bb', isKey: true },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 9,  note: 'C#', isKey: true },
        { string: 1, fret: 10, note: 'D' },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'whole-tone-solo': [
    {
      id: 'wt-box',
      title: 'All-String Pattern — 6th fret  (C whole tone)',
      subtitle: 'Every note is exactly 2 frets apart. The pattern on strings 6+1 repeats on strings 2+5. Dreamy, floating sound.',
      startFret: 6, fretCount: 5,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        { string: 6, fret: 6,  note: 'Bb' },
        { string: 6, fret: 8,  note: 'C',  isRoot: true },
        { string: 6, fret: 10, note: 'D' },
        // ── String 5 ──────────────────────────────────────────────────────
        { string: 5, fret: 7,  note: 'E' },
        { string: 5, fret: 9,  note: 'F#', isKey: true },
        // ── String 4 ──────────────────────────────────────────────────────
        { string: 4, fret: 6,  note: 'G#', isKey: true },
        { string: 4, fret: 8,  note: 'Bb' },
        // ── String 3 ──────────────────────────────────────────────────────
        { string: 3, fret: 9,  note: 'E' },
        // ── String 2 ──────────────────────────────────────────────────────
        { string: 2, fret: 7,  note: 'F#', isKey: true },
        { string: 2, fret: 9,  note: 'G#', isKey: true },
        // ── String 1 ──────────────────────────────────────────────────────
        { string: 1, fret: 6,  note: 'Bb' },
        { string: 1, fret: 8,  note: 'C',  isRoot: true },
        { string: 1, fret: 10, note: 'D' },
      ],
    },
    {
      id: 'wt-E-fullneck',
      title: 'Full Neck — E whole-tone (frets 0–12)',
      subtitle: 'Every interval = 2 frets. Fully symmetric — no open A, G, or B strings in this scale. Dreamy, floating, film-score sound.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E F# G# Bb C D ────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2,  note: 'F#' },
        { string: 6, fret: 4,  note: 'G#', isKey: true },
        { string: 6, fret: 6,  note: 'Bb', isKey: true },
        { string: 6, fret: 8,  note: 'C' },
        { string: 6, fret: 10, note: 'D' },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) — open A not in scale ───────────────────────────────
        { string: 5, fret: 1,  note: 'Bb', isKey: true },
        { string: 5, fret: 3,  note: 'C' },
        { string: 5, fret: 5,  note: 'D' },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 9,  note: 'F#' },
        { string: 5, fret: 11, note: 'G#', isKey: true },
        // ── String 4 (D) ──────────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 4,  note: 'F#' },
        { string: 4, fret: 6,  note: 'G#', isKey: true },
        { string: 4, fret: 8,  note: 'Bb', isKey: true },
        { string: 4, fret: 10, note: 'C' },
        { string: 4, fret: 12, note: 'D' },
        // ── String 3 (G) — open G not in scale; G# on fret 1 ─────────────────
        { string: 3, fret: 1,  note: 'G#', isKey: true },
        { string: 3, fret: 3,  note: 'Bb', isKey: true },
        { string: 3, fret: 5,  note: 'C' },
        { string: 3, fret: 7,  note: 'D' },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 11, note: 'F#' },
        // ── String 2 (B) — open B not in scale; C on fret 1 ──────────────────
        { string: 2, fret: 1,  note: 'C' },
        { string: 2, fret: 3,  note: 'D' },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 7,  note: 'F#' },
        { string: 2, fret: 9,  note: 'G#', isKey: true },
        { string: 2, fret: 11, note: 'Bb', isKey: true },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2,  note: 'F#' },
        { string: 1, fret: 4,  note: 'G#', isKey: true },
        { string: 1, fret: 6,  note: 'Bb', isKey: true },
        { string: 1, fret: 8,  note: 'C' },
        { string: 1, fret: 10, note: 'D' },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  'major-scale-solo': [
    {
      id: 'maj-open',
      title: 'Open Position  (C major)',
      subtitle: 'Open strings ring free. Target chord tones (C E G) on beat 1 of each chord change.',
      startFret: 0, fretCount: 4, showNut: true,
      dots: [
        // ── String 6 ──────────────────────────────────────────────────────
        open(6, 'E'),
        { string: 6, fret: 1, note: 'F' },
        { string: 6, fret: 3, note: 'G' },
        // ── String 5 ──────────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2, note: 'B' },
        { string: 5, fret: 3, note: 'C', isRoot: true },
        // ── String 4 ──────────────────────────────────────────────────────
        open(4, 'D'),
        { string: 4, fret: 2, note: 'E' },
        { string: 4, fret: 3, note: 'F' },
        // ── String 3 ──────────────────────────────────────────────────────
        open(3, 'G'),
        { string: 3, fret: 2, note: 'A' },
        // ── String 2 ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 1, note: 'C', isRoot: true },
        { string: 2, fret: 3, note: 'D' },
        // ── String 1 ──────────────────────────────────────────────────────
        open(1, 'E'),
        { string: 1, fret: 1, note: 'F' },
        { string: 1, fret: 3, note: 'G' },
      ],
      connections: [
        // D string: D → E → F ascending stepwise
        { fromString: 4, fromFret: 0, toString: 4, toFret: 2, type: 'hammer' },
        { fromString: 4, fromFret: 2, toString: 4, toFret: 3, type: 'hammer' },
      ],
    },
    {
      id: 'maj-E-open',
      title: 'Open Position  (E major) — E F# G# A B C# D#',
      subtitle: 'Gold = root E. Open low E + high e = root on both ends. D# (fret1 str4) is the bright 7th. Target E, G#, B (chord tones) on beat 1.',
      startFret: 0, fretCount: 5, showNut: true,
      dots: [
        // ── String 6 (low E) ──────────────────────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2, note: 'F#' },
        { string: 6, fret: 4, note: 'G#' },
        // ── String 5 (A) ──────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2, note: 'B' },
        { string: 5, fret: 4, note: 'C#' },
        // ── String 4 (D) — D# = ♯7 leading tone ──────────────────────────
        { string: 4, fret: 1, note: 'D#', isKey: true },
        { string: 4, fret: 2, note: 'E',  isRoot: true },
        // ── String 3 (G) — G# = fret 1 ───────────────────────────────────
        { string: 3, fret: 1, note: 'G#' },
        { string: 3, fret: 2, note: 'A' },
        // ── String 2 (B) ──────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2, note: 'C#' },
        { string: 2, fret: 4, note: 'D#', isKey: true },
        // ── String 1 (high e) ─────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2, note: 'F#' },
        { string: 1, fret: 4, note: 'G#', technique: 'vibrato' },
      ],
      connections: [
        // D string: D# → E hammer (leading tone resolves to root)
        { fromString: 4, fromFret: 1, toString: 4, toFret: 2, type: 'hammer' },
        { fromString: 5, fromFret: 2, toString: 5, toFret: 4, type: 'hammer' },
        { fromString: 6, fromFret: 2, toString: 6, toFret: 4, type: 'hammer' },
      ],
    },
    {
      id: 'maj-E-fullneck',
      title: 'Full Neck — E major scale (frets 0–12)',
      subtitle: 'Pink = D# (♯7 leading tone, 1 semitone below root). 3 sharps: F# G# D#. No open G or D string. Box 1 = frets 4–7 | Box 2 = frets 9–12.',
      startFret: 1, fretCount: 12, showNut: true,
      dots: [
        // ── String 6 (low E) — E F# G# A B C# D# ─────────────────────────────
        open(6, 'E', true),
        { string: 6, fret: 2,  note: 'F#' },
        { string: 6, fret: 4,  note: 'G#' },
        { string: 6, fret: 5,  note: 'A' },
        { string: 6, fret: 7,  note: 'B' },
        { string: 6, fret: 9,  note: 'C#' },
        { string: 6, fret: 11, note: 'D#', isKey: true },
        { string: 6, fret: 12, note: 'E', isRoot: true },
        // ── String 5 (A) ──────────────────────────────────────────────────────
        open(5, 'A'),
        { string: 5, fret: 2,  note: 'B' },
        { string: 5, fret: 4,  note: 'C#' },
        { string: 5, fret: 6,  note: 'D#', isKey: true },
        { string: 5, fret: 7,  note: 'E', isRoot: true },
        { string: 5, fret: 9,  note: 'F#' },
        { string: 5, fret: 11, note: 'G#' },
        { string: 5, fret: 12, note: 'A' },
        // ── String 4 (D) — open D not in scale; D# on fret 1 ─────────────────
        { string: 4, fret: 1,  note: 'D#', isKey: true },
        { string: 4, fret: 2,  note: 'E', isRoot: true },
        { string: 4, fret: 4,  note: 'F#' },
        { string: 4, fret: 6,  note: 'G#' },
        { string: 4, fret: 7,  note: 'A' },
        { string: 4, fret: 9,  note: 'B' },
        { string: 4, fret: 11, note: 'C#' },
        // ── String 3 (G) — open G not in scale; G# on fret 1 ─────────────────
        { string: 3, fret: 1,  note: 'G#' },
        { string: 3, fret: 2,  note: 'A' },
        { string: 3, fret: 4,  note: 'B' },
        { string: 3, fret: 6,  note: 'C#' },
        { string: 3, fret: 8,  note: 'D#', isKey: true },
        { string: 3, fret: 9,  note: 'E', isRoot: true },
        { string: 3, fret: 11, note: 'F#' },
        // ── String 2 (B) ──────────────────────────────────────────────────────
        open(2, 'B'),
        { string: 2, fret: 2,  note: 'C#' },
        { string: 2, fret: 4,  note: 'D#', isKey: true },
        { string: 2, fret: 5,  note: 'E', isRoot: true },
        { string: 2, fret: 7,  note: 'F#' },
        { string: 2, fret: 9,  note: 'G#' },
        { string: 2, fret: 10, note: 'A' },
        { string: 2, fret: 12, note: 'B' },
        // ── String 1 (high e) ─────────────────────────────────────────────────
        open(1, 'E', true),
        { string: 1, fret: 2,  note: 'F#' },
        { string: 1, fret: 4,  note: 'G#' },
        { string: 1, fret: 5,  note: 'A' },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 9,  note: 'C#' },
        { string: 1, fret: 11, note: 'D#', isKey: true },
        { string: 1, fret: 12, note: 'E', isRoot: true },
      ],
    },
  ],

  // ── TECHNIQUE DIAGRAMS ───────────────────────────────────────────────────

  'bending': [
    {
      id: 'bend-demo',
      title: 'String Bending — Whole & Half Step',
      subtitle: '"1" = whole step bend (2 frets up in pitch). "½" = half step (1 fret up). Stack fingers behind the bending finger for strength.',
      startFret: 7, fretCount: 4,
      dots: [
        // B string whole-step bend: fret 9 (A) → bend up to B (as if fret 11)
        { string: 2, fret: 9, note: 'A',  technique: 'bend-full' },
        // G string half-step bend: fret 9 (Eb) → bend to E
        { string: 3, fret: 8, note: 'Eb', technique: 'bend-half' },
        // high e string: pre-bent note context
        { string: 1, fret: 9, note: 'A',  isRoot: true, technique: 'vibrato' },
      ],
    },
  ],

  'vibrato': [
    {
      id: 'vibrato-demo',
      title: 'Vibrato — Width × Speed = Character',
      subtitle: '"~" marks = add vibrato here. Hold the note then oscillate with wrist rotation. B.B. King: wide + slow. Zakk Wylde: tight + fast.',
      startFret: 7, fretCount: 4,
      dots: [
        { string: 1, fret: 9,  note: 'A',  isRoot: true, technique: 'vibrato' },
        { string: 2, fret: 9,  note: 'E',               technique: 'vibrato' },
        { string: 3, fret: 9,  note: 'B',               technique: 'vibrato' },
      ],
    },
  ],

  'hammer-on': [
    {
      id: 'hammeron-demo',
      title: 'Hammer-On — Ascending Legato',
      subtitle: 'Pick the first note only. Snap the next finger down firmly without picking. Arc shows hammer-on direction.',
      startFret: 5, fretCount: 4,
      dots: [
        // E string: A → B → C ascending hammer-on chain
        { string: 1, fret: 5, note: 'A', isRoot: true },
        { string: 1, fret: 7, note: 'B' },
        { string: 1, fret: 8, note: 'C' },
        // G string: C → D hammer-on
        { string: 3, fret: 5, note: 'C' },
        { string: 3, fret: 7, note: 'D' },
      ],
      connections: [
        { fromString: 1, fromFret: 5, toString: 1, toFret: 7, type: 'hammer' },
        { fromString: 1, fromFret: 7, toString: 1, toFret: 8, type: 'hammer' },
        { fromString: 3, fromFret: 5, toString: 3, toFret: 7, type: 'hammer' },
      ],
    },
  ],

  'pull-off': [
    {
      id: 'pulloff-demo',
      title: 'Pull-Off — Descending Legato',
      subtitle: 'Pre-fret BOTH notes. Pick the higher note then flick the top finger sideways off the string. Arc shows pull-off direction.',
      startFret: 5, fretCount: 4,
      dots: [
        // e string: C → B → A descending pull-off
        { string: 1, fret: 8, note: 'C' },
        { string: 1, fret: 7, note: 'B' },
        { string: 1, fret: 5, note: 'A', isRoot: true },
        // B string: G → E pull-off
        { string: 2, fret: 8, note: 'G' },
        { string: 2, fret: 5, note: 'E' },
      ],
      connections: [
        { fromString: 1, fromFret: 8, toString: 1, toFret: 7, type: 'pull' },
        { fromString: 1, fromFret: 7, toString: 1, toFret: 5, type: 'pull' },
        { fromString: 2, fromFret: 8, toString: 2, toFret: 5, type: 'pull' },
      ],
    },
  ],

  'tapping': [
    {
      id: 'tap-demo',
      title: 'Two-Hand Tapping — Van Halen Pattern',
      subtitle: '"T" = tap with picking-hand finger | Then pull off to h5, hammer to h7. Cycle: T12 – p7 – h5 fast.',
      startFret: 5, fretCount: 8,
      dots: [
        // Classic EVH tapping pattern on high e string: T12, p7, h5
        { string: 1, fret: 5,  note: 'A',  isRoot: true },
        { string: 1, fret: 7,  note: 'B' },
        { string: 1, fret: 12, note: 'E',  technique: 'tap' },
      ],
      connections: [
        { fromString: 1, fromFret: 5,  toString: 1, toFret: 7,  type: 'hammer' },
        { fromString: 1, fromFret: 12, toString: 1, toFret: 7,  type: 'pull'   },
        { fromString: 1, fromFret: 7,  toString: 1, toFret: 5,  type: 'pull'   },
      ],
    },
  ],

  'sweep-picking': [
    {
      id: 'sweep-demo',
      title: '5-String Am Arpeggio Sweep  (12th position)',
      subtitle: 'One fluid downstroke across all 5 strings. Each finger presses and releases immediately — no blurring. Yngwie/Malmsteen style.',
      startFret: 12, fretCount: 4,
      dots: [
        // Am arpeggio sweep: A C E (across 5 strings)
        { string: 6, fret: 12, note: 'E' },
        { string: 5, fret: 15, note: 'A',  isRoot: true },
        { string: 4, fret: 14, note: 'E' },
        { string: 3, fret: 13, note: 'C' },
        { string: 2, fret: 13, note: 'A', isRoot: true },
        { string: 1, fret: 12, note: 'E' },
      ],
    },
  ],

  'slide-technique': [
    {
      id: 'slide-demo',
      title: 'Slide / Glissando  (A minor pentatonic context)',
      subtitle: 'Diagonal lines = slide (maintain pressure, glide to target). Slide up from below, or slide down from above.',
      startFret: 5, fretCount: 5,
      dots: [
        { string: 3, fret: 5, note: 'C' },
        { string: 3, fret: 7, note: 'D', technique: 'vibrato' },
        { string: 2, fret: 5, note: 'E' },
        { string: 2, fret: 8, note: 'G', isKey: true },
        { string: 1, fret: 5, note: 'A', isRoot: true, technique: 'vibrato' },
      ],
      connections: [
        { fromString: 3, fromFret: 5, toString: 3, toFret: 7, type: 'slide-up' },
        { fromString: 2, fromFret: 5, toString: 2, toFret: 8, type: 'slide-up' },
      ],
    },
  ],

  'pinch-harmonics': [
    {
      id: 'pinch-demo',
      title: 'Pinch Harmonic — Thumb Contact Points',
      subtitle: 'Pick note normally, then let the thumb side graze the string immediately after. Move picking position along the string to find the "sweet spot" that produces a harmonic overtone.',
      startFret: 7, fretCount: 4,
      dots: [
        { string: 4, fret: 9,  note: 'B',  technique: 'bend-full' },
        { string: 3, fret: 9,  note: 'E',  technique: 'vibrato'   },
        { string: 2, fret: 9,  note: 'A',  isRoot: true, technique: 'vibrato' },
      ],
    },
  ],

  'whammy-bar': [
    {
      id: 'whammy-demo',
      title: 'Whammy Bar — Dive Bomb & Vibrato',
      subtitle: 'Push arm = pitch drops. A "dive bomb" pushes all the way down so the note fades to silence. Oscillate lightly for whammy vibrato.',
      startFret: 7, fretCount: 4,
      dots: [
        { string: 1, fret: 9,  note: 'A',  isRoot: true, technique: 'bend-1.5' },
        { string: 2, fret: 9,  note: 'E',               technique: 'vibrato'   },
        { string: 6, fret: 7,  note: 'B',               technique: 'bend-1.5'  },
      ],
    },
  ],

}
