import type { Metadata } from 'next'
import { DM_Serif_Display, Geist } from 'next/font/google'
import './globals.css'
import StaggeredMenu from '@/components/nav/StaggeredMenu'
import { SOCIAL_LINKS } from '@/lib/data/social'

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thomasbustos.com'),
  title: {
    default: 'Thomas Bustos',
    template: '%s — Thomas Bustos',
  },
  description: '2x Cofounder · Builder · Writer',
  openGraph: {
    title: 'Thomas Bustos',
    description: '2x Cofounder · Builder · Writer',
    type: 'website',
    siteName: 'Thomas Bustos',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ThoBustos',
    title: 'Thomas Bustos',
    description: '2x Cofounder · Builder · Writer',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${geist.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
        >
          Skip to content
        </a>
        <StaggeredMenu
          isFixed
          position="right"
          colors={['#7C6AC4', '#F89151']}
          accentColor="#F89151"
          menuButtonColor="#000000"
          openMenuButtonColor="#ffffff"
          displayItemNumbering={false}
          items={[
            { label: 'Home', link: '/' },
            { label: 'Mission', link: '/mission' },
            { label: 'Events', link: '/events' },
            { label: 'Library', link: '/library' },
            { label: 'AI News', link: '/ainews' },
            { label: 'Projects', link: '/projects' },
          ]}
          socialItems={SOCIAL_LINKS.map(({ label, href }) => ({ label, link: href }))}
        />
        {children}
      </body>
    </html>
  )
}
