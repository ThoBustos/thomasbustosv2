import type { Metadata } from 'next'
import EventsDisplay from '@/components/events/EventsDisplay'

export const metadata: Metadata = {
  title: "Where I'll be",
  description: "Conferences, meetups, and talks I'm attending or hosting in the AI and founder space.",
}

export default function EventsPage() {
  return <EventsDisplay />
}
