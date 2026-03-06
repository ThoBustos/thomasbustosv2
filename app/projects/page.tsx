import type { Metadata } from 'next'
import ProjectsDisplay from '@/components/projects/ProjectsDisplay'

export const metadata: Metadata = {
  title: 'Projects',
  description: "Things I've built.",
}

export default function ProjectsPage() {
  return <ProjectsDisplay />
}
