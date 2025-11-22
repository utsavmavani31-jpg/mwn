# Demo Walk-through & Judge Commands

Reference screenshot: /mnt/data/Screenshot 2025-11-21 190948.png

## Quick start (local)
1. Install server deps:
   ```
   cd server
   npm install
   ```
2. Start server:
   ```
   npm start
   ```
   By default server listens on port 3000.

3. Serve static client (simple option):
   - Option A: Open `client/index.html` in a browser (some browsers restrict fetch to file:// — use a simple static server)
   - Option B: `npx serve client` (recommended) and open the served page.

4. Admin UI:
   - Open `/client/admin.html` (serve with static server) to edit templates live.
   - For production secure this endpoint.

5. React-style demo:
   - Serve `client-react/public` directory (`npx serve client-react/public`) and open in browser.

## Demo script (3 minutes)
1. 20s — Intro the problem & solution.
2. 40s — Taxi scenario:
   - In chat type: `Driver changed route` → show Elevated response.
   - Explain: deterministic template selection and offer check-in/SOS.
3. 40s — Being followed:
   - Type: `I think someone is following me` → shows Urgent response.
   - Press Panic button to show grounding + immediate actions.
4. 30s — Admin edit:
   - Open admin.html, load templates, change wording, save, show change reflected in chat.
5. 30s — Twilio (optional):
   - Explain `/send_sos` endpoint. (Do not demo sending SMS without consent.)
6. 20s — Wrap up: privacy, safety guardrails, next steps.

## Judge Q&A cheat sheet
- Q: How do you ensure safety?
  A: Deterministic templates, conservative keyword classifier, panic-mode deterministic flows, clear emergency disclaimers, no auto-calls without consent.
- Q: How to scale?
  A: Add ML classifier with more labeled data, robust LLM orchestration for tone only, admin moderation panel, opt-in contact bridge.
- Q: Privacy?
  A: Minimal retention, explicit consent for contacts/GPS, encrypt sensitive data, redact logs.

## Files to show during demo
- `client/index.html` — quick demo UI
- `client/admin.html` — edit templates
- `server/templates.json` & `server/templates_large.json` — scenario banks
- `DEMO_SCRIPT.md` & this `DEMO_GUIDE.md`

Demo prepared at: 2025-11-22T05:23:08.201901 UTC
