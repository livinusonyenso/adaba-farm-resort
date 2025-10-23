import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import InvestmentPlans from "@/components/InvestmentPlans"
import HowItWorks from "@/components/HowItWorks"
import FAQSection from "@/components/FAQSection"
import GallerySection from "@/components/GallerySection"
import CTASection from "@/components/CTASection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <InvestmentPlans />
      <HowItWorks />
      <GallerySection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
