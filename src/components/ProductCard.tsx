import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, ShieldCheck, CheckCircle2, AlertCircle, Share2, Check, Copy } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

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
      const pathname = window.location.pathname;
      const directUrl = `${origin}${pathname}?p=${encodeURIComponent(product.code)}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(directUrl);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      draggable={!isOutOfStock}
      onDragStart={handleDragStart}
      className={`bg-white border border-slate-200 rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all duration-200 relative group cursor-pointer ${
        isOutOfStock ? 'opacity-70' : 'cursor-grab active:cursor-grabbing'
      }`}
      onClick={() => onSelectProduct(product)}
    >
      {/* 1. TOP BADGES & SHARE BUTTON */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-10">
        <div className="flex items-center gap-1">
          {product.isBestSeller ? (
            <span className="bg-amber-400 text-blue-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase">
              Bán chạy
            </span>
          ) : null}

          <span className="bg-emerald-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
            Chính hãng
          </span>
        </div>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          title="Sao chép liên kết sản phẩm gửi khách"
          className={`p-1.5 rounded-full transition shadow-xs z-30 ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-white/90 hover:bg-blue-50 text-slate-500 hover:text-[#0071ba] border border-slate-200'
          }`}
        >
          {copied ? <Check className="w-3 h-3 text-white" /> : <Share2 className="w-3 h-3" />}
        </button>
      </div>

      {/* 2. PRODUCT IMAGE */}
      <div className="relative pt-6 pb-2 flex items-center justify-center h-48 rounded-xl overflow-hidden mb-2.5">
        <ProductImage product={product} size="md" />

        {/* Quick View overlay button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className="absolute inset-0 bg-blue-950/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <span className="bg-white text-[#143472] font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-amber-400 transition">
            <Eye className="w-3.5 h-3.5" />
            Xem chi tiết
          </span>
        </button>
      </div>

      {/* 3. PRODUCT INFO */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category pill */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-bold text-[#0071ba]">{product.specifications.brand}</span>
            <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">{product.specifications.origin}</span>
          </div>

          {/* Product Name */}
          <h4 className="font-black text-sm sm:text-base text-slate-900 line-clamp-2 min-h-[42px] group-hover:text-[#0071ba] transition leading-snug">
            {product.name}
          </h4>
        </div>

        {/* Rating & Sold count */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <div className="flex items-center text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
            <span>{product.rating}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 text-xs">Đã bán {product.soldCount}</span>
        </div>

        {/* PRICE SECTION (Chỉ hiện giá bán chuẩn, không cần giảm giá) */}
        <div className="pt-2.5 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg font-black text-red-600">
              {product.tecnicPrice.toLocaleString('vi-VN')} đ
            </span>

            {/* Stock status indicator */}
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Sẵn hàng
            </span>
          </div>

          {/* ACTION BUTTON */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`w-full mt-2.5 py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-sm ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#0071ba] hover:bg-blue-800 text-white active:scale-95'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
          </button>
        </div>
      </div>
    </div>
  );
};
