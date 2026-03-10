import { notFound } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import { digestService } from '@/lib/digestService'
import DigestContent, { type ContentJson } from '@/components/writing/DigestContent'

const dateSchema = z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) })

export const revalidate = 300

interface Props {
  params: Promise<{ date: string }>
}

export default async function DigestPage({ params }: Props) {
  const result = dateSchema.safeParse(await params)
  if (!result.success) notFound()
  const { date } = result.data

  let digest
  try {
    digest = await digestService.getByDate(date)
  } catch {
    notFound()
  }

  const publishDate = new Date(digest.publish_date + 'T00:00:00')
  const formatted = publishDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main
      id="main-content"
      className="min-h-screen px-8 md:px-16 lg:px-24 py-24"
      style={{ background: 'white' }}
    >
      <div className="max-w-2xl w-full">
        {/* Back */}
        <Link
          href="/ainews"
          className="inline-block mb-12 text-neutral-400 hover:text-[#F89151] transition-colors duration-150 no-underline"
          style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.78rem' }}
        >
          ← AI News
        </Link>

        {/* Date */}
        <p
          className="m-0 mb-3 text-neutral-400"
          style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.78rem' }}
        >
          {formatted}
        </p>

        {/* Title */}
        <h1
          className="m-0 mb-6 leading-tight tracking-tight text-black"
          style={{
            fontFamily: 'var(--font-dm-serif), serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
          }}
        >
          {digest.title}
        </h1>

        {/* Tags */}
        {digest.keywords && digest.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {digest.keywords.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-geist), sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.05em',
                  color: '#7C6AC4',
                  border: '1px solid #7C6AC4',
                  borderRadius: '2px',
                  padding: '2px 6px',
                  lineHeight: 1.5,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #f5f5f5', marginBottom: 0 }} />

        {/* Content */}
        {digest.content_json ? (
          <DigestContent content={digest.content_json as ContentJson | string} />
        ) : (
          <p
            className="mt-10 text-neutral-300"
            style={{ fontFamily: 'var(--font-geist), sans-serif', fontSize: '0.85rem' }}
          >
            No content available for this issue.
          </p>
        )}
      </div>
    </main>
  )
}
