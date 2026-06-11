import { Music2 } from 'lucide-react'
import { NAV_LINKS, SOCIALS } from '../data/content'
import InstagramIcon from './icons/InstagramIcon'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#hero" className="font-display text-2xl tracking-wide text-white">
          BIL<span className="text-gradient">O</span>U
        </a>

        <div className="flex flex-wrap items-center justify-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-bilou-yellow"
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-bilou-yellow hover:text-bilou-yellow"
          >
            <InstagramIcon size={16} />
          </a>
          <a
            href={SOCIALS.tiktok}
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-bilou-yellow hover:text-bilou-yellow"
          >
            <Music2 size={16} />
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Bilou — tous droits réservés.
      </p>
    </footer>
  )
}
