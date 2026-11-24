import type {
  CertificationEntry,
  CollaboratorEntry,
  ExpertiseDomain,
  IntroHighlight,
  MethodologyStep,
  NavLinkItem,
  ProfessionalProfile,
  ProjectCaseStudy,
  SimulatedSocEvent,
  SimulatedSocMetric,
  TechCategory,
  TestimonialEntry,
} from '../types/portfolio';

export const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260703_053131_1ec3dd1c-d627-44fb-ab20-6e1fce41b0d5.mp4';

export const SALMA_PROFILE: ProfessionalProfile = {
  name: 'Salma Atou',
  heroDisplayName: 'Salma Atou',
  title: 'Cybersecurity Engineer',
  availability:
    'Open to opportunities in security operations, penetration testing and application security.',
  specializations: [
    'Security Operations Center (SOC)',
    'Offensive Security',
    'Web Application Security',
    'API Security',
    'Active Directory Security',
    'Threat Detection and Incident Response',
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/salma-atou-532846332',
    email: 'Salmaatouofficiel@gmail.com',
    tryhackme: 'https://tryhackme.com/p/SalmaAtouCyberNova',
    github: 'https://github.com/salmaatou-cybernova',
    hackerrank: 'https://www.hackerrank.com',
  },
  closingStatement: 'Trust, but verify — then verify again.',
};

/**
 * Active Contact Form Delivery Recipient:
 * Points to Salma's verified email (`Salmaatouofficiel@gmail.com`) by default,
 * with optional override via `VITE_CONTACT_EMAIL` in Vercel Environment Variables.
 */
export const CONTACT_DELIVERY_EMAIL: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_EMAIL) ||
  SALMA_PROFILE.links.email;

