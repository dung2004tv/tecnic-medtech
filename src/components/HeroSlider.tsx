import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { HERO_BANNERS as DEFAULT_HERO_BANNERS } from '../data/categoriesData';
import { CategoryId, BannerSlide } from '../types';

interface HeroSliderProps {
  onSelectCategory: (catId: CategoryId) => void;
  onContactClick?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onSelectCategory,
  onContactClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Load custom banners or fallback to defaults
  const [banners] = useState<BannerSlide[]>(() => {
    const saved = localStorage.getItem('tecnic_slider_banners');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_HERO_BANNERS;
  });

  const [customBannerUrl] = useState<string | null>(() => {
    return localStorage.getItem('tecnic_custom_banner_url') || null;
  });
  const [imageLoadError, setImageLoadError] = useState(false);

  // Auto-play timer: Slide 0 (banner gốc) giữ lâu hơn (12 giây), các slide khác 5.5 giây
  useEffect(() => {
    if (isPaused) return;
    const duration = currentSlide === 0 ? 12000 : 5500;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [isPaused, currentSlide, banners.length]);

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      window.location.href = 'tel:0348402466';
    }
  };

  const activeSlide = banners[currentSlide] || banners[0];
  const slide0Src = customBannerUrl || '/Banner Tecnic Medtech.png';

  return (
    <section 
      aria-label="Thanh trượt Banner TECNIC MEDTECH"
      className="bg-[#f0f4f8] py-2 sm:py-4 border-b border-slate-200 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4">
        
        {/* MAIN SLIDER CONTAINER */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md overflow-hidden relative group">
          
          {/* SLIDE CANVAS VIEWPORT */}
          <div className="relative w-full aspect-[21/9] min-h-[220px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[460px] bg-slate-900 overflow-hidden">
            
            {/* SLIDE 0: PRIMARY TECNIC MEDTECH BRAND BANNER */}
            {currentSlide === 0 ? (
              <div className="relative w-full h-full animate-fadeIn bg-white">
                {!imageLoadError ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img 
                      src={slide0Src} 
                      alt="Banner TECNIC MEDTECH - Giải pháp y tế và phục hồi chức năng"
                      className="w-full h-full object-cover object-center block"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        if (!customBannerUrl) setImageLoadError(true);
                      }}
                    />

                    {/* Interactive Hotspots for Slide 0 */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Contact Button Hotspot */}
                      <div className="absolute top-[58%] left-[22%] sm:left-[23%] pointer-events-auto">
                        <button
                          onClick={handleContact}
                          title="Bấm để liên hệ tư vấn y khoa TECNIC"
                          className="opacity-0 hover:opacity-100 hover:bg-blue-600/20 rounded-full w-28 sm:w-40 h-8 sm:h-12 cursor-pointer transition"
                        >
                          <span className="sr-only">Liên hệ ngay</span>
                        </button>
                      </div>

                      {/* Rehab Hotspot */}
                      <div 
                        className="absolute top-[48%] left-[50%] w-[18%] sm:w-[15%] aspect-square rounded-full pointer-events-auto cursor-pointer hover:ring-4 hover:ring-sky-400/60 transition"
                        title="Khám phá Thiết Bị Phục Hồi Chức Năng TECNIC"
                        onClick={() => onSelectCategory('ROBOT_NANG_HA')}
                      >
                        <span className="sr-only">Xem thiết bị PHCN</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* High Fidelity Vector Fallback Banner */
                  <div 
                    className="w-full h-full p-6 sm:p-12 flex flex-col justify-center relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 60%, #0077c8 100%)'
                    }}
                  >
                    <div className="max-w-2xl space-y-3 z-10">
                      <div className="inline-flex items-center gap-2 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Chính Hãng TECNIC MEDTECH
                      </div>
                      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0c3875] tracking-tight uppercase leading-none">
                        GIẢI PHÁP Y TẾ & PHỤC HỒI CHỨC NĂNG
                      </h2>
                      <p className="text-xl sm:text-2xl font-bold text-[#006ebc] italic">
                        Giải pháp toàn diện, tái sinh cuộc sống
                      </p>
                      <div className="pt-3 flex items-center gap-3">
                        <button
                          onClick={handleContact}
                          className="bg-[#2997e8] hover:bg-[#0284c7] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 cursor-pointer"
                        >
                          <span>Liên hệ ngay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* SLIDES 1..N: CLEAN PROMOTIONAL WEB BANNER IMAGES */
              <div 
                className="relative w-full h-full animate-fadeIn cursor-pointer"
                onClick={() => activeSlide.targetCategory && onSelectCategory(activeSlide.targetCategory)}
              >
                <img 
                  src={activeSlide.image} 
                  alt={activeSlide.title}
                  className="w-full h-full object-cover object-center block"
                  referrerPolicy="no-referrer"
                />

                {/* Sleek Bottom Caption Bar (Optional overlay if title exists) */}
                {activeSlide.title && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 text-white flex items-center justify-between pointer-events-none">
                    <div>
                      <span className="bg-red-600 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mr-2">
                        {activeSlide.badge || 'Nổi bật'}
                      </span>
                      <h3 className="inline-block text-sm sm:text-xl font-bold text-white shadow-xs">
                        {activeSlide.title}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* NAV ARROWS (Left < and Right > Buttons) */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full backdrop-blur-md opacity-70 group-hover:opacity-100 transition duration-300 z-30 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Slide trước"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full backdrop-blur-md opacity-70 group-hover:opacity-100 transition duration-300 z-30 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Slide tiếp theo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* BOTTOM RIGHT CONTROL WIDGET (Matches Image: ⏸ | ● ● ● ● ● 1/5) */}
            <div className="absolute bottom-3 right-3 z-30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs flex items-center gap-2.5 shadow-lg">
              
              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="hover:text-amber-300 transition cursor-pointer p-0.5"
                title={isPaused ? "Bật tự động trượt" : "Tạm dừng trượt"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              </button>

              <span className="text-white/30 font-light">|</span>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx 
                        ? 'w-5 bg-white shadow-xs' 
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    title={`Chuyển đến slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="text-white/30 font-light">|</span>

              {/* Counter string (e.g. 1/5) */}
              <span className="font-mono font-bold text-[11px] text-white/90">
                {currentSlide + 1}/{banners.length}
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
