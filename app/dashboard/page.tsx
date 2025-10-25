"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardStats from "@/components/dashboard/DashboardStats"
import DashboardCharts from "@/components/dashboard/DashboardCharts"
import InvestmentHistory from "@/components/dashboard/InvestmentHistory"
import DocumentsSection from "@/components/dashboard/DocumentsSection"
import AccessDenied from "@/components/dashboard/AccessDenied"
import { useUser } from "@/context/UserContext"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { tempUser } = useUser()

  // If tempUser is false, show access denied
  if (!tempUser) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <AccessDenied />
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="section-container py-12">
        <DashboardHeader />

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {["overview", "investments", "documents", "settings"].map((tab) => (
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
            <DashboardStats />
            <DashboardCharts />
          </div>
        )}

        {activeTab === "investments" && <InvestmentHistory />}

        {activeTab === "documents" && <DocumentsSection />}

        {activeTab === "settings" && (
          <div className="bg-surface rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-4">Account Settings</h3>
            <p className="text-muted">Settings panel coming soon...</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
