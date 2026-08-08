export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "hello"
  | "time"
  | "counter"
  | "swap"
  | "target"
  | "search"
  | "indicator"
  | "vals"
  | "form"
  | "select"
  | "oob"
  | "boost"
  | "tabs"
  | "delete-row"
  | "events"
  | "headers"
  | "click-to-edit"
  | "lazy"
  | "infinite"
  | "polling"
  | "modal"
  | "bulk";

export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track: "基础" | "进阶" | "交互模式" | "全栈实训" | "工程化" | "进阶模式" | "官网对齐";
  format?: "course" | "reference";
  minutes: number;
  /** 官网完整 URL */
  official?: string;
  blocks: LessonBlock[];
};

export const LESSONS: Lesson[] = [
  {
    "slug": "intro",
    "title": "HTMX 是什么",
    "summary": "用 HTML 属性驱动 AJAX，回归超媒体。",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/docs/#introduction",
    "blocks": [
      {
        "type": "text",
        "title": "一句话",
        "body": "HTMX 让你用 HTML 属性发起 HTTP 请求，并把返回的 HTML 片段直接塞进页面——不写（或少写）JavaScript，也能做现代 SPA 式交互。"
      },
      {
        "type": "text",
        "title": "核心观念",
        "body": "传统前端：JSON → 客户端模板 → DOM。\nHTMX：服务器直接返回 HTML 片段 → 按 hx-swap 规则替换目标。\n\n这叫超媒体驱动（Hypermedia-Driven Application）。"
      },
      {
        "type": "code",
        "title": "最小例子",
        "lang": "html",
        "code": "<button hx-get=\"/api/htmx/hello\" hx-target=\"#out\" hx-swap=\"innerHTML\">\n  点我\n</button>\n<div id=\"out\">等待…</div>"
      },
      {
        "type": "demo",
        "kind": "hello",
        "title": "动手：第一次 hx-get"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "i1",
            "question": "HTMX 响应体通常是？",
            "options": [
              "JSON 再渲染",
              "HTML 片段",
              "仅状态码",
              "WebSocket 帧"
            ],
            "answer": 1,
            "explain": "服务器返回 HTML，由浏览器/htmx 插入。"
          },
          {
            "id": "i2",
            "question": "HTMX 的定位？",
            "options": [
              "完整 UI 框架",
              "小型 JS 库，扩展 HTML",
              "仅 CSS",
              "数据库 ORM"
            ],
            "answer": 1,
            "explain": "约 14KB 的库，通过属性增强 HTML。"
          }
        ]
      }
    ]
  },
  {
    "slug": "install",
    "title": "安装与加载",
    "summary": "CDN、npm 与零构建起步。",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 6,
    "official": "https://htmx.org/docs/#installing",
    "blocks": [
      {
        "type": "text",
        "title": "三种方式",
        "body": "1) CDN script 标签（最快）\n2) npm 安装后打包\n3) 下载 htmx.min.js 本地托管\n\n学习期推荐 CDN；上线可锁定版本号。"
      },
      {
        "type": "code",
        "title": "CDN",
        "lang": "html",
        "code": "<script src=\"https://unpkg.com/htmx.org@2.0.4\"></script>"
      },
      {
        "type": "tip",
        "body": "本站 Demo 已自动注入 htmx，你只需关心属性与后端返回的 HTML。"
      },
      {
        "type": "demo",
        "kind": "hello",
        "title": "确认 htmx 已加载"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "in1",
            "question": "htmx 2.x 推荐通过？",
            "options": [
              "仅 iframe",
              "script 引入库文件",
              "仅 Web Components",
              "浏览器内置"
            ],
            "answer": 1,
            "explain": "标准 script 引入即可。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-get",
    "title": "hx-get：声明式请求",
    "summary": "点击/触发时发 GET，拿回 HTML。",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/attributes/hx-get/",
    "blocks": [
      {
        "type": "text",
        "title": "hx-get",
        "body": "把 URL 写在属性上。默认触发：多数元素是 click，input 是 change。配合 hx-target 指定放哪。"
      },
      {
        "type": "code",
        "title": "加载片段",
        "lang": "html",
        "code": "<button hx-get=\"/api/htmx/time\" hx-target=\"#clock\" hx-swap=\"innerHTML\">\n  刷新时间\n</button>\n<div id=\"clock\">—</div>"
      },
      {
        "type": "demo",
        "kind": "time",
        "title": "动手：GET 刷新时间"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "g1",
            "question": "hx-get 对应 HTTP？",
            "options": [
              "POST",
              "GET",
              "PUT",
              "DELETE"
            ],
            "answer": 1,
            "explain": "就是 GET。"
          },
          {
            "id": "g2",
            "question": "没有 hx-target 时？",
            "options": [
              "什么都不做",
              "替换触发元素自身",
              "整页跳转",
              "清空 body"
            ],
            "answer": 1,
            "explain": "默认 target 是 this。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-post",
    "title": "hx-post / put / delete / patch",
    "summary": "表单与资源变更用非 GET。",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/attributes/hx-post/",
    "blocks": [
      {
        "type": "text",
        "title": "变更请求",
        "body": "hx-post、hx-put、hx-patch、hx-delete 对应 REST 语义。表单提交时 htmx 会序列化字段。"
      },
      {
        "type": "code",
        "title": "计数 +1",
        "lang": "html",
        "code": "<button hx-post=\"/api/htmx/counter/inc\" hx-target=\"#c\" hx-swap=\"innerHTML\">\n  +1\n</button>\n<span id=\"c\">0</span>"
      },
      {
        "type": "demo",
        "kind": "counter",
        "title": "动手：POST 计数器"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "p1",
            "question": "删除资源更合适？",
            "options": [
              "hx-get",
              "hx-delete",
              "hx-vals 仅",
              "hx-boost"
            ],
            "answer": 1,
            "explain": "语义用 DELETE。"
          },
          {
            "id": "p2",
            "question": "表单默认序列化到？",
            "options": [
              "仅 URL",
              "请求 body",
              "localStorage",
              "Cookie 强制"
            ],
            "answer": 1,
            "explain": "作为 form body 发送。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-swap",
    "title": "hx-swap：怎么换",
    "summary": "innerHTML、outerHTML、beforeend…",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/attributes/hx-swap/",
    "blocks": [
      {
        "type": "text",
        "title": "交换策略",
        "body": "innerHTML（默认）替换内部；outerHTML 整块换掉；beforeend 追加到末尾；afterbegin 插到开头；delete 删目标；none 不换。"
      },
      {
        "type": "code",
        "title": "追加消息",
        "lang": "html",
        "code": "<button hx-post=\"/api/htmx/messages\" hx-target=\"#list\" hx-swap=\"beforeend\">\n  追加一条\n</button>\n<ul id=\"list\"></ul>"
      },
      {
        "type": "demo",
        "kind": "swap",
        "title": "动手：不同 swap 模式"
      },
      {
        "type": "tip",
        "body": "列表无限滚动常用 beforeend；替换整行用 outerHTML。"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "s1",
            "question": "默认 swap？",
            "options": [
              "outerHTML",
              "innerHTML",
              "none",
              "delete"
            ],
            "answer": 1,
            "explain": "默认 innerHTML。"
          },
          {
            "id": "s2",
            "question": "追加到列表末尾？",
            "options": [
              "afterbegin",
              "beforeend",
              "outerHTML",
              "delete"
            ],
            "answer": 1,
            "explain": "beforeend。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-target",
    "title": "hx-target：换哪里",
    "summary": "CSS 选择器、closest、find、this。",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/attributes/hx-target/",
    "blocks": [
      {
        "type": "text",
        "title": "目标语法",
        "body": "hx-target=\"#id\"、\".class\"、\"closest tr\"、\"find .panel\"、\"this\"、\"next\"、\"previous\"。把触发与更新区域解耦。"
      },
      {
        "type": "code",
        "title": "更新兄弟区域",
        "lang": "html",
        "code": "<button hx-get=\"/api/htmx/hello\" hx-target=\"#panel\" hx-swap=\"innerHTML\">\n  加载到右侧\n</button>\n<div id=\"panel\" class=\"panel\">空</div>"
      },
      {
        "type": "demo",
        "kind": "target",
        "title": "动手：target 选择器"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "t1",
            "question": "closest tr 表示？",
            "options": [
              "全局第一个 tr",
              "向上最近的 tr",
              "子级 tr",
              "下一 tr"
            ],
            "answer": 1,
            "explain": "沿祖先找最近匹配。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-trigger",
    "title": "hx-trigger：何时请求",
    "summary": "click、keyup、every、revealed…",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/attributes/hx-trigger/",
    "blocks": [
      {
        "type": "text",
        "title": "触发器",
        "body": "默认 click。可写：\n• keyup changed delay:300ms\n• every 2s（轮询）\n• revealed（进入视口）\n• load（进入 DOM）\n• 自定义事件"
      },
      {
        "type": "code",
        "title": "防抖搜索",
        "lang": "html",
        "code": "<input name=\"q\"\n  hx-get=\"/api/htmx/search\"\n  hx-trigger=\"keyup changed delay:300ms\"\n  hx-target=\"#results\"\n  hx-swap=\"innerHTML\"\n  placeholder=\"搜索…\" />\n<div id=\"results\"></div>"
      },
      {
        "type": "demo",
        "kind": "search",
        "title": "动手：防抖搜索"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "tr1",
            "question": "防抖搜索常用？",
            "options": [
              "every 1s",
              "keyup changed delay:300ms",
              "load once",
              "dblclick"
            ],
            "answer": 1,
            "explain": "delay 修饰符。"
          },
          {
            "id": "tr2",
            "question": "every 2s 是？",
            "options": [
              "仅两次",
              "轮询",
              "WebSocket",
              "CSS 动画"
            ],
            "answer": 1,
            "explain": "定时轮询。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-indicator",
    "title": "加载态与指示器",
    "summary": "hx-indicator 与 htmx-request 类。",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/attributes/hx-indicator/",
    "blocks": [
      {
        "type": "text",
        "title": "体验细节",
        "body": "请求进行中，htmx 给触发元素加 htmx-request。用 hx-indicator 指向 spinner，CSS 控制显示。"
      },
      {
        "type": "code",
        "title": "Spinner",
        "lang": "html",
        "code": "<button hx-get=\"/api/htmx/slow\" hx-target=\"#out\" hx-indicator=\"#spin\">\n  慢请求\n</button>\n<span id=\"spin\" class=\"htmx-indicator\">加载中…</span>\n<div id=\"out\"></div>\n<style>.htmx-indicator{opacity:0} .htmx-request .htmx-indicator, .htmx-request.htmx-indicator{opacity:1}</style>"
      },
      {
        "type": "demo",
        "kind": "indicator",
        "title": "动手：加载指示器"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ind1",
            "question": "请求中自动添加的类？",
            "options": [
              "is-loading",
              "htmx-request",
              "busy",
              "aria-busy 强制"
            ],
            "answer": 1,
            "explain": "htmx-request。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-vals",
    "title": "hx-vals / hx-include / hx-params",
    "summary": "额外参数与包含字段。",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/attributes/hx-vals/",
    "blocks": [
      {
        "type": "text",
        "title": "带参技巧",
        "body": "hx-vals='{\"priority\":\"high\"}' 附加 JSON。\nhx-include 把其他输入一并提交。\nhx-params 过滤要发的字段。"
      },
      {
        "type": "code",
        "title": "额外 JSON",
        "lang": "html",
        "code": "<button hx-post=\"/api/htmx/echo\"\n  hx-vals='{\"source\":\"lesson\"}'\n  hx-target=\"#echo\"\n  hx-swap=\"innerHTML\">\n  带 source 提交\n</button>\n<div id=\"echo\"></div>"
      },
      {
        "type": "demo",
        "kind": "vals",
        "title": "动手：vals 与 include"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "v1",
            "question": "hx-vals 用途？",
            "options": [
              "改 CSS",
              "附加请求参数",
              "换主题",
              "禁用 htmx"
            ],
            "answer": 1,
            "explain": "额外参数。"
          }
        ]
      }
    ]
  },
  {
    "slug": "attributes-map",
    "title": "常用属性地图",
    "summary": "一张图串起核心属性族。",
    "level": "入门",
    "track": "基础",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/reference/",
    "blocks": [
      {
        "type": "text",
        "title": "属性族",
        "body": "• 动词：hx-get/post/put/patch/delete\n• 目标：hx-target / hx-select / hx-swap\n• 时机：hx-trigger\n• 数据：hx-vals / include / params / headers\n• 体验：indicator / confirm / disable-elt\n• 导航：push-url / replace-url / history-elt\n• 增强：boost / ext / on"
      },
      {
        "type": "code",
        "title": "组合示例",
        "lang": "html",
        "code": "<form hx-post=\"/api/htmx/form\"\n  hx-target=\"#msg\"\n  hx-swap=\"innerHTML\"\n  hx-indicator=\"#spin\"\n  hx-disabled-elt=\"find button\">\n  <input name=\"name\" required />\n  <button type=\"submit\">提交</button>\n  <span id=\"spin\" class=\"htmx-indicator\">…</span>\n</form>\n<div id=\"msg\"></div>"
      },
      {
        "type": "demo",
        "kind": "form",
        "title": "动手：表单组合"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "am1",
            "question": "控制历史 URL 的属性？",
            "options": [
              "hx-push-url",
              "hx-ext",
              "hx-disinherit",
              "hx-preserve"
            ],
            "answer": 0,
            "explain": "hx-push-url。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-select",
    "title": "hx-select：只取响应的一部分",
    "summary": "从完整 HTML 中挑片段。",
    "level": "进阶",
    "track": "进阶",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/attributes/hx-select/",
    "blocks": [
      {
        "type": "text",
        "title": "片段选择",
        "body": "服务器返回整页时，可用 hx-select=\"#content\" 只抽取部分插入，便于渐进迁移旧页面。"
      },
      {
        "type": "code",
        "title": "选片段",
        "lang": "html",
        "code": "<button hx-get=\"/api/htmx/page\"\n  hx-select=\"#main\"\n  hx-target=\"#box\"\n  hx-swap=\"innerHTML\">只取 #main</button>\n<div id=\"box\"></div>"
      },
      {
        "type": "demo",
        "kind": "select",
        "title": "动手：hx-select"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "sel1",
            "question": "hx-select 作用在？",
            "options": [
              "请求 URL",
              "响应 HTML",
              "Cookie",
              "localStorage"
            ],
            "answer": 1,
            "explain": "过滤响应。"
          }
        ]
      }
    ]
  },
  {
    "slug": "oob",
    "title": "Out of Band 交换",
    "summary": "一次响应更新多处 DOM。",
    "level": "进阶",
    "track": "进阶",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/attributes/hx-swap-oob/",
    "blocks": [
      {
        "type": "text",
        "title": "多目标更新",
        "body": "主 swap 更新 target；带 hx-swap-oob=\"true\" 的元素按 id 更新页面其他位置。适合：列表 + 角标 + 提示同时变。"
      },
      {
        "type": "code",
        "title": "响应示例",
        "lang": "html",
        "code": "<!-- 主内容 -->\n<li>新待办</li>\n<!-- OOB 更新计数 -->\n<span id=\"todo-count\" hx-swap-oob=\"true\">3</span>"
      },
      {
        "type": "demo",
        "kind": "oob",
        "title": "动手：OOB 多区域"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "o1",
            "question": "OOB 靠什么定位？",
            "options": [
              "class 必须唯一",
              "元素 id",
              "data-index",
              "z-index"
            ],
            "answer": 1,
            "explain": "按 id 匹配。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-boost",
    "title": "hx-boost：渐进增强链接与表单",
    "summary": "普通 a/form 变 AJAX，无 JS 仍可用。",
    "level": "进阶",
    "track": "进阶",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/attributes/hx-boost/",
    "blocks": [
      {
        "type": "text",
        "title": "Boost",
        "body": "在容器上 hx-boost=\"true\"，内部链接/表单自动 AJAX 化并更新 body。无 JS 时退回整页导航——真正的渐进增强。"
      },
      {
        "type": "code",
        "title": "Boost 导航",
        "lang": "html",
        "code": "<div hx-boost=\"true\">\n  <a href=\"/about\">About</a>\n  <a href=\"/contact\">Contact</a>\n</div>"
      },
      {
        "type": "tip",
        "body": "本 Demo 用模拟片段展示 boost 思路；真实站点配合服务端完整页面。"
      },
      {
        "type": "demo",
        "kind": "boost",
        "title": "动手：boost 概念"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "b1",
            "question": "hx-boost 主要增强？",
            "options": [
              "WebGL",
              "a 与 form",
              "WebSocket only",
              "Service Worker"
            ],
            "answer": 1,
            "explain": "链接和表单。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-push-url",
    "title": "历史与 URL：push / replace",
    "summary": "AJAX 也要可分享、可后退。",
    "level": "进阶",
    "track": "进阶",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/attributes/hx-push-url/",
    "blocks": [
      {
        "type": "text",
        "title": "可寻址性",
        "body": "hx-push-url=\"true\" 把当前请求 URL 推入历史；也可写死路径。hx-replace-url 则替换当前条目。配合 HX-Push-Url 响应头。"
      },
      {
        "type": "code",
        "title": "Tab 推历史",
        "lang": "html",
        "code": "<button hx-get=\"/api/htmx/tab/a\"\n  hx-target=\"#tab\"\n  hx-push-url=\"/tabs/a\">A</button>"
      },
      {
        "type": "demo",
        "kind": "tabs",
        "title": "动手：Tabs + URL"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "pu1",
            "question": "想改地址但不堆历史用？",
            "options": [
              "hx-push-url",
              "hx-replace-url",
              "hx-history=\"false\" 仅",
              "hx-boost"
            ],
            "answer": 1,
            "explain": "replace-url。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hx-confirm",
    "title": "确认、禁用与请求头",
    "summary": "hx-confirm、disable-elt、headers。",
    "level": "进阶",
    "track": "进阶",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/attributes/hx-confirm/",
    "blocks": [
      {
        "type": "text",
        "title": "安全交互",
        "body": "删除前 hx-confirm=\"确定？\"。提交中 hx-disabled-elt=\"this\" 防连点。hx-headers 附加 CSRF 等。"
      },
      {
        "type": "code",
        "title": "确认删除",
        "lang": "html",
        "code": "<button hx-delete=\"/api/htmx/items/1\"\n  hx-confirm=\"删除这一行？\"\n  hx-target=\"closest li\"\n  hx-swap=\"outerHTML swap:0.3s\">\n  删除\n</button>"
      },
      {
        "type": "demo",
        "kind": "delete-row",
        "title": "动手：确认删除行"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "c1",
            "question": "防重复提交可用？",
            "options": [
              "hx-disabled-elt",
              "hx-ext 仅",
              "hx-get",
              "hx-preserve"
            ],
            "answer": 0,
            "explain": "禁用元素。"
          }
        ]
      }
    ]
  },
  {
    "slug": "events",
    "title": "事件与 htmx:* 钩子",
    "summary": "htmx:beforeRequest、afterSwap…",
    "level": "进阶",
    "track": "进阶",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/events/",
    "blocks": [
      {
        "type": "text",
        "title": "生命周期",
        "body": "htmx:configRequest 改参数；beforeRequest 可 preventDefault 取消；afterSwap / afterSettle 做动画与第三方控件初始化；responseError 处理错误。"
      },
      {
        "type": "code",
        "title": "监听",
        "lang": "html",
        "code": "document.body.addEventListener('htmx:afterSwap', (e) => {\n  console.log('swapped', e.detail.target)\n})"
      },
      {
        "type": "demo",
        "kind": "events",
        "title": "动手：看事件日志"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "e1",
            "question": "取消即将发出的请求？",
            "options": [
              "afterSwap prevent",
              "beforeRequest 里 preventDefault",
              "无法取消",
              "仅 reload"
            ],
            "answer": 1,
            "explain": "beforeRequest。"
          }
        ]
      }
    ]
  },
  {
    "slug": "headers",
    "title": "HTMX 请求/响应头",
    "summary": "HX-Request、HX-Redirect、HX-Trigger…",
    "level": "进阶",
    "track": "进阶",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/reference/#headers",
    "blocks": [
      {
        "type": "text",
        "title": "约定头",
        "body": "请求：HX-Request: true、HX-Target、HX-Trigger、HX-Current-URL。\n响应：HX-Redirect、HX-Refresh、HX-Trigger（触发客户端事件）、HX-Push-Url、HX-Retarget、HX-Reswap。"
      },
      {
        "type": "code",
        "title": "服务端触发 toast",
        "lang": "html",
        "code": "// 响应头\nHX-Trigger: {\"showToast\":{\"message\":\"已保存\"}}"
      },
      {
        "type": "tip",
        "body": "后端据此区分全页与片段请求，返回不同模板。"
      },
      {
        "type": "demo",
        "kind": "headers",
        "title": "动手：响应头触发事件"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "h1",
            "question": "HX-Request: true 表示？",
            "options": [
              "WebSocket",
              "htmx 发起的请求",
              "浏览器预取",
              "Service Worker"
            ],
            "answer": 1,
            "explain": "标记 htmx 请求。"
          }
        ]
      }
    ]
  },
  {
    "slug": "click-to-edit",
    "title": "模式：Click to Edit",
    "summary": "点字段变表单，保存回只读。",
    "level": "进阶",
    "track": "交互模式",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/examples/click-to-edit/",
    "blocks": [
      {
        "type": "text",
        "title": "交互",
        "body": "展示态 hx-get 编辑表单 → 提交 hx-put 返回展示态。经典 CRUD 行内编辑。"
      },
      {
        "type": "code",
        "title": "只读 → 编辑",
        "lang": "html",
        "code": "<div hx-target=\"this\" hx-swap=\"outerHTML\">\n  <div><label>名</label>: 小明</div>\n  <button hx-get=\"/api/htmx/contact/1/edit\">编辑</button>\n</div>"
      },
      {
        "type": "demo",
        "kind": "click-to-edit",
        "title": "动手：行内编辑"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "cte1",
            "question": "保存后通常 swap？",
            "options": [
              "none",
              "outerHTML 整块回展示态",
              "delete",
              "beforeend"
            ],
            "answer": 1,
            "explain": "整块换回。"
          }
        ]
      }
    ]
  },
  {
    "slug": "lazy-load",
    "title": "模式：懒加载",
    "summary": "hx-trigger=\"load\" / revealed。",
    "level": "进阶",
    "track": "交互模式",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/examples/lazy-load/",
    "blocks": [
      {
        "type": "text",
        "title": "按需加载",
        "body": "卡片占位后 load 拉取；或 revealed 进入视口再请求，省首屏。"
      },
      {
        "type": "code",
        "title": "进入视口",
        "lang": "html",
        "code": "<div hx-get=\"/api/htmx/lazy\" hx-trigger=\"revealed\" hx-swap=\"outerHTML\">\n  加载中…\n</div>"
      },
      {
        "type": "demo",
        "kind": "lazy",
        "title": "动手：懒加载"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "lz1",
            "question": "进入视口触发？",
            "options": [
              "load",
              "revealed",
              "intersect only 自写",
              "every"
            ],
            "answer": 1,
            "explain": "revealed。"
          }
        ]
      }
    ]
  },
  {
    "slug": "infinite-scroll",
    "title": "模式：无限滚动",
    "summary": "底部 sentinel + beforeend。",
    "level": "进阶",
    "track": "交互模式",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/examples/infinite-scroll/",
    "blocks": [
      {
        "type": "text",
        "title": "实现",
        "body": "最后一行带 hx-get 下一页 + hx-trigger=\"revealed\" + hx-swap=\"afterend\"，服务端返回下一批行并在末行再挂 sentinel。"
      },
      {
        "type": "code",
        "title": "Sentinel 行",
        "lang": "html",
        "code": "<tr hx-get=\"/api/htmx/rows?page=2\"\n    hx-trigger=\"revealed\"\n    hx-swap=\"afterend\">\n  <td colspan=\"2\">加载更多…</td>\n</tr>"
      },
      {
        "type": "demo",
        "kind": "infinite",
        "title": "动手：无限滚动"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "is1",
            "question": "新行追加常用 swap？",
            "options": [
              "innerHTML",
              "afterend / beforeend",
              "delete",
              "none"
            ],
            "answer": 1,
            "explain": "追加不覆盖。"
          }
        ]
      }
    ]
  },
  {
    "slug": "active-search",
    "title": "模式：即时搜索",
    "summary": "输入即查，delay 防抖。",
    "level": "入门",
    "track": "交互模式",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/examples/active-search/",
    "blocks": [
      {
        "type": "text",
        "title": "搜索框",
        "body": "keyup changed delay:300ms + 可能的 from:body。结果列表 innerHTML 替换。注意无障碍与空状态。"
      },
      {
        "type": "demo",
        "kind": "search",
        "title": "动手：即时搜索"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "as1",
            "question": "changed 修饰符？",
            "options": [
              "每次 keyup 都发",
              "值变化才发",
              "仅 blur",
              "仅 Enter"
            ],
            "answer": 1,
            "explain": "值变才触发。"
          }
        ]
      }
    ]
  },
  {
    "slug": "polling",
    "title": "模式：轮询",
    "summary": "every Ns 刷新状态。",
    "level": "进阶",
    "track": "交互模式",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/docs/#polling",
    "blocks": [
      {
        "type": "text",
        "title": "轮询",
        "body": "hx-trigger=\"every 2s\"。任务进度、仪表盘数字。停止：服务端返回 HX-Trigger 或去掉触发的元素。"
      },
      {
        "type": "code",
        "title": "每 2 秒",
        "lang": "html",
        "code": "<div hx-get=\"/api/htmx/status\" hx-trigger=\"every 2s\" hx-swap=\"innerHTML\">\n  状态…\n</div>"
      },
      {
        "type": "demo",
        "kind": "polling",
        "title": "动手：状态轮询"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "po1",
            "question": "轮询语法？",
            "options": [
              "hx-poll",
              "every 2s 写在 trigger",
              "setInterval 必须",
              "hx-ws 必须"
            ],
            "answer": 1,
            "explain": "trigger every。"
          }
        ]
      }
    ]
  },
  {
    "slug": "modal-tabs",
    "title": "模式：Tabs 与模态",
    "summary": "局部导航与对话框片段。",
    "level": "进阶",
    "track": "交互模式",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/examples/tabs-hateoas/",
    "blocks": [
      {
        "type": "text",
        "title": "Tabs",
        "body": "每个 tab 按钮 hx-get 内容区；激活态用 aria 与 class。模态：加载对话框 HTML 到 #modal，关闭即清空。"
      },
      {
        "type": "demo",
        "kind": "tabs",
        "title": "动手：Tabs"
      },
      {
        "type": "demo",
        "kind": "modal",
        "title": "动手：模态框片段"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "mt1",
            "question": "Tab 内容区稳定 target？",
            "options": [
              "每次换 body",
              "固定 #tab-panel",
              "window",
              "head"
            ],
            "answer": 1,
            "explain": "固定容器。"
          }
        ]
      }
    ]
  },
  {
    "slug": "bulk-update",
    "title": "模式：批量更新与选择",
    "summary": "多选 + 一次 POST。",
    "level": "进阶",
    "track": "交互模式",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/examples/bulk-update/",
    "blocks": [
      {
        "type": "text",
        "title": "批量",
        "body": "checkbox name=\"ids\" + 工具条按钮 hx-include 表单或 closest form，一次提交更新多行，响应 OOB 刷新。"
      },
      {
        "type": "demo",
        "kind": "bulk",
        "title": "动手：批量标记"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "bu1",
            "question": "多选字段通常？",
            "options": [
              "同名 checkbox 数组",
              "必须 JSON only",
              "仅 cookie",
              "localStorage"
            ],
            "answer": 0,
            "explain": "同名多值。"
          }
        ]
      }
    ]
  },
  {
    "slug": "forms-validation",
    "title": "表单与服务端校验",
    "summary": "错误 HTML 片段回填。",
    "level": "实战",
    "track": "全栈实训",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/examples/inline-validation/",
    "blocks": [
      {
        "type": "text",
        "title": "校验流",
        "body": "blur 时校验单字段；submit 时整表。失败返回带错误样式的同一表单片段，成功返回成功消息或 HX-Redirect。"
      },
      {
        "type": "code",
        "title": "字段校验",
        "lang": "html",
        "code": "<input name=\"email\"\n  hx-post=\"/api/htmx/validate/email\"\n  hx-trigger=\"blur\"\n  hx-target=\"next .error\"\n  hx-swap=\"innerHTML\" />\n<div class=\"error\"></div>"
      },
      {
        "type": "demo",
        "kind": "form",
        "title": "动手：表单提交"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "fv1",
            "question": "字段级校验常见 trigger？",
            "options": [
              "every 1s",
              "blur",
              "revealed",
              "load only"
            ],
            "answer": 1,
            "explain": "blur。"
          }
        ]
      }
    ]
  },
  {
    "slug": "auth-csrf",
    "title": "会话、CSRF 与安全头",
    "summary": "Cookie 会话 + CSRF token。",
    "level": "实战",
    "track": "全栈实训",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/docs/#security",
    "blocks": [
      {
        "type": "text",
        "title": "安全清单",
        "body": "• SameSite Cookie\n• CSRF：表单 hidden 或 hx-headers\n• 不在 hx-get 做变更\n• 服务端鉴权，不靠隐藏按钮\n• 输出 HTML 转义防 XSS"
      },
      {
        "type": "tip",
        "body": "HX-Request 不是安全边界，权限必须服务端校验。"
      },
      {
        "type": "demo",
        "kind": "headers",
        "title": "动手：带自定义头"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ac1",
            "question": "变更操作用 GET？",
            "options": [
              "推荐",
              "不推荐，易被缓存/预取",
              "必须",
              "仅移动端"
            ],
            "answer": 1,
            "explain": "用 POST 等。"
          }
        ]
      }
    ]
  },
  {
    "slug": "rest-hypermedia",
    "title": "REST 与超媒体 API",
    "summary": "HATEOAS：响应里带下一步操作。",
    "level": "实战",
    "track": "全栈实训",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/essays/hypermedia-driven-applications/",
    "blocks": [
      {
        "type": "text",
        "title": "HDA",
        "body": "JSON API 让客户端决定下一步；超媒体 API 在 HTML 里直接给出按钮/链接。权限变化时，服务器不再渲染「删除」即可。"
      },
      {
        "type": "demo",
        "kind": "click-to-edit",
        "title": "对照：操作由服务端下发"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "rh1",
            "question": "超媒体优势之一？",
            "options": [
              "客户端硬编码所有流程",
              "服务器可随状态改可用操作",
              "无需 HTTP",
              "去掉 HTML"
            ],
            "answer": 1,
            "explain": "UI 随状态由服务端决定。"
          }
        ]
      }
    ]
  },
  {
    "slug": "studio-quest",
    "title": "实训：笔记工坊闯关",
    "summary": "登录 → CRUD → 401 → 退出。",
    "level": "实战",
    "track": "全栈实训",
    "format": "course",
    "minutes": 15,
    "official": "https://htmx.org/examples/",
    "blocks": [
      {
        "type": "text",
        "title": "去工坊",
        "body": "打开「工坊」完成：登录、拉列表、创建/编辑/删除笔记、触发 401、退出。对照 Network 面板看请求。"
      },
      {
        "type": "tip",
        "body": "演示账号见工坊页。学完回这里打测验。"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "sq1",
            "question": "401 通常表示？",
            "options": [
              "成功",
              "未认证/令牌失效",
              "永久重定向",
              "缓存命中"
            ],
            "answer": 1,
            "explain": "未授权。"
          },
          {
            "id": "sq2",
            "question": "CRUD 中 D？",
            "options": [
              "Deploy",
              "Delete",
              "Decode",
              "Drain"
            ],
            "answer": 1,
            "explain": "Delete。"
          }
        ]
      }
    ]
  },
  {
    "slug": "backends",
    "title": "与后端框架协作",
    "summary": "Express / Django / Rails / Go / Laravel…",
    "level": "实战",
    "track": "工程化",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/docs/#web-sockets",
    "blocks": [
      {
        "type": "text",
        "title": "模板片段",
        "body": "任何能返回 HTML 的后端都行。组织：partials/ 目录；根据 HX-Request 返回 partial 或 layout。热门：Django + templates、Rails + MRR、Laravel Blade、Go html/template、ASP.NET。"
      },
      {
        "type": "code",
        "title": "Express 片段",
        "lang": "html",
        "code": "app.get('/hello', (req, res) => {\n  res.send('<p>你好 HTMX</p>')\n})"
      },
      {
        "type": "demo",
        "kind": "hello",
        "title": "本站用模拟 API 同理"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "be1",
            "question": "HTMX 要求特定后端？",
            "options": [
              "必须 Node",
              "否，任何返回 HTML 即可",
              "必须 GraphQL",
              "必须 SPA"
            ],
            "answer": 1,
            "explain": "与语言无关。"
          }
        ]
      }
    ]
  },
  {
    "slug": "debugging",
    "title": "调试与日志",
    "summary": "htmx.logAll、Network、事件。",
    "level": "实战",
    "track": "工程化",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/docs/#debugging",
    "blocks": [
      {
        "type": "text",
        "title": "工具",
        "body": "• htmx.logAll()\n• DevTools Network 看 HX-* 头\n• 检查 200 但 HTML 不符合 swap 预期\n• 确认 Content-Type 与片段结构"
      },
      {
        "type": "demo",
        "kind": "events",
        "title": "动手：事件日志"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "db1",
            "question": "全局日志方法？",
            "options": [
              "htmx.debug()",
              "htmx.logAll()",
              "console.htmx",
              "hx-log"
            ],
            "answer": 1,
            "explain": "logAll。"
          }
        ]
      }
    ]
  },
  {
    "slug": "testing",
    "title": "测试策略",
    "summary": "服务端片段单测 + E2E。",
    "level": "实战",
    "track": "工程化",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/docs/",
    "blocks": [
      {
        "type": "text",
        "title": "怎么测",
        "body": "1) 模板/片段：给定状态输出 HTML 快照\n2) 路由：HX-Request 头分支\n3) E2E：Playwright 点按钮断言 DOM\nHTMX 逻辑简单，测试重心在服务端。"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "te1",
            "question": "HTMX 应用测试重心？",
            "options": [
              "仅 CSS",
              "服务端 HTML 与 E2E",
              "仅单元测 htmx 源码",
              "忽略测试"
            ],
            "answer": 1,
            "explain": "后端片段 + E2E。"
          }
        ]
      }
    ]
  },
  {
    "slug": "deploy",
    "title": "部署与缓存注意",
    "summary": "片段缓存、CDN、版本化静态。",
    "level": "实战",
    "track": "工程化",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/docs/",
    "blocks": [
      {
        "type": "text",
        "title": "注意点",
        "body": "• 动态片段勿被 CDN 长期缓存错用户\n• Vary: HX-Request 如需\n• htmx.min.js 指纹缓存\n• HTTPS + 安全 Cookie"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "dp1",
            "question": "用户相关 HTML 片段？",
            "options": [
              "可无限 CDN 共享缓存",
              "慎用公共缓存",
              "必须 localStorage",
              "不需要 HTTP"
            ],
            "answer": 1,
            "explain": "避免串数据。"
          }
        ]
      }
    ]
  },
  {
    "slug": "extensions",
    "title": "扩展系统",
    "summary": "ws、sse、head-support、alpine…",
    "level": "进阶",
    "track": "进阶模式",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/extensions/",
    "blocks": [
      {
        "type": "text",
        "title": "扩展",
        "body": "官方/社区扩展：WebSocket、SSE、class tools、preload、response targets、alpine-morph。hx-ext=\"head-support\" 等。"
      },
      {
        "type": "code",
        "title": "声明",
        "lang": "html",
        "code": "<div hx-ext=\"sse\" sse-connect=\"/stream\" sse-swap=\"message\">\n  …\n</div>"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ex1",
            "question": "启用扩展属性？",
            "options": [
              "hx-ext",
              "hx-plugin",
              "hx-use",
              "data-ext"
            ],
            "answer": 0,
            "explain": "hx-ext。"
          }
        ]
      }
    ]
  },
  {
    "slug": "websockets-sse",
    "title": "WebSocket 与 SSE",
    "summary": "实时推送 HTML。",
    "level": "进阶",
    "track": "进阶模式",
    "format": "course",
    "minutes": 10,
    "official": "https://htmx.org/docs/#websockets",
    "blocks": [
      {
        "type": "text",
        "title": "实时",
        "body": "ws 扩展双向；SSE 服务端推 HTML 片段。适合聊天、通知、协作光标（仍以 HTML 为载荷）。"
      },
      {
        "type": "tip",
        "body": "本环境以轮询 Demo 模拟实时；生产可换 SSE。"
      },
      {
        "type": "demo",
        "kind": "polling",
        "title": "对照：轮询 vs 推送"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ws1",
            "question": "SSE 方向？",
            "options": [
              "仅客户端→服务器",
              "服务器→客户端推送",
              "仅 P2P",
              "仅 UDP"
            ],
            "answer": 1,
            "explain": "单向推送。"
          }
        ]
      }
    ]
  },
  {
    "slug": "hyperscript",
    "title": "可选：_hyperscript",
    "summary": "同作者的小脚本语言。",
    "level": "进阶",
    "track": "进阶模式",
    "format": "course",
    "minutes": 8,
    "official": "https://hyperscript.org/",
    "blocks": [
      {
        "type": "text",
        "title": "何时用",
        "body": "htmx 管请求与 swap；客户端微交互（toggle class、过渡）可用 Alpine 或 _hyperscript。别把业务规则塞进前端脚本。"
      },
      {
        "type": "code",
        "title": "示例",
        "lang": "html",
        "code": "<button _=\"on click toggle .hidden on #panel\">\n  切换\n</button>"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "hy1",
            "question": "hyperscript 定位？",
            "options": [
              "替代数据库",
              "轻量前端事件脚本",
              "CSS 预处理器",
              "包管理器"
            ],
            "answer": 1,
            "explain": "事件/DOM 微交互。"
          }
        ]
      }
    ]
  },
  {
    "slug": "performance",
    "title": "性能与体感",
    "summary": "swap 延迟、settle、预加载。",
    "level": "进阶",
    "track": "进阶模式",
    "format": "course",
    "minutes": 8,
    "official": "https://htmx.org/attributes/hx-swap/",
    "blocks": [
      {
        "type": "text",
        "title": "体感优化",
        "body": "• swap:0.3s 配合 CSS transition\n• settle 时机初始化组件\n• preload 扩展\n• 避免过大 HTML 片段\n• 列表虚拟化仍可服务端分页"
      },
      {
        "type": "demo",
        "kind": "delete-row",
        "title": "带 swap 过渡删除"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "pf1",
            "question": "swap:0.3s 作用？",
            "options": [
              "HTTP 超时",
              "交换时序/动画窗口",
              "仅缓存",
              "禁用 htmx"
            ],
            "answer": 1,
            "explain": "控制交换时机。"
          }
        ]
      }
    ]
  },
  {
    "slug": "interview",
    "title": "面试串讲",
    "summary": "HTMX vs SPA、适用边界。",
    "level": "进阶",
    "track": "进阶模式",
    "format": "course",
    "minutes": 12,
    "official": "https://htmx.org/essays/",
    "blocks": [
      {
        "type": "text",
        "title": "怎么讲",
        "body": "1) 问题：SPA 复杂度 vs 多页跳转体验\n2) HTMX：超媒体、局部更新、渐进增强\n3) 适合：CRUD 后台、内容站、内网工具\n4) 不太适合：离线重前端画布、强协作 OT、复杂客户端状态机\n5) 可与 React 岛混用"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "iv1",
            "question": "HTMX 更契合？",
            "options": [
              "纯 Canvas 游戏主循环",
              "以服务端权威的 CRUD",
              "仅区块链",
              "替代操作系统"
            ],
            "answer": 1,
            "explain": "服务端驱动 UI。"
          },
          {
            "id": "iv2",
            "question": "相对 SPA 的优势？",
            "options": [
              "必须更多 JS",
              "更简单的心智与 SEO/渐进增强",
              "不能局部更新",
              "禁止 HTML"
            ],
            "answer": 1,
            "explain": "简单与渐进增强。"
          }
        ]
      }
    ]
  },
  {
    "slug": "ref-ajax",
    "title": "AJAX 属性总览",
    "summary": "hx-get/post/… 族",
    "level": "进阶",
    "track": "官网对齐",
    "format": "reference",
    "minutes": 6,
    "official": "https://htmx.org/docs/#ajax",
    "blocks": [
      {
        "type": "text",
        "title": "知识卡片",
        "body": "AJAX 属性总览：hx-get/post/… 族。完整细节以官网为准。"
      },
      {
        "type": "tip",
        "body": "官方文档：https://htmx.org/docs/#ajax"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ref-ajax-q",
            "question": "AJAX 属性总览 属于？",
            "options": [
              "必须手写 React",
              "htmx 文档体系",
              "仅 Python",
              "废弃 API"
            ],
            "answer": 1,
            "explain": "对照官网。"
          }
        ]
      }
    ]
  },
  {
    "slug": "ref-core",
    "title": "核心属性",
    "summary": "target/swap/trigger",
    "level": "进阶",
    "track": "官网对齐",
    "format": "reference",
    "minutes": 6,
    "official": "https://htmx.org/reference/#attributes",
    "blocks": [
      {
        "type": "text",
        "title": "知识卡片",
        "body": "核心属性：target/swap/trigger。完整细节以官网为准。"
      },
      {
        "type": "tip",
        "body": "官方文档：https://htmx.org/reference/#attributes"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ref-core-q",
            "question": "核心属性 属于？",
            "options": [
              "必须手写 React",
              "htmx 文档体系",
              "仅 Python",
              "废弃 API"
            ],
            "answer": 1,
            "explain": "对照官网。"
          }
        ]
      }
    ]
  },
  {
    "slug": "ref-inherit",
    "title": "继承与 disinherit",
    "summary": "属性继承控制",
    "level": "进阶",
    "track": "官网对齐",
    "format": "reference",
    "minutes": 6,
    "official": "https://htmx.org/attributes/hx-disinherit/",
    "blocks": [
      {
        "type": "text",
        "title": "知识卡片",
        "body": "继承与 disinherit：属性继承控制。完整细节以官网为准。"
      },
      {
        "type": "tip",
        "body": "官方文档：https://htmx.org/attributes/hx-disinherit/"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ref-inherit-q",
            "question": "继承与 disinherit 属于？",
            "options": [
              "必须手写 React",
              "htmx 文档体系",
              "仅 Python",
              "废弃 API"
            ],
            "answer": 1,
            "explain": "对照官网。"
          }
        ]
      }
    ]
  },
  {
    "slug": "ref-preserve",
    "title": "hx-preserve",
    "summary": "跨 swap 保留节点",
    "level": "进阶",
    "track": "官网对齐",
    "format": "reference",
    "minutes": 6,
    "official": "https://htmx.org/attributes/hx-preserve/",
    "blocks": [
      {
        "type": "text",
        "title": "知识卡片",
        "body": "hx-preserve：跨 swap 保留节点。完整细节以官网为准。"
      },
      {
        "type": "tip",
        "body": "官方文档：https://htmx.org/attributes/hx-preserve/"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ref-preserve-q",
            "question": "hx-preserve 属于？",
            "options": [
              "必须手写 React",
              "htmx 文档体系",
              "仅 Python",
              "废弃 API"
            ],
            "answer": 1,
            "explain": "对照官网。"
          }
        ]
      }
    ]
  },
  {
    "slug": "ref-history",
    "title": "历史缓存",
    "summary": "history cache",
    "level": "进阶",
    "track": "官网对齐",
    "format": "reference",
    "minutes": 6,
    "official": "https://htmx.org/docs/#history",
    "blocks": [
      {
        "type": "text",
        "title": "知识卡片",
        "body": "历史缓存：history cache。完整细节以官网为准。"
      },
      {
        "type": "tip",
        "body": "官方文档：https://htmx.org/docs/#history"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ref-history-q",
            "question": "历史缓存 属于？",
            "options": [
              "必须手写 React",
              "htmx 文档体系",
              "仅 Python",
              "废弃 API"
            ],
            "answer": 1,
            "explain": "对照官网。"
          }
        ]
      }
    ]
  },
  {
    "slug": "ref-config",
    "title": "全局配置",
    "summary": "htmx.config",
    "level": "进阶",
    "track": "官网对齐",
    "format": "reference",
    "minutes": 6,
    "official": "https://htmx.org/docs/#config",
    "blocks": [
      {
        "type": "text",
        "title": "知识卡片",
        "body": "全局配置：htmx.config。完整细节以官网为准。"
      },
      {
        "type": "tip",
        "body": "官方文档：https://htmx.org/docs/#config"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ref-config-q",
            "question": "全局配置 属于？",
            "options": [
              "必须手写 React",
              "htmx 文档体系",
              "仅 Python",
              "废弃 API"
            ],
            "answer": 1,
            "explain": "对照官网。"
          }
        ]
      }
    ]
  },
  {
    "slug": "ref-security",
    "title": "安全",
    "summary": "XSS/CSRF 清单",
    "level": "进阶",
    "track": "官网对齐",
    "format": "reference",
    "minutes": 6,
    "official": "https://htmx.org/docs/#security",
    "blocks": [
      {
        "type": "text",
        "title": "知识卡片",
        "body": "安全：XSS/CSRF 清单。完整细节以官网为准。"
      },
      {
        "type": "tip",
        "body": "官方文档：https://htmx.org/docs/#security"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ref-security-q",
            "question": "安全 属于？",
            "options": [
              "必须手写 React",
              "htmx 文档体系",
              "仅 Python",
              "废弃 API"
            ],
            "answer": 1,
            "explain": "对照官网。"
          }
        ]
      }
    ]
  },
  {
    "slug": "ref-anim",
    "title": "动画",
    "summary": "与 CSS 过渡",
    "level": "进阶",
    "track": "官网对齐",
    "format": "reference",
    "minutes": 6,
    "official": "https://htmx.org/docs/#animation",
    "blocks": [
      {
        "type": "text",
        "title": "知识卡片",
        "body": "动画：与 CSS 过渡。完整细节以官网为准。"
      },
      {
        "type": "tip",
        "body": "官方文档：https://htmx.org/docs/#animation"
      },
      {
        "type": "quiz",
        "questions": [
          {
            "id": "ref-anim-q",
            "question": "动画 属于？",
            "options": [
              "必须手写 React",
              "htmx 文档体系",
              "仅 Python",
              "废弃 API"
            ],
            "answer": 1,
            "explain": "对照官网。"
          }
        ]
      }
    ]
  }
];

export const TRACKS = [
  "基础",
  "进阶",
  "交互模式",
  "全栈实训",
  "工程化",
  "进阶模式",
  "官网对齐",
] as const;

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const i = getLessonIndex(slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

export function getLessonsByTrack(track: Lesson["track"]) {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions(): Array<
  QuizQuestion & { lessonSlug: string; lessonTitle: string }
> {
  const out: Array<QuizQuestion & { lessonSlug: string; lessonTitle: string }> = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({
            ...q,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}

export function isCourseLesson(l: Lesson): boolean {
  if (l.format === "reference") return false;
  if (l.format === "course") return true;
  return l.track !== "官网对齐";
}

export function getCourseLessons(): Lesson[] {
  return LESSONS.filter(isCourseLesson);
}
