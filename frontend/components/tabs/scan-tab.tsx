"use client"

import React from "react"

import { useState } from "react"
import { Bot, Upload, ShieldCheck, AlertTriangle, Activity, Sparkles, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { useAppStore } from "@/lib/store"
import { scanAgents, getGraph } from "@/lib/api"

const TITLE = "SCAN YOUR AGENT ECOSYSTEM"
const HIGHLIGHT_WORDS = new Set(["SCAN", "ECOSYSTEM"])

function FlipTitle() {
  const [key] = useState(0)

  // Split title into words so we can check highlights, then into chars
  const titleWords = TITLE.split(" ")
  let globalIndex = 0

  return (
    <div className="flip-heading" style={{ perspective: 800 }}>
      <h1
        key={key}
        className="flex flex-wrap text-4xl font-black uppercase leading-none tracking-tight md:text-5xl lg:text-[4rem]"
        style={{ transformStyle: "preserve-3d" }}
        aria-label={TITLE}
      >
        {titleWords.map((word, wi) => {
          const isHighlighted = HIGHLIGHT_WORDS.has(word)
          const chars = word.split("").map((char) => {
            const idx = globalIndex++
            return (
              <span
                key={`${key}-${idx}`}
                className={`flip-char inline-block ${isHighlighted ? "flip-char-highlight" : "text-foreground"}`}
                style={{ "--index": idx } as React.CSSProperties}
              >
                {char}
              </span>
            )
          })
          // Add a space after each word except the last
          if (wi < titleWords.length - 1) {
            globalIndex++
          }
          return (
            <span key={wi} className="mr-3 inline-flex md:mr-4">
              {chars}
            </span>
          )
        })}
      </h1>

      <style jsx>{`
        .flip-char {
          display: inline-block;
          transform-origin: bottom center;
          opacity: 0;
          transform: rotateX(-90deg) translateY(40px);
          animation: flip-up 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: calc(0.06s * var(--index));
          will-change: transform, opacity;
        }

        .flip-char-highlight {
          background-image: linear-gradient(
            90deg,
            hsl(231, 68%, 56%),
            hsl(270, 60%, 58%),
            hsl(197, 50%, 55%),
            hsl(231, 68%, 56%)
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation:
            flip-up 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
            gradient-shift 4s linear infinite 1.6s,
            neon-pulse 1.2s ease-in-out 1 forwards;
          animation-delay: calc(0.06s * var(--index)), 1.6s, calc(0.06s * var(--index) + 0.8s);
        }

        @keyframes flip-up {
          0% {
            opacity: 0;
            transform: rotateX(-90deg) translateY(40px);
          }
          100% {
            opacity: 1;
            transform: rotateX(0deg) translateY(0);
          }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        @keyframes neon-pulse {
          0% {
            filter: none;
          }
          40% {
            filter: drop-shadow(0 0 14px hsl(231, 68%, 76%)) drop-shadow(0 0 36px hsl(270, 60%, 68%)) drop-shadow(0 0 56px hsl(231, 68%, 46%));
          }
          100% {
            filter: none;
          }
        }

        @media (max-width: 768px) {
          h1 { font-size: 2rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .flip-char {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

interface ScanTabProps {
  onNavigateToMap?: () => void
}

export function ScanTab({ onNavigateToMap }: ScanTabProps) {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const {
    selectedDataset,
    setSelectedDataset,
    scanResult,
    setScanResult,
    setGraphData,
  } = useAppStore()

  async function handleScanDemo() {
    setScanning(true)
    setError(null)
    try {
      const result = await scanAgents(selectedDataset)
      setScanResult(result)
      const graph = await getGraph()
      setGraphData(graph)
      // Brief pause for UX then navigate
      setTimeout(() => {
        setScanning(false)
        onNavigateToMap?.()
      }, 800)
    } catch (e: any) {
      setError(e.message || "Failed to connect to backend")
      setScanning(false)
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center">
      {/* Hero section with Spline robot */}
      <Card className="relative mx-6 mt-6 w-full max-w-6xl overflow-hidden border-border bg-card/60 backdrop-blur-sm">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="hsl(231, 68%, 56%)"
        />

        <div className="flex min-h-[480px] flex-col md:flex-row">
          {/* Left content */}
          <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12">
            <FlipTitle />

            <motion.p
              className="mt-5 max-w-md text-pretty text-base text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8, ease: "easeOut" }}
            >
              Discover dependencies, identify risks, and prevent cascade
              failures in your AI agent ecosystem.
            </motion.p>

            {/* Gemini 3 badge */}
            <motion.div
              className="mt-4 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium text-blue-300 ring-1 ring-blue-500/30">
                <Sparkles className="h-3 w-3" />
                Powered by Gemini 3 AI
              </span>
            </motion.div>
          </div>

          {/* Right content - Spline robot */}
          <div className="relative flex-1">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
          </div>
        </div>
      </Card>

      {/* Cards section */}
      <motion.div
        className="flex w-full max-w-6xl flex-col gap-5 px-6 py-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.0, ease: "easeOut" }}
      >
        {/* Dataset selector */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            className={`cursor-pointer border-2 transition-all ${
              selectedDataset === "ecommerce"
                ? "border-primary ring-2 ring-primary/20 bg-card/80"
                : "border-border bg-card/50 hover:border-primary/50"
            }`}
            onClick={() => setSelectedDataset("ecommerce")}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xl">
                  🛒
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">E-commerce Platform</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    24 AI agents: Pricing, Inventory, Payment, Shipping, Cart, Checkout, Support
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    24 agents &bull; 28 deps &bull; 4 shadow agents
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer border-2 transition-all ${
              selectedDataset === "content"
                ? "border-purple-500 ring-2 ring-purple-500/20 bg-card/80"
                : "border-border bg-card/50 hover:border-purple-500/50"
            }`}
            onClick={() => setSelectedDataset("content")}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-xl">
                  🎨
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">AI Content Pipeline</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    18 AI agents: Text/Image/Video generators, Quality, SEO, Translation
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    18 agents &bull; 19 deps &bull; 3 shadow agents
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scan button */}
        <Button
          className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:brightness-110"
          size="lg"
          onClick={handleScanDemo}
          disabled={scanning}
        >
          {scanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning {selectedDataset === "ecommerce" ? "E-commerce" : "AI Content"} Agents...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              Scan {selectedDataset === "ecommerce" ? "E-commerce" : "AI Content Pipeline"} Dataset
            </>
          )}
        </Button>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Scan results */}
        <AnimatePresence>
          {scanResult && !scanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3 md:grid-cols-4"
            >
              <Card className="border-border bg-card/80">
                <CardContent className="flex flex-col items-center p-4">
                  <ShieldCheck className="mb-1 h-5 w-5 text-blue-400" />
                  <span className="text-2xl font-bold text-foreground">{scanResult.total_agents}</span>
                  <span className="text-xs text-muted-foreground">Total Agents</span>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/80">
                <CardContent className="flex flex-col items-center p-4">
                  <AlertTriangle className="mb-1 h-5 w-5 text-yellow-400" />
                  <span className="text-2xl font-bold text-foreground">{scanResult.total_shadow_agents}</span>
                  <span className="text-xs text-muted-foreground">Shadow Agents</span>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/80">
                <CardContent className="flex flex-col items-center p-4">
                  <AlertTriangle className="mb-1 h-5 w-5 text-red-400" />
                  <span className="text-2xl font-bold text-foreground">{scanResult.metrics?.critical_agents ?? 0}</span>
                  <span className="text-xs text-muted-foreground">Critical Risks</span>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/80">
                <CardContent className="flex flex-col items-center p-4">
                  <Sparkles className="mb-1 h-5 w-5 text-purple-400" />
                  <span className="text-2xl font-bold text-foreground">
                    {scanResult.gemini_available ? "ON" : "OFF"}
                  </span>
                  <span className="text-xs text-muted-foreground">Gemini 3 AI</span>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secondary card -- Upload (disabled) */}
        <Card className="border-2 border-dashed border-border bg-card/50">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-base font-semibold text-foreground">
              Upload OpenTelemetry Traces
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Coming soon: Upload your own trace files
            </p>
            <Button
              variant="secondary"
              className="mt-4 w-full"
              size="lg"
              disabled
            >
              Upload JSON File
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
