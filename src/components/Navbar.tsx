import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';
import { getVisibleNavLinks, SALMA_PROFILE } from '../data/portfolioData';
import { HERO_ZOOM_SCROLL_FACTOR, useSmoothScroll } from '../context/SmoothScrollContext';
import { BrandLogo } from './ui/Primitives';
import {
  GitHubLogo,
  GmailLogo,
  HackerRankLogo,
  LinkedInLogo,
  TryHackMeLogo,
} from './icons/BrandAndTechIcons';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  onSelectSection?: (sectionKey: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectSection }) => {
  const { scrollTo, prefersReducedMotion, smootherReady } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [overLightCanvas, setOverLightCanvas] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navLinks = getVisibleNavLinks();

  // Pure ScrollTrigger-driven navbar state: zero `getBoundingClientRect()` forced layout reads
  // and 100% synchronized with ScrollSmoother inertia coasting in both scroll directions!
  useLayoutEffect(() => {
    if (!prefersReducedMotion && !smootherReady) return;

    const ctx = gsap.context(() => {
      const getThreshold = () =>
        prefersReducedMotion
          ? Math.max(240, window.innerHeight - 96)
          : Math.round(window.innerHeight * (HERO_ZOOM_SCROLL_FACTOR * 0.52));

      ScrollTrigger.create({
        start: () => getThreshold(),
        end: 'max',
        onEnter: () => {
          setOverLightCanvas(true);
          setActiveSection((prev) => (prev === 'home' ? 'about' : prev));
        },
        onLeaveBack: () => {
          setOverLightCanvas(false);
          setActiveSection('home');
        },
        onRefresh: (self) => {
          const isPast = self.scroll() >= getThreshold();
          setOverLightCanvas(isPast);
          if (!isPast) setActiveSection('home');
        },
      });

      const sectionOrder = ['expertise', 'projects', 'ecosystem', 'methodology', 'contact'];
      sectionOrder.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (!el) return;
        const prevId = idx === 0 ? 'about' : sectionOrder[idx - 1];
        ScrollTrigger.create({
          trigger: el,
          start: 'top 180px',
          onEnter: () => setActiveSection(id),
          onLeaveBack: () => {
            const prevEl = prevId === 'about' ? true : Boolean(document.getElementById(prevId));
            setActiveSection(prevEl ? prevId : 'about');
          },
        });
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion, smootherReady]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const handleNavigate = (href: string, id: string) => {
    const wasOpen = menuOpen;
    setMenuOpen(false);
    setActiveSection(id);
    if (onSelectSection) {
      onSelectSection(id);
    }
    window.setTimeout(
      () => {
        scrollTo(href);
      },
      wasOpen ? 220 : 0
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3.5 sm:px-8 lg:px-14 pt-3 sm:pt-5 pointer-events-none">
        {/* Compositor-Only Navbar Contraction:
            Uses GPU transform (translate3d / scale3d) instead of animating `max-width` or `padding`
            so `backdrop-filter` never triggers layout reflow during Hero <-> Content zoom! */}
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto relative mx-auto max-w-[1328px] py-2 sm:py-3 px-3.5 sm:px-6 flex items-center justify-between"
        >
          {/* Floating Apple Liquid Glass Pill Layer — Mobile-Tailored vs Desktop GPU Scale */}
          <div
            aria-hidden="true"
            data-scrolled={overLightCanvas ? 'true' : 'false'}
            style={{ willChange: 'transform, opacity' }}
            className="navbar-glass-pill pointer-events-none absolute inset-0 rounded-full apple-navbar-glass-light transition-[transform,opacity] duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center"
          />

          {/* Brand Identity: Compact on Phone, Attached Icon + lowercase "salmaatou" */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('#top', 'home');
            }}
            data-scrolled={overLightCanvas ? 'true' : 'false'}
            style={{ willChange: 'transform' }}
            aria-label={SALMA_PROFILE.name}
            className="navbar-brand-glide relative z-10 inline-flex items-center shrink-0 transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4879C] rounded-full"
          >
            <BrandLogo tone={overLightCanvas ? 'light' : 'hero'} size="sm" />
          </a>

          {/* Right Controls — Sleek Mobile Proportion & GPU Glide */}
          <div
            data-scrolled={overLightCanvas ? 'true' : 'false'}
            style={{ willChange: 'transform' }}
            className="navbar-controls-glide relative z-10 flex items-center gap-2 sm:gap-3 transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('#contact', 'contact');
              }}
              className={`hidden sm:inline-flex rounded-full px-5 py-2 font-editorial text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                overLightCanvas
                  ? 'bg-[#1A1A2E] text-white hover:bg-[#2A2A46]'
                  : 'bg-[#FBCFE8] text-[#1A1A2E] font-semibold hover:bg-[#FCE7F3]'
              }`}
            >
              Hire me
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open full-screen navigation menu"
              aria-expanded={menuOpen}
              className={`inline-flex items-center gap-2 sm:gap-2.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 font-editorial text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer ${
                overLightCanvas
                  ? 'bg-[#F8F7FA] text-[#1A1A2E] border border-[#1A1A2E]/10 hover:bg-[#F8E2EA]'
                  : 'bg-white/12 text-white hover:bg-white/20'
              }`}
            >
              <span className="text-xs sm:text-sm font-medium">Menu</span>
              <span aria-hidden="true" className="flex flex-col gap-1 w-3.5 sm:w-4">
                <span
                  className={`block h-[1.6px] sm:h-[1.8px] w-full rounded-full transition-colors ${
                    overLightCanvas ? 'bg-[#1A1A2E]' : 'bg-white'
                  }`}
                />
                <span
                  className={`block h-[1.6px] sm:h-[1.8px] w-2.5 sm:w-3 ml-auto rounded-full transition-colors ${
                    overLightCanvas ? 'bg-[#D4879C]' : 'bg-[#FBCFE8]'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Viewport Top-to-Bottom Menu Window (Desktop & Mobile) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation menu"
        aria-hidden={!menuOpen}
        onWheel={(e) => e.stopPropagation()}
        style={{
          clipPath: menuOpen ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        }}
        className={`fixed inset-0 z-[70] h-dvh w-full overscroll-contain overflow-y-auto bg-[#1A1A2E] text-white flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-6 sm:py-8 transition-[clip-path,visibility] duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        <div className="w-full max-w-[1328px] mx-auto flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('#top', 'home');
            }}
            aria-label={SALMA_PROFILE.name}
            className="inline-flex items-center"
          >
            <BrandLogo tone="dark" size="sm" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-[#FBCFE8] hover:text-[#1A1A2E] px-4 py-2 font-editorial text-sm font-medium text-white transition-colors cursor-pointer"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav
          aria-label="Full screen sections"
          className="w-full max-w-[1328px] mx-auto my-auto py-6"
        >
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {navLinks.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <li
                  key={item.id}
                  style={{
                    transitionDelay: menuOpen ? `${120 + idx * 45}ms` : '0ms',
                  }}
                  className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                  }`}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.href, item.id);
                    }}
                    className="group flex items-center justify-between py-4 sm:py-5 lg:py-6 transition-colors"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-editorial text-xs sm:text-sm font-semibold text-[#FBCFE8]/75">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-editorial text-2xl sm:text-4xl lg:text-[44px] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-3 ${
                          isActive ? 'text-[#FBCFE8]' : 'text-white group-hover:text-[#FBCFE8]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 group-hover:bg-[#FBCFE8] group-hover:border-[#FBCFE8] group-hover:text-[#1A1A2E] flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          style={{ transitionDelay: menuOpen ? '380ms' : '0ms' }}
          className={`w-full max-w-[1328px] mx-auto pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-500 ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p className="font-editorial text-xs sm:text-sm text-white/70">
            {SALMA_PROFILE.title}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href={`mailto:${SALMA_PROFILE.links.email}`}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white text-[#1A1A2E] px-3 py-1.5 sm:px-4 sm:py-2 font-editorial text-xs sm:text-sm font-medium hover:bg-[#FCE7F3] transition-colors"
            >
              <GmailLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Gmail</span>
            </a>

            <a
              href={SALMA_PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white text-[#1A1A2E] px-3 py-1.5 sm:px-4 sm:py-2 font-editorial text-xs sm:text-sm font-medium hover:bg-[#FCE7F3] transition-colors"
            >
              <LinkedInLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={SALMA_PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white text-[#1A1A2E] px-3 py-1.5 sm:px-4 sm:py-2 font-editorial text-xs sm:text-sm font-medium hover:bg-[#FCE7F3] transition-colors"
            >
              <GitHubLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={SALMA_PROFILE.links.tryhackme}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white text-[#1A1A2E] px-3 py-1.5 sm:px-4 sm:py-2 font-editorial text-xs sm:text-sm font-medium hover:bg-[#FCE7F3] transition-colors"
            >
              <TryHackMeLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>TryHackMe</span>
            </a>

            <a
              href={SALMA_PROFILE.links.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white text-[#1A1A2E] px-3 py-1.5 sm:px-4 sm:py-2 font-editorial text-xs sm:text-sm font-medium hover:bg-[#FCE7F3] transition-colors"
            >
              <HackerRankLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>HackerRank</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
