export const routeNames = {
  overview: "Overview",
  work: "Work",
  assets: "Assets & memory",
  learning: "Learning",
  deployment: "Deployment",
  settings: "Workspace settings",
};
export function currentRoute() {
  const path = location.hash.replace(/^#\/?/, "").split("?")[0];
  return Object.hasOwn(routeNames, path) ? path : "overview";
}
export function goTo(route) {
  location.hash = "/" + route;
}
export function startRouter(onRoute) {
  window.addEventListener("hashchange", () => onRoute(currentRoute(), true));
  onRoute(currentRoute(), false);
}
