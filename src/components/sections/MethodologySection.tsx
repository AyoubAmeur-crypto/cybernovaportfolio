import React from 'react';
import { ScanEye, ShieldCheck } from 'lucide-react';
import { SECURITY_METHODOLOGY_STEPS } from '../../data/portfolioData';
import { SectionContainer, SectionEyebrow } from '../ui/Primitives';

/**
 * Section F — Security Methodology (Wide 3-Line Heading + Clean Static 4-Card Viralytics Composition).
 */
export const MethodologySection: React.FC = () => {
  return (
    <SectionContainer
      id="methodology"
      ariaLabel="Security methodology"
      className="pt-24 sm:pt-28 lg:pt-[120px]"
    >
      <div data-gsap-section className="space-y-14 sm:space-y-16 lg:space-y-[80px]">
        {/* Wide Full-Container Heading */}
        <div className="flex flex-col items-center text-center space-y-6 w-full max-w-[1240px] mx-auto">
          <SectionEyebrow label="Security Methodology" align="center" />

          <h2
            data-gsap-reveal
            className="w-full font-editorial font-medium text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] leading-[1.22] tracking-[-0.02em] text-[#1A1A2E]"
          >
            <span className="block lg:whitespace-nowrap">
              Structured security assessment and
            </span>
            <span className="inline-flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-3 gap-y-1 my-1">
              <span>actionable</span>
              <span
                aria-hidden="true"
                className="inline-flex items-center -space-x-3 align-middle mx-0.5 shrink-0"
              >
                <span className="w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full bg-[#DCE8FC] flex items-center justify-center">
                  <ScanEye className="w-5 h-5 sm:w-6 sm:h-6 text-[#2855B8]" />
                </span>
                <span className="w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full bg-[#F8E2EA] viralytics-card-shadow flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#B8687F]" />
                </span>
              </span>
              <span>remediation workflow</span>
            </span>
            <span className="block lg:whitespace-nowrap">
              in four connected phases.
            </span>
          </h2>
        </div>

        {/* Clean Static 4-Card Viralytics Sequence (#52:1341) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_METHODOLOGY_STEPS.map((step) => {
            if (step.variant === 'image') {
              return (
                <article
                  key={step.number}
                  data-gsap-reveal
                  className="relative rounded-[24px] p-6 min-h-[360px] lg:h-[400px] overflow-hidden flex flex-col justify-between bg-[#FDF2F6]"
                >
                  <img
                    src={step.assetPath}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="relative z-10 flex justify-end">
                    <span className="font-editorial text-xs font-semibold uppercase tracking-[0.1em] text-white">
                      {step.number}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="font-editorial font-medium text-[26px] sm:text-[28px] leading-[1.2] text-[#1A1A2E]">
                      {step.title}
                    </h3>
                    <p className="font-editorial text-base leading-[1.5] text-[#4E4E5E]">
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={step.number}
                data-gsap-reveal
                className="rounded-[24px] bg-[#FDF2F6] p-6 min-h-[360px] lg:h-[400px] flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-editorial font-medium text-[26px] sm:text-[28px] leading-[1.2] text-[#1A1A2E]">
                    {step.title}
                  </h3>
                  <span className="font-editorial text-xs font-semibold uppercase tracking-[0.1em] text-[#646464] pt-1.5">
                    {step.number}
                  </span>
                </div>

                <div className="flex items-center justify-center py-4">
                  <img
                    src={step.assetPath}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-[136px] h-[136px] sm:w-[146px] sm:h-[146px] object-contain"
                  />
                </div>

                <p className="font-editorial text-base leading-[1.5] text-[#646464]">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};
