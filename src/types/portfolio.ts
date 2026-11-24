export type VerificationStatus = 'verified' | 'in_progress' | 'planned' | 'unverified';

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  requiresVerifiedProjects?: boolean;
}

export interface ProfessionalProfile {
  name: string;
  heroDisplayName: string;
  title: string;
  availability: string;
  specializations: string[];
  links: {
    linkedin: string;
    email: string;
    tryhackme: string;
    github: string;
    hackerrank: string;
  };
  closingStatement: string;
}

export interface IntroHighlight {
  value: string;
  label: string;
}

export interface ExpertiseDomain {
  id: 'soc' | 'webapp' | 'api' | 'ad';
  eyebrow: string;
  title: string;
  summary: string;
  capabilities: string[];
  layoutVariant: 'bento-top-left' | 'bento-top-right' | 'bento-bottom-left' | 'bento-right-tall';
}

export interface SimulatedSocMetric {
  label: string;
  value: string;
  delta: string;
  note: string;
}

export interface SimulatedSocEvent {
  id: string;
  timestamp: string;
  source: string;
  technique: string;
  severity: 'Low' | 'Medium' | 'High' | 'Informational';
  status: 'Correlated' | 'Investigating' | 'Contained';
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  domain: string;
  problem: string;
  objective: string;
  methodology: string[];
  tools: string[];
  outcomes: string;
  repoUrl?: string;
  docsUrl?: string;
  imageUrl?: string;
  status: VerificationStatus;
}

export interface TechTool {
  name: string;
  role: string;
  monogram: string;
}

export interface TechCategory {
  id: string;
  label: string;
  description: string;
  tools: TechTool[];
}

export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
  variant: 'vector' | 'image';
  assetPath: string;
}

export interface CollaboratorEntry {
  id: string;
  fullName: string;
  initials: string;
  photoUrl?: string;
  role: string;
  organization?: string;
  collaborationContext: string;
  linkedinUrl?: string;
  featured?: boolean;
  verified: boolean;
}

export interface TestimonialEntry {
  id: string;
  quote: string;
  authorName: string;
  authorInitials: string;
  authorPhotoUrl?: string;
  role: string;
  organization: string;
  collaborationContext: string;
  verified: boolean;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  domain: string;
  notes: string;
  status: VerificationStatus;
  credentialUrl?: string;
}

