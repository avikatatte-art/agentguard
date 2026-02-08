"use client"

import { cn } from "@/lib/utils"

const tabs = [
  { id: "scan", label: "1. Scan" },
  { id: "map", label: "2. Map" },
  { id: "monitor", label: "3. Simulate" },
  { id: "test", label: "4. Playbook" },
] as const

export type TabId = (typeof tabs)[number]["id"]

interface NavbarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

function AgentGuardLogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Shield shape */}
      <path
        d="M18 2L4 8v10c0 8.4 5.96 16.24 14 18 8.04-1.76 14-9.6 14-18V8L18 2z"
        fill="url(#shield-grad)"
        fillOpacity="0.15"
        stroke="url(#shield-grad)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Central node */}
      <circle cx="18" cy="16" r="3" fill="url(#shield-grad)" />
      {/* Top node */}
      <circle cx="18" cy="9" r="2" fill="hsl(231, 68%, 56%)" />
      {/* Bottom-left node */}
      <circle cx="12" cy="22" r="2" fill="hsl(270, 60%, 58%)" />
      {/* Bottom-right node */}
      <circle cx="24" cy="22" r="2" fill="hsl(197, 50%, 50%)" />
      {/* Connections */}
      <line x1="18" y1="13" x2="18" y2="11" stroke="hsl(231, 68%, 56%)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="15.5" y1="17.8" x2="13.2" y2="20.5" stroke="hsl(270, 60%, 58%)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20.5" y1="17.8" x2="22.8" y2="20.5" stroke="hsl(197, 50%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Outer ring arcs connecting outer nodes */}
      <path
        d="M18 9 Q10 14 12 22"
        fill="none"
        stroke="hsl(231, 68%, 56%)"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <path
        d="M18 9 Q26 14 24 22"
        fill="none"
        stroke="hsl(197, 50%, 50%)"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <path
        d="M12 22 Q18 26 24 22"
        fill="none"
        stroke="hsl(270, 60%, 58%)"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="shield-grad" x1="4" y1="2" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(231, 68%, 56%)" />
          <stop offset="1" stopColor="hsl(270, 60%, 58%)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <AgentGuardLogo />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-foreground">
              AgentGuard
            </span>
            <span className="text-xs leading-tight text-muted-foreground">
              Multi-Agent Reliability Platform
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
