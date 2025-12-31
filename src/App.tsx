import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { StudentsSection } from "@/components/sections/students-section"
import { TechStackSection } from "@/components/sections/tech-stack-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SVGBackground } from "@/components/svg-background"

function App() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <SVGBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StudentsSection />
      <TechStackSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default App
