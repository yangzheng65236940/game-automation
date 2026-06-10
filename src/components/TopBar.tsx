import { useStore } from '@/store/useStore';
import { ChevronDown, Bell, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function TopBar() {
  const { currentEnv, currentVersion, environments, setEnvironment, setVersion, getFilteredAlerts } =
    useStore();
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unresolvedAlerts = getFilteredAlerts().filter((a) => !a.resolved);

  const currentEnvData = environments.find((e) => e.id === currentEnv.id);
  const currentVersions = currentEnvData?.versions ?? [];
  const currentVersionData = currentVersions.find((v) => v.version === currentVersion);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setVersionDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const envColorMap: Record<string, string> = {
    test: 'from-amber-500/20 to-amber-600/5 border-amber-500/30',
    prod: 'from-red-500/20 to-red-600/5 border-red-500/30',
    miniapp: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
  };

  const envActiveColorMap: Record<string, string> = {
    test: 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-amber-500/20',
    prod: 'bg-red-500/20 text-red-400 border-red-500/50 shadow-red-500/20',
    miniapp: 'bg-purple-500/20 text-purple-400 border-purple-500/50 shadow-purple-500/20',
  };

  const statusLabel: Record<string, { text: string; color: string }> = {
    stable: { text: '稳定', color: 'text-emerald-400' },
    beta: { text: '测试', color: 'text-amber-400' },
    gray: { text: '灰度', color: 'text-blue-400' },
  };

  return (
    <header className="h-14 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* 环境切换 */}
      <div className="flex items-center gap-3">
        {environments.map((env) => (
          <button
            key={env.id}
            onClick={() => setEnvironment(env)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all duration-300 ${
              currentEnv.id === env.id
                ? envActiveColorMap[env.type]
                : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-700'
            } ${currentEnv.id === env.id ? 'shadow-lg' : ''}`}
          >
            {env.name}
          </button>
        ))}
      </div>

      {/* 版本选择 + 右侧工具 */}
      <div className="flex items-center gap-4">
        {/* 版本选择器 */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
              currentEnv.id
                ? envColorMap[currentEnv.type] + ' border'
                : 'bg-slate-800/50 border-slate-700 text-slate-300'
            }`}
          >
            <span className="font-mono">{currentVersion}</span>
            {currentVersionData && (
              <span className={`text-xs ${statusLabel[currentVersionData.status].color}`}>
                {statusLabel[currentVersionData.status].text}
              </span>
            )}
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${versionDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {versionDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
              {currentVersions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setVersion(v.version);
                    setVersionDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-slate-800/80 transition-colors flex items-center justify-between ${
                    currentVersion === v.version ? 'text-cyan-400' : 'text-slate-300'
                  }`}
                >
                  <div>
                    <span className="font-mono text-sm">{v.version}</span>
                    <span className={`ml-2 text-xs ${statusLabel[v.status].color}`}>
                      {statusLabel[v.status].text}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{v.releaseDate}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 告警铃铛 */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
          <Bell size={18} />
          {unresolvedAlerts.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center animate-pulse">
              {unresolvedAlerts.length}
            </span>
          )}
        </button>

        {/* 用户头像 */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <span className="text-sm text-slate-300">管理员</span>
        </div>
      </div>
    </header>
  );
}
