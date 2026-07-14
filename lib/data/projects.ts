export interface Project {
  name: string
  description: string
  year: string
  url?: string
  liveUrl?: string
  oss?: boolean
}

export const projects: Project[] = [
  // 2026 - newest first
  {
    name: 'small.design',
    description: 'My small design studio :)',
    year: '2026',
    url: 'https://github.com/ThoBustos/smalldesign',
    liveUrl: 'https://small.design',
    oss: true,
  },
  {
    name: 'LearnRep',
    description: 'Generate quizzes from your terminal. Built for engineers who learn by doing — run a command, get a quiz, share it with your team. CLI-first, MCP-ready, open source.',
    year: '2026',
    url: 'https://github.com/ThoBustos/learnrep',
    liveUrl: 'https://learnrep.ideabench.ai/',
    oss: true,
  },
  {
    name: 'IdeaBench',
    description: 'Where my ideas grow. A public launchpad for all my app ideas. Every idea is built and shipped as a live v1. You vote for the ones that deserve more love.',
    year: '2026',
    url: 'https://github.com/ThoBustos/ideabench',
    liveUrl: 'https://www.ideabench.ai/',
    oss: true,
  },
  {
    name: 'thomasbustos.com v2',
    description: 'V2 of my personal website. Built with Next.js 15, Tailwind v4, and GSAP.',
    year: '2026',
    url: 'https://github.com/ThoBustos/thomasbustosv2',
    liveUrl: 'https://thomasbustos.com',
    oss: true,
  },
  {
    name: 'Quizz MCP',
    description:
      'MCP + Next.js app that turns any content into quizzes. I use it a lot when building to test myself on concepts, or when writing docs, strategy, processing calls, testing my understanding and exploring my own limiting beliefs.',
    year: '2026',
    url: 'https://github.com/ThoBustos/quizz-mcp',
    oss: true,
  },
  {
    name: 'AI Native Club',
    description: 'Landing + app for AI Native Club, an AI community with top builders and founders.',
    year: '2026',
    url: 'https://github.com/ThoBustos/ainativeclub',
    liveUrl: 'https://www.ainativeclub.com/',
    oss: true,
  },
  {
    name: 'Reader',
    description:
      'My tool to read papers with AI and quiz myself. This initiated the Quizz MCP project. I read the full GPT series of papers with this and had so much fun.',
    year: '2026',
    url: 'https://github.com/ThoBustos/reader',
    oss: true,
  },
  {
    name: 'Dotfiles',
    description:
      'Personal dotfiles managed with Chezmoi. Neovim config, shell setup, and everything else that makes a machine feel like home.',
    year: '2026',
    url: 'https://github.com/ThoBustos/dotfiles',
    oss: true,
  },
  {
    name: 'Yoko OS',
    description:
      'Probably my build I\'ve been using the most in the last months. My full system to manage day-to-day that I use with tmux.',
    year: '2026',
    url: 'https://github.com/ThoBustos/yoko-os',
    oss: true,
  },
  // 2025 - newest first
  {
    name: 'LTAI News',
    description:
      'The generator of the AI newsletter. Tracks my favorite YouTube channels and creates a daily report.',
    year: '2025',
    url: 'https://github.com/ThoBustos/ltai-news',
    liveUrl: 'https://thomasbustos.com/ainews',
    oss: true,
  },
  {
    name: 'thomasbustos.com v1',
    description: 'First version of my personal landing.',
    year: '2025',
    url: 'https://github.com/ThoBustos/thomasbustos',
    oss: true,
  },
  // 2024
  {
    name: 'Lyah',
    description: 'Voice-powered tutoring platform that lets educators build personalized learning experiences without giving up control of their curriculum.',
    year: '2024',
    liveUrl: 'https://lyah.ai',
  },
]
