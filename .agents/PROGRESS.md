# Project Progress

Current phase: Phases 1–4 implemented and verified; bidirectional Hero-to-Content ScrollSmoother transition refined and verified (`lint`, unit tests, and production `build` passing).

## Completed Work & Key Decisions
- **Preserved Hero + Bidirectional Two-Layer Z-Axis Zoom Transition (`src/components/HeroSection.tsx`, `src/components/sections/IntroSection.tsx`)**:
  - Preserved the dual-buffer pre-seeked baby-pink flower loop, centered display typography, and non-glass hero CTA pills as **Layer 1 (`heroFrontLayerRef`)** positioned directly in front of **Layer 2 (`IntroSection` — `"Security through a different perspective."`)** inside a unified `100svh` / `lg:h-screen` pinned stage; removed the `"Cybersecurity Portfolio · Defensive Architecture & Ethical Hacking"` subtitle line, framed the floral video for portrait phone screens (`h-[100svh]` + feathered `68svh` flower framing), enlarged mobile hero display text (`clamp(2.55rem, 11.5vw, 3.4rem)`), and refined compact mobile brand & navbar proportions.
  - Zooming in (`p: 0 -> 1`) and zooming back (`p: 1 -> 0`) use an explicit `pinType: 'transform'` `ScrollTrigger` synchronized after `smootherReady` and driven by a strictly symmetric `gentleCurve` (`0.34 * t + 0.66 * (0.5 - 0.5 * cos(πt))`) across wide overlapping windows, keeping GPU textures resident in VRAM and running a single GPU color-filter pass on the flower video wrapper for zero-hitch reverse zooming.
- **Apple-Inspired Liquid Glass Navbar (`src/components/Navbar.tsx`, `src/index.css`)**:
  - Borderless and merged in the Hero frame; contracts and expands smoothly via compositor-only `translate3d` / `scale3d` transforms (no `max-width` or `padding` layout thrashing on `backdrop-filter`) driven by `ScrollTrigger` in lockstep with `ScrollSmoother`.
  - Unified desktop & mobile `Menu` button opens a top-to-bottom `100dvh` overlay (`clip-path: inset`) with staggered section links and Gmail, LinkedIn, GitHub, and TryHackMe links at the bottom.
- **Rockstar-Caliber GSAP ScrollSmoother + ScrollTrigger Motion System (`src/context/SmoothScrollContext.tsx`, `src/App.tsx`, `.agents/MOTION_SYSTEM.md`)**:
  - Replaced `Lenis` completely (removed from `package.json`) with `GSAP ScrollSmoother` (`smooth: 1.05`, `effects: true`, `smoothTouch: false`), keeping `<Navbar />`, the top-to-bottom menu overlay, and the portaled `<dialog>` contact modal outside `#smooth-wrapper`.
- **Viralytics Figma Post-Hero Sections & User Customizations (`node-id=52-1285` -> `src/components/sections/*`)**:
  - Removed leading dots before all section eyebrows (`Primitives.tsx`) and removed `SocShowcaseSection` from `App.tsx`.
  - Separated `ExpertiseSection` into 3 dedicated two-column editorial chapters (`Security Operations`, `Web Application & API Security`, `Active Directory Security`) followed by `GitHubSection` (`"For more projects, explore my GitHub."` with Lucide `Github`).
  - Updated `TechEcosystemSection` with unclipped standalone category pills (`flex-wrap justify-center gap-3.5`), Lucide icons in theme blue (`#3B6FD8`) & pink (`#D4879C`), no tab underline, and a smooth horizontal scrolling marquee.
  - Widened `MethodologySection` heading (`max-w-[1240px]`) with static `01 Discover` -> `04 Improve` step cards and SVGs.
  - Updated `ContactCtaSection` to a clean `"Talk to me"` button opening an expansive desktop two-column `<dialog>` modal (`max-w-[1060px] xl:max-w-[1120px]`, `min-h-[540px]` on desktop, large `56px` `"Talk to me"` heading + `20px` supporting text on the left without `"Hire Me"` or `"Direct Email"`, and a spacious form card with crisp input rings on the right) over `cta-landscape-6418bd.png` artwork, enlarged the desktop GitHub icon in `GitHubSection`, colored `atou` pink (`#D4879C`) inside the navbar over white sections, and removed `Fes, Morocco` across the portfolio.
  - Scaled the oversized `salmaatou` footer watermark proportionally without stretching (`text-[18.6vw] xl:text-[268px] leading-[0.82]`, `pt-2 sm:pt-3`) right beneath the dark-blue footer card, and added the adaptive double-diamond brand mark as the website favicon (`public/favicon.svg` linked in `index.html`).
  - Replaced `mailto:` in `ContactCtaSection` with functional HTTP email delivery (`/api/contact` Vercel Serverless Function via Resend when `RESEND_API_KEY` is set, with zero-key `FormSubmit.co` AJAX delivery out-of-the-box); verified end-to-end inbox delivery and switched `CONTACT_DELIVERY_EMAIL` in `src/data/portfolioData.ts` to `Salmaatouofficiel@gmail.com`.
  - Prepared repository for Vercel hosting & automatic personal-name SEO (`"Salma Atou"`): added domain-auto-detecting `/robots.txt` (`api/robots.ts`) and `/sitemap.xml` (`api/sitemap.ts`) rewrites in `vercel.json`, `Schema.org` `ProfilePage` + `Person` + `WebSite` JSON-LD entity graph (`sameAs` linked to LinkedIn & TryHackMe), dynamic runtime canonical/OpenGraph URL hydration, crawlable `<noscript>` semantic HTML, `public/site.webmanifest`, strict single-`<h1>` hierarchy, and `api/contact.ts`.
