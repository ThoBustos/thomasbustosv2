'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function SubscribeForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (searchParams.get('confirmed') === '1') {
      setStatus('success')
      setMessage("You're confirmed. Welcome to AI News.")
    } else if (searchParams.get('unsubscribed') === '1') {
      setMessage("You've been unsubscribed.")
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong.')
      } else {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <p
        style={{
          fontFamily: 'var(--font-geist), sans-serif',
          fontSize: '0.8rem',
          color: '#7C6AC4',
          margin: 0,
        }}
      >
        {message}
      </p>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting'}
          aria-label="Email address"
          className="border-b border-neutral-200 focus:border-[#7C6AC4] outline-none transition-colors"
          style={{
            fontFamily: 'var(--font-geist), sans-serif',
            fontSize: '0.85rem',
            color: '#000',
            background: 'none',
            width: '200px',
            padding: '6px 0',
          }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            fontFamily: 'var(--font-geist), sans-serif',
            fontSize: '0.75rem',
            color: status === 'submitting' ? '#d4d4d4' : '#7C6AC4',
            background: 'none',
            border: 'none',
            cursor: status === 'submitting' ? 'default' : 'pointer',
            padding: 0,
            paddingBottom: '6px',
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p
          style={{
            fontFamily: 'var(--font-geist), sans-serif',
            fontSize: '0.75rem',
            color: '#F89151',
            margin: '6px 0 0',
          }}
        >
          {message}
        </p>
      )}
      {searchParams.get('unsubscribed') === '1' && (
        <p
          style={{
            fontFamily: 'var(--font-geist), sans-serif',
            fontSize: '0.75rem',
            color: '#d4d4d4',
            margin: '6px 0 0',
          }}
        >
          {message}
        </p>
      )}
    </div>
  )
}
