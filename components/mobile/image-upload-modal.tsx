"use client"

import type React from "react"

import { useState, useRef } from "react"

interface ImageUploadModalProps {
  onClose: () => void
}

export default function ImageUploadModal({ onClose }: ImageUploadModalProps) {
  const [step, setStep] = useState(1)
  const [preview, setPreview] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
        setStep(2)
      }
      reader.readAsDataURL(file)
    }
  }

  const startARCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setStep(3)
      }
    } catch (err) {
      console.error("Camera access denied:", err)
    }
  }

  const captureARImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageData = canvasRef.current.toDataURL("image/jpeg")
        setPreview(imageData)
        setStep(2)
        // Stop video stream
        const stream = videoRef.current.srcObject as MediaStream
        stream?.getTracks().forEach((track) => track.stop())
      }
    }
  }

  const analyzeImage = async () => {
    setAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        cropType: "Wheat",
        cropConfidence: 94,
        growthStage: "Flowering",
        daysToHarvest: "25-30",
        healthStatus: "Excellent",
        pestRisk: "Low",
        diseaseRisk: "Very Low",
        soilMoisture: "Optimal",
        nitrogenLevel: "Good",
        recommendations: [
          "Continue current irrigation schedule",
          "Monitor for armyworm activity",
          "Apply potassium fertilizer in 2 weeks",
        ],
        estimatedYield: "45 tons/acre",
        agriPointsReward: 150,
      })
      setAnalyzing(false)
      setStep(4)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-2xl p-6 animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto">
        {/* Step 1: Upload Options */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Upload Crop Image</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Position your crop clearly in the center for best AI analysis
            </p>

            <div className="space-y-3 mb-6">
              {/* Gallery Upload */}
              <label className="block">
                <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center cursor-pointer hover:bg-primary/5 transition">
                  <span className="text-4xl block mb-2">📷</span>
                  <p className="font-semibold">Upload from Gallery</p>
                  <p className="text-xs text-muted-foreground">Select existing photo</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
              </label>

              {/* AR Camera */}
              <button
                onClick={startARCamera}
                className="w-full border-2 border-dashed border-secondary rounded-lg p-6 text-center hover:bg-secondary/5 transition"
              >
                <span className="text-4xl block mb-2">📹</span>
                <p className="font-semibold">AR Camera Guidance</p>
                <p className="text-xs text-muted-foreground">Real-time positioning help</p>
              </button>
            </div>

            <button onClick={onClose} className="w-full py-2 border border-border rounded-lg hover:bg-muted transition">
              Cancel
            </button>
          </div>
        )}

        {/* Step 2: Image Preview & Guidance */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Review Image</h2>

            {preview && (
              <div className="relative mb-4">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full rounded-lg max-h-64 object-cover"
                />
                {/* AR Guidance Grid */}
                <div className="absolute inset-0 rounded-lg border-2 border-primary/30 pointer-events-none">
                  <div className="grid grid-cols-3 grid-rows-3 h-full">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-primary/20" />
                    ))}
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-accent rounded-full opacity-50" />
                </div>
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4 border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">AR Guidance Tips:</p>
              <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                <li>✓ Center the crop in the circle</li>
                <li>✓ Ensure good lighting</li>
                <li>✓ Include soil and leaves in frame</li>
                <li>✓ Avoid shadows and reflections</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition"
              >
                Back
              </button>
              <button
                onClick={analyzeImage}
                disabled={analyzing}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50"
              >
                {analyzing ? "Analyzing..." : "Analyze Image"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: AR Camera */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">AR Camera Guidance</h2>

            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <video ref={videoRef} autoPlay playsInline className="w-full aspect-video object-cover" />
              {/* AR Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 border-4 border-accent rounded-full opacity-70" />
                <div className="absolute top-4 left-4 text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded">
                  Position crop in circle
                </div>
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" width={640} height={480} />

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition"
              >
                Cancel
              </button>
              <button
                onClick={captureARImage}
                className="flex-1 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition font-semibold"
              >
                Capture
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Analysis Results */}
        {step === 4 && analysisResult && (
          <div>
            <h2 className="text-xl font-bold mb-4">AI Analysis Results</h2>

            {/* Main Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary to-primary/50 text-white p-4 rounded-lg">
                <p className="text-xs opacity-90">Crop Type</p>
                <p className="text-lg font-bold">{analysisResult.cropType}</p>
                <p className="text-xs opacity-75">{analysisResult.cropConfidence}% confidence</p>
              </div>

              <div className="bg-gradient-to-br from-secondary to-secondary/50 text-white p-4 rounded-lg">
                <p className="text-xs opacity-90">Growth Stage</p>
                <p className="text-lg font-bold">{analysisResult.growthStage}</p>
                <p className="text-xs opacity-75">{analysisResult.daysToHarvest} days</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
                <p className="text-xs opacity-90">Health Status</p>
                <p className="text-lg font-bold">{analysisResult.healthStatus}</p>
                <p className="text-xs opacity-75">Pest: {analysisResult.pestRisk}</p>
              </div>

              <div className="bg-gradient-to-br from-accent to-accent/50 text-white p-4 rounded-lg">
                <p className="text-xs opacity-90">Yield Estimate</p>
                <p className="text-lg font-bold">{analysisResult.estimatedYield}</p>
                <p className="text-xs opacity-75">Based on current stage</p>
              </div>
            </div>

            {/* Soil Analysis */}
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Soil & Nutrient Analysis</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Soil Moisture</span>
                  <span className="text-sm font-semibold text-green-600">{analysisResult.soilMoisture}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nitrogen Level</span>
                  <span className="text-sm font-semibold text-green-600">{analysisResult.nitrogenLevel}</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">Recommendations</h3>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="text-sm text-blue-800 dark:text-blue-200 flex gap-2">
                    <span>→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AgriPoints Reward */}
            <div className="bg-gradient-to-r from-secondary to-accent text-white p-4 rounded-lg mb-4 text-center">
              <p className="text-sm opacity-90">AgriPoints Earned</p>
              <p className="text-3xl font-bold">+{analysisResult.agriPointsReward}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition"
              >
                Upload Another
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
