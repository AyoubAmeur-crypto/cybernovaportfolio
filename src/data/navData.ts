import { HERO_VIDEO_URL, PRIMARY_NAV_LINKS, SALMA_PROFILE } from './portfolioData';

export { HERO_VIDEO_URL };

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: string[];
}

export const PORTFOLIO_OWNER = {
  name: SALMA_PROFILE.name,
  role: SALMA_PROFILE.title,
};

export const NAV_ITEMS: NavItem[] = PRIMARY_NAV_LINKS.filter(
  (item) => !item.requiresVerifiedProjects
).map((item) => ({
  label: item.label,
  href: item.href,
}));

export function hasDropdown(item: NavItem): boolean {
  return Array.isArray(item.dropdown) && item.dropdown.length > 0;
}

export function getNextDropdownState(
  currentOpen: string | null,
  targetLabel: string,
  action: 'enter' | 'leave' | 'toggle'
): string | null {
  if (action === 'enter') {
    return targetLabel;
  }
  if (action === 'leave') {
    return currentOpen === targetLabel ? null : currentOpen;
  }
  return currentOpen === targetLabel ? null : targetLabel;
}
