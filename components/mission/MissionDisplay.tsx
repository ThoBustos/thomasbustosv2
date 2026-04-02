'use client'

import { motion } from 'framer-motion'

export default function MissionDisplay() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'white' }}
    >
      <motion.h1
        className="m-0 p-0 leading-tight tracking-tight text-black text-center px-8"
        style={{
          fontFamily: 'var(--font-dm-serif), serif',
          fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
          fontWeight: 400,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Build exceptional products with exceptional people.
        <br />
        Have fun.
        <br />
        Document everything along the way.
      </motion.h1>
    </main>
  )
}
