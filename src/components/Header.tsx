import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, Search, ShoppingCart, User as UserIcon, 
  Heart, Sparkles, LogOut, ChevronDown, 
  FileText, ShieldCheck, MapPin, Stethoscope, Download, Smartphone
} from 'lucide-react';
import { Product, User } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { TecnicLogo } from './TecnicLogo';
import { ProductImage } from './ProductImage';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: (mode: 'login' | 'register' | 'admin') => void;
  currentUser: User | null;
  onLogout: () => void;
  onSelectProduct: (product: Product) => void;
  onSearchChange: (keyword: string) => void;
  allProducts: Product[];
  onOpenAbout: () => void;
  onOpenOrderHistory: () => void;
  onOpenContact?: () => void;
  onOpenAdmin?: () => void;
  onQuickSearchTag?: (tag: string) => void;
  currentSearchKeyword: string;
  onLogoClick?: () => void;
  onOpenInstallApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  currentUser,
  onLogout,
  onSelectProduct,
  onSearchChange,
  allProducts,
  onOpenAbout,
  onOpenOrderHistory,
  onOpenContact,
  onOpenAdmin,
  onQuickSearchTag,
  currentSearchKeyword,
  onLogoClick,
  onOpenInstallApp
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchKeyword);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Product[]>([]);
  const [userDropdown, setUserDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(currentSearchKeyword);
  }, [currentSearchKeyword]);

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const q = searchTerm.toLowerCase();
      const results = allProducts.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.specifications.brand.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      ).slice(0, 6);
      setFilteredSuggestions(results);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allProducts]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchTerm);
    setShowSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* 1. TOP BAR (Clean Light Ice-Slate - KHÔNG DÙNG MÀU ĐEN) */}
      <div className="bg-slate-100/95 text-slate-700 text-[11px] sm:text-[12px] py-1.5 px-3 sm:px-4 border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Hotline & Advice */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <div className="flex items-center gap-1.5 text-slate-800 font-medium shrink-0">
              <Phone className="w-3.5 h-3.5 text-red-500 shrink-0 animate-pulse" />
              <span className="hidden xs:inline text-slate-600 font-bold">Hotline:</span>
              <a href="tel:0348402466" className="text-[#0077b6] text-xs sm:text-sm font-black tracking-wide hover:text-[#023e8a] hover:underline">
                034 84 02466
              </a>
              <span className="text-slate-400 text-xs">/</span>
              <a href="tel:0389880369" className="text-[#0077b6] text-xs sm:text-sm font-black tracking-wide hover:text-[#023e8a] hover:underline">
                038 988 0369
              </a>
            </div>
            
            <a 
              href="mailto:tecnic.medtech@gmail.com"
              className="hidden lg:flex items-center gap-1.5 text-slate-600 hover:text-[#0077b6] font-medium truncate transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0077b6] shrink-0" />
              tecnic.medtech@gmail.com
            </a>
          </div>

          {/* Quick Links: Install App, Order History & Logout */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            {onOpenInstallApp && (
              <button
                type="button"
                onClick={onOpenInstallApp}
                className="flex items-center gap-1.5 bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-full cursor-pointer shadow-xs transition transform active:scale-95"
                title="Cài đặt ứng dụng TECNIC App về máy tính & điện thoại"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-extrabold">Cài App</span>
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button 
                  onClick={onOpenOrderHistory}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:text-[#0077b6] hover:border-[#0077b6] transition font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-full cursor-pointer shadow-2xs"
                  title="Xem danh sách đơn hàng đã mua"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0077b6]" />
                  <span>Đơn hàng của tôi</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-full cursor-pointer"
                  title="Đăng xuất khỏi tài khoản"
                >
                  <LogOut className="w-3 h-3 text-red-500" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenOrderHistory}
                className="flex items-center gap-1 text-slate-700 hover:text-[#0077b6] transition font-bold text-[11px] sm:text-xs cursor-pointer"
              >
                <FileText className="w-3 h-3 text-[#0077b6]" />
                <span>Tra cứu đơn hàng</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Tông 3: Modern MedTech Ocean Cobalt Blue #0077b6) */}
      <div className="bg-[#0077b6] text-white py-2.5 sm:py-3 px-3 sm:px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-6">
          
          {/* TOP ROW FOR MOBILE: LOGO + USER + CART */}
          <div className="flex items-center justify-between gap-2 w-full md:w-auto">
            {/* LOGO TECNIC MEDICAL */}
            <a 
              href="/" 
              onClick={(e) => {
                if (onLogoClick) {
                  e.preventDefault();
                  onLogoClick();
                }
              }}
              className="flex items-center py-1 transition-transform active:scale-95 shrink-0 cursor-pointer"
              title="TECNIC MEDTECH - Trang chủ"
            >
              <TecnicLogo size="md" variant="dark" showSlogan={false} />
            </a>

            {/* MOBILE ONLY ACTIONS: USER & CART */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center gap-1.5 bg-blue-900/50 border border-blue-300/40 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-white text-[#143472] flex items-center justify-center font-black text-[10px]">
                      {currentUser.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[80px] truncate text-[11px] font-bold text-white">{currentUser.fullName}</span>
                    <ChevronDown className={`w-3 h-3 text-white transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {userDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fadeIn">
                      <div className="pb-3 mb-2 border-b border-slate-100">
                        <p className="font-extrabold text-sm text-slate-900 leading-tight">{currentUser.fullName}</p>
                        {currentUser.phone && (
                          <p className="text-xs text-slate-600 font-medium mt-1">{currentUser.phone}</p>
                        )}
                        {currentUser.email && (
                          <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">{currentUser.email}</p>
                        )}
                      </div>

                      <div className="space-y-1.5 text-xs py-1">
                        <button
                          onClick={() => { setUserDropdown(false); onOpenOrderHistory(); }}
                          className="w-full text-left py-2 px-2.5 hover:bg-blue-50/80 rounded-xl flex items-center gap-2.5 text-slate-800 font-semibold transition cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-[#0071ba]" />
                          <span>Đơn hàng của tôi</span>
                        </button>

                        <button
                          onClick={() => { setUserDropdown(false); onOpenAbout(); }}
                          className="w-full text-left py-2 px-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 text-slate-700 font-semibold transition cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Chính sách & Bảo hành</span>
                        </button>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => { setUserDropdown(false); onLogout(); }}
                          className="w-full text-left py-2 px-2.5 hover:bg-red-50 text-red-600 font-bold rounded-xl flex items-center gap-2.5 text-xs transition cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Đăng xuất tài khoản</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="bg-white hover:bg-blue-50 text-[#143472] font-black px-3 py-1 rounded-full text-xs transition shadow-xs flex items-center gap-1"
                >
                  <UserIcon className="w-3 h-3" />
                  <span>Đăng nhập</span>
                </button>
              )}

              {/* CART ON MOBILE */}
              <button
                onClick={onOpenCart}
                className="relative bg-white hover:bg-blue-50 text-[#143472] font-bold p-1.5 sm:px-3 sm:py-2 rounded-full flex items-center gap-1.5 transition shadow-md"
                title="Giỏ hàng"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <span className="bg-red-600 text-white text-[10px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* SEARCH BAR (Full width on mobile, flexible max-width on desktop) */}
          <div ref={searchRef} className="w-full md:flex-1 md:max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => { if (filteredSuggestions.length > 0) setShowSuggestions(true); }}
                placeholder="Tìm kiếm xe lăn, giường y tế, găng robot, Bonbone..."
                className="w-full bg-white text-slate-800 text-xs sm:text-sm pl-9 sm:pl-11 pr-10 sm:pr-12 py-2 sm:py-2.5 rounded-full outline-none focus:ring-2 focus:ring-sky-300 shadow-inner placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3 pointer-events-none" />

              {/* Submit search button */}
              <div className="absolute right-1.5 sm:right-2 flex items-center">
                <button
                  type="submit"
                  className="bg-[#023e8a] hover:bg-[#002855] text-white p-1 sm:p-1.5 rounded-full transition cursor-pointer shadow-xs"
                  title="Tìm kiếm"
                >
                  <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </form>

            {/* AUTOCOMPLETE DROPDOWN */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                <div className="p-2.5 bg-slate-50 border-b flex justify-between items-center text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0077b6]" /> Sản phẩm gợi ý phù hợp:
                  </span>
                  <span className="text-[11px] text-slate-400">Nhấn để xem</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {filteredSuggestions.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        setShowSuggestions(false);
                      }}
                      className="p-2.5 hover:bg-sky-50/70 cursor-pointer flex items-center justify-between gap-3 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          <ProductImage product={prod} size="sm" showBadge={false} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 line-clamp-1">{prod.name}</p>
                          <p className="text-[11px] text-slate-500">{prod.specifications.brand} • {prod.categoryName}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 whitespace-nowrap">
                        <span className="text-xs font-black text-red-600 block whitespace-nowrap">{prod.tecnicPrice.toLocaleString('vi-VN')}&nbsp;đ</span>
                        <span className="text-[10px] text-slate-400 line-through whitespace-nowrap">{prod.marketPrice.toLocaleString('vi-VN')}&nbsp;đ</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP ACTIONS: USER ACCOUNT & CART */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            
            {/* TÀI KHOẢN NGƯỜI DÙNG */}
            {currentUser ? (
              <div 
                ref={userDropdownRef}
                className="relative"
              >
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer group"
                  title="Nhấn để mở menu tài khoản"
                >
                  <div className="w-6 h-6 rounded-full bg-white text-[#0077b6] flex items-center justify-center font-black text-xs group-hover:scale-105 transition-transform">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{currentUser.fullName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fadeIn">
                    <div className="pb-3 mb-2 border-b border-slate-100">
                      <p className="font-extrabold text-sm text-slate-900 leading-tight">{currentUser.fullName}</p>
                      {currentUser.phone && (
                        <p className="text-xs text-slate-600 font-medium mt-1">{currentUser.phone}</p>
                      )}
                      {currentUser.email && (
                        <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">{currentUser.email}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 text-xs py-1">
                      <button
                        onClick={() => { setUserDropdown(false); onOpenOrderHistory(); }}
                        className="w-full text-left py-2 px-2.5 hover:bg-sky-50 rounded-xl flex items-center gap-2.5 text-slate-800 font-semibold transition cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-[#0077b6]" />
                        <span>Đơn hàng của tôi</span>
                      </button>

                      <button
                        onClick={() => { setUserDropdown(false); onOpenAbout(); }}
                        className="w-full text-left py-2 px-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 text-slate-700 font-semibold transition cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Chính sách & Bảo hành</span>
                      </button>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => { setUserDropdown(false); onLogout(); }}
                        className="w-full text-left py-2 px-2.5 hover:bg-red-50 text-red-600 font-bold rounded-xl flex items-center gap-2.5 text-xs transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Đăng xuất tài khoản</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="bg-white hover:bg-sky-50 text-[#0077b6] font-bold px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#0077b6]" />
                  <span>Đăng nhập</span>
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-3 py-1.5 rounded-full font-bold transition cursor-pointer"
                >
                  <span>Đăng ký</span>
                </button>
              </div>
            )}

            {/* GIỎ HÀNG */}
            <div className="relative group">
              <button
                onClick={onOpenCart}
                className="bg-white hover:bg-sky-50 text-[#0077b6] font-bold px-3.5 py-2 rounded-full flex items-center gap-2 transition shadow-md cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black text-[#0077b6]">Giỏ hàng</span>
                <span className="bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              </button>

              {/* Hover Cart Tooltip */}
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-56 bg-slate-900/95 text-white text-xs p-2.5 rounded-xl shadow-2xl z-50 pointer-events-none animate-fadeIn border border-slate-700/50">
                <p className="font-bold text-amber-300 flex items-center gap-1">
                  <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
                  {cartCount > 0 ? `Có ${cartCount} sản phẩm trong giỏ` : 'Giỏ hàng đang trống'}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">Nhấn để xem & thanh toán ngay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
