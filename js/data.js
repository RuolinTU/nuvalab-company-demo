// Illustrative homepage content, not telemetry. Kept separate from components.
export const goals = [
  {
    id: "product-updates",
    title: "Product storytelling",
    description: "Turn approved product updates into short videos.",
    status: "Running",
    tone: "success",
    icon: "video",
    trigger: "On source update",
    context: "Product studio",
    objective:
      "Create clear, consistent videos from approved source material. Use the studio style guide and approved visual references.",
    review: "Review exceptions",
    next: "Prepare the latest source update for review.",
    outputs: 8,
  },
  {
    id: "localization",
    title: "Regional adaptations",
    description: "Adapt approved content for different audiences.",
    status: "Needs input",
    tone: "warning",
    icon: "globe",
    trigger: "On request",
    context: "Global content",
    objective:
      "Adapt approved source videos to regional language and style requirements while retaining the original message.",
    review: "Review all outputs",
    next: "Waiting for the updated regional language guide.",
    outputs: 4,
  },
  {
    id: "exploration",
    title: "Creative exploration",
    description: "Explore new directions within a shared creative brief.",
    status: "Scheduled",
    tone: "info",
    icon: "spark",
    trigger: "Weekly",
    context: "Creative studio",
    objective:
      "Explore a small set of distinct visual directions against the current brief, using the agreed production allocation.",
    review: "Review all outputs",
    next: "The next run follows priority production.",
    outputs: 0,
  },
];
export const attention = [
  {
    id: "preference",
    category: "Preference review",
    icon: "spark",
    title: "A style preference is ready to review",
    description:
      "A proposed update to your studio guidance is waiting for the team.",
    action: "Review preference",
  },
  {
    id: "source",
    category: "Missing context",
    icon: "file",
    title: "Regional guidance needs an update",
    description:
      "Regional adaptations is waiting for an approved language guide.",
    action: "View requirements",
  },
];
export const activities = [
  {
    icon: "check",
    title: "Product storytelling is ready for review",
    detail: "8 outputs · Product studio",
    time: "24 min ago",
  },
  {
    icon: "spark",
    title: "A style preference was proposed",
    detail: "Candidate update · Studio guidance",
    time: "1 hour ago",
  },
  {
    icon: "folder",
    title: "Approved references were added to a run",
    detail: "Shared assets · Product storytelling",
    time: "2 hours ago",
  },
];
export const navigation = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "work", label: "Work", icon: "layers" },
  { id: "assets", label: "Assets & memory", icon: "folder" },
  { id: "learning", label: "Learning", icon: "spark" },
  { id: "deployment", label: "Deployment", icon: "server" },
];
