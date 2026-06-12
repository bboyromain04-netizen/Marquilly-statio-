import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^(\d+)(.*)$/)
  const numericValue = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value
  const display = match ? `0${suffix}` : value

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 1.5, bounce: 0 })
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) motionValue.set(numericValue)
  }, [isInView, motionValue, numericValue])

  useEffect(() => {
    if (!match) return
    return springValue.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`
    })
  }, [springValue, suffix, match])

  return <span ref={ref}>{display}</span>
}
