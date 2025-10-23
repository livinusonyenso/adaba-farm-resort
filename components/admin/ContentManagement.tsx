"use client"

import { motion } from "framer-motion"
import { Edit, Trash2, Plus } from "lucide-react"

const content = [
  {
    id: 1,
    title: "Investment Plans",
    type: "Page",
    lastUpdated: "2024-10-15",
    status: "Published",
  },
  {
    id: 2,
    title: "FAQ Section",
    type: "Component",
    lastUpdated: "2024-10-10",
    status: "Published",
  },
  {
    id: 3,
    title: "Farm Gallery",
    type: "Component",
    lastUpdated: "2024-10-05",
    status: "Draft",
  },
  {
    id: 4,
    title: "ROI Calculator",
    type: "Tool",
    lastUpdated: "2024-09-28",
    status: "Published",
  },
]

export default function ContentManagement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">Content Management</h3>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Content
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted">{item.type}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  item.status === "Published" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}
              >
                {item.status}
              </span>
            </div>

            <p className="text-xs text-muted mb-4">Last updated: {item.lastUpdated}</p>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-background hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold text-primary">
                <Edit size={16} />
                Edit
              </button>
              <button className="flex-1 px-3 py-2 bg-background hover:bg-error/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold text-error">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
