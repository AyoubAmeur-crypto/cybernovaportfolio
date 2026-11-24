import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getPublishedTestimonials } from '../../data/portfolioData';
import type { TestimonialEntry } from '../../types/portfolio';
import { SectionContainer, SectionEyebrow } from '../ui/Primitives';

interface TestimonialsSectionProps {
  testimonials?: TestimonialEntry[];
}

/**
 * Section H — Testimonials (Viralytics #52:1537 Asymmetric Quote + Speech-Tail Carousel).
 * Strictly renders ONLY genuine verified recommendations; hides cleanly when empty per CONTENT_RULES.md.
 */
export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const published = getPublishedTestimonials(testimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  if (published.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + published.length) % published.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % published.length);
  };

  return (
    <SectionContainer
      id="testimonials"
      ariaLabel="Professional recommendations"
      className="pt-24 sm:pt-28 lg:pt-[120px]"
    >
      <div
        data-gsap-section
        className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[72px]"
      >
        {/* Left Column — Viralytics #52:1538 Quotation Mark + Heading */}
        <div className="lg:w-[340px] shrink-0 space-y-10">
          <img
            src="/assets/figma/quote-mark.svg"
            alt=""
            aria-hidden="true"
            className="w-[76px] sm:w-[90px] h-auto"
          />
          <div className="space-y-4">
            <h2
              data-gsap-reveal
              className="font-editorial font-medium text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.18] tracking-[-0.02em] text-[#1A1A2E]"
            >
              Trusted by Peers &amp; Mentors
            </h2>
            <p
              data-gsap-reveal
              className="font-editorial text-base sm:text-[18px] leading-[1.55] text-[#646464]"
            >
              Feedback from security collaborations, research initiatives, and technical assessments.
            </p>
          </div>
        </div>

        {/* Right Column — Top Controls + Speech-Tail Cards (#52:1543) */}
        <div className="flex-1 min-w-0 w-full space-y-12">
          <div className="flex items-center justify-between gap-4">
            <SectionEyebrow label="Testimonials" />
            {published.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous recommendation"
                  className="w-11 h-11 rounded-full bg-[#FDF2F6] text-[#1A1A2E] flex items-center justify-center hover:bg-[#F8E2EA] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next recommendation"
                  className="w-11 h-11 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center hover:bg-[#2A2A46] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {published.slice(activeIndex, activeIndex + 2).map((item) => (
              <blockquote key={item.id} className="flex flex-col">
                <div className="rounded-t-[24px] rounded-br-[24px] rounded-bl-none bg-[#F8F7FA] p-6 sm:p-7 space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white font-editorial text-xs font-medium text-[#646464]">
                    {item.collaborationContext}
                  </span>
                  <p className="font-editorial text-base leading-[1.55] text-[#646464]">
                    “{item.quote}”
                  </p>
                </div>
                <footer className="flex items-center gap-3 pt-4 pl-2">
                  <div className="w-12 h-12 rounded-full bg-[#F8E2EA] overflow-hidden flex items-center justify-center shrink-0">
                    {item.authorPhotoUrl ? (
                      <img
                        src={item.authorPhotoUrl}
                        alt={item.authorName}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-editorial font-semibold text-sm text-[#1A1A2E]">
                        {item.authorInitials}
                      </span>
                    )}
                  </div>
                  <div>
                    <cite className="not-italic font-editorial font-semibold text-base text-[#1A1A2E] block">
                      {item.authorName}
                    </cite>
                    <span className="font-editorial text-sm text-[#646464]">
                      {item.role} · {item.organization}
                    </span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

