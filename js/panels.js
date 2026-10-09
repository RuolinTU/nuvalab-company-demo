import { escapeHTML, badge, keyValues, detailList } from "./components.js";

// Drawers are only for individual records. Primary destinations live in pages/.
export function goalDetails(goal) {
  return {
    eyebrow: goal.status === "Draft" ? "DRAFT GOAL" : "ONGOING WORK",
    title: goal.title,
    body: `${badge(goal.status, goal.tone)}<h3>Objective</h3><p>${escapeHTML(goal.objective)}</p>${keyValues(
      [
        ["Trigger", goal.trigger],
        ["Context", goal.context],
        ["Review policy", goal.review],
      ],
    )}<h3>Next up</h3><p>${escapeHTML(goal.next)}</p><p class="detail-note">${goal.status === "Draft" ? "This is a local draft. It has not been submitted for production." : "Illustrative goal. No background production is running in this preview."}</p>${goal.status === "Draft" ? `<button class="button draft-discard" data-discard="${escapeHTML(goal.id)}">Discard draft</button>` : ""}`,
  };
}
export const panels = {
  preference: {
    eyebrow: "PROPOSED CHANGE",
    title: "Review a studio preference",
    body:
      badge("Awaiting review", "warning") +
      "<h3>Studio guidance</h3><p>A candidate preference is ready for your team to inspect. Changes belong to a defined context and remain traceable to the feedback that informed them.</p>" +
      keyValues([
        ["Scope", "Creative studio"],
        ["Change type", "Production guidance"],
        ["Status", "Candidate"],
      ]) +
      '<p class="detail-note">This is a proposed guidance record. The full comparison and adoption workflow will be designed separately.</p>',
  },
  help: {
    eyebrow: "ABOUT THIS WORKSPACE",
    title: "A place for ongoing production",
    body:
      "<p>Use the workspace pages to manage goals, inspect context, review learning, and monitor your deployment.</p>" +
      detailList([
        [
          "Ongoing work",
          "Open a goal to inspect its objective, trigger, and review policy.",
        ],
        [
          "Shared context",
          "Browse source material, approved references, and guidance on the Assets & memory page.",
        ],
        ["New goals", "Save a draft locally while shaping the workspace."],
      ]) +
      '<p class="detail-note">This is an interface preview with example activity. No video generation or paid API requests are made.</p>',
  },
};
