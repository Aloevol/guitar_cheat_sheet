'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORY_CONFIG } from '../data/categories'
import { Menu, X, Search } from 'lucide-react'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        className="gcs-header"
        style={{
          background: 'rgba(14,14,14,0.96)',
          borderBottom: '1px solid #353534',
          position: 'sticky', top: 0, zIndex: 100,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'inset 0 -1px 0 rgba(255,182,147,0.04)',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center',
          padding: '0 20px', height: 64,
        }}>

          {/* ── Hamburger (mobile only — LEFT of brand) ── */}
          <button
            className="gcs-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid rgba(169,138,125,.2)',
              padding: '7px 8px',
              color: '#a98a7d',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              transition: 'border-color .15s, color .15s',
              cursor: 'pointer',
              flexShrink: 0,
              marginRight: 12,
            }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>

          {/* ── Brand ── */}
          <Link href="/" onClick={() => setOpen(false)} style={{
            textDecoration: 'none', flexShrink: 0,
          }}>
            <span style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#ff6b00',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              <span className="gcs-brand-full">Guitar Cheat Sheet</span>
              <span className="gcs-brand-short">GCS</span>
            </span>
          </Link>

          {/* ── Flex spacer ── */}
          <div style={{ flex: 1 }} />

          {/* ── Desktop nav (right-aligned) ── */}
          <nav
            className="gcs-nav-desktop"
            aria-label="Main navigation"
            style={{ display: 'flex', alignItems: 'center', gap: 0 }}
          >
            {Object.entries(CATEGORY_CONFIG).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#a98a7d',
                  textDecoration: 'none',
                  padding: '6px 10px',
                  borderRadius: 4,
                  transition: 'color .15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ff6b00' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#a98a7d' }}
              >
                {cat.label}
              </Link>
            ))}
            <span style={{ width: 1, height: 16, background: 'rgba(169,138,125,.15)', margin: '0 8px' }} />
            <Link
              href="/about"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.62rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(169,138,125,.45)',
                textDecoration: 'none',
                padding: '6px 10px',
                borderRadius: 4,
                transition: 'color .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ff6b00' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(169,138,125,.45)' }}
            >
              About
            </Link>
          </nav>

          {/* ── Search icon (mobile only — RIGHT) ── */}
          <button
            aria-label="Search"
            className="gcs-search-btn"
            style={{
              display: 'none',
              background: 'none', border: 'none',
              color: '#a98a7d', padding: 8, cursor: 'pointer',
              transition: 'color .15s', alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ff6b00' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a98a7d' }}
          >
            <Search size={18} />
          </button>
        </div>

        <style>{`
          .gcs-brand-full  { display: inline; }
          .gcs-brand-short { display: none; }

          @media (max-width: 767px) {
            .gcs-brand-full    { display: none; }
            .gcs-brand-short   { display: inline; }
            .gcs-nav-desktop   { display: none !important; }
            .gcs-hamburger     { display: flex !important; }
            .gcs-search-btn    { display: flex !important; }
          }

          .gcs-hamburger:hover {
            border-color: rgba(255,107,0,.4) !important;
            color: #ff6b00 !important;
          }
          .gcs-hamburger[aria-expanded="true"] {
            border-color: rgba(255,107,0,.45) !important;
            color: #ff6b00 !important;
          }

          .gcs-mobile-link {
            display: flex;
            align-items: center;
            padding: 0 24px;
            height: 52px;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .1em;
            text-decoration: none;
            color: #a98a7d;
            border-left: 3px solid transparent;
            transition: background .12s, color .12s, border-color .12s;
          }
          .gcs-mobile-link:hover {
            background: rgba(255,107,0,.05);
            color: #ffb693;
          }
          .gcs-mobile-divider {
            height: 1px;
            margin: 4px 20px;
            background: rgba(169,138,125,.1);
          }
        `}</style>
      </header>

      {/* ── Mobile dropdown menu ── */}
      {open && (
        <nav
          className="gcs-header"
          aria-label="Mobile navigation"
          style={{
            background: 'rgba(14,14,14,0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,107,0,.1)',
            position: 'sticky', top: 64, zIndex: 99,
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
            style={{ borderLeftColor: 'transparent' }}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </nav>
      )}
    </>
  )
}
