import Link from "next/link";

import { EntryForm } from "./entry-form";

export default function NewEntryPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(201,224,214,0.95),_transparent_28%),linear-gradient(180deg,_#f7f1e8_0%,_#efe4d2_100%)] px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          <Link
            href="/"
            className="rounded-full border border-black/10 bg-surface px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            Back to home
          </Link>
          <Link
            href="/projects/context-window"
            className="rounded-full border border-black/10 bg-surface px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            Project dashboard
          </Link>
          <span>First workflow: new entry ingestion</span>
        </div>
        <EntryForm />
      </div>
    </main>
  );
}
