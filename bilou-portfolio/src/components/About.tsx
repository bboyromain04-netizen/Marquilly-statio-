import { motion } from 'framer-motion'
import { STATS } from '../data/content'
import { asset } from '../lib/media'

export default function About() {
  return (
    <section id="about" className="relative bg-black px-4 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-bilou-yellow/30 to-bilou-orange/20 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src={asset('media/portrait.jpg')}
              alt="Bilou, danseur breakdance"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 rounded-2xl border border-white/10 bg-black/80 px-5 py-4 backdrop-blur">
            <p className="font-display text-2xl text-bilou-yellow">vice-champion</p>
            <p className="text-xs uppercase tracking-widest text-neutral-400">de france — gymnastique</p>
          </div>
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
            qui est <span className="text-gradient">bilou</span> ?
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

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
              >
                <p className="font-display text-3xl text-bilou-yellow sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[11px] uppercase leading-tight tracking-wider text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
