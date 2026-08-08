/** 对照 htmx.org 文档结构 · 左侧官网 / 右侧本站课 */

export type DocLink = {
  title: string;
  official: string;
  lessonSlug?: string;
  note?: string;
};

export type DocSection = {
  title: string;
  items: DocLink[];
};

const H = "https://htmx.org";

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Introduction",
    items: [
      { title: "Introduction", official: `${H}/docs/#introduction`, lessonSlug: "intro" },
      { title: "Installing", official: `${H}/docs/#installing`, lessonSlug: "install" },
      { title: "AJAX", official: `${H}/docs/#ajax`, lessonSlug: "ref-ajax" },
    ],
  },
  {
    title: "Core attributes",
    items: [
      { title: "hx-get", official: `${H}/attributes/hx-get/`, lessonSlug: "hx-get" },
      { title: "hx-post", official: `${H}/attributes/hx-post/`, lessonSlug: "hx-post" },
      { title: "hx-swap", official: `${H}/attributes/hx-swap/`, lessonSlug: "hx-swap" },
      { title: "hx-target", official: `${H}/attributes/hx-target/`, lessonSlug: "hx-target" },
      { title: "hx-trigger", official: `${H}/attributes/hx-trigger/`, lessonSlug: "hx-trigger" },
      { title: "hx-indicator", official: `${H}/attributes/hx-indicator/`, lessonSlug: "hx-indicator" },
      { title: "hx-vals", official: `${H}/attributes/hx-vals/`, lessonSlug: "hx-vals" },
      { title: "hx-select", official: `${H}/attributes/hx-select/`, lessonSlug: "hx-select" },
      { title: "hx-swap-oob", official: `${H}/attributes/hx-swap-oob/`, lessonSlug: "oob" },
      { title: "hx-boost", official: `${H}/attributes/hx-boost/`, lessonSlug: "hx-boost" },
      { title: "hx-push-url", official: `${H}/attributes/hx-push-url/`, lessonSlug: "hx-push-url" },
      { title: "hx-confirm", official: `${H}/attributes/hx-confirm/`, lessonSlug: "hx-confirm" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "Click to Edit", official: `${H}/examples/click-to-edit/`, lessonSlug: "click-to-edit" },
      { title: "Lazy Load", official: `${H}/examples/lazy-load/`, lessonSlug: "lazy-load" },
      { title: "Infinite Scroll", official: `${H}/examples/infinite-scroll/`, lessonSlug: "infinite-scroll" },
      { title: "Active Search", official: `${H}/examples/active-search/`, lessonSlug: "active-search" },
      { title: "Polling", official: `${H}/docs/#polling`, lessonSlug: "polling" },
      { title: "Tabs", official: `${H}/examples/tabs-hateoas/`, lessonSlug: "modal-tabs" },
      { title: "Bulk Update", official: `${H}/examples/bulk-update/`, lessonSlug: "bulk-update" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Events", official: `${H}/events/`, lessonSlug: "events" },
      { title: "Headers", official: `${H}/reference/#headers`, lessonSlug: "headers" },
      { title: "Extensions", official: `${H}/extensions/`, lessonSlug: "extensions" },
      { title: "Security", official: `${H}/docs/#security`, lessonSlug: "ref-security" },
      { title: "Config", official: `${H}/docs/#config`, lessonSlug: "ref-config" },
      { title: "Animation", official: `${H}/docs/#animation`, lessonSlug: "ref-anim" },
      { title: "History", official: `${H}/docs/#history`, lessonSlug: "ref-history" },
    ],
  },
  {
    title: "Essays & mindset",
    items: [
      {
        title: "Hypermedia-Driven Applications",
        official: `${H}/essays/hypermedia-driven-applications/`,
        lessonSlug: "rest-hypermedia",
      },
      { title: "Interview framing", official: `${H}/essays/`, lessonSlug: "interview" },
    ],
  },
];

export const DOC_BASE = H;

export function getDocsCoverage() {
  let total = 0;
  let linked = 0;
  for (const sec of DOC_SECTIONS) {
    for (const it of sec.items) {
      total += 1;
      if (it.lessonSlug) linked += 1;
    }
  }
  return {
    total,
    linked,
    percent: total === 0 ? 0 : Math.round((linked / total) * 100),
  };
}
