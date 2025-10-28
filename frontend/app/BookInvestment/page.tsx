"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Send } from "lucide-react"

export default function BookInvestmentPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [receiptFile, setReceiptFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!receiptFile) {
      alert("Please upload a payment receipt!")
      return
    }

    const message = `
📌 New Investment Submission

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}

✅ Receipt Attached
`

    const whatsapp = `https://wa.me/2348130000000?text=${encodeURIComponent(message)}`
    window.open(whatsapp, "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="section-container">
          {/* TOP HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              Complete Your Investment
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-primary">
              Make a secure transfer to the account below and upload your payment receipt to confirm your investment.
            </p>
          </motion.div>

          {/* MAX WIDTH BOX */}
          <div className="max-w-2xl mx-auto space-y-8">
            
            {/* BANK DETAILS */}
            <div className="bg-white shadow-lg rounded-xl p-6 border">
              <h3 className="text-xl font-bold text-primary mb-2">Bank Transfer Details</h3>
              <div className="space-y-1 text-primary">
                <p><strong>Account Name:</strong> Adaba Coconut Farm LTD</p>
                <p><strong>Account Number:</strong> 0123456789</p>
                <p><strong>Bank:</strong> GTBank</p>
              </div>
              <p className="text-sm text-gray-500 mt-3 italic">
                Transfer first, then submit the receipt below.
              </p>
            </div>

            {/* FORM */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/90 shadow-xl rounded-xl p-8 border backdrop-blur"
            >
              <div className="grid gap-6">

                {/* NAME */}
                <div>
                  <label className="block font-medium text-primary mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    className="input"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block font-medium text-primary mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    className="input"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block font-medium text-primary mb-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    className="input"
                    placeholder="0803 456 7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* RECEIPT */}
                <div>
                  <label className="block font-medium text-primary mb-2">Upload Receipt</label>
                  <div className="border rounded-lg py-3 px-4 bg-white flex items-center gap-3">
                    <Upload className="text-primary opacity-70" />
                    <input
                      required
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white w-full py-3 rounded-xl flex justify-center items-center gap-2 text-lg font-semibold"
                >
                  Submit Receipt <Send size={18} />
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
