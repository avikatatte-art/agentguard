# 🎨 Frontend Development Guide

## **AgentGuard Frontend Architecture**

Built with **Next.js 14 + React 18 + TailwindCSS + shadcn/ui**

---

## 📋 **Table of Contents**

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Component Architecture](#component-architecture)
5. [Screen-by-Screen Guide](#screen-by-screen-guide)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Styling Guide](#styling-guide)
9. [Best Practices](#best-practices)

---

## 🛠️ **Tech Stack**

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | React framework with SSR |
| **UI Library** | React 18 | Component library |
| **Styling** | TailwindCSS | Utility-first CSS |
| **Components** | shadcn/ui | Pre-built components |
| **Graph Viz** | ReactFlow | Dependency graph |
| **State** | Zustand | Global state management |
| **API Client** | Axios + React Query | HTTP requests + caching |
| **Icons** | Lucide React | Icon library |
| **Animations** | Framer Motion | Smooth transitions |
| **Charts** | Recharts | Risk metrics visualization |
| **Forms** | React Hook Form + Zod | Form handling + validation |

---

## 📁 **Project Structure**

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   │
│   ├── scan/                    # Screen 1: Scanner
│   │   └── page.tsx
│   │
│   ├── graph/                   # Screen 2: Dependency Graph
│   │   └── page.tsx
│   │
│   ├── simulate/                # Screen 3: Simulation
│   │   └── page.tsx
│   │
│   └── playbook/                # Screen 4: Playbook + Audit
│       └── page.tsx
│
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   │
│   ├── scan/
│   │   ├── FileUploader.tsx     # Drag & drop uploader
│   │   ├── DemoSelector.tsx     # Demo dataset picker
│   │   └── ScanResults.tsx      # Scan output display
│   │
│   ├── graph/
│   │   ├── DependencyGraph.tsx  # Main graph component
│   │   ├── GraphNode.tsx        # Custom node
│   │   ├── GraphEdge.tsx        # Custom edge
│   │   ├── RiskPanel.tsx        # Right sidebar
│   │   ├── AgentDetails.tsx     # Agent info modal
│   │   └── GraphControls.tsx    # Zoom/filter controls
│   │
│   ├── simulate/
│   │   ├── AgentSelector.tsx    # Select agent to fail
│   │   ├── BlastRadiusViz.tsx   # Impact visualization
│   │   ├── ImpactList.tsx       # Affected agents list
│   │   └── RiskScore.tsx        # Blast radius score
│   │
│   ├── playbook/
│   │   ├── PlaybookViewer.tsx   # Step-by-step playbook
│   │   ├── PlaybookStep.tsx     # Individual step
│   │   ├── AuditTrail.tsx       # Evidence logs
│   │   ├── EvidenceCard.tsx     # Single evidence item
│   │   └── BlockchainProof.tsx  # Web3 verification
│   │
│   └── shared/
│       ├── Navbar.tsx           # Top navigation
│       ├── Sidebar.tsx          # Side navigation
│       ├── LoadingSpinner.tsx   # Loading states
│       ├── ErrorBoundary.tsx    # Error handling
│       └── StepIndicator.tsx    # Progress indicator
│
├── lib/
│   ├── api.ts                   # API client setup
│   ├── types.ts                 # TypeScript types
│   ├── utils.ts                 # Utility functions
│   ├── constants.ts             # App constants
│   └── store.ts                 # Zustand store
│
├── hooks/
│   ├── useAgents.ts             # Agents data hook
│   ├── useGraph.ts              # Graph data hook
│   ├── useSimulation.ts         # Simulation hook
│   └── usePlaybook.ts           # Playbook hook
│
├── public/
│   ├── demo-data/               # Demo datasets
│   └── images/
│
├── styles/
│   └── graph.css                # ReactFlow custom styles
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.local
```

---

## 🚀 **Setup Instructions**

### **1. Install Dependencies**

```bash
cd frontend
npm install

# Core dependencies
npm install next@14 react@18 react-dom@18
npm install typescript @types/react @types/node

# UI & Styling
npm install tailwindcss postcss autoprefixer
npm install @radix-ui/react-* # shadcn/ui dependencies
npm install lucide-react
npm install framer-motion

# Graph & Visualization
npm install reactflow
npm install recharts

# State & API
npm install zustand
npm install axios
npm install @tanstack/react-query

# Forms
npm install react-hook-form
npm install zod @hookform/resolvers

# Utils
npm install clsx tailwind-merge
npm install date-fns
```

### **2. Initialize shadcn/ui**

```bash
npx shadcn-ui@latest init

# Add components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add select
npx shadcn-ui@latest add alert
```

### **3. Environment Setup**

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

### **4. Run Development Server**

```bash
npm run dev
# Open http://localhost:3000
```

---

## 🏗️ **Component Architecture**

### **Design Principles**
1. **Atomic Design**: Atoms → Molecules → Organisms → Pages
2. **Single Responsibility**: Each component does one thing
3. **Composition over Inheritance**: Build complex UIs from simple parts
4. **Type Safety**: Full TypeScript coverage

### **Component Hierarchy**

```
App
├── Layout (Navbar + Sidebar)
│
├── ScanPage
│   ├── FileUploader
│   ├── DemoSelector
│   └── ScanResults
│
├── GraphPage
│   ├── DependencyGraph
│   │   ├── GraphNode (custom)
│   │   └── GraphEdge (custom)
│   ├── RiskPanel
│   └── AgentDetails (modal)
│
├── SimulatePage
│   ├── AgentSelector
│   ├── BlastRadiusViz
│   └── ImpactList
│
└── PlaybookPage
    ├── PlaybookViewer
    │   └── PlaybookStep[]
    ├── AuditTrail
    │   └── EvidenceCard[]
    └── BlockchainProof
```

---

## 📱 **Screen-by-Screen Guide**

### **Screen 1: Scan / Import** (`app/scan/page.tsx`)

#### **Features**
- Drag & drop file upload (OTel JSON)
- Demo dataset selector
- Scan progress indicator
- Results display (agents found, shadow agents)

#### **Component Code**

```tsx
// app/scan/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileUploader } from '@/components/scan/FileUploader';
import { DemoSelector } from '@/components/scan/DemoSelector';
import { ScanResults } from '@/components/scan/ScanResults';
import { Button } from '@/components/ui/button';
import { useScan } from '@/hooks/useScan';

export default function ScanPage() {
  const router = useRouter();
  const [scanData, setScanData] = useState(null);
  const { mutate: runScan, isLoading } = useScan();

  const handleFileUpload = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    runScan(formData, {
      onSuccess: (data) => setScanData(data),
    });
  };

  const handleDemoSelect = (demoId: string) => {
    runScan({ demo: demoId }, {
      onSuccess: (data) => setScanData(data),
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Scan Agent Ecosystem
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <FileUploader onUpload={handleFileUpload} />
        <DemoSelector onSelect={handleDemoSelect} />
      </div>

      {isLoading && <LoadingSpinner />}

      {scanData && (
        <>
          <ScanResults data={scanData} />
          <Button 
            onClick={() => router.push('/graph')}
            className="mt-8"
          >
            Generate Dependency Map →
          </Button>
        </>
      )}
    </div>
  );
}
```

#### **FileUploader Component**

```tsx
// components/scan/FileUploader.tsx
'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FileUploaderProps {
  onUpload: (file: File) => void;
}

export function FileUploader({ onUpload }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json'] },
    maxFiles: 1,
  });

  return (
    <Card
      {...getRootProps()}
      className={`p-12 border-2 border-dashed cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-center">
        <Upload className="w-12 h-12 mb-4 text-gray-400" />
        <p className="text-lg font-semibold mb-2">
          Upload OpenTelemetry Traces
        </p>
        <p className="text-sm text-gray-500">
          Drag & drop or click to select JSON file
        </p>
      </div>
    </Card>
  );
}
```

---

### **Screen 2: Dependency Graph** (`app/graph/page.tsx`)

#### **Features**
- Interactive graph visualization (ReactFlow)
- Node highlighting (SPOF, loops)
- Right panel: risk metrics
- Agent details on click
- Zoom/pan controls

#### **Main Graph Component**

```tsx
// components/graph/DependencyGraph.tsx
'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';
import { AgentDetails } from './AgentDetails';

const nodeTypes = {
  agentNode: GraphNode,
};

const edgeTypes = {
  dependencyEdge: GraphEdge,
};

interface DependencyGraphProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  onNodeClick?: (node: Node) => void;
}

export function DependencyGraph({
  initialNodes,
  initialEdges,
  onNodeClick,
}: DependencyGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick = useCallback((event: any, node: Node) => {
    setSelectedNode(node);
    onNodeClick?.(node);
  }, [onNodeClick]);

  return (
    <div className="w-full h-[600px] border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>

      {selectedNode && (
        <AgentDetails
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
```

#### **Custom Node Component**

```tsx
// components/graph/GraphNode.tsx
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GraphNodeProps {
  data: {
    label: string;
    type: 'agent' | 'service';
    risk: 'high' | 'medium' | 'low';
    isSPOF?: boolean;
    hasLoop?: boolean;
  };
}

export const GraphNode = memo(({ data }: GraphNodeProps) => {
  const riskColors = {
    high: 'bg-red-100 border-red-500',
    medium: 'bg-yellow-100 border-yellow-500',
    low: 'bg-green-100 border-green-500',
  };

  const RiskIcon = {
    high: AlertTriangle,
    medium: AlertCircle,
    low: CheckCircle,
  }[data.risk];

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 shadow-md min-w-[150px]
        ${riskColors[data.risk]} hover:shadow-lg transition-shadow`}
    >
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center gap-2 mb-2">
        <RiskIcon className="w-4 h-4" />
        <span className="font-semibold text-sm">{data.label}</span>
      </div>

      <div className="flex gap-1">
        {data.isSPOF && (
          <Badge variant="destructive" className="text-xs">
            SPOF
          </Badge>
        )}
        {data.hasLoop && (
          <Badge variant="warning" className="text-xs">
            Loop
          </Badge>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

GraphNode.displayName = 'GraphNode';
```

#### **Risk Panel Component**

```tsx
// components/graph/RiskPanel.tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface RiskPanelProps {
  spofAgents: string[];
  circularDeps: string[][];
  riskScore: number;
}

export function RiskPanel({ spofAgents, circularDeps, riskScore }: RiskPanelProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Risk Analysis</h3>

      {/* Risk Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Risk Score</span>
          <Badge variant={riskScore > 7 ? 'destructive' : 'warning'}>
            {riskScore.toFixed(1)}/10
          </Badge>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              riskScore > 7 ? 'bg-red-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${riskScore * 10}%` }}
          />
        </div>
      </div>

      {/* SPOF Agents */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h4 className="font-semibold">Single Points of Failure</h4>
        </div>
        <div className="space-y-2">
          {spofAgents.map((agent) => (
            <div
              key={agent}
              className="p-2 bg-red-50 border border-red-200 rounded text-sm"
            >
              {agent}
            </div>
          ))}
        </div>
      </div>

      {/* Circular Dependencies */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-5 h-5 text-yellow-500" />
          <h4 className="font-semibold">Circular Dependencies</h4>
        </div>
        <div className="space-y-2">
          {circularDeps.map((loop, idx) => (
            <div
              key={idx}
              className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm"
            >
              {loop.join(' → ')}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
```

---

### **Screen 3: Failure Simulation** (`app/simulate/page.tsx`)

#### **Features**
- Agent selector dropdown
- Blast radius visualization
- Impact score calculation
- Affected agents/workflows list

#### **Main Simulation Component**

```tsx
// app/simulate/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgentSelector } from '@/components/simulate/AgentSelector';
import { BlastRadiusViz } from '@/components/simulate/BlastRadiusViz';
import { ImpactList } from '@/components/simulate/ImpactList';
import { Button } from '@/components/ui/button';
import { useSimulation } from '@/hooks/useSimulation';

export default function SimulatePage() {
  const router = useRouter();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const { data: simulation, mutate: runSimulation, isLoading } = useSimulation();

  const handleSimulate = () => {
    if (selectedAgent) {
      runSimulation({ agentId: selectedAgent });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Simulate Failure
      </h1>

      <AgentSelector
        onSelect={setSelectedAgent}
        selectedAgent={selectedAgent}
      />

      <Button
        onClick={handleSimulate}
        disabled={!selectedAgent || isLoading}
        className="mt-4"
      >
        Run Simulation
      </Button>

      {simulation && (
        <div className="mt-8 space-y-8">
          <BlastRadiusViz
            score={simulation.blastRadiusScore}
            impactedCount={simulation.impactedAgents.length}
          />
          <ImpactList
            agents={simulation.impactedAgents}
            workflows={simulation.impactedWorkflows}
          />
          <Button onClick={() => router.push('/playbook')}>
            Generate Playbook →
          </Button>
        </div>
      )}
    </div>
  );
}
```

---

### **Screen 4: Playbook + Audit Trail** (`app/playbook/page.tsx`)

#### **Features**
- Step-by-step recovery playbook
- Verification steps per action
- Evidence-backed audit trail
- Blockchain proof display
- Export options (PDF, PagerDuty, Rootly)

#### **Playbook Viewer**

```tsx
// components/playbook/PlaybookViewer.tsx
import { PlaybookStep } from './PlaybookStep';
import { Card } from '@/components/ui/card';

interface Step {
  id: string;
  title: string;
  timeframe: string;
  actions: string[];
  verifications: string[];
}

interface PlaybookViewerProps {
  incident: string;
  estimatedTime: string;
  steps: Step[];
}

export function PlaybookViewer({
  incident,
  estimatedTime,
  steps,
}: PlaybookViewerProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Recovery Playbook</h2>
        <p className="text-gray-600">Incident: {incident}</p>
        <p className="text-sm text-gray-500">
          Estimated Recovery Time: {estimatedTime}
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <PlaybookStep
            key={step.id}
            stepNumber={index + 1}
            {...step}
          />
        ))}
      </div>
    </Card>
  );
}
```

#### **Audit Trail Component**

```tsx
// components/playbook/AuditTrail.tsx
import { EvidenceCard } from './EvidenceCard';
import { BlockchainProof } from './BlockchainProof';
import { Card } from '@/components/ui/card';

interface Evidence {
  id: string;
  type: 'dependency' | 'risk' | 'incident';
  title: string;
  details: string[];
  confidence: number;
  traceId?: string;
  timestamp?: string;
}

interface AuditTrailProps {
  evidences: Evidence[];
  blockchainProof?: {
    chain: string;
    txHash: string;
    block: number;
    timestamp: string;
  };
}

export function AuditTrail({ evidences, blockchainProof }: AuditTrailProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Audit Trail</h2>
      
      <div className="space-y-4 mb-8">
        {evidences.map((evidence) => (
          <EvidenceCard key={evidence.id} {...evidence} />
        ))}
      </div>

      {blockchainProof && (
        <BlockchainProof {...blockchainProof} />
      )}
    </Card>
  );
}
```

---

## 🔄 **State Management**

### **Zustand Store**

```tsx
// lib/store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Agent {
  id: string;
  name: string;
  type: string;
  risk: 'high' | 'medium' | 'low';
}

interface AppState {
  // Scan state
  agents: Agent[];
  shadowAgents: Agent[];
  setAgents: (agents: Agent[]) => void;

  // Graph state
  selectedAgent: string | null;
  setSelectedAgent: (id: string | null) => void;

  // Simulation state
  simulationResult: any | null;
  setSimulationResult: (result: any) => void;

  // Playbook state
  playbook: any | null;
  setPlaybook: (playbook: any) => void;

  // Reset
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        agents: [],
        shadowAgents: [],
        selectedAgent: null,
        simulationResult: null,
        playbook: null,

        setAgents: (agents) => set({ agents }),
        setSelectedAgent: (id) => set({ selectedAgent: id }),
        setSimulationResult: (result) => set({ simulationResult: result }),
        setPlaybook: (playbook) => set({ playbook }),
        reset: () => set({
          agents: [],
          shadowAgents: [],
          selectedAgent: null,
          simulationResult: null,
          playbook: null,
        }),
      }),
      { name: 'agentguard-storage' }
    )
  )
);
```

---

## 🌐 **API Integration**

### **API Client Setup**

```tsx
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  // Add auth token if needed
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
```

### **React Query Hooks**

```tsx
// hooks/useScan.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function useScan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData | { demo: string }) => {
      const response = await api.post('/api/scan', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });
}

