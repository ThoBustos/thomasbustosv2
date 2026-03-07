'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import { type Book, type Status, type Category, BOOKS } from '@/lib/data/books'

const FILTERS = ['All', 'Mind', 'Business', 'Philosophy', 'Science', 'History', 'Fiction', 'Favorites'] as const
type Filter = typeof FILTERS[number]

const statusDot: Record<Status, { color: string; title: string }> = {
  read:     { color: '#000000', title: 'Read' },
  reading:  { color: '#7C6AC4', title: 'Reading' },
  'to-read':{ color: '#d4d4d4', title: 'To read' },
}

const statusLabel: Record<Status, string> = {
  read: 'Read',
  reading: 'Reading',
  'to-read': 'To read',
}

export default function LibraryDisplay() {
  const [active, setActive] = useState<Filter>('All')
  const [selected, setSelected] = useState<Book | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const statusOrder: Record<Status, number> = { reading: 0, read: 1, 'to-read': 2 }

  const filtered = BOOKS
    .filter(b => {
      const matchesCategory = active === 'All' ? true : active === 'Favorites' ? b.isFavorite : b.category === active
      const matchesQuery = query.trim() === '' ? true : b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
    .sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status]
      if (statusDiff !== 0) return statusDiff
      return a.title.localeCompare(b.title)
    })

  return (
    <main
      id="main-content"
      className="min-h-screen px-8 md:px-16 lg:px-24 py-24"
      style={{ background: 'white' }}
    >
      <div className="max-w-2xl w-full">
        {/* Heading */}
        <motion.h1
          className="m-0 mb-10 tracking-tight text-black"
          style={{
            fontFamily: 'var(--font-dm-serif), serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Library
        </motion.h1>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-x-5 gap-y-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {FILTERS.map(f => (
            <button
              type="button"
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              style={{
                fontFamily: 'var(--font-geist), sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                color: active === f ? '#000000' : '#a3a3a3',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottom: active === f ? '1px solid #000' : '1px solid transparent',
                cursor: 'pointer',
                padding: '0 0 2px 0',
                transition: 'color 0.15s ease',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search books or authors…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="border-b border-neutral-200 focus:border-[#7C6AC4] outline-none transition-colors w-full"
            style={{
              fontFamily: 'var(--font-geist), sans-serif',
              fontSize: '0.85rem',
              color: '#000',
              background: 'none',
              padding: '6px 0',
            }}
          />
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap gap-x-5 gap-y-1 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {[
            { dot: '#7C6AC4', label: 'Reading' },
            { dot: '#000000', label: 'Read' },
            { dot: '#d4d4d4', label: 'To read' },
            { dot: '#F89151', label: 'Favorite', star: true },
          ].map(({ dot, label, star }) => (
            <div key={label} className="flex items-center gap-1.5">
              {star ? (
                <span style={{ color: '#F89151', fontSize: '0.65rem', lineHeight: 1 }}>★</span>
              ) : (
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dot, display: 'inline-block', flexShrink: 0 }} />
              )}
              <span
                className="text-neutral-400"
                style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.72rem' }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Book list */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {filtered.map((book, i) => (
            <div
              key={i}
              className="flex items-baseline gap-4 py-3 border-b border-neutral-50 cursor-pointer group"
              onClick={() => setSelected(book)}
            >
              {/* Title + author */}
              <div className="flex-1 min-w-0">
                <span
                  className="text-black group-hover:text-[#7C6AC4] transition-colors duration-150"
                  style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.92rem' }}
                >
                  {book.isFavorite && (
                    <span style={{ color: '#F89151', marginRight: '6px', fontSize: '0.7rem' }}>★</span>
                  )}
                  {book.title}
                </span>
                <span
                  className="ml-3 text-neutral-400"
                  style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.78rem' }}
                >
                  {book.author}
                </span>
              </div>

              {/* Status dot */}
              <span
                title={statusDot[book.status].title}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: statusDot[book.status].color,
                  display: 'inline-block',
                  flexShrink: 0,
                  marginBottom: '2px',
                }}
              />
            </div>
          ))}

          <p
            className="mt-6 text-neutral-300"
            style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.75rem' }}
          >
            {filtered.length} {filtered.length === 1 ? 'book' : 'books'}
          </p>
        </motion.div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.08)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelected(null)}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full z-50 flex flex-col"
              style={{
                width: 'min(360px, 100vw)',
                background: 'white',
                borderLeft: '1px solid #f5f5f5',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Close button */}
              <div className="flex justify-end p-6 pb-0">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close book details"
                  style={{
                    fontFamily: 'var(--font-geist), sans-serif',
                    fontSize: '1.2rem',
                    color: '#a3a3a3',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col px-8 pt-6 pb-10 flex-1 overflow-y-auto">
                {/* Cover */}
                <div className="mb-8">
                  <Image
                    src={selected.cover}
                    alt={selected.title}
                    width={140}
                    height={196}
                    sizes="140px"
                    style={{ objectFit: 'cover', display: 'block', boxShadow: '0 8px 24px rgba(0,0,0,0.14)' }}
                  />
                </div>

                {/* Title */}
                <h2
                  className="m-0 mb-2 leading-tight text-black"
                  style={{
                    fontFamily: 'var(--font-dm-serif), serif',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                  }}
                >
                  {selected.title}
                </h2>

                {/* Author */}
                <p
                  className="m-0 mb-8 text-neutral-400"
                  style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.88rem' }}
                >
                  {selected.author}
                </p>

                {/* Meta */}
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Category', value: selected.category },
                    { label: 'Year', value: String(selected.year) },
                    { label: 'Status', value: statusLabel[selected.status], color: statusDot[selected.status].color },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span
                        className="text-neutral-400 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.68rem', letterSpacing: '0.15em' }}
                      >
                        {label}
                      </span>
                      <span
                        style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.85rem', color: color ?? '#000' }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                  {selected.isFavorite && (
                    <div className="flex items-center justify-between">
                      <span
                        className="text-neutral-400 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.68rem', letterSpacing: '0.15em' }}
                      >
                        Favorite
                      </span>
                      <span style={{ color: '#F89151', fontSize: '0.85rem' }}>★</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
