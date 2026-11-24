import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getPublishedProjects } from '../../data/portfolioData';
import type { ProjectCaseStudy } from '../../types/portfolio';
import { PillButton, SectionContainer, SectionEyebrow } from '../ui/Primitives';

interface ProjectsSectionProps {
  projects?: ProjectCaseStudy[];
}

/**
 * Section D — Selected Projects (Viralytics #52:1580 + #52:1526 Case Study Layout).
 * Strictly renders ONLY verified projects; hides cleanly when empty per CONTENT_RULES.md.
 */
export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const published = getPublishedProjects(projects);

  if (published.length === 0) {
    return null;
  }

  return (
    <SectionContainer
      id="projects"
      ariaLabel="Selected cybersecurity projects"
      className="pt-24 sm:pt-28 lg:pt-[120px]"
    >
      <div data-gsap-section className="space-y-12 sm:space-y-16">
        <div className="flex flex-col items-center text-center max-w-[680px] mx-auto space-y-5">
          <SectionEyebrow label="Selected Projects" align="center" />
          <h2
            data-gsap-reveal
            className="font-editorial font-medium text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.18] tracking-[-0.02em] text-[#1A1A2E]"
          >
            Applied Security Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {published.map((project, idx) => (
            <article
              key={project.id}
              data-gsap-reveal
              className="rounded-[24px] bg-[#FDF2F6] p-4 sm:p-6 flex flex-col justify-between gap-6"
            >
              <div className="flex items-center justify-between px-2">
                <span className="px-3.5 py-1 rounded-full bg-white font-editorial text-xs font-medium text-[#1A1A2E] viralytics-card-shadow">
                  {project.domain}
                </span>
                <span className="font-editorial text-xs font-semibold uppercase tracking-[0.1em] text-[#646464]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="bg-white rounded-[20px] p-6 space-y-5 flex-1 flex flex-col justify-between viralytics-card-shadow">
                <div className="space-y-4">
                  {project.imageUrl && (
                    <div className="h-52 w-full rounded-[16px] overflow-hidden bg-[#F8F7FA]">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <h3 className="font-editorial font-medium text-2xl text-[#1A1A2E]">
                    {project.title}
                  </h3>

                  <div className="space-y-2 font-editorial text-sm text-[#646464]">
                    <p>
                      <strong className="text-[#1A1A2E] font-semibold">Problem:</strong>{' '}
                      {project.problem}
                    </p>
                    <p>
                      <strong className="text-[#1A1A2E] font-semibold">Objective:</strong>{' '}
                      {project.objective}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-editorial text-xs font-semibold uppercase tracking-[0.08em] text-[#1A1A2E]">
                      Methodology
                    </p>
                    <ul className="space-y-1.5">
                      {project.methodology.map((step) => (
                        <li
                          key={step}
                          className="flex items-start gap-2 font-editorial text-sm text-[#646464]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#D4879C] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="font-editorial text-sm text-[#1A1A2E]">
                    <strong className="font-semibold">Outcome:</strong> {project.outcomes}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1A1A2E]/8 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-full bg-[#F8F7FA] font-editorial text-xs text-[#1A1A2E]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.repoUrl && (
                      <PillButton
                        variant="solid-dark"
                        href={project.repoUrl}
                        external
                        className="px-4 py-2 text-xs"
                      >
                        <span>Repository</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </PillButton>
                    )}
                    {project.docsUrl && (
                      <PillButton
                        variant="outline-light"
                        href={project.docsUrl}
                        external
                        className="px-4 py-2 text-xs"
                      >
                        <span>Documentation</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </PillButton>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

