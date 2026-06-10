import { Search, Filter } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const statusOptions = [
  { value: "all", label: "全部状态" },
  { value: "dev", label: "开发中" },
  { value: "testing", label: "测试中" },
  { value: "released", label: "已发布" },
];

export default function SearchFilter() {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter } =
    useAppStore();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="text"
          placeholder="搜索版本号..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
        />
      </div>
      <div className="relative">
        <Filter
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="appearance-none rounded-lg border border-slate-700/50 bg-slate-800/50 py-2.5 pl-9 pr-8 text-sm text-slate-200 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
