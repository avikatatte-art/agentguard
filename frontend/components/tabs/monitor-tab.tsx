"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Zap, Clock, Activity, Loader2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppStore } from "@/lib/store"
import { simulateFailure } from "@/lib/api"

interface MonitorTabProps {
  onNavigateToTest?: () => void
}

export function MonitorTab({ onNavigateToTest }: MonitorTabProps) {
  const { scanResult, simulationResult, setSimulationResult } = useAppStore()
  const [simulating, setSimulating] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agents = scanResult?.agents ?? []
  function getRisk(a: any): string {
    return a.risk_level || a.risk || "medium"
  }

  const criticalAgents = agents.filter(
    (a) => getRisk(a) === "critical" || getRisk(a) === "high"
  )

  async function handleSimulate(agentId: string) {
    setSelectedAgent(agentId)
    setSimulating(true)
    try {
      const result = await simulateFailure(agentId)
      setSimulationResult(result)
    } catch (e) {
      console.error("Simulation failed:", e)
    } finally {
      setSimulating(false)
    }
  }

  if (!scanResult) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <Activity className="mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground">No Scan Data</h1>
        <p className="mt-2 text-muted-foreground">
          Go to the Scan tab first to load agent data.
        </p>
      </main>
    )
  }

  const severityColor: Record<string, string> = {
    critical: "text-red-400 bg-red-500/10 border-red-500/30",
    high: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    medium: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    low: "text-green-400 bg-green-500/10 border-green-500/30",
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Chaos Simulation</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a critical agent to simulate failure and see the blast radius
        </p>
      </div>

      {/* Agent selector grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {criticalAgents.map((agent) => (
          <Card
            key={agent.id}
            className={`cursor-pointer border transition-all hover:scale-[1.02] ${
              selectedAgent === agent.id
                ? "ring-2 ring-primary border-primary"
                : "border-border"
            }`}
            onClick={() => handleSimulate(agent.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.type}</p>
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                    severityColor[getRisk(agent)] || severityColor.medium
                  }`}
                >
                  {getRisk(agent)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simulation loading */}
      {simulating && (
        <Card className="border-border bg-card/80">
          <CardContent className="flex items-center justify-center gap-3 p-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Simulating failure cascade...
            </span>
          </CardContent>
        </Card>
      )}

      {/* Simulation results */}
      <AnimatePresence>
        {simulationResult && !simulating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="flex flex-col items-center p-4">
                  <Zap className="mb-1 h-5 w-5 text-red-400" />
                  <span className="text-lg font-bold text-red-400">
                    {simulationResult.failed_agent.name}
                  </span>
                  <span className="text-xs text-muted-foreground">Failed Agent</span>
                </CardContent>
              </Card>
              <Card className="border-orange-500/30 bg-orange-500/5">
                <CardContent className="flex flex-col items-center p-4">
                  <AlertTriangle className="mb-1 h-5 w-5 text-orange-400" />
                  <span className="text-2xl font-bold text-orange-400">
                    {simulationResult.impacted_count}
                  </span>
                  <span className="text-xs text-muted-foreground">Affected Agents</span>
                </CardContent>
              </Card>
              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="flex flex-col items-center p-4">
                  <AlertTriangle className="mb-1 h-5 w-5 text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">
                    {simulationResult.impact_estimate.severity}
                  </span>
                  <span className="text-xs text-muted-foreground">Severity</span>
                </CardContent>
              </Card>
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardContent className="flex flex-col items-center p-4">
                  <Clock className="mb-1 h-5 w-5 text-blue-400" />
                  <span className="text-sm font-bold text-blue-400">
                    {simulationResult.impact_estimate.estimated_recovery_time}
                  </span>
                  <span className="text-xs text-muted-foreground">Recovery Time</span>
                </CardContent>
              </Card>
            </div>

            {/* Revenue risk + workflows */}
            <div className="grid gap-3 md:grid-cols-2">
              <Card className="border-border bg-card/80">
                <CardContent className="p-5">
                  <h3 className="mb-2 text-sm font-semibold text-foreground">
                    Revenue Risk
                  </h3>
                  <span className="text-xl font-bold text-red-400">
                    {simulationResult.impact_estimate.revenue_risk}
                  </span>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/80">
                <CardContent className="p-5">
                  <h3 className="mb-2 text-sm font-semibold text-foreground">
                    Blast Radius Score
                  </h3>
                  <span className="text-xl font-bold text-orange-400">
                    {simulationResult.blast_radius_score.toFixed(1)} / 10
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* Cascade path */}
            <Card className="border-border bg-card/80">
              <CardContent className="p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Cascade Failure Path
                </h3>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="rounded-md bg-red-500/20 px-2 py-1 text-xs font-medium text-red-400">
                    {simulationResult.failed_agent.name}
                  </span>
                  {simulationResult.impacted_agents.map((agent: any, i: number) => (
                    <span key={i} className="flex items-center gap-1">
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      <span className="rounded-md bg-orange-500/10 px-2 py-1 text-xs font-medium text-orange-300">
                        {agent.name}
                      </span>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impacted agents detail */}
            <Card className="border-border bg-card/80">
              <CardContent className="p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Impacted Agents ({simulationResult.impacted_count})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {simulationResult.impacted_agents.map((agent: any, i: number) => (
                    <span
                      key={i}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        agent.risk === "critical"
                          ? "border-red-500/30 bg-red-500/10 text-red-300"
                          : agent.risk === "high"
                          ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
                          : "border-blue-500/30 bg-blue-500/10 text-blue-300"
                      }`}
                    >
                      {agent.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impacted workflows */}
            {simulationResult.impacted_workflows.length > 0 && (
              <Card className="border-border bg-card/80">
                <CardContent className="p-5">
                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                    Impacted Workflows
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {simulationResult.impacted_workflows.map((wf: string, i: number) => (
                      <span
                        key={i}
                        className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                      >
                        {wf}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generate playbook button */}
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:brightness-110"
              size="lg"
              onClick={() => onNavigateToTest?.()}
            >
              Generate AI Recovery Playbook
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
