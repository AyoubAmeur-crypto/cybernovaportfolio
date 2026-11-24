import React from 'react';
import { FaHackerrank, FaLinkedin } from 'react-icons/fa6';
import { SiGithub, SiGmail, SiTryhackme } from 'react-icons/si';
import {
  Activity,
  AppWindow,
  Binary,
  Boxes,
  Braces,
  Bug,
  Code2,
  Cpu,
  Crosshair,
  Database,
  Eye,
  FileCode2,
  Flame,
  FolderTree,
  GitFork,
  GlobeLock,
  HardDrive,
  KeyRound,
  Network,
  Radar,
  ScanSearch,
  Send,
  Server,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  TerminalSquare,
  Waves,
  Zap,
} from 'lucide-react';

interface IconProps {
  className?: string;
  tone?: 'pink' | 'light-pink';
}

const getPinkClass = (tone: IconProps['tone'] = 'pink') =>
  tone === 'light-pink' ? 'text-[#FBCFE8]' : 'text-[#D4879C]';

/**
 * Official vector brand icons from `react-icons` (`react-icons/si` & `react-icons/fa6`),
 * styled in the portfolio's theme pink (`#D4879C` / `#FBCFE8`) — zero PNGs, zero custom SVGs.
 */
export const GmailLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', tone = 'pink' }) => (
  <SiGmail aria-hidden="true" className={`${className} ${getPinkClass(tone)} shrink-0`.trim()} />
);

export const LinkedInLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', tone = 'pink' }) => (
  <FaLinkedin aria-hidden="true" className={`${className} ${getPinkClass(tone)} shrink-0`.trim()} />
);

export const GitHubLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', tone = 'pink' }) => (
  <SiGithub aria-hidden="true" className={`${className} ${getPinkClass(tone)} shrink-0`.trim()} />
);

export const TryHackMeLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', tone = 'pink' }) => (
  <SiTryhackme aria-hidden="true" className={`${className} ${getPinkClass(tone)} shrink-0`.trim()} />
);

export const HackerRankLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', tone = 'pink' }) => (
  <FaHackerrank aria-hidden="true" className={`${className} ${getPinkClass(tone)} shrink-0`.trim()} />
);

type LucideIconComponent = React.FC<{ className?: string }>;

const LUCIDE_TOOL_MAP: Record<
  string,
  { Icon: LucideIconComponent; tone: 'blue' | 'pink' }
> = {
  Splunk: { Icon: Activity, tone: 'blue' },
  Elastic: { Icon: LayersIconFallback, tone: 'pink' },
  Wazuh: { Icon: ShieldCheck, tone: 'blue' },
  QRadar: { Icon: Radar, tone: 'pink' },
  Wireshark: { Icon: Waves, tone: 'blue' },
  Zeek: { Icon: Eye, tone: 'pink' },
  Suricata: { Icon: Flame, tone: 'pink' },
  Snort: { Icon: ShieldAlert, tone: 'blue' },
  'Cisco Packet Tracer': { Icon: Network, tone: 'blue' },
  'Burp Suite': { Icon: Bug, tone: 'pink' },
  'OWASP ZAP': { Icon: Zap, tone: 'blue' },
  Postman: { Icon: Send, tone: 'pink' },
  sqlmap: { Icon: Database, tone: 'blue' },
  Nikto: { Icon: ScanSearch, tone: 'pink' },
  BloodHound: { Icon: GitFork, tone: 'pink' },
  PowerView: { Icon: TerminalSquare, tone: 'blue' },
  Mimikatz: { Icon: KeyRound, tone: 'pink' },
  Impacket: { Icon: Boxes, tone: 'blue' },
  NetExec: { Icon: Terminal, tone: 'pink' },
  Nmap: { Icon: Crosshair, tone: 'blue' },
  Metasploit: { Icon: GlobeLock, tone: 'pink' },
  Python: { Icon: FileCode2, tone: 'blue' },
  PowerShell: { Icon: TerminalSquare, tone: 'blue' },
  Bash: { Icon: Terminal, tone: 'pink' },
  Java: { Icon: Code2, tone: 'pink' },
  'C++': { Icon: Cpu, tone: 'blue' },
  C: { Icon: Binary, tone: 'pink' },
  Linux: { Icon: Server, tone: 'blue' },
  'Windows Server': { Icon: AppWindow, tone: 'blue' },
  'Active Directory': { Icon: FolderTree, tone: 'pink' },
  SQL: { Icon: Database, tone: 'blue' },
  'Oracle SQL Developer': { Icon: HardDrive, tone: 'pink' },
};

function LayersIconFallback({ className }: { className?: string }) {
  return <Braces className={className} />;
}

/**
 * Renders Lucide icons for every cybersecurity & engineering tool, styled in theme blue or pink.
 */
export const TechToolIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-6 h-6',
}) => {
  const entry = LUCIDE_TOOL_MAP[name] || { Icon: ShieldCheck, tone: 'pink' as const };
  const colorClass = entry.tone === 'blue' ? 'text-[#3B6FD8]' : 'text-[#D4879C]';
  const IconComp = entry.Icon;
  return <IconComp className={`${className} ${colorClass}`.trim()} />;
};

export function getTechToolTone(name: string): 'blue' | 'pink' {
  return LUCIDE_TOOL_MAP[name]?.tone || 'pink';
}
