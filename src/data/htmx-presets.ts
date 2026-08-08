export type HtmxPreset = {
  id: string;
  title: string;
  summary: string;
  code: string;
};

export const HTMX_PRESETS: HtmxPreset[] = [
  {
    id: "hello",
    title: "Hello",
    summary: "最小 hx-get",
    code: `<button class="btn" hx-get="/api/htmx/hello" hx-target="#out" hx-swap="innerHTML">Hello</button>
<div id="out" class="box">…</div>`,
  },
  {
    id: "search",
    title: "搜索",
    summary: "防抖 keyup",
    code: `<input class="input" name="q" placeholder="搜…"
  hx-get="/api/htmx/search"
  hx-trigger="keyup changed delay:300ms"
  hx-target="#r" hx-swap="innerHTML" />
<div id="r" class="box"></div>`,
  },
  {
    id: "form",
    title: "表单",
    summary: "hx-post 提交",
    code: `<form class="stack" hx-post="/api/htmx/form" hx-target="#m" hx-swap="innerHTML">
  <input class="input" name="name" placeholder="名字" required />
  <button class="btn" type="submit">提交</button>
</form>
<div id="m" class="box"></div>`,
  },
  {
    id: "counter",
    title: "计数器",
    summary: "POST +1",
    code: `<button class="btn" hx-post="/api/htmx/counter/inc" hx-target="#c" hx-swap="innerHTML">+1</button>
<div id="c" class="box big">0</div>`,
  },
  {
    id: "tabs",
    title: "Tabs",
    summary: "局部导航",
    code: `<div class="row">
  <button class="btn" hx-get="/api/htmx/tab/a" hx-target="#t">A</button>
  <button class="btn ghost" hx-get="/api/htmx/tab/b" hx-target="#t">B</button>
</div>
<div id="t" class="box">…</div>`,
  },
  {
    id: "delete",
    title: "删除行",
    summary: "confirm + outerHTML",
    code: `<ul id="rows">
  <li class="row-item">条目
    <button class="btn danger" hx-delete="/api/htmx/items/x"
      hx-confirm="确定？" hx-target="closest li" hx-swap="outerHTML">删</button>
  </li>
</ul>`,
  },
];

export function getPreset(id: string): HtmxPreset {
  return HTMX_PRESETS.find((p) => p.id === id) ?? HTMX_PRESETS[0]!;
}
