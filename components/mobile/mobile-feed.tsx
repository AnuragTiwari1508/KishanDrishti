"use client"

import { useState, useRef } from "react"
import StoriesCarousel from "./stories-carousel"
import ReelCard from "./reel-card"

const feedItems = [
  {
    id: 1,
    author: "Ramesh Kumar",
    location: "Kerala",
    avatar: "",
    image: "/wheat-field-healthy.jpg",
    title: "Wheat Harvest Success!",
    description: "Achieved 45% higher yield this season using Kishan Drishti recommendations",
    likes: 234,
    comments: 45,
    timestamp: "2 hours ago",
    type: "success",
    verified: true,
    agriPoints: 150,
  },
  {
    id: 2,
    author: "Ministry of Agriculture",
    location: "National",
    avatar: "", image: "/government-policy-announcement.jpg",
    title: "New Subsidy Policy 2025",
    description: "Direct Benefit Transfer now available for all registered farmers",
    likes: 1200,
    comments: 340,
    timestamp: "4 hours ago",
    type: "policy",
    verified: true,
    agriPoints: 0,
  },
  {
    id: 3,
    author: "Priya Sharma",
    location: "Punjab",
    avatar: "", image: "/pest-detection-alert.jpg",
    title: "Pest Alert - Early Detection",
    description: "AI detected armyworm infestation. Applied recommended treatment",
    likes: 567,
    comments: 89,
    timestamp: "6 hours ago",
    type: "alert",
    verified: false,
    agriPoints: 100,
  },
  {
    id: 4,
    author: "Krishi Vigyan Kendra",
    location: "Haryana",
    avatar: "", image: "/placeholder.jpg",
    title: "Organic Farming Workshop",
    description: "Free training session on sustainable farming practices",
    likes: 890,
    comments: 156,
    timestamp: "8 hours ago",
    type: "education",
    verified: true,
    agriPoints: 0,
  },
  {
    id: 5,
    author: "Arun Singh",
    location: "Uttar Pradesh",
    avatar: "",
    image: "/placeholder-user.jpg",
    title: "Market Price Update",
    description: "Wheat prices up 12% - Best time to sell your harvest",
    likes: 445,
    comments: 78,
    timestamp: "10 hours ago",
    type: "market",
    verified: false,
    agriPoints: 75,
  },
]

export default function MobileFeed() {
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [saved, setSaved] = useState<Record<number, boolean>>({})
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop
      const itemHeight = window.innerHeight - 100
      const index = Math.round(scrollTop / itemHeight)
      setActiveIndex(Math.max(0, index))
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Stories Section */}
      <div className="flex-shrink-0">
        <StoriesCarousel />
      </div>

      {/* Feed Section */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory"
        onScroll={handleScroll}
      >
        {feedItems.map((item, index) => (
          <div key={item.id} className="snap-start">
            <ReelCard
              item={item}
              isLiked={liked[item.id] || false}
              isSaved={saved[item.id] || false}
              onLike={() => setLiked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              onSave={() => setSaved((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              isActive={index === activeIndex}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

