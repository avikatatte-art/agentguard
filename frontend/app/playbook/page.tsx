'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generatePlaybook } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { Loader2, CheckCircle, Download, ExternalLink, Shield, FileText } from 'lucide-react';

export default function PlaybookPage() {
  const router = useRouter();
  const { simulationData, playbookData, setPlaybookData } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!simulationData) {
      router.push('/');
      return;
    }

    loadPlaybook();
  }, [simulationData]);

  const loadPlaybook = async () => {
    try {
      setLoading(true);
      const data = await generatePlaybook();
      setPlaybookData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate playbook');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Generating recovery playbook with Gemini 3...</p>
          <p className="text-sm text-gray-500 mt-2">AI-powered incident analysis in progress</p>
        </div>
      </div>
    );
  }

  if (error || !playbookData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <p className="text-gray-600 text-center">{error || 'No playbook data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recovery Playbook</h1>
            <p className="text-sm text-gray-500">AI-generated incident response plan</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Scan
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Playbook */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{playbookData.incident}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      Recovery Time: <span className="font-semibold text-gray-900">{playbookData.estimated_recovery_time}</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full font-semibold ${
                      playbookData.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                      playbookData.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {playbookData.severity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            {playbookData.steps.map((step, index) => (
              <div key={step.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.timeframe}</p>
                  </div>
                </div>

                {/* Actions */}
                {step.actions && step.actions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Actions:</h4>
                    <div className="space-y-2">
                      {step.actions.map((action: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">
                            {typeof action === 'string' ? action : action.action || JSON.stringify(action)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verifications */}
                {step.verifications && step.verifications.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Verification Steps:</h4>
                    <div className="space-y-2">
                      {step.verifications.map((verification: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            {typeof verification === 'string' ? verification : verification.verification || JSON.stringify(verification)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Audit Trail */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Audit Trail
              </h3>

              <div className="space-y-4 mb-6">
                {playbookData.audit_trail.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="font-semibold text-gray-900 text-sm mb-2">{item.title}</div>
                    <div className="space-y-1">
                      {item.evidence.map((evidence, idx) => (
                        <div key={idx} className="text-xs text-gray-600 font-mono">
                          {evidence}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-semibold text-blue-600">
                        Confidence: {(item.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blockchain Proof */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  Blockchain Proof
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Chain:</span>
                    <div className="font-semibold text-gray-900">{playbookData.blockchain_proof.chain}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Transaction:</span>
                    <div className="font-mono text-xs text-gray-900 break-all">
                      {playbookData.blockchain_proof.tx_hash.substring(0, 20)}...
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Block:</span>
                    <div className="font-semibold text-gray-900">
                      #{playbookData.blockchain_proof.block.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    {playbookData.blockchain_proof.verified ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-semibold text-xs">Verified On-Chain</span>
                      </>
                    ) : (
                      <span className="text-gray-500 text-xs">Pending verification</span>
                    )}
                  </div>
                  <a
                    href={playbookData.blockchain_proof.explorer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-xs mt-2"
                  >
                    View on Explorer
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Export Options</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium text-gray-900">PagerDuty Alert</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium text-gray-900">Rootly Incident</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <span className="font-medium text-gray-900">Slack Message</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
