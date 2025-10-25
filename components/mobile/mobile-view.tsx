"use client"

import { useState } from "react"
import MobileFeed from "./mobile-feed"
import MobileNavigation from "./mobile-navigation"
import ImageUploadModal from "./image-upload-modal"
import CropMonitoringDashboard from "./crop-monitoring-dashboard"

export default function MobileView() {
  const [activeTab, setActiveTab] = useState("feed")
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div className="mobile-view h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <h1 className="text-xl font-bold">AgriTech</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/20 rounded-full transition">🔔</button>
            <button className="p-2 hover:bg-white/20 rounded-full transition">👤</button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "feed" && <MobileFeed />}
        {activeTab === "upload" && (
          <div className="p-4">
            <button
              onClick={() => setShowUpload(true)}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition"
            >
              📸 Upload Crop Image
            </button>
          </div>
        )}
        {activeTab === "reports" && <CropMonitoringDashboard />}
        {activeTab === "wallet" && (
          <div className="p-4">
            <div className="bg-gradient-agri text-primary-foreground p-6 rounded-lg mb-4">
              <p className="text-sm opacity-90">AgriPoints Balance</p>
              <h2 className="text-4xl font-bold">2,450</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex justify-between">
                  <span>Crop Update Bonus</span>
                  <span className="text-secondary font-semibold">+150</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Upload Modal */}
      {showUpload && <ImageUploadModal onClose={() => setShowUpload(false)} />}
    </div>
  )
}
