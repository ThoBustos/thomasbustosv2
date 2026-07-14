'use client'

import { motion } from 'framer-motion'
import { projects } from '@/lib/data/projects'

const years = [...new Set(projects.map(p => p.year))].sort((a, b) => Number(b) - Number(a))

interface ProjectsDisplayProps {
  stars?: Record<string, number>
}

export default function ProjectsDisplay({ stars = {} }: ProjectsDisplayProps) {
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
                    color: '#a3a3a3',
                  }}
                >
                  {year}
                </span>
                <div className="flex-1 h-px bg-neutral-300" />
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
                        {project.oss && project.url && stars[project.url] != null && (
                          <span
                            style={{
                              fontFamily: 'var(--font-geist), sans-serif',
                              fontSize: '0.65rem',
                              letterSpacing: '0.1em',
                              color: '#a3a3a3',
                              textTransform: 'uppercase',
                            }}
                          >
                            ★ {stars[project.url]}
                          </span>
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
