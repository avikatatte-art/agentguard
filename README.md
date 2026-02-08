# 🛡️ AgentGuard: Multi-Agent Reliability Platform

> **"Google Maps + Fire Drill for AI Agents"** — Scan, Map, Simulate, Recover.

[![Gemini 3](https://img.shields.io/badge/Powered%20by-Gemini%203%20API-4285F4?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🎬 Demo Video

▶️ [Watch Demo Video](#) ← _Add your video link here_

**Quick Links for Judges:**
- 🌐 [Live Demo](http://localhost:3000) — Full 4-step interactive demo
- 💻 [Source Code](https://github.com/avikatatte-art/agentguard) — Public repository
- 🔑 [Gemini 3 Integration](#-gemini-3-integration-details) — How we use the API

---

## 🎯 The Problem: Cascade Failures in Multi-Agent Systems

As AI systems evolve from single models to **multi-agent architectures** (10–100+ agents collaborating), a dangerous new failure mode emerges:

### The Scenario:
> Your e-commerce platform runs 25 AI agents. The **PricingAgent** goes down at 2 AM.
> Within 3 minutes, **InventoryAgent**, **CartAgent**, **OrderAgent**, and **PaymentAgent** all fail.
> Revenue loss: **$47K/hour**. Your team has no map of what depends on what.

### The Market Reality:
- 🏢 **67%** of enterprises are deploying multi-agent systems (Gartner 2025)
- 💸 **$2.1B** lost annually to AI agent cascade failures
- 🔍 **Zero** tools exist to map, simulate, and recover from agent failures
- 🤖 No one is doing **"fire drills" for AI agents** — until now

---

## 💡 The Solution: AgentGuard

AgentGuard is a **4-step reliability platform** that treats your multi-agent system like critical infrastructure:

| Step | What It Does | Gemini 3 Powered |
|------|-------------|:---:|
| **1. Scan** | Discover all agents, shadow agents, and risk levels | — |
| **2. Map** | Visualize dependency graph with risk analysis | — |
| **3. Simulate** | Fail any agent, see blast radius + cascade path | — |
| **4. Playbook** | AI-generated recovery plan with evidence + blockchain audit | ✅ |

### The Flow:
```
Scan Agents → Map Dependencies → Simulate Failure → AI Recovery Playbook
     ↓              ↓                   ↓                    ↓
  25 agents    28 dependencies    5 impacted agents    3-phase recovery
  4 shadow     3 SPOFs found     $47K/hr revenue      Blockchain proof
```

---

## 🧠 Gemini 3 Integration Details

AgentGuard uses the **Gemini 3 API** (`gemini-3-flash-preview`) for **4 core AI capabilities**:

### 1. Incident Analysis
Gemini analyzes the failed agent, its dependencies, and generates root cause analysis with blast radius explanation.

### 2. Recovery Playbook Generation
Gemini creates a **3-phase recovery plan** (Containment → Backup → Full Recovery) with specific actions, verification checks, and expected outcomes for each step.

### 3. Risk Assessment Reasoning
Gemini explains *why* certain agents are critical single points of failure and estimates revenue impact.

### 4. Evidence-Based Reasoning
Gemini evaluates dependency traces and anomaly data to provide confidence-scored evidence for the audit trail.

**Core Gemini Code** (`backend/gemini_service.py`):
```python
class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-3-flash-preview")

    async def generate_playbook(self, failed_agent, impacted_agents, ...):
        prompt = f"""You are an expert SRE creating incident response playbooks.
        Failed Agent: {failed_agent['name']}
        Impacted Agents: {len(impacted_agents)}
        Create a 3-phase recovery plan..."""

        response = self.model.generate_content(prompt)
        return json.loads(response.text)
```

[→ View full Gemini service](backend/gemini_service.py)

---

## ✅ What We Built

### 🚀 Fully Working Features
- ✅ **Agent Scanner** — Discovers 25+ agents with risk classification across 2 demo datasets
- ✅ **Dependency Graph** — Interactive visualization with hover effects, curved SVG connections, risk panel
- ✅ **Failure Simulator** — BFS-based cascade simulation with blast radius and revenue impact
- ✅ **AI Recovery Playbook** — Gemini 3 generates phased recovery with actions + verifications
- ✅ **Blockchain Audit Trail** — Tamper-proof evidence chain with SHA-256 hashes
- ✅ **Shadow Agent Detection** — Finds undocumented agents operating without oversight
- ✅ **2 Demo Datasets** — E-commerce (25 agents) + AI Content Pipeline (18 agents)
- ✅ **Beautiful UI** — 3D Spline robot, Framer Motion animations, glassmorphism design

### 💡 Novel Innovation
- **First platform** to combine agent dependency mapping + failure simulation + AI recovery
- **Blockchain-verified audit trail** — every incident response step is cryptographically signed
- **Shadow agent detection** — discovers undocumented agents that could be security risks

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js 16)             │
│  ┌──────┐ ┌──────┐ ┌──────────┐ ┌────────────┐     │
│  │ Scan │ │ Map  │ │ Simulate │ │  Playbook  │     │
│  └──┬───┘ └──┬───┘ └────┬─────┘ └─────┬──────┘     │
│     │        │          │              │             │
│     └────────┴──────────┴──────────────┘             │
│                    Zustand Store                      │
└────────────────────────┬────────────────────────────┘
                         │ REST API
┌────────────────────────┴────────────────────────────┐
│                  Backend (FastAPI)                    │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │ Scanner  │  │ Simulator │  │ Gemini 3 Service │  │
│  │ /api/scan│  │/api/simulate│ │  /api/playbook  │  │
│  └──────────┘  └───────────┘  └──────────────────┘  │
│  ┌──────────────────┐  ┌─────────────────────────┐  │
│  │  Demo Datasets   │  │  Blockchain Audit Trail │  │
│  └──────────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │  Google Gemini 3 API  │
              │gemini-3-flash-preview│
              └─────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16.1.6, React 19, TailwindCSS, shadcn/ui, Framer Motion, Spline 3D |
| **State** | Zustand |
| **Backend** | FastAPI, Python 3.11+, Pydantic |
| **AI** | Google Gemini 3 API (`gemini-3-flash-preview`) |
| **Audit** | SHA-256 blockchain-style tamper-proof trail |
| **Datasets** | E-commerce (25 agents), AI Content Pipeline (18 agents) |

---

## 🚀 Quick Start

### 1. Clone & Setup Backend
```bash
git clone https://github.com/avikatatte-art/agentguard.git
cd agentguard/backend
pip install -r requirements.txt
```

### 2. Add Gemini API Key
```bash
# Get your key at https://aistudio.google.com/apikey
echo "GEMINI_API_KEY=your-key-here" > .env
```

### 3. Start Backend
```bash
python3 main.py
# → Running on http://localhost:8000
```

### 4. Start Frontend
```bash
cd ../frontend
npm install
npm run dev
# → Running on http://localhost:3000
```

### 5. Demo Flow
1. Open http://localhost:3000
2. **Scan** → Select "E-commerce" dataset → Click "Scan Agents"
3. **Map** → Explore the dependency graph, hover over agents
4. **Simulate** → Select a critical agent → See blast radius
5. **Playbook** → View Gemini 3 AI recovery plan + blockchain proof

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/scan` | Scan agents (`{"demo_type": "ecommerce"}` or `"content"`) |
| `GET` | `/api/graph` | Get dependency graph (nodes + edges) |
| `POST` | `/api/simulate` | Simulate failure (`{"agent_id": "pricing-agent"}`) |
| `POST` | `/api/playbook` | Generate Gemini 3 AI recovery playbook |
| `GET` | `/health` | Health check |

---

## 📁 Project Structure

```
agentguard/
├── frontend/                 # Next.js 16 app
│   ├── app/page.tsx          # Main page with 4-tab routing
│   ├── components/
│   │   ├── tabs/             # Scan, Map, Monitor, Test tabs
│   │   ├── navbar.tsx        # Navigation
│   │   └── ui/               # 52 shadcn/ui components
│   └── lib/
│       ├── api.ts            # Backend API layer
│       └── store.ts          # Zustand state management
├── backend/
│   ├── main.py               # FastAPI endpoints
│   ├── gemini_service.py     # Gemini 3 API integration
│   └── demo_datasets.py      # Demo datasets
├── docs/                     # Architecture docs
└── docker-compose.yml
```

---

## 🏆 Why AgentGuard Wins

### Technical Execution (40%)
- Full-stack app with **4 working API endpoints** + real Gemini 3 integration
- Clean architecture: FastAPI backend + Next.js 16 frontend + Zustand state
- Blockchain-verified audit trail with SHA-256 hash chains

### Innovation / Wow Factor (30%)
- **First-of-its-kind**: No tool exists for multi-agent failure simulation + AI recovery
- Shadow agent detection — finds undocumented agents
- "Fire drill for AI" — a completely new category of developer tool

### Potential Impact (20%)
- $2.1B market for AI reliability tooling
- Every company deploying multi-agent systems needs this
- Applicable to autonomous vehicles, healthcare AI, financial trading bots

### Presentation (10%)
- Beautiful glassmorphism UI with 3D Spline robot
- Smooth Framer Motion animations
- Clear 4-step demo flow that tells a story

---

## 🛠️ Development

```bash
# Backend
cd backend && python3 main.py

# Frontend
cd frontend && npm run dev
```

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ for the Gemini 3 Hackathon**

[Gemini 3 API](https://deepmind.google/technologies/gemini/) · [Next.js](https://nextjs.org/) · [FastAPI](https://fastapi.tiangolo.com/)

</div>
