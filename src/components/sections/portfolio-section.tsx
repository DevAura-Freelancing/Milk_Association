
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

function AnimatedButton({ 
  children, 
  href 
}: { 
  children: React.ReactNode
  href: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative inline-block px-6 py-3 border border-white/20 text-sm overflow-hidden"
    >
      {isHovered && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="portfolioBtnGradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="0.1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="85%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <filter id="portfolioBtnGlow" x="-50%" y="-50%" width="200%" height="200%">
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
            stroke="url(#portfolioBtnGradient)"
            strokeWidth="2"
            filter="url(#portfolioBtnGlow)"
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
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      />
      <span className={`relative z-20 ${isHovered ? "text-black" : "text-white"} transition-colors duration-300`}>
        {children}
      </span>
    </motion.a>
  )
}

export function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-32 px-6 bg-white/[0.02]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span className="text-xs tracking-[0.3em] text-white/40">05</motion.span>
          <motion.div
            className="w-12 h-px bg-white/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span className="text-xs tracking-[0.3em] text-white/40">PORTFOLIO</motion.span>
        </motion.div>

        {/* Placeholder content with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-center py-20 border border-dashed border-white/20 overflow-hidden"
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Large text with character animation */}
          <div className="relative z-10 overflow-hidden">
            <motion.div
              className="text-6xl md:text-8xl font-bold text-white/5"
              initial={{ y: 100 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {"YOUR PROJECT".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.03 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="relative z-10 text-2xl md:text-3xl font-semibold mb-4"
          >
            Could Be Here
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="relative z-10 text-white/50 max-w-md mx-auto mb-8"
          >
            Portfolio section coming soon. In the meantime, let's discuss your project and make it the first feature
            here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="relative z-10"
          >
            <AnimatedButton href="#contact">
              Start Your Project
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