// hooks/useGraph.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function useGraph() {
  return useQuery({
    queryKey: ['graph'],
    queryFn: async () => {
      const response = await api.get('/api/graph');
      return response.data;
    },
  });
}

// hooks/useSimulation.ts
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export function useSimulation() {
  return useMutation({
    mutationFn: async ({ agentId }: { agentId: string }) => {
      const response = await api.post('/api/simulate', { agentId });
      return response.data;
    },
  });
}
```

---

## 🎨 **Styling Guide**

### **TailwindCSS Configuration**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### **Global Styles**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --destructive: 0 84.2% 60.2%;
    --border: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}

@layer components {
  .graph-node-spof {
    @apply border-red-500 bg-red-50 shadow-lg;
  }

  .graph-node-loop {
    @apply border-yellow-500 bg-yellow-50;
  }
}
```

---

## ✅ **Best Practices**

### **1. Component Guidelines**
- Use TypeScript for all components
- Implement proper error boundaries
- Add loading states for async operations
- Use memoization for expensive computations

### **2. Performance**
- Lazy load heavy components (graph visualization)
- Implement virtual scrolling for large lists
- Use React Query caching
- Optimize ReactFlow rendering

### **3. Accessibility**
- Add ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### **4. Testing**
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### **5. Code Quality**
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Format
npm run format
```

---

## 🚀 **Deployment**

### **Vercel Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Environment Variables**
```env
NEXT_PUBLIC_API_URL=https://api.agentguard.ai
NEXT_PUBLIC_GEMINI_API_KEY=your_key
```

---

## 📚 **Resources**

- [Next.js Docs](https://nextjs.org/docs)
- [ReactFlow Docs](https://reactflow.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs)

---

**Happy Coding! 🎨**
