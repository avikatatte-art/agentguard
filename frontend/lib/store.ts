import { create } from 'zustand';
import { Agent, ScanResponse, GraphResponse, SimulationResponse, PlaybookResponse } from './api';

interface AppState {
  scanData: ScanResponse | null;
  graphData: GraphResponse | null;
  simulationData: SimulationResponse | null;
  playbookData: PlaybookResponse | null;
  
  setScanData: (data: ScanResponse) => void;
  setGraphData: (data: GraphResponse) => void;
  setSimulationData: (data: SimulationResponse) => void;
  setPlaybookData: (data: PlaybookResponse) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  scanData: null,
  graphData: null,
  simulationData: null,
  playbookData: null,
  
  setScanData: (data) => set({ scanData: data }),
  setGraphData: (data) => set({ graphData: data }),
  setSimulationData: (data) => set({ simulationData: data }),
  setPlaybookData: (data) => set({ playbookData: data }),
  reset: () => set({
    scanData: null,
    graphData: null,
    simulationData: null,
    playbookData: null,
  }),
}));
