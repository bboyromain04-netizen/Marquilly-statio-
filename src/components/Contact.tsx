import { motion } from 'framer-motion'
import FloatingOrb from './FloatingOrb'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <FloatingOrb className="left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-brand-violet/15" duration={11} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-brand-violet/15 to-brand-cyan/10 p-10 text-center md:p-16"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
          prêt à démarrer ?
        </span>
        <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
          parlons de votre projet
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 sm:text-base">
          site web, intelligence artificielle ou outil de pilotage — un premier échange offert
          et sans engagement de 20 à 30 minutes pour identifier la solution la plus adaptée à
          votre activité. nous limitons le nombre de nouveaux projets acceptés chaque mois pour
          garantir un accompagnement de qualité — plus vous nous écrivez tôt, plus vite nous
          pouvons démarrer.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:contact.marquillystudio@gmail.com"
            className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
          >
            contact.marquillystudio@gmail.com
          </a>
          <a
            href="tel:0781700454"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            07 81 70 04 54
          </a>
        </div>

        <p className="mt-6 text-xs text-white/50">Lille, France — interventions à distance partout</p>
      </motion.div>
    </section>
  )
}
