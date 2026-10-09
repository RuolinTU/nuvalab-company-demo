import { badge, keyValues } from "../components.js";
import { icon } from "../icons.js";
export function deploymentPage() {
  return `<div class="page-heading"><div><h1>Deployment</h1><p>Your capacity, models, and production economics.</p></div>${badge("Not connected")}</div>
 <section class="deployment-banner"><div class="deployment-symbol">${icon("server")}</div><div><h2>Dedicated to your workload.</h2><p>Connect a production environment to see its capacity and performance here.</p></div></section>
 <div class="two-column section-spaced"><section class="panel configuration-panel"><header class="panel-heading"><h2>Environment</h2></header>${keyValues(
   [
     ["Model endpoint", "Not configured"],
     ["Compute capacity", "Not connected"],
     ["Active model", "Not configured"],
   ],
 )}</section><section class="panel configuration-panel"><header class="panel-heading"><h2>Data & connections</h2></header>${keyValues(
   [
     ["Source systems", "Not connected"],
     ["Customer data boundary", "Not configured"],
     ["API / MCP access", "Not configured"],
   ],
 )}</section></div>
 <section class="panel section-spaced"><header class="panel-heading"><div><h2>Production economics</h2><p>Measured against accepted output.</p></div><span class="supporting-label">Awaiting connection</span></header><div class="economics-grid">${[
   ["Cost per accepted second", "Including compute and retries"],
   ["Accepted output per hour", "At the required quality"],
   ["End-to-end delivery", "From request to completed output"],
 ]
   .map(([l, n]) => `<div><h3>${l}</h3><strong>—</strong><p>${n}</p></div>`)
   .join("")}</div></section>`;
}
