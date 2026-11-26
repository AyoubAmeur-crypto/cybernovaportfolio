import React, { useEffect, useState } from 'react';

interface DisconnectedCablesIllustrationProps {
  className?: string;
}

type ViewportTier = 'mobile' | 'tablet' | 'desktop';

function getViewportTier(width: number): ViewportTier {
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

const VIEWBOX_BY_TIER: Record<ViewportTier, string> = {
  // Keeps connectors crisp & prominent on phones while cables still bleed off both screen edges
  mobile: '385 12 670 240',
  tablet: '210 0 1020 264',
  desktop: '0 0 1440 264',
};

/**
 * Custom Vector Disconnected Electrical Cables Illustration.
 * - Left baby-pink cord enters from beyond the left viewport edge and ends in a sculpted male plug.
 * - Right pastel-rose cord enters from beyond the right viewport edge and ends in a matching female socket.
 * - Pure, clean fixed composition without sparks or floating dots.
 */
export const DisconnectedCablesIllustration: React.FC<DisconnectedCablesIllustrationProps> = ({
  className = '',
}) => {
  const [tier, setTier] = useState<ViewportTier>(() =>
    typeof window !== 'undefined' ? getViewportTier(window.innerWidth) : 'desktop'
  );

  useEffect(() => {
    const handleResize = () => {
      setTier(getViewportTier(window.innerWidth));
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`relative w-screen left-1/2 -translate-x-1/2 overflow-hidden select-none pointer-events-none ${className}`.trim()}
    >
      <svg
        viewBox={VIEWBOX_BY_TIER[tier]}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Two pastel-pink electrical cables extending from opposite sides of the screen, gently disconnected in the center"
        className="block w-full h-[142px] sm:h-[190px] lg:h-[228px] xl:h-[248px] overflow-visible"
      >
        <defs>
          {/* Ambient Soft Blush Aura Behind Gap */}
          <radialGradient id="gapAmbientAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F8D7E4" stopOpacity="0.55" />
            <stop offset="58%" stopColor="#F2B8CE" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FFF8FA" stopOpacity="0" />
          </radialGradient>

          {/* Left Cord Jacket Gradient (Baby Pink -> Pastel Pink) */}
          <linearGradient id="leftCordGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCEAF1" />
            <stop offset="48%" stopColor="#F8D7E4" />
            <stop offset="100%" stopColor="#E9AEC5" />
          </linearGradient>

          {/* Right Cord Jacket Gradient (Pastel Pink -> Primary Rose) */}
          <linearGradient id="rightCordGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FADCE8" />
            <stop offset="50%" stopColor="#F2B8CE" />
            <stop offset="100%" stopColor="#DC96B0" />
          </linearGradient>

          {/* Sculpted Male Plug Housing (Soft Baby Pink 3D Cylinder) */}
          <linearGradient id="malePlugBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF6F9" />
            <stop offset="38%" stopColor="#F8D7E4" />
            <stop offset="82%" stopColor="#F2B8CE" />
            <stop offset="100%" stopColor="#E39FB9" />
          </linearGradient>

          {/* Sculpted Female Socket Housing (Complementary Pastel Rose 3D Cylinder) */}
          <linearGradient id="femaleSocketBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDEBF2" />
            <stop offset="42%" stopColor="#F2B8CE" />
            <stop offset="85%" stopColor="#E49CB7" />
            <stop offset="100%" stopColor="#CE829E" />
          </linearGradient>

          {/* Strain-Relief Boot & Collar Rim Gradient */}
          <linearGradient id="connectorCollarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5A1B8" />
            <stop offset="52%" stopColor="#D4879C" />
            <stop offset="100%" stopColor="#B86C89" />
          </linearGradient>

          {/* Satin Rose-Metal Electrical Prongs */}
          <linearGradient id="roseProngMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EBB4C7" />
            <stop offset="45%" stopColor="#D4879C" />
            <stop offset="100%" stopColor="#B86C89" />
          </linearGradient>
        </defs>

        {/* Soft Ambient Backdrop Glow in the Center */}
        <ellipse cx="720" cy="134" rx="160" ry="80" fill="url(#gapAmbientAura)" />

        {/* =====================================================================
            LEFT CABLE + MALE ELECTRICAL PLUG
            Extends from x = -280 off-screen left to prong tips at x = 688
           ===================================================================== */}
        <g data-cable-left>
          {/* Soft Grounded Drop Shadow Under Cord & Plug */}
          <path
            d="M -280 165 L -20 165 C 110 165, 185 105, 290 105 C 365 105, 395 155, 455 155 C 500 155, 520 139, 564 139"
            fill="none"
            stroke="#E7C2D1"
            strokeOpacity="0.38"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <ellipse cx="622" cy="173" rx="44" ry="7" fill="#E7C2D1" opacity="0.34" />

          {/* Smooth Rounded S-Curve Left Cord */}
          <path
            d="M -280 158 L -20 158 C 110 158, 185 98, 290 98 C 365 98, 395 148, 455 148 C 500 148, 520 132, 564 132"
            fill="none"
            stroke="#D4879C"
            strokeOpacity="0.55"
            strokeWidth="17.2"
            strokeLinecap="round"
          />
          <path
            d="M -280 158 L -20 158 C 110 158, 185 98, 290 98 C 365 98, 395 148, 455 148 C 500 148, 520 132, 564 132"
            fill="none"
            stroke="url(#leftCordGrad)"
            strokeWidth="14.4"
            strokeLinecap="round"
          />
          {/* Cylindrical Cord Specular Highlight */}
          <path
            d="M -280 155 L -20 155 C 110 155, 185 95, 290 95 C 365 95, 395 145, 455 145 C 500 145, 520 129, 560 129"
            fill="none"
            stroke="#FFF8FA"
            strokeOpacity="0.72"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Two Satin Rose-Metal Male Prongs */}
          <g>
            {/* Upper Prong */}
            <rect
              x="654"
              y="113.5"
              width="34"
              height="9.5"
              rx="4.75"
              fill="url(#roseProngMetal)"
              stroke="#B86C89"
              strokeWidth="1.1"
            />
            <line
              x1="658"
              y1="116"
              x2="682"
              y2="116"
              stroke="#FFF8FA"
              strokeOpacity="0.65"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="680.5" cy="118.25" r="1.8" fill="#FFF8FA" />

            {/* Lower Prong */}
            <rect
              x="654"
              y="141"
              width="34"
              height="9.5"
              rx="4.75"
              fill="url(#roseProngMetal)"
              stroke="#B86C89"
              strokeWidth="1.1"
            />
            <line
              x1="658"
              y1="143.5"
              x2="682"
              y2="143.5"
              stroke="#FFF8FA"
              strokeOpacity="0.65"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="680.5" cy="145.75" r="1.8" fill="#FFF8FA" />
          </g>

          {/* Stepped Strain-Relief Grommet */}
          <rect
            x="556"
            y="120.5"
            width="12"
            height="23"
            rx="4.5"
            fill="url(#connectorCollarGrad)"
          />
          <rect
            x="565"
            y="116"
            width="20"
            height="32"
            rx="6"
            fill="url(#connectorCollarGrad)"
            stroke="#B86C89"
            strokeWidth="1.1"
          />
          <line
            x1="572"
            y1="120"
            x2="572"
            y2="144"
            stroke="#FFF8FA"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="577"
            y1="120"
            x2="577"
            y2="144"
            stroke="#FFF8FA"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Sculpted Male Plug Body */}
          <path
            d="M 602 99 H 644 A 7 7 0 0 1 651 106 V 158 A 7 7 0 0 1 644 165 H 602 A 20 20 0 0 1 582 145 V 119 A 20 20 0 0 1 602 99 Z"
            fill="url(#malePlugBodyGrad)"
            stroke="#D4879C"
            strokeWidth="1.6"
          />
          {/* Top Cylindrical Specular Highlight */}
          <path
            d="M 601 105.5 H 641"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.85"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Tactile Recessed Grip Pill */}
          <rect
            x="603"
            y="120"
            width="28"
            height="24"
            rx="8"
            fill="#F2B8CE"
            fillOpacity="0.55"
            stroke="#D4879C"
            strokeOpacity="0.45"
            strokeWidth="1.1"
          />
          <line
            x1="612.5"
            y1="125.5"
            x2="612.5"
            y2="138.5"
            stroke="#B86C89"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="617"
            y1="125.5"
            x2="617"
            y2="138.5"
            stroke="#B86C89"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="621.5"
            y1="125.5"
            x2="621.5"
            y2="138.5"
            stroke="#B86C89"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Front Faceplate Rim */}
          <rect
            x="647"
            y="102"
            width="9.5"
            height="60"
            rx="4.75"
            fill="url(#connectorCollarGrad)"
            stroke="#B86C89"
            strokeWidth="1.1"
          />
        </g>

        {/* =====================================================================
            RIGHT CABLE + FEMALE ELECTRICAL CONNECTOR (SOCKET)
            Starts at socket face x = 752 and extends off-screen right to x = 1720
           ===================================================================== */}
        <g data-cable-right>
          {/* Soft Grounded Drop Shadow Under Socket & Right Cord */}
          <path
            d="M 876 139 C 920 139, 940 121, 985 121 C 1050 121, 1085 169, 1165 169 C 1265 169, 1340 117, 1460 117 L 1720 117"
            fill="none"
            stroke="#E7C2D1"
            strokeOpacity="0.38"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <ellipse cx="814" cy="174" rx="46" ry="7" fill="#E7C2D1" opacity="0.34" />

          {/* Smooth Rounded S-Curve Right Cord */}
          <path
            d="M 876 132 C 920 132, 940 114, 985 114 C 1050 114, 1085 162, 1165 162 C 1265 162, 1340 110, 1460 110 L 1720 110"
            fill="none"
            stroke="#B86C89"
            strokeOpacity="0.45"
            strokeWidth="17.2"
            strokeLinecap="round"
          />
          <path
            d="M 876 132 C 920 132, 940 114, 985 114 C 1050 114, 1085 162, 1165 162 C 1265 162, 1340 110, 1460 110 L 1720 110"
            fill="none"
            stroke="url(#rightCordGrad)"
            strokeWidth="14.4"
            strokeLinecap="round"
          />
          {/* Cylindrical Cord Specular Highlight */}
          <path
            d="M 880 129 C 920 129, 940 111, 985 111 C 1050 111, 1085 159, 1165 159 C 1265 159, 1340 107, 1460 107 L 1720 107"
            fill="none"
            stroke="#FFF8FA"
            strokeOpacity="0.68"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Stepped Strain-Relief Grommet (Right) */}
          <rect
            x="872"
            y="120.5"
            width="12"
            height="23"
            rx="4.5"
            fill="url(#connectorCollarGrad)"
          />
          <rect
            x="855"
            y="116"
            width="20"
            height="32"
            rx="6"
            fill="url(#connectorCollarGrad)"
            stroke="#B86C89"
            strokeWidth="1.1"
          />
          <line
            x1="863"
            y1="120"
            x2="863"
            y2="144"
            stroke="#FFF8FA"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="868"
            y1="120"
            x2="868"
            y2="144"
            stroke="#FFF8FA"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Sculpted Female Socket Body */}
          <path
            d="M 768 97.5 H 836 A 22 22 0 0 1 858 119.5 V 144.5 A 22 22 0 0 1 836 166.5 H 768 A 7 7 0 0 1 761 159.5 V 104.5 A 7 7 0 0 1 768 97.5 Z"
            fill="url(#femaleSocketBodyGrad)"
            stroke="#B86C89"
            strokeOpacity="0.75"
            strokeWidth="1.6"
          />
          {/* Top Cylindrical Specular Highlight */}
          <path
            d="M 771 104.5 H 834"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.82"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Recessed Grip Capsule */}
          <rect
            x="792"
            y="120"
            width="32"
            height="24"
            rx="8"
            fill="#FFF8FA"
            fillOpacity="0.38"
            stroke="#B86C89"
            strokeOpacity="0.38"
            strokeWidth="1.1"
          />
          <line
            x1="803.5"
            y1="125.5"
            x2="803.5"
            y2="138.5"
            stroke="#B86C89"
            strokeOpacity="0.48"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="808"
            y1="125.5"
            x2="808"
            y2="138.5"
            stroke="#B86C89"
            strokeOpacity="0.48"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="812.5"
            y1="125.5"
            x2="812.5"
            y2="138.5"
            stroke="#B86C89"
            strokeOpacity="0.48"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Front Receptacle Collar & Aligned Prong Slots */}
          <rect
            x="752"
            y="100.5"
            width="11"
            height="63"
            rx="5.5"
            fill="url(#connectorCollarGrad)"
            stroke="#B86C89"
            strokeWidth="1.1"
          />
          <rect x="751.5" y="113" width="5.5" height="10.5" rx="2.2" fill="#8C4A66" />
          <rect x="751.5" y="140.5" width="5.5" height="10.5" rx="2.2" fill="#8C4A66" />
        </g>
      </svg>
    </div>
  );
};
