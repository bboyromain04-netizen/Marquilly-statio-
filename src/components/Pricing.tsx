import { motion } from 'framer-motion'
import { AI_PACKAGES, IMMERSIVE, PRICING, SUBSCRIPTIONS } from '../data/content'
import FloatingOrb from './FloatingOrb'
import TiltCard from './TiltCard'

export default function Pricing() {
  return (
    <section id="tarifs" className="relative overflow-hidden bg-[#05050f] px-4 py-24 md:py-32">
      <FloatingOrb className="left-1/4 top-0 h-72 w-72 bg-brand-violet/10" duration={12} />
      <FloatingOrb className="right-1/4 bottom-0 h-72 w-72 bg-brand-cyan/10" duration={10} delay={2} />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
            investissement
          </span>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl md:text-6xl">
            des formules claires,{' '}
            <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
              pour chaque ambition
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            un devis personnalisé est systématiquement établi selon vos besoins réels.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRICING.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard
                className={`flex h-full flex-col rounded-3xl border p-7 ${
                  pkg.featured
                    ? 'border-brand-cyan/50 bg-gradient-to-b from-brand-violet/10 to-brand-cyan/5'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                {pkg.featured && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    le plus choisi
                  </span>
                )}
                <h3 className="text-lg font-medium uppercase tracking-wide text-white">{pkg.name}</h3>
                <p className="mt-1 text-xs text-white/50">{pkg.target}</p>
                <div className="mt-4">
                  <span className="text-3xl font-medium text-white">{pkg.price}</span>
                  <span className="ml-1 text-xs text-white/50">{pkg.unit}</span>
                </div>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-white/70">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand-cyan">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-brand-violet/40 bg-gradient-to-br from-brand-violet/15 to-brand-cyan/5 p-8"
        >
          <span className="inline-block w-fit rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            offre signature
          </span>
          <h3 className="mt-4 text-2xl font-medium text-white sm:text-3xl">{IMMERSIVE.name}</h3>
          <div className="mt-2">
            <span className="text-3xl font-medium text-white">{IMMERSIVE.price}</span>
            <span className="ml-2 text-sm text-white/50">{IMMERSIVE.unit}</span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">{IMMERSIVE.description}</p>
          <ul className="mt-5 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
            {IMMERSIVE.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 text-brand-cyan">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
            intelligence artificielle
          </span>
          <h3 className="mt-3 text-2xl font-medium text-white sm:text-3xl">
            des IA sur-mesure, pour chaque besoin
          </h3>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {AI_PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard
                className={`flex h-full flex-col rounded-3xl border p-7 ${
                  pkg.featured
                    ? 'border-brand-cyan/50 bg-gradient-to-b from-brand-violet/10 to-brand-cyan/5'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                {pkg.featured && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    le plus choisi
                  </span>
                )}
                <h3 className="text-lg font-medium uppercase tracking-wide text-white">{pkg.name}</h3>
                <p className="mt-1 text-xs text-white/50">{pkg.target}</p>
                <div className="mt-4">
                  <span className="text-3xl font-medium text-white">{pkg.price}</span>
                  <span className="ml-1 text-xs text-white/50">{pkg.unit}</span>
                </div>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-white/70">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand-cyan">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-8"
        >
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
              effet cumulé
            </span>
            <h3 className="mt-3 text-2xl font-medium text-white sm:text-3xl">
              un abonnement, une valeur qui grandit chaque mois
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60">
              hébergement, sécurité, évolutions et optimisations continues — votre site devient
              un actif qui rapporte de plus en plus avec le temps.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {SUBSCRIPTIONS.map((sub) => (
              <div
                key={sub.name}
                className={`rounded-2xl border p-5 text-center ${
                  sub.featured ? 'border-brand-cyan/50' : 'border-white/10'
                }`}
              >
                <h4 className="text-sm font-medium uppercase tracking-wide text-white">{sub.name}</h4>
                <div className="mt-2">
                  <span className="text-2xl font-medium text-white">{sub.price}</span>
                  <span className="ml-1 text-xs text-white/50">{sub.unit}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/60">{sub.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
