export interface Version {
  id: string;
  version: string;
  env: "guofu" | "miniapp";
  status: "dev" | "testing" | "released";
  buildTime: string;
  url: string;
  qrcode: string;
  changelog: string[];
}

export interface EnvTab {
  key: string;
  label: string;
  icon: string;
}

export const envTabs: EnvTab[] = [
  { key: "guofu", label: "国服", icon: "server" },
  { key: "miniapp", label: "小程序", icon: "smartphone" },
];

export const mockVersions: Version[] = [
  {
    id: "g-2.4.1",
    version: "v2.4.1",
    env: "guofu",
    status: "testing",
    buildTime: "2026-06-09T14:30:00Z",
    url: "https://test.example.com/guofu/v2.4.1",
    qrcode: "",
    changelog: ["修复登录超时问题", "优化首页加载速度", "新增消息推送功能"],
  },
  {
    id: "g-2.4.0",
    version: "v2.4.0",
    env: "guofu",
    status: "released",
    buildTime: "2026-06-05T10:00:00Z",
    url: "https://test.example.com/guofu/v2.4.0",
    qrcode: "",
    changelog: ["全新UI改版", "性能优化提升30%", "修复已知Bug"],
  },
  {
    id: "g-2.5.0-beta",
    version: "v2.5.0-beta",
    env: "guofu",
    status: "dev",
    buildTime: "2026-06-10T09:15:00Z",
    url: "https://test.example.com/guofu/v2.5.0-beta",
    qrcode: "",
    changelog: ["开发中：AI助手集成", "开发中：暗黑模式", "开发中：多语言支持"],
  },
  {
    id: "g-2.3.9",
    version: "v2.3.9",
    env: "guofu",
    status: "released",
    buildTime: "2026-05-28T16:00:00Z",
    url: "https://test.example.com/guofu/v2.3.9",
    qrcode: "",
    changelog: ["安全补丁更新", "修复支付流程异常"],
  },
  {
    id: "m-1.8.2",
    version: "v1.8.2",
    env: "miniapp",
    status: "testing",
    buildTime: "2026-06-08T11:20:00Z",
    url: "https://test.example.com/miniapp/v1.8.2",
    qrcode: "",
    changelog: ["小程序分享功能优化", "修复授权登录问题", "新增购物车功能"],
  },
  {
    id: "m-1.8.1",
    version: "v1.8.1",
    env: "miniapp",
    status: "released",
    buildTime: "2026-06-01T09:00:00Z",
    url: "https://test.example.com/miniapp/v1.8.1",
    qrcode: "",
    changelog: ["首屏加载优化", "修复iOS兼容问题"],
  },
  {
    id: "m-1.9.0-alpha",
    version: "v1.9.0-alpha",
    env: "miniapp",
    status: "dev",
    buildTime: "2026-06-10T08:00:00Z",
    url: "https://test.example.com/miniapp/v1.9.0-alpha",
    qrcode: "",
    changelog: ["开发中：直播功能", "开发中：订阅消息", "开发中：云开发集成"],
  },
  {
    id: "m-1.8.0",
    version: "v1.8.0",
    env: "miniapp",
    status: "released",
    buildTime: "2026-05-20T14:30:00Z",
    url: "https://test.example.com/miniapp/v1.8.0",
    qrcode: "",
    changelog: ["全新首页设计", "性能优化", "用户体验提升"],
  },
];
