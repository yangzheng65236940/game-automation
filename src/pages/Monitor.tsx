import { useStore } from '@/store/useStore';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function generateMetrics() {
  return {
    cpu: Array.from({ length: 30 }, () => 30 + Math.random() * 50),
    memory: Array.from({ length: 30 }, () => 40 + Math.random() * 40),
    online: Array.from({ length: 30 }, () => 500 + Math.random() * 3000),
    loginQps: Array.from({ length: 30 }, () => 50 + Math.random() * 200),
    sceneTick: Array.from({ length: 30 }, () => 10 + Math.random() * 80),
    rpcLatency: Array.from({ length: 30 }, () => 5 + Math.random() * 30),
  };
}

function MiniChart({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    ctx.clearRect(0, 0, w, h);

    // 渐变填充
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, color + '30');
    gradient.addColorStop(1, color + '05');

    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // 线条
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [data, color, height]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: `${height}px` }}
    />
  );
}

export default function Monitor() {
  const { currentEnv } = useStore();
  const [metrics] = useState(generateMetrics);

  const systemMetrics = [
    { label: 'CPU 使用率', value: '62.4%', trend: 'up' as const, data: metrics.cpu, color: '#22d3ee' },
    { label: '内存使用率', value: '71.8%', trend: 'up' as const, data: metrics.memory, color: '#a78bfa' },
    { label: '在线人数', value: '3,256', trend: 'down' as const, data: metrics.online, color: '#34d399' },
    { label: '登录 QPS', value: '156/s', trend: 'up' as const, data: metrics.loginQps, color: '#fbbf24' },
  ];

  const appMetrics = [
    { label: '场景服 Tick 耗时', value: '42ms', status: 'normal', data: metrics.sceneTick, color: '#22d3ee' },
    { label: '登录服 Token 验证', value: '3ms', status: 'normal', data: metrics.rpcLatency, color: '#34d399' },
    { label: '社交服 RPC P99', value: '28ms', status: 'normal', data: metrics.rpcLatency, color: '#a78bfa' },
    { label: '聊天服 消息堆积', value: '12', status: 'warning', data: metrics.loginQps, color: '#fbbf24' },
    { label: '公会服 数据加载', value: '15ms', status: 'normal', data: metrics.sceneTick, color: '#f472b6' },
    { label: '跨服战 匹配耗时', value: '45s', status: 'warning', data: metrics.rpcLatency, color: '#fb923c' },
  ];

  const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'flat' }) => {
    if (trend === 'up') return <TrendingUp size={12} className="text-amber-400" />;
    if (trend === 'down') return <TrendingDown size={12} className="text-emerald-400" />;
    return <Minus size={12} className="text-slate-400" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">监控中心</h1>
        <p className="text-sm text-slate-500 mt-1">
          {currentEnv.name} · 系统与应用指标监控
        </p>
      </div>

      {/* 系统指标 */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          系统指标
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {systemMetrics.map((m) => (
            <div
              key={m.label}
              className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-4 hover:border-slate-700/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">{m.label}</span>
                <TrendIcon trend={m.trend} />
              </div>
              <div className="text-xl font-bold text-white mb-3">{m.value}</div>
              <MiniChart data={m.data} color={m.color} height={36} />
            </div>
          ))}
        </div>
      </div>

      {/* 应用指标 */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          应用指标
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {appMetrics.map((m) => (
            <div
              key={m.label}
              className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-4 hover:border-slate-700/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">{m.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    m.status === 'warning'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}
                >
                  {m.status === 'warning' ? '告警' : '正常'}
                </span>
              </div>
              <div className="text-xl font-bold text-white mb-3">{m.value}</div>
              <MiniChart data={m.data} color={m.color} height={32} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
