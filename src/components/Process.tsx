import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '../data/content'

export default function Process() {
  return (
    <section id="methode" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
            méthode
          </span>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl md:text-6xl">
            un processus clair,{' '}
            <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
              de A à Z
            </span>
          </h2>
        </motion.div>

        <div className="mt-14 space-y-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan text-sm font-bold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="text-base font-medium text-white sm:text-lg">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
