import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { asset } from '../lib/media'

const PORTRAITS = ['media/portrait-1.jpg', 'media/portrait-2.jpg', 'media/portrait-3.jpg']

export default function PortraitLightbox({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
          >
            <X size={20} />
          </button>

          <div className="grid w-full max-w-5xl gap-4 sm:grid-cols-3">
            {PORTRAITS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="overflow-hidden rounded-2xl border border-white/10 bg-black"
              >
                <img src={asset(src)} alt={`Bilou, portrait ${i + 1}`} className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
