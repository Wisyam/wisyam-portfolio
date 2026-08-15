# Wisyam Portfolio

Interactive 3D top-down portfolio game for Wisyam Zain Amanullah ([wisyam.site](https://wisyam.site)).

A Zelda-like top-down world where each building represents a portfolio section (About, Skills, Projects, Experience, Education, Contact).

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + [Three.js](https://threejs.org/)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start the Vite dev server                |
| `npm run typecheck`  | Type-check with `tsc -b`                 |
| `npm run lint`       | Lint with oxlint                         |
| `npm run build`      | Type-check + production build to `dist/` |
| `npm run preview`    | Preview the production build             |

## Project structure

```
src/
  components/   Reusable React components (e.g. SceneCanvas)
  scenes/       3D scenes rendered inside the Canvas
  content/      Portfolio content (sections, items)
  hooks/        Shared React hooks
```

## CI

GitHub Actions runs typecheck + lint + build on every push/PR (`.github/workflows/ci.yml`).
