export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-white/40 sm:flex-row">
        <span>
          marquilly <span className="text-brand-cyan">studio</span> — sites web · IA · outils business
        </span>
        <span>© {new Date().getFullYear()} Marquilly Studio. Tous droits réservés.</span>
      </div>
    </footer>
  )
}
