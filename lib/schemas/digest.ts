import { z } from 'zod'

export const digestSummarySchema = z.object({
  id: z.string(),
  publish_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().nullable().default(''),
  keywords: z.array(z.string()).nullish().default([]),
  video_count: z.number().nullish(),
})

export const digestSchema = digestSummarySchema.extend({
  content_json: z.unknown().nullable(),
})

export type DigestSummary = z.infer<typeof digestSummarySchema>
export type Digest = z.infer<typeof digestSchema>
