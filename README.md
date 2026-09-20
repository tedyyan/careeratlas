# CareerAtlas AI — Prototype v0.2

A reusable Next.js/TypeScript prototype centered on an immersive “A Day at Work” experience.

## Included
- Eight representative Software Developer work moments
- Judgment-free YES / SKIP decisions
- Step-by-step process, people, time, and outcomes for accepted tasks
- End-of-day work allocation and reflection without aptitude scoring
- Adjacent careers and a Real People, Real Careers section
- Reusable workday/task data model in `lib/workdays.ts`
- Premium responsive landing page
- Career cards and comparison page
- Full Software Developer career experience
- 16-second CareerAtlas Original motion-graphic MP4
- Interactive day-in-the-life experience
- AI impact cards
- Mini career simulation
- Prototype AI mentor interaction
- Education/pathway section
- Static no-install preview under `preview/index.html`

## Run the real app
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Architecture
The UI is intentionally separated from career data (`lib/careers.ts`) so future careers can reuse the same templates. The next production step is to replace prototype values with source-backed records from O*NET / CareerOneStop / BLS and persist them in PostgreSQL.

## Important
Salary/outlook numbers in this visual prototype are explicitly marked as prototype values. Validate live values and source vintages before public launch.
