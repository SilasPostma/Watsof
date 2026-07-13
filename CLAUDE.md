# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Watsof ("Personalized Tech Solutions"), built with Next.js (App Router). Originally scaffolded with v0.app and deployed as a static site to GitHub Pages at the custom domain watsof.net.

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (`eslint .`)

There is no test suite configured in this repo.

## Architecture

- **Design system**: see `STYLE.md` before touching visual design — the site's whole identity (colors, the scroll-darkening fog gradient, the mist layer, typography) is documented there and follows a specific concept (inspired by Caspar David Friedrich's *Wanderer above the Sea of Fog*). Read it before changing palette, layout, or adding sections.
- **App Router, one page**: `app/layout.tsx` (root layout, fonts, metadata, the fog gradient + mist layer wrapper, `<Analytics />` from `@vercel/analytics`) and `app/page.tsx` (composes the single page from section components, in narrative order: Hero → About → Services → Approach → Work → Footer). `app/globals.css` holds Tailwind v4 theme/tokens plus the fog gradient and mist animation CSS.
- **Sections vs. primitives**: `components/*.tsx` (header, hero, about, services, approach, work, footer, mist-layer, mobile-nav, theme-*) are page sections/behavior composed in `app/page.tsx` and `app/layout.tsx`. `components/ui/*` holds shadcn/ui primitives (new-york style, Radix-based, configured in `components.json`).
- **Path alias**: `@/*` maps to the repo root (see `tsconfig.json`), matching the shadcn aliases in `components.json` (`@/components`, `@/lib`, `@/lib/utils`, `@/components/ui`, `@/hooks`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config` file — config lives in `app/globals.css`). `lib/utils.ts` provides the `cn()` class-merging helper used by UI components.
- **Deployment**: `.github/workflows/nextjs.yml` builds and deploys to GitHub Pages on every push to `main` (via `actions/deploy-pages`). The `CNAME` file (`watsof.net`) configures the custom domain. GitHub's `github-pages` deployment environment only allows deploys triggered from `main` by default (an environment protection rule) — deploying a feature branch directly will fail with "not allowed to deploy... due to environment protection rules"; merge to `main` instead.
- **`next.config.ts`**: `output: "export"` (required — without it `next build` doesn't produce a static `out/` directory at all) and `trailingSlash: true` (so any future route exports as `route/index.html`, which resolves on GitHub Pages for both `/route` and `/route/`; a flat `route.html` only resolves for the exact no-trailing-slash URL). No `basePath` — the site is served from the `watsof.net` domain root per the `CNAME` file, not a GitHub Pages project subpath.
