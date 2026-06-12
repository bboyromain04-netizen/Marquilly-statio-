import { motion } from 'framer-motion'
import {
  Flame,
  Lightbulb,
  Sparkles,
  Timer,
  Users,
  Zap,
} from 'lucide-react'
import { SKILLS } from '../data/content'
import FloatingOrb from './FloatingOrb'
import TiltCard from './TiltCard'

const ICONS = [Flame, Lightbulb, Timer, Sparkles, Zap, Users]

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <FloatingOrb className="right-[-10%] top-1/3 h-72 w-72 bg-bilou-yellow/10" duration={12} />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-bilou-yellow">
            mes compétences
          </span>
          <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl md:text-6xl">
            une danse, <span className="text-gradient">mille expressions</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <TiltCard className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-bilou-yellow/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bilou-yellow to-bilou-orange text-black transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-xl uppercase tracking-wide text-white">
                    {skill.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {skill.description}
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
