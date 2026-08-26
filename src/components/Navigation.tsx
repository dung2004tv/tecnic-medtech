import React, { useState } from 'react';
import { 
  Menu, ChevronDown, Footprints, Activity, Accessibility, 
  Bath, ShieldCheck, Home, HeartHandshake, BedDouble, 
  Bot, Bed, Zap, Layers, Info, BookOpen, Settings, ShoppingBag, Sparkles, PhoneCall, Dumbbell
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/productsData';

interface NavigationProps {
  activeCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
  currentView: 'PRODUCTS' | 'ABOUT' | 'ARTICLES' | 'CONTACT';
  onSelectView: (view: 'PRODUCTS' | 'ABOUT' | 'ARTICLES' | 'CONTACT') => void;
  onOpenAdmin: () => void;
  currentUser?: import('../types').User | null;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeCategory,
  onSelectCategory,
  currentView,
  onSelectView,
  onOpenAdmin,
  currentUser
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'TAP_VLTL_PHCN': return <Dumbbell className="w-4 h-4 text-emerald-600" />;
      case 'TRI_LIEU_XUNG_DIEN': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'THIET_BI_DONG_Y': return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'GIUONG_Y_TE': return <Bed className="w-4 h-4 text-teal-500" />;
      case 'DAI_NEP_KHOP': return <ShieldCheck className="w-4 h-4 text-indigo-500" />;
      case 'XE_LAN': return <Accessibility className="w-4 h-4 text-blue-500" />;
      case 'KHUNG_TAP_DI': return <Activity className="w-4 h-4 text-emerald-500" />;
      case 'GHE_BO_TAM': return <Bath className="w-4 h-4 text-cyan-500" />;
      case 'DEM_HOI_CHONG_LOET': return <BedDouble className="w-4 h-4 text-sky-500" />;
      case 'ROBOT_NANG_HA': return <Bot className="w-4 h-4 text-purple-500" />;
      case 'GAY_NANG': return <Footprints className="w-4 h-4 text-amber-600" />;
      case 'SAN_PHAM_HO_TRO': return <HeartHandshake className="w-4 h-4 text-rose-500" />;
      case 'TAY_VIN_CAI_TAO': return <Home className="w-4 h-4 text-orange-500" />;
      default: return <Layers className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-xs sticky top-[92px] sm:top-[104px] md:top-[112px] z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between text-xs font-bold">
        
        {/* MEGA MENU DROPDOWN BUTTON */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              setIsMegaMenuOpen(!isMegaMenuOpen);
              if (currentView !== 'PRODUCTS') onSelectView('PRODUCTS');
            }}
            className="flex items-center gap-1.5 sm:gap-2.5 bg-[#143472] hover:bg-blue-900 text-white px-3 sm:px-5 py-2.5 sm:py-3.5 transition font-black tracking-wide text-xs sm:text-sm cursor-pointer rounded-t-lg sm:rounded-none"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="uppercase text-[11px] sm:text-xs md:text-sm">DANH MỤC</span>
            <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-200 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* MEGA MENU CONTENT */}
          {isMegaMenuOpen && (
            <div 
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="fixed inset-x-2 sm:absolute sm:left-0 sm:right-auto top-[135px] sm:top-full w-auto sm:w-96 bg-white border border-slate-200 shadow-2xl rounded-2xl sm:rounded-t-none sm:rounded-b-2xl py-2 z-50 divide-y divide-slate-100 max-h-[75vh] overflow-y-auto"
            >
              <div className="px-4 py-2.5 bg-slate-50 text-xs font-black text-slate-600 uppercase tracking-wider flex justify-between items-center sticky top-0 bg-slate-50/95 backdrop-blur-xs z-10">
                <span>Danh Mục Thiết Bị Y Tế</span>
                <span className="text-[#0071ba] font-black">Chuẩn Bộ Y Tế</span>
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectView('PRODUCTS');
                    onSelectCategory(cat.id);
                    setIsMegaMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 sm:py-3 flex items-center justify-between hover:bg-blue-50 transition group cursor-pointer ${
                    activeCategory === cat.id && currentView === 'PRODUCTS' ? 'bg-blue-50 text-[#0071ba] font-black' : 'text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-xs transition">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="text-xs sm:text-sm font-bold group-hover:text-[#0071ba]">{cat.name}</span>
                  </div>
                  <span className="text-[11px] sm:text-xs bg-slate-100 group-hover:bg-blue-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MAIN NAVIGATION TABS (Compact, swipeable, clear active states) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1.5 flex-1 mx-1.5 sm:mx-3 scroll-smooth">
          
          {/* TAB: SẢN PHẨM */}
          <button
            onClick={() => {
              onSelectView('PRODUCTS');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 text-xs sm:text-sm cursor-pointer ${
              currentView === 'PRODUCTS'
                ? 'bg-[#0071ba] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-[#0071ba] hover:bg-slate-100 font-medium'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Sản Phẩm</span>
          </button>

          {/* TAB: GIỚI THIỆU TECNIC */}
          <button
            onClick={() => {
              onSelectView('ABOUT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 text-xs sm:text-sm cursor-pointer ${
              currentView === 'ABOUT'
                ? 'bg-[#0071ba] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-[#0071ba] hover:bg-slate-100 font-medium'
            }`}
          >
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Giới Thiệu</span>
          </button>

          {/* TAB: TIN TỨC & KIẾN THỨC Y KHOA */}
          <button
            onClick={() => {
              onSelectView('ARTICLES');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 text-xs sm:text-sm cursor-pointer ${
              currentView === 'ARTICLES'
                ? 'bg-[#0071ba] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-[#0071ba] hover:bg-slate-100 font-medium'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Tin Tức & Cẩm Nang</span>
            <span className="sm:hidden">Cẩm Nang</span>
          </button>

          {/* TAB: LIÊN HỆ */}
          <button
            onClick={() => {
              onSelectView('CONTACT');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 text-xs sm:text-sm cursor-pointer ${
              currentView === 'CONTACT'
                ? 'bg-[#0071ba] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-[#0071ba] hover:bg-slate-100 font-medium'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Liên Hệ</span>
          </button>

        </div>

        {/* WORKSPACE & ADMIN SHORTCUT: Chỉ hiển thị cho Quản Trị Viên & Nhân Viên */}
        {currentUser && (currentUser.accountType === 'ADMIN' || currentUser.accountType === 'STAFF') && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-blue-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-full font-black text-xs shadow-xs transition transform hover:scale-105"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-950" />
              <span>Trang Quản Trị ({currentUser.accountType === 'ADMIN' ? 'Admin' : 'Nhân Viên'})</span>
            </button>
          </div>
        )}

      </div>
    </nav>
  );
};
