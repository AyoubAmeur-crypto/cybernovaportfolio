import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_VIDEO_URL } from '../data/portfolioData';
import { HERO_ZOOM_SCROLL_FACTOR, useSmoothScroll } from '../context/SmoothScrollContext';
import { IntroSection } from './sections/IntroSection';

gsap.registerPlugin(ScrollTrigger);

const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val));
const mapRange = (val: number, inMin: number, inMax: number) =>
  clamp((val - inMin) / (inMax - inMin), 0, 1);

// Symmetric blended cosine curve: f(1 - t) === 1 - f(t).
// Eliminates the flat quintic plateau at p=1.0 so reverse scroll (Content -> Hero) responds on pixel 1
// without double-damping ScrollSmoother's inertia or spiking velocity in the middle.
const gentleCurve = (val: number, inMin: number, inMax: number) => {
  const t = mapRange(val, inMin, inMax);
  const cosine = 0.5 - 0.5 * Math.cos(Math.PI * t);
  return 0.34 * t + 0.66 * cosine;
};

export const HeroSection: React.FC = () => {
  const { scrollTo, prefersReducedMotion, smootherReady } = useSmoothScroll();

  const portalStageRef = useRef<HTMLDivElement | null>(null);
  const introBackLayerRef = useRef<HTMLDivElement | null>(null);
  const heroFrontLayerRef = useRef<HTMLElement | null>(null);
  const flowerVideoWrapRef = useRef<HTMLDivElement | null>(null);
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const heroContentWrapRef = useRef<HTMLDivElement | null>(null);
  const heroBioRef = useRef<HTMLParagraphElement | null>(null);
  const heroButtonsRef = useRef<HTMLDivElement | null>(null);
  const salmaZoomOverlayRef = useRef<HTMLDivElement | null>(null);
  const salmaLine1Ref = useRef<HTMLSpanElement | null>(null);
  const salmaLine2Ref = useRef<HTMLSpanElement | null>(null);
  const salmaLine3Ref = useRef<HTMLSpanElement | null>(null);

  /**
   * Bidirectional Compositor-Pure Render Function:
   * - Uses symmetric `gentleCurve` across wide overlapping windows so reverse scroll (1 -> 0) starts
   *   gently on pixel 1 with zero dead zone and zero mid-scroll velocity spike.
   * - Keeps GPU composite layers permanently warm (`translate3d` / `scale3d`, never `visibility: hidden`
   *   or `transform: none`) for 0ms rasterization lag when zooming back from Content -> Hero.
   */
  const applyScrollProgress = useCallback((p: number) => {
    // 1. Hero Bio and CTA Buttons (p: 0 <-> 0.42)
    const auxProgress = gentleCurve(p, 0, 0.42);
    const auxFade = 1 - auxProgress;
    const heroInteractive = p < 0.22;
    const auxScale = 1 - 0.06 * auxProgress;

    if (heroBioRef.current) {
      const el = heroBioRef.current;
      el.style.opacity = `${auxFade}`;
      el.style.transform = `translate3d(0px, ${34 * auxProgress}px, 0px) scale3d(${auxScale}, ${auxScale}, 1)`;
    }

    if (heroButtonsRef.current) {
      const el = heroButtonsRef.current;
      const btnScale = 1 - 0.08 * auxProgress;
      el.style.opacity = `${auxFade}`;
      el.style.transform = `translate3d(0px, ${44 * auxProgress}px, 0px) scale3d(${btnScale}, ${btnScale}, 1)`;
      el.style.pointerEvents = heroInteractive ? 'auto' : 'none';
    }

    if (heroContentWrapRef.current) {
      heroContentWrapRef.current.style.pointerEvents = heroInteractive ? 'auto' : 'none';
    }

    // 2. Symmetric Camera Zoom for Flowers + "Salma Atou" across the FULL [0 <-> 1.0] range
    const zoomSymmetric = gentleCurve(p, 0, 1.0);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    if (flowerVideoWrapRef.current) {
      const flowerScale = 1 + zoomSymmetric * (isMobile ? 1.35 : 1.65);
      flowerVideoWrapRef.current.style.transform = `translate3d(0px, 0px, 0px) scale3d(${flowerScale}, ${flowerScale}, 1)`;
    }

    // Peak scale stays below 4x WebKit/Blink mipmap re-raster cliff while filling mobile & desktop viewports
    const salmaScale = 1 + zoomSymmetric * (isMobile ? 2.15 : 2.8);
    const salmaOpacity = 1 - gentleCurve(p, 0.28, 0.94);

    if (salmaZoomOverlayRef.current) {
      const el = salmaZoomOverlayRef.current;
      el.style.opacity = `${salmaOpacity}`;
      el.style.transform = `translate3d(0px, 0px, 0px) scale3d(${salmaScale}, ${salmaScale}, 1)`;
    }

    const lineSplit = gentleCurve(p, 0.0, 0.94);
    if (salmaLine1Ref.current) {
      salmaLine1Ref.current.style.transform = `translate3d(0px, ${-14 * lineSplit}px, 0px)`;
    }
    if (salmaLine2Ref.current) {
      const midBoost = 1 + 0.08 * lineSplit;
      salmaLine2Ref.current.style.transform = `translate3d(0px, 0px, 0px) scale3d(${midBoost}, ${midBoost}, 1)`;
    }
    if (salmaLine3Ref.current) {
      salmaLine3Ref.current.style.transform = `translate3d(0px, ${14 * lineSplit}px, 0px)`;
    }

    // Front Hero Layer cross-dissolve across [0.22 <-> 1.0] — responds immediately on reverse entry at p=1.0
    const heroLayerOpacity = 1 - gentleCurve(p, 0.22, 1.0);
    if (heroFrontLayerRef.current) {
      const el = heroFrontLayerRef.current;
      el.style.opacity = `${heroLayerOpacity}`;
      el.style.pointerEvents = p < 0.48 ? 'auto' : 'none';
    }

    // 3. Back Layer 2 (IntroSection) symmetric Z-depth glide across [0.18 <-> 1.0]
    const introArrival = gentleCurve(p, 0.18, 1.0);
    if (introBackLayerRef.current) {
      const el = introBackLayerRef.current;
      const introScale = 0.89 + 0.11 * introArrival;
      const introY = (1 - introArrival) * 20;
      el.style.opacity = `${introArrival}`;
      el.style.transform = `translate3d(0px, ${introY}px, 0px) scale3d(${introScale}, ${introScale}, 1)`;
      el.style.pointerEvents = p >= 0.48 ? 'auto' : 'none';
    }
  }, []);

  // Preserved Dual-Buffer Pre-Seeked Seamless Infinite Flower Video Loop
  useEffect(() => {
    const vidA = videoARef.current;
    const vidB = videoBRef.current;
    if (!vidA || !vidB) return;

    if (prefersReducedMotion) {
      vidA.style.opacity = '1';
      vidB.style.opacity = '0';
      vidA.pause();
      vidB.pause();
      return;
    }

    let activeIdx: 0 | 1 = 0;
    let isCrossfading = false;
    let rafId = 0;
    let fadeTween: gsap.core.Tween | null = null;

    const videos: [HTMLVideoElement, HTMLVideoElement] = [vidA, vidB];

    vidA.style.opacity = '1';
    vidA.style.zIndex = '2';
    vidB.style.opacity = '0';
    vidB.style.zIndex = '1';
    vidB.pause();
    vidB.currentTime = 0.05;
    vidA.play().catch(() => {});

    const checkLoop = () => {
      const currentVid = videos[activeIdx];
      const nextIdx: 0 | 1 = activeIdx === 0 ? 1 : 0;
      const nextVid = videos[nextIdx];

      if (
        !isCrossfading &&
        currentVid.duration > 0 &&
        currentVid.currentTime >= currentVid.duration - 1.15
      ) {
        isCrossfading = true;
        nextVid.style.zIndex = '2';
        currentVid.style.zIndex = '1';

        nextVid.play().catch(() => {});

        fadeTween = gsap.fromTo(
          nextVid,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.0,
            ease: 'sine.inOut',
            onComplete: () => {
              currentVid.style.opacity = '0';
              currentVid.pause();
              currentVid.currentTime = 0.05;
              activeIdx = nextIdx;
              isCrossfading = false;
            },
          }
        );
      }

      rafId = requestAnimationFrame(checkLoop);
    };

    rafId = requestAnimationFrame(checkLoop);

    return () => {
      cancelAnimationFrame(rafId);
      if (fadeTween) fadeTween.kill();
    };
  }, [prefersReducedMotion]);

  // Synchronized 1:1 with GSAP ScrollSmoother using explicit `pinType: 'transform'`
  // (prevents child-before-parent `useLayoutEffect` from selecting `position: fixed` inside transformed #smooth-content!)
  useLayoutEffect(() => {
    if (!portalStageRef.current || prefersReducedMotion || !smootherReady) return;

    const ctx = gsap.context(() => {
      applyScrollProgress(0);

      ScrollTrigger.create({
        trigger: portalStageRef.current,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * HERO_ZOOM_SCROLL_FACTOR)}`,
        pin: true,
        pinType: 'transform',
        scrub: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          applyScrollProgress(self.progress);
        },
        onRefresh: (self) => {
          applyScrollProgress(self.progress);
        },
        onLeave: () => {
          applyScrollProgress(1);
        },
        onLeaveBack: () => {
          applyScrollProgress(0);
        },
      });

      // Wake hardware video decoder 1.5 viewports BEFORE reverse entry so frame 1 of zoom-back is hot in VRAM
      ScrollTrigger.create({
        trigger: portalStageRef.current,
        start: 'top bottom',
        end: () => `+=${Math.round(window.innerHeight * (HERO_ZOOM_SCROLL_FACTOR + 2.5))}`,
        onEnterBack: () => {
          const vidA = videoARef.current;
          const vidB = videoBRef.current;
          const active = vidB && parseFloat(vidB.style.opacity || '0') > 0.5 ? vidB : vidA;
          active?.play().catch(() => {});
        },
      });
    }, portalStageRef);

    return () => ctx.revert();
  }, [applyScrollProgress, prefersReducedMotion, smootherReady]);

  if (prefersReducedMotion) {
    return (
      <div id="top" className="w-full bg-white">
        <section
          aria-label="Salma Atou Hero"
          className="relative h-[100svh] sm:h-screen w-full overflow-hidden flex items-center justify-center bg-black font-hero-sans pb-10 sm:pb-0"
        >
          <video
            ref={videoARef}
            src={HERO_VIDEO_URL}
            muted
            playsInline
            preload="auto"
            className="absolute inset-x-0 bottom-0 h-[86svh] sm:inset-0 sm:h-full w-full object-cover object-[center_bottom] sm:object-center baby-pink-flowers-video max-sm:[mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]"
          />
          <video ref={videoBRef} src={HERO_VIDEO_URL} muted playsInline aria-hidden="true" className="hidden" />
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 max-w-4xl mx-auto -translate-y-4 sm:translate-y-0">
            <h1 className="flower-same-level-text font-special-bold text-white text-[clamp(2.55rem,11.5vw,3.4rem)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.03] sm:leading-[1.02] tracking-[-0.035em] sm:tracking-[-0.03em] flex flex-col items-center">
              <span className="block">Salma Atou.</span>
              <span className="block text-[#FBCFE8]">Future Cybersecurity</span>
              <span className="block text-[#FCE7F3]">Engineer.</span>
            </h1>
            <p className="flower-same-level-text text-white/90 sm:text-white/95 text-[14px] sm:text-base md:text-lg font-medium sm:font-semibold leading-[1.55] sm:leading-relaxed max-w-[325px] sm:max-w-xl mx-auto mt-5 sm:mt-8">
              Designing resilient defense architectures, zero-trust networks, and ethical hacking labs—securing digital ecosystems with precision and creativity.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-9">
              <button
                type="button"
                onClick={() => scrollTo('#expertise')}
                className="px-4.5 sm:px-7 py-2.5 sm:py-3.5 bg-[#FBCFE8] text-[#1A1A2E] text-[12.5px] sm:text-sm font-bold sm:font-extrabold rounded-full hover:bg-[#FCE7F3] shadow-lg shadow-black/45 transition-all cursor-pointer whitespace-nowrap"
              >
                Explore security labs
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#1A1A2E] text-[#FCE7F3] border border-[#FBCFE8]/45 text-[12.5px] sm:text-sm font-bold sm:font-extrabold rounded-full hover:bg-[#252542] hover:border-[#FBCFE8]/75 shadow-lg shadow-black/35 transition-all cursor-pointer whitespace-nowrap"
              >
                Talk to me
              </button>
            </div>
          </div>
        </section>
        <IntroSection />
      </div>
    );
  }

  return (
    <div
      id="top"
      ref={portalStageRef}
      className="relative w-full min-h-[100svh] lg:h-screen overflow-hidden bg-white"
    >
      {/* BACK LAYER (Layer 2): IntroSection kept permanently on its own GPU composite layer */}
      <div
        ref={introBackLayerRef}
        style={{ opacity: 0, willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
        className="relative z-10 w-full min-h-[100svh] lg:h-screen flex items-center bg-white origin-center"
      >
        <IntroSection embeddedInPortal />
      </div>

      {/* FRONT LAYER (Layer 1): Exact 100svh on Phone with Flowers Rising Flush From Bottom & Sides */}
      <section
        ref={heroFrontLayerRef}
        aria-label="Salma Atou Hero"
        style={{ willChange: 'opacity', backfaceVisibility: 'hidden' }}
        className="absolute top-0 left-0 right-0 h-[100svh] lg:inset-0 lg:h-full z-20 overflow-hidden flex items-center justify-center bg-black font-hero-sans pb-10 sm:pb-0"
      >
        {/* Single GPU color-filter pass; anchored flush at bottom-0 on phone so flowers rise from the bottom edge and up both sides */}
        <div
          ref={flowerVideoWrapRef}
          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          className="absolute inset-0 w-full h-full overflow-hidden origin-center baby-pink-flowers-video"
        >
          <video
            ref={videoARef}
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-x-0 bottom-0 h-[86svh] sm:inset-0 sm:h-full w-full object-cover object-[center_bottom] sm:object-center max-sm:[mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]"
          />
          <video
            ref={videoBRef}
            src={HERO_VIDEO_URL}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[86svh] sm:inset-0 sm:h-full w-full object-cover object-[center_bottom] sm:object-center max-sm:[mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]"
          />
        </div>

        <div
          ref={heroContentWrapRef}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 max-w-4xl mx-auto -translate-y-4 sm:translate-y-0"
        >
          <div
            ref={salmaZoomOverlayRef}
            style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            className="origin-center select-none"
          >
            <h1 className="flower-same-level-text font-special-bold text-white text-[clamp(2.55rem,11.5vw,3.4rem)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.03] sm:leading-[1.02] tracking-[-0.035em] sm:tracking-[-0.03em] flex flex-col items-center">
              <span ref={salmaLine1Ref} style={{ willChange: 'transform' }} className="block">
                Salma Atou.
              </span>
              <span
                ref={salmaLine2Ref}
                style={{ willChange: 'transform' }}
                className="block text-[#FBCFE8]"
              >
                Future Cybersecurity
              </span>
              <span
                ref={salmaLine3Ref}
                style={{ willChange: 'transform' }}
                className="block text-[#FCE7F3]"
              >
                Engineer.
              </span>
            </h1>
          </div>

          <p
            ref={heroBioRef}
            style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            className="flower-same-level-text text-white/90 sm:text-white/95 text-[14px] sm:text-base md:text-lg font-medium sm:font-semibold leading-[1.55] sm:leading-relaxed max-w-[325px] sm:max-w-xl mx-auto mt-5 sm:mt-8"
          >
            Designing resilient defense architectures, zero-trust networks, and ethical hacking labs—securing digital ecosystems with precision and creativity.
          </p>

          <div
            ref={heroButtonsRef}
            style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-9"
          >
            <button
              type="button"
              onClick={() => scrollTo('#expertise')}
              className="px-4.5 sm:px-7 py-2.5 sm:py-3.5 bg-[#FBCFE8] text-[#1A1A2E] text-[12.5px] sm:text-sm font-bold sm:font-extrabold rounded-full hover:bg-[#FCE7F3] shadow-lg shadow-black/45 transition-all cursor-pointer whitespace-nowrap"
            >
              Explore security labs
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#contact')}
              className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#1A1A2E] text-[#FCE7F3] border border-[#FBCFE8]/45 text-[12.5px] sm:text-sm font-bold sm:font-extrabold rounded-full hover:bg-[#252542] hover:border-[#FBCFE8]/75 shadow-lg shadow-black/35 transition-all cursor-pointer whitespace-nowrap"
            >
              Talk to me
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
