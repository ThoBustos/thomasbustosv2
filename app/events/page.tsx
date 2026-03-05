'use client'

import { motion } from 'framer-motion'

type Role = 'Speaker' | 'Attendee' | 'Organizer'

interface Event {
  month: string
  name: string
  location: string
  role: Role
  url?: string
}

interface EventGroup {
  year: string
  upcoming?: boolean
  events: Event[]
}

const data: EventGroup[] = [
  {
    year: 'Upcoming',
    upcoming: true,
    events: [
      { month: 'Apr', name: 'AI Engineer Europe', location: 'London, UK', role: 'Attendee', url: 'https://www.ai.engineer/europe' },
    ],
  },
  {
    year: '2025',
    events: [
      { month: 'Dec', name: 'NeurIPS 2025', location: 'San Diego, CA', role: 'Attendee', url: 'https://neurips.cc/' },
      { month: 'Nov', name: 'AIE Code Summit', location: 'New York, NY', role: 'Attendee', url: 'https://www.ai.engineer/' },
    ],
  },
]

const roleStyles: Record<Role, { color: string }> = {
  Speaker:   { color: '#7C6AC4' },
  Organizer: { color: '#F89151' },
  Attendee:  { color: '#a3a3a3' },
}

export default function EventsPage() {
  return (
    <main
      className="min-h-screen px-8 md:px-16 lg:px-24 py-24"
      style={{ background: 'white' }}
    >
      <div className="max-w-2xl w-full">
        {/* Heading */}
        <motion.h1
          className="m-0 mb-16 tracking-tight text-black"
          style={{
            fontFamily: 'var(--font-dm-serif), serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Events
        </motion.h1>

        {/* Timeline */}
        {data.map((group, gi) => (
          <motion.div
            key={group.year}
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + gi * 0.1, duration: 0.5, ease: 'easeOut' }}
          >
            {/* Year + rule */}
            <div className="flex items-center gap-4 mb-4">
              <span
                className="shrink-0"
                style={{
                  fontFamily: 'var(--font-geist), sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: group.upcoming ? '#F89151' : '#d4d4d4',
                }}
              >
                {group.year}
              </span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            {/* Rows */}
            {group.events.map((event, ei) => (
              <motion.div
                key={ei}
                className="flex items-baseline gap-4 py-3 border-b border-neutral-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + gi * 0.1 + ei * 0.06, duration: 0.4 }}
              >
                {/* Month */}
                <span
                  className="shrink-0 text-neutral-400 w-8"
                  style={{
                    fontFamily: 'var(--font-geist), sans-serif',
                    fontSize: '0.8rem',
                  }}
                >
                  {event.month}
                </span>

                {/* Name + location */}
                <div className="flex-1 min-w-0">
                  {event.url ? (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-[#7C6AC4] transition-colors duration-200"
                      style={{
                        fontFamily: 'var(--font-geist), sans-serif',
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                      }}
                    >
                      {event.name}
                    </a>
                  ) : (
                    <span
                      className="text-black"
                      style={{
                        fontFamily: 'var(--font-geist), sans-serif',
                        fontSize: '0.95rem',
                      }}
                    >
                      {event.name}
                    </span>
                  )}
                  <span
                    className="ml-3 text-neutral-400"
                    style={{
                      fontFamily: 'var(--font-geist), sans-serif',
                      fontSize: '0.78rem',
                    }}
                  >
                    {event.location}
                  </span>
                </div>


                {/* Role */}
                <span
                  className="shrink-0"
                  style={{
                    fontFamily: 'var(--font-geist), sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    color: roleStyles[event.role].color,
                  }}
                >
                  {event.role}
                </span>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </main>
  )
}
