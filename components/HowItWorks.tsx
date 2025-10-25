"use client"

import { motion } from "framer-motion"
import { Users, FileCheck, TrendingUp, Award } from "lucide-react"

const steps = [
  {
    icon: Users,
    title: "Register & Verify",
    description: "Create your account and complete verification in minutes.",
  },
  {
    icon: FileCheck,
    title: "Choose Your Plan",
    description: "Select an investment plan that matches your financial goals.",
  },
  {
    icon: TrendingUp,
    title: "Monitor Progress",
    description: "Track your investment and farm progress in real-time via dashboard.",
  },
  {
    icon: Award,
    title: "Receive Returns",
    description: "Enjoy regular ROI payouts directly to your account.",
  },
]

export default function HowItWorks() {
  return (
    <section  className="py-20 bg-primary/5">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
        
          <p className="text-lg  max-w-2xl mx-auto text-primary">
            Simple, transparent, and secure. Get started in four easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-primary to-accent transform translate-y-0" />
                )}

                {/* Card */}
                <div className="relative z-10 bg-surface rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-mutedtext-primary text-sm">{step.description}</p>
                  <div className="mt-4 text-2xl font-bold text-accent">{idx + 1}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
