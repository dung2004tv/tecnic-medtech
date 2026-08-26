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
    <nav className="bg-white border-b border-slate-200 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-bold">
        
        {/* MEGA MENU DROPDOWN BUTTON */}
        <div className="relative">
          <button
            onClick={() => {
              setIsMegaMenuOpen(!isMegaMenuOpen);
              if (currentView !== 'PRODUCTS') onSelectView('PRODUCTS');
            }}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            className="flex items-center gap-2.5 bg-[#143472] text-white px-5 py-3.5 hover:bg-blue-900 transition font-black tracking-wide text-sm"
          >
            <Menu className="w-5 h-5" />
            <span className="uppercase text-xs sm:text-sm">DANH MỤC THIẾT BỊ Y TẾ</span>
            <ChevronDown className="w-4 h-4 text-blue-200" />
          </button>

          {/* MEGA MENU CONTENT */}
          {isMegaMenuOpen && (
            <div 
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="absolute left-0 top-full w-96 bg-white border border-slate-200 shadow-2xl rounded-b-2xl py-2 z-50 divide-y divide-slate-100 max-h-[80vh] overflow-y-auto"
            >
              <div className="px-4 py-2.5 bg-slate-50 text-xs font-black text-slate-600 uppercase tracking-wider flex justify-between items-center">
                <span>Hệ Sinh Thái Sản Phẩm Y Tế</span>
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
                  className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-blue-50 transition group ${
                    activeCategory === cat.id && currentView === 'PRODUCTS' ? 'bg-blue-50 text-[#0071ba] font-black' : 'text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-xs transition">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="text-sm font-bold group-hover:text-[#0071ba]">{cat.name}</span>
                  </div>
                  <span className="text-xs bg-slate-100 group-hover:bg-blue-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MAIN NAVIGATION TABS (HOME / PRODUCTS / ABOUT / ARTICLES / ADMIN) */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 flex-1 mx-2">
          
          {/* TAB: SẢN PHẨM */}
          <button
            onClick={() => onSelectView('PRODUCTS')}
            className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 shrink-0 text-xs sm:text-sm ${
              currentView === 'PRODUCTS'
                ? 'text-[#0071ba] border-b-2 border-[#0071ba] bg-blue-50/60 font-black'
                : 'text-slate-600 hover:text-[#0071ba]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Sản Phẩm Thiết Bị Y Tế</span>
          </button>


          {/* TAB: GIỚI THIỆU TECNIC */}
          <button
            onClick={() => onSelectView('ABOUT')}
            className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 shrink-0 text-xs sm:text-sm ${
              currentView === 'ABOUT'
                ? 'text-[#0071ba] border-b-2 border-[#0071ba] bg-blue-50/60 font-black'
                : 'text-slate-600 hover:text-[#0071ba]'
            }`}
          >
            <Info className="w-4 h-4 text-[#0071ba]" />
            <span>Giới Thiệu TECNIC</span>
          </button>

          {/* TAB: TIN TỨC & KIẾN THỨC Y KHOA */}
          <button
            onClick={() => onSelectView('ARTICLES')}
            className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 shrink-0 text-xs sm:text-sm ${
              currentView === 'ARTICLES'
                ? 'text-[#0071ba] border-b-2 border-[#0071ba] bg-blue-50/60 font-black'
                : 'text-slate-600 hover:text-[#0071ba]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Tin Tức & Cẩm Nang Y Khoa</span>
          </button>

          {/* TAB: LIÊN HỆ */}
          <button
            onClick={() => onSelectView('CONTACT')}
            className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 shrink-0 text-xs sm:text-sm ${
              currentView === 'CONTACT'
                ? 'text-[#0071ba] border-b-2 border-[#0071ba] bg-blue-50/60 font-black'
                : 'text-slate-600 hover:text-[#0071ba]'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
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
