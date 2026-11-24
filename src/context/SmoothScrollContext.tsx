import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const HERO_ZOOM_SCROLL_FACTOR = 1.3;

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement) => void;
  prefersReducedMotion: boolean;
  smootherReady: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  prefersReducedMotion: false,
  smootherReady: false,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Rockstar-Caliber Smooth Scrolling Engine powered exclusively by GSAP ScrollSmoother + ScrollTrigger.
 * Never runs Lenis simultaneously. Keeps fixed overlays (Navbar, Menu, Dialogs) outside #smooth-wrapper.
 */
export const SmoothScrollProvider: React.FC<{
  fixedOverlays?: React.ReactNode;
  children: React.ReactNode;
}> = ({ fixedOverlays, children }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [smootherReady, setSmootherReady] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !wrapperRef.current || !contentRef.current) {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      setSmootherReady(false);
      ScrollTrigger.refresh();
      return;
    }

    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.05,
        effects: true,
        smoothTouch: false,
        ignoreMobileResize: true,
      });

      smootherRef.current = smoother;
      setSmootherReady(true);
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      smootherRef.current = null;
      setSmootherReady(false);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement) => {
      const animateScrollToY = (destY: number) => {
        if (smootherRef.current && !prefersReducedMotion) {
          gsap.to(smootherRef.current, {
            scrollTop: Math.max(0, destY),
            duration: 1.15,
            ease: 'power3.inOut',
            overwrite: 'auto',
          });
        } else {
          window.scrollTo({
            top: Math.max(0, destY),
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
      };

      if (target === '#top' || target === '' || target === 0) {
        animateScrollToY(0);
        return;
      }

      if (target === '#about' && !prefersReducedMotion) {
        animateScrollToY(Math.round(window.innerHeight * HERO_ZOOM_SCROLL_FACTOR));
        return;
      }

      if (typeof target === 'number') {
        animateScrollToY(target);
        return;
      }

      const resolvedElement =
        typeof target === 'string'
          ? (document.querySelector(target) as HTMLElement | null) ||
            document.getElementById(target.replace(/^#/, ''))
          : target instanceof HTMLElement
            ? target
            : null;

      if (!resolvedElement) return;

      if (smootherRef.current && !prefersReducedMotion) {
        const targetOffset = smootherRef.current.offset(resolvedElement, 'top 92px');
        animateScrollToY(targetOffset);
        return;
      }

      const y = resolvedElement.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    },
    [prefersReducedMotion]
  );

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, prefersReducedMotion, smootherReady }}>
      {/* Floating Liquid Glass Navbar & Top-Layer Overlays Stay Outside the Transformed Scroll Container */}
      {fixedOverlays}
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </SmoothScrollContext.Provider>
  );
};
