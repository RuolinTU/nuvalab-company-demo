import { hydrateIcons, icon } from "./icons.js";
import { goals, navigation } from "./data.js";
import { escapeHTML, keyValues } from "./components.js";
import { panels, goalDetails } from "./panels.js";
import { routeNames, currentRoute, goTo, startRouter } from "./router.js";
import { overviewPage } from "./pages/overview.js";
import { workPage, workRows } from "./pages/work.js";
import { assetsPage, library } from "./pages/assets.js";
import { learningPage } from "./pages/learning.js";
import { deploymentPage } from "./pages/deployment.js";
import { settingsPage } from "./pages/settings.js";

const STORAGE_KEY = "nuvalab:company-demo:draft-goals:v1";
const state = {
  route: "overview",
  filter: "all",
  query: "",
  assetFilter: "all",
  drafts: [],
};
const main = document.querySelector("#main");
const detailDialog = document.querySelector("#detail-dialog");
const goalDialog = document.querySelector("#goal-dialog");
const form = document.querySelector("#goal-form");
const search = document.querySelector("#workspace-search");
let toastTimer;
function validDraft(d) {
  return (
    d &&
    typeof d.id === "string" &&
    d.id.startsWith("draft-") &&
    typeof d.title === "string" &&
    d.title.trim().length > 0 &&
    d.title.length <= 80 &&
    typeof d.objective === "string" &&
    d.objective.trim().length > 0 &&
    d.objective.length <= 1200 &&
    ["On request", "Daily", "Weekly", "When a source is updated"].includes(
      d.trigger,
    ) &&
    ["Review all outputs", "Review exceptions"].includes(d.review)
  );
}
function normalizeDraft(d) {
  return {
    id: d.id,
    title: d.title,
    objective: d.objective,
    trigger: d.trigger,
    review: d.review,
    description: d.objective,
    status: "Draft",
    tone: "neutral",
    icon: "flag",
    context: "Studio workspace",
    next: "Connect a production service before starting this goal.",
    outputs: 0,
  };
}
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (Array.isArray(saved))
    state.drafts = saved.filter(validDraft).slice(0, 100).map(normalizeDraft);
} catch {
  /* Browsing remains available without local storage. */
}
function persistDrafts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.drafts));
    return true;
  } catch {
    return false;
  }
}
function showToast(message) {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 4500);
}
function openPanel(panel) {
  document.querySelector("#detail-eyebrow").textContent = panel.eyebrow;
  document.querySelector("#detail-title").textContent = panel.title;
  document.querySelector("#detail-content").innerHTML = panel.body;
  if (!detailDialog.open) detailDialog.showModal();
}
const pageRenderers = {
  overview: overviewPage,
  work: workPage,
  assets: assetsPage,
  learning: learningPage,
  deployment: deploymentPage,
  settings: settingsPage,
};
function renderPage(route = state.route, focus = false) {
  state.route = route;
  detailDialog.close();
  goalDialog.close();
  main.innerHTML =
    pageRenderers[route](state) +
    `<footer class="page-footer"><span>NuvaLab <span class="footer-separator">/</span> Production that learns.</span><span>Preview workspace · illustrative content</span></footer>`;
  document.title = routeNames[route] + " · NuvaLab";
  document.querySelector("#page-breadcrumb").textContent = routeNames[route];
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.dataset.nav === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  search.value = route === "work" ? state.query : "";
  if (focus && document.activeElement !== search) {
    window.scrollTo({ top: 0, behavior: "instant" });
    main.focus({ preventScroll: true });
  }
}
document.querySelector("#main-nav").innerHTML = navigation
  .map(
    (n) =>
      `<a class="nav-item" href="#/${n.id}" data-nav="${n.id}">${icon(n.icon)}<span>${n.label}</span></a>`,
  )
  .join("");
hydrateIcons();
startRouter(renderPage);
document.querySelector(".skip-link").addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
});
document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.hasAttribute("data-new-goal")) {
    form.reset();
    document.querySelector("#form-error").hidden = true;
    goalDialog.showModal();
    return;
  }
  if (button.dataset.panel && panels[button.dataset.panel])
    openPanel(panels[button.dataset.panel]);
  if (button.dataset.goal) {
    const g = [...goals, ...state.drafts].find(
      (x) => x.id === button.dataset.goal,
    );
    if (g) openPanel(goalDetails(g));
  }
  if (button.dataset.library) {
    const x = library.find((x) => x.id === button.dataset.library);
    if (x)
      openPanel({
        eyebrow: x.label.toUpperCase(),
        title: x.title,
        body: `<p>${escapeHTML(x.description)}</p>${keyValues([
          ["Context", x.context],
          ["Status", x.status],
        ])}<p class="detail-note">Illustrative library record. The source file is not connected to this preview.</p>`,
      });
  }
  if (button.dataset.filter) {
    state.filter = button.dataset.filter;
    renderPage();
    main.querySelector(`[data-filter="${state.filter}"]`).focus();
  }
  if (button.dataset.assetFilter) {
    state.assetFilter = button.dataset.assetFilter;
    renderPage();
    main.querySelector(`[data-asset-filter="${state.assetFilter}"]`).focus();
  }
  if (button.dataset.discard) {
    state.drafts = state.drafts.filter((d) => d.id !== button.dataset.discard);
    const saved = persistDrafts();
    renderPage();
    showToast(
      saved
        ? "Draft discarded."
        : "Draft removed for this session. Browser storage is unavailable.",
    );
  }
});
document
  .querySelector("#close-detail")
  .addEventListener("click", () => detailDialog.close());
document
  .querySelector("#help-button")
  .addEventListener("click", () => openPanel(panels.help));
["close-goal", "cancel-goal"].forEach((id) =>
  document
    .getElementById(id)
    .addEventListener("click", () => goalDialog.close()),
);
[detailDialog, goalDialog].forEach((d) =>
  d.addEventListener("click", (e) => {
    if (e.target !== d) return;
    const r = d.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      d.close();
  }),
);
search.addEventListener("input", () => {
  state.query = search.value.trim().toLowerCase();
  if (currentRoute() !== "work") {
    state.filter = "all";
    goTo("work");
  } else document.querySelector("#goal-list").innerHTML = workRows(state);
});
document.addEventListener("keydown", (e) => {
  if (
    (e.ctrlKey || e.metaKey) &&
    e.key.toLowerCase() === "k" &&
    !detailDialog.open &&
    !goalDialog.open
  ) {
    e.preventDefault();
    search.focus();
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const draft = normalizeDraft({
    id: "draft-" + crypto.randomUUID(),
    title: data.get("title").trim(),
    objective: data.get("objective").trim(),
    trigger: data.get("trigger"),
    review: data.get("review"),
  });
  const error = document.querySelector("#form-error");
  if (!validDraft(draft)) {
    error.textContent = "Add a goal name and objective before saving.";
    error.hidden = false;
    return;
  }
  if (state.drafts.length >= 100) {
    error.textContent = "This preview supports up to 100 local drafts.";
    error.hidden = false;
    return;
  }
  state.drafts.push(draft);
  const saved = persistDrafts();
  state.filter = "draft";
  state.query = "";
  goalDialog.close();
  if (currentRoute() === "work") renderPage();
  else goTo("work");
  showToast(
    saved
      ? "Draft goal saved in this browser."
      : "Draft added for this session. Browser storage is unavailable.",
  );
});
