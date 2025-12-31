
import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const mainStack = [
  { name: "Frontend", role: "React, Next.js, Vue", letter: "F" },
  { name: "Backend", role: "Node.js, Express, APIs", letter: "B" },
  { name: "Database", role: "SQL & NoSQL", letter: "D" },
  { name: "DevOps", role: "Deploy & Scale", letter: "O" },
]

const allTechnologies = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "Node.js",
  "Express",
  "REST APIs",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "Supabase",
  "Git",
  "GitHub",
  "VS Code",
  "Postman",
  "Figma",
  "npm",
  "Vercel",
  "Netlify",
  "Railway",
  "Render",
  "Docker",
  "Redux",
  "GraphQL",
  "Prisma",
]

function AnimatedBorderBox({
  children,
  isHovered,
}: {
  children: React.ReactNode
  isHovered: boolean
}) {
  return (
    <div className="relative p-4 md:p-6 border border-white/10 overflow-hidden cursor-pointer">
      {isHovered && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          <defs>
            {/* Gradient along the stroke - bright at front (0%), fading to blur at back (100%) */}
            <linearGradient id="trailGradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="0.1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="85%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            {/* Glow filter for bright front */}
            <filter id="brightGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Single animated line - 2 edges length (50% of perimeter), bright front fading to blur */}
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke="url(#trailGradient)"
            strokeWidth="2"
            filter="url(#brightGlow)"
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

      {/* Subtle glow on hover */}
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

export function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredTech, setHoveredTech] = useState<number | null>(null)

  return (
    <section id="tech" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span className="text-xs tracking-[0.3em] text-white/40">04</motion.span>
          <motion.div
            className="w-12 h-px bg-white/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span className="text-xs tracking-[0.3em] text-white/40">TECH STACK</motion.span>
        </motion.div>

        {/* Main Stack - Large display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={{ y: 80 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              Full-Stack <span className="text-white/40">Web Developer</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mainStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredTech(i)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <AnimatedBorderBox isHovered={hoveredTech === i}>
                  {/* Static letter - no hover animation */}
                  <div className="text-3xl md:text-4xl lg:text-6xl font-bold text-white/10 relative z-10">
                    {tech.letter}
                  </div>

                  <div className="mt-4 relative z-10">
                    {/* Static name - no hover animation */}
                    <div className="text-base md:text-lg font-semibold">{tech.name}</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">{tech.role}</div>
                  </div>
                </AnimatedBorderBox>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          {/* Section label */}
          <div className="text-xs tracking-[0.3em] text-white/30 mb-8 text-center">TECHNOLOGIES I WORK WITH</div>

          {/* Marquee container with fade edges */}
          <div className="relative overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            {/* First row - scrolling left */}
            <div className="flex mb-4 overflow-hidden">
              <motion.div
                className="flex gap-4 shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  x: {
                    duration: 60,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
              >
                {[...allTechnologies, ...allTechnologies].map((tech, i) => (
                  <div
                    key={`row1-${i}`}
                    className="shrink-0 px-5 py-3 border border-white/10 text-white/50 text-sm tracking-wide hover:text-white hover:border-white/30 transition-all duration-300 whitespace-nowrap"
                  >
                    {tech}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Second row - scrolling right */}
            <div className="flex overflow-hidden">
              <motion.div
                className="flex gap-4 shrink-0"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  x: {
                    duration: 70,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
              >
                {[...allTechnologies.slice().reverse(), ...allTechnologies.slice().reverse()].map((tech, i) => (
                  <div
                    key={`row2-${i}`}
                    className="shrink-0 px-5 py-3 border border-white/10 text-white/50 text-sm tracking-wide hover:text-white hover:border-white/30 transition-all duration-300 whitespace-nowrap"
                  >
                    {tech}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Decorative line */}
          <motion.div
            className="mt-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 1.2 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
