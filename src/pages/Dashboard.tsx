import { useStore } from '@/store/useStore';
import {
  Server,
  Play,
  Square,
  Wrench,
  GitMerge,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentEnv, getFilteredServers, getFilteredAlerts } = useStore();
  const filteredServers = getFilteredServers();
  const filteredAlerts = getFilteredAlerts();

  const running = filteredServers.filter((s) => s.status === 'running').length;
  const stopped = filteredServers.filter((s) => s.status === 'stopped').length;
  const maintaining = filteredServers.filter((s) => s.status === 'maintaining').length;
  const merging = filteredServers.filter((s) => s.status === 'merging').length;
  const totalOnline = filteredServers.reduce((sum, s) => sum + s.onlinePlayers, 0);
  const unresolved = filteredAlerts.filter((a) => !a.resolved);

  const statusCards = [
    {
      label: '运行中',
      value: running,
      icon: Play,
      color: 'text-emerald-400',
      bg: 'from-emerald-500/10 to-emerald-600/5',
      border: 'border-emerald-500/20',
      glow: 'shadow-emerald-500/5',
    },
    {
      label: '已停止',
      value: stopped,
      icon: Square,
      color: 'text-slate-400',
      bg: 'from-slate-500/10 to-slate-600/5',
      border: 'border-slate-500/20',
      glow: '',
    },
    {
      label: '维护中',
      value: maintaining,
      icon: Wrench,
      color: 'text-amber-400',
      bg: 'from-amber-500/10 to-amber-600/5',
      border: 'border-amber-500/20',
      glow: '',
    },
    {
      label: '合区中',
      value: merging,
      icon: GitMerge,
      color: 'text-purple-400',
      bg: 'from-purple-500/10 to-purple-600/5',
      border: 'border-purple-500/20',
      glow: '',
    },
  ];

  const levelColor: Record<string, string> = {
    P0: 'text-red-400 bg-red-500/10 border-red-500/30',
    P1: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    P2: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    P3: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {currentEnv.name} · 总览
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            服务器状态一览与快捷操作
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Server size={14} />
          <span>共 {filteredServers.length} 台服务器</span>
          <span className="mx-2 text-slate-700">|</span>
          <TrendingUp size={14} className="text-emerald-400" />
          <span>在线玩家 {totalOnline.toLocaleString()}</span>
        </div>
      </div>

      {/* 状态卡片 */}
      <div className="grid grid-cols-4 gap-4">
        {statusCards.map((card) => (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${card.bg} border ${card.border} rounded-xl p-5 shadow-lg ${card.glow} transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-400">{card.label}</span>
              <card.icon size={18} className={card.color} />
            </div>
            <div className="text-3xl font-bold text-white">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 服务器列表 */}
        <div className="col-span-2 bg-slate-900/50 border border-slate-800/60 rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60">
            <h2 className="text-sm font-semibold text-slate-200">服务器状态</h2>
            <Link
              to="/servers"
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              查看全部 <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-slate-800/40">
            {filteredServers.slice(0, 6).map((server) => {
              const statusConfig: Record<string, { dot: string; text: string }> = {
                running: { dot: 'bg-emerald-400 shadow-emerald-400/50', text: '运行中' },
                stopped: { dot: 'bg-slate-500', text: '已停止' },
                maintaining: { dot: 'bg-amber-400 shadow-amber-400/50', text: '维护中' },
                merging: { dot: 'bg-purple-400 shadow-purple-400/50', text: '合区中' },
              };
              const cfg = statusConfig[server.status];
              return (
                <div
                  key={server.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${cfg.dot} ${
                        server.status === 'running' ? 'shadow-sm animate-pulse' : ''
                      }`}
                    />
                    <div>
                      <span className="text-sm text-slate-200">{server.name}</span>
                      <span className="text-xs text-slate-500 ml-2 font-mono">
                        {server.ip}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-xs">
                    {server.status === 'running' && (
                      <>
                        <span className="text-slate-400">
                          CPU{' '}
                          <span
                            className={
                              server.cpu > 80
                                ? 'text-red-400'
                                : server.cpu > 60
                                ? 'text-amber-400'
                                : 'text-emerald-400'
                            }
                          >
                            {server.cpu}%
                          </span>
                        </span>
                        <span className="text-slate-400">
                          内存{' '}
                          <span
                            className={
                              server.memory > 80
                                ? 'text-red-400'
                                : server.memory > 60
                                ? 'text-amber-400'
                                : 'text-emerald-400'
                            }
                          >
                            {server.memory}%
                          </span>
                        </span>
                        {server.onlinePlayers > 0 && (
                          <span className="text-slate-400">
                            在线{' '}
                            <span className="text-cyan-400">
                              {server.onlinePlayers}
                            </span>
                          </span>
                        )}
                      </>
                    )}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        server.status === 'running'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : server.status === 'stopped'
                          ? 'bg-slate-500/10 text-slate-400'
                          : server.status === 'maintaining'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-purple-500/10 text-purple-400'
                      }`}
                    >
                      {cfg.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 告警面板 */}
        <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60">
            <h2 className="text-sm font-semibold text-slate-200">未恢复告警</h2>
            <span className="text-xs text-red-400 flex items-center gap-1">
              <AlertTriangle size={12} />
              {unresolved.length}
            </span>
          </div>
          <div className="divide-y divide-slate-800/40 max-h-[400px] overflow-y-auto">
            {unresolved.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-slate-500">
                暂无未恢复告警
              </div>
            ) : (
              unresolved.map((alert) => (
                <div
                  key={alert.id}
                  className="px-5 py-3 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        levelColor[alert.level]
                      }`}
                    >
                      {alert.level}
                    </span>
                    <span className="text-xs text-slate-400">
                      {alert.createdAt}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-snug">
                    {alert.title}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
