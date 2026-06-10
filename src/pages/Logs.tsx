import { useStore } from '@/store/useStore';
import { useState, useEffect, useRef } from 'react';

export default function Logs() {
  const { getFilteredLogs } = useStore();
  const logs = getFilteredLogs();
  const [filter, setFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [autoScroll, setAutoScroll] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = logs.filter((l) => {
    const matchLevel = levelFilter === 'all' || l.level === levelFilter;
    const matchFilter =
      !filter ||
      l.message.toLowerCase().includes(filter.toLowerCase()) ||
      l.service.includes(filter);
    return matchLevel && matchFilter;
  });

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [filtered, autoScroll]);

  const levelColor: Record<string, string> = {
    DEBUG: 'text-slate-500',
    INFO: 'text-cyan-400',
    WARN: 'text-amber-400',
    ERROR: 'text-red-400',
    FATAL: 'text-red-500 font-bold',
  };

  const levelBg: Record<string, string> = {
    ERROR: 'bg-red-500/5',
    FATAL: 'bg-red-500/10',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">日志中心</h1>
        <p className="text-sm text-slate-500 mt-1">
          实时查看服务器日志，支持关键词过滤与级别筛选
        </p>
      </div>

      {/* 工具栏 */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="关键词过滤..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 max-w-sm px-4 py-2 bg-slate-900/50 border border-slate-800/60 rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
        />
        <div className="flex items-center gap-1">
          {['all', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'].map((l) => (
            <button
              key={l}
              onClick={() => setLevelFilter(l)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                levelFilter === l
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              {l === 'all' ? 'ALL' : l}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20"
          />
          自动滚动
        </label>
      </div>

      {/* 日志面板 */}
      <div
        ref={containerRef}
        className="bg-[#0c0e14] border border-slate-800/60 rounded-xl overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 260px)' }}
      >
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 260px)' }}>
          {filtered.map((log) => (
            <div
              key={log.id}
              className={`flex items-start gap-4 px-4 py-2 border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors font-mono text-xs leading-relaxed ${
                levelBg[log.level] || ''
              }`}
            >
              <span className="text-slate-600 shrink-0 w-40">
                {log.timestamp}
              </span>
              <span className={`shrink-0 w-12 ${levelColor[log.level]}`}>
                {log.level}
              </span>
              <span className="text-slate-500 shrink-0 w-16">
                [{log.service}]
              </span>
              <span className="text-slate-300 flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
