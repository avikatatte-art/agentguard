'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { scanAgents } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { Loader2, Upload, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ScanPage() {
  const router = useRouter();
  const { setScanData } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [selectedDataset, setSelectedDataset] = useState<'ecommerce' | 'content'>('ecommerce');

  const handleDemoScan = async (datasetType: 'ecommerce' | 'content') => {
    try {
      setLoading(true);
      setError(null);
      setScanResult(null);
      
      const data = await scanAgents(datasetType);
      setScanData(data);
      setScanResult(data);
      
      // Auto-navigate to graph after 3 seconds
      setTimeout(() => {
        router.push('/graph');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to scan agents');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AgentGuard</h1>
              <p className="text-sm text-gray-500">Multi-Agent Reliability Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Scan Your Agent Ecosystem
          </h2>
          <p className="text-xl text-gray-600">
            Discover dependencies, identify risks, and prevent cascade failures
          </p>
        </div>

        {/* Demo Dataset Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* E-commerce Dataset */}
          <div className={`bg-white rounded-2xl shadow-xl border-2 p-8 transition-all cursor-pointer ${
            selectedDataset === 'ecommerce' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => setSelectedDataset('ecommerce')}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  🛒 E-commerce Platform
                </h3>
                <p className="text-gray-600 text-sm">
                  24 AI agents: Pricing, Inventory, Payment, Shipping, Cart, Checkout, Support, and 4 shadow agents
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>24 agents • 28 dependencies • 4 shadow agents</span>
            </div>
          </div>

          {/* AI Content Pipeline Dataset */}
          <div className={`bg-white rounded-2xl shadow-xl border-2 p-8 transition-all cursor-pointer ${
            selectedDataset === 'content' ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200 hover:border-purple-300'
          }`}
          onClick={() => setSelectedDataset('content')}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  🎨 AI Content Pipeline
                </h3>
                <p className="text-gray-600 text-sm">
                  18 AI agents: Text/Image/Video generators, Quality checkers, SEO, Translation, Publishing, and 3 shadow agents
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>18 agents • 19 dependencies • 3 shadow agents</span>
            </div>
          </div>
        </div>

        {/* Scan Button */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
          <button
            onClick={() => handleDemoScan(selectedDataset)}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Scanning {selectedDataset === 'ecommerce' ? 'E-commerce' : 'AI Content'} Agents...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Scan {selectedDataset === 'ecommerce' ? 'E-commerce' : 'AI Content Pipeline'} Dataset
              </>
            )}
          </button>
        </div>

        {/* Upload Card (Disabled for demo) */}
        <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-8 opacity-60">
          <div className="text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Upload OpenTelemetry Traces
            </h3>
            <p className="text-gray-500 mb-4">
              Coming soon: Upload your own trace files
            </p>
            <button
              disabled
              className="bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-xl cursor-not-allowed"
            >
              Upload JSON File
            </button>
          </div>
        </div>

        {/* Scan Results */}
        {scanResult && !loading && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Scan Complete!</h3>
                <p className="text-sm text-gray-600">Discovered {scanResult.total_agents} agents in your system</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-blue-600">{scanResult.total_agents}</div>
                <div className="text-sm text-gray-600 mt-1">Total Agents</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-red-600">{scanResult.total_shadow_agents}</div>
                <div className="text-sm text-gray-600 mt-1">Shadow Agents</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-orange-600">{scanResult.metrics?.critical_agents || 0}</div>
                <div className="text-sm text-gray-600 mt-1">Critical Risk</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-purple-600">{scanResult.metrics?.total_requests_per_min?.toLocaleString() || 0}</div>
                <div className="text-sm text-gray-600 mt-1">Req/Min</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">System Health</span>
                <span className="text-sm font-bold text-green-600">{scanResult.metrics?.avg_uptime || 'N/A'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{width: scanResult.metrics?.avg_uptime || '0%'}}></div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 font-medium">
              Redirecting to dependency graph...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Auto-Discovery</h4>
            <p className="text-sm text-gray-600">
              Automatically detect all agents and shadow dependencies
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Risk Detection</h4>
            <p className="text-sm text-gray-600">
              Identify single points of failure and circular dependencies
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
            <p className="text-sm text-gray-600">
              Generate recovery playbooks with Gemini 2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
