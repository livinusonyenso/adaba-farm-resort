"use client"

import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const investmentTrend = [
  { month: "Jan", investors: 200, amount: 100 },
  { month: "Feb", investors: 350, amount: 175 },
  { month: "Mar", investors: 520, amount: 260 },
  { month: "Apr", investors: 750, amount: 375 },
  { month: "May", investors: 950, amount: 475 },
  { month: "Jun", investors: 1247, amount: 620 },
]

const planDistribution = [
  { name: "Starter", value: 400 },
  { name: "Premium", value: 600 },
  { name: "Elite", value: 247 },
]

const COLORS = ["#2e7d32", "#fbc02d", "#4e342e"]

export default function AdminCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Investment Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="card"
      >
        <h3 className="text-xl font-bold text-primary mb-6">Investment Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={investmentTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" stroke="#757575" />
            <YAxis stroke="#757575" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="investors" stroke="#2e7d32" strokeWidth={2} name="New Investors" />
            <Line type="monotone" dataKey="amount" stroke="#fbc02d" strokeWidth={2} name="Amount (₦100M)" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Plan Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="card"
      >
        <h3 className="text-xl font-bold text-primary mb-6">Plan Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={planDistribution} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8">
              {planDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
