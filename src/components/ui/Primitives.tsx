import React from 'react';

interface SectionEyebrowProps {
  label: string;
  tone?: 'rose' | 'light' | 'muted';
  align?: 'left' | 'center';
}

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  label,
  tone = 'rose',
  align = 'left',
}) => {
  const textColor =
    tone === 'light'
      ? 'text-white'
      : tone === 'muted'
        ? 'text-[#646464]'
        : 'text-[#B8687F]';

  return (
    <div
      className={`inline-flex items-center ${
        align === 'center' ? 'justify-center' : 'justify-start'
      }`}
    >
      <span
        className={`font-editorial text-xs font-semibold uppercase tracking-[0.12em] leading-none ${textColor}`}
      >
        {label}
      </span>
    </div>
  );
};

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid-dark' | 'solid-rose' | 'outline-light' | 'outline-dark';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

/**
 * Viralytics Figma Button System (#1:439 / #1:431).
 * Strictly solid or outlined pills (borderRadius: 24px / 9999px) — never glassy.
 */
export const PillButton: React.FC<PillButtonProps> = ({
  variant = 'solid-dark',
  href,
  external,
  className = '',
  children,
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-editorial text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4879C] whitespace-nowrap';

  const variantClasses: Record<NonNullable<PillButtonProps['variant']>, string> = {
    'solid-dark':
      'bg-[#1A1A2E] text-white hover:bg-[#272742] active:scale-[0.99] shadow-[0_4px_14px_rgba(26,26,46,0.14)]',
    'solid-rose':
      'bg-[#D4879C] text-[#1A1A2E] font-semibold hover:bg-[#DF99AC] active:scale-[0.99]',
    'outline-light':
      'bg-white text-[#1A1A2E] border border-[#1A1A2E]/14 hover:border-[#1A1A2E]/35 hover:bg-[#F8F7FA] viralytics-card-shadow',
    'outline-dark':
      'bg-transparent text-white border border-white/35 hover:bg-white/10 hover:border-white/60',
  };

  const merged = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={rest.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        className={merged}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={merged} {...rest}>
      {children}
    </button>
  );
};

interface SectionContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className = '',
  children,
  ariaLabel,
}) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 ${className}`.trim()}
    >
      {children}
    </section>
  );
};

interface BrandLogoProps {
  tone?: 'hero' | 'light' | 'dark';
  size?: 'sm' | 'lg';
  className?: string;
}

/**
 * Unified Brand Identity Component:
 * Double-diamond mark attached directly to lowercase `salma` (Times New Roman MT Italic)
 * + `atou` (Be Vietnam Bold).
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  tone = 'light',
  size = 'sm',
  className = '',
}) => {
  const isLight = tone === 'light';
  const isHero = tone === 'hero';

  const primaryDiamond = isLight ? '#D4879C' : '#FBCFE8';
  const secondaryDiamond = isLight ? '#1A1A2E' : isHero ? '#FCE7F3' : '#D4879C';
  const secondaryOpacity = isLight ? '0.28' : isHero ? '0.45' : '0.6';

  const textColor = isLight
    ? 'text-[#1A1A2E]'
    : isHero
      ? 'text-white flower-same-level-text'
      : 'text-white';

  const iconSizeClass =
    size === 'lg'
      ? 'w-[17px] h-[17px] sm:w-[23px] sm:h-[23px]'
      : 'w-[14px] h-[14px] sm:w-[19px] sm:h-[19px]';
  // Equalized font-size + CSS `font-size-adjust: 0.5` ensures the `a` of `salma` and `a` of `atou`
  // have the exact same pixel height across Android, iOS, macOS, and Windows!
  const wordSize =
    size === 'lg' ? 'text-[20px] sm:text-[26px]' : 'text-[15px] sm:text-[19.5px]';

  return (
    <span
      className={`inline-flex items-center gap-1 sm:gap-1.5 select-none ${textColor} ${className}`.trim()}
    >
      <svg
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`${iconSizeClass} shrink-0`}
      >
        <path d="M11.5 2L21.5 14L11.5 26L1.5 14L11.5 2Z" fill={primaryDiamond} />
        <path
          d="M16.5 2L26.5 14L16.5 26L6.5 14L16.5 2Z"
          fill={secondaryDiamond}
          fillOpacity={secondaryOpacity}
        />
      </svg>
      <span className={`inline-flex items-baseline gap-0 lowercase leading-none ${wordSize}`}>
        <span className="font-brand-salma italic font-normal tracking-[-0.01em] mr-[0.02em]">
          salma
        </span>
        <span
          className={`font-brand-atou font-bold tracking-[-0.035em] ${
            tone === 'light'
              ? 'text-[#D4879C]'
              : tone === 'dark'
                ? 'text-[#FBCFE8]'
                : ''
          }`}
        >
          atou
        </span>
      </span>
    </span>
  );
};

