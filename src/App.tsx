/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExpertiseSection } from './components/sections/ExpertiseSection';
import { GitHubSection } from './components/sections/GitHubSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TechEcosystemSection } from './components/sections/TechEcosystemSection';
import { MethodologySection } from './components/sections/MethodologySection';
import { CollaborationsSection } from './components/sections/CollaborationsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactCtaSection } from './components/sections/ContactCtaSection';
import { Footer } from './components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const PortfolioLayout: React.FC = () => {
  const { prefersReducedMotion, smootherReady } = useSmoothScroll();
  const contentRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !smootherReady || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-gsap-section]');
      sections.forEach((section) => {
        const revealItems = section.querySelectorAll<HTMLElement>('[data-gsap-reveal]');
        if (revealItems.length === 0) return;

        gsap.fromTo(
          revealItems,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.88,
            stagger: 0.09,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, contentRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, smootherReady]);

  return (
    <div className="min-h-screen w-full bg-white text-[#1A1A2E] selection:bg-[#F8E2EA] selection:text-[#1A1A2E]">
      <HeroSection />
      <main ref={contentRef} className="relative z-10 bg-white">
        <ExpertiseSection />
        <ProjectsSection />
        <GitHubSection />
        <TechEcosystemSection />
        <MethodologySection />
        <CollaborationsSection />
        <TestimonialsSection />
        <CertificationsSection />
        <ContactCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <SmoothScrollProvider fixedOverlays={<Navbar />}>
      <PortfolioLayout />
    </SmoothScrollProvider>
  );
}
