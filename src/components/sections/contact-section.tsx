
import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const projectTypes = [
    { value: "new-website", label: "New Website" },
    { value: "redesign", label: "Redesign / Rebuild" },
    { value: "update", label: "Update / Extend" },
    { value: "bug-fix", label: "Bug Fix / Optimization" },
    { value: "student-project", label: "Student Project" },
    { value: "bulk-order", label: "Bulk Order (College)" },
    { value: "other", label: "Other" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formState)
    
    // Show success popup
    setShowSuccess(true)
    
    // Reset form
    setFormState({
      name: "",
      email: "",
      projectType: "",
      message: "",
    })
    
    // Hide popup after 5 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto w-full">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span className="text-xs tracking-[0.3em] text-white/40">06</motion.span>
          <motion.div
            className="w-12 h-px bg-white/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span className="text-xs tracking-[0.3em] text-white/40">CONTACT</motion.span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - CTA */}
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
                Tell Me What You <span className="text-white/40">Want to Build.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-lg text-white/50 leading-relaxed mb-12"
            >
              Have a project in mind? Let's discuss how I can help bring your vision to life. Quick response guaranteed.
            </motion.p>

            {/* Contact info with line animations - Mobile Responsive */}
            <div className="space-y-4">
              {[
                { label: "EMAIL", value: "devaurafreelancing@gmail.com", href: "mailto:devaurafreelancing@gmail.com" },
                { label: "WHATSAPP", value: "+91 12345 67890", href: "https://wa.me/911234567890" },
              ].map((contact, i) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white/60 hover:text-white transition-colors"
                >
                  <span className="text-xs tracking-wider whitespace-nowrap">{contact.label}</span>
                  <motion.div
                    className="hidden sm:block flex-1 h-px bg-white/10"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                  />
                  <motion.a
                    href={contact.href}
                    className="text-sm break-all sm:break-normal"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {contact.value}
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form with enhanced field animations */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-full overflow-hidden"
          >
            {[
              { name: "name", label: "NAME", type: "text", placeholder: "Your name" },
              { name: "email", label: "EMAIL", type: "email", placeholder: "your@email.com" },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative"
              >
                <motion.label
                  className="block text-xs tracking-wider text-white/40 mb-2"
                  animate={{
                    color: focusedField === field.name ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {field.label}
                </motion.label>
                <input
                  type={field.type}
                  value={formState[field.name as keyof typeof formState]}
                  onChange={(e) => setFormState({ ...formState, [field.name]: e.target.value })}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm sm:text-base placeholder:text-white/30 focus:outline-none transition-colors"
                  placeholder={field.placeholder}
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <motion.label
                className="block text-xs tracking-wider text-white/40 mb-2"
                animate={{
                  color: isProjectTypeOpen ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
                }}
              >
                PROJECT TYPE
              </motion.label>
              
              {/* Custom Dropdown Button */}
              <button
                type="button"
                onClick={() => setIsProjectTypeOpen(!isProjectTypeOpen)}
                className="w-full bg-transparent border-b border-white/20 py-3 text-left text-white text-base focus:outline-none transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className={formState.projectType ? "text-white" : "text-white/50"}>
                  {formState.projectType 
                    ? projectTypes.find(t => t.value === formState.projectType)?.label 
                    : "Select project type"}
                </span>
                <motion.svg
                  animate={{ rotate: isProjectTypeOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  className="text-white/40"
                >
                  <path fill="currentColor" d="M6 9L1 4h10z" />
                </motion.svg>
              </button>

              {/* Custom Dropdown Menu */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isProjectTypeOpen ? "auto" : 0,
                  opacity: isProjectTypeOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-2 border border-white/10 bg-black max-h-60 overflow-y-auto">
                  {projectTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setFormState({ ...formState, projectType: type.value })
                        setIsProjectTypeOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        formState.projectType === type.value
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 h-px bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isProjectTypeOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <motion.label
                className="block text-xs tracking-wider text-white/40 mb-2"
                animate={{
                  color: focusedField === "message" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
                }}
              >
                MESSAGE
              </motion.label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm sm:text-base placeholder:text-white/30 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full py-4 bg-white text-black font-medium overflow-hidden mt-8"
            >
              {/* Animated border effect */}
              {isButtonHovered && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                  <defs>
                    <linearGradient id="contactBtnGradient" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="30%" stopColor="white" stopOpacity="0.1" />
                      <stop offset="60%" stopColor="white" stopOpacity="0.4" />
                      <stop offset="85%" stopColor="white" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="white" stopOpacity="1" />
                    </linearGradient>
                    <filter id="contactBtnGlow" x="-50%" y="-50%" width="200%" height="200%">
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
                    stroke="url(#contactBtnGradient)"
                    strokeWidth="2"
                    filter="url(#contactBtnGlow)"
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
                className="absolute inset-0 bg-black"
                initial={{ x: "-100%" }}
                animate={{ x: isButtonHovered ? 0 : "-100%" }}
                transition={{ duration: 0.3 }}
              />
              <span className={`relative z-20 ${isButtonHovered ? "text-white" : "text-black"} transition-colors duration-300`}>
                Send Message
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowSuccess(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-md w-full bg-black border border-white/20 p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated border effect */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="successGradient" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="30%" stopColor="white" stopOpacity="0.1" />
                  <stop offset="60%" stopColor="white" stopOpacity="0.4" />
                  <stop offset="85%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="1" />
                </linearGradient>
                <filter id="successGlow" x="-50%" y="-50%" width="200%" height="200%">
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
                stroke="url(#successGradient)"
                strokeWidth="2"
                filter="url(#successGlow)"
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

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 border-2 border-white/10 rounded-full"
                />
                <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path d="M20 6L9 17l-5-5" />
                  </motion.svg>
                </div>
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center relative z-10"
            >
              <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
              <p className="text-white/60 mb-6">
                Thank you for reaching out. I'll get back to you within 24 hours.
              </p>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowSuccess(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-white/20 text-sm hover:bg-white/5 transition-colors"
              >
                Close
              </motion.button>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            />
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
