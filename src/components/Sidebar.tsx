import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Server,
  GitMerge,
  Activity,
  FileText,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: '总览' },
  { to: '/servers', icon: Server, label: '服务器' },
  { to: '/merge', icon: GitMerge, label: '合区' },
  { to: '/monitor', icon: Activity, label: '监控' },
  { to: '/logs', icon: FileText, label: '日志' },
  { to: '/terminal', icon: Terminal, label: '终端' },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useStore();
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-slate-950 border-r border-slate-800/60 transition-all duration-300 flex flex-col ${
        sidebarCollapsed ? 'w-16' : 'w-52'
      }`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-slate-800/60">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
          G
        </div>
        {!sidebarCollapsed && (
          <span className="ml-3 text-white font-semibold text-sm tracking-wide">
            GameOps
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center h-10 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              } ${sidebarCollapsed ? 'justify-center' : 'px-3'}`}
            >
              <item.icon
                size={18}
                className={`shrink-0 ${isActive ? 'text-cyan-400' : ''}`}
              />
              {!sidebarCollapsed && (
                <span className="ml-3 text-sm">{item.label}</span>
              )}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-slate-800/60">
        <button
          onClick={toggleSidebar}
          className="w-full h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
