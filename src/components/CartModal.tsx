import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, 
  Truck, Tag, ChevronRight, CheckCircle2, AlertCircle, Heart
} from 'lucide-react';
import { CartItem, Doctor } from '../types';
import { ProductImage } from './ProductImage';
import { INITIAL_DOCTORS, matchDoctor } from '../data/doctorsData';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQty: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onProceedCheckout: (appliedDoctor?: Doctor | null) => void;
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
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [appliedDoctor, setAppliedDoctor] = useState<Doctor | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);

  if (!isOpen) return null;

  let totalMarketPrice = 0;
  let totalTecnicPrice = 0;

  items.forEach(item => {
    totalMarketPrice += item.product.marketPrice * item.quantity;
    totalTecnicPrice += item.product.tecnicPrice * item.quantity;
  });

  const totalSavedOriginal = totalMarketPrice - totalTecnicPrice;
  const hasBulkyItems = items.some(item => item.product.isBulky);
  const shippingFee = hasBulkyItems ? 150000 : 0;
  
  // Áp dụng mã giảm giá hoặc mã/tên bác sĩ giới thiệu
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = couponCode.trim();
    if (!rawInput) return;
    const code = rawInput.toUpperCase();

    // 1. Kiểm tra các mã voucher cố định
    if (code === 'TECNIC50K' || code === 'MEDTECH50K') {
      setAppliedCoupon(code);
      setAppliedDoctor(null);
      setCouponDiscount(50000);
      setCouponError('');
      return;
    } else if (code === 'TECNIC100K' && totalTecnicPrice >= 2000000) {
      setAppliedCoupon(code);
      setAppliedDoctor(null);
      setCouponDiscount(100000);
      setCouponError('');
      return;
    } else if (code === 'FREESHIP') {
      setAppliedCoupon(code);
      setAppliedDoctor(null);
      setCouponDiscount(hasBulkyItems ? 150000 : 30000);
      setCouponError('');
      return;
    }

    // 2. Kiểm tra mã bác sĩ hoặc tên bác sĩ (Hỗ trợ "BS-DUC", "BS. TRẦN MINH ĐỨC BS-DUC", v.v.)
    setIsCheckingCoupon(true);
    setCouponError('');

    try {
      const res = await fetch(`/api/doctors/verify?query=${encodeURIComponent(rawInput)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const doc: Doctor = json.data;
          const discount = doc.discountType === 'PERCENT'
            ? Math.round((totalTecnicPrice * (doc.discountValue || 5)) / 100)
            : Math.min(totalTecnicPrice, doc.discountValue || 50000);
          setAppliedDoctor(doc);
          setAppliedCoupon(`${doc.name} (${doc.code || 'BS'})`);
          setCouponDiscount(discount);
          setCouponError('');
          setIsCheckingCoupon(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Coupon check doctor api error:", err);
    }

    // Fallback đối soát danh sách bác sĩ phía client
    let localDocs: Doctor[] = INITIAL_DOCTORS;
    try {
      const saved = localStorage.getItem('tecnic_doctors');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localDocs = parsed;
        }
      }
    } catch (e) {}

    const matched = matchDoctor(rawInput, localDocs);
    if (matched) {
      const discount = matched.discountType === 'PERCENT'
        ? Math.round((totalTecnicPrice * (matched.discountValue || 5)) / 100)
        : Math.min(totalTecnicPrice, matched.discountValue || 50000);
      setAppliedDoctor(matched);
      setAppliedCoupon(`${matched.name} (${matched.code || 'BS'})`);
      setCouponDiscount(discount);
      setCouponError('');
    } else {
      setCouponError('Mã ưu đãi hoặc mã bác sĩ không hợp lệ.');
    }
    setIsCheckingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setAppliedDoctor(null);
    setCouponDiscount(0);
    setCouponCode('');
    setCouponError('');
  };

  const finalTotal = Math.max(0, totalTecnicPrice - couponDiscount + shippingFee);
  const totalSaved = totalSavedOriginal + couponDiscount;
  const totalItemsCount = items.reduce((a, b) => a + b.quantity, 0);

  // Mức miễn phí vận chuyển giống Long Châu (đạt mốc 300.000đ freeship)
  const freeShipThreshold = 300000;
  const percentToFreeShip = Math.min(100, Math.round((totalTecnicPrice / freeShipThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER PHONG CÁCH NHÀ THUỐC LONG CHÂU - XANH Y TẾ ĐẶC TRƯNG */}
        <div className="bg-gradient-to-r from-[#0052cc] via-[#0066d6] to-[#007bf8] text-white px-5 sm:px-6 py-3.5 flex justify-between items-center shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg tracking-tight">Giỏ hàng của bạn</h3>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {totalItemsCount} sản phẩm
                </span>
              </div>
              <p className="text-[11px] text-blue-100 hidden sm:block">Thiết bị y tế chính hãng • Đổi trả 30 ngày • Miễn phí giao hàng</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
            title="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TIẾN TRÌNH MIỄN PHÍ VẬN CHUYỂN CHUẨN LONG CHÂU */}
        {items.length > 0 && !hasBulkyItems && (
          <div className="bg-blue-50/70 border-b border-blue-100 px-5 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-blue-900 font-medium">
              <Truck className="w-4 h-4 text-[#0066d6] shrink-0" />
              <span>
                {totalTecnicPrice >= freeShipThreshold ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Bạn đủ điều kiện được Miễn Phí Vận Chuyển toàn quốc!
                  </span>
                ) : (
                  <span>
                    Mua thêm <b>{(freeShipThreshold - totalTecnicPrice).toLocaleString('vi-VN')} đ</b> để được Miễn Phí Vận Chuyển
                  </span>
                )}
              </span>
            </div>
            <div className="hidden sm:block w-32 bg-blue-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#0066d6] h-full rounded-full transition-all duration-500"
                style={{ width: `${percentToFreeShip}%` }}
              />
            </div>
          </div>
        )}

        {/* NỘI DUNG GIỎ HÀNG */}
        {items.length === 0 ? (
          <div className="p-10 text-center space-y-4 my-auto">
            <div className="w-20 h-20 bg-blue-50 text-[#0066d6] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-800 text-lg">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hãy chọn các sản phẩm thiết bị y tế, phục hồi chức năng và chăm sóc sức khỏe chính hãng từ TECNIC MEDTECH.
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-[#0066d6] hover:bg-[#0052cc] text-white font-bold text-sm px-6 py-2.5 rounded-full transition shadow-md cursor-pointer"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* THÔNG BÁO HÀNG CỒNG KỀNH NẾU CÓ */}
            {hasBulkyItems && (
              <div className="p-3 rounded-xl text-xs flex items-center gap-2 border bg-amber-50 text-amber-900 border-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  Đơn hàng có sản phẩm cồng kềnh (giường y tế/máy tạo oxy). Phụ phí vận chuyển & kỹ thuật lắp đặt: <b>+150.000 đ</b>.
                </span>
              </div>
            )}

            {/* DANH SÁCH SẢN PHẨM PHONG CÁCH LONG CHÂU */}
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="p-3.5 sm:p-4 flex gap-3 sm:gap-4 items-start sm:items-center hover:bg-slate-50/60 transition">
                  {/* Ảnh sản phẩm */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white p-1">
                    <ProductImage product={product} size="sm" showBadge={false} />
                  </div>

                  {/* Thông tin chi tiết */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-[#0066d6] bg-blue-50 px-2 py-0.5 rounded-sm inline-block mb-1">
                          {product.specifications?.brand || 'TECNIC CHÍNH HÃNG'}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                          {product.name}
                        </h4>
                      </div>

                      {/* Nút xóa item trên mobile */}
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition sm:hidden"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Quy cách: Hộp/Chiếc • Bảo hành {product.specifications?.warrantyMonths || 12} tháng
                    </p>

                    {/* Hàng giá + tăng giảm số lượng */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-sm sm:text-base text-red-600 whitespace-nowrap">
                          {product.tecnicPrice.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-xs text-slate-400 line-through whitespace-nowrap">
                          {product.marketPrice.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded">
                          Tiết kiệm {(product.marketPrice - product.tecnicPrice).toLocaleString('vi-VN')} đ
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Cụm tăng giảm số lượng chuẩn Long Châu */}
                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition active:scale-95 cursor-pointer"
                            aria-label="Giảm số lượng"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-9 text-center text-xs font-bold text-slate-800 select-none">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            disabled={quantity >= product.stock}
                            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition active:scale-95 disabled:opacity-30 cursor-pointer"
                            aria-label="Tăng số lượng"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Tổng tiền của item */}
                        <span className="font-bold text-xs sm:text-sm text-slate-900 w-24 text-right hidden sm:block">
                          {(product.tecnicPrice * quantity).toLocaleString('vi-VN')} đ
                        </span>

                        {/* Nút xóa desktop */}
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition hidden sm:block cursor-pointer"
                          title="Xóa khỏi giỏ hàng"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ô NHẬP MÃ ƯU ĐÃI (MÃ GIẢM GIÁ / VOUCHER) */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#0066d6]" />
                  Mã khuyến mãi / Voucher TECNIC
                </span>
                {appliedCoupon && (
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    Đã áp dụng: {appliedCoupon}
                  </span>
                )}
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-emerald-300">
                  <div className="text-xs">
                    <span className="font-bold text-emerald-700">{appliedCoupon}</span>
                    <span className="text-slate-500 ml-2">Giảm {couponDiscount.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Bỏ mã
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Nhập mã ưu đãi hoặc mã bác sĩ giới thiệu"
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0066d6]"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingCoupon}
                    className="bg-[#0066d6] hover:bg-[#0052cc] disabled:opacity-50 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition shrink-0 cursor-pointer"
                  >
                    {isCheckingCoupon ? 'Đang kiểm tra...' : 'Áp dụng'}
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {couponError}
                </p>
              )}
            </div>

            {/* TỔNG KẾT CHI PHÍ & TIẾT KIỆM (LONG CHÂU STYLE SUMMARY) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Tổng tiền gốc (Giá thị trường):</span>
                <span className="line-through">{totalMarketPrice.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Tiết kiệm giá thành viên TECNIC:</span>
                <span>-{totalSavedOriginal.toLocaleString('vi-VN')} đ</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-blue-700 font-semibold">
                  <span>{appliedDoctor ? 'Ưu đãi Bác sĩ giới thiệu' : 'Voucher giảm giá'} ({appliedCoupon}):</span>
                  <span>-{couponDiscount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển dự kiến:</span>
                <span className={shippingFee === 0 ? "text-emerald-700 font-bold" : "text-slate-800 font-bold"}>
                  {shippingFee === 0 ? "Miễn phí (0 đ)" : `${shippingFee.toLocaleString('vi-VN')} đ`}
                </span>
              </div>
              
              <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Tổng thanh toán:</span>
                  <span className="text-[10px] text-slate-500">(Đã bao gồm thuế VAT và hóa đơn đỏ đầy đủ)</span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black text-red-600 tracking-tight block">
                    {finalTotal.toLocaleString('vi-VN')} đ
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    (Tiết kiệm tổng cộng {totalSaved.toLocaleString('vi-VN')} đ)
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* THANH ĐIỀU HƯỚNG & NÚT TIẾN HÀNH ĐẶT HÀNG Ở CHÂN MODAL */}
        {items.length > 0 && (
          <div className="bg-white p-3.5 sm:p-4 px-4 sm:px-6 border-t border-slate-200 flex justify-between items-center shrink-0 shadow-lg">
            <button
              onClick={onClearCart}
              className="text-xs text-slate-500 hover:text-red-600 underline font-medium cursor-pointer"
            >
              Xóa tất cả
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onClose}
                className="px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Chọn thêm
              </button>
              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout(appliedDoctor);
                }}
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs sm:text-sm font-black transition shadow-lg shadow-red-600/30 flex items-center gap-2 active:scale-98 cursor-pointer"
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
