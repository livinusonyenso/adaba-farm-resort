"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Clock, CheckCircle } from "lucide-react"

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    visitDate: "",
    visitTime: "",
    numberOfGuests: "1",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        visitDate: "",
        visitTime: "",
        numberOfGuests: "1",
        message: "",
      })
    }, 3000)
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-success" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Booking Confirmed!</h3>
        <p className="text-muted mb-4">
          Thank you for booking your farm visit. We'll send you a confirmation email shortly with all the details.
        </p>
        <p className="text-sm text-muted">Redirecting you back...</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="card space-y-6"
    >
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary">Personal Information</h3>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+234 XXX XXX XXXX"
            />
          </div>
        </div>
      </div>

      {/* Visit Details */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-xl font-bold text-primary">Visit Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              Preferred Date
            </label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              Preferred Time
            </label>
            <select
              name="visitTime"
              value={formData.visitTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Users size={16} className="text-primary" />
            Number of Guests
          </label>
          <select
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Message */}
      <div className="space-y-4 pt-4 border-t border-border">
        <label className="block text-sm font-semibold text-foreground mb-2">Additional Message (Optional)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tell us about your interests or any special requests..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full btn-primary py-4 text-lg font-bold"
      >
        Confirm Booking
      </motion.button>

      <p className="text-xs text-muted text-center">
        We'll send you a confirmation email with all the details about your farm visit.
      </p>
    </motion.form>
  )
}
