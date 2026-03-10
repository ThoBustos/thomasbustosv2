import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let publishDate: string | undefined
  try {
    const body = await req.json()
    publishDate = body?.record?.publish_date
  } catch {
    // body parse failure is non-fatal — still revalidate the list
  }

  revalidatePath('/ainews')

  if (publishDate && /^\d{4}-\d{2}-\d{2}$/.test(publishDate)) {
    revalidatePath(`/ainews/${publishDate}`)
  }

  return NextResponse.json({ revalidated: true, date: publishDate ?? null })
}
