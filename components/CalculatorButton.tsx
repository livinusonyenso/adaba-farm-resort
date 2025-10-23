"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator } from "lucide-react"
import ROICalculator from "./ROICalculator"

export default function CalculatorButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center gap-2"
        title="Open ROI Calculator"
      >
        <Calculator size={24} />
        <span className="hidden sm:inline font-semibold">Calculator</span>
      </motion.button>

      <ROICalculator isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
