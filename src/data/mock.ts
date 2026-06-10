export interface Environment {
  id: string;
  name: string;
  type: 'test' | 'prod' | 'miniapp';
  versions: Version[];
}

export interface Version {
  id: string;
  version: string;
  releaseDate: string;
  status: 'stable' | 'beta' | 'gray';
}

export interface Server {
  id: string;
  name: string;
  ip: string;
  environment: string;
  version: string;
  zoneId: string;
  status: 'running' | 'stopped' | 'maintaining' | 'merging';
  cpu: number;
  memory: number;
  onlinePlayers: number;
  updatedAt: string;
}

export interface Alert {
  id: string;
  level: 'P0' | 'P1' | 'P2' | 'P3';
  title: string;
  server: string;
  environment: string;
  createdAt: string;
  resolved: boolean;
}

export interface MergeTask {
  id: string;
  sourceZones: string[];
  targetZone: string;
  status: 'pending' | 'approving' | 'running' | 'verifying' | 'done' | 'failed' | 'rollback';
  operator: string;
  startedAt: string;
  finishedAt: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  service: string;
  message: string;
  server: string;
}

export const environments: Environment[] = [
  {
    id: 'test',
    name: '测试服',
    type: 'test',
    versions: [
      { id: 'v1', version: 'v1.3.0-beta', releaseDate: '2026-06-08', status: 'beta' },
      { id: 'v2', version: 'v1.2.8', releaseDate: '2026-05-20', status: 'stable' },
      { id: 'v3', version: 'v1.2.5', releaseDate: '2026-04-15', status: 'stable' },
    ],
  },
  {
    id: 'prod',
    name: '国服',
    type: 'prod',
    versions: [
      { id: 'v4', version: 'v1.2.8', releaseDate: '2026-06-01', status: 'stable' },
      { id: 'v5', version: 'v1.2.7', releaseDate: '2026-05-10', status: 'stable' },
      { id: 'v6', version: 'v1.3.0-rc1', releaseDate: '2026-06-09', status: 'gray' },
    ],
  },
  {
    id: 'miniapp',
    name: '小程序',
    type: 'miniapp',
    versions: [
      { id: 'v7', version: 'v2.1.0', releaseDate: '2026-06-05', status: 'stable' },
      { id: 'v8', version: 'v2.0.5', releaseDate: '2026-05-18', status: 'stable' },
      { id: 'v9', version: 'v2.2.0-beta', releaseDate: '2026-06-09', status: 'beta' },
    ],
  },
];

export const servers: Server[] = [
  { id: 's1', name: '测试-场景服01', ip: '10.0.1.11', environment: 'test', version: 'v1.3.0-beta', zoneId: 'test-s1', status: 'running', cpu: 45, memory: 62, onlinePlayers: 128, updatedAt: '2026-06-10 10:30:00' },
  { id: 's2', name: '测试-登录服01', ip: '10.0.1.12', environment: 'test', version: 'v1.3.0-beta', zoneId: 'test-s1', status: 'running', cpu: 12, memory: 35, onlinePlayers: 0, updatedAt: '2026-06-10 10:30:00' },
  { id: 's3', name: '测试-社交服01', ip: '10.0.1.13', environment: 'test', version: 'v1.3.0-beta', zoneId: 'test-s1', status: 'maintaining', cpu: 0, memory: 0, onlinePlayers: 0, updatedAt: '2026-06-10 09:00:00' },
  { id: 's4', name: '测试-聊天服01', ip: '10.0.1.14', environment: 'test', version: 'v1.2.8', zoneId: 'test-s2', status: 'stopped', cpu: 0, memory: 0, onlinePlayers: 0, updatedAt: '2026-06-09 18:00:00' },
  { id: 's5', name: '国服-场景服01', ip: '10.0.2.11', environment: 'prod', version: 'v1.2.8', zoneId: 'prod-s1', status: 'running', cpu: 78, memory: 85, onlinePlayers: 3256, updatedAt: '2026-06-10 10:30:00' },
  { id: 's6', name: '国服-场景服02', ip: '10.0.2.12', environment: 'prod', version: 'v1.2.8', zoneId: 'prod-s2', status: 'running', cpu: 65, memory: 72, onlinePlayers: 2890, updatedAt: '2026-06-10 10:30:00' },
  { id: 's7', name: '国服-登录服01', ip: '10.0.2.13', environment: 'prod', version: 'v1.2.8', zoneId: 'prod-s1', status: 'running', cpu: 32, memory: 48, onlinePlayers: 0, updatedAt: '2026-06-10 10:30:00' },
  { id: 's8', name: '国服-社交服01', ip: '10.0.2.14', environment: 'prod', version: 'v1.2.8', zoneId: 'prod-s1', status: 'running', cpu: 28, memory: 41, onlinePlayers: 0, updatedAt: '2026-06-10 10:30:00' },
  { id: 's9', name: '国服-公会服01', ip: '10.0.2.15', environment: 'prod', version: 'v1.3.0-rc1', zoneId: 'prod-s3', status: 'merging', cpu: 55, memory: 60, onlinePlayers: 0, updatedAt: '2026-06-10 08:00:00' },
  { id: 's10', name: '国服-跨服战01', ip: '10.0.2.16', environment: 'prod', version: 'v1.2.8', zoneId: 'prod-cross', status: 'running', cpu: 42, memory: 55, onlinePlayers: 480, updatedAt: '2026-06-10 10:30:00' },
  { id: 's11', name: '小程序-场景服01', ip: '10.0.3.11', environment: 'miniapp', version: 'v2.1.0', zoneId: 'mini-s1', status: 'running', cpu: 38, memory: 50, onlinePlayers: 890, updatedAt: '2026-06-10 10:30:00' },
  { id: 's12', name: '小程序-登录服01', ip: '10.0.3.12', environment: 'miniapp', version: 'v2.1.0', zoneId: 'mini-s1', status: 'running', cpu: 8, memory: 22, onlinePlayers: 0, updatedAt: '2026-06-10 10:30:00' },
  { id: 's13', name: '小程序-社交服01', ip: '10.0.3.13', environment: 'miniapp', version: 'v2.2.0-beta', zoneId: 'mini-s2', status: 'stopped', cpu: 0, memory: 0, onlinePlayers: 0, updatedAt: '2026-06-09 20:00:00' },
  { id: 's14', name: '小程序-聊天服01', ip: '10.0.3.14', environment: 'miniapp', version: 'v2.1.0', zoneId: 'mini-s1', status: 'running', cpu: 15, memory: 30, onlinePlayers: 0, updatedAt: '2026-06-10 10:30:00' },
];

