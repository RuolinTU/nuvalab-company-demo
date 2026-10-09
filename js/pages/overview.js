// Classic script: works from file:// and HTTPS. Keep private state scoped.
(() => {
  "use strict";
  window.NuvaLab = window.NuvaLab || {};
  const { goals, attention } = window.NuvaLab.data;
  const { metric, escapeHTML, badge, attentionItem } =
    window.NuvaLab.components;
  const { icon } = window.NuvaLab.icons;
  function overviewPage() {
    return `<div class="page-heading"><div><h1>Overview</h1><p>What’s moving. What needs you. What comes next.</p></div><button class="button button-primary" data-new-goal>${icon("plus")}New goal</button></div>
  <section class="summary-grid" aria-label="Workspace summary">${[
    {
      label: "Ready for review",
      value: 12,
      note: "Outputs across two goals",
      icon: "inbox",
    },
    {
      label: "Ongoing goals",
      value: 3,
      note: "Working toward your objectives",
      icon: "layers",
    },
    {
      label: "Needs your attention",
      value: 2,
      note: "Decisions for your team",
      icon: "flag",
    },
  ]
    .map(metric)
    .join("")}</section>
  <div class="overview-grid"><section class="panel"><header class="panel-heading"><h2>Needs your attention</h2><span class="count-label">2</span></header>${attention.map(attentionItem).join("")}</section>
  <section class="panel"><header class="panel-heading"><h2>Ongoing work</h2><a class="text-button" href="#/work">View all ${icon("arrow-right")}</a></header><div class="compact-goals">${goals.map((g) => `<button class="compact-goal" data-goal="${g.id}"><span class="compact-goal-top"><strong>${escapeHTML(g.title)}</strong>${badge(g.status, g.tone)}</span><span>${escapeHTML(g.context)}</span></button>`).join("")}</div><footer class="panel-footer">Your goals keep their context between runs.</footer></section></div>`;
  }

  window.NuvaLab.overview = { overviewPage };
})();
