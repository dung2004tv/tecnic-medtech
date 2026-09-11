import React, { useState } from 'react';
import { ShoppingCart, Eye, Share2, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

// Helper function to generate SEO-friendly slug
const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Helper: Origin flag (như cờ xuất xứ trên website PhaNa)
const getOriginFlag = (origin?: string) => {
  if (!origin) return null;
  const o = origin.toLowerCase();
  if (o.includes('nhật') || o.includes('japan')) return { flag: '🇯🇵', label: 'Nhật Bản' };
  if (o.includes('đức') || o.includes('germany')) return { flag: '🇩🇪', label: 'Đức' };
  if (o.includes('mỹ') || o.includes('usa') || o.includes('hoa kỳ')) return { flag: '🇺🇸', label: 'Mỹ' };
  if (o.includes('anh') || o.includes('uk') || o.includes('vương quốc anh')) return { flag: '🇬🇧', label: 'Anh' };
  if (o.includes('đài loan') || o.includes('taiwan')) return { flag: '🇹🇼', label: 'Đài Loan' };
  if (o.includes('việt nam') || o.includes('vietnam')) return { flag: '🇻🇳', label: 'Việt Nam' };
  if (o.includes('hàn quốc') || o.includes('korea')) return { flag: '🇰🇷', label: 'Hàn Quốc' };
  if (o.includes('trung quốc') || o.includes('china')) return { flag: '🇨🇳', label: 'Trung Quốc' };
  if (o.includes('thụy sĩ') || o.includes('switzerland')) return { flag: '🇨🇭', label: 'Thụy Sĩ' };
  if (o.includes('pháp') || o.includes('france')) return { flag: '🇫🇷', label: 'Pháp' };
  if (o.includes('ý') || o.includes('italia') || o.includes('italy')) return { flag: '🇮🇹', label: 'Ý' };
  return { flag: '🌐', label: origin };
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onCopyLink?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  onCopyLink
}) => {
  const [copied, setCopied] = useState(false);
  const isOutOfStock = product.stock <= 0;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(product));
    e.dataTransfer.setData('productId', product.id.toString());
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCopyLink) {
      onCopyLink(product);
    } else {
      const origin = window.location.origin;
      const directUrl = `${origin}/${generateSlug(product.name)}.html`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(directUrl);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine unit (Long Châu style: Chiếc, Đôi, Bộ)
  const unit = (product.name.toLowerCase().includes('nạng') && !product.name.toLowerCase().includes('1 chiếc')) ? 'Đôi' : 'Chiếc';
  const brandName = product.specifications?.brand || 'TECNIC';
  const originInfo = getOriginFlag(product.specifications?.origin);

  return (
    <div 
      draggable={!isOutOfStock}
      onDragStart={handleDragStart}
      className={`bg-white border border-slate-200/90 hover:border-[#0077b6]/40 rounded-2xl p-3 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,119,182,0.04)] hover:shadow-[0_8px_24px_rgba(0,119,182,0.12)] hover:-translate-y-1 transition-all duration-200 relative group cursor-pointer ${
        isOutOfStock ? 'opacity-70' : 'cursor-grab active:cursor-grabbing'
      }`}
      onClick={() => onSelectProduct(product)}
    >
      {/* 1. TOP BADGES & SHARE */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="bg-sky-50 text-[#0077b6] border border-sky-200/80 text-[10px] font-bold px-2 py-0.5 rounded-md">
          Chính hãng
        </span>

        <button
          type="button"
          onClick={handleCopyLink}
          title="Chia sẻ sản phẩm"
          className={`p-1.5 rounded-full transition shadow-2xs z-30 ${
            copied
              ? 'bg-[#0077b6] text-white'
              : 'bg-white hover:bg-sky-50 text-slate-400 hover:text-[#0077b6] border border-slate-200'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 2. PRODUCT IMAGE VỚI NÚT XEM CHI TIẾT */}
      <div className="relative py-2 flex items-center justify-center h-36 xs:h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden mb-2 group/img bg-slate-50/70 border border-slate-100">
        <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <ProductImage product={product} size="md" showBadge={false} />
        </div>

        {/* Quick Hover overlay nút xem chi tiết */}
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 p-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold text-xs px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition transform hover:scale-105 cursor-pointer"
            title="Xem chi tiết sản phẩm"
          >
            <Eye className="w-3.5 h-3.5 text-white" />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>

      {/* 3. PRODUCT INFO */}
      <div className="space-y-1 sm:space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* THƯƠNG HIỆU & XUẤT XỨ */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-black text-[#0077b6] uppercase tracking-wide truncate">
              {brandName}
            </span>
            <span className="bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap truncate max-w-[80px] sm:max-w-none">
              {product.specifications?.origin || 'Chính hãng'}
            </span>
          </div>

          {/* TÊN SẢN PHẨM (Hiển thị đầy đủ, font chữ nét rõ, không bị teo nhỏ) */}
          <h4 className="font-bold text-[12px] sm:text-[13px] text-slate-900 group-hover:text-[#0077b6] transition leading-snug line-clamp-2 min-h-[32px] sm:min-h-[38px]">
            {product.name}
          </h4>

          {/* ĐÁNH GIÁ VÀ TRẠNG THÁI CÒN HÀNG */}
          <div className="flex items-center justify-between mt-1 text-xs">
            <span className="flex items-center gap-0.5 text-amber-500 font-bold text-[10px] sm:text-[11px]">
              ★ 4.8
            </span>
            <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded border ${
              isOutOfStock 
                ? 'text-slate-400 bg-slate-50 border-slate-200' 
                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            }`}>
              {isOutOfStock ? 'Hết hàng' : 'Còn hàng'}
            </span>
          </div>
        </div>

        {/* GIÁ TIỀN MÀU ĐỎ TO RÕ & NÚT THÊM VÀO GIỎ */}
        <div className="pt-1.5 sm:pt-2 border-t border-slate-100 mt-1">
          <div className="mb-1.5 sm:mb-2">
            <div className="flex items-baseline gap-1 whitespace-nowrap overflow-hidden">
              <span className="text-[13px] sm:text-base md:text-lg font-black text-red-600 tracking-tight whitespace-nowrap">
                {product.tecnicPrice.toLocaleString('vi-VN')}&nbsp;đ
              </span>
            </div>
            {product.marketPrice > product.tecnicPrice && (
              <span className="text-[10px] sm:text-[11px] text-slate-400 line-through whitespace-nowrap block">
                {product.marketPrice.toLocaleString('vi-VN')}&nbsp;đ
              </span>
            )}
          </div>

          {/* NÚT THÊM VÀO GIỎ */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`w-full py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-[#0077b6] hover:bg-[#023e8a] text-white active:scale-98'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">Thêm vào giỏ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
