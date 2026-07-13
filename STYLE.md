# Watsof style guide

Reference for reproducing the Watsof visual identity on a new page or a new site. Written so an LLM (or a person) can build something that looks like it belongs to the same brand without needing to reverse-engineer this codebase from scratch.

## Stack

- Next.js (App Router), static export (`output: "export"` in `next.config.ts` — no server, no API routes, no `next/image` optimization)
- Tailwind CSS v4, config lives entirely in `app/globals.css` (no `tailwind.config.*` file) via `@theme inline`
- shadcn/ui, `new-york` style, Radix primitives, configured in `components.json`
- `lucide-react` for icons
- `next-themes` for light/dark mode (class-based, `attribute="class"`)
- Fonts via `next/font/google`: Geist (body), Geist Mono (mono/numerals), Space Grotesk (display — logo and can be used for headings)

## Color system

All colors are CSS custom properties in `oklch()`, defined once in `:root` (light) and re-declared in `.dark` (dark). Tailwind utility classes (`bg-background`, `text-foreground`, `border-border`, etc.) map to these via `@theme inline` — never hardcode hex/rgb colors in components, always use the semantic token.

Light:
```
--background: oklch(0.99 0 0)       /* near-white */
--foreground: oklch(0.15 0 0)       /* near-black text */
--card: oklch(1 0 0)
--card-foreground: oklch(0.15 0 0)
--primary: oklch(0.45 0.12 200)     /* brand teal */
--primary-foreground: oklch(0.99 0 0)
--secondary: oklch(0.95 0 0)
--muted: oklch(0.96 0 0)
--muted-foreground: oklch(0.5 0 0)
--accent: oklch(0.96 0.02 200)      /* faint teal tint */
--border: oklch(0.88 0 0)
--ring: oklch(0.45 0.12 200)
--radius: 0.5rem
```

Dark (same tokens, re-pointed):
```
--background: oklch(0.08 0 0)       /* near-black, not pure #000 */
--foreground: oklch(0.98 0 0)
--card: oklch(0.1 0 0)
--primary: oklch(0.65 0.15 200)     /* brighter teal for dark bg */
--primary-foreground: oklch(0.08 0 0)
--muted: oklch(0.15 0 0)
--muted-foreground: oklch(0.6 0 0)
--accent: oklch(0.2 0.04 200)
--border: oklch(0.18 0 0)
--ring: oklch(0.65 0.15 200)
```

Hue **200** (teal/cyan) is the one brand hue used throughout — primary buttons, focus rings, icon tiles, links. Everything else is neutral gray (chroma 0). Don't introduce a second "brand" hue into UI chrome (buttons, borders, nav) — the only place multiple hues appear is the animated background (see below), which is deliberately separate from UI color.

To extend this palette for a new site: pick one hue, keep chroma low (~0.12–0.15) for primary, and keep every other token achromatic (chroma 0). Lightness values are tuned so light-mode background sits at L≈0.99 (not pure white — avoids a stark, sterile look) and dark-mode background sits at L≈0.08 (not pure black — keeps some depth/warmth).

## Typography

- Body: Geist (`--font-sans`)
- Display/logo: Space Grotesk (`--font-display`), used via `font-display` utility class — currently only on the header wordmark, but appropriate for hero headlines on a new page too
- Mono: Geist Mono (`--font-mono`) — used for numerals/step counters (e.g. `01`, `02` in the Approach section) at low opacity for a technical accent
- Headings: `font-medium` (not bold), `tracking-tight`, large sizes (`text-5xl md:text-7xl` for H1, `text-3xl md:text-5xl` for H2), always paired with `text-balance`
- Body copy: `text-muted-foreground`, `leading-relaxed`, paired with `text-pretty`
- **Voice quirk**: headings are written in normal sentence/title case ("Navigate Complexity with Personalized Tech"), but supporting paragraph copy and nav labels are intentionally **lowercase** ("we craft bespoke websites...", "watsof"). Keep this contrast — it's a deliberate, slightly understated brand tic, not an inconsistency to "fix".

## Layout conventions

- Every section: `<section className="py-20 px-6">` wrapping `<div className="container mx-auto max-w-5xl">` (hero) or `max-w-6xl` (grid sections)
- Sections do **not** set their own background color/tint. The whole page shares one continuous background (solid token color + the animated blob layer, see below) — a section-level `bg-muted/30` or similar creates a visible horizontal seam where the tint starts/stops against the blurred background. If a section needs visual separation, use a `border-t border-border` (see Footer), not a background fill.
- Cards (`bg-card`, opaque) are the one place a solid fill is fine, since they're bounded elements, not full-bleed section backgrounds.
- Section anchors (`id="services"`, `id="approach"`, `id="contact"`) match header nav hrefs (`#services`, etc.) — keep this in sync when adding sections.

## Components

