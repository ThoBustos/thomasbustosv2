import { digestService } from '@/lib/digestService'
import { getAdminClient } from '@/lib/supabaseAdmin'
import { getResendClient } from '@/lib/resend'
import { digestBlastTemplate } from '@/lib/email/digestBlastTemplate'
import { env } from '@/lib/env'

const BATCH_SIZE = 100

export async function sendDigestBlast(publishDate: string) {
  const siteUrl = env.SITE_URL

  // Fetch the full digest
  const digest = await digestService.getByDate(publishDate)
  const title = digest.title ?? `AI News — ${publishDate}`
  const keywords = digest.keywords ?? []
  const issueUrl = `${siteUrl}/ainews/${publishDate}`

  // Fetch all confirmed subscribers
  const supabase = getAdminClient()
  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('email, unsubscribe_token')
    .eq('confirmed', true)

  if (error) {
    console.error('[emailBlast] Failed to fetch subscribers:', error)
    return
  }

  if (!subscribers || subscribers.length === 0) return

  const resend = getResendClient()
  const fromEmail = env.RESEND_FROM_EMAIL ?? 'AI News <noreply@thomasbustos.com>'

  // Chunk into batches of 100 (Resend batch limit)
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const chunk = subscribers.slice(i, i + BATCH_SIZE)
    const messages = chunk.map((sub) => ({
      from: fromEmail,
      to: sub.email,
      subject: `AI News: ${title}`,
      html: digestBlastTemplate({
        title,
        publishDate,
        keywords,
        issueUrl,
        unsubscribeUrl: `${siteUrl}/api/unsubscribe?token=${sub.unsubscribe_token}`,
        contentJson: digest.content_json,
      }),
    }))

    try {
      await resend.batch.send(messages)
    } catch (err) {
      console.error(`[emailBlast] Batch ${i / BATCH_SIZE + 1} failed:`, err)
    }
  }
}
