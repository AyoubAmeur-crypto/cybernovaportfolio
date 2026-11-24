import React, { useMemo, useRef, useState } from 'react';
import {
  Code2,
  Database,
  GlobeLock,
  Layers,
  Network,
  Radar,
  ScanSearch,
  ShieldAlert,
} from 'lucide-react';
import { TECHNICAL_ECOSYSTEM } from '../../data/portfolioData';
import type { TechTool } from '../../types/portfolio';
import { SectionContainer, SectionEyebrow } from '../ui/Primitives';
import { TechToolIcon } from '../icons/BrandAndTechIcons';

interface EcosystemFilterTab {
  id: string;
  label: string;
  description: string;
  tools: TechTool[];
  Icon: React.FC<{ className?: string }>;
  tone: 'blue' | 'pink';
}

const CATEGORY_META: Record<
  string,
  { Icon: React.FC<{ className?: string }>; tone: 'blue' | 'pink' }
> = {
  all: { Icon: Layers, tone: 'blue' },
  siem: { Icon: ShieldAlert, tone: 'pink' },
  network: { Icon: Radar, tone: 'blue' },
  'web-api': { Icon: GlobeLock, tone: 'pink' },
  'active-directory': { Icon: Network, tone: 'blue' },
  recon: { Icon: ScanSearch, tone: 'pink' },
  programming: { Icon: Code2, tone: 'blue' },
  platforms: { Icon: Database, tone: 'pink' },
};

export const TechEcosystemSection: React.FC = () => {
  const filterTabs = useMemo<EcosystemFilterTab[]>(() => {
    const allTools = TECHNICAL_ECOSYSTEM.flatMap((c) => c.tools);
    return [
      {
        id: 'all',
        label: 'All Technologies',
        description:
          'Complete cybersecurity and engineering stack across SIEM, packet forensics, web/API testing, Active Directory, and automation.',
        tools: allTools,
        Icon: CATEGORY_META.all.Icon,
        tone: CATEGORY_META.all.tone,
      },
      ...TECHNICAL_ECOSYSTEM.map((cat) => ({
        ...cat,
        Icon: CATEGORY_META[cat.id]?.Icon || ShieldAlert,
        tone: CATEGORY_META[cat.id]?.tone || 'pink',
      })),
    ];
  }, []);

  const [selectedId, setSelectedId] = useState<string>('all');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeCategory =
    filterTabs.find((tab) => tab.id === selectedId) || filterTabs[0];

  const handleSelectCategory = (id: string) => {
    if (id === selectedId) return;
    setIsTransitioning(true);
    setSelectedId(id);
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = filterTabs.findIndex((c) => c.id === selectedId);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % filterTabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + filterTabs.length) % filterTabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = filterTabs.length - 1;
    } else {
      return;
    }

    const nextTab = filterTabs[nextIndex];
    const nextBtn = tabRefs.current[nextIndex];
    if (nextBtn) {
      nextBtn.focus();
    }
    handleSelectCategory(nextTab.id);
  };

  // Expand shorter categories so each marquee half comfortably spans wide viewports seamlessly
  const repeatedHalfTrack = useMemo(() => {
    const base = activeCategory.tools;
    const minItems = 12;
    const repeats = Math.max(1, Math.ceil(minItems / base.length));
    const expanded: { tool: TechTool; key: string }[] = [];
    for (let r = 0; r < repeats; r++) {
      base.forEach((tool, idx) => {
        expanded.push({ tool, key: `${activeCategory.id}-${r}-${idx}-${tool.name}` });
      });
    }
    return expanded;
  }, [activeCategory]);

  const marqueeDurationSec = Math.max(24, repeatedHalfTrack.length * 2.4);

  return (
    <SectionContainer
      id="ecosystem"
      ariaLabel="Technical ecosystem and cybersecurity tools"
      className="pt-24 sm:pt-28 lg:pt-[120px]"
    >
      <div data-gsap-section className="space-y-10 sm:space-y-14">
        {/* Centered Heading */}
        <div className="flex flex-col items-center text-center max-w-[740px] mx-auto space-y-5">
          <SectionEyebrow label="Technical Ecosystem" align="center" />
          <h2
            data-gsap-reveal
            className="font-editorial font-medium text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.18] tracking-[-0.02em] text-[#1A1A2E]"
          >
            Tools Across Defensive &amp; Offensive Workflows
          </h2>
          <p
            data-gsap-reveal
            className="font-editorial text-base sm:text-[18px] leading-[1.55] text-[#646464]"
          >
            {activeCategory.description}
          </p>
        </div>

        {/* All 8 Category Pills Clearly Separated & Fully Visible with Lucide Icons in Blue / Pink */}
        <div data-gsap-reveal className="max-w-[1160px] mx-auto">
          <div
            role="tablist"
            aria-label="Cybersecurity tool categories"
            onKeyDown={handleKeyDown}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5"
          >
            {filterTabs.map((category, idx) => {
              const isSelected = category.id === selectedId;
              const PillIcon = category.Icon;
              const iconColor = isSelected
                ? category.tone === 'blue'
                  ? 'text-[#93C5FD]'
                  : 'text-[#FBCFE8]'
                : category.tone === 'blue'
                  ? 'text-[#3B6FD8]'
                  : 'text-[#D4879C]';

              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`ecosystem-tab-${category.id}`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleSelectCategory(category.id)}
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-editorial text-sm transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? 'bg-[#1A1A2E] text-white border-[#1A1A2E] shadow-[0_8px_22px_-6px_rgba(26,26,46,0.28)] font-medium'
                      : 'bg-[#F8F7FA] text-[#4E4E5E] border-[#1A1A2E]/8 hover:bg-[#FDF2F6] hover:border-[#D4879C]/45 hover:text-[#1A1A2E]'
                  }`}
                >
                  <PillIcon className={`w-4 h-4 shrink-0 transition-colors ${iconColor}`} />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continuous Smooth Horizontal Scrolling Technology Track Using Lucide Icons in Theme Blue & Pink */}
        <div
          role="tabpanel"
          aria-labelledby={`ecosystem-tab-${activeCategory.id}`}
          className={`tech-marquee-wrap relative overflow-hidden py-4 transition-all duration-300 ease-out ${
            isTransitioning ? 'opacity-35 translate-y-1' : 'opacity-100 translate-y-0'
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-white via-white/85 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-white via-white/85 to-transparent"
          />

          <div
            style={{ animationDuration: `${marqueeDurationSec}s` }}
            className="tech-marquee-track flex w-max items-stretch gap-5"
          >
            {[0, 1].map((halfIdx) =>
              repeatedHalfTrack.map(({ tool, key }) => (
                <div
                  key={`${halfIdx}-${key}`}
                  aria-hidden={halfIdx === 1 ? true : undefined}
                  className="w-[248px] sm:w-[272px] shrink-0 rounded-full bg-[#F8F7FA] px-6 py-4 flex items-center gap-3.5 hover:bg-[#FDF2F6] transition-colors"
                >
                  <TechToolIcon name={tool.name} className="w-5 h-5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-editorial font-semibold text-sm sm:text-base text-[#1A1A2E] truncate">
                      {tool.name}
                    </p>
                    <p className="font-editorial text-xs text-[#646464] truncate">
                      {tool.role}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
