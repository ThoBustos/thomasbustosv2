function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface DigestEmailProps {
  title: string
  publishDate: string
  keywords: string[]
  issueUrl: string
  unsubscribeUrl: string
}

export function digestBlastTemplate({
  title,
  publishDate,
  keywords,
  issueUrl,
  unsubscribeUrl,
}: DigestEmailProps): string {
  const formatted = new Date(publishDate + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const safeTitle = escapeHtml(title)
  const keywordPills = keywords
    .map(
      (k) =>
        `<span style="display:inline-block;margin:0 4px 4px 0;padding:2px 8px;border:1px solid #7C6AC4;border-radius:2px;font-family:'Helvetica Neue',sans-serif;font-size:0.65rem;letter-spacing:0.05em;color:#7C6AC4;">${escapeHtml(k)}</span>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
    <tr><td align="center" style="padding:48px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #f5f5f5;">
          <p style="margin:0;font-family:Georgia,serif;font-size:1.4rem;font-weight:400;color:#000;">
            AI News
          </p>
          <p style="margin:4px 0 0;font-family:'Helvetica Neue',sans-serif;font-size:0.7rem;letter-spacing:0.08em;color:#d4d4d4;text-transform:uppercase;">
            by Thomas Bustos
          </p>
        </td></tr>

        <!-- Date + Title -->
        <tr><td style="padding:32px 0 0;">
          <p style="margin:0 0 8px;font-family:'Helvetica Neue',sans-serif;font-size:0.75rem;color:#d4d4d4;">
            ${formatted}
          </p>
          <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:1.6rem;font-weight:400;color:#000;line-height:1.3;">
            ${safeTitle}
          </h1>
          ${keywords.length ? `<div style="margin-bottom:28px;">${keywordPills}</div>` : ''}
          <hr style="border:none;border-top:1px solid #f5f5f5;margin:0 0 28px;">
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding-bottom:48px;">
          <p style="margin:0 0 24px;font-family:'Helvetica Neue',sans-serif;font-size:0.9rem;color:#666;line-height:1.6;">
            Today's digest is ready. Click below to read the full issue.
          </p>
          <a href="${issueUrl}"
             style="display:inline-block;padding:12px 28px;background:#7C6AC4;color:#ffffff;text-decoration:none;font-family:'Helvetica Neue',sans-serif;font-size:0.85rem;letter-spacing:0.03em;border-radius:2px;">
            Read today's digest →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;border-top:1px solid #f5f5f5;">
          <p style="margin:0;font-family:'Helvetica Neue',sans-serif;font-size:0.7rem;color:#d4d4d4;line-height:1.6;">
            You're receiving this because you subscribed to AI News.<br>
            <a href="${unsubscribeUrl}" style="color:#d4d4d4;">Unsubscribe</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
