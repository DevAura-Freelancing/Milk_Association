
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

function AnimatedBorderBox({
  children,
  isHovered,
}: {
  children: React.ReactNode
  isHovered: boolean
}) {
  return (
    <div className="relative p-6 border border-white/10 bg-white/[0.02] overflow-hidden">
      {isHovered && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="studentBoxGradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="0.1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="85%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <filter id="studentBoxGlow" x="-50%" y="-50%" width="200%" height="200%">
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
            stroke="url(#studentBoxGradient)"
            strokeWidth="2"
            filter="url(#studentBoxGlow)"
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
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </div>
  )
}

const offerings = [
  {
    title: "Individual Projects",
    desc: "Custom-built projects tailored to your academic requirements and deadlines.",
  },
  {
    title: "Bulk College Orders",
    desc: "Special packages for departments handling multiple student projects at once.",
  },
  {
    title: "Full Documentation",
    desc: "Complete project reports, diagrams, and technical documentation included.",
  },
  {
    title: "Code Explanation",
    desc: "Detailed walkthrough sessions so you understand every line of your project.",
  },
]

export function StudentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isSpecialBoxHovered, setIsSpecialBoxHovered] = useState(false)

  return (
    <section id="students" className="relative py-32 px-6 bg-white/[0.02]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span className="text-xs tracking-[0.3em] text-white/40">03</motion.span>
          <motion.div
            className="w-12 h-px bg-white/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span className="text-xs tracking-[0.3em] text-white/40">STUDENTS & COLLEGES</motion.span>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Big statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 80 }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              >
                Academic Projects, <span className="text-white/40">Done Right.</span>
              </motion.h2>
            </div>
            <motion.p
              className="text-lg text-white/50 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Whether you're a student with a deadline or a college with bulk requirements — I deliver
              professional-grade projects with complete documentation and personal guidance.
            </motion.p>

            {/* Highlight box with animated border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setIsSpecialBoxHovered(true)}
              onMouseLeave={() => setIsSpecialBoxHovered(false)}
              className="cursor-pointer"
            >
              <AnimatedBorderBox isHovered={isSpecialBoxHovered}>
                <div className="relative z-10">
                  <motion.div
                    className="text-xs tracking-[0.2em] text-white/40 mb-3"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    SPECIAL OFFER
                  </motion.div>
                  <p className="text-xl font-semibold">Combo packages available for bulk orders</p>
                  <p className="text-white/50 mt-2">Contact for custom pricing on department-wide projects</p>
                </div>
              </AnimatedBorderBox>
            </motion.div>
          </motion.div>

          {/* Right - Offerings with enhanced animations */}
          <div className="space-y-6">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative pl-8 border-l border-white/10 hover:border-white/30 transition-colors cursor-pointer"
              >
                {/* Animated dot */}
                <motion.div
                  className="absolute left-0 top-0 w-2 h-2 -translate-x-[4.5px] rounded-full bg-white/20"
                  animate={{
                    scale: hoveredIndex === i ? 1.5 : 1,
                    backgroundColor: hoveredIndex === i ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Expanding line on hover */}
                <motion.div
                  className="absolute left-0 top-0 w-px bg-white/50"
                  initial={{ height: 0 }}
                  animate={{ height: hoveredIndex === i ? "100%" : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ marginLeft: "-0.5px" }}
                />

                <motion.h3
                  className="text-xl font-semibold mb-2"
                  animate={{ x: hoveredIndex === i ? 10 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p className="text-white/50" animate={{ opacity: hoveredIndex === i ? 0.8 : 0.5 }}>
                  {item.desc}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
