
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"

function AnimatedButton({ 
  children, 
  href, 
  variant = "primary" 
}: { 
  children: React.ReactNode
  href: string
  variant?: "primary" | "secondary"
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative px-8 py-4 font-medium overflow-hidden ${
        variant === "primary" 
          ? "bg-white text-black" 
          : "border border-white/20 text-white"
      }`}
    >
      {/* Animated border effect */}
      {isHovered && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id={`btnGradient-${variant}`} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="0.1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="85%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <filter id={`btnGlow-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke={`url(#btnGradient-${variant})`}
            strokeWidth="2"
            filter={`url(#btnGlow-${variant})`}
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="0.5 0.5"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -2 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </svg>
      )}

      {/* Background animation - ALL slide from LEFT to RIGHT */}
      <motion.span
        className={`absolute inset-0 ${variant === "primary" ? "bg-black" : "bg-white"}`}
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Text with proper z-index */}
      <span className={`relative z-20 ${
        variant === "primary" 
          ? isHovered ? "text-white" : "text-black"
          : isHovered ? "text-black" : "text-white"
      } transition-colors duration-300`}>
        {children}
      </span>
    </motion.a>
  )
}

export function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const brandName = "Devaura"
  const tagline = "Digital Excellence"

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      <motion.div style={{ y, opacity, scale }} className="max-w-5xl mx-auto text-center">
        {/* Intro line with typewriter effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/50 text-sm tracking-[0.3em] uppercase mb-6 overflow-hidden"
        >
          <motion.span
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            Full-Stack Web Developer • Freelancer
          </motion.span>
        </motion.p>

        {/* Main title with character animation */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.9]"
          >
            <span className="block overflow-hidden">
              {brandName.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 120, rotateX: -90 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Mirror reflection effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="absolute top-full left-0 right-0 overflow-hidden h-24"
          >
            <motion.div
              animate={{
                opacity: [0.15, 0.08, 0.15],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.9] text-center"
              style={{
                transform: "scaleY(-1)",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {brandName}
            </motion.div>
          </motion.div>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            style={{ transformOrigin: "center" }}
          />
        </div>

        {/* Tagline with word animation */}
        <motion.div className="mt-24 overflow-hidden">
          <motion.p className="text-2xl md:text-3xl text-white/30 font-light tracking-[0.2em]">
            {tagline.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.4 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          I build, fix, and transform web projects from concept to deployment.
          <br />
          <motion.span
            className="text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Full-stack solutions for businesses & students.
          </motion.span>
        </motion.p>

        {/* CTA Buttons with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <AnimatedButton href="#contact" variant="primary">
            Start a Project
          </AnimatedButton>
          <AnimatedButton href="#services" variant="secondary">
            View Services
          </AnimatedButton>
        </motion.div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div className="flex flex-col items-center gap-2">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-xs tracking-[0.3em] text-white/30"
            >
              SCROLL
            </motion.span>
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background animated elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
      >
        <div className="absolute inset-0 border border-white/[0.03] rounded-full" />
        <div className="absolute inset-8 border border-white/[0.02] rounded-full" />
        <div className="absolute inset-16 border border-white/[0.01] rounded-full" />
      </motion.div>
    </section>
  )
}
