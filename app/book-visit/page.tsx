"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BookingForm from "@/components/BookingForm"
import { motion } from "framer-motion"

export default function BookVisitPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">Book Your Farm Visit</h1>
            <p className="text-lg  max-w-2xl mx-auto text-primary">
              Experience our state-of-the-art facilities firsthand. Schedule a guided tour of Àdàbà Coconut Farm.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
