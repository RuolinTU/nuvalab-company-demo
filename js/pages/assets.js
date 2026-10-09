// Classic script: works from file:// and HTTPS. Keep private state scoped.
(() => {
  "use strict";
  window.NuvaLab = window.NuvaLab || {};
  const { badge, escapeHTML, emptyState } = window.NuvaLab.components;
  const { icon } = window.NuvaLab.icons;
  const library = [
    {
      id: "studio-guidance",
      title: "Studio production guide",
      type: "memory",
      label: "Guidance",
      context: "Creative studio",
      description:
        "The studio’s approved tone, visual conventions, and review expectations.",
      status: "Current",
      tone: "success",
      icon: "file",
    },
    {
      id: "product-brief",
      title: "Product source brief",
      type: "source",
      label: "Source material",
      context: "Product studio",
      description:
        "Approved source material and product details for ongoing storytelling.",
      status: "Approved",
      tone: "success",
      icon: "file",
    },
    {
      id: "visual-references",
      title: "Approved visual references",
      type: "reference",
      label: "References",
      context: "Product studio",
      description:
        "Shared visual direction and reusable references for the production team.",
      status: "Approved",
      tone: "success",
      icon: "folder",
    },
    {
      id: "regional-guide",
      title: "Regional language guide",
      type: "memory",
      label: "Guidance",
      context: "Global content",
      description:
        "Terminology, tone, and review ownership for regional adaptations.",
      status: "Update needed",
      tone: "warning",
      icon: "globe",
    },
  ];
  function assetsPage(state) {
    const rows = library.filter(
      (x) => state.assetFilter === "all" || x.type === state.assetFilter,
    );
    return `<div class="page-heading"><div><h1>Assets & memory</h1><p>The source material and shared knowledge behind your work.</p></div></div>
 <div class="page-tabs" role="group" aria-label="Filter library">${[
   ["all", "All context"],
   ["source", "Source material"],
   ["reference", "References"],
   ["memory", "Guidance & memory"],
 ]
   .map(
     ([v, l]) =>
       `<button data-asset-filter="${v}" aria-pressed="${state.assetFilter === v}">${l}</button>`,
   )
   .join("")}</div>
 <section class="library-grid" aria-label="Context library">${rows.length ? rows.map((x) => `<button class="panel library-card" data-library="${x.id}"><span class="library-card-top"><span class="library-icon">${icon(x.icon)}</span>${badge(x.status, x.tone)}</span><span class="library-type">${x.label}</span><strong>${x.title}</strong><span class="library-description">${escapeHTML(x.description)}</span><span class="library-context">${x.context}${icon("arrow-right")}</span></button>`).join("") : emptyState("No items in this collection", "Shared context will appear here.")}</section>
 <p class="page-note">Example library records. Source files and customer data have not been connected.</p>`;
  }

  window.NuvaLab.assets = { library, assetsPage };
})();
