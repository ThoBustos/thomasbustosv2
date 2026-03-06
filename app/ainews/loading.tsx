export default function Loading() {
  return (
    <main className="min-h-screen px-8 py-24">
      <div style={{ maxWidth: '36rem' }}>
        {/* Heading skeleton */}
        <div className="h-10 w-40 bg-neutral-100 rounded animate-pulse mb-8" />

        {/* Search skeleton */}
        <div className="h-9 bg-neutral-100 rounded animate-pulse mb-10" />

        {/* Issue rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 bg-neutral-50 rounded animate-pulse mb-2" />
        ))}
      </div>
    </main>
  )
}
