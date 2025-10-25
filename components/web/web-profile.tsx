"use client"

import { useState } from "react"

export default function WebProfile() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        {[
          { id: "overview", label: "Overview" },
          { id: "achievements", label: "Achievements" },
          { id: "wallet", label: "AgriPoints Wallet" },
          { id: "settings", label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="col-span-1 bg-card border border-border rounded-lg p-6">
            <div className="text-center mb-6">
              <span className="text-7xl block mb-4">👨‍🌾</span>
              <h2 className="text-2xl font-bold">Ramesh Kumar</h2>
              <p className="text-muted-foreground">Thiruvananthapuram, Kerala</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ Verified
                </span>
                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-3 py-1 rounded-full text-xs font-semibold">
                  Premium
                </span>
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-6">
              <div>
                <p className="text-xs text-muted-foreground">Civic Score</p>
                <p className="text-3xl font-bold text-primary">820</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-lg font-semibold">January 2022</p>
              </div>
            </div>

            <button className="w-full mt-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition">
              Edit Profile
            </button>
          </div>

          {/* Stats & Information */}
          <div className="col-span-2 space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Farm Size", value: "12 Acres", icon: "🏞️" },
                { label: "Experience", value: "8 Years", icon: "📅" },
                { label: "Active Crops", value: "3", icon: "🌾" },
                { label: "Avg Health", value: "92%", icon: "💚" },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 text-center">
                  <span className="text-3xl block mb-2">{stat.icon}</span>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Farm Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Farm Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Farm Size</p>
                  <p className="text-lg font-semibold">12 Acres</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Primary Crop</p>
                  <p className="text-lg font-semibold">Wheat</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Soil Type</p>
                  <p className="text-lg font-semibold">Loamy</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Irrigation System</p>
                  <p className="text-lg font-semibold">Drip System</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <p className="text-lg font-semibold">8 Years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Crops Grown</p>
                  <p className="text-lg font-semibold">Wheat, Rice, Corn</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">ramesh.k@email.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏘️</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">Thiruvananthapuram, Kerala</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-agri text-white p-6 rounded-lg text-center">
              <p className="text-sm opacity-90">Total Achievements</p>
              <p className="text-4xl font-bold">1 / 6</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-lg text-center">
              <p className="text-sm opacity-90">Badges Earned</p>
              <p className="text-4xl font-bold">1</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-lg text-center">
              <p className="text-sm opacity-90">Completion Rate</p>
              <p className="text-4xl font-bold">17%</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              {
                name: "First Upload",
                icon: "📸",
                desc: "Upload your first crop image",
                unlocked: true,
              },
              {
                name: "Crop Master",
                icon: "🌾",
                desc: "Upload 10 crop images",
                progress: 70,
              },
              {
                name: "Health Guardian",
                icon: "💚",
                desc: "Maintain 90%+ health score",
                progress: 45,
              },
              {
                name: "Community Helper",
                icon: "🤝",
                desc: "Help 5 other farmers",
                progress: 40,
              },
              {
                name: "Yield Champion",
                icon: "🏆",
                desc: "Achieve 50+ tons yield",
                progress: 85,
              },
              {
                name: "Verified Expert",
                icon: "✓",
                desc: "Get verified as AgriChamp",
                progress: 0,
              },
            ].map((achievement, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg border-2 text-center ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700"
                    : "bg-card border-border"
                }`}
              >
                <span className={`text-5xl block mb-3 ${achievement.unlocked ? "animate-bounce" : "opacity-50"}`}>
                  {achievement.icon}
                </span>
                <h3 className="font-bold mb-1">{achievement.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{achievement.desc}</p>
                {achievement.unlocked ? (
                  <span className="text-yellow-500 text-lg">⭐ Unlocked</span>
                ) : (
                  <div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.progress}%</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wallet Tab */}
      {activeTab === "wallet" && (
        <div className="space-y-6">
          <div className="bg-gradient-agri text-white p-8 rounded-lg text-center">
            <p className="text-lg opacity-90">AgriPoints Balance</p>
            <p className="text-6xl font-bold">2,450</p>
            <p className="text-sm opacity-75 mt-2">Redeemable for seeds, fertilizers, services & more</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Redeem Options */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Redeem AgriPoints</h2>
              {[
                { item: "Premium Seeds (100g)", cost: 500, icon: "🌱" },
                { item: "Organic Fertilizer (50kg)", cost: 800, icon: "🧪" },
                { item: "Pest Control Service", cost: 1200, icon: "🐛" },
                { item: "Soil Testing Kit", cost: 300, icon: "🧬" },
              ].map((option, i) => (
                <button
                  key={i}
                  className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{option.icon}</span>
                      <div>
                        <p className="font-semibold">{option.item}</p>
                        <p className="text-sm text-muted-foreground">{option.cost} points</p>
                      </div>
                    </div>
                    <span className="text-primary font-bold text-xl">→</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Transaction History */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Transaction History</h2>
              <div className="space-y-3">
                {[
                  { action: "Crop Update Bonus", points: "+150", date: "2 days ago", icon: "📸" },
                  { action: "Redeemed Seeds", points: "-500", date: "5 days ago", icon: "🌱" },
                  { action: "Pest Alert Bonus", points: "+100", date: "1 week ago", icon: "🐛" },
                  { action: "Health Score Bonus", points: "+75", date: "2 weeks ago", icon: "💚" },
                  { action: "Community Help", points: "+50", date: "3 weeks ago", icon: "🤝" },
                ].map((tx, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tx.icon}</span>
                        <div>
                          <p className="font-semibold text-sm">{tx.action}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <span
                        className={`font-bold text-lg ${tx.points.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                      >
                        {tx.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
            <div className="space-y-3">
              {[
                { label: "Crop Health Alerts", enabled: true },
                { label: "Pest Warnings", enabled: true },
                { label: "Weather Updates", enabled: true },
                { label: "Policy Announcements", enabled: false },
                { label: "Community Messages", enabled: true },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-semibold">{pref.label}</span>
                  <input type="checkbox" defaultChecked={pref.enabled} className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-semibold">Profile Visibility</span>
                <select className="bg-background border border-border rounded px-2 py-1">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-semibold">Share Farm Data</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
