import React from 'react'

// ─── Markdown renderer ────────────────────────────────────────────────────────

function renderMarkdown(text: string, keyPrefix = 'md'): React.ReactNode {
  if (!text) return null
  const pattern = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[([^\]]+)\]\(([^)]+)\))/g
  const elements: React.ReactNode[] = []
  let lastIndex = 0
  let partIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) elements.push(text.slice(lastIndex, match.index))
    if (match[1]) {
      elements.push(<strong key={`${keyPrefix}-b${partIndex++}`}>{renderMarkdown(match[2], `${keyPrefix}-b${partIndex}`)}</strong>)
    } else if (match[3]) {
      elements.push(<em key={`${keyPrefix}-i${partIndex++}`}>{renderMarkdown(match[4], `${keyPrefix}-i${partIndex}`)}</em>)
    } else if (match[5]) {
      let href = match[7]
      if (href.startsWith('#video-')) href = `https://youtube.com/watch?v=${href.replace('#video-', '')}`
      elements.push(<a key={`${keyPrefix}-l${partIndex++}`} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#7C6AC4' }}>{match[6]}</a>)
    }
    lastIndex = pattern.lastIndex
  }
  if (lastIndex < text.length) elements.push(text.slice(lastIndex))
  return elements.length > 0 ? elements : text
}

function renderParagraphs(text: string, keyPrefix = 'p') {
  if (!text) return null
  return text.split(/\n\n+/).map((para, i) => (
    <p key={`${keyPrefix}-${i}`} style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem', color: '#000' }}>
      {renderMarkdown(para.trim(), `${keyPrefix}-${i}`)}
    </p>
  ))
}

// ─── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: '1rem', marginTop: 0 }}>
      {children}
    </p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-dm-serif), serif', fontSize: '1.5rem', fontWeight: 400, color: '#000', marginTop: '2.5rem', marginBottom: '0.75rem' }}>
      {children}
    </h2>
  )
}

// ─── Bullet list ───────────────────────────────────────────────────────────────

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#7C6AC4', flexShrink: 0, marginTop: '0.55rem' }} />
          <span style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.93rem', lineHeight: 1.65, color: '#000' }}>
            {renderMarkdown(item, `bullet-${i}`)}
          </span>
        </li>
      ))}
    </ul>
  )
}

// ─── Video card ────────────────────────────────────────────────────────────────

interface VideoSection {
  video_id?: string
  video_url?: string
  title?: string
  channel_name?: string
  duration_minutes?: number
  speakers?: (string | { name: string })[]
  condensed_summary?: string
  structure_overview?: string
  logical_flow?: string[]
  key_quotes?: string[]
  frameworks_mentioned?: string[]
  key_statistics?: string[]
  key_analogies?: string[]
  deep_analysis?: string
  connections?: string[]
  tags?: string[]
}

