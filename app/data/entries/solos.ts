import type { GuitarEntry } from '../../types'

export const solos: GuitarEntry[] = [

  // ─── SCALE SOLO GUIDES ───────────────────────────────────────────────────────

  {
    id: 'pentatonic-minor-solo', category: 'solos', title: 'Minor Pentatonic — Solo Guide',
    tags: ['pentatonic minor','solo','blues','rock','bending','bb king','clapton','box pattern','beginner','E minor pentatonic','open position'],
    summary: 'The #1 solo scale. E open position gives you roots on both E strings with zero fretting — perfect starting point.',
    formula: 'Notes: 1  ♭3  4  5  ♭7 | E minor pent: E–G–A–B–D | Open str6, str3, str4, str5, str2 all scale tones',
    degrees: 'Style 1: Open E root-to-root ascent | Style 2: BB King bend str1 fret3 | Style 3: Triplet shuffle | Style 4: Full 6-bar arc in E open',
    example: {
      root: 'E minor pentatonic — open position',
      notes: [
        'Open ascent: str6 open E → str5 open A → str4 open D → str4 fret2 E (root octave) — 4 notes, all roots and 4th/♭7',
        'BB King bend: str1 fret3 (G = ♭3), whole-step bend upward 2 beats, release, str1 open E vibrato',
        'Triplet shuffle: str3 open G → str3 fret2 A → str2 open B — three-note cell, call then 2 beats space, response',
        'Build to peak: str5 fret2 B → str4 fret2 E → str3 fret2 A → str2 open B → str1 fret3 G bend — peak note',
      ],
    },
    allKeys: [], chords: ['Works over: Em, Am, Bm (minor i, iv, v)', 'Blues context: E7, A7, B7 (open chord voicings — all beginner-friendly)', 'Rock: E5, A5, D5 power chords — this scale fits every single one'],
    details: 'The minor pentatonic is the most-used solo scale in all of rock and blues. It removes the 2nd and 6th from natural minor, leaving 5 notes where almost any note sounds good against the chord.\n\nWhy E is the ideal starting key: Open string 6 (low E) = root. Open string 5 (A) = 4th. Open string 4 (D) = ♭7. Open string 3 (G) = ♭3. Open string 2 (B) = 5th. Every open string except the high e is in E minor pentatonic. You can play an entire pentatonic phrase without fretting a single note — just strum open strings in the right order. This makes E the most physically approachable key for a beginner while also being the most resonant.\n\nFull solo in E minor pentatonic — open position (8 bars):\nBars 1–2 (Intro): Open low E (str6) with vibrato. 4 beats. Single note. Establish the root.\nBar 3 (Ascent call): Open A (str5) → fret2 B (str5) → open D (str4) → fret2 E (str4). Stepwise climb.\nBar 4 (Silence): 4 beats empty. Let the climbing phrase sit in the air.\nBar 5 (Descent response): Open G (str3) → open A? No — str3 fret2 A → open B (str2) → fret3 D (str2) → open E (str1). Land on root.\nBar 6 (Build): Hammer-on str5 open A → fret2 B, pull-off back to A. Repeat 4 times — 16th notes at moderate tempo.\nBar 7 (Peak): String 1 fret 3 (G), whole-step bend, hold with wide vibrato. Peak note of the solo.\nBar 8 (Resolve): Release slowly to fret 1 (F, outside the scale — passing tone), slide to open E. Hold with gentle vibrato.\n\nPioneers: Chuck Berry established the pentatonic vocabulary in 1950s rock, playing in E constantly because electric guitars resonated best there. Eric Clapton on the John Mayall Bluesbreakers album (1966) — recorded in E minor pentatonic positions — became the template for rock lead guitar. B.B. King\'s "BB King box" clusters the ♭3, 4, and vibrato root on the B and high-e strings, which in E lands at frets 3 and 5 on the first two strings.',
    usedBy: '"Comfortably Numb" – Gilmour | "Back in Black" – Angus Young | "Crossroads" – Clapton | "Smells Like Teen Spirit" – Cobain',
    tip: 'Start by learning just the two high strings (B and high e) in E minor pentatonic: open B, fret3 D, open E, fret3 G. That 4-note cluster is the BB King box in E. Once those 4 notes feel effortless with vibrato and bends, add the remaining open strings and you have the full open-position scale.',
  },

  {
    id: 'blues-scale-solo', category: 'solos', title: 'Blues Scale — Solo Guide',
    tags: ['blues scale','blue note','b5','tritone','bb king','srv','stevie ray vaughan','soul','rock','E blues','open position','full solo','12-bar'],
    summary: 'Minor pentatonic + the ♭5 blue note. E is the best guitar root — every note is open or within 3 frets. Crying, yearning solos with chromatic tension.',
    formula: 'Notes: 1  ♭3  4  ♭5  5  ♭7 | E blues: E–G–A–Bb–B–D | Blue note (Bb) = chromatic cry, never hold it — pass through it',
    degrees: 'Style 1: Classic 12-bar blue note slide | Style 2: Texas heavy-bend (SRV) | Style 3: BB King call-space-response | Style 4: Full 8-bar arc in E open',
    example: {
      root: 'E blues — open position (E = best root on guitar)',
      notes: [
        'Bar 1 (Call): str5 open A → slide fret1 Bb (blue note!) → fret2 B. Hold B 2 beats with vibrato.',
        'Bar 2 (Silence): 4 beats silence — not a gap, this is the phrase. Listener\'s ear fills the void.',
        'Bar 3 (Response): str3 open G → str4 open D → str6 open E with slow wide vibrato. Resolution begins.',
        'Bar 4 (Peak): str1 fret3 G → bend whole-step toward A → hold 2 beats → release → open E root.',
      ],
    },
    allKeys: [
      { root: 'E',  notes: ['E','G','A','Bb','B','D'],    chords: ['E7','A7','B7'] },
      { root: 'F',  notes: ['F','Ab','Bb','B','C','Eb'],  chords: ['F7','Bb7','C7'] },
      { root: 'F#', notes: ['F#','A','B','C','C#','E'],   chords: ['F#7','B7','C#7'] },
      { root: 'G',  notes: ['G','Bb','C','Db','D','F'],   chords: ['G7','C7','D7'] },
      { root: 'Ab', notes: ['Ab','B','Db','D','Eb','Gb'], chords: ['Ab7','Db7','Eb7'] },
      { root: 'A',  notes: ['A','C','D','Eb','E','G'],    chords: ['A7','D7','E7'] },
      { root: 'Bb', notes: ['Bb','Db','Eb','E','F','Ab'], chords: ['Bb7','Eb7','F7'] },
      { root: 'B',  notes: ['B','D','E','F','F#','A'],    chords: ['B7','E7','F#7'] },
      { root: 'C',  notes: ['C','Eb','F','Gb','G','Bb'],  chords: ['C7','F7','G7'] },
      { root: 'Db', notes: ['Db','E','F#','G','Ab','B'],  chords: ['Db7','Gb7','Ab7'] },
      { root: 'D',  notes: ['D','F','G','Ab','A','C'],    chords: ['D7','G7','A7'] },
      { root: 'Eb', notes: ['Eb','Gb','Ab','A','Bb','Db'], chords: ['Eb7','Ab7','Bb7'] },
    ],
    chords: ['12-bar cycle in E: E7 (4 bars) → A7 (2 bars) → E7 (2 bars) → B7 (1) → A7 (1) → E7 (2)', 'Blue note (Bb) over E7: slide A → Bb → B, never land on Bb', 'Works over all three dominant 7th chords in any 12-bar key'],
    details: 'The blues scale adds one note to the minor pentatonic: the ♭5 (Bb in E blues), the "blue note." This note creates intense chromatic tension that resolves naturally to the 5th (B). It is never held — it is a passing tone, a cry between A and B.\n\nWhy E is the best root on guitar: Open string 6 (low E) = root. Open string 5 (A) = 4th. Open string 2 (B) = 5th. Open string 4 (D) = ♭7. Open string 3 (G) = ♭3. The only note in the E blues scale that requires fretting in the first position is fret 1 on the A string — Bb, the blue note itself. The guitar resonates sympathetically in E: unpressed strings ring in harmony with the scale, creating natural reverb and resonance that other keys cannot match.\n\nFull 8-bar solo in E blues — open position:\nBar 1 (Call): String 5 — open A, slide through fret 1 Bb (blue note flash), land on fret 2 B. Hold with light vibrato. 4 beats total.\nBar 2 (Silence): 4 full beats empty. This is the call-response space. The listener\'s ear anticipates the response. Never skip this.\nBar 3 (Response): String 3 open G → string 4 open D → string 6 open E with slow wide vibrato. Let the open strings ring together — this IS the E blues sound.\nBar 4 (Rest): Hold open E (string 6) with gentle vibrato for the full bar. Complete resolution.\nBar 5 (Build): Triplet run on string 3 — open G, fret2 A, fret3 Bb, back to fret2 A. Repeat twice (6 notes in 1 beat). Tension rises from the resting point.\nBar 6 (Build): Ascend across strings — str4 open D → str3 fret2 A → str2 open B → str1 fret3 G. Whole-step bend on G toward A.\nBar 7 (Climax): String 1 fret 3 (G): bend as far as possible, hold bent note with wide slow vibrato for 2 beats. The emotional peak of the solo.\nBar 8 (Resolve): Release bend completely, slide down to open high e (E). Hold with gentle vibrato. Single note. Silence. Done.\n\nPioneers: B.B. King performed in E blues nightly for 60 years. His "The Thrill Is Gone" solo is structurally this exact 8-bar arc — call, space, response, build, peak, resolve — demonstrating that simplicity with intention beats complexity every time. Robert Johnson (1930s) created the foundational acoustic E blues vocabulary in Robinsonville, Mississippi. Stevie Ray Vaughan used 13-gauge strings to generate massive physical bends on E blues open position — "Pride and Joy" and "Texas Flood" are built entirely in this position. The reason SRV\'s tone was so warm and resonant is partly the sympathetic resonance of open strings ringing while he played fretted notes nearby.',
    usedBy: '"The Thrill Is Gone" – B.B. King (E blues) | "Pride and Joy" – SRV (E blues open) | "Texas Flood" – SRV | "Crossroads" – Clapton (Cream live) | "Born Under a Bad Sign" – Albert King',
    tip: 'In E blues, the 3-note sequence on string 5 — open A (fret0) → Bb (fret1) → B (fret2) — IS the blues sound. Practice just those 3 notes: slide up to Bb, pause, slide to B with vibrato. Vary the timing. This triplet with space and feel creates more emotion than 100 fast notes. Master it before everything else.',
  },

  {
    id: 'major-pentatonic-solo', category: 'solos', title: 'Major Pentatonic — Solo Guide',
    tags: ['major pentatonic','country','southern rock','double stops','bright','happy','brad paisley','allman brothers','E major pentatonic'],
    summary: 'Bright 5-note scale. E major pentatonic open position gives the country and gospel sound with open string ring.',
    formula: 'Notes: 1  2  3  5  6 | E major pent: E–F#–G#–B–C# | Key technique: double-stop 6ths + hybrid picking',
    degrees: 'Style 1: Open E double-stop 6ths | Style 2: Country chicken pickin | Style 3: Ascending bright run | Style 4: Full 6-bar arc in E',
    example: {
      root: 'E major pentatonic — open position',
      notes: [
        'Double-stop 6ths: str1 open E + str3 fret1 G# together (a 6th interval) — bright country shimmer',
        'Chicken pickin: str6 open E pick, then middle finger snap str4 fret2 E simultaneously — snappy attack',
        'Ascending run: str6 open E → fret2 F# → fret4 G# → str5 fret2 B → fret4 C# — bright country ascent',
        'Peak and resolve: str1 fret4 G# with vibrato (3rd degree = bright peak), resolve to open E root',
      ],
    },
    allKeys: [], chords: ['Works over: E, A, B major chords (I, IV, V in E major)', 'Best over open-position E major chord — the resonance is maximum', 'E major pent + E minor pent = same 5 notes, different root feel — switch mid-solo for instant colour change'],
    details: 'The major pentatonic (1 2 3 5 6) removes the 4th and 7th from the major scale, leaving a bright, tension-free sound — the sonic opposite of the minor pentatonic. It is the foundation of country, gospel, and Southern rock lead playing.\n\nE major pentatonic (E F# G# B C#) in open position: The open low E = root. The B string open = 5th. The high e open = root octave. G# appears at fret 1 on string 3 (just one finger down from open). This gives you root–5th–root across strings 6, 2, and 1 with almost no fretting. The sound is immediately bright and resolved — no tension, all joy.\n\nFull solo in E major pentatonic — open position (6 bars):\nBar 1: Open high e (E root octave) + open B string together. Hold as a double-stop for 2 beats. Bright, resolved opening.\nBar 2: Ascend — str6 open E → fret2 F# → fret4 G# → str5 fret2 B. Stop on B with vibrato.\nBar 3: Double-stop 6ths — str1 open E + str3 fret1 G# → str1 fret2 F# + str3 fret2 A. Two pairs of 6ths ascending.\nBar 4: Country run — str5 fret4 C# → str4 fret2 E (root) → str3 fret4 B → str2 fret2 C#. Descending bright.\nBar 5 (Peak): str1 fret4 G# (the major 3rd — the brightest note). Bend slightly, hold with vibrato 2 beats.\nBar 6 (Resolve): str1 fret2 F# → str1 open E. End on root with gentle fade.\n\nPioneers: Chet Atkins (1950s–60s) established fingerpicking major pentatonic vocabulary in country, often in E with open string ring. Dickey Betts (Allman Brothers) made the double-stop 6th run in G major pentatonic a Southern rock signature — "Jessica" is almost entirely this technique. Brad Paisley is the modern master of this vocabulary, blending chicken-pickin hybrid technique with major pentatonic in open E and G positions.',
    usedBy: '"Jessica" – Allman Brothers (Dickey Betts) | "Can\'t You See" – Marshall Tucker Band | Brad Paisley country leads | Chet Atkins fingerpicking style',
    tip: 'E major pentatonic and C# minor pentatonic are the same 5 notes (relative major/minor relationship). If a song is in E major, play E major pentatonic. If it feels too "happy," shift your thinking to C# minor pentatonic — same fingers, darker emotional framing. This trick lets you instantly shift the mood of a solo without moving your hand.',
  },

  {
    id: 'natural-minor-solo', category: 'solos', title: 'Natural Minor (Aeolian) — Solo Guide',
    tags: ['natural minor','aeolian','rock','metal','classic rock','jimmy page','dark','emotional','7 notes','E natural minor','open position'],
    summary: 'Full 7-note minor scale. E natural minor open position is the most resonant dark-rock scale on guitar — open strings on 5 of 7 notes.',
    formula: 'Notes: 1  2  ♭3  4  5  ♭6  ♭7 | E natural minor: E–F#–G–A–B–C–D | ♭6 (C) = the "epic" note vs pentatonic',
    degrees: 'Style 1: Open E stepwise melodic arc | Style 2: ♭6 (C) peak-and-hold | Style 3: 3-note-per-string metal run | Style 4: Power ballad resolve',
    example: {
      root: 'E natural minor — open position',
      notes: [
        'Melodic arc: str6 open E → fret2 F# → fret3 G → str5 open A → fret2 B → fret3 C (♭6 peak!) — hold C with vibrato',
        'Epic descent: C (str5 fret3) → B (str5 fret2) → open A → open G (str3) → open E — complete Aeolian descent',
        '3-note-per-string metal: str6 [E, F#, G] → str5 [A, B, C] → str4 [D, E, F#] — 16th notes, position shift each string',
        'Ballad peak: ascend to high C (str2 fret1) — hold with slow wide vibrato 4 beats. The ♭6 is the sky of the scale.',
      ],
    },
    allKeys: [], chords: ['Diatonic chords in E: Em, F#°, G, Am, Bm, C, D', 'Classic rock move: Em → C → G → D (i → VI → III → VII)', 'Works over: Em power chord, C major, G major, D major — all open-position cowboy chords'],
    details: 'Natural minor (Aeolian) is the full 7-note minor scale — the emotional backbone of rock and metal. Adding the 2nd (F#) and ♭6 (C) to the pentatonic minor creates a "bigger sky" feeling: more melodic, more orchestral, darker and more complete.\n\nE natural minor open position: Open strings 6 (E=root), 5 (A=4th), 4 (D=♭7), 3 (G=♭3), 2 (B=5th), 1 (E=root) — 5 of 7 notes of the scale appear as open strings. The 2nd (F#) is at fret 2 on strings 6 and 1. The ♭6 (C) — the most powerful and dramatic note — is at fret 3 on string 5 and fret 1 on string 2. This means you can play an entire emotionally complete phrase across all 6 strings while barely leaving first position.\n\nFull solo in E natural minor — open position (8 bars):\nBar 1 (Establish): Open low E, whole note with vibrato. Root. Darkness.\nBar 2 (Call): Ascending — open E → fret2 F# → fret3 G (str6) → open A → fret2 B (str5). Stop on B.\nBar 3 (Epic moment): fret3 C on string 5. Hold with wide slow vibrato for 2 beats. This is the ♭6. Nothing in pentatonic gives you this sound.\nBar 4 (Response): C → B → open A → open G (str3) → open D (str4) → open E (str6). Descend fully, land on root.\nBar 5 (Build): Fast 3-note-per-string run ascending: [E, F#, G] on str6 → [A, B, C] on str5 → [D, E] on str4. 16th notes.\nBar 6 (Build higher): str3 [G, A] → str2 [B, C fret1] → str1 open E octave root. Peak at high E.\nBar 7 (Climax): Hold str2 fret1 C (♭6) with maximum vibrato. Two beats. The sky of the scale.\nBar 8 (Resolve): C → str2 open B → str1 open E. Three notes. Root. Done.\n\nPioneers: Jimmy Page (Led Zeppelin) used E natural minor extensively — "Stairway to Heaven," "Since I\'ve Been Loving You," and "The Rain Song" all operate in this space. Randy Rhoads fused natural minor with classical voicing on the first two Ozzy albums. Kirk Hammett (Metallica) built his ballad solos — "Nothing Else Matters," "Fade to Black" — almost entirely from natural minor with the ♭6 as the peak note.',
    usedBy: '"Stairway to Heaven" – Jimmy Page | "Crazy Train" – Randy Rhoads | "Nothing Else Matters" – Kirk Hammett | "Since I\'ve Been Loving You" – Jimmy Page',
    tip: 'The ♭6 (C in E natural minor, at str5 fret3 or str2 fret1) is what separates this scale from the pentatonic. In a slow solo, hold that note with wide vibrato — it sounds like an orchestra. In a fast solo, let it flash briefly as a passing tone. Either way, it\'s the most distinctive sound in the scale.',
  },

  {
    id: 'dorian-solo', category: 'solos', title: 'Dorian Mode — Solo Guide',
    tags: ['dorian','mode 2','santana','jazz','funk','latin','raised 6th','soulful','minor jazz','E Dorian','open position'],
    summary: 'Minor with a raised 6th. E Dorian open position: play E natural minor but make the B string C# instead of C — that one change is the entire Dorian sound.',
    formula: 'Notes: 1  2  ♭3  4  5  6  ♭7 | E Dorian: E–F#–G–A–B–C#–D | Raised 6th = C# (fret2 on B string vs fret1 C in natural minor)',
    degrees: 'Style 1: E minor pent + add C# (Santana) | Style 2: Open E Dorian legato chain | Style 3: Am7→A vamp | Style 4: Full 6-bar Dorian arc',
    example: {
      root: 'E Dorian — open position',
      notes: [
        'Santana add-6th: play E minor pentatonic lick, then hit C# (str2 fret2) instead of C (fret1) — that one note change = Dorian brightness',
        'Legato chain: str6 [E, F#, G] hammer → str5 [A, B, C#] hammer → str4 [D, E] hammer — smooth ascending Dorian run',
        'Dorian vamp: Em7 → A major chord (not Am). The A major chord is only possible because Dorian has C#, not C.',
        'Peak phrase: ascend to C# (str5 fret4 or str2 fret2), hold with vibrato, resolve down to B then open E — Santana signature.',
      ],
    },
    allKeys: [], chords: ['Dorian home: Em7 | The raised 6th creates: A major (IV major inside minor — Dorian signature)', 'Modal vamp in E: Em7 → A (i–IV is the Dorian signature progression, same as Santana "Oye Como Va")', 'Works over: any minor vamp where the IV chord is major'],
    details: 'Dorian is the 2nd mode of the major scale — identical to natural minor but with one note raised: the 6th. That single note (C# instead of C in E Dorian) transforms the mood from dark and heavy to jazzy, soulful, and bright.\n\nE Dorian vs E natural minor — just one note different: Natural minor has C (fret1 on B string). Dorian has C# (fret2 on B string). Everything else is identical. But that one note changes the IV chord from Am to A major — and that A major chord is the defining sound of Dorian in E. The i–IV progression (Em → A) is called the "Dorian progression" and is the backbone of Santana\'s entire catalog.\n\nFull solo in E Dorian — open position (6 bars):\nBar 1 (Establish): Open E string, vibrato. Then fret2 F# (str6), hold. State the root and 2nd clearly.\nBar 2 (Ascending Dorian): str5 open A → fret2 B → fret4 C# (the Dorian note!). Hold C# with vibrato. The soulful brightness appears.\nBar 3 (Descend): C# → str2 open B → str3 fret2 A → str3 open G → str4 open D → str6 open E. Full descent, land on root.\nBar 4 (Funk vamp phrase): Short motif — str4 open D (♭7) → str4 fret2 E (root) → str2 fret2 C# (raised 6th). Repeat 3 times with rhythmic accents. This 3-note cell IS the Dorian vocabulary.\nBar 5 (Build): Fast ascending from E to C# and back down — 16th notes. The raised C# stands out from the G and A around it.\nBar 6 (Resolve): Land on open E root. Single note, long vibrato. Silence.\n\nPioneers: Miles Davis built "Kind of Blue" (1959) — the best-selling jazz album of all time — on D Dorian and G Mixolydian. Carlos Santana adopted Dorian as his primary scale; most of his lead vocabulary is A and D Dorian, translated to open-E equivalent positions. Allan Holdsworth pushed Dorian legato to saxophone-level fluidity in the 1970s–80s, using hammer-on chains across the entire neck with almost no picking.',
    usedBy: '"Oye Como Va" – Santana (A Dorian) | "So What" – Miles Davis (D Dorian) | "La Grange" – ZZ Top | Allan Holdsworth fusion solos',
    tip: 'To instantly hear the Dorian sound in E: play the E natural minor scale but when you reach the B string, press fret 2 (C#) instead of fret 1 (C). Play a phrase ending on that C# note. That single half-step shift from C to C# is the complete transformation from dark Aeolian to soulful Dorian.',
  },

  {
    id: 'mixolydian-solo', category: 'solos', title: 'Mixolydian Mode — Solo Guide',
    tags: ['mixolydian','mode 5','bluesy major','hendrix','classic rock','country','dominant','flat 7','E Mixolydian','open D string'],
    summary: 'Major scale with a ♭7. In E Mixolydian, the open D string IS the ♭7 — play open E then open D and you have already played the defining Mixolydian interval.',
    formula: 'Notes: 1  2  3  4  5  6  ♭7 | E Mixolydian: E–F#–G#–A–B–C#–D | The ♭7 = open D string (str4)',
    degrees: 'Style 1: Open E → open D root–♭7 move | Style 2: Hendrix E Mixo-blues | Style 3: Ascending bright run to peak | Style 4: Cliffs of Dover style fast run',
    example: {
      root: 'E Mixolydian — open position',
      notes: [
        'Root→♭7 move: str6 open E → str4 open D — those two open strings are the entire Mixolydian character in one interval',
        'Hendrix move: E minor pentatonic lick, then hit G# (str3 fret1 or str6 fret4) — the major 3rd transforms it to Mixolydian',
        'Bright ascent: str6 open E → fret2 F# → fret4 G# → str5 open A → fret2 B → fret4 C# → str4 open D. The ♭7 at the top.',
        'Peak and root: ascend to C# (str5 fret4 or str2 fret2) with vibrato, resolve down through D to open E — Mixolydian arc.',
      ],
    },
    allKeys: [], chords: ['Best over: E dominant 7th (E7) chord', 'Classic rock progression in E: E → D → A (I → ♭VII → IV)', 'Also powerful: E → D (root → ♭7 chord, the two-chord vamp)'],
    details: 'Mixolydian is the 5th mode of the major scale — a major scale with a flattened 7th. The ♭7 creates a "bluesy major" tension: bright like a major scale but with an unresolved, eternally rocking quality.\n\nE Mixolydian and open strings: In E Mixolydian (E F# G# A B C# D), note what the open strings are: string 6 = E (root), string 5 = A (4th), string 4 = D (♭7!), string 3 = G (not in scale — need G# at fret1), string 2 = B (5th), string 1 = E (root octave). The open D string (string 4) is literally the defining ♭7 of E Mixolydian. Just picking string 6 open (E root) then string 4 open (D = ♭7) gives you the two most important notes of the scale — zero fretting. This is why "Hey Joe" and countless classic rock songs in E feel so natural and powerful.\n\nFull solo in E Mixolydian — open position (6 bars):\nBar 1 (Root→♭7 statement): Open E (str6) → open D (str4). Two notes. 4 beats. Hold D with vibrato. This IS Mixolydian.\nBar 2 (Major 3rd colour): str3 fret1 G# → str5 open A → str5 fret2 B. The G# (major 3rd) is the "bright" note. End on B.\nBar 3 (Ascending): Full scale ascent — E, F#, G#, A, B, C#, D, E — from str6 to str1 open. Quick 16th-note run.\nBar 4 (Descend Hendrix): str1 open E → str2 fret2 C# → str2 open B → str3 fret1 G# → str3 fret2 A → str4 open D. End on D (♭7).\nBar 5 (Build): str4 open D → slide-up str4 fret2 E (root) → str3 fret2 A → str2 open B → str1 fret4 G# with vibrato.\nBar 6 (Resolve): str1 fret4 G# → str1 fret2 F# → str6 open E. Descend to root. Silence.\n\nPioneers: Jimi Hendrix used E Mixolydian constantly — "Hey Joe," "Foxey Lady," "Voodoo Child" all blend E Mixolydian with E blues, the result of overlaying a major 3rd (G#) and a ♭7 (D) over a minor pentatonic framework. Eric Johnson\'s "Cliffs of Dover" is almost entirely E Mixolydian ascending and descending runs at high speed. Jerry Garcia (Grateful Dead) improvised in Mixolydian for extended passages — his modal approach is the template for jam-band guitar.',
    usedBy: '"Hey Joe" – Hendrix (E Mixolydian) | "Cliffs of Dover" – Eric Johnson (E Mixolydian) | "Rocky Mountain Way" – Joe Walsh | "Sweet Home Alabama" chord context – Lynyrd Skynyrd',
    tip: 'The instant Mixolydian test in E: play E major scale but when you reach the leading tone (D#), play D natural instead. That single note change is the transformation. Hendrix knew D natural was the "rocking" note — it\'s what stops the scale from resolving too cleanly and keeps the energy suspended and powerful.',
  },

  {
    id: 'harmonic-minor-solo', category: 'solos', title: 'Harmonic Minor — Solo Guide',
    tags: ['harmonic minor','neoclassical','yngwie','randy rhoads','metal','exotic','raised 7th','shred','sweep','E harmonic minor','D# leading tone'],
    summary: 'Natural minor with ♯7 — exotic drama. In E harmonic minor, the D# leading tone is just 1 fret up from the open D string.',
    formula: 'Notes: 1  2  ♭3  4  5  ♭6  ♯7 | E harmonic minor: E–F#–G–A–B–C–D# | D# (str4 fret1) → E (str4 fret2) = the exotic leading-tone resolution',
    degrees: 'Style 1: D# → E hammer-on (leading tone) | Style 2: Bach ascending 16th run | Style 3: Em arpeggio + B major (V chord) | Style 4: Augmented 2nd C→D# leap',
    example: {
      root: 'E harmonic minor — open position',
      notes: [
        'Leading tone phrase: str4 fret1 D# → hammer str4 fret2 E (root). Single note, huge drama. The exotic sound in one motion.',
        'Bach run: ascending E harm. minor [E, F#, G, A, B, C, D#, E] — 16th notes, accent every 4th note for sequential pattern',
        'V chord drama: play B major chord (B, D#, F#) — this chord only exists because of the D#. Resolve to Em for maximum drama.',
        'Augmented 2nd: C (str5 fret3) → D# (str4 fret1) — skip a whole step + half step. That wide leap IS the exotic interval.',
      ],
    },
    allKeys: [], chords: ['Diatonic in E: Em, F#°, Gaug, Am, B (dominant!), C, D#°', 'Key chord: B major (V major) — requires D# natural, only possible with harmonic minor', 'Cadence: B major → Em = classical dominant-to-tonic resolution, "Gates of Babylon" style'],
    details: 'Harmonic minor raises the 7th degree of natural minor by a half step, creating a strong leading tone that resolves upward to the root. The gap between the ♭6 and ♯7 is an augmented 2nd (3 semitones) — the interval that gives harmonic minor its exotic, Spanish, and Middle Eastern character.\n\nE harmonic minor and the open position: E natural minor becomes E harmonic minor by changing D (open string 4) to D# (fret 1 on string 4). That is a single fret difference. The D# (one semitone below root E) pulls powerfully toward E — more strongly than any other note in any scale. In the open position, this means: str4 open (D) = natural minor sound; str4 fret1 (D#) = harmonic minor exotic drama. The difference is just one half-step, one fret, but the emotional effect is enormous.\n\nFull solo in E harmonic minor — open position (7 bars):\nBar 1 (Establish): Open E (str6), vibrato. Descend: str6 fret3 G → str5 open A → str4 fret1 D# → hammer to fret2 E. Land on root.\nBar 2 (The leading tone): str4 fret1 D# alone. Single note. Hold 2 beats. Then resolve — hammer to str4 fret2 E. Pure drama.\nBar 3 (Ascending run): [E, F#, G] str6 → [A, B, C] str5 → [D#, E] str4. 8th notes. The augmented 2nd (C→D#) stands out clearly.\nBar 4 (Augmented 2nd phrase): str5 fret3 C → leap to str4 fret1 D# (the augmented 2nd gap) → hammer fret2 E. Slow, deliberate. 3 notes.\nBar 5 (Build sweep): Outline B major arpeggio — str5 fret2 B → str4 fret1 D# → str3 fret2 (wait, F# at str3 fret4 = B string context) ... ascending B, D#, F# across strings. The V chord arpeggio.\nBar 6 (Peak): str2 fret4 D# — the leading tone in the high octave. Hold with vibrato. The tension is extreme.\nBar 7 (Resolve): str2 fret4 D# → open str2 B (pull-off) → open str1 E root. Three notes. Total resolution.\n\nPioneers: Randy Rhoads (1981–82) was the first to fuse classical harmonic minor with heavy metal on the Ozzy Osbourne albums "Blizzard of Ozz" and "Diary of a Madman" — he studied classical guitar privately and transferred Bach and Mozart harmonic language to electric guitar. Yngwie Malmsteen built an entire genre (neo-classical metal) from E harmonic minor sweep arpeggios starting in 1983. Ritchie Blackmore (Deep Purple/Rainbow) used E harmonic minor in "Gates of Babylon" — the song that Malmsteen studied obsessively.',
    usedBy: '"Crazy Train" – Randy Rhoads | "Mr. Crowley" – Randy Rhoads | "Far Beyond the Sun" – Yngwie Malmsteen | "Gates of Babylon" – Ritchie Blackmore',
    tip: 'To instantly hear E harmonic minor: tune your ear to the D# → E hammer-on on string 4 (fret1 → fret2). That half-step resolution is the most powerful sound in the scale. Now build a phrase around it — descend from C to D# to E. Those three notes alone sound like Yngwie. Practice just those three notes with perfect tone before tackling the full scale.',
  },

  {
    id: 'diminished-solo', category: 'solos', title: 'Diminished Scale — Solo Guide',
    tags: ['diminished','octatonic','symmetrical','jazz','progressive','metal','outside','tension','allan holdsworth'],
    summary: '8-note symmetrical scale. Maximum tension, symmetrical patterns, and outside jazz sound.',
    formula: 'Notes (W–H): 1  2  ♭3  4  ♭5  ♭6  6  7 | Symmetry: same lick works 3, 6, 9 frets higher',
    degrees: 'Style 1: Symmetrical 3-fret transpose lick | Style 2: Dim7 sweep arpeggios | Style 3: Dominant 7♭9 jazz | Style 4: Outside tension',
    example: {
      root: 'C diminished (W–H)',
      notes: [
        'Symmetrical lick: play any 4-note pattern then move it exactly 3 frets up — it fits the scale again (and again at +6, +9)',
        'Dim7 sweep arpeggios: stack minor 3rds (C–Eb–Gb–A) and sweep — 4-note dim7 arpeggio repeats at every minor 3rd interval',
        'Dominant 7♭9 jazz: use C# diminished scale over C dominant 7 (G7) — creates altered ♭9 and ♯9 colour over the chord',
        'Outside tension: play diminished run over a standard minor chord for "outside" chromatic tension then resolve back',
      ],
    },
    allKeys: [], chords: ['Works over: dim7 chord', 'Also over: dom7♭9 chord (use diminished scale starting a half step above the root)', 'Only 3 unique diminished scales exist — same scale transposed every 3 semitones'],
    details: 'The diminished scale (octatonic) alternates whole and half steps, producing 8 notes per octave. Its defining feature is perfect symmetry — it repeats every minor 3rd (3 frets), meaning there are only 3 truly unique diminished scales covering all 12 keys. Pioneers: Jazz pianists and theorists (Barry Harris, etc.) codified the diminished scale for bebop. On guitar, Allan Holdsworth explored symmetrical and octatonic scales as part of his vocabulary in the 1970s–80s. Frank Zappa used diminished harmony in his more avant-garde compositions. Dimebag Darrell (Pantera) used diminished arpeggios in "Floods" and other solos, bringing the sound into mainstream metal. Note timing: the symmetrical structure enables mechanical, even 16th-note runs that sound both mathematical and intense. The "move 3 frets" trick allows rapid transpositions without learning new fingering.',
    usedBy: '"Floods" – Dimebag Darrell (Pantera) | Allan Holdsworth fusion solos | Jazz over dim7 and dom7♭9 chords | Frank Zappa advanced compositions',
    tip: 'There are only 3 unique diminished scales (C/Eb/Gb/A, C#/E/G/Bb, D/F/Ab/B). Learn one pattern in one of these three groups and you can transpose it to cover 4 keys at once.',
  },

  {
    id: 'whole-tone-solo', category: 'solos', title: 'Whole Tone Scale — Solo Guide',
    tags: ['whole tone','symmetrical','jazz','dreamy','augmented','floating','satriani','chet atkins','impressionist'],
    summary: 'All whole steps — dreamy, tonally ambiguous, floating. Works over augmented chords.',
    formula: 'Notes: 1  2  3  ♯4  ♯5  ♭7 | Every interval is a whole step — no half steps, no resolution',
    degrees: 'Style 1: Ascending float run | Style 2: Sequential 3rds shimmer | Style 3: Augmented chord resolve | Style 4: Legato slide',
    example: {
      root: 'C whole tone',
      notes: [
        'Ascending float: slow legato ascent C→D→E→F#→G#→A# — no landing note feels "home," creating an unmoored floating quality',
        'Sequential 3rds: play pairs of notes a 3rd apart (C–E, D–F#, E–G#) up the scale — shimmering parallel 3rds',
        'Augmented chord resolve: play whole tone run over Caug chord then resolve down a half step to Cmaj7 — classic jazz move',
        'Legato slide: slide between each whole-step interval with fretting hand — continuous glide through the scale',
      ],
    },
    allKeys: [], chords: ['Works over: augmented triad (1–3–♯5)', 'Also over: dom7♯5 chord (1–3–5–♭7 with raised 5th)', 'Only 2 unique whole tone scales exist — all 12 keys covered by just two patterns'],
    details: 'The whole tone scale divides the octave into 6 equal whole steps. Because every interval is identical, the scale has no gravitational centre — no note feels like "home" — producing a floating, dreamlike, tonally ambiguous quality. Pioneers: Claude Debussy (French impressionist composer) used whole tone harmony extensively in piano music (early 1900s), influencing jazz. Thelonious Monk and other jazz pianists used whole tone passages over augmented and dominant chords. On guitar, Joe Satriani incorporated whole tone coloring in "Flying in a Blue Dream" and other instrumental pieces. Chet Atkins (1950s–60s) explored whole tone runs in his jazz-influenced country style. Note timing: whole tone runs are typically played as flowing 8th or 16th notes, often with legato technique. Because the scale resolves nowhere on its own, it is used in short bursts (2–4 bars) before resolving to a diatonic scale. Holding notes with vibrato over augmented chords is particularly effective.',
    usedBy: '"Flying in a Blue Dream" – Joe Satriani | Chet Atkins jazz-influenced country playing | Jazz guitar over augmented and dom7♯5 chords | Debussy-influenced film scores',
    tip: 'There are only 2 unique whole tone scales: C–D–E–F#–G#–A# and C#–D#–F–G–A–B. Every note in Western music belongs to one of these two. Learn both patterns and you have the full whole-tone universe.',
  },

  {
    id: 'major-scale-solo', category: 'solos', title: 'Major Scale (Ionian) — Solo Guide',
    tags: ['major scale','ionian','pop','jazz','country','prince','mark knopfler','george harrison','bright','melodic','E major','open position'],
    summary: 'The bright foundational scale. E major open position — roots on both E strings, bright G# and C# distinguish it from the minor.',
    formula: 'Notes: 1  2  3  4  5  6  7 | E major: E–F#–G#–A–B–C#–D# | D# (str4 fret1) = bright leading tone, resolves powerfully to E',
    degrees: 'Style 1: Diatonic stepwise E melody | Style 2: Harmonized 3rds in E | Style 3: Chord-tone arc (E, G#, B, D#) | Style 4: Country ascending run',
    example: {
      root: 'E major — open position',
      notes: [
        'Stepwise melody: str6 open E → fret2 F# → fret4 G# → str5 open A → fret2 B → fret4 C#. Singable, resolved, bright.',
        'Harmonized 3rds: str1 open E + str3 fret1 G# = a 3rd. Move both up step-by-step — George Harrison Beatles shimmer.',
        'Chord-tone arc: E (root) → G# (3rd, str3 fret1) → B (5th, str2 open) → D# (7th, str4 fret1) → resolve to E. Jazz voice.',
        'Country run: fast 3-note-per-string ascent [E, F#, G#] str6 → [A, B, C#] str5 → [D#, E] str4. Bright and decisive.',
      ],
    },
    allKeys: [], chords: ['Diatonic chords in E: E, F#m, G#m, A, B, C#m, D#°', 'Best over: E major (I), A major (IV), B major (V) — all open-position cowboy chords', 'Works over: any song in E major key'],
    details: 'The major scale (Ionian mode) is the foundation of all Western music. Its bright, fully resolved sound is the sonic opposite of the minor pentatonic — where the minor pentatonic speaks of emotion and darkness, the major scale speaks of joy, resolution, and completeness.\n\nE major open position: Open low E (root), open A (4th), open B (5th), open high e (root octave). G# = fret 1 on string 3 (the brightest single note in the scale — the major 3rd). C# = fret 2 on strings 2 and 5. D# = fret 1 on string 4 (the leading tone, 1 semitone below root). That D# → open E (fret1 → fret0) resolves with the same brightness as a classical cadence. The E major scale in open position sounds fully classical and complete — like a world in resolution.\n\nFull solo in E major — open position (8 bars):\nBar 1 (Establish): Open low E, then str3 fret1 G# (major 3rd) together as a double-stop. Bright and resolved. Hold.\nBar 2 (Stepwise ascent): E → F# → G# (str6) → A (str5 open) → B (str5 fret2) → C# (str5 fret4). Stop on C# with vibrato.\nBar 3 (Harmonized 3rds): str1 open E + str3 fret1 G# → str1 fret2 F# + str3 fret2 A → str1 fret4 G# + str3 fret4 B. Three pairs of parallel 3rds ascending — the George Harrison technique.\nBar 4 (Chord tones): Target E → G# → B as a phrase. str6 open E → str3 fret1 G# → str2 open B. Three notes. Root, 3rd, 5th. Pure chord melody.\nBar 5 (Build): Fast 16th-note run ascending full E major scale: E F# G# A B C# D# E. One complete octave.\nBar 6 (Leading tone moment): str4 fret1 D# — hold 2 beats with vibrato. The whole scale is pointing here: the D# wants to resolve.\nBar 7 (Peak-resolve): D# (str4 fret1) → hammer to open E (str4 fret0 → wait, open). Actually: str4 fret1 D# → str4 fret2 E (root) with a slow expressive release. Or: D# → slide to open E root.\nBar 8 (Ending): Open low E string + open high e string together. Both octave roots ringing. Silence.\n\nPioneers: George Harrison (The Beatles) brought major scale melodic leads to pop in the 1960s — his solos in "Something" and "Here Comes the Sun" are entirely Ionian, targeting chord tones. Mark Knopfler (Dire Straits) is the modern master — "Sultans of Swing," "Romeo and Juliet," and all his fingerpicking work demonstrates the full expressive range. Prince ("Purple Rain") used E major and E Mixolydian interchangeably, the famous "Purple Rain" solo building in E Ionian to an emotionally overwhelming peak note.',
    usedBy: '"Purple Rain" – Prince (E major/Mixolydian) | "Something" – George Harrison | "Sultans of Swing" – Mark Knopfler | "Here Comes the Sun" – George Harrison',
    tip: 'Target chord tones (E, G#, B, D#) on beat 1 of every chord change. The scale notes between them become passing tones. This one rule transforms "playing the scale" into "playing a melody over the chords." Start with just root and 3rd (E and G#) — two notes with strong melodic intent sounds better than eight notes with none.',
  },

  // ─── SOLO THEORY GUIDES ──────────────────────────────────────────────────────

  {
    id: 'solo-construction', category: 'solos', title: 'How to Build a Guitar Solo',
    tags: ['solo construction','phrasing','call response','climax','arc','peak note','theory','improvisation'],
    summary: 'The 4 principles every great solo follows: anchor, arc, space, and resolve.',
    formula: 'Intro (simple) → Build (density rises) → Peak (highest note + vibrato) → Resolve (back to root)',
    degrees: 'Anchor = chord tones | Passing = scale tones | Space = rests | Peak = planned highest note',
    example: {
      root: 'Solo arc structure',
      notes: [
        'Intro: start with a simple 2-bar motif on the root or 5th — establish your key and tone',
        'Build: repeat the motif then add a 2nd phrase that climbs higher — increase note density from 8ths to 16ths',
        'Peak: arrive at the highest note in the solo (planned!) — hold with wide slow vibrato for 2–4 beats',
        'Resolve: descend phrase back down to root — end on root, 3rd, or 5th for resolution',
      ],
    },
    allKeys: [], chords: ['Chord tones (stable landing): 1, 3, 5, 7', 'Passing tones (brief, connecting): 2, 4, 6', 'Outside passing: chromatic notes one half-step from chord tone — resolve immediately'],
    details: 'Every memorable guitar solo follows the same dramatic arc: introduction, development, climax, and resolution. This mirrors the structure of a song, a speech, or a story. The most common beginner mistake is playing at constant density and intensity — this creates a "noodling" effect. The solution is deliberate architecture: plan your peak note, build toward it, then resolve away from it. Call and response phrasing — derived from blues vocal tradition — is the most natural way to create this arc. A "call" is a short phrase that ends on a non-root note (creating tension). The "response" replies to the call, ending on the root or 5th (releasing tension). Multiple call-response pairs build an entire solo section. The principle of "space" (silence between notes and phrases) is perhaps the most important and most ignored concept: Miles Davis famously said "It\'s the notes you don\'t play that matter." David Gilmour\'s "Comfortably Numb" solo is revered because nearly every note is separated by deliberate space — each note has emotional weight precisely because of the silence around it.',
    usedBy: 'David Gilmour – space and arc | B.B. King – call and response | Jimmy Page – dramatic climax builds | Carlos Santana – melodic peak notes',
    tip: 'Plan your peak note before you improvise. It can be the highest note, the longest held note, or the most intense bend. Build every phrase so the solo\'s arc points toward that moment — then let it resolve.',
  },

  {
    id: 'note-timing-solo', category: 'solos', title: 'Note Duration & Timing in Solos',
    tags: ['timing','note duration','bpm','rhythm','eighth notes','triplets','16th notes','phrasing','space','tempo'],
    summary: 'What note values to use at which BPM — and why space is as important as notes.',
    formula: 'Slow BPM = hold longer, more vibrato | Fast BPM = shorter notes, legato runs | Space = deliberate silence',
    degrees: '40–70 BPM: whole/half notes | 70–100: quarters + 8ths | 100–130: 8ths + 16ths | 160+: 16th triplets + sweep',
    example: {
      root: 'BPM vs technique guide',
      notes: [
        '40–70 BPM (ballad): whole and half notes — each note carries full emotional weight; wide bends with slow vibrato',
        '70–100 BPM (blues/slow rock): quarter + eighth notes + eighth-note triplets — the blues triplet feel lives here',
        '100–130 BPM (classic rock): eighth and 16th notes comfortable — 16th runs feel "fast" to listener even at moderate speed',
        '160–220+ BPM (metal/shred): 16th-note triplets and 32nd notes required; sweep picking and legato become necessary',
      ],
    },
    allKeys: [], chords: ['8th-note triplets = the blues feel (3 notes in 2 beats)', '16th notes = standard rock speed phrase', '16th-note triplets = shred/sweep speed (6 notes in 1 beat)', 'Syncopated rests on beat 1 = groove and funk feel'],
    details: 'Understanding note duration is what separates mechanical players from musical ones. The same scale lick played in different rhythmic values transforms completely. At slow tempos (40–70 BPM), every note has full presence — a single bent note with vibrato fills 4 beats and is more powerful than 16 fast notes. At fast tempos (160+ BPM), individual notes blur; the architecture of the phrase (which beats the phrase starts and ends on) creates the feel. The "blues triplet" feel — 8th-note triplets (3 notes per 2 beats) — is the rhythmic foundation of virtually all blues and much of classic rock. B.B. King, SRV, and Eric Clapton all phrase primarily in triplets. The concept of "space" (deliberate rests between phrases) is the advanced skill. Beginners fill every available space with notes. Professionals create tension through silence — the listener\'s ear is drawn toward the next note precisely because of the space before it. Count the silence in the "Comfortably Numb" solo: between many phrases there are full 2–4 beats of nothing. Each subsequent note hits harder because of it.',
    usedBy: 'B.B. King – triplet timing | David Gilmour – space mastery | Yngwie Malmsteen – 16th-note triplets | Jeff Beck – rhythmic unpredictability',
    tip: 'Record yourself soloing, then listen back and mark every beat you played a note. If you rarely have a full beat of silence, your solo lacks breathing room. Deliberately leave one full bar empty somewhere in each solo — then notice how much more impactful the following phrase feels.',
  },

  {
    id: 'call-response-phrasing', category: 'solos', title: 'Call & Response Phrasing',
    tags: ['call response','phrasing','blues','conversation','tension release','bb king','clapton','vocal','question answer'],
    summary: 'The most natural solo structure: a musical question followed by a musical answer.',
    formula: 'Call = short phrase ending on non-root (tension) | Response = reply phrase ending on root (resolution)',
    degrees: 'Call: 2–4 beats, ends on ♭3, ♭7, or 5 | Rest: 2–4 beats silence | Response: 2–4 beats, ends on root or 3',
    example: {
      root: 'A minor pentatonic — 4 bars',
      notes: [
        'Bar 1 (call): fast bend on ♭3 (C) up to 3, then fast pull-off run down to ♭7 (G) — end there, pause',
        'Bar 2 (silence): 2 beats of silence — this IS part of the phrase, not an accident',
        'Bar 3 (response): simple descending phrase from ♭7 (G) through 5 (E) to root (A) — land on root with vibrato',
        'Bar 4 (breathe): single sustained root note with vibrato, then rest — conversation complete',
      ],
    },
    allKeys: [], chords: ['Call typically ends on: ♭3, 5, ♭7 (non-resolution tones)', 'Response typically ends on: root (1), major 3rd (3), or 5th (5)', 'Multiple call-response pairs build an entire solo section organically'],
    details: 'Call and response phrasing originates in African-American musical tradition — the antiphonal (question-and-answer) structure of blues vocal style, gospel music, and work songs. A vocalist sings a line (the "call"), and the choir or instrument responds (the "response"). B.B. King translated this directly to guitar: his guitar "sings" a line, then waits (as a singer would take a breath), then replies. This creates the conversational quality that makes blues guitar feel so human and natural. The silence between call and response is essential — it is not emptiness but expectation. The listener\'s ear fills the space with anticipation. Pioneers: B.B. King is the definitive master of call-and-response guitar phrasing. Albert King, Albert Collins, and Eric Clapton in his blues period all exhibit it clearly. Gary Moore\'s emotional rock ballad solos (e.g., "Still Got the Blues") use call-response structure brilliantly. The technique works in any genre because it mirrors how humans actually communicate — statement, pause, reply.',
    usedBy: '"The Thrill Is Gone" – B.B. King | "Crossroads" – Clapton (Cream live) | "Still Got the Blues" – Gary Moore | Albert King lead vocabulary',
    tip: 'Practice call-response by singing your responses aloud before playing them. If you can sing a reply phrase to your "call" lick, you can almost certainly play it. The exercise connects your musical ear to your fingers, which is the core skill of expressive improvisation.',
  },

]
