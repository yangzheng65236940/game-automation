import { create } from 'zustand';
import { environments, servers, alerts, mergeTasks, logEntries } from '@/data/mock';
import type { Environment, Server, Alert, MergeTask, LogEntry } from '@/data/mock';

interface AppState {
  currentEnv: Environment;
  currentVersion: string;
  environments: Environment[];
  servers: Server[];
  alerts: Alert[];
  mergeTasks: MergeTask[];
  logEntries: LogEntry[];
  sidebarCollapsed: boolean;
  setEnvironment: (env: Environment) => void;
  setVersion: (version: string) => void;
  toggleSidebar: () => void;
  getFilteredServers: () => Server[];
  getFilteredAlerts: () => Alert[];
  getFilteredLogs: () => LogEntry[];
}

export const useStore = create<AppState>((set, get) => ({
  currentEnv: environments[0],
  currentVersion: environments[0].versions[0].version,
  environments,
  servers,
  alerts,
  mergeTasks,
  logEntries,
  sidebarCollapsed: false,

  setEnvironment: (env: Environment) => {
    set({ currentEnv: env, currentVersion: env.versions[0].version });
  },

  setVersion: (version: string) => {
    set({ currentVersion: version });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  getFilteredServers: () => {
    const { currentEnv, currentVersion, servers } = get();
    return servers.filter(
      (s) => s.environment === currentEnv.id && s.version === currentVersion
    );
  },

  getFilteredAlerts: () => {
    const { currentEnv, alerts } = get();
    return alerts.filter((a) => a.environment === currentEnv.id);
  },

  getFilteredLogs: () => {
    const { currentEnv, logEntries } = get();
    const envServers = servers
      .filter((s) => s.environment === currentEnv.id)
      .map((s) => s.id);
    return logEntries.filter((l) => envServers.includes(l.server));
  },
}));
