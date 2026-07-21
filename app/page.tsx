import Hero from "@/components/sections/home/hero"
import StatsGrid from "@/components/sections/home/stats-grid"
import dynamic from "next/dynamic"
import { getUnits, getGlobalStats } from "@/lib/data"

const QuickAccess = dynamic(() => import("@/components/sections/home/quick-access"))
const Features = dynamic(() => import("@/components/sections/home/features"))
const FeaturedUnits = dynamic(() => import("@/components/sections/home/featured-units"))
const Difficulty = dynamic(() => import("@/components/sections/home/difficulty"))
const Testimonials = dynamic(() => import("@/components/sections/home/testimonials"))
const CTABento = dynamic(() => import("@/components/sections/home/cta-bento"))

export default function HomePage() {
  const stats = getGlobalStats()
  const units = getUnits()

  return (
    <>
      <Hero stats={stats} />
      <StatsGrid stats={stats} />
      <QuickAccess />
      <Features />
      <FeaturedUnits featuredUnits={units.slice(0, 6)} />
      <Difficulty stats={stats} />
      <Testimonials />
      <CTABento />
    </>
  )
}
