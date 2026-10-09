import { goals, activities } from "../data.js";
import { goalRow, activityItem, emptyState } from "../components.js";
import { icon } from "../icons.js";
export function workRows(state) {
  const all = [...goals, ...state.drafts];
  const visible = all.filter(
    (g) =>
      (state.filter === "all" ||
        (state.filter === "draft"
          ? g.status === "Draft"
          : g.status !== "Draft")) &&
      `${g.title} ${g.description} ${g.context}`
        .toLowerCase()
        .includes(state.query),
  );
  return visible.length
    ? visible.map(goalRow).join("")
    : emptyState(
        state.query
          ? "No matching work"
          : state.filter === "draft"
            ? "No draft goals yet"
            : "No active work",
        state.query
          ? "Try another name or clear the search."
          : "Create a goal to define your next production objective.",
      );
}
export function workPage(state) {
  return `<div class="page-heading"><div><h1>Work</h1><p>Give production a goal. Keep every run connected.</p></div><button class="button button-primary" data-new-goal>${icon("plus")}New goal</button></div>
 <section class="panel"><header class="panel-heading"><h2>Goals</h2><span class="supporting-label">${goals.length} ongoing · ${state.drafts.length} drafts</span></header><div class="work-toolbar"><div class="segmented-control" role="group" aria-label="Filter work">${[
   ["all", "All work"],
   ["active", "Active"],
   ["draft", "Drafts"],
 ]
   .map(
     ([v, l]) =>
       `<button data-filter="${v}" aria-pressed="${state.filter === v}">${l}</button>`,
   )
   .join(
     "",
   )}</div></div><div class="goal-list" id="goal-list">${workRows(state)}</div></section>
 <section class="panel section-spaced"><header class="panel-heading"><h2>Recent runs & activity</h2><span class="supporting-label">Example activity</span></header><ol class="activity-list">${activities.map(activityItem).join("")}</ol></section>`;
}
