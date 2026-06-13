import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import FloatingChatWrapper from '@/components/FloatingChatWrapper'

export const metadata: Metadata = {
  metadataBase: new URL('https://agencyos.app'),
  title: 'AgencyOS — AI Content Agency Platform',
  description: 'Run your content agency on AI. Brief → blog, podcast, video, LinkedIn, emails, clips and client report in 90 seconds. Manage unlimited clients. Free to start.',
  keywords: ['AI content agency', 'content agency platform', 'AI blog writer', 'social media AI', 'content automation tool', 'agency workflow software'],
  openGraph: {
    title: 'AgencyOS — AI Content Agency Platform',
    description: 'Brief → research → draft → schedule. AI handles the heavy lifting so your team ships 10x more content.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AgencyOS — AI Content Agency Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgencyOS — AI Content Agency Platform',
    description: 'Brief → blog, podcast, video, LinkedIn, emails, clips in 90 seconds.',
    images: ['/og.png'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-REPLACE_WITH_PUBLISHER_ID" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AgencyOS",
              "description": "AI-powered full-stack content agency — blog, podcast, video, social, email from one brief",
              "applicationCategory": "MarketingApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body style={{ minHeight: '100svh', overscrollBehavior: 'none' }}>

        {/* Sticky glass nav */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          justifyContent: 'space-between',
          background: 'rgba(5,5,9,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span className="logo-mark" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </span>
            <span style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: '-0.03em',
              color: 'var(--ink-1)',
            }}>
              Agency<span style={{ color: 'var(--aos)' }}>OS</span>
            </span>
          </a>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="#outputs" className="nav-link">Outputs</a>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#pricing" className="btn-aos" style={{ padding: '8px 18px', fontSize: 13 }}>
              Start free
            </a>
          </nav>
        </header>

        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>
        <Script defer data-site="agencyos.vercel.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
        <FloatingChatWrapper />
      </body>
    </html>
  )
}
