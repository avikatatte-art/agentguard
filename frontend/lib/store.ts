import { create } from "zustand";
import type {
  ScanResult,
  GraphData,
  SimulationResult,
  Playbook,
} from "./api";

interface AppStore {
  // Data
  scanResult: ScanResult | null;
  graphData: GraphData | null;
  simulationResult: SimulationResult | null;
  playbook: Playbook | null;

  // UI
  loading: boolean;
  error: string | null;
  selectedDataset: "ecommerce" | "content";

  // Actions
  setScanResult: (r: ScanResult | null) => void;
  setGraphData: (g: GraphData | null) => void;
  setSimulationResult: (s: SimulationResult | null) => void;
  setPlaybook: (p: Playbook | null) => void;
  setLoading: (l: boolean) => void;
  setError: (e: string | null) => void;
  setSelectedDataset: (d: "ecommerce" | "content") => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  scanResult: null,
  graphData: null,
  simulationResult: null,
  playbook: null,
  loading: false,
  error: null,
  selectedDataset: "ecommerce",

  setScanResult: (r) => set({ scanResult: r }),
  setGraphData: (g) => set({ graphData: g }),
  setSimulationResult: (s) => set({ simulationResult: s }),
  setPlaybook: (p) => set({ playbook: p }),
  setLoading: (l) => set({ loading: l }),
  setError: (e) => set({ error: e }),
  setSelectedDataset: (d) => set({ selectedDataset: d }),
  reset: () =>
    set({
      scanResult: null,
      graphData: null,
      simulationResult: null,
      playbook: null,
      loading: false,
      error: null,
    }),
}));
