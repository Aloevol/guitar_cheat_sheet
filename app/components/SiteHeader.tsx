'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORY_CONFIG } from '../data/categories'
import { FONT, FS, BG, COLOR, PAD, RADIUS } from '../theme'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header style={{
        background: BG.header,
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '0 16px',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <style>{`
          .gcs-brand-full  { display: inline; }
          .gcs-brand-short { display: none; }
          .gcs-hamburger   { display: none !important; }

          @media (max-width: 639px) {
            .gcs-brand-full    { display: none; }
            .gcs-brand-short   { display: inline; }
            .gcs-nav-desktop   { display: none !important; }
            .gcs-hamburger     { display: flex !important; }
          }

          .gcs-hamburger {
            background: none;
            border: 1px solid rgba(255,255,255,.1);
            cursor: pointer;
            padding: 9px 10px;
            color: rgba(255,255,255,.55);
            align-items: center;
            justify-content: center;
            border-radius: ${RADIUS.lg}px;
            transition: background .15s, border-color .15s, color .15s;
            flex-shrink: 0;
          }
          .gcs-hamburger:hover {
            background: rgba(255,255,255,.06);
            border-color: rgba(201,168,76,.35);
            color: ${COLOR.brand};
          }
          .gcs-hamburger[aria-expanded="true"] {
            background: rgba(201,168,76,.08);
            border-color: rgba(201,168,76,.4);
            color: ${COLOR.brand};
          }

          .gcs-mobile-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0 22px;
            height: 58px;
            font-family: ${FONT.mono};
            font-size: ${FS.base};
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .1em;
            text-decoration: none;
            color: rgba(255,255,255,.5);
            border-left: 3px solid transparent;
            transition: background .15s, color .15s, border-color .15s;
          }
          .gcs-mobile-link:hover {
            background: rgba(255,255,255,.04);
            color: rgba(255,255,255,.9);
          }
          .gcs-mobile-link:active {
            background: rgba(255,255,255,.07);
          }
          .gcs-mobile-divider {
            height: 1px;
            margin: 4px 18px;
            background: rgba(255,255,255,.05);
          }
        `}</style>

        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 66,
        }}>

          {/* ── Brand Logo ── */}
          <Link href="/" onClick={() => setOpen(false)} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            textDecoration: 'none', flexShrink: 0,
          }}>
            {/* favicon.svg — identical to browser tab icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.svg"
              alt=""
              aria-hidden="true"
              width={42}
              height={42}
              style={{ display: 'block', borderRadius: '50%' }}
            />

            <span style={{
              fontFamily: FONT.display,
              fontSize: FS.title, fontWeight: 900, color: COLOR.brand,
              letterSpacing: '-.01em', lineHeight: 1,
            }}>
              <span className="gcs-brand-full">Guitar Cheat Sheet</span>
              <span className="gcs-brand-short">GCS</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="gcs-nav-desktop" aria-label="Main navigation" style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {Object.entries(CATEGORY_CONFIG).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                style={{
                  fontFamily: FONT.mono,
                  fontSize: FS.base, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '.06em',
                  color: COLOR.muted,
                  textDecoration: 'none',
                  padding: PAD.navItem,
                  borderRadius: RADIUS.sm,
                  transition: 'color .15s, background .15s',
                }}
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/about"
              style={{
                fontFamily: FONT.mono,
                fontSize: FS.base, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '.06em',
                color: 'rgba(255,255,255,.35)',
                textDecoration: 'none',
                padding: PAD.navItem,
                borderRadius: RADIUS.sm,
              }}
            >
              About
            </Link>
          </nav>

          {/* ── Hamburger (mobile only) ── */}
          <button
            className="gcs-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              {open ? (
                <>
                  <line x1="1" y1="1" x2="17" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="17" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <line x1="1" y1="1"  x2="17" y2="1"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="1" y1="7"  x2="17" y2="7"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="1" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* ── Mobile menu panel ── */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: BG.mobileMenu,
            borderBottom: '1px solid rgba(201,168,76,.12)',
            position: 'sticky', top: 66, zIndex: 49,
          }}
        >
          {Object.entries(CATEGORY_CONFIG).map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="gcs-mobile-link"
              style={{ borderLeftColor: cat.a }}
              onClick={() => setOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <div className="gcs-mobile-divider" />
          <Link
            href="/about"
            className="gcs-mobile-link"
            style={{ borderLeftColor: 'rgba(255,255,255,.12)' }}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </nav>
      )}
    </>
  )
}
