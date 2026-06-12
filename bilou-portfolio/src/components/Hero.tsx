import { motion } from 'framer-motion'
import { ArrowDown, Music2 } from 'lucide-react'
import { SOCIALS } from '../data/content'
import { asset } from '../lib/media'
import InstagramIcon from './icons/InstagramIcon'

export default function Hero() {
  return (
    <section id="hero" className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        loop
        muted
        playsInline
        src={asset('media/showreel.mp4')}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 rounded-full border border-bilou-yellow/40 bg-bilou-yellow/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.4em] text-bilou-yellow"
        >
          dancer · performer · acrobat
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-[18vw] leading-[0.85] tracking-tight text-white sm:text-[15vw] md:text-[13vw]"
        >
          BIL<span className="text-gradient">O</span>U
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 max-w-xl text-sm text-neutral-300 sm:text-base md:text-lg"
        >
          danseur de breakdance professionnel depuis plus de 10 ans. acrobate
          &amp; performer disponible pour spectacles, stages, workshops acro et
          battles partout en france.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-bilou-yellow to-bilou-orange px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            réserver une prestation
          </a>
          <a
            href="#gallery"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-bilou-yellow hover:text-bilou-yellow"
          >
            voir le portfolio
          </a>
          <div className="flex items-center gap-2">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-colors hover:border-bilou-yellow hover:text-bilou-yellow"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-colors hover:border-bilou-yellow hover:text-bilou-yellow"
            >
              <Music2 size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  )
}
