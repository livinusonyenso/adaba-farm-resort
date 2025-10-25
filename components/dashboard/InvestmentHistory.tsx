"use client"

import { motion } from "framer-motion"
import { Download, Eye } from "lucide-react"

const investments = [
  {
    id: 1,
    plan: "Premium",
    amount: "₦2,000,000",
    date: "2024-01-15",
    roi: "30%",
    status: "Active",
    nextPayout: "2024-11-15",
  },
  {
    id: 2,
    plan: "Starter",
    amount: "₦3,700,000",
    date: "2024-03-20",
    roi: "25%",
    status: "Active",
    nextPayout: "2024-12-20",
  },
  {
    id: 3,
    plan: "Elite",
    amount: "₦5,000,000",
    date: "2024-06-10",
    roi: "35%",
    status: "Active",
    nextPayout: "2024-10-10",
  },
]

export default function InvestmentHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card overflow-hidden"
    >
      <h3 className="text-2xl font-bold text-primary mb-6">Your Investments</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold text-foreground">Plan</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Amount</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Date</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">ROI</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Next Payout</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv, idx) => (
              <motion.tr
                key={inv.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-border hover:bg-background transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-semibold text-primary">{inv.plan}</span>
                </td>
                <td className="py-4 px-4 text-foreground">{inv.amount}</td>
                <td className="py-4 px-4 text-muted">{inv.date}</td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-accent">{inv.roi}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-semibold">
                    {inv.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-muted">{inv.nextPayout}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-background rounded-lg transition-colors" title="View details">
                      <Eye size={18} className="text-primary" />
                    </button>
                    <button
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                      title="Download certificate"
                    >
                      <Download size={18} className="text-primary" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
