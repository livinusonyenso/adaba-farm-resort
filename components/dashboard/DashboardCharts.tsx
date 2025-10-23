"use client"

import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const roiData = [
  { month: "Jan", roi: 15000, projected: 18000 },
  { month: "Feb", roi: 22000, projected: 24000 },
  { month: "Mar", roi: 28000, projected: 30000 },
  { month: "Apr", roi: 35000, projected: 38000 },
  { month: "May", roi: 42000, projected: 45000 },
  { month: "Jun", roi: 50000, projected: 52000 },
]

const farmData = [
  { name: "Coconuts Harvested", value: 15000 },
  { name: "Processing Yield", value: 12000 },
  { name: "Quality Grade A", value: 10000 },
  { name: "Exported Units", value: 8000 },
]

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ROI Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="card"
      >
        <h3 className="text-xl font-bold text-primary mb-6">ROI Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={roiData}>
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
            <Line type="monotone" dataKey="roi" stroke="#2e7d32" strokeWidth={2} name="Actual ROI" />
            <Line type="monotone" dataKey="projected" stroke="#fbc02d" strokeWidth={2} name="Projected ROI" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Farm Production Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="card"
      >
        <h3 className="text-xl font-bold text-primary mb-6">Farm Production</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={farmData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#757575" />
            <YAxis stroke="#757575" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" fill="#2e7d32" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
