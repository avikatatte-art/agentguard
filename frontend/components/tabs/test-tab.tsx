"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Loader2,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  AlertTriangle,
  Hash,
  Link2,
  Phone,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppStore } from "@/lib/store"
import { getPlaybook } from "@/lib/api"

export function TestTab() {
  const { simulationResult, playbook, setPlaybook } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (simulationResult && !playbook && !loading) {
      fetchPlaybook()
    }
  }, [simulationResult, playbook])

  async function fetchPlaybook() {
    setLoading(true)
    setError(null)
    try {
      console.log("[TestTab] Fetching playbook from backend...")
      const result = await getPlaybook()
      console.log("[TestTab] Playbook received:", result)
      setPlaybook(result)
    } catch (e: any) {
      console.error("[TestTab] Playbook fetch error:", e)
      setError(e.message || "Failed to generate playbook")
    } finally {
      setLoading(false)
    }
  }

  function handleRegenerate() {
    setPlaybook(null)
    fetchPlaybook()
  }

  if (!simulationResult) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground">No Simulation Data</h1>
        <p className="mt-2 text-muted-foreground">
          Run a chaos simulation in the Simulate tab first.
        </p>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
        <h1 className="text-xl font-bold text-foreground">
          Generating Recovery Playbook...
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Gemini 3 AI is analyzing the incident and creating a recovery plan
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-red-400" />
        <h1 className="text-xl font-bold text-foreground">Error</h1>
        <p className="mt-2 text-sm text-red-400">{error}</p>
        <Button className="mt-4" onClick={fetchPlaybook}>
          Retry
        </Button>
      </main>
    )
  }

  if (!playbook) return null

  const severityColor: Record<string, string> = {
    CRITICAL: "text-red-400 border-red-500/30 bg-red-500/10",
    HIGH: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    MEDIUM: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    LOW: "text-green-400 border-green-500/30 bg-green-500/10",
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recovery Playbook</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {playbook.incident}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button size="sm" variant="outline" onClick={handleRegenerate} className="text-xs">
            <RotateCcw className="mr-1 h-3 w-3" /> Regenerate
          </Button>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium text-blue-300 ring-1 ring-blue-500/30">
            <Sparkles className="h-3 w-3" />
            Gemini 3 AI
          </span>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${severityColor[playbook.severity] || severityColor.MEDIUM}`}>
            {playbook.severity}
          </span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Card className="border-border bg-card/80">
          <CardContent className="flex flex-col items-center p-4">
            <Clock className="mb-1 h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-foreground">{playbook.estimated_recovery_time}</span>
            <span className="text-xs text-muted-foreground">Recovery Time</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card/80">
          <CardContent className="flex flex-col items-center p-4">
            <FileText className="mb-1 h-5 w-5 text-green-400" />
            <span className="text-2xl font-bold text-foreground">{playbook.steps.length}</span>
            <span className="text-xs text-muted-foreground">Recovery Phases</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card/80">
          <CardContent className="flex flex-col items-center p-4">
            <Shield className="mb-1 h-5 w-5 text-purple-400" />
            <span className="text-2xl font-bold text-foreground">{playbook.audit_trail.length}</span>
            <span className="text-xs text-muted-foreground">Evidence Items</span>
          </CardContent>
        </Card>
      </div>

      {/* Gemini AI Analysis */}
      {playbook.gemini_analysis && (
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-purple-300">
                Gemini 3 Incident Analysis
              </h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="mb-1 text-xs font-medium text-purple-300/80">Root Cause</p>
                <p>{playbook.gemini_analysis.root_cause}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-purple-300/80">Blast Radius</p>
                <p>{playbook.gemini_analysis.blast_radius_explanation}</p>
              </div>
              {(playbook.gemini_analysis as any).business_impact && (
                <div>
                  <p className="mb-1 text-xs font-medium text-purple-300/80">Business Impact</p>
                  <p>{(playbook.gemini_analysis as any).business_impact}</p>
                </div>
              )}
              {(playbook.gemini_analysis as any).recovery_time_estimate && (
                <div>
                  <p className="mb-1 text-xs font-medium text-purple-300/80">Recovery Time Estimate</p>
                  <p>{(playbook.gemini_analysis as any).recovery_time_estimate}</p>
                </div>
              )}
              {playbook.gemini_analysis.recommended_actions?.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-medium text-purple-300/80">Recommended Actions</p>
                  <ul className="space-y-1">
                    {playbook.gemini_analysis.recommended_actions.map((a: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-purple-400" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {playbook.gemini_analysis.prevention_measures?.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-medium text-purple-300/80">Prevention Measures</p>
                  <ul className="space-y-1">
                    {playbook.gemini_analysis.prevention_measures.map((m: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Shield className="mt-0.5 h-3 w-3 shrink-0 text-blue-400" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recovery Steps */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">Recovery Phases</h2>
        {playbook.steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border bg-card/80">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {step.phase}
                  </h3>
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {step.time_range}
                  </span>
                </div>

                {/* Actions */}
                {step.actions && step.actions.length > 0 && (
                  <div className="space-y-2">
                    {step.actions.map((action: any, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-border bg-background/50 p-3"
                      >
                        <div className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                          <span>{typeof action === "string" ? action : action.action}</span>
                        </div>
                        {action.verification && (
                          <div className="mt-1.5 flex items-start gap-2 pl-5 text-xs text-muted-foreground">
                            <Shield className="mt-0.5 h-3 w-3 shrink-0 text-blue-400" />
                            {action.verification}
                          </div>
                        )}
                        {action.expected_outcome && (
                          <div className="mt-1 flex items-start gap-2 pl-5 text-xs text-muted-foreground/70">
                            <span>Expected: {action.expected_outcome}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Rollback Plan */}
      {playbook.rollback_plan && (
        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardContent className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-orange-400" />
              <h3 className="text-sm font-semibold text-orange-300">Rollback Plan</h3>
            </div>
            <p className="text-sm text-muted-foreground">{playbook.rollback_plan}</p>
          </CardContent>
        </Card>
      )}

      {/* Escalation Contacts */}
      {playbook.escalation_contacts && playbook.escalation_contacts.length > 0 && (
        <Card className="border-border bg-card/80">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Escalation Contacts</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {playbook.escalation_contacts.map((contact: string, i: number) => (
                <span key={i} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {contact}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Trail */}
      {playbook.audit_trail && playbook.audit_trail.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            Evidence & Audit Trail
          </h2>
          {playbook.audit_trail.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border bg-card/80">
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      entry.type === "dependency"
                        ? "bg-blue-500/10 text-blue-400"
                        : entry.type === "anomaly"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-purple-500/10 text-purple-400"
                    }`}>
                      {entry.type}
                    </span>
                    <p className="text-sm font-medium text-foreground">{entry.title}</p>
                  </div>
                  <ul className="space-y-0.5">
                    {entry.evidence.map((ev: string, idx: number) => (
                      <li key={idx} className="text-xs text-muted-foreground">
                        {ev}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Blockchain Proof */}
      {playbook.blockchain_proof && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Link2 className="h-4 w-4 text-green-400" />
              <h3 className="text-sm font-semibold text-green-300">
                Blockchain Verification
              </h3>
              {playbook.blockchain_proof.verified && (
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                  Verified
                </span>
              )}
            </div>
            <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
              <div>
                <span className="text-muted-foreground/60">Chain:</span>{" "}
                {playbook.blockchain_proof.chain}
              </div>
              <div>
                <span className="text-muted-foreground/60">Block:</span>{" "}
                {playbook.blockchain_proof.block}
              </div>
              <div className="sm:col-span-2">
                <span className="text-muted-foreground/60">Tx Hash:</span>{" "}
                <span className="font-mono">{playbook.blockchain_proof.tx_hash}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