export const PRIMARY_NAV_LINKS: NavLinkItem[] = [
  { id: 'home', label: 'Home', href: '#top' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'expertise', label: 'Expertise', href: '#expertise' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'ecosystem', label: 'Ecosystem', href: '#ecosystem' },
  { id: 'methodology', label: 'Methodology', href: '#methodology' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const INTRO_CONTENT = {
  eyebrow: 'About',
  heading: 'Security through a different perspective.',
  paragraphs: [
    'I approach cybersecurity at the intersection of continuous defensive monitoring and structured offensive assessment.',
    'By understanding how modern web applications, APIs, and Active Directory environments are probed in practice, every detection rule, triage workflow, and remediation recommendation is grounded in real attack mechanics rather than surface checklists.',
  ],
  ctaLabel: 'Explore Core Expertise',
  ctaHref: '#expertise',
  highlights: [
    {
      value: 'Blue + Red',
      label: 'Defensive Monitoring\n& Offensive Mindset',
    },
    {
      value: '4 Pillars',
      label: 'SOC, Web, API &\nActive Directory Focus',
    },
  ] satisfies IntroHighlight[],
};

export const CORE_EXPERTISE_DOMAINS: ExpertiseDomain[] = [
  {
    id: 'soc',
    eyebrow: '01 · Defensive Operations',
    title: 'Security Operations',
    summary:
      'Continuous telemetry analysis, alert triage, and adversary-informed detection engineering mapped to MITRE ATT&CK.',
    capabilities: [
      'Security monitoring',
      'Log analysis and correlation',
      'Alert triage',
      'Incident response',
      'Threat hunting',
      'MITRE ATT&CK',
      'Detection engineering',
    ],
    layoutVariant: 'bento-top-left',
  },
  {
    id: 'api',
    eyebrow: '02 · Service Boundaries',
    title: 'API Security',
    summary:
      'Inspecting REST and GraphQL endpoints for authorization bypasses, token weaknesses, and schema exposure.',
    capabilities: [
      'REST and GraphQL security',
      'OWASP API Security Top 10',
      'JWT security',
      'Broken object-level authorization',
      'Excessive data exposure',
    ],
    layoutVariant: 'bento-top-right',
  },
  {
    id: 'webapp',
    eyebrow: '03 · Application Assessment',
    title: 'Web Application Security',
    summary:
      'Combining manual penetration testing with targeted automation to uncover authentication flaws and business logic abuse.',
    capabilities: [
      'OWASP Top 10',
      'Manual and automated penetration testing',
      'Authentication and authorization testing',
      'Business logic vulnerabilities',
      'Vulnerability reporting and remediation',
    ],
    layoutVariant: 'bento-bottom-left',
  },
  {
    id: 'ad',
    eyebrow: '04 · Identity Infrastructure',
    title: 'Active Directory Security',
    summary:
      'Mapping domain trust paths, privilege escalation vectors, Kerberos/NTLM authentication risks, and GPO hardening.',
    capabilities: [
      'Domain enumeration',
      'Attack path analysis',
      'Privilege escalation assessment',
      'Authentication security',
      'GPO misconfiguration analysis',
      'Active Directory hardening',
    ],
    layoutVariant: 'bento-right-tall',
  },
];

// Conceptual visualization data — explicitly labeled as simulated telemetry (never claimed as client/production metrics)
export const SIMULATED_SOC_METRICS: SimulatedSocMetric[] = [
  {
    label: 'Simulated Log Pipeline',
    value: 'SIEM + NDR',
    delta: 'Conceptual Model',
    note: 'Multi-source correlation across endpoint, auth, and HTTP telemetry',
  },
  {
    label: 'ATT&CK Coverage Map',
    value: 'Initial Access → Lateral',
    delta: 'Lab Scenario',
    note: 'Rule validation across credential access, API abuse, and AD enumeration',
  },
  {
    label: 'Triage Workflow Stage',
    value: 'Ingest · Enrich · Contain',
    delta: 'Playbook View',
    note: 'Structured analyst investigation sequence with context enrichment',
  },
];

export const SIMULATED_SOC_EVENTS: SimulatedSocEvent[] = [
  {
    id: 'SIM-1042',
    timestamp: '09:14:22 UTC',
    source: 'AD-DC01 · Kerberos',
    technique: 'T1558.003 · Kerberoasting Ticket Request Anomaly',
    severity: 'High',
    status: 'Investigating',
  },
  {
    id: 'SIM-1039',
    timestamp: '09:11:05 UTC',
    source: 'API-GW · /v2/accounts',
    technique: 'API1:2023 · Sequential Object ID Enumeration (BOLA)',
    severity: 'Medium',
    status: 'Correlated',
  },
  {
    id: 'SIM-1034',
    timestamp: '09:06:48 UTC',
    source: 'WAF · Auth Service',
    technique: 'T1110 · Distributed Token Refresh Replay Pattern',
    severity: 'Medium',
    status: 'Contained',
  },
  {
    id: 'SIM-1028',
    timestamp: '08:59:10 UTC',
    source: 'Zeek · East-West VLAN',
    technique: 'T1046 · Internal SMB & LDAP Service Discovery Sweep',
    severity: 'Low',
    status: 'Correlated',
  },
];

// Section D: Empty verified list until Salma supplies confirmed project case studies (no invented projects)
export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [];

// Section E: Technical Ecosystem (7 verified categories from CONTENT_RULES.md)
export const TECHNICAL_ECOSYSTEM: TechCategory[] = [
  {
    id: 'siem',
    label: 'SIEM & Monitoring',
    description: 'Centralized log ingestion, rule correlation, alert triage, and endpoint telemetry.',
    tools: [
      { name: 'Splunk', role: 'SIEM & SPL Search', monogram: 'SP' },
      { name: 'Elastic', role: 'ELK Security Analytics', monogram: 'EL' },
      { name: 'Wazuh', role: 'XDR & Host Monitoring', monogram: 'WZ' },
      { name: 'QRadar', role: 'Enterprise SIEM', monogram: 'QR' },
    ],
  },
  {
    id: 'network',
    label: 'Network Analysis',
    description: 'Deep packet inspection, network intrusion detection, and protocol forensics.',
    tools: [
      { name: 'Wireshark', role: 'Packet Capture Analysis', monogram: 'WS' },
      { name: 'Zeek', role: 'Network Security Monitor', monogram: 'ZK' },
      { name: 'Suricata', role: 'IDS / IPS / NSM Engine', monogram: 'SR' },
      { name: 'Snort', role: 'Signature IDS', monogram: 'SN' },
      { name: 'Cisco Packet Tracer', role: 'Network Topology Simulation', monogram: 'CP' },
    ],
  },
  {
    id: 'web-api',
    label: 'Web & API Testing',
    description: 'Proxy interception, OWASP Top 10 & API vulnerability discovery, and injection testing.',
    tools: [
      { name: 'Burp Suite', role: 'Web & API Proxy Testing', monogram: 'BS' },
      { name: 'OWASP ZAP', role: 'Dynamic App Scanner', monogram: 'ZP' },
      { name: 'Postman', role: 'REST & GraphQL Inspection', monogram: 'PM' },
      { name: 'sqlmap', role: 'SQL Injection Assessment', monogram: 'SQ' },
      { name: 'Nikto', role: 'Web Server Misconfiguration', monogram: 'NK' },
    ],
  },
  {
    id: 'active-directory',
    label: 'Active Directory',
    description: 'Attack path graphing, domain enumeration, credential auditing, and GPO review.',
    tools: [
      { name: 'BloodHound', role: 'AD Attack Path Analysis', monogram: 'BH' },
      { name: 'PowerView', role: 'Domain Enumeration', monogram: 'PV' },
      { name: 'Mimikatz', role: 'Credential & Auth Research', monogram: 'MK' },
      { name: 'Impacket', role: 'Network Protocol Toolkit', monogram: 'IM' },
      { name: 'NetExec', role: 'AD Assessment Automation', monogram: 'NX' },
    ],
  },
  {
    id: 'recon',
    label: 'Reconnaissance',
    description: 'Service enumeration, attack surface mapping, and controlled exploitation validation.',
    tools: [
      { name: 'Nmap', role: 'Host & Service Discovery', monogram: 'NM' },
      { name: 'Metasploit', role: 'Vulnerability Validation', monogram: 'MS' },
    ],
  },
  {
    id: 'programming',
    label: 'Programming & Scripting',
    description: 'Security automation, parser scripts, custom tooling, and systems fundamentals.',
    tools: [
      { name: 'Python', role: 'Security Automation & Tooling', monogram: 'PY' },
      { name: 'PowerShell', role: 'Windows & AD Scripting', monogram: 'PS' },
      { name: 'Bash', role: 'Linux & Pipeline Scripting', monogram: 'SH' },
      { name: 'Java', role: 'Application Engineering', monogram: 'JV' },
      { name: 'C++', role: 'Systems Programming', monogram: 'C+' },
      { name: 'C', role: 'Low-Level Memory & OS', monogram: 'C' },
    ],
  },
  {
    id: 'platforms',
    label: 'Databases & Platforms',
    description: 'Operating environments, directory infrastructure, and relational query systems.',
    tools: [
      { name: 'Linux', role: 'Server & Security Operations', monogram: 'LX' },
      { name: 'Windows Server', role: 'Enterprise Infrastructure', monogram: 'WS' },
      { name: 'Active Directory', role: 'Identity & GPO Directory', monogram: 'AD' },
      { name: 'SQL', role: 'Relational Querying & Audit', monogram: 'SQ' },
      { name: 'Oracle SQL Developer', role: 'Database Administration', monogram: 'OR' },
    ],
  },
];

// Section F: Security Methodology (01 Discover -> 04 Improve)
export const SECURITY_METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the environment, assets and security context.',
    variant: 'vector',
    assetPath: '/assets/figma/step-01-venn.svg',
  },
  {
    number: '02',
    title: 'Assess',
    description: 'Identify potential vulnerabilities and weaknesses.',
    variant: 'vector',
    assetPath: '/assets/figma/step-02-waves.svg',
  },
  {
    number: '03',
    title: 'Investigate',
    description: 'Validate findings and evaluate their security impact.',
    variant: 'image',
    assetPath: '/assets/figma/methodology-sky-741794.png',
  },
  {
    number: '04',
    title: 'Improve',
    description: 'Document findings and recommend actionable remediation.',
    variant: 'vector',
    assetPath: '/assets/figma/step-04-radar.svg',
  },
];

