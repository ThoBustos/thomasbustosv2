import type { Metadata } from 'next'
import { digestService, DigestSummary } from '@/lib/digestService'
import WritingClient from './WritingClient'

export const metadata: Metadata = {
  title: 'AI News',
  description: 'An AI generated daily digest curated from top YouTube channels.',
}

export const revalidate = 3600

async function getIssues(): Promise<DigestSummary[]> {
  try {
    return await digestService.getArchive(20)
  } catch (err) {
    console.error('[ainews] getIssues failed:', err)
    return []
  }
}

export default async function WritingPage() {
  const issues = await getIssues()
  return <WritingClient issues={issues} />
}
