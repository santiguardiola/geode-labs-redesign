# Geode Labs — project recovery context

## Project

- Path: `/Users/santiagoguardiola/Documents/ChatGPT/Geode-Labs-Web`
- Local preview: `npm run dev -- -p 3123` → `http://localhost:3123`
- Stack: Next.js 16, React 19, TypeScript, CSS, GSAP + ScrollTrigger.
- Figma desktop source of truth: `Home / Desktop Long Page` in **Geode Labs — Website Redesign**.

## Important implementation files

- `src/components/ImmersiveHero.tsx` — four-stage immersive hero, GSAP/ScrollTrigger timeline, reverse-safe copy transitions, Stage 4 extended inward zoom, dots, and landing handoff.
- `src/components/LandingPage.tsx` — navbar through footer, including the Figma-derived desktop landing composition.
- `src/components/LandingMotion.tsx` — once-only GSAP section reveals; do not reset or replay on upward scroll.
- `src/components/EssayPreviewList.tsx` — body-portal, cursor-following essay preview; preserve its hover behavior.
- `src/app/globals.css` — desktop layout, motion styling, curtain/nav behavior, aurora, and interaction styles.
- `src/data/heroStages.ts` — hero copy, images, and Stage 3 items.

## Behaviors that must be preserved

- Four hero stages remain scroll-scrubbed; Stage 4 is intentionally longer and zooms more deeply.
- Reverse scroll must be the inverse of forward scroll: no stale or overlapping hero copy; progress dots follow timeline progress.
- The hero-to-landing reveal is a scroll-controlled curtain, not an opacity crossfade.
- The existing navbar becomes persistent only once the landing reaches the viewport top, and hides again inside the hero.
- Landing reveals play once; Essays preview, CTA/link hover motion, subtle media hover scale, and background aurora remain intact.

## Implemented sections

Navbar; What We Do / Global Ecosystem Development metrics; Product Studio; Grant Program; Local Ethereum; Essays; Support Onchain; Footer.

## Assets

- Hero, product, grant, local, logo, and icons: `public/assets/`
- Essay hover previews: `public/assets/essays/`
- Figma-derived wordmark/imagotipo: `public/assets/geode-imagotipo.png`
- Original source artwork: `source-assets/`

## Remaining work

- Manual desktop visual QA against Figma and manual forward/reverse hero motion QA.
- Connect final real destinations for nav, CTAs, donations, and articles; replace the QR placeholder when available.
- Tablet/mobile design and implementation are intentionally deferred.
- Accessibility/performance pass, metadata/OG assets, and deployment are still pending.
