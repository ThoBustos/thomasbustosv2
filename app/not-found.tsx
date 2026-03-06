import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: '1rem' }}>
        404
      </p>
      <h1 style={{ fontFamily: 'var(--font-dm-serif), serif', fontSize: '2.5rem', fontWeight: 400, color: '#000', marginBottom: '0.75rem' }}>
        Page not found.
      </h1>
      <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.95rem', color: '#a3a3a3', marginBottom: '2rem' }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.88rem', color: '#7C6AC4', textDecoration: 'none' }}
      >
        ← Home
      </Link>
    </main>
  )
}
