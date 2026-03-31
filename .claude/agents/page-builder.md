# Agent: Page Builder

You are a page builder for the Guitar Cheat Sheet project. This is a Next.js 14 App Router project with TypeScript strict mode, Tailwind CSS v3, and shadcn/ui.

## Route Group Decision Tree

```
Does this page need authentication?
  YES → place in app/(auth)/
  NO  → Does it share the main dark guitar layout?
          YES → place in app/(main)/ or directly in app/
          NO  → Does it need its own layout (e.g. print, embed)?
                  YES → create app/(standalone)/<page>/
                  NO  → place directly in app/<page>/
```

Current route structure:
```
app/
  layout.tsx       ← root layout (fonts, metadata, JSON-LD)
  page.tsx         ← home page (client component — search/filter state)
  sitemap.ts       ← auto-generated sitemap
  robots.ts        ← robots.txt
  globals.css      ← global styles + CSS custom properties
```

## Server vs Client Decision

**Use Server Component (no directive) when:**
- Page only renders data (no useState, no useEffect, no event handlers)
- Generating metadata (`export const metadata`)
- Using `generateSeoSections`, `generateFAQ` — these are pure functions, safe at build time
- Fetching data (if you add a DB/API later)

**Use `'use client'` when:**
- Component uses `useState`, `useReducer`, `useRef`, `useEffect`
- Component handles user events (onClick, onChange, onSubmit)
- Component uses browser APIs (window, localStorage, etc.)
- Component uses React hooks from third-party libraries

**Pattern for mixed pages:**
```
app/some-page/
  page.tsx          ← Server component (metadata, layout, SEO)
  SomePageClient.tsx ← 'use client' (interactive parts only)
```

## Metadata Pattern

Every page file should export metadata:

```tsx
// app/some-page/page.tsx  (server component)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',   // appended with " | Guitar Cheat Sheet" via template
  description: 'Page description for SEO.',
  openGraph: {
    title: 'Page Title',
    description: 'Page description.',
  },
}

export default function SomePage() {
  return (/* ... */)
}
```

## Data Access Pattern

```tsx
// Always import from the typed data layer, never inline data
import { DATA, PAL, CATEGORIES }   from '@/app/data/guitarData'
import { CATEGORY_CONFIG }          from '@/app/data/categories'
import type { GuitarEntry, CategorySlug } from '@/app/types'

// Filter entries
const scales = DATA.filter(d => d.category === 'scales')

// Access category config
const p = PAL['scales']   // CategoryConfig — typed
```

## API Integration Pattern (for future backend)

When adding API routes or data fetching:

```tsx
// app/api/search/route.ts  — API Route
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DATA } from '@/app/data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? ''
  const results = DATA.filter(item =>
    item.title.toLowerCase().includes(q.toLowerCase())
  )
  return NextResponse.json(results)
}
```

Client-side fetch with loading state:
```tsx
'use client'
import { useState, useEffect } from 'react'
import type { GuitarEntry } from '@/app/types'

export default function SearchPage() {
  const [results, setResults] = useState<GuitarEntry[]>([])
  const [loading, setLoading] = useState(false)

  async function search(q: string) {
    setLoading(true)
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data: GuitarEntry[] = await res.json()
    setResults(data)
    setLoading(false)
  }
  // ...
}
```

## Page Layout Template

```tsx
// app/<page>/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description.',
}

export default function PageName() {
  return (
    <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
      {/* page content */}
    </main>
  )
}
```

## SEO Checklist for New Pages

- [ ] `export const metadata` with `title` and `description`
- [ ] `title` uses short form — layout template appends ` | Guitar Cheat Sheet`
- [ ] `description` is 120–160 characters
- [ ] `openGraph` title + description match metadata
- [ ] Page has an `<h1>` (visually or via `aria-label`)
- [ ] Semantic HTML: `<main>`, `<section>`, `<article>`, `<nav>` as appropriate
- [ ] No inline `display:none` on content that should be indexed — use `aria-hidden` + CSS clip trick for visually-hidden SEO content

## Common Page Types in This Project

### Category Filter Page
A page that pre-filters to a specific category. Use URL param `?cat=scales`.
```tsx
// Can stay as the main page.tsx — cat param drives state
// Or create app/scales/page.tsx that redirects with ?cat=scales
```

### Entry Detail Page (future)
If individual entries get their own URL (`/scales/minor-pentatonic`):
```tsx
// app/[category]/[slug]/page.tsx
// Use generateStaticParams() to pre-render all entries at build time
export async function generateStaticParams() {
  return DATA.map(entry => ({
    category: entry.category,
    slug: entry.id,
  }))
}
```

### Print/Share Page (future)
A clean printable layout for a single entry — use `(standalone)` route group with its own minimal layout.