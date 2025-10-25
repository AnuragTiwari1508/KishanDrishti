"use client"

import { useState } from "react"

const complaintTypes = [
  { id: "pest", label: "Pest/Disease", icon: "🐛", color: "from-red-500" },
  { id: "fertilizer", label: "Fertilizer Issue", icon: "🧪", color: "from-blue-500" },
  { id: "water", label: "Water Management", icon: "💧", color: "from-cyan-500" },
  { id: "land", label: "Land Issue", icon: "🏞️", color: "from-green-500" },
  { id: "subsidy", label: "Subsidy Claim", icon: "💰", color: "from-yellow-500" },
  { id: "market", label: "Market Price", icon: "📈", color: "from-purple-500" },
]

interface Complaint {
  id: number
  type: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved"
  date: string
  priority: "low" | "medium" | "high"
  agriChampAssigned?: string
}

const mockComplaints: Complaint[] = [
  {
    id: 1,
    type: "pest",
    title: "Armyworm Infestation",
    description: "Detected armyworm in wheat field. Need immediate treatment.",
    status: "in-progress",
    date: "2 days ago",
    priority: "high",
    agriChampAssigned: "Rajesh Kumar",
  },
  {
    id: 2,
    type: "water",
    title: "Irrigation System Failure",
    description: "Drip irrigation not working properly in field B.",
    status: "open",
    date: "1 day ago",
    priority: "high",
    agriChampAssigned: undefined,
  },
  {
    id: 3,
    type: "subsidy",
    title: "PMFBY Claim Pending",
    description: "Crop insurance claim submitted 15 days ago, still pending.",
    status: "in-progress",
    date: "15 days ago",
    priority: "medium",
    agriChampAssigned: "Priya Sharma",
  },
]

export default function ComplaintSystem() {
  const [activeTab, setActiveTab] = useState<"file" | "view">("view")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints)
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    priority: "medium",
  })

  const handleSubmit = () => {
    if (formData.type && formData.title && formData.description) {
      const newComplaint: Complaint = {
        id: complaints.length + 1,
        type: formData.type,
        title: formData.title,
        description: formData.description,
        status: "open",
        date: "just now",
        priority: formData.priority as "low" | "medium" | "high",
      }
      setComplaints([newComplaint, ...complaints])
      setFormData({ type: "", title: "", description: "", priority: "medium" })
      setActiveTab("view")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("view")}
          className={`flex-1 py-2 rounded transition-colors ${
            activeTab === "view" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          My Complaints
        </button>
        <button
          onClick={() => setActiveTab("file")}
          className={`flex-1 py-2 rounded transition-colors ${
            activeTab === "file" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          File New
        </button>
      </div>

      {/* File New Complaint */}
      {activeTab === "file" && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">File a Complaint</h2>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-semibold mb-3">Complaint Type</label>
            <div className="grid grid-cols-2 gap-2">
              {complaintTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.type === type.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl block mb-1">{type.icon}</span>
                  <span className="text-xs font-semibold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              placeholder="Brief title of the issue"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border border-border rounded-lg bg-background"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-border rounded-lg bg-background h-24"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full p-3 border border-border rounded-lg bg-background"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!formData.type || !formData.title || !formData.description}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          >
            Submit Complaint
          </button>
        </div>
      )}

      {/* View Complaints */}
      {activeTab === "view" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">My Complaints ({complaints.length})</h2>
            <select className="text-sm border border-border rounded-lg px-2 py-1 bg-background">
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          {complaints.map((complaint) => (
            <div key={complaint.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{complaintTypes.find((t) => t.id === complaint.type)?.icon}</span>
                    <div>
                      <h3 className="font-bold">{complaint.title}</h3>
                      <p className="text-xs text-muted-foreground">{complaint.date}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                    {complaint.status.replace("-", " ").toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground">{complaint.description}</p>

                {/* Priority & AgriChamp */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">Priority:</span>
                    <span className={`text-xs font-bold ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority.toUpperCase()}
                    </span>
                  </div>
                  {complaint.agriChampAssigned && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">AgriChamp: </span>
                      <span className="font-semibold">{complaint.agriChampAssigned}</span>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                {complaint.status !== "open" && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs font-semibold mb-2">Status Timeline</p>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <span className="text-orange-500">●</span>
                        <span className="text-xs">Reported - {complaint.date}</span>
                      </div>
                      {complaint.status !== "open" && (
                        <div className="flex gap-2">
                          <span className="text-yellow-500">●</span>
                          <span className="text-xs">Assigned to AgriChamp</span>
                        </div>
                      )}
                      {complaint.status === "resolved" && (
                        <div className="flex gap-2">
                          <span className="text-green-500">●</span>
                          <span className="text-xs">Resolved</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition">
                    View Details
                  </button>
                  {complaint.status !== "resolved" && (
                    <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition">
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
