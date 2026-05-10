# Context Window

Context Window is a project memory app that turns long conversations, notes, and documents into a usable current-state view.

## Goal

Help a user answer:

- What changed?
- What decisions were made?
- What still needs attention?
- Why did we choose this path?

## MVP

- Paste or upload source text
- Generate a concise summary
- Extract decisions, action items, and open questions
- Save entries by project
- Search prior entries
- Show a simple current-state dashboard

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Project Structure

- `src/app/`: app routes and UI
- `docs/`: product and technical notes
- `scripts/`: setup or maintenance helpers
- `tests/`: test files as the app grows

## Getting Started

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Next Steps

1. Add a landing page layout that matches the product direction.
2. Define the core data model for sources, summaries, decisions, and action items.
3. Choose the first persistence layer.
4. Add ingestion and extraction flows.
