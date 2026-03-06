import type { Metadata } from 'next'
import MissionDisplay from '@/components/mission/MissionDisplay'

export const metadata: Metadata = {
  title: 'Mission',
  description: 'Build exceptional products with exceptional people.',
}

export default function MissionPage() {
  return <MissionDisplay />
}
