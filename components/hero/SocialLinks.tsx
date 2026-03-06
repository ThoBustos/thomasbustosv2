import { SOCIAL_LINKS } from '@/lib/data/social'

export function SocialLinks() {
  return (
    <nav aria-label="Social links">
      <ul className="flex items-center gap-0 list-none m-0 p-0">
        {SOCIAL_LINKS.map((link, i) => (
          <li key={link.label} className="flex items-center">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs tracking-widest uppercase text-neutral-400 transition-colors duration-200 hover:text-black"
            >
              {link.label}
            </a>
            {i < SOCIAL_LINKS.length - 1 && (
              <span className="mx-3 text-neutral-300 select-none" aria-hidden="true">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
