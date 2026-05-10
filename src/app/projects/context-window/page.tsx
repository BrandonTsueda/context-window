import Link from "next/link";

import {
  formatEntryTimestamp,
  getEntriesForProject,
  projectSlugFromName,
} from "@/lib/entries";
import { mockProject } from "@/lib/mock-project";

export default async function ProjectDashboardPage() {
  const entries = await getEntriesForProject(projectSlugFromName(mockProject.name));
  const decisionItems = entries.flatMap((entry) => entry.extraction.decisions);
  const actionItems = entries.flatMap((entry) => entry.extraction.actionItems);
  const questionItems = entries.flatMap((entry) => entry.extraction.openQuestions);
  const recentEntries = entries.slice(0, 3);
  const summary = entries[0]?.extraction.summary || mockProject.summary;
  const lastUpdated = entries[0]
    ? formatEntryTimestamp(entries[0].createdAt)
    : mockProject.lastUpdated;
  const metrics = [
    { label: "Entries", value: String(entries.length).padStart(2, "0") },
    { label: "Decisions", value: String(decisionItems.length).padStart(2, "0") },
    { label: "Action Items", value: String(actionItems.length).padStart(2, "0") },
    { label: "Open Questions", value: String(questionItems.length).padStart(2, "0") },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(201,224,214,0.95),_transparent_28%),linear-gradient(180deg,_#f7f1e8_0%,_#efe4d2_100%)] px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Project Dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {mockProject.name}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-ink-muted md:text-base">
              {mockProject.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/entries/new"
              className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-[#f8f5ef] transition hover:brightness-105"
            >
              Add new entry
            </Link>
            <Link
              href="/"
              className="rounded-full border border-black/10 bg-surface px-5 py-3 text-sm font-medium text-foreground/80 transition hover:border-accent hover:text-accent"
            >
              Home
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-black/8 bg-surface p-5 shadow-[0_12px_32px_rgba(28,34,28,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                {metric.label}
              </p>
              <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-black/8 bg-surface p-6 shadow-[0_16px_40px_rgba(28,34,28,0.06)] md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  Current state
                </p>
                <h2 className="mt-2 text-2xl font-semibold">What matters now</h2>
              </div>
              <div className="rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-accent">
                {mockProject.status}
              </div>
            </div>

            <p className="mt-5 text-base leading-8 text-ink-muted">{summary}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-surface-strong p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Last updated
                </p>
                <p className="mt-2 text-lg font-medium">{lastUpdated}</p>
              </div>
              <div className="rounded-[1.5rem] bg-surface-strong p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Recommended next move
                </p>
                <p className="mt-2 text-lg font-medium">
                  Add an entry detail page and let users edit extracted output.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] bg-[#1f2a24] p-6 text-[#f7f2e9] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b7c8be]">
              Recent entries
            </p>
            <div className="mt-5 grid gap-4">
              {recentEntries.length > 0 ? (
                recentEntries.map((entry) => (
                  <div key={entry.id} className="rounded-[1.5rem] bg-white/6 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold">{entry.title}</h2>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#d7e3da]">
                        {entry.sourceType}
                      </span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#b7c8be]">
                      {formatEntryTimestamp(entry.createdAt)}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#eef4ef]">
                      {entry.extraction.summary}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] bg-white/6 p-4 text-sm leading-7 text-[#eef4ef]">
                  No saved entries yet. Add one from the new entry flow to
                  populate this dashboard.
                </div>
              )}
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[1.75rem] border border-black/8 bg-surface p-6 shadow-[0_16px_40px_rgba(28,34,28,0.06)] md:p-8">
            <h2 className="text-xl font-semibold">Decisions</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-ink-muted">
              {(decisionItems.length > 0 ? decisionItems : mockProject.decisions).map(
                (decision) => (
                  <li key={decision} className="rounded-[1.25rem] bg-surface-strong p-4">
                    {decision}
                  </li>
                ),
              )}
            </ul>
          </article>

          <article className="rounded-[1.75rem] border border-black/8 bg-surface p-6 shadow-[0_16px_40px_rgba(28,34,28,0.06)] md:p-8">
            <h2 className="text-xl font-semibold">Action items</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-ink-muted">
              {(actionItems.length > 0 ? actionItems : mockProject.actionItems).map(
                (actionItem) => (
                  <li
                    key={actionItem}
                    className="rounded-[1.25rem] border border-black/8 bg-white/60 p-4"
                  >
                    {actionItem}
                  </li>
                ),
              )}
            </ul>
          </article>

          <article className="rounded-[1.75rem] border border-black/8 bg-surface p-6 shadow-[0_16px_40px_rgba(28,34,28,0.06)] md:p-8">
            <h2 className="text-xl font-semibold">Open questions</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-ink-muted">
              {(questionItems.length > 0 ? questionItems : mockProject.openQuestions).map(
                (question) => (
                  <li key={question} className="rounded-[1.25rem] bg-surface-strong p-4">
                    {question}
                  </li>
                ),
              )}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