function VideoCard({ video, index }: { video: VideoSection; index: number }) {
  const speakers = video.speakers
    ?.map((s) => (typeof s === 'string' ? s : s.name))
    .filter(Boolean)
    .join(', ')

  return (
    <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
      {/* Title */}
      <h3 style={{ fontFamily: 'var(--font-dm-serif), serif', fontSize: '1.2rem', fontWeight: 400, color: '#000', margin: '0 0 0.35rem' }}>
        {video.title ?? `Video ${index + 1}`}
      </h3>

      {/* Meta */}
      <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.78rem', color: '#a3a3a3', margin: '0 0 0.75rem' }}>
        {[video.channel_name, speakers, video.duration_minutes ? `${video.duration_minutes} min` : null].filter(Boolean).join(' · ')}
      </p>

      {/* Watch link */}
      {video.video_url && (
        <a href={video.video_url} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.78rem', color: '#F89151', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
          Watch on YouTube →
        </a>
      )}

      {/* Summary */}
      {video.condensed_summary && (
        <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.93rem', lineHeight: 1.65, color: '#000', margin: '0 0 0.75rem' }}>
          {video.condensed_summary}
        </p>
      )}

      {/* Logical flow */}
      {video.logical_flow && video.logical_flow.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <SectionLabel>Logical Flow</SectionLabel>
          <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {video.logical_flow.map((step, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.88rem', lineHeight: 1.55, color: '#000' }}>
                {renderMarkdown(step, `lf-${index}-${i}`)}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Key quotes */}
      {video.key_quotes && video.key_quotes.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <SectionLabel>Key Quotes</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {video.key_quotes.map((q, i) => (
              <blockquote key={i} style={{ margin: 0, borderLeft: '2px solid #7C6AC4', paddingLeft: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.88rem', lineHeight: 1.6, color: '#000', margin: 0 }}>
                  "{q}"
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {/* Key statistics */}
      {video.key_statistics && video.key_statistics.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <SectionLabel>Key Statistics</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {video.key_statistics.map((s, i) => {
              const colonIdx = s.indexOf(':')
              const value = colonIdx > -1 ? s.slice(0, colonIdx).trim() : s
              const description = colonIdx > -1 ? s.slice(colonIdx + 1).trim() : ''
              return (
                <p key={i} style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.88rem', color: '#000', margin: 0 }}>
                  <span style={{ color: '#7C6AC4', fontWeight: 600 }}>{value}</span>
                  {description && ` — ${description}`}
                </p>
              )
            })}
          </div>
        </div>
      )}

      {/* Deep analysis */}
      {video.deep_analysis && (
        <div style={{ marginBottom: '1rem' }}>
          <SectionLabel>Deep Analysis</SectionLabel>
          {renderParagraphs(video.deep_analysis, `da-${index}`)}
        </div>
      )}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

interface ContrarianCorner {
  insight?: string
  claim?: string
  why_counterintuitive?: string
  conventional_wisdom?: string
  verdict?: string
  evidence?: string
  so_what?: string
  source_video_title?: string
}

interface ActionItem {
  action: string
  difficulty?: string
  context?: string
  first_step?: string
  source_video_title?: string
}

interface ConvergencePoint {
  concept: string
  video_titles?: string[]
  synthesis?: string
}

interface KeyTension {
  topic: string
  perspectives?: { speaker?: string; position: string }[]
  resolution?: string
}

interface ContentJson {
  big_picture_bullets?: string[]
  daily_tldr?: string
  deeper_picture?: string
  convergence_points?: ConvergencePoint[]
  key_tensions?: KeyTension[]
  video_sections?: VideoSection[]
  contrarian_corner?: ContrarianCorner
  action_items?: ActionItem[]
  conclusion?: string
}

interface DigestContentProps {
  content: ContentJson | string
}

export default function DigestContent({ content }: DigestContentProps) {
  const data: ContentJson = typeof content === 'string' ? JSON.parse(content) : content
  if (!data) return null

  const bigPicture = data.big_picture_bullets?.length ? data.big_picture_bullets : null
  const tldr = data.daily_tldr ?? null

  return (
    <div style={{ marginTop: '2rem' }}>

      {/* The Big Picture */}
      {(bigPicture || tldr) && (
        <section style={{ marginBottom: '2rem' }}>
          <SectionHeading>The Big Picture</SectionHeading>
          {bigPicture ? <BulletList items={bigPicture} /> : <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.95rem', lineHeight: 1.7, color: '#000' }}>{tldr}</p>}
        </section>
      )}

      {/* The Deeper Picture */}
      {data.deeper_picture && (
        <section style={{ marginBottom: '2rem' }}>
          <SectionHeading>The Deeper Picture</SectionHeading>
          {renderParagraphs(data.deeper_picture, 'deeper')}
        </section>
      )}

      {/* Where Videos Converge */}
      {data.convergence_points && data.convergence_points.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <SectionHeading>Where Videos Converge</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {data.convergence_points.map((point, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.92rem', fontWeight: 600, color: '#000', margin: '0 0 0.4rem' }}>{point.concept}</p>
                {point.video_titles && point.video_titles.length > 0 && (
                  <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.78rem', color: '#a3a3a3', margin: '0 0 0.4rem' }}>
                    {point.video_titles.join(' · ')}
                  </p>
                )}
                {point.synthesis && renderParagraphs(point.synthesis, `synth-${i}`)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Tensions */}
      {data.key_tensions && data.key_tensions.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <SectionHeading>Key Tensions</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {data.key_tensions.map((tension, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.92rem', fontWeight: 600, color: '#000', margin: '0 0 0.75rem' }}>{tension.topic}</p>
                {tension.perspectives && tension.perspectives.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    {tension.perspectives.map((p, j) => (
                      <div key={j} style={{ borderLeft: '2px solid #e5e5e5', paddingLeft: '1rem' }}>
                        {p.speaker && <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.72rem', color: '#a3a3a3', margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.speaker}</p>}
                        <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.9rem', lineHeight: 1.6, color: '#000', margin: 0 }}>
                          {renderMarkdown(p.position, `pos-${i}-${j}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {tension.resolution && (
                  <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.85rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                    <span style={{ color: '#a3a3a3', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Resolution: </span>
                    {renderMarkdown(tension.resolution, `res-${i}`)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video Breakdowns */}
      {data.video_sections && data.video_sections.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <SectionHeading>Video Breakdowns</SectionHeading>
          <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.78rem', color: '#a3a3a3', margin: '-0.5rem 0 0' }}>
            {data.video_sections.length} {data.video_sections.length === 1 ? 'video' : 'videos'} analyzed
          </p>
          {data.video_sections.map((video, i) => (
            <VideoCard key={video.video_id ?? i} video={video} index={i} />
          ))}
        </section>
      )}

      {/* Contrarian Corner */}
      {data.contrarian_corner && (data.contrarian_corner.insight || data.contrarian_corner.claim) && (
        <section style={{ marginBottom: '2rem', borderLeft: '2px solid #F89151', paddingLeft: '1.25rem' }}>
          <SectionHeading>Contrarian Corner</SectionHeading>
          {data.contrarian_corner.source_video_title && (
            <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.72rem', color: '#a3a3a3', margin: '-0.5rem 0 0.75rem' }}>
              From: {data.contrarian_corner.source_video_title}
            </p>
          )}
          {(data.contrarian_corner.insight ?? data.contrarian_corner.claim) && (
            <div style={{ marginBottom: '0.75rem' }}>
              <SectionLabel>The Insight</SectionLabel>
              <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.95rem', lineHeight: 1.7, color: '#000', margin: 0 }}>
                {data.contrarian_corner.insight ?? data.contrarian_corner.claim}
              </p>
            </div>
          )}
          {(data.contrarian_corner.why_counterintuitive ?? data.contrarian_corner.conventional_wisdom) && (
            <div style={{ marginBottom: '0.75rem' }}>
              <SectionLabel>{data.contrarian_corner.why_counterintuitive ? 'Why Counterintuitive' : 'Conventional Wisdom'}</SectionLabel>
              <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.92rem', lineHeight: 1.65, color: '#000', margin: 0 }}>
                {data.contrarian_corner.why_counterintuitive ?? data.contrarian_corner.conventional_wisdom}
              </p>
            </div>
          )}
          {data.contrarian_corner.evidence && (
            <div style={{ marginBottom: '0.75rem' }}>
              <SectionLabel>Evidence</SectionLabel>
              <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.92rem', lineHeight: 1.65, color: '#000', margin: 0 }}>
                {data.contrarian_corner.evidence}
              </p>
            </div>
          )}
          {data.contrarian_corner.so_what && (
            <div>
              <SectionLabel>So What</SectionLabel>
              <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.92rem', lineHeight: 1.65, color: '#000', margin: 0 }}>
                {data.contrarian_corner.so_what}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Action Items */}
      {data.action_items && data.action_items.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <SectionHeading>Action Items</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.action_items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#F89151', flexShrink: 0, marginTop: '0.6rem' }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.93rem', fontWeight: 600, color: '#000', margin: 0 }}>{item.action}</p>
                  {item.context && <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.85rem', color: '#555', lineHeight: 1.55, margin: '0.25rem 0 0' }}>{item.context}</p>}
                  {item.first_step && <p style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.82rem', color: '#7C6AC4', margin: '0.25rem 0 0' }}>First step: {item.first_step}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final Thought */}
      {data.conclusion && (
        <section style={{ marginBottom: '2rem', borderTop: '1px solid #f0f0f0', paddingTop: '2rem' }}>
          <SectionHeading>Final Thought</SectionHeading>
          {renderParagraphs(data.conclusion, 'conclusion')}
        </section>
      )}
    </div>
  )
}
