import React from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { getPublishedCertifications } from '../../data/portfolioData';
import type { CertificationEntry } from '../../types/portfolio';
import { SectionContainer, SectionEyebrow } from '../ui/Primitives';

interface CertificationsSectionProps {
  certifications?: CertificationEntry[];
}

/**
 * Section I — Certifications (Viralytics #52:1590 800px Centered 32px-Radius Pill Accordion).
 * Uses native <details> + <summary> (modern-web-guidance `accordion` compliant).
 * Strictly renders ONLY 'verified' and confirmed 'in_progress' credentials; hides when none are confirmed.
 */
export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  const published = getPublishedCertifications(certifications);

  if (published.length === 0) {
    return null;
  }

  return (
    <SectionContainer
      id="certifications"
      ariaLabel="Certifications and credentials"
      className="pt-24 sm:pt-28 lg:pt-[120px]"
    >
      <div data-gsap-section className="space-y-14 sm:space-y-16">
        <div className="flex flex-col items-center text-center space-y-5">
          <SectionEyebrow label="Credentials" align="center" />
          <h2
            data-gsap-reveal
            className="font-editorial font-medium text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.18] tracking-[-0.02em] text-[#1A1A2E]"
          >
            Certifications &amp; Active Learning Paths
          </h2>
        </div>

        <div className="max-w-[800px] mx-auto space-y-4">
          {published.map((cert, index) => (
            <details
              key={cert.id}
              open={index === 0}
              className="viralytics-details group rounded-[32px] bg-[#FDF2F6] open:bg-[#F8F7FA] px-6 py-3 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 py-2 cursor-pointer font-editorial">
                <span className="flex items-center gap-3 min-w-0">
                  <ChevronDown className="w-5 h-5 text-[#1A1A2E] shrink-0 -rotate-90 group-open:rotate-0 transition-transform duration-200" />
                  <span className="text-base sm:text-[18px] font-medium text-[#1A1A2E] truncate">
                    {cert.title}
                  </span>
                </span>

                <span
                  className={`shrink-0 px-3.5 py-1 rounded-full text-xs font-semibold ${
                    cert.status === 'verified'
                      ? 'bg-[#1A1A2E] text-white'
                      : 'bg-[#F8E2EA] text-[#1A1A2E]'
                  }`}
                >
                  {cert.status === 'verified' ? 'Verified' : 'In Progress'}
                </span>
              </summary>

              <div className="pt-2 pb-3 pl-8 pr-2 space-y-2 font-editorial text-sm text-[#646464]">
                <p>
                  <strong className="text-[#1A1A2E] font-semibold">{cert.issuer}</strong> ·{' '}
                  {cert.domain}
                </p>
                <p>{cert.notes}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A2E] underline underline-offset-4 hover:text-[#D4879C]"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

