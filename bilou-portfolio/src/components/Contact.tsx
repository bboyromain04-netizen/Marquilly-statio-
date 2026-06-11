import { motion } from 'framer-motion'
import { Mail, Music2, Phone } from 'lucide-react'
import { SOCIALS } from '../data/content'
import InstagramIcon from './icons/InstagramIcon'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-bilou-yellow/10 to-bilou-orange/5 blur-3xl" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-bilou-yellow">
            contact
          </span>
          <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl md:text-7xl">
            travaillons <span className="text-gradient">ensemble</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-neutral-400 sm:text-base">
            une idée de spectacle, un événement, un stage à organiser ?
            contacte-moi directement, je réponds rapidement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`mailto:${SOCIALS.email}`}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-bilou-yellow to-bilou-orange px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            <Mail size={18} />
            {SOCIALS.email}
          </a>
          <a
            href={`tel:${SOCIALS.phoneHref}`}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-bilou-yellow hover:text-bilou-yellow"
          >
            <Phone size={18} />
            {SOCIALS.phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-neutral-300 transition-colors hover:border-bilou-yellow hover:text-bilou-yellow"
          >
            <InstagramIcon size={18} />
            @bboy_bilou
          </a>
          <a
            href={SOCIALS.tiktok}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-neutral-300 transition-colors hover:border-bilou-yellow hover:text-bilou-yellow"
          >
            <Music2 size={18} />
            @bboy_bilou
          </a>
        </motion.div>
      </div>
    </section>
  )
}
