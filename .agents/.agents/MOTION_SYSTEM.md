# Motion System

## 9. Motion design and smooth scrolling (Validated Implementation)

### Engine Evaluation: GSAP ScrollSmoother vs. Lenis
After evaluating `Lenis` against `GSAP ScrollSmoother` (`gsap/ScrollSmoother` in GSAP `3.15.1`) on the portfolio's pinned two-layer Z-axis Hero-to-Content transition:
- **Why `GSAP ScrollSmoother` was chosen**:
  - `ScrollSmoother` shares the exact internal ticker, scroll proxy, and sub-pixel `matrix3d` pipeline as `GSAP ScrollTrigger`.
  - Setting `smooth: 1.05` on `ScrollSmoother` and `scrub: true` with explicit `pinType: 'transform'` on the pinned Hero `ScrollTrigger` eliminates double-damping phase lag and prevents CSS `position: fixed` coordinate jumps inside transformed `#smooth-content` on reverse scroll (`onEnterBack`), achieving Rockstar Games–caliber smooth acceleration, natural inertia, and zero-jerk bidirectional transitions.
  - `lenis` has been removed from `package.json` so `Lenis` and `ScrollSmoother` can **never** run simultaneously.

### Active Architecture (`src/context/SmoothScrollContext.tsx`)
- **Single Centralized `ScrollSmoother` Instance**:
  - Configured with `smooth: 1.05`, `effects: true`, `smoothTouch: false` (preserving native mobile touch scrolling), and `ignoreMobileResize: true`.
  - Exposes `smootherReady` so child `ScrollTrigger` hooks initialize strictly *after* `ScrollSmoother.create()` establishes its scroller proxy and `#smooth-content` transform, followed by `ScrollTrigger.sort()` and `ScrollTrigger.refresh()`.
  - Properly torn down via `gsap.context().revert()` on unmount or reduced-motion toggle.
- **Fixed UI Isolation & Compositor-Only Contraction (`src/components/Navbar.tsx`)**:
  - The floating Apple-inspired Liquid Glass `<Navbar />`, full-screen top-to-bottom menu overlay, and portaled `<dialog>` contact modal render **outside** `#smooth-wrapper` / `#smooth-content` so CSS `position: fixed` and `backdrop-filter` remain unaffected by container transforms.
  - Navbar state uses `ScrollTrigger.create` (zero `getBoundingClientRect()` layout reads during scroll) and animates exclusively GPU `translate3d` / `scale3d` / `opacity` properties—never `max-width` or `padding`—preventing `backdrop-filter` framebuffer reallocation during zoom-back.
- **Bidirectional Cinematic Hero-to-Content Z-Axis Transition (`src/components/HeroSection.tsx`, `src/components/sections/IntroSection.tsx`)**:
  - Pinned two-layer `100vh` camera portal (`pin: true`, `pinType: 'transform'`, `scrub: true`, `anticipatePin: 0`, `HERO_ZOOM_SCROLL_FACTOR = 1.3`) driven by a strictly symmetric blended cosine curve (`gentleCurve`: `0.34 * t + 0.66 * (0.5 - 0.5 * cos(πt))`).
  - Eliminates the flat quintic dead zone at `p = 1.0 -> 0.82` so reverse scroll (`Content -> Hero`) responds on pixel 1 without double-easing `ScrollSmoother` inertia.
  - Keeps GPU composite layers permanently resident in VRAM (`will-change: transform, opacity`, never toggling `visibility: hidden` or `transform: none`), runs a single GPU color-filter pass on `flowerVideoWrapRef`, caps text zoom below 4x mipmap re-raster thresholds, and wakes hardware video decoding ahead of reverse entry.
- **Consistent Section Timing & Reduced Motion**:
  - Post-hero `[data-gsap-section]` reveals use consistent `duration: 0.88`, `stagger: 0.09`, and `ease: 'power3.out'`.
  - When `prefers-reduced-motion: reduce` matches, `ScrollSmoother`, pinning, and continuous marquee animations are disabled automatically in favor of clean native scrolling.
