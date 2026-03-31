import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Guitar Cheat Sheet. Send us feedback, report errors, or suggest new content.',
}

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
      <nav style={{
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '14px 24px', display: 'flex', gap: 8, alignItems: 'center',
        fontFamily: "'Space Mono', monospace", fontSize: '.7rem',
      }}>
        <Link href="/" style={{ color: '#c9a84c', textDecoration: 'none' }}>Guitar Cheat Sheet</Link>
        <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
        <span style={{ color: 'rgba(255,255,255,.5)' }}>Contact</span>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900,
          color: '#f5edda', marginBottom: 16,
        }}>Get in Touch</h1>

        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: 36 }}>
          We&apos;d love to hear from you. Whether you&apos;ve spotted an error, have a suggestion for
          new content, or just want to say hello — use the form below.
        </p>

        {/* Contact form — static HTML, works with any form service like Formspree */}
        <form
          method="POST"
          action="https://formspree.io/f/YOUR_FORM_ID"
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
              color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em',
              marginBottom: 8,
            }}>
              Your name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. John"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#141210', border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 6, padding: '12px 14px',
                fontFamily: "'Lora', serif", fontSize: '.9rem', color: '#f5edda',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
              color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em',
              marginBottom: 8,
            }}>
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#141210', border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 6, padding: '12px 14px',
                fontFamily: "'Lora', serif", fontSize: '.9rem', color: '#f5edda',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
              color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em',
              marginBottom: 8,
            }}>
              Subject
            </label>
            <select
              name="subject"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#141210', border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 6, padding: '12px 14px',
                fontFamily: "'Lora', serif", fontSize: '.9rem', color: '#f5edda',
                outline: 'none',
              }}
            >
              <option value="suggestion">Content suggestion</option>
              <option value="error">Report an error</option>
              <option value="feedback">General feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
              color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em',
              marginBottom: 8,
            }}>
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your message…"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#141210', border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 6, padding: '12px 14px',
                fontFamily: "'Lora', serif", fontSize: '.9rem', color: '#f5edda',
                outline: 'none', resize: 'vertical',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              background: '#c9a84c', color: '#0d0b08',
              border: 'none', borderRadius: 6,
              fontFamily: "'Space Mono', monospace", fontSize: '.75rem', fontWeight: 700,
              padding: '12px 24px', cursor: 'pointer',
              transition: 'opacity .15s',
            }}
          >
            Send Message
          </button>
        </form>

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <Link href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: '.72rem', color: '#c9a84c', textDecoration: 'none' }}>
            ← Back to Guitar Cheat Sheet
          </Link>
        </div>
      </div>
    </main>
  )
}
