"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminStats from "@/components/admin/AdminStats"
import AdminCharts from "@/components/admin/AdminCharts"
import InvestorManagement from "@/components/admin/InvestorManagement"
import ContentManagement from "@/components/admin/ContentManagement"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="section-container py-12">
        <AdminHeader />

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {["overview", "investors", "content", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize transition-colors duration-200 border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <AdminStats />
            <AdminCharts />
          </div>
        )}

        {activeTab === "investors" && <InvestorManagement />}

        {activeTab === "content" && <ContentManagement />}

        {activeTab === "analytics" && (
          <div className="bg-surface rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-4">Advanced Analytics</h3>
            <p className="text-muted">Detailed analytics dashboard coming soon...</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
