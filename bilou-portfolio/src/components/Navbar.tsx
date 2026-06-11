import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Music2, X } from 'lucide-react'
import { NAV_LINKS, SOCIALS } from '../data/content'
import InstagramIcon from './icons/InstagramIcon'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 px-4 py-3 backdrop-blur-xl transition-colors duration-300 md:px-6 ${
          scrolled ? 'bg-black/70 shadow-[0_0_30px_rgba(247,199,0,0.08)]' : 'bg-black/30'
        }`}
      >
        <a href="#hero" className="flex items-center gap-2">
          <span className="font-display text-xl tracking-wide text-white">
            BILOU
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.3em] text-bilou-yellow sm:inline">
            breaker
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-neutral-300 transition-colors hover:text-bilou-yellow"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-bilou-yellow hover:text-bilou-yellow sm:flex"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={SOCIALS.tiktok}
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-bilou-yellow hover:text-bilou-yellow sm:flex"
          >
            <Music2 size={18} />
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-bilou-yellow to-bilou-orange px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 md:inline-block"
          >
            booking
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-neutral-200 transition-colors hover:bg-white/5 hover:text-bilou-yellow"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-2xl bg-gradient-to-r from-bilou-yellow to-bilou-orange px-4 py-3 text-center text-sm font-semibold text-black"
          >
            booking
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
