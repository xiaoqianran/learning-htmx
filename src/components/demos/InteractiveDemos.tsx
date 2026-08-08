import { useState } from "react";
import type { DemoKind } from "@/data/lessons";
import { getDemoSource } from "@/data/demo-sources";
import { HtmxLiveDemo } from "@/components/HtmxLiveDemo";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";

/**
 * 交互 Demo：源码来自 demo-sources，真实 htmx + MSW 片段 API。
 */
export function InteractiveDemo({
  kind,
  title,
  hint,
}: {
  kind: DemoKind;
  title: string;
  hint?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const source = getDemoSource(kind);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            交互 Demo · 真 HTMX
          </p>
          <h3 className="mt-0.5 font-display text-base font-semibold text-fg">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted transition-colors hover:text-fg"
        >
          <Code2 className="h-3.5 w-3.5" />
          {collapsed ? "展开运行器" : "收起运行器"}
          {collapsed ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronUp className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div className="p-4 sm:p-5">
        {hint ? <p className="mb-4 text-sm text-muted">{hint}</p> : null}
        {!collapsed ? (
          <HtmxLiveDemo code={source.code} title={source.title} height={340} />
        ) : (
          <p className="text-sm text-muted">运行器已收起 — 可展开再改再跑。</p>
        )}
        <p className="mt-3 text-xs text-subtle">
          单一源码（{source.title}）既用于阅读也用于执行。改左侧 HTML 属性即可验证。
        </p>
      </div>
    </section>
  );
}
