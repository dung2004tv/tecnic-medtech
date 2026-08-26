import React, { useState } from 'react';

interface TecnicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showSlogan?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const TecnicLogo: React.FC<TecnicLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  showSlogan = true,
  layout = 'horizontal'
}) => {
  const [useFallbackSvg, setUseFallbackSvg] = useState(false);

  // Dimension scale
  const dimensions = {
    sm: { icon: 32, imgH: 'h-8', title: 'text-base', sub: 'text-[9px]', slogan: 'text-[8px]' },
    md: { icon: 44, imgH: 'h-11 sm:h-12', title: 'text-xl', sub: 'text-[11px]', slogan: 'text-[10px]' },
    lg: { icon: 64, imgH: 'h-16 sm:h-20', title: 'text-2xl sm:text-3xl', sub: 'text-xs sm:text-sm', slogan: 'text-xs' },
    xl: { icon: 96, imgH: 'h-24 sm:h-28', title: 'text-4xl sm:text-5xl', sub: 'text-lg sm:text-xl', slogan: 'text-sm sm:text-base' }
  }[size];

  const navyColor = variant === 'dark' ? '#ffffff' : '#123577';
  const redColor = '#e31b23';
  const sloganColor = variant === 'dark' ? '#fca5a5' : '#e31b23';

  // If user placed "logo tecnic.png", "logo-tecnic.png", "logo-tecnic.jpg", etc.
  if (!useFallbackSvg) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo%20tecnic.png"
          alt="TECNIC MEDICAL - Kiến tạo để phụng sự"
          className={`${dimensions.imgH} object-contain transition-transform hover:scale-105 duration-200`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            const src = target.src;
            if (src.includes('logo%20tecnic.png')) {
              target.src = '/logo-tecnic.png';
            } else if (src.includes('logo-tecnic.png')) {
              target.src = '/logo-tecnic.jpg';
            } else if (src.includes('logo-tecnic.jpg')) {
              target.src = '/logo%20tecnic.jpg';
            } else if (src.includes('logo%20tecnic.jpg')) {
              target.src = '/logo-tecnic.svg';
            } else {
              // Fallback to pure component SVG
              setUseFallbackSvg(true);
            }
          }}
        />
      </div>
    );
  }

  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        {/* Emblem: Blue Circle with T-bar */}
        <div 
          className="shrink-0 relative flex items-center justify-center mb-1.5"
          style={{ width: dimensions.icon * 1.25, height: dimensions.icon * 1.25 }}
        >
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-xs" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Blue Circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="43" 
              stroke={navyColor} 
              strokeWidth="7.5" 
              fill="none" 
            />
            {/* Top Bar of T */}
            <line 
              x1="12" 
              y1="10" 
              x2="88" 
              y2="10" 
              stroke={navyColor} 
              strokeWidth="7.5" 
              strokeLinecap="round" 
            />
            {/* Vertical Stem of T */}
            <line 
              x1="50" 
              y1="10" 
              x2="50" 
              y2="92" 
              stroke={navyColor} 
              strokeWidth="7.5" 
            />
          </svg>
        </div>

        {/* TECNIC Typography with Red Dot inside first C */}
        <div className="flex flex-col items-center leading-none">
          <div className="flex items-center tracking-wider justify-center font-black">
            <span className={`${dimensions.title}`} style={{ color: navyColor, fontFamily: 'Montserrat, sans-serif' }}>
              TE
            </span>
            <span className="relative inline-flex items-center justify-center">
              <span className={`${dimensions.title}`} style={{ color: navyColor, fontFamily: 'Montserrat, sans-serif' }}>
                C
              </span>
              <span 
                className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                style={{ backgroundColor: redColor, left: '50%', top: '48%', transform: 'translate(-50%, -50%)' }}
              />
            </span>
            <span className={`${dimensions.title}`} style={{ color: navyColor, fontFamily: 'Montserrat, sans-serif' }}>
              NIC
            </span>
          </div>

          {/* MEDICAL */}
          <span 
            className={`font-black tracking-[0.28em] uppercase ${dimensions.sub} mt-1`}
            style={{ color: redColor, fontFamily: 'Montserrat, sans-serif' }}
          >
            MEDICAL
          </span>

          {/* Tagline: Kiến tạo để phụng sự */}
          {showSlogan && (
            <div className="mt-1.5 flex flex-col items-center">
              <span 
                className={`font-bold italic ${dimensions.slogan} leading-tight`}
                style={{ color: sloganColor }}
              >
                Kiến tạo để phụng sự
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Emblem: Blue Circle with T-bar */}
      <div 
        className="shrink-0 relative flex items-center justify-center"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-xs" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle 
            cx="50" 
            cy="50" 
            r="43" 
            stroke={navyColor} 
            strokeWidth="8" 
            fill="none" 
          />
          <line 
            x1="12" 
            y1="10" 
            x2="88" 
            y2="10" 
            stroke={navyColor} 
            strokeWidth="8" 
            strokeLinecap="round" 
          />
          <line 
            x1="50" 
            y1="10" 
            x2="50" 
            y2="92" 
            stroke={navyColor} 
            strokeWidth="8" 
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        {/* TECNIC with red dot in first C */}
        <div className="flex items-center tracking-tight">
          <span 
            className={`font-black ${dimensions.title} tracking-wider`}
            style={{ color: navyColor, fontFamily: 'Montserrat, sans-serif' }}
          >
            TE
          </span>
          <span className="relative inline-flex items-center justify-center">
            <span 
              className={`font-black ${dimensions.title} tracking-wider`}
              style={{ color: navyColor, fontFamily: 'Montserrat, sans-serif' }}
            >
              C
            </span>
            <span 
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
              style={{ backgroundColor: redColor, left: '50%', top: '48%', transform: 'translate(-50%, -50%)' }}
            />
          </span>
          <span 
            className={`font-black ${dimensions.title} tracking-wider`}
            style={{ color: navyColor, fontFamily: 'Montserrat, sans-serif' }}
          >
            NIC
          </span>
        </div>

        {/* MEDICAL Subtitle in Red */}
        <div className="flex items-center">
          <span 
            className={`font-black tracking-[0.24em] uppercase ${dimensions.sub} mt-0.5`}
            style={{ color: redColor, fontFamily: 'Montserrat, sans-serif' }}
          >
            MEDICAL
          </span>
        </div>

        {/* Slogan: Kiến tạo để phụng sự */}
        {showSlogan && (
          <span 
            className={`font-bold italic ${dimensions.slogan} mt-0.5 tracking-tight whitespace-nowrap`}
            style={{ color: sloganColor }}
          >
            Kiến tạo để phụng sự
          </span>
        )}
      </div>
    </div>
  );
};
