"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ROICalculatorProps {
  isOpen: boolean
  onClose: () => void
}

export default function ROICalculator({ isOpen, onClose }: ROICalculatorProps) {
  const [acreage, setAcreage] = useState(1)
  const [duration, setDuration] = useState(2)

  const pricePerAcre = 1000000 // ₦1M per acre
  const roiRates: Record<number, number> = {
    2: 25,
    3: 30,
    5: 35,
  }

  const totalInvestment = acreage * pricePerAcre
  const roiRate = roiRates[duration] || 25
  const totalReturn = totalInvestment * (1 + roiRate / 100)
  const profit = totalReturn - totalInvestment
  const monthlyReturn = profit / (duration * 12)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-primary/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">ROI Calculator</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-background rounded-lg transition-colors"
                aria-label="Close calculator"
              >
                <X size={24} className="text-foreground" />
              </button>
            </div>

            {/* Acreage Slider */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Acreage: <span className="text-primary text-lg">{acreage}</span> acres
              </label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={acreage}
                onChange={(e) => setAcreage(Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0.5 acres</span>
                <span>10 acres</span>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">Investment Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 3, 5].map((year) => (
                  <button
                    key={year}
                    onClick={() => setDuration(year)}
                    className={`py-2 rounded-lg font-semibold transition-all ${
                      duration === year
                        ? "bg-primary text-white"
                        : "bg-background text-foreground hover:bg-background/80"
                    }`}
                  >
                    {year} years
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Investment:</span>
                <span className="font-bold text-foreground">₦{totalInvestment.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">ROI Rate:</span>
                <span className="font-bold text-accent">{roiRate}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Profit:</span>
                <span className="font-bold text-primary">₦{profit.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Return:</span>
                <span className="font-bold text-primary">₦{monthlyReturn.toLocaleString()}</span>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 mt-6">
                <p className="text-sm text-foreground">
                  <span className="font-bold">Total Return:</span> ₦{totalReturn.toLocaleString()}
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full btn-primary mt-6"
            >
              Invest Now
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
