'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Status = 'read' | 'reading' | 'to-read'
type Category = 'Business' | 'Mind' | 'Philosophy' | 'Science' | 'History' | 'Fiction'

interface Book {
  title: string
  author: string
  category: Category
  status: Status
  isFavorite: boolean
  year: number
  cover: string
}

const BOOKS: Book[] = [
  { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', category: 'Business', status: 'read', isFavorite: true, year: 2014, cover: '/img/books/the_hard_thing_about_hard_things.jpg' },
  { title: 'Zero to One', author: 'Peter Thiel', category: 'Business', status: 'read', isFavorite: false, year: 2014, cover: '/img/books/Zero_to_One.jpg' },
  { title: 'The Lean Startup', author: 'Eric Ries', category: 'Business', status: 'read', isFavorite: false, year: 2011, cover: '/img/books/Lean_Startup.png' },
  { title: 'Traction', author: 'Gabriel Weinberg', category: 'Business', status: 'read', isFavorite: true, year: 2015, cover: '/img/books/TRACTION.jpg' },
  { title: 'Who: The A Method for Hiring', author: 'Geoff Smart & Randy Street', category: 'Business', status: 'read', isFavorite: false, year: 2008, cover: '/img/books/WHO.jpg' },
  { title: 'Sell More Faster', author: 'Amos Schwartzfarb', category: 'Business', status: 'read', isFavorite: true, year: 2019, cover: '/img/books/sell_more_faster.jpg' },
  { title: '7 Powers', author: 'Hamilton Helmer', category: 'Business', status: 'read', isFavorite: false, year: 2016, cover: '/img/books/7_powers.jpg' },
  { title: 'Never Enough', author: 'Howard Schultz', category: 'Business', status: 'read', isFavorite: false, year: 2024, cover: '/img/books/never_enough.webp' },
  { title: 'The Making of a Manager', author: 'Julie Zhuo', category: 'Business', status: 'read', isFavorite: false, year: 2019, cover: '/img/books/the_making_of_a_manager.jpg' },
  { title: '$100M Leads', author: 'Alex Hormozi', category: 'Business', status: 'read', isFavorite: false, year: 2023, cover: '/img/books/$100M_leads.jpg' },
  { title: '$100M Offers', author: 'Alex Hormozi', category: 'Business', status: 'read', isFavorite: false, year: 2021, cover: '/img/books/$100M_offers.jpg' },
  { title: 'High Output Management', author: 'Andrew S. Grove', category: 'Business', status: 'read', isFavorite: false, year: 1983, cover: '/img/books/high_output_management.jpg' },
  { title: 'The Lean Product Playbook', author: 'Dan Olsen', category: 'Business', status: 'read', isFavorite: true, year: 2015, cover: '/img/books/the_lean_product_playbook.jpg' },
  { title: 'Principles', author: 'Ray Dalio', category: 'Business', status: 'read', isFavorite: false, year: 2017, cover: '/img/books/principles.jpg' },
  { title: "Poor Charlie's Almanack", author: 'Charlie Munger', category: 'Business', status: 'read', isFavorite: false, year: 2005, cover: "/img/books/poor_charlie's_almanack.jpg" },
  { title: 'Skin in the Game', author: 'Nassim Nicholas Taleb', category: 'Business', status: 'read', isFavorite: false, year: 2018, cover: '/img/books/skin_in_the_game.jpg' },
  { title: "The Innovator's Dilemma", author: 'Clayton Christensen', category: 'Business', status: 'reading', isFavorite: false, year: 1997, cover: "/img/books/the_innovator's_dilemma.jpg" },
  { title: 'Reality Transurfing', author: 'Vadim Zeland', category: 'Mind', status: 'read', isFavorite: false, year: 2004, cover: '/img/books/reality_transurfing.jpg' },
  { title: 'Unlimited Power', author: 'Tony Robbins', category: 'Mind', status: 'read', isFavorite: false, year: 1986, cover: '/img/books/unlimited_power.jpg' },
  { title: "Man's Search for Meaning", author: 'Viktor Frankl', category: 'Mind', status: 'read', isFavorite: false, year: 1946, cover: "/img/books/man's_search_for_meaning.webp" },
  { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', category: 'Mind', status: 'read', isFavorite: false, year: 1989, cover: '/img/books/7_habits_of_highly_effective_people.jpg' },
  { title: '101 Essays That Will Change the Way You Think', author: 'Brianna Wiest', category: 'Mind', status: 'read', isFavorite: false, year: 2016, cover: '/img/books/101_essays_that_will_change_the_way_you_think.jpg' },
  { title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson', category: 'Mind', status: 'read', isFavorite: false, year: 2020, cover: '/img/books/the_almanack_of_naval_ravikant.jpg' },
  { title: 'Atomic Habits', author: 'James Clear', category: 'Mind', status: 'read', isFavorite: false, year: 2018, cover: '/img/books/atomic_habits.jpg' },
  { title: 'The 5 AM Club', author: 'Robin Sharma', category: 'Mind', status: 'read', isFavorite: false, year: 2018, cover: '/img/books/the_5_am_club.jpg' },
  { title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', category: 'Mind', status: 'read', isFavorite: false, year: 1936, cover: '/img/books/how_to_win_friends_and_influence_people.jpg' },
  { title: 'The Power of Now', author: 'Eckhart Tolle', category: 'Mind', status: 'read', isFavorite: false, year: 1997, cover: '/img/books/the_power_of_now.jpg' },
  { title: 'The Art of Happiness', author: 'Dalai Lama', category: 'Mind', status: 'read', isFavorite: false, year: 1998, cover: '/img/books/the_art_of_happiness.jpg' },
  { title: 'The Alchemist', author: 'Paulo Coelho', category: 'Mind', status: 'read', isFavorite: false, year: 1988, cover: '/img/books/the_alchemist.jpg' },
  { title: 'Meditations', author: 'Marcus Aurelius', category: 'Philosophy', status: 'read', isFavorite: false, year: 180, cover: '/img/books/meditations.jpg' },
  { title: 'Human, All Too Human', author: 'Friedrich Nietzsche', category: 'Philosophy', status: 'read', isFavorite: false, year: 1878, cover: '/img/books/human_all_too_human.jpg' },
  { title: 'Treatise on Toleration', author: 'Voltaire', category: 'Philosophy', status: 'read', isFavorite: false, year: 1763, cover: '/img/books/treatise_on_toleration.jpg' },
  { title: 'Meditations on First Philosophy', author: 'Rene Descartes', category: 'Philosophy', status: 'read', isFavorite: false, year: 1641, cover: '/img/books/meditations_on_first_philosophy.jpg' },
  { title: 'The Social Contract', author: 'Jean-Jacques Rousseau', category: 'Philosophy', status: 'read', isFavorite: false, year: 1762, cover: '/img/books/the_social_contract.jpg' },
  { title: 'The Little Book of Stoicism', author: 'Jonas Salzgeber', category: 'Philosophy', status: 'read', isFavorite: false, year: 2019, cover: '/img/books/the_little_book_of_stoicism.jpg' },
  { title: 'The Origin of Species', author: 'Charles Darwin', category: 'Science', status: 'read', isFavorite: false, year: 1859, cover: '/img/books/the_origin_of_species.jpg' },
  { title: 'Six Easy Pieces', author: 'Richard Feynman', category: 'Science', status: 'read', isFavorite: false, year: 1994, cover: '/img/books/six_easy_pieces.jpg' },
  { title: 'Learning Python Design Patterns', author: 'Chetan Giridhar', category: 'Science', status: 'read', isFavorite: false, year: 2016, cover: '/img/books/learning_python_design_patterns.jpg' },
  { title: 'The RLHF Book', author: 'Nathan Lambert', category: 'Science', status: 'read', isFavorite: false, year: 2025, cover: '/img/books/the_rlhf_book.webp' },
  { title: 'The Little Book of Deep Learning', author: 'François Fleuret', category: 'Science', status: 'read', isFavorite: false, year: 2023, cover: '/img/books/the_little_book_of_deep_learning.jpg' },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', status: 'reading', isFavorite: false, year: 1988, cover: '/img/books/a_brief_history_of_time.jpg' },
  { title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Gamma, Helm, Johnson, Vlissides', category: 'Science', status: 'to-read', isFavorite: false, year: 1994, cover: '/img/books/design_patterns_big_four.webp' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', status: 'read', isFavorite: false, year: 2011, cover: '/img/books/sapiens.jpg' },
  { title: 'The Lessons of History', author: 'Will & Ariel Durant', category: 'History', status: 'read', isFavorite: false, year: 1968, cover: '/img/books/the_lessons_of_history.jpg' },
  { title: 'Einstein: His Life and Universe', author: 'Walter Isaacson', category: 'History', status: 'read', isFavorite: false, year: 2007, cover: '/img/books/einstein.jpg' },
  { title: 'Elon Musk', author: 'Walter Isaacson', category: 'History', status: 'read', isFavorite: false, year: 2023, cover: '/img/books/elon_musk.jpg' },
  { title: 'Leonardo da Vinci', author: 'Walter Isaacson', category: 'History', status: 'read', isFavorite: false, year: 2017, cover: '/img/books/leonardo_da_vinci.jpg' },
  { title: 'Foundation', author: 'Isaac Asimov', category: 'Fiction', status: 'read', isFavorite: false, year: 1951, cover: '/img/books/foundation.jpg' },
  { title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', category: 'Fiction', status: 'read', isFavorite: false, year: 2006, cover: '/img/books/half_of_a_yellow_sun.jpg' },
  { title: 'Stranger in a Strange Land', author: 'Robert A. Heinlein', category: 'Fiction', status: 'read', isFavorite: false, year: 1961, cover: '/img/books/stranger_in_a_strange_land.jpg' },
  { title: 'The Talisman', author: 'Stephen King & Peter Straub', category: 'Fiction', status: 'read', isFavorite: false, year: 1984, cover: '/img/books/the_talisman.jpg' },
  { title: 'Neuromancer', author: 'William Gibson', category: 'Fiction', status: 'read', isFavorite: false, year: 1984, cover: '/img/books/neuromancer.jpg' },
  { title: 'Ghost Story', author: 'Peter Straub', category: 'Fiction', status: 'read', isFavorite: false, year: 1979, cover: '/img/books/ghost_story.jpg' },
  { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', category: 'Fiction', status: 'read', isFavorite: false, year: 1952, cover: '/img/books/the_old_man_and_the_sea.jpg' },
]

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

export default function LibraryPage() {
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
              key={f}
              onClick={() => setActive(f)}
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
            style={{
              fontFamily: 'var(--font-geist), sans-serif',
              fontSize: '0.85rem',
              color: '#000',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #e5e5e5',
              outline: 'none',
              width: '100%',
              padding: '6px 0',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={e => (e.target.style.borderBottomColor = '#7C6AC4')}
            onBlur={e => (e.target.style.borderBottomColor = '#e5e5e5')}
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
                  onClick={() => setSelected(null)}
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
