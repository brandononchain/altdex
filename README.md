# ALTDEX — AI-Native Execution Terminal

ALTDEX is a dark, institutional-grade trading terminal prototype focused on autonomous agent execution, risk control, strategy ops, and auditability.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Lucide icons
- Mock API routes under `src/app/api/*`
- Typed service layer under `src/lib/services/*`

## Route Map
- `/terminal`
- `/portfolio`
- `/agents`
- `/agents/[id]` (example: `/agents/alpha-7`)
- `/markets`
- `/data-lab`
- `/strategies`
- `/strategies/new`
- `/risk-engine`
- `/settings`
- `/journal`

## Local Run
```bash
npm install
npm run dev
```

### Quality Checks
```bash
npm run lint
npm run typecheck
npm run build
```

## Product Notes
- UI follows ALTDEX terminal language: near-black surfaces, dense bordered panels, mono data typography, and restrained semantic color use.
- Real-time behavior is currently simulated through client hooks (`src/lib/sim/hooks.ts`).
- Wallet flow is scaffolded and mock-only (no live transaction signing).

## Future Backend Integrations
- Replace mock route handlers (`src/app/api/*`) with real service adapters.
- Connect wallet adapter interfaces to real providers.
- Replace simulation hooks with live market/execution websockets.
- Persist journal, risk, and strategy artifacts to backend data stores.
