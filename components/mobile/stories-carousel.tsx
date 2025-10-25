"use client"

import { useState, useRef } from "react"

const stories = [
  { id: 1, name: "Your Story", avatar: "📸", isAdd: true },
  { id: 2, name: "Ramesh K.", avatar: "👨‍🌾", viewed: false },
  { id: 3, name: "Priya S.", avatar: "👩‍🌾", viewed: true },
  { id: 4, name: "Ministry", avatar: "🏛️", viewed: false },
  { id: 5, name: "KVK", avatar: "🏫", viewed: true },
  { id: 6, name: "Arun S.", avatar: "👨‍🌾", viewed: false },
]

export default function StoriesCarousel() {
  const [viewedStories, setViewedStories] = useState<Record<number, boolean>>({
    3: true,
    5: true,
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleStoryClick = (id: number) => {
    if (id !== 1) {
      setViewedStories({ ...viewedStories, [id]: true })
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="bg-card border-b border-border sticky top-0 z-30 py-3">
      <div className="relative">
        <div ref={scrollRef} className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => handleStoryClick(story.id)}
              className="flex flex-col items-center gap-1 flex-shrink-0"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 transition-all ${
                  story.isAdd
                    ? "bg-primary text-primary-foreground border-primary"
                    : viewedStories[story.id]
                      ? "border-muted bg-muted"
                      : "border-primary bg-white dark:bg-card"
                }`}
              >
                {story.avatar}
              </div>
              <span className="text-xs font-semibold truncate w-16 text-center">{story.name}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-1 text-xs"
        >
          ◀
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-1 text-xs"
        >
          ▶
        </button>
      </div>
    </div>
  )
}
