"use client"

import { motion } from "framer-motion"
import { TrendingUp, DollarSign, Leaf, Award } from "lucide-react"

const stats = [
  {
    icon: DollarSign,
    label: "Total Invested",
    value: "₦2,500,000",
    change: "+12.5%",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    label: "Current Returns",
    value: "₦625,000",
    change: "+8.2%",
    color: "text-accent",
  },
  {
    icon: Leaf,
    label: "Active Investments",
    value: "3",
    change: "2 Premium, 1 Elite",
    color: "text-secondary",
  },
  {
    icon: Award,
    label: "ROI Performance",
    value: "28.5%",
    change: "Above average",
    color: "text-primary",
  },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-background rounded-lg ${stat.color}`}>
                <Icon size={24} />
              </div>
              <span className="text-sm font-semibold text-primary">{stat.change}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
