"use client"

import { useState } from "react"

const feedItems = [
  {
    id: 1,
    author: "Ramesh Kumar",
    location: "Kerala",
    avatar: "👨‍🌾",
    image: "/wheat-field-healthy.jpg",
    title: "Wheat Harvest Success!",
    description:
      "Achieved 45% higher yield this season using AgriTech recommendations. The AI-guided crop monitoring helped identify optimal harvest timing.",
    likes: 234,
    comments: 45,
    timestamp: "2 hours ago",
    type: "success",
  },
  {
    id: 2,
    author: "Ministry of Agriculture",
    location: "National",
    avatar: "🏛️",
    image: "/government-policy-announcement.jpg",
    title: "New Subsidy Policy 2025",
    description:
      "Direct Benefit Transfer now available for all registered farmers. Enhanced coverage for organic farming and sustainable practices.",
    likes: 1200,
    comments: 340,
    timestamp: "4 hours ago",
    type: "policy",
  },
]

export default function WebFeed() {
  const [liked, setLiked] = useState<Record<number, boolean>>({})

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Global Farmer Updates</h1>
      <div className="space-y-6 max-w-2xl">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{item.avatar}</span>
                <div>
                  <h3 className="font-bold text-lg">{item.author}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.location} • {item.timestamp}
                  </p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground">⋮</button>
            </div>

            {/* Image */}
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                {item.type === "success" && (
                  <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    ✓ Success Story
                  </span>
                )}
                {item.type === "policy" && (
                  <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    📋 Policy Update
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
              <p className="text-muted-foreground mb-6">{item.description}</p>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-6 border-t border-border pt-4">
              <button
                onClick={() => setLiked({ ...liked, [item.id]: !liked[item.id] })}
                className="flex items-center gap-2 text-sm hover:text-accent transition font-semibold"
              >
                <span className="text-lg">{liked[item.id] ? "❤️" : "🤍"}</span>
                {item.likes + (liked[item.id] ? 1 : 0)} Likes
              </button>
              <button className="flex items-center gap-2 text-sm hover:text-accent transition font-semibold">
                <span className="text-lg">💬</span>
                {item.comments} Comments
              </button>
              <button className="flex items-center gap-2 text-sm hover:text-accent transition font-semibold">
                <span className="text-lg">📤</span>
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
