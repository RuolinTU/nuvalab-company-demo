// Classic script: works from file:// and HTTPS. Keep private state scoped.
(() => {
  "use strict";
  window.NuvaLab = window.NuvaLab || {};
  const { icon } = window.NuvaLab.icons;
  const escapeHTML = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  function badge(label, tone = "neutral") {
    return `<span class="badge badge-${tone}"><span class="badge-dot"></span>${escapeHTML(label)}</span>`;
  }
  function metric({ label, value, note, icon: name }) {
    return `<div class="metric-card"><div class="metric-top"><span>${escapeHTML(label)}</span>${icon(name)}</div><span class="metric-value">${escapeHTML(value)}</span><span class="metric-note">${escapeHTML(note)}</span></div>`;
  }
  function goalRow(goal) {
    return `<button class="goal-row" data-goal="${escapeHTML(goal.id)}" aria-label="View ${escapeHTML(goal.title)}"><span class="goal-icon">${icon(goal.icon)}</span><span class="goal-content"><span class="goal-title-line"><span class="goal-title">${escapeHTML(goal.title)}</span>${badge(goal.status, goal.tone)}</span><span class="goal-description">${escapeHTML(goal.description)}</span><span class="goal-meta">${icon(goal.trigger === "On source update" ? "link" : "clock")}<span>${escapeHTML(goal.trigger)}</span><span class="meta-separator">·</span><span>${escapeHTML(goal.context)}</span></span></span>${icon("chevron")}</button>`;
  }
  function attentionItem(item) {
    return `<article class="attention-item"><span class="attention-category">${icon(item.icon)}${escapeHTML(item.category)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p><a class="text-button" href="#/${item.id === "preference" ? "learning" : "assets"}">${escapeHTML(item.action)}${icon("arrow-right")}</a></article>`;
  }
  function activityItem(item) {
    return `<li class="activity-item"><span class="activity-icon">${icon(item.icon)}</span><div class="activity-content"><p>${escapeHTML(item.title)}</p><span>${escapeHTML(item.detail)}</span></div><span class="activity-time">${escapeHTML(item.time)}</span></li>`;
  }
  function keyValues(pairs) {
    return `<dl class="key-values">${pairs.map(([key, value]) => `<div><dt>${escapeHTML(key)}</dt><dd>${escapeHTML(value)}</dd></div>`).join("")}</dl>`;
  }
  function detailList(items) {
    return `<ul class="detail-list">${items.map(([title, description]) => `<li><strong>${escapeHTML(title)}</strong><p>${escapeHTML(description)}</p></li>`).join("")}</ul>`;
  }
  function emptyState(title, description) {
    return `<div class="empty-state"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(description)}</p></div>`;
  }

  window.NuvaLab.components = {
    escapeHTML,
    badge,
    metric,
    goalRow,
    attentionItem,
    activityItem,
    keyValues,
    detailList,
    emptyState,
  };
})();
