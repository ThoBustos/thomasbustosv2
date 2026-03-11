const PREHEADER_PADDING = '&#8199;&#65279;&#847;'.repeat(40)

function safeUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : ''
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ─── Content extraction ────────────────────────────────────────────────────────

interface EmailItem {
  index: number
  title: string
  meta: string
  framing: string
  bullets: string[]
  videoUrl: string
}

interface ExtractedContent {
  intro: string
  pullQuote: string
  items: EmailItem[]
}

function extractContent(contentJson: unknown): ExtractedContent {
  const empty: ExtractedContent = { intro: '', pullQuote: '', items: [] }
  if (!contentJson || typeof contentJson !== 'object') return empty

  const data = contentJson as Record<string, unknown>

  if (data.schema_version === 'v3') {
    const intro = typeof data.intro === 'string' ? data.intro : ''
    const pullQuote = typeof data.pull_quote === 'string' ? data.pull_quote : ''
    const videos = Array.isArray(data.video_sections) ? data.video_sections : []

    const items: EmailItem[] = videos.slice(0, 5).map((v: Record<string, unknown>, i: number) => {
      const videoId = typeof v.video_id === 'string' ? v.video_id : ''
      const videoUrl = safeUrl(
        typeof v.video_url === 'string'
          ? v.video_url
          : videoId ? `https://www.youtube.com/watch?v=${videoId}` : ''
      )
      return {
        index: i + 1,
        title: typeof v.title === 'string' ? v.title : '',
        meta: [
          typeof v.speaker === 'string' ? v.speaker : null,
          typeof v.channel_name === 'string' ? v.channel_name : null,
          typeof v.duration_minutes === 'number' ? `${v.duration_minutes} min` : null,
        ]
          .filter(Boolean)
          .join(' · '),
        framing: typeof v.framing === 'string' ? v.framing : '',
        bullets: Array.isArray(v.bullets) ? (v.bullets as string[]).slice(0, 3) : [],
        videoUrl,
      }
    })

    return { intro, pullQuote, items }
  }

  // Unknown schema — don't mis-parse as v2
  const version = typeof data.schema_version === 'string' ? data.schema_version : ''
  if (version && version !== 'v2' && version !== 'v3') return empty

  // v2 schema
  const tldr = typeof data.daily_tldr === 'string' ? data.daily_tldr : ''
  const bigPicture = Array.isArray(data.big_picture_bullets) ? (data.big_picture_bullets as string[]) : []
  const intro = tldr || (bigPicture.length > 0 ? bigPicture[0] : '')
  const videos = Array.isArray(data.video_sections) ? data.video_sections : []

  const items: EmailItem[] = videos.slice(0, 5).map((v: Record<string, unknown>, i: number) => {
    const videoId = typeof v.video_id === 'string' ? v.video_id : ''
    const videoUrl = safeUrl(
      typeof v.video_url === 'string'
        ? v.video_url
        : videoId ? `https://www.youtube.com/watch?v=${videoId}` : ''
    )
    return {
      index: i + 1,
      title: typeof v.title === 'string' ? v.title : '',
      meta: [
        typeof v.channel_name === 'string' ? v.channel_name : null,
        typeof v.duration_minutes === 'number' ? `${v.duration_minutes} min` : null,
      ]
        .filter(Boolean)
        .join(' · '),
      framing: typeof v.condensed_summary === 'string' ? v.condensed_summary : '',
      bullets: [],
      videoUrl,
    }
  })

  return { intro, pullQuote: '', items }
}

// ─── Template ──────────────────────────────────────────────────────────────────

interface DigestEmailProps {
  title: string
  publishDate: string
  keywords: string[]
  issueUrl: string
  unsubscribeUrl: string
  contentJson?: unknown
}

