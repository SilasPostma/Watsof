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

- **App Router**: `app/layout.tsx` (root layout, fonts, metadata, `<Analytics />` from `@vercel/analytics`) and `app/page.tsx` (composes the page from section components). `app/globals.css` holds Tailwind v4 theme/tokens.
- **Sections vs. primitives**: `components/*.tsx` (header, hero, services, approach, footer) are page sections composed in `app/page.tsx`. `components/ui/*` holds shadcn/ui primitives (new-york style, Radix-based, configured in `components.json`).
- **Path alias**: `@/*` maps to the repo root (see `tsconfig.json`), matching the shadcn aliases in `components.json` (`@/components`, `@/lib`, `@/lib/utils`, `@/components/ui`, `@/hooks`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config` file — config lives in `app/globals.css`). `lib/utils.ts` provides the `cn()` class-merging helper used by UI components.
- **Deployment**: `.github/workflows/nextjs.yml` builds and deploys to GitHub Pages on every push to `main` (via `actions/deploy-pages`). The `CNAME` file (`watsof.net`) configures the custom domain.
- **`next.config.ts` gotcha**: `basePath`/`assetPrefix` are conditionally set to `/Watsof` when `NODE_ENV === "production"`. This assumes the site is served from `https://<user>.github.io/Watsof/`, but the repo also ships a `CNAME` for `watsof.net`, which serves from the domain root — under a custom domain the basePath should NOT be set, or assets/links will 404. Check this when touching deployment config.
