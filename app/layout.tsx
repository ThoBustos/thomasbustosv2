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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Thomas Bustos',
  url: 'https://thomasbustos.com',
  description: '2x Cofounder · Builder · Writer. Building AI-native products and documenting the journey.',
  jobTitle: 'Co-founder & Builder',
  sameAs: [
    'https://x.com/ThoBustos',
    'https://www.linkedin.com/in/thomasbustos/',
    'https://github.com/ThoBustos',
    'https://www.youtube.com/@lets-talk-ai',
    'https://thomasbustos.substack.com/',
    'https://www.ainativeclub.com/',
  ],
}

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
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ThoBustos',
    title: 'Thomas Bustos',
    description: '2x Cofounder · Builder · Writer',
    images: ['/og-default.png'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
