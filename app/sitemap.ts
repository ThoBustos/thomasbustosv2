import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://thomasbustos.com', lastModified: new Date(), priority: 1 },
    { url: 'https://thomasbustos.com/mission', priority: 0.8 },
    { url: 'https://thomasbustos.com/projects', priority: 0.8 },
    { url: 'https://thomasbustos.com/events', priority: 0.7 },
    { url: 'https://thomasbustos.com/library', priority: 0.7 },
    { url: 'https://thomasbustos.com/ainews', priority: 0.6 },
  ]
}
