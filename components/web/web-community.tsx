"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
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
    time: "2 hours ago",
    content: "🌾 New Subsidy Scheme Alert! \n\nThe government has announced a new subsidy scheme for organic farming. Eligible farmers can get up to ₹50,000 per acre for converting to organic methods. Applications open from Nov 10, 2025.\n\n#OrganicFarming #GovernmentScheme #Agriculture",
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
    time: "5 hours ago",
    content: "Just harvested my wheat crop using the new techniques I learned from Kishan Drishti! Yield increased by 30% this season. Thank you to all the experts and fellow farmers for your guidance. 🙏\n\n#SuccessStory #WheatHarvest #ModernFarming",
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
    time: "1 day ago",
    content: "📢 Free Training Program Alert!\n\nKVK is organizing a 3-day workshop on 'Modern Irrigation Techniques' from Nov 15-17, 2025. Topics include:\n✅ Drip Irrigation\n✅ Sprinkler Systems\n✅ Water Conservation\n✅ Smart Irrigation\n\nRegistration Link in comments. Limited seats!",
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
    time: "1 day ago",
    content: "My tomato crop was affected by leaf curl disease. Used the remedy suggested by @Dr_AgriExpert in the community last week. Plants are recovering well now! 🍅💚\n\nThis community is a blessing for all farmers. Keep sharing your knowledge!",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&h=600&fit=crop",
    likes: 234,
    comments: 42,
    shares: 28,
    verified: false,
  },
  {
    id: 5,
    author: "Department of Horticulture",
    authorType: "government",
    avatar: "🌺",
    time: "2 days ago",
    content: "🚨 Weather Advisory 🚨\n\nHeavy rainfall expected in northern regions from Nov 8-10. Farmers are advised to:\n\n⚠️ Postpone harvesting\n⚠️ Ensure proper drainage\n⚠️ Store harvested crops safely\n⚠️ Protect livestock\n\nStay safe and stay updated!",
    likes: 2341,
    comments: 189,
    shares: 1234,
    verified: true,
  },
  {
    id: 6,
    author: "Suresh Patel",
    authorType: "farmer",
    avatar: "👨‍🌾",
    time: "2 days ago",
    content: "Looking for advice on pest control for cotton crop. Seeing white flies on leaves. Any organic solutions? Please share your experience. 🙏\n\n#PestControl #OrganicFarming #CottonCrop",
    likes: 123,
    comments: 78,
    shares: 12,
    verified: false,
  },
]

export default function WebCommunity() {
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

  // Filter posts based on active filter
  const filteredPosts = posts.filter(post => {
    if (activeFilter === "all") return true
    if (activeFilter === "government") return post.authorType === "government"
    if (activeFilter === "farmer") return post.authorType === "farmer"
    return true
  })

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">Connect with farmers and get updates from government agencies</p>
        </div>
        <Button 
          onClick={() => setShowNewPost(!showNewPost)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          ✍️ Create Post
        </Button>
      </div>

      {/* Create New Post */}
      {showNewPost && (
        <Card className="p-6 mb-6 border-2 border-primary">
          <div className="flex gap-4">
            <span className="text-4xl">👨‍🌾</span>
            <div className="flex-1">
              <h3 className="font-semibold mb-3">Share your thoughts with the community</h3>
              <Textarea
                placeholder="What's on your mind? Share your farming experience, ask questions, or provide advice..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="mb-4 min-h-[120px]"
              />
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowNewPost(false)
                    setNewPostContent("")
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border pb-4">
        <button 
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeFilter === "all" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          }`}
        >
          🌐 All Posts
        </button>
        <button 
          onClick={() => setActiveFilter("government")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeFilter === "government" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          }`}
        >
          🏛️ Government
        </button>
        <button 
          onClick={() => setActiveFilter("farmer")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeFilter === "farmer" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          }`}
        >
          👨‍🌾 Farmers
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl mb-2">📭</p>
            <p className="text-muted-foreground">No posts found in this category</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Post Header */}
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{post.avatar}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{post.author}</h3>
                  {post.verified && (
                    <span className="text-blue-500 text-xl" title="Verified Account">✓</span>
                  )}
                  {post.authorType === "government" && (
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-semibold">
                      Official
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-foreground whitespace-pre-line leading-relaxed">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">👍</span>
                <span className="font-semibold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition group">
                <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
                <span className="font-semibold">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition group">
                <span className="text-xl group-hover:scale-110 transition-transform">🔄</span>
                <span className="font-semibold">{post.shares}</span>
              </button>
            </div>
          </Card>
          ))
        )}
      </div>
    </div>
  )
}
