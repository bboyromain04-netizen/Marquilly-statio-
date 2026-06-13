import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import { STATS } from '../data/content'
import Counter from './Counter'
import FloatingOrb from './FloatingOrb'
import Navbar from './Navbar'
import ParticleField from './ParticleField'

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
}

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#05050f]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,91,245,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(0,194,209,0.16),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0,transparent_calc(100%-1px),rgba(255,255,255,0.03)_100%),linear-gradient(90deg,transparent_0,transparent_calc(100%-1px),rgba(255,255,255,0.03)_100%)] bg-[size:60px_60px]" />
      <ParticleField className="opacity-70" />

      <FloatingOrb className="left-[5%] top-[10%] h-72 w-72 bg-brand-violet/15" duration={9} />
      <FloatingOrb className="right-[8%] top-[45%] h-80 w-80 bg-brand-cyan/15" duration={12} delay={1.5} />
      <FloatingOrb className="left-1/3 top-[70%] h-64 w-64 bg-white/5" duration={14} delay={3} />

      <Navbar />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan"
        >
          studio web · IA · outils business
        </motion.span>

        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 1000,
          }}
          className="hero-title will-change-transform mt-4 text-[15vw] font-medium leading-[0.95] text-white sm:text-[12vw] md:text-[10vw]"
        >
          marquilly
        </motion.h1>
        <motion.h1
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 1000,
          }}
          className="hero-title will-change-transform bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-[15vw] font-medium leading-[0.95] text-transparent sm:text-[12vw] md:text-[10vw]"
        >
          studio
        </motion.h1>

        <motion.p
          custom={0.55}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
        >
          Sites web percutants, intelligences artificielles sur-mesure et outils de pilotage —
          pour organiser, décider et enrichir votre activité, quel que soit votre secteur.
        </motion.p>

        <motion.div
          custom={0.7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
          >
            découvrir nos services
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            demander un devis
          </a>
        </motion.div>
      </div>

      <motion.div
        custom={0.9}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 mx-auto mb-12 grid w-full max-w-4xl grid-cols-2 gap-6 px-6 sm:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-medium tracking-tight text-white md:text-4xl">
              <Counter value={stat.value} />
            </p>
            <p className="mt-1 text-xs text-white/60">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
