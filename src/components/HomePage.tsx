import React from 'react';
import { 
  TrendingUp, Sparkles, ChevronRight, BookOpen, 
  Calendar, Clock, ArrowRight, ShieldCheck, Truck, 
  Award, HeadphonesIcon, Layers, CheckCircle2,
  Stethoscope, Activity, Heart, ArrowUpRight
} from 'lucide-react';
import { CATEGORIES } from '../data/productsData';
import { INITIAL_ARTICLES } from '../data/articlesData';
import { Product, CategoryId } from '../types';
import { ProductCard } from './ProductCard';
import { ProductImage } from './ProductImage';

interface HomePageProps {
  bestSellerProducts: Product[];
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onOpenArticles: (articleId?: string) => void;
  onOpenAbout: () => void;
  onViewAllProducts: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  bestSellerProducts,
  allProducts,
  onSelectProduct,
  onAddToCart,
  onSelectCategory,
  onOpenArticles,
  onOpenAbout,
  onViewAllProducts
}) => {
  // 4 bài báo y khoa nổi bật nhất
  const featuredArticles = INITIAL_ARTICLES.slice(0, 4);

  // Lọc chỉ giữ lại những danh mục thực sự có sản phẩm trong hệ thống (bỏ các danh mục 0 sản phẩm)
  const activeCategories = CATEGORIES.filter(c => {
    if (c.id === 'ALL') return false;
    return allProducts.some(p => p.category === c.id);
  });

  return (
    <div className="space-y-8 sm:space-y-12">
      
      {/* 1. KHỐI SẢN PHẨM BÁN CHẠY */}
      <section 
        aria-label="Sản phẩm bán chạy & tiêu biểu"
        className="bg-white rounded-3xl p-4 sm:p-6 text-slate-800 shadow-sm relative overflow-hidden border border-slate-200/90"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-black shadow-xs shrink-0 border border-sky-100/80">
              <TrendingUp className="w-5 h-5 text-[#0077b6] stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">
                  SẢN PHẨM BÁN CHẠY
                </h2>
                <span className="hidden xs:inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-2xs">
                  <Sparkles className="w-3 h-3" /> HOT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Các dòng thiết bị y tế & phục hồi chức năng được bệnh viện và gia đình tin dùng nhất
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewAllProducts}
            className="self-start sm:self-auto bg-sky-50/80 hover:bg-[#0077b6] text-[#0077b6] hover:text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-sky-200/80 hover:border-[#0077b6] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 shadow-2xs"
          >
            <span>Xem tất cả sản phẩm</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-4">
          {bestSellerProducts.slice(0, 4).map((prod) => (
            <div 
              key={prod.id} 
              onClick={() => onSelectProduct(prod)}
              className="bg-white text-slate-800 rounded-2xl p-2.5 sm:p-3.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,119,182,0.04)] hover:shadow-[0_8px_24px_rgba(0,119,182,0.12)] hover:border-sky-300/80 transition-all duration-200 cursor-pointer group relative border border-slate-200/90 transform hover:-translate-y-1"
            >
              {/* Image box */}
              <div className="relative flex items-center justify-center h-32 sm:h-40 rounded-xl overflow-hidden mb-2.5 bg-slate-50/70 border border-slate-100">
                <ProductImage product={prod} size="sm" showBadge={false} />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {prod.specifications?.origin && (
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[9px] font-bold shadow-2xs">
                      {prod.specifications.origin}
                    </span>
                  )}
                  {prod.discountPercent > 0 && (
                    <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[9px] font-black shadow-2xs">
                      -{prod.discountPercent}%
                    </span>
                  )}
                </div>

                <span className="absolute bottom-1.5 right-1.5 bg-emerald-600/90 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[9px] font-bold shadow-2xs flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> Bán chạy
                </span>
              </div>
              
              {/* Product Info */}
              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-400 font-mono">
                  Mã: <span className="text-slate-600 font-semibold">{prod.code}</span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 min-h-[34px] sm:min-h-[40px] leading-snug group-hover:text-[#0077b6] transition-colors">
                  {prod.name}
                </h3>
                
                {/* Price */}
                <div className="pt-1 border-t border-slate-100 flex items-baseline justify-between gap-1 overflow-hidden">
                  <div className="whitespace-nowrap">
                    <span className="font-black text-xs xs:text-sm sm:text-base text-red-600 block tracking-tight whitespace-nowrap">
                      {prod.tecnicPrice.toLocaleString('vi-VN')}&nbsp;đ
                    </span>
                    {prod.marketPrice > prod.tecnicPrice && (
                      <span className="text-[10px] text-slate-400 line-through whitespace-nowrap block">
                        {prod.marketPrice.toLocaleString('vi-VN')}&nbsp;đ
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                    ★ 5.0
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(prod);
                  }}
                  className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-center cursor-pointer"
                >
                  Chi tiết
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(prod);
                  }}
                  className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold text-white bg-[#0077b6] hover:bg-[#023e8a] transition text-center shadow-xs cursor-pointer active:scale-95"
                >
                  Chọn mua
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. KHỐI KHÁM PHÁ DANH MỤC THIẾT BỊ Y TẾ */}
      <section aria-label="Danh mục thiết bị y tế" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-[#0077b6] rounded-full"></span>
            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight uppercase">
                DANH MỤC THIẾT BỊ Y TẾ & PHỤC HỒI CHỨC NĂNG
              </h2>
              <p className="text-xs text-slate-500">
                Nhấn vào danh mục để mở toàn bộ sản phẩm cùng bộ lọc chuyên sâu
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewAllProducts}
            className="text-xs font-bold text-[#0077b6] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Xem tất cả danh mục</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {activeCategories.map((cat) => {
            const count = allProducts.filter(p => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white hover:bg-sky-50/60 p-3 sm:p-4 rounded-2xl border border-slate-200 hover:border-[#0077b6] shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white flex items-center justify-center font-bold text-lg mb-2.5 transition-colors">
                    {cat.icon === 'Heart' && <Heart className="w-5 h-5" />}
                    {cat.icon === 'Activity' && <Activity className="w-5 h-5" />}
                    {cat.icon === 'Stethoscope' && <Stethoscope className="w-5 h-5" />}
                    {!['Heart', 'Activity', 'Stethoscope'].includes(cat.icon || '') && <Layers className="w-5 h-5" />}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0077b6] line-clamp-2 leading-snug">
                    {cat.name}
                  </h3>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{count} sản phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0077b6] group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. TỪNG KHỐI SẢN PHẨM TIÊU BIỂU THEO DANH MỤC */}
      <div className="space-y-8">
        {activeCategories.slice(0, 3).map((category) => {
          const catProducts = allProducts.filter(p => p.category === category.id);
          if (catProducts.length === 0) return null;

          return (
            <section 
              key={category.id} 
              className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4"
            >
              {/* Header khối */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-6 bg-[#0077b6] rounded-full"></span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {category.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCategory(category.id)}
                  className="bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold text-xs px-3.5 sm:px-4 py-1.5 rounded-full transition shadow-xs flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  <span>Xem tất cả ({catProducts.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Lưới sản phẩm */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
                {catProducts.slice(0, 4).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={(p) => onAddToCart(p)}
                    onSelectProduct={(p) => onSelectProduct(p)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. KHỐI BÀI BÁO & CẨM NANG Y KHOA */}
      <section 
        aria-label="Tin tức & Cẩm nang y khoa"
        className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                TIN TỨC & CẨM NANG Y KHOA PHỤC HỒI
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Kiến thức chuyên môn phục hồi chức năng, cẩm nang tập luyện và hướng dẫn chăm sóc người bệnh
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenArticles()}
            className="self-start sm:self-auto bg-[#023e8a] hover:bg-[#03045e] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-full transition flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 shadow-xs"
          >
            <span>Xem tất cả bài viết</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lưới 4 bài viết y khoa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featuredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => onOpenArticles(art.id)}
              className="bg-slate-50/70 hover:bg-sky-50/50 rounded-2xl p-3 border border-slate-200/80 hover:border-[#0077b6] transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-md"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-200">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-[#0077b6] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {art.categoryName || 'Y khoa'}
                  </span>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {art.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 group-hover:text-[#0077b6] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              {/* Read button */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#0077b6]">
                <span>Đọc bài viết</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
