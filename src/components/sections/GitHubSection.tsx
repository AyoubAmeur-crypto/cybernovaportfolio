import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SALMA_PROFILE } from '../../data/portfolioData';
import { PillButton, SectionContainer, SectionEyebrow } from '../ui/Primitives';
import { GitHubLogo } from '../icons/BrandAndTechIcons';

/**
 * Dedicated GitHub Showcase Section using the official GitHub brand icon (`simple-icons`):
 * "For more projects, explore my GitHub"
 */
export const GitHubSection: React.FC = () => {
  return (
    <SectionContainer
      id="projects"
      ariaLabel="GitHub projects and security repositories"
      className="pt-20 sm:pt-24 lg:pt-[112px]"
    >
      <div
        data-gsap-section
        className="py-10 sm:py-12 border-y border-[#1A1A2E]/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 max-w-[760px]">
          <GitHubLogo className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 shrink-0" />

          <div data-gsap-reveal className="space-y-2.5">
            <SectionEyebrow label="Open Source & Security Labs" />
            <h2 className="font-editorial font-medium text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.18] tracking-[-0.02em] text-[#1A1A2E]">
              For more projects, explore my GitHub.
            </h2>
            <p className="font-editorial text-base sm:text-[17px] leading-[1.55] text-[#646464]">
              Discover security scripts, lab research, detection engineering notes, and ongoing technical repositories.
            </p>
          </div>
        </div>

        <div data-gsap-reveal className="shrink-0 w-full sm:w-auto">
          <PillButton
            variant="solid-dark"
            href={SALMA_PROFILE.links.github}
            external
            className="w-full sm:w-auto px-7 py-4"
          >
            <GitHubLogo tone="light-pink" className="w-4 h-4" />
            <span>Explore my GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </PillButton>
        </div>
      </div>
    </SectionContainer>
  );
};

