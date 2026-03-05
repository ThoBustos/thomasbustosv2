'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import IssueCard from '@/components/writing/IssueCard'
import { DigestSummary } from '@/lib/digestService'

interface WritingClientProps {
  issues: DigestSummary[]
}

function groupByMonth(issues: DigestSummary[]): { label: string; issues: DigestSummary[] }[] {
  const map = new Map<string, DigestSummary[]>()
  for (const issue of issues) {
    const d = new Date(issue.publish_date + 'T00:00:00')
    const key = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(issue)
  }
  return Array.from(map.entries()).map(([label, issues]) => ({ label, issues }))
}

export default function WritingClient({ issues }: WritingClientProps) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? issues.filter((i) => {
        const q = query.toLowerCase()
        return (
          i.title.toLowerCase().includes(q) ||
          i.keywords?.some((k) => k.toLowerCase().includes(q))
        )
      })
    : issues

  const groups = groupByMonth(filtered)

  return (
    <main
      className="min-h-screen px-8 md:px-16 lg:px-24 py-24"
      style={{ background: 'white' }}
    >
      <div style={{ maxWidth: '760px', width: '100%' }}>
        {/* Heading */}
        <motion.h1
          className="m-0 mb-6 tracking-tight text-black"
          style={{
            fontFamily: 'var(--font-dm-serif), serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          News
        </motion.h1>

        {/* Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search issues or topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              fontFamily: 'var(--font-geist), sans-serif',
              fontSize: '0.85rem',
              color: '#000',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #e5e5e5',
              outline: 'none',
              width: '100%',
              maxWidth: '320px',
              padding: '6px 0',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={(e) => (e.target.style.borderBottomColor = '#7C6AC4')}
            onBlur={(e) => (e.target.style.borderBottomColor = '#e5e5e5')}
          />
        </motion.div>

        {/* Issue list */}
        <motion.div
          key={query}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {filtered.length === 0 ? (
            <p
              className="text-neutral-300"
              style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.85rem' }}
            >
              No issues found.
            </p>
          ) : (
            <>
              {groups.map((group) => (
                <div key={group.label} className="mb-8">
                  {/* Mobile: month as full-width row. Desktop: left-gutter grid */}
                  <div className="md:hidden mb-2">
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-serif), serif',
                        fontSize: '0.85rem',
                        color: '#d4d4d4',
                        fontWeight: 400,
                      }}
                    >
                      {group.label}
                    </span>
                  </div>

                  <div
                    className="hidden md:grid"
                    style={{ gridTemplateColumns: '100px 1fr', gap: '0 2rem' }}
                  >
                    {/* Month label — desktop gutter */}
                    <div style={{ paddingTop: '0.85rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-dm-serif), serif',
                          fontSize: '0.85rem',
                          color: '#d4d4d4',
                          fontWeight: 400,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {group.label}
                      </span>
                    </div>

                    {/* Issues */}
                    <div>
                      {group.issues.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} />
                      ))}
                    </div>
                  </div>

                  {/* Mobile issue list */}
                  <div className="md:hidden">
                    {group.issues.map((issue) => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                </div>
              ))}

              <p
                className="text-neutral-300 md:pl-[132px]"
                style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.75rem' }}
              >
                {filtered.length} {filtered.length === 1 ? 'issue' : 'issues'}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </main>
  )
}
