# 🏗️ System Architecture

## **AgentGuard - Multi-Agent Reliability Platform**

---

## 📊 **High-Level Architecture**

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE                              │
│                    (Next.js 14 + React 18)                          │
├─────────────────────────────────────────────────────────────────────┤
│  Scan Screen  │  Graph Screen  │  Simulate Screen  │  Playbook      │
│  • Upload     │  • ReactFlow   │  • Agent Select   │  • Steps       │
│  • Demo Data  │  • Risk Panel  │  • Blast Radius   │  • Audit Trail │
└────────────────┬────────────────────────────────────────────────────┘
                 │
                 │ REST API / WebSocket
                 │
┌────────────────▼────────────────────────────────────────────────────┐
│                      API GATEWAY (FastAPI)                           │
│  • Authentication  • Rate Limiting  • Request Validation            │
└────────────────┬────────────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
┌───────▼──────┐   ┌─────▼──────────┐
│   SCANNER    │   │  GRAPH ENGINE  │
│   SERVICE    │   │                │
│              │   │  • Neo4j       │
│ • OTel Parse │──▶│  • NetworkX    │
│ • Agent      │   │  • Risk Score  │
│   Discovery  │   │  • SPOF Detect │
└──────────────┘   └────────┬───────┘
                            │
                   ┌────────▼────────┐
                   │   SIMULATOR     │
                   │   SERVICE       │
                   │                 │
                   │ • BFS Cascade   │
                   │ • Blast Radius  │
                   │ • Impact Calc   │
                   └────────┬────────┘
                            │
                   ┌────────▼────────────────┐
                   │  GEMINI 2.0 SERVICE     │
                   │                         │
                   │ • Incident Analysis     │
                   │ • Playbook Generation   │
                   │ • Evidence Reasoning    │
                   └────────┬────────────────┘
                            │
                   ┌────────▼────────────────┐
                   │  WEB3 AUDIT SERVICE     │
                   │                         │
                   │ • Hash Logs             │
                   │ • Store On-Chain        │
                   │ • Verify Integrity      │
                   └─────────────────────────┘
                            │
                   ┌────────▼────────────────┐
                   │  POLYGON BLOCKCHAIN     │
                   │  (Mumbai Testnet)       │
                   └─────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                    │
├──────────────┬──────────────┬──────────────┬─────────────────────────┤
│   Neo4j      │  PostgreSQL  │    Redis     │      S3/Storage        │
│              │              │              │                        │
│ • Graph DB   │ • Incidents  │ • Cache      │ • Trace Files          │
│ • Agents     │ • Playbooks  │ • Sessions   │ • Audit Logs           │
│ • Deps       │ • Audit Logs │ • Queue      │ • Reports              │
└──────────────┴──────────────┴──────────────┴─────────────────────────┘
```

---

## 🔄 **Data Flow**

### **1. Scan Flow**

```
User Upload/Demo → Scanner Service → Parse OTel Traces
                                    ↓
                            Extract Agents & Dependencies
                                    ↓
                            Store in Neo4j Graph
                                    ↓
                            Return Scan Results
```

### **2. Graph Analysis Flow**

```
Request Graph → Graph Engine → Query Neo4j
                              ↓
                      Build NetworkX Graph
                              ↓
                      Analyze (SPOF, Cycles, Risk)
                              ↓
                      Return Graph Data + Analysis
```

### **3. Simulation Flow**

```
Select Agent → Simulator Service → BFS Cascade Algorithm
                                  ↓
                          Calculate Blast Radius
                                  ↓
                          Identify Impacted Workflows
                                  ↓
                          Return Simulation Results
```

### **4. Playbook Generation Flow**

```
Simulation Results → Gemini Service → Build Context Prompt
                                     ↓
                             Call Gemini 2.0 API
                                     ↓
                             Parse Response
                                     ↓
                             Structure Playbook
                                     ↓
                    Web3 Audit Service → Hash Audit Data
                                        ↓
                                Store on Polygon
                                        ↓
                                Return Playbook + Proof
```

---

## 🗄️ **Database Architecture**

### **Neo4j Graph Database**

**Purpose**: Store agent dependency graph

**Schema**:
```cypher
// Nodes
(:Agent {
  id: String,
  name: String,
  type: String,
  risk_score: Float,
  metadata: Map
})

