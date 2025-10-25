"use client"

interface ARGuidanceOverlayProps {
  isVisible: boolean
}

export default function ARGuidanceOverlay({ isVisible }: ARGuidanceOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-accent rounded-full opacity-60" />

      {/* Grid Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-accent/30" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-accent/30" />
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-accent/30" />
        <div className="absolute top-0 bottom-0 left-2/3 w-px bg-accent/30" />
      </div>

      {/* Corner Markers */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-6 h-6 border-2 border-accent`} />
      ))}

      {/* Guidance Text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-xs font-semibold">
        Position crop in center
      </div>

      {/* Status Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded">Ready to capture</span>
      </div>
    </div>
  )
}