- **Strict Non-Fabrication Enforcement (`src/types/portfolio.ts`, `src/data/portfolioData.ts`)**:
  - Zero invented projects, collaborators, testimonials, or unconfirmed certifications are published; `Projects`, `Collaborations`, `Testimonials`, and unconfirmed `Certifications` remain automatically hidden until verified entries are supplied.

## Changed & Added Files
- `index.html`
- `metadata.json`
- `package.json` (uses `gsap@3.15.1`, `react-icons`, and `lucide-react`; `lenis` removed)
- `public/favicon.svg`
- `public/site.webmanifest`
- `public/assets/figma/*` (9 extracted Viralytics SVG & PNG assets)
- `src/index.css`
- `src/types/portfolio.ts`
- `src/data/portfolioData.ts`
- `src/data/navData.ts`
- `src/data/navData.test.ts`
- `src/context/SmoothScrollContext.tsx`
- `src/components/ui/Primitives.tsx`
- `src/components/icons/BrandAndTechIcons.tsx`
- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/sections/IntroSection.tsx`
- `src/components/sections/ExpertiseSection.tsx`
- `src/components/sections/GitHubSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/TechEcosystemSection.tsx`
- `src/components/sections/MethodologySection.tsx`
- `src/components/sections/CollaborationsSection.tsx`
- `src/components/sections/TestimonialsSection.tsx`
- `src/components/sections/CertificationsSection.tsx`
- `src/components/sections/ContactCtaSection.tsx`
- `src/components/sections/Footer.tsx`
- `src/App.tsx`
- `api/contact.ts`
- `api/robots.ts`
- `api/sitemap.ts`
- `vercel.json`
- `vite.config.ts` / `tsconfig.json` / `.env.example` / `.gitignore`
- `.agents/MOTION_SYSTEM.md`
- `.agents/PROGRESS.md`

## Actual Verification Results
- **Typecheck (`npm run lint` -> `tsc --noEmit`)**: Passed (`0` errors).
- **Unit Tests (`npx tsx --test src/data/navData.test.ts`)**: Passed (`5/5` tests passing).
- **Production Build (`npm run build` -> `vite build`)**: Passed (`dist/` generated cleanly).
- **Browser DevTools MCP Check**: Attempted against local Vite server; blocked by missing Chrome `DevToolsActivePort` (`chrome://inspect/#remote-debugging` not enabled in local Chrome). Enable remote debugging in Chrome if automated screenshot capture is desired.

## Missing Content Awaiting Salma's Confirmation
1. Verified project case studies (`PROJECT_CASE_STUDIES` in `src/data/portfolioData.ts`).
2. Confirmation of status (`'verified'` or `'in_progress'`) for the 5 README certifications (`IBM — Introduction to Cloud Computing`, `CompTIA Security+`, `eJPT / eWPT`, `OSCP`, `SOC Analyst Certification`).
3. Verified collaborators (`COLLABORATORS`) and genuine recommendations (`TESTIMONIALS`).
