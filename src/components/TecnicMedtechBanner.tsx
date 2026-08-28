import React, { useState } from 'react';
import { Phone, ArrowRight, CheckCircle2, Sparkles, Award, ShieldCheck, ChevronRight, Upload, RefreshCw } from 'lucide-react';
import { CategoryId } from '../types';

interface TecnicMedtechBannerProps {
  onSelectCategory?: (catId: CategoryId) => void;
  onContactClick?: () => void;
}

export const TecnicMedtechBanner: React.FC<TecnicMedtechBannerProps> = ({
  onSelectCategory,
  onContactClick
}) => {
  // Check for custom banner or default banner image paths
  const [customBannerUrl, setCustomBannerUrl] = useState<string | null>(() => {
    return localStorage.getItem('tecnic_custom_banner_url') || null;
  });

  const [imageLoadError, setImageLoadError] = useState(false);

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const chatTrigger = document.querySelector('button[title*="Chat"]') as HTMLButtonElement;
      if (chatTrigger) {
        chatTrigger.click();
      } else {
        window.location.href = 'tel:0348402466';
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) {
          setCustomBannerUrl(result);
          setImageLoadError(false);
          localStorage.setItem('tecnic_custom_banner_url', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetBanner = () => {
    setCustomBannerUrl(null);
    setImageLoadError(false);
    localStorage.removeItem('tecnic_custom_banner_url');
  };

  // Determine active banner source: custom uploaded > local public banner > dynamic vector
  const bannerSrc = customBannerUrl || '/Banner Tecnic Medtech.png';

  return (
    <section 
      id="tecnic-medtech-banner"
      aria-label="Banner Chính Hãng TECNIC MEDTECH" 
      className="relative w-full bg-slate-50 py-3 sm:py-5 border-b border-slate-200"
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6">
        
        {/* 1. PRIMARY CRISP IMAGE BANNER (Directly using the user's uploaded banner with interactive hotspot) */}
        {!imageLoadError ? (
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-blue-200 group bg-white">
            <img 
              src={bannerSrc} 
              alt="Banner TECNIC MEDTECH - Giải pháp y tế và phục hồi chức năng - Chất lượng tạo uy tín"
              className="w-full h-auto object-cover max-h-[480px] select-none block"
              referrerPolicy="no-referrer"
              onError={() => {
                // If local file is not found in public yet, switch gracefully to high-fidelity vector version
                if (!customBannerUrl) {
                  setImageLoadError(true);
                }
              }}
            />

            {/* Interactive Clickable Hotspots mapped directly to the banner's visual layout */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Left Action Area: "Liên hệ ngay" Button Overlay */}
              <div className="absolute top-[58%] sm:top-[63%] left-[22%] sm:left-[23%] pointer-events-auto">
                <button
                  id="btn-banner-overlay-contact"
                  onClick={handleContact}
                  title="Bấm để liên hệ tư vấn y khoa và báo giá"
                  className="opacity-0 hover:opacity-100 hover:bg-blue-600/20 active:scale-95 transition rounded-full w-28 sm:w-36 md:w-44 h-8 sm:h-11 md:h-12 border-2 border-transparent hover:border-white shadow-lg cursor-pointer"
                >
                  <span className="sr-only">Liên hệ ngay</span>
                </button>
              </div>

              {/* Center Right Action Area: Equipment Circle */}
              <div 
                className="absolute top-[48%] sm:top-[46%] left-[50%] sm:left-[51%] w-[18%] sm:w-[15%] aspect-square rounded-full pointer-events-auto cursor-pointer hover:ring-4 hover:ring-sky-400/60 transition"
                title="Khám phá Thiết Bị Phục Hồi Chức Năng TECNIC"
                onClick={() => onSelectCategory && onSelectCategory('ROBOT_NANG_HA')}
              >
                <span className="sr-only">Xem thiết bị PHCN</span>
              </div>
            </div>

            {/* Quick Action Controls on top right of banner */}
            <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/60 backdrop-blur-md p-1.5 rounded-xl z-20">
              <button 
                onClick={handleContact}
                className="text-xs text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded-lg flex items-center gap-1 font-bold shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>034 84 02466</span>
              </button>
              {customBannerUrl && (
                <button 
                  onClick={handleResetBanner}
                  className="text-xs text-white hover:text-red-300 px-2 py-1 rounded flex items-center gap-1 font-semibold cursor-pointer"
                  title="Khôi phục banner thiết kế mặc định"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Mặc định
                </button>
              )}
            </div>
          </div>
        ) : (
          /* EXACT PIXEL-PERFECT VECTOR & INTERACTIVE BANNER MATCHING "Banner Tecnic Medtech.png" */
          <div 
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-blue-100 shadow-md min-h-[300px] sm:min-h-[360px] lg:min-h-[380px] xl:min-h-[410px] flex items-center select-none"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 55%, #f0f8ff 85%, #e1f2fe 100%)'
            }}
          >
            {/* 1. BACKGROUND SVG WAVES & GRAPHICS (Exact cyan curved ribbons from uploaded banner) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg 
                className="absolute -bottom-2 -left-2 w-[105%] h-[48%] sm:h-[45%] opacity-95" 
                viewBox="0 0 1440 320" 
                fill="none" 
                preserveAspectRatio="none"
              >
                {/* Light Cyan Base Wave */}
                <path 
                  d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,181.3C840,171,960,117,1080,117.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
                  fill="#60c5f1" 
                  fillOpacity="0.5"
                />
                {/* Mid Sky Blue Ribbon Wave */}
                <path 
                  d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
                  fill="#009fe3" 
                  fillOpacity="0.85"
                />
                {/* Deep Medical Blue Accent Ribbon */}
                <path 
                  d="M0,256L48,250.7C96,245,192,235,288,240C384,245,480,267,576,261.3C672,256,768,224,864,213.3C960,203,1056,213,1152,229.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
                  fill="#0077c8"
                />
              </svg>

              {/* Large Soft Blue Circular Arc embracing the right-hand image */}
              <div className="absolute -top-12 -right-12 w-[340px] sm:w-[460px] lg:w-[580px] h-[340px] sm:h-[460px] lg:h-[580px] rounded-full bg-[#bde3fb]/35 pointer-events-none"></div>

              {/* Floating Medical Crosses (+) */}
              <div className="absolute top-12 left-[12%] text-[#67c4f0]/50 select-none">
                <svg className="w-9 h-9 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
              </div>
              <div className="absolute bottom-16 left-6 text-[#67c4f0]/60 select-none">
                <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
              </div>
              <div className="absolute bottom-10 left-[34%] text-[#67c4f0]/40 select-none hidden sm:block">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
              </div>
              <div className="absolute top-8 right-[36%] text-[#67c4f0]/30 select-none hidden lg:block">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
              </div>
              <div className="absolute top-10 right-[6%] text-[#67c4f0]/40 select-none hidden sm:block">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
              </div>

              {/* Floating Cyan Leaf Accents */}
              <div className="absolute top-20 right-[40%] text-[#67c4f0]/70 rotate-12 select-none hidden md:block">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>
              </div>
              <div className="absolute bottom-20 left-[16%] text-[#67c4f0]/70 -rotate-45 select-none hidden sm:block">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>
              </div>
              <div className="absolute bottom-8 right-[5%] text-[#67c4f0]/80 rotate-45 select-none hidden sm:block">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>
              </div>
            </div>

            {/* 2. BANNER CONTENT (2-Column Grid Layout matching the design) */}
            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-center px-6 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-8 gap-6">
              
              {/* LEFT HALF: BRAND LOGO + TEXT + SLOGAN + BUTTON */}
              <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-5">
                
                {/* TECNIC MEDTECH LOGO (Exact proportions) */}
                <div className="flex items-center gap-2.5 sm:gap-3.5">
                  {/* Circular Emblem with inner ring & red point */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[2.5px] sm:border-[3px] border-[#0c3875] flex items-center justify-center bg-white shadow-xs relative shrink-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0c3875] flex items-center justify-center relative">
                      <div className="w-2.5 h-2.5 bg-[#e11d48] rounded-full"></div>
                      <div className="absolute top-1 w-full h-[2px] bg-[#0c3875]"></div>
                    </div>
                  </div>
                  <div>
                    <span className="block font-black text-xl sm:text-2xl text-[#0c3875] tracking-wider leading-none">
                      TECNIC
                    </span>
                    <span className="block font-bold text-[10px] sm:text-[11px] text-[#e11d48] tracking-[0.28em] uppercase leading-tight mt-0.5">
                      MEDTECH
                    </span>
                  </div>
                </div>

                {/* MAIN HEADLINES (Exact wording and typography) */}
                <div className="space-y-1 sm:space-y-1.5">
                  <h1 className="text-[#0080c6] font-black text-xl sm:text-2xl lg:text-3xl xl:text-[34px] leading-tight tracking-tight uppercase">
                    GIẢI PHÁP Y TẾ VÀ<br />
                    PHỤC HỒI CHỨC NĂNG
                  </h1>
                  <h2 className="text-[#0e387a] font-black text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] tracking-wide leading-none">
                    TECNIC
                  </h2>
                </div>

                {/* CURSIVE SLOGAN: "Chất lượng tạo uy tín" (Full Vietnamese calligraphic script) */}
                <div className="pt-0.5 sm:pt-1">
                  <p 
                    className="text-[#006ebc] font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] leading-relaxed drop-shadow-xs select-none"
                    style={{ 
                      fontFamily: "'Dancing Script', 'Alex Brush', 'Great Vibes', cursive, 'Brush Script MT'",
                      wordSpacing: '0.12em',
                      letterSpacing: '0.02em'
                    }}
                  >
                    Chất lượng tạo uy tín
                  </p>
                </div>

                {/* CTA BUTTON: "Liên hệ ngay" (Clean pill button matching the original banner) */}
                <div className="pt-2 sm:pt-3 flex items-center gap-3">
                  <button
                    id="btn-banner-contact"
                    onClick={handleContact}
                    className="bg-[#2997e8] hover:bg-[#0284c7] active:scale-95 text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 rounded-full shadow-md shadow-blue-400/30 transition-all flex items-center gap-2 cursor-pointer group"
                  >
                    <span>Liên hệ ngay</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="tel:0348402466"
                    className="hidden sm:inline-flex items-center gap-2 bg-white/90 hover:bg-white text-[#0e387a] border border-blue-200 font-bold text-xs px-4 py-2.5 rounded-full shadow-xs transition hover:border-blue-400"
                  >
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    <span>034 84 02466</span>
                  </a>
                </div>

              </div>

              {/* RIGHT HALF: DUAL CIRCULAR FRAMES (Nurse & Wheelchair Patient + Rehab Equipment) */}
              <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[260px] sm:min-h-[320px] lg:min-h-[360px]">
                
                {/* 1. LARGE CIRCULAR FRAME (Nurse warmly caring for elderly patient in wheelchair) */}
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-84 lg:h-84 xl:w-96 xl:h-96 rounded-full border-[5px] sm:border-[7px] border-white shadow-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 z-10 group">
                  <img 
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&auto=format&fit=crop&q=85" 
                    alt="Bác sĩ điều dưỡng hỗ trợ bệnh nhân phục hồi chức năng xe lăn TECNIC" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle inner highlight border */}
                  <div className="absolute inset-0 rounded-full border border-blue-200/50 pointer-events-none"></div>
                </div>

                {/* 2. OVERLAPPING FLOATING CIRCULAR FRAME (Rehabilitation Devices: Wheelchair, Walker, Robot Hand) */}
                <div 
                  onClick={() => onSelectCategory && onSelectCategory('ROBOT_NANG_HA')}
                  className="absolute -bottom-3 left-2 sm:left-6 lg:-left-4 xl:-left-8 w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 xl:w-54 xl:h-54 rounded-full border-[4px] sm:border-[5px] border-white bg-white shadow-2xl overflow-hidden z-20 cursor-pointer hover:scale-105 transition-transform group p-1"
                  title="Xem thiết bị phục hồi chức năng chính hãng TECNIC"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
                    <img 
                      src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&auto=format&fit=crop&q=85" 
                      alt="Xe lăn khung tập đi và găng tay robot phục hồi chức năng"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Cyan Rim Aura */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#00a3e0]/40 pointer-events-none"></div>
                    
                    {/* Floating badge */}
                    <span className="absolute bottom-2 bg-[#0077c8]/95 text-white font-bold text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-xs">
                      Thiết bị PHCN
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
