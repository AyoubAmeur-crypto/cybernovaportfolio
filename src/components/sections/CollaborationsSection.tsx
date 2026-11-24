import React from 'react';
import { Linkedin } from 'lucide-react';
import { getPublishedCollaborators } from '../../data/portfolioData';
import type { CollaboratorEntry } from '../../types/portfolio';
import { SectionContainer, SectionEyebrow } from '../ui/Primitives';

interface CollaborationsSectionProps {
  collaborators?: CollaboratorEntry[];
}

/**
 * Section G — People & Collaborations (Viralytics #52:1445 "Team Section" Layout).
 * Strictly renders ONLY verified collaborators; hides cleanly when empty per CONTENT_RULES.md.
 */
export const CollaborationsSection: React.FC<CollaborationsSectionProps> = ({ collaborators }) => {
  const published = getPublishedCollaborators(collaborators);

  if (published.length === 0) {
    return null;
  }

  return (
    <SectionContainer
      id="collaborations"
      ariaLabel="People and collaborations"
      className="pt-24 sm:pt-28 lg:pt-[120px]"
    >
      <div data-gsap-section className="space-y-14 sm:space-y-16 lg:space-y-[80px]">
        <div className="flex flex-col items-center text-center space-y-5">
          <SectionEyebrow label="Collaborations" align="center" />
          <h2
            data-gsap-reveal
            className="font-editorial font-medium text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.18] tracking-[-0.02em] text-[#1A1A2E]"
          >
            Great security is a collective effort.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {published.map((person) => {
            if (person.featured) {
              return (
                <article
                  key={person.id}
                  data-gsap-reveal
                  className="w-full sm:w-[312px] min-h-[400px] rounded-[24px] bg-[#F8F7FA] viralytics-card-shadow p-6 flex flex-col items-center justify-between text-center gap-6"
                >
                  <div className="w-[210px] h-[210px] rounded-full bg-[#F8E2EA] overflow-hidden flex items-center justify-center">
                    {person.photoUrl ? (
                      <img
                        src={person.photoUrl}
                        alt={person.fullName}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-editorial font-semibold text-4xl text-[#1A1A2E]">
                        {person.initials}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-editorial font-medium text-lg text-[#1A1A2E]">
                      {person.fullName}
                    </h3>
                    <p className="font-editorial text-sm text-[#646464]">
                      {person.role}
                      {person.organization ? ` · ${person.organization}` : ''}
                    </p>
                    <p className="font-editorial text-xs text-[#646464]">
                      {person.collaborationContext}
                    </p>
                  </div>

                  {person.linkedinUrl && (
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.fullName} LinkedIn profile`}
                      className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center hover:bg-[#D4879C] hover:text-[#1A1A2E] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </article>
              );
            }

            return (
              <article
                key={person.id}
                data-gsap-reveal
                className="w-full sm:w-[312px] min-h-[400px] rounded-[24px] bg-[#FDF2F6] p-6 flex flex-col justify-between text-center gap-6"
              >
                <div className="space-y-1">
                  <h3 className="font-editorial font-semibold text-base text-[#1A1A2E]">
                    {person.fullName}
                  </h3>
                  <p className="font-editorial text-xs text-[#646464]">
                    {person.role}
                    {person.organization ? ` · ${person.organization}` : ''}
                  </p>
                </div>

                <div className="w-36 h-36 mx-auto rounded-full bg-white viralytics-card-shadow overflow-hidden flex items-center justify-center">
                  {person.photoUrl ? (
                    <img
                      src={person.photoUrl}
                      alt={person.fullName}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-editorial font-semibold text-2xl text-[#1A1A2E]">
                      {person.initials}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="font-editorial text-xs text-[#646464]">
                    {person.collaborationContext}
                  </p>
                  {person.linkedinUrl && (
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.fullName} LinkedIn profile`}
                      className="inline-flex w-8 h-8 rounded-full bg-[#1A1A2E] text-white items-center justify-center hover:bg-[#D4879C] hover:text-[#1A1A2E] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};

