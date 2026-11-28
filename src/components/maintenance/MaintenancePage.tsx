import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { DisconnectedCablesIllustration } from './DisconnectedCablesIllustration';

const AYOUB_PORTFOLIO_URL = 'https://ayoubameur.me';
const WHATSAPP_REPORT_MESSAGE =
  'Hi, I noticed the website is temporarily disconnected. Is there anything we can do to restore the connection?';
const WHATSAPP_REPORT_URL = `https://wa.me/212770566628?text=${encodeURIComponent(WHATSAPP_REPORT_MESSAGE)}`;

/**
 * Dedicated Baby-Pink Maintenance Page.
 * - Top: Ayoub Ameur's logo (`/assets/ayoublogo.png`) linking to `https://ayoubameur.me`.
 * - Center: Editorial headline, supporting message, "Send report" CTA linking to `https://ayoubameur.me`,
 *   and fixed edge-to-edge disconnected pastel cables (no sparks or dots).
 * - Completely isolated from SmoothScrollProvider, Navbar, HeroSection, and post-hero sections.
 */
export const MaintenancePage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Listen to OS reduced-motion preference dynamically
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Ensure search engines do not index the maintenance screen even in SPA mode, restoring cleanly on unmount
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Temporarily disconnected.';

    const robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const googlebotMeta = document.querySelector<HTMLMetaElement>('meta[name="googlebot"]');
    const prevRobots = robotsMeta?.getAttribute('content') ?? null;
    const prevGooglebot = googlebotMeta?.getAttribute('content') ?? null;

    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow, noarchive');
    }
    if (googlebotMeta) {
      googlebotMeta.setAttribute('content', 'noindex, nofollow, noarchive');
    }

    return () => {
      document.title = prevTitle;
      if (robotsMeta && prevRobots !== null) {
        robotsMeta.setAttribute('content', prevRobots);
      }
      if (googlebotMeta && prevGooglebot !== null) {
        googlebotMeta.setAttribute('content', prevGooglebot);
      }
    };
  }, []);

  // Calm Staggered GSAP Entrance (Cables Stay Fixed)
  useLayoutEffect(() => {
    if (prefersReducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-maint-reveal]',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );

      gsap.fromTo(
        '[data-maint-cables]',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          delay: 0.14,
          ease: 'power2.out',
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={rootRef}
      className="min-h-[100dvh] w-full bg-[#FFF8FA] text-[#30252D] flex flex-col justify-between overflow-x-clip selection:bg-[#F8D7E4] selection:text-[#30252D]"
    >
      {/* Top Section: Ayoub Ameur Logo Linking to ayoubameur.me */}
      <header
        data-maint-reveal
        className="w-full pt-8 sm:pt-11 px-5 sm:px-8 flex flex-col items-center"
      >
        <a
          href={AYOUB_PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ayoub Ameur Portfolio"
          className="group inline-flex items-center justify-center rounded-xl p-1.5 transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B86C89]"
        >
          <img
            src="/assets/ayoublogo.png"
            alt="Ayoub Ameur"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain brightness-0 opacity-85 group-hover:opacity-100 transition-opacity duration-300"
          />
        </a>
      </header>

      {/* Main Content + Send Report CTA + Fixed Disconnected Cables */}
      <main className="w-full my-auto py-6 sm:py-9 flex flex-col items-center">
        <div
          data-maint-reveal
          className="max-w-[720px] mx-auto px-5 sm:px-8 text-center space-y-4 sm:space-y-5"
        >
          <h1 className="font-editorial font-semibold text-[clamp(2.05rem,5vw,3.55rem)] leading-[1.1] tracking-[-0.03em] text-[#30252D] text-balance">
            <span className="block">Temporarily</span>
            <span className="block text-[#B86C89]">disconnected.</span>
          </h1>

          <div className="space-y-3 max-w-[540px] mx-auto pt-0.5">
            <p className="font-editorial text-[14.5px] sm:text-[16.5px] leading-[1.68] text-[#8D7D85] text-pretty">
              Some connections aren&apos;t broken, just hurt by silence. Sometimes, a simple
              conversation is all it takes to make things work again.
            </p>
            <p className="font-editorial text-[14.5px] sm:text-[16px] leading-[1.65] text-[#30252D]/80 text-pretty">
              This website is currently under maintenance. The connection is paused, but the
              possibility of reconnecting remains.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={WHATSAPP_REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#30252D] hover:bg-[#B86C89] text-[#FFF8FA] px-6 py-3 font-editorial text-sm sm:text-[15px] font-medium transition-colors duration-200 shadow-[0_6px_18px_rgba(48,37,45,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86C89]"
            >
              <span>Send report</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Central Illustration — Fixed Disconnected Pastel Cables (Clean Gap, No Sparks/Dots) */}
        <div data-maint-cables className="w-full mt-6 sm:mt-8 lg:mt-9">
          <DisconnectedCablesIllustration />
        </div>
      </main>

      {/* Bottom Optical Spacer (Preserves Vertical Balance Without Footer Text) */}
      <div aria-hidden="true" className="h-6 sm:h-8" />
    </div>
  );
};
