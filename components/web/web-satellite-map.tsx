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
  ndvi: number
  moisture: number
  temperature: number
}

const fields: Field[] = [
  {
    id: 1,
    name: "Wheat Field A",
    crop: "Wheat",
    health: 92,
    area: 5,
    lat: 28.7041,
    lng: 77.1025,
    color: "from-green-500",
    ndvi: 0.78,
    moisture: 65,
    temperature: 28,
  },
  {
    id: 2,
    name: "Rice Field B",
    crop: "Rice",
    health: 78,
    area: 3,
    lat: 28.7045,
    lng: 77.1035,
    color: "from-yellow-500",
    ndvi: 0.65,
    moisture: 72,
    temperature: 30,
  },
  {
    id: 3,
    name: "Corn Field C",
    crop: "Corn",
    health: 96,
    area: 4,
    lat: 28.7035,
    lng: 77.1015,
    color: "from-orange-500",
    ndvi: 0.82,
    moisture: 58,
    temperature: 26,
  },
]

export default function WebSatelliteMap() {
  const [selectedField, setSelectedField] = useState<number | null>(1)
  const [mapType, setMapType] = useState<"satellite" | "health" | "ndvi">("satellite")

  const selectedFieldData = fields.find((f) => f.id === selectedField)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Satellite Farm Monitoring</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Map */}
        <div className="col-span-2 space-y-6">
          {/* Map Type Selector */}
          <div className="flex gap-2 bg-muted p-2 rounded-lg w-fit">
            {[
              { id: "satellite", label: "Satellite View" },
              { id: "health", label: "Health Map" },
              { id: "ndvi", label: "NDVI Index" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setMapType(type.id as any)}
                className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                  mapType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Map Container */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div
              className={`h-96 relative bg-gradient-to-br ${
                mapType === "health"
                  ? "from-green-900 via-yellow-900 to-red-900"
                  : mapType === "ndvi"
                    ? "from-red-900 via-yellow-900 to-green-900"
                    : "from-green-700 via-blue-700 to-green-800"
              }`}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-6 grid-rows-4 h-full">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="border border-white/30" />
                  ))}
                </div>
              </div>

              {/* Field Markers */}
              <div className="absolute inset-0">
                {fields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field.id)}
                    className={`absolute w-16 h-16 rounded-full border-4 border-white flex flex-col items-center justify-center font-bold text-white transition-all hover:scale-110 ${
                      field.color
                    } ${selectedField === field.id ? "ring-4 ring-white scale-125 shadow-2xl" : "opacity-80"}`}
                    style={{
                      left: `${20 + field.id * 20}%`,
                      top: `${30 + field.id * 15}%`,
                      transform: selectedField === field.id ? "scale(1.25)" : "scale(1)",
                    }}
                  >
                    <span className="text-lg">{field.id}</span>
                    <span className="text-xs">{field.health}%</span>
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded-lg">
                <p className="font-bold mb-3">Legend</p>
                <div className="space-y-2 text-sm">
                  {mapType === "health" && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded" />
                        <span>Excellent (90-100%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded" />
                        <span>Good (70-89%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded" />
                        <span>Poor (&lt;70%)</span>
                      </div>
                    </>
                  )}
                  {mapType === "ndvi" && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded" />
                        <span>High Vegetation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-600 rounded" />
                        <span>Moderate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 rounded" />
                        <span>Low Vegetation</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Coordinates Display */}
              <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded-lg text-sm">
                <p>Latitude: 28.70°N</p>
                <p>Longitude: 77.10°E</p>
              </div>
            </div>
          </div>

          {/* Field Comparison */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Field Comparison</h2>
            <div className="grid grid-cols-3 gap-4">
              {fields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => setSelectedField(field.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedField === field.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-bold mb-2">{field.name}</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Health:</span> {field.health}%
                    </p>
                    <p>
                      <span className="text-muted-foreground">NDVI:</span> {field.ndvi}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Area:</span> {field.area} acres
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Field Details */}
        {selectedFieldData && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedFieldData.name}</h2>
              <p className="text-muted-foreground mb-4">
                {selectedFieldData.crop} • {selectedFieldData.area} acres
              </p>

              {/* Health Score */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Health Score</span>
                  <span className="text-2xl font-bold text-primary">{selectedFieldData.health}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r ${selectedFieldData.color} to-transparent h-3 rounded-full`}
                    style={{ width: `${selectedFieldData.health}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3 mb-6">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">NDVI Index</p>
                  <p className="text-lg font-bold">{selectedFieldData.ndvi}</p>
                  <p className="text-xs text-muted-foreground">Vegetation density</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Soil Moisture</p>
                  <p className="text-lg font-bold">{selectedFieldData.moisture}%</p>
                  <p className="text-xs text-muted-foreground">Optimal range</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="text-lg font-bold">{selectedFieldData.temperature}°C</p>
                  <p className="text-xs text-muted-foreground">Current reading</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition">
                  View Detailed Report
                </button>
                <button className="w-full py-2 border border-border rounded-lg font-semibold hover:bg-muted transition">
                  Upload Image
                </button>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-3">Active Alerts</h3>
              <div className="space-y-2">
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">Slight moisture deficit</p>
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">Increase irrigation</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
