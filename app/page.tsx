import Hero from "@/components/sections/home/hero"
import StatsGrid from "@/components/sections/home/stats-grid"
import QuickAccess from "@/components/sections/home/quick-access"
import Features from "@/components/sections/home/features"
import FeaturedUnits from "@/components/sections/home/featured-units"
import Difficulty from "@/components/sections/home/difficulty"
import Testimonials from "@/components/sections/home/testimonials"
import CTABento from "@/components/sections/home/cta-bento"
import { getUnits, getGlobalStats } from "@/lib/data"

export default function HomePage() {
  const stats = getGlobalStats()
  const units = getUnits()

  return (
    <>
      <Hero stats={stats} />
      <StatsGrid stats={stats} />
      <QuickAccess />
      <Features />
      <FeaturedUnits featuredUnits={units.slice(0, 6)} getUnitProgress={() => ({ completed: 0, total: 0, percentage: 0 })} />
      <Difficulty stats={stats} />
      <Testimonials />
      <CTABento />
    </>
  )
}
