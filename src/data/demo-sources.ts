import type { DemoKind } from "@/data/lessons";

export type DemoSource = {
  title: string;
  code: string;
};

/** 单一源码：讲解与 Live Demo 共用 */
export const DEMO_SOURCES: Record<DemoKind, DemoSource> = {
  hello: {
    title: "hx-get Hello",
    code: `<button class="btn" hx-get="/api/htmx/hello" hx-target="#out" hx-swap="innerHTML">
  点我加载
</button>
<div id="out" class="box">等待响应…</div>`,
  },
  time: {
    title: "刷新时间",
    code: `<button class="btn" hx-get="/api/htmx/time" hx-target="#clock" hx-swap="innerHTML">
  刷新服务器时间
</button>
<div id="clock" class="box">—</div>`,
  },
  counter: {
    title: "POST 计数器",
    code: `<div class="row">
  <button class="btn" hx-post="/api/htmx/counter/inc" hx-target="#c" hx-swap="innerHTML">+1</button>
  <button class="btn ghost" hx-post="/api/htmx/counter/reset" hx-target="#c" hx-swap="innerHTML">重置</button>
</div>
<div id="c" class="box big">0</div>`,
  },
  swap: {
    title: "swap 模式",
    code: `<div class="row">
  <button class="btn" hx-post="/api/htmx/messages" hx-target="#list" hx-swap="beforeend">beforeend 追加</button>
  <button class="btn ghost" hx-post="/api/htmx/messages" hx-target="#list" hx-swap="innerHTML">innerHTML 替换</button>
</div>
<ul id="list" class="box list"><li>初始项</li></ul>`,
  },
  target: {
    title: "hx-target",
    code: `<button class="btn" hx-get="/api/htmx/hello" hx-target="#panel" hx-swap="innerHTML">
  更新右侧面板
</button>
<div id="panel" class="box">目标区域</div>`,
  },
  search: {
    title: "防抖搜索",
    code: `<input class="input" name="q" placeholder="搜水果…"
  hx-get="/api/htmx/search"
  hx-trigger="keyup changed delay:300ms"
  hx-target="#results"
  hx-swap="innerHTML" />
<div id="results" class="box">输入开始搜索</div>`,
  },
  indicator: {
    title: "加载指示器",
    code: `<button class="btn"
  hx-get="/api/htmx/slow"
  hx-target="#out"
  hx-indicator="#spin">
  慢请求 (800ms)
</button>
<span id="spin" class="htmx-indicator spin">⏳ 加载中…</span>
<div id="out" class="box"></div>`,
  },
  vals: {
    title: "hx-vals",
    code: `<button class="btn"
  hx-post="/api/htmx/echo"
  hx-vals='{"source":"demo","level":"pro"}'
  hx-target="#echo"
  hx-swap="innerHTML">
  发送额外参数
</button>
<div id="echo" class="box"></div>`,
  },
  form: {
    title: "表单 POST",
    code: `<form class="stack"
  hx-post="/api/htmx/form"
  hx-target="#msg"
  hx-swap="innerHTML"
  hx-indicator="#fspin">
  <input class="input" name="name" placeholder="你的名字" required />
  <input class="input" name="note" placeholder="备注" />
  <button class="btn" type="submit">提交</button>
  <span id="fspin" class="htmx-indicator spin">提交中…</span>
</form>
<div id="msg" class="box"></div>`,
  },
  select: {
    title: "hx-select",
    code: `<button class="btn"
  hx-get="/api/htmx/page"
  hx-select="#main"
  hx-target="#box"
  hx-swap="innerHTML">
  只抽取 #main
</button>
<div id="box" class="box">…</div>`,
  },
  oob: {
    title: "OOB 多区域",
    code: `<button class="btn" hx-post="/api/htmx/oob" hx-target="#main-list" hx-swap="beforeend">
  添加并更新计数
</button>
<ul id="main-list" class="box list"></ul>
<p>计数：<strong id="oob-count">0</strong></p>`,
  },
  boost: {
    title: "boost 概念",
    code: `<p class="muted">Boost 把普通链接变成 AJAX。下面用片段模拟：</p>
<div class="row">
  <a class="btn" hx-get="/api/htmx/tab/a" hx-target="#boost-out" hx-swap="innerHTML">About</a>
  <a class="btn ghost" hx-get="/api/htmx/tab/b" hx-target="#boost-out" hx-swap="innerHTML">Contact</a>
</div>
<div id="boost-out" class="box">选择链接</div>`,
  },
  tabs: {
    title: "Tabs",
    code: `<div class="row">
  <button class="btn" hx-get="/api/htmx/tab/a" hx-target="#tab" hx-swap="innerHTML">Tab A</button>
  <button class="btn ghost" hx-get="/api/htmx/tab/b" hx-target="#tab" hx-swap="innerHTML">Tab B</button>
  <button class="btn ghost" hx-get="/api/htmx/tab/c" hx-target="#tab" hx-swap="innerHTML">Tab C</button>
</div>
<div id="tab" class="box">选择一个标签</div>`,
  },
  "delete-row": {
    title: "确认删除",
    code: `<ul id="rows" class="list">
  <li class="row-item">苹果
    <button class="btn danger"
      hx-delete="/api/htmx/items/apple"
      hx-confirm="删除苹果？"
      hx-target="closest li"
      hx-swap="outerHTML swap:0.25s">删</button>
  </li>
  <li class="row-item">香蕉
    <button class="btn danger"
      hx-delete="/api/htmx/items/banana"
      hx-confirm="删除香蕉？"
      hx-target="closest li"
      hx-swap="outerHTML swap:0.25s">删</button>
  </li>
  <li class="row-item">橙子
    <button class="btn danger"
      hx-delete="/api/htmx/items/orange"
      hx-confirm="删除橙子？"
      hx-target="closest li"
      hx-swap="outerHTML swap:0.25s">删</button>
  </li>
</ul>`,
  },
  events: {
    title: "事件日志",
    code: `<button class="btn" id="ev-btn"
  hx-get="/api/htmx/hello"
  hx-target="#ev-out"
  hx-swap="innerHTML">
  触发请求
</button>
<div id="ev-out" class="box"></div>
<pre id="ev-log" class="log">事件将显示在此…</pre>
<script>
(function(){
  var log = document.getElementById('ev-log');
  if(!log) return;
  function line(name){
    log.textContent = new Date().toLocaleTimeString() + '  ' + name + '\\n' + log.textContent;
  }
  ['htmx:beforeRequest','htmx:afterRequest','htmx:beforeSwap','htmx:afterSwap','htmx:afterSettle']
    .forEach(function(ev){
      document.body.addEventListener(ev, function(){ line(ev); });
    });
})();
</script>`,
  },
  headers: {
    title: "响应头事件",
    code: `<button class="btn"
  hx-post="/api/htmx/with-trigger"
  hx-target="#hout"
  hx-swap="innerHTML">
  请求（带 HX-Trigger）
</button>
<div id="hout" class="box"></div>
<div id="toast" class="toast">等待 toast…</div>
<script>
document.body.addEventListener('showToast', function(e){
  var t = document.getElementById('toast');
  if(t) t.textContent = '🎉 ' + (e.detail && e.detail.value ? e.detail.value.message : '已触发');
});
</script>`,
  },
  "click-to-edit": {
    title: "Click to Edit",
    code: `<div id="contact" class="box">
  <div><strong>姓名</strong>：小明</div>
  <div><strong>邮箱</strong>：ming@example.com</div>
  <button class="btn" hx-get="/api/htmx/contact/1/edit" hx-target="#contact" hx-swap="outerHTML">
    编辑
  </button>
</div>`,
  },
  lazy: {
    title: "懒加载",
    code: `<div class="box" hx-get="/api/htmx/lazy" hx-trigger="load" hx-swap="outerHTML">
  占位：即将加载…
</div>`,
  },
  infinite: {
    title: "无限滚动",
    code: `<div id="feed" class="feed">
  <div class="card">条目 #1</div>
  <div class="card">条目 #2</div>
  <div class="card">条目 #3</div>
  <div class="card sentinel"
    hx-get="/api/htmx/rows?page=2"
    hx-trigger="revealed"
    hx-swap="afterend">
    ↓ 滚到此处加载更多
  </div>
</div>`,
  },
  polling: {
    title: "轮询状态",
    code: `<div class="box"
  hx-get="/api/htmx/status"
  hx-trigger="load, every 2s"
  hx-swap="innerHTML">
  状态加载中…
</div>`,
  },
  modal: {
    title: "模态片段",
    code: `<button class="btn" hx-get="/api/htmx/modal" hx-target="#modal-root" hx-swap="innerHTML">
  打开对话框
</button>
<div id="modal-root"></div>`,
  },
  bulk: {
    title: "批量选择",
    code: `<form id="bulk-form" class="stack"
  hx-post="/api/htmx/bulk"
  hx-target="#bulk-out"
  hx-swap="innerHTML">
  <label><input type="checkbox" name="ids" value="1" /> 任务一</label>
  <label><input type="checkbox" name="ids" value="2" /> 任务二</label>
  <label><input type="checkbox" name="ids" value="3" /> 任务三</label>
  <button class="btn" type="submit">标记完成</button>
</form>
<div id="bulk-out" class="box"></div>`,
  },
};

export function getDemoSource(kind: DemoKind): DemoSource {
  return DEMO_SOURCES[kind] ?? DEMO_SOURCES.hello;
}
