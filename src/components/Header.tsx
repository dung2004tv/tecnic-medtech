import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, Search, ShoppingCart, User as UserIcon, 
  Heart, Sparkles, LogOut, ChevronDown, 
  FileText, ShieldCheck, MapPin, Stethoscope, Download
} from 'lucide-react';
import { Product, User } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { TecnicLogo } from './TecnicLogo';
import { ProductImage } from './ProductImage';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
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
  currentSearchKeyword
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchKeyword);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Product[]>([]);
  const [userDropdown, setUserDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
      {/* 1. TOP BAR */}
      <div className="bg-[#143472] text-white text-[11px] sm:text-[12px] py-1 px-3 sm:px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Hotline & Advice */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <div className="flex items-center gap-1.5 text-blue-100 font-medium shrink-0">
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="hidden xs:inline text-blue-200">Hotline:</span>
              <a href="tel:0348402466" className="text-amber-300 text-xs sm:text-sm font-black tracking-wide hover:underline">
                034 84 02466
              </a>
              <span className="text-blue-300 text-xs">/</span>
              <a href="tel:0389880369" className="text-amber-300 text-xs sm:text-sm font-black tracking-wide hover:underline">
                038 988 0369
              </a>
              <span className="text-[10px] text-blue-300 hidden sm:inline">(24/7)</span>
            </div>
            
            <a 
              href="mailto:tecnic.medtech@gmail.com"
              className="hidden lg:flex items-center gap-1.5 text-blue-200 hover:text-white truncate"
            >
              <Mail className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              tecnic.medtech@gmail.com
            </a>
          </div>

          {/* Quick Links & Contact Button */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            <button 
              onClick={onOpenAbout}
              className="hidden md:flex items-center gap-1 text-slate-200 hover:text-white transition text-[11px]"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Trụ sở: Hà Đông, Hà Nội</span>
            </button>
            <span className="hidden md:inline text-blue-400">|</span>
            
            <button 
              onClick={onOpenOrderHistory}
              className="flex items-center gap-1 text-slate-200 hover:text-amber-300 transition font-medium text-[11px] sm:text-xs"
            >
              <FileText className="w-3 h-3 text-amber-300" />
              <span>Tra cứu đơn</span>
            </button>

            {currentUser && (currentUser.accountType === 'ADMIN' || currentUser.accountType === 'STAFF') && onOpenAdmin && (
              <>
                <span className="text-blue-400 hidden sm:inline">|</span>
                <button 
                  onClick={onOpenAdmin}
                  className="hidden sm:flex items-center gap-1 text-amber-300 hover:text-amber-200 transition font-bold text-[11px]"
                  title="Cổng Quản Trị Hệ Thống TECNIC"
                >
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>Quản trị</span>
                </button>
              </>
            )}

            <button 
              onClick={onOpenContact}
              className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-blue-950 px-2 sm:px-3 py-0.5 rounded-full font-bold transition shadow-xs hover:shadow text-[11px] sm:text-xs"
              title="Liên hệ hotline & tư vấn viên TECNIC"
            >
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Liên Hệ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Brand Blue #0071ba phong cách FPT Long Châu) */}
      <div className="bg-[#0071ba] text-white py-2 sm:py-2.5 px-3 sm:px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-6">
          
          {/* TOP ROW FOR MOBILE: LOGO + USER + CART */}
          <div className="flex items-center justify-between gap-2 w-full md:w-auto">
            {/* LOGO TECNIC MEDICAL */}
            <a 
              href="/" 
              className="flex items-center bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-transform active:scale-95 shrink-0"
            >
              <TecnicLogo size="md" showSlogan={true} />
            </a>

            {/* MOBILE ONLY ACTIONS: USER & CART */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center gap-1.5 bg-blue-900/50 border border-blue-300/40 px-2.5 py-1 rounded-full text-xs font-bold"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center font-black text-[10px]">
                      {currentUser.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[70px] truncate text-[11px]">{currentUser.fullName}</span>
                  </button>
                  {userDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50">
                      <div className="pb-2 border-b">
                        <p className="font-bold text-xs text-[#143472]">{currentUser.fullName}</p>
                        <p className="text-[10px] text-slate-500">{currentUser.phone}</p>
                      </div>
                      <div className="py-2 space-y-1 text-xs">
                        {(currentUser.accountType === 'ADMIN' || currentUser.accountType === 'STAFF') && onOpenAdmin && (
                          <button
                            onClick={() => { setUserDropdown(false); onOpenAdmin(); }}
                            className="w-full text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-2 text-[#0071ba] font-bold border border-blue-200"
                          >
                            <ShieldCheck className="w-4 h-4 text-[#0071ba]" />
                            Vào Trang Quản Trị
                          </button>
                        )}
                        <button
                          onClick={() => { setUserDropdown(false); onOpenOrderHistory(); }}
                          className="w-full text-left p-1.5 hover:bg-slate-100 rounded-lg flex items-center gap-2 text-slate-700"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#0071ba]" />
                          Đơn hàng của tôi
                        </button>
                      </div>
                      <button
                        onClick={() => { setUserDropdown(false); onLogout(); }}
                        className="w-full mt-1 pt-2 border-t text-left p-1 hover:bg-red-50 text-red-600 font-bold rounded-lg flex items-center gap-1.5 text-xs"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-3 py-1 rounded-full text-xs transition shadow-xs flex items-center gap-1"
                >
                  <UserIcon className="w-3 h-3" />
                  <span>Đăng nhập</span>
                </button>
              )}

              {/* CART ON MOBILE */}
              <button
                onClick={onOpenCart}
                className="relative bg-white hover:bg-blue-50 text-[#0071ba] font-bold p-1.5 sm:px-3 sm:py-2 rounded-full flex items-center gap-1.5 transition shadow-md"
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
                className="w-full bg-white text-slate-800 text-xs sm:text-sm pl-9 sm:pl-11 pr-10 sm:pr-12 py-2 sm:py-2.5 rounded-full outline-none focus:ring-3 focus:ring-amber-400 shadow-inner placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3 pointer-events-none" />

              {/* Submit search button */}
              <div className="absolute right-1.5 sm:right-2 flex items-center">
                <button
                  type="submit"
                  className="bg-[#143472] hover:bg-blue-950 text-white p-1 sm:p-1.5 rounded-full transition cursor-pointer"
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
                    <Sparkles className="w-3.5 h-3.5 text-[#0071ba]" /> Sản phẩm gợi ý phù hợp:
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
                      className="p-2.5 hover:bg-blue-50/70 cursor-pointer flex items-center justify-between gap-3 transition"
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
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-red-600 block">{prod.tecnicPrice.toLocaleString('vi-VN')} đ</span>
                        <span className="text-[10px] text-slate-400 line-through">{prod.marketPrice.toLocaleString('vi-VN')} đ</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP ACTIONS: USER ACCOUNT & CART (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            
            {/* TÀI KHOẢN NGƯỜI DÙNG */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 bg-blue-900/40 hover:bg-blue-900/70 border border-blue-300/30 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center font-black text-xs">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[110px] truncate">{currentUser.fullName}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50">
                    <div className="pb-2 border-b">
                      <p className="font-bold text-xs text-[#143472]">{currentUser.fullName}</p>
                      <p className="text-[11px] text-slate-500">{currentUser.phone}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-2 space-y-1 text-xs">
                      {(currentUser.accountType === 'ADMIN' || currentUser.accountType === 'STAFF') && onOpenAdmin && (
                        <button
                          onClick={() => { setUserDropdown(false); onOpenAdmin(); }}
                          className="w-full text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-2 text-[#0071ba] font-bold border border-blue-200 shadow-2xs"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#0071ba]" />
                          Vào Trang Quản Trị Hệ Thống
                        </button>
                      )}
                      <button
                        onClick={() => { setUserDropdown(false); onOpenOrderHistory(); }}
                        className="w-full text-left p-1.5 hover:bg-slate-100 rounded-lg flex items-center gap-2 text-slate-700"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#0071ba]" />
                        Đơn hàng của tôi
                      </button>
                      <button
                        onClick={() => { setUserDropdown(false); onOpenAbout(); }}
                        className="w-full text-left p-1.5 hover:bg-slate-100 rounded-lg flex items-center gap-2 text-slate-700"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Chính sách & Bảo hành
                      </button>
                    </div>

                    <button
                      onClick={() => { setUserDropdown(false); onLogout(); }}
                      className="w-full mt-2 pt-2 border-t text-left p-1.5 hover:bg-red-50 text-red-600 font-bold rounded-lg flex items-center gap-2 text-xs cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Đăng xuất tài khoản
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 px-2.5 py-1.5 rounded-l-full font-medium transition flex items-center gap-1 cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Đăng nhập
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-2.5 py-1.5 rounded-r-full transition cursor-pointer"
                >
                  Đăng ký
                </button>
              </div>
            )}

            {/* GIỎ HÀNG (Style FPT Long Châu) */}
            <button
              onClick={onOpenCart}
              className="relative bg-white hover:bg-blue-50 text-[#0071ba] font-bold px-3.5 py-2 rounded-full flex items-center gap-2 transition shadow-md group cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black text-[#143472]">Giỏ hàng</span>
              <span className="bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
