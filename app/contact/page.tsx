'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const AUTH_BACKEND_URL =
  process.env.NEXT_PUBLIC_AUTH_BACKEND_URL ?? 'http://localhost:3000'

const inputStyle = {
  width: '100%', boxSizing: 'border-box' as const,
  background: '#1c1b1b',
  border: '1px solid #353534',
  borderRadius: 2,
  padding: '12px 14px',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '.9rem', color: '#e5e2e1',
  outline: 'none',
  transition: 'border-color .2s',
} as const

const labelStyle = {
  display: 'block',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '.6rem', fontWeight: 700,
  color: 'rgba(169,138,125,.5)',
  textTransform: 'uppercase' as const, letterSpacing: '.12em',
  marginBottom: 8,
} as const

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
    <main style={{ minHeight: '100vh', background: '#131313', paddingBottom: 100 }}>

      {/* Breadcrumb */}
      <nav style={{
        background: '#0e0e0e', borderBottom: '1px solid #353534',
        padding: '14px 24px', display: 'flex', gap: 8, alignItems: 'center',
        fontFamily: "'Inter', system-ui, sans-serif", fontSize: '.68rem',
      }}>
        <Link href="/" style={{ color: '#ff6b00', textDecoration: 'none', fontWeight: 600 }}>Guitar Cheat Sheet</Link>
        <span style={{ color: 'rgba(169,138,125,.3)' }}>›</span>
        <span style={{ color: '#a98a7d' }}>Contact</span>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '.6rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.14em',
          color: 'rgba(169,138,125,.45)', marginBottom: 12,
        }}>Reach Out</p>

        <h1 style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700,
          color: '#e5e2e1', marginBottom: 16,
          lineHeight: 1.15, letterSpacing: '-0.02em',
        }}>Get in Touch</h1>

        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '.92rem', color: '#e2bfb0',
          lineHeight: 1.7, marginBottom: 36,
        }}>
          We&apos;d love to hear from you. Whether you&apos;ve spotted an error, have a suggestion for
          new content, or just want to say hello — use the form below.
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(79,201,106,.08)',
            border: '1px solid rgba(79,201,106,.25)',
            borderLeft: '3px solid #4fc96a',
            padding: '20px 24px',
          }}>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '.92rem',
              color: '#4fc96a', margin: 0, marginBottom: 12,
            }}>
              ✓ Message received — thank you!
            </p>
            <button
              onClick={() => setStatus('idle')}
              style={{
                background: 'transparent', border: 'none',
                color: '#ff6b00',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.72rem', fontWeight: 700,
                cursor: 'pointer', padding: 0,
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}
            >
              Send another →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelStyle}>Your name</label>
              <input
                type="text" name="name" required
                placeholder="e.g. John"
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,.4)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#353534' }}
              />
            </div>

            <div>
              <label style={labelStyle}>Email address</label>
              <input
                type="email" name="email" required
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,.4)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#353534' }}
              />
            </div>

            <div>
              <label style={labelStyle}>Subject</label>
              <select
                name="subject"
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,.4)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#353534' }}
              >
                <option value="suggestion">Content suggestion</option>
                <option value="error">Report an error</option>
                <option value="feedback">General feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message" required rows={6}
                placeholder="Your message…"
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,.4)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#353534' }}
              />
            </div>

            {status === 'error' && (
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.86rem', color: '#ffb4ab', margin: 0,
              }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                alignSelf: 'flex-start',
                background: status === 'loading' ? 'rgba(255,107,0,.5)' : '#ff6b00',
                color: '#000',
                border: 'none', borderRadius: 2,
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.72rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '12px 28px',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'opacity .15s',
                boxShadow: status === 'loading' ? 'none' : '0 0 16px rgba(255,107,0,.25)',
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid #353534' }}>
          <Link href="/" style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '.72rem', fontWeight: 600,
            color: 'rgba(169,138,125,.5)',
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Guitar Cheat Sheet
          </Link>
        </div>
      </div>
    </main>
  )
}
