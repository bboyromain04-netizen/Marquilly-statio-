import { motion } from 'framer-motion'
import { Building2, Mic2, Swords, Users2 } from 'lucide-react'
import { SERVICES } from '../data/content'
import FloatingOrb from './FloatingOrb'
import TiltCard from './TiltCard'

const ICONS = [Mic2, Users2, Swords, Building2]

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <FloatingOrb className="left-[-8%] bottom-[-5%] h-80 w-80 bg-bilou-orange/10" duration={13} delay={1} />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-bilou-yellow">
            services
          </span>
          <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl md:text-6xl">
            disponible pour <span className="text-gradient">toute prestation</span>
          </h2>
          <p className="mt-4 text-sm text-neutral-400 sm:text-base">
            spectacles, stages, workshops acro, battles, événements d'entreprise —
            partout en france et à l'étranger.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              >
                <TiltCard className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-bilou-yellow/20 to-bilou-orange/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-bilou-yellow/30 text-bilou-yellow">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {service.description}
                  </p>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
