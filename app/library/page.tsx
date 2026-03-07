import type { Metadata } from 'next'
import LibraryDisplay from '@/components/library/LibraryDisplay'

export const metadata: Metadata = {
  title: "What I'm reading",
  description: "Books I've read, am reading, and plan to read - across business, philosophy, science, and more.",
}

export default function LibraryPage() {
  return <LibraryDisplay />
}
