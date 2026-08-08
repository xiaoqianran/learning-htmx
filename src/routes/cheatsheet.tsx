import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "请求动词",
    items: [
      { k: "hx-get", v: "GET 请求，默认不带 body" },
      { k: "hx-post", v: "POST；表单序列化" },
      { k: "hx-put / patch / delete", v: "REST 语义更新/删除" },
    ],
  },
  {
    title: "目标与交换",
    items: [
      { k: "hx-target", v: "CSS / closest / find / this / next" },
      { k: "hx-swap", v: "innerHTML(默认) outerHTML beforeend …" },
      { k: "hx-select", v: "从响应 HTML 抽取片段" },
      { k: "hx-swap-oob", v: "一次响应更新多处（按 id）" },
      { k: "hx-select-oob", v: "选择响应中的 OOB 节点" },
    ],
  },
  {
    title: "触发",
    items: [
      { k: "默认", v: "多数 click；input 为 change" },
      { k: "keyup changed delay:300ms", v: "防抖搜索" },
      { k: "every 2s", v: "轮询" },
      { k: "revealed / load", v: "视口 / 入 DOM" },
      { k: "from:body", v: "从其他元素监听" },
    ],
  },
  {
    title: "数据与头",
    items: [
      { k: "hx-vals", v: "附加 JSON 参数" },
      { k: "hx-include", v: "包含其他输入" },
      { k: "hx-params", v: "过滤参数" },
      { k: "hx-headers", v: "自定义请求头（CSRF 等）" },
      { k: "HX-Request", v: "请求头 true = htmx 请求" },
      { k: "HX-Trigger", v: "响应头 → 客户端事件" },
      { k: "HX-Redirect / Push-Url", v: "响应端导航控制" },
    ],
  },
  {
    title: "体验与增强",
    items: [
      { k: "hx-indicator", v: "加载指示器" },
      { k: "hx-confirm", v: "确认对话框" },
      { k: "hx-disabled-elt", v: "请求中禁用" },
      { k: "hx-boost", v: "a/form 渐进增强" },
      { k: "hx-push-url", v: "推入历史" },
      { k: "hx-ext", v: "启用扩展" },
    ],
  },
  {
    title: "模式速记",
    items: [
      { k: "Click to Edit", v: "get 表单 → put 回展示" },
      { k: "Infinite scroll", v: "revealed + afterend" },
      { k: "Active search", v: "delay + innerHTML 结果" },
      { k: "Lazy load", v: "load / revealed" },
      { k: "Tabs", v: "固定 target 换内容" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-8">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          速查
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          HTMX 速查表
        </h1>
        <p className="mt-2 text-sm text-muted">
          写属性时扫一眼。完整说明见{" "}
          <Link to="/docs" className="text-primary no-underline hover:underline">
            文档地图
          </Link>{" "}
          与{" "}
          <a href="https://htmx.org/reference/" className="text-primary no-underline hover:underline" target="_blank" rel="noreferrer">
            htmx.org/reference
          </a>
          。
        </p>
      </header>

      <div className="space-y-6">
        {SECTIONS.map((sec) => (
          <section
            key={sec.title}
            className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft"
          >
            <h2 className="border-b border-border bg-surface-2 px-4 py-2.5 font-display text-sm font-semibold text-fg">
              {sec.title}
            </h2>
            <ul className="divide-y divide-border">
              {sec.items.map((it) => (
                <li
                  key={it.k}
                  className="grid gap-1 px-4 py-2.5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-4"
                >
                  <code className="font-mono text-[12px] text-primary">{it.k}</code>
                  <span className="text-sm text-muted">{it.v}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
