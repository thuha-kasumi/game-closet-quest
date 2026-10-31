# Closet Quest

A multiplayer styling party inspired by a real dorm-room problem: owning clothes you forget about, then struggling to imagine what goes together.

**Start with [START-HERE.html](START-HERE.html).** Download it and open it in your browser for the beginner publishing guide and submission text. No local coding software is required for the GitHub → Render route.

## Play

2–6 players join one room on separate phones or laptops. Everyone styles an illustrated avatar for the same occasion, keeps their look secret, and locks it in. All looks reveal together. Players rate each other outfit for occasion fit and creativity, then play three rounds. Tied totals share the win.

- Six-character room codes and shareable invitation links
- Server-sent events synchronize phases, readiness, reveals, and results
- 27 illustrated clothing pieces across five categories
- Two-minute styling and 90-second voting deadlines, enforced by the server
- Optional custom first occasion; a rotating set of built-in prompts
- Avatar skin/hair choices, keyword filters, and outfit captions
- No self-votes, repeat ballots, or access to other players’ unrevealed outfits
- Automatic host transfer when a host stops checking in
- PNG outfit-card download and solo wardrobe preview
- Mobile layouts, visible focus states, and built-in instructions

## Run locally (optional)

Requires Node.js 22 or newer. No third-party packages, database, credentials, or AI API keys.

```bash
npm install
npm start
```

Open `http://localhost:3000`. Test separate players in separate browser profiles/private windows or on separate devices. Tabs in the same browser may copy session storage when duplicated; a private window is clearer for testing.

```bash
npm test
```

Tests cover authorization, private previews, player limits, timers, voting, scores, host transfer, and the HTTP/SSE transport. Visual and cross-device acceptance must also be checked on the deployed link.

## Deploy

Upload the extracted project files to the root of a GitHub repository. On Render, create a **Web Service**, connect the repository, select Node, use `npm install` as Build Command and `npm start` as Start Command, and choose the Free instance if offered. Leave Root Directory blank when `package.json` is at the repository root. `render.yaml` is included for optional Blueprint deployment, but the manual Web Service form is the beginner route.

The server binds to `0.0.0.0` and Render’s `PORT`. `/health` is the health-check endpoint. Keep this deployment to one instance because rooms live in process memory.

## Scope and limits

This is a playable first edition, not a full personal wardrobe organizer. It uses a shared starter wardrobe, not uploaded clothing photos, generated avatars, virtual try-on, or an AI stylist. Filters match explicit names and tags.

Rooms and scores are temporary: server restarts, redeploys, or free-service shutdowns reset them. A free Render service sleeps after inactivity and can take about a minute to wake. New groups can create fresh rooms after it wakes. No long-term wardrobe or score storage is promised. Player tokens live in session storage so a normal refresh can reconnect while the room still exists.

See [Render’s free-service documentation](https://render.com/docs/free). Free hosting is subject to account availability, usage limits, and the provider’s current terms; do not select a paid plan unintentionally.

## Project structure

| File | Purpose |
| --- | --- |
| `server.mjs` | HTTP server, authenticated API, and live SSE updates |
| `game.mjs` | Authoritative room, phase, timer, and scoring logic |
| `catalog.mjs` | Clothing items, categories, tags, and occasion prompts |
| `art.mjs` | Original SVG clothing and avatar drawing code |
| `app.mjs` | Browser interface and player interactions |
| `index.html`, `styles.css`, `favicon.svg` | Page, styling, and icon |
| `game.test.mjs` | Automated server and game tests |
| `package.json`, `package-lock.json`, `render.yaml` | Run/deployment configuration |
| `START-HERE.html` | Beginner setup and submission guide |
| `COVER.png` | Ready-to-upload project cover image |

Created by Thu Ha Nguyen with ChatGPT. The concept comes from observing everyday wardrobe challenges in a shared dorm. Built with JavaScript, Node.js, HTML, CSS, SVG, and server-sent events.
