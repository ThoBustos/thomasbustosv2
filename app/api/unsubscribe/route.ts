import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAdminClient } from '@/lib/supabaseAdmin'
import { env } from '@/lib/env'

const tokenSchema = z.string().uuid()

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') ?? ''
  const parsed = tokenSchema.safeParse(token)

  if (!parsed.success) {
    return NextResponse.redirect(new URL('/ainews?unsubscribed=1', env.SITE_URL))
  }

  const supabase = getAdminClient()
  await supabase.from('subscribers').delete().eq('unsubscribe_token', parsed.data)

  return NextResponse.redirect(new URL('/ainews?unsubscribed=1', env.SITE_URL))
}
