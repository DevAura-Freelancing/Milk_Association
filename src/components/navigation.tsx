
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

function NavButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-5 py-2 border border-white/20 text-sm overflow-hidden"
    >
      {isHovered && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="navBtnGradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="0.1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="85%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <filter id="navBtnGlow" x="-50%" y="-50%" width="200%" height="200%">
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
            stroke="url(#navBtnGradient)"
            strokeWidth="2"
            filter="url(#navBtnGlow)"
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

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Students", href: "#students" },
  { label: "Tech", href: "#tech" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a href="#" className="text-xl font-bold tracking-tight flex items-center" whileHover={{ scale: 1.05 }}>
          {"Devaura".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className="inline-block"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            className="text-white/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            .
          </motion.span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative group py-2"
            >
              {/* Simple text - no vibration */}
              <span className="relative inline-block">
                {item.label}
              </span>

              {/* Animated underline with gradient - KEEP THIS */}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-white/0 via-white to-white/0"
                initial={{ width: 0, left: "50%" }}
                animate={{
                  width: hoveredIndex === i ? "100%" : 0,
                  left: hoveredIndex === i ? "0%" : "50%",
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.a>
          ))}
        </div>

        <NavButton href="#contact">
          Let's Talk
        </NavButton>
      </div>
    </motion.nav>
  )
}
