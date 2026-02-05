# ⚡ Quick Start Guide

## **Get AgentGuard Running in 10 Minutes**

---

## 🎯 **Prerequisites**

Before you begin, ensure you have:

- ✅ **Node.js 18+** ([Download](https://nodejs.org/))
- ✅ **Python 3.10+** ([Download](https://www.python.org/))
- ✅ **Docker Desktop** ([Download](https://www.docker.com/))
- ✅ **Git** ([Download](https://git-scm.com/))
- ✅ **Gemini API Key** ([Get Free Key](https://makersuite.google.com/app/apikey))

---

## 🚀 **Step 1: Clone Repository**

```bash
git clone https://github.com/yourusername/agentguard.git
cd agentguard
```

---

## 🐳 **Step 2: Start Database Services**

```bash
# Start Neo4j, PostgreSQL, Redis
docker-compose up -d

# Verify services are running
docker-compose ps

# Expected output:
# neo4j       running   0.0.0.0:7474->7474/tcp, 0.0.0.0:7687->7687/tcp
# postgres    running   0.0.0.0:5432->5432/tcp
# redis       running   0.0.0.0:6379->6379/tcp
```

---

## ⚙️ **Step 3: Setup Backend**

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_key_here
nano .env  # or use your favorite editor
```

### **Minimal .env Configuration**

```env
# API
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# Gemini (REQUIRED)
GEMINI_API_KEY=your_gemini_api_key_here

# Neo4j
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password123

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=agentguard
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

# Web3 (Optional for hackathon)
WEB3_PROVIDER_URL=https://polygon-mumbai.g.alchemy.com/v2/demo
WEB3_PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000
WEB3_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

### **Load Demo Data**

```bash
# Load demo datasets into Neo4j
python scripts/seed_demo_data.py

# Expected output:
# ✅ Loaded 24 agents
# ✅ Created 38 dependencies
# ✅ Demo data ready!
```

### **Start Backend Server**

```bash
# Run FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Server should start at http://localhost:8000
# API docs available at http://localhost:8000/docs
```

---

## 🎨 **Step 4: Setup Frontend**

Open a **new terminal** (keep backend running):

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local
nano .env.local
```

### **.env.local Configuration**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

### **Start Frontend Server**

```bash
npm run dev

# Frontend should start at http://localhost:3000
```

---

## 🎉 **Step 5: Test the Application**

### **Open Browser**

Navigate to: **http://localhost:3000**

### **Run Demo Flow**

1. **Scan Screen**
   - Click "Select Demo Dataset"
   - Choose "E-commerce Agent System"
   - Click "Scan"
   - ✅ Should show: "Found 24 agents, 4 shadow agents"

2. **Graph Screen**
   - Click "Generate Dependency Map"
   - ✅ Should display interactive graph
   - ✅ Right panel shows risk analysis
   - Click on "PricingAgent" node

3. **Simulate Screen**
   - Click "Simulate Failure"
   - Select "PricingAgent" from dropdown
   - Click "Run Simulation"
   - ✅ Should show blast radius score and impact

4. **Playbook Screen**
   - Click "Generate Playbook"
   - ✅ Should display recovery steps
   - ✅ Should show audit trail with evidence
   - ✅ (Optional) Blockchain proof if Web3 configured

---

## 🔍 **Verify Everything Works**

### **Check Backend Health**

```bash
curl http://localhost:8000/health

# Expected response:
# {"status": "healthy", "services": {"neo4j": "connected", "postgres": "connected"}}
```

### **Check API Docs**

Visit: **http://localhost:8000/docs**

Try the `/api/scan` endpoint with demo data.

### **Check Neo4j Browser**

Visit: **http://localhost:7474**

Login:
- Username: `neo4j`
- Password: `password123`

Run query:
```cypher
MATCH (a:Agent) RETURN a LIMIT 10
```

---

## 🐛 **Troubleshooting**

### **Issue: Docker services won't start**

```bash
# Check if ports are already in use
lsof -i :7474  # Neo4j
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis

# Kill conflicting processes or change ports in docker-compose.yml
```

### **Issue: Backend won't start**

```bash
# Check Python version
python --version  # Should be 3.10+

# Reinstall dependencies
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall

# Check logs
uvicorn main:app --log-level debug
```

### **Issue: Frontend won't start**

```bash
# Clear cache
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Check Node version
node --version  # Should be 18+
```

### **Issue: Can't connect to Neo4j**

```bash
# Check Neo4j logs
docker logs agentguard-neo4j

# Restart Neo4j
docker-compose restart neo4j

# Wait 30 seconds for startup
sleep 30
```

### **Issue: Gemini API errors**

```bash
# Verify API key is set
echo $GEMINI_API_KEY

# Test API key
curl -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_KEY"
```

---

## 📦 **Alternative: Docker-Only Setup**

If you prefer running everything in Docker:

```bash
# Build and start all services
docker-compose -f docker-compose.full.yml up --build

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# Neo4j: http://localhost:7474
```

---

## 🎬 **Next Steps**

### **Customize Demo Data**

Edit `data/demo_ecommerce.json` to add your own agents:

```json
{
  "agents": [
    {
      "id": "MyCustomAgent",
      "name": "My Custom Agent",
      "type": "custom_agent"
    }
  ],
  "dependencies": [
    {
      "source": "MyCustomAgent",
      "target": "PricingAgent"
    }
  ]
}
```

Reload:
```bash
python scripts/seed_demo_data.py
```

### **Add Real OTel Traces**

1. Export traces from your system:
   ```bash
   # Example: Export from OpenTelemetry Collector
   curl http://your-otel-collector:4318/v1/traces > traces.json
   ```

2. Upload via UI:
   - Go to Scan screen
   - Click "Upload Traces"
   - Select `traces.json`

### **Customize Playbook Templates**

Edit `backend/services/gemini_service.py`:

```python
def _build_playbook_prompt(self, ...):
    prompt = f"""
    Your custom prompt here...
    
    Include your specific:
    - Recovery procedures
    - Verification steps
    - Company policies
    """
```

---

## 📚 **Learn More**

- **Frontend Guide**: See `FRONTEND_GUIDE.md`
- **Backend Guide**: See `BACKEND_GUIDE.md`
- **Architecture**: See `ARCHITECTURE.md`
- **API Docs**: http://localhost:8000/docs

---

## 💡 **Pro Tips**

### **Speed Up Development**

```bash
# Use nodemon for auto-restart (backend)
pip install watchdog
watchmedo auto-restart -d . -p '*.py' -- uvicorn main:app

# Use Turbopack (frontend)
npm run dev --turbo
```

### **Debug Mode**

```bash
# Backend: Enable verbose logging
export LOG_LEVEL=DEBUG
uvicorn main:app --reload

# Frontend: Enable React DevTools
# Install: https://react.dev/learn/react-developer-tools
```

### **Performance Testing**

```bash
# Load test API
pip install locust
locust -f tests/load_test.py --host http://localhost:8000
```

---

## 🎯 **Hackathon Checklist**

Before demo day:

- [ ] All 4 screens working
- [ ] Demo dataset loads correctly
- [ ] Graph visualization renders
- [ ] Simulation shows blast radius
- [ ] Playbook generates successfully
- [ ] Audit trail displays evidence
- [ ] (Optional) Blockchain proof works
- [ ] No console errors
- [ ] Responsive on different screens
- [ ] 3-minute demo script ready

---

## 🆘 **Get Help**

- **GitHub Issues**: [Report bugs](https://github.com/yourusername/agentguard/issues)
- **Discord**: [Join community](#)
- **Email**: team@agentguard.ai

---

## ✅ **Success!**

You should now have:
- ✅ Backend running on http://localhost:8000
- ✅ Frontend running on http://localhost:3000
- ✅ Neo4j browser on http://localhost:7474
- ✅ Demo data loaded
- ✅ All 4 screens functional

**Ready to build the future of AI agent reliability! 🚀**

---

**Quick Start Version**: 1.0.0  
**Last Updated**: 2024-02-04
