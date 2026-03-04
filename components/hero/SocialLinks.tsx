interface SocialLink {
  label: string
  href: string
}

const links: SocialLink[] = [
  { label: 'X', href: 'https://x.com/ThoBustos' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thomasbustos/' },
  { label: 'GitHub', href: 'https://github.com/ThoBustos' },
  { label: 'YouTube', href: 'https://www.youtube.com/@lets-talk-ai' },
  { label: 'Substack', href: 'https://thomasbustos.substack.com/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@lets_talk_ai' },
]

export function SocialLinks() {
  return (
    <nav aria-label="Social links">
      <ul
        className="flex items-center gap-0 list-none m-0 p-0"
        style={{ fontFamily: 'var(--font-geist), sans-serif' }}
      >
        {links.map((link, i) => (
          <li key={link.label} className="flex items-center">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-neutral-400 transition-colors duration-200 hover:text-black"
            >
              {link.label}
            </a>
            {i < links.length - 1 && (
              <span
                className="mx-3 text-neutral-300 select-none"
                aria-hidden="true"
              >
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
