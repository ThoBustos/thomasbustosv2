'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <h2 style={{ fontFamily: 'var(--font-dm-serif), serif', fontSize: '2rem', fontWeight: 400, color: '#000', marginBottom: '0.75rem' }}>
        Something went wrong.
      </h2>
      <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.95rem', color: '#a3a3a3', marginBottom: '2rem' }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          fontFamily: 'var(--font-geist), sans-serif',
          fontSize: '0.88rem',
          color: '#7C6AC4',
          background: 'none',
          border: '1px solid #7C6AC4',
          borderRadius: '4px',
          padding: '0.5rem 1.25rem',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </main>
  )
}
