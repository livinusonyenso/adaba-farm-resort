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
    question: "What is the name of the company developing Àdàbà Farm and Resort?",
    answer:
      "Kazfield Integrated Services Limited — a duly incorporated firm under the Corporate Affairs Commission (CAC).",
  },
  {
    question: "Where is Àdàbà Farm and Resort located?",
    answer:
      "Àdàbà Farm and Resort is situated at Owode Obafe, less than 30 minutes from Shagamu, Ogun State, on approved farmland.",
  },
  {
    question: "Who will manage the farm for me?",
    answer:
      "The Àdàbà management team will oversee the farm operations, while investors are welcome to visit periodically. Note: The management bears the cost for the first 4 years, after which 30% will be deducted annually from proceeds to cover maintenance, processing, marketing, sales, and logistics starting from the first harvest year.",
  },
  {
    question: "What type of coconut are you planting, and how long before it starts fruiting?",
    answer:
      "We are planting hybrid coconut varieties, which typically begin fruiting within 3 to 4 years. In rare cases due to climate conditions, fruiting may extend to 5 years.",
  },
  {
    question: "When do I start earning returns from the farm?",
    answer:
      "Projected returns are expected to begin between the 4th and 5th year after planting, once the trees start fruiting.",
  },
  {
    question: "What is the expected fruiting ratio for each coconut tree?",
    answer:
      "Each hybrid coconut tree can produce between 150 to 200 nuts annually under optimal farm conditions.",
  },
  {
    question: "What are the risks involved, and how are they managed?",
    answer:
      "Potential risks include:\n1. Economic instability, which may affect selling prices.\n2. Changes in government policies.\n3. Theft.\n\nHowever, our legal and survey teams have confirmed that the land is free from any government encumbrances. We also have CCTV installations and on-site security personnel to ensure maximum protection.",
  },
  {
    question: "If I want to visit the project, how do I go about it?",
    answer:
      "We organize four (4) official farm visits each year — one per quarter. Investors can join any of the visits by sending an email to our support team for scheduling and logistics.",
  },
];


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
            Find answers to common questions about investing with Àdàbà.
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
