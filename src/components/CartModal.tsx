import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQty: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onProceedCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout
}) => {
  if (!isOpen) return null;

  let totalMarketPrice = 0;
  let totalTecnicPrice = 0;

  items.forEach(item => {
    totalMarketPrice += item.product.marketPrice * item.quantity;
    totalTecnicPrice += item.product.tecnicPrice * item.quantity;
  });

  const totalSaved = totalMarketPrice - totalTecnicPrice;
  const isFreeShipping = totalTecnicPrice >= 1000000;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : 30000);
  const finalTotal = totalTecnicPrice + shippingFee;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="bg-[#143472] text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-base uppercase">Giỏ Hàng TECNIC MEDICAL</h3>
            <span className="bg-blue-900 text-blue-200 text-xs px-2 py-0.5 rounded-full font-bold">
              {items.reduce((a, b) => a + b.quantity, 0)} sản phẩm
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CART CONTENT */}
        {items.length === 0 ? (
          <div className="p-10 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-blue-50 text-[#0071ba] rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-800 text-base">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Hãy lựa chọn các thiết bị y tế & PHCN từ danh mục sản phẩm chính hãng TECNIC MEDTECH.</p>
            </div>
            <button
              onClick={onClose}
              className="bg-[#0071ba] hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-full transition shadow"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            
            {/* Free shipping banner */}
            <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
              isFreeShipping ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}>
              <Truck className="w-4 h-4 shrink-0" />
              {isFreeShipping ? (
                <span>🎉 <b>Tuyệt vời!</b> Đơn hàng của bạn đủ điều kiện <b>Miễn Phí Vận Chuyển Toàn Quốc</b>.</span>
              ) : (
                <span>Mua thêm <b>{(1000000 - totalTecnicPrice).toLocaleString('vi-VN')} đ</b> để được <b>Miễn Phí Vận Chuyển</b>.</span>
              )}
            </div>

            {/* Items list */}
            <div className="divide-y divide-slate-100">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                      <ProductImage product={product} size="sm" showBadge={false} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{product.name}</h4>
                      <p className="text-[11px] text-slate-500">{product.specifications.brand} • Bảo hành {product.specifications.warrantyMonths}T</p>
                      
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-black text-xs text-red-600">
                          {product.tecnicPrice.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          {product.marketPrice.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-slate-800">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition disabled:opacity-40"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right w-24">
                      <span className="font-black text-xs text-slate-900 block">
                        {(product.tecnicPrice * quantity).toLocaleString('vi-VN')} đ
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition"
                      title="Xóa khỏi giỏ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Price Breakdown Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Tổng giá thị trường:</span>
                <span className="line-through">{totalMarketPrice.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Tiết kiệm tại TECNIC:</span>
                <span>-{totalSaved.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển:</span>
                <span>{shippingFee === 0 ? <b className="text-emerald-600">Miễn phí</b> : `${shippingFee.toLocaleString('vi-VN')} đ`}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t text-slate-900 font-black text-sm">
                <span>Tổng thanh toán (Đã VAT):</span>
                <span className="text-lg text-red-600">{finalTotal.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

          </div>
        )}

        {/* FOOTER ACTIONS */}
        {items.length > 0 && (
          <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex justify-between items-center shrink-0">
            <button
              onClick={onClearCart}
              className="text-xs text-slate-500 hover:text-red-600 underline font-medium"
            >
              Xóa tất cả
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition"
              >
                Mua thêm
              </button>
              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition shadow-md flex items-center gap-2"
              >
                TIẾN HÀNH ĐẶT HÀNG
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
