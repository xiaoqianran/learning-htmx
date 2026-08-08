import { useEffect, useId, useRef, useState } from "react";
import { startMockApi } from "@/mocks/browser";
import { cn } from "@/lib/utils";
import { Play, RotateCcw } from "lucide-react";

declare global {
  interface Window {
    htmx?: {
      process: (el: Element) => void;
      logAll?: () => void;
    };
  }
}

const DEMO_CSS = `
:root { color-scheme: dark; font-family: ui-sans-serif, system-ui, sans-serif; }
body { margin: 0; color: #cdd6f4; background: transparent; font-size: 14px; line-height: 1.5; }
.btn { appearance: none; border: 1px solid #45475a; background: #a6e3a1; color: #11111b; font-weight: 600;
  border-radius: 8px; padding: 0.45rem 0.85rem; cursor: pointer; font-size: 13px; text-decoration: none;
  display: inline-flex; align-items: center; }
.btn.ghost { background: #313244; color: #cdd6f4; }
.btn.danger { background: #f38ba8; color: #11111b; }
.box { margin-top: 0.75rem; padding: 0.75rem 0.9rem; border-radius: 10px; background: #181825; border: 1px solid #313244; }
.box.big { font-size: 1.5rem; font-weight: 700; font-variant-numeric: tabular-nums; }
.row { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.stack { display: flex; flex-direction: column; gap: 0.5rem; }
.input { width: 100%; max-width: 320px; box-sizing: border-box; border-radius: 8px; border: 1px solid #45475a;
  background: #11111b; color: #cdd6f4; padding: 0.5rem 0.65rem; }
.list { margin: 0; padding-left: 1.1rem; }
.list li { margin: 0.25rem 0; }
.ok { color: #a6e3a1; margin: 0; }
.err { color: #f38ba8; margin: 0; }
.muted { color: #6c7086; }
.spin { margin-left: 0.5rem; color: #89b4fa; }
.htmx-indicator { opacity: 0; transition: opacity .15s; }
.htmx-request .htmx-indicator, .htmx-request.htmx-indicator { opacity: 1; }
.log { font-family: ui-monospace, monospace; font-size: 11px; white-space: pre-wrap; max-height: 140px; overflow: auto;
  background: #11111b; border: 1px solid #313244; border-radius: 8px; padding: 0.5rem; }
.toast { margin-top: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 8px; background: #313244; color: #f9e2af; }
.feed { max-height: 220px; overflow: auto; border: 1px solid #313244; border-radius: 10px; padding: 0.5rem; }
.card { padding: 0.55rem 0.7rem; margin: 0.35rem 0; border-radius: 8px; background: #181825; border: 1px solid #313244; }
.card.sentinel { border-style: dashed; color: #89b4fa; text-align: center; }
.row-item { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0; border-bottom: 1px solid #313244; list-style: none; }
ul#rows { padding: 0; margin: 0; }
.bar { height: 8px; background: #313244; border-radius: 99px; overflow: hidden; margin: 0.4rem 0; }
.bar > span { display: block; height: 100%; background: #a6e3a1; }
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.55); display: grid; place-items: center; z-index: 50; }
.modal { background: #1e1e2e; border: 1px solid #45475a; border-radius: 12px; padding: 1rem 1.1rem; max-width: 320px; }
label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 12px; color: #a6adc8; }
`;

function loadHtmx(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.htmx) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-htmx-lib]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("htmx load failed")));
      if (window.htmx) resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/htmx.org@2.0.4";
    s.async = true;
    s.dataset.htmxLib = "1";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("htmx load failed"));
    document.head.appendChild(s);
  });
}

export function HtmxLiveDemo({
  code,
  title,
  height = 320,
}: {
  code: string;
  title: string;
  height?: number;
}) {
  const [source, setSource] = useState(code);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const mountId = useId();

  useEffect(() => {
    setSource(code);
  }, [code]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await startMockApi();
        await loadHtmx();
        if (!cancelled) setReady(true);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "init failed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !hostRef.current) return;
    const host = hostRef.current;
    host.innerHTML = source;
    // run inline scripts from demo source
    host.querySelectorAll("script").forEach((old) => {
      const s = document.createElement("script");
      s.textContent = old.textContent;
      old.replaceWith(s);
    });
    window.htmx?.process(host);
  }, [ready, source, tick]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-2">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
        <p className="text-xs font-medium text-muted">
          Live · <span className="text-fg">{title}</span>
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-surface px-2 text-[11px] text-muted hover:text-fg"
            onClick={() => setSource(code)}
          >
            <RotateCcw className="h-3 w-3" />
            重置代码
          </button>
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1 rounded-md bg-primary px-2 text-[11px] font-medium text-primary-fg"
            onClick={() => setTick((t) => t + 1)}
          >
            <Play className="h-3 w-3" />
            重新运行
          </button>
        </div>
      </div>
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            spellCheck={false}
            className="h-full min-h-[200px] w-full resize-y bg-code-bg p-3 font-mono text-[12px] leading-relaxed text-code-fg outline-none"
            style={{ minHeight: height }}
            aria-label="HTMX 源码"
          />
        </div>
        <div className="relative p-3" style={{ minHeight: height }}>
          <style>{DEMO_CSS}</style>
          {!ready ? (
            <p className="text-sm text-muted">{error ?? "初始化 htmx 与模拟 API…"}</p>
          ) : (
            <div
              key={`${mountId}-${tick}`}
              ref={hostRef}
              className={cn("htmx-demo-host")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