- Buttons: shadcn `Button`, variants `default` (primary teal fill), `outline`, `ghost`. Sizes `sm`/`default`/`lg`/`icon`. Primary CTA pairs a filled `default` button with an `outline` secondary button side by side (see Hero).
- Cards: shadcn `Card`/`CardContent`. Service cards use `border-border/50`, `hover:border-primary/40`, `hover:shadow-lg hover:shadow-primary/5` — hover states lean on the primary hue at low opacity rather than introducing new colors.
- Icon tiles: `h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary` wrapping a `lucide-react` icon — the standard way to present a service/feature icon.

## Header

- `fixed top-0 left-0 right-0 z-50`, **fully opaque** `bg-background` (not translucent — a translucent/backdrop-blur header lets scrolled content and the animated background bleed through it, which reads as a bug, not a glass effect)
- `border-b border-border` plus a soft drop shadow (`shadow-[0_1px_12px_-4px_rgba(0,0,0,0.12)]`) so the flat header still reads as an intentional edge against the blurred, colorful content beneath it, in both themes
- Theme toggle (`ThemeToggle`, sun/moon via lucide) sits directly left of the primary CTA button

## Dark mode

- `next-themes` `ThemeProvider` wraps the app in `app/layout.tsx` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`. `<html>` needs `suppressHydrationWarning` since the resolved theme is only known client-side.
- Toggle component must delay rendering the "current" icon until after mount (`useState` + `useEffect`) to avoid a server/client mismatch — render a neutral default icon for the first paint.
- Every color reference in components should be a semantic token (`bg-background`, `text-muted-foreground`, …), never a raw color, so dark mode requires zero component-level branching — it's entirely driven by the `.dark` CSS variable overrides.

## Signature element: animated background blobs

`components/animated-background.tsx` + the `.animated-blob`/`@keyframes blob-drift` rules in `globals.css`. This is the site's distinguishing visual signature — reuse this pattern (not necessarily these exact values) to give a new site the same "modern but artsy" identity:

- 4 large (32–52vw), heavily blurred (`filter: blur(90px)`) circles, positioned in the four quadrants of the viewport with random jitter, each looping through its own randomized path via CSS custom properties (`--tx1/--ty1`, `--tx2/--ty2`, `--tx3/--ty3`) consumed by one shared `@keyframes blob-drift`
- Colors are picked from a **curated hue list**, not fully random — `HUES = [200, 300, 30, 150]` (brand teal, violet, coral, sage). Random chroma/lightness jitter within a tight range (chroma 0.12–0.17, lightness 0.68–0.78) keeps every combination looking intentional; fully random hue/chroma/lightness will eventually produce muddy or garish combinations.
- Opacity: 0.35 in light mode, 0.45 in dark mode (`.dark .animated-blob`) — dark backgrounds need more opacity for the color to read as a glow rather than disappearing.
- Regenerates (new random positions/colors) every 15 minutes on a `setInterval`, and once fresh on every page load — never server-rendered (state starts `null`, populated in `useEffect`) to avoid a hydration mismatch from `Math.random()`.
- Respects `prefers-reduced-motion: reduce` — animation is fully disabled, blobs render static.
- Rendered once in `app/layout.tsx`, `fixed inset-0 -z-10 pointer-events-none`, as the first child of `<body>` — this is what requires every section above it to be non-opaque/untinted, per the Layout Conventions note above.
- **Cursor parallax**: on fine-pointer devices (`matchMedia("(pointer: fine)")`, skipped on touch and on `prefers-reduced-motion`), each blob sits in its own wrapper `<div>` whose `transform` is driven imperatively (via `requestAnimationFrame`, writing `el.style.transform` directly — not React state) toward an eased cursor-relative offset, capped at `PARALLAX_MAX_PX` (28px) and scaled by a random per-blob `depth` (0.5–1.4) so blobs drift at different rates for an actual depth effect. This layers on top of, and is independent from, the `blob-drift` keyframe animation on the inner element.

## Contrast note

`--muted-foreground` in dark mode is `oklch(0.74 0 0)`, deliberately lighter than a "normal" gray-on-black pairing would need — because in this design muted text often sits over the animated blob layer, not flat background, and the extra headroom keeps it readable against a lit blob without needing per-instance overrides.

## Checklist for a new page/site in this style

1. Semantic oklch tokens only, one brand hue at low chroma, everything else neutral
2. Space Grotesk for display/wordmark, Geist for body, lowercase supporting copy under properly-cased headings
3. No section-level background tints — one continuous background, separators are borders not fills
4. Opaque fixed header with a border + soft shadow, not a translucent/blurred one
5. Wire dark mode through CSS variables only, never per-component conditionals
6. If reusing the blob background: curated hue list + jitter, not uniform random; tune opacity per theme; regenerate periodically; respect reduced motion; render client-only
