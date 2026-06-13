import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import Counter from './Counter'
import FloatingOrb from './FloatingOrb'
import Navbar from './Navbar'

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const statVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])

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
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale: videoScale, opacity: videoOpacity }}
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black" />

      <FloatingOrb className="left-[8%] top-[15%] h-72 w-72 bg-emerald-400/10" duration={9} />
      <FloatingOrb className="right-[10%] top-[50%] h-80 w-80 bg-sky-400/10" duration={12} delay={1.5} />
      <FloatingOrb className="left-1/2 top-[8%] h-64 w-64 bg-white/5" duration={14} delay={3} />

      <Navbar />

      <motion.div style={{ y: contentY }} className="relative h-full w-full">
        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 900,
          }}
          className="hero-title will-change-transform absolute left-4 top-[18%] text-[14vw] font-medium text-white md:left-10 md:text-[13vw]"
        >
          protect
        </motion.h1>
        <motion.h1
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 900,
          }}
          className="hero-title will-change-transform absolute right-4 top-[38%] text-[14vw] font-medium text-white md:right-10 md:text-[13vw]"
        >
          your
        </motion.h1>
        <motion.h1
          custom={0.45}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 900,
          }}
          className="hero-title will-change-transform absolute left-[18%] top-[58%] text-[14vw] font-medium text-white md:left-[28%] md:text-[13vw]"
        >
          data
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute left-6 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90 md:left-10"
        >
          we can guarding your data with utmost care, empowering you with privacy everywhere
        </motion.p>

        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={statVariants}
          className="absolute right-6 top-[14%] md:right-24"
        >
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 rotate-[20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">
              <Counter value="+65k" />
            </span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">startups use</p>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />

        <motion.div
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={statVariants}
          className="absolute left-6 bottom-20 md:left-20 md:bottom-24"
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl font-medium tracking-tight md:text-5xl">
              <Counter value="+1.5b" />
            </span>
            <div className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
          </div>
          <p className="mt-1 text-xs text-white/70 md:text-sm">gb data was protected</p>
        </motion.div>

        <motion.div
          custom={0.7}
          initial="hidden"
          animate="visible"
          variants={statVariants}
          className="absolute right-6 bottom-16 md:right-20 md:bottom-20"
        >
          <div className="flex items-center gap-3">
            <div className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">
              <Counter value="+300k" />
            </span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">downloads</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
