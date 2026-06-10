import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export default function Terminal() {
  const { getFilteredServers } = useStore();
  const servers = getFilteredServers();
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const runningServers = servers.filter((s) => s.status === 'running');

  useEffect(() => {
    if (runningServers.length > 0 && !selectedServer) {
      setSelectedServer(runningServers[0].id);
    }
  }, [runningServers, selectedServer]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    setHistory((prev) => [...prev, { type: 'input', text: `root@${cmd.split(' ')[0] || 'server'}:~$ ${cmd}` }]);

    // 模拟命令响应
    setTimeout(() => {
      const responses: Record<string, string> = {
        ls: 'bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var\ngame-server/  logs/  config/',
        pwd: '/root',
        'ps aux': 'PID   TTY     STAT  TIME  COMMAND\n1     ?       Ss    0:03  /sbin/init\n1287  ?       Sl    12:45 /opt/game-server/scene-server\n1288  ?       Sl    8:32  /opt/game-server/login-server\n1289  ?       Sl    3:21  /opt/game-server/social-server',
        top: 'top - 10:30:00 up 15 days,  3:21,  1 user,  load average: 2.45, 2.12, 1.89\nTasks: 128 total,   2 running, 126 sleeping\n%Cpu(s): 45.2 us,  3.1 sy,  0.0 ni, 50.7 id,  0.5 wa\nMiB Mem:  16384.0 total,   5632.0 free,   8960.0 used,   1792.0 buff/cache',
        'netstat -tlnp': 'Proto Recv-Q Send-Q Local Address     State    PID/Program\ntcp        0      0 0.0.0.0:8000      LISTEN   1287/scene-server\ntcp        0      0 0.0.0.0:8001      LISTEN   1288/login-server\ntcp        0      0 0.0.0.0:8002      LISTEN   1289/social-server',
        help: '可用命令: ls, pwd, ps aux, top, netstat -tlnp, clear, help',
        clear: '__CLEAR__',
      };

      const key = cmd.trim().toLowerCase();
      if (key === 'clear') {
        setHistory([]);
      } else if (responses[key]) {
        setHistory((prev) => [...prev, { type: 'output', text: responses[key] }]);
      } else {
        setHistory((prev) => [
          ...prev,
          { type: 'output', text: `bash: ${cmd}: command not found\n输入 help 查看可用命令` },
        ]);
      }
    }, 300);
  };

  const selectedServerData = runningServers.find((s) => s.id === selectedServer);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">远程终端</h1>
          <p className="text-sm text-slate-500 mt-1">
            通过 Web 终端连接到游戏服务器
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            className="px-3 py-2 bg-slate-900/50 border border-slate-800/60 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            {runningServers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.ip})
              </option>
            ))}
          </select>
          {selectedServerData && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              已连接
            </span>
          )}
        </div>
      </div>

      {/* 终端窗口 */}
      <div className="bg-[#0a0c10] border border-slate-800/60 rounded-xl overflow-hidden">
        {/* 终端标题栏 */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 border-b border-slate-800/60">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-slate-500 font-mono ml-2">
            {selectedServerData
              ? `root@${selectedServerData.ip}:~`
              : '未连接'}
          </span>
        </div>

        {/* 终端内容 */}
        <div
          ref={terminalRef}
          className="p-4 font-mono text-sm leading-relaxed overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 320px)', minHeight: 400 }}
        >
          {history.length === 0 && (
            <div className="text-slate-600 mb-2">
              GameOps Terminal v1.0 — 输入 help 查看可用命令
            </div>
          )}
          {history.map((entry, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {entry.type === 'input' ? (
                <span className="text-emerald-400">{entry.text}</span>
              ) : (
                <span className="text-slate-300">{entry.text}</span>
              )}
            </div>
          ))}

          {/* 输入行 */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-emerald-400">
              root@{selectedServerData?.ip || 'server'}:~$
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  handleCommand(input.trim());
                  setInput('');
                }
              }}
              className="flex-1 bg-transparent text-slate-200 outline-none caret-emerald-400"
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