// Relationships
(:Agent)-[:DEPENDS_ON {
  type: String,
  confidence: Float,
  evidence: Map,
  observed_count: Integer,
  last_seen: DateTime
}]->(:Agent)
```

**Queries**:
- Find SPOF: `MATCH (a:Agent) WHERE size((a)<-[:DEPENDS_ON]-()) > 5 RETURN a`
- Find cycles: `MATCH path = (a:Agent)-[:DEPENDS_ON*]->(a) RETURN path`
- Get dependencies: `MATCH (a:Agent {id: $id})-[:DEPENDS_ON*]->(b) RETURN b`

---

### **PostgreSQL Database**

**Purpose**: Store incidents, playbooks, audit logs

**Tables**:

```sql
-- Incidents
incidents (
  id UUID PRIMARY KEY,
  agent_id VARCHAR(255),
  incident_type VARCHAR(50),
  severity VARCHAR(20),
  blast_radius_score FLOAT,
  impacted_agents JSONB,
  playbook_id UUID,
  status VARCHAR(20),
  created_at TIMESTAMP,
  resolved_at TIMESTAMP
)

-- Playbooks
playbooks (
  id UUID PRIMARY KEY,
  incident_id UUID,
  title VARCHAR(255),
  steps JSONB,
  effectiveness_score FLOAT,
  used_count INTEGER,
  created_at TIMESTAMP
)

-- Audit Logs
audit_logs (
  id UUID PRIMARY KEY,
  incident_id UUID,
  log_type VARCHAR(50),
  evidence JSONB,
  blockchain_tx_hash VARCHAR(255),
  verified BOOLEAN,
  created_at TIMESTAMP
)

