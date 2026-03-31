'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const AUTH_BACKEND_URL =
  process.env.NEXT_PUBLIC_AUTH_BACKEND_URL ?? 'http://localhost:3000'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      source: 'guitar_cheat_sheet',
    }

    try {
      const res = await fetch(`${AUTH_BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string }
        throw new Error(body.message ?? `Server error ${res.status}`)
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

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

        {status === 'success' ? (
          <div style={{
            background: '#1a2e1a', border: '1px solid #2d5a2d', borderRadius: 8,
            padding: '24px 28px', fontFamily: "'Lora', serif",
          }}>
            <p style={{ color: '#6fcf6f', fontSize: '1rem', margin: 0 }}>
              ✓ Your message has been received. Thank you!
            </p>
            <button
              onClick={() => setStatus('idle')}
              style={{
                marginTop: 16, background: 'transparent', border: 'none',
                color: '#c9a84c', fontFamily: "'Space Mono', monospace",
                fontSize: '.72rem', cursor: 'pointer', padding: 0,
              }}
            >
              Send another message →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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

            {status === 'error' && (
              <p style={{
                fontFamily: "'Lora', serif", fontSize: '.88rem',
                color: '#e07070', margin: 0,
              }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                alignSelf: 'flex-start',
                background: status === 'loading' ? 'rgba(201,168,76,.5)' : '#c9a84c',
                color: '#0d0b08',
                border: 'none', borderRadius: 6,
                fontFamily: "'Space Mono', monospace", fontSize: '.75rem', fontWeight: 700,
                padding: '12px 24px',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'opacity .15s',
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <Link href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: '.72rem', color: '#c9a84c', textDecoration: 'none' }}>
            ← Back to Guitar Cheat Sheet
          </Link>
        </div>
      </div>
    </main>
  )
}
