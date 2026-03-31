import type { MetadataRoute } from 'next'
import { DATA }               from './data'
import { CATEGORY_CONFIG }    from './data/categories'
import { generateSitemapEntries } from './lib/seoGenerators'

const SITE_URL = 'https://guitarcheatsheet.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                           lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${SITE_URL}/about`,                lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/contact`,              lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`,              lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]

  // Category landing pages (e.g. /scales, /chords)
  const categoryPages = generateSitemapEntries(CATEGORY_CONFIG, SITE_URL)

  // Individual entry pages (e.g. /scales/minor-pentatonic)
  const entryPages: MetadataRoute.Sitemap = DATA.map(entry => ({
    url: `${SITE_URL}/${entry.category}/${entry.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...categoryPages, ...entryPages]
}
