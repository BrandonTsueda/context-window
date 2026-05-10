import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(201,224,214,0.95),_transparent_28%),linear-gradient(180deg,_#f7f1e8_0%,_#efe4d2_100%)] px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-black/8 bg-surface shadow-[0_20px_60px_rgba(28,34,28,0.08)]">
          <div className="grid gap-8 p-8 md:grid-cols-[1.15fr_0.85fr] md:p-12">
            <div className="flex flex-col gap-6">
              <span className="w-fit rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Context Window
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                  Turn messy project history into a view you can actually use.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink-muted">
                  Context Window helps teams and individuals turn conversations,
                  notes, and documents into a clear record of decisions, action
                  items, and unresolved questions.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/entries/new"
                  className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-[#f8f5ef] transition hover:brightness-105"
                >
                  Start a new entry
                </Link>
                <Link
                  href="/projects/context-window"
                  className="rounded-full border border-black/10 bg-surface px-5 py-3 text-sm font-medium text-foreground/80 transition hover:border-accent hover:text-accent"
                >
                  Open project dashboard
                </Link>
                <div className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-foreground/80">
                  Next.js + TypeScript + Tailwind
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-[#1f2a24] p-5 text-[#f7f2e9] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="mb-4 flex items-center justify-between text-sm text-[#d9e3db]">
                <span>Current State Preview</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em]">
                  Mock
                </span>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/6 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#b7c8be]">
                    Summary
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#eef4ef]">
                    The latest discussion aligned on shipping a lightweight
                    dashboard first, with extraction focused on summaries,
                    decisions, action items, and open questions.
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    ["Decisions", "Use a saved project view"],
                    ["Action Items", "Build ingestion flow"],
                    ["Open Questions", "Choose first persistence layer"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-white/6 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#b7c8be]">
                        {label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#eef4ef]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Ingest",
              body: "Paste conversations, notes, or documents into a project entry.",
            },
            {
              title: "Extract",
              body: "Turn unstructured text into summaries, decisions, actions, and questions.",
            },
            {
              title: "Retrieve",
              body: "Search prior context and see what matters now without rereading everything.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-[1.5rem] border border-black/8 bg-surface p-6 shadow-[0_12px_32px_rgba(28,34,28,0.06)]"
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-3 leading-7 text-ink-muted">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[1.75rem] border border-dashed border-black/12 bg-surface-strong p-8">
          <h2 className="text-2xl font-semibold">Next build steps</h2>
          <ol className="mt-4 grid gap-3 text-ink-muted md:grid-cols-2">
            <li>1. Build the new entry flow.</li>
            <li>2. Add a project dashboard shell.</li>
            <li>3. Define a persistence layer.</li>
            <li>4. Add AI extraction for structured output.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
