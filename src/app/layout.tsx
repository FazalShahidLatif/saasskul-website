import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/ChatWidget'
import PaddleProvider from '@/components/PaddleProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SaaSSkul — AI Lead Generation for Small Businesses',
    template: '%s | SaaSSkul',
  },
  description:
    'SaaSSkul automates your lead generation with AI. Capture, qualify, follow up, and book appointments on autopilot. Trusted by 500+ businesses.',
  keywords: [
    'AI lead generation',
    'marketing automation',
    'lead qualification',
    'appointment booking',
    'small business automation',
    'CRM automation',
    'SaaS',
  ],
  authors: [{ name: 'SaaSSkul Team' }],
  creator: 'SaaSSkul',
  metadataBase: new URL('https://saasskul.com'),
  alternates: {
    canonical: 'https://saasskul.com',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saaskul.com',
    title: 'SaaSSkul — AI Lead Generation for Small Businesses',
    description:
      'Automate your lead generation with AI. Capture, qualify, follow up, and book appointments on autopilot.',
    siteName: 'SaaSSkul',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SaaSSkul — AI Lead Generation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaSSkul — AI Lead Generation for Small Businesses',
    description: 'Automate your lead generation with AI.',
    creator: '@saaskul',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://saasskul.com/#organization',
        name: 'SaaSSkul',
        url: 'https://saasskul.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://saasskul.com/logo.png',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+92-332-213-7898',
          contactType: 'customer support',
          email: 'hello@saasskul.com',
          availableLanguage: 'English',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Cantt Bazar Faisal',
          addressLocality: 'Karachi',
          addressCountry: 'PK',
        },
        sameAs: [
          'https://twitter.com/saasskul',
          'https://linkedin.com/company/saasskul',
          'https://github.com/FazalShahidLatif/saasskul-website',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://saasskul.com/#website',
        url: 'https://saasskul.com',
        name: 'SaaSSkul',
        description: 'AI-powered lead generation platform for small businesses',
        publisher: { '@id': 'https://saasskul.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://saasskul.com/blog?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'SaaSSkul AI Lead Engine',
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '29',
          highPrice: '199',
          offerCount: '3',
        },
        operatingSystem: 'Web',
        url: 'https://saasskul.com',
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics — replace G-XXXXXXXXXX with your Measurement ID */}
        {/* Google Analytics G-RPBLRYT5L3 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RPBLRYT5L3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-RPBLRYT5L3',{page_path:window.location.pathname});`,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <PaddleProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
