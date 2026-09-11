import React, { useState } from 'react';
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck,
  Truck, Tag, CheckCircle2, AlertCircle, ChevronLeft
} from 'lucide-react';
import { CartItem, Doctor } from '../types';
import { ProductImage } from './ProductImage';
import { INITIAL_DOCTORS, matchDoctor } from '../data/doctorsData';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQty: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onProceedCheckout: (appliedDoctor?: Doctor | null) => void;
  /** Điều hướng về danh sách sản phẩm khi bấm "Tiếp tục mua sắm" */
  onContinueShopping: () => void;
  /** Điều hướng về trang chủ (dùng cho breadcrumb) */
  onGoHome: () => void;
}

/**
 * TRANG GIỎ HÀNG DẠNG FULL-PAGE (khác với CartModal là popup).
 * Tái sử dụng toàn bộ logic tính tiền / áp mã giảm giá / mã bác sĩ giới thiệu
 * giống CartModal để đảm bảo 2 nơi luôn cho ra kết quả nhất quán.
 */
export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  onContinueShopping,
  onGoHome,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [appliedDoctor, setAppliedDoctor] = useState<Doctor | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);

  let totalMarketPrice = 0;
  let totalTecnicPrice = 0;

  items.forEach(item => {
    totalMarketPrice += item.product.marketPrice * item.quantity;
    totalTecnicPrice += item.product.tecnicPrice * item.quantity;
  });

  const totalSavedOriginal = totalMarketPrice - totalTecnicPrice;
  const hasBulkyItems = items.some(item => item.product.isBulky);
  const shippingFee = hasBulkyItems ? 150000 : 0;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = couponCode.trim();
    if (!rawInput) return;
    const code = rawInput.toUpperCase();

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
      console.warn('Coupon check doctor api error:', err);
    }

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

  const freeShipThreshold = 300000;
  const percentToFreeShip = Math.min(100, Math.round((totalTecnicPrice / freeShipThreshold) * 100));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* BREADCRUMB - đồng bộ với các trang khác (About/Articles/Contact) */}
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
        <button onClick={onGoHome} className="text-[#0071ba] hover:underline font-bold cursor-pointer">
          Trang chủ
        </button>
        <span>/</span>
        <span className="text-slate-800 font-semibold">Giỏ hàng của bạn</span>
      </div>

      {/* TIÊU ĐỀ TRANG */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0066d6] flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-black text-lg sm:text-2xl text-slate-900 tracking-tight">Giỏ hàng của bạn</h1>
            <p className="text-[11px] sm:text-xs text-slate-500">
              {totalItemsCount > 0 ? `${totalItemsCount} sản phẩm trong giỏ` : 'Chưa có sản phẩm nào'}
            </p>
          </div>
        </div>
        <button
          onClick={onContinueShopping}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0066d6] hover:text-[#0052cc] transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Tiếp tục mua sắm
        </button>
      </div>

      {items.length === 0 ? (
        /* TRẠNG THÁI GIỎ HÀNG TRỐNG */
        <div className="bg-white rounded-2xl border border-slate-200 p-10 sm:p-16 text-center space-y-4">
          <div className="w-20 h-20 bg-blue-50 text-[#0066d6] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-800 text-lg">Giỏ hàng của bạn đang trống</p>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Hãy chọn các sản phẩm thiết bị y tế, phục hồi chức năng và chăm sóc sức khỏe chính hãng từ TECNIC MEDTECH.
            </p>
          </div>
          <button
            onClick={onContinueShopping}
            className="bg-[#0066d6] hover:bg-[#0052cc] text-white font-bold text-sm px-6 py-2.5 rounded-full transition shadow-md cursor-pointer"
          >
            Khám phá sản phẩm
          </button>
        </div>
      ) : (
        /* 2 CỘT: DANH SÁCH SẢN PHẨM (TRÁI) + TÓM TẮT ĐƠN HÀNG (PHẢI, STICKY) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">

          {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
          <div className="lg:col-span-2 space-y-4">

            {/* THANH TIẾN TRÌNH MIỄN PHÍ VẬN CHUYỂN */}
            {!hasBulkyItems && (
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl px-4 sm:px-5 py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-blue-900 font-medium">
                  <Truck className="w-4 h-4 text-[#0066d6] shrink-0" />
                  {totalTecnicPrice >= freeShipThreshold ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Bạn đủ điều kiện được Miễn Phí Vận Chuyển toàn quốc!
                    </span>
                  ) : (
                    <span>
                      Mua thêm <b>{(freeShipThreshold - totalTecnicPrice).toLocaleString('vi-VN')} đ</b> để được Miễn Phí Vận Chuyển
                    </span>
                  )}
                </div>
                <div className="hidden sm:block w-32 bg-blue-200 h-2 rounded-full overflow-hidden shrink-0">
                  <div
                    className="bg-[#0066d6] h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentToFreeShip}%` }}
                  />
                </div>
              </div>
            )}

            {hasBulkyItems && (
              <div className="p-3 rounded-xl text-xs flex items-center gap-2 border bg-amber-50 text-amber-900 border-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  Đơn hàng có sản phẩm cồng kềnh (giường y tế/máy tạo oxy). Phụ phí vận chuyển & kỹ thuật lắp đặt: <b>+150.000 đ</b>.
                </span>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="p-3.5 sm:p-4 flex gap-3 sm:gap-4 items-start sm:items-center hover:bg-slate-50/60 transition">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white p-1">
                    <ProductImage product={product} size="sm" showBadge={false} />
                  </div>

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
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition sm:hidden shrink-0"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Quy cách: Hộp/Chiếc • Bảo hành {product.specifications?.warrantyMonths || 12} tháng
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-sm sm:text-base text-red-600 whitespace-nowrap">
                          {product.tecnicPrice.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-xs text-slate-400 line-through whitespace-nowrap">
                          {product.marketPrice.toLocaleString('vi-VN')} đ
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
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

                        <span className="font-bold text-xs sm:text-sm text-slate-900 w-24 text-right hidden sm:block">
                          {(product.tecnicPrice * quantity).toLocaleString('vi-VN')} đ
                        </span>

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

            <button
              onClick={onClearCart}
              className="text-xs text-slate-500 hover:text-red-600 underline font-medium cursor-pointer"
            >
              Xóa tất cả sản phẩm
            </button>
          </div>

          {/* CỘT PHẢI: MÃ ƯU ĐÃI + TÓM TẮT ĐƠN HÀNG (STICKY KHI CUỘN TRANG) */}
          <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-20">

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#0066d6]" />
                  Mã khuyến mãi / Voucher TECNIC
                </span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-300">
                  <div className="text-xs">
                    <span className="font-bold text-emerald-700 block">{appliedCoupon}</span>
                    <span className="text-slate-500">Giảm {couponDiscount.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs text-red-600 hover:underline font-medium shrink-0"
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
                    className="flex-1 min-w-0 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0066d6]"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingCoupon}
                    className="bg-[#0066d6] hover:bg-[#0052cc] disabled:opacity-50 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition shrink-0 cursor-pointer"
                  >
                    {isCheckingCoupon ? '...' : 'Áp dụng'}
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {couponError}
                </p>
              )}
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
              <h3 className="font-bold text-sm text-slate-900 mb-1">Tóm tắt đơn hàng</h3>
              <div className="flex justify-between text-slate-600">
                <span>Tổng tiền gốc:</span>
                <span className="line-through">{totalMarketPrice.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Tiết kiệm giá thành viên:</span>
                <span>-{totalSavedOriginal.toLocaleString('vi-VN')} đ</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-blue-700 font-semibold">
                  <span>{appliedDoctor ? 'Ưu đãi Bác sĩ' : 'Voucher'}:</span>
                  <span>-{couponDiscount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển:</span>
                <span className={shippingFee === 0 ? 'text-emerald-700 font-bold' : 'text-slate-800 font-bold'}>
                  {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')} đ`}
                </span>
              </div>

              <div className="pt-2.5 border-t border-slate-200">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Tổng thanh toán:</span>
                  <span className="text-xl font-black text-red-600 tracking-tight">
                    {finalTotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 text-right mt-0.5">Đã bao gồm thuế VAT</p>
                <p className="text-[11px] text-emerald-700 font-medium text-right">
                  Tiết kiệm tổng cộng {totalSaved.toLocaleString('vi-VN')} đ
                </p>
              </div>

              <button
                onClick={() => onProceedCheckout(appliedDoctor)}
                className="w-full mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-black transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                TIẾN HÀNH ĐẶT HÀNG
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066d6]" />
                Thiết bị y tế chính hãng • Đổi trả 30 ngày
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
