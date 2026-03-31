# Command: /new-page

Create a new page in the Guitar Cheat Sheet Next.js 14 App Router project.

## Usage
```
/new-page <path> [--client] [--standalone]
```

**Examples:**
- `/new-page about` — creates `app/about/page.tsx` (server)
- `/new-page chord-finder --client` — creates `app/chord-finder/page.tsx` with `'use client'`
- `/new-page print/entry --standalone` — creates `app/(standalone)/print/entry/page.tsx`

## What to Do When This Command Is Invoked

1. **Determine the route group** from the flags:
   - No flag → `app/<path>/page.tsx` (server component, uses root layout)
   - `--client` → `app/<path>/page.tsx` with `'use client'` directive
   - `--standalone` → `app/(standalone)/<path>/page.tsx` (needs its own layout)

2. **Check if a layout is needed** — if `--standalone` and `app/(standalone)/layout.tsx` doesn't exist, create a minimal one.

3. **Create the page file** using the correct template below.

4. **Run `npm run build`** to verify no type errors.

---

## Template: Server Page (default)

```tsx
// app/<path>/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '<Page Title>',
  description: '<120-160 char description>',
  openGraph: {
    title: '<Page Title>',
    description: '<description>',
  },
}

export default function <PageName>Page() {
  return (
    <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 24px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 900,
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: '#f5edda',
          marginBottom: 16,
        }}>
          <Page Title>
        </h1>
        {/* page content */}
      </div>
    </main>
  )
}
```

---

## Template: Client Page (--client flag)

```tsx
// app/<path>/page.tsx
'use client'
import { useState } from 'react'

export default function <PageName>Page() {
  const [state, setState] = useState<string>('')

  return (
    <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 24px' }}>
        {/* interactive content */}
      </div>
    </main>
  )
}
```

Note: Client pages cannot export `metadata`. If SEO is needed, split into:
- `app/<path>/page.tsx` — server shell with metadata
- `app/<path>/<PageName>Client.tsx` — `'use client'` interactive part

---

## Template: Standalone Layout (--standalone flag)

First, create the layout if it doesn't exist:

```tsx
// app/(standalone)/layout.tsx
export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0d0b08', color: '#f5edda' }}>
        {children}
      </body>
    </html>
  )
}
```

Then the page:

```tsx
// app/(standalone)/<path>/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '<Page Title>',
  description: '<description>',
}

export default function <PageName>Page() {
  return (
    <main style={{ padding: '32px 24px' }}>
      {/* minimal standalone content */}
    </main>
  )
}
```

---

## Checklist After Creating

- [ ] `export const metadata` with `title` and `description` (server pages only)
- [ ] `<main>` wrapper with `minHeight: '100vh'` and dark background
- [ ] `h1` using Playfair Display font
- [ ] No hardcoded guitar data — import from `app/data/guitarData`
- [ ] `npm run build` passes with no type errors