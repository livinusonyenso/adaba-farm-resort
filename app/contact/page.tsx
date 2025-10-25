"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi"
import Image from "next/image"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })


  const handleSubmit = (e: any) => {
    e.preventDefault()

    const phone = "2348139422159"
    const url = `https://wa.me/${phone}?text=Hello,%0AI am ${form.name}.%0AMy Email: ${form.email}%0A${form.message}`

    window.open(url, "_blank")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about investing in Àdàbà Coconut Farm Estate? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {/* Contact Info Cards */}
          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FiMail className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Email</h3>
            </div>
            <p className="text-muted-foreground">support@adabafarm.com</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FiPhone className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Phone</h3>
            </div>
            <p className="text-muted-foreground">+234 812 345 6789</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FiMapPin className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Address</h3>
            </div>
            <p className="text-muted-foreground">Owode, Ogun State, Nigeria</p>
          </motion.div>
        </motion.div>

        {/* Contact Form & Estate Visit */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                required
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="email@example.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                required
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                rows={5}
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              <FiSend /> Contact via WhatsApp
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-primary text-primary-foreground rounded-xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">Visit the Estate</h2>
              <p className="text-primary-foreground/90 mb-6">
                Come and experience the natural beauty and agricultural potential of Àdàbà Coconut Farm Estate.
              </p>

              <a
                href="https://wa.me/2348123456789?text=I want to book an estate inspection"
                target="_blank"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary-foreground/90 transition"
                rel="noreferrer"
              >
                Book Inspection
              </a>
            </div>

            <Image
              src="/bus.png"
              width={300}
              height={200}
              alt="Estate Bus"
              className="absolute right-0 bottom-0 opacity-80"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Bank Account Details</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Account Number */}
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">ACCOUNT NUMBER</p>
              <h3 className="text-3xl font-bold text-foreground font-mono">2007301592</h3>
            </div>

            {/* Bank */}
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">BANK</p>
              <h3 className="text-3xl font-bold text-foreground">FCMB</h3>
            </div>

            {/* Account Name */}
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">ACCOUNT NAME</p>
              <h3 className="text-2xl font-bold text-foreground">KAZFIELD</h3>
              <p className="text-sm text-muted-foreground mt-1">INTEGRATED SERVICE LTD</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
