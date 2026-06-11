import Navbar from './Navbar'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />

      <Navbar />

      <div className="relative h-full w-full">
        <h1 className="hero-title absolute left-4 top-[18%] text-[14vw] font-medium text-white md:left-10 md:text-[13vw]">
          protect
        </h1>
        <h1 className="hero-title absolute right-4 top-[38%] text-[14vw] font-medium text-white md:right-10 md:text-[13vw]">
          your
        </h1>
        <h1 className="hero-title absolute left-[18%] top-[58%] text-[14vw] font-medium text-white md:left-[28%] md:text-[13vw]">
          data
        </h1>

        <p className="absolute left-6 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90 md:left-10">
          we can guarding your data with utmost care, empowering you with privacy everywhere
        </p>

        <div className="absolute right-6 top-[14%] md:right-24">
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 rotate-[20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">+65k</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">startups use</p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />

        <div className="absolute left-6 bottom-20 md:left-20 md:bottom-24">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-medium tracking-tight md:text-5xl">+1.5b</span>
            <div className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
          </div>
          <p className="mt-1 text-xs text-white/70 md:text-sm">gb data was protected</p>
        </div>

        <div className="absolute right-6 bottom-16 md:right-20 md:bottom-20">
          <div className="flex items-center gap-3">
            <div className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">+300k</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">downloads</p>
        </div>
      </div>
    </section>
  )
}
