# Command: /new-component

Create a new component in the Guitar Cheat Sheet project.

## Usage
```
/new-component <category>/<Name> [--client] [--shadcn <components>]
```

**Examples:**
- `/new-component display/TagCloud` — creates `app/components/TagCloud.tsx` (no client)
- `/new-component interactive/KeySelector --client` — creates with `'use client'`
- `/new-component ui/EntryTable --client --shadcn table badge` — installs shadcn deps first

## What to Do When This Command Is Invoked

1. **Install any requested shadcn components** first:
   ```bash
   npx shadcn@latest add <component>
   ```

2. **Determine client vs server** from `--client` flag or from the category:
   - `display/` → no `'use client'` (pure render)
   - `interactive/` → add `'use client'`
   - `ui/` → depends on whether it uses hooks

3. **Create the component** in `app/components/<Name>.tsx` using the correct template.

4. **Run `npm run build`** to verify.

---

## Template: Display Component (no client)

```tsx
// app/components/<Name>.tsx
import type { GuitarEntry, CategoryConfig } from '../types'
import { cn } from '../lib/utils'

interface <Name>Props {
  // define props here
  className?: string
}

export default function <Name>({ className }: <Name>Props) {
  return (
    <div className={cn('', className)}>
      {/* content */}
    </div>
  )
}
```

---

## Template: Interactive Component (--client)

```tsx
// app/components/<Name>.tsx
'use client'
import { useState } from 'react'
import type { GuitarEntry } from '../types'
import { cn } from '../lib/utils'

interface <Name>Props {
  // define props here
  className?: string
}

export default function <Name>({ className }: <Name>Props) {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className={cn('', className)}>
      {/* interactive content */}
    </div>
  )
}
```

---

## Template: Card / Expandable (category-aware)

```tsx
// app/components/<Name>.tsx
'use client'
import { PAL } from '../data/guitarData'
import type { GuitarEntry, CategorySlug } from '../types'
import { cn } from '../lib/utils'

interface <Name>Props {
  item: GuitarEntry
  open?: boolean
  onToggle?: () => void
  className?: string
}

export default function <Name>({ item, open = false, onToggle, className }: <Name>Props) {
  const p = PAL[item.category]  // CategoryConfig — always typed

  return (
    <div
      onClick={onToggle}
      style={{
        background: open ? '#1a1712' : '#141210',
        border: `1px solid ${open ? p.br : 'rgba(255,255,255,.06)'}`,
        borderRadius: 10,
        cursor: onToggle ? 'pointer' : 'default',
        transition: 'border-color .2s, background .2s',
      }}
      className={cn('overflow-hidden', className)}
    >
      {/* top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${p.a}, ${p.a}88, transparent)` }} />

      <div style={{ padding: '14px 16px' }}>
        {/* category badge */}
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '.58rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: p.a,
          background: p.b,
          border: `1px solid ${p.br}`,
          borderRadius: 4,
          padding: '2px 7px',
        }}>{p.label}</span>

        {/* title */}
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.05rem',
          fontWeight: 800,
          color: '#f5edda',
          marginTop: 8,
        }}>{item.title}</div>

        {/* summary */}
        <div style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: '.76rem',
          color: 'rgba(255,255,255,.4)',
          lineHeight: 1.55,
          marginTop: 4,
        }}>{item.summary}</div>
      </div>
    </div>
  )
}
```

---

## Template: Table Component (with shadcn Table)

First install: `npx shadcn@latest add table`

```tsx
// app/components/<Name>.tsx
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import type { GuitarEntry } from '../types'

interface <Name>Props {
  items: GuitarEntry[]
}

export default function <Name>({ items }: <Name>Props) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, overflow: 'hidden' }}>
      <Table>
        <TableHeader>
          <TableRow style={{ borderColor: 'rgba(255,255,255,.06)' }}>
            <TableHead style={{ fontFamily: "'Space Mono', monospace", fontSize: '.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.3)' }}>
              Title
            </TableHead>
            <TableHead style={{ fontFamily: "'Space Mono', monospace", fontSize: '.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.3)' }}>
              Category
            </TableHead>
            <TableHead style={{ fontFamily: "'Space Mono', monospace", fontSize: '.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.3)' }}>
              Summary
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id} style={{ borderColor: 'rgba(255,255,255,.04)' }}>
              <TableCell style={{ fontFamily: "'Playfair Display', serif", fontSize: '.88rem', color: '#f5edda' }}>
                {item.title}
              </TableCell>
              <TableCell>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '.6rem', color: '#c9a84c' }}>
                  {item.category}
                </span>
              </TableCell>
              <TableCell style={{ fontFamily: "'Lora', serif", fontSize: '.75rem', color: 'rgba(255,255,255,.4)' }}>
                {item.summary}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

---

## Theming Checklist

Before finishing any component:

- [ ] Background: `#141210` (card), `#1a1712` (open), `#111009` (body), `#0d0b08` (page)
- [ ] Text: `#f5edda` headings, `rgba(255,255,255,.4)` body, `.2` hints
- [ ] Borders: `rgba(255,255,255,.06)` default, `.12` hover
- [ ] Category colours always from `PAL[item.category]` — never hardcoded
- [ ] Fonts: Playfair Display titles, Space Mono labels/tags, Lora body/italic
- [ ] `transition: all .15s` on hover states
- [ ] `'use client'` only if hooks or events present
- [ ] Props interface exported, default export is the component
- [ ] `npm run build` passes