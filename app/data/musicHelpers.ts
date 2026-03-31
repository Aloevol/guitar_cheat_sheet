import type { KeyData } from '../types'

const CHROMATIC = ['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'] as const

export const ALL_ROOTS: readonly string[] = CHROMATIC

export const KEYS_DATA: Record<string, { notes: string[]; sharps: number; flats: number }> = {
  'C':  { notes: ['C','D','E','F','G','A','B'],         sharps: 0, flats: 0 },
  'G':  { notes: ['G','A','B','C','D','E','F♯'],        sharps: 1, flats: 0 },
  'D':  { notes: ['D','E','F♯','G','A','B','C♯'],       sharps: 2, flats: 0 },
  'A':  { notes: ['A','B','C♯','D','E','F♯','G♯'],      sharps: 3, flats: 0 },
  'E':  { notes: ['E','F♯','G♯','A','B','C♯','D♯'],     sharps: 4, flats: 0 },
  'B':  { notes: ['B','C♯','D♯','E','F♯','G♯','A♯'],   sharps: 5, flats: 0 },
  'F♯': { notes: ['F♯','G♯','A♯','B','C♯','D♯','E♯'],  sharps: 6, flats: 0 },
  'F':  { notes: ['F','G','A','B♭','C','D','E'],        sharps: 0, flats: 1 },
  'B♭': { notes: ['B♭','C','D','E♭','F','G','A'],       sharps: 0, flats: 2 },
  'E♭': { notes: ['E♭','F','G','A♭','B♭','C','D'],      sharps: 0, flats: 3 },
  'A♭': { notes: ['A♭','B♭','C','D♭','E♭','F','G'],     sharps: 0, flats: 4 },
  'D♭': { notes: ['D♭','E♭','F','G♭','A♭','B♭','C'],    sharps: 0, flats: 5 },
}

// ─── Core factory ────────────────────────────────────────────────────────────

type NotesFn  = (root: string) => string[]
type ChordsFn = (root: string, notes: string[]) => string[]

export function allKeysFor(notesFn: NotesFn, chordsFn?: ChordsFn): KeyData[] {
  return [...ALL_ROOTS].map(root => ({
    root,
    notes:  notesFn(root),
    chords: chordsFn ? chordsFn(root, notesFn(root)) : [],
  }))
}

// ─── Chord family builders ───────────────────────────────────────────────────

export function majorChordFamily(root: string, notes: string[]): string[] {
  return [
    `I — ${root} maj`,
    `ii — ${notes[1]} min`,
    `iii — ${notes[2]} min`,
    `IV — ${notes[3]} maj`,
    `V — ${notes[4]} maj`,
    `vi — ${notes[5]} min`,
    `vii° — ${notes[6]} dim`,
  ]
}

export function naturalMinorChordFamily(root: string, notes: string[]): string[] {
  return [
    `i — ${root} min`,
    `ii° — ${notes[1]} dim`,
    `III — ${notes[2]} maj`,
    `iv — ${notes[3]} min`,
    `v — ${notes[4]} min`,
    `VI — ${notes[5]} maj`,
    `VII — ${notes[6]} maj`,
  ]
}

// ─── Scale note builders ─────────────────────────────────────────────────────

function buildNotesFn(offsets: number[]): NotesFn {
  return function (root: string): string[] {
    const ri = CHROMATIC.indexOf(root as typeof CHROMATIC[number])
    return offsets.map(o => CHROMATIC[(ri + o) % 12])
  }
}

export const pentatonicMinorNotes   = buildNotesFn([0, 3, 5, 7, 10])
export const pentatonicMajorNotes   = buildNotesFn([0, 2, 4, 7, 9])
export const bluesScaleNotes        = buildNotesFn([0, 3, 5, 6, 7, 10])
export const dorianNotes            = buildNotesFn([0, 2, 3, 5, 7, 9, 10])
export const harmonicMinorNotes     = buildNotesFn([0, 2, 3, 5, 7, 8, 11])
export const wholeToneNotes         = buildNotesFn([0, 2, 4, 6, 8, 10])
export const ionianNotes            = buildNotesFn([0, 2, 4, 5, 7, 9, 11])
export const phrygianNotes          = buildNotesFn([0, 1, 3, 5, 7, 8, 10])
export const lydianNotes            = buildNotesFn([0, 2, 4, 6, 7, 9, 11])
export const mixolydianNotes        = buildNotesFn([0, 2, 4, 5, 7, 9, 10])
export const naturalMinorScaleNotes = buildNotesFn([0, 2, 3, 5, 7, 8, 10])
export const locrianNotes           = buildNotesFn([0, 1, 3, 5, 6, 8, 10])
export const melodicMinorNotes      = buildNotesFn([0, 2, 3, 5, 7, 9, 11])
export const phrygianDominantNotes  = buildNotesFn([0, 1, 4, 5, 7, 8, 10])
export const diminishedScaleNotes   = buildNotesFn([0, 2, 3, 5, 6, 8, 9, 11])
export const lydianDominantNotes    = buildNotesFn([0, 2, 4, 6, 7, 9, 10])
export const superLocrianNotes      = buildNotesFn([0, 1, 3, 4, 6, 8, 10])

/** Aeolian = natural minor */
export const aeolianNotes = naturalMinorScaleNotes

// ─── Generic chord builder ───────────────────────────────────────────────────

export function chordAllKeys(offsets: number[], labelFn: ChordsFn): KeyData[] {
  return [...ALL_ROOTS].map(root => {
    const ri = CHROMATIC.indexOf(root as typeof CHROMATIC[number])
    const notes = offsets.map(o => CHROMATIC[(ri + o) % 12])
    return { root, notes, chords: labelFn(root, notes) }
  })
}

/** Helper: get a note from chromatic by root + semitone offset */
export function chromaticNote(root: string, offset: number): string {
  const ri = CHROMATIC.indexOf(root as typeof CHROMATIC[number])
  return CHROMATIC[(ri + offset) % 12]
}
