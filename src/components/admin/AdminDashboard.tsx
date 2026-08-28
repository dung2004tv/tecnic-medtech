import React from 'react';
import { Minus, X, Newspaper, ShoppingCart, ChevronRight, Package, FileText, PhoneCall } from 'lucide-react';
import { Product, Article } from '../../types';

interface AdminDashboardProps {
  products: Product[];
  articles: Article[];
  contactCount?: number;
  onNavigate: (menuKey: any) => void;
  onSelectProduct?: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  articles,
  contactCount = 0,
  onNavigate,
  onSelectProduct
}) => {
  const latestArticles = articles.slice(0, 8);
  const latestProducts = products.slice(0, 8);

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Bảng điều khiển</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Bảng điều khiển</span>
        </div>
      </div>

      {/* Box: Thống kê chung */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-[#17a2b8] text-white px-4 py-2.5 flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide">Thống kê chung</h2>
          <div className="flex items-center gap-2 text-white/80">
            <button className="hover:text-white transition" title="Thu nhỏ">
              <Minus className="w-4 h-4" />
            </button>
            <button className="hover:text-white transition" title="Đóng">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Widget 1: Tổng số sản phẩm (Vàng / Cam) */}
          <div 
            onClick={() => onNavigate('PRODUCTS')}
            className="bg-[#f39c12] text-white rounded-md p-4 flex items-center justify-between shadow-xs hover:opacity-95 transition cursor-pointer"
          >
            <div className="space-y-1">
              <p className="text-xs uppercase font-medium tracking-wider text-white/90">Tổng số sản phẩm</p>
              <h3 className="text-2xl sm:text-3xl font-black">{products.length || 114}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-black/10 flex items-center justify-center text-white/90">
              <Package className="w-7 h-7" />
            </div>
          </div>

          {/* Widget 2: Tổng số bài viết (Đỏ) */}
          <div 
            onClick={() => onNavigate('ARTICLES')}
            className="bg-[#dd4b39] text-white rounded-md p-4 flex items-center justify-between shadow-xs hover:opacity-95 transition cursor-pointer"
          >
            <div className="space-y-1">
              <p className="text-xs uppercase font-medium tracking-wider text-white/90">Tổng số bài viết</p>
              <h3 className="text-2xl sm:text-3xl font-black">{articles.length || 207}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-black/10 flex items-center justify-center text-white/90">
              <FileText className="w-7 h-7" />
            </div>
          </div>

          {/* Widget 3: Thông tin liên hệ (Xanh ngọc / Teal) */}
          <div 
            onClick={() => onNavigate('CONTACTS')}
            className="bg-[#00c0ef] text-white rounded-md p-4 flex items-center justify-between shadow-xs hover:opacity-95 transition cursor-pointer"
          >
            <div className="space-y-1">
              <p className="text-xs uppercase font-medium tracking-wider text-white/90">Thông tin liên hệ</p>
              <h3 className="text-2xl sm:text-3xl font-black">{contactCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-black/10 flex items-center justify-center text-white/90">
              <PhoneCall className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Hai cột danh sách mới nhất */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Cột trái: Bài viết mới nhất */}
        <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-[#2d3b48] text-white px-4 py-2.5 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold tracking-wide">Bài viết mới nhất</h3>
            <button 
              onClick={() => onNavigate('ARTICLES')}
              className="text-[11px] text-blue-300 hover:text-white font-medium"
            >
              Xem tất cả &raquo;
            </button>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {latestArticles.map((art, idx) => (
              <div 
                key={art.id || idx}
                onClick={() => onNavigate('ARTICLES')}
                className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="text-blue-500 font-bold">▸</span>
                  <span className="text-slate-700 font-medium group-hover:text-blue-600 truncate">
                    {art.title}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {art.publishedAt || 'Hôm nay'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: Sản phẩm mới nhất */}
        <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-[#2d3b48] text-white px-4 py-2.5 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold tracking-wide">Sản phẩm mới nhất</h3>
            <button 
              onClick={() => onNavigate('PRODUCTS')}
              className="text-[11px] text-blue-300 hover:text-white font-medium"
            >
              Xem tất cả &raquo;
            </button>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {latestProducts.map((p, idx) => (
              <div 
                key={p.id || idx}
                onClick={() => onNavigate('PRODUCTS')}
                className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="text-blue-500 font-bold">▸</span>
                  <span className="text-slate-700 font-medium group-hover:text-blue-600 truncate">
                    {p.name}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-red-600 shrink-0">
                  {p.tecnicPrice ? `${(p.tecnicPrice).toLocaleString('vi-VN')} đ` : 'Liên hệ'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
