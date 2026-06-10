import { Layers, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-slate-800/50">
      {/* 背景光效 */}
      <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
            <Layers size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              多版本测试平台
            </h1>
            <p className="text-xs text-slate-500">
              管理与切换国服、小程序等多环境版本
            </p>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="mt-6 flex gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/30 px-3 py-1.5">
            <Zap size={14} className="text-blue-400" />
            <span className="text-xs text-slate-400">
              当前环境版本数：
              <span className="font-medium text-slate-200" id="version-count">
                -
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
