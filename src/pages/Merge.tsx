import { useStore } from '@/store/useStore';
import { Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Merge() {
  const { mergeTasks } = useStore();

  const statusConfig: Record<string, { icon: typeof Clock; color: string; text: string }> = {
    pending: { icon: Clock, color: 'text-slate-400', text: '待审核' },
    approving: { icon: AlertCircle, color: 'text-amber-400', text: '审核中' },
    running: { icon: Loader2, color: 'text-cyan-400', text: '执行中' },
    verifying: { icon: AlertCircle, color: 'text-blue-400', text: '校验中' },
    done: { icon: CheckCircle, color: 'text-emerald-400', text: '已完成' },
    failed: { icon: XCircle, color: 'text-red-400', text: '失败' },
    rollback: { icon: XCircle, color: 'text-orange-400', text: '已回滚' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">合区中心</h1>
        <p className="text-sm text-slate-500 mt-1">
          管理区服合并任务，查看合区进度与冲突预检
        </p>
      </div>

      <div className="space-y-4">
        {mergeTasks.map((task) => {
          const cfg = statusConfig[task.status];
          const StatusIcon = cfg.icon;
          return (
            <div
              key={task.id}
              className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-5 hover:border-slate-700/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-slate-400">
                    {task.id}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800/80 ${cfg.color}`}
                  >
                    <StatusIcon
                      size={12}
                      className={task.status === 'running' ? 'animate-spin' : ''}
                    />
                    {cfg.text}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>操作人: {task.operator}</span>
                  {task.startedAt && <span>开始: {task.startedAt}</span>}
                  {task.finishedAt && <span>完成: {task.finishedAt}</span>}
                </div>
              </div>

              {/* 合区流程可视化 */}
              <div className="flex items-center gap-2 mb-4">
                {task.sourceZones.map((zone, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-700/50 rounded-lg text-sm font-mono text-slate-300">
                      {zone}
                    </span>
                    {i < task.sourceZones.length - 1 && (
                      <span className="text-slate-600">+</span>
                    )}
                  </span>
                ))}
                <span className="text-cyan-400 mx-2">&rarr;</span>
                <span className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm font-mono text-cyan-400">
                  {task.targetZone}
                </span>
              </div>

              {/* 进度条 */}
              {task.status === 'running' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>合区进度</span>
                    <span className="text-cyan-400">65%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                      style={{ width: '65%' }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
