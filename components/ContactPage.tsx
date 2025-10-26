"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiUpload } from "react-icons/fi";

export default function InvestmentFormPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    message: "",
  });

  const [receiptFile, setReceiptFile] = useState<any>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const phone = "2348164371968";
    const url = `https://wa.me/${phone}?text=Hello,%0AI want to confirm my investment.%0A
Full Name: ${form.name}%0A
Email: ${form.email}%0A
Phone: ${form.phone}%0A
Address: ${form.address}%0A
Gender: ${form.gender}%0A
Message: ${form.message}%0A`;

    window.open(url, "_blank");
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* ================== ACCOUNT DETAILS ================== */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-card border border-border rounded-xl p-8 shadow-sm mb-12"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
            Investment Payment Details
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Account Number */}
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                ACCOUNT NUMBER
              </p>
              <h3 className="text-3xl font-bold font-mono text-foreground">
                2007301592
              </h3>
            </div>

            {/* Bank */}
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                BANK
              </p>
              <h3 className="text-3xl font-bold text-foreground">FCMB</h3>
            </div>

            {/* Account Name */}
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                ACCOUNT NAME
              </p>
              <h3 className="text-xl font-bold text-foreground">KAZFIELD</h3>
              <p className="text-xs text-muted-foreground mt-1">
                INTEGRATED SERVICE LTD
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================== INVESTMENT FORM ================== */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Submit Investment Details
          </h2>

          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              required
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="email@example.com"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <input
              required
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="+234 801 234 5678"
            />
          </div>

          {/* Address */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Address
            </label>
            <input
              required
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="City, State"
            />
          </div>

          {/* Gender */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Gender
            </label>
            <select
              required
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Receipt Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload Payment Receipt
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setReceiptFile(e.target.files?.[0])}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground cursor-pointer file:bg-primary file:text-primary-foreground"
            />
          </div>

          {/* Additional Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Message (Optional)
            </label>
            <textarea
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={4}
              placeholder="Any details we should know?"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            <FiSend /> Submit & Confirm on WhatsApp
          </button>
        </motion.form>
      </div>
    </section>
  );
}
