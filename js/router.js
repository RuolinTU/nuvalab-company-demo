// Classic script: works from file:// and HTTPS. Keep private state scoped.
(() => {
  "use strict";
  window.NuvaLab = window.NuvaLab || {};
  const routeNames = {
    overview: "Overview",
    work: "Work",
    assets: "Assets & memory",
    learning: "Learning",
    deployment: "Deployment",
    settings: "Workspace settings",
  };
  function currentRoute() {
    const path = location.hash.replace(/^#\/?/, "").split("?")[0];
    return Object.hasOwn(routeNames, path) ? path : "overview";
  }
  function goTo(route) {
    location.hash = "/" + route;
  }
  function startRouter(onRoute) {
    window.addEventListener("hashchange", () => onRoute(currentRoute(), true));
    onRoute(currentRoute(), false);
  }

  window.NuvaLab.router = { routeNames, currentRoute, goTo, startRouter };
})();
