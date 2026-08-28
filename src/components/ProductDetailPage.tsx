import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Phone, Share2, Check
} from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import Markdown from 'react-markdown';
import { getRealProductDescription } from '../utils/productDescriptionGenerator';

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

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  allProducts
}) => {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
  }, [product.id]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < (product.stock || 99)) setQuantity(quantity + 1);
  };

  const handleCopyLink = () => {
    try {
      const origin = window.location.origin;
      const directUrl = `${origin}/${generateSlug(product.name)}.html`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(directUrl);
      }
    } catch (e) {
      console.warn(e);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOutOfStock = product.stock <= 0;

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const fullContentMarkdown = getRealProductDescription(product);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* 1. BREADCRUMB & BACK BUTTON */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-slate-500 overflow-hidden">
          <button 
            onClick={onBack}
            className="font-bold text-[#0071ba] hover:underline flex items-center gap-1 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 truncate">{product.categoryName}</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-800 truncate max-w-[200px] sm:max-w-md">{product.name}</span>
        </div>

        <button
          onClick={handleCopyLink}
          className={`text-xs font-bold px-3 py-1 rounded flex items-center gap-1.5 transition shadow-2xs ${
            copied ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-blue-50 text-[#0071ba] border border-slate-200'
          }`}
          title="Sao chép liên kết sản phẩm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              Đã sao chép link!
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              Chia sẻ sản phẩm
            </>
          )}
        </button>
      </div>

      {/* 2. PRIMARY PRODUCT DISPLAY CARD */}
      <div className="bg-white rounded-xl p-5 sm:p-7 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: GALLERY & MAIN PRODUCT IMAGE (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-center min-h-[320px] sm:min-h-[360px] relative overflow-hidden">
              <ProductImage product={product} size="lg" />
            </div>
          </div>

          {/* RIGHT: DETAILS, PRICING & ACTION BUTTONS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5">
            
            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-[#333333] leading-snug">
              {product.name}
            </h1>

            {/* Rating & Views */}
            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
              <span>{product.reviewCount || 0} Đánh giá</span>
              <span>Lượt xem: {product.soldCount * 3 + 17}</span>
            </div>

            {/* Price Box */}
            <div className="flex items-end gap-3 flex-wrap pt-1">
              <span className="text-2xl sm:text-[26px] font-bold text-[#e31837]">
                {product.tecnicPrice.toLocaleString('vi-VN')}₫
              </span>
              {product.marketPrice > product.tecnicPrice && (
                <span className="text-sm text-slate-400 line-through mb-1">
                  Giá niêm yết: {product.marketPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>

            {/* Product Info List (Công dụng, Xuất xứ, Mô tả ngắn, Màu sắc) */}
            <div className="space-y-3 text-[14px] sm:text-[15px] text-[#333333] pt-1">
              {product.specifications.application && (
                <p className="leading-relaxed">
                  <strong>Công dụng:</strong> {product.specifications.application}
                </p>
              )}
              
              <p className="leading-relaxed">
                <strong>Xuất xứ thương hiệu:</strong> Thương hiệu <strong>{product.specifications.brand}</strong> – {product.specifications.origin}. Sản phẩm được thiết kế và sản xuất 100% tại {product.specifications.origin}.
              </p>

              <div className="space-y-1.5">
                <p className="font-bold">Mô tả ngắn về sản phẩm:</p>
                {product.specifications.features && product.specifications.features.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1.5 text-[#333333]">
                    {product.specifications.features.map((feat, idx) => (
                      <li key={idx} className="leading-relaxed">{feat}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="leading-relaxed">{product.shortDescription}</p>
                )}
              </div>

              <p className="leading-relaxed">
                <strong>Màu sắc:</strong> {product.specifications.color || 'Đen'}.
              </p>
            </div>

            {/* ACTION SECTION (Compact, Sharp, Standard Proportion) */}
            <div className="space-y-2.5 pt-3">
              
              {/* Row 1: Số lượng & Thêm vào giỏ hàng */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#333333] text-[14px]">Số lượng:</span>
                  <div className="flex items-center border border-[#d1d5db] rounded-[3px] overflow-hidden bg-white h-[38px]">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="w-9 h-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition disabled:opacity-40 border-r border-[#d1d5db] font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-[#333333] text-sm">{quantity}</span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="w-9 h-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition disabled:opacity-40 border-l border-[#d1d5db] font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={isOutOfStock}
                  className="flex-1 min-w-[190px] h-[38px] px-4 rounded-[3px] bg-[#e31837] hover:bg-red-700 text-white font-bold text-[13px] sm:text-sm transition uppercase shadow-2xs flex items-center justify-center"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

              {/* Row 2: ĐẶT HÀNG */}
              <button
                type="button"
                onClick={() => onBuyNow(product, quantity)}
                disabled={isOutOfStock}
                className="w-full py-2 px-4 rounded-[3px] bg-[#032f6a] hover:bg-[#021f4a] text-white transition shadow-2xs flex flex-col items-center justify-center active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                <span className="text-[16px] font-bold uppercase tracking-wide">Đặt hàng</span>
                <span className="text-[11px] font-normal text-blue-100">
                  Gọi điện xác nhận và giao hàng tận nơi
                </span>
              </button>
              
              {/* Row 3: HOTLINE */}
              <a
                href="tel:0389880369"
                className="w-full py-2 px-4 rounded-[3px] bg-[#e31837] hover:bg-red-700 text-white transition shadow-2xs flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span className="text-[16px] font-bold uppercase tracking-wide">Hotline: 038 988 0369</span>
              </a>

            </div>

          </div>

        </div>
      </div>

      {/* 2-Column Layout (Mô tả & Sản phẩm liên quan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        
        {/* Left: Product Description */}
        <div className="lg:col-span-8 space-y-5 bg-white p-5 sm:p-7 rounded-xl border border-slate-200">
          <div>
            <h2 className="text-[20px] font-bold uppercase text-[#333333] pb-1.5 inline-block border-b-2 border-[#e31837] mb-4">
              Mô tả sản phẩm
            </h2>
          </div>
          
          <div className="text-[15px] text-[#333333] leading-[1.8] markdown-body space-y-4">
            <Markdown>{fullContentMarkdown}</Markdown>
          </div>
        </div>

        {/* Right: Related Products */}
        <div className="lg:col-span-4 space-y-0">
          <h2 className="text-[14px] font-bold uppercase text-white bg-[#032f6a] py-2.5 px-4 rounded-t-[4px] m-0 tracking-wide">
            SẢN PHẨM LIÊN QUAN
          </h2>
          <div className="border border-t-0 border-[#e5e5e5] rounded-b-[4px] bg-white overflow-hidden divide-y divide-[#e5e5e5]">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(rp => (
                <div 
                  key={rp.id} 
                  className="flex gap-3.5 items-center group cursor-pointer hover:bg-slate-50 p-3 transition"
                  onClick={() => onSelectProduct(rp)}
                >
                  <div className="w-16 h-16 bg-white shrink-0 flex items-center justify-center border border-slate-100 rounded">
                    <img src={rp.image} alt={rp.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium text-[#333333] group-hover:text-[#0071ba] transition line-clamp-2 leading-snug">
                      {rp.name}
                    </h3>
                    <div className="text-[#e31837] font-bold text-sm mt-1">
                      {rp.tecnicPrice.toLocaleString('vi-VN')} ₫
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-xs text-slate-500 text-center">Đang cập nhật sản phẩm liên quan...</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
