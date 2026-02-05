from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import json
import random
from datetime import datetime

app = FastAPI(
    title="AgentGuard API",
    description="Multi-Agent Reliability Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for demo
app_state = {
    "agents": [],
    "dependencies": [],
    "graph_data": None,
    "simulation_result": None,
    "playbook": None
}

class ScanRequest(BaseModel):
    demo_type: Optional[str] = "ecommerce"

class SimulateRequest(BaseModel):
    agent_id: str

@app.get("/")
async def root():
    return {
        "message": "AgentGuard API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/api/scan")
async def scan_agents(request: ScanRequest):
    """Scan and discover AI agents in the system"""
    
    # Demo dataset - realistic e-commerce agent ecosystem with enhanced metrics
    agents = [
        {
            "id": "pricing-agent", 
            "name": "PricingAgent", 
            "type": "llm_agent", 
            "risk": "high",
            "version": "2.4.1",
            "uptime": "99.2%",
            "requests_per_min": 1247,
            "avg_latency_ms": 145,
            "last_deployed": "2026-01-15T10:30:00Z",
            "owner": "pricing-team@company.com"
        },
        {
            "id": "inventory-agent", 
            "name": "InventoryAgent", 
            "type": "api_agent", 
            "risk": "high",
            "version": "3.1.0",
            "uptime": "99.8%",
            "requests_per_min": 2341,
            "avg_latency_ms": 67,
            "last_deployed": "2026-01-20T14:15:00Z",
            "owner": "inventory-team@company.com"
        },
        {
            "id": "shipping-agent", 
            "name": "ShippingAgent", 
            "type": "workflow_agent", 
            "risk": "medium",
            "version": "1.8.3",
            "uptime": "99.5%",
            "requests_per_min": 892,
            "avg_latency_ms": 234,
            "last_deployed": "2025-12-10T09:00:00Z",
            "owner": "logistics-team@company.com"
        },
        {
            "id": "customer-support-agent", 
            "name": "CustomerSupportAgent", 
            "type": "llm_agent", 
            "risk": "medium",
            "version": "4.2.0",
            "uptime": "98.9%",
            "requests_per_min": 567,
            "avg_latency_ms": 312,
            "last_deployed": "2026-01-28T16:45:00Z",
            "owner": "support-team@company.com"
        },
        {
            "id": "fraud-detection-agent", 
            "name": "FraudDetectionAgent", 
            "type": "ml_agent", 
            "risk": "high",
            "version": "2.9.1",
            "uptime": "99.9%",
            "requests_per_min": 3421,
            "avg_latency_ms": 89,
            "last_deployed": "2026-01-25T11:20:00Z",
            "owner": "security-team@company.com"
        },
        {
            "id": "recommendation-agent", 
            "name": "RecommendationAgent", 
            "type": "ml_agent", 
            "risk": "low",
            "version": "5.1.2",
            "uptime": "99.3%",
            "requests_per_min": 4567,
            "avg_latency_ms": 178,
            "last_deployed": "2026-02-01T08:30:00Z",
            "owner": "ml-team@company.com"
        },
        {
            "id": "payment-agent", 
            "name": "PaymentAgent", 
            "type": "api_agent", 
            "risk": "critical",
            "version": "3.0.5",
            "uptime": "99.95%",
            "requests_per_min": 1876,
            "avg_latency_ms": 123,
            "last_deployed": "2026-01-18T13:00:00Z",
            "owner": "payments-team@company.com"
        },
        {
            "id": "analytics-agent", 
            "name": "AnalyticsAgent", 
            "type": "data_agent", 
            "risk": "low",
            "version": "2.3.0",
            "uptime": "98.7%",
            "requests_per_min": 234,
            "avg_latency_ms": 456,
            "last_deployed": "2025-11-30T10:00:00Z",
            "owner": "analytics-team@company.com"
        },
        {
            "id": "email-agent", 
            "name": "EmailAgent", 
            "type": "workflow_agent", 
            "risk": "low",
            "version": "1.5.2",
            "uptime": "99.1%",
            "requests_per_min": 678,
            "avg_latency_ms": 289,
            "last_deployed": "2025-12-15T15:30:00Z",
            "owner": "marketing-team@company.com"
        },
        {
            "id": "search-agent", 
            "name": "SearchAgent", 
            "type": "llm_agent", 
            "risk": "medium",
            "version": "3.4.1",
            "uptime": "99.4%",
            "requests_per_min": 5234,
            "avg_latency_ms": 201,
            "last_deployed": "2026-01-22T12:00:00Z",
            "owner": "search-team@company.com"
        },
        {
            "id": "cart-agent", 
            "name": "CartAgent", 
            "type": "workflow_agent", 
            "risk": "medium",
            "version": "2.1.0",
            "uptime": "99.6%",
            "requests_per_min": 3456,
            "avg_latency_ms": 134,
            "last_deployed": "2026-01-10T09:15:00Z",
            "owner": "cart-team@company.com"
        },
        {
            "id": "checkout-agent", 
            "name": "CheckoutAgent", 
            "type": "workflow_agent", 
            "risk": "high",
            "version": "4.0.2",
            "uptime": "99.7%",
            "requests_per_min": 2134,
            "avg_latency_ms": 167,
            "last_deployed": "2026-01-29T14:00:00Z",
            "owner": "checkout-team@company.com"
        },
        {
            "id": "order-agent", 
            "name": "OrderAgent", 
            "type": "workflow_agent", 
            "risk": "high",
            "version": "3.2.1",
            "uptime": "99.8%",
            "requests_per_min": 1987,
            "avg_latency_ms": 145,
            "last_deployed": "2026-01-26T11:30:00Z",
            "owner": "orders-team@company.com"
        },
        {
            "id": "notification-agent", 
            "name": "NotificationAgent", 
            "type": "workflow_agent", 
            "risk": "low",
            "version": "2.0.3",
            "uptime": "98.5%",
            "requests_per_min": 4321,
            "avg_latency_ms": 234,
            "last_deployed": "2025-12-20T16:00:00Z",
            "owner": "notifications-team@company.com"
        },
        {
            "id": "review-agent", 
            "name": "ReviewAgent", 
            "type": "llm_agent", 
            "risk": "low",
            "version": "1.9.0",
            "uptime": "99.0%",
            "requests_per_min": 456,
            "avg_latency_ms": 378,
            "last_deployed": "2026-01-05T10:45:00Z",
            "owner": "reviews-team@company.com"
        },
        {
            "id": "returns-agent", 
            "name": "ReturnsAgent", 
            "type": "workflow_agent", 
            "risk": "medium",
            "version": "2.5.1",
            "uptime": "99.2%",
            "requests_per_min": 234,
            "avg_latency_ms": 289,
            "last_deployed": "2025-12-28T13:20:00Z",
            "owner": "returns-team@company.com"
        },
        {
            "id": "warehouse-agent", 
            "name": "WarehouseAgent", 
            "type": "api_agent", 
            "risk": "medium",
            "version": "1.7.2",
            "uptime": "99.3%",
            "requests_per_min": 1234,
            "avg_latency_ms": 198,
            "last_deployed": "2026-01-12T08:00:00Z",
            "owner": "warehouse-team@company.com"
        },
        {
            "id": "supplier-agent", 
            "name": "SupplierAgent", 
            "type": "api_agent", 
            "risk": "medium",
            "version": "2.2.0",
            "uptime": "98.8%",
            "requests_per_min": 567,
            "avg_latency_ms": 345,
            "last_deployed": "2025-11-25T14:30:00Z",
            "owner": "procurement-team@company.com"
        },
        {
            "id": "loyalty-agent", 
            "name": "LoyaltyAgent", 
            "type": "workflow_agent", 
            "risk": "low",
            "version": "3.1.0",
            "uptime": "99.1%",
            "requests_per_min": 789,
            "avg_latency_ms": 212,
            "last_deployed": "2026-01-08T12:15:00Z",
            "owner": "loyalty-team@company.com"
        },
        {
            "id": "tax-agent", 
            "name": "TaxAgent", 
            "type": "api_agent", 
            "risk": "high",
            "version": "4.3.2",
            "uptime": "99.9%",
            "requests_per_min": 1543,
            "avg_latency_ms": 156,
            "last_deployed": "2026-01-30T09:00:00Z",
            "owner": "finance-team@company.com"
        },
        
        # Shadow agents (undocumented legacy systems)
        {
            "id": "legacy-pricing-v1", 
            "name": "LegacyPricingV1", 
            "type": "shadow_agent", 
            "risk": "critical",
            "version": "0.9.8",
            "uptime": "97.2%",
            "requests_per_min": 234,
            "avg_latency_ms": 567,
            "last_deployed": "2023-06-15T10:00:00Z",
            "owner": "unknown"
        },
        {
            "id": "old-inventory-sync", 
            "name": "OldInventorySync", 
            "type": "shadow_agent", 
            "risk": "high",
            "version": "1.2.3",
            "uptime": "96.5%",
            "requests_per_min": 123,
            "avg_latency_ms": 789,
            "last_deployed": "2023-03-20T14:00:00Z",
            "owner": "unknown"
        },
        {
            "id": "deprecated-payment-gateway", 
            "name": "DeprecatedPaymentGateway", 
            "type": "shadow_agent", 
            "risk": "critical",
            "version": "2.0.1",
            "uptime": "95.8%",
            "requests_per_min": 89,
            "avg_latency_ms": 1234,
            "last_deployed": "2022-11-10T09:30:00Z",
            "owner": "unknown"
        },
        {
            "id": "manual-override-bot", 
            "name": "ManualOverrideBot", 
            "type": "shadow_agent", 
            "risk": "high",
            "version": "0.5.2",
            "uptime": "94.3%",
            "requests_per_min": 45,
            "avg_latency_ms": 2345,
            "last_deployed": "2023-01-05T16:00:00Z",
            "owner": "unknown"
        },
    ]
    
    dependencies = [
            {"source": "pricing-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.98},
            {"source": "pricing-agent", "target": "promo-agent", "type": "api_call", "confidence": 0.95},
            {"source": "inventory-agent", "target": "warehouse-agent", "type": "api_call", "confidence": 0.97},
            {"source": "inventory-agent", "target": "shipping-agent", "type": "event", "confidence": 0.92},
            {"source": "shipping-agent", "target": "delivery-agent", "type": "api_call", "confidence": 0.96},
            {"source": "cart-agent", "target": "pricing-agent", "type": "api_call", "confidence": 0.99},
            {"source": "cart-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.94},
            {"source": "checkout-agent", "target": "cart-agent", "type": "api_call", "confidence": 0.98},
            {"source": "checkout-agent", "target": "payment-agent", "type": "api_call", "confidence": 0.99},
            {"source": "checkout-agent", "target": "tax-agent", "type": "api_call", "confidence": 0.97},
            {"source": "payment-agent", "target": "fraud-agent", "type": "api_call", "confidence": 0.98},
            {"source": "order-agent", "target": "checkout-agent", "type": "api_call", "confidence": 0.99},
            {"source": "order-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.96},
            {"source": "order-agent", "target": "notification-agent", "type": "event", "confidence": 0.93},
            {"source": "support-agent", "target": "order-agent", "type": "api_call", "confidence": 0.95},
            {"source": "support-agent", "target": "refund-agent", "type": "api_call", "confidence": 0.91},
            {"source": "refund-agent", "target": "payment-agent", "type": "api_call", "confidence": 0.97},
            {"source": "refund-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.94},
            {"source": "returns-agent", "target": "refund-agent", "type": "api_call", "confidence": 0.96},
            {"source": "returns-agent", "target": "warehouse-agent", "type": "api_call", "confidence": 0.93},
            {"source": "recommendation-agent", "target": "analytics-agent", "type": "api_call", "confidence": 0.89},
            {"source": "search-agent", "target": "recommendation-agent", "type": "api_call", "confidence": 0.87},
            {"source": "search-agent", "target": "cache-agent", "type": "api_call", "confidence": 0.95},
            {"source": "review-agent", "target": "order-agent", "type": "api_call", "confidence": 0.92},
            {"source": "loyalty-agent", "target": "order-agent", "type": "api_call", "confidence": 0.90},
            {"source": "promo-agent", "target": "loyalty-agent", "type": "api_call", "confidence": 0.88},
            {"source": "ab-test-agent", "target": "pricing-agent", "type": "event", "confidence": 0.85},
            {"source": "currency-agent", "target": "pricing-agent", "type": "api_call", "confidence": 0.94},
    ]
    
    shadow_agents = [a for a in agents if a["type"] == "shadow_agent"]
    
    # Store in state
    app_state["agents"] = agents
    app_state["dependencies"] = dependencies
    
    return {
        "success": True,
        "total_agents": len(agents),
        "total_shadow_agents": len(shadow_agents),
        "agents": agents,
        "shadow_agents": shadow_agents,
        "dependencies": dependencies,
        "scan_time": datetime.now().isoformat(),
        "metrics": {
            "total_requests_per_min": sum(a.get("requests_per_min", 0) for a in agents),
            "avg_uptime": f"{sum(float(a.get('uptime', '0%').rstrip('%')) for a in agents) / len(agents):.1f}%",
            "critical_agents": len([a for a in agents if a["risk"] == "critical"]),
            "high_risk_agents": len([a for a in agents if a["risk"] == "high"])
        }
    }

@app.get("/api/graph")
async def get_graph():
    """Get dependency graph with risk analysis"""
    
    if not app_state["agents"]:
        raise HTTPException(status_code=400, detail="No agents scanned yet")
    
    # Build graph nodes with organized hierarchical layout
    # Layer-based positioning for clean visualization
    layout = {
        # Top layer: Entry points (user-facing)
        "search-agent": {"x": 100, "y": 50},
        "cart-agent": {"x": 300, "y": 50},
        "checkout-agent": {"x": 500, "y": 50},
        "customer-support-agent": {"x": 700, "y": 50},
        "review-agent": {"x": 900, "y": 50},
        
        # Second layer: Core business logic
        "pricing-agent": {"x": 150, "y": 200},
        "inventory-agent": {"x": 350, "y": 200},
        "payment-agent": {"x": 550, "y": 200},
        "order-agent": {"x": 750, "y": 200},
        "recommendation-agent": {"x": 950, "y": 200},
        
        # Third layer: Supporting services
        "fraud-detection-agent": {"x": 100, "y": 350},
        "tax-agent": {"x": 300, "y": 350},
        "shipping-agent": {"x": 500, "y": 350},
        "notification-agent": {"x": 700, "y": 350},
        "analytics-agent": {"x": 900, "y": 350},
        
        # Fourth layer: Backend integrations
        "warehouse-agent": {"x": 150, "y": 500},
        "supplier-agent": {"x": 350, "y": 500},
        "email-agent": {"x": 550, "y": 500},
        "loyalty-agent": {"x": 750, "y": 500},
        "returns-agent": {"x": 950, "y": 500},
        
        # Bottom layer: Shadow agents (legacy)
        "legacy-pricing-v1": {"x": 200, "y": 650},
        "old-inventory-sync": {"x": 400, "y": 650},
        "deprecated-payment-gateway": {"x": 600, "y": 650},
        "manual-override-bot": {"x": 800, "y": 650},
    }
    
    nodes = []
    for agent in app_state["agents"]:
        position = layout.get(agent["id"], {"x": random.randint(100, 900), "y": random.randint(100, 600)})
        nodes.append({
            "id": agent["id"],
            "data": {
                "label": agent["name"],
                "type": agent["type"],
                "risk": agent["risk"],
                "version": agent.get("version", "1.0.0"),
                "uptime": agent.get("uptime", "N/A")
            },
            "position": position,
            "type": "default"
        })
    
    # Build graph edges
    edges = []
    for idx, dep in enumerate(app_state["dependencies"]):
        edges.append({
            "id": f"e{idx}",
            "source": dep["source"],
            "target": dep["target"],
            "type": "dependencyEdge",
            "data": {
                "type": dep["type"],
                "confidence": dep["confidence"]
            }
        })
    
    # Calculate risk metrics
    spof_agents = ["pricing-agent", "payment-agent", "checkout-agent", "order-agent"]
    circular_deps = [
        ["cart-agent", "pricing-agent", "inventory-agent", "cart-agent"]
    ]
    
    risk_scores = {}
    for agent in app_state["agents"]:
        if agent["risk"] == "high":
            risk_scores[agent["id"]] = random.uniform(7.5, 9.5)
        elif agent["risk"] == "medium":
            risk_scores[agent["id"]] = random.uniform(4.5, 7.0)
        else:
            risk_scores[agent["id"]] = random.uniform(1.0, 4.0)
    
    overall_risk = 8.5
    
    graph_data = {
        "nodes": nodes,
        "edges": edges,
        "analysis": {
            "spof_agents": spof_agents,
            "circular_dependencies": circular_deps,
            "risk_scores": risk_scores,
            "overall_risk": overall_risk
        }
    }
    
    app_state["graph_data"] = graph_data
    
    return graph_data

@app.post("/api/simulate")
async def simulate_failure(request: SimulateRequest):
    """Simulate agent failure and calculate blast radius"""
    
    if not app_state["dependencies"]:
        raise HTTPException(status_code=400, detail="No graph data available")
    
    agent_id = request.agent_id
    
    # Find agent
    agent = next((a for a in app_state["agents"] if a["id"] == agent_id), None)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # BFS to find impacted agents
    impacted = set()
    visited = {agent_id}
    queue = [agent_id]
    
    while queue:
        current = queue.pop(0)
        for dep in app_state["dependencies"]:
            if dep["source"] == current and dep["target"] not in visited:
                visited.add(dep["target"])
                impacted.add(dep["target"])
                queue.append(dep["target"])
    
    # Get impacted agent details
    impacted_agents = [
        next((a for a in app_state["agents"] if a["id"] == aid), None)
        for aid in impacted
    ]
    impacted_agents = [a for a in impacted_agents if a]
    
    # Calculate blast radius score
    total_agents = len(app_state["agents"])
    impact_ratio = len(impacted) / total_agents if total_agents > 0 else 0
    blast_radius_score = min(impact_ratio * 15, 10)
    
    # Identify impacted workflows
    workflows = []
    if agent_id in ["pricing-agent", "inventory-agent", "cart-agent"]:
        workflows.append("Order Processing")
    if agent_id in ["inventory-agent", "warehouse-agent", "shipping-agent"]:
        workflows.append("Inventory Management")
    if agent_id in ["shipping-agent", "delivery-agent"]:
        workflows.append("Shipping & Delivery")
    if agent_id in ["support-agent", "refund-agent"]:
        workflows.append("Customer Support")
    if agent_id in ["payment-agent", "fraud-agent"]:
        workflows.append("Payment Processing")
    
    # Estimate impact
    if len(impacted) > 10:
        severity = "CRITICAL"
        revenue_risk = "$500K-2M/hour"
    elif len(impacted) > 5:
        severity = "HIGH"
        revenue_risk = "$100K-500K/hour"
    else:
        severity = "MEDIUM"
        revenue_risk = "$10K-100K/hour"
    
    simulation_result = {
        "failed_agent": {
            "id": agent_id,
            "name": agent["name"],
            "type": agent["type"]
        },
        "impacted_agents": impacted_agents,
        "impacted_count": len(impacted),
        "blast_radius_score": round(blast_radius_score, 1),
        "impacted_workflows": workflows,
        "impact_estimate": {
            "severity": severity,
            "revenue_risk": revenue_risk,
            "estimated_recovery_time": "15-60 minutes"
        },
        "simulation_time": datetime.now().isoformat()
    }
    
    app_state["simulation_result"] = simulation_result
    
    return simulation_result

@app.post("/api/playbook")
async def generate_playbook():
    """Generate recovery playbook with audit trail"""
    
    if not app_state["simulation_result"]:
        raise HTTPException(status_code=400, detail="No simulation result available")
    
    sim = app_state["simulation_result"]
    agent_name = sim["failed_agent"]["name"]
    
    # Generate playbook steps
    playbook = {
        "incident": f"{agent_name} Failure",
        "estimated_recovery_time": "15-30 minutes",
        "severity": sim["impact_estimate"]["severity"],
        "steps": [
            {
                "id": "step1",
                "title": "Immediate Containment",
                "timeframe": "0-5 minutes",
                "actions": [
                    f"Switch {agent_name} to cached/fallback mode",
                    "Pause downstream triggers to prevent cascade",
                    "Alert on-call team via PagerDuty",
                    "Enable circuit breaker for affected services"
                ],
                "verifications": [
                    "Check: Error rate drops below 1%",
                    f"Monitor: {agent_name} fallback mode active",
                    "Verify: Downstream agents stable"
                ]
            },
            {
                "id": "step2",
                "title": "Activate Backup System",
                "timeframe": "5-15 minutes",
                "actions": [
                    f"Deploy backup {agent_name} instance",
                    "Route 10% traffic for testing",
                    "Monitor error rates and latency",
                    "Validate data consistency"
                ],
                "verifications": [
                    "Check: Backup instance healthy",
                    "Monitor: Error rate < 0.1%",
                    "Verify: Response time < 200ms",
                    "Validate: Data sync complete"
                ]
            },
            {
                "id": "step3",
                "title": "Full Recovery",
                "timeframe": "15-30 minutes",
                "actions": [
                    "Route 100% traffic to backup system",
                    "Re-enable downstream triggers",
                    "Validate all dependent agents",
                    "Clear circuit breakers",
                    "Monitor for 10 minutes"
                ],
                "verifications": [
                    "Check: All agents healthy",
                    "Monitor: Cascade risk score < 2.0",
                    "Verify: Workflows operational",
                    "Validate: No error spikes"
                ]
            }
        ],
        "audit_trail": [
            {
                "type": "dependency",
                "title": f"Dependency: {agent_name} → InventoryAgent",
                "evidence": [
                    "Trace ID: 7a8b9c4d-e5f6-4321-a1b2-c3d4e5f67890",
                    "Timestamp: 2026-02-04 14:23:11 UTC",
                    "API Call: POST /inventory/reorder",
                    "Confidence: 98%",
                    "Observed: 1,247 times (last 7 days)"
                ],
                "confidence": 0.98
            },
            {
                "type": "dependency",
                "title": "Dependency: InventoryAgent → ShippingAgent",
                "evidence": [
                    "Trace ID: 3d4e5f6a-7b8c-4321-d1e2-f3a4b5c67890",
                    "Timestamp: 2026-02-04 14:23:15 UTC",
                    "Event: inventory_updated → shipping_recalc",
                    "Confidence: 95%",
                    "Observed: 892 times (last 7 days)"
                ],
                "confidence": 0.95
            },
            {
                "type": "risk",
                "title": f"Risk Assessment: {agent_name} = SPOF",
                "evidence": [
                    "Centrality score: 0.87 (top 5%)",
                    f"Downstream agents: {sim['impacted_count']}",
                    "No redundancy detected",
                    "Historical incidents: 2 (last 30 days)"
                ],
                "confidence": 0.92
            }
        ],
        "blockchain_proof": {
            "chain": "Polygon Mumbai Testnet",
            "tx_hash": f"0x{random.randbytes(32).hex()}",
            "block": random.randint(42000000, 43000000),
            "timestamp": datetime.now().isoformat(),
            "verified": True,
            "explorer_url": "https://mumbai.polygonscan.com/tx/0x..."
        },
        "generated_at": datetime.now().isoformat()
    }
    
    app_state["playbook"] = playbook
    
    return playbook

@app.get("/api/state")
async def get_state():
    """Get current application state (for debugging)"""
    return {
        "has_agents": len(app_state["agents"]) > 0,
        "has_graph": app_state["graph_data"] is not None,
        "has_simulation": app_state["simulation_result"] is not None,
        "has_playbook": app_state["playbook"] is not None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
