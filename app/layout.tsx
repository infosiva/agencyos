import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import FeedbackWidget from '@/components/FeedbackWidget'
import { AnimatedBg } from '@/components/AnimatedBg'
import Navbar from '@/components/Navbar'
import Telemetry from '@/components/Telemetry'
import { getSiteFlags } from '@/lib/flags'
import { loadSiteTheme, buildThemeStyleTag, buildGa4Snippet, isValidGa4Id } from '@/lib/theme-loader'
import config from '@/vertical.config'
import { MotionProvider } from '@infosiva/shared-ui/modern'

// Theme is read from Edge Config (cached 600s in the loader); re-render the layout on the same cadence.
export const revalidate = 600

const SITE_ID = 'agencyos'
const DEFAULT_ARCHETYPE = 'directory-marketplace'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  title: config.metaTitle,
  description: config.metaDescription,
  keywords: config.keywords,
  openGraph: { title: config.metaTitle, description: config.metaDescription, type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: config.metaTitle }] },
  twitter: { card: 'summary_large_image', title: config.metaTitle, description: config.metaDescription, images: ['/og.png'] },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.svg' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [flags, theme] = await Promise.all([getSiteFlags(SITE_ID), loadSiteTheme(SITE_ID)])
  const ga4 = theme?.analytics?.ga4Id
  return (
    <html lang="en" data-layout={theme?.layout?.archetype ?? DEFAULT_ARCHETYPE}>
      <head>
        <style id="hub-theme" dangerouslySetInnerHTML={{ __html: buildThemeStyleTag(theme) }} />
        <meta name="google-adsense-account" content="ca-pub-4237294630161176" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4237294630161176" crossOrigin="anonymous" strategy="afterInteractive" />
        {isValidGa4Id(ga4) && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: buildGa4Snippet(theme) }} />
          </>
        )}
      </head>
      <body>
        <AnimatedBg theme={theme} fallback="aurora" />
        <Navbar />
        <MotionProvider>{children}</MotionProvider>
        {flags.chatbot && <FloatingChatWrapper />}
        <FeedbackWidget siteName={config.name} position="left" />
        <Telemetry />
      </body>
    </html>
  )
}
