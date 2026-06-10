import { useStore } from '@/store/useStore';
import { Play, Square, RotateCcw, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Servers() {
  const { getFilteredServers } = useStore();
  const servers = getFilteredServers();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = servers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.ip.includes(search) ||
      s.zoneId.includes(search);
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusConfig: Record<string, { dot: string; text: string; badge: string }> = {
    running: {
      dot: 'bg-emerald-400 shadow-emerald-400/50',
      text: '运行中',
      badge: 'bg-emerald-500/10 text-emerald-400',
    },
    stopped: {
      dot: 'bg-slate-500',
      text: '已停止',
      badge: 'bg-slate-500/10 text-slate-400',
    },
    maintaining: {
      dot: 'bg-amber-400 shadow-amber-400/50',
      text: '维护中',
      badge: 'bg-amber-500/10 text-amber-400',
    },
    merging: {
      dot: 'bg-purple-400 shadow-purple-400/50',
      text: '合区中',
      badge: 'bg-purple-500/10 text-purple-400',
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">服务器管理</h1>
        <p className="text-sm text-slate-500 mt-1">
          管理游戏服务器的起停、重启与状态监控
        </p>
      </div>

      {/* 工具栏 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="搜索服务器名称、IP、区服ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/50 border border-slate-800/60 rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-500" />
          {['all', 'running', 'stopped', 'maintaining', 'merging'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              {s === 'all' ? '全部' : statusConfig[s]?.text}
            </button>
          ))}
        </div>
      </div>

      {/* 服务器表格 */}
      <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800/60">
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                服务器
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                区服ID
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                状态
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                CPU
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                内存
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                在线
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {filtered.map((server) => {
              const cfg = statusConfig[server.status];
              return (
                <tr
                  key={server.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${cfg.dot} ${
                          server.status === 'running' ? 'animate-pulse' : ''
                        }`}
                      />
                      <div>
                        <div className="text-sm text-slate-200">{server.name}</div>
                        <div className="text-xs text-slate-500 font-mono">
                          {server.ip}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm font-mono text-slate-400">
                    {server.zoneId}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${cfg.badge}`}
                    >
                      {cfg.text}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            server.cpu > 80
                              ? 'bg-red-400'
                              : server.cpu > 60
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{ width: `${server.cpu}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-mono ${
                          server.cpu > 80
                            ? 'text-red-400'
                            : server.cpu > 60
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {server.cpu}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            server.memory > 80
                              ? 'bg-red-400'
                              : server.memory > 60
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{ width: `${server.memory}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-mono ${
                          server.memory > 80
                            ? 'text-red-400'
                            : server.memory > 60
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {server.memory}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm font-mono text-cyan-400">
                    {server.onlinePlayers > 0
                      ? server.onlinePlayers.toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {server.status === 'stopped' && (
                        <button
                          className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                          title="起服"
                        >
                          <Play size={14} />
                        </button>
                      )}
                      {server.status === 'running' && (
                        <>
                          <button
                            className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-colors"
                            title="重启"
                          >
                            <RotateCcw size={14} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                            title="停服"
                          >
                            <Square size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-slate-500">
            未找到匹配的服务器
          </div>
        )}
      </div>
    </div>
  );
}
