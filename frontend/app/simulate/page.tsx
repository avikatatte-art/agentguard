'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { simulateFailure } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { Loader2, AlertTriangle, ArrowRight, Zap, TrendingDown } from 'lucide-react';

export default function SimulatePage() {
  const router = useRouter();
  const { scanData, graphData, simulationData, setSimulationData } = useAppStore();
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scanData || !graphData) {
      router.push('/');
      return;
    }

    // Pre-select a high-risk agent
    const spofAgent = graphData.analysis.spof_agents[0];
    if (spofAgent) {
      setSelectedAgent(spofAgent);
    }
  }, [scanData, graphData]);

  const handleSimulate = async () => {
    if (!selectedAgent) return;

    try {
      setLoading(true);
      setError(null);
      const data = await simulateFailure(selectedAgent);
      setSimulationData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to simulate failure');
    } finally {
      setLoading(false);
    }
  };

  if (!scanData || !graphData) {
    return null;
  }

  const selectedAgentData = scanData.agents.find(a => a.id === selectedAgent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Failure Simulation</h1>
          <p className="text-sm text-gray-500">Predict cascade impact and blast radius</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Agent Selector */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-600" />
            Select Agent to Fail
          </h3>
          
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl font-medium text-gray-900 mb-6 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Choose an agent...</option>
            {scanData.agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name} ({agent.type}) - {agent.risk.toUpperCase()} RISK
              </option>
            ))}
          </select>

          {selectedAgentData && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <div className="font-semibold text-gray-900">{selectedAgentData.type}</div>
                </div>
                <div>
                  <span className="text-gray-600">Risk Level:</span>
                  <div className="font-semibold text-gray-900 capitalize">{selectedAgentData.risk}</div>
                </div>
                <div>
                  <span className="text-gray-600">Risk Score:</span>
                  <div className="font-semibold text-gray-900">
                    {graphData.analysis.risk_scores[selectedAgent]?.toFixed(1) || 'N/A'}/10
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSimulate}
            disabled={!selectedAgent || loading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running Simulation...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Simulate Failure
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Simulation Results */}
        {simulationData && (
          <div className="space-y-6">
            {/* Blast Radius Score */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-red-300 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Blast Radius Score</h3>
                  <p className="text-gray-600">Impact severity of {simulationData.failed_agent.name} failure</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-red-600">
                    {simulationData.blast_radius_score}
                  </div>
                  <div className="text-gray-500 text-sm">out of 10</div>
                </div>
              </div>
              <div className="w-full bg-red-200 rounded-full h-4">
                <div
                  className="bg-red-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${simulationData.blast_radius_score * 10}%` }}
                />
              </div>
            </div>

            {/* Impact Summary */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {simulationData.impacted_count}
                </div>
                <div className="text-gray-600 font-medium">Impacted Agents</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {simulationData.impacted_workflows.length}
                </div>
                <div className="text-gray-600 font-medium">Affected Workflows</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  {simulationData.impact_estimate.severity}
                </div>
                <div className="text-gray-600 font-medium">Severity Level</div>
              </div>
            </div>

            {/* Impact Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Impact Analysis</h3>
              
              <div className="space-y-6">
                {/* Revenue Risk */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <h4 className="font-semibold text-gray-900">Revenue Risk</h4>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {simulationData.impact_estimate.revenue_risk}
                  </div>
                </div>

                {/* Impacted Workflows */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Impacted Workflows</h4>
                  <div className="flex flex-wrap gap-2">
                    {simulationData.impacted_workflows.map((workflow) => (
                      <span
                        key={workflow}
                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium text-sm"
                      >
                        {workflow}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impacted Agents */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Impacted Agents ({simulationData.impacted_count})
                  </h4>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {simulationData.impacted_agents.map((agent) => (
                      <div
                        key={agent.id}
                        className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <div className="font-medium text-gray-900 text-sm">{agent.name}</div>
                        <div className="text-xs text-gray-500">{agent.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recovery Time */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Estimated Recovery Time</h4>
                  <div className="text-lg font-medium text-gray-700">
                    {simulationData.impact_estimate.estimated_recovery_time}
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Playbook Button */}
            <button
              onClick={() => router.push('/playbook')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
            >
              Generate Recovery Playbook
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
