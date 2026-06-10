import { Server, Smartphone } from "lucide-react";
import { envTabs } from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";

const iconMap: Record<string, React.ReactNode> = {
  server: <Server size={16} />,
  smartphone: <Smartphone size={16} />,
};

export default function EnvTabs() {
  const { activeEnv, setActiveEnv } = useAppStore();

  return (
    <div className="flex gap-1 rounded-xl bg-slate-800/50 p-1">
      {envTabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveEnv(tab.key)}
          className={`
            tab-indicator flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium
            transition-all duration-300
            ${
              activeEnv === tab.key
                ? "active bg-slate-700/80 text-blue-400 shadow-lg shadow-blue-500/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/40"
            }
          `}
        >
          {iconMap[tab.icon]}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
