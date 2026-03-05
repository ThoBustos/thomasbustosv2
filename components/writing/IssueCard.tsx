'use client'

import Link from 'next/link'
import { DigestSummary } from '@/lib/digestService'

interface IssueCardProps {
  issue: DigestSummary
}

export default function IssueCard({ issue }: IssueCardProps) {
  const date = new Date(issue.publish_date + 'T00:00:00')
  const day = date.toLocaleDateString('en-US', { day: '2-digit' })
  const firstTag = issue.keywords?.[0]

  return (
    <Link
      href={`/writing/${issue.publish_date}`}
      className="group flex items-baseline gap-4 py-3 border-b border-neutral-50 no-underline"
      style={{ textDecoration: 'none' }}
    >
      {/* Day */}
      <span
        className="shrink-0 text-neutral-400"
        style={{
          fontFamily: 'var(--font-geist), sans-serif',
          fontSize: '0.78rem',
          width: '24px',
        }}
      >
        {day}
      </span>

      {/* Title + single tag */}
      <div className="flex-1 min-w-0">
        <span
          className="block text-black group-hover:text-[#7C6AC4] transition-colors duration-150 leading-snug"
          style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.92rem' }}
        >
          {issue.title}
        </span>

        {firstTag && (
          <span
            className="inline-block mt-1.5"
            style={{
              fontFamily: 'var(--font-geist), sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.05em',
              color: '#7C6AC4',
              border: '1px solid #7C6AC4',
              borderRadius: '2px',
              padding: '1px 5px',
              lineHeight: 1.5,
            }}
          >
            {firstTag}
          </span>
        )}
      </div>
    </Link>
  )
}
