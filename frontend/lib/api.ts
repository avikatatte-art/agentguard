import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Agent {
  id: string;
  name: string;
  type: string;
  risk: 'high' | 'medium' | 'low';
}

export interface Dependency {
  source: string;
  target: string;
  type: string;
  confidence: number;
}

export interface ScanResponse {
  success: boolean;
  total_agents: number;
  total_shadow_agents: number;
  agents: Agent[];
  shadow_agents: Agent[];
  dependencies: Dependency[];
}

export interface GraphNode {
  id: string;
  data: {
    label: string;
    type: string;
    risk: string;
  };
  position: { x: number; y: number };
  type: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  data: {
    type: string;
    confidence: number;
  };
}

export interface GraphResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];
  analysis: {
    spof_agents: string[];
    circular_dependencies: string[][];
    risk_scores: Record<string, number>;
    overall_risk: number;
  };
}

export interface SimulationResponse {
  failed_agent: {
    id: string;
    name: string;
    type: string;
  };
  impacted_agents: Agent[];
  impacted_count: number;
  blast_radius_score: number;
  impacted_workflows: string[];
  impact_estimate: {
    severity: string;
    revenue_risk: string;
    estimated_recovery_time: string;
  };
}

export interface PlaybookStep {
  id: string;
  title: string;
  timeframe: string;
  actions: string[];
  verifications: string[];
}

export interface AuditTrail {
  type: string;
  title: string;
  evidence: string[];
  confidence: number;
}

export interface PlaybookResponse {
  incident: string;
  estimated_recovery_time: string;
  severity: string;
  steps: PlaybookStep[];
  audit_trail: AuditTrail[];
  blockchain_proof: {
    chain: string;
    tx_hash: string;
    block: number;
    timestamp: string;
    verified: boolean;
    explorer_url: string;
  };
}

export const scanAgents = async (demoType: string = 'ecommerce'): Promise<ScanResponse> => {
  const response = await api.post('/api/scan', { demo_type: demoType });
  return response.data;
};

export const getGraph = async (): Promise<GraphResponse> => {
  const response = await api.get('/api/graph');
  return response.data;
};

export const simulateFailure = async (agentId: string): Promise<SimulationResponse> => {
  const response = await api.post('/api/simulate', { agent_id: agentId });
  return response.data;
};

export const generatePlaybook = async (): Promise<PlaybookResponse> => {
  const response = await api.post('/api/playbook');
  return response.data;
};
