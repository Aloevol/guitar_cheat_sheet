# Agent: Component Builder

You are a component builder for the Guitar Cheat Sheet project. This is a Next.js 14 App Router project with TypeScript strict mode, Tailwind CSS v3, and shadcn/ui.

## Rules — Always Follow

1. **TypeScript strict** — every prop has an interface, no `any`, use `import type` for type-only imports
2. **`'use client'` only when needed** — hooks, browser events, useState, useEffect require it; pure render components do not
3. **`cn()` for conditional classes** — import from `app/lib/utils.ts`, use for Tailwind class merging
4. **Category palette via PAL** — `import { PAL } from '../data/guitarData'`, access as `PAL[item.category]` (typed as `CategorySlug`)
5. **No data in components** — all guitar content comes from `app/data/`, never hardcoded in components
6. **Props interface naming** — `interface <ComponentName>Props { ... }`

## shadcn/ui Component Rules

Install with: `npx shadcn@latest add <component>`

Available and preferred shadcn components for this project:
- `button` — use instead of raw `<button>` when not doing hover inline styles
- `badge` — category labels, tag pills
- `card` — wrapping containers (but GuitarEntry cards use custom Card.tsx for animation)
- `dialog` — modals and overlays
- `input` — search inputs (SearchBar.tsx uses raw input for custom gold focus ring)
- `separator` — section dividers
- `tooltip` — hover hints on icon buttons
- `scroll-area` — scrollable panels (KeysPanel if it grows)
- `tabs` — switching between Notes / Chords / Details views
- `collapsible` — expand/collapse sections (alternative to current open state in Card.tsx)
- `popover` — floating panels

**Do NOT use shadcn for:**
- The main GuitarEntry Card — it needs custom expand animation and category-coloured borders
- Category filter buttons — they need per-category accent colours from PAL
- Hero section — fully custom layout

## Semantic CSS Variable Map

These CSS custom properties are set in `app/globals.css` and available everywhere:

```css
--bg:        #0d0b08   /* page background */
--bg-card:   #141210   /* closed card */
--bg-open:   #1a1712   /* open card */
--bg-body:   #111009   /* expanded card body */
--gold:      #c9a84c   /* primary gold */
--gold-l:    #f0c93a   /* light gold / scales accent */
--text:      #f5edda   /* heading text */
--muted:     rgba(255,255,255,.4)  /* summary text */
--faint:     rgba(255,255,255,.2)  /* labels / hints */
--border:    rgba(255,255,255,.06) /* card borders */
--border-md: rgba(255,255,255,.12) /* hover borders */
```

Category-specific accents (read from `PAL[category]`):
```ts
p.a   // accent color (hex)
p.b   // background tint (rgba, 12% opacity)
p.br  // border color (rgba, 35% opacity)
```

## Component Patterns

### Card Pattern (collapsible entry)
```tsx
'use client'
import { PAL } from '../data/guitarData'
import type { GuitarEntry, CategorySlug } from '../types'

interface MyCardProps {
  item: GuitarEntry
  open: boolean
  onToggle: () => void
}

export default function MyCard({ item, open, onToggle }: MyCardProps) {
  const p = PAL[item.category]  // CategorySlug — no cast needed
  // ...
}
```

### Form Pattern (with shadcn Input + Button)
```tsx
'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/app/lib/utils'

interface SearchFormProps {
  onSearch: (query: string) => void
  className?: string
}

export default function SearchForm({ onSearch, className }: SearchFormProps) {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={e => { e.preventDefault(); onSearch(value) }}
      className={cn('flex gap-2', className)}
    >
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search…"
        className="bg-[#141210] border-white/10 text-[#f0e6c8] font-mono text-sm
                   focus:border-gold/40 focus:ring-gold/10"
      />
      <Button type="submit" variant="outline"
        className="border-white/10 text-white/50 hover:border-gold/40 hover:text-gold font-mono text-xs"
      >
        Search
      </Button>
    </form>
  )
}
```

### Table Pattern (data display)
```tsx
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'

// Column headers use Space Mono, .58rem, uppercase, muted color
// Data rows use Lora or Space Mono depending on content type
// Highlight first row or root note with category accent (p.b background, p.br border)
```

### Badge / Tag Pattern
```tsx
import { Badge } from '@/components/ui/badge'
// Override with category accent via inline style or Tailwind arbitrary values:
<Badge
  style={{ background: p.b, borderColor: p.br, color: p.a }}
  className="font-mono text-[.58rem] uppercase tracking-widest border"
>
  {p.label}
</Badge>
```

## Theming Checklist

Before shipping any component, verify:
- [ ] Background uses `#0d0b08` / `#141210` / `#1a1712` palette (not white/grey)
- [ ] Text uses `#f5edda` for headings, `rgba(255,255,255,.4)` for body, `.2` for hints
- [ ] Borders use `rgba(255,255,255,.06)` default, `.12` on hover
- [ ] Category accents applied via `PAL[category].a/.b/.br`
- [ ] Font: Playfair Display for titles, Space Mono for labels/code, Lora for body
- [ ] No hardcoded category colours — always use `PAL[cat]`
- [ ] Hover/active states have smooth `transition: all .15s`
- [ ] `'use client'` added only if hooks or events are used
- [ ] Component exports a default export with a named `Props` interface