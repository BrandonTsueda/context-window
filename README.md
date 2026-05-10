# Context Window

Context Window is a project memory app that turns long conversations, notes, and documents into a usable current-state view.

## Goal

Help a user answer:

- What changed?
- What decisions were made?
- What still needs attention?
- Why did we choose this path?

## MVP

- Paste source text.
- Generate a concise mock extraction.
- Extract decisions, action items, and open questions.
- Save entries by project using a local JSON-backed API.
- Review saved entries from the dashboard.
- Run as a web app or packaged Electron desktop app.

## Stack

- Next.js
- TypeScript
- App Router
- Electron
- Local file-backed persistence

## Project Structure

- `src/app/`: app routes and UI
- `docs/`: product and technical notes
- `scripts/`: setup or maintenance helpers
- `tests/`: test files as the app grows

## Getting Started

```powershell
cd C:\dev\Repos\context-window
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Desktop Build

```powershell
cd C:\dev\Repos\context-window
npm run desktop:build
```

The packaged output is generated under `release/`, which is intentionally ignored by Git.

## Verification

```powershell
npm run lint
npm run build
```

## Next Steps

1. Replace mock extraction with a local or API-backed summarization engine.
2. Add project filters and full-text search.
3. Add import/export for saved context.
4. Add backup and sync options for the local data file.

## Portfolio Notes

- Shows product thinking around operational memory and project continuity.
- Demonstrates Next.js App Router, local persistence, and Electron packaging.
- Useful as a bridge between infrastructure notes, coding context, and reusable decision history.
