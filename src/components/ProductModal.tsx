// Helper function to generate SEO-friendly slug
const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // remove diacritics
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .trim();
};

import React, { useState } from 'react';
import { 
  X, Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, 
  CheckCircle2, Award, Info, Heart, Share2, PhoneCall, Stethoscope, 
  FileText, Copy, Check, MessageCircle, ExternalLink
} from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { ProductImage } from './ProductImage';
import Markdown from 'react-markdown';
import { getRealProductDescription } from '../utils/productDescriptionGenerator';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onCopyLink?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onCopyLink
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'usage' | 'warranty'>('desc');
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleCopy = () => {
    if (onCopyLink) {
      onCopyLink(product);
    } else {
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      const directUrl = `${origin}/${generateSlug(product.name)}.html`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(directUrl);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const productUrl = `${window.location.origin}/${generateSlug(product.name)}.html`;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* MODAL HEADER */}
        <div className="bg-[#143472] text-white px-5 py-3.5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-blue-200 font-medium">{product.categoryName}</span>
            
            {/* Quick Share / Copy direct link button */}
            <button
              onClick={handleCopy}
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 transition shadow-xs ${
                copied 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white/20 hover:bg-white/30 text-amber-300'
              }`}
              title="Sao chép link trực tiếp sản phẩm này để gửi cho khách hàng"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-white" />
                  Đã sao chép link!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Sao chép link gửi khách
                </>
              )}
            </button>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LEFT: PRODUCT IMAGE & TRUST BADGES */}
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-center h-72 sm:h-80 relative overflow-hidden">
                <ProductImage product={product} size="lg" />
              </div>

              {/* Share link banner for Sales/Staff */}
              <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-2.5 flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold text-[#143472] flex items-center gap-1">
                    <Share2 className="w-3 h-3 text-[#0071ba]" />
                    Link xem trực tiếp sản phẩm:
                  </div>
                  <div className="text-[10px] text-slate-500 truncate font-mono mt-0.5">
                    {productUrl}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 bg-[#0071ba] hover:bg-blue-800 text-white rounded-lg text-[11px] font-bold shrink-0 transition flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Đã copy' : 'Copy link'}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-xl flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#0071ba] shrink-0" />
                  <span>Bảo hành <b>{product.specifications.warrantyMonths} tháng</b> chính hãng</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đổi mới trong <b>30 ngày</b></span>
                </div>
              </div>
            </div>

            {/* RIGHT: PRODUCT INFO & PRICING & ACTIONS */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-bold text-[#0071ba]">{product.specifications.brand}</span>
                  <span>•</span>
                  <span>Xuất xứ: <b>{product.specifications.origin}</b></span>
                </div>

                <h2 className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                  {product.name}
                </h2>

                {/* Rating & Stock Status */}
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex items-center text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className={`font-bold ${
                    isOutOfStock ? 'text-red-600' : 'text-emerald-700'
                  }`}>
                    {isOutOfStock ? 'Trạng thái: Hết hàng' : 'Trạng thái: Còn hàng'}
                  </span>
                </div>

                {/* Price Box */}
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-red-600">
                      {product.tecnicPrice.toLocaleString('vi-VN')} đ
                    </span>
                    {product.marketPrice > product.tecnicPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        Giá niêm yết: {product.marketPrice.toLocaleString('vi-VN')} đ
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    Phân phối chính hãng bởi TECNIC MEDTECH
                  </p>
                </div>
              </div>

              {/* QUANTITY & PURCHASE BUTTONS */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                
                {/* ROW 1: SỐ LƯỢNG + THÊM VÀO GIỎ HÀNG */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shrink-0">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold transition disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-black text-xs text-slate-800">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold transition disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    disabled={isOutOfStock}
                    className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs border-2 border-[#0071ba] text-[#0071ba] hover:bg-blue-50 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Thêm vào giỏ hàng
                  </button>
                </div>

                {/* ROW 2: ĐẶT HÀNG TO VỚI CHỮ NHỎ DƯỚI */}
                <button
                  onClick={() => {
                    onBuyNow(product, quantity);
                    onClose();
                  }}
                  disabled={isOutOfStock}
                  className="w-full py-3 px-4 rounded-xl font-black bg-red-600 hover:bg-red-700 text-white transition shadow-md flex flex-col items-center justify-center disabled:opacity-50 cursor-pointer"
                >
                  <span className="text-sm uppercase tracking-wide">ĐẶT HÀNG</span>
                  <span className="text-[10px] font-normal text-red-100">Gọi điện xác nhận và giao hàng tận nơi</span>
                </button>

                {/* Direct Hotline / Zalo Consultant */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:0348402466"
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 transition flex items-center justify-center gap-1.5 text-center"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                    Hotline: 034 84 02466
                  </a>

                  <a
                    href="https://zalo.me/0348402466"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-blue-50 border border-blue-200 text-blue-900 hover:bg-blue-100 transition flex items-center justify-center gap-1.5 text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#0071ba]" />
                    Tư vấn Zalo
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* TABS: THÔNG SỐ KỸ THUẬT & HƯỚNG DẪN */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex border-b border-slate-200 text-xs font-bold gap-4">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-2.5 transition border-b-2 ${
                  activeTab === 'desc' ? 'border-[#0071ba] text-[#0071ba] font-black' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Mô tả chi tiết & Tính năng
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 transition border-b-2 ${
                  activeTab === 'specs' ? 'border-[#0071ba] text-[#0071ba] font-black' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Thông số kỹ thuật đầy đủ
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`pb-2.5 transition border-b-2 whitespace-nowrap ${
                  activeTab === 'usage' ? 'border-[#0071ba] text-[#0071ba] font-black' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Hướng dẫn sử dụng
              </button>
              <button
                onClick={() => setActiveTab('warranty')}
                className={`pb-2.5 transition border-b-2 whitespace-nowrap ${
                  activeTab === 'warranty' ? 'border-[#0071ba] text-[#0071ba] font-black' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Bảo hành sản phẩm
              </button>
            </div>

            <div className="py-4 text-xs text-slate-700 leading-relaxed">
              {activeTab === 'desc' && (
                <div className="markdown-body space-y-3">
                  <Markdown>{getRealProductDescription(product)}</Markdown>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="py-1.5"><th className="w-1/3 py-2 text-slate-500 font-medium">Thương hiệu</th><td className="py-2 font-bold text-slate-800">{product.specifications.brand}</td></tr>
                      <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Xuất xứ</th><td className="py-2 font-bold text-slate-800">{product.specifications.origin}</td></tr>
                      <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Bảo hành chính hãng</th><td className="py-2 font-bold text-slate-800">{product.specifications.warrantyMonths} tháng</td></tr>
                      {product.specifications.model && (
                        <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Model sản phẩm</th><td className="py-2 font-bold text-slate-800">{product.specifications.model}</td></tr>
                      )}
                      {product.specifications.dimensions && (
                        <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Kích thước</th><td className="py-2 font-bold text-slate-800">{product.specifications.dimensions}</td></tr>
                      )}
                      {product.specifications.weight && (
                        <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Trọng lượng/Tải trọng</th><td className="py-2 font-bold text-slate-800">{product.specifications.weight}</td></tr>
                      )}
                      {product.specifications.material && (
                        <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Chất liệu</th><td className="py-2 font-bold text-slate-800">{product.specifications.material}</td></tr>
                      )}
                      {product.specifications.application && (
                        <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Ứng dụng</th><td className="py-2 font-bold text-slate-800">{product.specifications.application}</td></tr>
                      )}
                      {product.specifications.powerSource && (
                        <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Nguồn điện / Pin</th><td className="py-2 font-bold text-slate-800">{product.specifications.powerSource}</td></tr>
                      )}
                      {product.specifications.certifications && (
                        <tr className="py-1.5"><th className="py-2 text-slate-500 font-medium">Chứng chỉ y tế</th><td className="py-2 font-bold text-emerald-700">{product.specifications.certifications.join(' • ')}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">Hướng dẫn sử dụng:</h3>
                  <ul className="list-disc pl-4 space-y-2 text-slate-700">
                    <li>Vui lòng đọc kỹ tài liệu hướng dẫn đi kèm trong hộp sản phẩm trước khi sử dụng.</li>
                    <li>Sử dụng sản phẩm theo đúng hướng dẫn kỹ thuật và chỉ dẫn chuyên môn.</li>
                    <li>Vệ sinh sản phẩm thường xuyên bằng dung dịch sát khuẩn chuyên dụng.</li>
                    <li>Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp hoặc nhiệt độ cao.</li>
                    <li>Liên hệ Hotline hỗ trợ kỹ thuật: <b>034 84 02466</b> nếu gặp bất kỳ khó khăn nào trong quá trình lắp đặt và sử dụng.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'warranty' && (
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#0071ba]" />
                    <h3 className="font-bold text-[#0071ba]">Chính sách Bảo hành Sản phẩm</h3>
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Sản phẩm được bảo hành chính hãng <b>{product.specifications.warrantyMonths} tháng</b> theo quy định của nhà sản xuất.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><b>Đổi trả linh hoạt:</b> Hỗ trợ đổi mới trong vòng 30 ngày nếu phát hiện lỗi từ nhà sản xuất.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span><b>Quy trình bảo hành:</b> Khách hàng có thể mang sản phẩm trực tiếp đến các trung tâm bảo hành ủy quyền hoặc gửi về văn phòng TECNIC.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Sản phẩm bảo hành phải còn nguyên tem mác, số serial (nếu có) và không có dấu hiệu bị va đập, tháo lắp sai quy cách.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
