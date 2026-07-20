"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { PageHeader } from "@/components/common/page-header"
import { UnitCard } from "@/components/units/unit-card"
import { getUnits } from "@/lib/data"
import { useTracking } from "@/hooks/use-tracking"

export default function UnitsPage() {
  const units = useMemo(() => getUnits(), [])
  const { getUnitProgress } = useTracking()

  return (
    <div className="pb-16 min-h-screen">
      <Container className="py-8">
        <PageHeader
          title="All Units"
          badge="Java OOP"
          description={`${units.length} units covering the complete BITM 2nd semester Java OOP syllabus.`}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {units.map((unit) => (
            <motion.div
              key={unit.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
            >
              <UnitCard unit={unit} progress={getUnitProgress(unit.id)} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  )
}
