import React, { useState } from 'react';

interface TecnicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'badge';
  showSlogan?: boolean;
  layout?: 'horizontal' | 'vertical';
  customImageSrc?: string;
}

export const TecnicLogo: React.FC<TecnicLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge',
  showSlogan = true,
  layout = 'vertical',
  customImageSrc = '/logo-tecnic.jpg'
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimension scale
  const dimensions = {
    sm: { width: 72, height: 78, icon: 28, title: 'text-sm', sub: 'text-[9px]', slogan: 'text-[7.5px]', imgH: 'h-14 sm:h-16' },
    md: { width: 90, height: 96, icon: 34, title: 'text-base', sub: 'text-[10px]', slogan: 'text-[9px]', imgH: 'h-16 sm:h-20' },
    lg: { width: 120, height: 130, icon: 46, title: 'text-xl', sub: 'text-xs', slogan: 'text-[11px]', imgH: 'h-24 sm:h-28' },
    xl: { width: 160, height: 175, icon: 62, title: 'text-2xl', sub: 'text-sm', slogan: 'text-xs', imgH: 'h-32 sm:h-36' }
  }[size];

  // Colors based on variant
  const isDark = variant === 'dark';
  const isBadge = variant === 'badge';
  const navyColor = '#123577';
  const redColor = '#e31b23';

  // Render Image tag if available and not errored
  if (!imageError && customImageSrc) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={customImageSrc}
          alt="TECNIC MEDICAL - Kiến tạo để phụng sự"
          onError={() => setImageError(true)}
          className={`${dimensions.imgH} w-auto object-contain max-w-full drop-shadow-xs transition-transform duration-200 hover:scale-[1.02]`}
        />
      </div>
    );
  }

  // Pure SVG / Vector Fallback rendering exact brand badge
  return (
    <div 
      className={`inline-flex flex-col items-center justify-center select-none transition-all duration-200 ${
        isBadge || isDark
          ? 'bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-md border border-white/90 shadow-blue-950/10' 
          : ''
      } ${className}`}
      style={isBadge || isDark ? { minWidth: dimensions.width } : undefined}
    >
      {/* 1. Emblem: Dark Navy Circle with T-bar & Serifs */}
      <div 
        className="shrink-0 relative flex items-center justify-center"
        style={{ width: dimensions.icon * 1.05, height: dimensions.icon * 1.05 }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke={navyColor} 
            strokeWidth="7.5" 
            fill="none" 
          />
          {/* Top T-bar */}
          <line 
            x1="14" 
            y1="13" 
            x2="86" 
            y2="13" 
            stroke={navyColor} 
            strokeWidth="7.5" 
          />
          {/* Serif bracket on left */}
          <line 
            x1="14" 
            y1="9" 
            x2="14" 
            y2="19" 
            stroke={navyColor} 
            strokeWidth="4.5" 
            strokeLinecap="round" 
          />
          {/* Serif bracket on right */}
          <line 
            x1="86" 
            y1="9" 
            x2="86" 
            y2="19" 
            stroke={navyColor} 
            strokeWidth="4.5" 
            strokeLinecap="round" 
          />
          {/* Vertical T stem */}
          <line 
            x1="50" 
            y1="13" 
            x2="50" 
            y2="88" 
            stroke={navyColor} 
            strokeWidth="7.5" 
          />
        </svg>
      </div>

      {/* 2. Brand Typography */}
      <div className="flex flex-col items-center leading-tight mt-0.5">
        {/* TECNIC with red dot in first C */}
        <div className="flex items-center justify-center font-black tracking-wider text-[#123577]">
          <span className={dimensions.title} style={{ fontFamily: 'Montserrat, sans-serif' }}>TE</span>
          <span className="relative inline-flex items-center justify-center">
            <span className={dimensions.title} style={{ fontFamily: 'Montserrat, sans-serif' }}>C</span>
            <span 
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e31b23] left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2" 
            />
          </span>
          <span className={dimensions.title} style={{ fontFamily: 'Montserrat, sans-serif' }}>NIC</span>
        </div>

        {/* MEDICAL in Red */}
        <span 
          className={`font-black tracking-[0.24em] uppercase text-[#e31b23] ${dimensions.sub} -mt-0.5`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          MEDICAL
        </span>

        {/* Slogan: Kiến tạo để phụng sự in Red Cursive / Italic Script */}
        {showSlogan && (
          <span 
            className={`font-bold italic text-[#e31b23] ${dimensions.slogan} mt-0.5 whitespace-nowrap`}
            style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Segoe Script', cursive, 'Times New Roman', serif" }}
          >
            Kiến tạo để phụng sự
          </span>
        )}
      </div>
    </div>
  );
};
