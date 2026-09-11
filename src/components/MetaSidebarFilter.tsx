import React, { useState, useMemo } from 'react';
import { 
  Search, ChevronDown, ChevronUp, Check, RotateCcw,
  SlidersHorizontal, Filter
} from 'lucide-react';
import { CategoryId, Product } from '../types';

interface MetaSidebarFilterProps {
  activeCategory: CategoryId;
  onSelectCategory: (catId: CategoryId) => void;
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  selectedPriceRange: [number, number];
  onSelectPriceRange: (range: [number, number]) => void;
  selectedOrigin: string;
  onSelectOrigin: (origin: string) => void;
  selectedFeature?: string;
  onSelectFeature?: (feature: string) => void;
  allProducts: Product[];
  onResetAll: () => void;
  isCompact?: boolean;
}

// Nhóm thiết bị (Categories mapping - Clean labels without numbers)
const CATEGORY_ITEMS: { id: CategoryId; name: string; shortName: string }[] = [
  { id: 'ALL', name: 'Tất cả thiết bị', shortName: 'Tất cả' },
  { id: 'GAY_NANG', name: 'Gậy Chống & Nạng Tập Đi', shortName: 'Gậy & Nạng' },
  { id: 'KHUNG_TAP_DI', name: 'Khung Tập Đi & Khung Ghế', shortName: 'Khung tập đi' },
  { id: 'XE_LAN', name: 'Xe Lăn Tay & Xe Lăn Đa Năng', shortName: 'Xe lăn' },
  { id: 'GHE_BO_TAM', name: 'Ghế Bô Vệ Sinh & Ghế Tắm', shortName: 'Ghế bô, tắm' },
  { id: 'DAI_NEP_KHOP', name: 'Đai Nẹp Cơ Xương Khớp Bonbone', shortName: 'Đai nẹp khớp' },
  { id: 'GIUONG_Y_TE', name: 'Giường Y Tế & Kéo Giãn', shortName: 'Giường y tế' },
  { id: 'ROBOT_NANG_HA', name: 'Robot PHCN & Ghế Nâng Hạ', shortName: 'Robot PHCN' },
  { id: 'TAP_VLTL_PHCN', name: 'Dụng Cụ Tập VLTL & PHCN', shortName: 'Tập VLTL' },
  { id: 'TRI_LIEU_XUNG_DIEN', name: 'Máy VL Trị Liệu & Xung Điện', shortName: 'Xung điện' },
  { id: 'THIET_BI_DONG_Y', name: 'Thiết Bị Đông Y & YHCT', shortName: 'Đông Y' },
  { id: 'DEM_HOI_CHONG_LOET', name: 'Đệm Hơi Chống Loét', shortName: 'Đệm chống loét' },
  { id: 'SAN_PHAM_HO_TRO', name: 'Dụng Cụ Chăm Sóc Gia Đình', shortName: 'Dụng cụ CS' },
  { id: 'TAY_VIN_CAI_TAO', name: 'Khung Tay Vịn An Toàn', shortName: 'Tay vịn' },
];

// Price presets exactly matching Long Châu format (Ảnh 1)
const PRICE_PRESETS: { id: string; label: string; min: number; max: number }[] = [
  { id: 'UNDER_100K', label: 'Dưới 100.000 đ', min: 0, max: 100000 },
  { id: '100K_300K', label: '100.000 đ - 300.000 đ', min: 100000, max: 300000 },
  { id: '300K_500K', label: '300.000 đ - 500.000 đ', min: 300000, max: 500000 },
  { id: '500K_2M', label: '500.000 đ - 2.000.000 đ', min: 500000, max: 2000000 },
  { id: '2M_5M', label: '2.000.000 đ - 5.000.000 đ', min: 2000000, max: 5000000 },
  { id: 'ABOVE_5M', label: 'Trên 5.000.000 đ', min: 5000000, max: 500000000 },
];

