import { keyValues } from "../components.js";
export function settingsPage() {
  return `<div class="page-heading"><div><h1>Workspace settings</h1><p>A shared home for your team’s production.</p></div></div><section class="panel configuration-panel settings-panel"><header class="panel-heading"><h2>Studio workspace</h2></header>${keyValues(
    [
      ["Mode", "Company demo"],
      ["Language", "English"],
      ["Appearance", "Light"],
      ["Typeface", "IBM Plex Sans"],
      ["Production service", "Not connected"],
    ],
  )}</section><p class="page-note">Draft goals are stored in this browser. No information is sent to a production service.</p>`;
}
