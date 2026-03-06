import { z } from 'zod'

export const digestSummarySchema = z.object({
  id: z.number(),
  publish_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  keywords: z.array(z.string()).nullable().default([]),
  video_count: z.number().optional(),
})

export const digestSchema = digestSummarySchema.extend({
  content_json: z.unknown().nullable(),
})

export type DigestSummary = z.infer<typeof digestSummarySchema>
export type Digest = z.infer<typeof digestSchema>
