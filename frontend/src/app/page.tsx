import { Navbar } from '@/components/home/navbar'
import { HeroSection } from '@/components/home/hero'
import { FeaturesSection } from '@/components/home/features'
import { StatsSection } from '@/components/home/stats'
import { HowItWorksSection } from '@/components/home/how-it-works'
import { PricingSection } from '@/components/home/pricing'
import { CTASection } from '@/components/home/cta'
import { Footer } from '@/components/home/footer'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 flex-1 flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  )
}
