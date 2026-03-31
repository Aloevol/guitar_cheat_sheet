import Link from 'next/link'
import { DATA }            from '../data'
import { CATEGORY_CONFIG } from '../data/categories'
import { generateSeoSections } from '../lib/seoGenerators'
import type { CategorySlug } from '../types'

const hiddenStyle: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
}

/** Visible SEO section shown below the interactive grid — real readable content for Google */
export function SeoArticleSection() {
  const sections = generateSeoSections(DATA, CATEGORY_CONFIG)

  return (
    <section style={{
      maxWidth: 1100, margin: '0 auto', padding: '64px 24px 0',
      borderTop: '1px solid rgba(255,255,255,.06)',
    }}>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900,
        color: '#f5edda', marginBottom: 8,
      }}>
        Complete Guitar Reference — Scales, Chords &amp; More
      </h2>
      <p style={{
        fontFamily: "'Lora', Georgia, serif", fontSize: '.95rem',
        color: 'rgba(255,255,255,.5)', lineHeight: 1.7, marginBottom: 40, maxWidth: 720,
      }}>
        Every scale, mode, chord, progression, technique and tuning shown in all 12 keys.
        Click any topic to explore notes, formulas and chord families.
      </p>

      {sections.map(({ key, heading, desc, items }) => {
        const cat = CATEGORY_CONFIG[key as CategorySlug]
        return (
          <div key={key} style={{ marginBottom: 48 }}>
            {/* Category heading with link */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.15rem', fontWeight: 700, color: cat.a, margin: 0,
              }}>
                <Link href={`/${key}`} style={{ color: cat.a, textDecoration: 'none' }}>
                  Guitar {heading}
                </Link>
              </h3>
              <Link href={`/${key}`} style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.6rem',
                color: 'rgba(255,255,255,.25)', textDecoration: 'none',
              }}>
                View all →
              </Link>
            </div>
            <p style={{
              fontFamily: "'Lora', serif", fontSize: '.85rem',
              color: 'rgba(255,255,255,.4)', marginBottom: 16, lineHeight: 1.6,
            }}>{desc}</p>

            {/* Top 3 entries as article teasers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {items.slice(0, 3).map(item => (
                <article key={item.title} style={{
                  background: '#111009', border: '1px solid rgba(255,255,255,.05)',
                  borderRadius: 8, padding: '14px 16px',
                }}>
                  <h4 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '.9rem', fontWeight: 700, color: '#f5edda', margin: '0 0 6px',
                  }}>
                    <Link
                      href={`/${key}/${DATA.find(d => d.title === item.title)?.id ?? ''}`}
                      style={{ color: '#f5edda', textDecoration: 'none' }}
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <p style={{
                    fontFamily: "'Lora', serif", fontSize: '.76rem',
                    color: 'rgba(255,255,255,.4)', lineHeight: 1.6, margin: 0,
                  }}>
                    {item.summary}
                  </p>
                  {item.formula && (
                    <div style={{
                      fontFamily: "'Space Mono', monospace", fontSize: '.6rem',
                      color: cat.a, opacity: .7, marginTop: 8,
                    }}>{item.formula}</div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

/** Hidden SEO dump — keeps full keyword density for crawlers without cluttering UI */
export default function SeoContent() {
  const sections = generateSeoSections(DATA, CATEGORY_CONFIG)

  return (
    <div style={hiddenStyle} aria-hidden="true">
      <h1>Guitar Cheat Sheet — Free Guitar Reference for All 12 Keys</h1>
      <p>
        Complete guitar reference covering scales, modes, chords, chord progressions,
        guitar techniques, music theory, and tunings. Every scale and chord family
        shown in all 12 musical keys: C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B.
      </p>

      {sections.map(({ key, heading, desc, items }) => (
        <section key={key} aria-label={`Guitar ${heading}`}>
          <h2>Guitar {heading}</h2>
          <p>{desc}</p>
          <dl>
            {items.map(({ title, summary, details, usedBy, formula, tags, keysText }) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>
                  {summary} {details} Formula: {formula}. Used in: {usedBy}.
                  {keysText && ` ${keysText}`}
                  {tags?.length > 0 && ` Keywords: ${tags.join(', ')}.`}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
