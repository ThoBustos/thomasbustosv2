'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function SubscribeForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchParams.get('confirmed') === '1') {
      setStatus('success')
      setMessage("You're in.")
    } else if (searchParams.get('unsubscribed') === '1') {
      setMessage("Unsubscribed.")
    }
  }, [searchParams])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

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

  const font = 'var(--font-geist), sans-serif'

  if (status === 'success') {
    return (
      <span style={{ fontFamily: font, fontSize: '0.82rem', color: '#7C6AC4' }}>
        {message}
      </span>
    )
  }

  if (!open) {
    if (searchParams.get('unsubscribed') === '1') {
      return (
        <span style={{ fontFamily: font, fontSize: '0.82rem', color: '#666' }}>
          Unsubscribed.
        </span>
      )
    }

    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          fontFamily: font,
          fontSize: '0.82rem',
          color: '#000',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid #000',
          cursor: 'pointer',
          padding: '0 0 1px',
          flexShrink: 0,
        }}
      >
        Subscribe →
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}
    >
      <input
        ref={inputRef}
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'submitting'}
        aria-label="Email address"
        className="border-b border-neutral-300 focus:border-black outline-none transition-colors"
        style={{
          fontFamily: font,
          fontSize: '0.82rem',
          color: '#000',
          background: 'none',
          width: '180px',
          padding: '0 0 1px',
        }}
      />
      {status === 'error' && (
        <span style={{ fontFamily: font, fontSize: '0.72rem', color: '#c44b4b' }}>
          {message}
        </span>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          fontFamily: font,
          fontSize: '0.82rem',
          color: status === 'submitting' ? '#aaa' : '#7C6AC4',
          background: 'none',
          border: 'none',
          cursor: status === 'submitting' ? 'default' : 'pointer',
          padding: 0,
        }}
      >
        {status === 'submitting' ? '…' : '→'}
      </button>
      <button
        type="button"
        onClick={() => { setOpen(false); setStatus('idle'); setMessage('') }}
        style={{
          fontFamily: font,
          fontSize: '0.75rem',
          color: '#bbb',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        ✕
      </button>
    </form>
  )
}
