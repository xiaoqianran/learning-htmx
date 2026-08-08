import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { HTMX_PRESETS, getPreset } from "@/data/htmx-presets";
import { HtmxLiveDemo } from "@/components/HtmxLiveDemo";
import { Code2, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaygroundSearch = {
  example?: string;
};

export const Route = createFileRoute("/playground")({
  validateSearch: (search: Record<string, unknown>): PlaygroundSearch => ({
    example:
      typeof search.example === "string" && search.example.length > 0
        ? search.example
        : undefined,
  }),
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const { example } = Route.useSearch();
  const [activeId, setActiveId] = useState(example ?? "hello");
  const preset = useMemo(() => getPreset(activeId), [activeId]);

  return (
    <div className="mx-auto max-w-5xl pb-16">
      <header className="mb-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Code2 className="h-3.5 w-3.5" />
          真实 HTMX 演练场
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          在线 Playground
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          编辑 HTML 属性，右侧即时用{" "}
          <code className="rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-xs text-primary">
            htmx.org
          </code>{" "}
          运行；请求由模拟 API 返回 HTML 片段。
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {HTMX_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150",
              activeId === p.id
                ? "bg-primary text-primary-fg"
                : "bg-surface-3 text-muted hover:text-fg",
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm">
          <span className="font-medium text-fg">{preset.title}</span>
          <span className="text-muted"> · {preset.summary}</span>
        </div>
        <p className="inline-flex items-center gap-1.5 text-[11px] text-subtle">
          <Keyboard className="h-3 w-3" />
          改属性 → 点重新运行
        </p>
      </div>

      <HtmxLiveDemo key={preset.id} code={preset.code} title={preset.title} height={400} />

      <aside className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { t: "改属性", d: "试试 hx-swap、hx-trigger、hx-target" },
          { t: "看 Network", d: "DevTools 过滤 /api/htmx" },
          { t: "回课程", d: "路径化系统学习 + 测验" },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border border-border bg-surface p-3">
            <p className="text-sm font-medium text-fg">{x.t}</p>
            <p className="mt-1 text-xs text-muted">{x.d}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
