# Devpost Submission — Gemini 3 Integration Description (~200 words)

*Copy-paste this into the Devpost submission form:*

---

AgentGuard uses the **Gemini 3 Flash Preview API** (`gemini-3-flash-preview`) as the core intelligence engine for its AI-powered incident recovery system.

**How Gemini 3 is used:**

1. **Incident Analysis** — When an agent failure is simulated, Gemini 3 analyzes the failed agent, its dependency chain, and cascading impact to generate a detailed root cause analysis with severity assessment and blast radius explanation.

2. **Recovery Playbook Generation** — Gemini 3 creates a structured 3-phase recovery plan (Containment → Backup → Full Recovery) with specific actions, verification checks, and expected outcomes for each step. This replaces what would take an SRE team 30+ minutes to write manually.

3. **Risk Assessment Reasoning** — Gemini 3 explains why certain agents are critical single points of failure, estimates business impact (revenue loss per hour), and provides recovery time estimates.

4. **Evidence-Based Reasoning** — Gemini 3 evaluates dependency traces and anomaly patterns to generate confidence-scored evidence for the blockchain-verified audit trail.

Gemini 3's advanced reasoning capabilities are essential — it must understand complex system architectures, predict cascade failure patterns, and generate actionable recovery plans that an on-call engineer can follow at 2 AM during an outage. No other model we tested produced recovery plans this structured and actionable.
