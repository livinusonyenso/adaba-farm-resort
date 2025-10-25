"use client"

import { motion } from "framer-motion"
import { Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-6"
      >
        <div className="bg-surface rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Lock size={40} className="text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold text-primary mb-4">Access Denied</h1>
        <p className="text-muted mb-8 leading-relaxed">
          You don't have permission to access the dashboard at this time. 
          Please contact support or try again later.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          <ArrowLeft size={20} />
          Return Home
        </Link>
      </motion.div>
    </div>
  )
}
