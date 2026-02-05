'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactFlow, { Background, Controls, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { getGraph } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { Loader2, AlertTriangle, ArrowRight, Activity } from 'lucide-react';

export default function GraphPage() {
  const router = useRouter();
  const { scanData, graphData, setGraphData } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (!scanData) {
      router.push('/');
      return;
    }

    loadGraph();
  }, [scanData]);

  const loadGraph = async () => {
    try {
      setLoading(true);
      const data = await getGraph();
      setGraphData(data);
      
      // Transform nodes for ReactFlow with enhanced styling
      const transformedNodes = data.nodes.map(node => {
        const getRiskColor = (risk: string) => {
          if (risk === 'critical') return { bg: '#fecaca', border: '#dc2626', text: '#7f1d1d' };
          if (risk === 'high') return { bg: '#fed7aa', border: '#ea580c', text: '#7c2d12' };
          if (risk === 'medium') return { bg: '#fef08a', border: '#ca8a04', text: '#713f12' };
          if (node.data.type === 'shadow_agent') return { bg: '#e0e7ff', border: '#6366f1', text: '#312e81' };
          return { bg: '#d1fae5', border: '#10b981', text: '#064e3b' };
        };
        
        const colors = getRiskColor(node.data.risk);
        
        return {
          ...node,
          style: {
            background: colors.bg,
            border: `3px solid ${colors.border}`,
            borderRadius: '16px',
            padding: '14px 18px',
            fontSize: '13px',
            fontWeight: '700',
            color: colors.text,
            minWidth: '180px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.2s ease',
          },
        };
      });
      
      // Transform edges with better styling
      const transformedEdges = data.edges.map((edge: any) => ({
        ...edge,
        animated: edge.data?.type === 'event',
        style: {
          stroke: edge.data?.confidence > 0.95 ? '#10b981' : 
                  edge.data?.confidence > 0.90 ? '#3b82f6' : '#94a3b8',
          strokeWidth: 2,
        },
        markerEnd: {
          type: 'arrowclosed' as const,
          color: edge.data?.confidence > 0.95 ? '#10b981' : 
                 edge.data?.confidence > 0.90 ? '#3b82f6' : '#94a3b8',
        },
      }));
      
      setNodes(transformedNodes);
      setEdges(transformedEdges);
    } catch (err: any) {
      setError(err.message || 'Failed to load graph');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Building dependency graph...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dependency Graph</h1>
            <p className="text-sm text-gray-500">
              {scanData?.total_agents} agents • {graphData?.edges.length} dependencies
            </p>
          </div>
          <button
            onClick={() => router.push('/simulate')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
          >
            Simulate Failure
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Graph */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            attributionPosition="bottom-left"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {/* Risk Panel */}
        <div className="w-80 bg-white border-l shadow-lg overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Risk Analysis
            </h3>

            {/* Overall Risk Score */}
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Risk</span>
                <span className="text-2xl font-bold text-red-600">
                  {graphData?.analysis.overall_risk.toFixed(1)}/10
                </span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${(graphData?.analysis.overall_risk || 0) * 10}%` }}
                />
              </div>
            </div>

            {/* SPOF Agents */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Single Points of Failure ({graphData?.analysis.spof_agents.length})
              </h4>
              <div className="space-y-2">
                {graphData?.analysis.spof_agents.map((agentId) => {
                  const agent = scanData?.agents.find(a => a.id === agentId);
                  return (
                    <div
                      key={agentId}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm"
                    >
                      <div className="font-semibold text-gray-900">{agent?.name}</div>
                      <div className="text-gray-600 text-xs mt-1">
                        Risk: {graphData?.analysis.risk_scores[agentId]?.toFixed(1)}/10
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Circular Dependencies */}
            {graphData?.analysis.circular_dependencies && graphData.analysis.circular_dependencies.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  Circular Dependencies
                </h4>
                <div className="space-y-2">
                  {graphData.analysis.circular_dependencies.map((cycle, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm"
                    >
                      <div className="text-gray-700 font-mono text-xs">
                        {cycle.join(' → ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-200 border-2 border-red-600"></div>
                  <span className="text-xs text-gray-700">Critical Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-200 border-2 border-orange-600"></div>
                  <span className="text-xs text-gray-700">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-200 border-2 border-yellow-600"></div>
                  <span className="text-xs text-gray-700">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-200 border-2 border-green-600"></div>
                  <span className="text-xs text-gray-700">Low Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-indigo-200 border-2 border-indigo-600"></div>
                  <span className="text-xs text-gray-700">Shadow Agent</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Edge Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-green-500"></div>
                    <span className="text-xs text-gray-700">High Confidence (&gt;95%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-blue-500"></div>
                    <span className="text-xs text-gray-700">Medium Confidence (&gt;90%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <span className="text-xs text-gray-700">Lower Confidence</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-900 font-medium">
                  💡 Tip: Zoom and pan to explore the graph. Click nodes for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
