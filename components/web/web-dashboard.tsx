"use client"

import { useState } from "react"

export default function WebDashboard() {
  const [timeRange, setTimeRange] = useState("month")

  const cropMetrics = [
    { title: "Active Crops", value: "3", icon: "🌾", color: "from-primary" },
    { title: "Health Score", value: "92%", icon: "💚", color: "from-secondary" },
    { title: "Yield Forecast", value: "45 tons", icon: "📊", color: "from-accent" },
    { title: "AgriPoints", value: "2,450", icon: "⭐", color: "from-orange-500" },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Farm Dashboard</h1>
        <div className="flex gap-2">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {cropMetrics.map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} to-transparent text-white p-6 rounded-lg`}>
            <p className="text-sm opacity-90">{stat.title}</p>
            <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
            <span className="text-4xl mt-4 block">{stat.icon}</span>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Crop Health Overview */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Crop Health Overview</h2>
          <div className="space-y-4">
            {[
              { name: "Wheat Field A", health: 92, stage: "Flowering" },
              { name: "Rice Field B", health: 78, stage: "Vegetative" },
              { name: "Corn Field C", health: 96, stage: "Grain Filling" },
            ].map((crop, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{crop.name}</span>
                  <span className="text-sm text-muted-foreground">{crop.stage}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                    style={{ width: `${crop.health}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{crop.health}% Health</p>
              </div>
            ))}
          </div>
        </div>

        {/* Yield Prediction */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Yield Prediction</h2>
          <div className="space-y-4">
            {[
              { crop: "Wheat", predicted: 45, unit: "tons/acre" },
              { crop: "Rice", predicted: 38, unit: "tons/acre" },
              { crop: "Corn", predicted: 52, unit: "tons/acre" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{item.crop}</span>
                  <span className="text-primary font-bold">
                    {item.predicted} {item.unit}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    style={{ width: `${(item.predicted / 60) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts and Recommendations */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">⚠️ Recent Alerts</h2>
          <div className="space-y-3">
            {[
              { type: "pest", title: "Armyworm Detected", desc: "Field 2 - Recommended treatment applied" },
              { type: "weather", title: "Heavy Rain Expected", desc: "Next 48 hours - Prepare drainage" },
              { type: "nutrient", title: "Nitrogen Deficiency", desc: "Field 1 - Apply fertilizer soon" },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition cursor-pointer">
                <span className="text-2xl">
                  {alert.type === "pest" && "🐛"}
                  {alert.type === "weather" && "🌧️"}
                  {alert.type === "nutrient" && "🧪"}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">💡 AI Recommendations</h2>
          <div className="space-y-3">
            {[
              { action: "Increase Irrigation", priority: "High", icon: "💧" },
              { action: "Apply Potassium Fertilizer", priority: "Medium", icon: "🧪" },
              { action: "Monitor for Pests", priority: "High", icon: "🔍" },
              { action: "Prepare for Harvest", priority: "Low", icon: "🚜" },
            ].map((rec, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === "High"
                    ? "border-destructive bg-destructive/5"
                    : rec.priority === "Medium"
                      ? "border-accent bg-accent/5"
                      : "border-secondary bg-secondary/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{rec.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{rec.action}</p>
                      <p className="text-xs text-muted-foreground">Priority: {rec.priority}</p>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary/80">→</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
