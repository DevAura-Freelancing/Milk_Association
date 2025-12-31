
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section id="about" className="relative py-32 px-6" ref={containerRef}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section label with line animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span
            className="text-xs tracking-[0.3em] text-white/40"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            01
          </motion.span>
          <motion.div
            className="w-12 h-px bg-white/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span
            className="text-xs tracking-[0.3em] text-white/40"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            ABOUT
          </motion.span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Statement with text reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {"Building digital experiences that".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="text-white/40"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                matter.
              </motion.span>
            </h2>

            {/* Animated decorative element */}
            <motion.div style={{ x }} className="mt-8 flex items-center gap-4">
              <motion.div
                animate={{ scaleX: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-16 h-[2px] bg-gradient-to-r from-white/40 to-transparent"
              />
            </motion.div>
          </motion.div>

          {/* Right column - Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <motion.p
              className="text-lg text-white/60 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              I'm a freelance MERN stack developer with a passion for creating clean, efficient, and scalable web
              applications. From startups to established businesses, I help transform ideas into powerful digital
              solutions.
            </motion.p>
            <motion.p
              className="text-lg text-white/40 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Whether you need a brand new website, a complete redesign of your existing platform, or technical
              improvements to your current setup — I deliver end-to-end solutions that drive results.
            </motion.p>

            {/* Stats with counter animation */}
            <div className="pt-8 grid grid-cols-3 gap-8 border-t border-white/10">
              {[
                { value: "50+", label: "Projects" },
                { value: "3+", label: "Years" },
                { value: "100%", label: "Commitment" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + i * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  className="cursor-default"
                >
                  <motion.div
                    className="text-2xl md:text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + i * 0.15 }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div
                    className="text-xs text-white/40 uppercase tracking-wider mt-1"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.1 + i * 0.15 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
