"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import type { StoredEntry } from "@/lib/entries";

const sourceTypes = [
  "Conversation",
  "Meeting notes",
  "Spec document",
  "Research notes",
  "Mixed context",
];

export function EntryForm() {
  const [savedEntry, setSavedEntry] = useState<StoredEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const nextSubmission = {
      projectName: String(formData.get("projectName") || "").trim(),
      sourceType: String(formData.get("sourceType") || "").trim(),
      content: String(formData.get("content") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
    };

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextSubmission),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "Unable to save entry.");
      }

      const payload = (await response.json()) as { entry: StoredEntry };
      setSavedEntry(payload.entry);
      event.currentTarget.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save entry.";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form
        className="rounded-[1.75rem] border border-black/8 bg-surface p-6 shadow-[0_16px_40px_rgba(28,34,28,0.06)] md:p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            New Entry
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Ingest project context
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-ink-muted md:text-base">
            Start by pasting the raw material. This screen is the first step
            toward turning messy conversations and notes into structured project
            memory.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium">Project name</span>
            <input
              required
              name="projectName"
              placeholder="Context Window"
              className="rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/12"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">Source type</span>
            <select
              name="sourceType"
              defaultValue={sourceTypes[0]}
              className="rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/12"
            >
              {sourceTypes.map((sourceType) => (
                <option key={sourceType} value={sourceType}>
                  {sourceType}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">Raw content</span>
            <textarea
              required
              name="content"
              rows={12}
              placeholder="Paste a transcript, note dump, or document excerpt here..."
              className="resize-y rounded-[1.5rem] border border-black/10 bg-white/75 px-4 py-4 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/12"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">Optional notes</span>
            <textarea
              name="notes"
              rows={4}
              placeholder="Anything the extractor should pay attention to?"
              className="resize-y rounded-[1.5rem] border border-black/10 bg-white/75 px-4 py-4 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/12"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-[#f8f5ef] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? "Saving entry..." : "Run mock extraction"}
          </button>
          <p className="text-sm text-ink-muted">
            This stores a local entry and returns mock extracted output.
          </p>
        </div>

        {errorMessage ? (
          <div className="mt-4 rounded-2xl border border-[#b84c3a]/20 bg-[#fff1ed] px-4 py-3 text-sm text-[#8f3b2d]">
            {errorMessage}
          </div>
        ) : null}
      </form>

      <aside className="grid gap-6">
        <section className="rounded-[1.75rem] bg-[#1f2a24] p-6 text-[#f7f2e9] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Structured preview</h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#d7e3da]">
              Local
            </span>
          </div>

          {savedEntry ? (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#b7c8be]">
                  Project
                </p>
                <p className="mt-2 text-sm leading-6 text-[#eef4ef]">
                  {savedEntry.projectName || "Untitled project"}
                </p>
              </div>
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#b7c8be]">
                  Source type
                </p>
                <p className="mt-2 text-sm leading-6 text-[#eef4ef]">
                  {savedEntry.sourceType}
                </p>
              </div>
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#b7c8be]">
                  Extracted summary
                </p>
                <p className="mt-2 text-sm leading-7 text-[#eef4ef]">
                  {savedEntry.extraction.summary}
                </p>
              </div>
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#b7c8be]">
                  Decisions
                </p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-[#eef4ef]">
                  {savedEntry.extraction.decisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#b7c8be]">
                  Action items
                </p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-[#eef4ef]">
                  {savedEntry.extraction.actionItems.map((actionItem) => (
                    <li key={actionItem}>{actionItem}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#b7c8be]">
                  Open questions
                </p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-[#eef4ef]">
                  {savedEntry.extraction.openQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-accent/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#d7e3da]">
                  Saved locally
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${savedEntry.projectSlug}`}
                    className="rounded-full bg-[#f7f2e9] px-4 py-2 text-sm font-medium text-[#1f2a24] transition hover:brightness-95"
                  >
                    View project dashboard
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-[#d7e3da]">
              Submit the form to preview a mock structured extraction before we
              connect a real extraction backend.
            </p>
          )}
        </section>

        <section className="rounded-[1.75rem] border border-black/8 bg-surface-strong p-6 md:p-8">
          <h2 className="text-lg font-semibold">What this unlocks next</h2>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-ink-muted">
            <p>1. Dashboard now reads from saved entries.</p>
            <p>2. Replace the mock generator with a real extraction API.</p>
            <p>3. Render a structured entry detail page.</p>
            <p>4. Build the current-state dashboard from saved outputs.</p>
          </div>
        </section>
      </aside>
    </div>
  );
}
