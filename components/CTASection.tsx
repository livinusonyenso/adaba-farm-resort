"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join hundreds of successful investors who are already growing their wealth with Adaba. Secure, transparent,
            and profitable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-4 bg-secondary text-foreground font-bold rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Investing Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/book-visit"
                className="inline-block px-8 py-4 bg-white/20 text-white font-bold rounded-xl border-2 border-white hover:bg-white/30 transition-all duration-300"
              >
                Book a Farm Visit
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
