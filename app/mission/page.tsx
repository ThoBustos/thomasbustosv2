import type { Metadata } from 'next'
import MissionDisplay from '@/components/mission/MissionDisplay'

export const metadata: Metadata = {
  title: 'What drives me',
  description: "I'm building exceptional products with exceptional people and documenting everything along the way.",
}

export default function MissionPage() {
  return <MissionDisplay />
}