export function digestBlastTemplate({
  title,
  publishDate,
  keywords,
  issueUrl,
  unsubscribeUrl,
  contentJson,
}: DigestEmailProps): string {
  const formatted = new Date(publishDate + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const safeTitle = esc(title)
  const previewText = esc(title.length > 80 ? title.slice(0, 77) + '…' : title)
  const { intro, pullQuote, items } = extractContent(contentJson)

  // Keywords as plain text list
  const keywordsLine =
    keywords.length > 0
      ? `<p style="margin:0 0 28px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:#666666;">${keywords.map(esc).join(' &middot; ')}</p>`
      : ''

  // Intro block
  const introBlock =
    intro
      ? `<p style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.93rem;color:#333333;line-height:1.7;">${esc(intro)}</p>`
      : ''

  // Pull quote
  const pullQuoteBlock =
    pullQuote
      ? `<table cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-left:2px solid #7C6AC4;">
           <tr><td style="padding:0 0 0 16px;">
             <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:0.93rem;color:#333333;line-height:1.7;">&ldquo;${esc(pullQuote)}&rdquo;</p>
           </td></tr>
         </table>`
      : ''

  // Content items
  const itemsHtml =
    items.length > 0
      ? items
          .map((item) => {
            const num = String(item.index).padStart(2, '0')
            const bulletsHtml =
              item.bullets.length > 0
                ? `<table cellpadding="0" cellspacing="0" style="margin:10px 0 0;">
                     ${item.bullets
                       .map(
                         (b) =>
                           `<tr>
                              <td style="padding:0 8px 6px 0;vertical-align:top;">
                                <span style="display:inline-block;width:3px;height:3px;background:#7C6AC4;border-radius:50%;margin-top:7px;"></span>
                              </td>
                              <td style="padding:0 0 6px;">
                                <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.85rem;color:#333333;line-height:1.6;">${esc(b)}</p>
                              </td>
                            </tr>`
                       )
                       .join('')}
                   </table>`
                : ''

            return `<tr><td style="padding:0 0 28px;">
              <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.6rem;letter-spacing:0.2em;color:#666666;">${num}</p>
              ${item.title ? `<p style="margin:0 0 5px;font-family:Georgia,'Times New Roman',serif;font-size:1.1rem;font-weight:400;color:#111111;line-height:1.3;">${esc(item.title)}</p>` : ''}
              ${item.meta ? `<p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.7rem;color:#666666;">${esc(item.meta)}</p>` : ''}
              ${item.videoUrl ? `<a href="${item.videoUrl}" style="display:inline-block;margin:0 0 10px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.7rem;color:#F89151;text-decoration:none;">Watch on YouTube →</a>` : ''}
              ${item.framing ? `<p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.88rem;color:#333333;line-height:1.65;">${esc(item.framing)}</p>` : ''}
              ${bulletsHtml}
            </td></tr>`
          })
          .join('')
      : ''

  const divider = `<tr><td style="padding:0 0 28px;"><hr style="border:none;border-top:1px solid #ebebeb;margin:0;"></td></tr>`

  const hasContent = intro || pullQuote || items.length > 0
  const contentSection = hasContent
    ? `${divider}
       ${introBlock || pullQuoteBlock ? `<tr><td>${introBlock}${pullQuoteBlock}</td></tr>` : ''}
       ${items.length > 0 ? itemsHtml : ''}
       ${divider}`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;">${previewText}${PREHEADER_PADDING}</div>

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;">
    <tr><td align="center" style="padding:40px 16px;">

      <!-- Card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:2px;">

        <!-- Masthead -->
        <tr><td style="background:#111111;padding:28px 36px;border-radius:2px 2px 0 0;">
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:1.3rem;font-weight:400;color:#ffffff;line-height:1.2;">
            AI News
          </p>
          <p style="margin:5px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.65rem;letter-spacing:0.14em;color:#888888;text-transform:uppercase;">
            by Thomas Bustos
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px 36px 4px;">
          <table width="100%" cellpadding="0" cellspacing="0">

            <!-- Date -->
            <tr><td style="padding:0 0 8px;">
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.72rem;color:#666666;letter-spacing:0.04em;">
                ${formatted}
              </p>
            </td></tr>

            <!-- Title -->
            <tr><td style="padding:0 0 16px;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:1.55rem;font-weight:400;color:#111111;line-height:1.3;">
                ${safeTitle}
              </h1>
            </td></tr>

            <!-- Keywords -->
            ${keywordsLine ? `<tr><td>${keywordsLine}</td></tr>` : ''}

            <!-- Content sections -->
            ${contentSection}

            <!-- CTA -->
            <tr><td style="padding:4px 0 36px;">
              <a href="${issueUrl}"
                 style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.88rem;color:#7C6AC4;text-decoration:none;letter-spacing:0.02em;">
                Read the full issue →
              </a>
            </td></tr>

          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px 28px;border-top:1px solid #ebebeb;">
          <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.72rem;color:#666666;line-height:1.65;">
            You're receiving this because you subscribed to AI News.<br>
            <a href="${unsubscribeUrl}" style="color:#666666;text-decoration:underline;">Unsubscribe</a>
          </p>
        </td></tr>

      </table>

    </td></tr>
  </table>

</body>
</html>`
}
