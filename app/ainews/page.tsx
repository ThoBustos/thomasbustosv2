import type { Metadata } from 'next'
import { digestService, DigestSummary } from '@/lib/digestService'
import WritingClient from './WritingClient'

export const metadata: Metadata = {
  title: 'AI News',
  description: 'Daily AI digest from the best channels.',
}

export const dynamic = 'force-dynamic'

async function getIssues(): Promise<DigestSummary[]> {
  try {
    return await digestService.getArchive()
  } catch (err) {
    console.error('[ainews] getIssues failed:', err)
    return []
  }
}

export default async function WritingPage() {
  const issues = await getIssues()
  return <WritingClient issues={issues} />
}
