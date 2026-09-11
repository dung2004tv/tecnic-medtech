import React from 'react';
import { Home, ShoppingBag, Info, BookOpen, PhoneCall } from 'lucide-react';

export type AppView = 'HOME' | 'PRODUCTS' | 'ABOUT' | 'ARTICLES' | 'CONTACT' | 'CART';

interface NavigationProps {
  activeCategory?: import('../types').CategoryId;
  onSelectCategory?: (categoryId: import('../types').CategoryId) => void;
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  onOpenAdmin?: () => void;
  currentUser?: import('../types').User | null;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onSelectView,
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 shadow-xs sticky top-[84px] sm:top-[96px] md:top-[112px] z-40">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 flex items-center justify-start md:justify-center py-2 sm:py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-4 md:gap-8 lg:gap-12 shrink-0">
          
          {/* 1. TRANG CHỦ */}
          <button
            type="button"
            onClick={() => {
              onSelectView('HOME');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs sm:text-sm font-bold tracking-wide uppercase cursor-pointer ${
              currentView === 'HOME'
                ? 'bg-[#0077b6] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0077b6] hover:bg-sky-50'
            }`}
          >
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            <span>TRANG CHỦ</span>
          </button>

          {/* 2. SẢN PHẨM */}
          <button
            type="button"
            onClick={() => {
              onSelectView('PRODUCTS');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs sm:text-sm font-bold tracking-wide uppercase cursor-pointer ${
              currentView === 'PRODUCTS'
                ? 'bg-[#0077b6] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0077b6] hover:bg-sky-50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            <span>SẢN PHẨM</span>
          </button>

          {/* 3. TIN TỨC & CẨM NANG */}
          <button
            type="button"
            onClick={() => {
              onSelectView('ARTICLES');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs sm:text-sm font-bold tracking-wide uppercase cursor-pointer ${
              currentView === 'ARTICLES'
                ? 'bg-[#0077b6] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0077b6] hover:bg-sky-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            <span>CẨM NANG Y KHOA</span>
          </button>

          {/* 4. GIỚI THIỆU */}
          <button
            type="button"
            onClick={() => {
              onSelectView('ABOUT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs sm:text-sm font-bold tracking-wide uppercase cursor-pointer ${
              currentView === 'ABOUT'
                ? 'bg-[#0077b6] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0077b6] hover:bg-sky-50'
            }`}
          >
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            <span>GIỚI THIỆU</span>
          </button>

          {/* 5. LIÊN HỆ */}
          <button
            type="button"
            onClick={() => {
              onSelectView('CONTACT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs sm:text-sm font-bold tracking-wide uppercase cursor-pointer ${
              currentView === 'CONTACT'
                ? 'bg-[#0077b6] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0077b6] hover:bg-sky-50'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            <span>LIÊN HỆ</span>
          </button>

        </div>
      </div>
    </nav>
  );
};
