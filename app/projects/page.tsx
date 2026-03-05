'use client'

import { motion } from 'framer-motion'

interface Project {
  name: string
  tagline: string
  description: string
  year: string
  tags: string[]
  url?: string
}

const projects: Project[] = [
  {
    name: 'OpenYoko',
    tagline: 'An open-source AI operating system.',
    description:
      'Yoko-OS is a modular, agent-native operating system built for the era of AI. Designed around the idea that your computer should think with you, not just for you.',
    year: '2025',
    tags: ['AI', 'OS', 'Agents'],
    url: 'https://github.com/ThoBustos/yoko-os',
  },
  {
    name: 'LTAI News',
    tagline: 'Daily AI intelligence for builders.',
    description:
      'Let\'s Talk AI News is a self-hosted newsletter system that aggregates, structures, and delivers daily AI digests. Built on Supabase with structured JSON content — no CMS bloat.',
    year: '2025',
    tags: ['Newsletter', 'AI', 'Supabase'],
    url: 'https://github.com/ThoBustos/ltai-news',
  },
  {
    name: 'MCP Quizz',
    tagline: 'A quiz engine built as an MCP server.',
    description:
      'A Model Context Protocol server that turns any content — docs, transcripts, code — into interactive quizzes. Built to make learning inside Claude Code native.',
    year: '2025',
    tags: ['MCP', 'Claude', 'Learning'],
    url: 'https://github.com/ThoBustos/mcp-quizz',
  },
  {
    name: 'AI Native Club',
    tagline: 'Community for builders going AI-native.',
    description:
      'A gathering place for engineers, founders, and operators who are rebuilding their workflows from the ground up with AI. Events, resources, and conversation.',
    year: '2025',
    tags: ['Community', 'AI'],
    url: 'https://github.com/ThoBustos/ainativeclub',
  },
  {
    name: 'thomasbustos.com v2',
    tagline: 'This site — minimal, editorial, open.',
    description:
      'The second version of my personal portfolio. Built with Next.js 15, Tailwind v4, and GSAP. Design philosophy: white canvas, two accent colors, content carries the weight.',
    year: '2025',
    tags: ['Next.js', 'Portfolio'],
    url: 'https://github.com/ThoBustos/thomasbustosv2',
  },
  {
    name: 'thomasbustos.com v1',
    tagline: 'The original portfolio — a lot more going on.',
    description:
      'First version of my personal site. React SPA with a macOS dock nav, dark/light mode, click sparks, and a full library. Built when I wanted to explore what "personality" looked like on the web.',
    year: '2024',
    tags: ['React', 'Portfolio'],
    url: 'https://github.com/ThoBustos/thomasbustos',
  },
]

const years = [...new Set(projects.map(p => p.year))].sort((a, b) => Number(b) - Number(a))

export default function ProjectsPage() {
  return (
    <main
      className="min-h-screen px-8 md:px-16 lg:px-24 py-24"
      style={{ background: 'white' }}
    >
      <div className="max-w-2xl w-full">
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
          Projects
        </motion.h1>

        {years.map((year, yi) => {
          const group = projects.filter(p => p.year === year)
          return (
            <motion.div
              key={year}
              className="mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + yi * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              {/* Year rule */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="shrink-0"
                  style={{
                    fontFamily: 'var(--font-geist), sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    color: '#d4d4d4',
                  }}
                >
                  {year}
                </span>
                <div className="flex-1 h-px bg-neutral-100" />
              </div>

              {/* Project entries */}
              <div className="flex flex-col gap-10">
                {group.map((project, pi) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 + yi * 0.1 + pi * 0.07, duration: 0.4 }}
                  >
                    {/* Name + link */}
                    <div className="flex items-baseline gap-3 mb-1">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#F89151] transition-colors duration-200"
                          style={{
                            fontFamily: 'var(--font-dm-serif), serif',
                            fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                            fontWeight: 400,
                            color: '#000',
                            textDecoration: 'none',
                            lineHeight: 1.1,
                          }}
                        >
                          {project.name}
                        </a>
                      ) : (
                        <span
                          style={{
                            fontFamily: 'var(--font-dm-serif), serif',
                            fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                            fontWeight: 400,
                            color: '#000',
                            lineHeight: 1.1,
                          }}
                        >
                          {project.name}
                        </span>
                      )}

                      {/* Tags */}
                      <div className="flex gap-1.5 flex-wrap">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: 'var(--font-geist), sans-serif',
                              fontSize: '0.65rem',
                              letterSpacing: '0.1em',
                              color: '#7C6AC4',
                              textTransform: 'uppercase',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tagline */}
                    <p
                      className="m-0 mb-2 text-black"
                      style={{
                        fontFamily: 'var(--font-geist), sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                    >
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p
                      className="m-0 text-neutral-500 leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-geist), sans-serif',
                        fontSize: '0.875rem',
                      }}
                    >
                      {project.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
