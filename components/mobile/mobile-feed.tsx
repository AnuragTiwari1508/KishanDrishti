"use client"

import { useState, useRef } from "react"
import StoriesCarousel from "./stories-carousel"
import ReelCard from "./reel-card"

const feedItems = [
  {
    id: 1,
    author: "Ramesh Kumar",
    location: "Kerala",
    avatar: "👨‍🌾",
    image: "/placeholder.svg?key=cvbsg",
    title: "Wheat Harvest Success!",
    description: "Achieved 45% higher yield this season using AgriTech recommendations",
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
    avatar: "🏛️",
    image: "/placeholder.svg?key=avbtp",
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
    avatar: "👩‍🌾",
    image: "/placeholder.svg?key=6tvkf",
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
    avatar: "🏫",
    image: "/placeholder.svg?key=8jkls",
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
    avatar: "👨‍🌾",
    image: "/placeholder.svg?key=mnopq",
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
    <div className="space-y-0 pb-20">
      {/* Stories Section */}
      <StoriesCarousel />

      {/* Feed Items */}
      <div ref={scrollContainerRef} onScroll={handleScroll} className="space-y-0">
        {feedItems.map((item, index) => (
          <ReelCard
            key={item.id}
            item={item}
            isLiked={liked[item.id] || false}
            isSaved={saved[item.id] || false}
            onLike={() => setLiked({ ...liked, [item.id]: !liked[item.id] })}
            onSave={() => setSaved({ ...saved, [item.id]: !saved[item.id] })}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  )
}
