import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Guitar Cheat Sheet. Learn how we handle data, cookies, and advertising.',
}

const HEADING_STYLE = {
  fontFamily: "'Noto Serif', Georgia, serif",
  fontSize: '1.1rem', fontWeight: 600,
  color: '#e5e2e1', marginBottom: 10,
} as const

const BODY_STYLE = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '.88rem', color: '#e2bfb0',
  lineHeight: 1.75, whiteSpace: 'pre-line' as const,
  marginBottom: 10,
} as const

const SECTIONS = [
  {
    heading: '1. Information We Collect',
    body: `Guitar Cheat Sheet does not require you to create an account or provide any personal information to use the site. We do not collect names, email addresses, or any personally identifiable information directly.

When you visit the site, standard web server logs may automatically record technical data such as your IP address, browser type, operating system, referring URLs, and pages visited. This data is used solely for site security and performance monitoring, and is not linked to any individual.`,
  },
  {
    heading: '2. Cookies',
    body: `This site may use cookies for functionality and to serve advertising. A cookie is a small text file stored on your device by your browser.

We may use:
• Session cookies — temporary cookies that expire when you close your browser, used to maintain state during your visit (e.g., your selected category or search).
• Third-party advertising cookies — if Google AdSense advertisements are displayed, Google may set cookies to serve ads based on your prior visits to this or other websites.

You can disable cookies in your browser settings. Note that some functionality may be affected.`,
  },
  {
    heading: '3. Google AdSense & Advertising',
    body: `We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this website and other websites on the Internet.

You may opt out of personalised advertising by visiting Google's Ads Settings at https://www.google.com/settings/ads. You can also opt out of a third-party vendor's use of cookies for personalised advertising by visiting www.aboutads.info.

Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.`,
  },
  {
    heading: '4. Analytics',
    body: `We may use analytics tools (such as Google Analytics) to understand how visitors use the site. This data is aggregated and anonymised — it does not identify individual users. It helps us improve the content and user experience.`,
  },
  {
    heading: '5. Third-Party Links',
    body: `Guitar Cheat Sheet may contain links to external websites. We have no control over the content or privacy practices of those sites and are not responsible for them. We encourage you to review the privacy policy of any third-party site you visit.`,
  },
  {
    heading: '6. Children\'s Privacy',
    body: `This site is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information to us, please contact us and we will delete it promptly.`,
  },
  {
    heading: '7. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after any changes constitutes your acceptance of the revised policy.`,
  },
  {
    heading: '8. Contact',
    body: `If you have any questions about this Privacy Policy, please contact us via the Contact page.`,
  },
]

export default function PrivacyPage() {
  const updated = 'March 2025'

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
        <span style={{ color: '#a98a7d' }}>Privacy Policy</span>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '.6rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.14em',
          color: 'rgba(169,138,125,.45)', marginBottom: 12,
        }}>Legal</p>

        <h1 style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700,
          color: '#e5e2e1', marginBottom: 8,
          lineHeight: 1.15, letterSpacing: '-0.02em',
        }}>Privacy Policy</h1>

        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '.7rem', color: 'rgba(169,138,125,.4)',
          marginBottom: 40, letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>Last updated: {updated}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {SECTIONS.map(({ heading, body }) => (
            <section key={heading} style={{
              paddingBottom: 32,
              borderBottom: '1px solid rgba(169,138,125,.07)',
            }}>
              <h2 style={HEADING_STYLE}>{heading}</h2>
              {body.split('\n\n').map((para, i) => (
                <p key={i} style={BODY_STYLE}>{para}</p>
              ))}
            </section>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
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
