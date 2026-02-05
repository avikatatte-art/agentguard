"""
Gemini 3 API Service for AgentGuard
Handles all interactions with Google's Gemini 3 API for:
- Incident analysis
- Recovery playbook generation
- Evidence reasoning
- Risk assessment explanations
"""

import os
import json
from typing import Dict, List, Any, Optional
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Use Gemini 3 Flash for fast responses
MODEL_NAME = "gemini-2.0-flash-exp"


class GeminiService:
    """Service class for Gemini 3 API interactions"""
    
    def __init__(self):
        self.model = None
        if GEMINI_API_KEY:
            try:
                self.model = genai.GenerativeModel(MODEL_NAME)
            except Exception as e:
                print(f"Warning: Could not initialize Gemini model: {e}")
    
    def is_available(self) -> bool:
        """Check if Gemini API is available"""
        return self.model is not None
    
    async def analyze_incident(
        self,
        failed_agent: Dict[str, Any],
        impacted_agents: List[Dict[str, Any]],
        dependencies: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Analyze an incident using Gemini 3
        Returns root cause analysis and severity assessment
        """
        if not self.is_available():
            return self._mock_incident_analysis(failed_agent, impacted_agents)
        
        prompt = f"""You are an expert in distributed systems and AI agent reliability.

Analyze this agent failure incident:

**Failed Agent:**
- Name: {failed_agent['name']}
- Type: {failed_agent['type']}
- Risk Level: {failed_agent['risk']}
- Version: {failed_agent.get('version', 'unknown')}
- Uptime: {failed_agent.get('uptime', 'unknown')}
- Requests/min: {failed_agent.get('requests_per_min', 'unknown')}

**Impacted Agents:** {len(impacted_agents)} agents affected
{json.dumps([{'name': a['name'], 'type': a['type']} for a in impacted_agents[:5]], indent=2)}

**Dependencies:** {len(dependencies)} total dependencies

Provide a structured analysis in JSON format:
{{
  "root_cause": "Brief explanation of why this agent failed",
  "severity": "critical|high|medium|low",
  "blast_radius_explanation": "Why this failure cascaded to other agents",
  "business_impact": "Estimated business impact",
  "recovery_time_estimate": "Estimated time to recover"
}}

Respond with ONLY valid JSON, no markdown or explanation."""

        try:
            response = self.model.generate_content(prompt)
            result = json.loads(response.text.strip())
            return result
        except Exception as e:
            print(f"Gemini API error: {e}")
            return self._mock_incident_analysis(failed_agent, impacted_agents)
    
    async def generate_playbook(
        self,
        failed_agent: Dict[str, Any],
        impacted_agents: List[Dict[str, Any]],
        dependencies: List[Dict[str, Any]],
        incident_analysis: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generate a recovery playbook using Gemini 3
        Returns step-by-step recovery plan with verification steps
        """
        if not self.is_available():
            return self._mock_playbook(failed_agent, impacted_agents)
        
        prompt = f"""You are an expert SRE (Site Reliability Engineer) creating incident response playbooks.

**Incident Context:**
- Failed Agent: {failed_agent['name']} ({failed_agent['type']})
- Impacted Agents: {len(impacted_agents)}
- Root Cause: {incident_analysis.get('root_cause', 'Unknown')}
- Severity: {incident_analysis.get('severity', 'high')}

**Agent Details:**
- Version: {failed_agent.get('version', 'unknown')}
- Owner: {failed_agent.get('owner', 'unknown')}
- Last Deployed: {failed_agent.get('last_deployed', 'unknown')}

Create a detailed recovery playbook with 3 phases:
1. Immediate Containment (0-5 min)
2. Backup Activation (5-15 min)
3. Full Recovery (15-30 min)

Each step must include:
- Action to take
- Verification checks
- Expected outcomes

Respond in JSON format:
{{
  "incident_title": "Brief incident title",
  "estimated_recovery_time": "15-30 minutes",
  "steps": [
    {{
      "phase": "Immediate Containment",
      "time_range": "0-5 min",
      "actions": [
        {{
          "action": "Specific action to take",
          "verification": "How to verify this step worked",
          "expected_outcome": "What should happen"
        }}
      ]
    }}
  ],
  "rollback_plan": "How to rollback if recovery fails",
  "escalation_contacts": ["Team to contact if issues persist"]
}}

Respond with ONLY valid JSON, no markdown."""

        try:
            response = self.model.generate_content(prompt)
            result = json.loads(response.text.strip())
            return result
        except Exception as e:
            print(f"Gemini API error: {e}")
            return self._mock_playbook(failed_agent, impacted_agents)
    
    async def explain_risk_assessment(
        self,
        agent: Dict[str, Any],
        risk_score: float,
        is_spof: bool,
        downstream_count: int
    ) -> str:
        """
        Generate explanation for why an agent has a certain risk score
        """
        if not self.is_available():
            return self._mock_risk_explanation(agent, risk_score, is_spof)
        
        prompt = f"""Explain in 2-3 sentences why this agent has a risk score of {risk_score}/10:

Agent: {agent['name']}
Type: {agent['type']}
Is Single Point of Failure: {is_spof}
Downstream Dependencies: {downstream_count}
Uptime: {agent.get('uptime', 'unknown')}

Be concise and technical. Focus on the key risk factors."""

        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Gemini API error: {e}")
            return self._mock_risk_explanation(agent, risk_score, is_spof)
    
    async def generate_evidence_reasoning(
        self,
        dependency: Dict[str, Any],
        trace_data: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Generate reasoning for why a dependency exists with confidence score
        """
        if not self.is_available():
            return self._mock_evidence_reasoning(dependency)
        
        prompt = f"""Analyze this agent dependency and provide reasoning:

Dependency: {dependency['source']} → {dependency['target']}
Type: {dependency['type']}
Confidence: {dependency['confidence']}

Provide reasoning in JSON:
{{
  "reasoning": "Why this dependency exists",
  "confidence_factors": ["Factor 1", "Factor 2"],
  "risk_if_broken": "What happens if this dependency breaks"
}}

Respond with ONLY valid JSON."""

        try:
            response = self.model.generate_content(prompt)
            result = json.loads(response.text.strip())
            return result
        except Exception as e:
            print(f"Gemini API error: {e}")
            return self._mock_evidence_reasoning(dependency)
    
    # Mock fallback methods for when API is not available
    
    def _mock_incident_analysis(self, failed_agent, impacted_agents):
        return {
            "root_cause": f"{failed_agent['name']} experienced high latency leading to timeout cascades",
            "severity": "high" if len(impacted_agents) > 5 else "medium",
            "blast_radius_explanation": f"Failure cascaded through {len(impacted_agents)} dependent agents via API calls and event streams",
            "business_impact": "High - affects core business workflows and customer experience",
            "recovery_time_estimate": "15-30 minutes with proper playbook execution"
        }
    
    def _mock_playbook(self, failed_agent, impacted_agents):
        return {
            "incident_title": f"{failed_agent['name']} Failure - Cascade Impact",
            "estimated_recovery_time": "15-30 minutes",
            "steps": [
                {
                    "phase": "Immediate Containment",
                    "time_range": "0-5 min",
                    "actions": [
                        {
                            "action": "Switch to cached data from last successful state",
                            "verification": "Check cache hit rate > 95%",
                            "expected_outcome": "Downstream agents continue with stale but valid data"
                        },
                        {
                            "action": f"Alert {failed_agent.get('owner', 'team')} via PagerDuty",
                            "verification": "Confirm alert received and acknowledged",
                            "expected_outcome": "Team is aware and responding"
                        }
                    ]
                },
                {
                    "phase": "Backup Activation",
                    "time_range": "5-15 min",
                    "actions": [
                        {
                            "action": f"Deploy backup instance of {failed_agent['name']}",
                            "verification": "Health check returns 200 OK",
                            "expected_outcome": "Backup instance is healthy and ready"
                        },
                        {
                            "action": "Route 10% traffic to backup for testing",
                            "verification": "Error rate < 0.1% on backup",
                            "expected_outcome": "Backup handles traffic successfully"
                        }
                    ]
                },
                {
                    "phase": "Full Recovery",
                    "time_range": "15-30 min",
                    "actions": [
                        {
                            "action": "Gradually increase traffic to backup (50%, 100%)",
                            "verification": "Monitor latency and error rates",
                            "expected_outcome": "All traffic handled by backup successfully"
                        },
                        {
                            "action": "Validate all downstream agents are healthy",
                            "verification": "Check cascade risk score < 2.0",
                            "expected_outcome": "System fully recovered"
                        }
                    ]
                }
            ],
            "rollback_plan": "If backup fails, revert to primary and investigate root cause offline",
            "escalation_contacts": [f"{failed_agent.get('owner', 'platform-team')}", "sre-oncall@company.com"]
        }
    
    def _mock_risk_explanation(self, agent, risk_score, is_spof):
        if is_spof:
            return f"{agent['name']} is a critical single point of failure with no redundancy. Its failure would cascade to multiple downstream systems, making it high risk."
        else:
            return f"{agent['name']} has a risk score of {risk_score}/10 based on its centrality in the dependency graph and historical reliability metrics."
    
    def _mock_evidence_reasoning(self, dependency):
        return {
            "reasoning": f"Observed {dependency['source']} making {dependency['type']} calls to {dependency['target']} in production traces",
            "confidence_factors": [
                f"High confidence ({dependency['confidence']}) based on trace analysis",
                "Consistent pattern observed over 7 days",
                "No alternative paths detected"
            ],
            "risk_if_broken": "Downstream workflows would fail or experience degraded performance"
        }


# Global instance
gemini_service = GeminiService()
