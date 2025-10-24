"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi"
import Image from "next/image"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const phone = "2348139422159" // ✅ your WhatsApp number (NO +)
    const url = `https://wa.me/${phone}?text=Hello,%0AI am ${form.name}.%0AMy Email: ${form.email}%0A${form.message}`

    window.open(url, "_blank")
  }

  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-4xl md:text-5xl font-bold text-primary"
        >
          Contact Us
        </motion.h2>

        <p className="text-center mt-4 text-gray-600 max-w-xl mx-auto">
          Have questions about investing in Àdàbà Coconut Farm Estate?
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10 mt-16">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <FiMail className="text-primary text-2xl" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>support@adabafarm.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiPhone className="text-primary text-2xl" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p>+234 812 345 6789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiMapPin className="text-primary text-2xl" />
              <div>
                <h4 className="font-semibold">Address</h4>
                <p>Owode, Ogun State, Nigeria</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-primary/10 backdrop-blur p-8 rounded-xl shadow-sm"
          >
            <div className="mb-5">
              <label className="block font-medium">Full Name</label>
              <input
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-white border mt-1"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-5">
              <label className="block font-medium">Email</label>
              <input
                required
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-lg bg-white border mt-1"
                placeholder="email@example.com"
              />
            </div>

            <div className="mb-5">
              <label className="block font-medium">Message</label>
              <textarea
                required
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 rounded-lg bg-white border mt-1"
                rows={4}
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg w-full font-semibold hover:bg-green-700 transition"
            >
              <FiSend /> Contact via WhatsApp
            </button>
          </motion.form>
        </div>

        {/* 🔥 Estate Visit Section */}
        <div className="mt-28 bg-green-700 text-white p-10 rounded-xl relative overflow-hidden">
          <h3 className="text-3xl font-bold">Visit the Estate</h3>
          <p className="mt-2 max-w-md">
            Come and experience the natural beauty and agricultural potential of Adaba Coconut Farm Estate.
          </p>

          <a
            href="https://wa.me/2348123456789?text=I want to book an estate inspection"
            target="_blank"
            className="inline-block mt-5 bg-white text-green-700 font-semibold px-6 py-3 rounded-full"
          >
            Book a site inspection today!
          </a>

          <Image
            src="/bus.png"
            width={450}
            height={250}
            alt="Estate Bus"
            className="absolute right-0 bottom-0"
          />
        </div>

        {/* 💳 Account Details */}
        <div className="mt-20 bg-green-800 text-white text-center p-10 rounded-xl">
          <h3 className="text-3xl font-bold">Account Details</h3>

          <p className="mt-6 text-sm opacity-70">ACCT. NUMBER</p>
          <h2 className="text-5xl font-extrabold tracking-wider">2007301592</h2>

          <div className="mt-6">
            <p className="bg-white text-green-800 font-bold inline-block px-5 py-2 rounded-full">
              Bank
            </p>
            <h2 className="text-4xl mt-2 font-bold">FCMB</h2>
          </div>

          <div className="mt-6">
            <p className="bg-white text-green-800 font-bold inline-block px-5 py-2 rounded-full">
              ACCT. Name
            </p>
            <h2 className="text-4xl mt-2 font-bold">KAZFIELD</h2>
            <p className="opacity-80">INTEGRATED SERVICE LTD</p>
          </div>
        </div>

      </div>
    </section>
  )
}
