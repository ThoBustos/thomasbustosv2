import { digestService } from '@/lib/digestService'
import { env } from '@/lib/env'

export const revalidate = 3600

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function GET() {
  const issues = await digestService.getArchive(20)
  const siteUrl = env.SITE_URL

  const items = issues
    .map((issue) => {
      const title = xmlEscape(issue.title ?? 'AI News')
      const link = `${siteUrl}/ainews/${issue.publish_date}`
      const pubDate = new Date(issue.publish_date + 'T00:00:00Z').toUTCString()
      const description = xmlEscape(
        issue.keywords?.length ? issue.keywords.join(', ') : 'Daily AI digest.'
      )
      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI News by Thomas Bustos</title>
    <link>${siteUrl}/ainews</link>
    <description>Daily AI digest curated from top YouTube channels.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, stale-while-revalidate=3600',
    },
  })
}
