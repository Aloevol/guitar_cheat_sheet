import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Guitar Cheat Sheet. Learn how we handle data, cookies, and advertising.',
}

export default function PrivacyPage() {
  const updated = 'March 2025'

  return (
    <main style={{ minHeight: '100vh', background: '#0d0b08' }}>
      <nav style={{
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '14px 24px', display: 'flex', gap: 8, alignItems: 'center',
        fontFamily: "'Space Mono', monospace", fontSize: '.7rem',
      }}>
        <Link href="/" style={{ color: '#c9a84c', textDecoration: 'none' }}>Guitar Cheat Sheet</Link>
        <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
        <span style={{ color: 'rgba(255,255,255,.5)' }}>Privacy Policy</span>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900,
          color: '#f5edda', marginBottom: 8,
        }}>Privacy Policy</h1>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '.65rem', color: 'rgba(255,255,255,.3)', marginBottom: 40 }}>
          Last updated: {updated}
        </p>

        {[
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

Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet. For more information about Google's privacy practices, visit https://policies.google.com/privacy.`,
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
        ].map(({ heading, body }) => (
          <section key={heading} style={{ marginBottom: 36 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700,
              color: '#f5edda', marginBottom: 10,
            }}>{heading}</h2>
            {body.split('\n\n').map((para, i) => (
              <p key={i} style={{
                fontFamily: "'Lora', Georgia, serif", fontSize: '.92rem',
                color: 'rgba(255,255,255,.6)', lineHeight: 1.75,
                whiteSpace: 'pre-line', marginBottom: 10,
              }}>{para}</p>
            ))}
          </section>
        ))}

        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <Link href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: '.72rem', color: '#c9a84c', textDecoration: 'none' }}>
            ← Back to Guitar Cheat Sheet
          </Link>
        </div>
      </div>
    </main>
  )
}
