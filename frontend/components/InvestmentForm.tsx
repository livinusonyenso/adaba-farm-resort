"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send } from "lucide-react";
import { useApi, InvestmentFormData } from "../context/ApiContext";

export default function BookInvestmentPage() {
  const { submitInvestmentForm } = useApi();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [referralSource, setReferralSource] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceContact, setSourceContact] = useState("");
  const [sourceEmail, setSourceEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!receiptFile) {
      alert("Please upload a payment receipt!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for API
      const investmentData: InvestmentFormData = {
        name: fullName,
        email,
        phone,
        address: "", // Add address field if needed
        gender: "", // Add gender field if needed
        message: "", // Add message field if needed
        referralSource,
        sourceName: sourceName || undefined,
        sourceContact: sourceContact || undefined,
        sourceEmail: sourceEmail || undefined,
      };

      // Submit through API context
      const response = await submitInvestmentForm(investmentData, receiptFile);
      
      alert(response.message || "Investment submission sent successfully! Check your email for confirmation.");
      
      // Clear form
      setFullName("");
      setEmail("");
      setPhone("");
      setReceiptFile(null);
      setReferralSource("");
      setSourceName("");
      setSourceContact("");
      setSourceEmail("");
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
    } catch (error: any) {
      console.error("Error sending submission:", error);
      alert(error.message || "Failed to send submission. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }

    // Also send WhatsApp message
    const message = `
📌 New Investment Submission

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}

📋 Referral Information:
How did you know about us: ${referralSource}
${sourceName ? `Source Name: ${sourceName}` : ''}
${sourceContact ? `Source Contact: ${sourceContact}` : ''}
${sourceEmail ? `Source Email: ${sourceEmail}` : ''}

✅ Receipt Attached
`;

    const whatsapp = `https://wa.me/2348130000000?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsapp, "_blank");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="section-container">
          {/* HEADER */}
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
              Make payment into the account below and upload your receipt.
            </p>
          </motion.div>

          {/* BANK DETAILS */}
          <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-8 border">
            <h3 className="text-xl font-bold text-primary mb-2">
              Bank Transfer Details
            </h3>

            <div className="space-y-1 text-primary">
              <p>
                <strong>Account Name:</strong> Adaba Coconut Farm LTD
              </p>
              <p>
                <strong>Account Number:</strong> 0123456789
              </p>
              <p>
                <strong>Bank:</strong> GTBank
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-3 italic">
              Transfer first, then submit receipt below.
            </p>
          </div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto bg-white/90 shadow-xl rounded-xl p-8 border backdrop-blur"
          >
            <div className="grid gap-6">
              {/* Full Name */}
              <div>
                <label className="block font-medium text-primary mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  className="input"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-primary mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium text-primary mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="0803 456 7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* How did you know about us */}
              <div>
                <label className="block font-medium text-primary mb-1">
                  How did you know about us? *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friend/Family">Friend/Family</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Event">Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Referral Source Details - Show only if "Referral" is selected */}
              {referralSource === "Referral" && (
                <>
                  {/* Source Name */}
                  <div>
                    <label className="block font-medium text-primary mb-1">
                      Name of the source
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      placeholder="Enter source name"
                      value={sourceName}
                      onChange={(e) => setSourceName(e.target.value)}
                    />
                  </div>

                  {/* Source Contact */}
                  <div>
                    <label className="block font-medium text-primary mb-1">
                      Contact
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      placeholder="Enter contact number"
                      value={sourceContact}
                      onChange={(e) => setSourceContact(e.target.value)}
                    />
                  </div>

                  {/* Source Email */}
                  <div>
                    <label className="block font-medium text-primary mb-1">
                      Mail
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      placeholder="Enter email address"
                      value={sourceEmail}
                      onChange={(e) => setSourceEmail(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Receipt Upload */}
              <div>
                <label className="block font-medium text-primary mb-2">
                  Upload Receipt
                </label>
                <div className="border rounded-lg py-3 px-4 bg-white flex items-center gap-3">
                  <Upload className="text-primary opacity-70" />
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    required
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) =>
                      setReceiptFile(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="bg-primary text-white w-full py-3 rounded-xl flex justify-center items-center gap-2 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Receipt <Send size={18} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
