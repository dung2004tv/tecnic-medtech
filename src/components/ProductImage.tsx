import React, { useState, useMemo } from 'react';
import { Product, CategoryId } from '../types';

interface ProductImageProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  product,
  className = '',
  size = 'md',
  showBadge = true
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const candidateUrls = useMemo(() => {
    const list: string[] = [];
    if (product.image) list.push(product.image);

    const nameClean = product.name.trim();
    const codeClean = product.code.trim();

    // Folder candidates: both 'ảnh sản phẩm tecnic-medtech' and 'products'
    const folders = ['ảnh sản phẩm tecnic-medtech', 'products', ''];

    // Possible name variations (handle GƯỜNG vs GIƯỜNG, slash vs dash, etc.)
    const nameVariations = [
      nameClean,
      product.name,
      `${nameClean} `,
      nameClean.replace(/GIƯỜNG/g, 'GƯỜNG'),
      nameClean.replace(/GƯỜNG/g, 'GIƯỜNG'),
      nameClean.replace(/\//g, '-'),
      nameClean.replace(/\//g, ' '),
      nameClean.replace(/,/g, ''),
      nameClean.replace(/  +/g, ' ')
    ];

    for (const f of folders) {
      const prefix = f ? `/${encodeURI(f)}` : '';
      const rawPrefix = f ? `/${f}` : '';

      for (const nameVar of nameVariations) {
        list.push(`${rawPrefix}/${nameVar}.png`);
        list.push(`${prefix}/${encodeURIComponent(nameVar)}.png`);
        list.push(`${rawPrefix}/${nameVar}.PNG`);
        list.push(`${rawPrefix}/${nameVar}.jpg`);
      }

      // Product code .png
      list.push(`${rawPrefix}/${codeClean}.png`);
      list.push(`${prefix}/${encodeURIComponent(codeClean)}.png`);
    }

    return Array.from(new Set(list.filter(Boolean)));
  }, [product.image, product.name, product.code]);

  const currentSrc = candidateUrls[candidateIndex];

  const handleImageError = () => {
    if (candidateIndex + 1 < candidateUrls.length) {
      setCandidateIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  // SVG Medical Equipment Vector Renderers based on Category & Product Code
  const renderMedicalGraphic = () => {
    const brand = product.specifications?.brand || 'TECNIC';
    const model = product.specifications?.model || product.code;
    const cat = product.category;

    // Dimensions by size
    const sizeConfig = {
      sm: { w: 48, h: 48, stroke: 2, iconSize: 24, fontSize: 'text-[9px]' },
      md: { w: 160, h: 140, stroke: 3, iconSize: 48, fontSize: 'text-[11px]' },
      lg: { w: 260, h: 220, stroke: 4, iconSize: 72, fontSize: 'text-xs' },
      xl: { w: 340, h: 280, stroke: 5, iconSize: 96, fontSize: 'text-sm' }
    }[size];

    // Theme color palette by category
    const getCategoryTheme = (category: CategoryId) => {
      switch (category) {
        case 'GIUONG_Y_TE':
          return { bg: '#eff6ff', primary: '#1d4ed8', accent: '#3b82f6', tag: 'Giường Y Tế' };
        case 'XE_LAN':
          return { bg: '#f0fdf4', primary: '#15803d', accent: '#22c55e', tag: 'Xe Lăn Y Khoa' };
        case 'ROBOT_NANG_HA':
          return { bg: '#faf5ff', primary: '#7e22ce', accent: '#a855f7', tag: 'Robot PHCN' };
        case 'DEM_HOI_CHONG_LOET':
          return { bg: '#eff6ff', primary: '#0369a1', accent: '#0ea5e9', tag: 'Chống Loét Tì Đè' };
        case 'DAI_NEP_KHOP':
          return { bg: '#fff7ed', primary: '#c2410c', accent: '#f97316', tag: 'Bonbone Nhật' };
        case 'TRI_LIEU_XUNG_DIEN':
          return { bg: '#fdf2f8', primary: '#be185d', accent: '#ec4899', tag: 'Vật Lý Trị Liệu' };
        case 'GAY_NANG':
          return { bg: '#f8fafc', primary: '#334155', accent: '#64748b', tag: 'Gậy & Nạng Đi' };
        case 'KHUNG_TAP_DI':
          return { bg: '#f0fdfa', primary: '#0f766e', accent: '#14b8a6', tag: 'Khung Tập Đi' };
        case 'GHE_BO_TAM':
          return { bg: '#f1f5f9', primary: '#475569', accent: '#0284c7', tag: 'Ghế Bô & Tắm' };
        default:
          return { bg: '#f8fafc', primary: '#1e3a8a', accent: '#3b82f6', tag: 'Thiết Bị Y Tế' };
      }
    };

    const theme = getCategoryTheme(cat);

    // Dynamic Graphic Paths for each category
    const renderCategoryArtwork = () => {
      switch (cat) {
        case 'GAY_NANG':
          return (
            <g transform="translate(50, 20) scale(0.65)">
              {/* Walking Cane / Crutch Art */}
              <path d="M 60 10 C 60 0, 40 0, 40 10 L 40 30 C 40 40, 50 45, 50 55 L 50 140" fill="none" stroke={theme.primary} strokeWidth="7" strokeLinecap="round" />
              <line x1="25" y1="20" x2="65" y2="20" stroke={theme.accent} strokeWidth="8" strokeLinecap="round" />
              {/* 4 or 3 Legs Base */}
              <line x1="50" y1="140" x2="20" y2="185" stroke={theme.primary} strokeWidth="5" strokeLinecap="round" />
              <line x1="50" y1="140" x2="40" y2="188" stroke={theme.primary} strokeWidth="5" strokeLinecap="round" />
              <line x1="50" y1="140" x2="60" y2="188" stroke={theme.primary} strokeWidth="5" strokeLinecap="round" />
              <line x1="50" y1="140" x2="80" y2="185" stroke={theme.primary} strokeWidth="5" strokeLinecap="round" />
              {/* Rubber Tips */}
              <circle cx="20" cy="186" r="4" fill="#0f172a" />
              <circle cx="40" cy="189" r="4" fill="#0f172a" />
              <circle cx="60" cy="189" r="4" fill="#0f172a" />
              <circle cx="80" cy="186" r="4" fill="#0f172a" />
              {/* Height Adjust Holes */}
              <circle cx="50" cy="80" r="2.5" fill="#ffffff" stroke={theme.primary} strokeWidth="1.5" />
              <circle cx="50" cy="95" r="2.5" fill="#ffffff" stroke={theme.primary} strokeWidth="1.5" />
              <circle cx="50" cy="110" r="2.5" fill="#ffffff" stroke={theme.primary} strokeWidth="1.5" />
              <circle cx="50" cy="125" r="2.5" fill="#ffffff" stroke={theme.primary} strokeWidth="1.5" />
            </g>
          );

        case 'KHUNG_TAP_DI':
          return (
            <g transform="translate(30, 25) scale(0.7)">
              {/* Walker Frame */}
              <path d="M 30 50 L 30 150 M 110 50 L 110 150" stroke={theme.primary} strokeWidth="6" strokeLinecap="round" />
              <path d="M 30 50 Q 70 30 110 50" stroke={theme.primary} strokeWidth="6" fill="none" strokeLinecap="round" />
              {/* Crossbars */}
              <line x1="30" y1="80" x2="110" y2="80" stroke={theme.accent} strokeWidth="5" strokeLinecap="round" />
              <line x1="30" y1="120" x2="110" y2="120" stroke={theme.accent} strokeWidth="4" strokeLinecap="round" />
              {/* Seat or Wheels */}
              <rect x="35" y="85" width="70" height="20" rx="4" fill={theme.primary} fillOpacity="0.8" />
              {/* Front Wheels */}
              <circle cx="30" cy="155" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
              <circle cx="110" cy="155" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
              {/* Foam Grips */}
              <rect x="25" y="45" width="10" height="25" rx="3" fill="#0f172a" />
              <rect x="105" y="45" width="10" height="25" rx="3" fill="#0f172a" />
            </g>
          );

        case 'XE_LAN':
          return (
            <g transform="translate(35, 20) scale(0.7)">
              {/* Large Wheel */}
              <circle cx="85" cy="120" r="38" fill="none" stroke={theme.primary} strokeWidth="5" />
              <circle cx="85" cy="120" r="30" fill="none" stroke={theme.accent} strokeWidth="2" strokeDasharray="4,4" />
              <circle cx="85" cy="120" r="6" fill="#0f172a" />
              {/* Small Front Wheel */}
              <circle cx="25" cy="145" r="12" fill="#334155" stroke="#64748b" strokeWidth="3" />
              {/* Frame & Seat */}
              <path d="M 85 40 L 85 100 L 35 100 L 25 145" fill="none" stroke={theme.primary} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="85" y1="70" x2="45" y2="70" stroke={theme.accent} strokeWidth="5" />
              {/* Cushioned Back & Seat */}
              <rect x="75" y="45" width="12" height="50" rx="4" fill="#0284c7" />
              <rect x="35" y="93" width="50" height="12" rx="4" fill="#0284c7" />
              {/* Push Handle */}
              <path d="M 85 40 L 98 40" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
              {/* Footrest */}
              <path d="M 25 130 L 15 138" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            </g>
          );

        case 'GIUONG_Y_TE':
          return (
            <g transform="translate(20, 30) scale(0.75)">
              {/* Hospital Bed Frame */}
              <rect x="15" y="80" width="130" height="35" rx="5" fill="none" stroke={theme.primary} strokeWidth="5" />
              {/* Elevated Head (Backrest 0-85°) */}
              <line x1="15" y1="80" x2="55" y2="45" stroke={theme.accent} strokeWidth="6" strokeLinecap="round" />
              <line x1="55" y1="45" x2="90" y2="80" stroke={theme.accent} strokeWidth="5" />
              <line x1="90" y1="80" x2="145" y2="80" stroke={theme.accent} strokeWidth="5" />
              {/* Mattress Sections */}
              <rect x="18" y="70" width="124" height="10" rx="3" fill="#38bdf8" />
              {/* Bed Railings */}
              <rect x="30" y="55" width="70" height="20" rx="3" fill="none" stroke="#64748b" strokeWidth="2.5" />
              <line x1="50" y1="55" x2="50" y2="75" stroke="#64748b" strokeWidth="2" />
              <line x1="70" y1="55" x2="70" y2="75" stroke="#64748b" strokeWidth="2" />
              {/* Bed Legs & Wheels */}
              <line x1="25" y1="115" x2="25" y2="135" stroke={theme.primary} strokeWidth="5" />
              <line x1="135" y1="115" x2="135" y2="135" stroke={theme.primary} strokeWidth="5" />
              <circle cx="25" cy="140" r="6" fill="#334155" />
              <circle cx="135" cy="140" r="6" fill="#334155" />
              {/* Hand Cranks */}
              <circle cx="145" cy="100" r="4" fill="#e11d48" />
              <line x1="145" y1="100" x2="155" y2="105" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
            </g>
          );

        case 'ROBOT_NANG_HA':
          return (
            <g transform="translate(30, 20) scale(0.7)">
              {/* Robot Rehabilitation Glove */}
              <rect x="40" y="100" width="60" height="50" rx="8" fill="#1e1b4b" stroke={theme.accent} strokeWidth="3" />
              {/* 5 Pneumatic Robotic Fingers */}
              <path d="M 45 100 L 30 75 L 20 60" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 55 100 L 50 50 L 48 35" stroke="#c084fc" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 68 100 L 68 45 L 68 28" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 80 100 L 82 50 L 84 35" stroke="#c084fc" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 92 100 L 98 65 L 105 55" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" fill="none" />
              {/* Air Tubes & Valves */}
              <circle cx="45" cy="98" r="3" fill="#f43f5e" />
              <circle cx="55" cy="98" r="3" fill="#f43f5e" />
              <circle cx="68" cy="98" r="3" fill="#f43f5e" />
              <circle cx="80" cy="98" r="3" fill="#f43f5e" />
              <circle cx="92" cy="98" r="3" fill="#f43f5e" />
              {/* Control Display */}
              <rect x="50" y="115" width="40" height="20" rx="3" fill="#0f172a" />
              <text x="70" y="129" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="monospace" fontWeight="bold">ROBOT</text>
            </g>
          );

        case 'DEM_HOI_CHONG_LOET':
          return (
            <g transform="translate(25, 30) scale(0.75)">
              {/* Mattress Grid Bubbles / Tubular cells */}
              <rect x="15" y="30" width="115" height="100" rx="10" fill="none" stroke={theme.primary} strokeWidth="4" />
              {/* Rippling air cells */}
              <rect x="25" y="40" width="95" height="14" rx="7" fill="#0284c7" fillOpacity="0.8" />
              <rect x="25" y="58" width="95" height="14" rx="7" fill="#38bdf8" fillOpacity="0.9" />
              <rect x="25" y="76" width="95" height="14" rx="7" fill="#0284c7" fillOpacity="0.8" />
              <rect x="25" y="94" width="95" height="14" rx="7" fill="#38bdf8" fillOpacity="0.9" />
              <rect x="25" y="112" width="95" height="14" rx="7" fill="#0284c7" fillOpacity="0.8" />
              {/* Air Pump Motor */}
              <rect x="110" y="70" width="30" height="40" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <path d="M 105 85 Q 112 85 118 85" stroke="#f43f5e" strokeWidth="4" fill="none" />
              <circle cx="125" cy="85" r="4" fill="#22c55e" />
            </g>
          );

        case 'DAI_NEP_KHOP':
          return (
            <g transform="translate(35, 25) scale(0.7)">
              {/* Bonbone Anatomical Support Belt / Knee Brace */}
              <path d="M 30 30 Q 70 15 110 30 L 100 130 Q 70 145 40 130 Z" fill={theme.primary} fillOpacity="0.85" stroke={theme.primary} strokeWidth="4" />
              {/* Support Straps with Velcro */}
              <path d="M 25 50 Q 70 40 115 50" stroke="#f97316" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M 28 85 Q 70 75 112 85" stroke="#f97316" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M 32 115 Q 70 105 108 115" stroke="#f97316" strokeWidth="7" strokeLinecap="round" fill="none" />
              {/* Breathable Mesh Texture & Bonbone Japanese seal */}
              <circle cx="70" cy="70" r="14" fill="#ffffff" stroke="#ea580c" strokeWidth="2" />
              <text x="70" y="74" textAnchor="middle" fill="#ea580c" fontSize="8" fontWeight="bold">JAPAN</text>
            </g>
          );

        case 'TRI_LIEU_XUNG_DIEN':
          return (
            <g transform="translate(30, 25) scale(0.7)">
              {/* Omron TENS Electrotherapy Device */}
              <rect x="40" y="30" width="65" height="100" rx="12" fill="#ffffff" stroke={theme.primary} strokeWidth="4" />
              {/* LCD Display */}
              <rect x="48" y="42" width="49" height="35" rx="4" fill="#0f172a" />
              <text x="72" y="60" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">15 MIN</text>
              <text x="72" y="71" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace">TENS/EMS</text>
              {/* Control Buttons */}
              <circle cx="60" cy="92" r="6" fill="#ec4899" />
              <circle cx="85" cy="92" r="6" fill="#3b82f6" />
              <rect x="55" y="108" width="35" height="12" rx="4" fill="#64748b" />
              {/* Output Wire & Electrode Pads */}
              <path d="M 72 130 Q 72 155 40 155" stroke="#cbd5e1" strokeWidth="3" fill="none" />
              <path d="M 72 130 Q 72 155 105 155" stroke="#cbd5e1" strokeWidth="3" fill="none" />
              <rect x="25" y="145" width="25" height="20" rx="4" fill="#ec4899" fillOpacity="0.8" />
              <rect x="95" y="145" width="25" height="20" rx="4" fill="#ec4899" fillOpacity="0.8" />
            </g>
          );

        default:
          return (
            <g transform="translate(35, 25) scale(0.7)">
              <rect x="35" y="35" width="75" height="85" rx="10" fill={theme.bg} stroke={theme.primary} strokeWidth="4" />
              <circle cx="72" cy="77" r="24" fill={theme.primary} fillOpacity="0.15" />
              {/* Medical Cross */}
              <rect x="68" y="62" width="9" height="31" rx="2" fill={theme.primary} />
              <rect x="57" y="73" width="31" height="9" rx="2" fill={theme.primary} />
            </g>
          );
      }
    };

    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center p-2 select-none overflow-hidden rounded-xl border border-slate-200/80 shadow-inner ${className}`} style={{ backgroundColor: theme.bg }}>
        
        {/* TOP BRAND & CATEGORY HEADER */}
        <div className="w-full flex items-center justify-between px-1.5 py-0.5 z-10">
          <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/90 shadow-xs" style={{ color: theme.primary }}>
            {brand}
          </span>
          <span className="text-[9px] font-bold text-slate-600 bg-slate-100/90 px-1.5 py-0.5 rounded">
            {model}
          </span>
        </div>

        {/* CENTER MEDICAL SCHEMATIC VECTOR ARTWORK */}
        <div className="flex-1 w-full flex items-center justify-center relative my-1">
          <svg 
            viewBox="0 0 160 160" 
            className="w-full h-full max-h-36 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background subtle radial gradient */}
            <circle cx="80" cy="80" r="70" fill={theme.primary} fillOpacity="0.05" />
            {renderCategoryArtwork()}
          </svg>
        </div>

        {/* BOTTOM TECH SPEC SUMMARY BADGE */}
        {showBadge && size !== 'sm' && (
          <div className="w-full bg-white/95 rounded-lg p-1 text-center shadow-xs border border-slate-100 z-10 mt-auto">
            <p className="text-[10px] font-black text-slate-800 truncate px-1" title={product.name}>
              {product.name}
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <span className="text-[9px] font-bold px-1 rounded text-white" style={{ backgroundColor: theme.primary }}>
                {theme.tag}
              </span>
              <span className="text-[9px] text-slate-500 font-medium truncate">
                {product.specifications?.origin ? `Xuất xứ: ${product.specifications.origin}` : 'Chuẩn Y Tế'}
              </span>
            </div>
          </div>
        )}

      </div>
    );
  };

  // If external image fails or is empty, render the guaranteed high-definition Medical Vector Artwork
  if (imageError || !currentSrc) {
    return renderMedicalGraphic();
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-white ${className}`}>
      <img
        src={currentSrc}
        alt={product.name}
        className="object-contain w-full h-full"
        onError={handleImageError}
      />
      {showBadge && size !== 'sm' && (
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 rounded-lg p-1 text-center shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-800 truncate px-1">
            {product.name}
          </p>
        </div>
      )}
    </div>
  );
};
