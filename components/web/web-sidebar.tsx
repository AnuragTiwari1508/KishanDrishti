"use client"

interface WebSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function WebSidebar({ activeSection, setActiveSection }: WebSidebarProps) {
  const sections = [
    { id: "feed", label: "Feed", icon: "📰" },
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "complaints", label: "Complaints", icon: "📝" },
    { id: "profile", label: "Profile", icon: "👤" },
  ]

  return (
    <div className="w-64 bg-card border-r border-border p-6 sticky top-0 h-screen overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-3xl">🌾</span>
        <h1 className="text-2xl font-bold">AgriTech</h1>
      </div>

      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
              activeSection === section.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
            }`}
          >
            <span className="text-xl">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-border">
        <div className="bg-gradient-agri text-primary-foreground p-4 rounded-lg">
          <p className="text-xs opacity-90">AgriPoints Balance</p>
          <h3 className="text-2xl font-bold">2,450</h3>
        </div>
      </div>
    </div>
  )
}
