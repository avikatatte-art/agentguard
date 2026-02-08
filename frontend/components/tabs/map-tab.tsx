"use client"

import { useEffect, useRef } from "react"
import { useAppStore } from "@/lib/store"

export function MapTab() {
  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const { graphData, scanResult } = useAppStore()

  // Use backend data if available, otherwise use hardcoded ecommerce defaults
  const nodes = graphData?.nodes ?? []
  const edges = graphData?.edges ?? []
  const datasetType = scanResult?.demo_type ?? "ecommerce"

  // Build agent list from backend data or fallback
  const agents = nodes.length > 0
    ? nodes.map((n: any) => ({
        id: n.id,
        name: n.data.label,
        type: n.data.type?.replace(/_/g, " ") ?? "agent",
        risk: n.data.risk ?? "medium",
        icon: getIcon(n.data.type, n.data.label),
        row: n.position.y,
        col: n.position.x,
      }))
    : defaultAgents

  // Group into rows
  const rows: typeof agents[] = []
  const ySet = ([...new Set(agents.map((a: any) => a.row))] as number[]).sort((a, b) => a - b)
  ySet.forEach((y) => {
    rows.push(
      agents
        .filter((a: any) => a.row === y)
        .sort((a: any, b: any) => a.col - b.col)
    )
  })

  // Build connections from backend edges or fallback
  const connections = edges.length > 0
    ? edges.map((e: any) => ({
        from: e.source,
        to: e.target,
        type: e.data?.confidence != null && e.data.confidence < 0.9 ? "dashed" : "solid",
      }))
    : defaultConnections

  // Compute risk stats
  const criticalCount = agents.filter((a: any) => a.risk === "critical").length
  const highCount = agents.filter((a: any) => a.risk === "high").length
  const totalAgents = agents.length

  // Compute single points of failure (most depended-on agents)
  const depCount: Record<string, number> = {}
  connections.forEach((c: any) => {
    depCount[c.from] = (depCount[c.from] || 0) + 1
  })
  const spofs = Object.entries(depCount)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([id, count]) => {
      const agent = agents.find((a: any) => a.id === id)
      return { name: agent?.name ?? id, count: count as number }
    })

  // Overall risk score
  const riskScore = Math.min(10, (criticalCount * 2.5 + highCount * 1.5 + totalAgents * 0.1)).toFixed(1)
  const riskLevel = Number(riskScore) >= 7 ? "High severity detected" : Number(riskScore) >= 4 ? "Medium severity" : "Low severity"

  useEffect(() => {
    function drawConnections() {
      if (!svgRef.current || !canvasRef.current) return
      const svg = svgRef.current
      const canvas = canvasRef.current
      svg.innerHTML = ""

      connections.forEach((conn: any) => {
        const fromEl = document.querySelector(`[data-agent-id="${conn.from}"]`)
        const toEl = document.querySelector(`[data-agent-id="${conn.to}"]`)
        if (!fromEl || !toEl) return

        const fromRect = fromEl.getBoundingClientRect()
        const toRect = toEl.getBoundingClientRect()
        const canvasRect = canvas.getBoundingClientRect()

        const x1 = fromRect.left - canvasRect.left + fromRect.width / 2
        const y1 = fromRect.bottom - canvasRect.top
        const x2 = toRect.left - canvasRect.left + toRect.width / 2
        const y2 = toRect.top - canvasRect.top

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        const midY = (y1 + y2) / 2
        const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`
        path.setAttribute("d", d)
        path.setAttribute("stroke", conn.type === "dashed" ? "#888" : "#667eea")
        path.setAttribute("stroke-width", "2")
        path.setAttribute("fill", "none")
        path.setAttribute("opacity", "0.6")
        if (conn.type === "dashed") path.setAttribute("stroke-dasharray", "5,5")

        // Arrow
        const arrowSize = 8
        const angle = Math.atan2(y2 - midY, x2 - x1)
        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        const pts = [
          [x2, y2],
          [x2 - arrowSize * Math.cos(angle - Math.PI / 6), y2 - arrowSize * Math.sin(angle - Math.PI / 6)],
          [x2 - arrowSize * Math.cos(angle + Math.PI / 6), y2 - arrowSize * Math.sin(angle + Math.PI / 6)],
        ]
        arrow.setAttribute("points", pts.map((p) => p.join(",")).join(" "))
        arrow.setAttribute("fill", conn.type === "dashed" ? "#888" : "#667eea")
        arrow.setAttribute("opacity", "0.6")

        svg.appendChild(path)
        svg.appendChild(arrow)
      })
    }

    const timer = setTimeout(drawConnections, 150)
    window.addEventListener("resize", drawConnections)

    // Hover highlighting
    const nodeEls = document.querySelectorAll(".agent-card")
    const cleanups: (() => void)[] = []
    nodeEls.forEach((el) => {
      const element = el as HTMLElement
      const onMove = (e: MouseEvent) => {
        const r = element.getBoundingClientRect()
        element.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`)
        element.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`)
      }
      const onEnter = () => {
        const id = element.dataset.agentId
        connections.forEach((c: any) => {
          if (c.from === id) document.querySelector(`[data-agent-id="${c.to}"]`)?.classList.add("hl")
          if (c.to === id) document.querySelector(`[data-agent-id="${c.from}"]`)?.classList.add("hl")
        })
      }
      const onLeave = () => {
        document.querySelectorAll(".agent-card").forEach((n) => n.classList.remove("hl"))
      }
      element.addEventListener("mousemove", onMove)
      element.addEventListener("mouseenter", onEnter)
      element.addEventListener("mouseleave", onLeave)
      cleanups.push(() => {
        element.removeEventListener("mousemove", onMove)
        element.removeEventListener("mouseenter", onEnter)
        element.removeEventListener("mouseleave", onLeave)
      })
    })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", drawConnections)
      cleanups.forEach((fn) => fn())
    }
  }, [connections, agents])

  if (!scanResult && nodes.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <h1 className="text-2xl font-bold text-foreground">No Graph Data</h1>
        <p className="mt-2 text-muted-foreground">Go to the Scan tab first to load agent data.</p>
      </main>
    )
  }

  return (
    <>
      <style jsx global>{`
        .bg-orbs { position: fixed; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; z-index: 0; }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.3; }
        .orb-1 { width: 400px; height: 400px; background: radial-gradient(circle, #667eea 0%, transparent 70%); top: 10%; left: 10%; animation: f1 25s ease-in-out infinite; }
        .orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, #b794f6 0%, transparent 70%); top: 60%; right: 10%; animation: f2 30s ease-in-out infinite; }
        .orb-3 { width: 350px; height: 350px; background: radial-gradient(circle, #ef4444 0%, transparent 70%); bottom: 10%; left: 50%; animation: f3 20s ease-in-out infinite; }
        @keyframes f1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,100px) scale(0.9); } }
        @keyframes f2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(80px,-120px) scale(1.1); } }
        @keyframes f3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-100px,-150px) scale(1.15); } }

        .map-wrap { position: relative; z-index: 10; padding: 2rem; max-width: 1600px; margin: 0 auto; }

        .map-title-box {
          background: rgba(26,26,26,0.8); backdrop-filter: blur(10px); border: 1px solid #2a2a2a;
          border-radius: 12px; padding: 2rem; margin-bottom: 2rem; position: relative; overflow: hidden;
        }
        .map-title-box::before {
          content: ""; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(90deg, #667eea, #764ba2, #667eea); background-size: 200% auto;
          border-radius: 12px; opacity: 0; z-index: -1; transition: opacity 0.3s; animation: bflow 3s linear infinite;
        }
        .map-title-box:hover::before { opacity: 0.6; }
        @keyframes bflow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }

        .map-title {
          font-size: 3rem; font-weight: 800; text-align: center;
          background: linear-gradient(90deg, #667eea, #764ba2, #f59e0b); background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: grad 4s linear infinite;
        }
        @keyframes grad { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }

        .graph-layout { display: flex; gap: 2rem; position: relative; z-index: 10; }
        .graph-canvas {
          flex: 1; min-height: 700px; background: rgba(26,26,26,0.6); backdrop-filter: blur(10px);
          border: 1px solid #2a2a2a; border-radius: 12px; padding: 3rem 2rem; position: relative;
        }
        .conn-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
        .graph-nodes { position: relative; z-index: 2; }

        .agent-row { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .agent-row:last-child { margin-bottom: 0; }

        .agent-card {
          width: 150px; background: rgba(30,30,30,0.8); border: 2px solid #3a3a3a; border-radius: 12px;
          padding: 0.875rem; text-align: center; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .agent-card::before {
          content: ""; position: absolute; top: var(--my, 50%); left: var(--mx, 50%);
          width: 200px; height: 200px; background: radial-gradient(circle, rgba(102,126,234,0.3), transparent 60%);
          transform: translate(-50%,-50%); opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .agent-card:hover::before { opacity: 1; }
        .agent-card:hover { transform: translateY(-4px); border-color: #667eea; box-shadow: 0 8px 32px rgba(102,126,234,0.3), 0 0 20px rgba(102,126,234,0.2); }
        .agent-card.hl { border-color: #b794f6; box-shadow: 0 8px 32px rgba(183,148,246,0.3), 0 0 20px rgba(183,148,246,0.2); }

        .agent-card.risk-critical { border-color: #ef4444; }
        .agent-card.risk-critical:hover { border-color: #ef4444; box-shadow: 0 8px 32px rgba(239,68,68,0.4), 0 0 20px rgba(239,68,68,0.3); }
        .agent-card.risk-high { border-color: #f59e0b; }
        .agent-card.risk-high:hover { border-color: #f59e0b; box-shadow: 0 8px 32px rgba(245,158,11,0.4); }
        .agent-card.risk-medium { border-color: #3b82f6; }
        .agent-card.risk-low { border-color: #10b981; }

        .a-icon { font-size: 1.75rem; margin-bottom: 0.375rem; }
        .a-name { font-size: 0.8rem; font-weight: 600; color: #e0e0e0; margin-bottom: 0.125rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .a-type { font-size: 0.7rem; color: #888; }
        .risk-badge { display: inline-block; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.65rem; font-weight: 600; margin-top: 0.375rem; }
        .risk-badge.critical { background: rgba(239,68,68,0.2); color: #ef4444; }
        .risk-badge.high { background: rgba(245,158,11,0.2); color: #f59e0b; }
        .risk-badge.medium { background: rgba(59,130,246,0.2); color: #3b82f6; }
        .risk-badge.low { background: rgba(16,185,129,0.2); color: #10b981; }

        .risk-panel {
          width: 300px; background: rgba(26,26,26,0.8); backdrop-filter: blur(10px);
          border: 1px solid #2a2a2a; border-radius: 12px; padding: 1.5rem; height: fit-content; position: sticky; top: 80px;
        }
        .panel-sec { margin-bottom: 1.5rem; }
        .panel-sec:last-child { margin-bottom: 0; }
        .sec-title { font-size: 0.875rem; font-weight: 600; color: #e0e0e0; margin-bottom: 0.75rem; }
        .stat-row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #2a2a2a; }
        .stat-row:last-child { border-bottom: none; }
        .stat-label { font-size: 0.75rem; color: #888; }
        .stat-val { font-size: 0.875rem; font-weight: 700; }

        .spof-card { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 0.6rem; margin-bottom: 0.4rem; }
        .spof-name { font-size: 0.8rem; font-weight: 600; color: #ef4444; }
        .spof-info { font-size: 0.7rem; color: #888; }

        .circ-card { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; padding: 0.6rem; margin-bottom: 0.4rem; }
        .circ-text { font-size: 0.75rem; color: #93c5fd; }

        .legend { display: flex; flex-direction: column; gap: 0.5rem; }
        .legend-item { display: flex; align-items: center; gap: 0.5rem; }
        .legend-box { width: 20px; height: 20px; border-radius: 4px; border: 2px solid; }
        .legend-box.critical { border-color: #ef4444; background: rgba(239,68,68,0.2); }
        .legend-box.high { border-color: #f59e0b; background: rgba(245,158,11,0.2); }
        .legend-box.medium { border-color: #3b82f6; background: rgba(59,130,246,0.2); }
        .legend-box.low { border-color: #10b981; background: rgba(16,185,129,0.2); }
        .legend-line { width: 24px; height: 2px; background: #667eea; }
        .legend-line.dashed { background: repeating-linear-gradient(to right, #888 0, #888 4px, transparent 4px, transparent 8px); }
        .legend-label { font-size: 0.7rem; color: #888; }

        @media (max-width: 1200px) { .graph-layout { flex-direction: column; } .risk-panel { width: 100%; position: relative; top: 0; } }
        @media (max-width: 768px) { .map-title { font-size: 2rem; } .agent-card { width: 130px; } }
      `}</style>

      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <main className="map-wrap">
        <div className="map-title-box">
          <div className="map-title">
            {datasetType === "content" ? "AI CONTENT PIPELINE MAP" : "E-COMMERCE AGENT MAP"}
          </div>
          <div style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.875rem", color: "#888" }}>
            {totalAgents} agents &bull; {connections.length} dependencies &bull; Powered by Gemini 3
          </div>
        </div>

        <div className="graph-layout">
          <div className="graph-canvas" ref={canvasRef}>
            <svg className="conn-svg" ref={svgRef}></svg>
            <div className="graph-nodes">
              {rows.map((row: any[], ri: number) => (
                <div className="agent-row" key={ri}>
                  {row.map((agent: any) => (
                    <div
                      key={agent.id}
                      className={`agent-card risk-${agent.risk}`}
                      data-agent-id={agent.id}
                    >
                      <div className="a-icon">{agent.icon}</div>
                      <div className="a-name">{agent.name}</div>
                      <div className="a-type">{agent.type}</div>
                      <div className={`risk-badge ${agent.risk}`}>{agent.risk.charAt(0).toUpperCase() + agent.risk.slice(1)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Risk Analysis Panel */}
          <div className="risk-panel">
            {/* Overall Risk */}
            <div className="panel-sec">
              <div className="sec-title">⚠️ Overall Risk</div>
              <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, color: Number(riskScore) >= 7 ? "#ef4444" : Number(riskScore) >= 4 ? "#f59e0b" : "#10b981" }}>
                  {riskScore}
                </span>
                <span style={{ fontSize: "1.25rem", color: "#888", marginLeft: 4 }}>/ 10</span>
              </div>
              <div style={{ textAlign: "center", fontSize: "0.8rem", color: Number(riskScore) >= 7 ? "#ef4444" : "#f59e0b" }}>
                {riskLevel}
              </div>
            </div>

            {/* Single Points of Failure */}
            <div className="panel-sec">
              <div className="sec-title">🔴 Single Points of Failure</div>
              {spofs.map((s, i) => (
                <div className="spof-card" key={i}>
                  <div className="spof-name">{s.name}</div>
                  <div className="spof-info">{s.count} agents depend on this</div>
                </div>
              ))}
            </div>

            {/* Circular Dependencies */}
            <div className="panel-sec">
              <div className="sec-title">🔄 Circular Dependencies</div>
              {findCircularDeps(connections).map((cycle, i) => (
                <div className="circ-card" key={i}>
                  <div className="circ-text">{cycle}</div>
                </div>
              ))}
              {findCircularDeps(connections).length === 0 && (
                <div style={{ fontSize: "0.75rem", color: "#10b981" }}>No circular dependencies detected</div>
              )}
            </div>

            {/* Legend */}
            <div className="panel-sec">
              <div className="sec-title">📊 Legend</div>
              <div className="legend">
                <div className="legend-item"><div className="legend-box critical"></div><div className="legend-label">Critical Risk</div></div>
                <div className="legend-item"><div className="legend-box high"></div><div className="legend-label">High Risk</div></div>
                <div className="legend-item"><div className="legend-box medium"></div><div className="legend-label">Medium Risk</div></div>
                <div className="legend-item"><div className="legend-box low"></div><div className="legend-label">Low Risk</div></div>
                <div className="legend-item"><div className="legend-line"></div><div className="legend-label">Strong dependency</div></div>
                <div className="legend-item"><div className="legend-line dashed"></div><div className="legend-label">Weak dependency</div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

// --- Helper: get icon for agent type/name ---
function getIcon(type: string, name: string): string {
  const n = (name || "").toLowerCase()
  if (n.includes("search")) return "🔍"
  if (n.includes("cart")) return "🛒"
  if (n.includes("checkout")) return "💳"
  if (n.includes("support") || n.includes("customer")) return "💬"
  if (n.includes("pricing") || n.includes("price")) return "💰"
  if (n.includes("inventory") || n.includes("stock")) return "📦"
  if (n.includes("payment") || n.includes("transaction")) return "🏦"
  if (n.includes("order")) return "📋"
  if (n.includes("warehouse") || n.includes("fulfil")) return "📦"
  if (n.includes("notification") || n.includes("alert")) return "🔔"
  if (n.includes("email")) return "📧"
  if (n.includes("review") || n.includes("rating")) return "⭐"
  if (n.includes("recommend")) return "🎯"
  if (n.includes("fraud") || n.includes("security")) return "🛡️"
  if (n.includes("analytics") || n.includes("report")) return "📊"
  if (n.includes("content") || n.includes("planner")) return "📝"
  if (n.includes("text") || n.includes("writer") || n.includes("generator")) return "✍️"
  if (n.includes("image")) return "🖼️"
  if (n.includes("video")) return "🎬"
  if (n.includes("quality") || n.includes("checker")) return "✅"
  if (n.includes("seo")) return "🔎"
  if (n.includes("social") || n.includes("media")) return "📱"
  if (n.includes("schedule") || n.includes("publish")) return "📅"
  if (n.includes("translation") || n.includes("locali")) return "🌐"
  if (n.includes("compliance") || n.includes("legal")) return "⚖️"
  if (n.includes("ab") || n.includes("test")) return "🧪"
  if (n.includes("cache") || n.includes("cdn")) return "⚡"
  if (n.includes("log") || n.includes("monitor")) return "📡"
  if (n.includes("shadow")) return "👻"
  const typeIcons: Record<string, string> = {
    core_service: "⚙️", integration: "🔗", shadow_agent: "👻", analytics: "📊", support: "💬", notification: "🔔",
  }
  return typeIcons[type] || "🤖"
}

// --- Helper: find circular dependencies ---
function findCircularDeps(connections: any[]): string[] {
  const graph: Record<string, string[]> = {}
  connections.forEach((c: any) => {
    if (!graph[c.from]) graph[c.from] = []
    graph[c.from].push(c.to)
  })

  const cycles: string[] = []
  const visited = new Set<string>()

  function dfs(node: string, path: string[]): void {
    if (path.includes(node)) {
      const cycleStart = path.indexOf(node)
      const cycle = [...path.slice(cycleStart), node].join(" → ")
      if (!cycles.includes(cycle)) cycles.push(cycle)
      return
    }
    if (visited.has(node)) return
    visited.add(node)
    const neighbors = graph[node] || []
    for (const next of neighbors) {
      dfs(next, [...path, node])
    }
  }

  Object.keys(graph).forEach((node) => {
    visited.clear()
    dfs(node, [])
  })

  return cycles.slice(0, 3)
}

// --- Fallback hardcoded agents (ecommerce) ---
const defaultAgents = [
  { id: "search", name: "SearchAgent", type: "Product discovery", risk: "medium", icon: "🔍", row: 0, col: 0 },
  { id: "cart", name: "CartAgent", type: "Shopping cart", risk: "critical", icon: "🛒", row: 0, col: 1 },
  { id: "checkout", name: "CheckoutAgent", type: "Payment flow", risk: "high", icon: "💳", row: 0, col: 2 },
  { id: "support", name: "SupportAgent", type: "Customer help", risk: "low", icon: "💬", row: 0, col: 3 },
  { id: "pricing", name: "PricingAgent", type: "Price calculation", risk: "critical", icon: "💰", row: 1, col: 0 },
  { id: "inventory", name: "InventoryAgent", type: "Stock management", risk: "critical", icon: "📦", row: 1, col: 1 },
  { id: "payment", name: "PaymentAgent", type: "Transaction processing", risk: "high", icon: "🏦", row: 1, col: 2 },
  { id: "order", name: "OrderAgent", type: "Order management", risk: "critical", icon: "📋", row: 1, col: 3 },
  { id: "warehouse", name: "WarehouseAgent", type: "Fulfillment", risk: "medium", icon: "📦", row: 2, col: 0 },
  { id: "notification", name: "NotificationAgent", type: "Push alerts", risk: "low", icon: "🔔", row: 2, col: 1 },
  { id: "email", name: "EmailAgent", type: "Email service", risk: "low", icon: "📧", row: 2, col: 2 },
]

const defaultConnections = [
  { from: "search", to: "inventory", type: "solid" },
  { from: "cart", to: "pricing", type: "solid" },
  { from: "cart", to: "inventory", type: "solid" },
  { from: "checkout", to: "payment", type: "solid" },
  { from: "checkout", to: "order", type: "solid" },
  { from: "pricing", to: "inventory", type: "solid" },
  { from: "payment", to: "order", type: "solid" },
  { from: "order", to: "warehouse", type: "solid" },
  { from: "order", to: "notification", type: "solid" },
  { from: "order", to: "email", type: "solid" },
  { from: "inventory", to: "warehouse", type: "dashed" },
  { from: "support", to: "order", type: "dashed" },
]
