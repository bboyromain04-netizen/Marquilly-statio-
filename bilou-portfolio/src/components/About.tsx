import { motion } from 'framer-motion'
import { useState } from 'react'
import { STATS } from '../data/content'
import { asset } from '../lib/media'
import Counter from './Counter'
import FloatingOrb from './FloatingOrb'
import PortraitLightbox from './PortraitLightbox'
import TiltCard from './TiltCard'

export default function About() {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <section id="about" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <FloatingOrb className="-left-20 top-10 h-72 w-72 bg-bilou-orange/10" duration={11} />
      <FloatingOrb className="right-0 bottom-0 h-80 w-80 bg-bilou-yellow/10" duration={13} delay={2} />

      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-bilou-yellow/30 to-bilou-orange/20 blur-2xl" />
          <TiltCard
            onClick={() => setLightboxOpen(true)}
            className="cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-black"
          >
            <img
              src={asset('media/portrait-1.jpg')}
              alt="Bilou, danseur breakdance"
              className="h-full w-full object-contain transition-transform duration-700 hover:scale-105"
            />
          </TiltCard>
          <PortraitLightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-6 -right-6 rounded-2xl border border-white/10 bg-black/80 px-5 py-4 backdrop-blur"
          >
            <p className="font-display text-2xl text-bilou-yellow">vice-champion</p>
            <p className="text-xs uppercase tracking-widest text-neutral-400">de france — gymnastique</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-bilou-yellow">
            qui suis-je ?
          </span>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl">
            qui est <span className="text-gradient">Bilou</span> ?
          </h2>

          <p className="mt-6 text-base leading-relaxed text-neutral-300">
            Dès mon plus jeune âge, une passion pour la gymnastique m'a poussé
            à me dépasser et à toujours aller plus loin. J'ai débuté par la
            gym, discipline dans laquelle je me suis rapidement imposé,
            devenant une figure emblématique de ma catégorie et décrochant le
            titre de <span className="text-white">vice-champion de France</span>.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Très vite, mon besoin d'explorer sans limites m'a conduit vers le{' '}
            <span className="text-white">breaking</span>, une discipline qui
            me permet de repousser mes propres frontières. La danse est mon
            langage : mon moyen de faire vibrer le public, de créer des
            moments inoubliables et de partager des émotions fortes.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Cette passion m'a fait voyager pour danser en{' '}
            <span className="text-white">Hollande</span>, à{' '}
            <span className="text-white">New York</span>, au{' '}
            <span className="text-white">Portugal</span>, en{' '}
            <span className="text-white">Corse</span>, en{' '}
            <span className="text-white">Espagne</span>, en{' '}
            <span className="text-white">Belgique</span> et partout en France.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Je fais partie du crew{' '}
            <span className="text-white">From The North</span>, une équipe qui
            représente fièrement Lille et sa scène breaking à l'international.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-colors hover:border-bilou-yellow/40"
              >
                <p className="font-display text-3xl text-bilou-yellow sm:text-4xl">
                  <Counter value={stat.value} />
                </p>
                <p className="mt-1 text-[11px] uppercase leading-tight tracking-wider text-neutral-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
