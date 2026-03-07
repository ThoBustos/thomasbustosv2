import type { Metadata } from 'next'
import ProjectsDisplay from '@/components/projects/ProjectsDisplay'

export const metadata: Metadata = {
  title: "What I'm building",
  description: "AI Native Club, Quizz MCP, OpenYoko - open source tools and products I'm actively shipping.",
}

export default function ProjectsPage() {
  return <ProjectsDisplay />
}
