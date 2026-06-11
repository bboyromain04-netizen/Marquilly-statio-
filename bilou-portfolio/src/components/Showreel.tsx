import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section className="relative bg-black px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-bilou-yellow">
            showreel
          </span>
          <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl md:text-6xl">
            le mouvement <span className="text-gradient">en action</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/10"
        >
          <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-bilou-yellow via-bilou-orange to-bilou-yellow opacity-30 blur-2xl" />
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/media/showreel.mp4"
          />

          <div className="absolute bottom-4 left-4 flex gap-2 sm:bottom-6 sm:left-6">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Lecture'}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-bilou-yellow hover:text-black"
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Activer le son' : 'Couper le son'}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-bilou-yellow hover:text-black"
            >
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
