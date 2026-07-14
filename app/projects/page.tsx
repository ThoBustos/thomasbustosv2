import type { Metadata } from 'next'
import ProjectsDisplay, { projects } from '@/components/projects/ProjectsDisplay'
import { getStars } from '@/lib/github'

export const metadata: Metadata = {
  title: "What I'm building",
  description: "AI Native Club, Quizz MCP, OpenYoko - open source tools and products I'm actively shipping.",
}

export default async function ProjectsPage() {
  const ossProjects = projects.filter(p => p.oss && p.url)
  const starCounts = await Promise.all(ossProjects.map(p => getStars(p.url!)))

  const stars: Record<string, number> = {}
  ossProjects.forEach((p, i) => {
    const count = starCounts[i]
    if (count != null) stars[p.url!] = count
  })

  return <ProjectsDisplay stars={stars} />
}