// Section G: Collaborations — empty until verified collaborators are provided
export const COLLABORATORS: CollaboratorEntry[] = [];

// Section H: Testimonials — empty until genuine recommendations are provided
export const TESTIMONIALS: TestimonialEntry[] = [];

// Section I: Certifications — all README entries stored as 'unverified' until confirmed by Salma
export const CERTIFICATIONS: CertificationEntry[] = [
  {
    id: 'ibm-cloud',
    title: 'Introduction to Cloud Computing',
    issuer: 'IBM',
    domain: 'Cloud Fundamentals',
    notes: 'Listed in profile README — awaiting verification confirmation.',
    status: 'unverified',
  },
  {
    id: 'comptia-secplus',
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    domain: 'Core Security Operations',
    notes: 'Listed in profile README — awaiting verification confirmation.',
    status: 'unverified',
  },
  {
    id: 'ejpt-ewpt',
    title: 'eJPT / eWPT',
    issuer: 'INE Security',
    domain: 'Penetration Testing & Web AppSec',
    notes: 'Listed in profile README — awaiting verification confirmation.',
    status: 'unverified',
  },
  {
    id: 'oscp',
    title: 'OSCP (Offensive Security Certified Professional)',
    issuer: 'OffSec',
    domain: 'Offensive Security',
    notes: 'Listed as in-progress in profile README — awaiting confirmation prior to publishing.',
    status: 'unverified',
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst Certification',
    issuer: 'Security Operations Track',
    domain: 'SOC & Incident Response',
    notes: 'Listed in profile README — awaiting verification confirmation.',
    status: 'unverified',
  },
];

// Visibility selectors enforcing CONTENT_RULES.md non-fabrication policy
export function getPublishedProjects(items: ProjectCaseStudy[] = PROJECT_CASE_STUDIES): ProjectCaseStudy[] {
  return items.filter((project) => project.status === 'verified');
}

export function getPublishedCollaborators(items: CollaboratorEntry[] = COLLABORATORS): CollaboratorEntry[] {
  return items.filter((person) => person.verified);
}

export function getPublishedTestimonials(items: TestimonialEntry[] = TESTIMONIALS): TestimonialEntry[] {
  return items.filter((item) => item.verified);
}

export function getPublishedCertifications(items: CertificationEntry[] = CERTIFICATIONS): CertificationEntry[] {
  return items.filter((cert) => cert.status === 'verified' || cert.status === 'in_progress');
}

export function getVisibleNavLinks(
  links: NavLinkItem[] = PRIMARY_NAV_LINKS,
  publishedProjectsCount: number = getPublishedProjects().length
): NavLinkItem[] {
  return links.filter((link) => !link.requiresVerifiedProjects || publishedProjectsCount > 0);
}
