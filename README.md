# Closet Quest

A multiplayer styling party with a small working photo-closet beta, inspired by real dorm-room closets: forgetting what we own, where it is, and what goes together.

**Updating an existing deployment? Start with [UPDATE-FIRST.html](UPDATE-FIRST.html).** It explains uploading this complete file set to your existing GitHub repository, deploying through your existing Render service, testing the update, editing the wording, and submitting the game.

## What works

- 2–6 players join a room on separate devices, without player accounts or installation.
- Everyone styles for a shared occasion, locks a private look, reveals together, and rates occasion fit and creativity across three timed rounds.
- A shared starter wardrobe contains 27 illustrated pieces across five categories.
- **My Closet:** add a JPG/PNG/WebP photo, name, category, vibe/warmth tags, and “where is it” label. Choose the closest illustrated shape and adjust a suggested photo color.
- Browse/search saved pieces by name, tags or location; edit and remove them.
- Use illustrated personal pieces in solo styling or an unlocked multiplayer styling round. Reveal cards label personal pieces by name.
- Export and import a private closet backup; save PNG outfit cards.
- The roadmap clearly distinguishes working features from future ideas and supports an optional showcase image/video.
- Main introductory text is editable in [content.mjs](content.mjs), including switches to move the story between home and How to play.

## Honest scope

Photo handling creates a small local thumbnail and a **guided illustrated stand-in**, using existing garment shapes and a chosen color. It does not automatically trace cuts or patterns, remove backgrounds, recognize garments, generate a new avatar, or provide realistic try-on. No AI service or API key is used.

Photo thumbnails, tags and storage locations stay in local browser storage, with a 24-piece beta limit. Only a personal piece’s illustrated shape, color, name and identifier enter the shared game. Browser data is specific to that browser and origin; private sessions, browser clearing and storage restrictions can remove or prevent it. Export a backup for safekeeping. Backups contain personal photos and notes.

Game rooms and scores are temporary process memory, reset by a restart, shutdown or redeploy. A free Render service can take about a minute to wake after inactivity. Keep one server instance; this version does not use a shared database.

## Run and test

Node.js 22 or newer, with no third-party packages:

```bash
npm install
npm start
```

Open `http://localhost:3000`. Separate browser profiles, private windows or devices represent separate players.

```bash
npm test
```

Tests cover game rules, private previews, authenticated updates, timers, ratings, custom illustration validation, local storage, backup import, and exclusion of photos/locations from shared state. The deployment also needs the visual/photo acceptance test in the update guide.

## Deploy on Render

Use a Node **Web Service**, Build Command `npm install`, Start Command `npm start`, and a blank Root Directory when `package.json` is at the repository root. No environment variables are required; the server uses the platform’s `PORT` and binds to `0.0.0.0`. Health endpoint: `/health`. `render.yaml` is optional Blueprint configuration.

Upload all project files together. New modules must be served by the updated server. See [Render’s documentation](https://render.com/docs/deploy-node-express-app) and [free-service limits](https://render.com/docs/free).

## Edit and customize

| File | Purpose |
| --- | --- |
| `content.mjs` | Main wording, story placement, optional showcase path/caption |
| `app.mjs` | Navigation and game views |
| `closet-ui.mjs` | Photo preparation, closet interface and roadmap |
| `closet-store.mjs` | Local data validation, storage and backups |
| `catalog.mjs` | Starter items, tags, categories and occasions |
| `art.mjs` | SVG character, garment shapes and custom colors |
| `game.mjs` | Authoritative multiplayer state and scoring |
| `server.mjs` | HTTP routes, authenticated API and server-sent updates |
| `index.html`, `styles.css` | Page metadata, help rules and visual layout |

Created by Thu Ha Nguyen with ChatGPT. Built with JavaScript, Node.js, HTML, CSS, SVG, Canvas and server-sent events.
