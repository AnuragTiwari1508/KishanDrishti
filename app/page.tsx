"use client"

import { useState, useEffect } from "react"
import MobileView from "@/components/mobile/mobile-view"
import WebView from "@/components/web/web-view"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  return isMobile ? <MobileView /> : <WebView />
}
