import type { Metadata } from 'next'
import { siteContent } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="scroll-smooth"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Press+Start+2P&display=swap" rel="stylesheet" /></head><body>{children}</body></html>
}
