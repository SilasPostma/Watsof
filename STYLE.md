# Watsof style guide

Reference for reproducing the Watsof visual identity on a new page or a new site. Written so an LLM (or a person) can build something that looks like it belongs to the same brand without needing to reverse-engineer this codebase from scratch.

## The concept

The name "watsof" comes from Caspar David Friedrich's painting *Wanderer above the Sea of Fog* (1818). The site's identity is built directly on that: **you scroll through layers of fog that get darker as you descend the page**, from a warm dawn sky at the top to a dusky, near-night valley at the bottom — a single page, structured as a journey. Night mode isn't a dimmed version of day mode; it's the same journey after dark, genuinely dark throughout.

Two rules follow from this and should survive any future redesign of the details:

1. **Never depict the wanderer** (or any human figure). The identity is the *feeling* of the painting — elevation, mist, quiet scale — not an illustration of it.
2. **The darkening is structural, not decorative.** It's a single tall CSS gradient behind the whole page (see Fog gradient below), not a per-section background color. Don't reintroduce section-level background fills — they'd break the illusion of one continuous descent.

## Stack

- Next.js (App Router), static export (`output: "export"`, `trailingSlash: true` in `next.config.ts` — no server, no API routes, no `next/image` optimization). Currently a single route (`/`) — the whole site is one page.
- Tailwind CSS v4, config lives entirely in `app/globals.css` (no `tailwind.config.*` file) via `@theme inline`
- shadcn/ui, `new-york` style, Radix primitives, configured in `components.json`
- `lucide-react` for icons
- `next-themes` for light/dark mode (class-based, `attribute="class"`, `defaultTheme="system"`)
- Fonts via `next/font/google`: Geist (body), Geist Mono (numerals), Space Grotesk (display/logo), Instrument Serif italic (rare accent, see Typography)

## Color system

All colors are CSS custom properties in `oklch()`, defined once in `:root` (light/day) and re-declared in `.dark` (dark/night). Tailwind utility classes (`bg-background`, `text-foreground`, `border-border`, etc.) map to these via `@theme inline` — never hardcode hex/rgb colors in components, always use the semantic token. These are the **UI chrome** tokens (header, cards, buttons) — a separate, independent set of tokens drives the full-page fog gradient (see below).

Day:
```
--background: oklch(0.97 0.008 85)    /* warm-tinted near-white */
--foreground: oklch(0.18 0.015 250)   /* deep blue-charcoal, not pure black */
--card: oklch(0.99 0.006 85)
--primary: oklch(0.6 0.15 55)         /* warm amber-gold — "sun breaking through fog" */
--primary-foreground: oklch(0.99 0 0)
--secondary: oklch(0.93 0.012 230)    /* pale mist blue-grey */
--muted: oklch(0.94 0.01 230)
--muted-foreground: oklch(0.42 0.02 245)
--accent: oklch(0.9 0.03 60)
--border: oklch(0.85 0.015 230)
--ring: oklch(0.6 0.15 55)
```

Night (same tokens, re-pointed — genuinely dark, not a grey-tinted day palette):
```
--background: oklch(0.07 0.012 250)   /* near-black deep blue-charcoal */
--foreground: oklch(0.95 0.006 90)    /* warm near-white */
--card: oklch(0.1 0.014 250)
--primary: oklch(0.78 0.12 70)        /* pale warm moon-gold */
--primary-foreground: oklch(0.08 0 0)
--secondary: oklch(0.15 0.016 250)
--muted: oklch(0.14 0.014 250)
--muted-foreground: oklch(0.72 0.012 240)  /* deliberately light — see Contrast note */
--accent: oklch(0.18 0.03 250)
--border: oklch(0.2 0.016 250)
--ring: oklch(0.78 0.12 70)
```

**Primary hue is warm amber/gold (~55–70°)**, not the cool blue-grey that dominates the rest of the palette — it's the one warm accent (the light breaking through the fog), used for buttons, links, focus rings, icon tiles. Every other token carries a faint cool blue-violet tint (hue ~230–250, chroma 0.01–0.02) instead of being fully neutral gray — this is what ties plain UI chrome back to the painting's palette without it looking like a random color choice.

### Fog gradient (the signature element)

Independent token set, also in `:root`/`.dark`, consumed by the `.fog-gradient` class in `globals.css`:

