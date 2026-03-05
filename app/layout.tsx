import type { Metadata } from 'next'
import { DM_Serif_Display, Geist } from 'next/font/google'
import './globals.css'
import StaggeredMenu from '@/components/nav/StaggeredMenu'

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
  title: 'Thomas Bustos',
  description: 'Forward Deployed Engineer · Builder · Writer',
  openGraph: {
    title: 'Thomas Bustos',
    description: 'Forward Deployed Engineer · Builder · Writer',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Thomas Bustos',
    description: 'Forward Deployed Engineer · Builder · Writer',
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
          socialItems={[
            { label: 'X', link: 'https://x.com/ThoBustos' },
            { label: 'LinkedIn', link: 'https://www.linkedin.com/in/thomasbustos/' },
            { label: 'GitHub', link: 'https://github.com/ThoBustos' },
            { label: 'YouTube', link: 'https://www.youtube.com/@lets-talk-ai' },
            { label: 'Substack', link: 'https://thomasbustos.substack.com/' },
            { label: 'TikTok', link: 'https://www.tiktok.com/@lets_talk_ai' },
          ]}
        />
        {children}
      </body>
    </html>
  )
}
