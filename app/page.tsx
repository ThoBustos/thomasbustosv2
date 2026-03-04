import { AnimatedName } from '@/components/hero/AnimatedName'
import { SocialLinks } from '@/components/hero/SocialLinks'

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'white' }}
    >
      {/* Name */}
      <h1
        className="leading-none tracking-tight text-black m-0 p-0"
        style={{
          fontFamily: 'var(--font-dm-serif), serif',
          fontSize: 'clamp(3rem, 9vw, 9rem)',
          fontWeight: 400,
        }}
      >
        <AnimatedName name="Thomas Bustos" />
      </h1>

      {/* Tagline */}
      <p
        className="mt-6 text-neutral-400 tracking-widest uppercase m-0"
        style={{
          fontFamily: 'var(--font-geist), sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
        }}
      >
        2x Cofounder&nbsp;&nbsp;·&nbsp;&nbsp;Builder&nbsp;&nbsp;·&nbsp;&nbsp;Writer
      </p>

      {/* Social links */}
      <div className="mt-12">
        <SocialLinks />
      </div>
    </main>
  )
}
