import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/ChatWidget'
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://saaskul.com'),
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
