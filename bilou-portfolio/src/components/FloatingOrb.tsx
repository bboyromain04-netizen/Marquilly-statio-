import { motion } from 'framer-motion'

export default function FloatingOrb({
  className = '',
  duration = 10,
  delay = 0,
}: {
  className?: string
  duration?: number
  delay?: number
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
