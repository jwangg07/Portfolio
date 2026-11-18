import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { siteContent } from '@/content/site'
import './globals.css'

const spaceGrotesk = localFont({
  src: './fonts/space-grotesk.woff2',
  weight: '300 700',
  display: 'swap',
  variable: '--font-interface',
})

const dmMono = localFont({
  src: './fonts/dm-mono.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-metadata',
  preload: false,
})

// oxlint-disable-next-line react/only-export-components -- Next.js reads metadata from its layout.
export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
  icons: { icon: { url: '/favicon.svg?v=2', type: 'image/svg+xml' } },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body id="top">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
