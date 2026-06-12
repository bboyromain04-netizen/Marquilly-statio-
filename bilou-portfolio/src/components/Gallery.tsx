import { motion } from 'framer-motion'
import { GALLERY } from '../data/content'
import { asset } from '../lib/media'
import TiltCard from './TiltCard'

const SPAN_CLASSES: Record<string, string> = {
  large: 'sm:col-span-2 aspect-[16/10]',
  tall: 'row-span-2 aspect-[3/4] sm:aspect-auto sm:h-full',
  normal: 'aspect-square',
  featured: 'row-span-2 aspect-[3/4] sm:aspect-auto sm:h-full ring-1 ring-bilou-yellow/40',
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-black px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-bilou-yellow">
            mes prestations
          </span>
          <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl md:text-6xl">
            sur scène, <span className="text-gradient">en battle &amp; en rue</span>
          </h2>
          <p className="mt-4 text-sm text-neutral-400 sm:text-base">
            quelques moments forts : tour de france à lille, stade décalé,
            crashfest, crew legend et performances de rue.
          </p>
        </motion.div>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 sm:grid-cols-3">
          {GALLERY.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={SPAN_CLASSES[item.span]}
            >
              <TiltCard className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={asset(item.src)}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block rounded-full bg-bilou-yellow/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                    {item.tag}
                  </span>
                  <p className="mt-2 font-display text-lg uppercase leading-tight text-white sm:text-xl">
                    {item.title}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
