function parseRepo(url: string): string | null {
  const match = url.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)/)
  return match ? match[1].replace(/\.git$/, '') : null
}

export async function getStars(url: string): Promise<number | null> {
  const repo = parseRepo(url)
  if (!repo) return null

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null
  } catch {
    return null
  }
}
