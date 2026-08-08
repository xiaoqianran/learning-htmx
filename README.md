# HTMX 实战学习

交互式中文 HTMX 教程：课程 + 测验 + 进度 + 真实 HTMX Demo + 模拟全栈工坊。

**仓库：** [https://github.com/xiaoqianran/learning-htmx](https://github.com/xiaoqianran/learning-htmx)

> 姊妹项目：[learning-vue3](https://github.com/xiaoqianran/learning-vue3) — 同一套学习产品形态，主题换成 HTMX。

---

## 这是什么

面向想系统学习 **HTMX**（HTML 属性驱动的 AJAX / 超媒体）的同学。内容以「读一点、动手一点、测一点」组织。

你可以：

- 按路径学完 **45 节** 课程（讲解 + 源码 + **真实 htmx Demo** + 小测验）
- 在 **Playground** 里改属性并立刻运行
- 在 **全栈工坊** 里练登录与笔记 CRUD（模拟 REST API）
- 用 **速查表 / 文档地图 / 学习中心 / 错题本 / 结业证明** 跟进度

> 说明：课站外壳是 React + TanStack Start；课程内 Demo 运行的是真正的 [htmx.org](https://htmx.org) + 模拟 HTML 片段 API（MSW）。

---

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、对应源码、Live Demo、测验、笔记 |
| 首页大纲 | `/` | 搜索、路径筛选、进度条 |
| Playground | `/playground` | 真实 HTMX 在线演练 |
| 全栈工坊 | `/studio` | 模拟 API + 闯关任务 |
| 文档地图 | `/docs` | 对照 htmx.org：官网 ↔ 本站课 |
| 主题 | 全局 | Catppuccin（Mocha/Macchiato/Frappé/Latte + Accent） |
| 速查表 | `/cheatsheet` | 一页核心属性 |
| 学习中心 | `/hub` | 打卡、收藏、路径进度 |
| 练习场 | `/lab` | 综合练习 |
| 错题本 | `/mistakes` | 测验错题回顾 |
| 结业证明 | `/certificate` | 全部完成后解锁 |

### 全栈工坊演示账号

```text
邮箱：demo@htmx.dev
密码：password123
```

---

## 学习路径

| 路径 | 你学到什么 |
|------|------------|
| **基础** | 安装、hx-get/post、swap、target、trigger、indicator、vals |
| **进阶** | select、OOB、boost、历史 URL、confirm、事件、请求/响应头 |
| **交互模式** | Click-to-edit、懒加载、无限滚动、搜索、轮询、Tabs/模态、批量 |
| **全栈实训** | 表单校验、CSRF、超媒体、工坊闯关 |
| **工程化** | 后端协作、调试、测试、部署 |
| **进阶模式** | 扩展、SSE/WS、hyperscript、性能、面试 |
| **官网对齐** | 对照 htmx.org 的知识卡片（可选） |

建议顺序：

```text
基础 → 进阶 → 交互模式 → 工坊闯关 → 工程化 → 进阶模式
```

---

## 本地运行

环境：Node 22+ 推荐。

```bash
git clone https://github.com/xiaoqianran/learning-htmx.git
cd learning-htmx
npm install
npm run dev
```

浏览器打开开发服务器地址即可（默认 `0.0.0.0:8080`）。

```bash
npm run build        # 生产构建
npm run build:pages  # GitHub Pages
npm run typecheck
```

---

## 技术栈

- React 19 + TanStack Start / Router
- Tailwind CSS v4 + Catppuccin
- htmx 2.x（CDN，Demo 内运行）
- MSW：`/api/htmx/*` HTML 片段 + 工坊 JSON API
- zustand 进度持久化

---

## License

学习用途；HTMX 商标与文档归其作者所有。
