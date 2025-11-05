"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  sender: "user" | "bot"
  text: string
  timestamp: Date
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Namaste! 🙏 I am Krishi Mitra (Farmer's Friend), your AI farming assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied or unavailable:", error)
        }
      )
    }
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          location: userLocation,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: messages.length + 2,
        sender: "bot",
        text: data.reply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: messages.length + 2,
        sender: "bot",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-28 right-6 z-50 flex flex-col items-center gap-2">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            AI Chat
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-transform bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            title="Chat with Krishi Mitra"
          >
            <span className="text-3xl">🌾</span>
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl z-50 overflow-hidden border-2 bg-background rounded-lg">
          {/* Header with Close Button - Fixed, Never Scrolls */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between flex-shrink-0 relative z-20">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-3xl">🌾</span>
              <div>
                <h3 className="font-bold text-lg">Krishi Mitra</h3>
                <p className="text-xs opacity-90">Your Farming Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition flex-shrink-0 ml-2"
              title="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-muted/20 overflow-hidden" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-card border border-border rounded-bl-none"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🤖</span>
                        <span className="text-xs font-semibold text-green-600">Krishi Mitra</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming..."
                className="resize-none min-h-[60px]"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-green-500 hover:bg-green-600 text-white px-6"
              >
                <span className="text-xl">📤</span>
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              {userLocation ? "📍 Location enabled for better advice" : "💡 Enable location for region-specific advice"}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
