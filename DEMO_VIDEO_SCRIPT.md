# AgentGuard — 3-Minute Demo Video Script

> **Total time: ~2:45**
> Record with OBS/Loom/QuickTime. Show localhost:3000 in browser.

---

## INTRO (0:00 – 0:25)

**[Show: Landing page with 3D robot animation]**

> "Hi, I'm [YOUR NAME]. This is AgentGuard — the first reliability platform
> for multi-agent AI systems.
>
> As companies deploy 10, 50, even 100 AI agents working together,
> a single agent failure can cascade and take down the entire system.
> There's no tool to map these dependencies, simulate failures, or
> generate recovery plans.
>
> AgentGuard solves this. Think of it as Google Maps plus Fire Drill
> for your AI agents. Let me show you."

---

## STEP 1: SCAN (0:25 – 0:55)

**[Click: Scan tab → Select "E-commerce" → Click "Scan Agents"]**

> "First, we scan the agent ecosystem. I'm loading our e-commerce demo
> with 25 AI agents — from SearchAgent to PaymentAgent.
>
> AgentGuard instantly discovers all agents, classifies their risk levels,
> and — critically — detects 4 shadow agents. These are undocumented
> agents operating without oversight, which is a major security risk.
>
> We see 25 total agents, 4 shadow agents, and key metrics like
> critical agent count and average uptime."

---

## STEP 2: MAP (0:55 – 1:25)

**[Click: Map tab → Hover over agents → Point out connections]**

> "Now the Map tab visualizes the entire dependency graph.
>
> Each node is an agent, color-coded by risk — red for critical,
> orange for high, blue for medium, green for low.
> The curved lines show dependencies between agents.
>
> On the right panel, we see an overall risk score of 8.5 out of 10.
> AgentGuard identified PricingAgent, InventoryAgent, and OrderAgent
> as single points of failure — if any of these go down,
> multiple agents cascade.
>
> It also detected circular dependencies like
> cart → pricing → inventory → cart, which is a reliability red flag."

---

## STEP 3: SIMULATE (1:25 – 2:00)

**[Click: Simulate tab → Click on "PricingAgent" card]**

> "Now the powerful part — chaos simulation.
> I'll click PricingAgent to simulate its failure.
>
> AgentGuard runs a BFS-based cascade analysis and shows:
> - PricingAgent failed
> - 12 agents impacted in the blast radius
> - Severity: CRITICAL
> - Revenue risk: $47,000 per hour
> - Estimated recovery time: 15-30 minutes
>
> We can see the exact cascade path — PricingAgent fails,
> then InventoryAgent, CartAgent, OrderAgent, all the way
> down to WarehouseAgent and EmailAgent.
>
> This is like a fire drill for your AI infrastructure."

---

## STEP 4: PLAYBOOK (2:00 – 2:35)

**[Click: "Generate AI Recovery Playbook" → Show the Playbook tab]**

> "And here's where Gemini 3 comes in.
>
> AgentGuard calls the Gemini 3 API to generate a complete
> incident recovery playbook.
>
> Gemini 3 analyzes the root cause — in this case, resource
> exhaustion triggered by a cascading latency spike.
> It explains the blast radius and business impact.
>
> Then it generates a 3-phase recovery plan:
> Phase 1: Immediate Containment — disable the failing agent,
> enable circuit breakers.
> Phase 2: Backup Activation — deploy backup instances,
> route test traffic.
> Phase 3: Full Recovery — scale up, run synthetic tests,
> clear circuit breakers.
>
> Each action has a verification step and expected outcome.
>
> At the bottom, there's a blockchain-verified audit trail
> with SHA-256 hashes — every recovery step is tamper-proof."

---

## CLOSING (2:35 – 2:50)

**[Scroll back to top / show architecture]**

> "AgentGuard is built with Next.js 16, FastAPI, and the
> Gemini 3 Flash Preview API. It works with any multi-agent
> system — e-commerce, content pipelines, autonomous vehicles.
>
> As AI agents become the backbone of enterprise software,
> AgentGuard ensures they never fail silently.
>
> Thank you."

---

## Recording Tips

1. **Resolution**: 1920x1080, dark mode browser
2. **Speed**: Don't rush. Pause 1-2 seconds after each click
3. **Audio**: Use a quiet room, speak clearly
4. **Browser**: Hide bookmarks bar, use clean Chrome/Arc
5. **Backend**: Make sure `python3 backend/main.py` is running before recording
6. **Frontend**: Use `localhost:3000` (not Vercel) so all API calls work
