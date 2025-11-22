# Women's Safety Agent — Starter Repo (Hackathon MVP)

This starter scaffold contains a minimal backend and frontend for the Women\'s Safety Agent MVP.

## What's included
- `server/` — Express server with `/message` and `/panic` endpoints
- `server/templates.json` — scenario templates used for deterministic responses
- `server/classifier.js` — simple keyword-based classifier
- `client/index.html` — tiny demo UI (no build step)
- `DEMO_SCRIPT.md` — suggested demo script for judges
- Reference screenshot (local path): /mnt/data/Screenshot 2025-11-21 190948.png

## How to run (local)
1. Install node dependencies:
   ```
   cd server
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```
   Server runs on port 3000 by default.
3. Open `client/index.html` in a browser. If running server locally, to demo properly, serve the `client` folder (e.g., `npx serve client`), or copy `client/index.html` to a simple static server that proxies `/message` to `http://localhost:3000/message`.

## Notes & Safety
- This is a hackathon starter. For production use, add authentication, secure deployment, privacy opt-ins, and a robust safety rules engine.
- The `panic` endpoint returns a deterministic panic-mode script.

## File (screenshot) reference
The uploaded screenshot from your project is referenced here for convenience: `/mnt/data/Screenshot 2025-11-21 190948.png`


## Added features:
- Admin UI: client/admin.html (edits /templates endpoint)
- Twilio SOS endpoint: POST /send_sos (requires Twilio credentials in env)
- Large scenario bank: server/templates_large.json and CSV
- React-style static demo: client-react/public
- Demo guide: DEMO_GUIDE.md


## Docker (optional)
To build and run with Docker:

```
docker-compose build
docker-compose up
```
This will run the server on port 3000 and the static client on port 8080.
