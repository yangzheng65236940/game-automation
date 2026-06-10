import { useState } from "react";
import {
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp,
  QrCode,
  Clock,
  CheckCircle2,
  AlertCircle,
  Code2,
} from "lucide-react";
import type { Version } from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";

const statusConfig = {
  dev: {
    label: "开发中",
    color: "text-amber-400",
    dotClass: "status-dot-dev bg-amber-400",
    icon: <Code2 size={14} />,
    badge: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  },
  testing: {
    label: "测试中",
    color: "text-blue-400",
    dotClass: "status-dot-testing bg-blue-400",
    icon: <AlertCircle size={14} />,
    badge: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  },
  released: {
    label: "已发布",
    color: "text-emerald-400",
    dotClass: "bg-emerald-400",
    icon: <CheckCircle2 size={14} />,
    badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function VersionCard({
  version,
  index,
}: {
  version: Version;
  index: number;
}) {
  const { expandedCardId, toggleCard } = useAppStore();
  const [copied, setCopied] = useState(false);
  const isExpanded = expandedCardId === version.id;
  const status = statusConfig[version.status];

  const handleCopy = () => {
    navigator.clipboard.writeText(version.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="card-animate glass-card group cursor-pointer rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => toggleCard(version.id)}
    >
      {/* 头部：状态 + 版本号 */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className={`h-2.5 w-2.5 rounded-full ${status.dotClass}`} />
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.badge}`}
          >
            {status.icon}
            {status.label}
          </span>
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-100">
          {version.version}
        </span>
      </div>

      {/* 构建时间 */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        <Clock size={12} />
        <span>构建于 {formatTime(version.buildTime)}</span>
      </div>

      {/* 操作按钮 */}
      <div className="mt-4 flex items-center gap-2">
        <a
          href={version.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition-all hover:bg-blue-500/20"
        >
          <ExternalLink size={12} />
          打开链接
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700/50 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-700"
        >
          <Copy size={12} />
          {copied ? "已复制" : "复制链接"}
        </button>
        <div className="ml-auto text-slate-500 transition-transform duration-300">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* 展开详情 */}
      <div
        className={`expand-content ${
          isExpanded ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-700/50 pt-4">
          {/* 二维码区域 */}
          <div className="mb-4 flex flex-col items-center rounded-xl bg-slate-800/50 p-4">
            <QrCode size={64} className="text-slate-600" strokeWidth={1} />
            <span className="mt-2 text-xs text-slate-500">扫码进入测试版本</span>
          </div>

          {/* 变更日志 */}
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              变更日志
            </h4>
            <ul className="space-y-1.5">
              {version.changelog.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-400/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
