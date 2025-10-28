"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiUpload, FiCheck, FiX, FiWifi, FiWifiOff } from "react-icons/fi";
import { useApi, InvestmentFormData } from "../context/ApiContext";

export default function InvestmentFormPage() {
  const { submitInvestmentForm, checkServerHealth, baseUrl } = useApi();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    message: "",
  });

  const [receiptFile, setReceiptFile] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [fileError, setFileError] = useState('');
    const [referralSource, setReferralSource] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceContact, setSourceContact] = useState("");
  const [sourceEmail, setSourceEmail] = useState("");
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check server health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const isHealthy = await checkServerHealth();
        setServerStatus(isHealthy ? 'online' : 'offline');
      } catch (error) {
        setServerStatus('offline');
      }
    };

    checkHealth();
  }, [checkServerHealth]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Please upload only JPEG or PNG files');
        setReceiptFile(null);
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setFileError('File size must be less than 5MB');
        setReceiptFile(null);
        return;
      }
      
      setReceiptFile(file);
    } else {
      setReceiptFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fileError) {
      setSubmitStatus("error");
      setSubmitMessage("Fix the file upload error before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      // Prepare form data for API
      const investmentData: InvestmentFormData = {
        ...form,
        referralSource,
        sourceName: sourceName || undefined,
        sourceContact: sourceContact || undefined,
        sourceEmail: sourceEmail || undefined,
      };

      // Submit through API context
      const response = await submitInvestmentForm(investmentData, receiptFile || undefined);

      setSubmitStatus("success");
      setSubmitMessage(
        response.message || "✅ Submitted! Check your email for confirmation."
      );

      // Clear form
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        message: "",
      });
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
      
    } catch (err: any) {
      console.error("Error submitting:", err);
      setSubmitStatus("error");
      setSubmitMessage(
        err.message || "❌ Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Submit Investment Details
            </h2>
            <div className="flex items-center gap-2 text-sm">
              {serverStatus === 'checking' && (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-primary"></div>
                  <span className="text-muted-foreground">Checking server...</span>
                </>
              )}
              {serverStatus === 'online' && (
                <>
                  <FiWifi className="text-green-500" />
                  <span className="text-green-600">Server Online</span>
                </>
              )}
              {serverStatus === 'offline' && (
                <>
                  <FiWifiOff className="text-red-500" />
                  <span className="text-red-600">Server Offline</span>
                </>
              )}
            </div>
          </div>

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
              Upload Payment Receipt (JPEG/PNG only, max 5MB)
            </label>
            <input
              type="file"
              required
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground cursor-pointer file:bg-primary file:text-primary-foreground"
            />
            {fileError && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                <FiX className="text-red-600" />
                {fileError}
              </p>
            )}
            {receiptFile && (
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <FiCheck className="text-green-600" />
                File selected: {receiptFile.name} ({(receiptFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
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

          {/* How did you know about us */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              How did you know about us? *
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name of the source
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter source name"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                />
              </div>

              {/* Source Contact */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter contact number"
                  value={sourceContact}
                  onChange={(e) => setSourceContact(e.target.value)}
                />
              </div>

              {/* Source Email */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mail
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter email address"
                  value={sourceEmail}
                  onChange={(e) => setSourceEmail(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Server Offline Warning */}
          {serverStatus === 'offline' && (
            <div className="mb-6 p-4 rounded-lg flex items-center gap-2 bg-red-50 text-red-800 border border-red-200">
              <FiWifiOff className="text-red-600" />
              <span>Server is currently offline. Please try again later or contact support.</span>
            </div>
          )}

          {/* Status Message */}
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              submitStatus === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitStatus === 'success' ? <FiCheck className="text-green-600" /> : <FiX className="text-red-600" />}
              <span>{submitMessage}</span>
            </div>
          )}



          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || serverStatus === 'offline'}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Submitting...
              </>
            ) : (
              <>
                <FiSend /> Submit Investment Details
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
