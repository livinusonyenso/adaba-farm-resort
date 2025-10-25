"use client"

import { motion } from "framer-motion"
import { Search, Edit, Trash2, Eye } from "lucide-react"
import { useState } from "react"

const investors = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    plan: "Premium",
    amount: "₦2,000,000",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Elite",
    amount: "₦5,000,000",
    status: "Active",
    joinDate: "2024-03-20",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    plan: "Starter",
    amount: "₦3,700,000",
    status: "Pending",
    joinDate: "2024-10-01",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@example.com",
    plan: "Premium",
    amount: "₦2,500,000",
    status: "Active",
    joinDate: "2024-05-10",
  },
]

export default function InvestorManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInvestors = investors.filter(
    (inv) =>
      inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">Investor Management</h3>
        <button className="btn-primary">Add Investor</button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-3 text-muted" size={20} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold text-foreground">Name</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Email</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Plan</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Amount</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Join Date</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestors.map((inv, idx) => (
              <motion.tr
                key={inv.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-border hover:bg-background transition-colors"
              >
                <td className="py-4 px-4 font-semibold text-foreground">{inv.name}</td>
                <td className="py-4 px-4 text-muted">{inv.email}</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {inv.plan}
                  </span>
                </td>
                <td className="py-4 px-4 text-foreground font-semibold">{inv.amount}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      inv.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-muted">{inv.joinDate}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-background rounded-lg transition-colors" title="View">
                      <Eye size={18} className="text-primary" />
                    </button>
                    <button className="p-2 hover:bg-background rounded-lg transition-colors" title="Edit">
                      <Edit size={18} className="text-primary" />
                    </button>
                    <button className="p-2 hover:bg-background rounded-lg transition-colors" title="Delete">
                      <Trash2 size={18} className="text-error" />
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
