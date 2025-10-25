"use client"

import { useState } from "react"

const cropData = [
  {
    id: 1,
    name: "Wheat Field A",
    area: "5 acres",
    status: "Healthy",
    healthScore: 92,
    stage: "Flowering",
    daysToHarvest: 25,
    lastUpdate: "2 hours ago",
    icon: "🌾",
    color: "from-green-500",
  },
  {
    id: 2,
    name: "Rice Field B",
    area: "3 acres",
    status: "Alert",
    healthScore: 78,
    stage: "Vegetative",
    daysToHarvest: 45,
    lastUpdate: "4 hours ago",
    icon: "🍚",
    color: "from-yellow-500",
  },
  {
    id: 3,
    name: "Corn Field C",
    area: "4 acres",
    status: "Excellent",
    healthScore: 96,
    stage: "Grain Filling",
    daysToHarvest: 15,
    lastUpdate: "1 hour ago",
    icon: "🌽",
    color: "from-orange-500",
  },
]

export default function CropMonitoringDashboard() {
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null)

  return (
    <div className="p-4 pb-20 space-y-4">
      <h2 className="text-lg font-bold">My Crops</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-primary to-primary/50 text-white p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">3</p>
          <p className="text-xs opacity-90">Active Crops</p>
        </div>
        <div className="bg-gradient-to-br from-secondary to-secondary/50 text-white p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs opacity-90">Acres Total</p>
        </div>
        <div className="bg-gradient-to-br from-accent to-accent/50 text-white p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">89%</p>
          <p className="text-xs opacity-90">Avg Health</p>
        </div>
      </div>

      {/* Crop Cards */}
      <div className="space-y-3">
        {cropData.map((crop) => (
          <div
            key={crop.id}
            onClick={() => setSelectedCrop(selectedCrop === crop.id ? null : crop.id)}
            className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${crop.color} to-transparent text-white p-4`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{crop.icon}</span>
                  <div>
                    <h3 className="font-bold">{crop.name}</h3>
                    <p className="text-xs opacity-90">{crop.area}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    crop.status === "Healthy"
                      ? "bg-green-500/30"
                      : crop.status === "Alert"
                        ? "bg-yellow-500/30"
                        : "bg-blue-500/30"
                  }`}
                >
                  {crop.status}
                </span>
              </div>
            </div>

            {/* Health Score */}
            <div className="p-4 border-b border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">Health Score</span>
                <span className="text-lg font-bold text-primary">{crop.healthScore}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${crop.color} to-transparent h-2 rounded-full`}
                  style={{ width: `${crop.healthScore}%` }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Growth Stage</span>
                <span className="font-semibold">{crop.stage}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Days to Harvest</span>
                <span className="font-semibold">{crop.daysToHarvest} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Update</span>
                <span className="font-semibold text-xs">{crop.lastUpdate}</span>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedCrop === crop.id && (
              <div className="border-t border-border p-4 bg-muted space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Soil Moisture</p>
                    <p className="font-bold">65%</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="font-bold">28°C</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Pest Risk</p>
                    <p className="font-bold text-green-600">Low</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Disease Risk</p>
                    <p className="font-bold text-green-600">Very Low</p>
                  </div>
                </div>

                {/* Alerts */}
                {crop.status === "Alert" && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      ⚠️ Attention Required
                    </p>
                    <ul className="text-xs text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• Slight nitrogen deficiency detected</li>
                      <li>• Increase irrigation frequency</li>
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition">
                    📸 Upload Image
                  </button>
                  <button className="flex-1 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition">
                    📊 Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Crop */}
      <button className="w-full py-3 border-2 border-dashed border-primary rounded-lg text-primary font-semibold hover:bg-primary/5 transition">
        + Add New Crop
      </button>
    </div>
  )
}
