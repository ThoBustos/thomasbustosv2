import { Resend } from 'resend'
import { digestBlastTemplate } from '../lib/email/digestBlastTemplate.ts'

const TO = 'thomasbustos@lets-talk-ai.com'
const ISSUE_URL = 'https://thomasbustos.com/ainews/2026-04-26'
const UNSUBSCRIBE_URL = 'https://thomasbustos.com/api/unsubscribe?token=test'

const mockContent = {
  schema_version: 'v3',
  intro:
    'Maggie Appleton warns of vibecoded slop. Individual productivity is a strategic dead end. GitHub Next is building ACE for team agents. Evan Spiegel says software is no longer a moat. Snap reaches nearly 1 billion monthly users. Distribution and hardware are the only durable edges.',
  pull_quote:
    'Believing individual productivity leads to great software is nine maybe nine women make a baby in one month logic.',
  video_sections: [
    {
      title: 'Collaborative AI Engineering: One Dev, Two Dozen Agents, Zero Alignment — Maggie Appleton, GitHub',
      speaker: 'Maggie Appleton',
      channel_name: 'AI Engineer',
      duration_minutes: 17,
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      framing:
        'Maggie Appleton documents the failure modes of solo AI coding productivity and argues the real problem is coordination — agents that optimize individually produce misaligned systems.',
      bullets: [
        'Vibecoded slop emerges when agents optimize for local completeness without shared context.',
        'The next frontier is multi-agent coordination, not individual dev speed.',
        'GitHub Next is building ACE to give teams a shared agent memory layer.',
      ],
    },
    {
      title: 'The AI era has made distribution the most important moat | Evan Spiegel (Snapchat CEO)',
      speaker: 'Evan Spiegel',
      channel_name: "Lenny's Podcast",
      duration_minutes: 70,
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      framing:
        'Evan Spiegel explains why distribution and ecosystems are more important than software features in the AI era. He details Snap\'s lean design process and the shift toward AR hardware.',
      bullets: [
        'Snapchat has nearly 1 billion monthly active users and 25 million Snapchat+ subscribers.',
        'Software is easily cloned so durable moats must be built through hardware and developer ecosystems.',
        'A flat team of only 9 to 12 designers drives the product vision for the entire company.',
      ],
    },
    {
      title: 'GitHub Next and the future of developer tooling',
      speaker: 'Idan Gazit',
      channel_name: 'GitHub',
      duration_minutes: 32,
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      framing:
        'GitHub Next explores what developer tools look like when the majority of code is written by agents rather than humans — and what role humans play in that future.',
      bullets: [
        'The IDE as we know it was designed for humans reading and writing code linearly.',
        'Agent-native tooling needs to surface intent and context, not syntax.',
        'GitHub Copilot Workspace is their first bet on a task-centric development model.',
      ],
    },
  ],
}

async function main() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY not set')
    process.exit(1)
  }

  const resend = new Resend(apiKey)

  const html = digestBlastTemplate({
    title: 'Distribution and alignment are the new moats.',
    publishDate: '2026-04-26',
    keywords: ['AI Engineering', 'Agentic Workflows', 'Distribution Moats', 'GitHub Next', 'Team Alignment'],
    issueUrl: ISSUE_URL,
    unsubscribeUrl: UNSUBSCRIBE_URL,
    contentJson: mockContent,
  })

  const from = process.env.RESEND_FROM_EMAIL ?? 'AI News <ainews@ainativeclub.com>'

  const { data, error } = await resend.emails.send({
    from,
    to: TO,
    subject: 'AI News: Distribution and alignment are the new moats. [TEST]',
    html,
  })

  if (error) {
    console.error('Failed:', error)
    process.exit(1)
  }

  console.log('Sent:', data?.id)
}

main()
