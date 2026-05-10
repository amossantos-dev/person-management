import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
}

export function AnimatedCounter({ value, suffix = '' }: AnimatedCounterProps) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 })
  const display = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  return (
    <span>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
