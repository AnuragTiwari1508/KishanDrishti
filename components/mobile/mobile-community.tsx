"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Post {
  id: number
  author: string
  authorType: "government" | "farmer"
  avatar: string
  time: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  verified?: boolean
}

const demoPosts: Post[] = [
  {
    id: 1,
    author: "Ministry of Agriculture",
    authorType: "government",
    avatar: "🏛️",
    time: "2h ago",
    content: "🌾 New Subsidy Scheme Alert!\n\nGet up to ₹50,000/acre for organic farming. Applications open Nov 10.\n\n#OrganicFarming #Subsidy",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    likes: 1245,
    comments: 89,
    shares: 234,
    verified: true,
  },
  {
    id: 2,
    author: "Ramesh Kumar",
    authorType: "farmer",
    avatar: "👨‍🌾",
    time: "5h ago",
    content: "Harvested wheat with 30% yield increase using new techniques from Kishan Drishti! 🙏\n\n#SuccessStory #WheatHarvest",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
    likes: 456,
    comments: 67,
    shares: 89,
    verified: false,
  },
  {
    id: 3,
    author: "Krishi Vigyan Kendra",
    authorType: "government",
    avatar: "🎓",
    time: "1d ago",
    content: "📢 Free Training on Modern Irrigation!\n\nNov 15-17, 2025\n✅ Drip Irrigation\n✅ Sprinkler Systems\n✅ Water Conservation\n\nLimited seats!",
    likes: 892,
    comments: 145,
    shares: 456,
    verified: true,
  },
  {
    id: 4,
    author: "Priya Devi",
    authorType: "farmer",
    avatar: "👩‍🌾",
    time: "1d ago",
    content: "Tomato leaf curl disease cured with remedy from @Dr_AgriExpert! Plants recovering well 🍅💚\n\nThank you community!",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&h=600&fit=crop",
    likes: 234,
    comments: 42,
    shares: 28,
    verified: false,
  },
  {
    id: 5,
    author: "Dept of Horticulture",
    authorType: "government",
    avatar: "🌺",
    time: "2d ago",
    content: "🚨 Weather Advisory 🚨\n\nHeavy rain Nov 8-10\n⚠️ Postpone harvesting\n⚠️ Ensure drainage\n⚠️ Protect livestock\n\nStay safe!",
    likes: 2341,
    comments: 189,
    shares: 1234,
    verified: true,
  },
]

export default function MobileCommunity() {
  const [posts, setPosts] = useState<Post[]>(demoPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const [activeFilter, setActiveFilter] = useState<"all" | "government" | "farmer">("all")

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return

    const newPost: Post = {
      id: posts.length + 1,
      author: "Ramesh Kumar",
      authorType: "farmer",
      avatar: "👨‍🌾",
      time: "Just now",
      content: newPostContent,
      likes: 0,
      comments: 0,
      shares: 0,
      verified: false,
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
    setShowNewPost(false)
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const filteredPosts = posts.filter(post => {
    if (activeFilter === "all") return true
    return post.authorType === activeFilter
  })

  return (
    <div className="pb-24">
      {/* Create Post Button - Fixed Above Navigation */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-card border-t border-border z-30">
        <Button 
          onClick={() => setShowNewPost(!showNewPost)}
          className="w-full bg-primary text-primary-foreground"
        >
          ✍️ Create Post
        </Button>
      </div>

      {/* Create New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-card w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Create Post</h3>
              <button 
                onClick={() => {
                  setShowNewPost(false)
                  setNewPostContent("")
                }}
                className="text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="flex gap-3 mb-4">
              <span className="text-3xl">👨‍🌾</span>
              <div className="flex-1">
                <p className="font-semibold">Ramesh Kumar</p>
                <p className="text-xs text-muted-foreground">Farmer</p>
              </div>
            </div>
            <Textarea
              placeholder="Share your experience, ask questions, or give advice..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="mb-4 min-h-[150px]"
            />
            <Button 
              onClick={handleCreatePost}
              disabled={!newPostContent.trim()}
              className="w-full"
            >
              Post to Community
            </Button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        <button 
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
            activeFilter === "all" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted"
          }`}
        >
          🌐 All
        </button>
        <button 
          onClick={() => setActiveFilter("government")}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
            activeFilter === "government" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted"
          }`}
        >
          🏛️ Government
        </button>
        <button 
          onClick={() => setActiveFilter("farmer")}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
            activeFilter === "farmer" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted"
          }`}
        >
          👨‍🌾 Farmers
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4 p-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="p-4">
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{post.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 flex-wrap">
                  <h3 className="font-bold text-sm">{post.author}</h3>
                  {post.verified && (
                    <span className="text-blue-500" title="Verified">✓</span>
                  )}
                  {post.authorType === "government" && (
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                      Official
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-3">
              <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden -mx-4">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-around pt-3 border-t border-border">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-muted-foreground active:scale-95 transition"
              >
                <span className="text-lg">👍</span>
                <span className="text-sm font-semibold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground active:scale-95 transition">
                <span className="text-lg">💬</span>
                <span className="text-sm font-semibold">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground active:scale-95 transition">
                <span className="text-lg">🔄</span>
                <span className="text-sm font-semibold">{post.shares}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
