'use client'

import { motion } from 'framer-motion'

interface Project {
  name: string
  description: string
  year: string
  url?: string
  liveUrl?: string
  oss?: boolean
}

const projects: Project[] = [
  // 2026 - newest first
  {
    name: 'thomasbustos.com v2',
    description: 'V2 of my personal website. Built with Next.js 15, Tailwind v4, and GSAP.',
    year: '2026',
    url: 'https://github.com/ThoBustos/thomasbustosv2',
    liveUrl: 'https://thomasbustos.com',
    oss: true,
  },
  {
    name: 'Quizz MCP',
    description:
      'MCP + Next.js app that turns any content into quizzes. I use it a lot when building to test myself on concepts, or when writing docs, strategy, processing calls, testing my understanding and exploring my own limiting beliefs.',
    year: '2026',
    url: 'https://github.com/ThoBustos/quizz-mcp',
    oss: true,
  },
  {
    name: 'AI Native Club',
    description: 'Landing + app for AI Native Club, an AI community with top builders and founders.',
    year: '2026',
    url: 'https://github.com/ThoBustos/ainativeclub',
    liveUrl: 'https://www.ainativeclub.com/',
  },
  {
    name: 'Reader',
    description:
      'My tool to read papers with AI and quiz myself. This initiated the Quizz MCP project. I read the full GPT series of papers with this and had so much fun.',
    year: '2026',
    url: 'https://github.com/ThoBustos/reader',
    oss: true,
  },
  {
    name: 'Dotfiles',
    description:
      'Personal dotfiles managed with Chezmoi. Neovim config, shell setup, and everything else that makes a machine feel like home.',
    year: '2026',
    url: 'https://github.com/ThoBustos/dotfiles',
    oss: true,
  },
  {
    name: 'Yoko OS',
    description:
      'Probably my build I\'ve been using the most in the last months. My full system to manage day-to-day that I use with tmux.',
    year: '2026',
    url: 'https://github.com/ThoBustos/yoko-os',
    oss: true,
  },
  // 2025 - newest first
  {
    name: 'LTAI News',
    description:
      'The generator of the AI newsletter. Tracks my favorite YouTube channels and creates a daily report.',
    year: '2025',
    url: 'https://github.com/ThoBustos/ltai-news',
    liveUrl: 'https://thomasbustos.com/ainews',
    oss: true,
  },
  {
    name: 'thomasbustos.com v1',
    description: 'First version of my personal landing.',
    year: '2025',
    url: 'https://github.com/ThoBustos/thomasbustos',
    oss: true,
  },
  // 2024
  {
    name: 'Lyah',
    description: 'Voice-powered tutoring platform that lets educators build personalized learning experiences without giving up control of their curriculum.',
    year: '2024',
    liveUrl: 'https://lyah.ai',
  },
]

const years = [...new Set(projects.map(p => p.year))].sort((a, b) => Number(b) - Number(a))

export default function ProjectsDisplay() {
  return (
    <main
      id="main-content"
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
                    {/* Name */}
                    <div className="mb-2">
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
                    </div>

                    {/* Tags */}
                    {(project.oss || project.liveUrl) && (
                      <div className="flex gap-4 items-center mb-2">
                        {project.oss && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: 'var(--font-geist), sans-serif',
                              fontSize: '0.65rem',
                              letterSpacing: '0.1em',
                              color: '#4ade80',
                              textTransform: 'uppercase',
                              textDecoration: 'none',
                            }}
                          >
                            Open Source ↗
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: 'var(--font-geist), sans-serif',
                              fontSize: '0.65rem',
                              letterSpacing: '0.1em',
                              color: '#F89151',
                              textTransform: 'uppercase',
                              textDecoration: 'none',
                            }}
                          >
                            Live ↗
                          </a>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <p
                      className="m-0 mt-1 text-neutral-500 leading-relaxed"
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
