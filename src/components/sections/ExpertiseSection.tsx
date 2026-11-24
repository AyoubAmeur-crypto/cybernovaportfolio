import React from 'react';
import {
  Activity,
  Check,
  GlobeLock,
  KeyRound,
  Network,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { CORE_EXPERTISE_DOMAINS } from '../../data/portfolioData';
import { SectionContainer, SectionEyebrow } from '../ui/Primitives';

/**
 * Section B — Core Expertise separated into 3 dedicated editorial sections,
 * each clearly explaining one specialization pillar with balanced Viralytics visuals.
 */
export const ExpertiseSection: React.FC = () => {
  const socDomain = CORE_EXPERTISE_DOMAINS.find((d) => d.id === 'soc')!;
  const apiDomain = CORE_EXPERTISE_DOMAINS.find((d) => d.id === 'api')!;
  const webDomain = CORE_EXPERTISE_DOMAINS.find((d) => d.id === 'webapp')!;
  const adDomain = CORE_EXPERTISE_DOMAINS.find((d) => d.id === 'ad')!;

  return (
    <SectionContainer
      id="expertise"
      ariaLabel="Core cybersecurity expertise"
      className="pt-24 sm:pt-28 lg:pt-[120px] space-y-20 sm:space-y-24 lg:space-y-[112px]"
    >
      {/* Section Header */}
      <div
        data-gsap-section
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div className="max-w-[580px] space-y-5">
          <SectionEyebrow label="Core Expertise" />
          <h2
            data-gsap-reveal
            className="font-editorial font-medium text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.18] tracking-[-0.02em] text-[#1A1A2E]"
          >
            Defensive Depth Across Three Core Specializations
          </h2>
        </div>

        <p
          data-gsap-reveal
          className="max-w-[440px] font-editorial text-base sm:text-[18px] leading-[1.55] text-[#646464] lg:pb-1"
        >
          Each discipline connects adversary behavior to practical detection, architectural hardening, and clear remediation.
        </p>
      </div>

      {/* Part 1: Security Operations & Incident Response */}
      <div
        data-gsap-section
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div data-gsap-reveal className="lg:col-span-6 space-y-6">
          <SectionEyebrow label="Part 01 · Defensive Operations" />
          <h3 className="font-editorial font-medium text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.2] tracking-[-0.02em] text-[#1A1A2E]">
            {socDomain.title} &amp; Threat Detection
          </h3>
          <p className="font-editorial text-base sm:text-[17px] leading-[1.6] text-[#646464]">
            {socDomain.summary} Every alert is contextualized across endpoint, network, and authentication logs to separate true adversary signal from operational noise.
          </p>

          <ul className="flex flex-wrap gap-2 pt-1">
            {socDomain.capabilities.map((cap) => (
              <li
                key={cap}
                className="px-3.5 py-1.5 rounded-full bg-[#F8F7FA] font-editorial text-xs sm:text-sm text-[#1A1A2E] border border-[#1A1A2E]/8"
              >
                {cap}
              </li>
            ))}
          </ul>
        </div>

        <div data-gsap-reveal className="lg:col-span-6">
          <div className="bg-white rounded-[24px] p-6 sm:p-7 viralytics-card-shadow border border-[#1A1A2E]/6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#3B6FD8]" />
                <span className="font-editorial text-sm font-semibold text-[#1A1A2E]">
                  MITRE ATT&amp;CK Detection Pipeline
                </span>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#F8E2EA] font-editorial text-xs font-medium text-[#1A1A2E] shrink-0">
                SOC Workflow
              </span>
              <span
                aria-label="SOC Workflow"
                className="inline-flex sm:hidden w-8 h-8 rounded-full bg-[#F8E2EA] items-center justify-center shrink-0"
              >
                <Activity className="w-4 h-4 text-[#B8687F]" />
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3 h-28 items-end pt-2">
              {[52, 74, 62, 94, 80].map((height, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full rounded-xl ${
                      idx === 3
                        ? 'bg-gradient-to-t from-[#3B6FD8] to-[#8DB5F8]'
                        : idx % 2 === 0
                          ? 'bg-[#F8E2EA]'
                          : 'bg-[#DCE8FC]'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1A1A2E]/6">
              <div className="flex items-center gap-2 font-editorial text-xs text-[#646464]">
                <Activity className="w-4 h-4 text-[#D4879C]" />
                <span>Log Correlation · Alert Triage · Threat Hunting</span>
              </div>
              <span className="font-editorial text-xs font-semibold text-[#3B6FD8]">
                Continuous
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Web Application & API Security (Alternating Split — No Outer Gray Box Wrapper) */}
      <div
        data-gsap-section
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div
          data-gsap-reveal
          className="order-2 lg:order-1 lg:col-span-6 space-y-4"
        >
          {/* Web Assessment Illustration Card */}
          <div className="bg-white rounded-[24px] p-6 viralytics-card-shadow border border-[#1A1A2E]/6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-editorial text-sm font-semibold text-[#1A1A2E]">
                <GlobeLock className="w-4 h-4 text-[#D4879C] shrink-0" />
                <span>Web Application Assessment</span>
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#FDF2F6] font-editorial text-xs font-medium text-[#B8687F] shrink-0">
                OWASP Top 10
              </span>
              <span
                aria-label="OWASP Top 10"
                className="inline-flex sm:hidden w-8 h-8 rounded-full bg-[#FDF2F6] items-center justify-center shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-[#B8687F]" />
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {webDomain.capabilities.slice(0, 4).map((cap) => (
                <div
                  key={cap}
                  className="flex items-start gap-2 py-1"
                >
                  <Check className="w-4 h-4 text-[#3B6FD8] shrink-0 mt-0.5" />
                  <span className="font-editorial text-xs sm:text-sm text-[#1A1A2E] leading-snug">
                    {cap}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* API Security Illustration Card */}
          <div className="bg-white rounded-[24px] p-6 viralytics-card-shadow border border-[#1A1A2E]/6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-editorial text-sm font-semibold text-[#1A1A2E]">
                <KeyRound className="w-4 h-4 text-[#3B6FD8] shrink-0" />
                <span>REST &amp; GraphQL API Gate</span>
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#EEF4FF] font-editorial text-xs font-medium text-[#3B6FD8] shrink-0">
                OWASP API 10
              </span>
              <span
                aria-label="OWASP API 10"
                className="inline-flex sm:hidden w-8 h-8 rounded-full bg-[#EEF4FF] items-center justify-center shrink-0"
              >
                <ShieldAlert className="w-4 h-4 text-[#3B6FD8]" />
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-1 border-t border-[#1A1A2E]/6 font-editorial text-xs">
              <div>
                <p className="text-[#646464]">Authorization</p>
                <p className="font-semibold text-[#1A1A2E] mt-1">BOLA Testing</p>
              </div>
              <div>
                <p className="text-[#646464]">Tokens</p>
                <p className="font-semibold text-[#1A1A2E] mt-1">JWT Validation</p>
              </div>
              <div>
                <p className="text-[#646464]">Payloads</p>
                <p className="font-semibold text-[#1A1A2E] mt-1">Exposure Audit</p>
              </div>
            </div>
          </div>
        </div>

        <div data-gsap-reveal className="order-1 lg:order-2 lg:col-span-6 space-y-6">
          <SectionEyebrow label="Part 02 · Application & Service Boundaries" />
          <h3 className="font-editorial font-medium text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.2] tracking-[-0.02em] text-[#1A1A2E]">
            Web Application &amp; API Security
          </h3>
          <p className="font-editorial text-base sm:text-[17px] leading-[1.6] text-[#646464]">
            {webDomain.summary} Extending across REST and GraphQL backends, {apiDomain.summary.charAt(0).toLowerCase() + apiDomain.summary.slice(1)}
          </p>

          <ul className="flex flex-wrap gap-2 pt-1">
            {[...webDomain.capabilities, ...apiDomain.capabilities].map((cap) => (
              <li
                key={cap}
                className="px-3.5 py-1.5 rounded-full bg-[#F8F7FA] font-editorial text-xs sm:text-sm text-[#1A1A2E] border border-[#1A1A2E]/8"
              >
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Part 3: Active Directory Security & Hardening */}
      <div
        data-gsap-section
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div data-gsap-reveal className="lg:col-span-6 space-y-6">
          <SectionEyebrow label="Part 03 · Identity Infrastructure" />
          <h3 className="font-editorial font-medium text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.2] tracking-[-0.02em] text-[#1A1A2E]">
            {adDomain.title}
          </h3>
          <p className="font-editorial text-base sm:text-[17px] leading-[1.6] text-[#646464]">
            {adDomain.summary} Assessments trace real identity paths from initial domain foothold to privilege escalation so defensive teams can harden ACLs, authentication protocols, and Group Policy cleanly.
          </p>

          <ul className="flex flex-wrap gap-2 pt-1">
            {adDomain.capabilities.map((cap) => (
              <li
                key={cap}
                className="px-3.5 py-1.5 rounded-full bg-[#F8F7FA] font-editorial text-xs sm:text-sm text-[#1A1A2E] border border-[#1A1A2E]/8"
              >
                {cap}
              </li>
            ))}
          </ul>
        </div>

        <div data-gsap-reveal className="lg:col-span-6">
          <div className="bg-white rounded-[24px] p-6 sm:p-7 viralytics-card-shadow border border-[#1A1A2E]/6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-[#3B6FD8] shrink-0" />
                <span className="font-editorial text-sm font-semibold text-[#1A1A2E]">
                  Directory Attack-Path &amp; Hardening
                </span>
              </div>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-[#EEF4FF] font-editorial text-[11px] font-semibold text-[#3B6FD8] shrink-0">
                Identity Tiering
              </span>
              <span
                aria-label="Identity Tiering"
                className="inline-flex sm:hidden w-8 h-8 rounded-full bg-[#EEF4FF] items-center justify-center shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-[#3B6FD8]" />
              </span>
            </div>

            <div className="divide-y divide-[#1A1A2E]/8">
              {[
                {
                  step: '01',
                  node: 'Domain Enumeration',
                  detail: 'LDAP, trusts, SPNs & ACL visibility',
                },
                {
                  step: '02',
                  node: 'Attack Path Analysis',
                  detail: 'Lateral movement & escalation chains',
                },
                {
                  step: '03',
                  node: 'Auth & GPO Review',
                  detail: 'Kerberos/NTLM & policy posture',
                },
                {
                  step: '04',
                  node: 'AD Hardening',
                  detail: 'Tiered admin & least-privilege controls',
                },
              ].map((stage, index) => (
                <div
                  key={stage.step}
                  className="py-3 first:pt-1 last:pb-1 flex items-baseline justify-between gap-4"
                >
                  <div>
                    <span
                      className={`font-editorial text-sm font-semibold ${
                        index === 3 ? 'text-[#3B6FD8]' : 'text-[#1A1A2E]'
                      }`}
                    >
                      {stage.node}
                    </span>
                    <p className="font-editorial text-xs text-[#646464] mt-0.5">
                      {stage.detail}
                    </p>
                  </div>
                  <span className="font-editorial text-xs font-semibold text-[#D4879C] shrink-0">
                    {stage.step}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1A1A2E]/6 text-xs font-editorial text-[#646464]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#D4879C]" />
                <span>Kerberos · LDAP · SMB · GPO Hygiene</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
