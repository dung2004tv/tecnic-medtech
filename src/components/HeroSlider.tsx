import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, ShieldCheck, Truck, 
  RotateCcw, Award, Sparkles, Bot, Building2, ArrowRight 
} from 'lucide-react';
import { HERO_BANNERS } from '../data/productsData';
import { CategoryId } from '../types';

interface HeroSliderProps {
  onSelectCategory: (catId: CategoryId) => void;
  onOpenAbout: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onSelectCategory,
  onOpenAbout
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_BANNERS[currentSlide];

  return (
    <section className="bg-[#f0f4f9] py-4">
      <div className="max-w-7xl mx-auto px-4 space-y-3">
        
        {/* BANNER GRID (1 Main Carousel + 2 Sub Banners giống FPT Long Châu) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          
          {/* MAIN CAROUSEL (2 Cột trên desktop) */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm h-64 sm:h-72 lg:h-80 bg-slate-900 group">
            
            {/* Slide Background with Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-95 transition-all duration-700`}></div>
            <img 
              src={slide.image} 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" 
            />

            {/* Slide Content */}
            <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between text-white z-10">
              <div className="space-y-2 max-w-xl">
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-blue-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  {slide.badge}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight drop-shadow-sm uppercase">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 line-clamp-2 leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => slide.targetCategory && onSelectCategory(slide.targetCategory)}
                  className="bg-white hover:bg-amber-400 text-[#143472] hover:text-blue-950 font-black text-xs sm:text-sm px-5 py-2.5 rounded-full transition shadow-lg flex items-center gap-2"
                >
                  {slide.linkText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {HERO_BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* SIDE BANNERS (2 Khối nhỏ bên phải giống FPT Long Châu) */}
          <div className="hidden lg:flex flex-col gap-3 h-80">
            
            {/* Top Side Banner */}
            <div 
              onClick={() => onSelectCategory('ROBOT_NANG_HA')}
              className="flex-1 bg-gradient-to-br from-[#143472] to-[#0071ba] text-white p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded uppercase">Phục hồi chức năng</span>
                <h3 className="font-black text-sm uppercase leading-snug">Găng Tay Robot & Ghế Nâng Hạ</h3>
                <p className="text-[11px] text-blue-100">Oromi 962 • Hueloi • OSADA XDC Thủy lực</p>
              </div>
              <div className="relative z-10 flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:underline">
                Xem thiết bị phục hồi chức năng →
              </div>
              <Bot className="absolute -bottom-2 -right-2 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform pointer-events-none" />
            </div>

            {/* Bottom Side Banner */}
            <div 
              onClick={onOpenAbout}
              className="flex-1 bg-gradient-to-br from-emerald-800 to-teal-600 text-white p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] bg-amber-400 text-blue-950 font-black px-2 py-0.5 rounded uppercase">Về Doanh Nghiệp</span>
                <h3 className="font-black text-sm uppercase leading-snug">TECNIC MEDTECH</h3>
                <p className="text-[11px] text-emerald-100">"Giải pháp toàn diện - Tái sinh cuộc sống"</p>
              </div>
              <div className="relative z-10 flex items-center gap-1 text-[11px] font-bold text-amber-200 group-hover:underline">
                Giới thiệu & Địa chỉ công ty →
              </div>
              <Building2 className="absolute -bottom-2 -right-2 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform pointer-events-none" />
            </div>

          </div>

        </div>

        {/* TRUST BADGES BAR (4 Cam kết y khoa chuẩn FPT Long Châu) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0071ba] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-800">100% Chính Hãng</p>
              <p className="text-[10px] text-slate-500">Đầy đủ giấy phép Bộ Y Tế</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-800">Giao Toàn Quốc</p>
              <p className="text-[10px] text-slate-500">Kiểm tra hàng trước khi trả</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-800">Bảo Hành 12 - 36T</p>
              <p className="text-[10px] text-slate-500">Đổi mới 30 ngày nếu lỗi</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-800">Hóa Đơn VAT Điện Tử</p>
              <p className="text-[10px] text-slate-500">Hỗ trợ dự toán trang thiết bị</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
