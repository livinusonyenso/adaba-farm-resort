"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is the minimum investment amount?",
    answer:
      "The minimum investment starts at ₦500,000 for our Starter plan. We offer flexible options to suit different investment capacities.",
  },
  {
    question: "How often will I receive ROI payouts?",
    answer:
      "ROI payouts depend on your plan: Starter (quarterly), Premium (monthly), and Elite (weekly). All payouts are made directly to your registered bank account.",
  },
  {
    question: "Is my investment insured?",
    answer:
      "Yes, all investments are protected by our comprehensive insurance policy. We also maintain transparent records and regular third-party audits.",
  },
  {
    question: "Can I withdraw my investment early?",
    answer:
      "Early withdrawal is possible with a 10% penalty. We recommend contacting our support team to discuss your specific situation.",
  },
  {
    question: "How do I track my farm progress?",
    answer:
      "You can monitor real-time farm updates, ROI calculations, and progress reports through your investor dashboard. We also send monthly newsletters.",
  },
  {
    question: "What happens after the investment period ends?",
    answer:
      "Upon completion, you receive your full principal plus final ROI payout. You can then choose to reinvest or withdraw your funds.",
  },
]

interface AccordionItemProps {
  item: FAQItem
  index: number
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-surface hover:bg-background transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-left font-semibold text-foreground">{item.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} className="text-primary flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border"
          >
            <div className="px-6 py-4 bg-background text-primary">{item.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-primary">
            Find answers to common questions about investing with Adaba.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              item={faq}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
