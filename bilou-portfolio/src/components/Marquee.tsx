const ITEMS = [
  'breaking',
  'acrobatie',
  'spectacles',
  'workshops',
  'battles',
  'événementiel',
  'crew legend',
  'freestyle',
]

export default function Marquee() {
  const items = [...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-bilou-yellow to-bilou-orange py-3">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-lg uppercase tracking-widest text-black/90 sm:text-xl"
          >
            {item} <span className="mx-4 text-black/40">★</span>
          </span>
        ))}
      </div>
    </div>
  )
}
