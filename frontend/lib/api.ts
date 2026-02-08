const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Agent {
  id: string;
  name: string;
  type: string;
  status?: string;
  risk_level?: string;
  risk?: string;
  dependencies?: string[];
  version?: string;
  uptime?: string;
  requests_per_min?: number;
  avg_latency_ms?: number;
  last_deployed?: string;
  owner?: string;
}

export interface ScanResult {
  success: boolean;
  agents: Agent[];
  total_agents: number;
  total_shadow_agents: number;
  shadow_agents: any[];
  dependencies: any[];
  scan_time: string;
  demo_type: string;
  metrics: {
    total_requests_per_min: number;
    avg_uptime: string;
    critical_agents: number;
    high_risk_agents: number;
  };
  gemini_available: boolean;
}

export interface GraphNode {
  id: string;
  data: { label: string; risk: string; type: string };
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  risk_analysis: {
    overall_risk: string;
    single_points_of_failure: string[];
    circular_dependencies: string[][];
    risk_scores: Record<string, number>;
  };
}

export interface SimulationResult {
  failed_agent: { id: string; name: string; type: string };
  impacted_agents: Agent[];
  impacted_count: number;
  blast_radius_score: number;
  impacted_workflows: string[];
  impact_estimate: {
    severity: string;
    revenue_risk: string;
    estimated_recovery_time: string;
  };
  simulation_time: string;
}

export interface PlaybookAction {
  action: string;
  verification: string;
  expected_outcome: string;
}

export interface PlaybookStep {
  phase: string;
  time_range: string;
  actions: PlaybookAction[];
}

export interface AuditEntry {
  type: string;
  title: string;
  evidence: string[];
}

export interface Playbook {
  incident: string;
  estimated_recovery_time: string;
  severity: string;
  gemini_analysis?: {
    root_cause: string;
    severity: string;
    blast_radius_explanation: string;
    recommended_actions: string[];
    prevention_measures: string[];
  };
  steps: PlaybookStep[];
  rollback_plan: string;
  escalation_contacts: string[];
  audit_trail: AuditEntry[];
  blockchain_proof?: {
    chain: string;
    tx_hash: string;
    block: number;
    timestamp: string;
    verified: boolean;
    explorer_url: string;
  };
  generated_at: string;
}

export async function scanAgents(demoType: string = "ecommerce"): Promise<ScanResult> {
  const res = await fetch(`${API_BASE}/api/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ demo_type: demoType }),
  });
  if (!res.ok) throw new Error(`Scan failed: ${res.statusText}`);
  return res.json();
}

export async function getGraph(): Promise<GraphData> {
  const res = await fetch(`${API_BASE}/api/graph`);
  if (!res.ok) throw new Error(`Graph failed: ${res.statusText}`);
  return res.json();
}

export async function simulateFailure(agentId: string): Promise<SimulationResult> {
  const res = await fetch(`${API_BASE}/api/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent_id: agentId }),
  });
  if (!res.ok) throw new Error(`Simulate failed: ${res.statusText}`);
  return res.json();
}

export async function getPlaybook(): Promise<Playbook> {
  const res = await fetch(`${API_BASE}/api/playbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Playbook failed: ${res.statusText}`);
  return res.json();
}
