"use client"

import { useState } from "react"

interface ReelCardProps {
  item: {
    id: number
    author: string
    location: string
    avatar: string
    image: string
    title: string
    description: string
    likes: number
    comments: number
    timestamp: string
    type: "success" | "policy" | "alert" | "education" | "market"
    verified: boolean
    agriPoints: number
  }
  isLiked: boolean
  isSaved: boolean
  onLike: () => void
  onSave: () => void
  isActive: boolean
}

export default function ReelCard({ item, isLiked, isSaved, onLike, onSave, isActive }: ReelCardProps) {
  const [showComments, setShowComments] = useState(false)

  const typeConfig = {
    success: { label: "✓ Success Story", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
    policy: { label: "📋 Policy Update", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" },
    alert: { label: "⚠️ Alert", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" },
    education: {
      label: "📚 Education",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    },
    market: { label: "📈 Market", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100" },
  }

  const config = typeConfig[item.type]

  return (
    <div className="bg-card border-b border-border min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{item.avatar}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{item.author}</h3>
              {item.verified && <span className="text-blue-500">✓</span>}
            </div>
            <p className="text-xs text-muted-foreground">
              {item.location} • {item.timestamp}
            </p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground text-xl">⋮</button>
      </div>

      {/* Image */}
      <div className="relative flex-1 bg-muted overflow-hidden">
        <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="mb-3">
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${config.color}`}>{config.label}</span>
        </div>
        <h2 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h2>
        <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex justify-around mb-4">
          <button onClick={onLike} className="flex flex-col items-center gap-1 hover:text-accent transition">
            <span className="text-2xl">{isLiked ? "❤️" : "🤍"}</span>
            <span className="text-xs font-semibold">{item.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center gap-1 hover:text-accent transition"
          >
            <span className="text-2xl">💬</span>
            <span className="text-xs font-semibold">{item.comments}</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-accent transition">
            <span className="text-2xl">📤</span>
            <span className="text-xs font-semibold">Share</span>
          </button>
          <button onClick={onSave} className="flex flex-col items-center gap-1 hover:text-accent transition">
            <span className="text-2xl">{isSaved ? "🔖" : "🔗"}</span>
            <span className="text-xs font-semibold">Save</span>
          </button>
        </div>

        {/* AgriPoints Badge */}
        {item.agriPoints > 0 && (
          <div className="bg-gradient-to-r from-secondary to-accent text-white p-2 rounded-lg text-center text-sm font-semibold">
            +{item.agriPoints} AgriPoints
          </div>
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-border p-4 bg-muted max-h-32 overflow-y-auto">
          <h4 className="font-semibold mb-3">Comments</h4>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-2">
                <span className="text-lg">👤</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold">Farmer Name</p>
                  <p className="text-xs text-muted-foreground">Great update! Very helpful.</p>
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full mt-3 p-2 bg-background border border-border rounded text-sm"
          />
        </div>
      )}
    </div>
  )
}
