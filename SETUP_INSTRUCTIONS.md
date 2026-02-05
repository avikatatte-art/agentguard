# 🚀 Setup Instructions - AgentGuard Hackathon MVP

## **Quick Start (5 Minutes)**

Follow these steps to get the application running for your hackathon demo.

---

## **Step 1: Backend Setup**

### **1.1 Navigate to Backend**
```bash
cd backend
```

### **1.2 Create Virtual Environment**
```bash
# Create venv
python3 -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
# venv\Scripts\activate
```

### **1.3 Install Dependencies**
```bash
pip install -r requirements.txt
```

### **1.4 Start Backend Server**
```bash
python main.py
```

**Expected Output:**
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

✅ **Backend is now running on http://localhost:8000**

Keep this terminal open and running.

---

## **Step 2: Frontend Setup**

### **2.1 Open New Terminal**
Open a **new terminal window** (keep backend running in the first one)

### **2.2 Navigate to Frontend**
```bash
cd frontend
```

### **2.3 Install Dependencies**
```bash
npm install
```

This will take 2-3 minutes. It installs:
- Next.js 14
- React 18
- ReactFlow (for graphs)
- TailwindCSS
- All other dependencies

### **2.4 Create Environment File**
```bash
cp .env.local.example .env.local
```

The default values are already correct for local development.

### **2.5 Start Frontend Server**
```bash
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Ready in 2.1s
```

✅ **Frontend is now running on http://localhost:3000**

---

## **Step 3: Test the Application**

### **3.1 Open Browser**
Navigate to: **http://localhost:3000**

### **3.2 Run Demo Flow**

**Screen 1: Scan**
1. Click "Scan Demo Dataset" button
2. Wait 2 seconds
3. ✅ Should show: "Found 24 agents, 4 shadow agents"
4. Auto-navigates to Graph screen

**Screen 2: Dependency Graph**
1. See interactive graph with 24 agent nodes
2. Right panel shows risk analysis
3. Red nodes = high risk (SPOF)
4. Click "Simulate Failure" button

**Screen 3: Simulation**
1. Agent dropdown pre-selects "PricingAgent"
2. Click "Simulate Failure" button
3. ✅ Should show blast radius score ~9.2/10
4. Shows 12 impacted agents
5. Click "Generate Recovery Playbook" button

**Screen 4: Playbook + Audit Trail** ⭐
1. See 3-step recovery playbook
2. Each step has actions + verifications
3. Right sidebar shows audit trail with evidence
4. Blockchain proof at bottom (mock data)
5. ✅ **Demo Complete!**

---

## **Troubleshooting**

### **Backend Issues**

**Error: "Address already in use"**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Restart backend
python main.py
```

**Error: "Module not found"**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### **Frontend Issues**

**Error: "Cannot find module"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

**Error: "Port 3000 already in use"**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

**TypeScript Errors in IDE**
- These are normal before `npm install`
- They will disappear after installation
- You can ignore them during development

---

## **Demo Script (3 Minutes)**

### **Opening (15 seconds)**
> "Last month, a company lost $2M in 4 hours because one AI agent failed and cascaded to 12 others. Nobody knew the dependencies existed. We built the solution."

### **Demo (2 minutes)**

**1. Scan (20 seconds)**
- Click "Scan Demo Dataset"
- "Found 24 agents in e-commerce system"
- "4 shadow agents detected"

**2. Graph (30 seconds)**
- "Here's the dependency map"
- "Red nodes are single points of failure"
- "Risk score: 8.5/10 - CRITICAL"
- "Let's simulate what happens if PricingAgent fails"

**3. Simulation (30 seconds)**
- Click "Simulate Failure"
- "Blast radius: 9.2/10"
- "12 agents impacted"
- "$500K-2M revenue risk per hour"
- "This is a disaster waiting to happen"

**4. Playbook (40 seconds)**
- "AgentGuard generates a recovery playbook"
- "Step 1: Immediate containment"
- "Step 2: Activate backup"
- "Step 3: Full recovery"
- "Each step has verification checks"
- "And here's the key differentiator..."
- [Scroll to Audit Trail]
- "Every dependency has evidence: trace IDs, timestamps, confidence scores"
- [Show blockchain proof]
- "Stored on Polygon blockchain - tamper-proof for compliance"

### **Closing (15 seconds)**
> "AgentGuard: Google Maps + Fire Drill for AI agents. Prevent cascade failures. Generate recovery playbooks. Tamper-proof audit trails. The reliability layer for the AI agent revolution."

---

## **Architecture Overview**

```
Frontend (Next.js)          Backend (FastAPI)
http://localhost:3000  →    http://localhost:8000

Screen 1: Scan          →   POST /api/scan
Screen 2: Graph         →   GET  /api/graph
Screen 3: Simulate      →   POST /api/simulate
Screen 4: Playbook      →   POST /api/playbook
```

---

## **Demo Data**

The application includes a realistic e-commerce demo dataset with:
- **24 AI agents**: Pricing, Inventory, Shipping, Support, Payment, etc.
- **28 dependencies**: API calls, events, data flows
- **4 shadow agents**: Undocumented legacy systems
- **Risk analysis**: SPOF detection, circular dependencies
- **Realistic metrics**: Confidence scores, trace IDs, timestamps

---

## **Key Features Demonstrated**

✅ **Agent Discovery**: Auto-detect all agents from traces  
✅ **Dependency Mapping**: Build real-time graph  
✅ **Risk Detection**: Identify SPOF and circular deps  
✅ **Cascade Simulation**: BFS algorithm calculates impact  
✅ **AI Playbook**: Recovery steps with verifications  
✅ **Audit Trail**: Evidence-backed logs  
✅ **Blockchain Proof**: Tamper-proof compliance  

---

## **Tech Stack**

**Frontend:**
- Next.js 14 (React 18)
- TailwindCSS
- ReactFlow (graph visualization)
- Zustand (state management)

**Backend:**
- FastAPI (Python)
- In-memory data store (no database needed for demo)
- Mock Gemini integration
- Mock Web3 integration

---

## **Deployment (Optional)**

### **Frontend (Vercel)**
```bash
cd frontend
vercel --prod
```

### **Backend (Railway)**
```bash
cd backend
railway up
```

---

## **Next Steps After Hackathon**

1. **Real Integrations**
   - OpenTelemetry collector
   - Actual Gemini 2.0 API
   - Real Polygon transactions

2. **Database**
   - Neo4j for graph storage
   - PostgreSQL for metadata

3. **Features**
   - Real-time monitoring
   - Multi-tenant support
   - Team collaboration

---

## **Support**

If you encounter any issues:

1. Check both terminals are running
2. Verify ports 3000 and 8000 are free
3. Try the troubleshooting steps above
4. Check browser console for errors (F12)

---

## **🎉 You're Ready!**

Your hackathon MVP is complete and ready to demo.

**Good luck! 🚀**
