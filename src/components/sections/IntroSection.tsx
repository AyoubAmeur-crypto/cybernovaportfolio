import React from 'react';
import { INTRO_CONTENT } from '../../data/portfolioData';
import { PillButton, SectionContainer, SectionEyebrow } from '../ui/Primitives';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

interface IntroSectionProps {
  embeddedInPortal?: boolean;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ embeddedInPortal = false }) => {
  const { scrollTo } = useSmoothScroll();

  return (
    <SectionContainer
      id="about"
      ariaLabel="Professional introduction"
      className={
        embeddedInPortal
          ? 'pt-20 sm:pt-24 pb-10 lg:pt-20 lg:pb-8'
          : 'pt-20 sm:pt-28 lg:pt-[120px]'
      }
    >
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-[80px] xl:gap-[112px]">
        {/* Left Editorial Column — Viralytics #52:1399 (522px desktop width) */}
        <div className="w-full lg:w-[522px] shrink-0 flex flex-col justify-between gap-8 lg:gap-10">
          <div className="flex flex-col items-start gap-6 sm:gap-8">
            <SectionEyebrow label={INTRO_CONTENT.eyebrow} />

            <div className="space-y-5">
              <h2 className="font-editorial font-medium text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.16] tracking-[-0.02em] text-[#1A1A2E]">
                {INTRO_CONTENT.heading}
              </h2>

              <div className="space-y-4">
                {INTRO_CONTENT.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="font-editorial font-normal text-base sm:text-[18px] leading-[1.55] text-[#646464]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <PillButton
                variant="solid-dark"
                onClick={() => scrollTo(INTRO_CONTENT.ctaHref)}
              >
                {INTRO_CONTENT.ctaLabel}
              </PillButton>
              <PillButton
                variant="outline-light"
                onClick={() => scrollTo('#contact')}
              >
                Talk to me
              </PillButton>
            </div>
          </div>

          {/* Bottom Editorial Pillars — Viralytics #57:2260 Proportion */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 pt-5 border-t border-[#1A1A2E]/8">
            {INTRO_CONTENT.highlights.map((item) => (
              <div key={item.value} className="space-y-2">
                <p className="font-editorial font-medium text-[30px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.02em] text-[#D4879C]">
                  {item.value}
                </p>
                <p className="font-editorial text-sm sm:text-base leading-[1.45] text-[#646464] whitespace-pre-line">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Architectural Visual Card — Viralytics #52:1407 Clean Illustration Without Covering Divs */}
        <div
          className={`relative flex-1 rounded-[24px] overflow-hidden bg-[#FDF2F6] ${
            embeddedInPortal
              ? 'min-h-[340px] sm:min-h-[430px] lg:min-h-[470px] xl:min-h-[520px] lg:max-h-[calc(100vh-140px)]'
              : 'min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] xl:min-h-[610px]'
          }`}
        >
          <img
            src="/assets/figma/about-studio-ee643f.png"
            alt="Minimalist editorial security workspace aesthetic"
            className="absolute inset-0 w-full h-full object-cover rose-navy-art-filter"
          />
        </div>
      </div>
    </SectionContainer>
  );
};
