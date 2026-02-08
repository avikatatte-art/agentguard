"use client"

import { useState } from "react"
import { Navbar, type TabId } from "@/components/navbar"
import { ScanTab } from "@/components/tabs/scan-tab"
import { MapTab } from "@/components/tabs/map-tab"
import { MonitorTab } from "@/components/tabs/monitor-tab"
import { TestTab } from "@/components/tabs/test-tab"

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("scan")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "scan" && <ScanTab onNavigateToMap={() => setActiveTab("map")} />}
      {activeTab === "map" && <MapTab />}
      {activeTab === "monitor" && <MonitorTab onNavigateToTest={() => setActiveTab("test")} />}
      {activeTab === "test" && <TestTab />}
    </div>
  )
}
