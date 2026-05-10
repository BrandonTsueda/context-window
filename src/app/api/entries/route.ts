import { NextResponse } from "next/server";

import { createEntry, type EntryInput } from "@/lib/entries";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<EntryInput>;
  const projectName = String(payload.projectName || "").trim();
  const sourceType = String(payload.sourceType || "").trim();
  const content = String(payload.content || "").trim();
  const notes = String(payload.notes || "").trim();

  if (!projectName || !sourceType || !content) {
    return NextResponse.json(
      { error: "projectName, sourceType, and content are required." },
      { status: 400 },
    );
  }

  const entry = await createEntry({
    projectName,
    sourceType,
    content,
    notes,
  });

  return NextResponse.json({ entry }, { status: 201 });
}
