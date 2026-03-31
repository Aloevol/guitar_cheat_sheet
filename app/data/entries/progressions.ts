import type { GuitarEntry } from '../../types'
import { ALL_ROOTS } from '../musicHelpers'

const C = ['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'] as const
type Note = typeof C[number]
const chr = (root: string, o: number): string => C[(C.indexOf(root as Note) + o) % 12]

export const progressions: GuitarEntry[] = [
  {
    id: 'i-iv-v', category: 'progressions', title: 'I – IV – V (Three Chord Trick)',
    tags: ['I IV V','three chord','blues','rock','country','basic','classic rock'],
    summary: 'The three-chord trick. Powers thousands of songs from blues to country.',
    formula: 'I – IV – V', degrees: 'Tonic – Subdominant – Dominant',
    example: { root: 'G', notes: ['G','C','D'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const iv = chr(root,5), v = chr(root,7)
      return { root, notes:[root, iv, v], chords:[`I — ${root}`, `IV — ${iv}`, `V — ${v}`] }
    }),
    chords: ['Key of E: E – A – B','Key of A: A – D – E','Key of G: G – C – D','Key of D: D – G – A'],
    details: 'I-IV-V is the most common chord progression in popular music. In blues, all three are dominant 7th chords (I7-IV7-V7).',
    usedBy: 'Blues, rock, country, folk, pop — everything',
    tip: 'In blues, make all three chords dominant 7ths. In E: E7 – A7 – B7.',
  },
  {
    id: 'i-v-vi-iv', category: 'progressions', title: 'I – V – vi – IV (The Axis)',
    tags: ['I V vi IV','pop','four chord','axis progression','hit songs','modern pop'],
    summary: 'The most common modern pop progression. Literally thousands of hit songs.',
    formula: 'I – V – vi – IV', degrees: 'Tonic – Dominant – Relative minor – Subdominant',
    example: { root: 'C', notes: ['C','G','Am','F'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const v = chr(root,7), vi = chr(root,9), iv = chr(root,5)
      return { root, notes:[root,v,`${vi}m`,iv], chords:[`I — ${root}`,`V — ${v}`,`vi — ${vi}m`,`IV — ${iv}`] }
    }),
    chords: ['Key of C: C – G – Am – F','Key of G: G – D – Em – C'],
    details: "Sometimes called the Axis Progression. Let Her Go, Don't Look Back in Anger, No Woman No Cry, Africa — all the same four chords.",
    usedBy: 'Pop, rock, pop-punk, indie, modern music',
    tip: 'This progression loops forever — IV resolves naturally back to I.',
  },
  {
    id: 'i-vi-iv-v-50s', category: 'progressions', title: 'I – vi – IV – V (Doo-Wop)',
    tags: ['50s','doo-wop','I vi IV V','oldies','nostalgic','romantic','stand by me'],
    summary: 'The classic 50s progression. Timeless, warm, romantic and nostalgic.',
    formula: 'I – vi – IV – V', degrees: 'Tonic – Submediant – Subdominant – Dominant',
    example: { root: 'C', notes: ['C','Am','F','G'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const vi = chr(root,9), iv = chr(root,5), v = chr(root,7)
      return { root, notes:[root,`${vi}m`,iv,v], chords:[`I — ${root}`,`vi — ${vi}m`,`IV — ${iv}`,`V — ${v}`] }
    }),
    chords: ['Key of C: C – Am – F – G','Key of G: G – Em – C – D'],
    details: "Stand By Me, Earth Angel, Every Breath You Take, Can't Help Falling in Love — all use this progression.",
    usedBy: 'Pop, doo-wop, oldies, romantic ballads, classic rock',
    tip: 'Notice this is the same four chords as I-V-vi-IV, just starting on a different chord.',
  },
  {
    id: '12-bar-blues', category: 'progressions', title: '12-Bar Blues',
    tags: ['12 bar blues','blues','shuffle','I7 IV7 V7','turnaround','quick IV'],
    summary: 'The template for all blues. 12 bars, three chords, repeating forever.',
    formula: 'I7×4 | IV7×2 | I7×2 | V7 | IV7 | I7 | V7',
    degrees: 'Bars 1-4 (I7), 5-6 (IV7), 7-8 (I7), 9 (V7), 10 (IV7), 11 (I7), 12 (V7 turnaround)',
    example: { root: 'E', notes: ['E7','A7','E7','E7','A7','A7','E7','E7','B7','A7','E7','B7'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const iv = chr(root,5), v = chr(root,7)
      return { root,
        notes:[`${root}7`,`${iv}7`,`${root}7`,`${root}7`,`${iv}7`,`${iv}7`,`${root}7`,`${root}7`,`${v}7`,`${iv}7`,`${root}7`,`${v}7`],
        chords:[`I7 — ${root}7`,`IV7 — ${iv}7`,`V7 — ${v}7`]
      }
    }),
    chords: ['Key of E: I7=E7, IV7=A7, V7=B7','Quick IV variation: go to IV7 in bar 2'],
    details: 'The 12-bar blues is the most important song form in popular music. Three dominant 7th chords over 12 bars create a cycle of tension and release.',
    usedBy: 'Blues, rock & roll, early rock, jazz blues, R&B',
    tip: 'Start with the quick IV variation — go to IV7 in bar 2.',
  },
  {
    id: 'ii-v-i', category: 'progressions', title: 'ii – V – I (Jazz Turnaround)',
    tags: ['ii V I','jazz','turnaround','dominant','resolution','bebop','jazz theory'],
    summary: 'The fundamental jazz progression. Understanding ii-V-I unlocks all jazz harmony.',
    formula: 'iim7 – V7 – Imaj7', degrees: 'Minor 7th – Dominant 7th – Major 7th',
    example: { root: 'C', notes: ['Dm7','G7','Cmaj7'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const ii = chr(root,2), v = chr(root,7)
      return { root, notes:[`${ii}m7`,`${v}7`,`${root}maj7`], chords:[`ii — ${ii}m7`,`V — ${v}7`,`I — ${root}maj7`] }
    }),
    chords: ['Key of C: Dm7 – G7 – Cmaj7','Key of F: Gm7 – C7 – Fmaj7'],
    details: 'The ii-V-I is to jazz what I-IV-V is to blues. Virtually every jazz standard is built on chains of ii-V-I progressions.',
    usedBy: 'Jazz, bossa nova, fusion, sophisticated pop, film music',
    tip: 'Tritone substitution: replace V7 with the chord a tritone away (G7 to D♭7 in C major).',
  },
  {
    id: 'andalusian', category: 'progressions', title: 'Andalusian Cadence',
    tags: ['andalusian','flamenco','phrygian','spanish','descending','i VII VI V','exotic'],
    summary: 'The descending flamenco progression. Instantly Spanish, dramatic, and powerful.',
    formula: 'i – VII – VI – V', degrees: 'Minor tonic, descending bassline to dominant',
    example: { root: 'Am', notes: ['Am','G','F','E'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const vii = chr(root,10), vi = chr(root,8), v = chr(root,7)
      return { root, notes:[`${root}m`,vii,vi,v], chords:[`i — ${root}m`,`VII — ${vii}`,`VI — ${vi}`,`V — ${v}`] }
    }),
    chords: ['Am key: Am – G – F – E','Em key: Em – D – C – B'],
    details: 'The Andalusian cadence has a descending chromatic bass line. Stairway to Heaven intro, Sultans of Swing ending, and Malaguena all use this.',
    usedBy: 'Flamenco, rock, classical, metal, Spanish music',
    tip: 'The key is the final V major chord — E major in A minor. That major chord against a minor context gives it the Phrygian/Spanish sound.',
  },
  {
    id: 'cinematic-minor', category: 'progressions', title: 'i – VI – III – VII (Cinematic)',
    tags: ['cinematic','minor','epic','film','anthemic','em C G D','sweeping','dramatic'],
    summary: 'The modern cinematic epic. Sweeping, emotional, anthemic rock and film scores.',
    formula: 'i – VI – III – VII', degrees: 'Minor tonic to major 6th to major 3rd to major 7th',
    example: { root: 'Em', notes: ['Em','C','G','D'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const vi = chr(root,8), iii = chr(root,3), vii = chr(root,10)
      return { root, notes:[`${root}m`,vi,iii,vii], chords:[`i — ${root}m`,`VI — ${vi}`,`III — ${iii}`,`VII — ${vii}`] }
    }),
    chords: ['Em key: Em – C – G – D','Am key: Am – F – C – G'],
    details: 'This progression (Em-C-G-D) moves from the dark minor tonic through major chords, creating a sweeping, uplifting yet bittersweet feeling.',
    usedBy: 'Film scores, anthemic rock, emotional pop, ballads',
    tip: 'The contrast between the minor i chord and the major chords that follow is the source of the cinematic feeling.',
  },
  {
    id: 'ii-v-i-minor', category: 'progressions', title: 'ii° – V – i (Jazz Minor)',
    tags: ['jazz minor','minor ii V i','half diminished','m7b5','minor turnaround'],
    summary: 'The minor version of ii-V-I. Uses a half-diminished ii° chord for darker tension.',
    formula: 'iiø7 – V7 – im', degrees: 'Half-diminished – Dominant 7th – Minor',
    example: { root: 'Am', notes: ['Bm7♭5','E7','Am'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const ii = chr(root,2), v = chr(root,7)
      return { root, notes:[`${ii}m7♭5`,`${v}7`,`${root}m`], chords:[`iiø7 — ${ii}m7♭5`,`V7 — ${v}7`,`im — ${root}m`] }
    }),
    chords: ['Key of Am: Bm7♭5 – E7 – Am','Key of Dm: Em7♭5 – A7 – Dm'],
    details: 'The minor ii-V-i uses a half-diminished (m7♭5) chord instead of a pure minor 7th for the ii.',
    usedBy: 'Jazz, film noir, bossa nova, sophisticated R&B',
    tip: 'The E7♯9 (Hendrix chord) over a minor ii-V-i in Am sounds incredible.',
  },
  {
    id: 'vi-iv-i-v', category: 'progressions', title: 'vi – IV – I – V (Minor-Start Pop)',
    tags: ['vi IV I V','minor start','emotional pop','rock','modern','someone like you'],
    summary: 'Starting on the minor vi chord gives the same 4 chords a darker, more emotional feel.',
    formula: 'vi – IV – I – V', degrees: 'Relative minor – Subdominant – Tonic – Dominant',
    example: { root: 'C major', notes: ['Am – F – C – G'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const vi = chr(root,9), iv = chr(root,5), v = chr(root,7)
      return { root, notes:[`${vi}m`,iv,root,v], chords:[`vi — ${vi}m`,`IV — ${iv}`,`I — ${root}`,`V — ${v}`] }
    }),
    chords: ['C key: Am – F – C – G','G key: Em – C – G – D'],
    details: 'This is the same chords as I-V-vi-IV, just starting from the vi. Starting on the minor chord creates a more introspective opening.',
    usedBy: 'Pop, ballads, acoustic, emotional rock',
    tip: 'Experiment with the same chord loop: play Am-F-C-G starting on Am, then restart on C. The starting chord changes your emotional entry point entirely.',
  },
  {
    id: 'blues-turnaround', category: 'progressions', title: 'Blues Turnaround',
    tags: ['turnaround','blues turnaround','I VI II V','quick change','jazz blues','chromatic'],
    summary: 'The final 2 bars of a 12-bar blues. Creates momentum back to bar 1.',
    formula: 'I – VI – II – V (bars 11-12) or I7 – ♯Idim – ii – V',
    degrees: 'Turns the end of the form back to the beginning with chromatic movement',
    example: { root: 'E', notes: ['E7 – C♯7 – A7 – B7 (bars 11-12)','Or: E7 – E♯dim – F♯m7 – B7'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const vi = chr(root,9), ii = chr(root,2), v = chr(root,7)
      return { root, notes:[`${root}7`,`${vi}7`,`${ii}7`,`${v}7`], chords:[`I7–${root}7`,`VI7–${vi}7`,`II7–${ii}7`,`V7–${v}7`] }
    }),
    chords: ['Classic: I7 – VI7 – II7 – V7 in last 2 bars'],
    details: 'The blues turnaround fills bars 11-12, creating momentum back to bar 1.',
    usedBy: 'Blues, jazz blues, R&B, rock and roll',
    tip: 'The most versatile turnaround: I7 – VI7 – II7 – V7. In E: E7 – C♯7 – A7 – B7.',
  },
  {
    id: 'flamenco-progression', category: 'progressions', title: 'Flamenco Progression (Rumba)',
    tags: ['flamenco','rumba','spanish','Am G F E','Andalusian','phrygian','Gipsy Kings'],
    summary: 'Am – G – F – E. The Andalusian Phrygian cadence driving all flamenco music.',
    formula: 'i – VII – VI – V  (descending Phrygian line)',
    degrees: 'Am – G – F – E in A Phrygian / harmonic minor',
    example: { root: 'Am', notes: ['Am','G','F','E (major!)'] },
    allKeys: [...ALL_ROOTS].map(root => {
      const vii = chr(root,10), vi = chr(root,8), v = chr(root,7)
      return { root, notes:[`${root}m`,vii,vi,`${v} (major)`], chords:[`i — ${root}m`,`VII — ${vii}`,`VI — ${vi}`,`V maj — ${v}`] }
    }),
    chords: ['Am key: Am – G – F – E','Em key: Em – D – C – B'],
    details: 'The flamenco/rumba progression is simply the Andalusian cadence played as a repeating loop.',
    usedBy: 'Flamenco, Latin pop, rumba, Spanish rock',
    tip: 'Strum Am (down-down-up), then G, F, E in the same pattern. The Spanish feel comes as much from the strumming rhythm as the chord choice.',
  },
]
