import React, { useState } from 'react';
import { Activity, AlertCircle, Eye, Layers, Radio } from 'lucide-react';
import { SIMULATED_SOC_EVENTS, SIMULATED_SOC_METRICS } from '../../data/portfolioData';
import { SectionContainer, SectionEyebrow } from '../ui/Primitives';

const HEATMAP_ROWS = [
  { window: '00–04h', cells: [1, 1, 2, 1, 1, 2, 1] },
  { window: '04–08h', cells: [1, 2, 2, 3, 2, 1, 1] },
  { window: '08–12h', cells: [2, 3, 4, 4, 3, 2, 2] },
  { window: '12–16h', cells: [2, 4, 3, 4, 4, 2, 1] },
  { window: '16–20h', cells: [2, 3, 3, 2, 3, 2, 1] },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const SocShowcaseSection: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(SIMULATED_SOC_EVENTS[0].id);
  const activeEvent =
    SIMULATED_SOC_EVENTS.find((ev) => ev.id === selectedEventId) || SIMULATED_SOC_EVENTS[0];

  return (
    <SectionContainer
      id="operations-showcase"
      ariaLabel="Conceptual Security Operations Showcase"
      className="pt-24 sm:pt-28 lg:pt-[120px]"
    >
      <div data-gsap-section className="space-y-12 sm:space-y-16">
        {/* Heading + Mandatory Simulated Data Disclosure */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-[600px] space-y-5">
            <SectionEyebrow label="Security Operations Showcase" />
            <h2
              data-gsap-reveal
              className="font-editorial font-medium text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.18] tracking-[-0.02em] text-[#1A1A2E]"
            >
              Correlating Events Into Clear Analyst Decisions
            </h2>
          </div>

          <div data-gsap-reveal className="flex flex-col items-start lg:items-end gap-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF2F6] border border-[#D4879C]/35 font-editorial text-xs font-semibold text-[#1A1A2E]">
              <AlertCircle className="w-3.5 h-3.5 text-[#D4879C]" />
              <span>Conceptual Visualization · Simulated Lab Telemetry</span>
            </span>
            <p className="font-editorial text-xs text-[#646464] max-w-[380px] lg:text-right">
              Illustrative SOC interface model demonstrating monitoring, correlation, and alert triage workflows—not operational client metrics.
            </p>
          </div>
        </div>

        {/* Viralytics Dashboard Showcase Surface (#52:1321 / #52:1353 Card Composition) */}
        <div
          data-gsap-reveal
          className="rounded-[28px] bg-[#FDF2F6] p-5 sm:p-8 lg:p-10 space-y-6 border border-[#D4879C]/15"
        >
          {/* Top 3 Conceptual Telemetry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SIMULATED_SOC_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="bg-white rounded-[24px] p-6 viralytics-card-shadow flex flex-col justify-between gap-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-editorial text-xs font-medium text-[#646464]">
                    {metric.label}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#F8E2EA] font-editorial text-[11px] font-semibold text-[#1A1A2E]">
                    {metric.delta}
                  </span>
                </div>
                <div>
                  <p className="font-editorial font-medium text-2xl sm:text-[26px] text-[#1A1A2E] tracking-tight">
                    {metric.value}
                  </p>
                  <p className="font-editorial text-xs text-[#646464] mt-1.5 leading-relaxed">
                    {metric.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Split: Left Activity Heatmap & Severity Curve + Right Alert Triage Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Network & Telemetry Activity Heatmap (Viralytics #52:1324 / #52:1382 Adaptation) */}
            <div className="lg:col-span-5 bg-white rounded-[24px] p-6 viralytics-card-shadow flex flex-col justify-between gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#D4879C]" />
                  <h3 className="font-editorial font-semibold text-base text-[#1A1A2E]">
                    Simulated Network Activity
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F8F7FA] font-editorial text-xs text-[#646464]">
                  7-Day Window (Lab)
                </span>
              </div>

              <div className="space-y-2">
                {HEATMAP_ROWS.map((row) => (
                  <div key={row.window} className="grid grid-cols-8 items-center gap-2">
                    <span className="font-editorial text-[11px] text-[#646464] col-span-2">
                      {row.window}
                    </span>
                    <div className="col-span-6 grid grid-cols-7 gap-1.5">
                      {row.cells.map((intensity, idx) => {
                        const cellColor =
                          intensity === 4
                            ? 'bg-[#D4879C]'
                            : intensity === 3
                              ? 'bg-[#E6AFC0]'
                              : intensity === 2
                                ? 'bg-[#F8E2EA]'
                                : 'bg-[#F8F7FA]';
                        return (
                          <div
                            key={`${row.window}-${DAYS[idx]}`}
                            title={`${DAYS[idx]} ${row.window} — Simulated density level ${intensity}`}
                            className={`h-6 rounded-md ${cellColor}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-8 items-center gap-2 pt-1">
                  <span className="col-span-2" />
                  <div className="col-span-6 grid grid-cols-7 gap-1.5 text-center">
                    {DAYS.map((d) => (
                      <span key={d} className="font-editorial text-[10px] text-[#646464]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Severity Distribution Strip */}
              <div className="pt-4 border-t border-[#1A1A2E]/8 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-editorial">
                  <span className="font-medium text-[#1A1A2E]">
                    Simulated Severity Distribution
                  </span>
                  <span className="text-[#646464]">Sample Lab Queue</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#F8F7FA]">
                  <div className="w-[14%] bg-[#1A1A2E]" title="High" />
                  <div className="w-[32%] bg-[#D4879C]" title="Medium" />
                  <div className="w-[34%] bg-[#E6AFC0]" title="Low" />
                  <div className="w-[20%] bg-[#F8E2EA]" title="Informational" />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-editorial text-[#646464]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1A1A2E]" /> High
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4879C]" /> Medium
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E6AFC0]" /> Low
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F8E2EA]" /> Info
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Alert Investigation & Event Correlation Timeline */}
            <div className="lg:col-span-7 bg-white rounded-[24px] p-6 viralytics-card-shadow flex flex-col justify-between gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4879C]" />
                  <h3 className="font-editorial font-semibold text-base text-[#1A1A2E]">
                    Threat Detection &amp; Correlation Queue
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 font-editorial text-xs text-[#646464]">
                  <Eye className="w-3.5 h-3.5 text-[#D4879C]" />
                  <span>Select an event to inspect triage logic</span>
                </span>
              </div>

              <div className="space-y-2.5">
                {SIMULATED_SOC_EVENTS.map((ev) => {
                  const isSelected = ev.id === activeEvent.id;
                  const sevBadge =
                    ev.severity === 'High'
                      ? 'bg-[#1A1A2E] text-white'
                      : ev.severity === 'Medium'
                        ? 'bg-[#F8E2EA] text-[#1A1A2E]'
                        : 'bg-[#F8F7FA] text-[#646464]';

                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setSelectedEventId(ev.id)}
                      className={`w-full text-left rounded-[18px] p-4 transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#FDF2F6] border-[#D4879C]/55'
                          : 'bg-[#F8F7FA] border-transparent hover:border-[#1A1A2E]/12'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-editorial text-xs font-semibold text-[#1A1A2E]">
                            {ev.id}
                          </span>
                          <span className="font-editorial text-xs text-[#646464]">
                            · {ev.source}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-editorial text-[11px] text-[#646464]">
                            {ev.timestamp}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-editorial text-[11px] font-semibold ${sevBadge}`}
                          >
                            {ev.severity}
                          </span>
                        </div>
                      </div>
                      <p className="font-editorial text-sm font-medium text-[#1A1A2E]">
                        {ev.technique}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Investigation Summary Drawer */}
              <div className="rounded-[18px] bg-[#1A1A2E] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-editorial text-[#FBCFE8]">
                    <Activity className="w-3.5 h-3.5" />
                    <span>
                      Simulated Triage Focus · {activeEvent.id} ({activeEvent.status})
                    </span>
                  </div>
                  <p className="font-editorial text-xs sm:text-sm text-white/85 leading-relaxed">
                    Correlates source telemetry ({activeEvent.source}) against MITRE ATT&amp;CK behavior patterns to validate true-positive impact before containment.
                  </p>
                </div>
                <span className="shrink-0 self-start sm:self-center px-3.5 py-1.5 rounded-full bg-white/12 font-editorial text-xs font-medium text-white">
                  {activeEvent.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

