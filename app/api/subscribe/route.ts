import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAdminClient } from '@/lib/supabaseAdmin'
import { getResendClient } from '@/lib/resend'
import { confirmationTemplate } from '@/lib/email/confirmationTemplate'
import { env } from '@/lib/env'

const bodySchema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
  }

  const { email } = parsed.data
  const siteUrl = env.SITE_URL
  const supabase = getAdminClient()

  // Check if already subscribed and confirmed — return neutral success
  const { data: existing } = await supabase
    .from('subscribers')
    .select('confirmed, subscribed_at, unsubscribe_token')
    .eq('email', email)
    .single()

  if (existing?.confirmed) {
    return NextResponse.json({ message: 'Check your email to confirm.' })
  }

  // Avoid re-sending confirmation if one was sent in the last 5 minutes
  if (existing && !existing.confirmed) {
    const subscribedAt = new Date(existing.subscribed_at).getTime()
    if (Date.now() - subscribedAt < 5 * 60 * 1000) {
      return NextResponse.json({ message: 'Check your email to confirm.' })
    }
  }

  // Upsert subscriber — only `email` is sent so DB defaults (unsubscribe_token)
  // are not regenerated on conflict; existing token stays stable for old links
  const { data: row, error } = await supabase
    .from('subscribers')
    .upsert({ email }, { onConflict: 'email', ignoreDuplicates: false })
    .select('unsubscribe_token')
    .single()

  if (error || !row) {
    console.error('[subscribe] Upsert failed:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }

  // Send confirmation email
  try {
    const resend = getResendClient()
    const fromEmail = env.RESEND_FROM_EMAIL ?? 'AI News <noreply@thomasbustos.com>'
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Confirm your AI News subscription',
      html: confirmationTemplate(
        `${siteUrl}/api/confirm?token=${row.unsubscribe_token}`,
        `${siteUrl}/api/unsubscribe?token=${row.unsubscribe_token}`
      ),
    })
  } catch (err) {
    console.error('[subscribe] Email send failed:', err)
    return NextResponse.json({ error: 'Failed to send confirmation email.' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Check your email to confirm.' })
}
