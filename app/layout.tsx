import './globals.css'
import type { Metadata } from 'next'
import { DATA }                        from './data'
import { CATEGORY_CONFIG }             from './data/categories'
import { generateKeywords, generateFAQ } from './lib/seoGenerators'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

const SITE_URL = 'https://guitarcheatsheet.com'
const SITE_NAME = 'Guitar Cheat Sheet'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Guitar Cheat Sheet — Scales, Chords, Modes & Techniques',
    template: '%s | Guitar Cheat Sheet',
  },
  description:
    'Free guitar reference for every player. Instantly look up scales, modes, chords, chord progressions, techniques, music theory, and tunings — all 12 keys with chord families.',
  keywords: generateKeywords(DATA, CATEGORY_CONFIG),
  authors: [{ name: 'Guitar Cheat Sheet' }],
  creator: 'Guitar Cheat Sheet',
  publisher: 'Guitar Cheat Sheet',
  category: 'Music Education',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Guitar Cheat Sheet — Scales, Chords, Modes & Techniques',
    description:
      'Free interactive guitar reference. Look up any scale, mode, chord, or technique in all 12 keys. Perfect for beginners and experienced players.',
    images: [
      {
        url: '/og?title=Guitar+Cheat+Sheet&sub=Scales+%C2%B7+Chords+%C2%B7+Modes+%C2%B7+Techniques',
        width: 1200,
        height: 630,
        alt: 'Guitar Cheat Sheet — Scales, Chords, Modes & Techniques',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Guitar Cheat Sheet — Scales, Chords, Modes & Techniques',
    description:
      'Free interactive guitar reference. Scales, modes, chords, techniques in all 12 keys.',
    images: ['/og?title=Guitar+Cheat+Sheet&sub=Scales+%C2%B7+Chords+%C2%B7+Modes+%C2%B7+Techniques'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      { url: '/favicon.svg',       type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32',   type: 'image/png' },
      { url: '/icon-192.png',      sizes: '192x192', type: 'image/png' },
    ],
    apple:    [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          'Free interactive guitar reference covering scales, modes, chords, progressions, techniques, music theory, and tunings in all 12 keys.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'Guitar Cheat Sheet — Scales, Chords, Modes & Techniques',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        description:
          'Comprehensive guitar reference tool. Browse or search over 60 topics — scales, modes, chords, progressions, techniques, theory, and tunings — all shown in every musical key.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          ],
        },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: 'Free online guitar education reference tool.',
      },
      {
        '@type': 'Course',
        name: 'Guitar Music Theory Reference',
        description:
          'A complete self-study guitar reference covering scales, modes, chords, chord progressions, playing techniques, music theory, and guitar tunings in all 12 musical keys.',
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        educationalLevel: 'Beginner to Advanced',
        teaches: [
          'Guitar scales in all 12 keys',
          'Guitar modes (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian)',
          'Guitar chords and chord voicings',
          'Chord progressions (12-bar blues, ii-V-I, I-IV-V)',
          'Guitar techniques (bending, vibrato, hammer-on, pull-off, tapping)',
          'Music theory for guitarists (CAGED system, intervals, circle of fifths)',
          'Guitar tunings (standard, drop D, open G, half step down)',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: generateFAQ(DATA),
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff6b00" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
