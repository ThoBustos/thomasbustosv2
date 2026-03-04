import type { Metadata } from 'next'
import { DM_Serif_Display, Geist } from 'next/font/google'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