```
/* day */
--fog-1: oklch(0.93 0.045 80)   /* dawn gold, top */
--fog-2: oklch(0.87 0.025 210)  /* pale mist */
--fog-3: oklch(0.76 0.03 225)   /* blue-grey haze */
--fog-4: oklch(0.65 0.035 238)  /* mountain blue */
--fog-5: oklch(0.56 0.04 248)   /* dusky valley, bottom */

/* night */
--fog-1: oklch(0.3 0.03 250)    /* dusky twilight, top — already noticeably darker than day's top */
--fog-2: oklch(0.22 0.025 250)
--fog-3: oklch(0.15 0.02 252)
--fog-4: oklch(0.1 0.016 255)
--fog-5: oklch(0.04 0.01 260)   /* near-total black, bottom */
```

Implementation, in `app/layout.tsx`:
```tsx
<ThemeProvider ...>
  <div className="relative">
    <div aria-hidden className="fog-gradient absolute inset-0 -z-20" />
    <MistLayer />
    {children}
  </div>
</ThemeProvider>
```
`.fog-gradient` is `position: absolute; inset: 0` inside a `position: relative` wrapper that contains *all* page content — so it's automatically exactly as tall as the page, with zero JS and zero height calculation. Scrolling the page is what reveals the gradient's darker stops; there is no scroll-linked JavaScript driving this part. `.fog-gradient::after` adds a very faint (`opacity: 0.05`) SVG turbulence noise texture at `mix-blend-mode: overlay` so the gradient doesn't read as a flat, synthetic banner — cheap, static, no JS.

**Contrast constraint that makes this work**: the day gradient's lightness range (0.93 → 0.56) never gets dark enough to threaten the dark `--foreground` text used throughout, and the night range (0.3 → 0.04) never gets light enough to threaten the light `--foreground` text. Each theme picks one text-contrast regime and the gradient is constrained to stay inside it for the whole scroll. If you extend the gradient's range, re-check contrast at both ends — don't let day mode's bottom stop get dark enough to need light text, or you've broken the "one regime per theme" assumption everything else relies on.

## Typography

- Body: Geist (`--font-sans`)
- Display/logo: Space Grotesk (`--font-display`), on the header wordmark
- Mono: Geist Mono (`--font-mono`) — numerals/step counters (`01`, `02`… in Approach) at low opacity
- Headings: `font-medium` (not bold), `tracking-tight`, large sizes (`text-5xl md:text-7xl` H1, `text-3xl md:text-5xl` H2), paired with `text-balance`
- Body copy: `text-muted-foreground`, `leading-relaxed`, paired with `text-pretty`
- **Voice quirk**: headings in normal sentence/title case, supporting paragraph copy and nav labels intentionally **lowercase** ("we craft bespoke websites...", "watsof"). Deliberate, not an inconsistency to fix.
- **Accent phrase** (`--font-accent`, Instrument Serif italic): exactly one word or short phrase per page, set in this font — italic, `text-primary`, `inline-block -rotate-2`, for a hand-picked, "a person made this" feel against the otherwise clean geometric sans. Currently "Above the Fog" in the H1. Use it once, on the phrase that carries the brand's core idea — not as a general emphasis style.

## Layout conventions

- Every section: `<section className="py-20 px-6">` (or `py-24 md:py-32` for more breathing room, see About) wrapping `<div className="container mx-auto max-w-5xl">` (prose-heavy sections) or `max-w-6xl` (grid sections)
- Sections do **not** set their own background color/tint, ever — see "The concept" above. The fog gradient is the only page background; a section fill would cut a hard seam into it.
- Cards (`bg-card`, opaque) are the one place a solid fill is fine — bounded elements, not full-bleed backgrounds.
- Section anchors (`id="about"`, `id="services"`, `id="approach"`, `id="portfolio"`, `id="contact"`) match header/footer nav hrefs in the form `/#id` (absolute, not bare `#id`) — harmless now that it's a single page, but keeps links correct if a second route is ever added.
- Page order, top to bottom, is the "journey": Hero (landing) → About (description) → Services → Approach → Work (portfolio) → Footer (CTA). Keep new sections in a position that makes sense in that narrative rather than appending to the end by default.

## Components

- Buttons: shadcn `Button`, variants `default` (primary amber fill), `outline`, `ghost`. Sizes `sm`/`default`/`lg`/`icon`. Primary CTA pairs a filled `default` button with an `outline` secondary button side by side (see Hero).
- Cards: shadcn `Card`/`CardContent`. `border-border/50`, `hover:border-primary/40`, `hover:shadow-lg hover:shadow-primary/5` — hover states lean on the primary hue at low opacity rather than introducing new colors.
- Icon tiles: `h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary` wrapping a `lucide-react` icon.
- Portfolio cards (`components/work.tsx`) are full-card `<a target="_blank">` wrappers, not internal links — this site links out to real client projects. Don't invent descriptions of what a linked business does if you don't actually know; use a generic tag (`Website`, `AI Tool`) instead of fabricated copy.