export const alerts: Alert[] = [
  { id: 'a1', level: 'P0', title: '国服-场景服01 CPU使用率超过90%', server: 's5', environment: 'prod', createdAt: '2026-06-10 10:25:00', resolved: false },
  { id: 'a2', level: 'P1', title: '国服-场景服02 内存使用率超过85%', server: 's6', environment: 'prod', createdAt: '2026-06-10 10:15:00', resolved: false },
  { id: 'a3', level: 'P1', title: '国服-登录服01 登录QPS异常升高', server: 's7', environment: 'prod', createdAt: '2026-06-10 09:50:00', resolved: false },
  { id: 'a4', level: 'P2', title: '测试-社交服01 维护超时', server: 's3', environment: 'test', createdAt: '2026-06-10 09:00:00', resolved: false },
  { id: 'a5', level: 'P2', title: '小程序-社交服01 进程异常退出', server: 's13', environment: 'miniapp', createdAt: '2026-06-09 20:00:00', resolved: false },
  { id: 'a6', level: 'P3', title: '国服-跨服战01 匹配延迟升高', server: 's10', environment: 'prod', createdAt: '2026-06-10 10:00:00', resolved: true },
  { id: 'a7', level: 'P3', title: '测试-场景服01 Tick耗时波动', server: 's1', environment: 'test', createdAt: '2026-06-10 08:30:00', resolved: true },
];

export const mergeTasks: MergeTask[] = [
  { id: 'm1', sourceZones: ['prod-s3', 'prod-s4'], targetZone: 'prod-s3', status: 'running', operator: '张三', startedAt: '2026-06-10 08:00:00', finishedAt: '' },
  { id: 'm2', sourceZones: ['mini-s2', 'mini-s3'], targetZone: 'mini-s2', status: 'pending', operator: '李四', startedAt: '', finishedAt: '' },
  { id: 'm3', sourceZones: ['test-s2', 'test-s3'], targetZone: 'test-s2', status: 'done', operator: '王五', startedAt: '2026-06-08 02:00:00', finishedAt: '2026-06-08 04:30:00' },
];

export const logEntries: LogEntry[] = [
  { id: 'l1', timestamp: '2026-06-10 10:30:01', level: 'INFO', service: '场景服', message: '玩家 uid:100234 进入场景 mapId:1050', server: 's5' },
  { id: 'l2', timestamp: '2026-06-10 10:30:02', level: 'INFO', service: '登录服', message: '用户 uid:100567 登录成功, token已签发', server: 's7' },
  { id: 'l3', timestamp: '2026-06-10 10:30:03', level: 'WARN', service: '场景服', message: '场景 mapId:1050 实体数量超过阈值: 520/500', server: 's5' },
  { id: 'l4', timestamp: '2026-06-10 10:30:05', level: 'ERROR', service: '社交服', message: '好友列表加载超时 uid:100890, 耗时: 3500ms', server: 's8' },
  { id: 'l5', timestamp: '2026-06-10 10:30:06', level: 'INFO', service: '聊天服', message: '频道 world 消息QPS: 1250/s', server: 's14' },
  { id: 'l6', timestamp: '2026-06-10 10:30:08', level: 'FATAL', service: '场景服', message: 'Tick耗时异常: 156ms, 阈值: 100ms, 自动降级中', server: 's5' },
  { id: 'l7', timestamp: '2026-06-10 10:30:10', level: 'INFO', service: '公会服', message: '公会战赛季结算完成, 参与公会数: 128', server: 's9' },
  { id: 'l8', timestamp: '2026-06-10 10:30:12', level: 'WARN', service: '跨服战', message: '匹配队列堆积: 256, 平均等待: 45s', server: 's10' },
  { id: 'l9', timestamp: '2026-06-10 10:30:15', level: 'DEBUG', service: '登录服', message: 'Token验证耗时: 3ms, cache命中', server: 's7' },
  { id: 'l10', timestamp: '2026-06-10 10:30:18', level: 'INFO', service: '场景服', message: 'AOI更新完成, 耗时: 12ms, 实体数: 480', server: 's6' },
];
