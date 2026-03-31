# Guitar Cheat Sheet — Claude Code Instructions

## Project Overview
Next.js 14 App Router, TypeScript strict mode, Tailwind CSS v3, shadcn/ui.
A free guitar reference covering scales, modes, chords, progressions, techniques, theory, and tunings — all 12 keys.

## Stack
- **Framework**: Next.js 14 App Router (`app/` directory)
- **Language**: TypeScript strict (`tsconfig.json` — `strict: true`, `moduleResolution: bundler`)
- **Styling**: Tailwind CSS v3 + inline styles for dynamic CSS vars; `cn()` from `app/lib/utils.ts`
- **UI primitives**: shadcn/ui (Radix UI + class-variance-authority + clsx + tailwind-merge)
- **Fonts**: Playfair Display (display/h1), Space Mono (mono/labels), Lora (body/summaries) — loaded via Google Fonts in `layout.tsx`
- **Icons**: Lucide React (`lucide-react`)

## Architecture — Data Layer
All guitar content lives in `app/data/`. **Never put data in components.**

```
app/data/
  categories.ts       — CATEGORY_CONFIG, CATEGORIES, PAL, isCategorySlug()
  musicHelpers.ts     — allKeysFor(), chordAllKeys(), chromaticNote(), ALL_ROOTS
  index.ts            — DATA[], QUICK_SEARCHES[], FEATURED_IDS[]
  guitarData.ts       — backward-compat re-export shim
  entries/
    scales.ts         — GuitarEntry[]
    modes.ts
    chords.ts
    progressions.ts
    techniques.ts
    theory.ts
    tunings.ts
```

### Adding a new entry
1. Add to the correct `app/data/entries/<category>.ts` file
2. The entry auto-appears in search, SEO keywords, FAQ, and sitemap — no other changes needed

### Adding a new category
1. Add `CategorySlug` to `app/types/index.ts`
2. Add config entry to `CATEGORY_CONFIG` in `app/data/categories.ts`
3. Create `app/data/entries/<newcategory>.ts`
4. Import and spread in `app/data/index.ts`

## Types
All shared types live in `app/types/index.ts`:
- `CategorySlug` — union of all category strings
- `CategoryConfig` — `{ a, b, br, label, desc, sitemapPriority }`
- `CategoryConfigMap` — `Record<CategorySlug, CategoryConfig>`
- `GuitarEntry` — full entry shape
- `KeyData` — `{ root, notes[], chords[] }`

## Theming — Dark Guitar Aesthetic
| Token | Value | Usage |
|-------|-------|-------|
| Background deep | `#0a0806` | Hero bg |
| Background base | `#0d0b08` | Page bg |
| Background card | `#141210` | Card closed |
| Background card open | `#1a1712` | Card open |
| Background expanded | `#111009` | Card body |
| Gold accent | `#c9a84c` | Primary accent |
| Gold light | `#f0c93a` | Scales / active |
| Text heading | `#f5edda` | Card titles |
| Text muted | `rgba(255,255,255,.4)` | Summaries |
| Text faint | `rgba(255,255,255,.2)` | Labels/hints |

Each category has its own accent (`p.a`), background tint (`p.b`), and border (`p.br`) from `PAL[category]`.

## SEO — Auto-generated
`app/lib/seoGenerators.ts` generates keywords, FAQ JSON-LD, hidden SEO sections, and sitemap entries from DATA automatically. No manual SEO updates needed when adding entries.

## Component Conventions
- `'use client'` only when using hooks or browser events
- Prop interfaces named `<Component>Props`
- Import types: `import type { GuitarEntry } from '../types'`
- Access category palette: `const p = PAL[item.category]` (item.category is CategorySlug)
- Access string-keyed category: `PAL[c as CategorySlug]`
- Use `cn()` from `app/lib/utils.ts` for conditional Tailwind classes

## File Naming
- Components: `PascalCase.tsx` in `app/components/`
- Data files: `camelCase.ts` in `app/data/entries/`
- No `.js` or `.jsx` files — project is fully TypeScript

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (always run after changes)
- `npm run lint` — ESLint
- `npx shadcn@latest add <component>` — add shadcn component