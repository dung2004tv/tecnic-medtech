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
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(customImageSrc);
  const [imageError, setImageError] = useState(false);

  // Sync if prop changes
  React.useEffect(() => {
    setCurrentSrc(customImageSrc || '/logo-tecnic.jpg');
    setImageError(false);
  }, [customImageSrc]);

  const handleImageError = () => {
    if (currentSrc === '/logo-tecnic.jpg') {
      setCurrentSrc('/logo-tecnic.svg');
    } else {
      setImageError(true);
    }
  };

  // Dimension scale
  const dimensions = {
    sm: { width: 68, height: 72, icon: 26, title: 'text-sm', sub: 'text-[9px]', slogan: 'text-[7.5px]', imgH: 'h-11 sm:h-12' },
    md: { width: 84, height: 88, icon: 32, title: 'text-base', sub: 'text-[10px]', slogan: 'text-[9px]', imgH: 'h-14 sm:h-16' },
    lg: { width: 110, height: 116, icon: 44, title: 'text-xl', sub: 'text-xs', slogan: 'text-[11px]', imgH: 'h-20 sm:h-22' },
    xl: { width: 140, height: 150, icon: 56, title: 'text-2xl', sub: 'text-sm', slogan: 'text-xs', imgH: 'h-26 sm:h-28' }
  }[size];

  // Colors based on brand standard
  const isDark = variant === 'dark';
  const isBadge = variant === 'badge';
  const navyColor = '#0e387a';
  const redColor = '#e31b23';

  // Render Image tag if available and not errored
  if (!imageError && currentSrc) {
    return (
      <div 
        className={`inline-flex items-center justify-center select-none rounded-2xl overflow-hidden transition-all duration-200 ${
          isBadge || isDark
            ? 'bg-white p-1 sm:p-1.5 shadow-md border border-white/90 shadow-blue-950/15' 
            : 'bg-white p-1 rounded-2xl border border-slate-100 shadow-xs'
        } ${className}`}
        style={isBadge || isDark ? { minWidth: dimensions.width } : undefined}
      >
        <img
          src={currentSrc}
          alt="TECNIC MEDTECH - Thiết Bị Y Tế & Phục Hồi Chức Năng"
          onError={handleImageError}
          className={`${dimensions.imgH} w-auto object-contain max-w-full rounded-xl transition-transform duration-200 hover:scale-[1.02]`}
        />
      </div>
    );
  }

  // Pure SVG / Vector Fallback rendering exact brand badge
  return (
    <div 
      className={`inline-flex flex-col items-center justify-center select-none transition-all duration-200 rounded-2xl overflow-hidden ${
        isBadge || isDark
          ? 'bg-white p-2 sm:p-2.5 shadow-md border border-white/90 shadow-blue-950/15' 
          : 'bg-white/90 p-1.5 rounded-2xl'
      } ${className}`}
      style={isBadge || isDark ? { minWidth: dimensions.width } : undefined}
    >
      {/* 1. Emblem: Dark Navy Circle with T-bar */}
      <div 
        className="shrink-0 relative flex items-center justify-center"
        style={{ width: dimensions.icon * 1.1, height: dimensions.icon * 1.1 }}
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
            cy="52" 
            r="38" 
            stroke={navyColor} 
            strokeWidth="6" 
            fill="none" 
          />
          {/* Top T-bar */}
          <line 
            x1="18" 
            y1="14" 
            x2="82" 
            y2="14" 
            stroke={navyColor} 
            strokeWidth="6" 
            strokeLinecap="square"
          />
          {/* Vertical T stem */}
          <line 
            x1="50" 
            y1="14" 
            x2="50" 
            y2="90" 
            stroke={navyColor} 
            strokeWidth="6" 
            strokeLinecap="square"
          />
        </svg>
      </div>

      {/* 2. Brand Typography */}
      <div className="flex flex-col items-center leading-tight mt-1">
        {/* TECNIC with red dot in first C */}
        <div className="flex items-center justify-center font-black tracking-wider text-[#0e387a]">
          <span className={dimensions.title} style={{ fontFamily: 'Montserrat, sans-serif' }}>TE</span>
          <span className="relative inline-flex items-center justify-center">
            <span className={dimensions.title} style={{ fontFamily: 'Montserrat, sans-serif' }}>C</span>
            <span 
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e31b23] left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2" 
            />
          </span>
          <span className={dimensions.title} style={{ fontFamily: 'Montserrat, sans-serif' }}>NIC</span>
        </div>

        {/* MEDTECH in Red */}
        <span 
          className={`font-black tracking-[0.26em] uppercase text-[#e31b23] ${dimensions.sub} -mt-0.5`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          MEDTECH
        </span>

        {/* Slogan: Giải pháp toàn diện, tái sinh cuộc sống in Blue Italic */}
        {showSlogan && (
          <span 
            className={`font-bold italic text-[#0071ba] ${dimensions.slogan} mt-0.5 whitespace-nowrap`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Giải pháp toàn diện, tái sinh cuộc sống
          </span>
        )}
      </div>
    </div>
  );
};
