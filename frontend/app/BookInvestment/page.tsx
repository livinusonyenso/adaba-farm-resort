"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send } from "lucide-react";
import ContactPage from "../contact/page";
import InvestmentFormPage from "@/components/ContactPage";

export default function BookInvestmentPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!receiptFile) {
      alert("Please upload a payment receipt!");
      return;
    }

    const message = `
📌 New Investment Submission

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}

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
      <InvestmentFormPage />
      <ContactPage />

      <Footer />
    </main>
  );
}
