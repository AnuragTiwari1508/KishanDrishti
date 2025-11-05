"use client"

interface MobileNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function MobileNavigation({ activeTab, setActiveTab }: MobileNavigationProps) {
  const tabs = [
    { id: "feed", label: "Feed", icon: "📰" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "upload", label: "Upload", icon: "📸" },
    { id: "reports", label: "Reports", icon: "📊" },
    { id: "wallet", label: "Wallet", icon: "💰" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto shadow-2xl">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.id
                ? "text-primary border-t-2 border-primary scale-110"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
