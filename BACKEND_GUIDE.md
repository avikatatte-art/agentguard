# ⚙️ Backend Development Guide

## **AgentGuard Backend Architecture**

Built with **FastAPI + Python + Neo4j + Gemini 2.0 + Web3**

---

## 📋 **Table of Contents**

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [API Architecture](#api-architecture)
5. [Core Services](#core-services)
6. [Database Schema](#database-schema)
7. [Gemini Integration](#gemini-integration)
8. [Web3 Audit Layer](#web3-audit-layer)
9. [Testing Guide](#testing-guide)
10. [Deployment](#deployment)

---

## 🛠️ **Tech Stack**

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | FastAPI | High-performance async API |
| **Language** | Python 3.10+ | Backend logic |
| **Graph DB** | Neo4j | Dependency graph storage |
| **Cache** | Redis | Session & query caching |
| **Database** | PostgreSQL | Metadata & incidents |
| **AI** | Google Gemini 2.0 | Reasoning & playbook generation |
| **Tracing** | OpenTelemetry | Trace parsing |
| **Web3** | Web3.py + Polygon | Audit trail blockchain |
| **Queue** | Celery + RabbitMQ | Background tasks |
| **Monitoring** | Sentry | Error tracking |

---

## 📁 **Project Structure**

```
backend/
├── main.py                      # FastAPI app entry point
├── config.py                    # Configuration management
├── requirements.txt             # Python dependencies
├── Dockerfile                   # Container setup
├── docker-compose.yml           # Services orchestration
│
├── routers/                     # API endpoints
│   ├── __init__.py
│   ├── scan.py                 # POST /api/scan
│   ├── graph.py                # GET /api/graph
│   ├── simulate.py             # POST /api/simulate
│   ├── playbook.py             # POST /api/playbook
│   └── health.py               # GET /health
│
├── services/                    # Business logic
│   ├── __init__.py
│   ├── scanner.py              # OTel trace parser
│   ├── graph_engine.py         # Neo4j + NetworkX
│   ├── simulator.py            # BFS cascade engine
│   ├── risk_analyzer.py        # Risk scoring
│   ├── gemini_service.py       # Gemini API client
│   ├── web3_audit.py           # Blockchain logger
│   └── evidence_linker.py      # Evidence tracking
│
├── models/                      # Data models (Pydantic)
│   ├── __init__.py
│   ├── agent.py                # Agent schema
│   ├── dependency.py           # Dependency schema
│   ├── incident.py             # Incident schema
│   ├── playbook.py             # Playbook schema
│   └── audit.py                # Audit log schema
│
├── db/                          # Database layer
│   ├── __init__.py
│   ├── neo4j_client.py         # Neo4j connection
│   ├── postgres_client.py      # PostgreSQL connection
│   └── redis_client.py         # Redis connection
│
├── utils/                       # Utility functions
│   ├── __init__.py
│   ├── logger.py               # Logging setup
│   ├── validators.py           # Input validation
│   ├── parsers.py              # Data parsers
│   └── constants.py            # Constants
│
├── tasks/                       # Celery background tasks
│   ├── __init__.py
│   ├── scan_task.py            # Async scanning
│   └── audit_task.py           # Blockchain logging
│
├── tests/                       # Test suite
│   ├── __init__.py
│   ├── test_scanner.py
│   ├── test_graph.py
│   ├── test_simulator.py
│   └── test_gemini.py
│
├── data/                        # Demo data
│   ├── demo_ecommerce.json     # E-commerce dataset
│   └── demo_content.json       # Content pipeline dataset
│
└── scripts/                     # Utility scripts
    ├── seed_demo_data.py       # Load demo data
    └── migrate_db.py           # Database migrations
```

---

## 🚀 **Setup Instructions**

### **1. Install Dependencies**

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install packages
pip install -r requirements.txt
```

### **requirements.txt**

```txt
# Core
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.0
pydantic-settings==2.1.0

# Database
neo4j==5.16.0
psycopg2-binary==2.9.9
redis==5.0.1
sqlalchemy==2.0.25

# Graph & Analysis
networkx==3.2.1
numpy==1.26.3
scipy==1.11.4

# AI & ML
google-generativeai==0.3.2
opentelemetry-api==1.22.0
opentelemetry-sdk==1.22.0

# Web3
web3==6.15.0
eth-account==0.10.0

# Background Tasks
celery==5.3.6
redis==5.0.1

# Utils
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.0
httpx==0.26.0

# Monitoring
sentry-sdk==1.40.0

# Testing
pytest==7.4.4
pytest-asyncio==0.23.3
pytest-cov==4.1.0
httpx==0.26.0
```

### **2. Environment Setup**

Create `.env`:
```env
# API
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Neo4j
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=agentguard
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

# Web3
WEB3_PROVIDER_URL=https://polygon-mumbai.g.alchemy.com/v2/your_key
WEB3_PRIVATE_KEY=your_private_key
WEB3_CONTRACT_ADDRESS=0x...

# Celery
CELERY_BROKER_URL=redis://localhost:6379/1
CELERY_RESULT_BACKEND=redis://localhost:6379/2

# Sentry
SENTRY_DSN=your_sentry_dsn
```

### **3. Start Services with Docker**

```bash
# Start Neo4j, PostgreSQL, Redis
docker-compose up -d

# Verify services
docker-compose ps
```

### **docker-compose.yml**

```yaml
version: '3.8'

services:
  neo4j:
    image: neo4j:5.16.0
    ports:
      - "7474:7474"  # HTTP
      - "7687:7687"  # Bolt
    environment:
      NEO4J_AUTH: neo4j/your_password
      NEO4J_PLUGINS: '["apoc", "graph-data-science"]'
    volumes:
      - neo4j_data:/data

  postgres:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: agentguard
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  neo4j_data:
  postgres_data:
  redis_data:
```

### **4. Run Backend**

```bash
# Development
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### **5. Run Celery Worker**

```bash
celery -A tasks.celery_app worker --loglevel=info
```

---

## 🏗️ **API Architecture**

### **Main Application** (`main.py`)

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import sentry_sdk

from config import settings
from routers import scan, graph, simulate, playbook, health
from db.neo4j_client import neo4j_driver
from db.postgres_client import engine
from utils.logger import setup_logger

logger = setup_logger(__name__)

# Sentry initialization
if settings.SENTRY_DSN:
    sentry_sdk.init(dsn=settings.SENTRY_DSN)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    logger.info("Starting AgentGuard API...")
    await neo4j_driver.verify_connectivity()
    logger.info("Connected to Neo4j")
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    await neo4j_driver.close()

app = FastAPI(
    title="AgentGuard API",
    description="Multi-Agent Reliability Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(scan.router, prefix="/api/scan", tags=["Scan"])
app.include_router(graph.router, prefix="/api/graph", tags=["Graph"])
app.include_router(simulate.router, prefix="/api/simulate", tags=["Simulate"])
app.include_router(playbook.router, prefix="/api/playbook", tags=["Playbook"])

@app.get("/")
async def root():
    return {
        "message": "AgentGuard API",
        "version": "1.0.0",
        "docs": "/docs"
    }
```

### **Configuration** (`config.py`)

```python
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # API
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = False
    
    # Gemini
    GEMINI_API_KEY: str
    GEMINI_MODEL: str = "gemini-2.0-flash-exp"
    
    # Neo4j
    NEO4J_URI: str
    NEO4J_USER: str
    NEO4J_PASSWORD: str
    
    # PostgreSQL
    POSTGRES_HOST: str
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    
    # Redis
    REDIS_HOST: str
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    
    # Web3
    WEB3_PROVIDER_URL: str
    WEB3_PRIVATE_KEY: str
    WEB3_CONTRACT_ADDRESS: str
    
    # Celery
    CELERY_BROKER_URL: str
    CELERY_RESULT_BACKEND: str
    
    # Sentry
    SENTRY_DSN: str = ""
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
```

---

## 🔌 **Core Services**

### **1. Scanner Service** (`services/scanner.py`)

Parses OpenTelemetry traces and extracts agent dependencies.

```python
import json
from typing import List, Dict, Any
from models.agent import Agent, Dependency
from utils.logger import setup_logger

logger = setup_logger(__name__)

class ScannerService:
    """Parses traces and extracts agent dependencies"""
    
    def __init__(self):
        self.agents: Dict[str, Agent] = {}
        self.dependencies: List[Dependency] = []
    
    async def parse_otel_traces(self, traces: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Parse OpenTelemetry traces and extract agents
        
        Args:
            traces: List of OTel trace objects
            
        Returns:
            Dict with agents and dependencies
        """
        logger.info(f"Parsing {len(traces)} traces...")
        
        for trace in traces:
            self._extract_agents_from_trace(trace)
            self._extract_dependencies_from_trace(trace)
        
        # Detect shadow agents (undocumented)
        shadow_agents = self._detect_shadow_agents()
        
        return {
            "agents": list(self.agents.values()),
            "shadow_agents": shadow_agents,
            "dependencies": self.dependencies,
            "total_agents": len(self.agents),
            "total_dependencies": len(self.dependencies),
        }
    
    def _extract_agents_from_trace(self, trace: Dict[str, Any]):
        """Extract agent information from a single trace"""
        spans = trace.get("spans", [])
        
        for span in spans:
            service_name = span.get("serviceName")
            if not service_name:
                continue
            
            # Check if it's an agent (heuristic)
            if self._is_agent(span):
                agent_id = service_name
                
                if agent_id not in self.agents:
                    self.agents[agent_id] = Agent(
                        id=agent_id,
                        name=service_name,
                        type=self._infer_agent_type(span),
                        metadata=self._extract_metadata(span),
                    )
    
    def _extract_dependencies_from_trace(self, trace: Dict[str, Any]):
        """Extract dependencies between agents"""
        spans = trace.get("spans", [])
        
        # Build parent-child relationships
        for span in spans:
            parent_id = span.get("parentSpanId")
            if not parent_id:
                continue
            
            # Find parent span
            parent_span = next(
                (s for s in spans if s.get("spanId") == parent_id),
                None
            )
            
            if parent_span:
                source = parent_span.get("serviceName")
                target = span.get("serviceName")
                
                if source and target and source != target:
                    self.dependencies.append(
                        Dependency(
                            source=source,
                            target=target,
                            type="api_call",
                            confidence=0.95,
                            evidence={
                                "trace_id": trace.get("traceId"),
                                "timestamp": span.get("timestamp"),
                            }
                        )
                    )
    
    def _is_agent(self, span: Dict[str, Any]) -> bool:
        """Heuristic to determine if a service is an agent"""
        service_name = span.get("serviceName", "").lower()
        
        # Check for agent keywords
        agent_keywords = ["agent", "bot", "assistant", "worker"]
        return any(keyword in service_name for keyword in agent_keywords)
    
    def _infer_agent_type(self, span: Dict[str, Any]) -> str:
        """Infer agent type from span attributes"""
        attributes = span.get("attributes", {})
        
        # Simple heuristic
        if "llm" in str(attributes).lower():
            return "llm_agent"
        elif "api" in str(attributes).lower():
            return "api_agent"
        else:
            return "generic_agent"
    
    def _extract_metadata(self, span: Dict[str, Any]) -> Dict[str, Any]:
        """Extract relevant metadata"""
        return {
            "duration_ms": span.get("duration", 0) / 1000,
            "status": span.get("status", {}).get("code"),
            "attributes": span.get("attributes", {}),
        }
    
    def _detect_shadow_agents(self) -> List[Agent]:
        """Detect undocumented agents"""
        # Agents without proper documentation/tags
        shadow = []
        for agent in self.agents.values():
            if not agent.metadata.get("documented", False):
                shadow.append(agent)
        
        return shadow
```

### **2. Graph Engine** (`services/graph_engine.py`)

Manages dependency graph in Neo4j and performs analysis.

```python
from typing import List, Dict, Any
import networkx as nx
from neo4j import AsyncGraphDatabase
from config import settings
from models.agent import Agent, Dependency
from utils.logger import setup_logger

logger = setup_logger(__name__)

class GraphEngine:
    """Manages agent dependency graph"""
    
    def __init__(self):
        self.driver = AsyncGraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
        )
        self.nx_graph = nx.DiGraph()
    
    async def build_graph(
        self,
        agents: List[Agent],
        dependencies: List[Dependency]
    ) -> Dict[str, Any]:
        """
        Build dependency graph in Neo4j and NetworkX
        
        Args:
            agents: List of agents
            dependencies: List of dependencies
            
        Returns:
            Graph metadata
        """
        logger.info("Building dependency graph...")
        
        # Clear existing graph
        await self._clear_graph()
        
        # Add nodes
        for agent in agents:
            await self._add_agent_node(agent)
            self.nx_graph.add_node(agent.id, **agent.dict())
        
        # Add edges
        for dep in dependencies:
            await self._add_dependency_edge(dep)
            self.nx_graph.add_edge(
                dep.source,
                dep.target,
                **dep.dict()
            )
        
        # Analyze graph
        analysis = await self.analyze_graph()
        
        return {
            "nodes": len(agents),
            "edges": len(dependencies),
            "analysis": analysis,
        }
    
    async def _add_agent_node(self, agent: Agent):
        """Add agent node to Neo4j"""
        async with self.driver.session() as session:
            await session.run(
                """
                CREATE (a:Agent {
                    id: $id,
                    name: $name,
                    type: $type,
                    metadata: $metadata
                })
                """,
                id=agent.id,
                name=agent.name,
                type=agent.type,
                metadata=agent.metadata,
            )
    
    async def _add_dependency_edge(self, dep: Dependency):
        """Add dependency edge to Neo4j"""
        async with self.driver.session() as session:
            await session.run(
                """
                MATCH (source:Agent {id: $source})
                MATCH (target:Agent {id: $target})
                CREATE (source)-[:DEPENDS_ON {
                    type: $type,
                    confidence: $confidence,
                    evidence: $evidence
                }]->(target)
                """,
                source=dep.source,
                target=dep.target,
                type=dep.type,
                confidence=dep.confidence,
                evidence=dep.evidence,
            )
    
    async def analyze_graph(self) -> Dict[str, Any]:
        """Perform graph analysis"""
        logger.info("Analyzing graph...")
        
        # SPOF detection (high centrality, no redundancy)
        spof_agents = self._detect_spof()
        
        # Circular dependency detection
        circular_deps = self._detect_cycles()
        
        # Risk scoring
        risk_scores = self._calculate_risk_scores()
        
        return {
            "spof_agents": spof_agents,
            "circular_dependencies": circular_deps,
            "risk_scores": risk_scores,
            "overall_risk": max(risk_scores.values()) if risk_scores else 0,
        }
    
    def _detect_spof(self) -> List[str]:
        """Detect single points of failure"""
        spof = []
        
        # Calculate betweenness centrality
        centrality = nx.betweenness_centrality(self.nx_graph)
        
        # High centrality = SPOF
        threshold = 0.3
        for node, score in centrality.items():
            if score > threshold:
                # Check if no redundancy
                if self.nx_graph.out_degree(node) > 2:
                    spof.append(node)
        
        return spof
    
    def _detect_cycles(self) -> List[List[str]]:
        """Detect circular dependencies"""
        try:
            cycles = list(nx.simple_cycles(self.nx_graph))
            return cycles
        except:
            return []
    
    def _calculate_risk_scores(self) -> Dict[str, float]:
        """Calculate risk score for each agent"""
        scores = {}
        
        centrality = nx.betweenness_centrality(self.nx_graph)
        pagerank = nx.pagerank(self.nx_graph)
        
        for node in self.nx_graph.nodes():
            # Combine metrics
            score = (
                centrality.get(node, 0) * 0.5 +
                pagerank.get(node, 0) * 0.3 +
                (self.nx_graph.out_degree(node) / 10) * 0.2
            )
            scores[node] = min(score * 10, 10)  # Scale to 0-10
        
        return scores
    
    async def get_graph_data(self) -> Dict[str, Any]:
        """Get graph data for visualization"""
        nodes = []
        edges = []
        
        for node, data in self.nx_graph.nodes(data=True):
            nodes.append({
                "id": node,
                "label": data.get("name", node),
                "type": data.get("type", "unknown"),
            })
        
        for source, target, data in self.nx_graph.edges(data=True):
            edges.append({
                "source": source,
                "target": target,
                "type": data.get("type", "unknown"),
            })
        
        return {"nodes": nodes, "edges": edges}
    
    async def _clear_graph(self):
        """Clear existing graph"""
        async with self.driver.session() as session:
            await session.run("MATCH (n) DETACH DELETE n")
    
    async def close(self):
        """Close driver"""
        await self.driver.close()
```

### **3. Simulator Service** (`services/simulator.py`)

Simulates agent failures and calculates blast radius.

```python
from typing import List, Dict, Any, Set
from collections import deque
import networkx as nx
from models.agent import Agent
from utils.logger import setup_logger

logger = setup_logger(__name__)

class SimulatorService:
    """Simulates agent failures and cascade effects"""
    
    def __init__(self, graph: nx.DiGraph):
        self.graph = graph
    
    async def simulate_failure(self, agent_id: str) -> Dict[str, Any]:
        """
        Simulate failure of an agent and calculate impact
        
        Args:
            agent_id: ID of agent to fail
            
        Returns:
            Simulation results
        """
        logger.info(f"Simulating failure of {agent_id}...")
        
        if agent_id not in self.graph:
            raise ValueError(f"Agent {agent_id} not found")
        
        # BFS to find all impacted agents
        impacted_agents = self._bfs_cascade(agent_id)
        
        # Calculate blast radius score
        blast_radius_score = self._calculate_blast_radius(
            agent_id,
            impacted_agents
        )
        
        # Identify impacted workflows
        impacted_workflows = self._identify_workflows(impacted_agents)
        
        # Estimate impact
        impact_estimate = self._estimate_impact(
            agent_id,
            impacted_agents,
            impacted_workflows
        )
        
        return {
            "failed_agent": agent_id,
            "impacted_agents": list(impacted_agents),
            "impacted_count": len(impacted_agents),
            "blast_radius_score": blast_radius_score,
            "impacted_workflows": impacted_workflows,
            "impact_estimate": impact_estimate,
        }
    
    def _bfs_cascade(self, start_agent: str) -> Set[str]:
        """BFS to find all downstream impacted agents"""
        impacted = set()
        queue = deque([start_agent])
        visited = {start_agent}
        
        while queue:
            current = queue.popleft()
            
            # Get all downstream agents
            for neighbor in self.graph.successors(current):
                if neighbor not in visited:
                    visited.add(neighbor)
                    impacted.add(neighbor)
                    queue.append(neighbor)
        
        return impacted
    
    def _calculate_blast_radius(
        self,
        agent_id: str,
        impacted: Set[str]
    ) -> float:
        """Calculate blast radius score (0-10)"""
        total_agents = len(self.graph.nodes())
        impact_ratio = len(impacted) / total_agents if total_agents > 0 else 0
        
        # Factor in centrality
        centrality = nx.betweenness_centrality(self.graph)
        centrality_score = centrality.get(agent_id, 0)
        
        # Combine metrics
        score = (impact_ratio * 0.6 + centrality_score * 0.4) * 10
        
        return min(score, 10)
    
    def _identify_workflows(self, impacted_agents: Set[str]) -> List[str]:
        """Identify impacted workflows"""
        # Simplified: group agents by type/domain
        workflows = set()
        
        for agent in impacted_agents:
            node_data = self.graph.nodes[agent]
            agent_type = node_data.get("type", "unknown")
            
            # Map agent types to workflows
            workflow_map = {
                "pricing": "Order Processing",
                "inventory": "Inventory Management",
                "shipping": "Shipping Optimization",
                "support": "Customer Support",
            }
            
            for keyword, workflow in workflow_map.items():
                if keyword in agent.lower():
                    workflows.add(workflow)
        
        return list(workflows)
    
    def _estimate_impact(
        self,
        agent_id: str,
        impacted_agents: Set[str],
        workflows: List[str]
    ) -> Dict[str, Any]:
        """Estimate business impact"""
        impact_count = len(impacted_agents)
        
        # Severity levels
        if impact_count > 10:
            severity = "CRITICAL"
            revenue_risk = "$500K-2M/hour"
        elif impact_count > 5:
            severity = "HIGH"
            revenue_risk = "$100K-500K/hour"
        else:
            severity = "MEDIUM"
            revenue_risk = "$10K-100K/hour"
        
        return {
            "severity": severity,
            "revenue_risk": revenue_risk,
            "workflow_count": len(workflows),
            "estimated_recovery_time": "15-60 minutes",
        }
```

### **4. Gemini Service** (`services/gemini_service.py`)

Integrates with Google Gemini 2.0 for reasoning and playbook generation.

```python
import google.generativeai as genai
from typing import Dict, Any, List
from config import settings
from utils.logger import setup_logger

logger = setup_logger(__name__)

genai.configure(api_key=settings.GEMINI_API_KEY)

class GeminiService:
    """Google Gemini 2.0 integration for AI reasoning"""
    
    def __init__(self):
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
    
    async def generate_playbook(
        self,
        incident: Dict[str, Any],
        simulation: Dict[str, Any],
        graph_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generate recovery playbook using Gemini
        
        Args:
            incident: Incident details
            simulation: Simulation results
            graph_context: Graph analysis
            
        Returns:
            Playbook with steps
        """
        logger.info("Generating playbook with Gemini...")
        
        prompt = self._build_playbook_prompt(
            incident,
            simulation,
            graph_context
        )
        
        response = await self.model.generate_content_async(prompt)
        
        # Parse response
        playbook = self._parse_playbook_response(response.text)
        
        return playbook
    
    def _build_playbook_prompt(
        self,
        incident: Dict[str, Any],
        simulation: Dict[str, Any],
        graph_context: Dict[str, Any]
    ) -> str:
        """Build prompt for playbook generation"""
        
        prompt = f"""
You are an expert incident response system for AI agent ecosystems.

INCIDENT DETAILS:
- Failed Agent: {incident.get('agent_id')}
- Agent Type: {incident.get('agent_type')}
- Failure Time: {incident.get('timestamp')}

IMPACT ANALYSIS:
- Impacted Agents: {simulation.get('impacted_count')}
- Blast Radius Score: {simulation.get('blast_radius_score')}/10
- Impacted Workflows: {', '.join(simulation.get('impacted_workflows', []))}
- Severity: {simulation.get('impact_estimate', {}).get('severity')}

GRAPH CONTEXT:
- Total Agents: {graph_context.get('total_agents')}
- SPOF Agents: {', '.join(graph_context.get('spof_agents', []))}
- Circular Dependencies: {len(graph_context.get('circular_deps', []))}

TASK:
Generate a step-by-step recovery playbook with:
1. Immediate containment actions (0-5 min)
2. Backup activation (5-15 min)
3. Full recovery (15-30 min)

For each step, provide:
- Clear actions
- Verification steps
- Expected outcomes

Format as JSON:
{{
  "incident": "...",
  "estimated_recovery_time": "...",
  "steps": [
    {{
      "id": "step1",
      "title": "...",
      "timeframe": "0-5 min",
      "actions": ["...", "..."],
      "verifications": ["...", "..."]
    }}
  ]
}}
"""
        return prompt
    
    def _parse_playbook_response(self, response_text: str) -> Dict[str, Any]:
        """Parse Gemini response into structured playbook"""
        import json
        import re
        
        # Extract JSON from response
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            try:
                return json.loads(json_match.group())
            except json.JSONDecodeError:
                logger.error("Failed to parse Gemini response")
        
        # Fallback: basic playbook
        return {
            "incident": "Agent Failure",
            "estimated_recovery_time": "15-30 minutes",
            "steps": [
                {
                    "id": "step1",
                    "title": "Immediate Containment",
                    "timeframe": "0-5 min",
                    "actions": ["Activate backup", "Pause triggers"],
                    "verifications": ["Check error rates"]
                }
            ]
        }
    
    async def generate_incident_summary(
        self,
        simulation: Dict[str, Any]
    ) -> str:
        """Generate human-readable incident summary"""
        
        prompt = f"""
Summarize this agent failure incident in 2-3 sentences:

Failed Agent: {simulation.get('failed_agent')}
Impacted Agents: {simulation.get('impacted_count')}
Blast Radius: {simulation.get('blast_radius_score')}/10
Workflows: {', '.join(simulation.get('impacted_workflows', []))}

Be concise and focus on business impact.
"""
        
        response = await self.model.generate_content_async(prompt)
        return response.text.strip()
```

### **5. Web3 Audit Service** (`services/web3_audit.py`)

Logs audit trails to blockchain for tamper-proof evidence.

```python
from web3 import Web3
from eth_account import Account
from typing import Dict, Any
import json
import hashlib
from config import settings
from utils.logger import setup_logger

logger = setup_logger(__name__)

class Web3AuditService:
    """Blockchain audit trail logger"""
    
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER_URL))
        self.account = Account.from_key(settings.WEB3_PRIVATE_KEY)
        self.contract_address = settings.WEB3_CONTRACT_ADDRESS
    
    async def log_audit_trail(
        self,
        audit_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Log audit trail to blockchain
        
        Args:
            audit_data: Audit log data
            
        Returns:
            Blockchain proof
        """
        logger.info("Logging audit trail to blockchain...")
        
        # Hash the audit data
        data_hash = self._hash_audit_data(audit_data)
        
        # Store hash on-chain
        tx_hash = await self._store_on_chain(data_hash)
        
        # Wait for confirmation
        receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        
        return {
            "chain": "Polygon Mumbai",
            "tx_hash": receipt['transactionHash'].hex(),
            "block": receipt['blockNumber'],
            "timestamp": self.w3.eth.get_block(receipt['blockNumber'])['timestamp'],
            "data_hash": data_hash,
            "verified": True,
        }
    
    def _hash_audit_data(self, data: Dict[str, Any]) -> str:
        """Create hash of audit data"""
        # Serialize data
        data_str = json.dumps(data, sort_keys=True)
        
        # SHA-256 hash
        hash_obj = hashlib.sha256(data_str.encode())
        return hash_obj.hexdigest()
    
    async def _store_on_chain(self, data_hash: str) -> str:
        """Store hash on blockchain"""
        # Simple transaction with data hash in input data
        tx = {
            'from': self.account.address,
            'to': self.contract_address,
            'value': 0,
            'gas': 100000,
            'gasPrice': self.w3.eth.gas_price,
            'nonce': self.w3.eth.get_transaction_count(self.account.address),
            'data': self.w3.to_hex(text=data_hash),
        }
        
        # Sign transaction
        signed_tx = self.w3.eth.account.sign_transaction(tx, self.account.key)
        
        # Send transaction
        tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        return tx_hash
    
    async def verify_audit_trail(
        self,
        tx_hash: str,
        original_data: Dict[str, Any]
    ) -> bool:
        """Verify audit trail integrity"""
        try:
            # Get transaction
            tx = self.w3.eth.get_transaction(tx_hash)
            
            # Extract stored hash
            stored_hash = self.w3.to_text(tx['input'])
            
            # Calculate hash of original data
            calculated_hash = self._hash_audit_data(original_data)
            
            # Compare
            return stored_hash == calculated_hash
        except Exception as e:
            logger.error(f"Verification failed: {e}")
            return False
```

---

## 🗄️ **Database Schema**

### **Neo4j Graph Schema**

```cypher
// Agent Node
CREATE (a:Agent {
  id: String,
  name: String,
  type: String,
  metadata: Map
})

// Dependency Relationship
CREATE (a1:Agent)-[:DEPENDS_ON {
  type: String,
  confidence: Float,
  evidence: Map,
  timestamp: DateTime
}]->(a2:Agent)

// Indexes
CREATE INDEX agent_id FOR (a:Agent) ON (a.id)
CREATE INDEX agent_name FOR (a:Agent) ON (a.name)
```

### **PostgreSQL Schema**

```sql
-- Incidents table
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id VARCHAR(255) NOT NULL,
    incident_type VARCHAR(50),
    severity VARCHAR(20),
    blast_radius_score FLOAT,
    impacted_agents JSONB,
    playbook JSONB,
    audit_trail JSONB,
    blockchain_proof JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);

-- Playbooks table
CREATE TABLE playbooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id UUID REFERENCES incidents(id),
    title VARCHAR(255),
    steps JSONB,
    effectiveness_score FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id UUID REFERENCES incidents(id),
    log_type VARCHAR(50),
    evidence JSONB,
    blockchain_tx_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_incidents_agent ON incidents(agent_id);
CREATE INDEX idx_incidents_created ON incidents(created_at);
CREATE INDEX idx_audit_logs_incident ON audit_logs(incident_id);
```

---

## 🧪 **Testing Guide**

### **Unit Tests**

```python
# tests/test_scanner.py
import pytest
from services.scanner import ScannerService

@pytest.mark.asyncio
async def test_parse_otel_traces():
    scanner = ScannerService()
    
    traces = [
        {
            "traceId": "abc123",
            "spans": [
                {
                    "spanId": "span1",
                    "serviceName": "PricingAgent",
                    "attributes": {"type": "llm"}
                }
            ]
        }
    ]
    
    result = await scanner.parse_otel_traces(traces)
    
    assert result["total_agents"] > 0
    assert "PricingAgent" in [a.name for a in result["agents"]]
```

### **Run Tests**

```bash
# All tests
pytest

# With coverage
pytest --cov=services --cov-report=html

# Specific test
pytest tests/test_scanner.py -v
```

---

## 🚀 **Deployment**

### **Docker Build**

```dockerfile
# Dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### **Deploy to Railway**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

## 📚 **API Documentation**

Once running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

**Happy Building! ⚙️**
