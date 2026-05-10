export const mockProject = {
  id: "context-window",
  name: "Context Window",
  description:
    "A project memory app that turns conversations, notes, and documents into a clear current-state view.",
  status: "Planning MVP",
  lastUpdated: "May 9, 2026",
  summary:
    "The project is focused on building the first ingestion and dashboard workflows before persistence and extraction are wired in.",
  decisions: [
    "Use Next.js and TypeScript for the first build.",
    "Start with a paste-first ingestion flow instead of file parsing.",
    "Represent extracted output as summaries, decisions, action items, and open questions.",
    "Keep the first dashboard project-centric rather than user-centric.",
  ],
  actionItems: [
    "Persist submitted entries instead of showing a local preview only.",
    "Design an entry detail screen for extracted output.",
    "Choose the first database layer.",
    "Define the extraction API contract.",
  ],
  openQuestions: [
    "Should uploaded files be part of the MVP or phase two?",
    "Do projects need tags from day one?",
    "Should extraction run synchronously or as a background job?",
    "What is the minimal useful search experience for launch?",
  ],
};
