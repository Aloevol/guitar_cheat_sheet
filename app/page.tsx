'use client'
import { useState, useMemo } from 'react'
import { DATA, PAL, CATEGORIES, QUICK_SEARCHES, FEATURED_IDS } from './data/guitarData'
import type { GuitarEntry } from './types'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import CategoryGrid from './components/CategoryGrid'
import ResultGrid from './components/ResultGrid'
import SeoContent, { SeoArticleSection } from './components/SeoContent'

function normalize(str: string): string {
  return String(str)
    .replace(/♭/g, 'b')
    .replace(/♯/g, '#')
    .toLowerCase()
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const isSearching = query.trim() !== '' || cat !== 'all'

  const filtered = useMemo(() => {
    const q = normalize(query)
    return DATA.filter(item => {
      const catMatch = cat === 'all' || item.category === cat
      if (!catMatch) return false
      if (!q) return true
      const searchable = [
        item.title,
        item.summary,
        ...(item.tags || []),
        item.details,
        ...(item.example?.notes || []),
        item.usedBy,
      ].map(normalize).join(' ')
      return searchable.includes(q)
    })
  }, [query, cat])

  const bycat = useMemo(() => {
    const map: Record<string, GuitarEntry[]> = {}
    CATEGORIES.filter(c => c !== 'all').forEach(c => {
      map[c] = DATA.filter(d => d.category === c)
    })
    return map
  }, [])

  const featured = useMemo(() =>
    FEATURED_IDS.map(id => DATA.find(d => d.id === id)).filter((d): d is GuitarEntry => Boolean(d)),
    []
  )

  function handleToggle(id: string) {
    setOpenIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleCatSelect(c: string) {
    setCat(c)
    setQuery('')
    setOpenIds(new Set())
  }

  function handleClear() {
    setQuery('')
    setCat('all')
    setOpenIds(new Set())
  }

  function handleQuick(q: string) {
    setQuery(q)
    setCat('all')
    setOpenIds(new Set())
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
      <SeoContent />

      <Hero />

      <div style={{ padding: '32px 0 16px' }}>
        <SearchBar
          query={query}
          onChange={setQuery}
          quickSearches={QUICK_SEARCHES}
          onQuick={handleQuick}
          isSearching={isSearching}
        />
        <CategoryFilter
          categories={CATEGORIES}
          active={cat}
          onChange={c => { setCat(c); setOpenIds(new Set()) }}
          pal={PAL}
        />
      </div>

      <div style={{ marginTop: 32 }}>
        {isSearching ? (
          <ResultGrid
            items={filtered}
            query={query}
            cat={cat}
            openIds={openIds}
            onToggle={handleToggle}
            onClear={handleClear}
            pal={PAL}
          />
        ) : (
          <CategoryGrid
            bycat={bycat}
            featured={featured}
            openIds={openIds}
            onToggle={handleToggle}
            onCatSelect={handleCatSelect}
          />
        )}
      </div>

      {/* Visible SEO content — rendered server-side, indexed by Google */}
      <SeoArticleSection />

      <div style={{ height: 64 }} />
    </main>
  )
}
