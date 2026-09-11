import React from 'react';
import { Home, Package, ShoppingCart, BookOpen, Phone, User as UserIcon } from 'lucide-react';
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
  onOpenAuth
}) => {
  return (
    <nav 
      aria-label="Thanh điều hướng ứng dụng di động"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] safe-area-pb"
    >
      <div className="grid grid-cols-5 h-15 max-w-md mx-auto items-center px-1">
        
        {/* 1. TRANG CHỦ */}
        <button
          type="button"
          onClick={() => onSelectView('HOME')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            currentView === 'HOME' ? 'text-[#0077b6]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${currentView === 'HOME' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-1 tracking-tight ${currentView === 'HOME' ? 'font-bold text-[#0077b6]' : 'font-medium'}`}>
            Trang chủ
          </span>
        </button>

        {/* 2. SẢN PHẨM */}
        <button
          type="button"
          onClick={() => onSelectView('PRODUCTS')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            currentView === 'PRODUCTS' ? 'text-[#0077b6]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className={`w-5 h-5 transition-transform ${currentView === 'PRODUCTS' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-1 tracking-tight ${currentView === 'PRODUCTS' ? 'font-bold text-[#0077b6]' : 'font-medium'}`}>
            Sản phẩm
          </span>
        </button>

        {/* 3. GIỎ HÀNG (Nút tròn nổi bật ở giữa) */}
        <div className="flex flex-col items-center justify-center relative -top-3">
          <button
            type="button"
            onClick={() => onSelectView('CART')}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0077b6] to-[#0096c7] text-white flex items-center justify-center shadow-lg shadow-[#0077b6]/35 active:scale-95 transition transform border-3 border-white cursor-pointer relative"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="w-5 h-5 stroke-[2.3]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-pulse">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
          <span className={`text-[10px] mt-0.5 tracking-tight ${currentView === 'CART' ? 'font-bold text-[#0077b6]' : 'font-semibold text-slate-700'}`}>
            Giỏ hàng
          </span>
        </div>

        {/* 4. CẨM NANG */}
        <button
          type="button"
          onClick={() => onSelectView('ARTICLES')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            currentView === 'ARTICLES' ? 'text-[#0077b6]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className={`w-5 h-5 transition-transform ${currentView === 'ARTICLES' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-1 tracking-tight ${currentView === 'ARTICLES' ? 'font-bold text-[#0077b6]' : 'font-medium'}`}>
            Cẩm nang
          </span>
        </button>

        {/* 5. HOTLINE & LIÊN HỆ */}
        {currentUser ? (
          <button
            type="button"
            onClick={() => onSelectView('CONTACT')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              currentView === 'CONTACT' ? 'text-[#0077b6]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-tight font-medium truncate max-w-[54px]">
              {currentUser.fullName ? currentUser.fullName.split(' ').pop() : 'Tài khoản'}
            </span>
          </button>
        ) : (
          <a
            href="tel:0348402466"
            className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <Phone className="w-5 h-5 animate-pulse stroke-[2.2]" />
            <span className="text-[10px] mt-1 tracking-tight font-bold text-emerald-600">
              Hotline
            </span>
          </a>
        )}

      </div>
    </nav>
  );
};
