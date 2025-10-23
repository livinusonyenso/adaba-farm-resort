"use client"

import { motion } from "framer-motion"
import { User, LogOut } from "lucide-react"

export default function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back, Investor</h1>
        <p className="text-muted">Monitor your investments and track your returns in real-time.</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-3 bg-surface rounded-full hover:bg-background transition-colors">
          <User size={20} className="text-primary" />
        </button>
        <button className="p-3 bg-surface rounded-full hover:bg-background transition-colors">
          <LogOut size={20} className="text-primary" />
        </button>
      </div>
    </motion.div>
  )
}
