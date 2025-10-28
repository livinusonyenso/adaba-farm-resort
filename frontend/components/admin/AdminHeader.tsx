"use client"

import { motion } from "framer-motion"
import { Settings, Bell, User } from "lucide-react"

export default function AdminHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-muted">Manage investors, content, and farm operations.</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-3 bg-surface rounded-full hover:bg-background transition-colors relative">
          <Bell size={20} className="text-primary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        </button>
        <button className="p-3 bg-surface rounded-full hover:bg-background transition-colors">
          <Settings size={20} className="text-primary" />
        </button>
        <button className="p-3 bg-surface rounded-full hover:bg-background transition-colors">
          <User size={20} className="text-primary" />
        </button>
      </div>
    </motion.div>
  )
}
