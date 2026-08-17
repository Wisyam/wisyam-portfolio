# AGENTS.md â€” Wisyam Portfolio

Repo knowledge for coding agents. Read this before touching any code.

## Stack (locked, do not change without human approval)

- Vite + React 19 + TypeScript (~6.0) + Tailwind CSS v4
- React Three Fiber + drei + Three.js (3D game in `/game`)
- react-router-dom v7 (routes: `/` = landing, `/game` = 3D world)
- No external 3D assets â€” everything procedural (primitives, CSS, SVG)

## Commands

```bash
npm install        # install deps
npm run dev        # dev server on http://localhost:5173
npm run typecheck  # tsc -b (MUST pass before done)
npm run lint       # oxlint (MUST pass before done)
npm run build      # typecheck + production build to dist/ (MUST pass before done)
npm run preview    # preview production build
```

CI (`.github/workflows/ci.yml`) runs typecheck + lint + build on every push/PR. Green CI is mandatory.

## Architecture

- `src/content/` â€” **single source of truth** for ALL portfolio content (sections, skills, projects, experience, education, contact, world-props). Landing page AND 3D panels import from here. NEVER hardcode content elsewhere; never invent facts.
- `src/components/landing/` â€” `/` page: ParallaxBackground, Hero, QuestCards, ChibiCharacter, Footer
- `src/components/world/` â€” 3D world: Ground, Props, SectionBuilding (6 section buildings)
- `src/components/player/` â€” Player, CameraRig, colliders
- `src/components/panel/` â€” SectionPanel + bodies (one per content section)
- `src/components/hud/` â€” HUD overlay, ActivityChecklist, LoadingScreen
- `src/hooks/` â€” shared hooks: `useQualityTier` (low|mid|high device tier), `useActivityLog` (per-session activity checklist), `useIsTouch`, `useKeyboardInput`

## Conventions

- **Branch**: `feat/<area>` or `feat/v2-<area>`; PR into `main`; PR title carries the issue identifier
- **GitHub account**: Wisyam ONLY. NEVER commit as icamapique (work account).
- **PR must mention QA** before claiming done; nothing merges until QA approves + human sign-off.
- Content facts come from the epic issue dump (scraped from wisyam.site) â€” do not invent or change facts.
- Quality tier gates: expensive effects (grass sway, water shader, postprocessing) must respect `useQualityTier` â€” off/ç®€åŒ– on `low`.

## Gotchas

- Mobile/touch must work without keyboard (tap-to-move or list fallback).
- `useActivityLog` state is per-session; localStorage is optional stretch.
- Day/night cycle is short (Â±2-3 min); panel open pauses time; sleep interaction skips to morning.
- Never claim a visual check you cannot actually perform headless â€” state what needs human verification.

## Definition of done

1. `npm run typecheck` passes
2. `npm run lint` passes
3. `npm run build` passes
4. CI green on PR
5. Evidence posted in the issue (build/test output, screenshots where possible)
6. QA reviewed via @mention with PR link
7. If stuck: declare BLOCKED with exact error â€” never fake a fix.