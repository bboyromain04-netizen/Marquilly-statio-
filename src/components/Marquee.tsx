import { motion } from 'framer-motion'

const ITEMS = [
  'Sites web sur-mesure',
  'Intelligence artificielle',
  'Outils de pilotage',
  'Expériences 3D immersives',
  'Automatisation métier',
  'SEO & performance',
]

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black py-5">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-33.3333%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-xl font-medium uppercase tracking-widest text-white/25 sm:text-2xl"
          >
            {item}
            <span className="text-brand-cyan">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
