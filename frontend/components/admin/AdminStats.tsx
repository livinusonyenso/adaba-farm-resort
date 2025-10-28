"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Total Investors",
    value: "1,247",
    change: "+45 this month",
    color: "text-primary",
  },
  {
    icon: DollarSign,
    label: "Total Invested",
    value: "₦2.4B",
    change: "+₦180M this month",
    color: "text-accent",
  },
  {
    icon: TrendingUp,
    label: "Average ROI",
    value: "28.5%",
    change: "Above target",
    color: "text-success",
  },
  {
    icon: AlertCircle,
    label: "Pending Approvals",
    value: "23",
    change: "Requires attention",
    color: "text-warning",
  },
]

export default function AdminStats() {
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
            </div>
            <p className="text-muted text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
            <p className="text-xs text-muted">{stat.change}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
