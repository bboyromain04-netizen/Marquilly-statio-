import { motion } from 'framer-motion'
import { SHOWCASE } from '../data/content'
import FloatingOrb from './FloatingOrb'
import TiltCard from './TiltCard'

export default function Showcase() {
  return (
    <section id="realisations" className="relative overflow-hidden bg-[#05050f] px-4 py-24 md:py-32">
      <FloatingOrb className="right-0 top-0 h-72 w-72 bg-brand-violet/10" duration={10} />
      <FloatingOrb className="left-0 bottom-0 h-80 w-80 bg-brand-cyan/10" duration={13} delay={2} />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
            réalisations
          </span>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl md:text-6xl">
            des projets pensés{' '}
            <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
              pour convertir
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            quelques exemples représentatifs de notre niveau d'exigence.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SHOWCASE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-brand-cyan/40">
                <span className="inline-block w-fit rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-xl font-medium text-white sm:text-2xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{item.description}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-cyan transition-transform group-hover:translate-x-1"
                >
                  voir le site →
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
