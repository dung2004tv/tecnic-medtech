import React from 'react';
import { 
  ChevronRight, RotateCcw
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categoriesData';

interface MetaCategoryHeaderProps {
  activeCategory: CategoryId;
  onSelectCategory: (catId: CategoryId) => void;
  searchKeyword: string;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  selectedSort: 'featured' | 'sold' | 'price-asc' | 'price-desc' | 'discount';
  onSelectSort: (sort: 'featured' | 'sold' | 'price-asc' | 'price-desc' | 'discount') => void;
  totalProductsCount: number;
  allBrands: string[];
  selectedOrigin?: string;
  onSelectOrigin?: (origin: string) => void;
  selectedFeature?: string;
  onSelectFeature?: (feature: string) => void;
  priceRange?: [number, number];
  onResetAll?: () => void;
}

export const MetaCategoryHeader: React.FC<MetaCategoryHeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchKeyword,
  selectedBrand,
  onSelectBrand,
  selectedTag,
  onSelectTag,
  selectedSort,
  onSelectSort,
  totalProductsCount,
  allBrands = [],
  selectedOrigin = 'ALL',
  selectedFeature = 'ALL',
  priceRange = [0, 500000000],
  onResetAll
}) => {
  const currentCatObj = CATEGORIES.find(c => c.id === activeCategory);

  const hasActiveFilters = 
    activeCategory !== 'ALL' || 
    searchKeyword !== '' || 
    selectedBrand !== 'ALL' || 
    selectedTag !== 'ALL' || 
    selectedOrigin !== 'ALL' || 
    selectedFeature !== 'ALL' || 
    priceRange[0] > 0 || 
    priceRange[1] < 500000000;

  return (
    <div className="space-y-3 animate-fadeIn">
      
      {/* BREADCRUMBS & COMPACT TITLE */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-white px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-1.5 text-slate-500 overflow-x-auto">
          <button 
            onClick={() => onSelectCategory('ALL')} 
            className="text-[#0071ba] hover:underline font-bold whitespace-nowrap"
          >
            Trang chủ
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <button 
            onClick={() => onSelectCategory('ALL')} 
            className="hover:underline text-slate-600 whitespace-nowrap"
          >
            Thiết Bị Y Tế
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-slate-900 font-bold whitespace-nowrap">
            {searchKeyword ? `Tìm kiếm: "${searchKeyword}"` : (currentCatObj?.name || 'Tất cả thiết bị')}
          </span>
        </div>

        {hasActiveFilters && onResetAll && (
          <button
            onClick={onResetAll}
            className="text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 flex items-center gap-1 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* BRAND QUICK FILTER BAR */}
      {allBrands && allBrands.length > 0 && (
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 tracking-wide uppercase">Lọc theo thương hiệu:</span>
            {selectedBrand !== 'ALL' && (
              <span className="text-xs font-semibold text-[#0071ba]">
                Đang xem: <b>{selectedBrand}</b>
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => onSelectBrand('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedBrand === 'ALL'
                  ? 'bg-[#0071ba] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả
            </button>
            {allBrands.map(b => (
              <button
                key={b}
                onClick={() => onSelectBrand(selectedBrand === b ? 'ALL' : b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                  selectedBrand === b
                    ? 'bg-[#0071ba] text-white shadow-xs ring-2 ring-[#0071ba]/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#0071ba]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

