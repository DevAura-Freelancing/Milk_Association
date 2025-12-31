
import { motion } from "framer-motion"

export function SVGBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated diagonal lines */}
      <motion.svg
        className="absolute top-0 left-0 w-full h-full opacity-[0.05]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${i * 15}%`}
            y1="0"
            x2={`${i * 15 + 50}%`}
            y2="100%"
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </motion.svg>

      {/* Floating circles */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-white/5"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full border border-white/5"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.05, 0.08],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-3xl" />
    </div>
  )
}
