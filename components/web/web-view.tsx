"use client"

import { useState } from "react"
import WebSidebar from "./web-sidebar"
import WebFeed from "./web-feed"
import WebDashboard from "./web-dashboard"
import WebCommunity from "./web-community"

export default function WebView() {
  const [activeSection, setActiveSection] = useState("feed")

  return (
    <div className="web-view flex h-screen bg-background">
      {/* Sidebar */}
      <WebSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === "feed" && <WebFeed />}
        {activeSection === "dashboard" && <WebDashboard />}
        {activeSection === "analytics" && <WebAnalytics />}
        {activeSection === "complaints" && <WebComplaints />}
        {activeSection === "community" && <WebCommunity />}
        {activeSection === "profile" && <WebProfile />}
      </div>
    </div>
  )
}

function WebAnalytics() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Crop Analytics</h1>
      <div className="grid grid-cols-3 gap-6">
        {[
          { title: "Avg Yield", value: "45 tons/acre", icon: "📊", color: "from-primary" },
          { title: "Health Score", value: "92%", icon: "💚", color: "from-secondary" },
          { title: "Pest Risk", value: "Low", icon: "🛡️", color: "from-accent" },
        ].map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} to-transparent p-6 rounded-lg text-white`}>
            <p className="text-sm opacity-90">{stat.title}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <span className="text-4xl">{stat.icon}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WebComplaints() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">File Complaint</h1>
      <div className="max-w-2xl bg-card p-8 rounded-lg border border-border">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Complaint Type</label>
            <select className="w-full p-3 border border-border rounded-lg bg-background">
              <option>Fertilizer Issue</option>
              <option>Pest/Disease</option>
              <option>Water Management</option>
              <option>Land Issue</option>
              <option>Subsidy Claim</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea className="w-full p-3 border border-border rounded-lg bg-background h-32" />
          </div>
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  )
}

function WebProfile() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-card p-6 rounded-lg border border-border">
          <div className="text-center">
            <span className="text-6xl block mb-4">👨‍🌾</span>
            <h2 className="text-xl font-bold">Ramesh Kumar</h2>
            <p className="text-sm text-muted-foreground">Verified Farmer • Premium</p>
          </div>
        </div>
        <div className="col-span-2 bg-card p-6 rounded-lg border border-border">
          <h3 className="font-bold mb-4">Farm Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Farm Size</p>
              <p className="font-semibold">12 Acres</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Experience</p>
              <p className="font-semibold">8 Years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">AgriPoints</p>
              <p className="font-semibold">2,450</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Civic Score</p>
              <p className="font-semibold">820 (Excellent)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