## Header

- `fixed top-0 left-0 right-0 z-50`, **fully opaque** `bg-background` (not translucent — lets scrolled content and the fog gradient bleed through it otherwise, which reads as a bug)
- `border-b border-border` plus a soft drop shadow (`shadow-[0_1px_12px_-4px_rgba(0,0,0,0.12)]`)
- Logo mark is the real favicon (`<img src="/favicon.ico">`), `invert dark:invert-0` since the source asset is a white glyph on transparent — needs inverting to show up on the light header
- Theme toggle sits directly left of the primary CTA button
- Nav links (`hidden md:flex`) collapse below `md` into `MobileNav`: hamburger → full-width dropdown, styled identically to the header. Desktop "Get Started" button is `hidden md:inline-flex` so exactly one of {button, hamburger} is ever visible.

## Dark mode

- `next-themes` `ThemeProvider`, `attribute="class"`, `defaultTheme="system"`, `enableSystem` — standard convention (respect OS preference, remember an explicit override in localStorage). Do **not** add `disableTransitionOnChange`; it forces a global `transition: none !important` sweep on toggle that's a plausible contributor to animation/compositing glitches on some browsers.
- `<html>` needs `suppressHydrationWarning` since the resolved theme is only known client-side.
- Toggle component delays rendering the "current" icon until after mount to avoid a server/client mismatch.
- Every color reference is a semantic token — dark mode requires zero component-level branching, purely `.dark` CSS variable overrides.

## Signature element: the mist layer

`components/mist-layer.tsx` + `.animated-blob`/`@keyframes blob-drift` in `globals.css`. This is the *moving* half of the fog identity (the gradient above is the *static* half):

- 4 large, heavily blurred (`filter: blur(110px)`), elongated horizontal shapes (width 42–66vw, height 45–70% of width — flatter than a circle, like a fog bank, not a colored dot), positioned in the four viewport quadrants with jitter, each looping through its own randomized path via CSS custom properties consumed by one shared `@keyframes blob-drift`.
- Colors from a curated hue list drawn from the fog palette — `HUES = [75, 215, 235, 250]` (dawn gold, pale mist blue, slate blue-grey, dusk blue) — with **low** chroma jitter (0.03–0.08) and moderate lightness (0.55–0.78). This is deliberately much less saturated than a typical decorative-blob background; the goal is mist, not confetti. If you're tempted to make these more colorful, you're breaking the concept.
- Opacity: 0.3 day / 0.35 night.
- Regenerates every 15 minutes; fresh random state on every load; never server-rendered (`useState(null)` until `useEffect`).
- Respects `prefers-reduced-motion: reduce`.
- **Parallax**: fine-pointer devices get cursor-relative drift; touch devices get the same drift driven by a bounded `Math.sin(scrollY * k)` function instead (no cursor to react to, but "movement on scroll" was an explicit requirement) — each wisp at its own random `depth` (0.5–1.4) multiplying `PARALLAX_MAX_PX` (28px), imperative `requestAnimationFrame` writing `el.style.transform` directly (not React state, for performance). `backface-visibility: hidden` and `translate3d` on the transform are defensive measures against a reported (not fully reproduced) WebKit flicker on theme toggle.
- Rendered once in `app/layout.tsx`, `fixed inset-0 -z-10`, above the fog gradient (`-z-20`) and below all content.

## Contrast note

`--muted-foreground` in dark/night mode is `oklch(0.72 0.012 240)`, deliberately lighter than a "normal" gray-on-black pairing would need, because muted text often sits over the fog gradient or mist layer rather than flat background — the extra headroom keeps it readable without per-instance overrides. See also the fog gradient's contrast constraint above.

## Checklist for evolving this site (or reusing the concept elsewhere)

1. Never depict the wanderer figure; the identity is atmosphere, not illustration
2. The darkening-as-you-scroll effect is one static CSS gradient, not per-section backgrounds or scroll-linked JS — keep it that way
3. Keep each theme's gradient range inside one text-contrast regime (dark text on the whole day range, light text on the whole night range)
4. One brand hue (amber/gold) for interactive elements; everything else carries only a faint cool blue-violet tint, never fully neutral gray
5. The accent serif phrase is rare — once per page, on the core idea, not a general-purpose emphasis style
6. Mist layer stays low-chroma and elongated ("fog," not "confetti") if you touch its palette or shape
7. Semantic oklch tokens only, dark mode via CSS variables, zero per-component theme branching
