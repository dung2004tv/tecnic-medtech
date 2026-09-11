import React from 'react';
import { Home, ShoppingBag, BookOpen, PhoneCall, ShoppingCart, User as UserIcon } from 'lucide-react';
import { AppView } from './Navigation';
import { User } from '../types';

interface MobileBottomNavProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  cartCount: number;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onSelectView,
  cartCount,
  currentUser,
  onOpenAuth,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-1.5 px-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Trang chủ */}
        <button
          type="button"
          onClick={() => {
            onSelectView('HOME');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'HOME'
              ? 'text-[#0077b6] font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors ${currentView === 'HOME' ? 'bg-sky-50' : ''}`}>
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Trang chủ</span>
        </button>

        {/* 2. Sản phẩm */}
        <button
          type="button"
          onClick={() => {
            onSelectView('PRODUCTS');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'PRODUCTS'
              ? 'text-[#0077b6] font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors ${currentView === 'PRODUCTS' ? 'bg-sky-50' : ''}`}>
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Sản phẩm</span>
        </button>

        {/* 3. Giỏ hàng (Nổi bật ở giữa) */}
        <button
          type="button"
          onClick={() => {
            onSelectView('CART');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center -mt-4 py-1 px-2 group cursor-pointer relative"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0077b6] to-[#0096c7] text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-105 active:scale-95 transition-transform border-2 border-white">
            <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 right-1 bg-red-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-800 tracking-tight mt-1">Giỏ hàng</span>
        </button>

        {/* 4. Tin tức */}
        <button
          type="button"
          onClick={() => {
            onSelectView('ARTICLES');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'ARTICLES'
              ? 'text-[#0077b6] font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors ${currentView === 'ARTICLES' ? 'bg-sky-50' : ''}`}>
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Cẩm nang</span>
        </button>

        {/* 5. Liên hệ / Gọi Hotline */}
        <a
          href="tel:0348402466"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer text-emerald-600 hover:text-emerald-700"
        >
          <div className="p-1 rounded-xl bg-emerald-50 text-emerald-600 animate-pulse">
            <PhoneCall className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Hotline</span>
        </a>
      </div>
    </div>
  );
};
