import { http, HttpResponse, delay } from "msw";

/** Match /api/... regardless of GitHub Pages base path; supports :param segments */
const api = (path: string) => {
  const cleaned = path.replace(/^\//, "");
  const body = cleaned
    .split("/")
    .map((seg) => {
      if (seg.startsWith(":")) return "[^/]+";
      return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("\\/");
  return new RegExp(`(?:^|/)${body}$`);
};

let counter = 0;
let oobCount = 0;
let msgN = 0;
let statusTick = 0;
const pageRows: Record<number, boolean> = {};

function html(body: string, init?: { status?: number; headers?: Record<string, string> }) {
  return new HttpResponse(body, {
    status: init?.status ?? 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      ...(init?.headers ?? {}),
    },
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

function lastSeg(url: string) {
  const parts = new URL(url).pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

const FRUITS = ["苹果", "香蕉", "橙子", "葡萄", "西瓜", "芒果", "草莓", "蓝莓", "梨", "桃"];

export const htmxHandlers = [
  http.get(api("api/htmx/hello"), async () => {
    await delay(120);
    return html(`<p class="ok">你好，HTMX！服务器时间 ${new Date().toLocaleTimeString()}</p>`);
  }),

  http.get(api("api/htmx/time"), async () => {
    await delay(80);
    return html(`<strong>${new Date().toLocaleString()}</strong>`);
  }),

  http.post(api("api/htmx/counter/inc"), async () => {
    await delay(100);
    counter += 1;
    return html(String(counter));
  }),

  http.post(api("api/htmx/counter/reset"), async () => {
    await delay(80);
    counter = 0;
    return html("0");
  }),

  http.post(api("api/htmx/messages"), async () => {
    await delay(100);
    msgN += 1;
    return html(`<li>消息 #${msgN} · ${new Date().toLocaleTimeString()}</li>`);
  }),

  http.get(api("api/htmx/search"), async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    const q = (url.searchParams.get("q") || "").trim();
    if (!q) return html(`<p class="muted">输入关键词…</p>`);
    const hits = FRUITS.filter((f) => f.includes(q));
    if (!hits.length) return html(`<p class="muted">没有匹配「${escapeHtml(q)}」</p>`);
    return html(
      `<ul class="list">${hits.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>`,
    );
  }),

  http.get(api("api/htmx/slow"), async () => {
    await delay(800);
    return html(`<p class="ok">慢请求完成 ✅</p>`);
  }),

  http.post(api("api/htmx/echo"), async ({ request }) => {
    await delay(100);
    const ct = request.headers.get("content-type") || "";
    let data: Record<string, string> = {};
    if (ct.includes("application/json")) {
      data = (await request.json()) as Record<string, string>;
    } else {
      const fd = await request.formData();
      fd.forEach((v, k) => {
        data[k] = String(v);
      });
    }
    return html(`<pre class="log">${escapeHtml(JSON.stringify(data, null, 2))}</pre>`);
  }),

  http.post(api("api/htmx/form"), async ({ request }) => {
    await delay(180);
    const fd = await request.formData();
    const name = String(fd.get("name") || "").trim();
    const note = String(fd.get("note") || "").trim();
    if (!name) {
      return html(`<p class="err">名字不能为空</p>`, { status: 422 });
    }
    return html(
      `<p class="ok">收到，${escapeHtml(name)}！${note ? `备注：${escapeHtml(note)}` : ""}</p>`,
    );
  }),

  http.get(api("api/htmx/page"), async () => {
    await delay(100);
    return html(`<!doctype html><html><body>
<header id="hdr">页眉（不应被 select）</header>
<main id="main"><p class="ok">这是 #main 内容</p><p>hx-select 只取这里</p></main>
<footer>页脚</footer>
</body></html>`);
  }),

  http.post(api("api/htmx/oob"), async () => {
    await delay(120);
    oobCount += 1;
    return html(
      `<li>待办 #${oobCount}</li>
<span id="oob-count" hx-swap-oob="true">${oobCount}</span>`,
    );
  }),

  http.get(api("api/htmx/tab/:id"), async ({ request }) => {
    await delay(100);
    const id = lastSeg(request.url).toUpperCase();
    const copy: Record<string, string> = {
      A: "Tab A：概览内容",
      B: "Tab B：详情内容",
      C: "Tab C：设置内容",
    };
    return html(`<p class="ok">${copy[id] || `Tab ${id}`}</p>`);
  }),

  http.delete(api("api/htmx/items/:id"), async () => {
    await delay(150);
    return html("");
  }),

  http.post(api("api/htmx/with-trigger"), async () => {
    await delay(120);
    return html(`<p class="ok">已保存</p>`, {
      headers: {
        "HX-Trigger": JSON.stringify({ showToast: { message: "保存成功" } }),
      },
    });
  }),

  http.get(api("api/htmx/contact/:id/edit"), async () => {
    await delay(100);
    return html(`<form id="contact" class="stack box"
  hx-put="/api/htmx/contact/1"
  hx-target="#contact"
  hx-swap="outerHTML">
  <label>姓名 <input class="input" name="name" value="小明" /></label>
  <label>邮箱 <input class="input" name="email" value="ming@example.com" /></label>
  <div class="row">
    <button class="btn" type="submit">保存</button>
    <button class="btn ghost" type="button"
      hx-get="/api/htmx/contact/1"
      hx-target="#contact"
      hx-swap="outerHTML">取消</button>
  </div>
</form>`);
  }),

  http.get(api("api/htmx/contact/:id"), async () => {
    await delay(80);
    return html(`<div id="contact" class="box">
  <div><strong>姓名</strong>：小明</div>
  <div><strong>邮箱</strong>：ming@example.com</div>
  <button class="btn" hx-get="/api/htmx/contact/1/edit" hx-target="#contact" hx-swap="outerHTML">编辑</button>
</div>`);
  }),

  http.put(api("api/htmx/contact/:id"), async ({ request }) => {
    await delay(150);
    const fd = await request.formData();
    const name = String(fd.get("name") || "小明");
    const email = String(fd.get("email") || "");
    return html(`<div id="contact" class="box">
  <div><strong>姓名</strong>：${escapeHtml(name)}</div>
  <div><strong>邮箱</strong>：${escapeHtml(email)}</div>
  <p class="ok">已保存</p>
  <button class="btn" hx-get="/api/htmx/contact/1/edit" hx-target="#contact" hx-swap="outerHTML">编辑</button>
</div>`);
  }),

  http.get(api("api/htmx/lazy"), async () => {
    await delay(500);
    return html(
      `<div class="box ok">✨ 懒加载内容已就绪 · ${new Date().toLocaleTimeString()}</div>`,
    );
  }),

  http.get(api("api/htmx/rows"), async ({ request }) => {
    await delay(280);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "2");
    if (pageRows[page]) {
      return html(`<div class="card muted">没有更多了</div>`);
    }
    pageRows[page] = true;
    const start = (page - 1) * 3 + 1;
    const cards = [0, 1, 2]
      .map((i) => `<div class="card">条目 #${start + i}</div>`)
      .join("");
    const next =
      page < 4
        ? `<div class="card sentinel"
    hx-get="/api/htmx/rows?page=${page + 1}"
    hx-trigger="revealed"
    hx-swap="afterend">↓ 继续加载</div>`
        : `<div class="card muted">到底了</div>`;
    return html(cards + next);
  }),

  http.get(api("api/htmx/status"), async () => {
    await delay(60);
    statusTick += 1;
    const pct = Math.min(100, statusTick * 7);
    return html(
      `<div><strong>任务进度</strong> ${pct}%</div>
<div class="bar"><span style="width:${pct}%"></span></div>
<div class="muted">tick #${statusTick} · ${new Date().toLocaleTimeString()}</div>`,
    );
  }),

  http.get(api("api/htmx/modal"), async () => {
    await delay(100);
    return html(`<div class="modal-backdrop" id="modal">
  <div class="modal">
    <h3>对话框</h3>
    <p>这是服务器返回的 HTML 片段。</p>
    <button class="btn" onclick="document.getElementById('modal-root').innerHTML=''">关闭</button>
  </div>
</div>`);
  }),

  http.post(api("api/htmx/bulk"), async ({ request }) => {
    await delay(150);
    const fd = await request.formData();
    const ids = fd.getAll("ids").map(String);
    if (!ids.length) return html(`<p class="err">请先勾选</p>`);
    return html(`<p class="ok">已标记完成：#${ids.map(escapeHtml).join(", #")}</p>`);
  }),
];
