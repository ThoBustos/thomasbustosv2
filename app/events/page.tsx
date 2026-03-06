import type { Metadata } from 'next'
import EventsDisplay from '@/components/events/EventsDisplay'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Conferences, meetups, and talks.',
}

export default function EventsPage() {
  return <EventsDisplay />
}
