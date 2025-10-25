"use client"

import { useState } from "react"

const complaintTypes = [
  { id: "pest", label: "Pest/Disease", icon: "🐛" },
  { id: "fertilizer", label: "Fertilizer Issue", icon: "🧪" },
  { id: "water", label: "Water Management", icon: "💧" },
  { id: "land", label: "Land Issue", icon: "🏞️" },
  { id: "subsidy", label: "Subsidy Claim", icon: "💰" },
  { id: "market", label: "Market Price", icon: "📈" },
]

export default function WebComplaints() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Complaints & Issues</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          File New Complaint
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">File a New Complaint</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Complaint Type</label>
                <select className="w-full p-3 border border-border rounded-lg bg-background">
                  <option>Select type...</option>
                  {complaintTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Brief title of the issue"
                  className="w-full p-3 border border-border rounded-lg bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Priority</label>
                <select className="w-full p-3 border border-border rounded-lg bg-background">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  placeholder="Describe the issue in detail..."
                  className="w-full p-3 border border-border rounded-lg bg-background h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Attach Evidence</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition">
                  <span className="text-3xl block mb-2">📎</span>
                  <p className="text-sm">Upload photos or documents</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition"
            >
              Cancel
            </button>
            <button className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition">
              Submit Complaint
            </button>
          </div>
        </div>
      )}

      {/* Complaints List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Recent Complaints</h2>

        {[
          {
            id: 1,
            type: "pest",
            title: "Armyworm Infestation",
            desc: "Detected armyworm in wheat field. Need immediate treatment.",
            status: "in-progress",
            priority: "high",
            date: "2 days ago",
            agriChamp: "Rajesh Kumar",
          },
          {
            id: 2,
            type: "water",
            title: "Irrigation System Failure",
            desc: "Drip irrigation not working properly in field B.",
            status: "open",
            priority: "high",
            date: "1 day ago",
            agriChamp: null,
          },
          {
            id: 3,
            type: "subsidy",
            title: "PMFBY Claim Pending",
            desc: "Crop insurance claim submitted 15 days ago, still pending.",
            status: "in-progress",
            priority: "medium",
            date: "15 days ago",
            agriChamp: "Priya Sharma",
          },
        ].map((complaint) => (
          <div key={complaint.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{complaintTypes.find((t) => t.id === complaint.type)?.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{complaint.title}</h3>
                  <p className="text-muted-foreground">{complaint.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.status === "open"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      : complaint.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  }`}
                >
                  {complaint.status.replace("-", " ").toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Priority</p>
                <p className="font-bold text-sm">{complaint.priority.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Filed</p>
                <p className="font-bold text-sm">{complaint.date}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AgriChamp</p>
                <p className="font-bold text-sm">{complaint.agriChamp || "Unassigned"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Complaint ID</p>
                <p className="font-bold text-sm">#{complaint.id}</p>
              </div>
            </div>

            <button className="text-primary font-semibold hover:text-primary/80 transition">View Full Details →</button>
          </div>
        ))}
      </div>
    </div>
  )
}
