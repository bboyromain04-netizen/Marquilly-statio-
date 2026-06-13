import { motion } from 'framer-motion'
import { PILLARS } from '../data/content'
import FloatingOrb from './FloatingOrb'
import TiltCard from './TiltCard'

export default function Pillars() {
  return (
    <section id="services" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <FloatingOrb className="-left-20 top-0 h-72 w-72 bg-brand-violet/10" duration={11} />
      <FloatingOrb className="right-0 bottom-10 h-80 w-80 bg-brand-cyan/10" duration={13} delay={2} />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
            ce que nous faisons
          </span>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl md:text-6xl">
            trois leviers,{' '}
            <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
              un seul objectif
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            faire gagner du temps, des clients et de l'argent à votre entreprise — peu importe
            votre secteur d'activité.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-brand-cyan/40">
                <span className="inline-block w-fit rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {pillar.tag}
                </span>
                <h3 className="mt-4 text-xl font-medium text-white sm:text-2xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{pillar.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand-cyan">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
