import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { sendDigestBlast } from '@/lib/emailBlast'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let publishDate: string | undefined
  let eventType: string | undefined
  let table: string | undefined
  try {
    const body = await req.json()
    publishDate = body?.record?.publish_date
    eventType = body?.type
    table = body?.table
  } catch {
    // body parse failure is non-fatal — still revalidate
  }

  revalidatePath('/ainews')
  revalidatePath('/feed.xml')

  if (publishDate && /^\d{4}-\d{2}-\d{2}$/.test(publishDate)) {
    revalidatePath(`/ainews/${publishDate}`)
  }

  // Await the blast so it completes before the response is sent (serverless safe).
  // Errors are caught so a failed blast never returns non-200 to Supabase.
  if (eventType === 'INSERT' && table === 'daily_digests' && publishDate) {
    await sendDigestBlast(publishDate).catch((err) =>
      console.error('[revalidate] Email blast failed:', err)
    )
  }

  return NextResponse.json({ revalidated: true, date: publishDate ?? null })
}
