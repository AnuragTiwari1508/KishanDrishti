"use client"

import { useState } from "react"

interface Achievement {
  id: number
  name: string
  icon: string
  description: string
  progress: number
  unlocked: boolean
}

const achievements: Achievement[] = [
  {
    id: 1,
    name: "First Upload",
    icon: "📸",
    description: "Upload your first crop image",
    progress: 100,
    unlocked: true,
  },
  {
    id: 2,
    name: "Crop Master",
    icon: "🌾",
    description: "Upload 10 crop images",
    progress: 70,
    unlocked: false,
  },
  {
    id: 3,
    name: "Health Guardian",
    icon: "💚",
    description: "Maintain 90%+ health score for 30 days",
    progress: 45,
    unlocked: false,
  },
  {
    id: 4,
    name: "Community Helper",
    icon: "🤝",
    description: "Help 5 other farmers",
    progress: 40,
    unlocked: false,
  },
  {
    id: 5,
    name: "Yield Champion",
    icon: "🏆",
    description: "Achieve 50+ tons yield",
    progress: 85,
    unlocked: false,
  },
  {
    id: 6,
    name: "Verified Expert",
    icon: "✓",
    description: "Get verified as AgriChamp",
    progress: 0,
    unlocked: false,
  },
]

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<"profile" | "achievements" | "wallet">("profile")

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 bg-muted p-1 rounded-lg">
        {[
          { id: "profile", label: "Profile" },
          { id: "achievements", label: "Achievements" },
          { id: "wallet", label: "Wallet" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 rounded text-sm font-semibold transition-colors ${
              activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg text-center">
            <span className="text-6xl block mb-3">👨‍🌾</span>
            <h2 className="text-2xl font-bold">Ramesh Kumar</h2>
            <p className="text-sm opacity-90">Thiruvananthapuram, Kerala</p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Verified Farmer</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Premium</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card p-4 rounded-lg border border-border text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Acres</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border text-center">
              <p className="text-2xl font-bold text-secondary">8</p>
              <p className="text-xs text-muted-foreground">Years Exp</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border text-center">
              <p className="text-2xl font-bold text-accent">820</p>
              <p className="text-xs text-muted-foreground">Civic Score</p>
            </div>
          </div>

          {/* Farm Information */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="font-bold">Farm Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Farm Size</span>
                <span className="font-semibold">12 Acres</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Crop</span>
                <span className="font-semibold">Wheat</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Soil Type</span>
                <span className="font-semibold">Loamy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Irrigation</span>
                <span className="font-semibold">Drip System</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="font-bold">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>ramesh.k@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏘️</span>
                <span>Thiruvananthapuram, Kerala</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition">
            Edit Profile
          </button>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="space-y-4">
          <div className="bg-gradient-agri text-white p-4 rounded-lg text-center">
            <p className="text-sm opacity-90">Total Achievements</p>
            <p className="text-3xl font-bold">1 / 6</p>
          </div>

          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.unlocked
                    ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className={`text-3xl ${achievement.unlocked ? "animate-bounce" : "opacity-50"}`}>
                    {achievement.icon}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold">{achievement.name}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && <span className="text-yellow-500 text-lg">⭐</span>}
                </div>

                {!achievement.unlocked && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wallet Tab */}
      {activeTab === "wallet" && (
        <div className="space-y-4">
          {/* AgriPoints Balance */}
          <div className="bg-gradient-agri text-white p-6 rounded-lg text-center">
            <p className="text-sm opacity-90">AgriPoints Balance</p>
            <p className="text-4xl font-bold">2,450</p>
            <p className="text-xs opacity-75 mt-2">Redeemable for seeds, fertilizers & services</p>
          </div>

          {/* Redeem Options */}
          <div className="space-y-3">
            <h3 className="font-bold">Redeem AgriPoints</h3>
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
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{option.item}</p>
                      <p className="text-xs text-muted-foreground">{option.cost} points</p>
                    </div>
                  </div>
                  <span className="text-primary font-bold">→</span>
                </div>
              </button>
            ))}
          </div>

          {/* Transaction History */}
          <div className="space-y-3">
            <h3 className="font-bold">Recent Transactions</h3>
            {[
              { action: "Crop Update Bonus", points: "+150", date: "2 days ago" },
              { action: "Redeemed Seeds", points: "-500", date: "5 days ago" },
              { action: "Pest Alert Bonus", points: "+100", date: "1 week ago" },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-semibold">{tx.action}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <span className={`font-bold ${tx.points.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {tx.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
