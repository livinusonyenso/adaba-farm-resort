"use client"

import { motion } from "framer-motion"
import { FileText, Download, Eye } from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Investment Certificate - Premium Plan",
    date: "2024-01-15",
    type: "Certificate",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Monthly ROI Report - October 2024",
    date: "2024-10-31",
    type: "Report",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Farm Progress Update - Q3 2024",
    date: "2024-09-30",
    type: "Update",
    size: "3.2 MB",
  },
  {
    id: 4,
    name: "Tax Statement - 2024",
    date: "2024-12-01",
    type: "Tax Document",
    size: "1.1 MB",
  },
]

export default function DocumentsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      {documents.map((doc, idx) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          viewport={{ once: true }}
          className="card flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-background rounded-lg">
              <FileText size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{doc.name}</h4>
              <p className="text-sm text-muted">
                {doc.type} • {doc.date} • {doc.size}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-background rounded-lg transition-colors" title="View document">
              <Eye size={18} className="text-primary" />
            </button>
            <button className="p-2 hover:bg-background rounded-lg transition-colors" title="Download document">
              <Download size={18} className="text-primary" />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
