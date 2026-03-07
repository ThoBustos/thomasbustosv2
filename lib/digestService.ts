import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { env } from '@/lib/env'
import { digestSummarySchema, digestSchema } from '@/lib/schemas/digest'

export type { DigestSummary, Digest } from '@/lib/schemas/digest'

function getClient() {
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export const digestService = {
  isConfigured() {
    return true
  },

  async getArchive(limit = 60, offset = 0) {
    const supabase = getClient()
    const { data, error } = await supabase
      .from('daily_digests')
      .select('id, publish_date, title, keywords, video_count')
      .order('publish_date', { ascending: false })
      .range(offset, offset + limit - 1)
    if (error) throw error
    return z.array(digestSummarySchema).parse(data)
  },

  async getByDate(date: string) {
    const supabase = getClient()
    const { data, error } = await supabase
      .from('daily_digests')
      .select('*')
      .eq('publish_date', date)
      .single()
    if (error) throw error
    return digestSchema.parse(data)
  },

  async getLatest() {
    const supabase = getClient()
    const { data, error } = await supabase
      .from('daily_digests')
      .select('*')
      .order('publish_date', { ascending: false })
      .limit(1)
      .single()
    if (error) throw error
    return digestSchema.parse(data)
  },
}