export const MetaSidebarFilter: React.FC<MetaSidebarFilterProps> = ({
  activeCategory,
  onSelectCategory,
  selectedTag,
  onSelectTag,
  selectedBrand,
  onSelectBrand,
  selectedPriceRange,
  onSelectPriceRange,
  selectedOrigin,
  onSelectOrigin,
  allProducts,
  onResetAll
}) => {
  const [brandSearch, setBrandSearch] = useState('');
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreOrigins, setShowMoreOrigins] = useState(false);

  // Custom price input state
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');

  // 1. Calculate dynamic brand counts from products
  const brandsWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts.forEach(p => {
      const b = p.specifications?.brand || 'TECNIC';
      counts[b] = (counts[b] || 0) + 1;
    });
    const list = Object.entries(counts).map(([brand, count]) => ({ brand, count }));
    list.sort((a, b) => b.count - a.count);
    return list;
  }, [allProducts]);

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return brandsWithCounts;
    return brandsWithCounts.filter(item => 
      item.brand.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [brandsWithCounts, brandSearch]);

  // 2. Calculate dynamic origin counts from products - CHUẨN HÓA DUY NHẤT 1 "NHẬT BẢN"
  const originsWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts.forEach(p => {
      let o = p.specifications?.origin?.trim() || 'Chính hãng';
      const oLower = o.toLowerCase();
      if (oLower.includes('nhật') || oLower.includes('japan')) {
        o = 'Nhật Bản';
      } else if (oLower.includes('trung quốc') || oLower.includes('china')) {
        o = 'Trung Quốc';
      } else if (oLower.includes('mỹ') || oLower.includes('usa') || oLower.includes('hoa kỳ')) {
        o = 'Mỹ';
      } else if (oLower.includes('đức') || oLower.includes('germany')) {
        o = 'Đức';
      } else if (oLower.includes('đài loan') || oLower.includes('taiwan')) {
        o = 'Đài Loan';
      } else if (oLower.includes('việt nam') || oLower.includes('vietnam')) {
        o = 'Việt Nam';
      } else if (oLower.includes('hàn quốc') || oLower.includes('korea')) {
        o = 'Hàn Quốc';
      }
      counts[o] = (counts[o] || 0) + 1;
    });
    const list = Object.entries(counts).map(([origin, count]) => ({ origin, count }));
    list.sort((a, b) => b.count - a.count);
    return list;
  }, [allProducts]);

  // Current active price preset ID
  const currentPricePresetId = useMemo(() => {
    const found = PRICE_PRESETS.find(
      p => p.min === selectedPriceRange[0] && p.max === selectedPriceRange[1]
    );
    return found ? found.id : (selectedPriceRange[0] === 0 && selectedPriceRange[1] >= 500000000 ? 'NONE' : 'CUSTOM');
  }, [selectedPriceRange]);

  const handleApplyCustomPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = minPriceInput ? parseInt(minPriceInput.replace(/\D/g, ''), 10) : 0;
    const max = maxPriceInput ? parseInt(maxPriceInput.replace(/\D/g, ''), 10) : 500000000;
    onSelectPriceRange([min || 0, max || 500000000]);
  };

  const validCategories = useMemo(() => {
    return CATEGORY_ITEMS.filter(cat => allProducts.some(p => p.category === cat.id));
  }, [allProducts]);

  const visibleCategories = showMoreCategories ? validCategories : validCategories.slice(0, 6);

  return (
    <aside className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-1.5 sm:p-4 space-y-3 sm:space-y-5 text-slate-800 select-none">
      
      {/* 1. HEADER: BỘ LỌC + THIẾT LẬP LẠI */}
      <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0071ba]" />
          <h2 className="font-black text-xs sm:text-sm text-slate-900 tracking-wide">
            Bộ lọc
          </h2>
        </div>
        <button
          onClick={() => {
            setMinPriceInput('');
            setMaxPriceInput('');
            onResetAll();
          }}
          className="text-[11px] sm:text-xs font-semibold text-[#0071ba] hover:text-[#005a96] hover:underline flex items-center gap-1 transition cursor-pointer"
          title="Thiết lập lại toàn bộ bộ lọc"
        >
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* 2. XUẤT XỨ Y TẾ (ĐẶT LÊN TRÊN ĐẦU - CHUẨN HÓA DUY NHẤT 1 NHẬT BẢN) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] sm:text-xs font-black uppercase text-slate-900 tracking-wider">
            XUẤT XỨ Y TẾ
          </h3>
          {selectedOrigin !== 'ALL' && (
            <button
              onClick={() => onSelectOrigin('ALL')}
              className="text-[10px] sm:text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
            >
              Bỏ chọn
            </button>
          )}
        </div>

        <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5 custom-scrollbar">
          {(showMoreOrigins ? originsWithCounts : originsWithCounts.slice(0, 5)).map(({ origin, count }) => {
            const isChecked = selectedOrigin.trim().toLowerCase() === origin.trim().toLowerCase();
            const getFlag = (name: string) => {
              const n = name.toLowerCase();
              if (n.includes('nhật')) return '🇯🇵';
              if (n.includes('mỹ')) return '🇺🇸';
              if (n.includes('trung')) return '🇨🇳';
              if (n.includes('đức')) return '🇩🇪';
              if (n.includes('đài loan')) return '🇹🇼';
              if (n.includes('việt nam')) return '🇻🇳';
              if (n.includes('hàn')) return '🇰🇷';
              return '🌐';
            };
            return (
              <label
                key={origin}
                onClick={() => onSelectOrigin(isChecked ? 'ALL' : origin)}
                title={origin}
                className={`flex items-center justify-between py-1.5 px-1.5 sm:px-2 rounded-lg cursor-pointer text-xs font-medium select-none group transition ${
                  isChecked ? 'bg-blue-50 border border-blue-200 text-[#0071ba] font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1">
                  <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border flex items-center justify-center shrink-0 transition ${
                    isChecked ? 'bg-[#0071ba] border-[#0071ba] text-white' : 'border-slate-300 group-hover:border-[#0071ba] bg-white'
                  }`}>
                    {isChecked && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
                  </div>
                  <span className="shrink-0 text-xs sm:text-sm leading-none">{getFlag(origin)}</span>
                  <span className="text-[11px] sm:text-xs text-slate-800 font-medium leading-tight break-words">
                    {origin}
                  </span>
                </div>
                {/* Ẩn số lượng chú thích trên Mobile theo yêu cầu của user để tạo khoảng trống dễ nhìn */}
                <span className="hidden sm:inline text-[10px] sm:text-[11px] text-slate-400 font-mono shrink-0">({count})</span>
              </label>
            );
          })}
        </div>

        {originsWithCounts.length > 5 && (
          <button
            type="button"
            onClick={() => setShowMoreOrigins(!showMoreOrigins)}
            className="text-[10px] sm:text-[11px] font-bold text-[#0071ba] hover:underline flex items-center gap-1 pt-0.5 cursor-pointer"
          >
            {showMoreOrigins ? (
              <><span>Thu gọn</span> <ChevronUp className="w-3 h-3" /></>
            ) : (
              <><span>Xem thêm</span> <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        )}
      </div>

      {/* 3. NHÓM THIẾT BỊ / LOẠI SẢN PHẨM */}
      <div className="space-y-2 pt-2.5 sm:pt-3 border-t border-slate-100">
        <h3 className="text-[11px] sm:text-xs font-black uppercase text-slate-900 tracking-wider">
          NHÓM THIẾT BỊ
        </h3>

        <div className="space-y-1 max-h-52 overflow-y-auto pr-0.5 custom-scrollbar">
          {visibleCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  onSelectTag('ALL');
                }}
                className={`w-full text-left px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs transition cursor-pointer flex items-center justify-between leading-snug ${
                  isActive
                    ? 'bg-[#0071ba] text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0071ba] font-medium'
                }`}
              >
                <span className="sm:hidden break-words line-clamp-2">{cat.shortName}</span>
                <span className="hidden sm:inline break-words line-clamp-2">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {validCategories.length > 6 && (
          <button
            type="button"
            onClick={() => setShowMoreCategories(!showMoreCategories)}
            className="text-[10px] sm:text-[11px] font-bold text-[#0071ba] hover:underline flex items-center gap-1 pt-0.5 cursor-pointer"
          >
            {showMoreCategories ? (
              <><span>Thu gọn</span> <ChevronUp className="w-3 h-3" /></>
            ) : (
              <><span>Xem thêm</span> <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        )}
      </div>

      {/* 4. KHOẢNG GIÁ */}
      <div className="space-y-2 pt-2.5 sm:pt-3 border-t border-slate-100">
        <h3 className="text-[11px] sm:text-xs font-black uppercase text-slate-900 tracking-wider">
          KHOẢNG GIÁ
        </h3>

        {/* Radio options */}
        <div className="space-y-1">
          {PRICE_PRESETS.map((preset) => {
            const isSelected = currentPricePresetId === preset.id;
            return (
              <label
                key={preset.id}
                onClick={() => {
                  if (isSelected) {
                    onSelectPriceRange([0, 500000000]);
                  } else {
                    onSelectPriceRange([preset.min, preset.max]);
                  }
                }}
                className={`flex items-start sm:items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 py-1.5 rounded-lg sm:rounded-xl text-[10.5px] sm:text-xs font-medium cursor-pointer transition border leading-tight ${
                  isSelected 
                    ? 'bg-blue-50/70 border-[#0071ba] text-[#0071ba] font-bold shadow-2xs' 
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700 hover:border-slate-200'
                }`}
              >
                <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition ${
                  isSelected ? 'border-[#0071ba] bg-white' : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0071ba]" />}
                </div>
                <span className="break-words font-medium text-slate-800">
                  {preset.label}
                </span>
              </label>
            );
          })}
        </div>

        {/* Custom Price Range Form */}
        <div className="pt-1.5">
          <p className="text-[10px] sm:text-[11px] text-slate-500 mb-1 font-medium">
            Hoặc nhập khoảng giá:
          </p>
          <form onSubmit={handleApplyCustomPrice} className="space-y-1.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tối thiểu"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className="w-full text-[11px] sm:text-xs pl-2 pr-5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#0071ba] text-slate-800 transition"
                />
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">đ</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tối đa"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className="w-full text-[11px] sm:text-xs pl-2 pr-5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#0071ba] text-slate-800 transition"
                />
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">đ</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0071ba] hover:bg-[#005a96] text-white text-[11px] sm:text-xs font-bold py-1.5 rounded-lg transition shadow-xs cursor-pointer"
            >
              Áp dụng
            </button>
          </form>
        </div>
      </div>

      {/* 5. THƯƠNG HIỆU */}
      <div className="space-y-2 pt-2.5 sm:pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] sm:text-xs font-black uppercase text-slate-900 tracking-wider">
            THƯƠNG HIỆU
          </h3>
          {selectedBrand !== 'ALL' && (
            <button
              onClick={() => onSelectBrand('ALL')}
              className="text-[10px] sm:text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
            >
              Bỏ chọn
            </button>
          )}
        </div>

        {/* Brand Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm thương hiệu"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full text-[11px] sm:text-xs pl-7 pr-2.5 py-1.5 bg-slate-50/80 border border-slate-200 rounded-lg outline-none focus:border-[#0071ba] focus:bg-white text-slate-800 transition"
          />
          <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
        </div>

        {/* Checkbox Brand List */}
        <div className="space-y-1 max-h-44 overflow-y-auto pr-0.5 custom-scrollbar">
          {(showMoreBrands ? filteredBrands : filteredBrands.slice(0, 5)).map(({ brand, count }) => {
            const isChecked = selectedBrand === brand;
            return (
              <label
                key={brand}
                onClick={() => onSelectBrand(isChecked ? 'ALL' : brand)}
                className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer text-[11px] sm:text-xs font-medium select-none group transition ${
                  isChecked ? 'bg-blue-50 border border-blue-200 text-[#0071ba] font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border flex items-center justify-center shrink-0 transition ${
                    isChecked ? 'bg-[#0071ba] border-[#0071ba] text-white' : 'border-slate-300 group-hover:border-[#0071ba] bg-white'
                  }`}>
                    {isChecked && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-800 font-medium leading-tight break-words">
                    {brand}
                  </span>
                </div>
                {/* Ẩn số lượng thương hiệu trên Mobile */}
                <span className="hidden sm:inline text-[10px] sm:text-[11px] text-slate-400 font-mono shrink-0">({count})</span>
              </label>
            );
          })}
        </div>

        {filteredBrands.length > 5 && (
          <button
            type="button"
            onClick={() => setShowMoreBrands(!showMoreBrands)}
            className="text-[10px] sm:text-[11px] font-bold text-[#0071ba] hover:underline flex items-center gap-1 pt-0.5 cursor-pointer"
          >
            {showMoreBrands ? (
              <><span>Thu gọn</span> <ChevronUp className="w-3 h-3" /></>
            ) : (
              <><span>Xem thêm</span> <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        )}
      </div>

    </aside>
  );
};
