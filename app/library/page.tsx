import type { Metadata } from 'next'
import LibraryDisplay from '@/components/library/LibraryDisplay'

export const metadata: Metadata = {
  title: 'Library',
  description: "Books I've read, am reading, and want to read.",
}

export default function LibraryPage() {
  return <LibraryDisplay />
}
