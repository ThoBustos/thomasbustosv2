import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export interface DigestSummary {
  id: number
  publish_date: string
  title: string
  keywords: string[]
  video_count?: number
}

export interface Digest extends DigestSummary {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content_json: Record<string, any> | string | null
}

export const digestService = {
  isConfigured() {
    return supabase !== null
  },

  async getArchive(limit = 60): Promise<DigestSummary[]> {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('id, publish_date, title, keywords, video_count')
      .order('publish_date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getByDate(date: string): Promise<Digest> {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('*')
      .eq('publish_date', date)
      .single()

    if (error) throw error
    return data
  },

  async getLatest(): Promise<Digest> {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('*')
      .order('publish_date', { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    return data
  },
}
