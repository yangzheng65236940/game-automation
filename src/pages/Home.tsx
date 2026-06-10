import { useMemo } from "react";
import { PackageOpen } from "lucide-react";
import Header from "@/components/Header";
import EnvTabs from "@/components/EnvTabs";
import SearchFilter from "@/components/SearchFilter";
import VersionCard from "@/components/VersionCard";
import { mockVersions } from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const { activeEnv, searchQuery, statusFilter } = useAppStore();

  const filteredVersions = useMemo(() => {
    return mockVersions.filter((v) => {
      if (v.env !== activeEnv) return false;
      if (statusFilter !== "all" && v.status !== statusFilter) return false;
      if (
        searchQuery &&
        !v.version.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [activeEnv, searchQuery, statusFilter]);

  return (
    <div className="bg-grid min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* 环境标签 + 搜索筛选 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <EnvTabs />
          <div className="w-full sm:w-80">
            <SearchFilter />
          </div>
        </div>

        {/* 版本卡片网格 */}
        {filteredVersions.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVersions.map((version, index) => (
              <VersionCard
                key={version.id}
                version={version}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="mt-20 flex flex-col items-center text-slate-500">
            <PackageOpen size={48} strokeWidth={1} />
            <p className="mt-4 text-sm">暂无匹配的版本</p>
          </div>
        )}
      </main>

      {/* 底部 */}
      <footer className="border-t border-slate-800/30 py-6 text-center text-xs text-slate-600">
        多版本测试平台 · 内部使用
      </footer>
    </div>
  );
}
