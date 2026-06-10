import { create } from "zustand";
import type { Version } from "@/data/mockData";

interface AppState {
  activeEnv: string;
  searchQuery: string;
  statusFilter: string;
  expandedCardId: string | null;
  setActiveEnv: (env: string) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  toggleCard: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeEnv: "guofu",
  searchQuery: "",
  statusFilter: "all",
  expandedCardId: null,
  setActiveEnv: (env) => set({ activeEnv: env, expandedCardId: null }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  toggleCard: (id) =>
    set((state) => ({
      expandedCardId: state.expandedCardId === id ? null : id,
    })),
}));
