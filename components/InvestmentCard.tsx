"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface InvestmentCardProps {
  title: string
  acreage: number
  price: number
  roi: number
  duration: string
  features: string[]
  isPopular?: boolean
  index?: number
}

export default function InvestmentCard({
  title,
  acreage,
  price,
  roi,
  duration,
  features,
  isPopular = false,
  index = 0,
}: InvestmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(46, 125, 50, 0.15)" }}
      className={`card relative overflow-hidden ${isPopular ? "ring-2 ring-accent md:scale-105" : ""}`}
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold"
        >
          Most Popular
        </motion.div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{acreage} acres of premium land</p>
      </div>

      {/* Price and ROI */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
        <div>
          <p className="text-muted-foreground text-sm mb-1">Investment</p>
          <p className="text-2xl font-bold text-primary">₦{price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-1">Expected ROI</p>
          <p className="text-2xl font-bold text-secondary">{roi}%</p>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <p className="text-muted-foreground text-sm mb-1">Investment Duration</p>
        <p className="text-lg font-semibold text-foreground">{duration}</p>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
          isPopular
            ? "bg-primary text-white hover:opacity-90"
            : "bg-background text-primary border-2 border-primary hover:bg-primary hover:text-white"
        }`}
      >
        Invest Now
      </motion.button>
    </motion.div>
  )
}
