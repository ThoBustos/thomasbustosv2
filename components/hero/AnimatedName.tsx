'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface AnimatedNameProps {
  name: string
}

export function AnimatedName({ name }: AnimatedNameProps) {
  const chars = name.split('')

  // Collect letter-only indices (excluding spaces)
  const letterIndices = useMemo(() => {
    return chars.reduce<number[]>((acc, char, i) => {
      if (char !== ' ') acc.push(i)
      return acc
    }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  // Pick 4 random letter positions to pulse
  const pulseSet = useMemo(() => {
    const shuffled = [...letterIndices].sort(() => Math.random() - 0.5)
    return new Set(shuffled.slice(0, 4))
  }, [letterIndices])

  let letterIndex = 0

  const elements = chars.map((char, i) => {
    if (char === ' ') {
      return <span key={i}>&nbsp;</span>
    }

    const isEven = letterIndex % 2 === 0
    const accentColor = isEven ? '#7C6AC4' : '#F89151'
    const isPulse = pulseSet.has(i)
    const entranceDelay = letterIndex * 0.07
    // Each pulse letter gets a different start time + repeat cadence
    const pulseDelay = 1.2 + Math.random() * 1.5
    const pulseRepeatDelay = 2.5 + Math.random() * 3
    letterIndex++

    return (
      <motion.span
        key={i}
        style={{ display: 'inline-block' }}
        initial={{ opacity: 0, color: '#000000' }}
        animate={isPulse ? {
          opacity: 1,
          color: ['#000000', accentColor, '#000000'],
        } : {
          opacity: 1,
          color: '#000000',
        }}
        transition={isPulse ? {
          opacity: { delay: entranceDelay, duration: 0.4 },
          color: {
            delay: pulseDelay,
            duration: 0.5,
            times: [0, 0.4, 1],
            repeat: Infinity,
            repeatDelay: pulseRepeatDelay,
            ease: 'easeInOut',
          },
        } : {
          opacity: { delay: entranceDelay, duration: 0.4 },
        }}
        whileHover={{
          color: accentColor,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
      >
        {char}
      </motion.span>
    )
  })

  const dotColor = letterIndex % 2 === 0 ? '#7C6AC4' : '#F89151'

  return (
    <span className="inline-block cursor-default select-none" aria-label={name}>
      {elements}
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: letterIndex * 0.07, duration: 0.4 }}
        whileHover={{
          color: dotColor,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
      >
        .
      </motion.span>
    </span>
  )
}
