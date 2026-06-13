import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/)
  const prefix = match ? match[1] : ''
  const numericValue = match ? parseFloat(match[2]) : 0
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0
  const suffix = match ? match[3] : value
  const display = match ? `${prefix}0${suffix}` : value

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 1.5, bounce: 0 })
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) motionValue.set(numericValue)
  }, [isInView, motionValue, numericValue])

  useEffect(() => {
    if (!match) return
    return springValue.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`
    })
  }, [springValue, prefix, suffix, decimals, match])

  return <span ref={ref}>{display}</span>
}
