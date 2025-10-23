"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.pexels.com/photos/2724078/pexels-photo-2724078.jpeg"
        alt="Adaba Coconut Farm"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-primary/30" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Invest in Sustainable <span className="text-secondary">Coconut Farming</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of investors growing their wealth through Adaba's hybrid coconut farm. Transparent returns,
            real-time updates, and sustainable growth.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Investing
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#plans"
                className="inline-block px-8 py-4 bg-white/20 text-white font-bold rounded-xl border-2 border-white hover:bg-white/30 transition-all duration-300"
              >
                View Plans
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
