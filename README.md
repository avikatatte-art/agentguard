# 🔥 AgentGuard - Multi-Agent Reliability Platform

<div align="center">

![AgentGuard Banner](https://img.shields.io/badge/AgentGuard-AI%20Reliability%20Layer-blueviolet?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Gemini 2.0](https://img.shields.io/badge/Powered%20by-Gemini%202.0-4285F4?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![Web3](https://img.shields.io/badge/Web3-Audit%20Trail-7C3AED?style=for-the-badge)](https://polygon.technology/)

**"Google Maps + Fire Drill for AI Agents"**

*Scan → Dependency Graph → Simulate Failure → Recovery Playbook + Tamper-Proof Audit*

[🚀 Live Demo](#) | [📖 Documentation](#getting-started) | [🎥 Video Demo](#) | [💬 Discord](#)

</div>

---

## 🎯 **The Problem**

Companies are deploying **10-50 AI agents** across their systems:
- ❌ **No visibility** into agent-to-agent dependencies
- ❌ **Cascade failures** when one agent breaks
- ❌ **No recovery playbooks** for incidents
- ❌ **Zero audit trail** for compliance

**Real Impact:**
> "Our pricing agent glitched → inventory system panicked → shipping overloaded → $2M revenue lost in 4 hours"

---

## ✨ **The Solution**

**AgentGuard** is the first **Multi-Agent Reliability Platform** that:

### 🗺️ **1. Maps Your Agent Ecosystem**
- Auto-discovers all AI agents from traces/logs
- Builds real-time dependency graph
- Identifies shadow agents (undocumented)

### ⚠️ **2. Predicts Cascade Failures**
- Detects single points of failure (SPOF)
- Finds circular dependencies
- Calculates blast radius for any agent failure

### 🎯 **3. Generates Recovery Playbooks**
- Step-by-step incident response
- Evidence-backed recommendations
- Verification steps per action

### 🔐 **4. Tamper-Proof Audit Trail** (Web3)
- Immutable evidence logs on-chain
- SOC2/ISO27001 compliance ready
- Post-incident forensics

---

## 🏗️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                     AGENTGUARD PLATFORM                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   SCANNER    │  │    GRAPH     │  │  SIMULATOR   │      │
│  │              │  │   ENGINE     │  │              │      │
│  │ • OTel Logs  │→ │ • Neo4j      │→ │ • BFS Ripple │      │
│  │ • GH Actions │  │ • Risk Score │  │ • Impact Calc│      │
│  │ • API Traces │  │ • SPOF Detect│  │ • Blast Score│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↓                  ↓                  ↓              │
│  ┌──────────────────────────────────────────────────┐       │
│  │         GEMINI 2.0 REASONING ENGINE              │       │
│  │  • Incident Analysis  • Playbook Generation      │       │
│  │  • Root Cause         • Evidence Linking         │       │
│  └──────────────────────────────────────────────────┘       │
│         ↓                                                    │
│  ┌──────────────────────────────────────────────────┐       │
│  │         WEB3 AUDIT LAYER (Polygon)               │       │
│  │  • Hash logs on-chain  • Immutable proof         │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎬 **User Flow (3-Minute Demo)**

### **Screen 1: Scan / Import**
```bash
📤 Upload: otel_traces.json
   OR
🎭 Demo Dataset: "E-commerce Agent System"
```
**Output:**
```
✅ Found 24 agents
⚠️  4 shadow agents detected
📊 Data sources: traces + configs
```
👉 **[Generate Dependency Map]**

---

### **Screen 2: Dependency Graph**
```
Interactive graph visualization:
  PricingAgent → InventoryAgent → ShippingAgent
       ↓              ↓                ↓
  SupportAgent ← RefundAgent ← FraudAgent
```

**Right Panel:**
- 🔴 **Top Critical Agents** (SPOF)
- 🔄 **Circular Dependencies** detected
- 📊 **Risk Score**: 8.5/10

**Click any agent** → Shows:
- Depends on: [list]
- Downstream impact: [list]

👉 **[Simulate Failure]**

---

### **Screen 3: Failure Simulation**
```
🎯 Selected: PricingAgent
```

**Simulation Results:**
```
💥 Blast Radius Score: 9.2/10

📉 Impacted Agents: 12
   • InventoryAgent (direct)
   • ShippingAgent (cascade)
   • SupportAgent (cascade)
   • ... 9 more

⚠️  Impacted Workflows: 8
   • Order processing
   • Inventory reorder
   • Shipping optimization
   • Customer support routing

💰 Estimated Impact: HIGH
   Revenue risk: $500K-2M/hour
```

👉 **[Generate Playbook]**

---

### **Screen 4: Playbook + Audit Trail** ⭐ **HERO SCREEN**

#### **Recovery Playbook**
```
🎯 INCIDENT: PricingAgent Failure
⏱️  Estimated Recovery Time: 15-30 minutes

STEP 1: Immediate Containment (0-5 min)
  ✓ Switch to cached pricing (last 1 hour)
  ✓ Pause inventory reorder triggers
  ✓ Alert: #pricing-team via PagerDuty
  
  Verification:
  → Check: pricing_cache_hit_rate > 95%
  → Monitor: inventory_queue_depth < 100

STEP 2: Activate Backup (5-15 min)
  ✓ Deploy: PricingAgent-v2 (standby)
  ✓ Route 10% traffic for testing
  ✓ Monitor error rates
  
  Verification:
  → Check: pricing_errors < 0.1%
  → Validate: price_diff < 5%

STEP 3: Full Recovery (15-30 min)
  ✓ Route 100% traffic to backup
  ✓ Re-enable inventory triggers
  ✓ Validate downstream agents
  
  Verification:
  → Check: all_agents_healthy = true
  → Monitor: cascade_risk_score < 2.0
```

#### **Audit Trail** 🔐
```
📋 EVIDENCE LOG (Tamper-Proof)

Dependency Edge: PricingAgent → InventoryAgent
  Evidence:
  ✓ Trace ID: 7a8b9c... (2024-02-04 14:23:11)
  ✓ API call: POST /inventory/reorder
  ✓ Confidence: 98%
  ✓ Observed: 1,247 times (last 7 days)

Dependency Edge: InventoryAgent → ShippingAgent
  Evidence:
  ✓ Trace ID: 3d4e5f... (2024-02-04 14:23:15)
  ✓ Event: inventory_updated → shipping_recalc
  ✓ Confidence: 95%
  ✓ Observed: 892 times (last 7 days)

Risk Assessment: PricingAgent = SPOF
  Reasoning:
  ✓ Centrality score: 0.87 (top 5%)
  ✓ Downstream agents: 12
  ✓ No redundancy detected
  ✓ Historical incidents: 2 (last 30 days)

🔗 Blockchain Proof:
  Chain: Polygon Mumbai
  Tx Hash: 0x7f3a8b2c...
  Block: 42,156,789
  Timestamp: 2024-02-04 16:45:32 UTC
  ✅ Verified on-chain
```

👉 **[Download Report]** | **[Create PagerDuty Alert]** | **[Export to Rootly]**

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- Gemini API Key
- (Optional) Polygon wallet for Web3 audit

### **Quick Start**

```bash
# Clone repository
git clone https://github.com/yourusername/agentguard.git
cd agentguard

# Install dependencies
npm install
cd backend && pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Add your GEMINI_API_KEY

# Start services
docker-compose up -d

# Run frontend (Next.js)
npm run dev

# Run backend (FastAPI)
cd backend && uvicorn main:app --reload

# Open browser
open http://localhost:3000
```

---

## 📁 **Project Structure**

```
agentguard/
├── frontend/                 # Next.js + React + TailwindCSS
│   ├── app/
│   │   ├── page.tsx         # Landing page
│   │   ├── scan/            # Screen 1: Scanner
│   │   ├── graph/           # Screen 2: Dependency Graph
│   │   ├── simulate/        # Screen 3: Simulation
│   │   └── playbook/        # Screen 4: Playbook + Audit
│   ├── components/
│   │   ├── DependencyGraph.tsx  # ReactFlow graph
│   │   ├── RiskPanel.tsx        # Risk metrics
│   │   ├── PlaybookViewer.tsx   # Playbook display
│   │   └── AuditTrail.tsx       # Audit logs
│   └── lib/
│       ├── api.ts           # API client
│       └── types.ts         # TypeScript types
│
├── backend/                  # FastAPI + Python
│   ├── main.py              # FastAPI app
│   ├── routers/
│   │   ├── scan.py          # Scanner endpoints
│   │   ├── graph.py         # Graph endpoints
│   │   ├── simulate.py      # Simulation endpoints
│   │   └── playbook.py      # Playbook endpoints
│   ├── services/
│   │   ├── scanner.py       # OTel parser
│   │   ├── graph_engine.py  # Neo4j + NetworkX
│   │   ├── simulator.py     # BFS cascade engine
│   │   ├── gemini_service.py # Gemini API
│   │   └── web3_audit.py    # Blockchain logger
│   ├── models/
│   │   ├── agent.py         # Agent model
│   │   ├── dependency.py    # Dependency model
│   │   └── incident.py      # Incident model
│   └── utils/
│       ├── risk_scorer.py   # Risk calculation
│       └── evidence.py      # Evidence linking
│
├── data/
│   ├── demo_traces.json     # Demo dataset
│   └── schemas/             # Data schemas
│
├── docker-compose.yml       # Services (Neo4j, Redis)
├── README.md
├── FRONTEND_GUIDE.md        # Frontend dev guide
├── BACKEND_GUIDE.md         # Backend dev guide
└── DEPLOYMENT.md            # Deployment guide
```

---

## 🛠️ **Tech Stack**

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + TailwindCSS + shadcn/ui
- **Graph**: ReactFlow (dependency visualization)
- **State**: Zustand
- **API**: Axios + React Query
- **Icons**: Lucide React

### **Backend**
- **Framework**: FastAPI (Python)
- **Graph DB**: Neo4j (dependency storage)
- **Cache**: Redis
- **AI**: Google Gemini 2.0 API
- **Tracing**: OpenTelemetry
- **Web3**: Web3.py + Polygon

### **Infrastructure**
- **Deployment**: Vercel (frontend) + Railway (backend)
- **Database**: PostgreSQL (metadata)
- **Storage**: S3 (logs)
- **Monitoring**: Sentry

---

## 🎯 **Roadmap**

### **✅ Phase 0: Hackathon MVP** (Current)
- [x] Scanner (mock + OTel import)
- [x] Dependency graph visualization
- [x] Failure simulation engine
- [x] Gemini-powered playbook generation
- [x] Web3 audit trail
- [x] Demo dataset

### **🚧 Phase 1: Working MVP** (1-2 months)
- [ ] Real OTel collector integration
- [ ] GitHub Actions log parser
- [ ] Auto-updating graph (daily scans)
- [ ] Change detection ("new dependency found")
- [ ] PagerDuty/Rootly payload export

### **📋 Phase 2: Beta SaaS** (3-6 months)
- [ ] Multi-tenant dashboard
- [ ] Risk scoring engine (ML-based)
- [ ] Playbook templates library
- [ ] Incident history & learning
- [ ] Team collaboration features

### **🚀 Phase 3: Enterprise** (6-12 months)
- [ ] Full PagerDuty/Rootly integration
- [ ] Datadog/Langfuse ingestion
- [ ] SOC2 compliance reports
- [ ] Auto-remediation suggestions
- [ ] Agent governance layer

### **🌟 Phase 4: Advanced** (Year 2)
- [ ] Auto-mitigation (with approval)
- [ ] Agent insurance/risk rating
- [ ] Marketplace for playbooks
- [ ] Open standard: OpenAgentGraph

---

## 📊 **Demo Datasets**

### **E-commerce Agent System**
```
24 agents including:
- PricingAgent (SPOF)
- InventoryAgent
- ShippingAgent
- SupportAgent
- RefundAgent
- FraudAgent
- ... 18 more
```

### **AI Content Pipeline**
```
18 agents including:
- ContentGenerator
- ImageGenerator
- VideoEditor
- QualityChecker
- PublishAgent
- ... 13 more
```

---

## 🤝 **Contributing**

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### **Development Setup**
```bash
# Fork & clone
git clone https://github.com/yourusername/agentguard.git

# Create feature branch
git checkout -b feature/your-feature

# Make changes & test
npm run test

# Submit PR
git push origin feature/your-feature
```

---

## 📄 **License**

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 **Acknowledgments**

- **Google Gemini 2.0** for AI reasoning
- **ReactFlow** for graph visualization
- **OpenTelemetry** for tracing standards
- **Polygon** for Web3 infrastructure

---

## 📞 **Contact**

- **Website**: [agentguard.ai](#)
- **Email**: team@agentguard.ai
- **Twitter**: [@agentguard](#)
- **Discord**: [Join Community](#)

---

<div align="center">

**Built with ❤️ for the AI Agent Revolution**

⭐ Star us on GitHub | 🐦 Follow for updates | 💬 Join Discord

</div>
