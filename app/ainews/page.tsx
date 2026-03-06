import type { Metadata } from 'next'
import { digestService, DigestSummary } from '@/lib/digestService'
import WritingClient from './WritingClient'

export const metadata: Metadata = {
  title: 'AI News',
  description: 'Daily AI digest from the best channels.',
}

export const revalidate = 3600

async function getIssues(): Promise<DigestSummary[]> {
  try {
    return await digestService.getArchive()
  } catch {
    return []
  }
}

export default async function WritingPage() {
  const issues = await getIssues()
  return <WritingClient issues={issues} />
}
