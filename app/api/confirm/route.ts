import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAdminClient } from '@/lib/supabaseAdmin'
import { env } from '@/lib/env'

const tokenSchema = z.string().uuid()

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') ?? ''
  const parsed = tokenSchema.safeParse(token)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 400 })
  }

  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from('subscribers')
    .update({ confirmed: true })
    .eq('unsubscribe_token', parsed.data)
    .select('id')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 })
  }

  return NextResponse.redirect(new URL('/ainews?confirmed=1', env.SITE_URL))
}
