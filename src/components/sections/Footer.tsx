import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getVisibleNavLinks, SALMA_PROFILE } from '../../data/portfolioData';
import { useSmoothScroll } from '../../context/SmoothScrollContext';
import { BrandLogo } from '../ui/Primitives';
import {
  GitHubLogo,
  GmailLogo,
  HackerRankLogo,
  LinkedInLogo,
  TryHackMeLogo,
} from '../icons/BrandAndTechIcons';

/**
 * Section K — Footer (Viralytics #52:1601 Framed Atmospheric Footer + Oversized Dark-Blue salmaatou Wordmark Underneath).
 */
export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const navLinks = getVisibleNavLinks();

  return (
    <footer className="w-full max-w-[1440px] mx-auto pt-16 sm:pt-20 lg:pt-24 px-2 sm:px-3 pb-6 overflow-hidden">
      <div className="relative rounded-[20px] overflow-hidden min-h-[460px] flex flex-col justify-between bg-[#1A1A2E] text-white">
        {/* Viralytics #I52:1601;1:758 Landscape Backdrop + Reconciled Navy-Rose Gradient */}
        <img
          src="/assets/figma/footer-landscape-5fcf5c.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover rose-navy-art-filter opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(185deg,rgba(26,26,46,0.88)_0%,rgba(26,26,46,0.68)_55%,rgba(38,24,46,0.88)_100%)]"
        />

        {/* Top Row: Identity + Pill Direct Email Bar + Structured Columns */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row justify-between gap-12">
          <div className="max-w-[390px] flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <BrandLogo tone="dark" size="lg" />

              <p className="font-editorial text-sm text-[#F8F7FA]/90">
                {SALMA_PROFILE.title}
              </p>

              <p className="font-editorial text-sm text-[#FBCFE8] italic">
                “{SALMA_PROFILE.closingStatement}”
              </p>
            </div>

            <div className="rounded-full bg-[#F8F7FA] pl-5 pr-1.5 py-1.5 flex items-center justify-between gap-3">
              <span className="font-editorial text-xs sm:text-sm text-[#646464] truncate">
                {SALMA_PROFILE.links.email}
              </span>
              <a
                href={`mailto:${SALMA_PROFILE.links.email}`}
                className="shrink-0 rounded-full bg-[#1A1A2E] text-white px-5 py-2.5 font-editorial text-xs sm:text-sm font-medium hover:bg-[#2A2A46] transition-colors"
              >
                Talk to me
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-14">
            <div className="space-y-5">
              <h3 className="font-editorial font-semibold text-base text-white">Navigation</h3>
              <ul className="space-y-3.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="font-editorial text-sm text-[#F8F7FA]/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="font-editorial font-semibold text-base text-white">Focus Domains</h3>
              <ul className="space-y-3.5 font-editorial text-sm text-[#F8F7FA]/80">
                <li>Security Operations (SOC)</li>
                <li>Offensive Security</li>
                <li>Web App Security</li>
                <li>API Security</li>
                <li>Active Directory</li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-5">
              <h3 className="font-editorial font-semibold text-base text-white">Connect</h3>
              <ul className="space-y-3.5 font-editorial text-sm text-[#F8F7FA]/85">
                <li>
                  <a
                    href={`mailto:${SALMA_PROFILE.links.email}`}
                    className="underline underline-offset-4 hover:text-[#FBCFE8] transition-colors break-all"
                  >
                    {SALMA_PROFILE.links.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SALMA_PROFILE.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#FBCFE8] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={SALMA_PROFILE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#FBCFE8] transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={SALMA_PROFILE.links.tryhackme}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#FBCFE8] transition-colors"
                  >
                    <span>TryHackMe</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={SALMA_PROFILE.links.hackerrank}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#FBCFE8] transition-colors"
                  >
                    <span>HackerRank</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Socials Row with Official LinkedIn, Gmail, GitHub, TryHackMe, and HackerRank Icons */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-6 border-t border-white/12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SALMA_PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Salma Atou LinkedIn"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              <LinkedInLogo className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${SALMA_PROFILE.links.email}`}
              aria-label="Email Salma Atou via Gmail"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              <GmailLogo className="w-5 h-5" />
            </a>
            <a
              href={SALMA_PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Salma Atou GitHub"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              <GitHubLogo className="w-5 h-5" />
            </a>
            <a
              href={SALMA_PROFILE.links.tryhackme}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Salma Atou TryHackMe Profile"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              <TryHackMeLogo className="w-5 h-5" />
            </a>
            <a
              href={SALMA_PROFILE.links.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Salma Atou HackerRank Profile"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              <HackerRankLogo className="w-5 h-5" />
            </a>
          </div>

          <p className="font-editorial text-xs sm:text-sm text-[#F8F7FA]/80 text-center sm:text-right">
            © {new Date().getFullYear()} {SALMA_PROFILE.name}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Natural Unstretched Oversized Watermark ("salmaatou") Scaled Up Proportionally Right Under Footer */}
      <div className="pt-2 sm:pt-3 pb-2 flex items-baseline justify-center overflow-hidden select-none px-1">
        <p
          aria-hidden="true"
          className="salma-signature-gradient text-[18.6vw] xl:text-[268px] leading-[0.82] text-center whitespace-nowrap inline-flex items-baseline justify-center gap-0 lowercase"
        >
          <span className="font-brand-salma italic font-normal tracking-[-0.015em] mr-[0.02em]">
            salma
          </span>
          <span className="font-brand-atou text-[0.86em] font-bold tracking-[-0.045em]">
            atou
          </span>
        </p>
      </div>
    </footer>
  );
};
