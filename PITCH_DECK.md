# Pitch Deck (5 slides) — Women's Safety Agent

## Slide 1 — Problem & Impact
Title: Women’s Safety, Reimagined
Content:
- Many women feel unsafe during everyday activities (commute, rideshare, late-night work).
- Existing tools are fragmented and reactive; victims need calm, immediate, practical guidance.
- Opportunity: provide a proactive, privacy-first assistant that reduces harm and increases confidence.

## Slide 2 — Solution
Title: The Women’s Safety Agent
Content:
- A lightweight conversational agent that detects danger signals, gives deterministic safety steps, and provides panic/check-in flows.
- Key features: real-time classification, deterministic templates, one-tap panic, SOS drafts, optional SMS bridge.
- Privacy-first: no geolocation stored unless consented; all PII redacted.

## Slide 3 — Demo & UX
Title: Live Demo (3 flows)
Content:
- Taxi safety: detect route changes → suggest safe steps + check-in.
- Being followed: urgent classification → panic flow (grounding + actions).
- Home intrusion/noise: home safety checklist + escalation.
- Admin UI for content edits and Twilio bridge demo (opt-in).

## Slide 4 — Tech & Safety
Title: Architecture & Safety
Content:
- Tech: React frontend, Express backend, deterministic template engine, optional LLM for tone, Twilio for opt-in SMS.
- Safety: deterministic panic-mode, conservative classifier, emergency reminders, no automatic calls, admin moderation.

## Slide 5 — Roadmap & Ask
Title: Roadmap & What we need
Content:
- Milestones: Pilot with 100 users → add ML classifier → integrate local helplines → mobile app deployment.
- Ask: mentorship, pilot partners (NGOs), $10k for pilot, access to helpline datasets.
- Contact: [Your Team] — ready to demo and iterate.

