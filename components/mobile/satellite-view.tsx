"use client"

import { useState } from "react"

interface Field {
  id: number
  name: string
  crop: string
  health: number
  area: number
  lat: number
  lng: number
  color: string
}

const fields: Field[] = [
  { id: 1, name: "Field A", crop: "Wheat", health: 92, area: 5, lat: 28.7041, lng: 77.1025, color: "bg-green-500" },
  { id: 2, name: "Field B", crop: "Rice", health: 78, area: 3, lat: 28.7045, lng: 77.1035, color: "bg-yellow-500" },
  { id: 3, name: "Field C", crop: "Corn", health: 96, area: 4, lat: 28.7035, lng: 77.1015, color: "bg-orange-500" },
]

export default function SatelliteView() {
  const [selectedField, setSelectedField] = useState<number | null>(null)
  const [mapType, setMapType] = useState<"satellite" | "health" | "ndvi">("satellite")

  const getMapBackground = () => {
    switch (mapType) {
      case "health":
        return "bg-gradient-to-br from-green-900 via-yellow-900 to-red-900"
      case "ndvi":
        return "bg-gradient-to-br from-red-900 via-yellow-900 to-green-900"
      default:
        return "bg-gradient-to-br from-green-700 via-blue-700 to-green-800"
    }
  }

  return (
    <div className="p-4 pb-20 space-y-4">
      <h2 className="text-lg font-bold">Satellite Farm View</h2>

      {/* Map Type Selector */}
      <div className="flex gap-2 bg-muted p-2 rounded-lg">
        {[
          { id: "satellite", label: "Satellite" },
          { id: "health", label: "Health" },
          { id: "ndvi", label: "NDVI" },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setMapType(type.id as any)}
            className={`flex-1 py-2 rounded text-sm font-semibold transition-colors ${
              mapType === type.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className={`${getMapBackground()} rounded-lg p-4 h-64 relative overflow-hidden`}>
        {/* Satellite/Map visualization */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-4 grid-rows-4 h-full">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>

        {/* Field Markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          {fields.map((field) => (
            <button
              key={field.id}
              onClick={() => setSelectedField(field.id)}
              className={`absolute w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold text-white transition-transform hover:scale-110 ${
                field.color
              } ${selectedField === field.id ? "ring-4 ring-white scale-125" : ""}`}
              style={{
                left: `${20 + field.id * 25}%`,
                top: `${30 + field.id * 15}%`,
              }}
            >
              {field.id}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs p-2 rounded">
          <p className="font-semibold mb-1">Health Score</p>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Excellent</span>
          </div>
        </div>
      </div>

      {/* Field Details */}
      {selectedField && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          {fields
            .filter((f) => f.id === selectedField)
            .map((field) => (
              <div key={field.id}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{field.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {field.crop} • {field.area} acres
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedField(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Health Score</span>
                    <span className="font-bold text-primary">{field.health}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`${field.color} h-2 rounded-full`} style={{ width: `${field.health}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button className="py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition">
                    View Details
                  </button>
                  <button className="py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition">
                    Upload Image
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Field List */}
      <div className="space-y-2">
        <h3 className="font-bold">All Fields</h3>
        {fields.map((field) => (
          <button
            key={field.id}
            onClick={() => setSelectedField(field.id)}
            className={`w-full p-3 rounded-lg border transition-all text-left ${
              selectedField === field.id
                ? "bg-primary/10 border-primary"
                : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${field.color}`} />
                <div>
                  <p className="font-semibold text-sm">{field.name}</p>
                  <p className="text-xs text-muted-foreground">{field.crop}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-primary">{field.health}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
