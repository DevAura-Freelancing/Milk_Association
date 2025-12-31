
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const services = [
  {
    title: "New Website Development",
    description: "From concept to launch — custom-built websites tailored to your business needs and goals.",
  },
  {
    title: "Website Redesign",
    description: "Transform your outdated platform into a modern, high-performing digital experience.",
  },
  {
    title: "Updates & Extensions",
    description: "Add new features, integrate third-party services, or expand your existing functionality.",
  },
  {
    title: "Bug Fixing & Optimization",
    description: "Resolve technical issues and improve performance, speed, and user experience.",
  },
  {
    title: "UI/UX Design",
    description: "Clean, intuitive interfaces that users love — designed with purpose and precision.",
  },
  {
    title: "Hosting & Deployment",
    description: "Seamless deployment to modern platforms with domain setup and SSL configuration.",
  },
  {
    title: "SEO & Documentation",
    description: "Search engine optimization basics and comprehensive project documentation.",
  },
  {
    title: "Presentations & Reports",
    description: "Professional PPTs and technical reports for project submissions and reviews.",
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
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
            02
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
            SERVICES
          </motion.span>
        </motion.div>

        {/* Header with split text animation */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: 80 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance"
          >
            What I Can Do <span className="text-white/40">For You</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/50 text-lg mb-20 max-w-2xl"
        >
          Complete web solutions from start to finish. Whatever your digital needs, I've got you covered.
        </motion.p>

        {/* Services list with enhanced animations */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-t border-white/10 py-8 grid md:grid-cols-12 gap-4 items-start px-4 -mx-4 cursor-pointer"
            >
              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-white/[0.02]"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: hoveredIndex === i ? 1 : 0,
                  x: hoveredIndex === i ? 0 : -20,
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="md:col-span-1 text-xs text-white/30 font-mono relative z-10"
                animate={{
                  color: hoveredIndex === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.div>

              <motion.h3
                className="md:col-span-4 text-xl font-semibold transition-colors relative z-10"
                animate={{
                  x: hoveredIndex === i ? 10 : 0,
                  color: hoveredIndex === i ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
                }}
                transition={{ duration: 0.3 }}
              >
                {service.title}
              </motion.h3>

              <motion.p
                className="md:col-span-6 text-white/50 leading-relaxed relative z-10"
                animate={{ opacity: hoveredIndex === i ? 0.8 : 0.5 }}
              >
                {service.description}
              </motion.p>

              <div className="md:col-span-1 flex justify-end relative z-10">
                <motion.span
                  className="text-white/20"
                  animate={{
                    x: hoveredIndex === i ? 10 : 0,
                    opacity: hoveredIndex === i ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  →
                </motion.span>
              </div>

              {/* Progress line indicator */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: hoveredIndex === i ? "100%" : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
