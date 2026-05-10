import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildMockExtraction, type MockExtraction } from "./mock-extraction";

export type EntryInput = {
  projectName: string;
  sourceType: string;
  content: string;
  notes: string;
};

export type StoredEntry = EntryInput & {
  id: string;
  projectSlug: string;
  title: string;
  createdAt: string;
  extraction: MockExtraction;
};

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "entries.local.json");

function slugifyProjectName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildEntryTitle(input: EntryInput) {
  const firstLine = input.content
    .split(/\n+/)
    .map((line) => line.trim())
    .find(Boolean);

  if (firstLine) {
    return firstLine.slice(0, 72);
  }

  return `${input.sourceType} entry`;
}

async function ensureDataFile() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, "[]\n", "utf8");
  }
}

export async function getEntries() {
  await ensureDataFile();
  const raw = await readFile(dataFile, "utf8");
  return JSON.parse(raw) as StoredEntry[];
}

export async function getEntriesForProject(projectSlug: string) {
  const entries = await getEntries();
  return entries.filter((entry) => entry.projectSlug === projectSlug);
}

export async function createEntry(input: EntryInput) {
  const entries = await getEntries();
  const entry: StoredEntry = {
    ...input,
    id: crypto.randomUUID(),
    projectSlug: slugifyProjectName(input.projectName),
    title: buildEntryTitle(input),
    createdAt: new Date().toISOString(),
    extraction: buildMockExtraction(input),
  };

  await writeFile(dataFile, `${JSON.stringify([entry, ...entries], null, 2)}\n`, "utf8");
  return entry;
}

export function formatEntryTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function projectSlugFromName(name: string) {
  return slugifyProjectName(name);
}
