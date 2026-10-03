import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jerry Wang - Developer & Builder',
  description: 'Jerry Wang is a developer turning complex problems into thoughtful digital experiences. One well-placed block at a time.',
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { themeColor: '#101112' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="scroll-smooth"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Press+Start+2P&display=swap" rel="stylesheet" /></head><body>{children}</body></html>
}