-- Agents Metadata
agents_metadata (
  id UUID PRIMARY KEY,
  agent_id VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  type VARCHAR(50),
  owner VARCHAR(255),
  documentation_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

---

### **Redis Cache**

**Purpose**: Cache frequently accessed data

**Keys**:
```
graph:{project_id}              → Full graph data (TTL: 1 hour)
agents:{project_id}             → Agent list (TTL: 1 hour)
simulation:{agent_id}           → Simulation results (TTL: 30 min)
risk_scores:{project_id}        → Risk scores (TTL: 1 hour)
session:{user_id}               → User session (TTL: 24 hours)
```

---

## 🔐 **Security Architecture**

### **Authentication & Authorization**

```
User Request → JWT Token Validation → Role Check → API Access
                                    ↓
                            Rate Limiting (Redis)
                                    ↓
                            Input Validation
                                    ↓
                            Business Logic
```

**Roles**:
- `viewer`: Read-only access
- `operator`: Can run simulations
- `admin`: Full access + settings

---

### **Data Security**

1. **At Rest**:
   - PostgreSQL: Encrypted volumes
   - Neo4j: Encrypted storage
   - S3: Server-side encryption

2. **In Transit**:
   - HTTPS/TLS 1.3
   - WebSocket Secure (WSS)

3. **Secrets Management**:
   - Environment variables
   - AWS Secrets Manager / Vault

---

## 🚀 **Scalability Architecture**

### **Horizontal Scaling**

```
                    ┌─────────────┐
                    │ Load Balancer│
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
   │ API     │       │ API     │       │ API     │
   │ Server 1│       │ Server 2│       │ Server 3│
   └────┬────┘       └────┬────┘       └────┬────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼──────┐
                    │ Shared Cache │
                    │   (Redis)    │
                    └──────────────┘
```

### **Background Jobs**

```
API Server → Celery Task Queue → Workers
                                    ↓
                            Process in Background
                                    ↓
                            Store Results in Redis
                                    ↓
                            Notify via WebSocket
```

**Tasks**:
- Heavy graph analysis
- Blockchain transactions
- Report generation
- Email notifications

---

## 📡 **Real-Time Updates**

### **WebSocket Architecture**

```python
# WebSocket connection
ws://api.agentguard.ai/ws/{project_id}

# Events
{
  "type": "scan_progress",
  "data": {"progress": 45, "status": "parsing traces"}
}

{
  "type": "graph_updated",
  "data": {"new_agents": 3, "new_dependencies": 7}
}

{
  "type": "simulation_complete",
  "data": {"blast_radius_score": 8.5}
}
```

---

## 🔄 **CI/CD Pipeline**

```
GitHub Push → GitHub Actions
                    ↓
            Run Tests (pytest)
                    ↓
            Build Docker Image
                    ↓
            Push to Registry
                    ↓
        ┌───────────┴───────────┐
        │                       │
   Deploy Frontend        Deploy Backend
   (Vercel)              (Railway/AWS)
        │                       │
        └───────────┬───────────┘
                    ↓
            Health Check
                    ↓
            Notify Team (Slack)
```

---

## 📊 **Monitoring & Observability**

### **Metrics**

```
Application Metrics (Prometheus):
- API request rate
- Response time (p50, p95, p99)
- Error rate
- Active WebSocket connections

Business Metrics:
- Scans per day
- Simulations run
- Playbooks generated
- Incidents tracked
```

### **Logging**

```
Structured Logs (JSON):
{
  "timestamp": "2024-02-04T16:45:32Z",
  "level": "INFO",
  "service": "scanner",
  "message": "Parsed 1247 traces",
  "context": {
    "project_id": "abc123",
    "agent_count": 24
  }
}
```

**Log Aggregation**: Elasticsearch + Kibana / Datadog

---

### **Tracing**

```
OpenTelemetry Instrumentation:
- API request traces
- Database query traces
- External API calls (Gemini, Web3)
- Background job traces
```

---

## 🌐 **Deployment Architecture**

### **Production Setup**

```
┌─────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE CDN                          │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
┌───────▼──────┐                 ┌───────▼──────┐
│   Frontend   │                 │   Backend    │
│   (Vercel)   │                 │  (Railway)   │
│              │                 │              │
│ • Next.js    │◄───────────────▶│ • FastAPI    │
│ • Static     │   REST/WS       │ • Workers    │
│ • Edge       │                 │              │
└──────────────┘                 └──────┬───────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                  ┌──────▼──────┐            ┌────────▼────────┐
                  │  Databases  │            │  External APIs  │
                  │             │            │                 │
                  │ • Neo4j     │            │ • Gemini 2.0    │
                  │ • PostgreSQL│            │ • Polygon       │
                  │ • Redis     │            │                 │
                  └─────────────┘            └─────────────────┘
```

---

## 🔧 **Technology Decisions**

### **Why FastAPI?**
- ✅ High performance (async)
- ✅ Auto-generated API docs
- ✅ Type safety with Pydantic
- ✅ WebSocket support

### **Why Neo4j?**
- ✅ Native graph database
- ✅ Cypher query language
- ✅ Built-in graph algorithms
- ✅ Visualization tools

### **Why Next.js?**
- ✅ React framework
- ✅ SSR + SSG
- ✅ API routes
- ✅ Vercel deployment

### **Why Gemini 2.0?**
- ✅ Advanced reasoning
- ✅ Long context window
- ✅ Structured output
- ✅ Cost-effective

### **Why Polygon?**
- ✅ Low transaction fees
- ✅ Fast confirmation
- ✅ EVM compatible
- ✅ Mature ecosystem

---

## 📈 **Performance Targets**

| Metric | Target | Notes |
|--------|--------|-------|
| API Response Time | < 200ms | p95 |
| Graph Load Time | < 2s | For 100 agents |
| Simulation Time | < 5s | BFS cascade |
| Playbook Generation | < 10s | Gemini API call |
| WebSocket Latency | < 100ms | Real-time updates |
| Uptime | 99.9% | ~8 hours downtime/year |

---

## 🔮 **Future Architecture Enhancements**

### **Phase 2: Multi-Region**
```
US Region ← → EU Region ← → Asia Region
    ↓             ↓             ↓
  Local DB    Local DB      Local DB
    ↓             ↓             ↓
        Global Replication
```

### **Phase 3: Edge Computing**
- Deploy graph analysis to edge
- Reduce latency for global users
- Cache hot data regionally

### **Phase 4: ML Pipeline**
```
Historical Data → Feature Engineering → Model Training
                                            ↓
                                    Deploy Model
                                            ↓
                                Real-time Predictions
```

---

## 📚 **Architecture Principles**

1. **Separation of Concerns**: Each service has single responsibility
2. **Scalability**: Horizontal scaling for all components
3. **Resilience**: Graceful degradation, circuit breakers
4. **Observability**: Comprehensive logging, metrics, tracing
5. **Security**: Defense in depth, least privilege
6. **Performance**: Caching, async processing, optimization

---

**Architecture Version**: 1.0.0  
**Last Updated**: 2024-02-04
