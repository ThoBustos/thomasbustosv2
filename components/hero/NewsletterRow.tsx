'use client'

import Link from 'next/link'

export function NewsletterRow() {
  return (
    <div className="flex items-center mt-8">
      <Link
        href="/ainews"
        style={{
          fontFamily: 'var(--font-dm-serif), serif',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'rgb(163 163 163)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#000' }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgb(163 163 163)' }}
      >
        the ai newsletter i read every morning
      </Link>
    </div>
  )
}
